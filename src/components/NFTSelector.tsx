import { useState, useEffect, useCallback } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Metaplex } from "@metaplex-foundation/js"
import { Loader2, Wallet } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogDescription } from '@radix-ui/react-dialog'
import Image from 'next/image'

type NFT = {
  mint: string
  name: string
  image: string
}

interface NFTSelectorProps {
  onSelect: (nft: NFT) => void;
  selectedNFT: NFT | null;
}

export default function NFTSelector({ selectedNFT, onSelect }: NFTSelectorProps) {
  const [nfts, setNfts] = useState<NFT[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { publicKey, connected } = useWallet()
  const { connection } = useConnection()
  const [network, setNetwork] = useState<WalletAdapterNetwork>(WalletAdapterNetwork.Devnet)
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleNFTSelect = (nft: NFT) => {
    onSelect(nft);
    setIsDialogOpen(false);
  }

  return (
    <Card className="w-full md:pr-4 md:w-[50%] min-h-[20rem] max-h-fit">
      <CardHeader>
        <CardTitle className='text-xl'>Choose your NFT</CardTitle>
      </CardHeader>
      <CardContent className='min-h-[calc(20rem-4.8rem)] flex flex-col max-h-fit'>
        <div className="h-full flex-1 flex flex-col">
          {connected ? (
            <div className='flex flex-col gap-4 h-full flex-1'>
              <p className='text-xs dark:text-gray-300 '>1. Select the network</p>
              <div className='block md:hidden'>
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
              </div>

              <RadioGroup
                value={network}
                onValueChange={(value) => setNetwork(value as WalletAdapterNetwork)}
                className="grid-cols-1 hidden md:grid md:grid-cols-3 gap-4"
              >
                {['mainnet-beta', 'devnet', 'testnet'].map((net) => (
                  <div key={net} className="flex items-center">
                    <RadioGroupItem
                      value={net}
                      id={net}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={net}
                      className="flex flex-1 items-center justify-center rounded-md border-[3px] bg-popover p-6 hover:bg-[#b037d3]/5 cursor-pointer hover:text-accent-foreground peer-data-[state=checked]:border-[#b037d3] [&:has([data-state=checked])]:border-[#b037d3]"
                    >
                      {net.charAt(0).toUpperCase() + net.split('-')[0]?.slice(1)}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className='flex items-center justify-between'>
                <p className='text-xs dark:text-gray-300 '>2. Select the NFT</p>
                <aside className='border-2 px-4 py-1 bg-[#b037d3] text-white rounded-full text-xs'>
                  {nfts.length} NFTs
                </aside>
              </div>
              <div className='rounded-md border-2 flex flex-col flex-1 h-full'>

                {isLoading ? (
                  <div className="flex flex-1 border-2 h-full rounded-lg items-center justify-center">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : error ? (
                  <Alert className='flex-1 border-2' variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                ) : nfts.length > 0 ? (
                  <div className='flex flex-col gap-1'>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger className='h-fit' asChild>
                        <Button variant="outline" className="w-full h-[3rem]">Select an NFT</Button>
                      </DialogTrigger>
                      <DialogContent className="w-[50rem] ">
                        <DialogHeader className='text-xl'>Your NFTs</DialogHeader>
                        <DialogDescription className='text-sm text-gray-300'>Select the NFT which you want to swap</DialogDescription>
                        <div className="grid gap-4 h-[50vh]  overflow-auto py-4">
                          {nfts.map((nft) => (
                            <div key={nft.mint} className="flex items-center gap-4 p-2 border rounded-md cursor-pointer hover:bg-accent" onClick={() => handleNFTSelect(nft)}>
                              <Image src={nft.image} alt={nft.name} className="w-16 h-16 object-cover rounded-md" />
                              <div>
                                <h3 className="font-semibold">{nft.name}</h3>
                                <p className="text-sm text-gray-500">{nft.mint.slice(0, 8)}...</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                    {selectedNFT && (
                      <>
                        <h3 className="mt-4 font-semibold font-main">Selected NFT</h3>
                        <div className="p-4 border rounded-md">
                          <div className="flex items-center gap-4">
                            <Image src={selectedNFT.image} alt={selectedNFT.name} className="w-16 h-16 object-cover rounded-md" />
                            <div>
                              <p className="font-medium">{selectedNFT.name}</p>
                              <p className="text-sm text-gray-500">{selectedNFT.mint.slice(0, 8)}...</p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* <Select onValueChange={(value) => onSelect(JSON.parse(value))}>
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
                    </Select> */}
                  </div>
                ) : (
                  <p className='text-sm flex items-center justify-center flex-1 text-gray-400'>No NFTs found in your wallet.</p>
                )}
              </div>

            </div>
          ) : (
            <div className="text-sm gap-4 text-center flex min-h-[calc(20rem-4.8rem)] items-center flex-col justify-center text-gray-400">
              <Wallet size={40} />
              <p className='w-full md:w-[50%]'>Connect your wallet to view and select your NFTs.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}