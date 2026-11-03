import { profile } from '@/content'

interface Count { difficulty: string; count: number }
interface LeetCodeResponse {
  errors?: { message: string }[]
  data?: {
    matchedUser: { username: string; profile: { realName: string; ranking: number }; submitStatsGlobal: { acSubmissionNum: Count[] } } | null
    allQuestionsCount: Count[]
  }
}

export async function GET() {
  const href = profile.links.find(link => link.label === 'LeetCode')?.href
  const username = href?.match(/\/u\/([^/]+)/)?.[1]
  if (!username) return Response.json({ error: 'LeetCode profile is not configured.' }, { status: 503 })
  try {
    const response = await fetch('https://leetcode.com/graphql/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: 'query($username: String!) { matchedUser(username: $username) { username profile { realName ranking } submitStatsGlobal { acSubmissionNum { difficulty count } } } allQuestionsCount { difficulty count } }',
        variables: { username },
      }),
      signal: AbortSignal.timeout(12000), next: { revalidate: 3600 },
    })
    if (!response.ok) throw new Error('Upstream unavailable')
    const result = await response.json() as LeetCodeResponse
    if (!result.data?.matchedUser) {
      return Response.json({ username, error: result.errors?.some(e => e.message.includes('does not exist'))
        ? 'LeetCode could not find this username. The profile link needs to be updated.'
        : 'LeetCode statistics are temporarily unavailable.' }, { status: 503 })
    }
    const user = result.data.matchedUser
    const solved = user.submitStatsGlobal.acSubmissionNum
    return Response.json({ username: user.username, name: user.profile.realName, ranking: user.profile.ranking,
      total: solved.find(item => item.difficulty === 'All')?.count ?? null,
      breakdown: ['Easy','Medium','Hard'].map(difficulty => ({ difficulty,
        solved: solved.find(item => item.difficulty === difficulty)?.count ?? null,
        available: result.data!.allQuestionsCount.find(item => item.difficulty === difficulty)?.count ?? null,
      })), updatedAt: new Date().toISOString() })
  } catch {
    return Response.json({ username, error: 'LeetCode statistics are temporarily unavailable. Please try again.' }, { status: 503 })
  }
}
