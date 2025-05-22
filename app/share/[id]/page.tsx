import { GithubUser } from '@/types/github-user'
import { SharedConversation } from '@/types/shared-conversation'
import { createClient } from '@/utils/supabase/server'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const supabase = await createClient()

  const { data: conversation, error } = await supabase
    .from('shared_conversations')
    .select('*')
    .eq('id', id)
    .single<SharedConversation>()

  if (error || !conversation) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant={'h5'} color={'error'}>
          Conversation not found!
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant={'h6'} gutterBottom>
            Participants
          </Typography>
          <Stack direction={'row'} spacing={1}>
            {conversation.users.map((user: GithubUser) => (
              <Chip
                key={user.id}
                avatar={<Avatar src={user.avatarUrl} alt={user.login} />}
                label={user.login}
                component={'a'}
                href={`https://github.com/${user.login}`}
                target={'_blank'}
                rel={'noopener noreferrer'}
                clickable
              />
            ))}
          </Stack>
        </Box>

        <Box>
          <Typography variant={'h6'} gutterBottom>
            Location
          </Typography>
          <Chip label={conversation.location.label} />
        </Box>

        <Card>
          <CardContent>
            <Typography variant={'body1'} style={{ whiteSpace: 'pre-wrap' }}>
              {conversation.conversation}
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  )
}
