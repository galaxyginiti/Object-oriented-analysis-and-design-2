export default function SectionUml2() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Раздел 02</div>
        <div className="sh-title">UML-диаграмма с паттерном Builder</div>
        <div className="sh-sub">Диаграмма классов — 1 : 1 с кодом CVBuilder.Api (draw.io style)</div>
      </div>

      <div className="uml-wrap">
        <div className="uml-label">📐 Диаграмма классов — Builder Pattern (GoF)</div>
        <svg className="uml-svg" viewBox="0 0 1260 1080" xmlns="http://www.w3.org/2000/svg" fontFamily="'Segoe UI','Inter',Arial,sans-serif">
          <defs>
            {/* open arrow – dependency */}
            <marker id="dep" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="none" stroke="#666" strokeWidth="1.2"/></marker>
            {/* closed hollow arrow – interface realization */}
            <marker id="real" markerWidth="16" markerHeight="12" refX="15" refY="6" orient="auto"><polygon points="0 0,16 6,0 12" fill="#fff" stroke="#666" strokeWidth="1.5"/></marker>
            {/* filled arrow – association / navigable */}
            <marker id="assoc" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#666"/></marker>
            {/* diamond – composition */}
            <marker id="comp" markerWidth="12" markerHeight="8" refX="0" refY="4" orient="auto"><polygon points="6 0,12 4,6 8,0 4" fill="#666" stroke="#666" strokeWidth="1"/></marker>
          </defs>

          {/* ========= background ========= */}
          <rect width="1260" height="1080" fill="#fff" rx="8"/>

          {/* ================================================================== */}
          {/*  ROW 1 — ResumeController  |  ResumeDirector  |  IResumeBuilder   */}
          {/* ================================================================== */}

          {/* ─── ResumeController (Client) ─── */}
          <rect x="20" y="20" width="340" height="220" rx="5" fill="#fff" stroke="#d6b656" strokeWidth="2"/>
          <rect x="20" y="20" width="340" height="30" rx="5" fill="#fff2cc" stroke="#d6b656" strokeWidth="2"/>
          <text x="190" y="40" textAnchor="middle" fill="#7f6000" fontSize="12" fontWeight="bold">ResumeController</text>
          {/* fields */}
          <text x="30" y="64" fill="#333" fontSize="10">- _director : ResumeDirector</text>
          <text x="30" y="80" fill="#333" fontSize="10">- _builders : Dictionary&lt;string, IResumeBuilder&gt;</text>
          <line x1="28" y1="88" x2="352" y2="88" stroke="#d6b656" strokeWidth="0.7"/>
          {/* methods */}
          <text x="30" y="104" fill="#333" fontSize="10">+ Build(req : BuildResumeRequest) : IActionResult</text>
          <text x="30" y="120" fill="#333" fontSize="10">+ GetTemplates() : IActionResult</text>
          {/* note: dict init */}
          <rect x="30" y="134" width="320" height="98" rx="4" fill="#fffde7" stroke="#d6b656" strokeWidth="0.7" strokeDasharray="3,2"/>
          <text x="38" y="150" fill="#888" fontSize="9" fontStyle="italic">// _builders initialization</text>
          <text x="38" y="164" fill="#555" fontSize="9">{"{"} "IT"       → new ITResumeBuilder(),</text>
          <text x="38" y="178" fill="#555" fontSize="9">{"  "}"Дизайнер" → new DesignResumeBuilder(),</text>
          <text x="38" y="192" fill="#555" fontSize="9">{"  "}"Менеджер" → new ManagerResumeBuilder() {"}"}</text>
          <text x="38" y="210" fill="#888" fontSize="9" fontStyle="italic">// _director.Builder = builder;</text>
          <text x="38" y="224" fill="#888" fontSize="9" fontStyle="italic">// _director.BuildFullResume(...);</text>

          {/* ─── ResumeDirector ─── */}
          <rect x="420" y="20" width="340" height="220" rx="5" fill="#fff" stroke="#9673a6" strokeWidth="2"/>
          <rect x="420" y="20" width="340" height="30" rx="5" fill="#e1d5e7" stroke="#9673a6" strokeWidth="2"/>
          <text x="590" y="40" textAnchor="middle" fill="#4a235a" fontSize="12" fontWeight="bold">ResumeDirector</text>
          {/* fields */}
          <text x="430" y="64" fill="#333" fontSize="10">- _builder : IResumeBuilder</text>
          <line x1="428" y1="72" x2="752" y2="72" stroke="#9673a6" strokeWidth="0.7"/>
          {/* methods */}
          <text x="430" y="88" fill="#333" fontSize="10">+ Builder {"{ set; }"} : IResumeBuilder</text>
          <line x1="428" y1="96" x2="752" y2="96" stroke="#9673a6" strokeWidth="0.5" strokeDasharray="2,2"/>
          <text x="430" y="112" fill="#333" fontSize="10">+ BuildMinimalResume(</text>
          <text x="446" y="126" fill="#333" fontSize="9.5">name : string, email : string,</text>
          <text x="446" y="140" fill="#333" fontSize="9.5">phone : string, skills : List&lt;string&gt;</text>
          <text x="430" y="154" fill="#333" fontSize="10">{"  "}) : void</text>
          <text x="430" y="172" fill="#333" fontSize="10">+ BuildFullResume(</text>
          <text x="446" y="186" fill="#333" fontSize="9.5">name, email, phone, summary : string,</text>
          <text x="446" y="200" fill="#333" fontSize="9.5">exps : List&lt;Experience&gt;, edus : List&lt;Education&gt;,</text>
          <text x="446" y="214" fill="#333" fontSize="9.5">skills, projs, langs, github?, portfolio?, linkedin?</text>
          <text x="430" y="228" fill="#333" fontSize="10">{"  "}) : void</text>

          {/* ─── IResumeBuilder interface ─── */}
          <rect x="830" y="20" width="400" height="280" rx="5" fill="#fff" stroke="#82b366" strokeWidth="2"/>
          <rect x="830" y="20" width="400" height="30" rx="5" fill="#d5e8d4" stroke="#82b366" strokeWidth="2"/>
          <text x="1030" y="33" textAnchor="middle" fill="#2d6a2d" fontSize="9" fontStyle="italic">{"«interface»"}</text>
          <text x="1030" y="46" textAnchor="middle" fill="#2d6a2d" fontSize="12" fontWeight="bold">IResumeBuilder</text>
          <line x1="838" y1="56" x2="1222" y2="56" stroke="#82b366" strokeWidth="0.7"/>
          {/* methods */}
          <text x="840" y="72" fill="#333" fontSize="10">+ Reset() : void</text>
          <text x="840" y="88" fill="#333" fontSize="10">+ SetPersonalInfo(fullName : string, email : string,</text>
          <text x="856" y="102" fill="#333" fontSize="10">phone : string) : void</text>
          <text x="840" y="118" fill="#333" fontSize="10">+ SetSummary(summary : string) : void</text>
          <text x="840" y="134" fill="#333" fontSize="10">+ AddExperience(exp : Experience) : void</text>
          <text x="840" y="150" fill="#333" fontSize="10">+ AddEducation(edu : Education) : void</text>
          <text x="840" y="166" fill="#333" fontSize="10">+ AddSkills(skills : List&lt;string&gt;) : void</text>
          <text x="840" y="182" fill="#333" fontSize="10">+ AddProject(proj : Project) : void</text>
          <text x="840" y="198" fill="#333" fontSize="10">+ AddLanguage(lang : Language) : void</text>
          <text x="840" y="214" fill="#333" fontSize="10">+ SetLinks(github? : string, portfolio? : string,</text>
          <text x="856" y="228" fill="#333" fontSize="10">linkedin? : string) : void</text>
          <text x="840" y="248" fill="#333" fontSize="10">+ GetResult() : Resume</text>

          {/* ──── ROW 1 ARROWS ──── */}
          {/* Controller → Director  (association) */}
          <line x1="360" y1="80" x2="420" y2="80" stroke="#666" strokeWidth="1.5" markerEnd="url(#assoc)"/>
          <text x="370" y="74" fill="#666" fontSize="8">uses</text>

          {/* Director → IResumeBuilder  (association, _builder field) */}
          <line x1="760" y1="64" x2="830" y2="64" stroke="#666" strokeWidth="1.5" markerEnd="url(#assoc)"/>
          <text x="770" y="58" fill="#666" fontSize="8">_builder</text>

          {/* Controller ··> IResumeBuilder  (dependency — uses dict of builders) */}
          <path d="M 360 50 Q 600 -10 830 40" fill="none" stroke="#666" strokeWidth="1.2" strokeDasharray="7,4" markerEnd="url(#dep)"/>
          <text x="580" y="8" fill="#666" fontSize="8">{"«use» _builders"}</text>

          {/* ================================================================== */}
          {/*  ROW 2 — Three Concrete Builders                                   */}
          {/* ================================================================== */}

          {/* ─── ITResumeBuilder ─── */}
          <rect x="20" y="340" width="380" height="310" rx="5" fill="#fff" stroke="#4472c4" strokeWidth="2"/>
          <rect x="20" y="340" width="380" height="30" rx="5" fill="#dae8fc" stroke="#4472c4" strokeWidth="2"/>
          <text x="210" y="360" textAnchor="middle" fill="#1a3b6b" fontSize="12" fontWeight="bold">ITResumeBuilder</text>
          {/* fields */}
          <text x="30" y="384" fill="#333" fontSize="9.5">- _name : string</text>
          <text x="30" y="398" fill="#333" fontSize="9.5">- _email : string</text>
          <text x="30" y="412" fill="#333" fontSize="9.5">- _phone : string</text>
          <text x="30" y="426" fill="#333" fontSize="9.5">- _summary : string</text>
          <text x="30" y="440" fill="#333" fontSize="9.5">- _exps : List&lt;Experience&gt;</text>
          <text x="30" y="454" fill="#333" fontSize="9.5">- _edus : List&lt;Education&gt;</text>
          <text x="30" y="468" fill="#333" fontSize="9.5">- _skills : List&lt;string&gt;</text>
          <text x="30" y="482" fill="#333" fontSize="9.5">- _projs : List&lt;Project&gt;</text>
          <text x="30" y="496" fill="#333" fontSize="9.5">- _langs : List&lt;Language&gt;</text>
          <text x="30" y="510" fill="#333" fontSize="9.5">- _github : string?</text>
          <text x="30" y="524" fill="#333" fontSize="9.5">- _portfolio : string?</text>
          <text x="30" y="538" fill="#333" fontSize="9.5">- _linkedin : string?</text>
          <line x1="28" y1="546" x2="392" y2="546" stroke="#4472c4" strokeWidth="0.7"/>
          {/* methods */}
          <text x="30" y="562" fill="#333" fontSize="9.5">+ Reset() : void</text>
          <text x="30" y="576" fill="#333" fontSize="9.5">+ SetPersonalInfo(n, e, p) : void</text>
          <text x="30" y="590" fill="#333" fontSize="9.5">+ SetSummary(s) : void</text>
          <text x="30" y="604" fill="#333" fontSize="9.5">+ AddExperience(e) / AddEducation(e) : void</text>
          <text x="30" y="618" fill="#333" fontSize="9.5">+ AddSkills(s) : void  ← adds Git, Linux</text>
          <text x="30" y="632" fill="#333" fontSize="9.5">+ AddProject(p) / AddLanguage(l) : void</text>
          <text x="30" y="646" fill="#555" fontSize="9.5">+ SetLinks(gh?, pf?, li?) : void  ← gh defaults</text>

          {/* ─── DesignResumeBuilder ─── */}
          <rect x="440" y="340" width="380" height="310" rx="5" fill="#fff" stroke="#4472c4" strokeWidth="2"/>
          <rect x="440" y="340" width="380" height="30" rx="5" fill="#dae8fc" stroke="#4472c4" strokeWidth="2"/>
          <text x="630" y="360" textAnchor="middle" fill="#1a3b6b" fontSize="12" fontWeight="bold">DesignResumeBuilder</text>
          {/* fields */}
          <text x="450" y="384" fill="#333" fontSize="9.5">- _name : string</text>
          <text x="450" y="398" fill="#333" fontSize="9.5">- _email : string</text>
          <text x="450" y="412" fill="#333" fontSize="9.5">- _phone : string</text>
          <text x="450" y="426" fill="#333" fontSize="9.5">- _summary : string</text>
          <text x="450" y="440" fill="#333" fontSize="9.5">- _exps : List&lt;Experience&gt;</text>
          <text x="450" y="454" fill="#333" fontSize="9.5">- _edus : List&lt;Education&gt;</text>
          <text x="450" y="468" fill="#333" fontSize="9.5">- _skills : List&lt;string&gt;</text>
          <text x="450" y="482" fill="#333" fontSize="9.5">- _projs : List&lt;Project&gt;</text>
          <text x="450" y="496" fill="#333" fontSize="9.5">- _langs : List&lt;Language&gt;</text>
          <text x="450" y="510" fill="#333" fontSize="9.5">- _github : string?</text>
          <text x="450" y="524" fill="#333" fontSize="9.5">- _portfolio : string?</text>
          <text x="450" y="538" fill="#333" fontSize="9.5">- _linkedin : string?</text>
          <line x1="448" y1="546" x2="812" y2="546" stroke="#4472c4" strokeWidth="0.7"/>
          {/* methods */}
          <text x="450" y="562" fill="#333" fontSize="9.5">+ Reset() : void</text>
          <text x="450" y="576" fill="#333" fontSize="9.5">+ SetPersonalInfo(n, e, p) : void</text>
          <text x="450" y="590" fill="#333" fontSize="9.5">+ SetSummary(s) : void</text>
          <text x="450" y="604" fill="#333" fontSize="9.5">+ AddExperience(e) / AddEducation(e) : void</text>
          <text x="450" y="618" fill="#333" fontSize="9.5">+ AddSkills(s) : void  ← adds Figma, Adobe CC</text>
          <text x="450" y="632" fill="#333" fontSize="9.5">+ AddProject(p) / AddLanguage(l) : void</text>
          <text x="450" y="646" fill="#555" fontSize="9.5">+ SetLinks(gh?, pf?, li?) : void  ← pf defaults</text>

          {/* ─── ManagerResumeBuilder ─── */}
          <rect x="860" y="340" width="380" height="310" rx="5" fill="#fff" stroke="#4472c4" strokeWidth="2"/>
          <rect x="860" y="340" width="380" height="30" rx="5" fill="#dae8fc" stroke="#4472c4" strokeWidth="2"/>
          <text x="1050" y="360" textAnchor="middle" fill="#1a3b6b" fontSize="12" fontWeight="bold">ManagerResumeBuilder</text>
          {/* fields */}
          <text x="870" y="384" fill="#333" fontSize="9.5">- _name : string</text>
          <text x="870" y="398" fill="#333" fontSize="9.5">- _email : string</text>
          <text x="870" y="412" fill="#333" fontSize="9.5">- _phone : string</text>
          <text x="870" y="426" fill="#333" fontSize="9.5">- _summary : string</text>
          <text x="870" y="440" fill="#333" fontSize="9.5">- _exps : List&lt;Experience&gt;</text>
          <text x="870" y="454" fill="#333" fontSize="9.5">- _edus : List&lt;Education&gt;</text>
          <text x="870" y="468" fill="#333" fontSize="9.5">- _skills : List&lt;string&gt;</text>
          <text x="870" y="482" fill="#333" fontSize="9.5">- _projs : List&lt;Project&gt;</text>
          <text x="870" y="496" fill="#333" fontSize="9.5">- _langs : List&lt;Language&gt;</text>
          <text x="870" y="510" fill="#333" fontSize="9.5">- _github : string?</text>
          <text x="870" y="524" fill="#333" fontSize="9.5">- _portfolio : string?</text>
          <text x="870" y="538" fill="#333" fontSize="9.5">- _linkedin : string?</text>
          <line x1="868" y1="546" x2="1232" y2="546" stroke="#4472c4" strokeWidth="0.7"/>
          {/* methods */}
          <text x="870" y="562" fill="#333" fontSize="9.5">+ Reset() : void</text>
          <text x="870" y="576" fill="#333" fontSize="9.5">+ SetPersonalInfo(n, e, p) : void</text>
          <text x="870" y="590" fill="#333" fontSize="9.5">+ SetSummary(s) : void</text>
          <text x="870" y="604" fill="#333" fontSize="9.5">+ AddExperience(e) / AddEducation(e) : void</text>
          <text x="870" y="618" fill="#333" fontSize="9.5">+ AddSkills(s) : void  ← adds Leadership, Agile</text>
          <text x="870" y="632" fill="#333" fontSize="9.5">+ AddProject(p) / AddLanguage(l) : void</text>
          <text x="870" y="646" fill="#555" fontSize="9.5">+ SetLinks(gh?, pf?, li?) : void  ← li defaults</text>

          {/* ──── ROW 2 ARROWS: realization (dashed + hollow triangle) ──── */}
          {/* IT → IResumeBuilder */}
          <line x1="210" y1="340" x2="950" y2="300" stroke="#666" strokeWidth="1.4" strokeDasharray="8,4" markerEnd="url(#real)"/>
          {/* Design → IResumeBuilder */}
          <line x1="630" y1="340" x2="1030" y2="300" stroke="#666" strokeWidth="1.4" strokeDasharray="8,4" markerEnd="url(#real)"/>
          {/* Manager → IResumeBuilder */}
          <line x1="1050" y1="340" x2="1060" y2="300" stroke="#666" strokeWidth="1.4" strokeDasharray="8,4" markerEnd="url(#real)"/>

          {/* ================================================================== */}
          {/*  ROW 3 — Resume (Product) + value-type records                     */}
          {/* ================================================================== */}

          {/* ─── Resume ─── */}
          <rect x="20" y="720" width="440" height="340" rx="5" fill="#fff" stroke="#c0504d" strokeWidth="2"/>
          <rect x="20" y="720" width="440" height="30" rx="5" fill="#f2dcdb" stroke="#c0504d" strokeWidth="2"/>
          <text x="240" y="740" textAnchor="middle" fill="#953735" fontSize="12" fontWeight="bold">Resume</text>
          {/* fields – readonly props */}
          <text x="30" y="764" fill="#333" fontSize="9.5">+ FullName : string  {"{ get; }"}</text>
          <text x="30" y="778" fill="#333" fontSize="9.5">+ Email : string  {"{ get; }"}</text>
          <text x="30" y="792" fill="#333" fontSize="9.5">+ Phone : string  {"{ get; }"}</text>
          <text x="30" y="806" fill="#333" fontSize="9.5">+ Summary : string  {"{ get; }"}</text>
          <text x="30" y="820" fill="#333" fontSize="9.5">+ Experiences : IReadOnlyList&lt;Experience&gt;  {"{ get; }"}</text>
          <text x="30" y="834" fill="#333" fontSize="9.5">+ Educations : IReadOnlyList&lt;Education&gt;  {"{ get; }"}</text>
          <text x="30" y="848" fill="#333" fontSize="9.5">+ Skills : IReadOnlyList&lt;string&gt;  {"{ get; }"}</text>
          <text x="30" y="862" fill="#333" fontSize="9.5">+ Projects : IReadOnlyList&lt;Project&gt;  {"{ get; }"}</text>
          <text x="30" y="876" fill="#333" fontSize="9.5">+ Languages : IReadOnlyList&lt;Language&gt;  {"{ get; }"}</text>
          <text x="30" y="890" fill="#333" fontSize="9.5">+ GithubUrl : string?  {"{ get; }"}</text>
          <text x="30" y="904" fill="#333" fontSize="9.5">+ PortfolioUrl : string?  {"{ get; }"}</text>
          <text x="30" y="918" fill="#333" fontSize="9.5">+ LinkedinUrl : string?  {"{ get; }"}</text>
          <line x1="28" y1="926" x2="452" y2="926" stroke="#c0504d" strokeWidth="0.7"/>
          {/* methods */}
          <text x="30" y="942" fill="#333" fontSize="9.5">~ Resume(name, email, phone, summary,</text>
          <text x="46" y="956" fill="#333" fontSize="9.5">exps, edus, skills, projs, langs,</text>
          <text x="46" y="970" fill="#333" fontSize="9.5">github?, portfolio?, linkedin?)  {"«internal»"}</text>
          <text x="30" y="990" fill="#333" fontSize="9.5">+ ToString() : string</text>
          {/* readonly badge */}
          <rect x="320" y="758" width="128" height="22" rx="4" fill="#fce4ec" stroke="#c0504d" strokeWidth="1"/>
          <text x="384" y="773" textAnchor="middle" fill="#c0504d" fontSize="9" fontWeight="bold">all props readonly</text>
          {/* internal badge */}
          <rect x="320" y="936" width="128" height="22" rx="4" fill="#fff3e0" stroke="#e65100" strokeWidth="1"/>
          <text x="384" y="951" textAnchor="middle" fill="#e65100" fontSize="9" fontWeight="bold">ctor is internal</text>

          {/* ─── Record types ─── */}
          {/* Experience */}
          <rect x="530" y="720" width="340" height="100" rx="5" fill="#fff" stroke="#7f8c8d" strokeWidth="1.5"/>
          <rect x="530" y="720" width="340" height="26" rx="5" fill="#ecf0f1" stroke="#7f8c8d" strokeWidth="1.5"/>
          <text x="700" y="737" textAnchor="middle" fill="#2c3e50" fontSize="10" fontStyle="italic">{"«record»"}</text>
          <text x="700" y="750" textAnchor="middle" fill="#2c3e50" fontSize="11" fontWeight="bold">Experience</text>
          <line x1="538" y1="754" x2="862" y2="754" stroke="#7f8c8d" strokeWidth="0.5"/>
          <text x="540" y="770" fill="#333" fontSize="9.5">+ Company : string</text>
          <text x="540" y="784" fill="#333" fontSize="9.5">+ Position : string</text>
          <text x="540" y="798" fill="#333" fontSize="9.5">+ Start : string  ;  End : string  ;  Desc : string</text>

          {/* Education */}
          <rect x="530" y="836" width="340" height="86" rx="5" fill="#fff" stroke="#7f8c8d" strokeWidth="1.5"/>
          <rect x="530" y="836" width="340" height="26" rx="5" fill="#ecf0f1" stroke="#7f8c8d" strokeWidth="1.5"/>
          <text x="700" y="853" textAnchor="middle" fill="#2c3e50" fontSize="10" fontStyle="italic">{"«record»"}</text>
          <text x="700" y="866" textAnchor="middle" fill="#2c3e50" fontSize="11" fontWeight="bold">Education</text>
          <line x1="538" y1="870" x2="862" y2="870" stroke="#7f8c8d" strokeWidth="0.5"/>
          <text x="540" y="886" fill="#333" fontSize="9.5">+ Institution : string  ;  Degree : string</text>
          <text x="540" y="900" fill="#333" fontSize="9.5">+ Year : int</text>

          {/* Project */}
          <rect x="920" y="720" width="320" height="86" rx="5" fill="#fff" stroke="#7f8c8d" strokeWidth="1.5"/>
          <rect x="920" y="720" width="320" height="26" rx="5" fill="#ecf0f1" stroke="#7f8c8d" strokeWidth="1.5"/>
          <text x="1080" y="737" textAnchor="middle" fill="#2c3e50" fontSize="10" fontStyle="italic">{"«record»"}</text>
          <text x="1080" y="750" textAnchor="middle" fill="#2c3e50" fontSize="11" fontWeight="bold">Project</text>
          <line x1="928" y1="754" x2="1232" y2="754" stroke="#7f8c8d" strokeWidth="0.5"/>
          <text x="930" y="770" fill="#333" fontSize="9.5">+ Name : string  ;  Desc : string</text>
          <text x="930" y="784" fill="#333" fontSize="9.5">+ TechStack : List&lt;string&gt;</text>

          {/* Language */}
          <rect x="920" y="836" width="320" height="72" rx="5" fill="#fff" stroke="#7f8c8d" strokeWidth="1.5"/>
          <rect x="920" y="836" width="320" height="26" rx="5" fill="#ecf0f1" stroke="#7f8c8d" strokeWidth="1.5"/>
          <text x="1080" y="853" textAnchor="middle" fill="#2c3e50" fontSize="10" fontStyle="italic">{"«record»"}</text>
          <text x="1080" y="866" textAnchor="middle" fill="#2c3e50" fontSize="11" fontWeight="bold">Language</text>
          <line x1="928" y1="870" x2="1232" y2="870" stroke="#7f8c8d" strokeWidth="0.5"/>
          <text x="930" y="886" fill="#333" fontSize="9.5">+ Name : string  ;  Level : string</text>

          {/* ─── DTO (BuildResumeRequest) ─── */}
          <rect x="920" y="940" width="320" height="120" rx="5" fill="#fff" stroke="#d6b656" strokeWidth="1.5"/>
          <rect x="920" y="940" width="320" height="26" rx="5" fill="#fff2cc" stroke="#d6b656" strokeWidth="1.5"/>
          <text x="1080" y="957" textAnchor="middle" fill="#7f6000" fontSize="10" fontStyle="italic">{"«DTO»"}</text>
          <text x="1080" y="970" textAnchor="middle" fill="#7f6000" fontSize="11" fontWeight="bold">BuildResumeRequest</text>
          <line x1="928" y1="974" x2="1232" y2="974" stroke="#d6b656" strokeWidth="0.5"/>
          <text x="930" y="990" fill="#333" fontSize="9.5">+ Template : string  (IT | Дизайнер | Менеджер)</text>
          <text x="930" y="1004" fill="#333" fontSize="9.5">+ Name, Email, Phone, Summary : string</text>
          <text x="930" y="1018" fill="#333" fontSize="9.5">+ Skills : List&lt;string&gt;?</text>
          <text x="930" y="1032" fill="#333" fontSize="9.5">+ Experiences?, Educations?, Projects?</text>
          <text x="930" y="1046" fill="#333" fontSize="9.5">+ Languages?, GithubUrl?, PortfolioUrl?, LinkedinUrl?</text>

          {/* ──── ROW 3 ARROWS ──── */}
          {/* Builders ··> Resume  (dependency «create») */}
          <line x1="210" y1="650" x2="210" y2="720" stroke="#666" strokeWidth="1.3" strokeDasharray="7,4" markerEnd="url(#dep)"/>
          <text x="220" y="690" fill="#666" fontSize="8">{"«create»"}</text>

          <line x1="630" y1="650" x2="400" y2="720" stroke="#666" strokeWidth="1.3" strokeDasharray="7,4" markerEnd="url(#dep)"/>
          <text x="530" y="680" fill="#666" fontSize="8">{"«create»"}</text>

          <line x1="1050" y1="650" x2="460" y2="738" stroke="#666" strokeWidth="1.3" strokeDasharray="7,4" markerEnd="url(#dep)"/>
          <text x="770" y="682" fill="#666" fontSize="8">{"«create»"}</text>

          {/* Resume → Experience (composition) */}
          <line x1="460" y1="810" x2="530" y2="770" stroke="#666" strokeWidth="1.2" markerStart="url(#comp)"/>
          <text x="472" y="778" fill="#666" fontSize="7">*</text>

          {/* Resume → Education (composition) */}
          <line x1="460" y1="860" x2="530" y2="870" stroke="#666" strokeWidth="1.2" markerStart="url(#comp)"/>
          <text x="472" y="855" fill="#666" fontSize="7">*</text>

          {/* Resume → Project (composition) */}
          <line x1="460" y1="862" x2="920" y2="760" stroke="#666" strokeWidth="1.0" markerStart="url(#comp)"/>
          <text x="680" y="802" fill="#666" fontSize="7">*</text>

          {/* Resume → Language (composition) */}
          <line x1="460" y1="882" x2="920" y2="870" stroke="#666" strokeWidth="1.0" markerStart="url(#comp)"/>
          <text x="680" y="870" fill="#666" fontSize="7">*</text>

          {/* Controller ··> BuildResumeRequest (dependency) */}
          <path d="M 190 240 L 190 700 Q 190 710 200 710 L 900 1000 L 920 1000" fill="none" stroke="#666" strokeWidth="1.0" strokeDasharray="5,3" markerEnd="url(#dep)"/>

          {/* ================================================================== */}
          {/*  PATTERN ROLE LABELS (draw.io style note boxes)                    */}
          {/* ================================================================== */}

          {/* Director role */}
          <rect x="420" y="248" width="110" height="22" rx="10" fill="#e1d5e7" stroke="#9673a6" strokeWidth="1"/>
          <text x="475" y="263" textAnchor="middle" fill="#4a235a" fontSize="9" fontWeight="bold">Director</text>

          {/* Builder role */}
          <rect x="975" y="264" width="110" height="22" rx="10" fill="#d5e8d4" stroke="#82b366" strokeWidth="1"/>
          <text x="1030" y="279" textAnchor="middle" fill="#2d6a2d" fontSize="9" fontWeight="bold">Builder (GoF)</text>

          {/* ConcreteBuilder role */}
          <rect x="440" y="656" width="160" height="22" rx="10" fill="#dae8fc" stroke="#4472c4" strokeWidth="1"/>
          <text x="520" y="671" textAnchor="middle" fill="#1a3b6b" fontSize="9" fontWeight="bold">ConcreteBuilder (GoF)</text>

          {/* Product role */}
          <rect x="20" y="1034" width="110" height="22" rx="10" fill="#f2dcdb" stroke="#c0504d" strokeWidth="1"/>
          <text x="75" y="1049" textAnchor="middle" fill="#953735" fontSize="9" fontWeight="bold">Product (GoF)</text>

          {/* Client role */}
          <rect x="20" y="248" width="110" height="22" rx="10" fill="#fff2cc" stroke="#d6b656" strokeWidth="1"/>
          <text x="75" y="263" textAnchor="middle" fill="#7f6000" fontSize="9" fontWeight="bold">Client</text>

        </svg>
      </div>

      <div className="block">
        <h3>Маппинг диаграммы на код CVBuilder.Api</h3>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.92rem'}}>
          <thead><tr style={{background:'#f5f5f5'}}>
            <th style={{padding:'6px 10px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Роль GoF</th>
            <th style={{padding:'6px 10px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Класс / интерфейс</th>
            <th style={{padding:'6px 10px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Файл</th>
            <th style={{padding:'6px 10px',textAlign:'left',borderBottom:'2px solid #ddd'}}>Описание</th>
          </tr></thead>
          <tbody>
            <tr><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}><strong>Builder</strong></td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>IResumeBuilder</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee',color:'#666'}}>Builders/IResumeBuilder.cs</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>Интерфейс: 10 методов — Reset, SetPersonalInfo, SetSummary, AddExperience, AddEducation, AddSkills, AddProject, AddLanguage, SetLinks, GetResult</td></tr>
            <tr><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}><strong>ConcreteBuilder</strong></td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>ITResumeBuilder</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee',color:'#666'}}>Builders/ITResumeBuilder.cs</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>Авто-добавляет Git и Linux в навыки; github URL по умолчанию</td></tr>
            <tr><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}><strong>ConcreteBuilder</strong></td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>DesignResumeBuilder</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee',color:'#666'}}>Builders/DesignAndManagerBuilders.cs</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>Авто-добавляет Figma и Adobe CC; portfolio URL по умолчанию</td></tr>
            <tr><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}><strong>ConcreteBuilder</strong></td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>ManagerResumeBuilder</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee',color:'#666'}}>Builders/DesignAndManagerBuilders.cs</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>Авто-добавляет Leadership и Agile/Scrum; linkedin URL по умолчанию</td></tr>
            <tr><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}><strong>Director</strong></td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>ResumeDirector</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee',color:'#666'}}>Director/ResumeDirector.cs</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>Два рецепта: BuildMinimalResume (4 параметра) и BuildFullResume (12 параметров)</td></tr>
            <tr><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}><strong>Product</strong></td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>Resume</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee',color:'#666'}}>Models/Resume.cs</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>12 readonly свойств ({"{get;}"}), internal конструктор. Records: Experience, Education, Project, Language</td></tr>
            <tr><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}><strong>Client</strong></td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>ResumeController</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee',color:'#666'}}>Controllers/ResumeController.cs</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>HTTP API. Dict builder'ов по шаблону. Build() + GetTemplates()</td></tr>
            <tr><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}><strong>DTO</strong></td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>BuildResumeRequest</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee',color:'#666'}}>Models/Dtos.cs</td><td style={{padding:'5px 10px',borderBottom:'1px solid #eee'}}>Входной DTO для POST /api/resume/build. ExperienceDto, EducationDto, ProjectDto, LanguageDto</td></tr>
          </tbody>
        </table>
      </div>

      <div className="block">
        <h3>Связи на диаграмме</h3>
        <ul>
          <li><strong>ResumeController → ResumeDirector</strong> — ассоциация (хранит поле _director)</li>
          <li><strong>ResumeController ··→ IResumeBuilder</strong> — зависимость (Dictionary _builders)</li>
          <li><strong>ResumeDirector → IResumeBuilder</strong> — ассоциация (поле _builder, setter)</li>
          <li><strong>IT / Design / Manager ResumeBuilder ··▷ IResumeBuilder</strong> — реализация интерфейса (dashed + hollow triangle)</li>
          <li><strong>Builders ··→ Resume</strong> — зависимость «create» (new Resume(...) в GetResult())</li>
          <li><strong>Resume ◆→ Experience, Education, Project, Language</strong> — композиция (IReadOnlyList свойства)</li>
          <li><strong>ResumeController ··→ BuildResumeRequest</strong> — зависимость (параметр метода Build)</li>
        </ul>
      </div>
    </>
  )
}
