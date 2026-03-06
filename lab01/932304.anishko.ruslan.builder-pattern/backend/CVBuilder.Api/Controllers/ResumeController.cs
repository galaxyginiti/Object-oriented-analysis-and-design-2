using CVBuilder.Api.Builders;
using CVBuilder.Api.Director;
using CVBuilder.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace CVBuilder.Api.Controllers;

/// <summary>
/// ResumeController — HTTP Client слой, заменяет WinForms MainForm.
/// Pattern: Director.BuildFullResume() + ConcreteBuilder → Resume (иммутабельный Product)
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ResumeController : ControllerBase
{
    private readonly ResumeDirector _director = new();

    // ✓ Один словарь — Builder'ы по шаблону (OCP: новый шаблон = новый Builder)
    private readonly Dictionary<string, IResumeBuilder> _builders = new()
    {
        ["IT"]        = new ITResumeBuilder(),
        ["Дизайнер"]  = new DesignResumeBuilder(),
        ["Менеджер"]  = new ManagerResumeBuilder()
    };

    /// <summary>
    /// POST /api/resume/build — собрать резюме через паттерн Builder
    /// </summary>
    [HttpPost("build")]
    public IActionResult Build([FromBody] BuildResumeRequest req)
    {
        if (!_builders.TryGetValue(req.Template, out var builder))
            return BadRequest(new { error = $"Неизвестный шаблон: {req.Template}. Доступны: IT, Дизайнер, Менеджер" });

        // ✓ ОДИН метод — полиморфизм через IResumeBuilder
        _director.Builder = builder;
        _director.BuildFullResume(
            req.Name, req.Email, req.Phone,
            req.Summary,
            req.Experiences?.Select(e => new Experience(e.Company, e.Position, e.Start, e.End, e.Desc)).ToList() ?? new(),
            req.Educations?.Select(e => new Education(e.Institution, e.Degree, e.Year)).ToList() ?? new(),
            req.Skills ?? new(),
            req.Projects?.Select(p => new Project(p.Name, p.Desc, p.TechStack ?? new())).ToList() ?? new(),
            req.Languages?.Select(l => new Language(l.Name, l.Level)).ToList() ?? new(),
            req.GithubUrl, req.PortfolioUrl, req.LinkedinUrl
        );

        // ✓ Иммутабельный Resume — пришёл из Builder'а
        Resume resume = builder.GetResult();

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

    /// <summary>GET /api/resume/templates — список доступных шаблонов</summary>
    [HttpGet("templates")]
    public IActionResult GetTemplates() => Ok(_builders.Keys);
}
