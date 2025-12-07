"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  email?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Smit Marakna",
    role: "Chairperson",
    image: "/smit.jpg",
    email: "mailto:smitmarakna1709@gmail.com",
    linkedin: "https://www.linkedin.com/in/smit-marakna-185456291",
    github: "https://github.com/smitmarakna/",
  },
  {
    name: "Chetan Kalsariya",
    role: "Vice-Chairperson",
    image: "/chetan.jpg",
    email: "mailto:chetan.v.kalsariya@gmail.com",
    linkedin: "https://www.linkedin.com/in/chetan-kalsariya",
    github: "https://github.com/lost-alchemistt",
  },
  {
    name: "Jay Pipaliya",
    role: "Secretary",
    image: "/jay.jpg",
    email: "mailto:jaypipaliya0101@gmail.com",
    linkedin: "https://www.linkedin.com/in/jay-pipaliya-117369326",
    github: "https://github.com/jayp927",
  },
  {
    name: "Archit Savaliya",
    role: "Secretary",
    image: "/archit.jpg",
    email: "mailto:architsavaliya175@gmail.com",
    linkedin: "https://www.linkedin.com/in/architsavaliya",
    github: "https://github.com/Archit-175",
  },
  {
    name: "Dhruv Patel",
    role: "Treasurer",
    image: "/dhruv.jpg",
    email: "mailto:dhruvap2005@gmail.com",
    linkedin: "https://www.linkedin.com/in/dhruv-patel-15a9082a9/",
    github: "https://github.com/Cosmic717",
  },
  {
    name: "Anand Tiwari",
    role: "Treasurer",
    image: "/anand.jpg",
    email: "mailto:anandgtiwari2005@gmail.com",
    linkedin: "https://www.linkedin.com/in/anand-tiwari-271078235/",
    github: "https://github.com/Anand-Tiwari2404",
  },
  {
    name: "Foram Gandhi",
    role: "Community Head",
    image: "/foram.jpg",
    email: "mailto:gandhiforam91@gmail.com",
    linkedin: "https://www.linkedin.com/in/foram-gandhi-85a045326",
  },
  {
    name: "Miten Gandhi",
    role: "Developer",
    image: "/miten.jpg",
    email: "mailto:mjgandhi2305@gmail.com",
    linkedin: "https://www.linkedin.com/in/miten-j-gandhi",
    github: "https://github.com/mjgandhi2305",
  },
  {
    name: "Purv Kabaria",
    role: "Developer",
    image: "/purv.jpg",
    email: "mailto:purvkabaria@gmail.com",
    linkedin: "https://www.linkedin.com/in/purv-kabaria/",
    github: "https://github.com/Purv-Kabaria",
    twitter: "https://x.com/purvdev",
  },
  {
    name: "Om Satodiya",
    role: "Developer",
    image: "/om.jpg",
    email: "mailto:omsatodiya96@gmail.com",
    linkedin: "https://www.linkedin.com/in/om-satodiya9609",
    github: "https://github.com/omsatodiya",
  },
  {
    name: "Vanshik Godeshwar",
    role: "Problem Setter",
    image: "/vanshik.jpg",
    email: "mailto:vanshikgodeshwar@gmail.com",
    linkedin: "https://www.linkedin.com/in/vanshikgodeshwar/",
    github: "https://github.com/vanshik79godeshwar",
  },
  {
    name: "Deepak Challa",
    role: "Problem Setter",
    image: "/deepak.jpg",
    email: "mailto:challadeepaksai55@gmail.com",
    linkedin: "https://www.linkedin.com/in/deepak-sai-challa-7a2240331",
  },
  {
    name: "Anshul Reddy",
    role: "Problem Setter",
    image: "/anshul.jpg",
    email: "mailto:kanshulreddy93@gmail.com",
    linkedin: "https://www.linkedin.com/in/anshul-reddy-kotha/",
  },
  {
    name: "Angela Dutta",
    role: "Designer",
    image: "/angela.jpg",
    email: "mailto:duttaangela28@gmail.com",
    linkedin: "https://www.linkedin.com/in/angela-dutta/",
    github: "https://github.com/ang-dutta",
  },
  {
    name: "Vanishka Karkera",
    role: "Designer",
    image: "/vanishka.jpg",
    email: "mailto:vanishka.sk@gmail.com",
    linkedin: "https://www.linkedin.com/in/vanishka-k-853593287/",
  },
  {
    name: "Harshil Andhariya",
    role: "Core Member",
    image: "/harshil.jpg",
    email: "mailto:harshilandhariya.2507@gmail.com",
    linkedin: "https://www.linkedin.com/in/harshilpf2507",
    github: "https://github.com/harshil-2507",
  },
  {
    name: "Manthan Chauhan",
    role: "Core Member",
    image: "/manthan.jpg",
    email: "mailto:manthansvnit9868@gmail.com",
    linkedin: "https://www.linkedin.com/in/manthan-chauhan-373a5a2a8/",
  },
  {
    name: "Govind",
    role: "Core Member",
    image: "/govind.jpg",
    email: "mailto:realgovindkrishna@gmail.com",
    linkedin: "https://www.linkedin.com/in/govindkrishna2005",
    github: "https://github.com/govind2005",
  },
];

export default function TeamSection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="team"
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
      }}
    >
      <img
        src="/planet7.gif"
        alt="Planet"
        style={{
          position: "absolute",
          top: "10%",
          left: "0",
          transform: "translate(-30%, -50%)",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(300px, 40vw, 600px)",
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
        style={{
          position: "absolute",
          bottom: "10%",
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
          maxWidth: "1400px",
          margin: "0 auto",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(40px, 10vw, 100px)",
            color: "#fff",
            textAlign: "center",
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
            marginBottom: "clamp(40px, 6vh, 80px)",
          }}
        >
          Our Team
        </h2>
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(4, 1fr)",
            gap: "clamp(20px, 3vw, 40px)",
            padding: "clamp(10px, 2vw, 20px)",
          }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "rgba(6, 0, 16, 0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid #392e4e",
                borderRadius: "16px",
                padding: "clamp(20px, 3vw, 30px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(75,85,255,0.5)";
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#392e4e";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(circle at center, rgba(75,85,255,0.1) 0%, transparent 70%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  pointerEvents: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0";
                }}
              />
              <div
                style={{
                  width: "clamp(120px, 15vw, 180px)",
                  height: "clamp(120px, 15vw, 180px)",
                  borderRadius: "50%",
                  overflow: "hidden",
                  marginBottom: "clamp(15px, 2vh, 20px)",
                  border: "3px solid rgba(75,85,255,0.3)",
                  position: "relative",
                  zIndex: 1,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(75,85,255,0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(75,85,255,0.3)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <h3
                style={{
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "clamp(18px, 2.5vw, 24px)",
                  color: "#fff",
                  marginBottom: "clamp(6px, 0.8vh, 10px)",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {member.name}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  color: "rgba(75,85,255,0.9)",
                  marginBottom: "clamp(12px, 1.5vh, 18px)",
                  textAlign: "center",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {member.role}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "clamp(8px, 1.2vw, 12px)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {member.email && (
                  <a
                    href={member.email}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(75,85,255,0.9)";
                      e.currentTarget.style.transform = "scale(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Mail size={20} />
                  </a>
                )}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(75,85,255,0.9)";
                      e.currentTarget.style.transform = "scale(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(75,85,255,0.9)";
                      e.currentTarget.style.transform = "scale(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Github size={20} />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "rgba(75,85,255,0.9)";
                      e.currentTarget.style.transform = "scale(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.7)";
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            </div>
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
