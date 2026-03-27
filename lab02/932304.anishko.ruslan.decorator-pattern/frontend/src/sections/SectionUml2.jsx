export default function SectionUml2() {
  return (
    <section className="sh">
      <div className="sh-num">02</div>
      <h1 className="sh-title">UML — паттерн Decorator</h1>
      <p className="sh-sub">
        Классическая структура Decorator: Component → Decorator → ConcreteDecorators
      </p>

      <div className="uml-wrap" style={{ overflowX: 'auto', textAlign: 'center' }}>
        <img
          src="/decorator-uml.png"
          alt="UML-диаграмма паттерна Decorator"
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', border: '1px solid #e0e0e0' }}
        />
      </div>

      <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
        Расширенные добавки становятся декораторами.
      </p>

      <div className="box-g">
        <strong>Ключевой момент:</strong> <code>CondimentDecorator</code> наследует <code>Beverage</code>
        и одновременно содержит поле <code>wrappee: Beverage</code> (агрегация).
        Каждый ConcreteDecorator делегирует вызов внутреннему объекту и добавляет своё поведение.
      </div>
    </section>
  );
}
