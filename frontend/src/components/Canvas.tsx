"use client";

import { useOnDraw } from "@/hooks/useOnDraw";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Image from "next/image";

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
      <div className={`grow bg-white ${gptMessage.slice(gptMessage.length-3) == "..." && "animate-pulse"}`}>
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
        <div className={`bg-red-600 rounded-full py-4 px-8 hover:scale-95 cursor-pointer ${strokeColor == "#FF0000" && "border-2 border-white"}`} onClick={() => setStrokeColor("#FF0000")}>Red</div>
        <div className={`bg-green-600 rounded-full py-4 px-8 hover:scale-95 cursor-pointer ${strokeColor == "#00FF00" && "border-2 border-white"}`} onClick={() => setStrokeColor("#00FF00")}>Green</div>
        <div className={`bg-yellow-300 text-black rounded-full py-4 px-8 hover:scale-95 cursor-pointer ${strokeColor == "#FFFF00" && "border-2 border-white"}`} onClick={() => setStrokeColor("#FFFF00")}>Yellow</div>
        <div className={`bg-blue-600 rounded-full py-4 px-8 hover:scale-95 cursor-pointer ${strokeColor == "#0000FF" && "border-2 border-white"}`} onClick={() => setStrokeColor("#0000FF")}>Blue</div>
        <div className={`bg-black text-white rounded-full py-4 px-8 hover:scale-95 cursor-pointer ${strokeColor == "#000000" && "border-2 border-white"}`} onClick={() => setStrokeColor("#000000")}>Black</div>
        <div className={`bg-white text-black rounded-full py-4 px-8 hover:scale-95 cursor-pointer ${strokeColor == "#FFFFFF" && "border-2 border-black"}`} onClick={() => {setStrokeColor("#FFFFFF")}}>Eraser</div>
        <div className={`bg-white text-black rounded-full py-4 px-8 hover:scale-95 cursor-pointer`} onClick={onSubmit}>
          Done!
        </div>
      </div>
    </>
  );
}
