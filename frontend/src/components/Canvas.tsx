"use client";

import { useOnDraw } from "@/hooks/useOnDraw";
import { useEffect, useRef } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Image from "next/image";

type CanvasProps = {
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
  setMessage,
  image_url
}: CanvasProps) {
  const strokeColor = useRef("#000000");
  const strokeWidth = useRef(10);

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
    drawLine(prevPoint, point, ctx, strokeColor.current, strokeWidth.current);
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
      <div className="grow bg-white rounded-md">
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
      <div className="h-12 w-full flex bg-neutral-500 items-center justify-between px-4">
        <div onClick={() => strokeColor.current = "#FF0000"}>option</div>
        <div onClick={() => strokeColor.current = "#00FF00"}>option</div>
        <div onClick={() => strokeColor.current = "#0000FF"}>option</div>
        <div onClick={() => strokeColor.current = "#000000"}>option</div>
        <div className="" onClick={onSubmit}>
          Done!
        </div>
      </div>
    </>
  );
}
