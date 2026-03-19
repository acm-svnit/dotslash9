"use client";

import { useEffect, useMemo, useState } from "react";
import { getHackathonWindowUtcMs } from "@/lib/hackathon-schedule";

function formatHhMmSs(totalSeconds: number) {
  const safe = Math.max(0, totalSeconds);
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Timer() {
  const [nowMs, setNowMs] = useState<number | null>(null);

  const schedule = useMemo(() => {
    const { startUtcMs, endUtcMs } = getHackathonWindowUtcMs();
    return { startUtcMs, endUtcMs };
  }, []);

  useEffect(() => {
    const tick = () => setNowMs(Date.now());
    tick();

    const id = window.setInterval(() => {
      tick();
    }, 250);

    return () => window.clearInterval(id);
  }, []);

  if (nowMs === null) return null;
  if (nowMs < schedule.startUtcMs) return null;
  if (nowMs > schedule.endUtcMs) return null;

  const remainingMs = schedule.endUtcMs - nowMs;
  const remainingSeconds = Math.floor(remainingMs / 1000);
  const display = formatHhMmSs(remainingSeconds);
  const isWarning = remainingSeconds <= 3600;
  const warningColor = "#ef4444";
  const defaultColor = "#ffffff";
  const countColor = isWarning ? warningColor : defaultColor;
  const countShadow = isWarning
    ? "0 0 12px rgba(239, 68, 68, 0.55)"
    : "0 0 12px rgba(75,85,255,0.35)";
  const borderColor = isWarning
    ? "rgba(239,68,68,0.35)"
    : "rgba(75,85,255,0.25)";

  return (
    <section
      style={{
        backgroundColor: "#000",
        height: "100vh",
        minHeight: "100vh",
        width: "100%",
        padding: "clamp(16px, 4vw, 40px) clamp(14px, 3vw, 34px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(18px, 3vw, 34px)",
            color: countColor,
            textShadow: countShadow,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: 0,
            lineHeight: 1.2,
          }}
        >
          Hackathon Time Remaining
        </div>
        <div
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(54px, 8.5vw, 150px)",
            color: countColor,
            textShadow: countShadow,
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          {display}
        </div>
      </div>
    </section>
  );
}
