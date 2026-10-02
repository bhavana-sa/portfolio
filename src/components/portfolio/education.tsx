"use client";

import * as React from "react";
import { Reveal, SectionLabel } from "./primitives";
import { education } from "@/lib/portfolio-data";

/* ============================================================
   Education — paired credentials laid out as an editorial
   spread. Mirrors engineer-showcase card style with
   numbered top-right, italic accent in section headline.
   ============================================================ */

export function Education() {
  return (
    <section
      id="education"
      className="relative scroll-mt-20 py-24 md:py-36 border-t border-rule"
      aria-labelledby="education-heading"
    >

      <div className="container-editorial">
        <Reveal>
          <SectionLabel
            index="05"
            eyebrow="Education"
            title={
              <>
                Foundations in
                <br className="hidden sm:block" /> Computer{" "}
                <span className="italic font-normal text-ink-soft">Science</span>.
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
            My computer science foundation began in Bangalore, India with a bachelor’s
            degree focused on software and systems, and continued at California
            State University, Fullerton, where I pursued a Master's in Computer Science
            with deeper exposure to data, analytics, and applied AI.
          </p>
        </Reveal>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {education.map((ed, i) => (
            <Reveal key={ed.id} delay={0.1 + i * 0.1}>
              <article
                className="bg-paper-raised border border-rule rounded-2xl p-7 md:p-10 h-full flex flex-col group transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_16px_34px_-24px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.9)]"
                aria-labelledby={`edu-${ed.id}-inst`}
              >
                {/* Header — status + index */}
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono-label text-[10px] uppercase tracking-[0.22em] text-ink-soft">
                    {ed.current ? "In progress" : "Completed"}
                  </span>
                  <span className="numeral text-base text-ink-soft tabular-nums shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="font-mono-label text-[10px] uppercase tracking-[0.22em] text-ink mb-3">
                  {ed.period}
                </p>

                <h3
                  id={`edu-${ed.id}-inst`}
                  className="font-display text-2xl md:text-[1.85rem] text-ink font-medium leading-tight tracking-[-0.015em] mb-3"
                >
                  {ed.institution}
                </h3>

                <p className="text-base text-ink-soft mb-1">
                  <span className="font-medium text-ink">{ed.degree}</span>
                  {" · "}
                  {ed.field}
                </p>

                {ed.location && (
                  <p className="text-sm text-ink-soft mt-auto pt-6 font-mono-label uppercase tracking-[0.18em] text-[10px]">
                    {ed.location}
                  </p>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
