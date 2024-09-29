"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';

export default function Footer() {
    const router = useRouter();
    const year = new Date().getFullYear();

    return (
        <footer className='border-t-2 relative bg-background bg-opacity-30'>
            {/* <div className='absolute left-[50%] translate-x-[-50%] -bottom-[0rem] -z-[20] size-[18rem] overflow-hidden rounded-full bg-gradient-to-t from-purple-400 to-purple-700 blur-[5em]'>
            </div> */}

            <div className='flex max-w-7xl  mx-auto px-4 flex-col items-center p-6 h-fit justify-between'>
                <div className='flex items-center gap-0'>
                    {['C', 'h', 'r', 'o', 'n', 'o', 'M', 'i', 'n', 't'].map((item, index, arr) => {

                        return (
                            <span
                                onClick={() => router.push('/')}
                                key={`item-${index}`}
                                className={`text-6xl font-bold ${index + 1 <= arr.length / 2 ? 'hover:-rotate-12' : 'hover:rotate-12'}  cursor-pointer transition-all duration-200 ease-out hover:bg-purple-500 hover:scale-110 bg-gradient-to-b from-black/20 dark:from-white/20 bg-clip-text text-transparent`}
                            // style={{
                            //     cursor: 'pointer',
                            //     color: '#fff',
                            //     textShadow: '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2, 0 0 40px #8a2be2',
                            //     transition: 'text-shadow 0.3s ease'
                            // }}
                            // onMouseEnter={(e) => e.currentTarget.style.textShadow = '0 0 15px #b19cd9, 0 0 25px #b19cd9, 0 0 35px #b19cd9, 0 0 45px #b19cd9, 0 0 55px #b19cd9'}
                            // onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2, 0 0 40px #8a2be2'}
                            >
                                {item}
                            </span>
                        )
                    })}
                </div>

                <div className='flex flex-col font-secondaryFont font-[300] w-full items-center gap-2 mt-6 flex-wrap justify-between'>
                    <div className='flex items-center gap-2'>

                        {/* New GitHub button with tooltip */}
                        <div className="group relative flex items-center justify-center">
                            <button
                                onClick={() => router.push('https://github.com/TanmayArchives/Liquidating-an-NFT-to-any-token')}
                                className="hover:text-purple-300 border-[3px] rounded-lg px-4 py-2 transition-colors duration-300 cursor-pointer"
                            >
                                <svg
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="w-6 hover:scale-105 duration-200 hover:stroke-purple-300"
                                >
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </button>
                            <span className="absolute -top-14 left-[50%] -translate-x-[50%] 
                        z-20 origin-left scale-0 px-3 rounded-lg border 
                        border-gray-300 bg-white py-2 text-sm font-bold
                        shadow-md transition-all duration-300 ease-in-out 
                        group-hover:scale-100 text-purple-900">
                                GitHub
                            </span>
                        </div>

                        <div className="group relative flex  items-center justify-center">
                            <button onClick={() => router.push('mailto:workwithtanmay@gmail.com')}
                                className="border-[3px] rounded-lg px-4 py-2 hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                                <Mail className='hover:scale-105 duration-200' />
                            </button>
                            <span className="absolute -top-14 left-[50%] -translate-x-[50%] 
                        z-20 origin-left scale-0 px-3 rounded-lg border 
                        border-gray-300 bg-white py-2 text-sm font-bold
                        shadow-md transition-all duration-300 ease-in-out 
                        group-hover:scale-100 text-purple-900">
                                Mail
                            </span>
                        </div>


                    </div>

                    <div className="">&copy; {year} | All rights reserved</div>
                </div>
            </div>

        </footer >
    )
}