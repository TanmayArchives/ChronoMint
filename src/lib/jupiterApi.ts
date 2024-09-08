import axios from 'axios'

const JUPITER_API_URL = 'https://quote-api.jup.ag/v4/quote'

export async function getSwapQuote(inputMint: string, outputMint: string, amount: number): Promise<number> {
  try {
    const response = await axios.get(JUPITER_API_URL, {
      params: {
        inputMint,
        outputMint,
        amount: amount * 1e9, // Convert SOL to lamports
        slippageBps: 50 // 0.5% slippage
      }
    })

    return response.data.outAmount / 1e6 
  } catch (error) {
    console.error('Error fetching swap quote:', error)
    throw error
  }
}