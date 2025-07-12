'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '@/components/WalletProvider'
import { 
  Wallet, 
  Clock, 
  Trophy, 
  Gift, 
  Download, 
  RefreshCw,
  CheckCircle,
  XCircle,
  Timer
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Bet {
  id: string
  match: string
  outcome: string
  amount: number
  odds: number
  status: 'pending' | 'won' | 'lost'
  placedAt: string
  settledAt?: string
  payout?: number
  claimableAt?: string
  claimableAmount?: number
}

interface FreeBet {
  id: string
  sponsor: string
  amount: number
  expiresAt: string
  imageUrl: string
}

export default function WalletPage() {
  const { isConnected, connectWallet, balance } = useWallet()
  const [activeTab, setActiveTab] = useState<'bets' | 'freebets' | 'claimable'>('bets')

  const bets: Bet[] = [
    {
      id: '1',
      match: 'FC Barcelona vs Real Madrid',
      outcome: 'Barcelona Win',
      amount: 100,
      odds: 2.1,
      status: 'won',
      placedAt: '2024-01-10T18:00:00Z',
      settledAt: '2024-01-10T22:00:00Z',
      payout: 210
    },
    {
      id: '2',
      match: 'Manchester United vs Liverpool',
      outcome: 'Manchester United Win',
      amount: 50,
      odds: 2.8,
      status: 'lost',
      placedAt: '2024-01-08T15:30:00Z',
      settledAt: '2024-01-08T17:30:00Z',
      claimableAt: '2024-01-22T15:30:00Z',
      claimableAmount: 10
    },
    {
      id: '3',
      match: 'Juventus vs AC Milan',
      outcome: 'Draw',
      amount: 75,
      odds: 3.3,
      status: 'pending',
      placedAt: '2024-01-12T14:00:00Z'
    }
  ]

  const freebets: FreeBet[] = [
    {
      id: '1',
      sponsor: 'Chiliz Sports',
      amount: 25,
      expiresAt: '2024-02-15T23:59:59Z',
      imageUrl: '🎁'
    },
    {
      id: '2',
      sponsor: 'Barcelona FC',
      amount: 15,
      expiresAt: '2024-01-30T23:59:59Z',
      imageUrl: '🔴'
    },
    {
      id: '3',
      sponsor: 'Premier League',
      amount: 30,
      expiresAt: '2024-02-20T23:59:59Z',
      imageUrl: '⚽'
    }
  ]

  const claimableBets = bets.filter(bet => 
    bet.status === 'lost' && bet.claimableAmount && bet.claimableAt
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isClaimable = (claimableAt: string) => {
    return new Date(claimableAt) <= new Date()
  }

  const totalClaimable = claimableBets.reduce((sum, bet) => sum + (bet.claimableAmount || 0), 0)

  const handleClaim = async (betId: string, amount: number) => {
    toast.success(`Claimed ${amount} CHZ successfully!`)
  }

  const handleRestake = async (betId: string, amount: number) => {
    toast.success(`Restaked ${amount} CHZ successfully!`)
  }

  const handleWalletAction = async (action: () => Promise<void>) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }
    
    try {
      await action()
    } catch (error) {
      toast.error('Transaction failed')
    }
  }

  const handleTabClick = (tab: 'bets' | 'freebets' | 'claimable') => {
    setActiveTab(tab)
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Cyber Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/30 p-12 max-w-md overflow-hidden"
            style={{
              borderRadius: '50px 30px 50px 30px',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(255, 0, 122, 0.1) 100%)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 opacity-50"
              style={{
                borderRadius: '50px 30px 50px 30px'
              }}
            ></div>
            <div className="relative z-10">
              <Wallet className="w-16 h-16 text-primary mx-auto mb-6" />
              <h1 className="text-heading-xl font-heading text-white mb-6">Connect Your Wallet</h1>
              <p className="text-body text-gray-400 mb-8">
                Connect your wallet to view your betting history and manage your CHZ tokens
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={connectWallet}
                className="btn-primary w-full px-8 py-4"
                style={{
                  borderRadius: '25px 15px 25px 15px'
                }}
              >
                Connect Wallet
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-12"
        >
          <h1 className="text-display font-heading text-white mb-6">
            My <span className="text-primary">Wallet</span>
          </h1>
          <p className="text-body-lg text-gray-400">
            Manage your bets, claim rewards, and track your performance
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Stats Cards - More organic design */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border-l-4 border-primary/50 hover:border-primary transition-all duration-500 text-center overflow-hidden"
            style={{
              borderRadius: '40px 20px 40px 20px'
            }}
          >
            <div className="p-8">
              <Wallet className="w-12 h-12 text-primary mx-auto mb-4" />
              <div className="text-heading-lg font-heading text-white mb-2">
                {isConnected ? `${balance} CHZ` : '-- CHZ'}
              </div>
              <div className="text-body text-gray-400">Current Balance</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border-l-4 border-cyan-500/50 hover:border-cyan-500 transition-all duration-500 text-center overflow-hidden"
            style={{
              borderRadius: '20px 40px 20px 40px'
            }}
          >
            <div className="p-8">
              <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <div className="text-heading-lg font-heading text-white mb-2">
                {isConnected ? `${totalClaimable} CHZ` : '-- CHZ'}
              </div>
              <div className="text-body text-gray-400">Claimable Soon</div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="relative backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border-l-4 border-purple-500/50 hover:border-purple-500 transition-all duration-500 text-center overflow-hidden"
            style={{
              borderRadius: '40px 20px 40px 20px'
            }}
          >
            <div className="p-8">
              <Gift className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-heading-lg font-heading text-white mb-2">
                {isConnected ? freebets.length : '--'}
              </div>
              <div className="text-body text-gray-400">Active Freebets</div>
            </div>
          </motion.div>
        </div>

        {/* Tab Navigation - More organic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-12"
        >
          <div className="flex space-x-4 backdrop-blur-sm bg-gradient-to-r from-white/10 to-white/5 border border-white/20 p-3 overflow-hidden"
            style={{
              borderRadius: '50px 25px 50px 25px'
            }}
          >
            {[
              { id: 'bets', label: 'My Bets', icon: Trophy },
              { id: 'claimable', label: 'Claimable', icon: Clock },
              { id: 'freebets', label: 'Freebets', icon: Gift }
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabClick(tab.id as any)}
                className={`px-8 py-3 flex items-center space-x-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg border-2 border-primary'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border-2 border-transparent'
                }`}
                style={{
                  borderRadius: index === 1 ? '25px 15px 25px 15px' : '15px 25px 15px 25px'
                }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'bets' && (
            <div className="space-y-6">
              {bets.map((bet, index) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="relative backdrop-blur-sm bg-gradient-to-r from-white/5 via-white/2 to-white/5 border-l-4 transition-all duration-500 overflow-hidden"
                  style={{
                    borderRadius: '30px 15px 30px 15px',
                    borderLeftColor: bet.status === 'won' ? '#ff007a' : bet.status === 'lost' ? '#6b7280' : '#f59e0b'
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-full"
                          style={{
                            backgroundColor: bet.status === 'won' ? 'rgba(255, 0, 122, 0.2)' : bet.status === 'lost' ? 'rgba(107, 114, 128, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                            borderRadius: '20px 10px 20px 10px'
                          }}
                        >
                          {bet.status === 'won' && <CheckCircle className="w-6 h-6 text-primary" />}
                          {bet.status === 'lost' && <XCircle className="w-6 h-6 text-gray-400" />}
                          {bet.status === 'pending' && <Timer className="w-6 h-6 text-yellow-400" />}
                        </div>
                        <div>
                          <div className="text-body text-white font-medium">{bet.match}</div>
                          <div className="text-caption text-gray-400">
                            {bet.outcome} • {bet.odds}x odds
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-body text-white font-medium">{bet.amount} CHZ</div>
                        <div className={`text-caption capitalize font-medium ${
                          bet.status === 'won' ? 'text-primary' : 
                          bet.status === 'lost' ? 'text-gray-400' : 'text-yellow-400'
                        }`}>
                          {bet.status}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-small text-gray-400 pt-4 border-t border-white/10">
                      <div>Match: {formatDate(bet.placedAt)}</div>
                      {bet.status === 'won' && <div className="text-primary font-medium">+{bet.payout} CHZ</div>}
                      {bet.status === 'lost' && <div className="text-gray-400">Lost bet</div>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'claimable' && (
            <div className="space-y-6">
              {claimableBets.map((bet, index) => (
                <motion.div
                  key={bet.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="relative backdrop-blur-sm bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500/50 hover:border-cyan-500 transition-all duration-500 overflow-hidden"
                  style={{
                    borderRadius: '25px 35px 25px 35px'
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-cyan-500/20 rounded-full"
                          style={{
                            borderRadius: '15px 25px 15px 25px'
                          }}
                        >
                          <Clock className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <div className="text-body text-white font-medium">{bet.match}</div>
                          <div className="text-caption text-gray-400">
                            {bet.outcome} • {bet.odds}x odds
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-body text-white font-medium">{bet.claimableAmount} CHZ</div>
                        <div className="text-caption text-gray-400">
                          {isClaimable(bet.claimableAt!) ? 'Ready to claim' : 'Soon'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-small text-gray-400 mb-4">
                      <div>Original bet: {bet.amount} CHZ</div>
                      <div>Claimable: {formatDate(bet.claimableAt!)}</div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleWalletAction(async () => {
                          if (isClaimable(bet.claimableAt!)) {
                            toast.success(`Claimed ${bet.claimableAmount} CHZ!`)
                          } else {
                            toast.error('Not ready to claim yet')
                          }
                        })}
                        disabled={!isClaimable(bet.claimableAt!)}
                        className={`px-6 py-3 font-medium transition-all duration-300 ${
                          isClaimable(bet.claimableAt!)
                            ? 'bg-primary text-white hover:bg-opacity-90 shadow-lg shadow-primary/25 border-2 border-primary'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed border-2 border-gray-600'
                        }`}
                        style={{
                          borderRadius: '20px 10px 20px 10px'
                        }}
                      >
                        {isClaimable(bet.claimableAt!) ? 'Claim Now' : 'Not Ready'}
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleWalletAction(async () => {
                          toast.success('Funds restaked for 14 more days!')
                        })}
                        className="px-6 py-3 bg-white/5 border border-white/20 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
                        style={{
                          borderRadius: '10px 20px 10px 20px'
                        }}
                      >
                        Restake
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {claimableBets.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12 futuristic-card"
                >
                  <Clock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-heading-md font-heading text-gray-300 mb-2">No Claimable Bets</h3>
                  <p className="text-body text-gray-400">
                    When you lose a bet, 20% becomes claimable after 14 days
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {activeTab === 'freebets' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {freebets.map((freebet, index) => (
                <motion.div
                  key={freebet.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500/50 hover:border-purple-500 transition-all duration-500 text-center overflow-hidden"
                  style={{
                    borderRadius: index % 2 === 0 ? '40px 20px 40px 20px' : '20px 40px 20px 40px'
                  }}
                >
                  <div className="p-8">
                    <div className="text-6xl mb-6">{freebet.imageUrl}</div>
                    <div className="text-body-lg text-white font-medium mb-3">{freebet.sponsor}</div>
                    <div className="text-heading-md font-heading text-purple-400 mb-3">{freebet.amount} CHZ</div>
                    <div className="text-body text-gray-400 mb-6">
                      Expires: {formatDate(freebet.expiresAt)}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleWalletAction(async () => {
                        toast.success('Freebet ready to use!')
                      })}
                      className="btn-primary w-full px-6 py-4"
                      style={{
                        borderRadius: '25px 15px 25px 15px'
                      }}
                    >
                      Use Freebet
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 