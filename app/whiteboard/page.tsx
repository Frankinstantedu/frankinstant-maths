"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

type Tool = "brush" | "eraser" | "rectangle" | "circle" | "triangle" | "line";

interface DocState {
  image: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  isFlippedH: boolean;
  isFlippedV: boolean;
}

export default function WhiteboardPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>("brush");
  const [brushColor, setBrushColor] = useState("#020617");
  const [brushSize, setBrushSize] = useState(4);
  const [showGrid, setShowGrid] = useState(true);

  // Platform Watermark Name state
  const [platformName, setPlatformName] = useState("My Tutoring Platform");
  const [isEditingName, setIsEditingName] = useState(false);

  const [doc, setDoc] = useState<DocState | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState<number>(-1);

  const [isDraggingDoc, setIsDraggingDoc] = useState(false);
  const [docDragOffset, setDocDragOffset] = useState({ x: 0, y: 0 });

  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const snapshotRef = useRef<ImageData | null>(null);
  const lastPosRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const saveCanvasState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    const newHistory = history.slice(0, historyStep + 1);
    setHistory([...newHistory, dataUrl]);
    setHistoryStep(newHistory.length);
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    if (showGrid && !doc) {
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      const gridSize = 35;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    if (doc) {
      ctx.save();
      ctx.translate(doc.x + doc.width / 2, doc.y + doc.height / 2);
      ctx.scale(doc.isFlippedH ? -1 : 1, doc.isFlippedV ? -1 : 1);
      ctx.drawImage(doc.image, -doc.width / 2, -doc.height / 2, doc.width, doc.height);
      ctx.restore();

      if (isDraggingDoc) {
        ctx.strokeStyle = "#4f46e5";
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(doc.x, doc.y, doc.width, doc.height);
        ctx.setLineDash([]);
      }
    }

    // Render persistent platform watermark stamp on canvas
    if (platformName.trim()) {
      ctx.save();
      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = "rgba(100, 116, 139, 0.45)";
      ctx.fillText(`📌 ${platformName}`, 20, 35);
      ctx.restore();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;
    
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (history.length === 0) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      redrawCanvas();
      const dataUrl = canvas.toDataURL();
      setHistory([dataUrl]);
      setHistoryStep(0);
    } else {
      const img = new Image();
      img.src = history[historyStep >= 0 ? historyStep : 0];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        redrawCanvas();
      };
    }
  }, []);

  useEffect(() => {
    redrawCanvas();
  }, [showGrid, doc, platformName]);

  const handleUndo = () => {
    if (historyStep > 0) {
      const newStep = historyStep - 1;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          redrawCanvas();
        }
      };
      setHistoryStep(newStep);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = history[newStep];
      img.onload = () => {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          redrawCanvas();
        }
      };
      setHistoryStep(newStep);
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [historyStep, history]);

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const cWidth = canvas ? canvas.width : 800;
        const cHeight = canvas ? canvas.height : 600;

        const initialWidth = Math.min(img.width, cWidth * 0.5);
        const initialHeight = (img.height / img.width) * initialWidth;

        setDoc({
          image: img,
          x: (cWidth - initialWidth) / 2,
          y: (cHeight - initialHeight) / 2,
          width: initialWidth,
          height: initialHeight,
          isFlippedH: false,
          isFlippedV: false,
        });
        setTimeout(saveCanvasState, 20);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    let clientX = 0;
    let clientY = 0;

    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startAction = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (doc && x >= doc.x && x <= doc.x + doc.width && y >= doc.y && y <= doc.y + doc.height) {
      setIsDraggingDoc(true);
      setDocDragOffset({ x: x - doc.x, y: y - doc.y });
      return;
    }

    if (!canvas || !ctx) return;
    
    setIsDrawing(true);
    startPosRef.current = { x, y };
    snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (tool === "brush") {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    lastPosRef.current = { x, y, time: Date.now() };
  };

  const performAction = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCoordinates(e);

    if (isDraggingDoc && doc) {
      setDoc({
        ...doc,
        x: x - docDragOffset.x,
        y: y - docDragOffset.y,
      });
      return;
    }

    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (tool === "eraser") {
      const now = Date.now();
      const last = lastPosRef.current;

      let dynamicWidth = brushSize * 6;

      if (last) {
        const dist = Math.hypot(x - last.x, y - last.y);
        const dt = Math.max(now - last.time, 1);
        const speed = dist / dt;

        const speedMultiplier = Math.min(Math.max(speed * 4, 1), 5); 
        dynamicWidth = brushSize * 6 * speedMultiplier;
      }

      lastPosRef.current = { x, y, time: now };

      ctx.save();
      ctx.strokeStyle = "#ffffff";
      ctx.fillStyle = "#ffffff";
      ctx.lineWidth = dynamicWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      if (last) {
        ctx.moveTo(last.x, last.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(x, y, dynamicWidth / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    } else if (tool === "brush") {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineTo(x, y);
      ctx.stroke();
      lastPosRef.current = { x, y, time: Date.now() };
    } else if (["rectangle", "circle", "triangle", "line"].includes(tool) && startPosRef.current && snapshotRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);

      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();

      const startX = startPosRef.current.x;
      const startY = startPosRef.current.y;

      if (tool === "rectangle") {
        ctx.strokeRect(startX, startY, x - startX, y - startY);
      } else if (tool === "circle") {
        const radiusX = Math.abs(x - startX) / 2;
        const radiusY = Math.abs(y - startY) / 2;
        const centerX = startX + (x - startX) / 2;
        const centerY = startY + (y - startY) / 2;
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === "line") {
        ctx.moveTo(startX, startY);
        ctx.lineTo(x, y);
        ctx.stroke();
      } else if (tool === "triangle") {
        const topX = startX + (x - startX) / 2;
        const topY = startY;
        const leftX = startX;
        const leftY = y;
        const rightX = x;
        const rightY = y;

        ctx.moveTo(topX, topY);
        ctx.lineTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.closePath();
        ctx.stroke();
      }
    }
  };

  const stopAction = () => {
    if (isDrawing || isDraggingDoc) {
      saveCanvasState();
    }
    setIsDraggingDoc(false);
    setIsDrawing(false);
    startPosRef.current = null;
    snapshotRef.current = null;
    lastPosRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setDoc(null);
    setTimeout(() => {
      saveCanvasState();
    }, 20);
  };

  const downloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const canvas = canvasRef.current;
    const imgUrl = canvas ? canvas.toDataURL() : "";

    printWindow.document.write(`
      <html>
        <head>
          <title>${platformName} - Session Report</title>
          <style>
            body { font-family: sans-serif; text-align: center; background: #fff; margin: 0; padding: 20px; }
            img { max-width: 100%; height: auto; border: 1px solid #cbd5e1; border-radius: 8px; }
            h2 { color: #1e293b; margin-bottom: 10px; }
          </style>
        </head>
        <body>
          <h2>${platformName}</h2>
          <img src="${imgUrl}" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden relative">
      <div className="flex flex-wrap items-center justify-between p-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md z-10 gap-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm font-bold text-teal-400 hover:underline">
            ← Back
          </Link>
          
          {/* Editable Platform / Tutor Name Badge */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-xl">
            <span className="text-xs text-slate-400">🏷️</span>
            {isEditingName ? (
              <input
                type="text"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={(e) => { if (e.key === "Enter") setIsEditingName(false); }}
                autoFocus
                className="bg-slate-900 text-xs text-teal-300 font-bold px-1.5 py-0.5 rounded outline-none border border-teal-500/50 w-36"
              />
            ) : (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-xs font-bold text-teal-300 hover:underline cursor-pointer"
                title="Click to edit your platform/tutor name"
              >
                {platformName || "Set Name"}
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
          {(
            [
              { id: "brush", label: "✏️ Pen" },
              { id: "eraser", label: "🧹 Eraser" },
              { id: "rectangle", label: "⬛ Rect" },
              { id: "circle", label: "⭕ Circle" },
              { id: "triangle", label: "🔺 Tri" },
              { id: "line", label: "📏 Line" },
            ] as { id: Tool; label: string }[]
          ).map((t) => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition ${
                tool === t.id ? "bg-indigo-600 text-white shadow" : "text-slate-300 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
          <button
            onClick={handleUndo}
            disabled={historyStep <= 0}
            className="px-2.5 py-1 text-xs bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white rounded font-bold transition"
            title="Undo (Ctrl+Z)"
          >
            ↩️ Undo
          </button>
          <button
            onClick={handleRedo}
            disabled={historyStep >= history.length - 1}
            className="px-2.5 py-1 text-xs bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white rounded font-bold transition"
            title="Redo (Ctrl+Y)"
          >
            Redo ↪️
          </button>
        </div>

        {doc && (
          <div className="flex items-center gap-1 bg-indigo-950/60 border border-indigo-500/30 p-1 rounded-xl">
            <button
              onClick={() => { setDoc({ ...doc, width: doc.width * 1.1, height: doc.height * 1.1 }); setTimeout(saveCanvasState, 20); }}
              className="px-2 py-1 text-xs bg-indigo-900 text-indigo-200 rounded font-bold hover:bg-indigo-800"
            >
              🔍+
            </button>
            <button
              onClick={() => { setDoc({ ...doc, width: Math.max(50, doc.width * 0.9), height: Math.max(50, doc.height * 0.9) }); setTimeout(saveCanvasState, 20); }}
              className="px-2 py-1 text-xs bg-indigo-900 text-indigo-200 rounded font-bold hover:bg-indigo-800"
            >
              🔍-
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <label className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg transition font-bold shadow cursor-pointer flex items-center gap-1">
            <span>📄 Import</span>
            <input type="file" accept="image/*" onChange={handleDocumentUpload} className="hidden" />
          </label>

          <div className="hidden md:flex gap-1">
            {["#020617", "#2563eb", "#16a34a", "#dc2626", "#d97706"].map((color) => (
              <button
                key={color}
                onClick={() => { setBrushColor(color); if(tool === "eraser") setTool("brush"); }}
                className={`w-5 h-5 rounded-full border-2 ${brushColor === color && tool !== "eraser" ? 'border-slate-900 scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`text-xs px-2.5 py-1.5 rounded-lg border font-bold transition ${
              showGrid ? "bg-slate-800 text-teal-300 border-teal-500/40" : "bg-slate-800 text-slate-400 border-slate-700"
            }`}
          >
            📐 Grid
          </button>

          <button
            onClick={downloadPDF}
            className="text-xs bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg transition font-bold shadow"
          >
            📥 Export PDF
          </button>

          <button
            onClick={clearCanvas}
            className="text-xs bg-red-950 text-red-300 border border-red-500/40 px-2.5 py-1.5 rounded-lg hover:bg-red-900 transition font-bold"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="flex-1 w-full relative touch-none bg-white">
        <canvas
          ref={canvasRef}
          onMouseDown={startAction}
          onMouseMove={performAction}
          onMouseUp={stopAction}
          onMouseLeave={stopAction}
          onTouchStart={startAction}
          onTouchMove={performAction}
          onTouchEnd={stopAction}
          className="w-full h-full block cursor-crosshair"
        />
      </div>
    </main>
  );
}