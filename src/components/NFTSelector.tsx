import { useState, useEffect, useCallback } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Metaplex } from "@metaplex-foundation/js"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'

type NFT = {
  mint: string
  name: string
  image: string
}

interface NFTSelectorProps {
  onSelect: (nft: NFT) => void
}

export default function NFTSelector({ onSelect }: NFTSelectorProps) {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const [network, setNetwork] = useState<WalletAdapterNetwork>(WalletAdapterNetwork.Devnet)

  const fetchNFTs = useCallback(async () => {
    if (!publicKey) return
    setIsLoading(true)
    setError(null)
    try {
      const metaplex = new Metaplex(connection)
      const nfts = await metaplex.nfts().findAllByOwner({ owner: publicKey })
      const nftData = nfts.map(nft => ({
        mint: nft.address.toBase58(),
        name: nft.name,
        image: nft.json?.image || ''
      }))
      setNfts(nftData)
    } catch (err) {
      console.error('Error fetching NFTs:', err)
      setError('Failed to load NFTs. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [publicKey, connection])

  useEffect(() => {
    if (connected && publicKey) {
      fetchNFTs()
    } else {
      setNfts([])
    }
  }, [connected, publicKey, fetchNFTs])

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>NFT Liquidator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <WalletMultiButton className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" />
          
          {connected ? (
            <>
              <p className="text-sm text-gray-600">Connect your wallet to view and select your NFTs.</p>
              <Select onValueChange={(value) => setNetwork(value as WalletAdapterNetwork)} value={network}>
                <SelectTrigger>
                  <SelectValue placeholder="Select network" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={WalletAdapterNetwork.Mainnet}>Mainnet</SelectItem>
                  <SelectItem value={WalletAdapterNetwork.Devnet}>Devnet</SelectItem>
                  <SelectItem value={WalletAdapterNetwork.Testnet}>Testnet</SelectItem>
                </SelectContent>
              </Select>
              
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader2 className="animate-spin" />
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : nfts.length > 0 ? (
                <Select onValueChange={(value) => onSelect(JSON.parse(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an NFT" />
                  </SelectTrigger>
                  <SelectContent>
                    {nfts.map((nft) => (
                      <SelectItem key={nft.mint} value={JSON.stringify(nft)}>
                        {nft.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p>No NFTs found in your wallet.</p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-600">Connect your wallet to view and select your NFTs.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}