using CVBuilder.Api.Builders;
using CVBuilder.Api.Models;

namespace CVBuilder.Api.Director;

/// <summary>
/// Director — управляет порядком вызова шагов Builder'а (GoF)
/// </summary>
public class ResumeDirector
{
    private IResumeBuilder _builder = null!;

    public IResumeBuilder Builder { set => _builder = value; }

    /// <summary>Минимальное резюме — только личные данные и навыки</summary>
    public void BuildMinimalResume(string name, string email, string phone, List<string> skills)
    {
        _builder.Reset();
        _builder.SetPersonalInfo(name, email, phone);
        _builder.AddSkills(skills);
    }

    /// <summary>Полное резюме — все секции</summary>
    public void BuildFullResume(
        string name, string email, string phone,
        string summary,
        List<Experience> exps,
        List<Education> edus,
        List<string> skills,
        List<Project> projs,
        List<Language> langs,
        string? github, string? portfolio, string? linkedin)
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
}
