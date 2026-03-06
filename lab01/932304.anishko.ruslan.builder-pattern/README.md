# Builder Pattern — CV Builder

Проект CV Builder: два бэкенда — **с паттерном Builder (GoF)** и **без паттерна** (для сравнения).  
Бэкенд: **C# ASP.NET Core 8**, Frontend: **React 18 + Vite 5 + Mantine 7**

## Структура

```
932304.anishko.ruslan.builder-pattern/
├── backend/
│   ├── CVBuilder.Api/                         — ✓ С паттерном Builder
│   │   ├── Builders/
│   │   │   ├── IResumeBuilder.cs              — ① Builder interface
│   │   │   ├── ITResumeBuilder.cs             — ② ConcreteBuilder (IT)
│   │   │   └── DesignAndManagerBuilders.cs    — ② ConcreteBuilders (Design, Manager)
│   │   ├── Director/
│   │   │   └── ResumeDirector.cs              — ④ Director
│   │   ├── Models/
│   │   │   ├── Resume.cs                      — ③ Product (immutable)
│   │   │   └── Dtos.cs                        — Request DTO
│   │   ├── Controllers/
│   │   │   └── ResumeController.cs            — ⑤ Client (HTTP)
│   │   ├── Program.cs
│   │   └── CVBuilder.Api.csproj
│   │
│   └── CVBuilder.NoPattern.Api/               — ✗ Без паттерна (антипаттерн)
│       ├── Models/
│       │   ├── Resume.cs                      — Мутабельный, телескопический конструктор
│       │   └── Dtos.cs
│       ├── Controllers/
│       │   └── ResumeController.cs            — 3 метода Create*Resume() с дублированием
│       ├── Program.cs
│       └── CVBuilder.NoPattern.Api.csproj
│
└── frontend/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── components/
    │   │   ├── NavBar.jsx
    │   │   ├── NavBar.module.css
    │   │   ├── CodeBlock.jsx
    │   │   └── CVBuilderForm.jsx              — React + live preview + экспорт
    │   └── sections/
    │       ├── SectionIdea.jsx
    │       ├── SectionUml2.jsx
    │       ├── SectionCode1.jsx
    │       ├── SectionCode2.jsx
    │       └── SectionEnd.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Запуск

### Backend С паттерном (порт 5000)
```bash
cd backend/CVBuilder.Api
dotnet run
# API: http://localhost:5000
# Swagger: http://localhost:5000/swagger
```

### Backend БЕЗ паттерна (порт 5001)
```bash
cd backend/CVBuilder.NoPattern.Api
dotnet run
# API: http://localhost:5001
# Swagger: http://localhost:5001/swagger
```

### Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
# Открыть: http://localhost:5173
# Прокси: /api → http://localhost:5000 (бэкенд с паттерном)
```

## Экспорт резюме

Из формы на фронте можно скачать резюме в форматах: **.txt**, **.json**, **.html**

## Паттерн Builder (GoF)

| Роль | Класс |
|------|-------|
| ① Builder (interface) | `IResumeBuilder` |
| ② ConcreteBuilder | `ITResumeBuilder`, `DesignResumeBuilder`, `ManagerResumeBuilder` |
| ③ Product | `Resume` (readonly, immutable) |
| ④ Director | `ResumeDirector` |
| ⑤ Client | `ResumeController` + `CVBuilderForm` (React) |
