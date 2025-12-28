"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const tracks = [
  {
    title: "TBA",
    description: "Coming soon...",
    color: "#4B55FF",
    gradient: "linear-gradient(135deg, rgba(75,85,255,0.2) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    title: "TBA",
    description: "Coming soon...",
    color: "#FF4B55",
    gradient: "linear-gradient(135deg, rgba(255,75,85,0.2) 0%, rgba(255,75,85,0.05) 100%)",
  },
  {
    title: "TBA",
    description: "Coming soon...",
    color: "#55FF4B",
    gradient: "linear-gradient(135deg, rgba(85,255,75,0.2) 0%, rgba(85,255,75,0.05) 100%)",
  },
  {
    title: "TBA",
    description: "Coming soon...",
    color: "#FFB84B",
    gradient: "linear-gradient(135deg, rgba(255,184,75,0.2) 0%, rgba(255,184,75,0.05) 100%)",
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
        src="/space/planet7.gif"
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
        src="/space/planet8.gif"
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
            <Card
              key={index}
              className="bg-[#060010] border-[#392e4e] text-white overflow-hidden flex flex-col relative group cursor-pointer"
              style={{
                minHeight: "clamp(180px, 25vh, 250px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                borderColor: track.color + "40",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = track.color;
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = `0 20px 40px ${track.color}40, 0 0 30px ${track.color}60, inset 0 0 20px ${track.color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = track.color + "40";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* Animated background gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                  background: track.gradient,
                  animation: "pulse 3s ease-in-out infinite",
                }}
              />
              
              {/* Animated border glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                style={{
                  background: `radial-gradient(circle at center, ${track.color}20 0%, transparent 70%)`,
                  filter: "blur(20px)",
                }}
              />
              
              {/* Animated corner accents */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "40px",
                  height: "40px",
                  borderTop: `2px solid ${track.color}`,
                  borderLeft: `2px solid ${track.color}`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                className="group-hover:opacity-100"
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "40px",
                  height: "40px",
                  borderTop: `2px solid ${track.color}`,
                  borderRight: `2px solid ${track.color}`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                className="group-hover:opacity-100"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "40px",
                  height: "40px",
                  borderBottom: `2px solid ${track.color}`,
                  borderLeft: `2px solid ${track.color}`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                className="group-hover:opacity-100"
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "40px",
                  height: "40px",
                  borderBottom: `2px solid ${track.color}`,
                  borderRight: `2px solid ${track.color}`,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                className="group-hover:opacity-100"
              />
              
              {/* Animated scan line effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none z-10"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${track.color}80 50%, transparent 100%)`,
                  backgroundSize: "200% 100%",
                  animation: "scan 2s linear infinite",
                  mixBlendMode: "screen",
                }}
              />
              
              <CardContent className="relative z-20 flex flex-col items-center text-center p-6">
                {/* Icon placeholder with animated glow */}
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    marginBottom: "clamp(12px, 2vh, 20px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      border: `2px solid ${track.color}`,
                      backgroundColor: track.color + "10",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.3s ease",
                    }}
                    className="group-hover:scale-110 group-hover:rotate-45"
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        backgroundColor: track.color,
                        opacity: 0.6,
                        transition: "all 0.3s ease",
                      }}
                      className="group-hover:opacity-1 group-hover:scale-125"
                    />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      inset: "-10px",
                      border: `1px solid ${track.color}`,
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      filter: "blur(8px)",
                    }}
                    className="group-hover:opacity-50"
                  />
                </div>
                
                <h3
                  style={{
                    fontFamily: "Upheav, sans-serif",
                    fontSize: "clamp(20px, 3vw, 32px)",
                    color: "#fff",
                    marginBottom: "clamp(12px, 2vh, 20px)",
                    textAlign: "center",
                    lineHeight: "1.2",
                    textShadow: `0 0 10px ${track.color}40`,
                    transition: "all 0.3s ease",
                  }}
                  className="group-hover:text-shadow-lg group-hover:scale-105"
                >
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
                    transition: "color 0.3s ease",
                  }}
                  className="group-hover:text-white/90"
                >
                  {track.description}
                </p>
              </CardContent>
            </Card>
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
