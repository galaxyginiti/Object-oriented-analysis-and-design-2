export default function SectionUml2() {
  return (
    <section className="sh">
      <div className="sh-num">02</div>
      <h1 className="sh-title">UML — паттерн Decorator</h1>
      <p className="sh-sub">
        Классическая структура Decorator: Component → Decorator → ConcreteDecorators
      </p>

      <div className="uml-wrap" style={{ overflowX: 'auto' }}>
        <svg viewBox="0 0 900 542" width="900" xmlns="http://www.w3.org/2000/svg" fontFamily="Inter, system-ui, sans-serif" fontSize="13">

          {/* ════════════════════════════════════
              BEVERAGE — абстрактный класс (верх)
              ════════════════════════════════════ */}
          <rect x="300" y="20" width="240" height="90" fill="#fff" stroke="#222" strokeWidth="2" />
          <text x="420" y="46" textAnchor="middle" fontWeight="700" fontSize="14" fill="#111">Beverage</text>
          <line x1="300" y1="54" x2="540" y2="54" stroke="#222" strokeWidth="1.5" />
          <text x="316" y="73" fontSize="12" fill="#333">+ getDescription(): string</text>
          <text x="316" y="91" fontSize="12" fill="#333">+ getCost(): double</text>
          {/* Beverage bottom y=110, center-left (300,65), center-right (540,65) */}

          {/* ════════════════════════════════════
              LEFT COLUMN — ConcreteComponents
              ════════════════════════════════════ */}
          <rect x="22" y="50" width="155" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="100" y="74" textAnchor="middle" fill="#111">Espresso</text>

          <rect x="22" y="110" width="155" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="100" y="134" textAnchor="middle" fill="#111">HouseBlend</text>

          <rect x="22" y="170" width="155" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="100" y="194" textAnchor="middle" fill="#111">DarkRoast</text>

          <rect x="22" y="230" width="155" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="100" y="254" textAnchor="middle" fill="#111">GreenTea</text>

          {/* LEFT BUS — вертикаль, соединяет все 4 компонента */}
          {/* Шина x=204, охватывает y=69..249 */}
          <line x1="204" y1="69" x2="204" y2="249" stroke="#222" strokeWidth="1.5" />
          {/* Горизонтали от каждого блока к шине */}
          <line x1="177" y1="69"  x2="204" y2="69"  stroke="#222" strokeWidth="1.5" />
          <line x1="177" y1="129" x2="204" y2="129" stroke="#222" strokeWidth="1.5" />
          <line x1="177" y1="189" x2="204" y2="189" stroke="#222" strokeWidth="1.5" />
          <line x1="177" y1="249" x2="204" y2="249" stroke="#222" strokeWidth="1.5" />
          {/* Горизонталь шина → Beverage left (x=300, y=65) */}
          <line x1="204" y1="65" x2="300" y2="65" stroke="#222" strokeWidth="1.5" />
          {/* Пустой треугольник (наследование) — apex at Beverage left (300,65) */}
          <polygon points="300,65 289,58 289,72" fill="#fff" stroke="#222" strokeWidth="1.5" />

          {/* ════════════════════════════════════
              CONDIMENTDECORATOR
              ════════════════════════════════════ */}
          <rect x="262" y="340" width="278" height="130" fill="#fff" stroke="#222" strokeWidth="2" />
          <text x="401" y="366" textAnchor="middle" fontWeight="700" fontSize="13" fill="#111">CondimentDecorator</text>
          <line x1="262" y1="375" x2="540" y2="375" stroke="#222" strokeWidth="1.5" />
          <text x="278" y="396" fontSize="12" fill="#333">+ CondimentDecorator(beverage)</text>
          <text x="278" y="416" fontSize="12" fill="#333">+ getDescription(): string</text>
          <text x="278" y="436" fontSize="12" fill="#333">+ getCost(): double</text>
          {/* CondimentDecorator: top=340, bottom=470, left=262, right=540, center-x=401 */}

          {/* Наследование CondimentDecorator → Beverage (вертикаль вверх) */}
          <line x1="401" y1="340" x2="401" y2="112" stroke="#222" strokeWidth="1.5" />
          {/* Пустой треугольник — apex at Beverage bottom (401,110) */}
          <polygon points="401,110 393,124 409,124" fill="#fff" stroke="#222" strokeWidth="1.5" />

          {/* ════════════════════════════════════
              RIGHT COLUMN — Soy, Vanilla, Caramel
              ════════════════════════════════════ */}
          <rect x="710" y="55"  width="155" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="788" y="79"  textAnchor="middle" fill="#111">Soy</text>

          <rect x="710" y="165" width="155" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="788" y="189" textAnchor="middle" fill="#111">Vanilla</text>

          <rect x="710" y="275" width="155" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="788" y="299" textAnchor="middle" fill="#111">Caramel</text>

          {/* RIGHT BUS — вертикаль x=685, y=65..415 */}
          {/* Обслуживает: wrappee (→Beverage) наверху и наследование (→CondimentDecorator) внизу */}
          <line x1="685" y1="65" x2="685" y2="415" stroke="#222" strokeWidth="1.5" />
          {/* Горизонтали от каждого блока к шине */}
          <line x1="710" y1="74"  x2="685" y2="74"  stroke="#222" strokeWidth="1.5" />
          <line x1="710" y1="184" x2="685" y2="184" stroke="#222" strokeWidth="1.5" />
          <line x1="710" y1="294" x2="685" y2="294" stroke="#222" strokeWidth="1.5" />

          {/* WRAPPEE AGGREGATION: CondimentDecorator ◇── Beverage */}
          {/* Пустой ромб ◇ на правом краю CondimentDecorator, y=363 */}
          <path d="M540,363 L553,356 L566,363 L553,370 Z" fill="#fff" stroke="#222" strokeWidth="1.5" />
          {/* Горизонталь от ромба до правой шины */}
          <line x1="566" y1="363" x2="685" y2="363" stroke="#222" strokeWidth="1.5" />
          {/* Шина уже идёт до y=65, там горизонталь к Beverage right */}
          <line x1="685" y1="65" x2="540" y2="65" stroke="#222" strokeWidth="1.5" markerEnd="url(#openArrow)" />
          {/* Метка wrappee */}
          <text x="572" y="355" fontSize="11" fill="#333">wrappee</text>

          {/* INHERITANCE Soy/Vanilla/Caramel → CondimentDecorator */}
          {/* Горизонталь от шины к правому краю CondimentDecorator, y=415 */}
          <line x1="685" y1="415" x2="554" y2="415" stroke="#222" strokeWidth="1.5" />
          {/* Пустой треугольник — apex at CondimentDecorator right (540,415) */}
          <polygon points="540,415 554,408 554,422" fill="#fff" stroke="#222" strokeWidth="1.5" />

          {/* ════════════════════════════════════
              BOTTOM ROW — Milk, Mocha, Whip
              ════════════════════════════════════ */}
          <rect x="188" y="496" width="150" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="263" y="520" textAnchor="middle" fill="#111">Milk</text>

          <rect x="358" y="496" width="150" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="433" y="520" textAnchor="middle" fill="#111">Mocha</text>

          <rect x="528" y="496" width="150" height="38" fill="#fff" stroke="#222" strokeWidth="1.5" />
          <text x="603" y="520" textAnchor="middle" fill="#111">Whip</text>

          {/* BOTTOM BUS — горизонталь y=483, x=263..603 */}
          <line x1="263" y1="483" x2="603" y2="483" stroke="#222" strokeWidth="1.5" />
          {/* Вертикали от каждого блока вверх к шине */}
          <line x1="263" y1="496" x2="263" y2="483" stroke="#222" strokeWidth="1.5" />
          <line x1="433" y1="496" x2="433" y2="483" stroke="#222" strokeWidth="1.5" />
          <line x1="603" y1="496" x2="603" y2="483" stroke="#222" strokeWidth="1.5" />
          {/* Ствол от середины шины к CondimentDecorator bottom */}
          <line x1="401" y1="483" x2="401" y2="472" stroke="#222" strokeWidth="1.5" />
          {/* Пустой треугольник — apex at CondimentDecorator bottom (401,470) */}
          <polygon points="401,470 393,484 409,484" fill="#fff" stroke="#222" strokeWidth="1.5" />

          <defs>
            {/* Обычная стрелка (solid) для wrappee-ассоциации */}
            <marker id="openArrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#222" />
            </marker>
          </defs>
        </svg>
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
