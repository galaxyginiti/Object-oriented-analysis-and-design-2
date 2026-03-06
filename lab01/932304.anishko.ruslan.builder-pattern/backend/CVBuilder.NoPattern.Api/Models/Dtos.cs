namespace CVBuilder.NoPattern.Api.Models;

public class BuildResumeRequest
{
    public string Template { get; set; } = "IT"; // IT | Дизайнер | Менеджер
    public string Name { get; set; } = "";
    public string Email { get; set; } = "";
    public string Phone { get; set; } = "";
    public string Summary { get; set; } = "";
    public List<string>? Skills { get; set; }
    public List<ExperienceDto>? Experiences { get; set; }
    public List<EducationDto>? Educations { get; set; }
    public List<ProjectDto>? Projects { get; set; }
    public string? GithubUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public string? LinkedinUrl { get; set; }
}

public record ExperienceDto(string Company, string Position, string Start, string End, string Desc);
public record EducationDto(string Institution, string Degree, int Year);
public record ProjectDto(string Name, string Desc, List<string>? TechStack);
