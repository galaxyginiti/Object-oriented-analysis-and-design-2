// ============================================================
// Кофейня — С паттерном Decorator
// ============================================================
// Участники паттерна:
//   ① Component       — Beverage  (абстрактный интерфейс)
//   ② ConcreteComponent — Espresso, HouseBlend, DarkRoast, GreenTea
//   ③ Decorator        — CondimentDecorator (хранит указатель на Component)
//   ④ ConcreteDecorator — Milk, Mocha, Whip, Caramel, Vanilla, Soy
//   ⑤ Client           — main() / HTTP-обработчик
// ============================================================

#include <httplib.h>
#include <nlohmann/json.hpp>

#include "Beverage.h"
#include "ConcreteComponents.h"
#include "CondimentDecorator.h"
#include "ConcreteDecorators.h"

#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>
#include <functional>

using json = nlohmann::json;

// Фабрика базовых напитков
using BeverageFactory = std::function<std::unique_ptr<Beverage>()>;

static const std::unordered_map<std::string, BeverageFactory> beverageFactories = {
    {"Espresso",   [] { return std::make_unique<Espresso>();   }},
    {"HouseBlend", [] { return std::make_unique<HouseBlend>(); }},
    {"DarkRoast",  [] { return std::make_unique<DarkRoast>();  }},
    {"GreenTea",   [] { return std::make_unique<GreenTea>();   }},
};

// Фабрика добавок-декораторов
using DecoratorFactory = std::function<std::unique_ptr<Beverage>(std::unique_ptr<Beverage>)>;

static const std::unordered_map<std::string, DecoratorFactory> condimentFactories = {
    {"Milk",    [](auto b) { return std::make_unique<Milk>(std::move(b));    }},
    {"Mocha",   [](auto b) { return std::make_unique<Mocha>(std::move(b));   }},
    {"Whip",    [](auto b) { return std::make_unique<Whip>(std::move(b));    }},
    {"Caramel", [](auto b) { return std::make_unique<Caramel>(std::move(b)); }},
    {"Vanilla", [](auto b) { return std::make_unique<Vanilla>(std::move(b)); }},
    {"Soy",     [](auto b) { return std::make_unique<Soy>(std::move(b));     }},
};

// ─────────────────── HTTP-сервер ───────────────────

int main() {
    httplib::Server svr;

    svr.Get("/api/beverages", [](const httplib::Request&, httplib::Response& res) {
        json j = json::array({
            {{"id","Espresso"},  {"name","Эспрессо"},       {"cost",1.99}},
            {{"id","HouseBlend"},{"name","Домашняя смесь"}, {"cost",0.89}},
            {{"id","DarkRoast"}, {"name","Тёмная обжарка"}, {"cost",1.05}},
            {{"id","GreenTea"},  {"name","Зелёный чай"},    {"cost",0.99}}
        });
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(j.dump(), "application/json");
    });

    svr.Get("/api/condiments", [](const httplib::Request&, httplib::Response& res) {
        json j = json::array({
            {{"id","Milk"},   {"name","Молоко"},  {"cost",0.30}},
            {{"id","Mocha"},  {"name","Мокко"},   {"cost",0.50}},
            {{"id","Whip"},   {"name","Сливки"},  {"cost",0.40}},
            {{"id","Caramel"},{"name","Карамель"},{"cost",0.45}},
            {{"id","Vanilla"},{"name","Ваниль"},  {"cost",0.35}},
            {{"id","Soy"},    {"name","Соя"},     {"cost",0.25}}
        });
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_content(j.dump(), "application/json");
    });

    svr.Post("/api/order", [](const httplib::Request& req, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");

        auto body = json::parse(req.body, nullptr, false);
        if (body.is_discarded()) {
            res.status = 400;
            res.set_content(R"({"error":"Invalid JSON"})", "application/json");
            return;
        }

        std::string bevId = body.value("beverage", "");

        auto it = beverageFactories.find(bevId);
        if (it == beverageFactories.end()) {
            res.status = 400;
            res.set_content(R"({"error":"Unknown beverage"})", "application/json");
            return;
        }

        // ① Создаём базовый напиток (ConcreteComponent)
        std::unique_ptr<Beverage> drink = it->second();

        // ② Последовательно оборачиваем декораторами
        if (body.contains("condiments") && body["condiments"].is_array()) {
            for (const auto& c : body["condiments"]) {
                std::string cId = c.get<std::string>();
                auto cit = condimentFactories.find(cId);
                if (cit != condimentFactories.end()) {
                    drink = cit->second(std::move(drink));
                }
            }
        }

        // ③ Полиморфный вызов — Description и Cost учитывают всю цепочку
        json result = {
            {"description", drink->getDescription()},
            {"cost",        drink->getCost()}
        };
        res.set_content(result.dump(), "application/json");
    });

    svr.Options("/(.*)", [](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
    });

    std::cout << "Decorator Pattern Server: http://localhost:5000\n";
    svr.listen("0.0.0.0", 5000);
}
