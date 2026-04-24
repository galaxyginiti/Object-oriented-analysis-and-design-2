"""
Бэкенд БЕЗ паттерна Observer.
Вся логика свалена в одну кучу: при изменении температуры
вручную пересчитываем все состояния. Если добавится новый "дисплей",
придётся лезть в функцию set_temperature и дописывать туда ещё одну ветку.
Именно этой связанности паттерн Observer и позволяет избежать.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import httpx

# Координаты Томска для Open-Meteo (бесплатный API, без ключа)
TOMSK_LAT = 56.4977
TOMSK_LON = 84.9744
OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"


app = FastAPI(title="Weather Station (без паттерна)")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# Глобальное состояние — всё в одном месте
state = {
    "temperature": 0.0,
    "min": None,
    "max": None,
    "sum": 0.0,
    "count": 0,
}


class TemperaturePayload(BaseModel):
    value: float


def set_temperature(value: float) -> None:
    """
    Минус подхода: функция знает про ВСЕ дисплеи и сама их обновляет.
    Добавление нового "наблюдателя" требует править этот код.
    """
    state["temperature"] = value

    # Обновляем min/max
    if state["min"] is None or value < state["min"]:
        state["min"] = value
    if state["max"] is None or value > state["max"]:
        state["max"] = value

    # Обновляем статистику
    state["sum"] += value
    state["count"] += 1


@app.get("/state")
def get_state():
    avg = state["sum"] / state["count"] if state["count"] else 0.0
    return {
        "temperature": state["temperature"],
        "displays": [
            {"name": "current", "temperature": state["temperature"]},
            {"name": "min_max", "min": state["min"], "max": state["max"]},
            {"name": "stats", "average": round(avg, 2), "count": state["count"]},
        ],
    }


@app.post("/temperature")
def post_temperature(payload: TemperaturePayload):
    set_temperature(payload.value)
    return {"ok": True}


@app.post("/random")
def random_temperature():
    value = round(random.uniform(-20, 35), 1)
    set_temperature(value)
    return {"ok": True, "value": value}


@app.post("/tomsk")
def tomsk_temperature():
    """Реальная температура Томска через Open-Meteo (без ключа)."""
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
    set_temperature(value)
    return {"ok": True, "value": value, "source": "open-meteo", "city": "Tomsk"}
