import { Container } from '@mui/material'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import AuthProvider from '@/app/components/AuthProvider'
import Footer from '@/app/components/Footer'
import TopBar from '@/app/components/TopBar'

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
          <AuthProvider>
            <Container maxWidth={'sm'}>
              <TopBar />
              {children}
              <Footer />
            </Container>
          </AuthProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
