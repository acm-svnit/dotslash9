"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is DOTSLASH 9.0?",
    answer:
      "DOTSLASH 9.0 is a 30-hour, in-person hackathon hosted at SVNIT's beautiful campus. It's organized entirely by SVNIT students and provides a unique opportunity for developers worldwide to come together and use their skills to create useful innovations for society.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    question: "Who can participate?",
    answer:
      "DOTSLASH 9.0 is open to students, developers, designers, and innovators from all backgrounds. Whether you're a beginner or an experienced developer, you're welcome to join and contribute to building innovative solutions.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    question: "Do I need a team to participate?",
    answer:
      "You can participate either individually or as a team. Teams typically consist of 2-4 members, but individual participants are also welcome. You can also form teams at the event if you're coming solo.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    question: "What should I bring?",
    answer:
      "Bring your laptop, charger, and any other equipment you might need for development. We'll provide meals, snacks, and a comfortable working environment. Don't forget to bring your enthusiasm and creativity!",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    question: "What are the prizes?",
    answer:
      "DOTSLASH 9.0 offers exciting prizes for winners, including cash prizes, tech gadgets, and opportunities for mentorship and incubation. Specific prize details will be announced closer to the event date.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    question: "Is there a registration fee?",
    answer:
      "Registration details and any associated fees will be announced on our official website and social media channels. Keep an eye out for updates regarding registration and participation costs.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    question: "What technologies can I use?",
    answer:
      "You're free to use any technology stack, programming language, or framework you're comfortable with. The goal is to build innovative solutions, so choose the tools that best help you achieve that.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    question: "Will there be mentors available?",
    answer:
      "Yes! We'll have experienced mentors from industry and academia available throughout the hackathon to help you with technical challenges, provide guidance, and support your project development.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
  {
    question: "How will projects be judged?",
    answer:
      "Projects will be evaluated based on innovation, technical implementation, problem-solving approach, and potential impact. A panel of expert judges from industry and academia will review all submissions and select the winners.",
    color: "#4B55FF",
    gradient:
      "linear-gradient(135deg, rgba(75,85,255,0.15) 0%, rgba(75,85,255,0.05) 100%)",
  },
];

export default function FAQSection() {
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
        src="/gas1.gif"
        alt="Gas"
        style={{
          position: "absolute",
          top: "15%",
          left: "0",
          transform: "translate(-30%, -50%)",
          width: "clamp(400px, 50vw, 800px)",
          height: "clamp(400px, 50vw, 800px)",
          objectFit: "contain",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <img
        src="/planet4.gif"
        alt="Planet"
        style={{
          position: "absolute",
          bottom: "0",
          right: "0",
          transform: "translate(30%, 30%)",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
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
          FAQ
        </h2>
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
          }}>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-[#392e4e] px-4 py-2 group relative overflow-hidden"
                style={{
                  backgroundColor: "#060010",
                  borderRadius: "0",
                  marginBottom: "16px",
                  borderColor: faq.color + "40",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = faq.color;
                  e.currentTarget.style.transform = "translateX(8px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px ${faq.color}40, 0 0 20px ${faq.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = faq.color + "40";
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Animated background gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: faq.gradient,
                  }}
                />
                
                {/* Animated border glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(circle at left center, ${faq.color}20 0%, transparent 70%)`,
                    filter: "blur(15px)",
                  }}
                />
                
                {/* Left accent line */}
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: "4px",
                    backgroundColor: faq.color,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  className="group-hover:opacity-100"
                />
                
                {/* Corner accents */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "20px",
                    height: "20px",
                    borderTop: `2px solid ${faq.color}`,
                    borderLeft: `2px solid ${faq.color}`,
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
                    width: "20px",
                    height: "20px",
                    borderTop: `2px solid ${faq.color}`,
                    borderRight: `2px solid ${faq.color}`,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                  className="group-hover:opacity-100"
                />
                
                <AccordionTrigger
                  className="text-white transition-all duration-300 relative z-10"
                  style={{
                    fontFamily: "Upheav, sans-serif",
                    fontSize: "clamp(18px, 3vw, 28px)",
                    textShadow: `0 0 10px ${faq.color}00`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = faq.color;
                    e.currentTarget.style.textShadow = `0 0 15px ${faq.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.textShadow = `0 0 10px ${faq.color}00`;
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "8px",
                        backgroundColor: faq.color,
                        transition: "all 0.3s ease",
                      }}
                      className="group-hover:scale-150 group-hover:rotate-45"
                    />
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className="text-white/70 pt-4 relative z-10"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(14px, 2vw, 18px)",
                    lineHeight: "1.6",
                    paddingLeft: "20px",
                    borderLeft: `2px solid ${faq.color}40`,
                    transition: "border-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = faq.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = faq.color + "40";
                  }}
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
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
    </section>
  );
}
