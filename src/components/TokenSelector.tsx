"use client"
import React from 'react';
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const VALID_TOKENS = ['usdc', 'usdt', 'sol']

interface TokenSelectorProps {
  onSelect: (token: string) => void;
}

export default function TokenSelector({ onSelect }: TokenSelectorProps) {
  const [selectedToken, setSelectedToken] = useState<string>('')

  const handleTokenChange = (value: string) => {
    if (VALID_TOKENS.includes(value.toLowerCase())) {
      setSelectedToken(value)
      onSelect(value)
    } else {
      console.error('Invalid token selected:', value)
      setSelectedToken('')
      onSelect('')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Output Token</CardTitle>
      </CardHeader>
      <CardContent>
        <Select onValueChange={handleTokenChange} value={selectedToken}>
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
        </Select>
      </CardContent>
    </Card>
  )
}