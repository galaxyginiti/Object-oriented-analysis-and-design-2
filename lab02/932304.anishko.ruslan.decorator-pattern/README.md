# Лабораторная работа № 2 — Паттерн Decorator

**Студент:** Анишко Руслан, группа 932304  
**Дисциплина:** Объектно-ориентированный анализ и проектирование  
**Паттерн:** Decorator (Декоратор) — структурный паттерн  
**Стек:** C++17 · CMake · cpp-httplib · nlohmann/json · React 18 · Vite 5 · Mantine 7

---

## 1. Цель работы

Изучить структурный паттерн проектирования Decorator на практике. Реализовать конфигуратор напитков кофейни двумя способами — с применением паттерна и без него — для наглядного сравнения архитектурных решений и демонстрации преимуществ Decorator.

---

## 2. Постановка задачи

Реализовать конфигуратор напитков кофейни двумя способами:

| Вариант | Описание |
|---|---|
| **Без паттерна** | Монолитный `struct Beverage` с булевыми флагами для каждой добавки |
| **С паттерном** | Иерархия классов Decorator: компонент оборачивается декораторами |

---

## 3. Теоретическая справка

### 3.1 Определение паттерна

**Decorator** — структурный паттерн проектирования, который позволяет динамически добавлять объектам новые обязанности, оборачивая их в объекты-декораторы, реализующие тот же интерфейс. Является гибкой альтернативой созданию подклассов для каждой комбинации функциональностей.

### 3.2 Участники паттерна

| Роль | Класс в проекте | Назначение |
|---|---|---|
| **Component** | `Beverage` | Абстрактный базовый класс напитка, определяет интерфейс |
| **ConcreteComponent** | `Espresso`, `HouseBlend`, `DarkRoast`, `GreenTea` | Конкретные базовые напитки |
| **Decorator** | `CondimentDecorator` | Хранит `wrappee: Beverage`, делегирует вызовы внутреннему объекту |
| **ConcreteDecorator** | `Milk`, `Mocha`, `Whip`, `Caramel`, `Vanilla`, `Soy` | Конкретные добавки-декораторы |
| **Client** | `main()` / HTTP-обработчик | Собирает цепочку декораторов |

---

## 4. UML-диаграмма

![UML-диаграмма паттерна Decorator](decorator-uml.png)

### Ключевые связи на диаграмме

| Связь | Тип | Описание |
|---|---|---|
| `Espresso/HouseBlend/DarkRoast/GreenTea` → `Beverage` | Generalization (△) | Наследование абстрактного класса — конкретные напитки |
| `CondimentDecorator` → `Beverage` | Generalization (△) | Декоратор сам **является** Beverage |
| `CondimentDecorator` ◇── `Beverage` | Aggregation (◇) | Поле `wrappee` — ссылка на оборачиваемый объект |
| `Milk/Mocha/Whip` → `CondimentDecorator` | Generalization (△) | Конкретные декораторы (снизу) |
| `Soy/Vanilla/Caramel` → `CondimentDecorator` | Generalization (△) | Конкретные декораторы (справа, через агрегацию) |

**Ключевой момент:** `CondimentDecorator` одновременно наследует `Beverage` и содержит поле `wrappee: Beverage` (агрегация). Это позволяет оборачивать любой напиток (в том числе уже обёрнутый) в произвольное количество декораторов.

---

## 5. Проблема без паттерна

```cpp
// ⚠ Все добавки — булевы поля в базовом классе
struct Beverage {
    bool hasMilk    = false;   // +0.30
    bool hasMocha   = false;   // +0.50
    bool hasWhip    = false;   // +0.40
    bool hasCaramel = false;   // +0.45
    // ...хочешь новую добавку? Добавь поле + измени getCost() + getDescription()

    double getCost() const {
        double total = baseCost;
        if (hasMilk)    total += 0.30;  // ⚠ растёт с каждой добавкой
        if (hasMocha)   total += 0.50;
        // ...
        return total;
    }
};
```

**Нарушения:**
- **OCP** — добавление новой добавки требует изменения базового класса
- **God Object** — один класс отвечает за всё
- Нельзя добавить двойной мокко (`bool` = только один раз)
- Комбо-напитки жёстко захардкожены

---

## 6. Решение с паттерном Decorator

### Component

```cpp
// Beverage.h — абстрактный базовый класс
class Beverage {
public:
    virtual ~Beverage() = default;
    virtual std::string getDescription() const = 0;
    virtual double      getCost()        const = 0;
};
```

### ConcreteComponent

```cpp
// ConcreteComponents.h
class Espresso : public Beverage {
public:
    std::string getDescription() const override { return "Эспрессо"; }
    double      getCost()        const override { return 1.99; }
};
```

### Decorator

```cpp
// CondimentDecorator.h
class CondimentDecorator : public Beverage {
protected:
    std::unique_ptr<Beverage> beverage_;  // wrappee
public:
    explicit CondimentDecorator(std::unique_ptr<Beverage> b)
        : beverage_(std::move(b)) {}
};
```

### ConcreteDecorator

```cpp
// ConcreteDecorators.h
class Milk : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string getDescription() const override {
        return beverage_->getDescription() + " + Молоко";
    }
    double getCost() const override {
        return beverage_->getCost() + 0.30;  // делегирует + добавляет
    }
};
```

### Client — сборка цепочки

```cpp
// Создаём ConcreteComponent
std::unique_ptr<Beverage> drink = std::make_unique<Espresso>();

// Оборачиваем декораторами
drink = std::make_unique<Milk>(std::move(drink));   // +0.30
drink = std::make_unique<Mocha>(std::move(drink));  // +0.50
drink = std::make_unique<Mocha>(std::move(drink));  // +0.50 (двойной!)

// Полиморфный вызов проходит по всей цепочке
std::cout << drink->getDescription();  // Эспрессо + Молоко + Мокко + Мокко
std::cout << drink->getCost();         // 1.99 + 0.30 + 0.50 + 0.50 = 3.29
```

---

## 7. Сравнение подходов

| Критерий | Без паттерна | С паттерном |
|---|---|---|
| Новая добавка | Изменить `Beverage` | Новый класс, 0 изменений |
| Двойная добавка | Невозможно (bool) | `Mocha(Mocha(drink))` |
| OCP | Нарушен | Соблюдён |
| Размер кода | Растёт экспоненциально | Линейный рост |
| Тестируемость | Сложно (зависимости) | Каждый класс изолированно |

---

## 8. Структура проекта

```
932304.anishko.ruslan.decorator-pattern/
├── backend-no-pattern/        # Без паттерна
│   ├── CMakeLists.txt
│   └── main.cpp               # Монолитный Beverage с bool-флагами
│
├── backend-with-pattern/      # С паттерном Decorator
│   ├── CMakeLists.txt
│   ├── main.cpp               # Client (HTTP-сервер, сборка цепочки)
│   └── include/
│       ├── Beverage.h         # Component
│       ├── ConcreteComponents.h  # Espresso, HouseBlend, DarkRoast, GreenTea
│       ├── CondimentDecorator.h  # Decorator (wrappee)
│       └── ConcreteDecorators.h  # Milk, Mocha, Whip, Caramel, Vanilla, Soy
│
└── frontend/                  # React 18 + Vite + Mantine
    └── src/sections/
        ├── SectionDemo.jsx    # Интерактивная форма заказа
        ├── SectionIdea.jsx    # Идея и участники паттерна
        ├── SectionUml2.jsx    # UML-диаграмма с паттерном
        ├── SectionCode1.jsx   # Код без паттерна
        ├── SectionCode2.jsx   # Код с паттерном
        └── SectionEnd.jsx     # Вывод и сравнение
```

---

## 9. Запуск

### Backend (с паттерном)

```bash
cd backend-with-pattern
cmake -B build
cmake --build build
./build/coffee_server        # http://localhost:5000
```

### Backend (без паттерна)

```bash
cd backend-no-pattern
cmake -B build
cmake --build build
./build/coffee_server_no_pattern
```

### Frontend

```bash
cd frontend
npm install
npm run dev                  # http://localhost:5173
```

> Frontend проксирует `/api` → `http://localhost:5000`.
> Если бэкенд не запущен, используется встроенная JS-логика (fallback).

---

## 10. Выводы

В ходе выполнения лабораторной работы был изучен и реализован структурный паттерн проектирования **Decorator** на примере конфигуратора напитков кофейни.

### Результаты работы

1. **Реализованы два варианта системы** — без паттерна (монолитный подход с булевыми флагами) и с паттерном Decorator (иерархия классов с оборачиванием), что позволило наглядно продемонстрировать преимущества паттерна.

2. **Принцип открытости/закрытости (OCP)** — при использовании паттерна Decorator классы `Beverage` и `CondimentDecorator` закрыты для изменений и открыты для расширения. Добавление новой добавки (например, «Корица») требует создания только одного нового класса без модификации существующего кода.

3. **Композиция вместо наследования** — вместо создания N×M подклассов для каждой комбинации «напиток + добавки» используется N компонентов + M декораторов. Это кардинально снижает количество классов и сложность системы.

4. **Принцип единственной ответственности (SRP)** — каждый конкретный декоратор (`Milk`, `Mocha`, `Whip` и др.) отвечает строго за одну добавку: знает её название и стоимость.

5. **Рекурсивная структура** — вызов `getCost()` автоматически проходит по всей цепочке декораторов благодаря делегированию внутреннему объекту `wrappee`. Клиентский код работает с обёрнутым объектом точно так же, как с оригинальным.

6. **Гибкость и комбинаторика** — одна и та же добавка может применяться несколько раз (например, двойной мокко: `Mocha(Mocha(drink))`), что невозможно при подходе с булевыми флагами.

7. **Практическая реализация** — разработан полнофункциональный HTTP-сервер на C++17 с REST API и React-фронтенд с интерактивной формой заказа, наглядно демонстрирующий работу паттерна.

### Заключение

Паттерн Decorator является мощным инструментом для динамического расширения функциональности объектов без модификации их исходного кода. Он особенно эффективен в задачах, где необходимо комбинировать различные независимые модификации в произвольном порядке и количестве. Реализация на примере кофейни наглядно продемонстрировала, как Decorator устраняет проблемы монолитного подхода и позволяет строить гибкую, расширяемую архитектуру, соответствующую принципам SOLID.

