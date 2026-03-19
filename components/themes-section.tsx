"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getHackathonWindowUtcMs } from "@/lib/hackathon-schedule";
import {
  TRACK_DIALOG_TEXT,
} from "@/lib/tracks-content";

type TrackKey = keyof typeof TRACK_DIALOG_TEXT;

type Track = {
  key: TrackKey;
  title: string;
  cardDescription: string;
  color: string;
  gradient: string;
};

function hexToRgb(hex: string) {
  const cleaned = hex.replace("#", "").trim();
  if (cleaned.length !== 6) return { r: 75, g: 85, b: 255 };
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return { r, g, b };
}

const TRACK_ACCENT_BY_KEY: Record<TrackKey, string> = {
  devtech: "#4B55FF",
  greentech: "#55FF4B",
  civictech: "#FFB84B",
  web3: "#FF4B55",
};

const tbaTracks: Track[] = [
  {
    key: "devtech",
    title: "TBA",
    cardDescription: "Coming soon...",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.2) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    key: "greentech",
    title: "TBA",
    cardDescription: "Coming soon...",
    color: "#FF4B55",
    gradient:
      "linear-gradient(135deg, rgba(255,75,85,0.2) 0%, rgba(255,75,85,0.05) 100%)",
  },
  {
    key: "civictech",
    title: "TBA",
    cardDescription: "Coming soon...",
    color: "#55FF4B",
    gradient:
      "linear-gradient(135deg, rgba(85,255,75,0.2) 0%, rgba(85,255,75,0.05) 100%)",
  },
  {
    key: "web3",
    title: "TBA",
    cardDescription: "Coming soon...",
    color: "#FFB84B",
    gradient:
      "linear-gradient(135deg, rgba(255,184,75,0.2) 0%, rgba(255,184,75,0.05) 100%)",
  },
];

const liveTracks: Track[] = [
  {
    key: "devtech",
    title: "DevTech Track",
    cardDescription: "Build tools, platforms, and infrastructure for efficient developer workflows.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.2) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    key: "greentech",
    title: "GreenTech Track",
    cardDescription: "Software solutions improving sustainability and resource efficiency.",
    color: "#55FF4B",
    gradient:
      "linear-gradient(135deg, rgba(85,255,75,0.2) 0%, rgba(85,255,75,0.05) 100%)",
  },
  {
    key: "civictech",
    title: "CivicTech Track",
    cardDescription:
      "Improve public systems for accessibility, safety, governance, and community services.",
    color: "#FFB84B",
    gradient:
      "linear-gradient(135deg, rgba(255,184,75,0.2) 0%, rgba(255,184,75,0.05) 100%)",
  },
  {
    key: "web3",
    title: "Web3 Track",
    cardDescription: "Decentralized software and smart-contract based solutions where trust matters.",
    color: "#FF4B55",
    gradient:
      "linear-gradient(135deg, rgba(255,75,85,0.2) 0%, rgba(255,75,85,0.05) 100%)",
  },
];

export default function ThemesSection() {
  const [nowMs, setNowMs] = useState<number>(() => Date.now());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTrackKey, setSelectedTrackKey] = useState<TrackKey | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "ideas" | "stack" | "avoid">(
    "description",
  );

  const schedule = useMemo(() => getHackathonWindowUtcMs(), []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowMs(Date.now());
    }, 500);
    return () => window.clearInterval(id);
  }, []);

  const isLive = nowMs >= schedule.startUtcMs && nowMs <= schedule.endUtcMs;
  const tracksToRender = isLive ? liveTracks : tbaTracks;

  const selectedTrackTitle =
    selectedTrackKey === null
      ? ""
      : TRACK_DIALOG_TEXT[selectedTrackKey].split("\n")[0];

  const selectedTrackText =
    selectedTrackKey === null ? "" : TRACK_DIALOG_TEXT[selectedTrackKey];

  const selectedTrackParts = useMemo(() => {
    if (!selectedTrackKey) {
      return {
        title: "",
        description: "",
        exampleProjectIdeas: "",
        suggestedTechStack: "",
        projectsToAvoid: "",
      };
    }

    const fullText = TRACK_DIALOG_TEXT[selectedTrackKey];
    const title = fullText.split("\n")[0] ?? "";

    const descriptionMarker = "\nDescription\n";
    const exampleMarker = "\nExample Project Ideas\n";
    const suggestedMarker = "\nSuggested Tech Stack\n";
    const avoidMarker = "\nProjects to Avoid\n";

    const descriptionStart = fullText.indexOf(descriptionMarker);
    const exampleStart = fullText.indexOf(exampleMarker);
    const suggestedStart = fullText.indexOf(suggestedMarker);
    const avoidStart = fullText.indexOf(avoidMarker);

    const sliceOrEmpty = (start: number, end: number) => {
      if (start === -1 || start >= end) return "";
      return fullText.slice(start, end).trim();
    };

    const desc = (() => {
      if (descriptionStart === -1) return "";
      const bodyStart = descriptionStart + descriptionMarker.length;
      return sliceOrEmpty(bodyStart, exampleStart === -1 ? fullText.length : exampleStart);
    })();

    const exampleProjectIdeas = sliceOrEmpty(
      exampleStart === -1 ? -1 : exampleStart + exampleMarker.length,
      suggestedStart === -1 ? fullText.length : suggestedStart,
    );

    const suggestedTechStack = sliceOrEmpty(
      suggestedStart === -1 ? -1 : suggestedStart + suggestedMarker.length,
      avoidStart === -1 ? fullText.length : avoidStart,
    );

    const projectsToAvoid = sliceOrEmpty(
      avoidStart === -1 ? -1 : avoidStart + avoidMarker.length,
      fullText.length,
    );

    return {
      title,
      description: desc,
      exampleProjectIdeas,
      suggestedTechStack,
      projectsToAvoid,
    };
  }, [selectedTrackKey]);

  useEffect(() => {
    if (dialogOpen && selectedTrackKey) {
      setActiveTab("description");
    }
  }, [dialogOpen, selectedTrackKey]);

  const firstTabLabel = useMemo(() => {
    const title = selectedTrackParts.title;
    if (!title) return "Track";
    if (title.includes("DevTech")) return "DevTrack";
    if (title.includes("GreenTech")) return "GreenTrack";
    if (title.includes("CivicTech")) return "CivicTrack";
    if (title.includes("Web3")) return "Web3 Track";
    return title;
  }, [selectedTrackParts.title]);

  const trackAccent = selectedTrackKey ? TRACK_ACCENT_BY_KEY[selectedTrackKey] : "#392e4e";
  const trackAccentRgb = hexToRgb(trackAccent);
  const trackAccentRgba = `rgba(${trackAccentRgb.r}, ${trackAccentRgb.g}, ${trackAccentRgb.b}, 0.45)`;
  const trackAccentRgbaSoft = `rgba(${trackAccentRgb.r}, ${trackAccentRgb.g}, ${trackAccentRgb.b}, 0.22)`;

  return (
    <>
      <section
      style={{
        minHeight: "auto",
        backgroundColor: "#000",
        padding: "clamp(60px, 10vh, 120px) clamp(10px, 2vw, 40px) 0px",
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
          Tracks
        </h2>
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {tracksToRender.map((track, index) => (
            <Card
              key={index}
              className="bg-[#060010] border-[#392e4e] text-white overflow-hidden flex flex-col relative group"
              style={{
                minHeight: "clamp(240px, 28vh, 340px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "100%",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                borderColor: track.color + "40",
                cursor: isLive ? "pointer" : "default",
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
              onClick={() => {
                if (!isLive) return;
                setSelectedTrackKey(track.key);
                setDialogOpen(true);
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

              <CardContent className="relative z-20 flex flex-col items-center text-center p-8">
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
                  {track.cardDescription}
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

      <Dialog
        open={dialogOpen}
        onOpenChange={(next) => {
          setDialogOpen(next);
          if (!next) setSelectedTrackKey(null);
        }}
      >
        <DialogContent
          className="bg-[#0a0514] border-[#392e4e] text-white w-[86vw] max-w-4xl! max-h-[88vh]! overflow-hidden! rounded-2xl"
          style={{
            borderColor: trackAccentRgba,
            boxShadow: `0 0 0 1px ${trackAccentRgbaSoft}, 0 0 45px ${trackAccentRgbaSoft}`,
          }}
        >
          <DialogHeader
            className="mb-4 pb-4 border-b"
            style={{
              borderColor: trackAccentRgba,
            }}
          >
            <DialogTitle
              className="font-['Upheav'] text-3xl mb-1 tracking-wider text-white"
              style={{
                textShadow: `0 0 14px ${trackAccentRgbaSoft}`,
              }}
            >
              {selectedTrackTitle}
            </DialogTitle>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
            <TabsList
              className="w-full justify-start bg-[#060010] border border-[#392e4e] rounded-xl px-2 py-2 gap-2"
              style={{
                borderColor: trackAccentRgba,
                boxShadow: `inset 0 0 0 1px ${trackAccentRgbaSoft}`,
              }}
            >
              <TabsTrigger
                value="description"
                className="cursor-pointer text-white! text-sm! font-medium! tracking-wide! data-[state=active]:bg-[#0f0830]! data-[state=active]:text-white! flex-none whitespace-nowrap border border-transparent hover:border-[#392e4e] hover:bg-[#0f0830]/70 px-3 py-1.5 rounded-lg"
              >
                {firstTabLabel}
              </TabsTrigger>
              <TabsTrigger
                value="ideas"
                className="cursor-pointer text-white! text-sm! font-medium! tracking-wide! data-[state=active]:bg-[#0f0830]! data-[state=active]:text-white! flex-none whitespace-nowrap border border-transparent hover:border-[#392e4e] hover:bg-[#0f0830]/70 px-3 py-1.5 rounded-lg"
              >
                Example Project Ideas
              </TabsTrigger>
              <TabsTrigger
                value="stack"
                className="cursor-pointer text-white! text-sm! font-medium! tracking-wide! data-[state=active]:bg-[#0f0830]! data-[state=active]:text-white! flex-none whitespace-nowrap border border-transparent hover:border-[#392e4e] hover:bg-[#0f0830]/70 px-3 py-1.5 rounded-lg"
              >
                Suggested Tech Stack
              </TabsTrigger>
              <TabsTrigger
                value="avoid"
                className="cursor-pointer text-white! text-sm! font-medium! tracking-wide! data-[state=active]:bg-[#0f0830]! data-[state=active]:text-white! flex-none whitespace-nowrap border border-transparent hover:border-[#392e4e] hover:bg-[#0f0830]/70 px-3 py-1.5 rounded-lg"
              >
                Projects to Avoid
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 w-full max-h-[calc(88vh-220px)]! overflow-y-auto! pr-2">
              <AnimatePresence mode="wait">
                {activeTab === "description" && (
                  <motion.div
                    key="description"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                      }}
                    >
                      {selectedTrackParts.description}
                    </div>
                  </motion.div>
                )}

                {activeTab === "ideas" && (
                  <motion.div
                    key="ideas"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                      }}
                    >
                      {selectedTrackParts.exampleProjectIdeas}
                    </div>
                  </motion.div>
                )}

                {activeTab === "stack" && (
                  <motion.div
                    key="stack"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                      }}
                    >
                      {selectedTrackParts.suggestedTechStack}
                    </div>
                  </motion.div>
                )}

                {activeTab === "avoid" && (
                  <motion.div
                    key="avoid"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                  >
                    <div
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                      }}
                    >
                      {selectedTrackParts.projectsToAvoid}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
