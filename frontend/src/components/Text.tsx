"use client"

import { useState } from "react"

type TextProps = {
  text: string
  setText: any
}

export default function Text({
  text,
  setText
}: TextProps) {

  return (
    <div className="h-12 w-full flex rounded-full bg-neutral-700 items-center px-4">
        <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Awaiting your drawing..."
        spellCheck={false}
        maxLength={800}
        autoCapitalize="off"
        autoCorrect="off"
        className="grow outline-none bg-transparent text-sm"
        />
    </div>
  )
}
