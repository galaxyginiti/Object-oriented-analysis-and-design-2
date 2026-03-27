import { useState, useRef, useEffect } from 'react';
import { AppShell } from '@mantine/core';
import NavBar from './components/NavBar';

import SectionDemo  from './sections/SectionDemo';
import SectionIdea  from './sections/SectionIdea';
import SectionUml2  from './sections/SectionUml2';
import SectionCode1 from './sections/SectionCode1';
import SectionCode2 from './sections/SectionCode2';
import SectionEnd   from './sections/SectionEnd';

const SECTIONS = [
  { id: 'demo',  label: '▶ Демо',                component: SectionDemo  },
  { id: 'idea',  label: '01 Идея',               component: SectionIdea  },
  { id: 'uml2',  label: '02 UML с паттерном',    component: SectionUml2  },
  { id: 'code1', label: '03 Код без паттерна',    component: SectionCode1 },
  { id: 'code2', label: '04 Код с паттерном',     component: SectionCode2 },
  { id: 'end',   label: '05 Вывод',              component: SectionEnd   },
];

export default function App() {
  const [active, setActive] = useState('demo');
  const mainRef = useRef(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [active]);

  const Section = SECTIONS.find(s => s.id === active)?.component ?? SectionDemo;

  return (
    <AppShell header={{ height: 56 }} padding="md">
      <AppShell.Header>
        <NavBar
          sections={SECTIONS}
          active={active}
          onChange={setActive}
        />
      </AppShell.Header>
      <AppShell.Main ref={mainRef}>
        <Section />
      </AppShell.Main>
    </AppShell>
  );
}
