"use client";

import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/editor.css";
import "@tldraw/tldraw/ui.css";

export default function TldrawWrapper() {
  return (
    <div className="w-full h-full absolute inset-0">
      <Tldraw />
    </div>
  );
}