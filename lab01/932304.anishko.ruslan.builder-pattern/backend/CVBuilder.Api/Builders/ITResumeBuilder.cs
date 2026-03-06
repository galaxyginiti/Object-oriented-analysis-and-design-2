using CVBuilder.Api.Models;

namespace CVBuilder.Api.Builders;

/// <summary>
/// ConcreteBuilder: IT-специфика — GitHub обязателен, авто-добавляет Git и Linux
/// </summary>
public class ITResumeBuilder : IResumeBuilder
{
    private string _name = "", _email = "", _phone = "", _summary = "";
    private List<Experience> _exps = new();
    private List<Education> _edus = new();
    private List<string> _skills = new();
    private List<Project> _projs = new();
    private List<Language> _langs = new();
    private string? _github, _portfolio, _linkedin;

    public void Reset()
    {
        _name = _email = _phone = _summary = "";
        _exps = new(); _edus = new(); _skills = new();
        _projs = new(); _langs = new();
        _github = _portfolio = _linkedin = null;
    }

    public void SetPersonalInfo(string n, string e, string p) { _name = n; _email = e; _phone = p; }
    public void SetSummary(string s) => _summary = s;
    public void AddExperience(Experience e) => _exps.Add(e);
    public void AddEducation(Education e) => _edus.Add(e);

    public void AddSkills(List<string> s)
    {
        _skills.AddRange(s);
        if (!_skills.Contains("Git")) _skills.Add("Git");       // IT-специфика
        if (!_skills.Contains("Linux")) _skills.Add("Linux");   // IT-специфика
    }

    public void AddProject(Project p) => _projs.Add(p);
    public void AddLanguage(Language l) => _langs.Add(l);

    public void SetLinks(string? gh, string? pf, string? li)
    {
        _github = !string.IsNullOrWhiteSpace(gh) ? gh : "https://github.com/";
        _portfolio = pf;
        _linkedin = li;
    }

    public Resume GetResult()
    {
        var result = new Resume(_name, _email, _phone, _summary,
            _exps, _edus, _skills, _projs, _langs, _github, _portfolio, _linkedin);
        Reset();
        return result;
    }
}
