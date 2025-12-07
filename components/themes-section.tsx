"use client";

import React from "react";
import ElectricBorder from "@/components/ElectricBorder";

const tracks = [
  {
    title: "TBA",
    description:
      "Coming soon...",
  },
  {
    title: "TBA",
    description:
      "Coming soon...",
  },
  {
    title: "TBA",
    description:
      "Coming soon...",
  },
  {
    title: "TBA",
    description:
      "Coming soon...",
  },
];

export default function ThemesSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        padding: "clamp(20px, 4vh, 60px) clamp(10px, 2vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}>
      <img
        src="/planet7.gif"
        alt="Planet"
        className="themes-planet-left"
        style={{
          position: "absolute",
          left: "0",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(400px, 50vw, 400px)",
          height: "clamp(400px, 50vw, 400px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <img
        src="/planet8.gif"
        alt="Planet"
        className="themes-planet-right"
        style={{
          position: "absolute",
          right: "0",
          top: "50%",
          transform: "translate(50%, -50%)",
          width: "clamp(400px, 50vw, 400px)",
          height: "clamp(400px, 50vw, 400px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 10,
        }}>
        <h2
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(40px, 10vw, 100px)",
            color: "#fff",
            textAlign: "center",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
            marginBottom: "clamp(40px, 6vh, 80px)",
          }}>
          Themes
        </h2>
        <div
          className="w-full grid gap-4 md:gap-6 lg:gap-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}>
          {tracks.map((track, index) => (
            <ElectricBorder
              key={index}
              color="#4B55FF"
              speed={1}
              chaos={1}
              thickness={2}
              style={{
                backgroundColor: "#060010",
                padding: "clamp(20px, 3vw, 30px)",
                borderRadius: "12px",
                minHeight: "clamp(180px, 25vh, 250px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
              }}>
              <h3
                style={{
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "clamp(20px, 3vw, 32px)",
                  color: "#fff",
                  marginBottom: "clamp(12px, 2vh, 20px)",
                  textAlign: "center",
                  lineHeight: "1.2",
                }}>
                {track.title}
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  lineHeight: "1.6",
                  fontFamily: "var(--font-sans)",
                  textAlign: "center",
                  margin: 0,
                }}>
                {track.description}
              </p>
            </ElectricBorder>
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "200px",
          background: "linear-gradient(to bottom, #000, transparent)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "200px",
          background: "linear-gradient(to top, #000, transparent)",
          pointerEvents: "none",
          zIndex: 5,
        }}
      />
    </section>
  );
}
