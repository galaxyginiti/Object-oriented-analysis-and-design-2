#pragma once
#include "CondimentDecorator.h"
#include <cmath>

// ④ ConcreteDecorator — конкретные добавки-декораторы

class Milk : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string getDescription() const override {
        return beverage_->getDescription() + " + Молоко";
    }
    double getCost() const override {
        return std::round((beverage_->getCost() + 0.30) * 100.0) / 100.0;
    }
};

class Mocha : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string getDescription() const override {
        return beverage_->getDescription() + " + Мокко";
    }
    double getCost() const override {
        return std::round((beverage_->getCost() + 0.50) * 100.0) / 100.0;
    }
};

class Whip : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string getDescription() const override {
        return beverage_->getDescription() + " + Сливки";
    }
    double getCost() const override {
        return std::round((beverage_->getCost() + 0.40) * 100.0) / 100.0;
    }
};

class Caramel : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string getDescription() const override {
        return beverage_->getDescription() + " + Карамель";
    }
    double getCost() const override {
        return std::round((beverage_->getCost() + 0.45) * 100.0) / 100.0;
    }
};

class Vanilla : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string getDescription() const override {
        return beverage_->getDescription() + " + Ваниль";
    }
    double getCost() const override {
        return std::round((beverage_->getCost() + 0.35) * 100.0) / 100.0;
    }
};

class Soy : public CondimentDecorator {
public:
    using CondimentDecorator::CondimentDecorator;
    std::string getDescription() const override {
        return beverage_->getDescription() + " + Соя";
    }
    double getCost() const override {
        return std::round((beverage_->getCost() + 0.25) * 100.0) / 100.0;
    }
};
