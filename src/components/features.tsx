import { BlendIcon, Handshake, Store } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import tensor from "../../public/tensor.png"

export default function Features() {
    return (
        <main className='h-fit my-[6rem] p-4'>
            <h1 className='my-12 text-4xl md:text-6xl font-extrabold text-center'>Features</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className="border-2 group transition-all duration-110 ease-linear overflow-hidden relative col-span-1 p-6 md:p-10 h-[23rem] md:h-[25rem] rounded-lg">
                    <Store className='mb-6 opacity-80' size={35} />
                    <h3 className="text-xl md:text-3xl font-semibold mb-2">Marketplace Aggregation</h3>
                    <p className='text-sm text-gray-400 font-[300]'>We use Tensor to find the best prices for your NFTs in SOL.</p>
                    <Image className='absolute md:left-[50%] md:translate-x-[-50%] transition-all duration-300 opacity-50 ease-linear bottom-[-150px] group-hover:opacity-100 group-hover:bottom-[-70px] md:group-hover:bottom-[-110px] border-2 p-2 rounded-md' src={tensor} width={500} height={500} alt='image-1' />
                </div>
                <div className="border-2 group transition-all duration-110 ease-linear overflow-hidden relative col-span-1  p-6 md:p-10 h-[23rem] md:h-[25rem] rounded-lg">
                    <Handshake className='mb-6 opacity-80' size={35} />
                    <h3 className="text-xl md:text-3xl font-semibold mb-2">User-Friendly</h3>
                    <p className='text-sm text-gray-400 font-[300]'>Simple interface to connect, select, and swap with just a few clicks.</p>
                    <Image className='absolute md:left-[50%] md:translate-x-[-50%] transition-all duration-300 opacity-50 ease-linear bottom-[-150px] group-hover:opacity-100 group-hover:bottom-[-70px] md:group-hover:bottom-[-110px] border-2 p-2 rounded-md' src={tensor} width={500} height={500} alt='image-1' />
                </div>
                <div className="border-2 group transition-all duration-110 ease-linear overflow-hidden relative col-span-1 md:col-span-2  p-6 md:p-10 h-[23rem] md:h-[25rem] rounded-lg">
                    <BlendIcon className='mb-6 opacity-80' size={35}/>
                    <h3 className="text-xl md:text-3xl font-semibold mb-2">Token Swaps</h3>
                    <p className='text-sm text-gray-400 font-[300]'>Jupiters swap aggregator ensures you get the best rates when converting to your desired token</p>
                    <Image className='absolute right-[-10%] transition-all duration-300 opacity-50 ease-linear bottom-[-150px] group-hover:opacity-100 group-hover:bottom-[-70px] md:group-hover:bottom-[-110px] border-2 p-2 rounded-md' src={tensor} width={500} height={500} alt='image-1' />
                </div>
            </div>
        </main>
    )
}
