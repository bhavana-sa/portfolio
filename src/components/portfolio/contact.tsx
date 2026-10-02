"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./primitives";
import { profile } from "@/lib/portfolio-data";

/* ============================================================
   Contact — closing section doubling as a CTA.
   Mirrors engineer-showcase:
     - Parens-wrapped eyebrow + numeral
     - Huge italic serif watermark headline (muted gray)
     - Direct email link, large and prominent
     - 3-column info grid: bio, socials, contact details
     - Back-to-top link in the bottom-right footer
   ============================================================ */

export function Contact() {
  const reduced = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative scroll-mt-20 py-24 md:py-40 border-t border-rule section-invert paper-grain"
      aria-labelledby="contact-heading"
    >
      <div className="container-editorial relative z-10">
        {/* Eyebrow */}
        <Reveal>
          <div className="flex items-center gap-4 text-ink-mute mb-8">
            <span className="numeral text-sm tabular-nums">06</span>
            <span aria-hidden className="h-px w-8 bg-rule-strong" />
            <span className="eyebrow-parens">Contact</span>
          </div>
        </Reveal>

        {/* Large italic serif headline — watermark style */}
        <Reveal delay={0.05}>
          <h2
            id="contact-heading"
            className="font-display italic font-normal text-ink-soft leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,9vw,7rem)] max-w-5xl"
          >
            Let&apos;s build something{" "}
            <span className="not-italic font-medium text-ink">
              dependable
            </span>
            .
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
            Open to entry-level data engineering roles and collaborations. The
            fastest way to reach me is by email — I read every message.
          </p>
        </Reveal>

        {/* Primary CTA + availability */}
        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  "Data Engineering Role — Conversation"
                )}`}
                className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3.5 text-base font-medium text-paper transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start a conversation</span>
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M5 8h6m0 0L8 5m3 3L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>

              <div className="flex items-center gap-3 text-ink-soft">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
                </span>
                <span className="font-mono-label text-[10px] uppercase tracking-[0.22em]">
                  {profile.availability}
                </span>
              </div>
            </div>

            {/* Direct email — visible, large */}
            <a
              href={`mailto:${profile.email}`}
              className="link-editorial font-display text-2xl md:text-3xl text-ink font-medium self-start"
            >
              {profile.email} ↗
            </a>
          </div>
        </Reveal>

        {/* Three-column info grid */}
        <Reveal delay={0.35}>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-12 border-t border-rule pt-12">
            {/* Bio column */}
            <div className="flex flex-col gap-3">
              <p className="eyebrow-parens">Details</p>
              <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
                {profile.positioning} Currently based in {profile.location}.
              </p>
            </div>

            {/* Socials column */}
            <div className="flex flex-col gap-3">
              <p className="eyebrow-parens">Elsewhere</p>
              <ul className="flex flex-col gap-2.5">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.label === "Resume" ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${s.href}` : s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-baseline gap-2"
                    >
                      <span className="link-editorial font-display text-lg text-ink font-medium">
                        {s.label}
                      </span>
                      <span className="font-mono-label text-[10px] text-ink-mute uppercase tracking-[0.18em]">
                        ↗ {s.handle}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact column */}
            <div className="flex flex-col gap-3">
              <p className="eyebrow-parens">Reach</p>
              <dl className="flex flex-col gap-2">
                <div className="flex flex-col">
                  <dt className="font-mono-label text-[9px] uppercase tracking-[0.22em] text-ink-mute mb-0.5">Location</dt>
                  <dd className="text-base text-ink">{profile.location}</dd>
                </div>
                <div className="flex flex-col mt-2">
                  <dt className="font-mono-label text-[9px] uppercase tracking-[0.22em] text-ink-mute mb-0.5">Availability</dt>
                  <dd className="text-base text-ink">{profile.availability}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>

        {/* Closing signature + back-to-top */}
        <Reveal delay={0.45}>
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="mt-24 md:mt-32 pt-10 border-t border-rule flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <p className="font-display text-[clamp(3rem,14vw,11rem)] leading-[0.85] text-ink font-medium tracking-[-0.04em]">
              Bhavana.
            </p>
            <div className="flex flex-col md:items-end gap-3">
              <a
                href="#intro"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({
                    top: 0,
                    behavior: reduced ? "auto" : "smooth",
                  });
                }}
                className="link-editorial font-mono-label text-[10px] uppercase tracking-[0.22em] text-ink-mute hover:text-ink transition-colors"
              >
                Back to top ↑
              </a>
              <p className="font-mono-label text-[10px] uppercase tracking-[0.22em] text-ink-mute md:text-right">
                © 2026 — Bhavana Sudhakar Athavane
                <br />
                Designed &amp; built with care.
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
