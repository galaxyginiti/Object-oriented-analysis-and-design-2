import { useState } from 'react'
import { AppShell } from '@mantine/core'
import NavBar from './components/NavBar'
import SectionDemo from './sections/SectionDemo'
import SectionIdea from './sections/SectionIdea'
import SectionUml1 from './sections/SectionUml1'
import SectionUml2 from './sections/SectionUml2'
import SectionCode1 from './sections/SectionCode1'
import SectionCode2 from './sections/SectionCode2'
import SectionEnd from './sections/SectionEnd'

const SECTIONS = [
  { id: 'demo',  label: '▶ Демо',               component: SectionDemo  },
  { id: 'idea',  label: '01 Идея',              component: SectionIdea  },
  { id: 'uml1',  label: '02 UML без паттерна',  component: SectionUml1  },
  { id: 'uml2',  label: '03 UML с паттерном',   component: SectionUml2  },
  { id: 'code1', label: '04 Код без паттерна',  component: SectionCode1 },
  { id: 'code2', label: '05 Код с паттерном',   component: SectionCode2 },
  { id: 'end',   label: '06 Вывод',             component: SectionEnd   },
]

export default function App() {
  const [active, setActive] = useState('demo')
  const ActiveSection = SECTIONS.find(s => s.id === active)?.component

  return (
    <AppShell header={{ height: 54 }} padding={0}>
      <AppShell.Header>
        <NavBar sections={SECTIONS} active={active} onSelect={id => { setActive(id); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
      </AppShell.Header>
      <AppShell.Main>
        <div className="section-content">
          {ActiveSection && <ActiveSection />}
        </div>
      </AppShell.Main>
    </AppShell>
  )
}
