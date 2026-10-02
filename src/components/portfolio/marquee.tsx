"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

type Stat = {
  value: string;
  label: string;
};

type MarqueeProps = {
  items: string[];
  stats?: Stat[];
  duration?: number;
  direction?: "forward" | "reverse";
  className?: string;
};

export function Marquee({
  items,
  stats,
  duration = 45,
  direction = "forward",
  className = "",
}: MarqueeProps) {
  const reduced = useReducedMotion();

  return (
    <div id="stack" className={["w-full bg-paper text-ink border-y border-rule scroll-mt-20", className].join(" ")}>
      {/* Top section: Metrics Grid */}
      {stats && stats.length > 0 && (
        <div className="container-editorial border-b border-rule/60 py-10 md:py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2">
                <span className="font-display text-4xl sm:text-5xl md:text-[3.8rem] font-medium leading-none text-ink tracking-tight">
                  {stat.value}
                </span>
                <p className="text-xs md:text-sm text-ink-mute leading-snug max-w-[200px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marquee Banner Track */}
      <div
        className="relative w-full overflow-hidden py-8 md:py-12"
        aria-label="Technical stack"
        role="list"
      >
        {!reduced ? (
          <div
            className="flex w-max marquee-track"
            style={
              {
                "--marquee-duration": `${duration}s`,
              } as React.CSSProperties
            }
            data-direction={direction}
          >
            <MarqueeGroup items={items} />
            <MarqueeGroup items={items} ariaHidden />
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 px-6 md:px-12 py-4">
            {items.map((item, i) => (
              <MarqueeItem key={`${item}-${i}`} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MarqueeGroup({
  items,
  ariaHidden,
}: {
  items: string[];
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex items-center shrink-0"
      aria-hidden={ariaHidden ? "true" : undefined}
      role="presentation"
    >
      {items.map((item, i) => (
        <MarqueeItem key={`${item}-${i}`} item={item} />
      ))}
    </ul>
  );
}

function MarqueeItem({ item }: { item: string }) {
  return (
    <li
      className="flex items-center gap-8 md:gap-14 px-4 md:px-7"
      role="listitem"
    >
      <span className="font-display italic font-medium text-4xl sm:text-5xl md:text-[4.2rem] leading-none text-ink tracking-tight whitespace-nowrap">
        {item}
      </span>
      <span
        aria-hidden
        className="text-ink-mute/70 text-lg md:text-2xl select-none font-serif"
      >
        ✦
      </span>
    </li>
  );
}
