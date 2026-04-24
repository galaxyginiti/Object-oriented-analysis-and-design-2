// ============================================================
// Кофейня — БЕЗ паттерна Decorator
// ============================================================
// Проблемы:
//   1) Базовый класс Beverage содержит ВСЕ добавки как флаги
//   2) getCost() и getDescription() — огромные if-else цепочки
//   3) Добавление новой добавки → изменение базового класса (нарушение OCP)
//   4) Комбо-напитки — жёстко закодированы (class explosion)
// ============================================================

#include <httplib.h>
#include <nlohmann/json.hpp>
#include <iostream>
#include <string>
#include <vector>
#include <cmath>

using json = nlohmann::json;

// ⚠ Все добавки хранятся как булевы поля в базовом классе
struct Beverage {
    std::string baseName;
    double      baseCost = 0.0;

    bool hasMilk    = false;   // +0.30
    bool hasMocha   = false;   // +0.50
    bool hasWhip    = false;   // +0.40
    bool hasCaramel = false;   // +0.45
    bool hasVanilla = false;   // +0.35
    bool hasSoy     = false;   // +0.25
    // ⚠ Хотим добавить "Корицу"? Нужно добавить ещё одно поле
    //    и изменить getCost() и getDescription() ниже

    // ⚠ Огромная функция — растёт с каждой новой добавкой
    double getCost() const {
        double total = baseCost;
        if (hasMilk)    total += 0.30;
        if (hasMocha)   total += 0.50;
        if (hasWhip)    total += 0.40;
        if (hasCaramel) total += 0.45;
        if (hasVanilla) total += 0.35;
        if (hasSoy)     total += 0.25;
        return std::round(total * 100.0) / 100.0;
    }

    // ⚠ Дублирование логики — та же структура что и getCost()
    std::string getDescription() const {
        std::string desc = baseName;
        if (hasMilk)    desc += " + Молоко";
        if (hasMocha)   desc += " + Мокко";
        if (hasWhip)    desc += " + Сливки";
        if (hasCaramel) desc += " + Карамель";
        if (hasVanilla) desc += " + Ваниль";
        if (hasSoy)     desc += " + Соя";
        return desc;
    }
};

// ⚠ Фабричная функция с жёстко закодированными типами
Beverage createBeverage(const std::string& id) {
    Beverage b;
    if      (id == "Espresso")   { b.baseName = "Эспрессо";        b.baseCost = 1.99; }
    else if (id == "HouseBlend") { b.baseName = "Домашняя смесь";   b.baseCost = 0.89; }
    else if (id == "DarkRoast")  { b.baseName = "Тёмная обжарка";   b.baseCost = 1.05; }
    else if (id == "GreenTea")   { b.baseName = "Зелёный чай";      b.baseCost = 0.99; }
    else                         { b.baseName = "Неизвестно";        b.baseCost = 0.00; }
    return b;
}

// ⚠ Добавление добавки — снова if-else цепочка
void applyCondiment(Beverage& b, const std::string& id) {
    if      (id == "Milk")    b.hasMilk    = true;
    else if (id == "Mocha")   b.hasMocha   = true;
    else if (id == "Whip")    b.hasWhip    = true;
    else if (id == "Caramel") b.hasCaramel = true;
    else if (id == "Vanilla") b.hasVanilla = true;
    else if (id == "Soy")     b.hasSoy     = true;
    // ⚠ Новая добавка → ещё один else-if
}

// ⚠ Готовые комбо — всё жёстко захардкожено
Beverage createCombo(const std::string& combo) {
    if (combo == "MochaCappuccino") {
        Beverage b = createBeverage("Espresso");
        b.hasMilk = true; b.hasMocha = true; b.hasWhip = true;
        return b;
    }
    if (combo == "VanillaLatte") {
        Beverage b = createBeverage("HouseBlend");
        b.hasMilk = true; b.hasVanilla = true;
        return b;
    }
    if (combo == "CaramelMacchiato") {
        Beverage b = createBeverage("Espresso");
        b.hasMilk = true; b.hasCaramel = true; b.hasVanilla = true;
        return b;
    }
    return createBeverage("");
}

// ─────────────────── HTTP-сервер ───────────────────

int main() {
    httplib::Server svr;

    svr.Get("/api/beverages", [](const httplib::Request&, httplib::Response& res) {
        json j = json::array({
            {{"id","Espresso"},  {"name","Эспрессо"},       {"cost",1.99}},
            {{"id","HouseBlend"},{"name","Домашняя смесь"}, {"cost",0.89}},
            {{"id","DarkRoast"}, {"name","Тёмная обжарка"}, {"cost",1.05}},
            {{"id","GreenTea"}, {"name","Зелёный чай"},    {"cost",0.99}}
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
        Beverage bev = createBeverage(bevId);

        if (body.contains("condiments") && body["condiments"].is_array()) {
            for (const auto& c : body["condiments"]) {
                applyCondiment(bev, c.get<std::string>());
            }
        }

        json result = {
            {"description", bev.getDescription()},
            {"cost",        bev.getCost()}
        };
        res.set_content(result.dump(), "application/json");
    });

    svr.Options("/(.*)", [](const httplib::Request&, httplib::Response& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
    });

    std::cout << "No-Pattern Server: http://localhost:5001\n";
    svr.listen("0.0.0.0", 5001);
}
