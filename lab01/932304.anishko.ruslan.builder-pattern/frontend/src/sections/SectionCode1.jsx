import CodeBlock from '../components/CodeBlock'

const RESUME_CS = `<span class="kw">using</span> System.Collections.Generic;

<span class="kw">public class</span> <span class="tp">Resume</span>
{
    <span class="kw">public</span> <span class="tp">string</span> FullName { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Email { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Phone { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Summary { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">List</span>&lt;<span class="tp">Experience</span>&gt; Experiences { <span class="kw">get</span>; <span class="kw">set</span>; } = <span class="kw">new</span>();
    <span class="kw">public</span> <span class="tp">List</span>&lt;<span class="tp">Education</span>&gt; Educations { <span class="kw">get</span>; <span class="kw">set</span>; } = <span class="kw">new</span>();
    <span class="kw">public</span> <span class="tp">List</span>&lt;<span class="tp">string</span>&gt; Skills { <span class="kw">get</span>; <span class="kw">set</span>; } = <span class="kw">new</span>();
    <span class="kw">public</span> <span class="tp">List</span>&lt;<span class="tp">Project</span>&gt; Projects { <span class="kw">get</span>; <span class="kw">set</span>; } = <span class="kw">new</span>();
    <span class="kw">public</span> <span class="tp">List</span>&lt;<span class="tp">Language</span>&gt; Languages { <span class="kw">get</span>; <span class="kw">set</span>; } = <span class="kw">new</span>();
    <span class="kw">public</span> <span class="tp">string</span>? GithubUrl { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span>? PortfolioUrl { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span>? LinkedinUrl { <span class="kw">get</span>; <span class="kw">set</span>; }

    <span class="cm">// ⚠ Телескопический конструктор — 12 параметров</span>
    <span class="kw">public</span> <span class="fn">Resume</span>(<span class="tp">string</span> fullName, <span class="tp">string</span> email, <span class="tp">string</span> phone,
        <span class="tp">string</span> summary, <span class="tp">List</span>&lt;<span class="tp">Experience</span>&gt; exps, <span class="tp">List</span>&lt;<span class="tp">Education</span>&gt; edus,
        <span class="tp">List</span>&lt;<span class="tp">string</span>&gt; skills, <span class="tp">List</span>&lt;<span class="tp">Project</span>&gt; projs,
        <span class="tp">List</span>&lt;<span class="tp">Language</span>&gt; langs,
        <span class="tp">string</span>? github, <span class="tp">string</span>? portfolio, <span class="tp">string</span>? linkedin)
    {
        FullName = fullName; Email = email; Phone = phone;
        Summary = summary; Experiences = exps; Educations = edus;
        Skills = skills; Projects = projs; Languages = langs;
        GithubUrl = github; PortfolioUrl = portfolio; LinkedinUrl = linkedin;
    }
}

<span class="kw">public class</span> <span class="tp">Experience</span>
{
    <span class="kw">public</span> <span class="tp">string</span> Company { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Position { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Start { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> End { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Desc { <span class="kw">get</span>; <span class="kw">set</span>; }
}
<span class="kw">public class</span> <span class="tp">Education</span>
{
    <span class="kw">public</span> <span class="tp">string</span> Institution { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Degree { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="kw">int</span> Year { <span class="kw">get</span>; <span class="kw">set</span>; }
}
<span class="kw">public class</span> <span class="tp">Project</span>
{
    <span class="kw">public</span> <span class="tp">string</span> Name { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Desc { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">List</span>&lt;<span class="tp">string</span>&gt; TechStack { <span class="kw">get</span>; <span class="kw">set</span>; } = <span class="kw">new</span>();
}
<span class="kw">public class</span> <span class="tp">Language</span>
{
    <span class="kw">public</span> <span class="tp">string</span> Name { <span class="kw">get</span>; <span class="kw">set</span>; }
    <span class="kw">public</span> <span class="tp">string</span> Level { <span class="kw">get</span>; <span class="kw">set</span>; }
}`

const MAINFORM_CS = `<span class="kw">using</span> System.Windows.Forms;

<span class="kw">public class</span> <span class="tp">MainForm</span> : <span class="tp">Form</span>
{
    <span class="kw">private</span> <span class="tp">TextBox</span> txtName, txtEmail, txtPhone, txtSummary;
    <span class="kw">private</span> <span class="tp">TextBox</span> txtCompany, txtPosition, txtExpDesc;
    <span class="kw">private</span> <span class="tp">TextBox</span> txtInstitution, txtDegree, txtYear, txtSkills;
    <span class="kw">private</span> <span class="tp">TextBox</span> txtProjName, txtProjDesc, txtProjTech;
    <span class="kw">private</span> <span class="tp">TextBox</span> txtGithub, txtPortfolio, txtLinkedin;
    <span class="kw">private</span> <span class="tp">ComboBox</span> cmbTemplate;
    <span class="kw">private</span> <span class="tp">TextBox</span> txtPreview;

    <span class="cm">// ⚠ ДУБЛИРОВАНИЕ: 3 метода с 80% одинакового кода</span>
    <span class="kw">private</span> <span class="tp">Resume</span> <span class="fn">CreateITResume</span>()
    {
        <span class="kw">var</span> exps = <span class="kw">new</span> <span class="tp">List</span>&lt;<span class="tp">Experience</span>&gt;();
        <span class="kw">if</span> (txtCompany.Text != <span class="str">""</span>)
            exps.Add(<span class="kw">new</span>(txtCompany.Text, txtPosition.Text, <span class="str">"2020"</span>, <span class="str">"н.в."</span>, txtExpDesc.Text));
        <span class="kw">var</span> skills = <span class="kw">new</span> <span class="tp">List</span>&lt;<span class="tp">string</span>&gt;(txtSkills.Text.Split(<span class="str">','</span>));

        <span class="cm">// ⚠ 12 аргументов — какой за что отвечает?</span>
        <span class="kw">return new</span> <span class="tp">Resume</span>(txtName.Text, txtEmail.Text, txtPhone.Text,
            txtSummary.Text, exps, <span class="kw">new</span>(), skills, <span class="kw">new</span>(), <span class="kw">new</span>(),
            txtGithub.Text, <span class="kw">null</span>, txtLinkedin.Text);
    }

    <span class="cm">// ⚠ Почти копия — только Portfolio вместо GitHub</span>
    <span class="kw">private</span> <span class="tp">Resume</span> <span class="fn">CreateDesignResume</span>()
    {
        <span class="cm">// ... тот же код сбора данных из полей ...</span>
        <span class="kw">return new</span> <span class="tp">Resume</span>(txtName.Text, txtEmail.Text, txtPhone.Text,
            txtSummary.Text, <span class="kw">new</span>(), <span class="kw">new</span>(), <span class="kw">new</span>(), <span class="kw">new</span>(), <span class="kw">new</span>(),
            <span class="kw">null</span>, txtPortfolio.Text, txtLinkedin.Text);
    }

    <span class="cm">// ⚠ Ещё один дубль для менеджера</span>
    <span class="kw">private</span> <span class="tp">Resume</span> <span class="fn">CreateManagerResume</span>() { <span class="cm">/* аналогично, только LinkedIn */</span> }

    <span class="kw">private void</span> <span class="fn">OnSubmit</span>(<span class="tp">object</span> sender, <span class="tp">EventArgs</span> e)
    {
        <span class="cm">// ⚠ switch на тип — нарушает OCP</span>
        <span class="tp">Resume</span> resume = cmbTemplate.Text <span class="kw">switch</span>
        {
            <span class="str">"IT"</span>       => CreateITResume(),
            <span class="str">"Дизайнер"</span> => CreateDesignResume(),
            <span class="str">"Менеджер"</span> => CreateManagerResume(),
            _          => CreateITResume()
        };
        txtPreview.Text = resume.ToString();
    }
}`

export default function SectionCode1() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Раздел 04</div>
        <div className="sh-title">Код без паттерна (C#)</div>
        <div className="sh-sub">Соответствует UML из раздела 02</div>
      </div>
      <CodeBlock filename="Resume.cs — без паттерна">{RESUME_CS}</CodeBlock>
      <CodeBlock filename="MainForm.cs — GUI без паттерна (WinForms)">{MAINFORM_CS}</CodeBlock>
    </>
  )
}
