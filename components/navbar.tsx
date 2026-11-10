"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { useGame } from "@/contexts/game-context";
import { Menu, X, ExternalLink } from "lucide-react";

interface NavbarProps {
  opacity?: number;
  isAnimating?: boolean;
}

export default function Navbar({
  opacity = 1,
  isAnimating = false,
}: NavbarProps) {
  const isMobile = useIsMobile();
  const { isGameActive } = useGame();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const drawerRef = useRef<HTMLElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile sidebar if game starts
  useEffect(() => {
    if (isGameActive && isOpen) {
      setIsOpen(false);
    }
  }, [isGameActive, isOpen]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close if pressed outside focus (outside drawer and toggle button)
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDownOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDownOutside);
    document.addEventListener("touchstart", handlePointerDownOutside);
    return () => {
      document.removeEventListener("mousedown", handlePointerDownOutside);
      document.removeEventListener("touchstart", handlePointerDownOutside);
    };
  }, [isOpen]);

  const handleTimelineClick = () => {
    if (pathname === "/timeline") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/timeline");
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    }
  };

  const handleTeamClick = () => {
    if (pathname === "/team") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/team");
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    }
  };

  const handleHomeClick = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setIsLoading(true);
      setTimeout(() => {
        router.push("/");
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
    }
  };

  const handleDownloadBrochure = () => {
    const link = document.createElement("a");
    link.href = "/Brochure_DotSlash_10.0.pdf";
    link.download = "Brochure_DotSlash_10.0.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    {
      name: "Home",
      onClick: handleHomeClick,
      isActive: pathname === "/",
      isExternal: false,
    },
    {
      name: "Brochure",
      onClick: handleDownloadBrochure,
      isActive: false,
      isExternal: false,
    },
    {
      name: "Timeline",
      onClick: handleTimelineClick,
      isActive: pathname === "/timeline",
      isExternal: false,
    },
    {
      name: "Team",
      onClick: handleTeamClick,
      isActive: pathname === "/team",
      isExternal: false,
    },
    {
      name: "ACM NIT Surat",
      onClick: () => {
        window.open("https://acmnitsurat.in", "_blank", "noopener,noreferrer");
      },
      isActive: false,
      isExternal: true,
    },
  ];

  return (
    <>
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9998,
          }}
        >
          <div
            style={{
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            Loading...
          </div>
          <div
            style={{
              width: "300px",
              height: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                transition: "width 0.3s ease",
              }}
            />
          </div>
          <div
            style={{
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: "12px",
              marginTop: "10px",
              opacity: 0.7,
            }}
          >
            100%
          </div>
        </div>
      )}

      {/* Desktop Floating Navbar (Screens >= 768px) */}
      <nav
        className="navbar-desktop"
        style={{
          position: "fixed",
          top: "clamp(15px, 2vh, 20px)",
          left: "50%",
          transform: isAnimating
            ? "translateX(-50%)"
            : "translateX(-50%) translateY(-20px)",
          zIndex: 1000,
          width: "auto",
          maxWidth: isMobile ? "95%" : "90%",
          opacity: opacity,
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          pointerEvents: opacity === 0 ? "none" : "auto",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(6, 0, 16, 0.8)",
            backdropFilter: "blur(10px)",
            border: "1px solid #392e4e",
            borderRadius: "0",
            padding: isMobile
              ? "clamp(4px, 0.8vw, 8px) clamp(8px, 1.5vw, 16px)"
              : "clamp(6px, 1vw, 10px) clamp(16px, 2.5vw, 30px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? "clamp(4px, 1vw, 8px)" : "clamp(12px, 1.8vw, 24px)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
            flexWrap: "nowrap",
          }}
        >
          <button
            className="navbar-button"
            onClick={handleHomeClick}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(75,85,255,0.5)",
              borderRadius: "0",
              padding: isMobile
                ? "clamp(4px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)"
                : "clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 20px)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: isMobile ? "10px" : "clamp(12px, 1.8vw, 16px)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              lineHeight: "1.2",
              width: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              minWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              maxWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.backgroundColor = "rgba(75,85,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.5)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Home
          </button>
          <button
            className="navbar-button"
            onClick={handleDownloadBrochure}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(75,85,255,0.5)",
              borderRadius: "0",
              padding: isMobile
                ? "clamp(4px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)"
                : "clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 20px)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: isMobile ? "10px" : "clamp(12px, 1.8vw, 16px)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              lineHeight: "1.2",
              width: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              minWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              maxWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.backgroundColor = "rgba(75,85,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.5)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Brochure
          </button>
          <button
            className="navbar-button"
            onClick={handleTimelineClick}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(75,85,255,0.5)",
              borderRadius: "0",
              padding: isMobile
                ? "clamp(4px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)"
                : "clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 20px)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: isMobile ? "10px" : "clamp(12px, 1.8vw, 16px)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              lineHeight: "1.2",
              width: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              minWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              maxWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.backgroundColor = "rgba(75,85,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.5)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Timeline
          </button>
          <button
            className="navbar-button"
            onClick={handleTeamClick}
            style={{
              backgroundColor: "transparent",
              border: "1px solid rgba(75,85,255,0.5)",
              borderRadius: "0",
              padding: isMobile
                ? "clamp(4px, 0.6vw, 6px) clamp(8px, 1.5vw, 12px)"
                : "clamp(6px, 0.8vw, 10px) clamp(14px, 2vw, 20px)",
              color: "#fff",
              fontFamily: "Upheav, sans-serif",
              fontSize: isMobile ? "10px" : "clamp(12px, 1.8vw, 16px)",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              lineHeight: "1.2",
              width: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              minWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
              maxWidth: isMobile
                ? "clamp(60px, 18vw, 80px)"
                : "clamp(80px, 12vw, 120px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
              e.currentTarget.style.backgroundColor = "rgba(75,85,255,0.1)";
              e.currentTarget.style.boxShadow = "0 0 20px rgba(75,85,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(75,85,255,0.5)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Team
          </button>
        </div>
      </nav>

      {/* Mobile Floating Menu Icon and Slide-over Sidebar (Screens < 768px) */}
      <div className="navbar-mobile-wrapper">
        {/* Floating Menu Icon on Top Left */}
        <button
          ref={toggleButtonRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          style={{
            position: "fixed",
            top: "clamp(15px, 2vh, 20px)",
            left: "clamp(15px, 2vw, 20px)",
            zIndex: 1001,
            width: "44px",
            height: "44px",
            backgroundColor: "rgba(6, 0, 16, 0.85)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(75, 85, 255, 0.6)",
            borderRadius: "0",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6), 0 0 12px rgba(75, 85, 255, 0.35)",
            opacity: isGameActive ? 0 : opacity,
            pointerEvents: isGameActive || opacity === 0 ? "none" : "auto",
            transform: isAnimating || opacity > 0 ? "translateY(0)" : "translateY(-15px)",
            transition: "opacity 0.4s ease-out, transform 0.4s ease-out, border-color 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(75, 85, 255, 0.9)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(75, 85, 255, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(75, 85, 255, 0.6)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.6), 0 0 12px rgba(75, 85, 255, 0.35)";
          }}
        >
          {isOpen ? <X size={22} strokeWidth={2.5} /> : <Menu size={22} strokeWidth={2.5} />}
        </button>

        {/* Backdrop Overlay (closes when clicked outside its focus) */}
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10001,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            opacity: isOpen ? 1 : 0,
            visibility: isOpen ? "visible" : "hidden",
            transition: "opacity 0.35s ease, visibility 0.35s ease",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        />

        {/* Sidebar Drawer Sliding from Left */}
        <aside
          ref={drawerRef}
          aria-hidden={!isOpen}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            width: "min(300px, 80vw)",
            height: "100dvh",
            zIndex: 10002,
            backgroundColor: "rgba(8, 2, 20, 0.98)",
            backdropFilter: "blur(16px)",
            borderRight: "1px solid rgba(75, 85, 255, 0.45)",
            boxShadow: "10px 0 35px rgba(0, 0, 0, 0.85), 2px 0 15px rgba(75, 85, 255, 0.25)",
            transform: isOpen ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            flexDirection: "column",
            padding: "24px 20px",
            boxSizing: "border-box",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            pointerEvents: isOpen ? "auto" : "none",
          }}
        >
          {/* Drawer Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>
              <div
                style={{
                  color: "#fff",
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "20px",
                  letterSpacing: "0.05em",
                  textShadow: "0 0 10px rgba(75, 85, 255, 0.7)",
                }}
              >
                DOTSLASH 10.0
              </div>
              <div
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "11px",
                  marginTop: "2px",
                }}
              >
                // NAVIGATION MENU
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation menu"
              style={{
                backgroundColor: "rgba(75, 85, 255, 0.1)",
                border: "1px solid rgba(75, 85, 255, 0.5)",
                borderRadius: "0",
                color: "#fff",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(75, 85, 255, 0.25)";
                e.currentTarget.style.borderColor = "rgba(75, 85, 255, 0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(75, 85, 255, 0.1)";
                e.currentTarget.style.borderColor = "rgba(75, 85, 255, 0.5)";
              }}
            >
              <X size={20} strokeWidth={2.5} />
            </button>
          </div>

          {/* Decorative Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(75, 85, 255, 0.6) 0%, rgba(75, 85, 255, 0.1) 100%)",
              margin: "18px 0 20px 0",
            }}
          />

          {/* Navigation Items (4 original + ACM NIT Surat) */}
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "100%",
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  item.onClick();
                }}
                className="navbar-button"
                style={{
                  backgroundColor: item.isActive
                    ? "rgba(75, 85, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.03)",
                  border: item.isActive
                    ? "1px solid rgba(75, 85, 255, 0.9)"
                    : "1px solid rgba(75, 85, 255, 0.4)",
                  borderRadius: "0",
                  padding: "12px 16px",
                  color: "#fff",
                  fontFamily: "Upheav, sans-serif",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  boxShadow: item.isActive
                    ? "0 0 15px rgba(75, 85, 255, 0.35)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(75, 85, 255, 0.9)";
                  e.currentTarget.style.backgroundColor = "rgba(75, 85, 255, 0.25)";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(75, 85, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = item.isActive
                    ? "rgba(75, 85, 255, 0.9)"
                    : "rgba(75, 85, 255, 0.4)";
                  e.currentTarget.style.backgroundColor = item.isActive
                    ? "rgba(75, 85, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.boxShadow = item.isActive
                    ? "0 0 15px rgba(75, 85, 255, 0.35)"
                    : "none";
                }}
              >
                <span>{item.name}</span>
                {item.isExternal ? (
                  <ExternalLink size={16} color="rgba(255, 255, 255, 0.7)" />
                ) : item.isActive ? (
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(75, 85, 255, 0.9)",
                    }}
                  >
                    ●
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            }}
          >
            <div
              style={{
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: "Upheav, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.05em",
              }}
            >
              ACM SVNIT CHAPTER
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.35)",
                fontFamily: "Upheav, sans-serif",
                fontSize: "10px",
                marginTop: "4px",
              }}
            >
              30 HOURS OF INNOVATION
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
