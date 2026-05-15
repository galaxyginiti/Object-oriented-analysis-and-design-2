package lab04.wallet;

import java.time.Instant;

/**
 * Транзакция БЕЗ паттерна Value Object.
 * Сумма и валюта — два независимых примитивных поля. У нас нет
 * никакой защиты от того, что в одном месте amount передадут в одной
 * валюте, а в другом — в другой; нет инкапсуляции арифметики.
 *
 * Это сознательный анти-пример к Money из соседнего проекта.
 */
public class Transaction {

    private String id;
    private double amount;     // ← голая цифра, без валюты
    private String currency;   // ← валюта сама по себе, не связана с amount
    private String category;
    private String description;
    private Instant createdAt;

    public Transaction() {}

    public Transaction(String id, double amount, String currency, String category,
                       String description, Instant createdAt) {
        this.id = id;
        this.amount = amount;
        this.currency = currency == null ? "USD" : currency.toUpperCase();
        this.category = category == null ? "other" : category;
        this.description = description == null ? "" : description;
        this.createdAt = createdAt == null ? Instant.now() : createdAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
