'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NFTSelector from '@/components/NFTSelector'
import TokenSelector from '@/components/TokenSelector'
import SwapButton from '@/components/SwapButton'
import Notification from '@/components/Notification'
import NFTMinter from '@/components/NFTMinter'
import { Tab } from '@headlessui/react'
import { SelectTheme } from '@/components/theme-toggler'
import Navbar from '@/components/navbar';
import sol from "../../public/sol.svg";
import usdc from "../../public/usdc.svg";
import circle from "../../public/circle-scribble.svg";
import usdt from "../../public/usdt.svg";
import Image from 'next/image'
import { AnimatedBeamDemo } from '@/components/ui/animated-beam'
import { Button } from '@/components/ui/button'
import { UsersAvatar } from '@/components/users-avatar'
import Features from '@/components/features'
import Footer from '@/components/footer'

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
    <div className='mx-auto px-4 max-w-7xl h-screen max-h-fit'>
      <section className='h-full my-4'>
        <header className=''>
          <Navbar />
        </header>

        <main className='flex relative flex-col items-center justify-start mt-12 border-red-500 h-[88vh] max-h-fit'>
          <p className='border-2 px-4 py-1 text-xs rounded-full font-semibold'>Star us on Github</p>
          <div className='flex flex-col my-4 gap-4 px-2 text-center  items-center justify-center'>

            <div className='w-full flex flex-col px-2 text-center items-center justify-center'>
              <h1 className='text-4xl md:text-5xl font-extrabold lg:text-6xl'>Turn your NFTs into</h1>
              <div className='w-fit relative'>
                <h1 className='text-4xl z-[100] md:text-5xl font-extrabold lg:text-6xl '>Instant Tokens</h1>
                <div className='w-[15rem] z-[-1] h-[15rem] lg:w-[25rem] opacity-80 lg:h-[25rem] p-6 lg:p-6 text-yellow-500 rounded-full absolute top-[-95px] right-[-55px] lg:top-[-165px] lg:right-[-100px]'>
                  <Image className='size-full' src={circle} width={500} height={500} alt='sol' />
                </div>
              </div>
            </div>

            <p className='font-normal w-full md:w-[60%] dark:text-gray-300 text-xs md:text-base'>Unlock liquidity instantly by swapping your Solana NFTs for any SPL token be it USDC or USDT, at the best available price.</p>
          </div>

          <UsersAvatar />

          <div className='flex items-center gap-2 my-6'>
            <Button className='font-bold'>Try for free</Button>
            <Button variant={'ghost'}>Explore more</Button>
          </div>
          {/* <AnimatedBeamDemo /> */}
          <div className='w-[7rem] h-[7rem] lg:w-[10rem] lg:h-[10rem] p-6 lg:p-6 bg-background/1 backdrop-blur-xl shadow-xl drop-shadow-[10px_16px_50px_#2874ca] rounded-full absolute top-[400px] lg:top-52 left-8 lg:left-52'>
            <Image className='size-full' src={usdc} width={500} height={500} alt='sol' />
          </div>
          <div className='w-[7rem] h-[7rem] lg:w-[10rem] lg:h-[10rem] p-6 lg:p-8 bg-background/1 backdrop-blur-xl shadow-xl drop-shadow-[10px_16px_50px_#b037d3] rounded-full absolute top-[550px] lg:top-[400px] lg:right-[500px]'>
            <Image className='size-full' src={sol} width={500} height={500} alt='sol' />
          </div>
          <div className='w-[7rem] h-[7rem] lg:w-[10rem] lg:h-[10rem] p-6 lg:p-6 bg-background/1 backdrop-blur-xl shadow-xl drop-shadow-[10px_16px_50px_#52af95] rounded-full absolute top-[410px] lg:top-40 right-8 lg:right-48'>
            <Image className='size-full' src={usdt} width={500} height={500} alt='sol' />
          </div>
        </main>
      </section>

      <section>
        <Features />
      </section>

      <Footer />
    </div>
  )
}