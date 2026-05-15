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
  Select,
  TextInput,
  Card,
  SimpleGrid,
  Badge,
  Stack,
  Divider,
  Alert,
  Table,
  ActionIcon,
} from '@mantine/core';

const BACKENDS = {
  vo: { label: 'С паттерном Value Object', url: 'http://localhost:8001' },
  no: { label: 'Без паттерна',             url: 'http://localhost:8002' },
};

const CURRENCIES = ['USD', 'EUR', 'RUB', 'GBP', 'JPY'];
const CATEGORIES = ['food', 'transport', 'subscriptions', 'rent', 'entertainment', 'other'];

function formatMoney(money) {
  if (!money) return '—';
  const n = Number(money.value).toFixed(2);
  return `${n} ${money.currency}`;
}

export default function App() {
  const [backend, setBackend] = useState('vo');
  const [state, setState] = useState(null);
  const [error, setError] = useState(null);

  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');

  const url = BACKENDS[backend].url;

  const loadState = async () => {
    try {
      const res = await fetch(`${url}/state`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState(await res.json());
      setError(null);
    } catch (e) {
      setError(`Не удалось подключиться к ${url}. Запущен ли бэкенд и MongoDB?`);
      setState(null);
    }
  };

  useEffect(() => {
    loadState();
    const id = setInterval(loadState, 1500);
    return () => clearInterval(id);
  }, [backend]);

  const addTransaction = async () => {
    try {
      const res = await fetch(`${url}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          currency,
          category,
          description,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `HTTP ${res.status}`);
      }
      setDescription('');
      loadState();
    } catch (e) {
      setError(`Не удалось добавить: ${e.message}`);
    }
  };

  const deleteTransaction = async (id) => {
    try {
      await fetch(`${url}/transactions/${id}`, { method: 'DELETE' });
      loadState();
    } catch (e) {
      setError('Не удалось удалить');
    }
  };

  const seed = async () => {
    try {
      await fetch(`${url}/seed`, { method: 'POST' });
      loadState();
    } catch (e) {
      setError('Не удалось добавить демо-данные');
    }
  };

  const clearAll = async () => {
    try {
      await fetch(`${url}/transactions`, { method: 'DELETE' });
      loadState();
    } catch (e) {
      setError('Не удалось очистить');
    }
  };

  const transactions = state?.transactions ?? [];
  const totalByCurrency = state?.totalByCurrency ?? {};
  const totalByCategory = state?.totalByCategory ?? {};

  return (
    <AppShell header={{ height: 64 }} padding="md">
      <AppShell.Header>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between">
            <Title order={3}>Лаб. 04 — Паттерн Value Object</Title>
            <Badge color={backend === 'vo' ? 'teal' : 'orange'} size="lg">
              {BACKENDS[backend].label}
            </Badge>
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg">
          <Stack gap="lg">
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Выбор бэкенда</Title>
                <SegmentedControl
                  value={backend}
                  onChange={setBackend}
                  data={[
                    { value: 'vo', label: BACKENDS.vo.label },
                    { value: 'no', label: BACKENDS.no.label },
                  ]}
                />
              </Stack>
            </Card>

            {error && (
              <Alert color="red" title="Ошибка соединения">
                {error}
              </Alert>
            )}

            <Card withBorder radius="md" padding="lg">
              <Stack gap="md">
                <Title order={4}>Новая транзакция</Title>
                <Group align="end" wrap="wrap">
                  <NumberInput
                    label="Сумма"
                    value={amount}
                    onChange={setAmount}
                    decimalScale={2}
                    step={0.5}
                    w={140}
                  />
                  <Select
                    label="Валюта"
                    value={currency}
                    onChange={setCurrency}
                    data={CURRENCIES}
                    w={120}
                  />
                  <Select
                    label="Категория"
                    value={category}
                    onChange={setCategory}
                    data={CATEGORIES}
                    w={170}
                  />
                  <TextInput
                    label="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                    w={260}
                  />
                  <Button onClick={addTransaction}>Добавить</Button>
                  <Button variant="light" onClick={seed}>Добавить демо-данные</Button>
                  <Button variant="light" color="red" onClick={clearAll}>Очистить</Button>
                </Group>

              </Stack>
            </Card>

            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              <Card withBorder radius="md" padding="lg">
                <Title order={5} mb="sm">Итого по валютам</Title>
                {Object.keys(totalByCurrency).length === 0 ? (
                  <Text c="dimmed" size="sm">Нет данных</Text>
                ) : (
                  <Stack gap="xs">
                    {Object.entries(totalByCurrency).map(([cur, money]) => (
                      <Group key={cur} justify="space-between">
                        <Badge color="gray" variant="light">{cur}</Badge>
                        <Text fw={600}>{formatMoney(money)}</Text>
                      </Group>
                    ))}
                  </Stack>
                )}
              </Card>

              <Card withBorder radius="md" padding="lg">
                <Title order={5} mb="sm">Итого по категориям</Title>
                {Object.keys(totalByCategory).length === 0 ? (
                  <Text c="dimmed" size="sm">Нет данных</Text>
                ) : (
                  <Stack gap="xs">
                    {Object.entries(totalByCategory).map(([cat, byCur]) => (
                      <Group key={cat} justify="space-between" wrap="nowrap">
                        <Badge color="blue" variant="light">{cat}</Badge>
                        <Group gap="xs">
                          {Object.entries(byCur).map(([cur, money]) => (
                            <Text key={cur} size="sm">{formatMoney(money)}</Text>
                          ))}
                        </Group>
                      </Group>
                    ))}
                  </Stack>
                )}
              </Card>
            </SimpleGrid>

            <Divider label={`Транзакции (${transactions.length})`} labelPosition="center" />

            <Card withBorder radius="md" padding="lg">
              {transactions.length === 0 ? (
                <Text c="dimmed" size="sm">
                  Транзакций пока нет. Добавь первую или нажми добавить демо-данные».
                </Text>
              ) : (
                <Table striped highlightOnHover>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Сумма</Table.Th>
                      <Table.Th>Категория</Table.Th>
                      <Table.Th>Описание</Table.Th>
                      <Table.Th>Когда</Table.Th>
                      <Table.Th></Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {transactions.map((t) => (
                      <Table.Tr key={t.id}>
                        <Table.Td>
                          <Text c={Number(t.amount.value) < 0 ? 'red' : 'teal'} fw={600}>
                            {formatMoney(t.amount)}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <Badge color="blue" variant="light">{t.category}</Badge>
                        </Table.Td>
                        <Table.Td>{t.description || '—'}</Table.Td>
                        <Table.Td>
                          <Text size="xs" c="dimmed">
                            {new Date(t.createdAt).toLocaleString()}
                          </Text>
                        </Table.Td>
                        <Table.Td>
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => deleteTransaction(t.id)}
                            title="Удалить"
                          >
                            ×
                          </ActionIcon>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              )}
            </Card>
          </Stack>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
