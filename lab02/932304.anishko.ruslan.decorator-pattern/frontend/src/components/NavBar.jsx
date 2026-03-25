import { Group } from '@mantine/core';
import classes from './NavBar.module.css';

export default function NavBar({ sections, active, onChange }) {
  return (
    <nav className={classes.nav}>
      <Group gap={4} px="md" h="100%" wrap="nowrap" style={{ overflowX: 'auto' }}>
        <span style={{ fontWeight: 800, fontSize: '1rem', marginRight: 8, whiteSpace: 'nowrap' }}>
          ☕ Decorator
        </span>
        {sections.map(s => (
          <button
            key={s.id}
            className={`${classes.link} ${s.id === active ? classes.active : ''} ${s.id === 'demo' ? classes.demo : ''}`}
            onClick={() => onChange(s.id)}
          >
            {s.label}
          </button>
        ))}
      </Group>
    </nav>
  );
}
