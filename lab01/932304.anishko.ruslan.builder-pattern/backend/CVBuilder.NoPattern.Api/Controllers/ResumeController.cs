using CVBuilder.NoPattern.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CVBuilder.NoPattern.Api.Controllers;

/// <summary>
/// ResumeController — БЕЗ паттерна Builder.
/// ⚠ Три метода Create*Resume() с 80% дублирования кода.
/// ⚠ switch на шаблон — нарушает OCP.
/// ⚠ Контроллер напрямую конструирует Resume через телескопический конструктор.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    /// <summary>
    /// POST /api/resume/build — собрать резюме БЕЗ паттерна
    /// </summary>
    [HttpPost("build")]
    public IActionResult Build([FromBody] BuildResumeRequest req)
    {
        // ⚠ switch на тип шаблона — нарушает Open/Closed Principle
        Resume resume = req.Template switch
        {
            "IT"       => CreateITResume(req),
            "Дизайнер" => CreateDesignResume(req),
            "Менеджер" => CreateManagerResume(req),
            _          => CreateITResume(req)
        };

        return Ok(new
        {
            text = resume.ToString(),
            skills = resume.Skills,
            fullName = resume.FullName,
            email = resume.Email,
            phone = resume.Phone,
            githubUrl = resume.GithubUrl,
            portfolioUrl = resume.PortfolioUrl,
            linkedinUrl = resume.LinkedinUrl,
            template = req.Template
        });
    }

    // ⚠ ДУБЛИРОВАНИЕ: три метода с 80% одинакового кода

    /// <summary>IT-резюме: жёстко добавляет Git, Linux, github</summary>
    private static Resume CreateITResume(BuildResumeRequest req)
    {
        var skills = new List<string>(req.Skills ?? new());
        if (!skills.Contains("Git")) skills.Add("Git");
        if (!skills.Contains("Linux")) skills.Add("Linux");

        var exps = req.Experiences?.Select(e =>
        {
            var exp = new Experience { Company = e.Company, Position = e.Position, Start = e.Start, End = e.End, Desc = e.Desc };
            return exp;
        }).ToList() ?? new();

        var edus = req.Educations?.Select(e =>
        {
            var edu = new Education { Institution = e.Institution, Degree = e.Degree, Year = e.Year };
            return edu;
        }).ToList() ?? new();

        var projs = req.Projects?.Select(p =>
        {
            var proj = new Project { Name = p.Name, Desc = p.Desc, TechStack = p.TechStack ?? new() };
            return proj;
        }).ToList() ?? new();

        var github = !string.IsNullOrWhiteSpace(req.GithubUrl) ? req.GithubUrl : "https://github.com/";

        // ⚠ Телескопический конструктор — 11 аргументов
        return new Resume(
            req.Name, req.Email, req.Phone,
            req.Summary,
            exps, edus, skills, projs,
            github, req.PortfolioUrl, req.LinkedinUrl
        );
    }

    /// <summary>Дизайнер-резюме: жёстко добавляет Figma, Adobe CC, portfolio</summary>
    private static Resume CreateDesignResume(BuildResumeRequest req)
    {
        // ⚠ Почти полная копия CreateITResume — только навыки и ссылки другие
        var skills = new List<string>(req.Skills ?? new());
        if (!skills.Contains("Figma")) skills.Add("Figma");
        if (!skills.Contains("Adobe CC")) skills.Add("Adobe CC");

        var exps = req.Experiences?.Select(e =>
        {
            var exp = new Experience { Company = e.Company, Position = e.Position, Start = e.Start, End = e.End, Desc = e.Desc };
            return exp;
        }).ToList() ?? new();

        var edus = req.Educations?.Select(e =>
        {
            var edu = new Education { Institution = e.Institution, Degree = e.Degree, Year = e.Year };
            return edu;
        }).ToList() ?? new();

        var projs = req.Projects?.Select(p =>
        {
            var proj = new Project { Name = p.Name, Desc = p.Desc, TechStack = p.TechStack ?? new() };
            return proj;
        }).ToList() ?? new();

        var portfolio = !string.IsNullOrWhiteSpace(req.PortfolioUrl) ? req.PortfolioUrl : "https://behance.net/";

        // ⚠ Тот же телескопический конструктор
        return new Resume(
            req.Name, req.Email, req.Phone,
            req.Summary,
            exps, edus, skills, projs,
            req.GithubUrl, portfolio, req.LinkedinUrl
        );
    }

    /// <summary>Менеджер-резюме: жёстко добавляет Leadership, Agile/Scrum, linkedin</summary>
    private static Resume CreateManagerResume(BuildResumeRequest req)
    {
        // ⚠ Ещё одна копия — 80% кода идентично двум другим методам
        var skills = new List<string>(req.Skills ?? new());
        if (!skills.Contains("Leadership")) skills.Add("Leadership");
        if (!skills.Contains("Agile/Scrum")) skills.Add("Agile/Scrum");

        var exps = req.Experiences?.Select(e =>
        {
            var exp = new Experience { Company = e.Company, Position = e.Position, Start = e.Start, End = e.End, Desc = e.Desc };
            return exp;
        }).ToList() ?? new();

        var edus = req.Educations?.Select(e =>
        {
            var edu = new Education { Institution = e.Institution, Degree = e.Degree, Year = e.Year };
            return edu;
        }).ToList() ?? new();

        var projs = req.Projects?.Select(p =>
        {
            var proj = new Project { Name = p.Name, Desc = p.Desc, TechStack = p.TechStack ?? new() };
            return proj;
        }).ToList() ?? new();

        var linkedin = !string.IsNullOrWhiteSpace(req.LinkedinUrl) ? req.LinkedinUrl : "https://linkedin.com/in/";

        // ⚠ Тот же телескопический конструктор
        return new Resume(
            req.Name, req.Email, req.Phone,
            req.Summary,
            exps, edus, skills, projs,
            req.GithubUrl, req.PortfolioUrl, linkedin
        );
    }

    /// <summary>GET /api/resume/templates — список доступных шаблонов</summary>
    [HttpGet("templates")]
    public IActionResult GetTemplates() => Ok(new[] { "IT", "Дизайнер", "Менеджер" });
}
