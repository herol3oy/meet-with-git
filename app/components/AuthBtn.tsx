import { createClient } from '@/utils/supabase/server'
import Button from '@mui/material/Button'
import { loginWithGithub, signout } from '../actions'
import { Stack, Typography } from '@mui/material'

export default async function AuthBtn() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Stack
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      flexDirection={'row'}
    >
      <Typography variant="overline">Meet at the sauna</Typography>
      {user ? (
        <Stack spacing={2} direction={'row'} alignItems={'center'}>
          <small>{user.email}</small>
          <Button onClick={signout}>Sign Out</Button>
        </Stack>
      ) : (
        <Button onClick={loginWithGithub}>Log in with Github</Button>
      )}
    </Stack>
  )
}
