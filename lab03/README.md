# Лабораторная работа №3 — Паттерн Observer

## Структура

```
lab03/
├── backend-observer/      # FastAPI бэкенд С паттерном Observer  (порт 8001)
├── backend-no-observer/   # FastAPI бэкенд БЕЗ паттерна          (порт 8002)
├── frontend/              # React + Mantine + Vite               (порт 5173)
└── docs/
    ├── observer-diagram.drawio   # UML-диаграмма (открыть в VS Code через Draw.io Integration)
    └── report.md                 # Отчёт
```

## Запуск

```bash
# Терминал 1 — бэкенд с паттерном
cd backend-observer
pip install -r requirements.txt
uvicorn main:app --port 8001 --reload

# Терминал 2 — бэкенд без паттерна
cd backend-no-observer
pip install -r requirements.txt
uvicorn main:app --port 8002 --reload

# Терминал 3 — фронтенд
cd frontend
npm install
npm run dev
```

Открыть http://localhost:5173 и переключаться между бэкендами прямо в UI.

## UML

Файл `docs/observer-diagram.drawio` открывается в VS Code расширением
**Draw.io Integration**. Диаграмма полностью соответствует коду
`backend-observer/main.py` и показывает:

- абстрактные классы `Subject` (методы `attach`, `detach`, `notify`) и
  `Observer` (`update`, `get_state`);
- `WeatherStation` реализует `Subject`, хранит `_observers` и
  `_temperature`, имеет `set_temperature(value)` и property `temperature`;
- `CurrentDisplay`, `MinMaxDisplay`, `StatsDisplay` реализуют `Observer`
  с собственными приватными полями;
- `Subject` агрегирует множество `Observer` (`_observers 0..*`);
- блок FastAPI endpoints (`/state`, `/temperature`, `/random`, `/tomsk`),
  который дёргает `WeatherStation`.

## Реальная температура Томска

Endpoint `POST /tomsk` (есть в обоих бэкендах) тянет текущую температуру
из Open-Meteo (бесплатный API, без ключа) и скармливает её Subject'у —
дальше всё как с обычным `/temperature`. Ручной ввод и кнопка
«Случайная» продолжают работать — это три разных источника данных для
одной и той же системы.
