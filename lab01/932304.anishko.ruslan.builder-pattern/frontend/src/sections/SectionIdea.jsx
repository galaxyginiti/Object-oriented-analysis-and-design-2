export default function SectionIdea() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Раздел 01</div>
        <div className="sh-title">Идея проекта и описание проблемы</div>
        <div className="sh-sub">CV Builder — React-приложение для пошаговой сборки резюме разных типов (бэкенд на C#)</div>
      </div>

      <div className="block">
        <h3>Предметная область</h3>
        <p>«CV Builder» — веб-приложение (React + Vite + Mantine) c бэкендом на C# (ASP.NET Core Web API), позволяющее создавать профессиональные резюме. Resume — сложный составной объект: личная информация, опыт работы, образование, навыки, проекты, языки, ссылки. Разные типы резюме (IT-специалист, дизайнер, менеджер) требуют разного набора секций и специфических настроек по умолчанию.</p>
        <p>Вместо WinForms интерфейс реализован на <strong>React 18 + Mantine 7 + Vite</strong>. Вся логика паттерна Builder остаётся в C# на сервере.</p>
      </div>

      <div className="block">
        <h3>Описание проблемы</h3>
        <div className="box-r">
          <p><strong>Без паттерна:</strong> создание Resume реализуется через конструктор с 13+ параметрами (телескопический конструктор) или набор сеттеров. Это приводит к дублированию, мутабельности и жёсткой связности.</p>
        </div>
        <p><strong>1. Телескопический конструктор</strong> — 13 параметров, большинство null, легко перепутать порядок.</p>
        <p><strong>2. Дублирование</strong> — методы CreateITResume(), CreateDesignResume() на 80% идентичны.</p>
        <p><strong>3. Мутабельность</strong> — Resume изменяем через сеттеры, нет гарантии целостности.</p>
        <p><strong>4. Жёсткая связность</strong> — GUI напрямую конструирует Resume, знает все его поля.</p>
      </div>

      <div className="block">
        <h3>Решение: паттерн Builder (Строитель)</h3>
        <div className="box-g">
          <p><strong>Builder</strong> отделяет конструирование сложного объекта от его представления, позволяя одному процессу создавать различные представления. (GoF)</p>
        </div>
        <p><strong>Почему Builder подходит идеально:</strong></p>
        <p>• Resume — сложный объект с опциональными частями → Builder собирает по шагам, вызывая только нужные методы.</p>
        <p>• Разные шаблоны (IT / Design / Manager) → каждый ConcreteBuilder добавляет свои навыки и ссылки по умолчанию.</p>
        <p>• Director инкапсулирует «рецепты» сборки (минимальное / полное резюме) → GUI не знает деталей.</p>
        <p>• Product иммутабелен после GetResult() → readonly-поля, нет сеттеров.</p>
      </div>

      <div className="block">
        <h3>Участники паттерна (GoF)</h3>
        <div className="box-b">
          <p><strong>1. Builder (интерфейс)</strong> → IResumeBuilder — шаги: SetPersonalInfo, AddExperience, AddEducation, AddSkills, AddProject, SetLinks</p>
          <p><strong>2. ConcreteBuilder</strong> → ITResumeBuilder, DesignResumeBuilder, ManagerResumeBuilder — каждый добавляет свою специфику</p>
          <p><strong>3. Director</strong> → ResumeDirector — управляет порядком вызовов (BuildMinimal, BuildFull)</p>
          <p><strong>4. Product</strong> → Resume — иммутабельный результат с readonly-полями</p>
          <p><strong>5. Client</strong> → React-компонент CVBuilderForm (вместо WinForms MainForm) — связывает Builder с Director через REST API</p>
        </div>
      </div>
    </>
  )
}
