"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { profile } from "@/lib/portfolio-data";

/* ============================================================
   Hero — editorial opening statement.
   Layout mirrors engineer-showcase:
     - Top metadata strip: dot + role · location, right: portfolio · 2026
     - Massive serif headline (Cormorant Garamond) on asymmetric grid
     - Italic accent word in muted ink
     - Large circular profile portrait next to the headline
     - Sub-headline in body sans
     - Floating circular "View selected work" scroll cue
     - Bottom hairline rule + signature stack inline
   ============================================================ */

export function Hero() {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax — only applied when motion is allowed
  const yHeadline = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yMeta = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const transition = { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      id="intro"
      ref={ref}
      className="relative min-h-[100svh] flex flex-col overflow-hidden pb-12 md:pb-16"
      aria-labelledby="hero-headline"
      
    >
      {/* Decorative top metadata strip — anchors the page identity */}
      <div className="container-wide pt-28 md:pt-32">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-3 text-ink-mute"
        >
          <div className="flex items-center gap-2.5 translate-y-8 md:translate-y-10">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span className="font-mono-label text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/75">
              Fullerton, CA
            </span>
          </div>
        </motion.div>
      </div>

      {/* Main hero — asymmetric editorial layout with portrait */}
      <div className="container-wide flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full py-12 md:py-0">
          {/* Headline column */}
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            style={reduced ? undefined : { y: yHeadline, opacity }}
          >
            <motion.h1
              id="hero-headline"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.25 }}
              className="font-display font-medium text-ink leading-[0.96] tracking-[-0.035em] text-[clamp(2.75rem,7vw,6.5rem)]"
            >
              <span className="block">Hi, I&apos;m <span className="italic font-normal text-ink-soft">Bhavana</span></span>
              <span className="block text-ink">a Data, Backend & AI Engineer</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.45 }}
              className="mt-6 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed"
            >
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transition, delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3.5 md:gap-4"
            >
              {/* LinkedIn action button */}
              <a
                href={profile.socials.find((s) => s.label === "LinkedIn")?.href || "https://www.linkedin.com/in/bhavana-athavane"}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 h-11 rounded-full border border-rule-strong bg-paper-raised text-ink px-6 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper shadow-[0_6px_18px_-14px_rgba(0,0,0,0.28)] dark:shadow-[0_6px_18px_-14px_rgba(0,0,0,0.8)]"
                aria-label="View my LinkedIn profile"
              >
                <svg width="14" height="14" viewBox="0 0 448 512" fill="currentColor" aria-hidden>
                  <path d="M100.28 448H7.4V148.9h92.88zm-46.44-341.5a53.86 53.86 0 1153.86-53.86 53.87 53.87 0 01-53.86 53.86zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.25-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.7V148.9h89V196h1.3c12.4-23.3 42.6-47.8 87.7-47.8 93.8 0 111.1 61.8 111.1 142.3V448z" />
                </svg>
                <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                  LinkedIn
                </span>
              </a>

              {/* GitHub action button */}
              <a
                href={profile.socials.find((s) => s.label === "GitHub")?.href || "https://github.com/Bhavanasa1902"}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center gap-2.5 h-11 rounded-full border border-rule-strong bg-paper-raised text-ink px-6 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper shadow-[0_6px_18px_-14px_rgba(0,0,0,0.28)] dark:shadow-[0_6px_18px_-14px_rgba(0,0,0,0.8)]"
                aria-label="View my work on GitHub"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                  GitHub
                </span>
              </a>

              {/* View selected work button (Outline) */}
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("work")
                    ?.scrollIntoView({
                      behavior: reduced ? "auto" : "smooth",
                      block: "start",
                    });
                }}
                className="group inline-flex items-center justify-center gap-2.5 h-11 shrink-0 rounded-full border border-rule-strong px-6 transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
                aria-label="Scroll to Selected Work section"
              >
                <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                  View Projects
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M6 1v10m0 0L2 7m4 4l4-4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

              {/* Get in touch action */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({
                      behavior: reduced ? "auto" : "smooth",
                      block: "start",
                    });
                }}
                className="group inline-flex items-center justify-center gap-2.5 h-11 rounded-full bg-ink text-paper px-6 transition-all duration-300 hover:bg-ink/85 shadow-[0_8px_24px_-14px_rgba(0,0,0,0.45)] dark:shadow-[0_8px_24px_-14px_rgba(0,0,0,0.75)]"
                aria-label="Get in touch"
              >
                <span className="font-mono-label text-[10px] uppercase tracking-[0.2em] whitespace-nowrap">
                  Get in touch
                </span>
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Portrait column — aligned with hero statement */}
          <motion.div
            className="lg:col-span-5 flex justify-center lg:justify-end items-center self-center"
            style={reduced ? undefined : { y: yPortrait }}
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...transition, delay: 0.55 }}
          >
            <div className="flex flex-col items-center">
              <div className="relative">
              {/* Outer rotating ring — subtle editorial flourish */}
              <div
                aria-hidden
                className="absolute -inset-3 md:-inset-4 rounded-full border border-rule-strong"
              />
              {/* Soft glow ring on hover */}
              <div
                aria-hidden
                className="absolute -inset-1 rounded-full bg-ink/5 blur-xl transition-opacity duration-700 opacity-0 hover:opacity-100"
              />
              {/* The portrait itself — circular crop */}
              <div className="relative aspect-square w-[clamp(220px,28vw,360px)] overflow-hidden rounded-full border border-rule-strong bg-paper-sunken shadow-[0_30px_60px_-25px_rgba(0,0,0,0.25)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/bhavana_headshot.png`}
                  alt={`${profile.name} — portrait`}
                  className="h-full w-full object-cover"
                  width={480}
                  height={480}
                />
                {/* Subtle inner ring for refined framing */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-ink/5"
                />
              </div>
              {/* Floating caption chip */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-paper px-3 py-1 shadow-sm border border-rule">
                <span className="font-mono-label text-[9px] uppercase tracking-[0.2em] text-ink-mute">
                  {profile.firstName} · 2026
                </span>
              </div>
              </div>
              {/* Subheadline placed as a static block below the portrait so it sits outside the circular frame */}
              <div className="mt-4 md:mt-6 lg:mt-8 flex justify-center w-full">
                <p className="max-w-[36rem] text-center text-sm md:text-base text-ink-soft px-4">
                  {profile.positioning}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
