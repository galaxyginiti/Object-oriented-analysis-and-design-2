export default function SectionUml1() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Раздел 02</div>
        <div className="sh-title">UML-диаграмма без паттерна</div>
        <div className="sh-sub">Диаграмма классов — телескопический конструктор, дублирование</div>
      </div>

      <div className="uml-wrap">
        <div className="uml-label">📐 Диаграмма классов — БЕЗ паттерна Builder</div>
        <svg className="uml-svg" viewBox="0 0 750 430" xmlns="http://www.w3.org/2000/svg" fontFamily="'Inter',Arial,sans-serif">
          <defs>
            <marker id="ofill" markerWidth="12" markerHeight="8" refX="11" refY="4" orient="auto"><polygon points="0 4,6 0,12 4,6 8" fill="#666"/></marker>
          </defs>
          <rect width="750" height="430" fill="#fff" rx="8"/>

          {/* Resume */}
          <rect x="15" y="15" width="370" height="322" rx="6" fill="#fff" stroke="#4472c4" strokeWidth="2"/>
          <rect x="15" y="15" width="370" height="32" rx="6" fill="#dae8fc" stroke="#4472c4" strokeWidth="2"/>
          <text x="200" y="36" textAnchor="middle" fill="#1a3b6b" fontSize="13" fontWeight="bold">Resume</text>
          <text x="27" y="65" fill="#333" fontSize="10">- FullName : string</text>
          <text x="27" y="79" fill="#333" fontSize="10">- Email : string</text>
          <text x="27" y="93" fill="#333" fontSize="10">- Phone : string</text>
          <text x="27" y="107" fill="#333" fontSize="10">- Summary : string</text>
          <text x="27" y="121" fill="#333" fontSize="10">- Skills : string[*]</text>
          <text x="27" y="135" fill="#333" fontSize="10">- Languages : Language[*]</text>
          <text x="27" y="149" fill="#333" fontSize="10">- GithubUrl : string</text>
          <text x="27" y="163" fill="#333" fontSize="10">- PortfolioUrl : string</text>
          <text x="27" y="177" fill="#333" fontSize="10">- LinkedinUrl : string</text>
          <line x1="23" y1="186" x2="377" y2="186" stroke="#4472c4" strokeWidth="0.8"/>
          <text x="27" y="204" fill="#333" fontSize="10">+ Resume(fullName, email, phone, summary,</text>
          <text x="44" y="217" fill="#333" fontSize="10">experiences, educations, skills, projects,</text>
          <text x="44" y="230" fill="#333" fontSize="10">languages, github, portfolio, linkedin)</text>
          <text x="27" y="250" fill="#333" fontSize="10">+ SetFullName(name: string) : void</text>
          <text x="27" y="264" fill="#333" fontSize="10">+ SetEmail(email: string) : void</text>
          <text x="27" y="278" fill="#333" fontSize="10">+ AddExperience(exp: Experience) : void</text>
          <text x="27" y="292" fill="#333" fontSize="10">+ AddEducation(edu: Education) : void</text>
          <text x="27" y="306" fill="#666" fontSize="10" fontStyle="italic">... ещё 10+ сеттеров/геттеров ...</text>
          <text x="27" y="327" fill="#333" fontSize="10">+ ToString() : string</text>

          {/* Experience */}
          <rect x="440" y="15" width="290" height="120" rx="5" fill="#fff" stroke="#7f7f7f" strokeWidth="1.5"/>
          <rect x="440" y="15" width="290" height="24" rx="5" fill="#f2f2f2" stroke="#7f7f7f" strokeWidth="1.5"/>
          <text x="585" y="32" textAnchor="middle" fill="#333" fontSize="11" fontWeight="600">Experience</text>
          <line x1="448" y1="39" x2="722" y2="39" stroke="#7f7f7f" strokeWidth="0.8"/>
          <text x="452" y="54" fill="#555" fontSize="9.5">- Company : string</text>
          <text x="452" y="68" fill="#555" fontSize="9.5">- Position : string</text>
          <text x="452" y="82" fill="#555" fontSize="9.5">- Start : string</text>
          <text x="452" y="96" fill="#555" fontSize="9.5">- End : string</text>
          <text x="452" y="110" fill="#555" fontSize="9.5">- Desc : string</text>

          {/* Education */}
          <rect x="440" y="150" width="290" height="82" rx="5" fill="#fff" stroke="#7f7f7f" strokeWidth="1.5"/>
          <rect x="440" y="150" width="290" height="24" rx="5" fill="#f2f2f2" stroke="#7f7f7f" strokeWidth="1.5"/>
          <text x="585" y="167" textAnchor="middle" fill="#333" fontSize="11" fontWeight="600">Education</text>
          <line x1="448" y1="174" x2="722" y2="174" stroke="#7f7f7f" strokeWidth="0.8"/>
          <text x="452" y="189" fill="#555" fontSize="9.5">- Institution : string</text>
          <text x="452" y="203" fill="#555" fontSize="9.5">- Degree : string</text>
          <text x="452" y="217" fill="#555" fontSize="9.5">- Year : int</text>

          {/* Project */}
          <rect x="440" y="248" width="290" height="82" rx="5" fill="#fff" stroke="#7f7f7f" strokeWidth="1.5"/>
          <rect x="440" y="248" width="290" height="24" rx="5" fill="#f2f2f2" stroke="#7f7f7f" strokeWidth="1.5"/>
          <text x="585" y="265" textAnchor="middle" fill="#333" fontSize="11" fontWeight="600">Project</text>
          <line x1="448" y1="272" x2="722" y2="272" stroke="#7f7f7f" strokeWidth="0.8"/>
          <text x="452" y="287" fill="#555" fontSize="9.5">- Name : string</text>
          <text x="452" y="301" fill="#555" fontSize="9.5">- Description : string</text>
          <text x="452" y="315" fill="#555" fontSize="9.5">- TechStack : string[*]</text>

          {/* Composition arrows (filled diamond at Resume side) */}
          <line x1="385" y1="90" x2="440" y2="75" stroke="#666" strokeWidth="1.5" markerStart="url(#ofill)"/>
          <line x1="385" y1="140" x2="440" y2="191" stroke="#666" strokeWidth="1.5" markerStart="url(#ofill)"/>
          <line x1="385" y1="178" x2="440" y2="289" stroke="#666" strokeWidth="1.5" markerStart="url(#ofill)"/>

          {/* Problems note */}
          <rect x="15" y="350" width="370" height="65" rx="6" fill="#ffebee" stroke="#e53935" strokeWidth="1.5" strokeDasharray="4,3"/>
          <text x="30" y="371" fill="#c62828" fontSize="11" fontWeight="bold">⚠ Проблемы</text>
          <text x="30" y="389" fill="#c62828" fontSize="9.5">• Телескопический конструктор (12+ парам.)</text>
          <text x="30" y="405" fill="#c62828" fontSize="9.5">• Resume мутабелен (сеттеры)</text>
        </svg>
      </div>
    </>
  )
}
