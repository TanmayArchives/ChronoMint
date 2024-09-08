import { useState, useEffect, useCallback, useMemo } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Metaplex } from "@metaplex-foundation/js"
import { Loader2 } from "lucide-react"
import { trackEvent } from '@/lib/analytics'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl, Connection } from '@solana/web3.js'
import { ChevronDown } from "lucide-react"

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
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const { publicKey, connected, disconnect } = useWallet()
  const [network, setNetwork] = useState(WalletAdapterNetwork.Mainnet)

  const endpoint = useMemo(() => {
    if (network === WalletAdapterNetwork.Mainnet) {
      const quicknodeUrl = process.env.NEXT_PUBLIC_QUICKNODE_URL
      const quicknodeApiKey = process.env.NEXT_PUBLIC_QUICKNODE_API_KEY
      if (!quicknodeUrl || !quicknodeApiKey) {
        console.error('QuickNode URL or API key is missing')
        return clusterApiUrl(network) // Fallback to public RPC
      }
      return `${quicknodeUrl}/${quicknodeApiKey}`
    }
    return clusterApiUrl(network)
  }, [network])

  const connection = useMemo(() => new Connection(endpoint), [endpoint])

  useEffect(() => {
    console.log('Current network:', network)
    console.log('Current endpoint:', endpoint)
  }, [network, endpoint])

  useEffect(() => {
    console.log('Current network:', connection.rpcEndpoint)
  }, [connection])

  useEffect(() => {
    async function checkConnection() {
      try {
        const version = await connection.getVersion()
        console.log('Connection established. Version:', version)
      } catch (err) {
        console.error('Failed to establish connection:', err)
        setError(`Failed to establish connection: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
    checkConnection()
  }, [connection])

  const fetchNFTs = useCallback(async () => {
    if (!publicKey) return
    setIsLoading(true)
    setError(null)
    try {
      console.log('Fetching NFTs for wallet:', publicKey.toBase58())
      console.log('Using endpoint:', connection.rpcEndpoint)
      const metaplex = new Metaplex(connection)
      const nfts = await metaplex.nfts().findAllByOwner({ owner: publicKey })
      console.log('Fetched NFTs:', nfts)
      console.log('NFTs count:', nfts.length)
      
      const nftData = nfts.map(nft => ({
        mint: nft.address.toBase58(),
        name: nft.name || 'Unnamed NFT',
        image: nft.json?.image || ''
      }))
      
      console.log('Processed NFT data:', nftData)
      
      setNfts(nftData)
      setHasMore(false)
    } catch (err) {
      console.error('Error fetching NFTs:', err)
      setError('Failed to load NFTs: ' + (err instanceof Error ? err.message : 'Unknown error occurred'))
    } finally {
      setIsLoading(false)
    }
  }, [publicKey, connection])

  useEffect(() => {
    if (connected && publicKey && connection) {
      console.log('Wallet connected, connection established. Fetching NFTs...')
      fetchNFTs()
    } else {
      console.log('Wallet disconnected or no public key')
      setNfts([])
    }
  }, [connected, publicKey, fetchNFTs, connection])

  const loadMore = () => {
    setPage(prevPage => prevPage + 1)
    trackEvent('Load More NFTs', { page: page + 1 })
  }

  const handleNFTSelect = (nft: NFT) => {
    setSelectedNFT(nft)
    onSelect(nft)
    trackEvent('NFT Selected', { mint: nft.mint, name: nft.name })
  }

  return (
    <div>
      <h1>NFT Liquidator</h1>
      {publicKey ? (
        <div className="mb-4">
          <p>Connected: {publicKey.toBase58()}</p>
          <p>Network: {connection.rpcEndpoint}</p>
          <Button onClick={disconnect} className="mr-2">Disconnect</Button>
          <WalletMultiButton>Change Wallet</WalletMultiButton>
        </div>
      ) : (
        <div className="mb-4">
          <WalletMultiButton>Connect Wallet</WalletMultiButton>
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>{connected ? "Select NFT" : "Connect Wallet to View NFTs"}</CardTitle>
        </CardHeader>
        <CardContent>
          {connected ? (
            isLoading ? (
              <div className="flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : nfts.length > 0 ? (
              <>
                <div className="grid grid-cols-3 gap-2">
                  {nfts.map((nft) => (
                    <Button
                      key={nft.mint}
                      onClick={() => handleNFTSelect(nft)}
                      variant={selectedNFT?.mint === nft.mint ? "default" : "outline"}
                      className="w-full"
                    >
                      {nft.name || 'Unnamed NFT'}
                    </Button>
                  ))}
                </div>
                {hasMore && (
                  <Button onClick={loadMore} disabled={isLoading} className="mt-4 w-full">
                    {isLoading ? <Loader2 className="animate-spin mr-2" /> : null}
                    {isLoading ? 'Loading...' : 'Load More'}
                  </Button>
                )}
              </>
            ) : (
              <div>
                <p>No NFTs found. Make sure you have NFTs in your wallet.</p>
                <p>Wallet address: {publicKey?.toBase58()}</p>
                <p>Network: {connection.rpcEndpoint}</p>
                <Button onClick={fetchNFTs} className="mt-2">Retry Fetch</Button>
              </div>
            )
          ) : (
            <p>Connect your wallet to view and select your NFTs.</p>
          )}
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
      <div className="relative mb-4">
        <select
          value={network}
          onChange={(e) => setNetwork(e.target.value as WalletAdapterNetwork)}
          className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value={WalletAdapterNetwork.Mainnet}>Mainnet</option>
          <option value={WalletAdapterNetwork.Devnet}>Devnet</option>
          <option value={WalletAdapterNetwork.Testnet}>Testnet</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}