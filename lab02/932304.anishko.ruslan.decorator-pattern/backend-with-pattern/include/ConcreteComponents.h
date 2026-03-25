#pragma once
#include "Beverage.h"

// ② ConcreteComponent — конкретные напитки

class Espresso : public Beverage {
public:
    std::string getDescription() const override { return "Эспрессо"; }
    double      getCost()        const override { return 1.99; }
};

class HouseBlend : public Beverage {
public:
    std::string getDescription() const override { return "Домашняя смесь"; }
    double      getCost()        const override { return 0.89; }
};

class DarkRoast : public Beverage {
public:
    std::string getDescription() const override { return "Тёмная обжарка"; }
    double      getCost()        const override { return 1.05; }
};

class GreenTea : public Beverage {
public:
    std::string getDescription() const override { return "Зелёный чай"; }
    double      getCost()        const override { return 0.99; }
};
