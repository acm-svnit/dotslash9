"use client";

import React from "react";

export default function VideosSection() {
  return (
    <div
      style={{
        position: "relative",
        width: "85%",
        margin: "0 auto",
        minHeight: "200px",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <video
        src="/dotslash.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          display: "block",
          opacity: 0.5,
        }}
      />
      <video
        src="/sentry3.webm"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          animation: "floatUpDown 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}

