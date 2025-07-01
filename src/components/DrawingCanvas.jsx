import React, { useRef, useState } from "react";

export default function DrawingCanvas({ value, onExport }) {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

  // For touch support
  const getPointerPos = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };
    }
  };

  const startDraw = (e) => {
    setDrawing(true);
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPointerPos(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!drawing) return;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getPointerPos(e);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#222";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const endDraw = () => setDrawing(false);

  const handleClear = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    if (onExport) onExport("");
  };

  const handleExport = () => {
    const dataUrl = canvasRef.current.toDataURL("image/png");
    if (onExport) onExport(dataUrl);
  };

  // If editing, show the existing drawing
  React.useEffect(() => {
    if (!value) return;
    const img = new window.Image();
    img.onload = () => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
    };
    img.src = value;
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-2">
      <canvas
        ref={canvasRef}
        width={320}
        height={240}
        className="border rounded shadow bg-white cursor-crosshair"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={endDraw}
        onMouseLeave={endDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={endDraw}
        style={{ touchAction: "none" }}
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleClear}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleExport}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Export Drawing
        </button>
      </div>
    </div>
  );
}
