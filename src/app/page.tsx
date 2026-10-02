import { SiteNav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { Marquee } from "@/components/portfolio/marquee";
import { About } from "@/components/portfolio/about";
import { Projects } from "@/components/portfolio/projects";
import { Experience } from "@/components/portfolio/experience";
import { Skils } from "@/components/portfolio/expertise";
import { Education } from "@/components/portfolio/education";
import { Contact } from "@/components/portfolio/contact";
import { profile } from "@/lib/portfolio-data";

/* Marquee content — drawn from the signature stack + skill groups.
   Mirrors the engineer-showcase scrolling skills banner. */
const marqueeItems = [
  "SQL",
  "Python",
  "GCP",
  "BigQuery",
  "Vertex AI",
  "Dataflow",
  "Pub/Sub",
  "PostgreSQL",
  "Oracle DB",
  "ETL Pipelines",
  "LLM / RAG",
  "PyTorch",
  "Neo4j",
  "Tableau",
  "NLP",
  "Docker",
];

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="relative">
        <Hero />
        <Marquee
          items={marqueeItems}
          stats={profile.stats}
          duration={80}
        />
        <About />
        <Experience />
        <Projects />
        <Skils />
        <Education />
        <Contact />
      </main>
    </>
  );
}
