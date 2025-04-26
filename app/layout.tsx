import { Container } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Git Besties',
  description: 'Find who is your github best friend!?',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Container maxWidth="sm">{children}</Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
