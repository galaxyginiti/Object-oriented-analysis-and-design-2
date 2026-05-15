package lab04.wallet;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import io.javalin.Javalin;
import io.javalin.http.Context;
import io.javalin.json.JavalinJackson;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Бэкенд С паттерном Value Object.
 * Идея: мульти-валютный кошелёк. Транзакции хранятся в MongoDB,
 * сумма представлена value object'ом Money.
 */
public class Main {

    public static void main(String[] args) {
        String mongoUri = env("MONGO_URI", "mongodb://localhost:27017");
        String dbName   = env("MONGO_DB",  "lab04_wallet_vo");
        int port        = Integer.parseInt(env("PORT", "8001"));

        TransactionRepository repo =
            new TransactionRepository(mongoUri, dbName, "transactions");
        Wallet wallet = new Wallet();

        ObjectMapper mapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

        Javalin app = Javalin.create(cfg -> {
            cfg.jsonMapper(new JavalinJackson(mapper, true));
            cfg.bundledPlugins.enableCors(cors -> cors.addRule(it -> it.anyHost()));
        });

        // ---------- Endpoints ----------

        app.get("/state", ctx -> {
            List<Transaction> txs = repo.findAll();
            Map<String, Object> body = new LinkedHashMap<>();
            body.put("backend", "value-object");
            body.put("count", txs.size());
            body.put("transactions", txs.stream().map(Main::txToJson).toList());
            body.put("totalByCurrency", moneyMapToJson(wallet.totalByCurrency(txs)));
            body.put("totalByCategory", categoryMapToJson(wallet.totalByCategory(txs)));
            ctx.json(body);
        });

        app.post("/transactions", ctx -> {
            TransactionRequest req = ctx.bodyAsClass(TransactionRequest.class);
            // Money сам провалидирует валюту и сумму
            Money amount = Money.of(BigDecimal.valueOf(req.amount), req.currency);
            Transaction t = new Transaction(
                null, amount, req.category, req.description, Instant.now());
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
            repo.save(new Transaction(null, Money.of(120.50, "USD"),
                "food", "Lunch with team", Instant.now()));
            repo.save(new Transaction(null, Money.of(-30.00, "USD"),
                "transport", "Taxi", Instant.now()));
            repo.save(new Transaction(null, Money.of(2500.00, "RUB"),
                "food", "Доставка пиццы", Instant.now()));
            repo.save(new Transaction(null, Money.of(45.00, "EUR"),
                "subscriptions", "Spotify Family", Instant.now()));
            ctx.json(Map.of("ok", true, "seeded", repo.count()));
        });

        app.delete("/transactions", ctx -> {
            repo.clear();
            ctx.json(Map.of("ok", true));
        });

        // ---------- Обработка ошибок ----------

        app.exception(Money.CurrencyMismatchException.class, (e, ctx) -> {
            ctx.status(400).json(Map.of("error", e.getMessage()));
        });
        app.exception(IllegalArgumentException.class, (e, ctx) -> {
            ctx.status(400).json(Map.of("error", e.getMessage()));
        });

        Runtime.getRuntime().addShutdownHook(new Thread(repo::close));

        app.start(port);
        System.out.println("Backend (Value Object) на порту " + port +
            ", MongoDB = " + mongoUri + "/" + dbName);
    }

    // ---------- Сериализация ----------

    static Map<String, Object> txToJson(Transaction t) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", t.getId());
        m.put("amount", moneyToJson(t.getAmount()));
        m.put("category", t.getCategory());
        m.put("description", t.getDescription());
        m.put("createdAt", t.getCreatedAt().toString());
        return m;
    }

    static Map<String, Object> moneyToJson(Money m) {
        Map<String, Object> json = new LinkedHashMap<>();
        json.put("value", m.getAmount());
        json.put("currency", m.getCurrency());
        return json;
    }

    static Map<String, Object> moneyMapToJson(Map<String, Money> totals) {
        Map<String, Object> json = new LinkedHashMap<>();
        for (Map.Entry<String, Money> e : totals.entrySet()) {
            json.put(e.getKey(), moneyToJson(e.getValue()));
        }
        return json;
    }

    static Map<String, Object> categoryMapToJson(Map<String, Map<String, Money>> data) {
        Map<String, Object> json = new LinkedHashMap<>();
        for (Map.Entry<String, Map<String, Money>> e : data.entrySet()) {
            json.put(e.getKey(), moneyMapToJson(e.getValue()));
        }
        return json;
    }

    // ---------- DTO для входа ----------

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
