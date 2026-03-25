export default function SectionEnd() {
  return (
    <section className="sh">
      <div className="sh-num">06</div>
      <h1 className="sh-title">Вывод</h1>
      <p className="sh-sub">Сравнение подходов и итоги</p>

      <div className="cmp-grid">
        <div className="cmp bad">
          <h4>✗ Без паттерна Decorator</h4>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li>Монолитный класс с булевыми флагами</li>
            <li>getCost() / getDescription() — огромные if-else</li>
            <li>Нарушение OCP: новая добавка → правки в базовом классе</li>
            <li>Одна добавка = один bool, «двойной мокко» невозможен</li>
            <li>Комбо жёстко захардкожены</li>
            <li>Код тяжело тестировать и поддерживать</li>
          </ul>
        </div>
        <div className="cmp good">
          <h4>✓ С паттерном Decorator</h4>
          <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
            <li>Каждая добавка — отдельный класс-декоратор</li>
            <li>getCost() / getDescription() — рекурсивная делегация</li>
            <li>OCP: новая добавка = новый класс, 0 изменений</li>
            <li>Любое количество и порядок добавок</li>
            <li>Комбинации формируются динамически</li>
            <li>Каждый класс легко тестировать изолированно</li>
          </ul>
        </div>
      </div>

      <div className="block">
        <h3>Ключевые выводы</h3>
        <ol style={{ lineHeight: 1.7, paddingLeft: '1.25rem' }}>
          <li>
            <strong>Open/Closed Principle (OCP)</strong> — классы открыты для расширения
            (новый декоратор), закрыты для изменения (существующий код не трогаем).
          </li>
          <li>
            <strong>Композиция вместо наследования</strong> — декораторы оборачивают объекты
            в runtime, а не создают огромную иерархию подклассов.
          </li>
          <li>
            <strong>Single Responsibility</strong> — каждый декоратор отвечает за одну добавку,
            вместо одного класса, отвечающего за всё.
          </li>
          <li>
            <strong>Рекурсивная структура</strong> — вызов <code>getCost()</code> проходит
            по цепочке декораторов до базового компонента и собирает итоговую стоимость.
          </li>
          <li>
            <strong>Гибкость</strong> — добавки применяются в любом порядке и количестве,
            включая повторения (двойной мокко = два декоратора Mocha).
          </li>
        </ol>
      </div>

      <div className="box-b">
        <strong>Паттерн Decorator</strong> — структурный паттерн GoF, позволяющий динамически
        добавлять объектам новые обязанности, оборачивая их в объекты-декораторы через
        единый интерфейс. Альтернатива созданию подклассов для расширения функциональности.
      </div>
    </section>
  );
}
