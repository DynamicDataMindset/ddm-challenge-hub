// app/challenges/[slug]/CopyButton.tsx
'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyButtonProps {
  text: string
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-2 bg-[#161b22] hover:bg-[#1f2937] border border-[#30363d] rounded-lg transition-colors group"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-[#3fb950]" />
      ) : (
        <Copy className="w-4 h-4 text-[#8b949e] group-hover:text-[#39FF14]" />
      )}
    </button>
  )
}