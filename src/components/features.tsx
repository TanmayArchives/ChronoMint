"use client";
import { BlendIcon, Crown, Handshake, Store } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import tensor from "../../public/tensor.png"
import { motion } from 'framer-motion';

export default function Features() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: -50, filter: "blur(10px)" },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                duration: 0.5,
                delay: custom * 0.2, // 0.2 seconds delay multiplied by the custom value
            },
        }),
    }


    return (
        <motion.main
            className='h-fit mb-[6rem]'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div
                className='flex flex-col text-center p-4 gap-4 mb-6 items-center justify-center'
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.8 }}
            >
                <motion.div
                    className='flex relative overflow-hidden items-center justify-center gap-2 hover:shadow-lg group hover:scale-105 cursor-pointer px-4 py-2 rounded-lg transition-all duration-150 ease-linear border-[3px]'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Crown className='transition-colors w-4 duration-150 ease-linear group-hover:text-purple-500' />
                    <h1 className='font-bold text-sm md:text-base'>Features</h1>
                    <span
                        className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 bg-black/50 dark:bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-20"
                    ></span>
                </motion.div>
                <motion.p
                    className='text-3xl w-full md:w-[50%] font-[400]'
                    variants={itemVariants}
                >
                    Chronomint supports such features which makes your life <span className='bg-gradient-to-r from-purple-500'>easy.</span>
                </motion.p>
            </motion.div>
            <motion.div
                className='grid grid-cols-1 md:grid-cols-2 gap-4'
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.div
                    className="border-2 bg-background group transition-all duration-110 ease-linear overflow-hidden relative col-span-1 p-6 md:p-10 h-[23rem] md:h-[25rem] rounded-lg"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={1}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Store className='mb-6 opacity-80' size={35} />
                    <h3 className="text-xl md:text-3xl font-semibold mb-2">Marketplace Aggregation</h3>
                    <p className='text-sm text-gray-400 font-[300]'>We use Tensor to find the best prices for your NFTs in SOL.</p>
                    <Image className='absolute md:left-[50%] md:translate-x-[-50%] transition-all duration-300 opacity-50 ease-linear bottom-[-150px] group-hover:opacity-100 group-hover:bottom-[-70px] md:group-hover:bottom-[-110px] border-2 p-2 rounded-md' src={tensor} width={500} height={500} alt='image-1' />
                </motion.div>
                <motion.div
                    className="border-2 bg-background group transition-all duration-110 ease-linear overflow-hidden relative col-span-1  p-6 md:p-10 h-[23rem] md:h-[25rem] rounded-lg"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={2}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Handshake className='mb-6 opacity-80' size={35} />
                    <h3 className="text-xl md:text-3xl font-semibold mb-2">User-Friendly</h3>
                    <p className='text-sm text-gray-400 font-[300]'>Simple interface to connect, select, and swap with just a few clicks.</p>
                    <Image className='absolute md:left-[50%] md:translate-x-[-50%] transition-all duration-300 opacity-50 ease-linear bottom-[-150px] group-hover:opacity-100 group-hover:bottom-[-70px] md:group-hover:bottom-[-110px] border-2 p-2 rounded-md' src={tensor} width={500} height={500} alt='image-1' />
                </motion.div>
                <motion.div
                    className="border-2 bg-background group transition-all duration-110 ease-linear overflow-hidden relative col-span-1 md:col-span-2  p-6 md:p-10 h-[23rem] md:h-[25rem] rounded-lg"
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    custom={3}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <BlendIcon className='mb-6 opacity-80' size={35} />
                    <h3 className="text-xl md:text-3xl font-semibold mb-2">Token Swaps</h3>
                    <p className='text-sm text-gray-400 font-[300]'>Jupiters swap aggregator ensures you get the best rates when converting to your desired token</p>
                    <Image className='absolute right-[-10%] transition-all duration-300 opacity-50 ease-linear bottom-[-150px] group-hover:opacity-100 group-hover:bottom-[-70px] md:group-hover:bottom-[-110px] border-2 p-2 rounded-md' src={tensor} width={500} height={500} alt='image-1' />
                </motion.div>
            </motion.div>
        </motion.main>
    )
}
