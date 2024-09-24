"use client";

import React, { forwardRef, useRef } from "react";
import sol from "../../../public/sol.svg";
import usdc from "../../../public/usdc.svg";
import usdt from "../../../public/usdt.svg";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import Image from "next/image";


export function AnimatedBeamDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const div1Ref = useRef<HTMLDivElement>(null);
    const div2Ref = useRef<HTMLDivElement>(null);

    return (

        <div ref={containerRef} className='flex relative gap-8 pl-4 py-3 w-[15rem] rounded-full pr-8 items-center justify-between'>
            <div ref={div1Ref} className='w-[4rem] h-[4rem]'>
                <Image className='size-full' src={sol} width={500} height={500} alt='sol' />
            </div>
            {/* <Image className='w-[4rem] h-[4rem] invert transform rotate-[220deg] scale-x-[-1]' src={curvedArrow} width={500} height={500} alt='sol' /> */}
            <div ref={div2Ref} className='flex items-center relative'>
                <Image className='w-[4rem] h-[4rem] absolute top-0 left-[50%]' src={usdc} width={500} height={500} alt='sol' />
                <Image className='w-[4rem] h-[4rem] ' src={usdt} width={500} height={500} alt='sol' />
            </div>

            <AnimatedBeam
                startXOffset={25}
                endXOffset={-30}
                pathWidth={4}
                duration={8}
                containerRef={containerRef}
                fromRef={div1Ref}
                toRef={div2Ref}
            />
        </div>

    );
}
