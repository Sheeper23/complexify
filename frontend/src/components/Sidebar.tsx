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
        <div>

        </div>
    </div>
  )
}
