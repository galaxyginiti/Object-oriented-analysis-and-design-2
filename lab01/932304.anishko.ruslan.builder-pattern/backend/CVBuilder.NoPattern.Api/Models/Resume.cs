namespace CVBuilder.NoPattern.Api.Models;

/// <summary>
/// Resume — БЕЗ паттерна Builder.
/// Мутабельный объект с public set на всех свойствах.
/// Телескопический конструктор с 12 параметрами.
/// </summary>
public class Resume
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Summary { get; set; }
    public List<Experience> Experiences { get; set; } = new();
    public List<Education> Educations { get; set; } = new();
    public List<string> Skills { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
    public string? GithubUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public string? LinkedinUrl { get; set; }

    // ⚠ Телескопический конструктор — 11 параметров, легко перепутать порядок
    public Resume(string fullName, string email, string phone,
        string summary,
        List<Experience> experiences, List<Education> educations,
        List<string> skills, List<Project> projects,
        string? githubUrl, string? portfolioUrl, string? linkedinUrl)
    {
        FullName = fullName;
        Email = email;
        Phone = phone;
        Summary = summary;
        Experiences = experiences;
        Educations = educations;
        Skills = skills;
        Projects = projects;
        GithubUrl = githubUrl;
        PortfolioUrl = portfolioUrl;
        LinkedinUrl = linkedinUrl;
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

public class Experience
{
    public string Company { get; set; } = "";
    public string Position { get; set; } = "";
    public string Start { get; set; } = "";
    public string End { get; set; } = "";
    public string Desc { get; set; } = "";
}

public class Education
{
    public string Institution { get; set; } = "";
    public string Degree { get; set; } = "";
    public int Year { get; set; }
}

public class Project
{
    public string Name { get; set; } = "";
    public string Desc { get; set; } = "";
    public List<string> TechStack { get; set; } = new();
}
