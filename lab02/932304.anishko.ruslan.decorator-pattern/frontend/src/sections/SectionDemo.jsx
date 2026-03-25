import CoffeeOrderForm from '../components/CoffeeOrderForm';

export default function SectionDemo() {
  return (
    <section className="sh">
      <div className="sh-num">Демонстрация</div>
      <h1 className="sh-title">☕ Кофейня — Decorator Pattern</h1>
      <p className="sh-sub">
        Выберите базовый напиток и добавьте любые добавки.
        Каждая добавка — это декоратор, который оборачивает предыдущий объект.
      </p>

      <CoffeeOrderForm />

      <div className="box-o" style={{ marginTop: '1.5rem' }}>
        <strong>Как это работает:</strong><br />
        React-форма → POST /api/order → C++ сервер создаёт ConcreteComponent (напиток),
        последовательно оборачивает его ConcreteDecorator'ами (добавки) →
        полиморфный вызов getDescription() / getCost() проходит по всей цепочке →
        JSON с результатом отправляется обратно на фронтенд.
      </div>
    </section>
  );
}
