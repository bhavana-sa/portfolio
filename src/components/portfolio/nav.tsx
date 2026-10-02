"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { sections, profile } from "@/lib/portfolio-data";

/* ============================================================
   SiteNav — fixed minimal top navigation.
   - Logo mark (initials) left
   - Section anchors center (desktop only)
   - Theme toggle + resume CTA right
   - Mobile: condensed menu with sheet-like overlay
   ============================================================ */

export function SiteNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeId, setActiveId] = React.useState<string>("intro");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const reduced = useReducedMotion();

  React.useEffect(() => setMounted(true), []);

  // Track scroll position for nav background
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "backdrop-blur-md bg-paper/80 border-b border-rule shadow-[0_10px_35px_-28px_rgba(0,0,0,0.45)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
        style={{ ["--w" as string]: "100%" }}
      >
        <nav
          className="container-wide flex items-center justify-between py-4 md:py-5"
          aria-label="Primary"
        >
          {/* Logo mark */}
          <a
            href="#intro"
            onClick={(e) => handleNavClick(e, "intro")}
            className="group flex items-center gap-2.5"
            aria-label={`${profile.name} — back to top`}
          >
            <span
              className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper font-display text-[13px] font-medium transition-transform duration-300 group-hover:scale-105"
              aria-hidden
            >
              b
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-mono-label text-[11px] font-medium text-ink uppercase tracking-[0.18em]">
                Bhavana Sudhakar Athavane
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1.5">
            {sections.slice(1, -1).map((s) => {
              const isActive = activeId === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={(e) => handleNavClick(e, s.id)}
                  className="group relative px-4 py-2 text-xs uppercase tracking-[0.18em] font-mono-label transition-colors duration-300"
                  aria-current={isActive ? "true" : undefined}
                >
                  {/* Subtle hover background capsule */}
                  <span
                    className={[
                      "absolute inset-0 rounded-full transition-opacity duration-300",
                      isActive
                        ? "bg-ink/8 opacity-100"
                        : "bg-ink/5 opacity-0 group-hover:opacity-100",
                    ].join(" ")}
                  />

                  <span
                    className={[
                      "relative z-10 transition-colors duration-300",
                      isActive ? "text-ink font-semibold" : "text-ink-mute group-hover:text-ink",
                    ].join(" ")}
                  >
                    {s.label}
                  </span>

                  {/* Active indicator dot/pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-[2px] left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-ink/75"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="grid h-9 w-9 place-items-center rounded-full border border-rule text-ink-mute transition-colors hover:text-ink hover:border-rule-strong"
              aria-label="Toggle color theme"
            >
              {mounted ? (
                <ThemeIcon isDark={theme === "dark"} />
              ) : (
                <span className="h-4 w-4" aria-hidden />
              )}
            </button>

            <a
                href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-rule-strong bg-transparent px-4 py-2 font-mono-label text-[10px] uppercase tracking-[0.18em] text-ink transition-all duration-200 hover:border-ink hover:bg-ink hover:text-paper"
            >
              Résumé
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M4 7h6m0 0L7 4m3 3L7 10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden grid h-9 w-9 place-items-center rounded-full border border-rule text-ink"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={[
                    "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                    mobileOpen ? "top-1.5 rotate-45" : "top-0",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 top-1.5 h-px w-full bg-current transition-opacity duration-200",
                    mobileOpen ? "opacity-0" : "opacity-100",
                  ].join(" ")}
                />
                <span
                  className={[
                    "absolute left-0 h-px w-full bg-current transition-transform duration-300",
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex h-full flex-col justify-center px-6">
              <ol className="flex flex-col gap-1">
                {sections.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => handleNavClick(e, s.id)}
                      className="flex items-baseline gap-4 py-3 border-b border-rule"
                    >
                      <span className="numeral text-sm text-ink-mute tabular-nums">
                        {s.index}
                      </span>
                      <span className="font-display text-3xl md:text-4xl text-ink font-medium tracking-[-0.02em]">
                        {s.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ol>

              <div className="mt-10 flex flex-col gap-3 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="link-editorial text-ink"
                >
                  {profile.email}
                </a>
                <a
                  href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`}
                  className="link-editorial text-ink"
                >
                  Download résumé ↓
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeIcon({ isDark }: { isDark: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="text-ink"
    >
      {isDark ? (
        // Sun
        <>
          <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.3" />
          <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
            <path d="M8 1.5v1.5M8 13v1.5M1.5 8h1.5M13 8h1.5M3.3 3.3l1.1 1.1M11.6 11.6l1.1 1.1M3.3 12.7l1.1-1.1M11.6 4.4l1.1-1.1" />
          </g>
        </>
      ) : (
        // Moon
        <path
          d="M12.5 9.5A5 5 0 016.5 3.5a5 5 0 106 6z"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}
