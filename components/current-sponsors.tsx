"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ReactMarkdown from "react-markdown";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface Sponsor {
    name: string;
    logo: string;
    description: string;
    tier: "Title" | "Gold" | "Silver" | "Bronze" | "In-Kind";
}

const currentSponsors: Sponsor[] = [];

export default function CurrentSponsors() {
    const isMobile = useIsMobile();

    return (
        <section
            id="sponsors"
            style={{
                minHeight: "auto",
                backgroundColor: "#000",
                padding: "0px clamp(10px, 2vw, 40px) clamp(40px, 8vh, 100px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
                boxSizing: "border-box",
            }}
        >
            {/* Background Decor */}
            <div
                style={{
                    position: "absolute",
                    top: "10%",
                    right: "10%",
                    width: "300px",
                    height: "300px",
                    background: "radial-gradient(circle, rgba(75,85,255,0.1) 0%, transparent 70%)",
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
                    Sponsors
                </motion.h2>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "30px",
                        justifyItems: "center",
                    }}
                >
                    {currentSponsors.map((sponsor, index) => (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    whileHover={{ y: -10 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
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
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
                                        e.currentTarget.style.boxShadow = "0 0 30px rgba(75,85,255,0.4)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = "rgba(75,85,255,0.3)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    {/* Subtle pixelated decoration */}
                                    <div className="absolute top-0 right-0 w-8 h-8 opacity-20 pointer-events-none"
                                        style={{ borderTop: "2px solid #4B55FF", borderRight: "2px solid #4B55FF" }} />
                                    <div className="absolute bottom-0 left-0 w-8 h-8 opacity-20 pointer-events-none"
                                        style={{ borderBottom: "2px solid #4B55FF", borderLeft: "2px solid #4B55FF" }} />

                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        style={{
                                            width: "100%",
                                            height: "100px",
                                            objectFit: "contain",
                                            filter: "drop-shadow(0 0 10px rgba(75,85,255,0.2))",
                                        }}
                                    />

                                    <div className="text-center">
                                        <h3
                                            style={{
                                                fontFamily: "Upheav, sans-serif",
                                                fontSize: "24px",
                                                color: "#fff",
                                                marginBottom: "4px",
                                            }}
                                        >
                                            {sponsor.name}
                                        </h3>
                                        <span
                                            style={{
                                                fontFamily: "var(--font-mono)",
                                                fontSize: "12px",
                                                color: "rgba(255, 255, 255, 0.5)",
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em",
                                            }}
                                        >
                                            {sponsor.tier} Sponsor
                                        </span>
                                    </div>
                                </motion.div>
                            </DialogTrigger>

                            <DialogContent className="bg-[#0a0514] border-[#392e4e] text-white max-w-4xl max-h-[60vh] overflow-y-auto">
                                <DialogHeader className="mb-6">
                                    <div className="flex flex-col items-center gap-4 text-center">
                                        <div className="w-full h-32 flex items-center justify-center p-4">
                                            <img
                                                src={sponsor.logo}
                                                alt={sponsor.name}
                                                className="max-h-full max-w-full object-contain filter drop-shadow(0 0 15px rgba(120, 100, 255, 0.3))"
                                            />
                                        </div>
                                        <div>
                                            <DialogTitle className="font-['Upheav'] text-4xl mb-1 tracking-wider">
                                                {sponsor.name}
                                            </DialogTitle>
                                            <DialogDescription className="font-mono text-purple-400 uppercase tracking-widest text-xs">
                                                {sponsor.tier} Partner
                                            </DialogDescription>
                                        </div>
                                    </div>
                                </DialogHeader>

                                <div className="prose prose-invert prose-purple max-w-none pt-4 border-t border-white/10">
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ node, ...props }) => <h1 className="font-['Upheav'] text-2xl text-white mb-4 mt-6" {...props} />,
                                            h2: ({ node, ...props }) => <h2 className="font-['Upheav'] text-xl text-white mt-8 mb-4 border-b border-white/5 pb-2" {...props} />,
                                            p: ({ node, ...props }) => <p className="text-white/80 leading-relaxed mb-4 text-sm md:text-base" {...props} />,
                                            ul: ({ node, ...props }) => <ul className="list-disc list-inside text-white/70 mb-6 space-y-2 text-sm" {...props} />,
                                            li: ({ node, ...props }) => <li className="text-white/70" {...props} />,
                                            a: ({ node, ...props }) => <a className="text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-all" target="_blank" rel="noopener noreferrer" {...props} />,
                                            blockquote: ({ node, ...props }) => <blockquote className="border-l-2 border-purple-500 pl-4 py-1 italic text-white/60 bg-white/5 my-6 text-sm" {...props} />,
                                            code: ({ node, ...props }) => <code className="bg-purple-900/40 px-1.5 py-0.5 rounded text-purple-200 font-mono text-xs border border-purple-500/20" {...props} />,
                                        }}
                                    >
                                        {sponsor.description}
                                    </ReactMarkdown>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </section>
    );
}
