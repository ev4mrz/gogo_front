'use client'

import { useState } from 'react'
import { useWallet } from './WalletProvider'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export const Navigation = () => {
  const { isConnected, address, balance, connectWallet, disconnectWallet } = useWallet()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Betting', href: '/betting' },
    { name: 'My Bets', href: '/wallet' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="text-2xl font-bold text-white">
              GOGO
            </div>
          </motion.div>

          {/* Navigation and Wallet Section */}
          <div className="flex items-center space-x-8">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm font-medium transition-colors duration-200 text-white hover:text-primary"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>

            {/* Wallet Connection */}
            <div className="flex items-center space-x-4">
            {isConnected && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center space-x-3 glass px-4 py-2 rounded-full"
              >
                <div className="text-sm">
                  <div className="text-white font-medium">
                    {formatAddress(address!)}
                  </div>
                  <div className="text-primary text-xs">
                    {balance} CHZ
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={disconnectWallet}
                  className="text-xs text-white hover:text-primary"
                >
                  Disconnect
                </motion.button>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden glass p-2 rounded-full"
            >
              {isMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 bg-black border-t border-white/10"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="text-sm font-medium transition-colors duration-200 text-white hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </motion.a>
              ))}
              
              {isConnected && (
                <div className="glass px-4 py-3 rounded-lg">
                  <div className="text-sm">
                    <div className="text-white font-medium">
                      {formatAddress(address!)}
                    </div>
                    <div className="text-primary text-xs mb-2">
                      {balance} CHZ
                    </div>
                    <button
                      onClick={disconnectWallet}
                      className="text-xs text-white hover:text-primary"
                    >
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
} 