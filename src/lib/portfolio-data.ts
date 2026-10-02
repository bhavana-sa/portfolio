/**
 * Portfolio content for Bhavana Sudhakar Athavane — Data Engineer
 */

export const profile = {
  name: "Bhavana Sudhakar Athavane",
  firstName: "Bhavana Sudhakar",
  lastName: "Athavane",
  role: "Data / SoftwareEngineer",
  // Single line positioning statement used across hero / meta / footer
  positioning:
    "I build reliable data pipelines, cloud platforms, and AI-powered systems designed to scale from raw data to production.",
  // Long-form manifesto used in About
  manifesto: [
    "I’ve always been drawn to the part of engineering that sits between a messy problem and a system people can actually depend on. I enjoy taking something ambiguous, understanding how the pieces fit together, and turning it into something structured, useful, and maintainable.",
    "That instinct has shaped how I’ve approached every stage of my work—from enterprise platforms and data systems to AI-driven applications. I care about the details that are easy to overlook: whether a system is understandable six months later, whether an interface makes sense to the person using it, whether a pipeline fails gracefully, and whether the solution actually solves the problem it was built for.",
    "Working across industry and academia has also taught me that good engineering is rarely about choosing the most complicated solution. It is about asking better questions, learning quickly, communicating clearly, and knowing when simplicity is the better design decision.",
    "I’m still early in my career, but that is the part I want to keep with me as the systems get bigger and the problems get harder: build with curiosity, be deliberate with complexity, and leave things better than I found them.",
  ],
  location: "Fullerton, California, USA",
  email: "bhavanasathavane@gmail.com",
  phone: "+1 (657) 751-9230",
  availability: "Open to data platform / AI engineering roles",
  availabilityNote: "Open to full-time roles in data platforms, cloud, and AI engineering",
  archetype: "developer",
  seniority: "mid",
  focusAreas: ["AI", "Cloud Computing", "Fintech", "Telecom"],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bhavana-athavane", handle: "bhavana-athavane" },
    { label: "GitHub", href: "https://github.com/Bhavanasa1902", handle: "Bhavanasa1902" },
    { label: "Resume", href: "/resume.pdf", handle: "Download PDF" },
  ],
  // Hero stat band — verified metrics from the source portfolio
  stats: [
    { value: "4", label: "Shipped data & AI projects", note: "Products" },
    { value: "8+", label: "Production data pipelines", note: "Pipelines" },
    { value: "500K+", label: "Transactions & telemetry processed", note: "Scale" },
    { value: "3", label: "Years in production systems", note: "Experience" },
  ],
  // Three positioning pillars shown as "Principles"
  principles: [
    {
      title: "Reliable systems",
      body: "Backend and ETL flows engineered to avoid surprises, stay observable, and scale with demand rather than against it.",
    },
    {
      title: "Production-ready foundations",
      body: "Databases, APIs, and cloud infrastructure designed so teams can ship analytics, ML, and platform features with confidence, not caveats.",
    },
    {
      title: "Impact-first work",
      body: "Outcomes over activity: faster queries, lower latency, cleaner architecture — measured, not asserted.",
    },
  ],
  // Quick tech tags surfaced in hero
  signatureStack: [
    "SQL",
    "Python",
    "GCP",
    "Vertex AI",
    "BigQuery",
    "REST APIs",
    "Docker",
    "Flask",
    "React",
    "ETL",
    "Oracle",
    "PostgreSQL",
  ],
};

export type ExperienceRole = {
  title: string;
  period: string;
  summary: string;
  highlights: string[];
  stack?: string[];
};

export type ExperienceEntry = {
  id: string;
  org: string;
  location: string;
  // Overall span covering every role at this org
  period: string;
  current?: boolean;
  kind: "Full-time" | "Co-op" | "Academic" | "Trainee";
  // Short paragraph describing the relationship with the org
  summary: string;
  // One or more distinct roles held at this org
  roles: ExperienceRole[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "csuf-ta",
    org: "California State University, Fullerton",
    location: "Fullerton, CA",
    period: "Jan 2026 — May 2026",
    current: true,
    kind: "Academic",
    summary:
      "Graduate teaching assistant for an undergraduate business analytics course — bridging spreadsheet-first thinking and structured query work for fifty-plus students per semester.",
    roles: [
      {
        title: "Graduate Teaching Assistant — ISDS 361B",
        period: "Jan 2026 — May 2026",
        summary:
          "Running weekly labs, holding office hours, and grading structured assignments for a business analytics cohort moving from Excel into SQL.",
        highlights: [
          "Mentored 50+ students per semester across Excel, SQL, and business analytics, achieving a 95% assignment completion rate and improving average quiz scores by 18% through targeted labs and feedback.",
          "Designed and led weekly labs covering VLOOKUP, INDEX/MATCH, Pivot Tables, Power Query, and SQL — moving students from spreadsheet manipulation toward query-based analysis.",
          "Helped learners translate ambiguous business questions into structured, queryable analysis with measurable success criteria.",
        ],
        stack: ["SQL", "Excel", "Power Query", "Tableau"],
      },
    ],
  },
  {
    id: "nokia",
    org: "Nokia",
    location: "Sunnyvale, CA",
    period: "May 2025 — Dec 2025",
    kind: "Co-op",
    summary:
      "Two back-to-back co-op rotations on Nokia's AI inference and fault-diagnostics platform — first implementing the AI workflow, then strengthening the database layer underneath.",
    roles: [
      {
        title: "Platform Engineering Co-op — AI Systems",
        period: "May 2025 — Aug 2025",
        summary:
          "Summer co-op focused on Nokia's AI-assisted fault diagnostics — Vertex AI classification, real-time telemetry pipelines, and LLM-powered incident search.",
        highlights: [
          "Built an AI-powered fault diagnostic pipeline on Google Cloud Vertex AI achieving 82% fault classification accuracy; contributed to a 41% reduction in Mean Time to Resolution (MTTR).",
          "Built log-processing pipelines on GCP (Pub/Sub → Dataflow → BigQuery) handling real-time telemetry, cutting manual triage effort by ~80% and enabling automated alerting.",
          "Integrated LLM-powered semantic search using a RAG architecture across CMDB, JIRA, and knowledge bases, reducing average incident resolution time by over 35%.",
        ],
        stack: ["GCP", "Vertex AI", "Pub/Sub", "Dataflow", "BigQuery", "LLM", "RAG"],
      },
      {
        title: "Database Software Engineer — Co-op",
        period: "Sep 2025 — Dec 2025",
        summary:
          "Fall rotation focused on the database layer of the same AI inference platform — schema design, ETL consolidation, and Python service integrations.",
        highlights: [
          "Designed and optimized relational database schemas across Oracle, MySQL, and PostgreSQL for AI-driven backend systems, reducing average query latency by 55% through indexing, normalization, and query tuning.",
          "Consolidated 3 redundant ETL scheduled jobs into a single stored procedure pipeline, materially cutting average batch completion time and operational surface area.",
          "Built Python REST API integrations connecting backend services to OLTP databases, reducing average DB round-trips per request by ~40%.",
        ],
        stack: ["PostgreSQL", "MySQL", "Python", "REST", "Stored Procedures"],
      },
    ],
  },
  {
    id: "cognizant",
    org: "Cognizant",
    location: "Bangalore, India",
    period: "Mar 2022 — Aug 2024",
    kind: "Full-time",
    summary:
      "Two and a half years across two roles — first automating ETL and reporting as a trainee, then taking on broader Oracle DB performance and data-quality responsibilities.",
    roles: [
      {
        title: "Programmer Analyst Trainee",
        period: "Mar 2022 — Dec 2023",
        summary:
          "First role out of undergrad — automation and reporting across internal ETL workflows and executive dashboards for multiple business units.",
        highlights: [
          "Automated 8 internal ETL workflows using Python and SQL, reducing end-to-end processing time by ~20% and freeing ~15 hours/week of analyst time.",
          "Performed data validation across Oracle DB and SQL Server for 4 production pipelines; built and delivered 6 executive Tableau dashboards tracking KPIs across revenue, operations, and compliance.",
        ],
        stack: ["Python", "SQL", "Oracle DB", "SQL Server", "Tableau"],
      },
      {
        title: "Senior Systems Engineer",
        period: "Dec 2023 — Aug 2024",
        summary:
          "Promoted role focused on Oracle DB performance across three production systems and a cross-system validation framework used by the data quality team.",
        highlights: [
          "Led an Oracle DB performance engineering initiative across 3 production systems, improving overall throughput by 30% through query analysis, index rebuilding, and partition pruning.",
          "Developed an automated SQL data-validation framework in Python and PL/SQL spanning Oracle DB and SQL Server, catching ~200 cross-system discrepancies per month and reducing reconciliation time by 20%.",
        ],
        stack: ["Oracle DB", "SQL Server", "PL/SQL", "Python"],
      },
    ],
  },
];

export type ProjectEntry = {
  id: string;
  title: string;
  category: string;
  tagline: string;
  // One-line articulation of the problem solved
  problem: string;
  // Approach / architecture narrative
  approach: string;
  // Quantified or qualitative outcome
  outcome: string;
  // Engineering thinking — what makes it interesting
  engineering: string[];
  stack: string[];
  tags: string[];
  codeHref?: string;
  featured: boolean;
  // Optional UX fields
  subtitle?: string;
  metric?: number | string;
  metricDescription?: string;
  bottomLink?: string;
};

export const projects: ProjectEntry[] = [
  {
    id: "fraud-detection",
    title: "Financial Fraud Detection Pipeline",
    category: "ANOMALY DETECTION",
    tagline: "Ensemble ML system for detecting and explaining suspicious transactions",
    metric: 0.9497,
    metricDescription: "ROC-AUC ACROSS 200K+ TRANSACTIONS",
    problem:
      "Flag high-risk transactions in real time without flooding analysts with false positives — a classic precision-vs-recall tension at scale.",
    approach:
      "Built an ensemble anomaly detection system combining XGBoost, Isolation Forest, and a PyTorch autoencoder, served through a Flask REST API. Used Neo4j graph analytics to surface relationship patterns between accounts and transactions that single-model approaches miss, with SHAP for model explainability. Added automated email notifications on every transaction, alerting users whether it was flagged as suspicious or processed successfully.",
    outcome:
      "Achieved 0.9497 ROC-AUC across 200K+ transactions, with SHAP-based explanations attached to every flagged transaction and automated email alerts closing the loop between detection and user response.",
    engineering: [
      "Built a 3-model ensemble (XGBoost, Isolation Forest, PyTorch autoencoder) to balance precision and recall across imbalanced fraud data.",
      "Applied Neo4j graph analytics to detect relationship-based fraud patterns beyond individual transaction features.",
      "Integrated SHAP explainability so every fraud prediction ships with a human-readable reason.",
      "Built automated email notifications for every transaction — flagged or clean — closing the loop between model output and user response.",
    ],
    stack: ["XGBoost", "Isolation Forest", "PyTorch", "SHAP", "Neo4j", "Flask", "Python"],
    tags: ["Data & ML", "Backend & DB"],
    codeHref: "https://github.com/Bhavanasa1902/AI-powered-Financial-Fraud-Detection-Anomaly-Analysis",
    featured: true,
  },
  {
    id: "nlp-content-modelling",
    title: "Document Intelligence with NLP",
    category: "DOCUMENT INTELLIGENCE",
    tagline: "Turning unstructured documents into structured, queryable data",
    problem:
      "Manual categorization of diverse document formats was slow, inconsistent, and impossible to scale across a large, varied document corpus.",
    approach:
      "Developed a document intelligence pipeline using a CNN for image-based layout detection and document-type classification, paired with OCR to extract and structure unstructured text from heterogeneous formats. Extracted text was then processed with NLP to classify content into structured metadata.",
    outcome:
      "Automated categorization and structured data extraction across 5+ document formats, replacing manual review with an end-to-end CNN + OCR + NLP pipeline.",
    engineering: [
      "Trained a CNN to detect document layout and classify document type from scanned images",
      "Built an OCR pipeline to extract and clean text from heterogeneous document formats",
      "Applied NLP to classify extracted text into structured metadata",
      "Processed 5+ distinct document formats through the full pipeline",
    ],
    stack: ["NLP", "OCR", "TensorFlow"],
    tags: ["Data & ML", "Backend & DB"],
    codeHref: "https://github.com/Bhavanasa1902/nlp-content-modelling",
    featured: true,
  },
  {
    id: "textile-db",
    title: "Textile Inventory & Order System",
    category: "RELATIONAL DATABASE",
    tagline: "Normalized schema for inventory, orders, and supply chain",
    problem:
      "Designed for a hypothetical textile business needing a single source of truth for orders, inventory, and supplier data — with real-time consistency and analytical reporting on top.",
    approach:
      "Designed a normalized schema for orders, inventory, supplier tracking, and payment workflows as a personal project (no external payment processing integrated). Built stored procedures to keep stock and pricing consistent in real time, with reporting queries layered for demand forecasting.",
    outcome:
      "A relational system supporting live transactions, enforcing referential integrity across orders, inventory, and suppliers, with built-in demand-forecasting queries for production planning.",
    engineering: [
      "Created a normalized schema for orders, inventory, supplier tracking, and payment workflows",
      "Built stored procedures (PL/SQL) to enforce real-time stock and pricing consistency",
      "Wrote demand-forecasting queries to support production planning decisions",
    ],
    stack: ["Oracle", "PL/SQL", "SQL", "Reporting"],
    tags: ["Backend & DB"],
    bottomLink: "CODE ↗",
    codeHref: "https://github.com/Bhavanasa1902/textile-db",
    featured: true,
  },
  {
    id: "ecommerce-app",
    title: "E-Commerce Web Application (Internship Project)",
    category: "FULL-STACK",
    tagline: "Full shopping experience with persistent cart",
    problem:
      "Design and build a production-style commerce experience — product discovery, authentication, cart, and checkout — with Firebase as the system of record for real-time state management.",
    approach:
      "Engineered a responsive React storefront integrated with Firebase Authentication and Firestore, implementing persistent cart state, dynamic product discovery with multi-category search and filtering, and a checkout flow modeling real transaction logic.",
    outcome:
      "A fully functional e-commerce application demonstrating strong command of frontend architecture, authentication flows, and real-time data synchronization.",
    engineering: [
      "Engineered product discovery with multi-category search and filtering for a responsive browsing experience",
      "Implemented Firebase Authentication and Firestore-backed cart persistence with real-time sync",
      "Built a checkout flow modeling real transaction logic and state management",
    ],
    stack: ["React", "Firebase", "Firestore", "Auth"],
    tags: ["Full-Stack"],
    bottomLink: "CODE ↗",
    codeHref: "https://github.com/Bhavanasa1902/ecommerce-app",
    featured: false,
  },
  {
    id: "book-to-playlist",
    title: "Book to Playlist",
    category: "DATA ENGINEERING / NLP",
    tagline: "Translating narrative themes into music",
    problem:
      "Matching narrative themes to music is a manual, subjective task with no structured way to search and retrieve relevant songs across large book and song datasets.",
    approach:
      "Designed a semantic retrieval pipeline for book-to-music recommendation. Processed and structured raw book and song datasets (descriptions, lyrics, acoustic features, popularity metrics), then generated BERT embeddings to represent thematic and semantic content. Built a FAISS-based vector index for fast nearest-neighbor similarity search at scale, with PCA applied for dimensionality reduction to optimize retrieval performance. Served results through a Flask backend.",
    outcome:
      "A functioning recommendation system that retrieves the top N songs matching a given book's themes, built on structured multi-source datasets and optimized for fast similarity search.",
    engineering: [
      "Processed and structured multi-source datasets (book metadata, song lyrics, acoustic features) for downstream embedding generation",
      "Generated BERT embeddings to represent semantic and thematic content for cross-domain similarity matching",
      "Built a FAISS vector index for scalable nearest-neighbor retrieval",
      "Applied PCA for dimensionality reduction to optimize search performance",
      "Built a Flask backend to serve recommendation results",
    ],
    stack: ["LLM", "React", "Spotify API", "Python"],
    tags: ["LLM", "Full-Stack"],
    codeHref: "https://github.com/Bhavanasa1902/book-to-playlist",
    bottomLink: "CODE ↗",
    featured: false,
  },
  {
    id: "cryptozombies",
    title: "CryptoZombies Arena",
    category: "WEB3 / BLOCKCHAIN",
    tagline: "On-chain arena battles with NFT gameplay",
    problem:
      "Build a fully on-chain game where battles, breeding, marketplace trades, and player rankings all live on Ethereum — not in a centralized database.",
    approach:
      "Extended the CryptoZombies starter contracts into a full-featured NFT game, contributing across smart contract development, frontend implementation, and Web3 integration — including an NFT marketplace, a breeding system with custom naming, a turn-based battle system, and a real-time leaderboard pulling data from blockchain events. Built a responsive HTML/CSS/JavaScript frontend with MetaMask wallet integration for seamless on-chain interaction.",
    outcome:
      "A playable blockchain game with a working NFT marketplace, breeding mechanics, battle system, and live leaderboard — all backed by verifiable on-chain state.",
    engineering: [
      "Extended Solidity smart contracts (Factory → Feeding → Attack → Marketplace) to add NFT marketplace and breeding functionality",
      "Built a real-time leaderboard that ranks players and zombies using live blockchain event data",
      "Integrated MetaMask wallet connection with account switching and persistent connection state",
      "Implemented a turn-based battle system with win/loss tracking and level progression on-chain",
    ],
    stack: ["Solidity", "Web3", "React", "Ethereum"],
    tags: ["WEB3", "Blockchain"],
    codeHref: "https://github.com/Bhavanasa1902/CryptoZombies-Arena",
    bottomLink: "CODE ↗",
    featured: false,
  },
  {
    id: "titanfund",
    title: "TitanFund — Portfolio Analytics",
    category: "BLOCKCHAIN / DATA MODELING",
    tagline: "Real-time, on-chain crowdfunding data model",
    problem:
      "Crowdfunding platforms need transparent, verifiable tracking of contributions and fund withdrawals — without a centralized authority controlling the data or the money.",
    approach:
      "Built a blockchain-based crowdfunding platform where campaign data, contributions, and withdrawal requests are structured and stored on-chain via Solidity smart contracts. Designed the data flow for campaign creation, contribution tracking, and a withdrawal-approval system where contributors vote on fund releases — ensuring every state change is queryable and auditable through on-chain events. Built a Next.js frontend to surface this structured on-chain data to users in real time.",
    outcome:
      "A working platform where campaign, contribution, and withdrawal data is fully structured on-chain, queryable via smart contract state and events, and enforced without reliance on a centralized database.",
    engineering: [
      "Designed on-chain data structures for campaigns, contributions, and withdrawal requests using Solidity",
      "Built a contributor-approval workflow where fund withdrawals require verifiable on-chain votes before release",
      "Queried and surfaced structured blockchain event data through a Next.js frontend",
      "Integrated MetaMask and Web3.js for wallet-based transaction handling",
    ],
    stack: ["React", "Python", "Analytics", "Visualization"],
    tags: ["Analytics", "Dashboard"],
    codeHref: "https://github.com/Bhavanasa1902/TitanFund",
    bottomLink: "CODE ↗",
    featured: false,
  },
];

export type Skill = {
  label: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  caption: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
{
    id: "programming",
    title: "Programming & Data Engineering",
    caption: "Programming languages and data development",
    skills: [
      { label: "Python" },
      { label: "SQL / PL/SQL / Query Optimization" },
      { label: "ETL / ELT Pipeline Development" },
      { label: "Data Modeling & Transformation" },
      { label: "Java / JavaScript" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    caption: "Storage, modeling, and querying",
    skills: [
      { label: "PostgreSQL / MySQL" },
      { label: "Oracle DB / SQL Server" },
      { label: "BigQuery / Amazon Redshift" },
      { label: "Database Design & Normalization" },
      { label: "Data Warehousing Architecture" },
    ],
  },
  {
    id: "cloud-ai",
    title: "Cloud & AI",
    caption: "Cloud platforms and intelligent systems",
    skills: [
      { label: "Google Cloud Platform (GCP)" },
      { label: "Vertex AI / ML Pipelines" },
      { label: "LLM Integration & Semantic Search" },
      { label: "NLP & Text Analytics" },
      { label: "BigQuery ML / Analytics" },
    ],
  },
  {
    id: "tools-devops",
    title: "Engineering & Analytics",
    caption: "Development, deployment, and analysis",
    skills: [
      { label: "REST APIs / Microservices" },
      { label: "Git / Version Control" },
      { label: "Docker / Kubernetes" },
      { label: "CI/CD & Development Workflows" },
      { label: "Tableau / Data Visualization" },
    ],
  },
];

export type EducationEntry = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  period: string;
  current?: boolean;
};

export const education: EducationEntry[] = [
  {
    id: "csuf",
    institution: "California State University, Fullerton",
    degree: "Master of Science",
    field: "Computer Science",
    location: "Fullerton, CA, USA",
    period: "2024 — May 2026",
  },
  {
    id: "jyothy",
    institution: "Visvesvaraya Technological University — Jyothy Institute of Technology",
    degree: "Bachelor of Engineering",
    field: "Computer Science",
    location: "Bangalore, India",
    period: "2018 — July 2022",
  },
];

// Section registry — used by navigation
export const sections = [
  { id: "intro", label: "Intro", index: "00" },
  { id: "about", label: "About", index: "01" },
  { id: "experience", label: "Experience", index: "02" },
  { id: "work", label: "Projects", index: "03" },
  { id: "expertise", label: "Expertise", index: "04" },
  { id: "education", label: "Education", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;
