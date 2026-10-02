"use client";

import * as React from "react";
import { Reveal, Stagger, StaggerItem, SectionLabel } from "./primitives";
import { profile } from "@/lib/portfolio-data";

/* ============================================================
   About — editorial manifesto + stat band + principles.
   Mirrors engineer-showcase: massive serif numerals as graphic
   anchors, italic philosophy headings, hairline rules between
   principles.
   ============================================================ */

export function About() {
  return (
    <section
      id="about"
      className="relative scroll-mt-20 py-24 md:py-36 border-t border-rule"
      aria-labelledby="about-heading"
    >
      <div className="container-editorial">
        {/* Section header */}
        <Reveal>
          <SectionLabel
            index="01"
            eyebrow="About"
            title={
              <>
                I like building things
                <br className="hidden sm:block" /> that make complexity{" "}
                <span className="italic font-normal text-ink-soft">feel simple.</span>.
              </>
            }
          />
        </Reveal>

        {/* Manifesto — multi-column reading layout */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-3 lg:pt-2">
            <Reveal delay={0.05}>
              <p className="eyebrow-parens">About Me</p>
              <p className="mt-3 font-mono-label text-[10px] text-ink-mute uppercase tracking-[0.18em]">
                On what I build, and why
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-9 lg:col-start-4">
            <Stagger as="div" className="flex flex-col gap-7 max-w-3xl" gap={0.12}>
              {profile.manifesto.map((para, i) => (
                <StaggerItem key={i} as="div">
                  {/* Large serif drop cap on first paragraph — styled via CSS for consistent alignment */}
                  {i === 0 ? (
                    <p className="manifesto-first text-ink-soft">
                      <span className="drop-cap" aria-hidden>
                        {para.charAt(0)}
                      </span>
                      <span className="manifesto-first-body">{para.slice(1)}</span>
                    </p>
                  ) : (
                    <p className="manifesto-body text-ink-soft">{para}</p>
                  )}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}