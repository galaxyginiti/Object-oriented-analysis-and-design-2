import { useState } from 'react';
import {
  Button, Select, Checkbox, Group, Text, Badge, Paper,
  Stack, Title, Divider, Alert, Loader,
} from '@mantine/core';

const BEVERAGES = [
  { id: 'Espresso',   name: 'Эспрессо',        cost: 1.99 },
  { id: 'HouseBlend', name: 'Домашняя смесь',  cost: 0.89 },
  { id: 'DarkRoast',  name: 'Тёмная обжарка',  cost: 1.05 },
  { id: 'GreenTea',   name: 'Зелёный чай',     cost: 0.99 },
];

const CONDIMENTS = [
  { id: 'Milk',    name: 'Молоко',   cost: 0.30 },
  { id: 'Mocha',   name: 'Мокко',    cost: 0.50 },
  { id: 'Whip',    name: 'Сливки',   cost: 0.40 },
  { id: 'Caramel', name: 'Карамель',  cost: 0.45 },
  { id: 'Vanilla', name: 'Ваниль',   cost: 0.35 },
  { id: 'Soy',     name: 'Соя',      cost: 0.25 },
];

function localOrder(bevId, condIds) {
  const bev = BEVERAGES.find(b => b.id === bevId);
  if (!bev) return null;
  let desc = bev.name;
  let cost = bev.cost;
  for (const cid of condIds) {
    const c = CONDIMENTS.find(x => x.id === cid);
    if (c) { desc += ' + ' + c.name; cost += c.cost; }
  }
  return { description: desc, cost: Math.round(cost * 100) / 100 };
}

export default function CoffeeOrderForm() {
  const [beverage, setBeverage] = useState('Espresso');
  const [condiments, setCondiments] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggle = (id) => {
    setCondiments(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleOrder = async () => {
    setLoading(true);
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 3000);
      const resp = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ beverage, condiments }),
        signal: ctrl.signal,
      });
      clearTimeout(timer);
      const data = await resp.json();
      setResult(data);
    } catch {
      setResult(localOrder(beverage, condiments));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper shadow="xs" radius="lg" p="xl" withBorder>
      <Group gap="xs" mb="md">
        <span style={{ fontSize: 24 }}>☕</span>
        <Title order={3}>Заказ напитка</Title>
      </Group>

      <Select
        label="Базовый напиток"
        data={BEVERAGES.map(b => ({ value: b.id, label: `${b.name} — $${b.cost.toFixed(2)}` }))}
        value={beverage}
        onChange={setBeverage}
        mb="md"
      />

      <Text fw={600} size="sm" mb={6}>Добавки (декораторы):</Text>
      <Group gap="sm" mb="lg">
        {CONDIMENTS.map(c => (
          <Checkbox
            key={c.id}
            label={`${c.name} +$${c.cost.toFixed(2)}`}
            checked={condiments.includes(c.id)}
            onChange={() => toggle(c.id)}
            color="orange"
          />
        ))}
      </Group>

      <Button
        onClick={handleOrder}
        color="orange"
        size="md"
        fullWidth
        loading={loading}
        leftSection={<span>☕</span>}
      >
        Собрать напиток
      </Button>

      {result && (
        <>
          <Divider my="lg" />
          <Alert
            title="Ваш заказ готов!"
            color="green"
            icon={<span>☕</span>}
            radius="md"
          >
            <Stack gap={6}>
              <Text size="lg" fw={700}>{result.description}</Text>
              <Group gap="sm">
                <Badge size="xl" color="orange" variant="filled">
                  ${result.cost?.toFixed(2)}
                </Badge>
                {condiments.length > 0 && (
                  <Badge size="lg" color="gray" variant="light">
                    {condiments.length} добавок
                  </Badge>
                )}
              </Group>
            </Stack>
          </Alert>

          <Paper mt="md" p="md" radius="md" bg="#1e1e2e" style={{ fontFamily: 'monospace', fontSize: '.85rem', color: '#cdd6f4' }}>
            <Text c="#6c7086" size="xs" mb={4}>// Цепочка декораторов (Decorator chain):</Text>
            <Text c="#cba6f7" size="sm">
              {condiments.reduceRight(
                (inner, cid) => `${cid}( ${inner} )`,
                beverage
              )}
            </Text>
          </Paper>
        </>
      )}
    </Paper>
  );
}
