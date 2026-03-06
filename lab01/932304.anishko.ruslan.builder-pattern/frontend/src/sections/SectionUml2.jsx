export default function SectionUml2() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Раздел 03</div>
        <div className="sh-title">UML-диаграмма с паттерном Builder</div>
        <div className="sh-sub">Диаграмма классов в стиле draw.io — GoF: Builder</div>
      </div>

      <div className="uml-wrap">
        <div className="uml-label">📐 Диаграмма классов — С паттерном Builder</div>
        <svg className="uml-svg" viewBox="0 0 1100 850" xmlns="http://www.w3.org/2000/svg" fontFamily="'Inter',Arial,sans-serif">
          <defs>
            <marker id="dep2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="none" stroke="#666" strokeWidth="1.2"/></marker>
            <marker id="inh2" markerWidth="16" markerHeight="12" refX="15" refY="6" orient="auto"><polygon points="0 0,16 6,0 12" fill="#fff" stroke="#666" strokeWidth="1.5"/></marker>
            <marker id="arr2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#666"/></marker>
          </defs>
          <rect width="1100" height="850" fill="#fff" rx="8"/>
          {/* IResumeBuilder interface */}
          <rect x="645" y="20" width="345" height="255" rx="6" fill="#fff" stroke="#82b366" strokeWidth="2"/>
          <rect x="645" y="20" width="345" height="34" rx="6" fill="#d5e8d4" stroke="#82b366" strokeWidth="2"/>
          <text x="817" y="31" textAnchor="middle" fill="#2d6a2d" fontSize="9" fontStyle="italic">«interface»</text>
          <text x="817" y="46" textAnchor="middle" fill="#2d6a2d" fontSize="13" fontWeight="bold">IResumeBuilder</text>
          <line x1="653" y1="62" x2="982" y2="62" stroke="#82b366" strokeWidth="0.8"/>
          <text x="657" y="78" fill="#333" fontSize="10">+ Reset() : void</text>
          <text x="657" y="94" fill="#333" fontSize="10">+ SetPersonalInfo(name, email, phone : string) : void</text>
          <text x="657" y="110" fill="#333" fontSize="10">+ SetSummary(text : string) : void</text>
          <text x="657" y="126" fill="#333" fontSize="10">+ AddExperience(exp : Experience) : void</text>
          <text x="657" y="142" fill="#333" fontSize="10">+ AddEducation(edu : Education) : void</text>
          <text x="657" y="158" fill="#333" fontSize="10">+ AddSkills(skills : string[*]) : void</text>
          <text x="657" y="174" fill="#333" fontSize="10">+ AddProject(proj : Project) : void</text>
          <text x="657" y="190" fill="#333" fontSize="10">+ AddLanguage(lang : Language) : void</text>
          <text x="657" y="206" fill="#333" fontSize="10">+ SetLinks(github, portfolio, linkedin : string) : void</text>
          <text x="657" y="222" fill="#333" fontSize="10">+ GetResult() : Resume</text>

          <circle cx="643" cy="20" r="10" fill="#4472c4"/><text x="643" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">1</text>
          {/* ResumeDirector */}
          <rect x="320" y="20" width="265" height="160" rx="6" fill="#fff" stroke="#9673a6" strokeWidth="2"/>
          <rect x="320" y="20" width="265" height="32" rx="6" fill="#e1d5e7" stroke="#9673a6" strokeWidth="2"/>
          <text x="452" y="41" textAnchor="middle" fill="#4a235a" fontSize="13" fontWeight="bold">ResumeDirector</text>
          <text x="332" y="68" fill="#333" fontSize="10">- _builder : IResumeBuilder</text>
          <line x1="328" y1="76" x2="577" y2="76" stroke="#9673a6" strokeWidth="0.8"/>
          <text x="332" y="93" fill="#333" fontSize="10">+ Builder {"{ set; }"} : IResumeBuilder</text>
          <text x="332" y="109" fill="#333" fontSize="10">+ BuildMinimalResume(name, email, phone,</text>
          <text x="348" y="137" fill="#333" fontSize="9.5">    skills : string[*]) : void</text>
          <text x="332" y="139" fill="#333" fontSize="10">+ BuildFullResume(name, email, phone,</text>
          <text x="348" y="152" fill="#333" fontSize="9.5">    summary, exps, edus, skills, ...) : void</text>

          <circle cx="318" cy="20" r="10" fill="#9673a6"/><text x="318" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">4</text>
          {/* MainForm / Client */}
          <rect x="15" y="20" width="250" height="130" rx="6" fill="#fff" stroke="#d6b656" strokeWidth="2"/>
          <rect x="15" y="20" width="250" height="32" rx="6" fill="#fff2cc" stroke="#d6b656" strokeWidth="2"/>
          <text x="140" y="41" textAnchor="middle" fill="#7f6000" fontSize="13" fontWeight="bold">CVBuilderForm</text>
          <text x="27" y="68" fill="#333" fontSize="10">- director : ResumeDirector</text>
          <text x="27" y="84" fill="#333" fontSize="9.5">- builders : Dict&lt;string, IResumeBuilder&gt;</text>
          <text x="27" y="100" fill="#555" fontSize="9.5">- form state (React hooks)</text>
          <text x="27" y="114" fill="#555" fontSize="9.5">- template : string (IT/Design/Manager)</text>
          <line x1="23" y1="122" x2="257" y2="122" stroke="#d6b656" strokeWidth="0.8"/>
          <text x="27" y="138" fill="#333" fontSize="10">+ handleSubmit() : void</text>
          <circle cx="13" cy="20" r="10" fill="#d6b656"/><text x="13" y="24" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">5</text>
          {/* ConcreteBuilders */}
          <rect x="15" y="310" width="280" height="185" rx="6" fill="#fff" stroke="#4472c4" strokeWidth="2"/>
          <rect x="15" y="310" width="280" height="32" rx="6" fill="#dae8fc" stroke="#4472c4" strokeWidth="2"/>
          <text x="155" y="331" textAnchor="middle" fill="#1a3b6b" fontSize="12" fontWeight="bold">ITResumeBuilder</text>
          <text x="27" y="358" fill="#333" fontSize="9.5">- _name, _email, _phone, _summary : string</text>
          <text x="27" y="372" fill="#555" fontSize="9">- _exps : Experience[*]</text>
          <text x="27" y="385" fill="#555" fontSize="9">- _skills : string[*] ;  _projs, _edus, _langs</text>
          <text x="27" y="398" fill="#555" fontSize="9">- _github, _portfolio, _linkedin : string</text>
          <line x1="23" y1="406" x2="287" y2="406" stroke="#4472c4" strokeWidth="0.8"/>
          <text x="27" y="421" fill="#333" fontSize="9.5">+ AddSkills(s)</text>
          <text x="27" y="436" fill="#333" fontSize="9.5">+ SetLinks(...)</text>
          <text x="27" y="451" fill="#333" fontSize="9.5">+ GetResult() : Resume</text>

          <circle cx="13" cy="310" r="10" fill="#4472c4"/><text x="13" y="314" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">2</text>
          <rect x="360" y="310" width="280" height="185" rx="6" fill="#fff" stroke="#4472c4" strokeWidth="2"/>
          <rect x="360" y="310" width="280" height="32" rx="6" fill="#dae8fc" stroke="#4472c4" strokeWidth="2"/>
          <text x="500" y="331" textAnchor="middle" fill="#1a3b6b" fontSize="12" fontWeight="bold">DesignResumeBuilder</text>
          <text x="372" y="358" fill="#333" fontSize="9.5">- _name, _email, _phone, _summary : string</text>
          <text x="372" y="372" fill="#555" fontSize="9">- _exps : Experience[*]</text>
          <text x="372" y="385" fill="#555" fontSize="9">- _skills : string[*] ;  _projs, _edus, _langs</text>
          <text x="372" y="398" fill="#555" fontSize="9">- _github, _portfolio, _linkedin : string</text>
          <line x1="368" y1="406" x2="632" y2="406" stroke="#4472c4" strokeWidth="0.8"/>
          <text x="372" y="421" fill="#333" fontSize="9.5">+ AddSkills(s)</text>
          <text x="372" y="436" fill="#333" fontSize="9.5">+ SetLinks(...)</text>
          <text x="372" y="451" fill="#333" fontSize="9.5">+ GetResult() : Resume</text>

          <rect x="705" y="310" width="285" height="185" rx="6" fill="#fff" stroke="#4472c4" strokeWidth="2"/>
          <rect x="705" y="310" width="285" height="32" rx="6" fill="#dae8fc" stroke="#4472c4" strokeWidth="2"/>
          <text x="847" y="331" textAnchor="middle" fill="#1a3b6b" fontSize="12" fontWeight="bold">ManagerResumeBuilder</text>
          <text x="717" y="358" fill="#333" fontSize="9.5">- _name, _email, _phone, _summary : string</text>
          <text x="717" y="372" fill="#555" fontSize="9">- _exps : Experience[*]</text>
          <text x="717" y="385" fill="#555" fontSize="9">- _skills : string[*] ;  _projs, _edus, _langs</text>
          <text x="717" y="398" fill="#555" fontSize="9">- _github, _portfolio, _linkedin : string</text>
          <line x1="713" y1="406" x2="982" y2="406" stroke="#4472c4" strokeWidth="0.8"/>
          <text x="717" y="421" fill="#333" fontSize="9.5">+ AddSkills(s)</text>
          <text x="717" y="436" fill="#333" fontSize="9.5">+ SetLinks(...)</text>
          <text x="717" y="451" fill="#333" fontSize="9.5">+ GetResult() : Resume</text>

          {/* Arrows */}
          <line x1="265" y1="78" x2="320" y2="78" stroke="#666" strokeWidth="1.5" markerEnd="url(#arr2)"/>
          <line x1="585" y1="93" x2="645" y2="93" stroke="#666" strokeWidth="1.5" markerEnd="url(#arr2)"/>
          <text x="591" y="86" fill="#666" fontSize="8.5" fontStyle="italic">set _builder</text>
          <line x1="155" y1="310" x2="710" y2="275" stroke="#666" strokeWidth="1.5" strokeDasharray="7,4" markerEnd="url(#inh2)"/>
          <line x1="500" y1="310" x2="820" y2="275" stroke="#666" strokeWidth="1.5" strokeDasharray="7,4" markerEnd="url(#inh2)"/>
          <line x1="847" y1="310" x2="930" y2="275" stroke="#666" strokeWidth="1.5" strokeDasharray="7,4" markerEnd="url(#inh2)"/>
          {/* Resume Product */}
          <rect x="355" y="545" width="380" height="295" rx="6" fill="#fff" stroke="#9673a6" strokeWidth="2"/>
          <rect x="355" y="545" width="380" height="34" rx="6" fill="#e1d5e7" stroke="#9673a6" strokeWidth="2"/>
          <text x="545" y="567" textAnchor="middle" fill="#4a235a" fontSize="13" fontWeight="bold">Resume</text>
          <text x="367" y="595" fill="#333" fontSize="10">+ FullName : string</text>
          <text x="367" y="611" fill="#333" fontSize="10">+ Email : string</text>
          <text x="367" y="627" fill="#333" fontSize="10">+ Phone : string</text>
          <text x="367" y="643" fill="#333" fontSize="10">+ Summary : string</text>
          <text x="367" y="659" fill="#333" fontSize="10">+ Experiences : Experience[*]</text>
          <text x="367" y="675" fill="#333" fontSize="10">+ Educations : Education[*]</text>
          <text x="367" y="691" fill="#333" fontSize="10">+ Skills : string[*]</text>
          <text x="367" y="707" fill="#333" fontSize="10">+ Projects : Project[*]</text>
          <text x="367" y="723" fill="#333" fontSize="10">+ Languages : Language[*]</text>
          <text x="367" y="739" fill="#333" fontSize="10">+ GithubUrl : string</text>
          <text x="367" y="755" fill="#333" fontSize="10">+ PortfolioUrl : string</text>
          <text x="367" y="771" fill="#333" fontSize="10">+ LinkedinUrl : string</text>
          <line x1="363" y1="780" x2="727" y2="780" stroke="#9673a6" strokeWidth="0.8"/>
          <text x="367" y="797" fill="#333" fontSize="10">~ Resume(...) «internal»</text>
          <text x="367" y="813" fill="#333" fontSize="10">+ ToString() : string</text>

          <circle cx="353" cy="545" r="10" fill="#9673a6"/><text x="353" y="549" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">3</text>
          <line x1="155" y1="495" x2="430" y2="545" stroke="#666" strokeWidth="1.3" strokeDasharray="7,4" markerEnd="url(#dep2)"/>

          <line x1="500" y1="495" x2="500" y2="545" stroke="#666" strokeWidth="1.3" strokeDasharray="7,4" markerEnd="url(#dep2)"/>
          <line x1="847" y1="495" x2="700" y2="545" stroke="#666" strokeWidth="1.3" strokeDasharray="7,4" markerEnd="url(#dep2)"/>
          {/* Benefits note */}
          <rect x="760" y="548" width="290" height="120" rx="6" fill="#e8f5e9" stroke="#43a047" strokeWidth="1.5" strokeDasharray="4,3"/>
          <text x="775" y="571" fill="#2e7d32" fontSize="11" fontWeight="bold">✓ Преимущества</text>
          <text x="775" y="589" fill="#2e7d32" fontSize="9.5">• Пошаговое конструирование</text>
          <text x="775" y="605" fill="#2e7d32" fontSize="9.5">• Resume иммутабелен (readonly)</text>
          <text x="775" y="621" fill="#2e7d32" fontSize="9.5">• Новый тип = новый Builder (OCP)</text>
          <text x="775" y="637" fill="#2e7d32" fontSize="9.5">• GUI не знает деталей сборки</text>
          <text x="775" y="653" fill="#2e7d32" fontSize="9.5">• Director переиспользует рецепты</text>
        </svg>
      </div>

      <div className="block">
        <h3>Пояснение к нумерации участников паттерна</h3>
        <p><strong>①</strong> IResumeBuilder — интерфейс, объявляет шаги конструирования, общие для всех типов строителей.</p>
        <p><strong>②</strong> ConcreteBuilders (IT / Design / Manager) — реализуют шаги со своей спецификой (навыки, ссылки по умолчанию).</p>
        <p><strong>③</strong> Resume (Product) — иммутабельный результат. Readonly-свойства, нет сеттеров.</p>
        <p><strong>④</strong> ResumeDirector — управляет порядком вызова шагов. BuildMinimal / BuildFull.</p>
        <p><strong>⑤</strong> CVBuilderForm (Client, React) — связывает Builder с Director через REST API, получает результат через builder.GetResult().</p>
      </div>
    </>
  )
}
