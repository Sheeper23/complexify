"use client"

import Canvas from "@/components/Canvas";
import Sidebar from "@/components/Sidebar";
import Text from "@/components/Text";
import { useState } from "react";

export default function Home() {
  const [gptMessage, setGptMessage] = useState("")

  function setMessage(message: string) {
    setGptMessage(message)
  }

  return (
    <main className="flex w-full h-full">
      <Sidebar gptMessage={gptMessage} />
      <div className="grow flex flex-col p-8 gap-8">
        <Canvas setMessage={setMessage} />
        <Text />
      </div>
    </main>
  )
}
