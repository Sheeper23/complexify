import Canvas from "@/components/Canvas";
import Sidebar from "@/components/Sidebar";
import Text from "@/components/Text";

export default function Home() {
  return (
    <main className="flex w-full h-full">
      <Sidebar gptMessage="ewahdbjs" />
      <div className="grow flex flex-col p-8 gap-8">
        <Canvas />
        <Text />
      </div>
    </main>
  )
}
