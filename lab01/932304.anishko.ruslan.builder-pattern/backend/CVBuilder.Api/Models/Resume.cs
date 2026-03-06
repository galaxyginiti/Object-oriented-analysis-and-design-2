namespace CVBuilder.Api.Models;

/// <summary>
/// Product — иммутабельный объект. Только readonly, нет сеттеров. (GoF)
/// </summary>
public class Resume
{
    public string FullName { get; }
    public string Email { get; }
    public string Phone { get; }
    public string Summary { get; }
    public IReadOnlyList<Experience> Experiences { get; }
    public IReadOnlyList<Education> Educations { get; }
    public IReadOnlyList<string> Skills { get; }
    public IReadOnlyList<Project> Projects { get; }
    public IReadOnlyList<Language> Languages { get; }
    public string? GithubUrl { get; }
    public string? PortfolioUrl { get; }
    public string? LinkedinUrl { get; }

    // internal — только Builder может создавать
    internal Resume(string name, string email, string phone, string summary,
        List<Experience> exps, List<Education> edus,
        List<string> skills, List<Project> projs,
        List<Language> langs,
        string? github, string? portfolio, string? linkedin)
    {
        FullName = name; Email = email; Phone = phone; Summary = summary;
        Experiences = exps.AsReadOnly(); Educations = edus.AsReadOnly();
        Skills = skills.AsReadOnly(); Projects = projs.AsReadOnly();
        Languages = langs.AsReadOnly();
        GithubUrl = github; PortfolioUrl = portfolio; LinkedinUrl = linkedin;
    }

    public override string ToString()
    {
        var sb = new System.Text.StringBuilder();
        sb.AppendLine($"=== {FullName} ===");
        sb.AppendLine($"{Email} | {Phone}");
        if (!string.IsNullOrEmpty(Summary)) sb.AppendLine($"О себе: {Summary}");
        if (Experiences.Count > 0)
        {
            sb.AppendLine("--- Опыт ---");
            foreach (var e in Experiences) sb.AppendLine($"  {e.Company}, {e.Position} ({e.Start} – {e.End}): {e.Desc}");
        }
        if (Educations.Count > 0)
        {
            sb.AppendLine("--- Образование ---");
            foreach (var e in Educations) sb.AppendLine($"  {e.Institution}, {e.Degree} ({e.Year})");
        }
        if (Skills.Count > 0) sb.AppendLine($"Навыки: {string.Join(", ", Skills)}");
        if (Projects.Count > 0)
        {
            sb.AppendLine("--- Проекты ---");
            foreach (var p in Projects) sb.AppendLine($"  {p.Name}: {p.Desc} [{string.Join(", ", p.TechStack)}]");
        }
        if (GithubUrl != null) sb.AppendLine($"GitHub: {GithubUrl}");
        if (PortfolioUrl != null) sb.AppendLine($"Portfolio: {PortfolioUrl}");
        if (LinkedinUrl != null) sb.AppendLine($"LinkedIn: {LinkedinUrl}");
        return sb.ToString().TrimEnd();
    }
}

public record Experience(string Company, string Position, string Start, string End, string Desc);
public record Education(string Institution, string Degree, int Year);
public record Project(string Name, string Desc, List<string> TechStack);
public record Language(string Name, string Level);
