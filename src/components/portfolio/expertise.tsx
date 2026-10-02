"use client";

import * as React from "react";
import { Reveal, SectionLabel, Stagger, StaggerItem } from "./primitives";
import { skillGroups } from "@/lib/portfolio-data";

/* ============================================================
   Expertise — dark section with 2x2 card grid.
   Mirrors engineer-showcase: switches to deep charcoal
   background for visual rhythm. Each card has a small
   numbered indicator in the top-right corner, large serif
   category title, and a clean list of skills.
   ============================================================ */

export function Expertise() {
  return (
    <section
      id="expertise"
      className="relative scroll-mt-20 py-24 md:py-36 border-t border-rule bg-paper-sunken"
      aria-labelledby="expertise-heading"
    >
      <div className="container-editorial relative z-10">
        {/* Section header */}
        <Reveal>
          <SectionLabel
            index="02"
            eyebrow="Technical Skills"
            title={
              <>
                The stack behind
                <br className="hidden sm:block" /> the{" "}
                <span className="italic font-normal text-ink-soft">work</span>.
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-base md:text-lg text-ink-soft leading-relaxed">
            My engineering stack spans across software, data, cloud, and applied AI. 
            These are the technologies I have used to build, analyze, and ship real systems.
          </p>
        </Reveal>

        {/* Skill matrix */}
        <Stagger
          as="div"
          className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          gap={0.1}
        >
          {skillGroups.map((group, i) => (
            <StaggerItem key={group.id} as="div">
              <SkillCard group={group} index={i + 1} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[number];
  index: number;
}) {
  return (
    <div className="bg-paper-raised border border-rule rounded-2xl p-7 md:p-9 h-full flex flex-col group transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-ink/25 hover:shadow-[0_16px_34px_-24px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.9)]">
      {/* Card header — title left, index right */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="font-mono-label text-[10px] uppercase tracking-[0.22em] text-ink-soft mb-2">
            {group.caption}
          </p>
          <h3 className="font-display text-2xl md:text-[1.85rem] text-ink font-medium leading-tight tracking-[-0.015em]">
            {group.title}
          </h3>
        </div>
        <span className="numeral text-base text-ink-soft tabular-nums shrink-0 ml-4">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* Skills — names only, with hairline dividers */}
      <ul className="mt-auto grid gap-0 border-t border-rule text-ink-soft">
        {group.skills.map((skill) => (
          <li
            key={skill.label}
            className="border-b border-rule py-3 text-[13px] md:text-sm font-medium text-ink"
          >
            {skill.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
