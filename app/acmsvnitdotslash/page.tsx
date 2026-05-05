"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { DOTSLASH_GLOBAL_DIALOG_TEXT } from "@/lib/tracks-content";

export default function AcmsvnitDotslashPage() {
  const [active, setActive] = useState(false);

  const pdfHref = "/acmsvnitdotslash/problem-statements.pdf";
  const STORAGE_KEY = "dotslash_problem_statements_activated";
  const ACTIVATION_CHANGED_EVENT = "dotslash_problem_statements_activation_changed";

  // Initialize from localStorage (no backend required).
  useEffect(() => {
    try {
      setActive(localStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      // ignore
    }
  }, []);

  // Persist toggle state to localStorage so the home page can react.
  useEffect(() => {
    try {
      if (active) localStorage.setItem(STORAGE_KEY, "true");
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }

    // Notify same-tab listeners immediately (storage event doesn't fire in the same tab).
    try {
      window.dispatchEvent(new Event(ACTIVATION_CHANGED_EVENT));
    } catch {
      // ignore
    }
  }, [active]);

  return (
    <main
      style={{
        position: "relative",
        width: "100%",
        overflowX: "hidden",
        backgroundColor: "#000",
        minHeight: "100vh",
        paddingBottom: "60px",
      }}
    >
      <Navbar />

      <section
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "clamp(90px, 10vh, 140px) clamp(14px, 3vw, 28px) 40px",
          boxSizing: "border-box",
        }}
      >
        <header style={{ marginBottom: 28, textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "Upheav, sans-serif",
              color: "#fff",
              fontSize: "clamp(34px, 5vw, 60px)",
              margin: 0,
              textShadow: "4px 4px 10px rgba(0,0,0,0.7)",
            }}
          >
            ACMSVIT DotSlash
          </h1>
          <p
            style={{
              margin: "12px auto 0",
              maxWidth: 720,
              color: "rgba(255,255,255,0.78)",
              fontFamily: "var(--font-sans)",
              lineHeight: 1.6,
              fontSize: "clamp(14px, 2.2vw, 18px)",
            }}
          >
            Activate to view the problem statements and download/read the PDF. (Tracks appear on the home page.)
          </p>
        </header>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 26 }}>
          <button
            type="button"
            onClick={() => setActive((v) => !v)}
            style={{
              padding: "12px 20px",
              borderRadius: 999,
              backgroundColor: active ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(75,85,255,0.55)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "transform 0.12s ease, background-color 0.2s ease",
              boxShadow: "0 0 30px rgba(75,85,255,0.10)",
            }}
          >
            {active ? "Hide Problem Statements" : "Activate Problem Statements"}
          </button>
        </div>

        {active && (
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 18,
              marginBottom: 34,
            }}
          >
            <div
              style={{
                border: "1px solid rgba(75,85,255,0.35)",
                borderRadius: 12,
                backgroundColor: "rgba(6, 0, 16, 0.55)",
                padding: 16,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontFamily: "Upheav, sans-serif",
                  color: "#fff",
                  marginBottom: 10,
                  fontSize: 18,
                  letterSpacing: "0.04em",
                }}
              >
                Problem Statements
              </div>

              <div
                style={{
                  maxHeight: 360,
                  overflow: "auto",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  lineHeight: 1.55,
                  whiteSpace: "pre-wrap",
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: "rgba(0,0,0,0.25)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {DOTSLASH_GLOBAL_DIALOG_TEXT}
              </div>
            </div>

            <div
              style={{
                border: "1px solid rgba(75,85,255,0.35)",
                borderRadius: 12,
                backgroundColor: "rgba(6, 0, 16, 0.55)",
                padding: 16,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  fontFamily: "Upheav, sans-serif",
                  color: "#fff",
                  marginBottom: 10,
                  fontSize: 18,
                  letterSpacing: "0.04em",
                }}
              >
                PDF (Problem Statements)
              </div>

              <div style={{ marginBottom: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
                <a
                  href={pdfHref}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "rgba(165, 180, 252, 1)",
                    fontFamily: "Upheav, sans-serif",
                    textDecoration: "none",
                    border: "1px solid rgba(75,85,255,0.5)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    boxShadow: "0 0 20px rgba(75,85,255,0.08)",
                  }}
                >
                  Open PDF
                </a>
                <a
                  href={pdfHref}
                  download
                  style={{
                    color: "#fff",
                    fontFamily: "Upheav, sans-serif",
                    textDecoration: "none",
                    border: "1px solid rgba(255,255,255,0.22)",
                    borderRadius: 10,
                    padding: "10px 14px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                  }}
                >
                  Download
                </a>
              </div>

              <div
                style={{
                  width: "100%",
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  backgroundColor: "#000",
                }}
              >
                <iframe
                  src={pdfHref}
                  title="Problem Statements PDF"
                  style={{
                    width: "100%",
                    height: 520,
                    border: 0,
                  }}
                />
              </div>
            </div>
          </section>
        )}

        <div style={{ height: 40 }} />
      </section>
    </main>
  );
}

