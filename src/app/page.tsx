'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NFTSelector from '@/components/NFTSelector'
import TokenSelector from '@/components/TokenSelector'
import SwapButton from '@/components/SwapButton'
import Notification from '@/components/Notification'

interface NFT {
  mint: string;
  name: string;
  image: string;
}

interface Notification {
  message: string;
  type: 'success' | 'error';
}

export default function Home() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [selectedToken, setSelectedToken] = useState('')
  const [notification, setNotification] = useState<Notification | null>(null)

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type })
  }

  const handleNFTSelect = (nft: NFT) => setSelectedNFT(nft);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notification])

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white p-8 font-comic-sans"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.h1 
          initial={{ y: -50, rotate: -5 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-6xl font-bold mb-12 text-center text-white stroke-black stroke-2"
          style={{ textShadow: '3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}
        >
          NFT Liquidator
        </motion.h1>
        
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <Notification 
                message={notification.message} 
                type={notification.type} 
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white text-black p-6 rounded-lg shadow-lg transform rotate-2"
          >
            <NFTSelector onSelect={handleNFTSelect} />
          </motion.div>
          
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white text-black p-6 rounded-lg shadow-lg transform -rotate-2"
          >
            <TokenSelector onSelect={setSelectedToken} />
          </motion.div>
        </div>
        
        {selectedNFT && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <SwapButton 
              selectedNFT={selectedNFT} 
              selectedToken={selectedToken} 
              onSuccess={(message) => showNotification(message, 'success')}
              onError={(message) => showNotification(message, 'error')}
            />
          </motion.div>
        )}
      </div>
    </motion.main>
  )
}