import { Container } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import TopBar from './components/TopBar'

export const metadata: Metadata = {
  title: 'Meet With Git',
  description: 'Have a funny conversation with any Github user.',
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
          <Container maxWidth={'sm'}>
            <TopBar />
            {children}
          </Container>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
