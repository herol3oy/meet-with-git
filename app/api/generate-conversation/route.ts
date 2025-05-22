import OpenAI from 'openai'

export async function POST(request: Request): Promise<Response> {
  try {
    const { users, location } = await request.json()

    const openai = new OpenAI({
      baseURL: 'https://api.deepseek.com',
      apiKey: process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY,
    })

    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content:
            'You are a creative writer who generates funny conversations between two GitHub users. Keep the conversation tech-related.',
        },
        {
          role: 'user',
          content: `
            Generate a witty and dryly humorous conversation between two GitHub users set in a ${location.label} environment, using the following GitHub profile information:
              - GitHub user 1: ${JSON.stringify(users[0])}
              - GitHub user 2: ${JSON.stringify(users[1])}
            The tone should be clever and comedic without relying on one user conceding or complimenting the other. Both users should hold their ground with sharp banter, drawing from their GitHub activity, coding styles, or favorite languages/tools. Include at least one gloriously smug, nose-in-the-air retort from either user to crank up the satire — but make sure it's matched with an equally clever comeback. Think of it like a battle of nerdy egos with mutual respect and zero groveling.`,
        },
      ],
      temperature: 1,
      max_tokens: 500,
    })

    return Response.json({
      conversation: response.choices[0].message.content || '',
    })
  } catch (error) {
    console.error('Error generating conversation:', error)
    return Response.json(
      { error: 'Failed to generate conversation' },
      { status: 500 },
    )
  }
}
