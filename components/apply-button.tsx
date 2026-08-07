"use client";

import Image from "next/image";

const HACKATHON_SLUG = "dotslash-10";
const DEVFOLIO_OVERVIEW_URL = "https://dotslash-10.devfolio.co/overview";

const WRAPPER_SIZE = { height: "44px", width: "312px" };

export default function DevfolioApplyButton() {
  return (
    <div className="flex flex-col items-center my-6">
      <div
        className="relative flex items-center justify-center"
        style={WRAPPER_SIZE}
      >
        <a
          href={DEVFOLIO_OVERVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0 flex items-center justify-center gap-2.5 rounded-lg bg-[#3772ff] no-underline transition-opacity hover:opacity-95"
          style={{
            padding: "0 20px",
          }}
        >
          <Image
            src="/devfolio.jpg"
            alt=""
            width={24}
            height={24}
            className="shrink-0 object-contain"
          />
          <span className="font-semibold text-white">Apply with Devfolio</span>
        </a>
        <div
          className="apply-button relative z-10"
          data-hackathon-slug={HACKATHON_SLUG}
          data-button-theme="dark-inverted"
          style={{
            ...WRAPPER_SIZE,
            minHeight: WRAPPER_SIZE.height,
            minWidth: WRAPPER_SIZE.width,
            pointerEvents: "none",
          }}
          aria-hidden
        />
      </div>
    </div>
  );
}
