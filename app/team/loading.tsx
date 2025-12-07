"use client";

import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          color: "#fff",
          fontFamily: "Upheav, sans-serif",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        Loading...
      </div>
      <div
        style={{
          width: "300px",
          height: "4px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div
        style={{
          color: "#fff",
          fontFamily: "Upheav, sans-serif",
          fontSize: "12px",
          marginTop: "10px",
          opacity: 0.7,
        }}
      >
        100%
      </div>
    </div>
  );
}
