using CVBuilder.Api.Models;

namespace CVBuilder.Api.Builders;

/// <summary>
/// Builder — интерфейс шагов конструирования (GoF)
/// </summary>
public interface IResumeBuilder
{
    void Reset();
    void SetPersonalInfo(string fullName, string email, string phone);
    void SetSummary(string summary);
    void AddExperience(Experience exp);
    void AddEducation(Education edu);
    void AddSkills(List<string> skills);
    void AddProject(Project proj);
    void AddLanguage(Language lang);
    void SetLinks(string? github, string? portfolio, string? linkedin);
    Resume GetResult();
}
