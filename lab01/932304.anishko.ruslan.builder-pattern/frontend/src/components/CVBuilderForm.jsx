import { useState, useMemo } from 'react'
import {
  TextInput, Textarea, Select, Button, Paper, Title,
  Group, Stack, Text, Badge, Divider, Accordion,
  NumberInput, TagsInput, Box, Alert, Menu
} from '@mantine/core'
import { notifications } from '@mantine/notifications'

const TEMPLATES = ['IT', 'Дизайнер', 'Менеджер']

const defaultForm = {
  template: 'IT',
  name: '', email: '', phone: '', summary: '',
  // IT
  github: '', skills: [],
  company: '', position: '', expStart: '2022', expEnd: 'н.в.', expDesc: '',
  projName: '', projDesc: '', projTech: [],
  institution: '', degree: '', year: 2024,
  certifications: [],
  // Designer
  portfolio: '', behance: '',
  tools: [],
  projClient: '',
  awards: [],
  // Manager
  linkedin: '',
  teamSize: '',
  achievements: [],
  manageCerts: [],
}

/* ───────── Build resume text per template ───────── */
function buildResume(form) {
  const t = form.template
  const skills = [...(t === 'Дизайнер' ? form.tools : form.skills)]

  if (t === 'IT') {
    if (!skills.includes('Git')) skills.push('Git')
    if (!skills.includes('Linux')) skills.push('Linux')
  } else if (t === 'Дизайнер') {
    if (!skills.includes('Figma')) skills.push('Figma')
    if (!skills.includes('Adobe CC')) skills.push('Adobe CC')
  } else if (t === 'Менеджер') {
    if (!skills.includes('Leadership')) skills.push('Leadership')
    if (!skills.includes('Agile/Scrum')) skills.push('Agile/Scrum')
  }

  return { skills, template: t }
}

/* ───────── Markdown generation per template ───────── */
function generateMarkdown(form, skills) {
  const t = form.template
  const lines = []

  if (t === 'IT') {
    lines.push(`# ${form.name || 'Имя Фамилия'}`)
    lines.push(`**${form.position || 'Software Developer'}**\n`)
    const contacts = [form.email, form.phone, form.github && `[GitHub](${form.github})`].filter(Boolean)
    if (contacts.length) lines.push(contacts.join(' · ') + '\n')
    if (form.summary) lines.push(`## О себе\n${form.summary}\n`)
    lines.push(`## Технический стек\n${skills.map(s => '`' + s + '`').join('  ')}\n`)
    if (form.company) {
      lines.push(`## Опыт работы`)
      lines.push(`### ${form.position} — ${form.company}`)
      lines.push(`*${form.expStart} – ${form.expEnd}*\n`)
      if (form.expDesc) lines.push(`${form.expDesc}\n`)
    }
    if (form.projName) {
      lines.push(`## Проекты`)
      lines.push(`### ${form.projName}`)
      if (form.projDesc) lines.push(form.projDesc)
      if (form.projTech.length) lines.push(`\nТехнологии: ${form.projTech.map(s => '`' + s + '`').join('  ')}\n`)
    }
    if (form.institution) {
      lines.push(`## Образование`)
      lines.push(`**${form.institution}** — ${form.degree} (${form.year})\n`)
    }
    if (form.certifications?.length) lines.push(`## Сертификации\n${form.certifications.map(c => `- ${c}`).join('\n')}\n`)
  }

  else if (t === 'Дизайнер') {
    lines.push(`# ${form.name || 'Имя Фамилия'}`)
    lines.push(`**Дизайнер**\n`)
    const contacts = [form.email, form.phone, form.portfolio && `[Portfolio](${form.portfolio})`, form.behance && `[Behance](${form.behance})`].filter(Boolean)
    if (contacts.length) lines.push(contacts.join(' · ') + '\n')
    if (form.summary) lines.push(`## Творческое кредо\n*${form.summary}*\n`)
    lines.push(`## Инструменты\n${skills.map(s => '`' + s + '`').join('  ')}\n`)
    if (form.company) {
      lines.push(`## Опыт`)
      lines.push(`**${form.position || 'Дизайнер'}** — ${form.company}\n`)
      if (form.expDesc) lines.push(`${form.expDesc}\n`)
    }
    if (form.projName) {
      lines.push(`## Портфолио`)
      lines.push(`### ${form.projName}`)
      if (form.projClient) lines.push(`Клиент: *${form.projClient}*`)
      if (form.projDesc) lines.push(form.projDesc + '\n')
    }
    if (form.institution) {
      lines.push(`## Образование`)
      lines.push(`**${form.institution}** — ${form.degree} (${form.year})\n`)
    }
    if (form.awards?.length) lines.push(`## Награды\n${form.awards.map(a => `🏆 ${a}`).join('\n')}\n`)
  }

  else if (t === 'Менеджер') {
    lines.push(`# ${form.name || 'Имя Фамилия'}`)
    lines.push(`**${form.position || 'Project Manager'}**\n`)
    const contacts = [form.email, form.phone, form.linkedin && `[LinkedIn](${form.linkedin})`].filter(Boolean)
    if (contacts.length) lines.push(contacts.join(' · ') + '\n')
    if (form.summary) lines.push(`## Профессиональный профиль\n${form.summary}\n`)
    lines.push(`## Ключевые компетенции\n${skills.map(s => '`' + s + '`').join('  ')}\n`)
    if (form.company) {
      lines.push(`## Опыт управления`)
      lines.push(`### ${form.position || 'Менеджер'} — ${form.company}`)
      if (form.teamSize) lines.push(`Команда: **${form.teamSize} чел.**`)
      if (form.expDesc) lines.push(`\n${form.expDesc}\n`)
    }
    if (form.achievements?.length) {
      lines.push(`## Достижения`)
      lines.push(form.achievements.map(a => `- ✅ ${a}`).join('\n') + '\n')
    }
    if (form.institution) {
      lines.push(`## Образование`)
      lines.push(`**${form.institution}** — ${form.degree} (${form.year})\n`)
    }
    if (form.manageCerts?.length) lines.push(`## Сертификации\n${form.manageCerts.map(c => `- 📜 ${c}`).join('\n')}\n`)
  }

  return lines.join('\n')
}

/* ───────── Word (HTML) generation per template ───────── */
function generateWordHtml(form, skills) {
  const t = form.template
  const accent = t === 'IT' ? '#1565c0' : t === 'Дизайнер' ? '#7b1fa2' : '#00695c'
  const accentBg = t === 'IT' ? '#e3f2fd' : t === 'Дизайнер' ? '#f3e5f5' : '#e0f2f1'

  const header = `<div style="border-bottom:3px solid ${accent};padding-bottom:12px;margin-bottom:16px">
    <h1 style="margin:0;color:${accent};font-size:28px">${form.name || 'Имя Фамилия'}</h1>
    <p style="margin:4px 0 0;color:#555;font-size:14px">${
      t === 'IT' ? (form.position || 'Software Developer') :
      t === 'Дизайнер' ? 'Дизайнер' :
      (form.position || 'Project Manager')
    }</p>
  </div>`

  const contactItems = []
  if (form.email) contactItems.push(`✉ ${form.email}`)
  if (form.phone) contactItems.push(`☎ ${form.phone}`)
  if (t === 'IT' && form.github) contactItems.push(`GitHub: ${form.github}`)
  if (t === 'Дизайнер' && form.portfolio) contactItems.push(`Portfolio: ${form.portfolio}`)
  if (t === 'Дизайнер' && form.behance) contactItems.push(`Behance: ${form.behance}`)
  if (t === 'Менеджер' && form.linkedin) contactItems.push(`LinkedIn: ${form.linkedin}`)
  const contacts = contactItems.length ? `<p style="color:#666;font-size:13px">${contactItems.join(' &nbsp;|&nbsp; ')}</p>` : ''

  const sectionTitle = (title) => `<h2 style="color:${accent};font-size:16px;border-bottom:1px solid #ddd;padding-bottom:4px;margin:18px 0 8px">${title}</h2>`

  let body = ''

  if (form.summary) {
    const label = t === 'IT' ? 'О себе' : t === 'Дизайнер' ? 'Творческое кредо' : 'Профессиональный профиль'
    body += sectionTitle(label) + `<p style="color:#444;font-size:13px">${t === 'Дизайнер' ? '<em>' + form.summary + '</em>' : form.summary}</p>`
  }

  const skillLabel = t === 'IT' ? 'Технический стек' : t === 'Дизайнер' ? 'Инструменты' : 'Ключевые компетенции'
  body += sectionTitle(skillLabel) + `<p>${skills.map(s => `<span style="display:inline-block;background:${accentBg};color:${accent};padding:3px 10px;border-radius:4px;margin:3px 4px 3px 0;font-size:12px">${s}</span>`).join('')}</p>`

  if (form.company) {
    const expLabel = t === 'Менеджер' ? 'Опыт управления' : 'Опыт работы'
    body += sectionTitle(expLabel)
    body += `<p style="margin:0"><strong>${form.position || '-'}</strong> — ${form.company}`
    if (t === 'IT') body += ` <span style="color:#888;font-size:12px">(${form.expStart} – ${form.expEnd})</span>`
    body += `</p>`
    if (t === 'Менеджер' && form.teamSize) body += `<p style="margin:2px 0;color:#555;font-size:13px">Команда: <strong>${form.teamSize} чел.</strong></p>`
    if (form.expDesc) body += `<p style="color:#555;font-size:13px">${form.expDesc}</p>`
  }

  if (t === 'Менеджер' && form.achievements?.length) {
    body += sectionTitle('Достижения')
    body += `<ul style="color:#444;font-size:13px">${form.achievements.map(a => `<li>✅ ${a}</li>`).join('')}</ul>`
  }

  if (form.projName) {
    const projLabel = t === 'Дизайнер' ? 'Портфолио' : 'Проекты'
    body += sectionTitle(projLabel)
    body += `<p style="margin:0"><strong>${form.projName}</strong></p>`
    if (t === 'Дизайнер' && form.projClient) body += `<p style="margin:2px 0;color:#888;font-size:12px">Клиент: ${form.projClient}</p>`
    if (form.projDesc) body += `<p style="color:#555;font-size:13px">${form.projDesc}</p>`
    if (t === 'IT' && form.projTech.length) body += `<p style="font-size:12px;color:#888">Технологии: ${form.projTech.join(', ')}</p>`
  }

  if (form.institution) {
    body += sectionTitle('Образование')
    body += `<p><strong>${form.institution}</strong> — ${form.degree} (${form.year})</p>`
  }

  if (t === 'IT' && form.certifications?.length) {
    body += sectionTitle('Сертификации')
    body += `<ul style="font-size:13px">${form.certifications.map(c => `<li>${c}</li>`).join('')}</ul>`
  }
  if (t === 'Дизайнер' && form.awards?.length) {
    body += sectionTitle('Награды')
    body += `<ul style="font-size:13px">${form.awards.map(a => `<li>🏆 ${a}</li>`).join('')}</ul>`
  }
  if (t === 'Менеджер' && form.manageCerts?.length) {
    body += sectionTitle('Сертификации')
    body += `<ul style="font-size:13px">${form.manageCerts.map(c => `<li>📜 ${c}</li>`).join('')}</ul>`
  }

  return `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>Резюме — ${form.name}</title>
<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View></w:WordDocument></xml><![endif]-->
<style>body{font-family:'Segoe UI',Arial,sans-serif;max-width:700px;margin:40px auto;padding:0 20px;color:#333;line-height:1.5}</style>
</head><body>${header}${contacts}${body}</body></html>`
}

/* ───────── downloads ───────── */
function downloadFile(content, filename, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = filename; a.click()
  URL.revokeObjectURL(url)
}

/* ─────────────────── COMPONENT ─────────────────── */
export default function CVBuilderForm() {
  const [form, setForm] = useState(defaultForm)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }))

  const preview = useMemo(() => buildResume(form), [form])
  const md = useMemo(() => generateMarkdown(form, preview.skills), [form, preview.skills])

  const handleSubmit = async () => {
    if (!form.name) { notifications.show({ color: 'red', title: 'Ошибка', message: 'Укажите имя' }); return }
    setLoading(true)
    try {
      const payload = {
        template: form.template, name: form.name, email: form.email, phone: form.phone,
        summary: form.summary, skills: form.template === 'Дизайнер' ? form.tools : form.skills,
        githubUrl: form.github, portfolioUrl: form.portfolio, linkedinUrl: form.linkedin,
        experiences: form.company ? [{ company: form.company, position: form.position, start: form.expStart || '2022', end: form.expEnd || 'н.в.', desc: form.expDesc }] : [],
        educations: form.institution ? [{ institution: form.institution, degree: form.degree, year: form.year }] : [],
        projects: form.projName ? [{ name: form.projName, desc: form.projDesc, techStack: form.projTech }] : [],
      }
      const res = await fetch('/api/resume/build', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(3000)
      })
      if (res.ok) {
        const data = await res.json()
        setResult({ ...data, source: 'C# API' })
        notifications.show({ color: 'green', title: 'Готово', message: 'Резюме собрано C# Builder\'ом' })
      } else throw new Error()
    } catch {
      setResult({ ...preview, text: md, source: 'JS (офлайн)' })
      notifications.show({ color: 'blue', title: 'Офлайн-режим', message: 'C# API недоступен — JS-зеркало' })
    } finally { setLoading(false) }
  }

  const handleExportMd = () => {
    downloadFile(md, `resume-${form.template}.md`)
    notifications.show({ color: 'green', title: 'Экспорт', message: 'Скачано как .md' })
  }
  const handleExportWord = () => {
    const html = generateWordHtml(form, preview.skills)
    downloadFile(html, `resume-${form.template}.doc`, 'application/msword')
    notifications.show({ color: 'green', title: 'Экспорт', message: 'Скачано как .doc (Word)' })
  }

  const t = form.template
  const templateColor = { IT: 'blue', Дизайнер: 'violet', Менеджер: 'teal' }
  const color = templateColor[t] || 'blue'

  return (
    <Paper withBorder p="xl" radius="md" style={{ background: '#fff' }}>
      <Group mb="md" justify="space-between">
        <Title order={4} c={`${color}.8`}>CV Builder — {t}</Title>
        <Badge color={color} size="lg" variant="filled">{t}</Badge>
      </Group>

      <Stack gap="md">
        <Select label="Шаблон резюме" description="Выбирает ConcreteBuilder" data={TEMPLATES} value={t} onChange={set('template')} required />

        <Divider label="Контактная информация" labelPosition="left" />
        <Group grow>
          <TextInput label="ФИО" placeholder="Иван Иванов" value={form.name} onChange={e => set('name')(e.target.value)} required />
          <TextInput label="Email" placeholder="ivan@mail.ru" value={form.email} onChange={e => set('email')(e.target.value)} />
          <TextInput label="Телефон" placeholder="+7 999 000 00 00" value={form.phone} onChange={e => set('phone')(e.target.value)} />
        </Group>

        {/* Template-specific links */}
        {t === 'IT' && <TextInput label="GitHub" placeholder="https://github.com/..." value={form.github} onChange={e => set('github')(e.target.value)} />}
        {t === 'Дизайнер' && (
          <Group grow>
            <TextInput label="Портфолио" placeholder="https://portfolio.com/..." value={form.portfolio} onChange={e => set('portfolio')(e.target.value)} />
            <TextInput label="Behance / Dribbble" placeholder="https://behance.net/..." value={form.behance} onChange={e => set('behance')(e.target.value)} />
          </Group>
        )}
        {t === 'Менеджер' && <TextInput label="LinkedIn" placeholder="https://linkedin.com/in/..." value={form.linkedin} onChange={e => set('linkedin')(e.target.value)} />}

        <Textarea
          label={t === 'Дизайнер' ? 'Творческое кредо' : t === 'Менеджер' ? 'Профессиональный профиль' : 'О себе'}
          placeholder={t === 'Дизайнер' ? 'Ваша дизайн-философия...' : t === 'Менеджер' ? 'Ваш управленческий профиль...' : 'Краткое описание...'}
          value={form.summary} onChange={e => set('summary')(e.target.value)} rows={2}
        />

        <Accordion variant="separated" defaultValue={[]}>
          {/* Skills / Tools */}
          <Accordion.Item value="skills">
            <Accordion.Control>{t === 'Дизайнер' ? 'Инструменты' : t === 'Менеджер' ? 'Ключевые компетенции' : 'Технический стек'}</Accordion.Control>
            <Accordion.Panel>
              {t === 'Дизайнер' ? (
                <TagsInput label="Инструменты" placeholder="Figma, Sketch, Photoshop..." value={form.tools} onChange={set('tools')}
                  description="Builder авто-добавит: Figma, Adobe CC" />
              ) : (
                <TagsInput label={t === 'Менеджер' ? 'Компетенции' : 'Навыки'} placeholder={t === 'Менеджер' ? 'Стратег. планирование, Agile...' : 'C#, React, TypeScript...'}
                  value={form.skills} onChange={set('skills')}
                  description={t === 'IT' ? 'Builder авто-добавит: Git, Linux' : 'Builder авто-добавит: Leadership, Agile/Scrum'} />
              )}
            </Accordion.Panel>
          </Accordion.Item>

          {/* Experience */}
          <Accordion.Item value="exp">
            <Accordion.Control>{t === 'Менеджер' ? 'Опыт управления' : 'Опыт работы'}</Accordion.Control>
            <Accordion.Panel>
              <Group grow>
                <TextInput label="Компания" value={form.company} onChange={e => set('company')(e.target.value)} />
                <TextInput label="Должность" value={form.position} onChange={e => set('position')(e.target.value)} />
              </Group>
              {t === 'IT' && (
                <Group grow mt="xs">
                  <TextInput label="Начало" placeholder="2022" value={form.expStart} onChange={e => set('expStart')(e.target.value)} />
                  <TextInput label="Конец" placeholder="н.в." value={form.expEnd} onChange={e => set('expEnd')(e.target.value)} />
                </Group>
              )}
              {t === 'Менеджер' && (
                <TextInput mt="xs" label="Размер команды" placeholder="12" value={form.teamSize} onChange={e => set('teamSize')(e.target.value)} />
              )}
              <Textarea mt="xs" label="Описание" value={form.expDesc} onChange={e => set('expDesc')(e.target.value)} rows={2} />
            </Accordion.Panel>
          </Accordion.Item>

          {/* Projects / Portfolio */}
          <Accordion.Item value="proj">
            <Accordion.Control>{t === 'Дизайнер' ? 'Портфолио-проект' : 'Проект'}</Accordion.Control>
            <Accordion.Panel>
              <Group grow>
                <TextInput label="Название" value={form.projName} onChange={e => set('projName')(e.target.value)} />
                {t === 'Дизайнер' && <TextInput label="Клиент" placeholder="Название компании" value={form.projClient} onChange={e => set('projClient')(e.target.value)} />}
              </Group>
              <Textarea mt="xs" label="Описание" value={form.projDesc} onChange={e => set('projDesc')(e.target.value)} rows={2} />
              {t === 'IT' && <TagsInput mt="xs" label="Технологии" value={form.projTech} onChange={set('projTech')} placeholder="React, C#..." />}
            </Accordion.Panel>
          </Accordion.Item>

          {/* Education */}
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

          {/* Template-specific extras */}
          {t === 'IT' && (
            <Accordion.Item value="certs">
              <Accordion.Control>Сертификации</Accordion.Control>
              <Accordion.Panel>
                <TagsInput label="Сертификаты" placeholder="AWS SA, CKAD..." value={form.certifications} onChange={set('certifications')} />
              </Accordion.Panel>
            </Accordion.Item>
          )}
          {t === 'Дизайнер' && (
            <Accordion.Item value="awards">
              <Accordion.Control>Награды</Accordion.Control>
              <Accordion.Panel>
                <TagsInput label="Награды и конкурсы" placeholder="Red Dot, Awwwards..." value={form.awards} onChange={set('awards')} />
              </Accordion.Panel>
            </Accordion.Item>
          )}
          {t === 'Менеджер' && (
            <>
              <Accordion.Item value="achieve">
                <Accordion.Control>Достижения / KPI</Accordion.Control>
                <Accordion.Panel>
                  <TagsInput label="Достижения" placeholder="Увеличил выручку на 40%..." value={form.achievements} onChange={set('achievements')} />
                </Accordion.Panel>
              </Accordion.Item>
              <Accordion.Item value="mcerts">
                <Accordion.Control>Сертификации</Accordion.Control>
                <Accordion.Panel>
                  <TagsInput label="Сертификаты" placeholder="PMP, Scrum Master..." value={form.manageCerts} onChange={set('manageCerts')} />
                </Accordion.Panel>
              </Accordion.Item>
            </>
          )}
        </Accordion>

        <Group>
          <Button onClick={handleSubmit} loading={loading} size="md" color={color}>
            Собрать резюме (Builder.GetResult())
          </Button>
          <Menu shadow="md" width={220}>
            <Menu.Target><Button variant="light" color="green" size="md">Экспорт ↓</Button></Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={handleExportMd}>📝 Скачать .md (Markdown)</Menu.Item>
              <Menu.Item onClick={handleExportWord}>📄 Скачать .doc (Word)</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          <Button variant="subtle" color="gray" onClick={() => { setForm({ ...defaultForm, template: t }); setResult(null) }}>Сбросить</Button>
        </Group>

        {/* ──── LIVE PREVIEW ──── */}
        <Box mt="md">
          {result && (
            <Alert color="green" title={`✓ Резюме собрано — ${result.source}`} mb="sm">
              <Text size="xs" c="dimmed">Шаблон: {t} → Builder выбрал нужный ConcreteBuilder</Text>
            </Alert>
          )}
          <Text fw={600} size="sm" mb="xs" c="dimmed">
            {result ? 'Результат от сервера:' : 'Предпросмотр (live):'}
          </Text>
          <ResumePreview form={form} skills={preview.skills} />
        </Box>
      </Stack>
    </Paper>
  )
}

/* ─────────── Styled resume preview component ─────────── */
function ResumePreview({ form, skills }) {
  const t = form.template

  const accent = t === 'IT' ? '#1565c0' : t === 'Дизайнер' ? '#7b1fa2' : '#00695c'
  const accentBg = t === 'IT' ? '#e3f2fd' : t === 'Дизайнер' ? '#f3e5f5' : '#e0f2f1'
  const accentLight = t === 'IT' ? '#bbdefb' : t === 'Дизайнер' ? '#ce93d8' : '#80cbc4'

  const s = {
    page: { background: '#fff', border: '1px solid #d0d0d0', borderRadius: 8, padding: '2rem', maxWidth: 700, boxShadow: '0 2px 12px rgba(0,0,0,.08)' },
    name: { fontSize: '1.6rem', fontWeight: 700, color: accent, margin: 0 },
    subtitle: { fontSize: '.9rem', color: '#777', margin: '2px 0 0' },
    contacts: { fontSize: '.8rem', color: '#888', margin: '6px 0 12px' },
    sTitle: { fontSize: '.85rem', fontWeight: 700, color: accent, borderBottom: `1px solid ${accentLight}`, paddingBottom: 3, margin: '16px 0 6px' },
    badge: { display: 'inline-block', background: accentBg, color: accent, padding: '2px 8px', borderRadius: 4, fontSize: '.75rem', margin: '2px 3px 2px 0', fontWeight: 500 },
    text: { fontSize: '.82rem', color: '#444', margin: '4px 0', lineHeight: 1.5 },
    muted: { fontSize: '.78rem', color: '#888' },
    bold: { fontWeight: 600 },
  }

  const STitle = ({ children }) => <div style={s.sTitle}>{children}</div>
  const Badges = ({ items }) => <div>{items.map(i => <span key={i} style={s.badge}>{i}</span>)}</div>

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${accent}`, paddingBottom: 10, marginBottom: 12 }}>
        <p style={s.name}>{form.name || 'Имя Фамилия'}</p>
        <p style={s.subtitle}>
          {t === 'IT' && (form.position || 'Software Developer')}
          {t === 'Дизайнер' && 'Дизайнер'}
          {t === 'Менеджер' && (form.position || 'Project Manager')}
        </p>
      </div>

      {/* Contacts */}
      <p style={s.contacts}>
        {[form.email, form.phone,
          t === 'IT' && form.github,
          t === 'Дизайнер' && form.portfolio,
          t === 'Дизайнер' && form.behance,
          t === 'Менеджер' && form.linkedin,
        ].filter(Boolean).join('  ·  ') || 'Контакты не указаны'}
      </p>

      {/* Summary */}
      {form.summary && <>
        <STitle>{t === 'Дизайнер' ? 'Творческое кредо' : t === 'Менеджер' ? 'Профессиональный профиль' : 'О себе'}</STitle>
        <p style={{ ...s.text, fontStyle: t === 'Дизайнер' ? 'italic' : 'normal' }}>{form.summary}</p>
      </>}

      {/* Skills */}
      <STitle>{t === 'IT' ? 'Технический стек' : t === 'Дизайнер' ? 'Инструменты' : 'Ключевые компетенции'}</STitle>
      <Badges items={skills} />

      {/* Experience */}
      {form.company && <>
        <STitle>{t === 'Менеджер' ? 'Опыт управления' : 'Опыт работы'}</STitle>
        <p style={{ ...s.text, ...s.bold }}>{form.position || '-'} — {form.company}
          {t === 'IT' && <span style={s.muted}> ({form.expStart} – {form.expEnd})</span>}
        </p>
        {t === 'Менеджер' && form.teamSize && <p style={s.muted}>Команда: <strong>{form.teamSize} чел.</strong></p>}
        {form.expDesc && <p style={s.text}>{form.expDesc}</p>}
      </>}

      {/* Achievements (Manager) */}
      {t === 'Менеджер' && form.achievements?.length > 0 && <>
        <STitle>Достижения</STitle>
        {form.achievements.map(a => <p key={a} style={s.text}>✅ {a}</p>)}
      </>}

      {/* Projects / Portfolio */}
      {form.projName && <>
        <STitle>{t === 'Дизайнер' ? 'Портфолио' : 'Проекты'}</STitle>
        <p style={{ ...s.text, ...s.bold }}>{form.projName}</p>
        {t === 'Дизайнер' && form.projClient && <p style={s.muted}>Клиент: {form.projClient}</p>}
        {form.projDesc && <p style={s.text}>{form.projDesc}</p>}
        {t === 'IT' && form.projTech.length > 0 && <Badges items={form.projTech} />}
      </>}

      {/* Education */}
      {form.institution && <>
        <STitle>Образование</STitle>
        <p style={s.text}><strong>{form.institution}</strong> — {form.degree} ({form.year})</p>
      </>}

      {/* Template-specific extras */}
      {t === 'IT' && form.certifications?.length > 0 && <>
        <STitle>Сертификации</STitle>
        {form.certifications.map(c => <p key={c} style={s.text}>📜 {c}</p>)}
      </>}
      {t === 'Дизайнер' && form.awards?.length > 0 && <>
        <STitle>Награды</STitle>
        {form.awards.map(a => <p key={a} style={s.text}>🏆 {a}</p>)}
      </>}
      {t === 'Менеджер' && form.manageCerts?.length > 0 && <>
        <STitle>Сертификации</STitle>
        {form.manageCerts.map(c => <p key={c} style={s.text}>📜 {c}</p>)}
      </>}
    </div>
  )
}
