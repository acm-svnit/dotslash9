"use client";

import React from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const cardData = [
  {
    logo: "/svnit.png",
    title: "SVNIT",
    paragraph: "Sardar Vallabhbhai National Institute of Technology, Surat is a leading technical Institute not only at national level but also at International level for imparting training to students as per the needs of technology. It is also envisaged to provide the necessary infrastructure to take up research work and to provide the mechanism to interact with industries effectively.",
  },
  {
    logo: "/ashine.png",
    title: "ASHINE",
    paragraph: "ASHINE is a Technology Business Incubator located at the centre of Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat spread across 250 acres of lush-green campus having all the modern educational and recreational facilities for students. With an infrastructure that can support 30+ tech and non-tech startups and 200 startup enthusiasts from across the nation.",
  },
  {
    logo: "/acm.png",
    title: "ACM",
    paragraph: "ACM NIT Surat is a student chapter highly focused on planning and organizing events for coding, development, design etc. Founded in 2005, the chapter has been a centre for various learning, fun, and productive activities. Be it coding challenges, hackathons, quizzes, or application development, the activities of the chapter are widely acknowledged in the institute and keenly looked for.",
  },
];

export default function AboutSection() {
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
          About DOTSLASH
        </h2>
        <div className="relative w-full max-w-4xl mb-12">
          <img
            src="/planet1.gif"
            alt="Planet"
            className="planet-left-top"
            style={{
              position: "absolute",
              left: "0",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(100px, 15vw, 250px)",
              height: "clamp(100px, 15vw, 250px)",
              objectFit: "contain",
              imageRendering: "pixelated",
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.6,
            }}
          />
          <img
            src="/planet6.gif"
            alt="Planet"
            className="planet-right-bottom"
            style={{
              position: "absolute",
              right: "0",
              top: "50%",
              transform: "translate(50%, -50%)",
              width: "clamp(100px, 15vw, 250px)",
              height: "clamp(100px, 15vw, 250px)",
              objectFit: "contain",
              imageRendering: "pixelated",
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.6,
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full relative z-10">
            {cardData.map((card, index) => (
              <Card
                key={index}
                className="bg-[#060010] border-[#392e4e] text-white hover:border-[rgba(75,85,255,0.8)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(75,85,255,0.5)] overflow-hidden flex flex-col relative group p-4"
              >
                <div className="absolute inset-0 bg-linear-to-br from-[rgba(75,85,255,0.1)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />
                <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0" style={{ background: 'radial-gradient(circle at center, rgba(75,85,255,0.15) 0%, transparent 70%)' }} />
                <div className="relative z-20 flex flex-col items-center text-center">
                  <div className="mb-2 flex items-center justify-center h-12">
                    <img
                      src={card.logo}
                      alt={`Logo ${index + 1}`}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2 relative z-20">
                    {card.title}
                  </h3>
                  <CardContent className="p-0 relative z-20">
                    <p className="text-white/70 text-xs leading-tight" style={{ fontFamily: 'var(--font-sans)' }}>
                      {card.paragraph}
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <div className="w-full max-w-4xl text-center">
          <h3
            style={{
              fontFamily: "Upheav, sans-serif",
              fontSize: "clamp(28px, 6vw, 60px)",
              color: "#fff",
              textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
              marginBottom: "clamp(1px, 0.2vh, 3px)",
            }}>
            DOTSLASH 9.0
          </h3>
          <h4
            style={{
              fontFamily: "Upheav, sans-serif",
              fontSize: "clamp(22px, 5vw, 45px)",
              color: "rgba(255, 255, 255, 1)",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
              marginBottom: "clamp(8px, 1.5vh, 15px)",
            }}>
            Hackathon
          </h4>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "clamp(14px, 2vw, 18px)",
              lineHeight: "1.2",
              maxWidth: "800px",
              margin: "0 auto",
              }}
              className="text-white/70 text-xs leading-tight font-sans">
            DotSlash 9.0 is a 30-hour, in-person hackathon hosted at SVNIT's beautiful campus. It's organized entirely by SVNIT students and provides a unique opportunity for developers worldwide to come together and use their skills to create useful innovations for society.
          </p>
        </div>
        <div className="w-full max-w-5xl mb-12 px-4 mt-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full">
            <CarouselContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <CarouselItem key={num}>
                  <div className="relative w-full rounded-lg overflow-hidden" style={{ height: "clamp(250px, 40vh, 500px)" }}>
                    <img
                      src={`/past${num}.jpg`}
                      alt={`DOTSLASH Event ${num}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/past${num}.JPG`;
                      }}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-[#060010] border-[#392e4e] text-white hover:bg-white hover:text-black hover:border-white left-0 md:left-4 transition-colors" />
            <CarouselNext className="bg-[#060010] border-[#392e4e] text-white hover:bg-white hover:text-black hover:border-white right-0 md:right-4 transition-colors" />
          </Carousel>
        </div>
        <div className="w-full max-w-5xl mt-12 mb-12 relative">
          <img
            src="/star2.gif"
            alt="Star"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "clamp(800px, 120vw, 2000px)",
              height: "clamp(800px, 120vw, 2000px)",
              objectFit: "contain",
              imageRendering: "pixelated",
              pointerEvents: "none",
              zIndex: 0,
              opacity: 0.6,
            }}
          />
          <h3
            style={{
              fontFamily: "Upheav, sans-serif",
              fontSize: "clamp(28px, 6vw, 60px)",
              color: "#fff",
              textAlign: "center",
              textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
              marginBottom: "clamp(30px, 5vh, 60px)",
              position: "relative",
              zIndex: 10,
            }}>
            Prizes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
            <div
              style={{
                backgroundColor: "#060010",
                border: "1px solid #392e4e",
                borderRadius: "12px",
                padding: "clamp(20px, 3vw, 30px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(75,85,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#392e4e";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <img
                src="/1.png"
                alt="1st Place"
                style={{
                  width: "clamp(80px, 15vw, 150px)",
                  height: "clamp(80px, 15vw, 150px)",
                  objectFit: "contain",
                  marginBottom: "16px",
                }}
              />
              <h4
                style={{
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "clamp(20px, 3vw, 32px)",
                  color: "#fff",
                  marginBottom: "8px",
                }}>
                1st Place
              </h4>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "clamp(16px, 2.5vw, 24px)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "600",
                }}>
                ₹50,000
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
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(75,85,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#392e4e";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <img
                src="/2.png"
                alt="2nd Place"
                style={{
                  width: "clamp(80px, 15vw, 150px)",
                  height: "clamp(80px, 15vw, 150px)",
                  objectFit: "contain",
                  marginBottom: "16px",
                }}
              />
              <h4
                style={{
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "clamp(20px, 3vw, 32px)",
                  color: "#fff",
                  marginBottom: "8px",
                }}>
                2nd Place
              </h4>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "clamp(16px, 2.5vw, 24px)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "600",
                }}>
                ₹30,000
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
                alignItems: "center",
                textAlign: "center",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(75,85,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#392e4e";
                e.currentTarget.style.boxShadow = "none";
              }}>
              <img
                src="/3.png"
                alt="3rd Place"
                style={{
                  width: "clamp(80px, 15vw, 150px)",
                  height: "clamp(80px, 15vw, 150px)",
                  objectFit: "contain",
                  marginBottom: "16px",
                }}
              />
              <h4
                style={{
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "clamp(20px, 3vw, 32px)",
                  color: "#fff",
                  marginBottom: "8px",
                }}>
                3rd Place
              </h4>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "clamp(16px, 2.5vw, 24px)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: "600",
                }}>
                ₹20,000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

