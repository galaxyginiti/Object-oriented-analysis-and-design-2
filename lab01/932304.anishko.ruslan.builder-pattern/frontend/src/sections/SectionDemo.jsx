import CVBuilderForm from '../components/CVBuilderForm'
import { Title, Text, Group, Badge, ThemeIcon, Stack } from '@mantine/core'

export default function SectionDemo() {
  return (
    <>
      <div className="sh">
        <div className="sh-num">Демонстрация</div>
        <div className="sh-title">CV Builder — живая форма</div>
        <div className="sh-sub">
          Заполните форму → нажмите «Собрать» → C# Builder на сервере создаст иммутабельный Resume через паттерн GoF
        </div>
      </div>

      <div className="block" style={{ marginBottom: '1.5rem', background: '#e3f2fd', border: '1px solid #90caf9' }}>
        <Group gap="xs">
          <span style={{ fontSize: '1.2rem' }}>⚙</span>
          <div>
            <Text fw={700} size="sm" c="blue.8">Как это работает</Text>
            <Text size="xs" c="dimmed">
              React-форма → POST /api/resume/build → <strong>ResumeDirector</strong> выбирает нужный <strong>ConcreteBuilder</strong> (IT / Design / Manager) →
              Builder пошагово собирает <strong>Resume</strong> (иммутабельный Product) → возвращает результат
            </Text>
          </div>
        </Group>
      </div>

      <CVBuilderForm />
    </>
  )
}
