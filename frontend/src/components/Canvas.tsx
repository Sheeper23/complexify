"use client";

import { useOnDraw } from "@/hooks/useOnDraw";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Image from "next/image";
import { FaEraser } from "react-icons/fa"

type CanvasProps = {
  gptMessage: string
  setMessage: (message: string) => void,
  image_url: string
}

const config: AxiosRequestConfig<any> = {
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
};

export default function Canvas({
  gptMessage,
  setMessage,
  image_url
}: CanvasProps) {
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(10);

  const { setCanvasRef, onCanvasMouseDown, canvasRef } = useOnDraw(onDraw);

  useEffect(() => {
    
    let ctx = canvasRef.current.getContext('2d')


    let rect = canvasRef.current?.parentNode.getBoundingClientRect();
    if (!canvasRef.current) return;
    canvasRef.current.width = rect?.width;
    canvasRef.current.height = rect?.height;

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
  }, [canvasRef])

  function onDraw(ctx: any, point: any, prevPoint: any) {
    drawLine(prevPoint, point, ctx, strokeColor, strokeWidth);
  }

  function drawLine(start: any, end: any, ctx: any, color: any, width: any) {
    if (gptMessage != "Left click on the canvas to my right to draw!") return;
    
    start = start ?? end;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  async function onSubmit() {
    let canvas = canvasRef.current;
    const base64Canvas = canvas.toDataURL().split(";base64,")[1];
    
    setMessage("Processing your image...")
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process-image",
        base64Canvas,
        config
      );
      setMessage(response.data["message"]); // handle the response as needed
    } catch (error) {
      setMessage("Error making POST request: " + error);
    }
  }

  return (
    <>
      <div className={`grow ${image_url == "" ? "bg-white" : "bg-transparent"} ${gptMessage.slice(gptMessage.length-3) == "..." && "animate-pulse"}`}>
        {image_url == "" ?
        <canvas onMouseDown={onCanvasMouseDown} ref={setCanvasRef} /> :
        <div className="relative w-full h-full flex justify-center">
        <Image
        width={0}
        height={0}
        sizes="100vw"
        className="h-full w-auto"
        src={image_url}
        alt="image-placeholder"
        />
        </div>
        }
      </div>
      <div className={`h-20 w-full flex bg-neutral-500 items-center justify-between px-4 rounded-md`}>
        <div className={`bg-red-600 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#FF0000" && "border-2 border-white"}`} onClick={() => setStrokeColor("#FF0000")}></div>
        <div className={`bg-orange-600 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#FFA500" && "border-2 border-white"}`} onClick={() => setStrokeColor("#FFA500")}></div>
        <div className={`bg-yellow-300 text-black rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#FFFF00" && "border-2 border-white"}`} onClick={() => setStrokeColor("#FFFF00")}></div>
        <div className={`bg-green-600 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#00FF00" && "border-2 border-white"}`} onClick={() => setStrokeColor("#00FF00")}></div>
        <div className={`bg-blue-600 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#0000FF" && "border-2 border-white"}`} onClick={() => setStrokeColor("#0000FF")}></div>
        <div className={`bg-indigo-600 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#4B0082" && "border-2 border-white"}`} onClick={() => setStrokeColor("#4B0082")}></div>
        <div className={`bg-violet-600 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#8F00FF" && "border-2 border-white"}`} onClick={() => setStrokeColor("#8F00FF")}></div>
        <div className={`bg-pink-300 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#FFC0CB" && "border-2 border-white"}`} onClick={() => setStrokeColor("#FFC0CB")}></div>
        <div className={`bg-amber-700 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#964B00" && "border-2 border-white"}`} onClick={() => setStrokeColor("#964B00")}></div>
        <div className={`bg-gray-600 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#808080" && "border-2 border-white"}`} onClick={() => setStrokeColor("#808080")}></div>
        <div className={`bg-black text-white rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeColor == "#000000" && "border-2 border-white"}`} onClick={() => setStrokeColor("#000000")}></div>
        <div className={`bg-white text-black rounded-full py-2 px-2 hover:scale-95 cursor-pointer ${strokeColor == "#FFFFFF" && "border-2 border-black"}`} onClick={() => {setStrokeColor("#FFFFFF")}}>
          <FaEraser size={20} />
        </div>
        <div className="h-full w-px bg-black"></div>
        <div className={`bg-neutral-200 rounded-full py-2 px-2 hover:scale-95 cursor-pointer ${strokeWidth == 5 && "border-4 border-black"}`} onClick={() => setStrokeWidth(5)}></div>
        <div className={`bg-neutral-200 rounded-full py-4 px-4 hover:scale-95 cursor-pointer ${strokeWidth == 10 && "border-4 border-black"}`} onClick={() => setStrokeWidth(10)}></div>
        <div className={`bg-neutral-200 rounded-full py-6 px-6 hover:scale-95 cursor-pointer ${strokeWidth == 15 && "border-4 border-black"}`} onClick={() => setStrokeWidth(15)}></div>
        {gptMessage == "Left click on the canvas to my right to draw!" && (<><div className="h-full w-px bg-black"></div> <div className={`bg-white text-black rounded-full py-2 px-4 lg:py-4 lg:px-8 hover:scale-95 cursor-pointer`} onClick={onSubmit}>Done!</div> </>)}
      </div>
    </>
  );
}
