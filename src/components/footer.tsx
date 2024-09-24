"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();
    const year = new Date().getFullYear();

    return (
        <footer className='flex backdrop-blur-md bg-opacity-30 bg-purple-900 rounded-t-3xl shadow-lg mb-4 flex-col md:flex-row items-center p-6 h-fit justify-between max-w-7xl mx-auto'>
            <div 
              onClick={() => router.push('/')} 
              className="text-2xl font-bold mb-4 md:mb-0"
              style={{ 
                cursor: 'pointer',
                color: '#fff', 
                textShadow: '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2, 0 0 40px #8a2be2',
                transition: 'text-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.textShadow = '0 0 15px #b19cd9, 0 0 25px #b19cd9, 0 0 35px #b19cd9, 0 0 45px #b19cd9, 0 0 55px #b19cd9'}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2, 0 0 40px #8a2be2'}
            >
              ChronoMint
            </div>
            <div className='flex font-secondaryFont font-[300] items-center gap-6 flex-wrap justify-center'>
                <div className="text-white">&copy; {year} | All rights reserved</div>
                
                {/* New GitHub button with tooltip */}
                <div className="group relative">
                    <button
                        onClick={() => router.push('https://github.com/TanmayArchives/Liquidating-an-NFT-to-any-token')}
                        className="text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer"
                    >
                        <svg 
                            strokeLinejoin="round" 
                            strokeLinecap="round" 
                            strokeWidth="2" 
                            stroke="currentColor" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            className="w-8 hover:scale-125 duration-200 hover:stroke-purple-300"
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

                <div onClick={() => router.push('mailto:workwithtanmay@gmail.com')} 
                     className="text-white hover:text-purple-300 transition-colors duration-300 cursor-pointer">
                    Mail
                </div>
            </div>
        </footer>
    )
}