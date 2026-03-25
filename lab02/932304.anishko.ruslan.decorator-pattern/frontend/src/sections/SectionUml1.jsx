export default function SectionUml1() {
  return (
    <section className="sh">
      <div className="sh-num">02</div>
      <h1 className="sh-title">UML — без паттерна</h1>
      <p className="sh-sub">
        Один монолитный класс Beverage с булевыми флагами для каждой добавки
      </p>

      <div className="uml-wrap">
        <svg viewBox="0 0 820 520" width="820" xmlns="http://www.w3.org/2000/svg" fontFamily="Inter, system-ui, sans-serif">
          {/* Beverage class */}
          <rect x="240" y="20" width="340" height="310" rx="8" fill="#fff" stroke="#e53935" strokeWidth="2" />
          <rect x="240" y="20" width="340" height="36" rx="8" fill="#ffcdd2" stroke="#e53935" strokeWidth="2" />
          <text x="410" y="44" textAnchor="middle" fontWeight="700" fontSize="14" fill="#b71c1c">Beverage</text>

          {/* Fields */}
          <text x="256" y="76" fontSize="12" fill="#333">- baseName: string</text>
          <text x="256" y="94" fontSize="12" fill="#333">- baseCost: double</text>
          <line x1="256" y1="102" x2="564" y2="102" stroke="#e0e0e0" />
          <text x="256" y="120" fontSize="12" fill="#e53935" fontWeight="600">⚠ Флаги добавок:</text>
          <text x="256" y="138" fontSize="12" fill="#c62828">- hasMilk: bool</text>
          <text x="256" y="156" fontSize="12" fill="#c62828">- hasMocha: bool</text>
          <text x="256" y="174" fontSize="12" fill="#c62828">- hasWhip: bool</text>
          <text x="256" y="192" fontSize="12" fill="#c62828">- hasCaramel: bool</text>
          <text x="256" y="210" fontSize="12" fill="#c62828">- hasVanilla: bool</text>
          <text x="256" y="228" fontSize="12" fill="#c62828">- hasSoy: bool</text>
          <text x="256" y="246" fontSize="12" fill="#999" fontStyle="italic">  // + новое поле для каждой добавки…</text>

          <line x1="256" y1="254" x2="564" y2="254" stroke="#e0e0e0" />
          {/* Methods */}
          <text x="256" y="274" fontSize="12" fill="#333">+ getCost(): double    <tspan fill="#e53935">⚠ огромный if-else</tspan></text>
          <text x="256" y="294" fontSize="12" fill="#333">+ getDescription(): string <tspan fill="#e53935">⚠ дублирование</tspan></text>
          <text x="256" y="314" fontSize="12" fill="#333">+ applyCondiment(id): void</text>

          {/* Hardcoded combos */}
          <rect x="20" y="380" width="240" height="120" rx="8" fill="#fff" stroke="#e53935" strokeWidth="1.5" strokeDasharray="6 3" />
          <rect x="20" y="380" width="240" height="30" rx="8" fill="#ffcdd2" stroke="#e53935" strokeWidth="1.5" strokeDasharray="6 3" />
          <text x="140" y="400" textAnchor="middle" fontWeight="600" fontSize="12" fill="#b71c1c">⚠ Hardcoded Combos</text>
          <text x="34" y="424" fontSize="11" fill="#c62828">createCombo("MochaCappuccino")</text>
          <text x="34" y="442" fontSize="11" fill="#c62828">createCombo("VanillaLatte")</text>
          <text x="34" y="460" fontSize="11" fill="#c62828">createCombo("CaramelMacchiato")</text>
          <text x="34" y="480" fontSize="11" fill="#999">// N напитков × M добавок = N×M комбо</text>

          {/* Client */}
          <rect x="560" y="380" width="240" height="120" rx="8" fill="#fff" stroke="#78909c" strokeWidth="1.5" />
          <rect x="560" y="380" width="240" height="30" rx="8" fill="#eceff1" stroke="#78909c" strokeWidth="1.5" />
          <text x="680" y="400" textAnchor="middle" fontWeight="600" fontSize="12" fill="#455a64">Client (main)</text>
          <text x="574" y="424" fontSize="11" fill="#333">b = createBeverage("Espresso")</text>
          <text x="574" y="442" fontSize="11" fill="#e53935">b.hasMilk = true   ⚠</text>
          <text x="574" y="460" fontSize="11" fill="#e53935">b.hasMocha = true  ⚠</text>
          <text x="574" y="478" fontSize="11" fill="#333">cost = b.getCost()</text>

          {/* Arrows */}
          <line x1="680" y1="380" x2="500" y2="330" stroke="#78909c" strokeWidth="1.5" markerEnd="url(#arrowGray)" />
          <line x1="140" y1="380" x2="320" y2="330" stroke="#e53935" strokeWidth="1.5" strokeDasharray="6 3" markerEnd="url(#arrowRed)" />

          {/* Problems box */}
          <rect x="280" y="370" width="240" height="140" rx="8" fill="#fff3e0" stroke="#e65100" strokeWidth="1.5" />
          <text x="400" y="392" textAnchor="middle" fontWeight="700" fontSize="13" fill="#e65100">Проблемы:</text>
          <text x="294" y="412" fontSize="11" fill="#bf360c">✗ Нарушение OCP</text>
          <text x="294" y="430" fontSize="11" fill="#bf360c">✗ God Object (всё в одном классе)</text>
          <text x="294" y="448" fontSize="11" fill="#bf360c">✗ Не расширяемо без изменений</text>
          <text x="294" y="466" fontSize="11" fill="#bf360c">✗ Нельзя добавить двойной мокко</text>
          <text x="294" y="484" fontSize="11" fill="#bf360c">✗ Комбинаторный взрыв комбо</text>

          <defs>
            <marker id="arrowGray" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#78909c" />
            </marker>
            <marker id="arrowRed" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#e53935" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="box-r">
        <strong>Главная проблема:</strong> добавление новой добавки (например, «Корица»)
        требует изменения класса <code>Beverage</code> — добавить поле <code>hasCinnamon</code>,
        изменить <code>getCost()</code>, <code>getDescription()</code> и все комбо-функции.
        Это прямое нарушение принципа открытости/закрытости (OCP).
      </div>
    </section>
  );
}
