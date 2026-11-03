'use client'

import { useEffect, useState } from 'react'
interface Overview {
  username?: string; name?: string; total?: number | null; ranking?: number; error?: string
  breakdown?: { difficulty: string; solved: number | null; available: number | null }[]
}
export function LeetCodeOverview() {
  const [stats, setStats] = useState<Overview | null>(null)
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/leetcode', { signal: controller.signal }).then(r => r.json()).then(setStats).catch(() => {
      if (!controller.signal.aborted) setStats({ error: 'Unable to load LeetCode statistics. Please try again.' })
    })
    return () => controller.abort()
  }, [attempt])
  return <section aria-label="LeetCode overview" aria-live="polite" className="lc-overview">
    <p className="lede">LeetCode · {stats?.username ?? 'Profile overview'}</p>
    {!stats ? <p>Loading solved questions…</p> : stats.error ? <>
      <p role="status">{stats.error}</p>
      <button className="chip" onClick={() => { setStats(null); setAttempt(value => value + 1) }}>Retry</button>
    </> : <>
      {stats.name ? <p>{stats.name}</p> : null}
      <div className="lc-total"><strong>{stats.total ?? '—'}</strong><span>Questions solved</span></div>
      <div className="lc-breakdown">{stats.breakdown?.map(item => <div key={item.difficulty}>
        <b>{item.difficulty}</b><strong>{item.solved ?? '—'}</strong>
        <span>of {item.available ?? '—'} problems</span>
        <progress aria-label={`${item.difficulty} solved`} value={item.solved ?? 0} max={item.available || 1} />
      </div>)}</div>
      {stats.ranking ? <p>Global ranking: #{stats.ranking.toLocaleString()}</p> : null}
      <p className="lc-note">Public LeetCode statistics · refreshed hourly</p>
    </>}
  </section>
}
