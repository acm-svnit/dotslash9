"use client";

import { motion } from "framer-motion";

const alphaSponsor = {
  name: "Devfolio",
  logo: "/sponsors/devfolio.png",
  url: "https://devfolio.co",
};

export default function AlphaSponsorSection() {
  return (
    <section
      style={{
        minHeight: "auto",
        backgroundColor: "#000",
        padding: "clamp(40px, 8vh, 100px) clamp(10px, 2vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "10%",
          width: "300px",
          height: "300px",
          background:
            "radial-gradient(circle, rgba(75,85,255,0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(40px, 10vw, 90px)",
            color: "#fff",
            textAlign: "center",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
            marginBottom: "clamp(40px, 6vh, 80px)",
          }}
        >
          Alpha Sponsor
        </motion.h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.a
            href={alphaSponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -10 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: "rgba(6, 0, 16, 0.8)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(75,85,255,0.3)",
              padding: "40px",
              width: "100%",
              maxWidth: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              cursor: "pointer",
              position: "relative",
              overflow: "hidden",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.boxShadow =
                "0 0 30px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.3)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              className="absolute top-0 right-0 w-8 h-8 opacity-20 pointer-events-none"
              style={{
                borderTop: "2px solid #4B55FF",
                borderRight: "2px solid #4B55FF",
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-8 h-8 opacity-20 pointer-events-none"
              style={{
                borderBottom: "2px solid #4B55FF",
                borderLeft: "2px solid #4B55FF",
              }}
            />
            <img
              src={alphaSponsor.logo}
              alt="Devfolio"
              style={{
                width: "100%",
                height: "160px",
                objectFit: "contain",
                filter: "drop-shadow(0 0 10px rgba(75,85,255,0.2))",
              }}
            />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
