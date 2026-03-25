import CodeBlock from '../components/CodeBlock';

export default function SectionCode1() {
  return (
    <section className="sh">
      <div className="sh-num">04</div>
      <h1 className="sh-title">Код — без паттерна</h1>
      <p className="sh-sub">
        Монолитная структура: один класс с булевыми флагами и if-else цепочками
      </p>

      <CodeBlock filename="main.cpp — Beverage struct">
{`<span class="cm">// ⚠ Все добавки хранятся как булевы поля в базовом классе</span>
<span class="kw">struct</span> <span class="tp">Beverage</span> {
    <span class="tp">std::string</span> baseName;
    <span class="tp">double</span>      baseCost = <span class="num">0.0</span>;

    <span class="tp">bool</span> hasMilk    = <span class="kw">false</span>;   <span class="cm">// +0.30</span>
    <span class="tp">bool</span> hasMocha   = <span class="kw">false</span>;   <span class="cm">// +0.50</span>
    <span class="tp">bool</span> hasWhip    = <span class="kw">false</span>;   <span class="cm">// +0.40</span>
    <span class="tp">bool</span> hasCaramel = <span class="kw">false</span>;   <span class="cm">// +0.45</span>
    <span class="tp">bool</span> hasVanilla = <span class="kw">false</span>;   <span class="cm">// +0.35</span>
    <span class="tp">bool</span> hasSoy     = <span class="kw">false</span>;   <span class="cm">// +0.25</span>
    <span class="cm">// ⚠ Хотим добавить "Корицу"? Нужно добавить ещё одно поле</span>
    <span class="cm">//    и изменить getCost() и getDescription() ниже</span>

    <span class="cm">// ⚠ Огромная функция — растёт с каждой новой добавкой</span>
    <span class="tp">double</span> <span class="fn">getCost</span>() <span class="kw">const</span> {
        <span class="tp">double</span> total = baseCost;
        <span class="kw">if</span> (hasMilk)    total += <span class="num">0.30</span>;  <span class="cm">// ⚠</span>
        <span class="kw">if</span> (hasMocha)   total += <span class="num">0.50</span>;  <span class="cm">// ⚠</span>
        <span class="kw">if</span> (hasWhip)    total += <span class="num">0.40</span>;  <span class="cm">// ⚠</span>
        <span class="kw">if</span> (hasCaramel) total += <span class="num">0.45</span>;  <span class="cm">// ⚠</span>
        <span class="kw">if</span> (hasVanilla) total += <span class="num">0.35</span>;  <span class="cm">// ⚠</span>
        <span class="kw">if</span> (hasSoy)     total += <span class="num">0.25</span>;  <span class="cm">// ⚠</span>
        <span class="kw">return</span> total;
    }

    <span class="cm">// ⚠ Дублирование логики — та же структура что и getCost()</span>
    <span class="tp">std::string</span> <span class="fn">getDescription</span>() <span class="kw">const</span> {
        <span class="tp">std::string</span> desc = baseName;
        <span class="kw">if</span> (hasMilk)    desc += <span class="str">" + Молоко"</span>;
        <span class="kw">if</span> (hasMocha)   desc += <span class="str">" + Мокко"</span>;
        <span class="kw">if</span> (hasWhip)    desc += <span class="str">" + Сливки"</span>;
        <span class="kw">if</span> (hasCaramel) desc += <span class="str">" + Карамель"</span>;
        <span class="kw">if</span> (hasVanilla) desc += <span class="str">" + Ваниль"</span>;
        <span class="kw">if</span> (hasSoy)     desc += <span class="str">" + Соя"</span>;
        <span class="kw">return</span> desc;
    }
};`}
      </CodeBlock>

      <CodeBlock filename="main.cpp — Фабричные функции">
{`<span class="cm">// ⚠ Фабричная функция с жёстко закодированными типами</span>
<span class="tp">Beverage</span> <span class="fn">createBeverage</span>(<span class="kw">const</span> <span class="tp">std::string</span>& id) {
    <span class="tp">Beverage</span> b;
    <span class="kw">if</span>      (id == <span class="str">"Espresso"</span>)   { b.baseName = <span class="str">"Эспрессо"</span>;      b.baseCost = <span class="num">1.99</span>; }
    <span class="kw">else if</span> (id == <span class="str">"HouseBlend"</span>) { b.baseName = <span class="str">"Домашняя смесь"</span>; b.baseCost = <span class="num">0.89</span>; }
    <span class="kw">else if</span> (id == <span class="str">"DarkRoast"</span>)  { b.baseName = <span class="str">"Тёмная обжарка"</span>; b.baseCost = <span class="num">1.05</span>; }
    <span class="kw">else if</span> (id == <span class="str">"GreenTea"</span>)   { b.baseName = <span class="str">"Зелёный чай"</span>;   b.baseCost = <span class="num">0.99</span>; }
    <span class="kw">return</span> b;
}

<span class="cm">// ⚠ Добавление добавки — ещё одна if-else цепочка</span>
<span class="kw">void</span> <span class="fn">applyCondiment</span>(<span class="tp">Beverage</span>& b, <span class="kw">const</span> <span class="tp">std::string</span>& id) {
    <span class="kw">if</span>      (id == <span class="str">"Milk"</span>)    b.hasMilk    = <span class="kw">true</span>;
    <span class="kw">else if</span> (id == <span class="str">"Mocha"</span>)   b.hasMocha   = <span class="kw">true</span>;
    <span class="kw">else if</span> (id == <span class="str">"Whip"</span>)    b.hasWhip    = <span class="kw">true</span>;
    <span class="kw">else if</span> (id == <span class="str">"Caramel"</span>) b.hasCaramel = <span class="kw">true</span>;
    <span class="kw">else if</span> (id == <span class="str">"Vanilla"</span>) b.hasVanilla = <span class="kw">true</span>;
    <span class="kw">else if</span> (id == <span class="str">"Soy"</span>)     b.hasSoy     = <span class="kw">true</span>;
    <span class="cm">// ⚠ Новая добавка → ещё один else-if</span>
}

<span class="cm">// ⚠ Готовые комбо — всё жёстко захардкожено</span>
<span class="tp">Beverage</span> <span class="fn">createCombo</span>(<span class="kw">const</span> <span class="tp">std::string</span>& combo) {
    <span class="kw">if</span> (combo == <span class="str">"MochaCappuccino"</span>) {
        <span class="tp">Beverage</span> b = <span class="fn">createBeverage</span>(<span class="str">"Espresso"</span>);
        b.hasMilk = <span class="kw">true</span>; b.hasMocha = <span class="kw">true</span>; b.hasWhip = <span class="kw">true</span>;
        <span class="kw">return</span> b;
    }
    <span class="cm">// ... ещё N комбо ...</span>
}`}
      </CodeBlock>

      <div className="box-r">
        <strong>Итого проблемы:</strong>
        <ul style={{ margin: '.5rem 0 0', paddingLeft: '1.25rem' }}>
          <li>6 булевых полей → при 20 добавках будет 20 полей</li>
          <li><code>getCost()</code> и <code>getDescription()</code> дублируют структуру</li>
          <li>Невозможно заказать «двойной мокко» (только один bool на добавку)</li>
          <li>Добавление «Корицы» → менять <b>Beverage</b>, <b>getCost()</b>, <b>getDescription()</b>, <b>applyCondiment()</b></li>
          <li>Комбо — жёстко захардкожены, не расширяемы</li>
        </ul>
      </div>
    </section>
  );
}
