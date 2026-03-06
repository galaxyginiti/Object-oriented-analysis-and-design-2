# Builder Pattern — CV Builder

Проект CV Builder с паттерном **Builder (GoF)**.  
Бэкенд: **C# ASP.NET Core 8**, Frontend: **React 18 + Vite 5 + Mantine 7**

## Структура

```
932304.anishko.ruslan.builder-pattern/
├── backend/
│   └── CVBuilder.Api/
│       ├── Builders/
│       │   ├── IResumeBuilder.cs          — ① Builder interface
│       │   ├── ITResumeBuilder.cs         — ② ConcreteBuilder (IT)
│       │   └── DesignAndManagerBuilders.cs — ② ConcreteBuilders (Design, Manager)
│       ├── Director/
│       │   └── ResumeDirector.cs          — ④ Director
│       ├── Models/
│       │   ├── Resume.cs                  — ③ Product (immutable)
│       │   └── Dtos.cs                    — Request DTO
│       ├── Controllers/
│       │   └── ResumeController.cs        — ⑤ Client (HTTP, вместо WinForms)
│       ├── Program.cs
│       └── CVBuilder.Api.csproj
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── components/
    │   │   ├── NavBar.jsx
    │   │   ├── NavBar.module.css
    │   │   ├── CodeBlock.jsx
    │   │   └── CVBuilderForm.jsx          — React замена WinForms MainForm
    │   └── sections/
    │       ├── SectionIdea.jsx
    │       ├── SectionUml1.jsx
    │       ├── SectionUml2.jsx
    │       ├── SectionCode1.jsx
    │       ├── SectionCode2.jsx
    │       └── SectionEnd.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Запуск

### Backend (C# API)
```bash
cd backend/CVBuilder.Api
dotnet run
# API доступен на http://localhost:5000
# Swagger UI: http://localhost:5000/swagger
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
# Открыть: http://localhost:5173
```

## Паттерн Builder (GoF)

| Роль | Класс |
|------|-------|
| ① Builder (interface) | `IResumeBuilder` |
| ② ConcreteBuilder | `ITResumeBuilder`, `DesignResumeBuilder`, `ManagerResumeBuilder` |
| ③ Product | `Resume` (readonly, immutable) |
| ④ Director | `ResumeDirector` |
| ⑤ Client | `ResumeController` + `CVBuilderForm` (React) |
