"use client"
import React from 'react';
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import sol from "../../public/sol.svg";
import usdc from "../../public/usdc.svg";
import usdt from "../../public/usdt.svg";
// import { AnySrvRecord } from 'dns';
import Image from 'next/image';

const VALID_TOKENS = [
  {
    name: 'usdc',
    icon: usdc,
    color: 'border-blue-500'
  },
  {
    name: 'usdt',
    icon: usdt,
    color: 'border-green-500'
  },
  {
    name: 'sol',
    icon: sol,
    color: 'border-purple-500'
  },
]

interface TokenSelectorProps {
  onSelect: (token: string) => void;
}

export default function TokenSelector({ onSelect }: TokenSelectorProps) {
  const [selectedToken, setSelectedToken] = useState<string>('')

  const handleTokenChange = (value: string) => {
    const token = VALID_TOKENS.find(t => t.name === value.toLowerCase());
    if (token) {
      setSelectedToken(value);
      onSelect(value);
    } else {
      console.error('Invalid token selected:', value);
      setSelectedToken('');
      onSelect('');
    }
  }
  return (
    <Card className='w-full md:w-[50%] h-fit md:pl-2'>
      <CardHeader>
        <CardTitle className='text-xl'>Select Output Token</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          onValueChange={handleTokenChange}
          value={selectedToken}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {VALID_TOKENS.map(token => (
            <div
              key={token.name}
              className={`flex items-center space-x-2 h-full rounded-md border-[3px] p-4 py-6 transition-colors ${selectedToken === token.name ? token.color : 'border-2'
                }`}
            >
              <RadioGroupItem value={token.name} id={token.name} className="rounded-full " />
              <Label htmlFor={token.name} className="flex-grow flex items-center justify-between h-full cursor-pointer">
                <p>{token.name.toUpperCase()}</p>
                <Image className='size-full w-[2rem] h-[2rem]' src={token.icon} width={500} height={500} alt={token.name} />
              </Label>
            </div>
          ))}
        </RadioGroup>
        {/* <Select onValueChange={handleTokenChange} value={selectedToken}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a token" />
          </SelectTrigger>
          <SelectContent>
            {VALID_TOKENS.map(token => (
              <SelectItem key={token} value={token}>
                {token.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
      </CardContent>
    </Card>
  )
}