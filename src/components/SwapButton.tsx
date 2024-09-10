import { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { Button } from "@/components/ui/button"
import { getNFTPrice } from '@/lib/tensorApi'
import { getSwapQuote } from '@/lib/jupiterApi'
import { Transaction } from '@solana/web3.js'
import axios from 'axios'
import { trackEvent, trackException } from '@/lib/analytics'
import { motion } from 'framer-motion'

interface NFT {
  mint: string;

}

interface SwapButtonProps {
  selectedNFT: NFT;
  selectedToken: string;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export default function SwapButton({ selectedNFT, selectedToken, onSuccess, onError }: SwapButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { publicKey, signTransaction } = useWallet()
  const { connection } = useConnection()

  const handleSwap = async () => {
    if (!publicKey || !signTransaction) {
      onError('Wallet not connected')
      trackEvent('Swap Attempt', { error: 'Wallet not connected' })
      return
    }
    if (!selectedNFT || !selectedToken) {
      onError('Please select an NFT and a token')
      trackEvent('Swap Attempt', { error: 'NFT or token not selected' })
      return
    }

    setIsLoading(true)
    try {
      const nftPrice = await getNFTPrice(selectedNFT.mint)
      if (!nftPrice) {
        throw new Error('Failed to get NFT price')
      }

      const swapQuote = await getSwapQuote('SOL', selectedToken, nftPrice)
      if (!swapQuote) {
        throw new Error('Failed to get swap quote')
      }

      const response = await axios.post('https://quote-api.jup.ag/v4/swap', {
        quoteResponse: swapQuote,
        userPublicKey: publicKey.toBase58(),
        wrapUnwrapSOL: true
      })

      const { swapTransaction } = response.data
      if (!swapTransaction) {
        throw new Error('Failed to create swap transaction')
      }

      const transaction = Transaction.from(Buffer.from(swapTransaction, 'base64'))
      const signedTransaction = await signTransaction(transaction)
      const txid = await connection.sendRawTransaction(signedTransaction.serialize())

      console.log(`Transaction sent: https://explorer.solana.com/tx/${txid}`)
      trackEvent('Swap Completed', {
        nftMint: selectedNFT.mint,
        toToken: selectedToken,
        amount: nftPrice
      })
      onSuccess(`Swap completed successfully. Transaction ID: ${txid}`)
    } catch (error) {
      console.error('Swap failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'Swap failed due to an unknown error'
      onError(errorMessage)
      trackException(errorMessage, false)
      trackEvent('Swap Failed', { error: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg p-4"
    >
      <Button 
        onClick={handleSwap} 
        className="w-full text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out transform hover:bg-blue-600"
        disabled={!publicKey || !selectedNFT || !selectedToken || isLoading}
      >
        {isLoading ? 'Processing...' : 'Swap NFT'}
      </Button>
    </motion.div>
  )
}