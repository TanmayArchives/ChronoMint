
'use client'
import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import NFTSelector from '@/components/NFTSelector'
// import TokenSelector from '@/components/TokenSelector'
// import SwapButton from '@/components/SwapButton'
// import Notification from '@/components/Notification'
// import NFTMinter from '@/components/NFTMinter'
// import { Tab } from '@headlessui/react'
// import { SelectTheme } from '@/components/theme-toggler'
// import Navbar from '@/components/navbar';
import sol from "../../public/sol.svg";
import usdc from "../../public/usdc.svg";
import circle from "../../public/circle-scribble.svg";
import usdt from "../../public/usdt.svg";
import Image from 'next/image'
// import { AnimatedBeamDemo } from '@/components/ui/animated-beam'
import { Button } from '@/components/ui/button'
import { UsersAvatar } from '@/components/users-avatar'
import Features from '@/components/features'
import Footer from '@/components/footer'
import React from 'react';
import { useRouter } from 'next/navigation';

// interface NFT {
//   mint: string;
//   name: string;
//   image: string;
// }

interface Notification {
  message: string;
  type: 'success' | 'error';
}

const ExploreButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/swap');
  };

  return (
    <button
      onClick={handleClick}
      className="overflow-hidden relative w-40 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer z-10 group"
    >
      Try for free
      <span
        className="absolute w-44 h-32 -top-8 -left-2 bg-purple-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
      ></span>
      <span
        className="absolute w-44 h-32 -top-8 -left-2 bg-purple-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
      ></span>
      <span
        className="absolute w-44 h-32 -top-8 -left-2 bg-purple-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
      ></span>
      <span
        className="group-hover:opacity-100  group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10"
      >
        click it !!
      </span>
    </button>
  );
};

export default function Home() {

  const [notification, setNotification] = useState<Notification | null>(null);

  // const showNotification = (message: string, type: 'success' | 'error') => {
  //   setNotification({ message, type })
  // }


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
        <main className='flex relative flex-col items-center justify-start mt-12 border-red-500 h-[88vh] max-h-fit'>
          <a
            href="https://github.com/TanmayArchives/Liquidating-an-NFT-to-any-token"
            target="_blank"
            rel="noopener noreferrer"
            className="flex overflow-hidden items-center text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-black text-white shadow hover:bg-black/90 h-9 px-4 py-2 max-w-52 whitespace-pre md:flex group relative w-full justify-center gap-2 rounded-md transition-all duration-300 ease-out hover:ring-2 hover:ring-black hover:ring-offset-2"
          >
            <span
              className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-40"
            ></span>
            <div className="flex items-center">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 438.549 438.549">
                <path
                  d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
                ></path>
              </svg>
              <span className="ml-1 text-white">Star on GitHub</span>
            </div>
            <div className="ml-2 flex items-center gap-1 text-sm md:flex">
              <svg
                className="w-4 h-4 text-gray-500 transition-all duration-300 group-hover:text-yellow-300"
                data-slot="icon"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span
                className="inline-block tabular-nums tracking-wider font-display font-medium text-white"
              >
                6
              </span>
            </div>
          </a>
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
            <ExploreButton />
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