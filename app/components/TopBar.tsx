import { loginWithGithub, signout } from '@/app/actions'
import { createClient } from '@/utils/supabase/server'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default async function TopBar() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <Stack
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingY={2}
    >
      <Typography
        variant={'overline'}
        component={'a'}
        href={'/'}
        autoCapitalize={'on'}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          '&:hover': { opacity: 0.8 },
        }}
      >
        Meet With Git
      </Typography>
      {user ? (
        <Stack spacing={2} direction={'row'} alignItems={'center'}>
          <Typography variant='body2'>{user.email}</Typography>
          <Button onClick={signout}>Sign Out</Button>
        </Stack>
      ) : (
        <Button onClick={loginWithGithub}>Log in with Github</Button>
      )}
    </Stack>
  )
}
