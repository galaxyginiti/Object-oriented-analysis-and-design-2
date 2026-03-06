import CodeBlock from '../components/CodeBlock'

const RESUME_PRODUCT = `<span class="cm">/// Product — иммутабельный объект. Только readonly, нет сеттеров.</span>
<span class="kw">public class</span> <span class="tp">Resume</span>
{
    <span class="kw">public</span> <span class="tp">string</span> FullName { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Email { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Phone { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Summary { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">IReadOnlyList</span>&lt;<span class="tp">Experience</span>&gt; Experiences { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">IReadOnlyList</span>&lt;<span class="tp">Education</span>&gt; Educations { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">IReadOnlyList</span>&lt;<span class="tp">string</span>&gt; Skills { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">IReadOnlyList</span>&lt;<span class="tp">Project</span>&gt; Projects { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">IReadOnlyList</span>&lt;<span class="tp">Language</span>&gt; Languages { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">string</span>? GithubUrl { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">string</span>? PortfolioUrl { <span class="kw">get</span>; }
    <span class="kw">public</span> <span class="tp">string</span>? LinkedinUrl { <span class="kw">get</span>; }

    <span class="cm">// internal — только Builder может создавать</span>
    <span class="kw">internal</span> <span class="fn">Resume</span>(<span class="tp">string</span> name, <span class="tp">string</span> email, <span class="tp">string</span> phone, <span class="tp">string</span> summary,
        <span class="tp">List</span>&lt;<span class="tp">Experience</span>&gt; exps, <span class="tp">List</span>&lt;<span class="tp">Education</span>&gt; edus,
        <span class="tp">List</span>&lt;<span class="tp">string</span>&gt; skills, <span class="tp">List</span>&lt;<span class="tp">Project</span>&gt; projs,
        <span class="tp">List</span>&lt;<span class="tp">Language</span>&gt; langs,
        <span class="tp">string</span>? github, <span class="tp">string</span>? portfolio, <span class="tp">string</span>? linkedin)
    {
        FullName = name; Email = email; Phone = phone; Summary = summary;
        Experiences = exps.AsReadOnly(); Educations = edus.AsReadOnly();
        Skills = skills.AsReadOnly(); Projects = projs.AsReadOnly();
        Languages = langs.AsReadOnly();
        GithubUrl = github; PortfolioUrl = portfolio; LinkedinUrl = linkedin;
    }
}
<span class="kw">public record</span> <span class="tp">Experience</span>(<span class="tp">string</span> Company, <span class="tp">string</span> Position, <span class="tp">string</span> Start, <span class="tp">string</span> End, <span class="tp">string</span> Desc);
<span class="kw">public record</span> <span class="tp">Education</span>(<span class="tp">string</span> Institution, <span class="tp">string</span> Degree, <span class="kw">int</span> Year);
<span class="kw">public record</span> <span class="tp">Project</span>(<span class="tp">string</span> Name, <span class="tp">string</span> Desc, <span class="tp">List</span>&lt;<span class="tp">string</span>&gt; TechStack);
<span class="kw">public record</span> <span class="tp">Language</span>(<span class="tp">string</span> Name, <span class="tp">string</span> Level);`

const INTERFACE_CS = `<span class="cm">/// Builder — интерфейс шагов конструирования (GoF)</span>
<span class="kw">public interface</span> <span class="tp">IResumeBuilder</span>
{
    <span class="kw">void</span> <span class="fn">Reset</span>();
    <span class="kw">void</span> <span class="fn">SetPersonalInfo</span>(<span class="tp">string</span> fullName, <span class="tp">string</span> email, <span class="tp">string</span> phone);
    <span class="kw">void</span> <span class="fn">SetSummary</span>(<span class="tp">string</span> summary);
    <span class="kw">void</span> <span class="fn">AddExperience</span>(<span class="tp">Experience</span> exp);
    <span class="kw">void</span> <span class="fn">AddEducation</span>(<span class="tp">Education</span> edu);
    <span class="kw">void</span> <span class="fn">AddSkills</span>(<span class="tp">List</span>&lt;<span class="tp">string</span>&gt; skills);
    <span class="kw">void</span> <span class="fn">AddProject</span>(<span class="tp">Project</span> proj);
    <span class="kw">void</span> <span class="fn">AddLanguage</span>(<span class="tp">Language</span> lang);
    <span class="kw">void</span> <span class="fn">SetLinks</span>(<span class="tp">string</span>? github, <span class="tp">string</span>? portfolio, <span class="tp">string</span>? linkedin);
    <span class="tp">Resume</span> <span class="fn">GetResult</span>();
}`

const IT_BUILDER_CS = `<span class="cm">/// ConcreteBuilder: IT-специфика — GitHub обязателен, +Git, +Linux</span>
<span class="kw">public class</span> <span class="tp">ITResumeBuilder</span> : <span class="tp">IResumeBuilder</span>
{
    <span class="kw">private</span> <span class="tp">string</span> _name, _email, _phone, _summary;
    <span class="kw">private</span> <span class="tp">List</span>&lt;<span class="tp">Experience</span>&gt; _exps = <span class="kw">new</span>();
    <span class="kw">private</span> <span class="tp">List</span>&lt;<span class="tp">Education</span>&gt; _edus = <span class="kw">new</span>();
    <span class="kw">private</span> <span class="tp">List</span>&lt;<span class="tp">string</span>&gt; _skills = <span class="kw">new</span>();
    <span class="kw">private</span> <span class="tp">List</span>&lt;<span class="tp">Project</span>&gt; _projs = <span class="kw">new</span>();
    <span class="kw">private</span> <span class="tp">List</span>&lt;<span class="tp">Language</span>&gt; _langs = <span class="kw">new</span>();
    <span class="kw">private</span> <span class="tp">string</span>? _github, _portfolio, _linkedin;

    <span class="kw">public void</span> <span class="fn">Reset</span>() { <span class="cm">/* сбрасывает все поля */</span> }
    <span class="kw">public void</span> <span class="fn">SetPersonalInfo</span>(<span class="tp">string</span> n, <span class="tp">string</span> e, <span class="tp">string</span> p)
        { _name = n; _email = e; _phone = p; }
    <span class="kw">public void</span> <span class="fn">SetSummary</span>(<span class="tp">string</span> s) => _summary = s;
    <span class="kw">public void</span> <span class="fn">AddExperience</span>(<span class="tp">Experience</span> e) => _exps.Add(e);
    <span class="kw">public void</span> <span class="fn">AddEducation</span>(<span class="tp">Education</span> e) => _edus.Add(e);

    <span class="kw">public void</span> <span class="fn">AddSkills</span>(<span class="tp">List</span>&lt;<span class="tp">string</span>&gt; s)
    {
        _skills.AddRange(s);
        <span class="kw">if</span> (!_skills.Contains(<span class="str">"Git"</span>)) _skills.Add(<span class="str">"Git"</span>);       <span class="cm">// IT-специфика</span>
        <span class="kw">if</span> (!_skills.Contains(<span class="str">"Linux"</span>)) _skills.Add(<span class="str">"Linux"</span>);   <span class="cm">// IT-специфика</span>
    }

    <span class="kw">public void</span> <span class="fn">SetLinks</span>(<span class="tp">string</span>? gh, <span class="tp">string</span>? pf, <span class="tp">string</span>? li)
    {
        _github = !<span class="tp">string</span>.IsNullOrWhiteSpace(gh) ? gh : <span class="str">"https://github.com/"</span>;
        _portfolio = pf; _linkedin = li;
    }

    <span class="kw">public</span> <span class="tp">Resume</span> <span class="fn">GetResult</span>()
    {
        <span class="kw">var</span> result = <span class="kw">new</span> <span class="tp">Resume</span>(_name, _email, _phone, _summary,
            _exps, _edus, _skills, _projs, _langs, _github, _portfolio, _linkedin);
        Reset();
        <span class="kw">return</span> result;
    }
}`

const OTHER_BUILDERS_CS = `<span class="cm">/// Design: Portfolio обязателен, +Figma, +Adobe CC</span>
<span class="kw">public class</span> <span class="tp">DesignResumeBuilder</span> : <span class="tp">IResumeBuilder</span>
{
    <span class="kw">public void</span> <span class="fn">AddSkills</span>(<span class="tp">List</span>&lt;<span class="tp">string</span>&gt; s) {
        _skills.AddRange(s);
        <span class="kw">if</span> (!_skills.Contains(<span class="str">"Figma"</span>)) _skills.Add(<span class="str">"Figma"</span>);
        <span class="kw">if</span> (!_skills.Contains(<span class="str">"Adobe CC"</span>)) _skills.Add(<span class="str">"Adobe CC"</span>);
    }
    <span class="kw">public void</span> <span class="fn">SetLinks</span>(<span class="tp">string</span>? gh, <span class="tp">string</span>? pf, <span class="tp">string</span>? li) {
        _github = gh;
        _portfolio = !<span class="tp">string</span>.IsNullOrWhiteSpace(pf) ? pf : <span class="str">"https://behance.net/"</span>;
        _linkedin = li;
    }
}

<span class="cm">/// Manager: LinkedIn обязателен, +Leadership, +Agile/Scrum</span>
<span class="kw">public class</span> <span class="tp">ManagerResumeBuilder</span> : <span class="tp">IResumeBuilder</span>
{
    <span class="kw">public void</span> <span class="fn">AddSkills</span>(<span class="tp">List</span>&lt;<span class="tp">string</span>&gt; s) {
        _skills.AddRange(s);
        <span class="kw">if</span> (!_skills.Contains(<span class="str">"Leadership"</span>)) _skills.Add(<span class="str">"Leadership"</span>);
        <span class="kw">if</span> (!_skills.Contains(<span class="str">"Agile/Scrum"</span>)) _skills.Add(<span class="str">"Agile/Scrum"</span>);
    }
    <span class="kw">public void</span> <span class="fn">SetLinks</span>(<span class="tp">string</span>? gh, <span class="tp">string</span>? pf, <span class="tp">string</span>? li) {
        _github = gh; _portfolio = pf;
        _linkedin = !<span class="tp">string</span>.IsNullOrWhiteSpace(li) ? li : <span class="str">"https://linkedin.com/in/"</span>;
    }
}`

const DIRECTOR_CS = `<span class="cm">/// Director — управляет порядком шагов (GoF)</span>
<span class="kw">public class</span> <span class="tp">ResumeDirector</span>
{
    <span class="kw">private</span> <span class="tp">IResumeBuilder</span> _builder;
    <span class="kw">public</span> <span class="tp">IResumeBuilder</span> Builder { <span class="kw">set</span> => _builder = <span class="kw">value</span>; }

    <span class="kw">public void</span> <span class="fn">BuildMinimalResume</span>(<span class="tp">string</span> name, <span class="tp">string</span> email, <span class="tp">string</span> phone, <span class="tp">List</span>&lt;<span class="tp">string</span>&gt; skills)
    {
        _builder.Reset();
        _builder.SetPersonalInfo(name, email, phone);
        _builder.AddSkills(skills);
    }

    <span class="kw">public void</span> <span class="fn">BuildFullResume</span>(<span class="tp">string</span> name, <span class="tp">string</span> email, <span class="tp">string</span> phone,
        <span class="tp">string</span> summary, <span class="tp">List</span>&lt;<span class="tp">Experience</span>&gt; exps, <span class="tp">List</span>&lt;<span class="tp">Education</span>&gt; edus,
        <span class="tp">List</span>&lt;<span class="tp">string</span>&gt; skills, <span class="tp">List</span>&lt;<span class="tp">Project</span>&gt; projs,
        <span class="tp">List</span>&lt;<span class="tp">Language</span>&gt; langs,
        <span class="tp">string</span>? github, <span class="tp">string</span>? portfolio, <span class="tp">string</span>? linkedin)
    {
        _builder.Reset();
        _builder.SetPersonalInfo(name, email, phone);
        _builder.SetSummary(summary);
        exps.ForEach(_builder.AddExperience);
        edus.ForEach(_builder.AddEducation);
        _builder.AddSkills(skills);
        projs.ForEach(_builder.AddProject);
        langs.ForEach(_builder.AddLanguage);
        _builder.SetLinks(github, portfolio, linkedin);
    }
}`

const CONTROLLER_CS = `<span class="cm">/// ResumeController — HTTP API, заменяет MainForm (WinForms → React)</span>
[<span class="at">ApiController</span>]
[<span class="at">Route</span>(<span class="str">"api/[controller]"</span>)]
<span class="kw">public class</span> <span class="tp">ResumeController</span> : <span class="tp">ControllerBase</span>
{
    <span class="kw">private readonly</span> <span class="tp">ResumeDirector</span> _director = <span class="kw">new</span>();
    <span class="kw">private readonly</span> <span class="tp">Dictionary</span>&lt;<span class="tp">string</span>, <span class="tp">IResumeBuilder</span>&gt; _builders = <span class="kw">new</span>()
    {
        [<span class="str">"IT"</span>]       = <span class="kw">new</span> <span class="tp">ITResumeBuilder</span>(),
        [<span class="str">"Дизайнер"</span>] = <span class="kw">new</span> <span class="tp">DesignResumeBuilder</span>(),
        [<span class="str">"Менеджер"</span>] = <span class="kw">new</span> <span class="tp">ManagerResumeBuilder</span>()
    };

    <span class="cm">// ✓ ОДИН метод вместо трёх — полиморфизм через IResumeBuilder</span>
    [<span class="at">HttpPost</span>(<span class="str">"build"</span>)]
    <span class="kw">public</span> <span class="tp">IActionResult</span> <span class="fn">Build</span>([<span class="at">FromBody</span>] <span class="tp">BuildResumeRequest</span> req)
    {
        <span class="kw">if</span> (!_builders.TryGetValue(req.Template, <span class="kw">out var</span> builder))
            <span class="kw">return</span> BadRequest(<span class="str">"Неизвестный шаблон"</span>);

        _director.Builder = builder;
        _director.BuildFullResume(
            req.Name, req.Email, req.Phone,
            req.Summary,
            req.Experiences?.Select(e => <span class="kw">new</span> Experience(e.Company, e.Position, e.Start, e.End, e.Desc)).ToList() ?? <span class="kw">new</span>(),
            req.Educations?.Select(e => <span class="kw">new</span> Education(e.Institution, e.Degree, e.Year)).ToList() ?? <span class="kw">new</span>(),
            req.Skills ?? <span class="kw">new</span>(),
            req.Projects?.Select(p => <span class="kw">new</span> Project(p.Name, p.Desc, p.TechStack ?? <span class="kw">new</span>())).ToList() ?? <span class="kw">new</span>(),
            <span class="kw">new</span>(),
            req.GithubUrl, req.PortfolioUrl, req.LinkedinUrl
        );

        <span class="cm">// ✓ Иммутабельный Resume — результат Builder'а</span>
        <span class="tp">Resume</span> resume = builder.GetResult();
        <span class="kw">return</span> Ok(<span class="kw">new</span> { text = resume.ToString(), skills = resume.Skills });
    }
}`

export default function SectionCode2() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Раздел 04</div>
        <div className="sh-title">Код с паттерном Builder (C#) + React Frontend</div>
        <div className="sh-sub">C# бэкенд (ASP.NET Core) + React клиент вместо WinForms</div>
      </div>

      <CodeBlock filename="Resume.cs — Product (иммутабельный)">{RESUME_PRODUCT}</CodeBlock>
      <CodeBlock filename="IResumeBuilder.cs — Builder Interface">{INTERFACE_CS}</CodeBlock>
      <CodeBlock filename="ITResumeBuilder.cs — ConcreteBuilder">{IT_BUILDER_CS}</CodeBlock>
      <CodeBlock filename="DesignResumeBuilder.cs + ManagerResumeBuilder.cs">{OTHER_BUILDERS_CS}</CodeBlock>
      <CodeBlock filename="ResumeDirector.cs — Director">{DIRECTOR_CS}</CodeBlock>
      <CodeBlock filename="ResumeController.cs — Client (HTTP API, вместо WinForms MainForm)">{CONTROLLER_CS}</CodeBlock>
    </>
  )
}
