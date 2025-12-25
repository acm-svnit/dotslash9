"use client";

// import React from "react";

// import React, { useState } from "react";
// import { useIsMobile } from "@/hooks/use-mobile";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// const timelineData = [
//   {
//     title: "Registration Starts",
//     date: "15 Dec 2025",
//     description: "Registration opens for DOTSLASH 9.0",
//   },
//   {
//     title: "Registration Ends",
//     date: "2 Jan 2026",
//     description: "Last day to register for the hackathon",
//   },
//   {
//     title: "Virtual Round",
//     date: "3-4 Jan 2026",
//     description: "Online preliminary round begins",
//   },
//   {
//     title: "Virtual Round Results",
//     date: "16-17 Jan 2026",
//     description: "Results of the virtual round will be announced",
//   },
//   {
//     title: "Offline Round",
//     date: "25-26 Jan 2026",
//     description:
//       "30-hour in-person hackathon at SVNIT campus. Click to view the complete schedule.",
//     isClickable: true,
//   },
// ];

// const day1Events = [
//   { time: "08:00 AM", event: "Check-In & Team Building" },
//   { time: "09:00 AM", event: "Opening Ceremony" },
//   { time: "10:00 AM", event: "Hacking Begins" },
//   { time: "03:00 PM", event: "Mentoring Round 1" },
// ];

// const day2Events = [
//   { time: "12:30 AM", event: "Mini Event - 1" },
//   { time: "01:00 AM", event: "Mentoring Round 2" },
//   { time: "03:30 AM", event: "Mini Event - 2" },
//   { time: "12:00 PM", event: "Hacking ends" },
//   { time: "02:00 PM", event: "Top 8 Release" },
//   { time: "05:00 PM", event: "Winner Announcement & Closing Ceremony" },
// ];

// export default function TimelineSection() {
//   const isMobile = useIsMobile();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   return (
//     <section
//       style={{
//         minHeight: "100vh",
//         backgroundColor: "#000",
//         padding:
//           "clamp(80px, 10vh, 120px) clamp(10px, 2vw, 40px) clamp(20px, 4vh, 60px)",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         overflow: "hidden",
//         position: "relative",
//         boxSizing: "border-box",
//       }}
//     >
//       <img
//         src="/gas2.gif"
//         alt="Gas"
//         style={{
//           position: "absolute",
//           top: "10%",
//           left: "0",
//           transform: "translate(-20%, -50%)",
//           width: "clamp(300px, 40vw, 600px)",
//           height: "clamp(300px, 40vw, 600px)",
//           objectFit: "contain",
//           imageRendering: "pixelated",
//           pointerEvents: "none",
//           zIndex: 0,
//           opacity: 0.6,
//         }}
//       />
//       <img
//         src="/planet2.gif"
//         alt="Planet"
//         style={{
//           position: "absolute",
//           bottom: "10%",
//           right: "0",
//           transform: "translate(30%, 0%)",
//           width: "clamp(300px, 40vw, 600px)",
//           height: "clamp(300px, 40vw, 600px)",
//           objectFit: "contain",
//           imageRendering: "pixelated",
//           pointerEvents: "none",
//           zIndex: 0,
//           opacity: 0.6,
//         }}
//       />
//       <div
//         style={{
//           width: "100%",
//           maxWidth: "1200px",
//           margin: "0 auto",
//           height: "100%",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           boxSizing: "border-box",
//           position: "relative",
//           zIndex: 10,
//         }}
//       >
//         <h2
//           style={{
//             fontFamily: "Upheav, sans-serif",
//             fontSize: "clamp(40px, 10vw, 100px)",
//             color: "#fff",
//             textAlign: "center",
//             textShadow: "4px 4px 8px rgba(0, 0, 0, 0.8)",
//             marginBottom: "clamp(40px, 6vh, 80px)",
//           }}
//         >
//           Timeline
//         </h2>
//         <div
//           style={{
//             width: "100%",
//             maxWidth: "900px",
//             position: "relative",
//             padding: "clamp(20px, 3vw, 40px) 0",
//           }}
//         >
//           {!isMobile && (
//             <div
//               style={{
//                 position: "absolute",
//                 left: "50%",
//                 top: "0",
//                 bottom: "0",
//                 width: "4px",
//                 background:
//                   "linear-gradient(to bottom, rgba(75,85,255,0.3), rgba(75,85,255,0.6), rgba(75,85,255,0.3))",
//                 transform: "translateX(-50%)",
//                 zIndex: 1,
//               }}
//             />
//           )}
//           {timelineData.map((event, index) => (
//             <div
//               key={index}
//               style={{
//                 position: "relative",
//                 marginBottom: "clamp(30px, 5vh, 60px)",
//                 display: "flex",
//                 alignItems: "center",
//                 flexDirection: isMobile
//                   ? "column"
//                   : index % 2 === 0
//                   ? "row"
//                   : "row-reverse",
//                 gap: "clamp(20px, 3vw, 40px)",
//                 zIndex: 2,
//               }}
//             >
//               <div
//                 style={{
//                   flex: 1,
//                   display: "flex",
//                   justifyContent: isMobile
//                     ? "center"
//                     : index % 2 === 0
//                     ? "flex-end"
//                     : "flex-start",
//                   paddingRight: isMobile
//                     ? "0"
//                     : index % 2 === 0
//                     ? "clamp(20px, 3vw, 40px)"
//                     : "0",
//                   paddingLeft: isMobile
//                     ? "0"
//                     : index % 2 === 0
//                     ? "0"
//                     : "clamp(20px, 3vw, 40px)",
//                   width: isMobile ? "100%" : "auto",
//                 }}
//               >
//                 <div
//                   className={event.isClickable ? "timeline-clickable-card" : ""}
//                   style={{
//                     backgroundColor: "#060010",
//                     border: "1px solid #392e4e",
//                     borderRadius: "12px",
//                     padding: "clamp(20px, 3vw, 30px)",
//                     maxWidth: isMobile ? "100%" : "400px",
//                     width: "100%",
//                     transition: "all 0.3s ease",
//                     position: "relative",
//                     overflow: "hidden",
//                   }}
//                   onClick={() => {
//                     if (event.isClickable) {
//                       setIsDialogOpen(true);
//                     }
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.borderColor = "rgba(75,85,255,0.8)";
//                     e.currentTarget.style.boxShadow =
//                       "0 0 30px rgba(75,85,255,0.5)";
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.borderColor = "#392e4e";
//                     e.currentTarget.style.boxShadow = "none";
//                   }}
//                 >
//                   <div
//                     style={{
//                       position: "absolute",
//                       inset: 0,
//                       background:
//                         "radial-gradient(circle at center, rgba(75,85,255,0.1) 0%, transparent 70%)",
//                       opacity: 0,
//                       transition: "opacity 0.3s ease",
//                       pointerEvents: "none",
//                     }}
//                     onMouseEnter={(e) => {
//                       e.currentTarget.style.opacity = "1";
//                     }}
//                     onMouseLeave={(e) => {
//                       e.currentTarget.style.opacity = "0";
//                     }}
//                   />
//                   <h3
//                     style={{
//                       fontFamily: "Upheav, sans-serif",
//                       fontSize: "clamp(20px, 3vw, 32px)",
//                       color: "#fff",
//                       marginBottom: "clamp(8px, 1vh, 12px)",
//                       position: "relative",
//                       zIndex: 1,
//                     }}
//                   >
//                     {event.title}
//                   </h3>
//                   <p
//                     style={{
//                       fontFamily: "Upheav, sans-serif",
//                       fontSize: "clamp(16px, 2.5vw, 24px)",
//                       color: "rgba(75,85,255,0.9)",
//                       marginBottom: "clamp(8px, 1vh, 12px)",
//                       position: "relative",
//                       zIndex: 1,
//                     }}
//                   >
//                     {event.date}
//                   </p>
//                   <p
//                     style={{
//                       color: "rgba(255, 255, 255, 0.7)",
//                       fontSize: "clamp(14px, 2vw, 18px)",
//                       lineHeight: "1.6",
//                       fontFamily: "var(--font-sans)",
//                       position: "relative",
//                       zIndex: 1,
//                     }}
//                   >
//                     {event.description}
//                   </p>
//                 </div>
//               </div>
//               {!isMobile && (
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     width: "clamp(20px, 3vw, 30px)",
//                     height: "clamp(20px, 3vw, 30px)",
//                     borderRadius: "50%",
//                     backgroundColor: "rgba(75,85,255,0.8)",
//                     border: "4px solid #000",
//                     boxShadow: "0 0 20px rgba(75,85,255,0.6)",
//                     zIndex: 3,
//                   }}
//                 />
//               )}
//               {!isMobile && <div style={{ flex: 1 }} />}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div
//         style={{
//           position: "absolute",
//           bottom: 0,
//           left: 0,
//           width: "100%",
//           height: "200px",
//           background: "linear-gradient(to top, #000, transparent)",
//           pointerEvents: "none",
//           zIndex: 5,
//         }}
//       />
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         <DialogContent
//           className="bg-[#060010] border-[#392e4e] text-white max-w-[1400px] w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto"
//           style={{
//             backgroundColor: "#060010",
//             border: "1px solid #392e4e",
//             maxWidth: "1400px",
//             width: "calc(100% - 2rem)",
//           }}
//         >
//           <DialogHeader>
//             <DialogTitle
//               style={{
//                 fontFamily: "Upheav, sans-serif",
//                 fontSize: "clamp(28px, 5vw, 48px)",
//                 color: "#fff",
//                 textAlign: "center",
//                 marginBottom: "clamp(20px, 3vh, 40px)",
//               }}
//             >
//               Offline Round Schedule
//             </DialogTitle>
//           </DialogHeader>
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
//               gap: "clamp(30px, 5vw, 60px)",
//               padding: "clamp(10px, 2vw, 20px) clamp(20px, 3vw, 40px)",
//             }}
//           >
//             <div
//               style={{
//                 position: "relative",
//                 padding: "clamp(20px, 3vw, 30px)",
//                 minWidth: 0,
//               }}
//             >
//               <h3
//                 style={{
//                   fontFamily: "Upheav, sans-serif",
//                   fontSize: "clamp(24px, 4vw, 36px)",
//                   color: "rgba(75,85,255,0.9)",
//                   marginBottom: "clamp(20px, 3vh, 30px)",
//                   textAlign: "center",
//                 }}
//               >
//                 DAY 1 - 25TH JAN 2026
//               </h3>
//               <div
//                 style={{
//                   position: "relative",
//                   paddingLeft: "0",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: "40px",
//                     top: "0",
//                     bottom: "0",
//                     width: "4px",
//                     transform: "translateX(-50%)",
//                     background:
//                       "linear-gradient(to bottom, rgba(75,85,255,0.3), rgba(75,85,255,0.6), rgba(75,85,255,0.3))",
//                     zIndex: 1,
//                   }}
//                 />
//                 {day1Events.map((item, idx) => (
//                   <div
//                     key={idx}
//                     style={{
//                       position: "relative",
//                       marginBottom: "clamp(20px, 3vh, 30px)",
//                       paddingLeft: "60px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         position: "absolute",
//                         left: "40px",
//                         top: "8px",
//                         width: "20px",
//                         height: "20px",
//                         borderRadius: "50%",
//                         backgroundColor: "rgba(75,85,255,0.8)",
//                         border: "3px solid #060010",
//                         boxShadow: "0 0 15px rgba(75,85,255,0.6)",
//                         zIndex: 2,
//                         transform: "translateX(-50%)",
//                       }}
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "clamp(6px, 0.8vh, 10px)",
//                       }}
//                     >
//                       <p
//                         style={{
//                           fontFamily: "Upheav, sans-serif",
//                           fontSize: "clamp(18px, 2.5vw, 24px)",
//                           color: "rgba(75,85,255,0.9)",
//                           margin: 0,
//                           lineHeight: "1.2",
//                         }}
//                       >
//                         {item.time}
//                       </p>
//                       <p
//                         style={{
//                           color: "rgba(255, 255, 255, 0.9)",
//                           fontSize: "clamp(15px, 2vw, 19px)",
//                           fontFamily: "var(--font-sans)",
//                           margin: 0,
//                           lineHeight: "1.4",
//                         }}
//                       >
//                         {item.event}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div
//               style={{
//                 position: "relative",
//                 padding: "clamp(20px, 3vw, 30px)",
//                 minWidth: 0,
//               }}
//             >
//               <h3
//                 style={{
//                   fontFamily: "Upheav, sans-serif",
//                   fontSize: "clamp(24px, 4vw, 36px)",
//                   color: "rgba(75,85,255,0.9)",
//                   marginBottom: "clamp(20px, 3vh, 30px)",
//                   textAlign: "center",
//                 }}
//               >
//                 DAY 2 - 26TH JAN 2026
//               </h3>
//               <div
//                 style={{
//                   position: "relative",
//                   paddingLeft: "0",
//                 }}
//               >
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: "40px",
//                     top: "0",
//                     bottom: "0",
//                     width: "4px",
//                     transform: "translateX(-50%)",
//                     background:
//                       "linear-gradient(to bottom, rgba(75,85,255,0.3), rgba(75,85,255,0.6), rgba(75,85,255,0.3))",
//                     zIndex: 1,
//                   }}
//                 />
//                 {day2Events.map((item, idx) => (
//                   <div
//                     key={idx}
//                     style={{
//                       position: "relative",
//                       marginBottom: "clamp(20px, 3vh, 30px)",
//                       paddingLeft: "60px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         position: "absolute",
//                         left: "40px",
//                         top: "8px",
//                         width: "20px",
//                         height: "20px",
//                         borderRadius: "50%",
//                         backgroundColor: "rgba(75,85,255,0.8)",
//                         border: "3px solid #060010",
//                         boxShadow: "0 0 15px rgba(75,85,255,0.6)",
//                         zIndex: 2,
//                         transform: "translateX(-50%)",
//                       }}
//                     />
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "clamp(6px, 0.8vh, 10px)",
//                       }}
//                     >
//                       <p
//                         style={{
//                           fontFamily: "Upheav, sans-serif",
//                           fontSize: "clamp(18px, 2.5vw, 24px)",
//                           color: "rgba(75,85,255,0.9)",
//                           margin: 0,
//                           lineHeight: "1.2",
//                         }}
//                       >
//                         {item.time}
//                       </p>
//                       <p
//                         style={{
//                           color: "rgba(255, 255, 255, 0.9)",
//                           fontSize: "clamp(15px, 2vw, 19px)",
//                           fontFamily: "var(--font-sans)",
//                           margin: 0,
//                           lineHeight: "1.4",
//                         }}
//                       >
//                         {item.event}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </section>
//   );
// }

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
      }}
    >
      <picture className="timeline-left-gif">
        <source media="(max-width: 639px)" srcSet="/planet2.gif" />
        <img
          src="/planet1.gif"
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
        src="/planet2.gif"
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
        }}
      >
        <h2
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(42px, 10vw, 110px)",
            color: "#fff",
            textShadow: "4px 4px 10px rgba(0, 0, 0, 0.7)",
          }}
        >
          Timeline
        </h2>
        <p
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            color: "rgba(75,85,255,0.95)",
            textShadow: "0 0 16px rgba(75,85,255,0.45)",
            letterSpacing: "0.04em",
          }}
        >
          Will be announced soon
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "clamp(15px, 2.6vw, 20px)",
            maxWidth: "640px",
            lineHeight: 1.6,
            fontFamily: "var(--font-sans)",
          }}
        >
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
