export default function SectionEnd() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Раздел 05</div>
        <div className="sh-title">Вывод: влияние паттерна на программу</div>
        <div className="sh-sub">Сравнение до и после внедрения Builder</div>
      </div>

      <div className="cmp-grid">
        <div className="cmp bad">
          <h4>✗ Без паттерна</h4>
          <div className="cmp-i">✗ Телескопический конструктор (12 параметров)</div>
          <div className="cmp-i">✗ 3 метода Create*Resume() с 80% дублирования</div>
          <div className="cmp-i">✗ Resume мутабелен — public set на всех свойствах</div>
          <div className="cmp-i">✗ MainForm жёстко связан с деталями Resume</div>
          <div className="cmp-i">✗ Новый шаблон = новый метод + правка switch</div>
          <div className="cmp-i">✗ Нарушены SRP и OCP (SOLID)</div>
        </div>
        <div className="cmp good">
          <h4>✓ С паттерном Builder</h4>
          <div className="cmp-i">✓ Пошаговая сборка через именованные методы IResumeBuilder</div>
          <div className="cmp-i">✓ 1 метод OnSubmit() — полиморфизм через интерфейс</div>
          <div className="cmp-i">✓ Resume иммутабелен (readonly + AsReadOnly())</div>
          <div className="cmp-i">✓ React-форма → Director → Builder (слабая связность)</div>
          <div className="cmp-i">✓ Новый шаблон = новый класс Builder (OCP)</div>
          <div className="cmp-i">✓ Каждый Builder — единственная ответственность (SRP)</div>
        </div>
      </div>

      <div className="block">
        <h3>Итоговый вывод</h3>
        <div className="box-g">
          <p><strong>1. Ликвидация телескопического конструктора.</strong> Вместо <code>new Resume(12 параметров)</code> объект собирается пошагово: SetPersonalInfo(), AddSkills(), SetLinks() — каждый шаг самодокументирован.</p>
          <p><strong>2. Устранение дублирования.</strong> Три метода CreateITResume / CreateDesignResume / CreateManagerResume заменены одним вызовом Director.BuildFullResume() + подстановкой Builder'а через полиморфизм.</p>
          <p><strong>3. Иммутабельность продукта.</strong> Resume после GetResult() невозможно изменить: все свойства readonly, списки обёрнуты в AsReadOnly(). Конструктор internal — только Builder имеет доступ.</p>
          <p><strong>4. Open/Closed Principle.</strong> Для добавления нового типа (например, FreelancerResumeBuilder) достаточно создать класс, реализующий IResumeBuilder. Ни один существующий класс не меняется.</p>
          <p><strong>5. WinForms → React + Mantine.</strong> Клиентский слой перенесён на современный веб-стек (React 18, Vite, Mantine 7). C#-логика паттерна Builder полностью сохранена в ASP.NET Core Web API.</p>
        </div>
        <p>Паттерн Builder применён каноническим образом по GoF: интерфейс (IResumeBuilder), конкретные строители, Director для управления порядком, иммутабельный Product. Это стандартное и очевидное применение, раскрывающее основную идею паттерна для сложных составных объектов.</p>
      </div>
    </>
  )
}
