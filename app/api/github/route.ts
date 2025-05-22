import { GITHUB_GRAPHQL_API_URL } from '@/consts/github-graphql-base-url-api'
import { SEARCH_USERS_QUERY } from '@/consts/search-users-query'

export async function POST(request: Request): Promise<Response> {
  try {
    const { query } = await request.json()

    if (!query) {
      return Response.json([])
    }

    const response = await fetch(GITHUB_GRAPHQL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        query: SEARCH_USERS_QUERY,
        variables: { query: `${query} type:user` },
      }),
    })

    const data = await response.json()
    return Response.json(data.data.search.nodes)
  } catch (error) {
    console.error('Error searching GitHub users:', error)
    return Response.json([])
  }
}
