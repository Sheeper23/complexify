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
  const [gptMessage, setGptMessage] = useState("")
  const [image_url, setImage_url] = useState("")

  function setMessage(message: string) {
    setGptMessage(message)
  }

  async function onYes(description: string) {
    setGptMessage("Generating image...")
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

  async function onNo(newDescription: string) {

  }

  return (
    <main className="flex w-full h-full">
      <Sidebar gptMessage={gptMessage} onYes={onYes} onNo={onNo} />
      <div className="grow flex flex-col p-8 gap-8">
        <Canvas image_url={image_url} setMessage={setMessage} />
        <Text />
      </div>
    </main>
  )
}
