"use client"

import Image from "next/image";
import mascot from "../../public/hedgeMascot.png"
import Text from "@/components/Text"

type SidebarProps = {
  text: string
  setText: any
  gptMessage: string
  onYes: (description: string) => void
  onNo: () => void
}

export default function Sidebar({
  text,
  setText,
  gptMessage,
  onYes,
  onNo
}: SidebarProps) {
  function onClickYes() {
    onYes(gptMessage.slice(12))
  }

  function onClickNo() {
    if (text == "") return;
    onNo()
  }

  return (
    <div className="flex flex-col h-full gap-4 bg-neutral-700 w-[25%] items-center p-4">
        <Image src={mascot} alt="hedgehog" className="aspect-square w-full rounded-md" />
        <p className="text-[2.5vw] italic font-title text-transparent bg-clip-text scrolling-gradient-a tracking-wider">&nbsp;Complexify&nbsp;</p>
        <div className="w-full bg-black border-2 border-white grow p-2 text-blue-400 rounded-md overflow-y-auto">
          <p>{gptMessage}</p>
          {(gptMessage != "Left click on the canvas to my right to draw!" && gptMessage != "" && gptMessage != "Processing your image..." && gptMessage != "Generating your complexified image..." && gptMessage != "Enjoy your image!") && (<>
            <p>&nbsp;</p>
            <p>If I was right, click yes! If not, describe it in the text box, then click no!</p>
          </>)}
          {
            gptMessage == "Enjoy your image!" && (<>
              <p>&nbsp;</p>
              <p>To play again, please refresh the page!</p>
            </>)
          }
        </div>
        {(gptMessage != "Left click on the canvas to my right to draw!" && gptMessage != "" && gptMessage != "Processing your image..." && gptMessage != "Generating your complexified image..." && gptMessage != "Enjoy your image!") &&
        <>
          <div className="flex w-[80%] justify-between">
            <div onClick={onClickYes} className="bg-green-500 rounded-full py-2 px-4 hover:scale-95 cursor-pointer">
              Yes
            </div>
            <div onClick={onClickNo} className="bg-red-600 rounded-full py-2 px-4 hover:scale-95 cursor-pointer">
              No
            </div>
          </div>
          {(gptMessage != "Left click on the canvas to my right to draw!" && gptMessage != "" && gptMessage != "Processing your image..." && gptMessage != "Generating your complexified image..." && gptMessage != "Enjoy your image!") && <Text text={text} setText={setText} />}
        </>}
    </div>
  )
}
