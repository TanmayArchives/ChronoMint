import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className='flex backdrop-blur drop-shadow-[40px_36px_50px_#b037d3] mb-4 flex-col md:flex-row items-center p-4 h-fit justify-between'>
            <div>NFT Liquidator</div>
            <div className='flex font-secondaryFont font-[300] items-center gap-4'>
                <div>&copy; {year} | All rights reserved</div>
                <div>Github</div>
                <div>Mail</div>
            </div>
        </footer>
    )
}
