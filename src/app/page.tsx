
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
import Link from 'next/link';
import Hero from '@/components/Hero';

// interface NFT {
//   mint: string;
//   name: string;
//   image: string;
// }

interface Notification {
  message: string;
  type: 'success' | 'error';
}



export default function Home() {

  // const [notification, setNotification] = useState<Notification | null>(null);

  // // const showNotification = (message: string, type: 'success' | 'error') => {
  // //   setNotification({ message, type })
  // // }


  // useEffect(() => {
  //   if (notification) {
  //     const timer = setTimeout(() => {
  //       setNotification(null)
  //     }, 5000)

  //     return () => clearTimeout(timer)
  //   }
  // }, [notification])

  return (
    <>
      <Hero />
      <Features />
    </>

  )
}