import { useState, useEffect, useMemo } from 'react'
import {
  TextInput, Textarea, Select, Button, Paper, Title,
  Group, Stack, Text, Badge, Divider, Accordion,
  NumberInput, TagsInput, Box, Alert, Code, Menu
} from '@mantine/core'
import { notifications } from '@mantine/notifications'

const TEMPLATES = ['IT', 'Дизайнер', 'Менеджер']

const defaultForm = {
  template: 'IT',
  name: '',
  email: '',
  phone: '',
  summary: '',
  company: '',
  position: '',
  expDesc: '',
  institution: '',
  degree: '',
  year: 2024,
  skills: [],
  projName: '',
  projDesc: '',
  projTech: [],
  github: '',
  portfolio: '',
  linkedin: '',
}

// Simplified builder logic in JS (mirrors C# backend logic for offline demo)
function buildResume(form) {
  const skills = [...form.skills]
  const template = form.template

  if (template === 'IT') {
    if (!skills.includes('Git')) skills.push('Git')
    if (!skills.includes('Linux')) skills.push('Linux')
  } else if (template === 'Дизайнер') {
    if (!skills.includes('Figma')) skills.push('Figma')
    if (!skills.includes('Adobe CC')) skills.push('Adobe CC')
  } else if (template === 'Менеджер') {
    if (!skills.includes('Leadership')) skills.push('Leadership')
    if (!skills.includes('Agile/Scrum')) skills.push('Agile/Scrum')
  }

  const github = template === 'IT'
    ? (form.github || 'https://github.com/')
    : form.github
  const portfolio = template === 'Дизайнер'
    ? (form.portfolio || 'https://behance.net/')
    : form.portfolio
  const linkedin = template === 'Менеджер'
    ? (form.linkedin || 'https://linkedin.com/in/')
    : form.linkedin

  const lines = []
  lines.push(`=== ${form.name || '(Имя не указано)'} === [${template}]`)
  if (form.email || form.phone) lines.push(`${form.email} | ${form.phone}`)
  if (form.summary) lines.push(`О себе: ${form.summary}`)
  if (form.company) lines.push(`--- Опыт ---\n  ${form.company}, ${form.position}: ${form.expDesc}`)
  if (form.institution) lines.push(`--- Образование ---\n  ${form.institution}, ${form.degree} (${form.year})`)
  if (skills.length) lines.push(`Навыки: ${skills.join(', ')}`)
  if (form.projName) lines.push(`--- Проект ---\n  ${form.projName}: ${form.projDesc} [${form.projTech.join(', ')}]`)
  if (github) lines.push(`GitHub: ${github}`)
  if (portfolio) lines.push(`Portfolio: ${portfolio}`)
  if (linkedin) lines.push(`LinkedIn: ${linkedin}`)

  return { text: lines.join('\n'), skills }
}

function downloadFile(content, filename, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function CVBuilderForm() {
  const [form, setForm] = useState(defaultForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  // Live preview — automatically build resume on any form change
  const livePreview = useMemo(() => buildResume(form), [form])

  const handleSubmit = async () => {
    if (!form.name) {
      notifications.show({ color: 'red', title: 'Ошибка', message: 'Укажите имя' })
      return
    }
    setLoading(true)
    try {
      // Try real C# API first
      const payload = {
        template: form.template,
        name: form.name,
        email: form.email,
        phone: form.phone,
        summary: form.summary,
        skills: form.skills,
        githubUrl: form.github,
        portfolioUrl: form.portfolio,
        linkedinUrl: form.linkedin,
        experiences: form.company ? [{ company: form.company, position: form.position, start: '2020', end: 'н.в.', desc: form.expDesc }] : [],
        educations: form.institution ? [{ institution: form.institution, degree: form.degree, year: form.year }] : [],
        projects: form.projName ? [{ name: form.projName, desc: form.projDesc, techStack: form.projTech }] : [],
      }
      const res = await fetch('/api/resume/build', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(3000)
      })
      if (res.ok) {
        const data = await res.json()
        setResult({ ...data, source: 'C# API' })
        notifications.show({ color: 'green', title: 'Готово', message: 'Резюме собрано C# Builder\'ом на сервере' })
      } else {
        throw new Error('API error')
      }
    } catch {
      // Fallback: JS mirror of C# logic
      const data = buildResume(form)
      setResult({ ...data, source: 'JS (офлайн-демо, C# API недоступен)' })
      notifications.show({ color: 'blue', title: 'Офлайн-режим', message: 'C# API недоступен — используется JS-зеркало логики Builder' })
    } finally {
      setLoading(false)
    }
  }

  const handleExportTxt = () => {
    const data = result || livePreview
    downloadFile(data.text, `resume-${form.template}.txt`)
    notifications.show({ color: 'green', title: 'Экспорт', message: 'Резюме сохранено как .txt' })
  }

  const handleExportJson = () => {
    const json = JSON.stringify({
      template: form.template,
      fullName: form.name,
      email: form.email,
      phone: form.phone,
      summary: form.summary,
      skills: (result || livePreview).skills,
      experiences: form.company ? [{ company: form.company, position: form.position, start: '2020', end: 'н.в.', desc: form.expDesc }] : [],
      educations: form.institution ? [{ institution: form.institution, degree: form.degree, year: form.year }] : [],
      projects: form.projName ? [{ name: form.projName, desc: form.projDesc, techStack: form.projTech }] : [],
      github: form.github || null,
      portfolio: form.portfolio || null,
      linkedin: form.linkedin || null,
    }, null, 2)
    downloadFile(json, `resume-${form.template}.json`, 'application/json')
    notifications.show({ color: 'green', title: 'Экспорт', message: 'Резюме сохранено как .json' })
  }

  const handleExportHtml = () => {
    const data = result || livePreview
    const html = `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>Резюме — ${form.name || 'CV'}</title>
<style>
  body { font-family: 'Segoe UI', Arial, sans-serif; max-width: 800px; margin: 2rem auto; padding: 0 1rem; color: #333; }
  h1 { color: #1565c0; border-bottom: 2px solid #1565c0; padding-bottom: .5rem; }
  .badge { display: inline-block; background: #e3f2fd; color: #1565c0; padding: .2rem .6rem; border-radius: 4px; font-size: .85rem; margin: .2rem; }
  .section { margin: 1rem 0; }
  .section h3 { color: #666; font-size: .9rem; text-transform: uppercase; letter-spacing: .1em; }
  pre { background: #f5f5f5; padding: 1rem; border-radius: 8px; white-space: pre-wrap; font-size: .9rem; }
</style>
</head>
<body>
<h1>${form.name || 'Резюме'} <small style="color:#888">[${form.template}]</small></h1>
${form.email || form.phone ? `<p>${form.email} ${form.phone ? '| ' + form.phone : ''}</p>` : ''}
${form.summary ? `<div class="section"><h3>О себе</h3><p>${form.summary}</p></div>` : ''}
${form.company ? `<div class="section"><h3>Опыт работы</h3><p><strong>${form.company}</strong>, ${form.position}: ${form.expDesc}</p></div>` : ''}
${form.institution ? `<div class="section"><h3>Образование</h3><p><strong>${form.institution}</strong>, ${form.degree} (${form.year})</p></div>` : ''}
<div class="section"><h3>Навыки</h3>${data.skills.map(s => `<span class="badge">${s}</span>`).join(' ')}</div>
${form.projName ? `<div class="section"><h3>Проект</h3><p><strong>${form.projName}</strong>: ${form.projDesc} [${form.projTech.join(', ')}]</p></div>` : ''}
</body>
</html>`
    downloadFile(html, `resume-${form.template}.html`, 'text/html')
    notifications.show({ color: 'green', title: 'Экспорт', message: 'Резюме сохранено как .html' })
  }

  const templateColor = { IT: 'blue', Дизайнер: 'violet', Менеджер: 'teal' }

  return (
    <Paper withBorder p="xl" radius="md" style={{ background: '#fff' }}>
      <Group mb="md" justify="space-between">
        <Title order={4} c="blue.8">CVBuilderForm — React + Mantine</Title>
        <Badge color={templateColor[form.template] || 'gray'} size="lg">{form.template}</Badge>
      </Group>

      <Stack gap="md">
        <Select
          label="Шаблон резюме"
          description="Выберите ConcreteBuilder на сервере"
          data={TEMPLATES}
          value={form.template}
          onChange={set('template')}
          required
        />

        <Divider label="Личная информация" labelPosition="left" />

        <Group grow>
          <TextInput label="ФИО" placeholder="Иван Иванов" value={form.name} onChange={e => set('name')(e.target.value)} required />
          <TextInput label="Email" placeholder="ivan@mail.ru" value={form.email} onChange={e => set('email')(e.target.value)} />
          <TextInput label="Телефон" placeholder="+7 999 000 00 00" value={form.phone} onChange={e => set('phone')(e.target.value)} />
        </Group>

        <Textarea label="О себе (summary)" placeholder="Краткое описание..." value={form.summary} onChange={e => set('summary')(e.target.value)} rows={2} />

        <Accordion variant="separated">
          <Accordion.Item value="exp">
            <Accordion.Control>Опыт работы</Accordion.Control>
            <Accordion.Panel>
              <Group grow>
                <TextInput label="Компания" value={form.company} onChange={e => set('company')(e.target.value)} />
                <TextInput label="Должность" value={form.position} onChange={e => set('position')(e.target.value)} />
              </Group>
              <Textarea mt="xs" label="Описание" value={form.expDesc} onChange={e => set('expDesc')(e.target.value)} rows={2} />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="edu">
            <Accordion.Control>Образование</Accordion.Control>
            <Accordion.Panel>
              <Group grow>
                <TextInput label="Учебное заведение" value={form.institution} onChange={e => set('institution')(e.target.value)} />
                <TextInput label="Степень / Специальность" value={form.degree} onChange={e => set('degree')(e.target.value)} />
                <NumberInput label="Год окончания" value={form.year} onChange={set('year')} min={1990} max={2030} />
              </Group>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="skills">
            <Accordion.Control>Навыки</Accordion.Control>
            <Accordion.Panel>
              <TagsInput
                label="Навыки (Enter для добавления)"
                placeholder="C#, React, TypeScript..."
                value={form.skills}
                onChange={set('skills')}
                description={
                  form.template === 'IT' ? 'Builder авто-добавит: Git, Linux' :
                  form.template === 'Дизайнер' ? 'Builder авто-добавит: Figma, Adobe CC' :
                  'Builder авто-добавит: Leadership, Agile/Scrum'
                }
              />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="proj">
            <Accordion.Control>Проект</Accordion.Control>
            <Accordion.Panel>
              <Group grow>
                <TextInput label="Название проекта" value={form.projName} onChange={e => set('projName')(e.target.value)} />
                <TextInput label="Описание" value={form.projDesc} onChange={e => set('projDesc')(e.target.value)} />
              </Group>
              <TagsInput mt="xs" label="Технологии" value={form.projTech} onChange={set('projTech')} placeholder="React, C#..." />
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="links">
            <Accordion.Control>Ссылки</Accordion.Control>
            <Accordion.Panel>
              <Group grow>
                <TextInput label="GitHub" placeholder="https://github.com/..." value={form.github} onChange={e => set('github')(e.target.value)} />
                <TextInput label="Portfolio" placeholder="https://behance.net/..." value={form.portfolio} onChange={e => set('portfolio')(e.target.value)} />
                <TextInput label="LinkedIn" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e => set('linkedin')(e.target.value)} />
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Group>
          <Button
            onClick={handleSubmit}
            loading={loading}
            size="md"
            color={templateColor[form.template] || 'blue'}
          >
            Собрать резюме (Builder.GetResult())
          </Button>
          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="light" color="green" size="md">
                Экспорт ↓
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={handleExportTxt}>Скачать .txt</Menu.Item>
              <Menu.Item onClick={handleExportJson}>Скачать .json</Menu.Item>
              <Menu.Item onClick={handleExportHtml}>Скачать .html</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Button variant="subtle" color="gray" onClick={() => { setForm(defaultForm); setResult(null) }}>
            Сбросить
          </Button>
        </Group>

        {/* Live preview — обновляется при изменении любого поля или шаблона */}
        <Box mt="md">
          {result && (
            <Alert color="green" title={`✓ Резюме собрано — ${result.source}`} mb="sm">
              <Text size="xs" c="dimmed">Шаблон: {form.template} → паттерн Builder выбрал нужный ConcreteBuilder</Text>
            </Alert>
          )}
          <Text fw={600} size="sm" mb="xs" c="dimmed">
            {result ? 'Результат от сервера:' : 'Предпросмотр (обновляется в реальном времени):'}
          </Text>
          <Group mb="xs" gap="xs">
            <Text fw={600} size="sm">Навыки:</Text>
            {(result || livePreview).skills?.map(s => <Badge key={s} variant="light" color={templateColor[form.template] || 'blue'}>{s}</Badge>)}
          </Group>
          <Code block style={{ fontFamily: 'Fira Code, monospace', fontSize: '.8rem', lineHeight: 1.6, whiteSpace: 'pre' }}>
            {(result || livePreview).text}
          </Code>
        </Box>
      </Stack>
    </Paper>
  )
}
