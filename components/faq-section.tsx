"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is DOTSLASH 9.0?",
    answer: "DOTSLASH 9.0 is a 30-hour, in-person hackathon hosted at SVNIT's beautiful campus. It's organized entirely by SVNIT students and provides a unique opportunity for developers worldwide to come together and use their skills to create useful innovations for society.",
  },
  {
    question: "Who can participate?",
    answer: "DOTSLASH 9.0 is open to students, developers, designers, and innovators from all backgrounds. Whether you're a beginner or an experienced developer, you're welcome to join and contribute to building innovative solutions.",
  },
  {
    question: "Do I need a team to participate?",
    answer: "You can participate either individually or as a team. Teams typically consist of 2-4 members, but individual participants are also welcome. You can also form teams at the event if you're coming solo.",
  },
  {
    question: "What should I bring?",
    answer: "Bring your laptop, charger, and any other equipment you might need for development. We'll provide meals, snacks, and a comfortable working environment. Don't forget to bring your enthusiasm and creativity!",
  },
  {
    question: "What are the prizes?",
    answer: "DOTSLASH 9.0 offers exciting prizes for winners, including cash prizes, tech gadgets, and opportunities for mentorship and incubation. Specific prize details will be announced closer to the event date.",
  },
  {
    question: "Is there a registration fee?",
    answer: "Registration details and any associated fees will be announced on our official website and social media channels. Keep an eye out for updates regarding registration and participation costs.",
  },
  {
    question: "What technologies can I use?",
    answer: "You're free to use any technology stack, programming language, or framework you're comfortable with. The goal is to build innovative solutions, so choose the tools that best help you achieve that.",
  },
  {
    question: "Will there be mentors available?",
    answer: "Yes! We'll have experienced mentors from industry and academia available throughout the hackathon to help you with technical challenges, provide guidance, and support your project development.",
  },
  {
    question: "How will projects be judged?",
    answer: "Projects will be evaluated based on innovation, technical implementation, problem-solving approach, and potential impact. A panel of expert judges from industry and academia will review all submissions and select the winners.",
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
                className="border-[#392e4e] px-4 py-2"
                style={{
                  backgroundColor: "#060010",
                  borderRadius: "8px",
                  marginBottom: "12px",
                }}>
                <AccordionTrigger
                  className="text-white hover:text-[rgba(75,85,255,0.8)] transition-colors"
                  style={{
                    fontFamily: "Upheav, sans-serif",
                    fontSize: "clamp(18px, 3vw, 28px)",
                  }}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  className="text-white/70 pt-2"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "clamp(14px, 2vw, 18px)",
                    lineHeight: "1.6",
                  }}>
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

