"use client";

export default function TimelineSection() {
  const days = [
    {
      dateLabel: "February 2027 - Day One",
      events: [
        { time: "8:00 AM – 9:00 AM", title: "Reporting & Breakfast" },
        { time: "9:30 AM", title: "Hacking Begins" },
        {
          time: "11:00 AM – 12:00 PM",
          title:
            "Mentor Round 1 (Ideation Round)"
        },
        { time: "12:30 PM – 1:30 PM", title: "Lunch" },
        { time: "3:30 PM – 4:00 PM", title: "Surprise Activity" },
        { time: "4:00 PM – 5:00 PM", title: "Mentor Round 2" },
        { time: "4:30 PM – 5:00 PM", title: "High Tea" },
        { time: "7:30 PM – 8:30 PM", title: "Dinner" },
        { time: "11:00 PM – 12:00 AM", title: "Mentor Round 3" },
      ],
    },
    {
      dateLabel: "February 2027 - Day Two",
      events: [
        { time: "1:30 AM – 2:00 AM", title: "High Tea" },
        { time: "7:30 AM – 8:30 AM", title: "Breakfast" },
        { time: "10:00 AM – 11:30 AM", title: "Final Mentor Round" },
        { time: "12:00 PM", title: "Hacking Ends" },
        { time: "1:00 PM", title: "Devfolio Submission Deadline" },
        { time: "1:30 PM – 2:00 PM", title: "Lunch" },
        { time: "2:00 PM", title: "Top 8 Teams Announced" },
        { time: "2:30 PM – 4:30 PM", title: "Final Presentations" },
        { time: "5:00 PM", title: "Prize Distribution & Closing Ceremony" },
      ],
    },
  ];

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
      }}>
      <picture className="timeline-left-gif">
        <source media="(max-width: 639px)" srcSet="/space/planet2.gif" />
        <img
          src="/space/planet1.gif"
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
        src="/space/planet2.gif"
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
        }}>
        <h2
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(42px, 10vw, 110px)",
            color: "#fff",
            textShadow: "4px 4px 10px rgba(0, 0, 0, 0.7)",
          }}>
          DotSlash Hackathon
        </h2>
        <p
          style={{
            fontFamily: "Upheav, sans-serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            color: "rgba(75,85,255,0.95)",
            textShadow: "0 0 16px rgba(75,85,255,0.45)",
            letterSpacing: "0.04em",
          }}>
          Schedule
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: "clamp(15px, 2.6vw, 20px)",
            maxWidth: "640px",
            lineHeight: 1.6,
            fontFamily: "var(--font-sans)",
          }}>
          Febrary 2027 timelines for reporting, hacking, mentor rounds, and final presentations.
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: 820,
            marginTop: 22,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}>
          {days.map((day) => (
            <div key={day.dateLabel}>
              <div
                style={{
                  color: "rgba(165, 180, 252, 1)",
                  fontFamily: "Upheav, sans-serif",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                  fontSize: 14,
                }}>
                {day.dateLabel}
              </div>

              <div
                style={{
                  borderLeft: "2px solid rgba(75,85,255,0.45)",
                  paddingLeft: 16,
                }}>
                {day.events.map((ev, idx) => (
                  <div key={`${day.dateLabel}-${idx}`} style={{ marginBottom: 14 }}>
                    <div
                      style={{
                        color: "#fff",
                        fontFamily: "Upheav, sans-serif",
                        fontSize: 13,
                        opacity: 0.92,
                        marginBottom: 4,
                      }}>
                      {ev.time}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.82)",
                        fontFamily: "var(--font-sans)",
                        fontSize: 15,
                        lineHeight: 1.45,
                      }}>
                      {ev.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
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
