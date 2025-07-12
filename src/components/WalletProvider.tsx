'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'react-hot-toast'

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: string | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isConnecting: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)

  // Check if wallet is already connected on load
  useEffect(() => {
    checkWalletConnection()
    
    // Listen for account changes
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }

    return () => {
      if (typeof window !== 'undefined' && window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      }
    }
  }, [])

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      // User disconnected
      disconnectWallet()
    } else if (accounts[0] !== address) {
      // User switched accounts
      setAddress(accounts[0])
      getBalance(accounts[0])
    }
  }

  const checkWalletConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAddress(accounts[0])
          setIsConnected(true)
          await getBalance(accounts[0])
          // Save connection state
          localStorage.setItem('walletConnected', 'true')
          localStorage.setItem('walletAddress', accounts[0])
        } else {
          // Clear connection state if no accounts found
          localStorage.removeItem('walletConnected')
          localStorage.removeItem('walletAddress')
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error)
        // Clear stored connection state on error
        localStorage.removeItem('walletConnected')
        localStorage.removeItem('walletAddress')
      }
    }
  }

  const getBalance = async (address: string) => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [address, 'latest'],
        })
        // Convert from Wei to CHZ (assuming 18 decimals)
        const balanceInCHZ = (parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)
        setBalance(balanceInCHZ)
      } catch (error) {
        console.error('Error getting balance:', error)
      }
    }
  }

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      toast.error('Please install MetaMask to connect your wallet')
      return
    }

    setIsConnecting(true)
    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length > 0) {
        setAddress(accounts[0])
        setIsConnected(true)
        await getBalance(accounts[0])
        
        // Switch to Chiliz Chain if not already connected
        await switchToChilizChain()
        
        // Save connection state
        localStorage.setItem('walletConnected', 'true')
        localStorage.setItem('walletAddress', accounts[0])
        
        toast.success('Wallet connected successfully!')
      }
    } catch (error: any) {
      console.error('Error connecting wallet:', error)
      toast.error('Failed to connect wallet')
    } finally {
      setIsConnecting(false)
    }
  }

  const switchToChilizChain = async () => {
    if (typeof window === 'undefined' || !window.ethereum) return

    try {
      // Try to switch to Chiliz Chain
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x15B38' }], // Chiliz Chain ID (88888)
      })
    } catch (switchError: any) {
      // If chain doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x15B38',
                chainName: 'Chiliz Chain',
                nativeCurrency: {
                  name: 'CHZ',
                  symbol: 'CHZ',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.chiliz.com'],
                blockExplorerUrls: ['https://scan.chiliz.com'],
              },
            ],
          })
        } catch (addError) {
          console.error('Error adding Chiliz Chain:', addError)
        }
      }
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(null)
    
    // Clear connection state from localStorage
    localStorage.removeItem('walletConnected')
    localStorage.removeItem('walletAddress')
    
    toast.success('Wallet disconnected')
  }

  const value = {
    isConnected,
    address,
    balance,
    connectWallet,
    disconnectWallet,
    isConnecting,
  }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
} 