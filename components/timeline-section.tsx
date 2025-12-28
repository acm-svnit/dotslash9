"use client";

export default function TimelineSection() {
  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundColor: "#000",
        padding:
          "clamp(80px, 10vh, 120px) clamp(10px, 2vw, 40px) clamp(20px, 4vh, 60px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}>
      <picture className="timeline-left-gif">
        <source media="(max-width: 639px)" srcSet="/space/planet2.gif" />
        <img
          src="/space/planet1.gif"
          alt="Planet"
          style={{
            position: "absolute",
            bottom: "10%",
            left: "0",
            transform: "translate(-30%, 0%)",
            width: "clamp(260px, 35vw, 520px)",
            height: "clamp(260px, 35vw, 520px)",
            objectFit: "contain",
            imageRendering: "pixelated",
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.7,
          }}
        />
      </picture>
      <img
        src="/space/planet2.gif"
        alt="Planet"
        style={{
          position: "absolute",
          bottom: "10%",
          right: "0",
          transform: "translate(30%, 0%)",
          width: "clamp(260px, 35vw, 520px)",
          height: "clamp(260px, 35vw, 520px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.7,
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          gap: "clamp(16px, 2vh, 24px)",
        }}>
        <h2
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(42px, 10vw, 110px)",
            color: "#fff",
            textShadow: "4px 4px 10px rgba(0, 0, 0, 0.7)",
          }}>
          Timeline
        </h2>
        <p
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            color: "rgba(75,85,255,0.95)",
            textShadow: "0 0 16px rgba(75,85,255,0.45)",
            letterSpacing: "0.04em",
          }}>
          Will be announced soon
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "clamp(15px, 2.6vw, 20px)",
            maxWidth: "640px",
            lineHeight: 1.6,
            fontFamily: "var(--font-sans)",
          }}>
          Stay tuned for the full schedule. We are preparing a stellar
          experience that aligns with our cosmic theme.
        </p>
      </div>
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
      <style>{`
        @media (max-width: 639px) {
          .timeline-left-gif {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
