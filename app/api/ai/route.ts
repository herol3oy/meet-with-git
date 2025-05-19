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
            'You are a creative writer who generates funny conversations between two GitHub users. Keep the conversation light-hearted and tech-related.',
        },
        {
          role: 'user',
          content: `Generate a funny conversation between two GitHub users set in a ${location.label} environment, using the following GitHub profile information:
        - GitHub user 1: ${JSON.stringify(users[0])}
        - GitHub user 2: ${JSON.stringify(users[1])}
        
        Make sure the conversation reflects their personalities, interests, or projects — and make one of the users fire back with a gloriously smug, nose-in-the-air retort to crank up the comedy.`,
        },
      ],
      temperature: 0.8,
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
