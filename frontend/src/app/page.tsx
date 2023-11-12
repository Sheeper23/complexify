"use client"

import Canvas from "@/components/Canvas";
import Sidebar from "@/components/Sidebar";
import Text from "@/components/Text";
import { useState } from "react";
import axios, { AxiosRequestConfig } from 'axios'

const config: AxiosRequestConfig<any> = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function Home() {
  const [gptMessage, setGptMessage] = useState("Left click on the canvas to my right to draw!")
  const [image_url, setImage_url] = useState("")
  const [text, setText] = useState("")

  function setMessage(message: string) {
    setGptMessage(message)
  }

  async function onYes(description: string) {
    setGptMessage("Generating your complexified image...")
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process-description",
        description,
        config
      );
      setImage_url(response.data["imageUrl"])
      setGptMessage("Enjoy your image!")
    } catch (error) {
      console.error("ERROR " + error)
    }
  }

  async function onNo() {
    setGptMessage("Generating your complexified image...")
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process-description",
        text,
        config
      );
      setImage_url(response.data["imageUrl"])
      setGptMessage("Enjoy your image!")
    } catch (error) {
      console.error("ERROR " + error)
    }
  }

  return (
    <main className="flex w-full h-full">
      <Sidebar text={text} setText={setText} gptMessage={gptMessage} onYes={onYes} onNo={onNo} />
      <div className="grow flex flex-col p-8 gap-8">
        <Canvas gptMessage={gptMessage} image_url={image_url} setMessage={setMessage} />
      </div>
    </main>
  )
}
