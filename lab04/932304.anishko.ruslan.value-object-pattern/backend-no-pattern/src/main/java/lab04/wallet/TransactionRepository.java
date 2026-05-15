package lab04.wallet;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Репозиторий БЕЗ паттерна Value Object.
 * Сумма и валюта — два независимых поля в документе MongoDB,
 * никакой инкапсуляции.
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
        Document doc = new Document()
            .append("amount", t.getAmount())
            .append("currency", t.getCurrency())
            .append("category", t.getCategory())
            .append("description", t.getDescription())
            .append("createdAt", Date.from(t.getCreatedAt()));
        col.insertOne(doc);
        t.setId(doc.getObjectId("_id").toHexString());
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
        return new Transaction(
            doc.getObjectId("_id").toHexString(),
            doc.getDouble("amount"),
            doc.getString("currency"),
            doc.getString("category"),
            doc.getString("description"),
            doc.getDate("createdAt").toInstant()
        );
    }

    public void close() {
        client.close();
    }
}
