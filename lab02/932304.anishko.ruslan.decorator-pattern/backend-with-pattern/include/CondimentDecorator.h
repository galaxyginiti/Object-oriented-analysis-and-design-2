#pragma once
#include "Beverage.h"
#include <memory>

// ③ Decorator — базовый декоратор, хранит ссылку на оборачиваемый Component
class CondimentDecorator : public Beverage {
protected:
    std::unique_ptr<Beverage> beverage_;
public:
    explicit CondimentDecorator(std::unique_ptr<Beverage> b)
        : beverage_(std::move(b)) {}
};
