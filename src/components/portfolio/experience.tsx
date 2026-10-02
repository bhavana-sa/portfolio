"use client";

import * as React from "react";
import { Reveal, SectionLabel, Stagger, StaggerItem } from "./primitives";
import { experience } from "@/lib/portfolio-data";

/* ============================================================
   Experience — grouped company cards with internal role timeline.
   Redesigned layout (mirrors engineer-showcase editorial language):
     - One card per organization (CSUF, Nokia, Cognizant)
     - Card header: serif org name + overall span + kind badge
     - Below: one or more role blocks separated by hairline rules
     - Each role: title + period on top, em-dash prefixed bullets
       with numeric highlighting, pill tags for stack
     - Multi-role orgs get a left-side vertical rail connecting roles
   ============================================================ */

export function Experience() {
  return (
    <section
      id="experience"
      className="relative scroll-mt-20 py-24 md:py-36 border-t border-rule"
      aria-labelledby="experience-heading"
    >
      <div className="container-editorial">
        {/* Section header */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
            <div className="md:col-span-8">
              <SectionLabel
                index="03"
                eyebrow="Experience"
                title={
                  <>
                    Experience building software and analyzing
                    <br className="hidden sm:block" /> data at{" "}
                    <span className="italic font-normal text-ink-soft">scale</span>.
                  </>
                }
              />
            </div>
          </div>
        </Reveal>

        {/* Timeline — one card per org */}
        <Stagger
          as="ol"
          className="mt-16 md:mt-24 flex flex-col gap-6 md:gap-8"
          gap={0.18}
        >
          {experience.map((entry, i) => (
            <StaggerItem key={entry.id} as="li">
              <CompanyCard entry={entry} index={i} total={experience.length} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------- One organization card ---------- */
function CompanyCard({
  entry,
  index,
}: {
  entry: (typeof experience)[number];
  index: number;
  total: number;
}) {
  const hasMultipleRoles = entry.roles.length > 1;

  return (
    <details className="group relative rounded-2xl border border-rule bg-paper-raised transition-[border-color,box-shadow] duration-300 hover:border-ink/25 hover:shadow-[0_18px_36px_-26px_rgba(0,0,0,0.34)] dark:hover:shadow-[0_22px_44px_-30px_rgba(0,0,0,0.92)] [&_summary::-webkit-details-marker]:hidden [&_summary::marker]:hidden">
      <summary className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-x-10 px-6 md:px-10 py-7 md:py-9 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-ink/20">
        {/* Index + org name */}
        <div className="md:col-span-6">
          <div className="flex items-baseline gap-4">
            <span className="numeral text-sm tabular-nums text-ink-mute shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              id={`exp-${entry.id}-org`}
              className="font-display text-2xl md:text-[1.85rem] text-ink font-medium leading-tight tracking-[-0.015em]"
            >
              {entry.org}
            </h3>
          </div>
          <p className="mt-2 md:mt-3 ml-9 md:ml-10 text-[14.5px] text-ink-soft leading-relaxed max-w-2xl">
            {entry.summary}
          </p>
          <p className="mt-4 ml-9 md:ml-10 text-sm italic text-ink-light"> 
            Tap the card to show more information. 
          </p>

        </div>

        {/* Right column — period, location, kind badge */}
        <div className="md:col-span-6 md:pl-8 md:border-l md:border-rule flex flex-col gap-2 md:items-end md:text-right">
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink">
            {entry.period}
          </p>
          <p className="font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink-soft">
            {entry.location}
          </p>
          <div className="mt-1">
            {entry.current ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink px-2.5 py-1 font-mono-label text-[9px] uppercase tracking-[0.18em] text-ink">
                <span className="h-1 w-1 rounded-full bg-ink" aria-hidden />
                Current
              </span>
            ) : (
              <span className="font-mono-label text-[9px] uppercase tracking-[0.18em] text-ink-soft">
                {entry.kind}
              </span>
            )}
          </div>
        </div>
      </summary>

      <div className="border-t border-rule bg-paper px-6 md:px-10 py-6 md:py-8">
        <div className="flex flex-col gap-8 md:gap-10">
          {entry.roles.map((role, ri) => (
            <RoleBlock
              key={`${entry.id}-role-${ri}`}
              role={role}
              roleIndex={ri}
              totalRoles={entry.roles.length}
              multiRole={hasMultipleRoles}
            />
          ))}
        </div>
      </div>
    </details>
  );
}

/* ---------- A single role inside a company card ---------- */
function RoleBlock({
  role,
  multiRole,
}: {
  role: (typeof experience)[number]["roles"][number];
  roleIndex: number;
  totalRoles: number;
  multiRole: boolean;
}) {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-3 md:gap-x-8">
      {/* Rail node + role title column */}
      <div className="md:col-span-5 relative">
        {multiRole && (
          <span
            aria-hidden
            className="absolute -left-[6px] md:-left-[14px] top-1.5 h-3 w-3 rounded-full border-2 border-ink bg-paper-raised"
          />
        )}
        <p
          className={[
            "font-display text-lg md:text-xl text-ink font-medium leading-[1.25] tracking-[-0.01em]",
            multiRole ? "md:pl-2" : "",
          ].join(" ")}
        >
          {role.title}
        </p>
        <p className="mt-2 font-mono-label text-[9.5px] uppercase tracking-[0.18em] text-ink-mute">
          {role.period}
        </p>
        <p className="mt-3 text-[14px] text-ink-soft leading-relaxed max-w-md">
          {role.summary}
        </p>
      </div>

      {/* Highlights + tags column */}
      <div className="md:col-span-7 md:pl-8 md:border-l md:border-rule">
        <ul className="flex flex-col gap-3">
          {role.highlights.map((h, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden
                className="numeral text-xs text-ink-mute tabular-nums mt-1 shrink-0 w-5"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-[14px] md:text-[14.5px] text-ink-soft leading-relaxed flex-1">
                <span aria-hidden className="text-ink-mute mr-2">—</span>
                {highlightNumbers(h)}
              </p>
            </li>
          ))}
        </ul>

        {role.stack && role.stack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {role.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-rule-strong px-2.5 py-0.5 font-mono-label text-[9.5px] uppercase tracking-[0.12em] text-ink-soft"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* Highlight numeric tokens within text for visual emphasis */
function highlightNumbers(text: string) {
  // Split on patterns like 89%, 1M+, ~80%, 500K+, 41%, etc.
  const parts = text.split(/(~?\d+(?:\.\d+)?(?:%|K|M|\+)?)/g);
  return parts.map((part, i) => {
    if (/^~?\d+(?:\.\d+)?(%|K|M|\+)?$/.test(part)) {
      return (
        <span
          key={i}
          className="text-ink font-medium tabular-nums"
        >
          {part}
        </span>
      );
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
