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
    >
      <Button 
        onClick={handleSwap} 
        className="w-full bg-white text-black font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:bg-gray-200"
        disabled={!publicKey || !selectedNFT || !selectedToken || isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : (
          'Swap NFT'
        )}
      </Button>
    </motion.div>
  )
}