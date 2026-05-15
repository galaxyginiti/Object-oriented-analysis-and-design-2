package lab04.wallet;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Доменный сервис: считает суммы по транзакциям, опираясь
 * на арифметику Value Object'а Money. Никаких сырых double здесь нет —
 * всё в Money.plus(). Если в списке встретится валюта, которой ещё
 * не было, кладём её отдельно (Money.plus() сам бы упал на разных
 * валютах, и это правильно).
 */
public class Wallet {

    /**
     * Возвращает суммы, сгруппированные по валюте.
     * key — код валюты, value — Money той же валюты.
     */
    public Map<String, Money> totalByCurrency(List<Transaction> transactions) {
        Map<String, Money> totals = new LinkedHashMap<>();
        for (Transaction t : transactions) {
            Money m = t.getAmount();
            Money current = totals.get(m.getCurrency());
            // Money сам гарантирует, что мы не складываем разные валюты —
            // это уже проверено типом. Просто складываем.
            totals.put(m.getCurrency(), current == null ? m : current.plus(m));
        }
        return totals;
    }

    /**
     * Суммы по категориям и валютам:
     *   { "food": { "USD": Money, "EUR": Money }, "rent": { ... } }
     */
    public Map<String, Map<String, Money>> totalByCategory(List<Transaction> transactions) {
        Map<String, Map<String, Money>> result = new LinkedHashMap<>();
        for (Transaction t : transactions) {
            Map<String, Money> byCurrency =
                result.computeIfAbsent(t.getCategory(), k -> new LinkedHashMap<>());
            Money m = t.getAmount();
            Money current = byCurrency.get(m.getCurrency());
            byCurrency.put(m.getCurrency(), current == null ? m : current.plus(m));
        }
        return result;
    }
}
