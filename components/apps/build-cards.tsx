import { Fragment, type ReactNode } from 'react'

import type { CardDef } from '@/components/desktop/card'
import { DetailRow } from '@/components/apps/interactive'
import { Shots } from '@/components/apps/shots'
import { ThemePicker } from '@/components/apps/theme-picker'
import { tutorial } from '@/content/tutorial'
import { now } from '@/content/now'
import { LeetCodeOverview } from '@/components/apps/leetcode-overview'
import {
  apps,
  detailPalette,
  education,
  headlineStats,
  jobs,
  profile,
  projects,
  toolGroups,
  toolsByName,
} from '@/content'

/**
 * Turns content into the full set of cards, rendered on the server.
 *
 * Every card that can ever exist is built here — dock apps, project details, job details and
 * screenshot cards — so opening one mounts an already-described node rather than running a
 * second, divergent render path.
 */

/** Renders `**bold**` in content strings. Content authors shouldn't have to write JSX. */
function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) return <b key={i}>{part.slice(2, -2)}</b>
    if (part.startsWith('*') && part.endsWith('*')) return <i key={i}>{part.slice(1, -1)}</i>
    return part
  })
}

const app = (id: string) => apps.find((a) => a.id === id)!

function StackShelf() {
  return (
    <>
      {toolGroups.map((group) => (
        <div className="grp" key={group.label}>
          <b>{group.label}</b>
          <div className="grp__row">
            {group.tools.map((tool) => (
              <span className="tool" key={tool.name}>
                {/*
                  * No asset means no glyph at all — just the name. The old coloured initial gave
                  * "L" to both LLM APIs and LangGraph and read as a failed image; several of
                  * these are capabilities rather than products and have no mark to show.
                  */}
                {tool.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element -- tiny fixed-size logo
                  <img className={tool.invert ? 'inv' : undefined} src={tool.logo} alt="" loading="lazy" />
                ) : null}
                {tool.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

/**
 * The tutorial card.
 *
 * Plain server-rendered DOM — no 'use client'. The only thing that tempted it was printing ⌘ on
 * a Mac and Ctrl elsewhere, and the content file spells both out instead, for the reason
 * recorded there.
 */
function Tutorial() {
  return (
    <>
      <p className="lede">{tutorial.lede}</p>
      {/*
       * ONE grid for every row across every group, not a grid per row. Per-row grids size their
       * key column independently, so `max-content` made each description start at a different x
       * and the sheet stopped scanning as a column. Labels span both tracks.
       */}
      <div className="tut">
        {tutorial.groups.map((g) => (
          <Fragment key={g.label}>
            <b className="tut__label">{g.label}</b>
            {g.moves.map((m) => (
              <Fragment key={`${g.label}-${m.keys}-${m.what}`}>
                <kbd>{m.keys}</kbd>
                <span>{m.what}</span>
              </Fragment>
            ))}
          </Fragment>
        ))}
        <b className="tut__label">{tutorial.footLabel}</b>
        <p className="tut__foot">{tutorial.foot}</p>
      </div>
    </>
  )
}

/**
 * "Now" — what is happening at the moment.
 *
 * The date is formatted from a `YYYY-MM` string with an explicit UTC day, not `new Date(str)`
 * on a bare month: that parses as UTC midnight and then prints in the server's local zone,
 * which renders "July" for an August date anywhere west of Greenwich.
 */
function StackChips({ names }: { names: readonly string[] }) {
  return (
    <div>
      {names.map((n) => (
        <span className="chip" key={n}>
          {toolsByName.get(n)?.name ?? n}
        </span>
      ))}
    </div>
  )
}

/**
 * Async because the contributions card is fetched, not authored.
 *
 * That fetch is deliberately here rather than in a client component: it keeps the calendar out
 * of the client bundle, gives the card a height that is already correct when MeasureRig measures
 * it, and avoids the rig firing a duplicate request at page load for a card nobody opened.
 */
export async function buildCards(): Promise<CardDef[]> {
  const cards: CardDef[] = []
  const push = (id: string, body: ReactNode, over?: Partial<CardDef>) => {
    const a = app(id)
    cards.push({
      id,
      label: a.label,
      icon: a.icon,
      colour: a.colour,
      tint: a.tint,
      width: a.width,
      rotate: a.rotate,
      body,
      ...over,
    })
  }

  push(
    'about',
    <>
      <p className="lede">{profile.intro}</p>
      {profile.notes?.map((n, i) => <p key={i}>{n}</p>)}
      {/* canvas-only: it invites you to the Notes card, which the other surfaces do not have */}
      {profile.deskWelcome ? <p>{profile.deskWelcome}</p> : null}
      <p>
        <a className="link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </p>
      <div>
        {profile.links.map((l) => (
          <a className="chip" key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
          </a>
        ))}
      </div>
    </>,
  )

  push(
    'work',
    <>
      {[...projects]
        .sort((a, b) => b.year - a.year)
        .map((p) => (
          <DetailRow
            key={p.slug}
            cardId={`project:${p.slug}`}
            year={String(p.year)}
            title={p.name}
            sub={p.tagline}
            tag={p.tag ?? p.kind}
          />
        ))}
      {headlineStats.length > 0 && (
        <div className="stats">
          {headlineStats.map((s) => (
            <span className="stat" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </span>
          ))}
        </div>
      )}
    </>,
  )

  push(
    'experience',
    <>
      {[...jobs]
        .sort((a, b) => b.year - a.year)
        .map((j) => (
          <DetailRow
            key={j.slug}
            cardId={`job:${j.slug}`}
            year={String(j.year)}
            title={j.role}
            sub={`${j.company} · ${j.period}`}
          />
        ))}
      {education.map((e) => (
        <div className="item" key={e.institution}>
          <span className="yr">edu</span>
          <span>
            <span className="ttl">{e.degree}</span>
            <span className="sub">
              {e.institution} · {e.detail}
            </span>
          </span>
        </div>
      ))}
    </>,
  )

  push('stack', <StackShelf />)

  push(
    'resume',
    <>
      <p className="lede">The whole thing, as a page you can scroll.</p>
      <p>
        {/*
          A plain anchor, not <Link>: the canvas and the scrolling site are two very different
          documents sharing one layout — one suppresses scrolling and runs a rAF camera, the other
          runs Lenis and ScrollTrigger. A full load guarantees neither inherits the other's state.
        */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- deliberate full load */}
        <a className="link" href="/">
          Open the site →
        </a>
        {profile.resumePdf ? (
          <>
            {' '}
            <a className="link" href={profile.resumePdf} download>
              Download PDF ↓
            </a>
          </>
        ) : null}
      </p>
      <p style={{ fontSize: '.8125rem', color: 'var(--ink-subtle)' }}>
        Server-rendered, and works with JavaScript disabled.
      </p>
    </>,
  )

  push('themes', <ThemePicker />)

  push(
    'contact',
    <>
      <p className="lede">One message away.</p>
      <p>
        <a className="link" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
      </p>
      <div>
        {profile.links.map((l) => (
          <a className="chip" key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
          </a>
        ))}
      </div>
    </>,
  )

  push('tutorial', <Tutorial />)

  push('now', <>
    <p className="lede">{now.lede}</p>
    <div className="now">{now.items.map(item => <Fragment key={item.label}>
      <b className="now__label">{item.label}</b><span>{item.what}</span>
    </Fragment>)}</div>
    <p className="now__stamp">Updated November 2026</p>
  </>)

  push('coding', <LeetCodeOverview />)

  /* --- project details, plus a screenshot card for each --- */
  for (const p of projects) {
    const id = `project:${p.slug}`
    cards.push({
      id,
      label: p.name,
      icon: 'project',
      colour: detailPalette.project.colour,
      tint: detailPalette.project.tint,
      width: 560,
      rotate: 0.8,
      body: (
        <>
          {p.meta ? <p className="detail-meta">{p.meta}</p> : null}
          {p.award ? <div className="award">🏆 {p.award}</div> : null}
          <p className="lede">{rich(p.lede)}</p>
          <Shots images={p.images} alt={`${p.name} screenshot`} />
          <ul className="bullets">
            {p.highlights.map((h, i) => (
              <li key={i}>{rich(h)}</li>
            ))}
          </ul>
          <StackChips names={p.stack} />
          {p.links?.length ? (
            <div className="links">
              {p.links.map((l) => (
                <a
                  className="link"
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label} →
                </a>
              ))}
            </div>
          ) : null}
        </>
      ),
    })
    // nothing to promote, so no card and no dead row in the command palette
    if (p.images?.length) {
      cards.push({
        id: `shot:${p.slug}`,
        label: `${p.name} — shot`,
        icon: 'shot',
        colour: detailPalette.project.colour,
        tint: detailPalette.project.tint,
        width: 520,
        rotate: -0.9,
        body: <Shots images={p.images} alt={`${p.name} screenshot`} full />,
      })
    }
  }

  /* --- job details, same treatment --- */
  for (const j of jobs) {
    const id = `job:${j.slug}`
    cards.push({
      id,
      label: j.role,
      icon: 'experience',
      colour: detailPalette.job.colour,
      tint: detailPalette.job.tint,
      width: 580,
      rotate: -1.0,
      body: (
        <>
          {j.meta ? <p className="detail-meta">{j.meta}</p> : null}
          <p className="lede">{rich(j.lede)}</p>
          <Shots images={j.images} alt={`${j.company} screenshot`} />
          <ul className="bullets">
            {j.highlights.map((h, i) => (
              <li key={i}>{rich(h)}</li>
            ))}
          </ul>
          <StackChips names={j.stack} />
        </>
      ),
    })
    if (j.images?.length) {
      cards.push({
        id: `shot:${j.slug}`,
        label: `${j.company} — shot`,
        icon: 'shot',
        colour: detailPalette.job.colour,
        tint: detailPalette.job.tint,
        width: 520,
        rotate: 0.9,
        body: <Shots images={j.images} alt={`${j.company} screenshot`} full />,
      })
    }
  }

  return cards
}
