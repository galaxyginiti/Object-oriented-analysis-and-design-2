#pragma once
#include <string>
#include <memory>

// ① Component — базовый интерфейс напитка
class Beverage {
public:
    virtual ~Beverage() = default;
    virtual std::string getDescription() const = 0;
    virtual double      getCost()        const = 0;
};
