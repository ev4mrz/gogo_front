import './globals.css'
import { Inter } from 'next/font/google'
import { WalletProvider } from '@/components/WalletProvider'
import { Navigation } from '@/components/Navigation'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Gogo - Decentralized Betting Platform',
  description: 'Bet on Passion. Win or Fuel the Game. Built on Chiliz Chain.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: 'rgba(0, 0, 0, 0.95)',
                  color: '#fff',
                  border: '1px solid rgba(255, 0, 122, 0.5)',
                  backdropFilter: 'blur(20px)',
                },
              }}
            />
          </div>
        </WalletProvider>
      </body>
    </html>
  )
} 