import CodeBlock from '../components/CodeBlock';

export default function SectionCode2() {
  return (
    <section className="sh">
      <div className="sh-num">04</div>
      <h1 className="sh-title">Код — с паттерном Decorator</h1>
      <p className="sh-sub">
        Чистая иерархия: Component → Decorator → ConcreteDecorators
      </p>

      <CodeBlock filename="Beverage.h — ① Component">
{`<span class="kw">#pragma once</span>
<span class="kw">#include</span> <span class="str">&lt;string&gt;</span>
<span class="kw">#include</span> <span class="str">&lt;memory&gt;</span>

<span class="cm">// ① Component — базовый интерфейс напитка</span>
<span class="kw">class</span> <span class="tp">Beverage</span> {
<span class="kw">public</span>:
    <span class="kw">virtual</span> ~<span class="fn">Beverage</span>() = <span class="kw">default</span>;
    <span class="kw">virtual</span> <span class="tp">std::string</span> <span class="fn">getDescription</span>() <span class="kw">const</span> = <span class="num">0</span>;
    <span class="kw">virtual</span> <span class="tp">double</span>      <span class="fn">getCost</span>()        <span class="kw">const</span> = <span class="num">0</span>;
};`}
      </CodeBlock>

      <CodeBlock filename="ConcreteComponents.h — ② ConcreteComponent">
{`<span class="cm">// ② ConcreteComponent — конкретные напитки</span>

<span class="kw">class</span> <span class="tp">Espresso</span> : <span class="kw">public</span> <span class="tp">Beverage</span> {
<span class="kw">public</span>:
    <span class="tp">std::string</span> <span class="fn">getDescription</span>() <span class="kw">const override</span> { <span class="kw">return</span> <span class="str">"Эспрессо"</span>; }
    <span class="tp">double</span>      <span class="fn">getCost</span>()        <span class="kw">const override</span> { <span class="kw">return</span> <span class="num">1.99</span>; }
};

<span class="kw">class</span> <span class="tp">HouseBlend</span> : <span class="kw">public</span> <span class="tp">Beverage</span> {
<span class="kw">public</span>:
    <span class="tp">std::string</span> <span class="fn">getDescription</span>() <span class="kw">const override</span> { <span class="kw">return</span> <span class="str">"Домашняя смесь"</span>; }
    <span class="tp">double</span>      <span class="fn">getCost</span>()        <span class="kw">const override</span> { <span class="kw">return</span> <span class="num">0.89</span>; }
};

<span class="kw">class</span> <span class="tp">DarkRoast</span> : <span class="kw">public</span> <span class="tp">Beverage</span> { <span class="cm">/* ... cost = 1.05 */</span> };
<span class="kw">class</span> <span class="tp">GreenTea</span>  : <span class="kw">public</span> <span class="tp">Beverage</span> { <span class="cm">/* ... cost = 0.99 */</span> };`}
      </CodeBlock>

      <CodeBlock filename="CondimentDecorator.h — ③ Decorator">
{`<span class="kw">#pragma once</span>
<span class="kw">#include</span> <span class="str">"Beverage.h"</span>
<span class="kw">#include</span> <span class="str">&lt;memory&gt;</span>

<span class="cm">// ③ Decorator — базовый декоратор, хранит ссылку на Component</span>
<span class="kw">class</span> <span class="tp">CondimentDecorator</span> : <span class="kw">public</span> <span class="tp">Beverage</span> {
<span class="kw">protected</span>:
    <span class="tp">std::unique_ptr</span>&lt;<span class="tp">Beverage</span>&gt; beverage_;
<span class="kw">public</span>:
    <span class="kw">explicit</span> <span class="fn">CondimentDecorator</span>(<span class="tp">std::unique_ptr</span>&lt;<span class="tp">Beverage</span>&gt; b)
        : beverage_(<span class="fn">std::move</span>(b)) {}
};`}
      </CodeBlock>

      <CodeBlock filename="ConcreteDecorators.h — ④ ConcreteDecorators">
{`<span class="cm">// ④ ConcreteDecorator — конкретные добавки-декораторы</span>

<span class="kw">class</span> <span class="tp">Milk</span> : <span class="kw">public</span> <span class="tp">CondimentDecorator</span> {
<span class="kw">public</span>:
    <span class="kw">using</span> <span class="tp">CondimentDecorator</span>::<span class="fn">CondimentDecorator</span>;
    <span class="tp">std::string</span> <span class="fn">getDescription</span>() <span class="kw">const override</span> {
        <span class="kw">return</span> beverage_-&gt;<span class="fn">getDescription</span>() + <span class="str">" + Молоко"</span>;
    }
    <span class="tp">double</span> <span class="fn">getCost</span>() <span class="kw">const override</span> {
        <span class="kw">return</span> beverage_-&gt;<span class="fn">getCost</span>() + <span class="num">0.30</span>;
    }
};

<span class="kw">class</span> <span class="tp">Mocha</span> : <span class="kw">public</span> <span class="tp">CondimentDecorator</span> {
<span class="kw">public</span>:
    <span class="kw">using</span> <span class="tp">CondimentDecorator</span>::<span class="fn">CondimentDecorator</span>;
    <span class="tp">std::string</span> <span class="fn">getDescription</span>() <span class="kw">const override</span> {
        <span class="kw">return</span> beverage_-&gt;<span class="fn">getDescription</span>() + <span class="str">" + Мокко"</span>;
    }
    <span class="tp">double</span> <span class="fn">getCost</span>() <span class="kw">const override</span> {
        <span class="kw">return</span> beverage_-&gt;<span class="fn">getCost</span>() + <span class="num">0.50</span>;
    }
};

<span class="cm">// Whip (+0.40), Caramel (+0.45), Vanilla (+0.35), Soy (+0.25)</span>
<span class="cm">// — аналогичная структура для каждого</span>`}
      </CodeBlock>

      <CodeBlock filename="main.cpp — ⑤ Client (HTTP-обработчик)">
{`<span class="cm">// Фабрика базовых напитков</span>
<span class="kw">static const</span> <span class="tp">std::unordered_map</span>&lt;<span class="tp">std::string</span>, <span class="tp">BeverageFactory</span>&gt; beverageFactories = {
    {<span class="str">"Espresso"</span>,   [] { <span class="kw">return</span> <span class="fn">std::make_unique</span>&lt;<span class="tp">Espresso</span>&gt;(); }},
    {<span class="str">"HouseBlend"</span>, [] { <span class="kw">return</span> <span class="fn">std::make_unique</span>&lt;<span class="tp">HouseBlend</span>&gt;(); }},
    <span class="cm">// ...</span>
};

<span class="cm">// Фабрика добавок-декораторов</span>
<span class="kw">static const</span> <span class="tp">std::unordered_map</span>&lt;<span class="tp">std::string</span>, <span class="tp">DecoratorFactory</span>&gt; condimentFactories = {
    {<span class="str">"Milk"</span>,    [](<span class="kw">auto</span> b) { <span class="kw">return</span> <span class="fn">std::make_unique</span>&lt;<span class="tp">Milk</span>&gt;(<span class="fn">std::move</span>(b)); }},
    {<span class="str">"Mocha"</span>,   [](<span class="kw">auto</span> b) { <span class="kw">return</span> <span class="fn">std::make_unique</span>&lt;<span class="tp">Mocha</span>&gt;(<span class="fn">std::move</span>(b)); }},
    <span class="cm">// ...</span>
};

<span class="cm">// POST /api/order — собираем цепочку декораторов</span>
svr.<span class="fn">Post</span>(<span class="str">"/api/order"</span>, [&](<span class="kw">const</span> Request& req, Response& res) {

    <span class="cm">// ① Создаём ConcreteComponent</span>
    <span class="tp">std::unique_ptr</span>&lt;<span class="tp">Beverage</span>&gt; drink = it-&gt;<span class="fn">second</span>();

    <span class="cm">// ② Последовательно оборачиваем декораторами</span>
    <span class="kw">for</span> (<span class="kw">const auto</span>& c : body[<span class="str">"condiments"</span>]) {
        drink = condimentFactories[c](<span class="fn">std::move</span>(drink));
    }

    <span class="cm">// ③ Полиморфный вызов по всей цепочке</span>
    json result = {
        {<span class="str">"description"</span>, drink-&gt;<span class="fn">getDescription</span>()},
        {<span class="str">"cost"</span>,        drink-&gt;<span class="fn">getCost</span>()}
    };
});`}
      </CodeBlock>

      <div className="box-g">
        <strong>Результат:</strong> добавление новой добавки (например, «Корица»)
        — это создание одного нового класса <code>Cinnamon : CondimentDecorator</code>
        и одна строка в map фабрики. <b>Ноль изменений</b> в существующих классах!
      </div>
    </section>
  );
}
