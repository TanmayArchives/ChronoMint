import axios from 'axios'

const TENSOR_API_URL = 'https://api.tensor.so/graphql'

export async function getNFTPrice(mint: string): Promise<number> {
  const query = `
    query GetNFTPrice($mint: String!) {
      nft(mint: $mint) {
        lastSale {
          price
        }
      }
    }
  `

  try {
    const response = await axios.post(TENSOR_API_URL, {
      query,
      variables: { mint }
    })

    const price = response.data.data.nft.lastSale.price
    return price / 1e9 // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching NFT price:', error)
    throw error
  }
}