'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useWallet } from '@/components/WalletProvider'
import { Clock, TrendingUp, Users, Trophy } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeOdds: number
  awayOdds: number
  drawOdds?: number
  sport: string
  league: string
  startTime: string
  totalPool: number
  participantCount: number
  fanToken: string
  fanTokenAway: string
  logoHome: string
  logoAway: string
}

export default function BettingPage() {
  const { isConnected, connectWallet, balance } = useWallet()
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const [betAmount, setBetAmount] = useState<number>(10)
  const [selectedOutcome, setSelectedOutcome] = useState<'home' | 'away' | 'draw' | null>(null)
  const [showBetModal, setShowBetModal] = useState(false)
  const [selectedToken, setSelectedToken] = useState<'CHZ' | 'FAN_TOKEN'>('CHZ')

  const matches: Match[] = [
    {
      id: '1',
      homeTeam: 'PSG',
      awayTeam: 'Chelsea',
      homeOdds: 2.4,
      awayOdds: 2.9,
      drawOdds: 3.2,
      sport: 'Football',
      league: 'Champions League',
      startTime: '2024-01-15T21:00:00Z',
      totalPool: 18750,
      participantCount: 1024,
      fanToken: 'PSG',
      fanTokenAway: 'CHE',
      logoHome: '🔴',
      logoAway: '🔵'
    },
    {
      id: '2',
      homeTeam: 'FC Barcelona',
      awayTeam: 'Real Madrid',
      homeOdds: 2.1,
      awayOdds: 3.2,
      drawOdds: 3.0,
      sport: 'Football',
      league: 'La Liga',
      startTime: '2024-01-15T20:00:00Z',
      totalPool: 15420,
      participantCount: 847,
      fanToken: 'BAR',
      fanTokenAway: 'REAL',
      logoHome: '🔴',
      logoAway: '⚪'
    },
    {
      id: '3',
      homeTeam: 'Manchester United',
      awayTeam: 'Liverpool',
      homeOdds: 2.8,
      awayOdds: 2.3,
      drawOdds: 3.1,
      sport: 'Football',
      league: 'Premier League',
      startTime: '2024-01-16T17:30:00Z',
      totalPool: 12890,
      participantCount: 623,
      fanToken: 'MAN',
      fanTokenAway: 'LIV',
      logoHome: '🔴',
      logoAway: '🔴'
    },
    {
      id: '4',
      homeTeam: 'Juventus',
      awayTeam: 'AC Milan',
      homeOdds: 1.9,
      awayOdds: 4.1,
      drawOdds: 3.3,
      sport: 'Football',
      league: 'Serie A',
      startTime: '2024-01-17T19:45:00Z',
      totalPool: 8750,
      participantCount: 412,
      fanToken: 'JUV',
      fanTokenAway: 'MILAN',
      logoHome: '⚫',
      logoAway: '🔴'
    }
  ]

  const getFanTokenForOutcome = (match: Match, outcome: 'home' | 'away' | 'draw') => {
    if (outcome === 'home') return match.fanToken
    if (outcome === 'away') return match.fanTokenAway
    return 'CHZ'
  }

  const getTokenDisplay = (match: Match, outcome: 'home' | 'away' | 'draw') => {
    if (selectedToken === 'CHZ') return 'CHZ'
    const fanToken = getFanTokenForOutcome(match, outcome)
    return fanToken
  }

  const formatTimeUntilMatch = (startTime: string) => {
    const now = new Date()
    const matchTime = new Date(startTime)
    const diffMs = matchTime.getTime() - now.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (diffHours > 24) {
      return `${Math.floor(diffHours / 24)}d ${diffHours % 24}h`
    } else if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m`
    } else {
      return `${diffMinutes}m`
    }
  }

  const calculatePotentialWin = (odds: number, amount: number) => {
    return (amount * odds).toFixed(2)
  }

  const handleBet = async (match: Match, outcome: 'home' | 'away' | 'draw', amount: number, token: 'CHZ' | 'FAN_TOKEN') => {
    if (!isConnected) {
      try {
        await connectWallet()
        if (!isConnected) return
      } catch (error) {
        toast.error('Wallet connection required to place bets')
        return
      }
    }

    if (amount <= 0) {
      toast.error('Please enter a valid bet amount')
      return
    }

    if (parseFloat(balance || '0') < amount) {
      toast.error('Insufficient balance')
      return
    }

    try {
      toast.loading('Placing bet...', { id: 'betting' })
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const tokenDisplay = getTokenDisplay(match, outcome)
      const outcomeText = outcome === 'home' ? match.homeTeam : outcome === 'away' ? match.awayTeam : 'Draw'
      
      toast.success(`Bet placed successfully! ${amount} ${tokenDisplay} on ${outcomeText}`, { id: 'betting' })
      
      setShowBetModal(false)
      setSelectedMatch(null)
      setSelectedOutcome(null)
      setSelectedToken('CHZ')
    } catch (error) {
      toast.error('Failed to place bet', { id: 'betting' })
    }
  }

  const openBetModal = (match: Match, outcome: 'home' | 'away' | 'draw') => {
    setSelectedMatch(match)
    setSelectedOutcome(outcome)
    setSelectedToken('CHZ')
    setShowBetModal(true)
  }

  const betAmountOptions = [10, 50, 100, 250, 500]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-display font-heading text-white mb-6"
          >
            Live <span className="text-primary">Betting</span>
          </motion.h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-500 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="space-y-12">
          {matches.map((match, index) => (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              {/* Match Container - No more cards! */}
              <div className="relative backdrop-blur-sm bg-gradient-to-r from-white/5 via-white/2 to-white/5 border-l-4 border-primary/50 hover:border-primary transition-all duration-500">
                <div className="p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row items-center justify-between">
                    {/* Match Info */}
                    <div className="flex-1 mb-8 lg:mb-0">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          <span className="text-caption text-primary font-medium tracking-wider uppercase">{match.league}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-caption text-gray-400">{match.sport}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-small text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimeUntilMatch(match.startTime)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-12 mb-6">
                        <div className="text-center">
                          <div className="text-4xl mb-3">{match.logoHome}</div>
                          <div className="text-body-lg text-white font-medium">{match.homeTeam}</div>
                        </div>
                        <div className="text-gray-400 text-2xl font-light">VS</div>
                        <div className="text-center">
                          <div className="text-4xl mb-3">{match.logoAway}</div>
                          <div className="text-body-lg text-white font-medium">{match.awayTeam}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-8 text-small text-gray-400">
                        <div className="flex items-center space-x-1">
                          <TrendingUp className="w-4 h-4" />
                          <span>{match.totalPool.toLocaleString()} CHZ pool</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{match.participantCount} bettors</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-primary">{match.fanToken}</span>
                          <span>Fan Token</span>
                        </div>
                      </div>
                    </div>

                    {/* Betting Options - More organic design */}
                    <div className="flex justify-center items-center space-x-8">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openBetModal(match, 'home')}
                        className="relative group min-w-[150px] py-8 px-8 transition-all duration-300 bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 hover:border-primary/80 backdrop-blur-lg overflow-hidden"
                        style={{
                          borderRadius: '30px 10px 30px 10px',
                          background: 'linear-gradient(135deg, rgba(255, 0, 122, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-body text-white font-medium mb-3">{match.homeTeam}</div>
                          <div className="text-primary font-heading text-heading-lg mb-2">{match.homeOdds.toFixed(1)}</div>
                          <div className="text-small text-gray-400 tracking-wider uppercase">odds</div>
                        </div>
                      </motion.button>
                      
                      {match.drawOdds && (
                        <motion.button
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openBetModal(match, 'draw')}
                          className="relative group min-w-[150px] py-8 px-8 transition-all duration-300 bg-gradient-to-br from-purple-500/20 to-transparent border border-purple-500/30 hover:border-purple-500/80 backdrop-blur-lg overflow-hidden"
                          style={{
                            borderRadius: '10px 30px 10px 30px',
                            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)'
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="relative z-10 text-center">
                            <div className="text-body text-white font-medium mb-3">Draw</div>
                            <div className="text-purple-400 font-heading text-heading-lg mb-2">{match.drawOdds.toFixed(1)}</div>
                            <div className="text-small text-gray-400 tracking-wider uppercase">odds</div>
                          </div>
                        </motion.button>
                      )}
                      
                      <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openBetModal(match, 'away')}
                        className="relative group min-w-[150px] py-8 px-8 transition-all duration-300 bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/30 hover:border-cyan-500/80 backdrop-blur-lg overflow-hidden"
                        style={{
                          borderRadius: '30px 10px 30px 10px',
                          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(255, 0, 122, 0.05) 100%)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-body text-white font-medium mb-3">{match.awayTeam}</div>
                          <div className="text-cyan-400 font-heading text-heading-lg mb-2">{match.awayOdds.toFixed(1)}</div>
                          <div className="text-small text-gray-400 tracking-wider uppercase">odds</div>
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Betting Modal - Simplifié */}
        {showBetModal && selectedMatch && selectedOutcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
            onClick={() => setShowBetModal(false)}
          >
            <div className="min-h-screen flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                className="relative max-w-md w-full my-8 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-primary/30 p-8 overflow-hidden"
                style={{
                  borderRadius: '40px 20px 40px 20px',
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(255, 0, 122, 0.1) 100%)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Neon border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-[40px_20px_40px_20px] opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <Trophy className="w-16 h-16 text-primary mx-auto mb-4" />
                    <h2 className="text-heading-lg font-heading text-white mb-2">Place Your Bet</h2>
                    <p className="text-body text-gray-400">
                      Betting on {selectedOutcome === 'home' ? selectedMatch.homeTeam : selectedOutcome === 'away' ? selectedMatch.awayTeam : 'Draw'}
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Odds Display */}
                    <div className="text-center">
                      <div className="text-caption font-body text-gray-400 mb-3 tracking-wider uppercase">Odds</div>
                      <div className="text-display font-heading text-primary">{selectedOutcome === 'home' ? selectedMatch.homeOdds.toFixed(1) : selectedOutcome === 'away' ? selectedMatch.awayOdds.toFixed(1) : selectedMatch.drawOdds?.toFixed(1)}</div>
                    </div>

                    {/* Token Selection */}
                    <div>
                      <div className="text-caption font-body text-white mb-6 text-center tracking-wider uppercase">Bet With</div>
                      <div className="flex justify-center space-x-12">
                        <motion.button
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedToken('CHZ')}
                          className={`text-center transition-all ${
                            selectedToken === 'CHZ'
                              ? 'text-primary'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <div className="text-heading-md font-heading mb-2">CHZ</div>
                          <div className="text-small font-body tracking-wide">Chiliz Token</div>
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedToken('FAN_TOKEN')}
                          className={`text-center transition-all ${
                            selectedToken === 'FAN_TOKEN'
                              ? 'text-primary'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          <div className="text-heading-md font-heading mb-2">
                            {selectedMatch && selectedOutcome && getFanTokenForOutcome(selectedMatch, selectedOutcome)}
                          </div>
                          <div className="text-small font-body tracking-wide">Fan Token</div>
                        </motion.button>
                      </div>
                    </div>

                    {/* Bet Amount Selection */}
                    <div>
                      <div className="text-body font-body text-white mb-4">
                        Bet Amount ({selectedMatch && selectedOutcome && getTokenDisplay(selectedMatch, selectedOutcome)})
                      </div>
                      <div className="grid grid-cols-5 gap-3 mb-6">
                        {betAmountOptions.map((amount) => (
                          <motion.button
                            key={amount}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setBetAmount(amount)}
                            className={`p-4 font-body transition-all duration-300 ${
                              betAmount === amount
                                ? 'bg-primary text-white shadow-lg shadow-primary/25 border-2 border-primary'
                                : 'bg-white/5 border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30'
                            }`}
                            style={{
                              borderRadius: '15px 5px 15px 5px'
                            }}
                          >
                            {amount}
                          </motion.button>
                        ))}
                      </div>
                      <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        className="w-full p-4 bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 font-body transition-all duration-300"
                        placeholder="Custom amount"
                        style={{
                          borderRadius: '20px 10px 20px 10px'
                        }}
                      />
                    </div>

                    {/* Potential Win */}
                    <div className="text-center">
                      <div className="text-caption font-body text-gray-400 mb-3 tracking-wider uppercase">Potential Win</div>
                      <div className="text-heading-lg font-heading text-primary mb-2">{calculatePotentialWin(selectedOutcome === 'home' ? selectedMatch.homeOdds : selectedOutcome === 'away' ? selectedMatch.awayOdds : selectedMatch.drawOdds || 0, betAmount)} {selectedMatch && selectedOutcome && getTokenDisplay(selectedMatch, selectedOutcome)}</div>
                      <div className="text-small font-body text-gray-400">
                        Win = Your bet + 80% of losing stakes
                      </div>
                    </div>

                    {/* Loss Mechanism */}
                    <div className="text-center">
                      <div className="text-caption font-body text-gray-400 mb-4 tracking-wider uppercase">If you lose:</div>
                      <div className="space-y-3 text-small font-body text-gray-400">
                        <div>80% ({(betAmount * 0.8).toFixed(1)} {selectedMatch && selectedOutcome && getTokenDisplay(selectedMatch, selectedOutcome)}) → Winners</div>
                        <div>20% ({(betAmount * 0.2).toFixed(1)} {selectedMatch && selectedOutcome && getTokenDisplay(selectedMatch, selectedOutcome)}) → You (14 days)</div>
                        <div>30 sponsor freebets (NFTs) → Your wallet</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowBetModal(false)}
                        className="flex-1 bg-white/5 border border-white/20 text-white px-6 py-4 font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm"
                        style={{
                          borderRadius: '20px 10px 20px 10px'
                        }}
                      >
                        Cancel
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleBet(selectedMatch, selectedOutcome, betAmount, selectedToken)}
                        className="flex-1 bg-primary text-white px-6 py-4 font-medium transition-all duration-300 hover:bg-opacity-90 border-2 border-primary"
                        style={{
                          borderRadius: '20px 10px 20px 10px'
                        }}
                      >
                        Place Bet
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 