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
  instagram?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ansh Gupta",
    role: "Chairperson",
    image: "/team/2026/Ansh.webp",
    email: "mailto:anshgupta2706@gmail.com",
    linkedin: "https://www.linkedin.com/in/ansh-gupta-109504323/",
    github: "https://github.com/AnshGupta06",
  },
  {
    name: "Pratham Patadiya",
    role: "Vice-Chairperson",
    image: "/team/2026/Pratham.webp",
    email: "mailto:u24ai023@aid.svnit.ac.in",
    linkedin: "https://linkedin.com/in/pratham-patadiya",
    github: "https://github.com/Pratham722007",
  },
  {
    name: "Nidhi Arora",
    role: "Community Head",
    image: "/team/2026/Nidhi.webp",
    email: "mailto:nidhiarora2122@gmail.com",
    linkedin: "https://www.linkedin.com/in/nidhi-arora-",
    github: "https://github.com/NidhiArora21",
  },
  {
    name: "Priyansh T",
    role: "Secretary",
    image: "/team/2026/Priyansh.webp",
    email: "mailto:priyanshtolambiya@gmail.com",
    linkedin: "https://www.linkedin.com/in/priyansh-t-5095a7313",
    github: "https://github.com/PRIYANSHsvnit",
  },
  {
    name: "Arshad Khatib",
    role: "Secretary",
    image: "/team/2026/Arshad.webp",
    email: "mailto:arshadkhatib.2006@gmail.com",
    linkedin: "https://www.linkedin.com/in/arshadkhatib",
    github: "https://github.com/Arshad-13",
    twitter: "https://x.com/rationalist_13",
  },
  {
    name: "Rudraksh Fanse",
    role: "Treasurer",
    image: "/team/2026/Rudraksh.webp",
    email: "mailto:rudrakshfanse08@gmail.com",
    linkedin: "https://www.linkedin.com/in/rudraksh-fanse/",
    github: "https://github.com/rrrr08",
  },
  {
    name: "Hatim Kutarwadliwala",
    role: "Treasurer",
    image: "/team/2026/Hatim.webp",
    email: "mailto:hatimkutarwadliwala@gmail.com",
    linkedin: "https://www.linkedin.com/in/hatim-kutarwadli-98098a194",
    github: "https://github.com/Hatimkutarwadli",
  },
  {
    name: "Aayush Prasad",
    role: "Developer",
    image: "/team/2026/Aayush.webp",
    email: "mailto:dev.aayushdroid@gmail.com",
    linkedin: "https://linkedin.com/in/aayush-droid",
    github: "https://github.com/aayush-decoder",
  },
  {
    name: "Siddharth Sheth",
    role: "Developer",
    image: "/team/2026/Siddharth.webp",
    email: "mailto:shsheth2006@gmail.com",
    linkedin: "https://www.linkedin.com/in/siddharth-sheth-007873319",
    github: "https://github.com/siddharth251206",
  },
  {
    name: "Kartikeya Aryam",
    role: "Problem Setter",
    image: "/team/2026/Kartikeya.webp",
    email: "mailto:kartikeyaaryam7@gmail.com",
    linkedin: "https://www.linkedin.com/in/kartikeya-aryam",
    github: "https://github.com/F0RREALTHO",
  },
  {
    name: "Paida Raja Rathan",
    role: "Problem Setter",
    image: "/team/2026/Rathan.webp",
    email: "mailto:paidarajarathan@gmail.com",
    linkedin: "https://www.linkedin.com/in/paida-raja-rathan/",
    github: "https://github.com/RathanPaida",
    twitter: "https://x.com/RathanPaida",
  },
  {
    name: "Nihar Mehta",
    role: "Problem Setter",
    image: "/team/2026/Nihar.webp",
    email: "mailto:nkmehta2162@gmail.com",
    linkedin: "https://www.linkedin.com/in/nihar-mehta-70a820313",
    github: "https://github.com/nkmehta216",
  },
  {
    name: "Pal Thakkar",
    role: "Designer",
    image: "/team/2026/Pal.webp",
    email: "mailto:palthakkar24@gmail.com",
    linkedin: "https://www.linkedin.com/in/pal-thakkar-b56181326/",
    github: "https://github.com/PalThakkar",
  },
  {
    name: "Naina Jain",
    role: "Designer",
    image: "/team/2026/Naina.webp",
    email: "mailto:jainnaina1502@gmail.com",
    linkedin: "https://www.linkedin.com/in/naina-jain-777811331/",
    github: "https://github.com/NainaJain-AI",
  },
  {
    name: "Mayank Behera",
    role: "Social Media Manager",
    image: "/team/2026/Mayank.webp",
    email: "mailto:mayankbehera171@gmail.com",
    linkedin: "https://www.linkedin.com/in/mayank-behera",
    github: "https://github.com/vegito19",
  },
  {
    name: "Sarath Chaitanya",
    role: "Core Member",
    image: "/team/2026/Sarath.webp",
    email: "mailto:yschaitanya9999@gmail.com",
    linkedin: "https://www.linkedin.com/in/ysc9999/",
    github: "https://github.com/YSC9999",
  },
  {
    name: "Manav Dhamecha",
    role: "Core Member",
    image: "/team/2026/Manav.webp",
    email: "mailto:manavdhamecha1@gmail.com",
    linkedin: "https://linkedin.com/in/manavdhamecha",
    github: "https://github.com/manavdhamecha77",
  },
  {
    name: "Rushang Bagada",
    role: "Core Member",
    image: "/team/2026/Rushang.webp",
    email: "mailto:rushang697@gmail.com",
    linkedin: "https://www.linkedin.com/in/rushang-bagada-4b3218317/",
    github: "https://github.com/rushangbagada",
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
        src="/space/planet7.gif"
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
        src="/space/planet8.gif"
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
