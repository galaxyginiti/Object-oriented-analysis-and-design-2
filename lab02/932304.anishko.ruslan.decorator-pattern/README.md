# ☕ Кофейня — Decorator Pattern (C++ 17)

> Структурный паттерн **Decorator**  на примере конфигуратора напитков кофейни.
>
> **Стек:** C++17 · CMake · cpp-httplib · nlohmann/json · React 18 · Vite 5 · Mantine 7

---

## Структура

```
932304.anishko.ruslan.decorator-pattern/
├── backend-no-pattern/          # Бэкенд БЕЗ паттерна
│   ├── CMakeLists.txt
│   └── main.cpp                 # Монолитный Beverage с булевыми флагами
│
├── backend-with-pattern/        # Бэкенд С паттерном
│   ├── CMakeLists.txt
│   ├── main.cpp                 # ⑤ Client — HTTP-сервер
│   └── include/
│       ├── Beverage.h           # ① Component
│       ├── ConcreteComponents.h # ② ConcreteComponent (Espresso, HouseBlend, …)
│       ├── CondimentDecorator.h # ③ Decorator
│       └── ConcreteDecorators.h # ④ ConcreteDecorator (Milk, Mocha, Whip, …)
│
└── frontend/                    # React GUI
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── components/
        │   ├── NavBar.jsx / NavBar.module.css
        │   ├── CodeBlock.jsx
        │   └── CoffeeOrderForm.jsx
        └── sections/
            ├── SectionDemo.jsx    # Демо — интерактивная форма заказа
            ├── SectionIdea.jsx    # Идея проекта + участники GoF
            ├── SectionUml1.jsx    # UML без паттерна
            ├── SectionUml2.jsx    # UML с паттерном
            ├── SectionCode1.jsx   # Код без паттерна
            ├── SectionCode2.jsx   # Код с паттерном
            └── SectionEnd.jsx     # Вывод + сравнение
```

---

## Паттерн Decorator 

| Роль              | Класс в проекте                                          |
| -------------------- | -------------------------------------------------------- |
| ① Component          | `Beverage`                                               |
| ② ConcreteComponent  | `Espresso`, `HouseBlend`, `DarkRoast`, `GreenTea`        |
| ③ Decorator          | `CondimentDecorator`                                     |
| ④ ConcreteDecorator  | `Milk`, `Mocha`, `Whip`, `Caramel`, `Vanilla`, `Soy`    |
| ⑤ Client             | `main()` — HTTP-обработчик                               |

---

## Запуск

### Backend (с паттерном)

```bash
cd backend-with-pattern
cmake -B build
cmake --build build --config Release
./build/Release/coffee_server        # http://localhost:5000
```

### Backend (без паттерна)

```bash
cd backend-no-pattern
cmake -B build
cmake --build build --config Release
./build/Release/coffee_server        # http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev                           # http://localhost:5173
```

> Frontend проксирует `/api` → `http://localhost:5000`.
> Если бэкенд не запущен, используется встроенная JS-логика (fallback).
