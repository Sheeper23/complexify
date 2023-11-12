"use client"

import Image from "next/image";
import mascot from "../../public/hedgeMascot.png"

type SidebarProps = {
  gptMessage: string
}

export default function Sidebar({
  gptMessage
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full gap-4 bg-neutral-700 w-[20%] items-center p-4">
        <Image src={mascot} alt="hedgehog" className="aspect-square w-full rounded-md" />
        <p className="text-[2.5vw] italic font-title text-transparent bg-clip-text scrolling-gradient-a">&nbsp;Complexify&nbsp;</p>
        <div className="w-full bg-black border-2 border-white grow p-2 text-blue-400">
          {gptMessage}
        </div>
        <div className="flex w-[80%] justify-between">
          <div className="bg-green-500 rounded-full py-2 px-4">
            Yes
          </div>
          <div className="bg-red-600 rounded-full py-2 px-4">
            No
          </div>
        </div>
    </div>
  )
}
