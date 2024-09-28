'use client';

import React from 'react'
import { SelectTheme } from './theme-toggler'
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();

    return (
        <nav className='py-4 flex mx-auto max-w-7xl items-center justify-between'>
            <div 
              onClick={() => router.push('/')} 
              style={{ 
                cursor: 'pointer',
                textShadow: '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2, 0 0 40px #8a2be2', // Purple glow
                transition: 'text-shadow 0.3s ease'
              }}
              className='text-purple-950 text-md dark:text-white'
              onMouseEnter={(e) => e.currentTarget.style.textShadow = '0 0 15px #b19cd9, 0 0 25px #b19cd9, 0 0 35px #b19cd9, 0 0 45px #b19cd9, 0 0 55px #b19cd9'}
              onMouseLeave={(e) => e.currentTarget.style.textShadow = '0 0 10px #8a2be2, 0 0 20px #8a2be2, 0 0 30px #8a2be2, 0 0 40px #8a2be2'}
            >
              ChronoMint
            </div>
            <div className='flex items-center gap-4'>
                <SelectTheme />
                <button
                    className="invert hover:rotate-2 brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-2xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600"
                >
                    <div
                        className="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-xl font-semibold w-full h-full"
                    >
                        <div
                            className="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.8"
                                className="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-[1.99]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                ></path>
                            </svg>
                            Contact Us
                        </div>
                    </div>
                </button>
            </div>
        </nav>

    )
}
