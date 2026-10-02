"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Reveal, SectionLabel } from "./primitives";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { projects, type ProjectEntry } from "@/lib/portfolio-data";

/* ============================================================
   Projects — horizontal drag-to-scroll snap carousel.
   Each project is a tall card with:
     - Thematic SVG illustration (top half)
     - Case-study text (bottom half)
     - Index badge, stack pills, key metric
     - Drag / mouse-wheel scroll with CSS snap
   Arrow buttons + progress dots for keyboard / click nav.
   Mobile: same card carousel, narrower cards.
   ============================================================ */

export function Projects() {
  const categories = ["All", "Data & ML", "Backend & DB", "Full-Stack", "Web3"] as const;
  type Category = (typeof categories)[number];

  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [selectedCategory, setSelectedCategory] = React.useState<Category>("All");
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStart = React.useRef<{ x: number; scrollLeft: number } | null>(null);
  const reduced = useReducedMotion();

  const filteredProjects = React.useMemo(
    () =>
      selectedCategory === "All"
        ? projects
        : projects.filter((project) => project.tags.includes(selectedCategory)),
    [selectedCategory]
  );

  React.useEffect(() => {
    if (filteredProjects.length === 0) {
      setActiveIndex(0);
      return;
    }

    setActiveIndex((current) => Math.min(current, filteredProjects.length - 1));
  }, [filteredProjects.length]);

  /* ── sync active index with scroll position ── */
  const onScroll = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const count = Math.max(filteredProjects.length, 1);
    const cardWidth = el.scrollWidth / count;
    const idx = Math.round(el.scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(idx, filteredProjects.length - 1)));
  }, [filteredProjects.length]);

  /* ── arrow navigation ── */
  const scrollTo = React.useCallback(
    (index: number) => {
      const el = trackRef.current;
      if (!el) return;
      const count = Math.max(filteredProjects.length, 1);
      const cardWidth = el.scrollWidth / count;
      el.scrollTo({ left: cardWidth * index, behavior: reduced ? "auto" : "smooth" });
      setActiveIndex(index);
    },
    [filteredProjects.length, reduced]
  );

  /* ── drag-to-scroll (desktop) ── */
  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
    e.preventDefault();
  }, []);

  const onMouseMove = React.useCallback((e: React.MouseEvent) => {
    if (!dragStart.current || !trackRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
  }, []);

  const endDrag = React.useCallback(() => {
    setIsDragging(false);
    dragStart.current = null;
    // let the scroll-snap settle, then sync index
    setTimeout(() => onScroll(), 60);
  }, [onScroll]);

  return (
    <section
      id="work"
      className="relative scroll-mt-20 py-24 md:py-36 border-t border-rule overflow-hidden"
      aria-labelledby="work-heading"
    >
      {/* ── Section header ── */}
      <div className="container-editorial mb-10 md:mb-14">
        <Reveal>
          <SectionLabel
            index="03"
            eyebrow="Selected Work"
            title={ <> A selection of <br className="hidden sm:block" />things I've built. </> }
          />
        </Reveal>

        <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
              <p className="max-w-lg text-base md:text-lg text-ink-soft leading-relaxed">
                Projects across data, machine learning, backend systems, and full-stack development—each one shaped by a different problem, constraint, or idea I wanted to explore.
              </p>

              {/* Arrow controls */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  aria-label="Previous project"
                  onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="group h-10 w-10 rounded-full border border-rule-strong flex items-center justify-center transition-all duration-200 hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-30 disabled:pointer-events-none"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <span className="numeral text-sm tabular-nums text-ink-mute select-none">
                  {String(activeIndex + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(filteredProjects.length).padStart(2, "0")}
                </span>
                <button
                  aria-label="Next project"
                  onClick={() => scrollTo(Math.min(filteredProjects.length - 1, activeIndex + 1))}
                  disabled={activeIndex === filteredProjects.length - 1}
                  className="group h-10 w-10 rounded-full border border-rule-strong flex items-center justify-center transition-all duration-200 hover:border-ink hover:bg-ink hover:text-paper disabled:opacity-30 disabled:pointer-events-none"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveIndex(0);
                  }}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    selectedCategory === category
                      ? "border-ink bg-ink text-paper"
                      : "border-rule text-ink-soft hover:border-ink hover:text-ink"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Carousel track ── */}
      <div className="container-editorial">
        <div
          ref={trackRef}
          onScroll={onScroll}
          onMouseDown={onMouseDown}
          onMouseMove={isDragging ? onMouseMove : undefined}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
            paddingLeft: 0,
            paddingRight: 0,
          }}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 select-none"
        >
        <AnimatePresence initial={false} mode="popLayout">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i + 1}
              isActive={i === activeIndex}
              onClick={() => scrollTo(i)}
            />
          ))}
        </AnimatePresence>

          {/* End spacer so last card can fully snap to centre-left */}
          <div className="shrink-0 w-8 md:w-16" aria-hidden />
        </div>
      </div>

      {/* ── Progress dots ── */}
      <div className="container-editorial mt-8 flex items-center gap-2">
        {filteredProjects.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to project ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={[
              "rounded-full transition-all duration-300",
              i === activeIndex
                ? "w-5 h-1.5 bg-ink"
                : "w-1.5 h-1.5 bg-rule-strong hover:bg-ink-mute",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Single project card — compact editorial tile
   ============================================================ */
function ProjectCard({
  project,
  index,
  isActive,
  onClick,
}: {
  project: ProjectEntry;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const metric = extractMetric(project);

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) onClick();
      }}
    >
      <DialogTrigger asChild>
        <motion.article
          layout
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className={[
            "shrink-0 snap-start flex flex-col bg-paper-raised",
            // Card width: ~85vw on mobile (so you can see the next card peeking), capped at 320px; wider on desktop
            "w-[min(85vw,20rem)] sm:w-[min(52vw,21rem)] md:w-[min(36vw,22rem)] lg:w-80",
            "rounded-2xl overflow-hidden border transition-[border-color,box-shadow,transform] duration-300 cursor-pointer",
            isActive
              ? "border-ink/25 shadow-[0_16px_34px_-24px_rgba(0,0,0,0.35)] dark:shadow-[0_22px_42px_-30px_rgba(0,0,0,0.92)]"
              : "border-rule hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_14px_28px_-22px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_38px_-28px_rgba(0,0,0,0.88)]",
          ].join(" ")}
        >
      {/* ── Illustration pane ── */}
      <div className="relative w-full overflow-hidden bg-paper-sunken shrink-0" style={{ aspectRatio: "16/9" }}>
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <ProjectArt projectId={project.id} />
        </svg>

        {/* Corner index */}
        <span className="absolute bottom-2.5 right-3 numeral text-[10px] tabular-nums text-ink-mute/60 select-none">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      {/* ── Text pane ── */}
      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 bg-paper">

        {/* Row 1: category eyebrow */}
        <p className="font-mono-label text-[9px] uppercase tracking-[0.2em] text-ink-soft">
          {project.category.split(" · ")[0]}
        </p>

        {/* Row 2: title */}
        <h3 className="mt-1.5 font-display text-[1.1rem] leading-[1.2] tracking-[-0.018em] text-ink font-medium">
          {project.title}
        </h3>

        {/* Row 3: tagline — one-line, muted */}
        <p className="mt-1.5 text-[12px] text-ink-soft leading-snug line-clamp-1">
          {project.tagline}
        </p>

        {/* Thin rule */}
        <div className="my-3.5 h-px bg-rule" />

        {/* Row 4: metric OR outcome snippet */}
        {metric && metric.value !== "•" ? (
          <div className="flex items-baseline gap-2">
            <span className="numeral font-display font-semibold text-ink text-[1.625rem] leading-none tracking-[-0.03em]">
              {metric.value}
            </span>
            <span className="font-mono-label text-[9px] uppercase tracking-[0.13em] text-ink-mute leading-snug max-w-[9rem]">
              {metric.caption.slice(0, 48)}
            </span>
          </div>
        ) : (
          <p className="text-[12px] text-ink-soft leading-snug line-clamp-2">
            {project.outcome}
          </p>
        )}

        {/* Row 5: stack pills — push to bottom */}
        <div className="mt-auto pt-3.5 flex flex-wrap gap-1">
          {project.stack.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-sm border border-rule px-1.5 py-0.5 font-mono-label text-[8px] uppercase tracking-[0.1em] text-ink-soft/90"
            >
              {s}
            </span>
          ))}
          {project.stack.length > 3 && (
            <span className="font-mono-label text-[8px] text-ink-mute/50 self-center pl-0.5">
              +{project.stack.length - 3}
            </span>
          )}
        </div>

        {/* Row 6: code link */}
        {project.codeHref && (
          <a
            href={project.codeHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-2.5 inline-flex items-center gap-1 font-mono-label text-[9px] uppercase tracking-[0.15em] text-ink-soft hover:text-ink transition-colors duration-200 self-start group"
          >
            <span>Code</span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
              ↗
            </span>
          </a>
        )}
      </div>
    </motion.article>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
          <DialogDescription>{project.category}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-5">
          <div className="rounded-3xl bg-paper p-5 border border-rule">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-mute">Problem</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.problem}</p>
          </div>

          <div className="rounded-3xl bg-paper p-5 border border-rule">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-mute">Approach</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.approach}</p>
          </div>

          <div className="rounded-3xl bg-paper p-5 border border-rule">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-mute">Outcome</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.outcome}</p>
          </div>

          <div className="rounded-3xl bg-paper p-5 border border-rule">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-mute">Engineering highlights</p>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-ink-soft">
              {project.engineering.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.1rem] text-ink">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="mt-6 gap-3">
          {project.codeHref ? (
            <a
              href={project.codeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90"
            >
              View code
            </a>
          ) : null}
          <DialogClose asChild>
            <button className="inline-flex items-center justify-center rounded-full border border-rule px-5 py-3 text-sm font-semibold text-ink transition hover:bg-ink/5">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ============================================================
   Project-specific SVG illustrations (unchanged from before)
   ============================================================ */
function ProjectArt({ projectId }: { projectId: string }) {
  const stroke = "#5C5C58";
  const accent = "#2D3028";
  const alert = "#8B4F26";

  switch (projectId) {
    case "fraud-detection":
      return <FraudArt stroke={stroke} accent={accent} alert={alert} />;
    case "nlp-content-modelling":
      return <NlpArt stroke={stroke} accent={accent} />;
    case "textile-db":
      return <DatabaseArt stroke={stroke} accent={accent} />;
    case "ecommerce-app":
      return <EcommerceArt stroke={stroke} accent={accent} />;
    case "book-to-playlist":
      return <PlaylistArt stroke={stroke} accent={accent} />;
    case "cryptozombies":
      return <BlockchainArt stroke={stroke} accent={accent} alert={alert} />;
    case "titanfund":
      return <DashboardArt stroke={stroke} accent={accent} alert={alert} />;
    default:
      return null;
  }
}

/* ---------- 1. Fraud Detection ---------- */
function FraudArt({ stroke, accent, alert }: { stroke: string; accent: string; alert: string }) {
  const sources = Array.from({ length: 6 }).map((_, i) => ({ x: 30 + i * 18, y: 40 + (i % 3) * 14 }));
  return (
    <g>
      {sources.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="3" fill={accent} fillOpacity={i === 2 || i === 4 ? 0.8 : 0.25} stroke={accent} strokeWidth="0.6" />
          <path d={`M ${s.x} ${s.y} C ${s.x + 40} ${s.y}, 130 130, 180 150`} stroke={i === 2 || i === 4 ? alert : stroke} strokeWidth={i === 2 || i === 4 ? 1.2 : 0.6} fill="none" strokeDasharray={i === 2 || i === 4 ? "4 3" : "none"} opacity={i === 2 || i === 4 ? 0.95 : 0.55} />
        </g>
      ))}
      <circle cx="180" cy="150" r="22" fill="none" stroke={accent} strokeWidth="1.2" />
      <circle cx="180" cy="150" r="14" fill={accent} fillOpacity="0.08" stroke={accent} strokeWidth="0.8" />
      <text x="180" y="154" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={accent} letterSpacing="0.5">ML</text>
      <path d="M 200 150 L 320 90" stroke={stroke} strokeWidth="0.7" fill="none" />
      <path d="M 200 150 L 320 210" stroke={alert} strokeWidth="1.4" fill="none" strokeDasharray="4 3" />
      <rect x="320" y="78" width="55" height="24" stroke={accent} strokeWidth="0.9" fill="none" rx="2" />
      <text x="347" y="93" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={accent}>CLEAN ✓</text>
      <rect x="320" y="198" width="55" height="24" stroke={alert} strokeWidth="1.2" fill={alert} fillOpacity="0.08" rx="2" />
      <text x="347" y="213" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={alert} letterSpacing="0.5">FRAUD ⚠</text>
      <text x="30" y="280" fontFamily="ui-monospace, monospace" fontSize="7" fill={stroke} letterSpacing="0.6">1M+ TX / 89% PRECISION</text>
    </g>
  );
}

/* ---------- 2. NLP / Document Intelligence ---------- */
function NlpArt({ stroke, accent }: { stroke: string; accent: string }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (<rect key={i} x={50 + i * 14} y={50 - i * 8} width="120" height="150" stroke={stroke} strokeWidth="0.5" fill="none" opacity={0.35 + i * 0.15} />))}
      <rect x="92" y="26" width="120" height="150" stroke={accent} strokeWidth="0.9" fill="#FFFFFF" fillOpacity="0.6" />
      {Array.from({ length: 9 }).map((_, i) => (<line key={i} x1={100} y1={38 + i * 14} x2={200 - (i === 4 ? 50 : i === 6 ? 30 : 0)} y2={38 + i * 14} stroke={i === 4 || i === 6 ? accent : stroke} strokeWidth={i === 4 || i === 6 ? 1.1 : 0.5} opacity={i === 4 || i === 6 ? 0.95 : 0.6} />))}
      <rect x="100" y="50" width="60" height="8" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="0.5" />
      <rect x="100" y="92" width="40" height="8" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="0.5" />
      <line x1="92" y1="100" x2="212" y2="100" stroke={accent} strokeWidth="1.5" strokeDasharray="3 2" opacity="0.9" />
      <text x="240" y="40" fontFamily="ui-monospace, monospace" fontSize="6.5" fill={stroke} letterSpacing="0.4">EXTRACTED:</text>
      {[{ k: "type", v: "INVOICE" }, { k: "vendor", v: "ACME CO." }, { k: "total", v: "$12,480" }, { k: "date", v: "2024-03-14" }, { k: "category", v: "OPEX" }].map((row, i) => (<g key={row.k}><text x="240" y={62 + i * 18} fontFamily="ui-monospace, monospace" fontSize="6.5" fill={stroke} letterSpacing="0.4">{row.k}:</text><text x="280" y={62 + i * 18} fontFamily="ui-monospace, monospace" fontSize="6.5" fill={accent} fontWeight="500" letterSpacing="0.4">{row.v}</text></g>))}
      <path d="M 212 56 C 226 56, 226 62, 240 62" stroke={accent} strokeWidth="0.6" fill="none" opacity="0.7" />
      <path d="M 212 100 C 226 100, 226 98, 240 98" stroke={accent} strokeWidth="0.6" fill="none" opacity="0.7" />
      <path d="M 212 152 C 226 152, 226 134, 240 134" stroke={accent} strokeWidth="0.6" fill="none" opacity="0.7" />
    </g>
  );
}

/* ---------- 3. Textile DB ---------- */
function DatabaseArt({ stroke, accent }: { stroke: string; accent: string }) {
  return (
    <g stroke={stroke} strokeWidth="0.8" fill="none">
      <g><rect x="40" y="50" width="110" height="80" stroke={accent} strokeWidth="1" fill="#FFFFFF" fillOpacity="0.4" /><rect x="40" y="50" width="110" height="18" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" /><text x="46" y="62" fontFamily="ui-monospace, monospace" fontSize="7" fill={accent} fontWeight="600">orders</text>{["order_id  ◆", "customer_id", "total", "status"].map((row, i) => (<g key={row}><line x1="40" y1={68 + (i + 1) * 14} x2="150" y2={68 + (i + 1) * 14} stroke={stroke} strokeWidth="0.4" opacity="0.6" /><text x="46" y={78 + i * 14} fontFamily="ui-monospace, monospace" fontSize="6" fill={i === 0 ? accent : stroke} letterSpacing="0.3">{row}</text></g>))}</g>
      <g><rect x="240" y="40" width="115" height="100" stroke={accent} strokeWidth="1" fill="#FFFFFF" fillOpacity="0.4" /><rect x="240" y="40" width="115" height="18" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" /><text x="246" y="52" fontFamily="ui-monospace, monospace" fontSize="7" fill={accent} fontWeight="600">inventory</text>{["sku  ◆", "name", "qty", "supplier_id", "price"].map((row, i) => (<g key={row}><line x1="240" y1={58 + (i + 1) * 14} x2="355" y2={58 + (i + 1) * 14} stroke={stroke} strokeWidth="0.4" opacity="0.6" /><text x="246" y={68 + i * 14} fontFamily="ui-monospace, monospace" fontSize="6" fill={i === 0 ? accent : stroke} letterSpacing="0.3">{row}</text></g>))}</g>
      <g><rect x="135" y="200" width="125" height="80" stroke={accent} strokeWidth="1" fill="#FFFFFF" fillOpacity="0.4" /><rect x="135" y="200" width="125" height="18" fill={accent} fillOpacity="0.12" stroke={accent} strokeWidth="1" /><text x="141" y="212" fontFamily="ui-monospace, monospace" fontSize="7" fill={accent} fontWeight="600">suppliers</text>{["supplier_id  ◆", "name", "country"].map((row, i) => (<g key={row}><line x1="135" y1={218 + (i + 1) * 14} x2="260" y2={218 + (i + 1) * 14} stroke={stroke} strokeWidth="0.4" opacity="0.6" /><text x="141" y={228 + i * 14} fontFamily="ui-monospace, monospace" fontSize="6" fill={i === 0 ? accent : stroke} letterSpacing="0.3">{row}</text></g>))}</g>
      <path d="M 150 92 C 195 92, 195 90, 240 90" stroke={accent} strokeWidth="0.9" strokeDasharray="3 2" opacity="0.7" />
      <text x="178" y="86" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.3">FK</text>
      <path d="M 297 140 C 297 170, 230 170, 230 200" stroke={accent} strokeWidth="0.9" strokeDasharray="3 2" opacity="0.7" />
      <text x="260" y="172" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.3">FK</text>
      <text x="40" y="28" fontFamily="ui-monospace, monospace" fontSize="6.5" fill={stroke} letterSpacing="0.5">NORMALIZED · 3NF · LIVE TX</text>
    </g>
  );
}

/* ---------- 4. E-Commerce ---------- */
function EcommerceArt({ stroke, accent }: { stroke: string; accent: string }) {
  return (
    <g stroke={stroke} strokeWidth="0.8" fill="none">
      <rect x="40" y="40" width="320" height="220" stroke={accent} strokeWidth="1" fill="#FFFFFF" fillOpacity="0.4" rx="4" />
      <rect x="40" y="40" width="320" height="22" fill={accent} fillOpacity="0.1" stroke={accent} strokeWidth="1" rx="4" />
      {[0, 1, 2].map((i) => (<circle key={i} cx={52 + i * 9} cy={51} r="2" fill={stroke} stroke="none" opacity="0.6" />))}
      <rect x="85" y="46" width="200" height="10" stroke={stroke} strokeWidth="0.5" fill="#FFFFFF" fillOpacity="0.6" rx="2" />
      <text x="92" y="53" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.3">shop.example.com</text>
      <text x="52" y="82" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="13" fill={accent} fontStyle="italic" fontWeight="500" stroke="none">Shop.</text>
      <g transform="translate(330, 75)"><path d="M -8 -2 L -5 -2 L -3 6 L 8 6 L 10 -2 L -3 -2" stroke={accent} strokeWidth="0.9" fill="none" /><circle cx="-1" cy="10" r="1.2" fill={accent} stroke="none" /><circle cx="6" cy="10" r="1.2" fill={accent} stroke="none" /><circle cx="8" cy="-4" r="4" fill={accent} stroke="none" /><text x="8" y="-2" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="5" fill="#FFFFFF" stroke="none" letterSpacing="0.2">3</text></g>
      {[{ x: 60, y: 100, label: "Bag" }, { x: 165, y: 100, label: "Watch" }, { x: 60, y: 175, label: "Shoes" }, { x: 165, y: 175, label: "Lamp" }].map((p, i) => (<g key={i}><rect x={p.x} y={p.y} width="90" height="60" stroke={stroke} strokeWidth="0.6" fill="#FFFFFF" fillOpacity="0.5" rx="2" /><rect x={p.x + 6} y={p.y + 6} width="78" height="32" stroke={stroke} strokeWidth="0.4" fill={accent} fillOpacity={0.06 + i * 0.04} rx="1" /><circle cx={p.x + 45} cy={p.y + 22} r="8" stroke={accent} strokeWidth="0.5" fill="none" opacity="0.6" /><text x={p.x + 6} y={p.y + 50} fontFamily="ui-monospace, monospace" fontSize="5.5" fill={accent} letterSpacing="0.3" fontWeight="500">{p.label}</text><text x={p.x + 78} y={p.y + 50} textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.3">${(i + 1) * 24}.99</text></g>))}
      <g transform="translate(280, 175)"><rect x="0" y="0" width="65" height="22" stroke={accent} strokeWidth="0.8" fill={accent} fillOpacity="0.06" rx="3" /><text x="6" y="9" fontFamily="ui-monospace, monospace" fontSize="5" fill={stroke} letterSpacing="0.3">FIREBASE</text><text x="6" y="17" fontFamily="ui-monospace, monospace" fontSize="5" fill={accent} letterSpacing="0.3" fontWeight="500">AUTH ✓</text></g>
    </g>
  );
}

/* ---------- 5. Book to Playlist ---------- */
function PlaylistArt({ stroke, accent }: { stroke: string; accent: string }) {
  return (
    <g stroke={stroke} strokeWidth="0.8" fill="none">
      <g>
        <path d="M 30 80 L 110 70 L 110 200 L 30 210 Z" stroke={accent} strokeWidth="1" fill="#FFFFFF" fillOpacity="0.5" />
        <path d="M 190 80 L 110 70 L 110 200 L 190 200 Z" stroke={accent} strokeWidth="1" fill="#FFFFFF" fillOpacity="0.4" />
        <line x1="110" y1="70" x2="110" y2="200" stroke={accent} strokeWidth="0.6" />
        {Array.from({ length: 8 }).map((_, i) => (<line key={i} x1={40 + (i % 4 === 3 ? 8 : 0)} y1={90 + i * 13} x2={100 - (i % 4 === 2 ? 6 : 0)} y2={90 + i * 13} stroke={stroke} strokeWidth="0.4" opacity="0.55" />))}
        {Array.from({ length: 8 }).map((_, i) => (<line key={`r${i}`} x1={120} y1={90 + i * 13} x2={180 - (i % 3 === 1 ? 10 : 0)} y2={90 + i * 13} stroke={stroke} strokeWidth="0.4" opacity="0.55" />))}
        <rect x="50" y="92" width="50" height="8" fill={accent} fillOpacity="0.18" stroke={accent} strokeWidth="0.4" />
        <text x="55" y="98" fontFamily="ui-monospace, monospace" fontSize="5" fill={accent} letterSpacing="0.3">MELANCHOLY</text>
      </g>
      <g>
        <path d="M 200 135 C 230 135, 235 135, 250 135" stroke={accent} strokeWidth="1.2" fill="none" />
        <path d="M 248 131 L 254 135 L 248 139" stroke={accent} strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="208" y="118" width="34" height="14" stroke={accent} strokeWidth="0.7" fill={accent} fillOpacity="0.06" rx="2" />
        <text x="225" y="128" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={accent} letterSpacing="0.4">LLM</text>
      </g>
      <g transform="translate(260, 110)">
        {Array.from({ length: 5 }).map((_, i) => (<line key={i} x1="0" y1={i * 5} x2="120" y2={i * 5} stroke={accent} strokeWidth="0.5" />))}
        <path d="M 6 4 C 12 4, 12 14, 6 14 C 0 14, 0 4, 6 4 Z M 6 14 L 6 22" stroke={accent} strokeWidth="0.9" fill="none" />
        {[{ x: 24, y: 12 }, { x: 40, y: 8 }, { x: 56, y: 14 }, { x: 72, y: 6 }, { x: 88, y: 12 }, { x: 104, y: 4 }].map((n, i) => (<g key={i}><ellipse cx={n.x} cy={n.y} rx="2.5" ry="1.8" fill={accent} stroke="none" transform={`rotate(-20 ${n.x} ${n.y})`} /><line x1={n.x + 2.3} y1={n.y - 0.5} x2={n.x + 2.3} y2={n.y - 9} stroke={accent} strokeWidth="0.7" /></g>))}
        <line x1="48" y1="0" x2="48" y2="20" stroke={accent} strokeWidth="0.4" />
        <line x1="80" y1="0" x2="80" y2="20" stroke={accent} strokeWidth="0.4" />
        <line x1="118" y1="0" x2="118" y2="20" stroke={accent} strokeWidth="0.4" />
        <line x1="121" y1="0" x2="121" y2="20" stroke={accent} strokeWidth="1" />
      </g>
      <text x="30" y="245" fontFamily="ui-monospace, monospace" fontSize="6" fill={stroke} letterSpacing="0.4">BOOK THEMES → LLM → SPOTIFY</text>
      <text x="30" y="255" fontFamily="ui-monospace, monospace" fontSize="6" fill={accent} letterSpacing="0.4" fontWeight="500">REAL-TIME PLAYLIST CURATION</text>
    </g>
  );
}

/* ---------- 6. CryptoZombies ---------- */
function BlockchainArt({ stroke, accent, alert }: { stroke: string; accent: string; alert: string }) {
  const blocks = [{ x: 40, y: 130 }, { x: 110, y: 80 }, { x: 180, y: 130 }, { x: 250, y: 80 }, { x: 320, y: 130 }];
  return (
    <g>
      {blocks.slice(0, -1).map((b, i) => (<line key={i} x1={b.x + 18} y1={b.y + (i % 2 === 0 ? 10 : -10)} x2={blocks[i + 1].x - 18} y2={blocks[i + 1].y + (i % 2 === 0 ? -10 : 10)} stroke={accent} strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />))}
      {blocks.map((b, i) => {
        const isLatest = i === blocks.length - 1;
        return (
          <g key={i}>
            <polygon points={[`${b.x},${b.y - 22}`, `${b.x + 19},${b.y - 11}`, `${b.x + 19},${b.y + 11}`, `${b.x},${b.y + 22}`, `${b.x - 19},${b.y + 11}`, `${b.x - 19},${b.y - 11}`].join(" ")} stroke={isLatest ? alert : accent} strokeWidth={isLatest ? 1.3 : 1} fill={isLatest ? alert : accent} fillOpacity={isLatest ? 0.1 : 0.05} />
            <text x={b.x} y={b.y + 3} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={isLatest ? alert : accent} fontWeight="600" letterSpacing="0.4">#{(1248 + i).toString()}</text>
            <g transform={`translate(${b.x}, ${b.y - 12})`} opacity="0.85"><rect x="-4" y="-2" width="8" height="6" stroke={isLatest ? alert : accent} strokeWidth="0.5" fill="none" /><circle cx="-2" cy="0" r="0.7" fill={isLatest ? alert : accent} stroke="none" /><circle cx="2" cy="0" r="0.7" fill={isLatest ? alert : accent} stroke="none" /></g>
          </g>
        );
      })}
      <g transform="translate(180, 30)"><text x="0" y="0" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fill={stroke} letterSpacing="0.4">ARENA BATTLE</text><path d="M -50 12 L 50 12" stroke={alert} strokeWidth="1" fill="none" /><path d="M -50 8 L -50 16 M 50 8 L 50 16" stroke={alert} strokeWidth="1" fill="none" /><text x="-60" y="15" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={accent} letterSpacing="0.3" fontWeight="500">ZOMBIE A</text><text x="60" y="15" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={accent} letterSpacing="0.3" fontWeight="500">ZOMBIE B</text></g>
      <g transform="translate(30, 230)"><rect x="0" y="0" width="100" height="30" stroke={accent} strokeWidth="0.8" fill={accent} fillOpacity="0.06" rx="3" /><text x="6" y="11" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.3">WALLET</text><text x="6" y="22" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={accent} letterSpacing="0.3" fontWeight="500">0xA1f3...92E4</text><circle cx="92" cy="15" r="4" stroke={accent} strokeWidth="0.5" fill="none" /><path d="M 90 13 L 92 16 L 94 13" stroke={accent} strokeWidth="0.6" fill="none" /></g>
      <g transform="translate(280, 230)"><rect x="0" y="0" width="90" height="30" stroke={accent} strokeWidth="0.8" fill={accent} fillOpacity="0.06" rx="3" /><text x="6" y="11" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.3">CONTRACT</text><text x="6" y="22" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={accent} letterSpacing="0.3" fontWeight="500">SOLIDITY ✓</text></g>
    </g>
  );
}

/* ---------- 7. TitanFund Dashboard ---------- */
function DashboardArt({ stroke, accent, alert }: { stroke: string; accent: string; alert: string }) {
  const candles = [{ x: 30, open: 140, close: 132, up: false }, { x: 50, open: 132, close: 138, up: true }, { x: 70, open: 138, close: 124, up: false }, { x: 90, open: 124, close: 130, up: true }, { x: 110, open: 130, close: 116, up: false }, { x: 130, open: 116, close: 122, up: true }, { x: 150, open: 122, close: 108, up: false }, { x: 170, open: 108, close: 118, up: true }, { x: 190, open: 118, close: 110, up: false }, { x: 210, open: 110, close: 96, up: false }, { x: 230, open: 96, close: 104, up: true }, { x: 250, open: 104, close: 88, up: false }];
  return (
    <g stroke={stroke} strokeWidth="0.8" fill="none">
      <rect x="20" y="20" width="360" height="260" stroke={accent} strokeWidth="1" fill="#FFFFFF" fillOpacity="0.4" rx="3" />
      <rect x="20" y="20" width="360" height="22" stroke={accent} strokeWidth="0.8" fill={accent} fillOpacity="0.08" rx="3" />
      <text x="30" y="34" fontFamily="ui-monospace, monospace" fontSize="6.5" fill={accent} fontWeight="600" letterSpacing="0.5">TITANFUND · PORTFOLIO</text>
      <text x="370" y="34" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="6" fill={stroke} letterSpacing="0.4">LIVE</text>
      <circle cx="355" cy="31" r="2" fill={alert} stroke="none" />
      <g>
        {[60, 100, 140, 180].map((y) => (<line key={y} x1="30" y1={y} x2="280" y2={y} stroke={stroke} strokeWidth="0.3" opacity="0.3" strokeDasharray="2 3" />))}
        {[{ y: 64, v: "+8%" }, { y: 104, v: "+4%" }, { y: 144, v: "0%" }, { y: 184, v: "-4%" }].map((row) => (<text key={row.v} x="286" y={row.y + 2} fontFamily="ui-monospace, monospace" fontSize="5" fill={stroke} letterSpacing="0.3">{row.v}</text>))}
        <line x1="30" y1="144" x2="280" y2="144" stroke={stroke} strokeWidth="0.5" opacity="0.5" />
        {candles.map((c, i) => (<g key={i}><line x1={c.x} y1={c.open - 8} x2={c.x} y2={c.close + 8} stroke={c.up ? accent : alert} strokeWidth="0.6" /><rect x={c.x - 4} y={Math.min(c.open, c.close)} width="8" height={Math.max(Math.abs(c.close - c.open), 2)} fill={c.up ? accent : alert} fillOpacity={c.up ? 0.7 : 0.6} stroke={c.up ? accent : alert} strokeWidth="0.5" /></g>))}
        <path d="M 30 130 L 50 134 L 70 120 L 90 124 L 110 110 L 130 114 L 150 100 L 170 104 L 190 96 L 210 92 L 230 88 L 250 78" stroke={accent} strokeWidth="1.4" fill="none" opacity="0.85" />
      </g>
      <g transform="translate(310, 60)">
        <text x="0" y="0" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.4">RETURN</text>
        <text x="0" y="14" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="20" fill={accent} fontWeight="600" fontStyle="italic">+24.6%</text>
        <text x="0" y="24" fontFamily="ui-monospace, monospace" fontSize="5" fill={alert} letterSpacing="0.3">▲ 3.2 today</text>
        <line x1="0" y1="34" x2="60" y2="34" stroke={stroke} strokeWidth="0.3" opacity="0.5" />
        <text x="0" y="48" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.4">SHARPE</text>
        <text x="0" y="62" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" fill={accent} fontWeight="600" fontStyle="italic">1.84</text>
        <line x1="0" y1="72" x2="60" y2="72" stroke={stroke} strokeWidth="0.3" opacity="0.5" />
        <text x="0" y="86" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={stroke} letterSpacing="0.4">DRAWDOWN</text>
        <text x="0" y="100" fontFamily="Cormorant Garamond, Georgia, serif" fontSize="16" fill={alert} fontWeight="600" fontStyle="italic">-6.2%</text>
      </g>
      <g transform="translate(30, 240)">
        {["1D", "1W", "1M", "1Y", "ALL"].map((label, i) => (<g key={label}><rect x={i * 38} y="0" width="32" height="18" stroke={i === 2 ? accent : stroke} strokeWidth="0.6" fill={i === 2 ? accent : "none"} fillOpacity={i === 2 ? 0.1 : 0} rx="2" /><text x={i * 38 + 16} y="11" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="5.5" fill={i === 2 ? accent : stroke} letterSpacing="0.3" fontWeight={i === 2 ? "600" : "400"}>{label}</text></g>))}
      </g>
    </g>
  );
}

/* ---------- Metric extractor ---------- */
function extractMetric(project: ProjectEntry): { value: string; caption: string } | null {
  // Prefer explicit metric fields when present (set in `portfolio-data.ts`)
  if ((project as any).metric !== undefined && (project as any).metric !== null) {
    const raw = (project as any).metric;
    const value = typeof raw === "number" ? String(raw) : raw;
    const caption = (project as any).metricDescription || project.outcome?.split(/[.]/)[0] || "";
    return { value, caption };
  }
  for (const note of project.engineering) {
    const percentMatch = note.match(/(\d+%)/);
    if (percentMatch) return { value: percentMatch[1], caption: project.outcome.split(/[.]/)[0] };
  }
  for (const note of project.engineering) {
    const numMatch = note.match(/(\d+(?:,\d{3})?(?:\.\d+)?(?:K|M|\+)?)\b/);
    if (numMatch) {
      const raw = numMatch[1];
      // Accept only large/meaningful metrics: contains K/M, has decimal, or >= 10
      const hasKMorM = /[KM]/i.test(raw);
      const hasDecimal = /\./.test(raw);
      const numeric = parseFloat(raw.replace(/[+,KMkm]/g, ""));
      if (hasKMorM || hasDecimal || (!Number.isNaN(numeric) && numeric >= 10)) {
        return { value: raw, caption: project.outcome.split(/[.]/)[0] };
      }
      // otherwise ignore small counts (e.g. '5+' document formats) and keep searching
    }
  }
  if (project.outcome) return { value: "•", caption: project.outcome.split(".")[0] };
  return null;
}
