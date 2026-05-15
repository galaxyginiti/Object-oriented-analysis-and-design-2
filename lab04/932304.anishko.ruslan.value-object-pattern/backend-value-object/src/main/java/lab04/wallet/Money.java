package lab04.wallet;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

/**
 * Money — Value Object из книги Мартина Фаулера "Patterns of Enterprise
 * Application Architecture" (глава "Value Object").
 *
 * Ключевые свойства:
 *   1. Immutable — поля final, нет сеттеров.
 *   2. Equality по значению (equals/hashCode опираются на сумму и валюту,
 *      идентичность объекта значения не имеет).
 *   3. Арифметика возвращает новые объекты, не мутирует существующие.
 *   4. Самовалидация: разные валюты складывать нельзя — это ошибка
 *      на уровне типа, а не где-то глубоко в сервисе.
 *
 * Цитата из Fowler: "A small simple object, like money or a date range,
 * whose equality isn't based on identity."
 */
public final class Money {

    private final BigDecimal amount;
    private final String currency; // ISO-4217 код: USD, EUR, RUB, ...

    private Money(BigDecimal amount, String currency) {
        // округляем до двух знаков, чтобы не плодить хвосты
        this.amount = amount.setScale(2, RoundingMode.HALF_UP);
        this.currency = currency;
    }

    /** Фабричный метод — единственный способ создать Money. */
    public static Money of(BigDecimal amount, String currency) {
        Objects.requireNonNull(amount, "amount");
        Objects.requireNonNull(currency, "currency");
        if (currency.length() != 3) {
            throw new IllegalArgumentException(
                "Currency должна быть ISO-4217 кодом из 3 букв, получено: " + currency);
        }
        return new Money(amount, currency.toUpperCase());
    }

    public static Money of(double amount, String currency) {
        return of(BigDecimal.valueOf(amount), currency);
    }

    public static Money zero(String currency) {
        return of(BigDecimal.ZERO, currency);
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getCurrency() {
        return currency;
    }

    // --------- Арифметика. Возвращает новый Money, не мутирует ---------

    public Money plus(Money other) {
        assertSameCurrency(other);
        return new Money(this.amount.add(other.amount), this.currency);
    }

    public Money minus(Money other) {
        assertSameCurrency(other);
        return new Money(this.amount.subtract(other.amount), this.currency);
    }

    public Money times(BigDecimal multiplier) {
        return new Money(this.amount.multiply(multiplier), this.currency);
    }

    public Money negate() {
        return new Money(this.amount.negate(), this.currency);
    }

    public boolean isNegative() {
        return amount.signum() < 0;
    }

    public boolean isSameCurrency(Money other) {
        return currency.equals(other.currency);
    }

    private void assertSameCurrency(Money other) {
        if (!isSameCurrency(other)) {
            throw new CurrencyMismatchException(
                "Нельзя складывать " + currency + " и " + other.currency);
        }
    }

    // --------- Equality по значению ---------

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Money)) return false;
        Money m = (Money) o;
        // важно сравнивать через compareTo, чтобы 10.00 == 10.0
        return amount.compareTo(m.amount) == 0 && currency.equals(m.currency);
    }

    @Override
    public int hashCode() {
        // hashCode согласован с equals: используем stripTrailingZeros
        return Objects.hash(amount.stripTrailingZeros(), currency);
    }

    @Override
    public String toString() {
        return amount.toPlainString() + " " + currency;
    }

    /** Кидается, когда пытаемся сложить разные валюты. */
    public static class CurrencyMismatchException extends RuntimeException {
        public CurrencyMismatchException(String message) {
            super(message);
        }
    }
}
