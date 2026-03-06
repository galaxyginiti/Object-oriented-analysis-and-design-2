export default function SectionUml2() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Раздел 02</div>
        <div className="sh-title">UML-диаграмма с паттерном Builder</div>
        <div className="sh-sub">Диаграмма классов — GoF: Builder (draw.io)</div>
      </div>

      <div className="uml-wrap">
        <div className="uml-label">📐 Рисунок 1 — Диаграмма классов паттерна Builder</div>
        <img
          src="/builder.drawio.png"
          alt="UML-диаграмма классов паттерна Builder — CVBuilder.Api"
          style={{
            width: '100%',
            maxWidth: 900,
            display: 'block',
            margin: '1rem auto',
            borderRadius: 8,
            border: '1px solid #ddd',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
          }}
        />
      </div>

      <div className="block">
        <h3>Описание диаграммы (Рисунок 1)</h3>
        <p>
          На Рисунке 1 представлена UML-диаграмма классов приложения CVBuilder.Api,
          реализующего порождающий паттерн <strong>Builder</strong> (GoF).
        </p>

        <h4>Участники паттерна</h4>
        <ul>
          <li><strong>IResumeBuilder</strong> (Builder) — интерфейс, объявляющий 10 шагов конструирования: Reset, SetPersonalInfo, SetSummary, AddExperience, AddEducation, AddSkills, AddProject, AddLanguage, SetLinks, GetResult.</li>
          <li><strong>ITResumeBuilder</strong> (ConcreteBuilder) — реализация для IT-специалистов. Авто-добавляет навыки Git и Linux; устанавливает GitHub URL по умолчанию.</li>
          <li><strong>DesignResumeBuilder</strong> (ConcreteBuilder) — реализация для дизайнеров. Авто-добавляет Figma и Adobe CC; устанавливает Portfolio URL по умолчанию.</li>
          <li><strong>ManagerResumeBuilder</strong> (ConcreteBuilder) — реализация для менеджеров. Авто-добавляет Leadership и Agile/Scrum; устанавливает LinkedIn URL по умолчанию.</li>
          <li><strong>ResumeDirector</strong> (Director) — управляет порядком вызова шагов. Два рецепта: BuildMinimalResume и BuildFullResume.</li>
          <li><strong>Resume</strong> (Product) — иммутабельный результат. 12 readonly-свойств, internal конструктор.</li>
          <li><strong>CVBuilderForm / ResumeController</strong> (Client) — HTTP API клиент, выбирает конкретный Builder по шаблону через Dictionary.</li>
        </ul>

        <h4>Связи</h4>
        <ul>
          <li><strong>ResumeController → ResumeDirector</strong> — ассоциация (хранит поле _director)</li>
          <li><strong>ResumeController ··→ IResumeBuilder</strong> — зависимость (Dictionary _builders)</li>
          <li><strong>ResumeDirector → IResumeBuilder</strong> — ассоциация (поле _builder, setter)</li>
          <li><strong>IT / Design / Manager ResumeBuilder ··▷ IResumeBuilder</strong> — реализация интерфейса (dashed + hollow triangle)</li>
          <li><strong>Builders ··→ Resume</strong> — зависимость «create» (new Resume(...) в GetResult())</li>
          <li><strong>Resume ◆→ Experience, Education, Project, Language</strong> — композиция (IReadOnlyList свойства)</li>
        </ul>
      </div>
    </>
  )
}
