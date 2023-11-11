"use client"

import { useOnDraw } from "@/hooks/useOnDraw";
import { useRef } from "react";

export default function Canvas() {
    const strokeColor = useRef('#000000')
    const strokeWidth = useRef(10)
    
    const {
        setCanvasRef,
        onCanvasMouseDown,
        canvasRef
    } = useOnDraw(onDraw);

    function onDraw(ctx: any, point: any, prevPoint: any) {
        drawLine(prevPoint, point, ctx, strokeColor.current, strokeWidth.current);
    }

    function drawLine(
        start: any,
        end: any,
        ctx: any,
        color: any,
        width: any
    ) {
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

    function onSubmit() {
        let canvas = canvasRef.current
        const base64Canvas = canvas.toDataURL().split(';base64,')[1];
        console.log(JSON.parse(`{"image_path": "${base64Canvas}"}`))
    }
    
    return (
        <>
            <div className="grow bg-white rounded-md">
                <canvas
                    onMouseDown={onCanvasMouseDown}
                    ref={setCanvasRef}
                />
            </div>
            <div className="h-12 w-full flex bg-neutral-500 items-center justify-between px-4">
                <div>option</div>
                <div>option</div>
                <div>option</div>
                <div>option</div>
                <div className="" onClick={onSubmit}>Done!</div>
            </div>
        </>
  )
}
