"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateCursor);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "16px",
        height: "16px",
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        imageRendering: "pixelated",
      }}>
      {/* Pixelated cursor - crosshair style */}
      <div
        style={{
          width: "16px",
          height: "16px",
          position: "relative",
          imageRendering: "pixelated",
        }}>
        {/* Center dot */}
        <div
          style={{
            position: "absolute",
            left: "6px",
            top: "6px",
            width: "4px",
            height: "4px",
            backgroundColor: "#fff",
            imageRendering: "pixelated",
          }}
        />
        {/* Top line */}
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: "0px",
            width: "2px",
            height: "6px",
            backgroundColor: "#fff",
            imageRendering: "pixelated",
          }}
        />
        {/* Bottom line */}
        <div
          style={{
            position: "absolute",
            left: "7px",
            top: "10px",
            width: "2px",
            height: "6px",
            backgroundColor: "#fff",
            imageRendering: "pixelated",
          }}
        />
        {/* Left line */}
        <div
          style={{
            position: "absolute",
            left: "0px",
            top: "7px",
            width: "6px",
            height: "2px",
            backgroundColor: "#fff",
            imageRendering: "pixelated",
          }}
        />
        {/* Right line */}
        <div
          style={{
            position: "absolute",
            left: "10px",
            top: "7px",
            width: "6px",
            height: "2px",
            backgroundColor: "#fff",
            imageRendering: "pixelated",
          }}
        />
      </div>
    </div>
  );
}

