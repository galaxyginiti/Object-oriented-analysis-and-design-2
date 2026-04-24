import { useEffect, useState } from 'react';
import {
  AppShell,
  Container,
  Title,
  Text,
  SegmentedControl,
  Group,
  Button,
  NumberInput,
  Card,
  SimpleGrid,
  Badge,
  Stack,
  Divider,
  Alert,
} from '@mantine/core';

const BACKENDS = {
  observer: { label: 'С паттерном Observer', url: 'http://localhost:8001' },
  plain: { label: 'Без паттерна', url: 'http://localhost:8002' },
};

export default function App() {
  const [backend, setBackend] = useState('observer');
  const [state, setState] = useState(null);
  const [value, setValue] = useState(20);
  const [error, setError] = useState(null);

  const url = BACKENDS[backend].url;

  const loadState = async () => {
    try {
      const res = await fetch(`${url}/state`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState(await res.json());
      setError(null);
    } catch (e) {
      setError(`Не удалось подключиться к ${url}. Запущен ли бэкенд?`);
      setState(null);
    }
  };

  // Опрашиваем бэкенд раз в секунду
  useEffect(() => {
    loadState();
    const id = setInterval(loadState, 1000);
    return () => clearInterval(id);
  }, [backend]);

  const sendTemperature = async (v) => {
    try {
      await fetch(`${url}/temperature`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: Number(v) }),
      });
      loadState();
    } catch (e) {
      setError('Ошибка при отправке температуры');
    }
  };

  const sendRandom = async () => {
    try {
      await fetch(`${url}/random`, { method: 'POST' });
      loadState();
    } catch (e) {
      setError('Ошибка при отправке температуры');
    }
  };

  const sendTomsk = async () => {
    try {
      const res = await fetch(`${url}/tomsk`, { method: 'POST' });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.detail || `HTTP ${res.status}`);
      }
      const body = await res.json();
      if (typeof body.value === 'number') setValue(body.value);
      loadState();
    } catch (e) {
      setError(`Не удалось получить температуру Томска: ${e.message}`);
    }
  };

  const displays = state?.displays ?? [];
  const current = displays.find((d) => d.name === 'current');
  const minMax = displays.find((d) => d.name === 'min_max');
  const stats = displays.find((d) => d.name === 'stats');

  return (
    <AppShell header={{ height: 64 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Title order={3}>Лаб. 03 — Паттерн Observer</Title>
            <Badge color={backend === 'observer' ? 'teal' : 'orange'} size="lg">
              {BACKENDS[backend].label}
            </Badge>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg">
          <Stack gap="lg">
            <Card withBorder radius="md" padding="lg">
              <Stack gap="md">
                <Title order={4}>Выбор бэкенда</Title>
                <SegmentedControl
                  value={backend}
                  onChange={setBackend}
                  data={[
                    { value: 'observer', label: BACKENDS.observer.label },
                    { value: 'plain', label: BACKENDS.plain.label },
                  ]}
                />
                <Text c="dimmed" size="sm">
                  Оба бэкенда имеют одинаковый API и выдают идентичный результат.
                  Отличается только внутренняя структура кода.
                </Text>
              </Stack>
            </Card>

            {error && (
              <Alert color="red" title="Ошибка соединения">
                {error}
              </Alert>
            )}

            <Card withBorder radius="md" padding="lg">
              <Stack gap="md">
                <Title order={4}>Погодная станция</Title>
                <Group align="end">
                  <NumberInput
                    label="Температура (°C)"
                    value={value}
                    onChange={setValue}
                    min={-50}
                    max={50}
                    step={0.5}
                    w={200}
                  />
                  <Button onClick={() => sendTemperature(value)}>Отправить</Button>
                  <Button variant="light" onClick={sendRandom}>
                    Случайная
                  </Button>
                  <Button variant="light" color="blue" onClick={sendTomsk}>
                    Томск (реальная)
                  </Button>
                </Group>
                <Text c="dimmed" size="xs">
                  Кнопка «Томск» берёт текущую температуру из Open-Meteo
                  (бесплатный API без ключа). Ручной ввод и «Случайная»
                  работают как и раньше.
                </Text>
              </Stack>
            </Card>

            <Divider label="Наблюдатели" labelPosition="center" />

            <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
              <Card withBorder radius="md" padding="lg">
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                  Текущая
                </Text>
                <Title order={1} mt="xs">
                  {current ? `${current.temperature.toFixed(1)}°C` : '—'}
                </Title>
                <Text size="xs" c="dimmed" mt="sm">
                  CurrentDisplay
                </Text>
              </Card>

              <Card withBorder radius="md" padding="lg">
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                  Мин / Макс
                </Text>
                <Title order={1} mt="xs">
                  {minMax && minMax.min !== null
                    ? `${minMax.min.toFixed(1)} / ${minMax.max.toFixed(1)}`
                    : '—'}
                </Title>
                <Text size="xs" c="dimmed" mt="sm">
                  MinMaxDisplay
                </Text>
              </Card>

              <Card withBorder radius="md" padding="lg">
                <Text c="dimmed" size="sm" tt="uppercase" fw={700}>
                  Статистика
                </Text>
                <Title order={1} mt="xs">
                  {stats ? `${stats.average.toFixed(1)}°C` : '—'}
                </Title>
                <Text size="xs" c="dimmed" mt="sm">
                  StatsDisplay · измерений: {stats?.count ?? 0}
                </Text>
              </Card>
            </SimpleGrid>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
