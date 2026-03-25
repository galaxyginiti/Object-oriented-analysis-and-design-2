export default function SectionIdea() {
  return (
    <section className="sh">
      <div className="sh-num">01</div>
      <h1 className="sh-title">Идея проекта</h1>
      <p className="sh-sub">
        Кофейня с настраиваемыми напитками — классическая задача для паттерна Decorator
      </p>

      {/* Проблема */}
      <div className="box-r">
        <strong>⚠ Проблема без паттерна:</strong>
        <ul style={{ margin: '.5rem 0 0', paddingLeft: '1.25rem' }}>
          <li>Базовый класс <code>Beverage</code> содержит булевы флаги для каждой добавки
              (<code>hasMilk</code>, <code>hasMocha</code>, …)</li>
          <li><code>getCost()</code> и <code>getDescription()</code> — огромные if-else цепочки</li>
          <li>Добавление новой добавки → <b>изменение базового класса</b> (нарушение OCP)</li>
          <li>Комбо-напитки жёстко закодированы → <b>комбинаторный взрыв</b> классов</li>
          <li>Невозможно добавить одну добавку дважды (например, двойной мокко)</li>
        </ul>
      </div>

      {/* Решение */}
      <div className="box-g">
        <strong>✓ Решение — паттерн Decorator:</strong>
        <ul style={{ margin: '.5rem 0 0', paddingLeft: '1.25rem' }}>
          <li>Напиток и добавки реализуют один интерфейс <code>Beverage</code></li>
          <li>Каждая добавка — декоратор, оборачивающий предыдущий объект</li>
          <li>Новая добавка = новый класс, <b>без изменения существующего кода</b></li>
          <li>Добавки комбинируются в любом порядке и количестве</li>
          <li>Стоимость и описание вычисляются полиморфно по цепочке</li>
        </ul>
      </div>

      {/* Участники */}
      <div className="block">
        <h3>Участники паттерна Decorator (GoF)</h3>
        <div className="participants">
          <div className="participant">
            <strong>① Component</strong><br />
            <code>Beverage</code> — абстрактный интерфейс напитка
          </div>
          <div className="participant">
            <strong>② ConcreteComponent</strong><br />
            <code>Espresso</code>, <code>HouseBlend</code>, <code>DarkRoast</code>, <code>GreenTea</code>
          </div>
          <div className="participant">
            <strong>③ Decorator</strong><br />
            <code>CondimentDecorator</code> — базовый декоратор с указателем на Component
          </div>
          <div className="participant">
            <strong>④ ConcreteDecorator</strong><br />
            <code>Milk</code>, <code>Mocha</code>, <code>Whip</code>, <code>Caramel</code>, <code>Vanilla</code>, <code>Soy</code>
          </div>
          <div className="participant">
            <strong>⑤ Client</strong><br />
            HTTP-обработчик / <code>main()</code> — собирает цепочку декораторов
          </div>
        </div>
      </div>

      <div className="box-b">
        <strong>Пример цепочки:</strong><br />
        <code>Milk( Mocha( Whip( Espresso() ) ) )</code><br />
        Вызов <code>getCost()</code> рекурсивно проходит всю цепочку:<br />
        <code>0.30 + 0.50 + 0.40 + 1.99 = $3.19</code>
      </div>
    </section>
  );
}
