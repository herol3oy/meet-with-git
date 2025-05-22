import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request): Promise<Response> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      )
    }

    const body = await request.json()

    const { data, error } = await supabase
      .from('shared_conversations')
      .insert({
        users: body.users,
        location: body.location,
        conversation: body.conversation,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ id: data.id })
  } catch (error) {
    console.error('Error sharing conversation:', error)
    return NextResponse.json(
      { error: 'Error sharing conversation' },
      { status: 500 },
    )
  }
}
