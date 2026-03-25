export default function SectionUml2() {
  return (
    <section className="sh">
      <div className="sh-num">03</div>
      <h1 className="sh-title">UML — с паттерном Decorator</h1>
      <p className="sh-sub">
        Классическая структура GoF Decorator: Component → Decorator → ConcreteDecorators
      </p>

      <div className="uml-wrap">
        <svg viewBox="0 0 900 700" width="900" xmlns="http://www.w3.org/2000/svg" fontFamily="Inter, system-ui, sans-serif">

          {/* ── ① Component (Beverage) ── */}
          <rect x="320" y="10" width="260" height="100" rx="8" fill="#e3f2fd" stroke="#1565c0" strokeWidth="2" />
          <text x="450" y="32" textAnchor="middle" fontSize="11" fill="#1565c0" fontStyle="italic">{"<<interface>>"}</text>
          <text x="450" y="52" textAnchor="middle" fontWeight="700" fontSize="14" fill="#0d47a1">Beverage</text>
          <line x1="336" y1="60" x2="564" y2="60" stroke="#90caf9" />
          <text x="336" y="78" fontSize="12" fill="#333">+ getDescription(): string</text>
          <text x="336" y="96" fontSize="12" fill="#333">+ getCost(): double</text>
          {/* Circled 1 */}
          <circle cx="590" cy="30" r="12" fill="#1565c0" />
          <text x="590" y="35" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">①</text>

          {/* ── ② ConcreteComponents ── */}
          <rect x="20" y="200" width="180" height="90" rx="8" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" />
          <rect x="20" y="200" width="180" height="30" rx="8" fill="#c8e6c9" stroke="#2e7d32" strokeWidth="1.5" />
          <text x="110" y="220" textAnchor="middle" fontWeight="700" fontSize="13" fill="#1b5e20">Espresso</text>
          <text x="34" y="250" fontSize="11" fill="#333">+ getDescription()</text>
          <text x="34" y="268" fontSize="11" fill="#333">+ getCost(): 1.99</text>
          {/* Circled 2 */}
          <circle cx="210" cy="220" r="12" fill="#2e7d32" />
          <text x="210" y="225" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">②</text>

          <rect x="20" y="306" width="180" height="44" rx="8" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" />
          <text x="110" y="332" textAnchor="middle" fontWeight="600" fontSize="12" fill="#1b5e20">HouseBlend</text>

          <rect x="20" y="364" width="180" height="44" rx="8" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" />
          <text x="110" y="390" textAnchor="middle" fontWeight="600" fontSize="12" fill="#1b5e20">DarkRoast</text>

          <rect x="20" y="422" width="180" height="44" rx="8" fill="#e8f5e9" stroke="#2e7d32" strokeWidth="1.5" />
          <text x="110" y="448" textAnchor="middle" fontWeight="600" fontSize="12" fill="#1b5e20">GreenTea</text>

          {/* ── Реализация интерфейса: ВСЕ ConcreteComponents → Beverage (ПУНКТИР) ── */}
          {/* Общая вертикальная шина от всех 4-х классов */}
          <line x1="110" y1="200" x2="110" y2="160" stroke="#2e7d32" strokeWidth="1.5" strokeDasharray="6 3" />
          <line x1="110" y1="306" x2="110" y2="290" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="110" y1="290" x2="80" y2="290" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="80" y1="290" x2="80" y2="160" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="80" y1="160" x2="110" y2="160" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="110" y1="364" x2="110" y2="350" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="110" y1="350" x2="60" y2="350" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="60" y1="350" x2="60" y2="160" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="60" y1="160" x2="80" y2="160" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="110" y1="422" x2="110" y2="412" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="110" y1="412" x2="40" y2="412" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="40" y1="412" x2="40" y2="160" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="40" y1="160" x2="60" y2="160" stroke="#2e7d32" strokeWidth="1.2" strokeDasharray="6 3" />
          {/* Горизонтальная шина от левого блока до интерфейса */}
          <line x1="110" y1="160" x2="370" y2="160" stroke="#2e7d32" strokeWidth="1.5" strokeDasharray="6 3" />
          <line x1="370" y1="160" x2="370" y2="110" stroke="#2e7d32" strokeWidth="1.5" strokeDasharray="6 3" />
          {/* Треугольник (пустой) — реализация интерфейса */}
          <polygon points="362,110 370,95 378,110" fill="#fff" stroke="#2e7d32" strokeWidth="1.5" />

          {/* ── ③ Decorator (CondimentDecorator) ── */}
          <rect x="330" y="210" width="240" height="110" rx="8" fill="#fff3e0" stroke="#e65100" strokeWidth="2" />
          <rect x="330" y="210" width="240" height="30" rx="8" fill="#ffe0b2" stroke="#e65100" strokeWidth="2" />
          <text x="450" y="230" textAnchor="middle" fontWeight="700" fontSize="13" fill="#bf360c">CondimentDecorator</text>
          <text x="346" y="258" fontSize="12" fill="#333"># beverage_: unique_ptr&lt;Beverage&gt;</text>
          <line x1="346" y1="268" x2="554" y2="268" stroke="#ffe0b2" />
          <text x="346" y="288" fontSize="12" fill="#333">+ getDescription(): string</text>
          <text x="346" y="306" fontSize="12" fill="#333">+ getCost(): double</text>
          {/* Circled 3 */}
          <circle cx="580" cy="230" r="12" fill="#e65100" />
          <text x="580" y="235" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">③</text>

          {/* CondimentDecorator → Beverage (реализация интерфейса = ПУНКТИР) */}
          <line x1="450" y1="210" x2="450" y2="110" stroke="#e65100" strokeWidth="1.5" strokeDasharray="6 3" />
          <polygon points="442,110 450,95 458,110" fill="#fff" stroke="#e65100" strokeWidth="1.5" />

          {/* Композиция: CondimentDecorator ◆──→ Beverage (поле beverage_) — СПЛОШНАЯ */}
          <line x1="555" y1="258" x2="640" y2="258" stroke="#1565c0" strokeWidth="1.5" />
          <line x1="640" y1="258" x2="640" y2="60" stroke="#1565c0" strokeWidth="1.5" />
          <line x1="640" y1="60" x2="580" y2="60" stroke="#1565c0" strokeWidth="1.5" markerEnd="url(#arrowBlue2)" />
          {/* Ромб (filled) — композиция */}
          <path d="M555,258 L565,252 L575,258 L565,264 Z" fill="#1565c0" />
          <text x="650" y="165" fontSize="10" fill="#1565c0" fontWeight="600">beverage_</text>

          {/* ── ④ ConcreteDecorators ── */}
          <rect x="250" y="390" width="140" height="90" rx="8" fill="#fce4ec" stroke="#c62828" strokeWidth="1.5" />
          <rect x="250" y="390" width="140" height="26" rx="8" fill="#ffcdd2" stroke="#c62828" strokeWidth="1.5" />
          <text x="320" y="408" textAnchor="middle" fontWeight="700" fontSize="12" fill="#b71c1c">Milk</text>
          <text x="260" y="432" fontSize="10" fill="#333">+ getDescription()</text>
          <text x="260" y="446" fontSize="10" fill="#333">+ getCost(): +0.30</text>
          <text x="260" y="468" fontSize="9" fill="#888">делегирует к beverage_</text>

          <rect x="410" y="390" width="140" height="90" rx="8" fill="#fce4ec" stroke="#c62828" strokeWidth="1.5" />
          <rect x="410" y="390" width="140" height="26" rx="8" fill="#ffcdd2" stroke="#c62828" strokeWidth="1.5" />
          <text x="480" y="408" textAnchor="middle" fontWeight="700" fontSize="12" fill="#b71c1c">Mocha</text>
          <text x="420" y="432" fontSize="10" fill="#333">+ getDescription()</text>
          <text x="420" y="446" fontSize="10" fill="#333">+ getCost(): +0.50</text>

          <rect x="570" y="390" width="140" height="90" rx="8" fill="#fce4ec" stroke="#c62828" strokeWidth="1.5" />
          <rect x="570" y="390" width="140" height="26" rx="8" fill="#ffcdd2" stroke="#c62828" strokeWidth="1.5" />
          <text x="640" y="408" textAnchor="middle" fontWeight="700" fontSize="12" fill="#b71c1c">Whip</text>
          <text x="580" y="432" fontSize="10" fill="#333">+ getDescription()</text>
          <text x="580" y="446" fontSize="10" fill="#333">+ getCost(): +0.40</text>

          <rect x="250" y="500" width="140" height="60" rx="8" fill="#fce4ec" stroke="#c62828" strokeWidth="1.5" />
          <rect x="250" y="500" width="140" height="26" rx="8" fill="#ffcdd2" stroke="#c62828" strokeWidth="1.5" />
          <text x="320" y="518" textAnchor="middle" fontWeight="700" fontSize="12" fill="#b71c1c">Caramel</text>
          <text x="260" y="544" fontSize="10" fill="#333">+ getCost(): +0.45</text>

          <rect x="410" y="500" width="140" height="60" rx="8" fill="#fce4ec" stroke="#c62828" strokeWidth="1.5" />
          <rect x="410" y="500" width="140" height="26" rx="8" fill="#ffcdd2" stroke="#c62828" strokeWidth="1.5" />
          <text x="480" y="518" textAnchor="middle" fontWeight="700" fontSize="12" fill="#b71c1c">Vanilla</text>
          <text x="420" y="544" fontSize="10" fill="#333">+ getCost(): +0.35</text>

          <rect x="570" y="500" width="140" height="60" rx="8" fill="#fce4ec" stroke="#c62828" strokeWidth="1.5" />
          <rect x="570" y="500" width="140" height="26" rx="8" fill="#ffcdd2" stroke="#c62828" strokeWidth="1.5" />
          <text x="640" y="518" textAnchor="middle" fontWeight="700" fontSize="12" fill="#b71c1c">Soy</text>
          <text x="580" y="544" fontSize="10" fill="#333">+ getCost(): +0.25</text>
          {/* Circled 4 */}
          <circle cx="720" cy="408" r="12" fill="#c62828" />
          <text x="720" y="413" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">④</text>

          {/* Наследование: ConcreteDecorators → CondimentDecorator (СПЛОШНАЯ — обычное наследование) */}
          <line x1="320" y1="390" x2="320" y2="360" stroke="#c62828" strokeWidth="1.2" />
          <line x1="480" y1="390" x2="480" y2="360" stroke="#c62828" strokeWidth="1.2" />
          <line x1="640" y1="390" x2="640" y2="360" stroke="#c62828" strokeWidth="1.2" />
          <line x1="320" y1="360" x2="640" y2="360" stroke="#c62828" strokeWidth="1.2" />
          <line x1="450" y1="360" x2="450" y2="320" stroke="#c62828" strokeWidth="1.5" />
          <polygon points="442,330 450,320 458,330" fill="#fff" stroke="#c62828" strokeWidth="1.5" />

          {/* Пунктирные связи от нижнего ряда к верхнему (сокращённые классы) */}
          <line x1="320" y1="500" x2="320" y2="482" stroke="#c62828" strokeWidth="1.2" strokeDasharray="4 2" />
          <line x1="480" y1="500" x2="480" y2="482" stroke="#c62828" strokeWidth="1.2" strokeDasharray="4 2" />
          <line x1="640" y1="500" x2="640" y2="482" stroke="#c62828" strokeWidth="1.2" strokeDasharray="4 2" />

          {/* ── ⑤ Client ── */}
          <rect x="700" y="190" width="180" height="100" rx="8" fill="#f3e5f5" stroke="#7b1fa2" strokeWidth="1.5" />
          <rect x="700" y="190" width="180" height="28" rx="8" fill="#e1bee7" stroke="#7b1fa2" strokeWidth="1.5" />
          <text x="790" y="209" textAnchor="middle" fontWeight="700" fontSize="12" fill="#4a148c">Client (main)</text>
          <text x="712" y="236" fontSize="10" fill="#333">drink = Espresso()</text>
          <text x="712" y="252" fontSize="10" fill="#333">drink = Milk(drink)</text>
          <text x="712" y="268" fontSize="10" fill="#333">drink = Mocha(drink)</text>
          <text x="712" y="284" fontSize="10" fill="#333">drink.getCost()</text>
          <circle cx="888" cy="209" r="12" fill="#7b1fa2" />
          <text x="888" y="214" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="700">⑤</text>

          {/* Client → Beverage dependency (пунктир) */}
          <line x1="790" y1="190" x2="790" y2="60" stroke="#7b1fa2" strokeWidth="1.2" strokeDasharray="6 3" />
          <line x1="790" y1="60" x2="580" y2="60" stroke="#7b1fa2" strokeWidth="1.2" strokeDasharray="6 3" markerEnd="url(#arrowPurple)" />

          {/* Benefits box */}
          <rect x="20" y="580" width="860" height="110" rx="10" fill="#e8f5e9" stroke="#43a047" strokeWidth="1.5" />
          <text x="450" y="604" textAnchor="middle" fontWeight="700" fontSize="14" fill="#2e7d32">✓ Преимущества паттерна Decorator</text>
          <text x="40" y="626" fontSize="12" fill="#1b5e20">• Открыт для расширения, закрыт для изменения (OCP)</text>
          <text x="40" y="646" fontSize="12" fill="#1b5e20">• Добавки комбинируются динамически в любом порядке и количестве</text>
          <text x="40" y="666" fontSize="12" fill="#1b5e20">• Новая добавка = новый класс-декоратор (без изменения существующего кода)</text>
          <text x="500" y="626" fontSize="12" fill="#1b5e20">• Один интерфейс для напитков и добавок (полиморфизм)</text>
          <text x="500" y="646" fontSize="12" fill="#1b5e20">• Ответственности добавляются / удаляются в runtime</text>
          <text x="500" y="666" fontSize="12" fill="#1b5e20">• Устранение «комбинаторного взрыва» подклассов</text>

          <defs>
            <marker id="arrowBlue2" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1565c0" />
            </marker>
            <marker id="arrowPurple" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#7b1fa2" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="box-g">
        <strong>Ключевой момент:</strong> <code>CondimentDecorator</code> наследует <code>Beverage</code>
        и одновременно содержит указатель <code>beverage_</code> на <code>Beverage</code>.
        Это позволяет рекурсивно оборачивать объекты: каждый декоратор делегирует вызов
        внутреннему объекту и добавляет своё поведение.
      </div>
    </section>
  );
}
