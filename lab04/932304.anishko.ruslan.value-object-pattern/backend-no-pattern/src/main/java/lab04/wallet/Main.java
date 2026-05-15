package lab04.wallet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.javalin.Javalin;
import io.javalin.json.JavalinJackson;

import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Бэкенд БЕЗ паттерна Value Object.
 *
 * Ту же задачу решаем теми же эндпоинтами, но Money НЕ инкапсулирована.
 * Каждый раз, когда нам нужно посчитать сумму, мы вручную:
 *   1) проверяем, что валюта совпадает,
 *   2) складываем double'ы,
 *   3) формируем "Money-подобную" структуру руками.
 *
 * Если в каком-то месте про шаг (1) забыть — получим бессмысленные
 * "10 USD + 50 RUB = 60". В версии с Value Object это поймал бы
 * Money.plus() ещё на этапе компиляции типов.
 */
public class Main {

    public static void main(String[] args) {
        String mongoUri = env("MONGO_URI", "mongodb://localhost:27017");
        String dbName   = env("MONGO_DB",  "lab04_wallet_no");
        int port        = Integer.parseInt(env("PORT", "8002"));

        TransactionRepository repo =
            new TransactionRepository(mongoUri, dbName, "transactions");

        ObjectMapper mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        Javalin app = Javalin.create(cfg -> {
            cfg.jsonMapper(new JavalinJackson(mapper, true));
            cfg.bundledPlugins.enableCors(cors -> cors.addRule(it -> it.anyHost()));
        });

        app.get("/state", ctx -> {
            List<Transaction> txs = repo.findAll();
            Map<String, Object> body = new LinkedHashMap<>();
            body.put("backend", "no-pattern");
            body.put("count", txs.size());
            body.put("transactions", txs.stream().map(Main::txToJson).toList());
            body.put("totalByCurrency", totalByCurrency(txs));
            body.put("totalByCategory", totalByCategory(txs));
            ctx.json(body);
        });

        app.post("/transactions", ctx -> {
            TransactionRequest req = ctx.bodyAsClass(TransactionRequest.class);

            // ---- ручная валидация валюты вместо Money.of() ----
            if (req.currency == null || req.currency.length() != 3) {
                ctx.status(400).json(Map.of("error",
                    "Currency должна быть из 3 букв"));
                return;
            }

            Transaction t = new Transaction(
                null,
                req.amount,
                req.currency.toUpperCase(),
                req.category,
                req.description,
                Instant.now()
            );
            repo.save(t);
            ctx.json(txToJson(t));
        });

        app.delete("/transactions/{id}", ctx -> {
            boolean ok = repo.deleteById(ctx.pathParam("id"));
            if (!ok) ctx.status(404);
            ctx.json(Map.of("ok", ok));
        });

        app.post("/seed", ctx -> {
            repo.clear();
            repo.save(new Transaction(null, 120.50, "USD",
                "food", "Lunch with team", Instant.now()));
            repo.save(new Transaction(null, -30.00, "USD",
                "transport", "Taxi", Instant.now()));
            repo.save(new Transaction(null, 2500.00, "RUB",
                "food", "Доставка пиццы", Instant.now()));
            repo.save(new Transaction(null, 45.00, "EUR",
                "subscriptions", "Spotify Family", Instant.now()));
            ctx.json(Map.of("ok", true, "seeded", repo.count()));
        });

        app.delete("/transactions", ctx -> {
            repo.clear();
            ctx.json(Map.of("ok", true));
        });

        Runtime.getRuntime().addShutdownHook(new Thread(repo::close));
        app.start(port);
        System.out.println("Backend (без паттерна) на порту " + port +
            ", MongoDB = " + mongoUri + "/" + dbName);
    }

    // ---- агрегаты руками ----

    /**
     * Группируем суммы по валюте. Здесь мы оперируем сырыми double'ами
     * и руками собираем структуру { value, currency } на выходе.
     * Логика "сложить только при совпадении валюты" размазана по if'у.
     */
    static Map<String, Object> totalByCurrency(List<Transaction> txs) {
        Map<String, Double> totals = new LinkedHashMap<>();
        for (Transaction t : txs) {
            // ВНИМАНИЕ: проверка валюты делается через ключ Map.
            // Если бы мы тут случайно сложили amount без оглядки на currency
            // (а так часто и пишут второпях), система этого бы не поймала.
            totals.merge(t.getCurrency(), t.getAmount(), Double::sum);
        }
        Map<String, Object> json = new LinkedHashMap<>();
        for (Map.Entry<String, Double> e : totals.entrySet()) {
            // Каждый раз вручную вылепливаем "Money-подобный" объект
            json.put(e.getKey(), Map.of("value", e.getValue(), "currency", e.getKey()));
        }
        return json;
    }

    static Map<String, Object> totalByCategory(List<Transaction> txs) {
        Map<String, Map<String, Double>> raw = new LinkedHashMap<>();
        for (Transaction t : txs) {
            raw.computeIfAbsent(t.getCategory(), k -> new LinkedHashMap<>())
               .merge(t.getCurrency(), t.getAmount(), Double::sum);
        }
        Map<String, Object> json = new LinkedHashMap<>();
        for (Map.Entry<String, Map<String, Double>> cat : raw.entrySet()) {
            Map<String, Object> byCur = new LinkedHashMap<>();
            for (Map.Entry<String, Double> e : cat.getValue().entrySet()) {
                byCur.put(e.getKey(),
                    Map.of("value", e.getValue(), "currency", e.getKey()));
            }
            json.put(cat.getKey(), byCur);
        }
        return json;
    }

    // ---- сериализация ----

    static Map<String, Object> txToJson(Transaction t) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", t.getId());
        // снова руками склеиваем "Money-подобный" объект из двух полей,
        // — и так в каждом месте, где транзакция уезжает наружу.
        Map<String, Object> amount = new LinkedHashMap<>();
        amount.put("value", t.getAmount());
        amount.put("currency", t.getCurrency());
        m.put("amount", amount);
        m.put("category", t.getCategory());
        m.put("description", t.getDescription());
        m.put("createdAt", t.getCreatedAt().toString());
        return m;
    }

    public static class TransactionRequest {
        public double amount;
        public String currency;
        public String category;
        public String description;
    }

    private static String env(String key, String fallback) {
        String v = System.getenv(key);
        return v == null || v.isBlank() ? fallback : v;
    }
}
