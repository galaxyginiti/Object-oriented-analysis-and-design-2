import { Group, Text, UnstyledButton } from '@mantine/core'
import classes from './NavBar.module.css'

export default function NavBar({ sections, active, onSelect }) {
  return (
    <div className={classes.nav}>
      <Group h="100%" gap="xs" wrap="nowrap" px="md">
        <Text fw={700} fz="sm" c="blue.9" style={{ whiteSpace: 'nowrap' }}>
          BUILDER · C#
        </Text>
        {sections.map(s => (
          <UnstyledButton
            key={s.id}
            className={`${classes.link} ${active === s.id ? classes.active : ''} ${s.id === 'demo' ? classes.demo : ''}`}
            onClick={() => onSelect(s.id)}
          >
            {s.label}
          </UnstyledButton>
        ))}
      </Group>
    </div>
  )
}
