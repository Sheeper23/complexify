import Image from "next/image";
import mascot from "../../public/hedgeMascot.png"

export default function Sidebar() {
  return (
    <div className="flex flex-col h-full gap-4 bg-neutral-700 w-[30rem] items-center p-4">
        <Image src={mascot} alt="hedgehog" className="aspect-square w-full rounded-md" />
        <p className="text-5xl italic font-title">Complexify</p>
    </div>
  )
}
