package lab04.wallet;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.bson.types.Decimal128;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Репозиторий, кладёт транзакции в MongoDB.
 *
 * Money сериализуется как вложенный документ
 *   amount: { value: Decimal128, currency: "USD" }
 * — то есть форма value object'а сохраняется и в базе.
 */
public class TransactionRepository {

    private final MongoClient client;
    private final MongoCollection<Document> col;

    public TransactionRepository(String uri, String dbName, String collectionName) {
        this.client = MongoClients.create(uri);
        MongoDatabase db = client.getDatabase(dbName);
        this.col = db.getCollection(collectionName);
    }

    public Transaction save(Transaction t) {
        Document amountDoc = new Document()
            .append("value", new Decimal128(t.getAmount().getAmount()))
            .append("currency", t.getAmount().getCurrency());

        Document doc = new Document()
            .append("amount", amountDoc)
            .append("category", t.getCategory())
            .append("description", t.getDescription())
            .append("createdAt", Date.from(t.getCreatedAt()));

        col.insertOne(doc);
        ObjectId id = doc.getObjectId("_id");
        t.setId(id.toHexString());
        return t;
    }

    public List<Transaction> findAll() {
        List<Transaction> result = new ArrayList<>();
        for (Document doc : col.find().sort(new Document("createdAt", -1))) {
            result.add(toTransaction(doc));
        }
        return result;
    }

    public boolean deleteById(String id) {
        try {
            return col.deleteOne(new Document("_id", new ObjectId(id))).getDeletedCount() > 0;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }

    public long count() {
        return col.countDocuments();
    }

    public void clear() {
        col.deleteMany(new Document());
    }

    private Transaction toTransaction(Document doc) {
        Document amountDoc = doc.get("amount", Document.class);
        BigDecimal value = amountDoc.get("value", Decimal128.class).bigDecimalValue();
        String currency = amountDoc.getString("currency");
        Money money = Money.of(value, currency);

        return new Transaction(
            doc.getObjectId("_id").toHexString(),
            money,
            doc.getString("category"),
            doc.getString("description"),
            doc.getDate("createdAt").toInstant()
        );
    }

    public void close() {
        client.close();
    }
}
