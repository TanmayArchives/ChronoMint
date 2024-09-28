'use client';
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NFTSelector from '@/components/NFTSelector';
import TokenSelector from '@/components/TokenSelector';
import SwapButton from '@/components/SwapButton';
import NFTMinter from '@/components/NFTMinter';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { ArrowRightLeft } from 'lucide-react';

interface NFT {
  mint: string;
  name: string;
  image: string;
}

export default function Swap() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [selectedToken, setSelectedToken] = useState('');

  const handleNFTSelect = (nft: NFT) => setSelectedNFT(nft);
  return (
    <div className='max-w-7xl my-8 md:my-12 mx-auto'>
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl md:text-3xl'>Swap or Mint NFTs instantly</h1>
          <p className='text-xs md:text-sm text-gray-400'>Below are two options to get you started with either swapping of your NFTs or just mint NFTs at just one click</p>
        </div>
        <div>
          <WalletMultiButton className="w-full rounded-full bg-background hover:bg-background font-bold py-2 px-4" />
        </div>
      </div>
      <Tabs defaultValue="account" className="w-full">
        <TabsList>
          <TabsTrigger className='text-md' value="account">Swap NFTs</TabsTrigger>
          <TabsTrigger className='text-md' value="password">Mint NFTs</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className='flex flex-col mt-8 '>
            <div className='flex flex-col md:flex-row items-center gap-6 relative'>
              <NFTSelector selectedNFT={selectedNFT} onSelect={handleNFTSelect} />
              <div className='md:absolute flex shadow-xl rotate-90 md:rotate-0 items-center bg-background rounded-full justify-center md:top-[50%] border-2 border-accent w-[4rem] h-[4rem] md:left-[50%] md:translate-x-[-50%] md:translate-y-[-50%]'>
                <ArrowRightLeft />
              </div>
              <TokenSelector onSelect={setSelectedToken} />
            </div>

            {selectedNFT && (
              <SwapButton
                selectedNFT={selectedNFT}
                selectedToken={selectedToken}
              />
            )}
          </div>
        </TabsContent>
        <TabsContent value="password">
          <div className='flex flex-col'>
            <NFTMinter />
          </div>
        </TabsContent>
      </Tabs>

    </div>
  )
}
