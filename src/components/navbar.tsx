import React from 'react'
import { SelectTheme } from './theme-toggler'
import { Button } from './ui/button'

export default function Navbar() {
    return (
        <nav className='py-4 flex mx-auto max-w-7xl items-center justify-between'>
            <div>NFT Liquidator</div>
            <div className='flex items-center gap-4'>
                <SelectTheme />
                <Button>Contact Us</Button>
            </div>
        </nav>

    )
}
