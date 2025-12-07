"use client";

import React from "react";
import { Mail, Instagram, Linkedin, MapPin } from "lucide-react";

export default function ContactSection() {
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
        src="/gas2.gif"
        alt="Gas"
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          transform: "translate(-50%, 0%)",
          width: "clamp(700px, 90vw, 1600px)",
          height: "clamp(700px, 90vw, 1600px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.8,
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
          Contact Us
        </h2>
        
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(20px, 4vw, 40px)",
            marginBottom: "clamp(30px, 5vh, 60px)",
          }}>
          <div
            style={{
              backgroundColor: "#060010",
              border: "1px solid #392e4e",
              borderRadius: "12px",
              padding: "clamp(20px, 3vw, 30px)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
              <MapPin className="text-white" size={24} />
              <h3
                style={{
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "clamp(20px, 3vw, 28px)",
                  color: "#fff",
                }}>
                Address
              </h3>
            </div>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: "clamp(14px, 2vw, 18px)",
                lineHeight: "1.6",
                fontFamily: "var(--font-sans)",
                margin: 0,
              }}>
              Sardar Vallabhbhai National Institute of Technology<br />
              Ichchhanath, Surat<br />
              Gujarat 395007, India
            </p>
          </div>

          <div
            style={{
              backgroundColor: "#060010",
              border: "1px solid #392e4e",
              borderRadius: "12px",
              padding: "clamp(20px, 3vw, 30px)",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}>
            <h3
              style={{
                fontFamily: "Upheav, sans-serif",
                fontSize: "clamp(20px, 3vw, 28px)",
                color: "#fff",
                marginBottom: "8px",
              }}>
              Get in Touch
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href="mailto:contact@dotslash.in"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}>
                <Mail size={20} />
                <span>hackatdotslash@gmail.com</span>
              </a>
              <a
                href="https://www.instagram.com/acmnitsurat/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}>
                <Instagram size={20} />
                <span>acmnitsurat</span>
              </a>
              <a
                href="https://www.linkedin.com/company/acmnitsurat/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: "rgba(255, 255, 255, 0.7)",
                  textDecoration: "none",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  fontFamily: "var(--font-sans)",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)")}>
                <Linkedin size={20} />
                <span>acmnitsurat</span>
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: "1000px",
            height: "clamp(300px, 50vh, 500px)",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #392e4e",
          }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.629971364225!2d72.78262877506033!3d21.16711918051706!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04dec8b56fdf3%3A0x423b99085d26d1f9!2sSardar%20Vallabhbhai%20National%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1765125424543!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SVNIT Location Map"></iframe>
        </div>
      </div>
    </section>
  );
}

