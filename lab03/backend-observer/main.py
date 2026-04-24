"""
Бэкенд С паттерном Observer.
Идея: погодная станция (Subject) рассылает обновления температуры
подписчикам-дисплеям (Observers): текущее значение, минимум/максимум,
статистика (среднее).
"""
from abc import ABC, abstractmethod
from typing import List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import httpx

# Координаты Томска для Open-Meteo (бесплатный API, без ключа)
TOMSK_LAT = 56.4977
TOMSK_LON = 84.9744
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"


# ---------- Паттерн Observer ----------

class Observer(ABC):
    """Абстрактный наблюдатель."""

    @abstractmethod
    def update(self, temperature: float) -> None:
        ...

    @abstractmethod
    def get_state(self) -> dict:
        ...


class Subject(ABC):
    """Абстрактный субъект (издатель)."""

    @abstractmethod
    def attach(self, observer: Observer) -> None:
        ...

    @abstractmethod
    def detach(self, observer: Observer) -> None:
        ...

    @abstractmethod
    def notify(self) -> None:
        ...


class WeatherStation(Subject):
    """Погодная станция — хранит температуру и оповещает наблюдателей."""

    def __init__(self) -> None:
        self._observers: List[Observer] = []
        self._temperature: float = 0.0

    def attach(self, observer: Observer) -> None:
        if observer not in self._observers:
            self._observers.append(observer)

    def detach(self, observer: Observer) -> None:
        if observer in self._observers:
            self._observers.remove(observer)

    def notify(self) -> None:
        for observer in self._observers:
            observer.update(self._temperature)

    def set_temperature(self, value: float) -> None:
        self._temperature = value
        self.notify()  # автоматически оповещаем всех подписчиков

    @property
    def temperature(self) -> float:
        return self._temperature


class CurrentDisplay(Observer):
    """Показывает текущую температуру."""

    def __init__(self) -> None:
        self._temperature: float = 0.0

    def update(self, temperature: float) -> None:
        self._temperature = temperature

    def get_state(self) -> dict:
        return {"name": "current", "temperature": self._temperature}


class MinMaxDisplay(Observer):
    """Показывает минимум и максимум."""

    def __init__(self) -> None:
        self._min: float | None = None
        self._max: float | None = None

    def update(self, temperature: float) -> None:
        self._min = temperature if self._min is None else min(self._min, temperature)
        self._max = temperature if self._max is None else max(self._max, temperature)

    def get_state(self) -> dict:
        return {"name": "min_max", "min": self._min, "max": self._max}


class StatsDisplay(Observer):
    """Считает среднее значение всех пришедших измерений."""

    def __init__(self) -> None:
        self._sum: float = 0.0
        self._count: int = 0

    def update(self, temperature: float) -> None:
        self._sum += temperature
        self._count += 1

    def get_state(self) -> dict:
        avg = self._sum / self._count if self._count else 0.0
        return {"name": "stats", "average": round(avg, 2), "count": self._count}


# ---------- Инициализация ----------

station = WeatherStation()
current_display = CurrentDisplay()
min_max_display = MinMaxDisplay()
stats_display = StatsDisplay()

station.attach(current_display)
station.attach(min_max_display)
station.attach(stats_display)


# ---------- FastAPI ----------

app = FastAPI(title="Weather Station (Observer)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class TemperaturePayload(BaseModel):
    value: float


@app.get("/state")
def get_state():
    """Возвращает состояние всех наблюдателей одним запросом."""
    return {
        "temperature": station.temperature,
        "displays": [
            current_display.get_state(),
            min_max_display.get_state(),
            stats_display.get_state(),
        ],
    }


@app.post("/temperature")
def set_temperature(payload: TemperaturePayload):
    """Устанавливаем новую температуру — Subject сам оповестит всех."""
    station.set_temperature(payload.value)
    return {"ok": True}


@app.post("/random")
def random_temperature():
    """Генерирует случайную температуру (удобно для демо)."""
    value = round(random.uniform(-20, 35), 1)
    station.set_temperature(value)
    return {"ok": True, "value": value}


@app.post("/tomsk")
def tomsk_temperature():
    """
    Берёт реальную текущую температуру в Томске через Open-Meteo
    и отдаёт её в Subject. Никакого API-ключа не нужно.
    """
    try:
        with httpx.Client(timeout=5.0) as client:
            response = client.get(
                OPEN_METEO_URL,
                params={
                    "latitude": TOMSK_LAT,
                    "longitude": TOMSK_LON,
                    "current_weather": "true",
                },
            )
            response.raise_for_status()
            data = response.json()
            value = float(data["current_weather"]["temperature"])
    except (httpx.HTTPError, KeyError, ValueError) as e:
        raise HTTPException(
            status_code=502,
            detail=f"Не удалось получить температуру Томска: {e}",
        )

    value = round(value, 1)
    station.set_temperature(value)
    return {"ok": True, "value": value, "source": "open-meteo", "city": "Tomsk"}
