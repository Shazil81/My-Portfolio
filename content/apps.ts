import type { AppDef } from './types'

/**
 * The dock, in order. This is also the card registry — each entry defines the colour and
 * geometry of the card it opens.
 *
 * To reorder the dock, reorder this array. To add a card you also need a renderer in
 * `components/apps/`, keyed by the same `id`.
 *
 * Heights are deliberately absent: they're measured from real content at runtime, because
 * every hand-picked height in the prototype turned out to be wrong (one by 243px).
 */
export const apps: readonly AppDef[] = [
  { id: 'now', label: 'Now', icon: 'now', colour: '#DFC2CB', tint: '#F4E9ED', width: 520, rotate: -.6 },
  { id: 'coding', label: 'LeetCode', icon: 'graph', colour: '#DFC2CB', tint: '#F4E9ED', width: 500, rotate: .5 },
  { id: 'about', label: 'About', icon: 'about', colour: '#DFC2CB', tint: '#F4E9ED', width: 520, rotate: -1.0 },
  { id: 'work', label: 'Work', icon: 'work', colour: '#DFC2CB', tint: '#F4E9ED', width: 600, rotate: 0.7 },
  { id: 'experience', label: 'Experience', icon: 'experience', colour: '#DFC2CB', tint: '#F4E9ED', width: 560, rotate: -1.2 },
  { id: 'stack', label: 'Stack', icon: 'stack', colour: '#DFC2CB', tint: '#F4E9ED', width: 650, rotate: 0.3 },
  { id: 'resume', label: 'Résumé', icon: 'resume', colour: '#DFC2CB', tint: '#F4E9ED', width: 470, rotate: 0.9 },
  { id: 'themes', label: 'Themes', icon: 'themes', colour: '#DFC2CB', tint: '#F4E9ED', width: 600, rotate: -0.4 },
  { id: 'contact', label: 'Contact', icon: 'contact', colour: '#DFC2CB', tint: '#F4E9ED', width: 480, rotate: 0.6 },
  { id: 'tutorial', label: 'How it works', icon: 'tutorial', colour: '#DFC2CB', tint: '#F4E9ED', width: 540, rotate: 0.6 },
]

/** Only personal portfolio cards are exposed in the dock and menus. */
export type DockNode =
  | { kind: 'app'; id: string }
  | {
      kind: 'folder'
      id: string
      label: string
      /** Key into the icon set, exactly like an app. It has to say what is inside. */
      icon: string
      colour: string
      items: readonly string[]
    }

export const dockLayout: readonly DockNode[] = [
  { kind: 'app', id: 'about' },
  { kind: 'app', id: 'work' },
  { kind: 'app', id: 'experience' },
  { kind: 'app', id: 'stack' },
  { kind: 'app', id: 'resume' },
  { kind: 'app', id: 'contact' },
  { kind: 'folder', id: 'live', label: 'Live', icon: 'live', colour: '#DFC2CB', items: ['now', 'coding'] },
  { kind: 'app', id: 'themes' },
  { kind: 'app', id: 'tutorial' },
]

/** Rendered after a divider at the end of the dock. These leave the site. */
export const externalApps: readonly AppDef[] = [
  {
    id: 'github', label: 'GitHub', icon: 'github', colour: '#DFC2CB', tint: '#F4E9ED',
    width: 0, rotate: 0, href: 'https://github.com/Shazil81',
  },
  {
    id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', colour: '#DFC2CB', tint: '#F4E9ED',
    width: 0, rotate: 0, href: 'https://www.linkedin.com/in/shazil81',
  },
]

/** Colours for cards that are spawned rather than docked (project/job details, screenshots). */
export const detailPalette = {
  project: { colour: '#DFC2CB', tint: '#F4E9ED' },
  job: { colour: '#DFC2CB', tint: '#F4E9ED' },
} as const

/** Card ids are also used for spawned cards (`project:slug`, `shot:slug`), so this stays open. */
export type AppId = string
