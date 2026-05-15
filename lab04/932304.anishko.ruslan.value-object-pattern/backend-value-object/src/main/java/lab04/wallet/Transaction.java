package lab04.wallet;

import java.time.Instant;
import java.util.Objects;

/**
 * Транзакция кошелька — Entity (есть identity = id из Mongo).
 * Хранит сумму как Value Object Money: подмена эквивалентного объекта
 * не изменит смысла транзакции.
 */
public class Transaction {

    private String id;        // ObjectId из MongoDB
    private final Money amount;
    private final String category;
    private final String description;
    private final Instant createdAt;

    public Transaction(String id, Money amount, String category,
                       String description, Instant createdAt) {
        this.id = id;
        this.amount = Objects.requireNonNull(amount, "amount");
        this.category = category == null ? "other" : category;
        this.description = description == null ? "" : description;
        this.createdAt = createdAt == null ? Instant.now() : createdAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public Money getAmount() { return amount; }
    public String getCategory() { return category; }
    public String getDescription() { return description; }
    public Instant getCreatedAt() { return createdAt; }
}
