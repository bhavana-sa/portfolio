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
  location:     "Fullerton, California, USA",
  email:        "bhavanasathavane@gmail.com",
  availability: "Open to data, software, platform and AI engineering roles",
  archetype:    "developer",
  seniority:    "entry-level",
  focusAreas:   ["AI", "Cloud Computing", "Fintech", "Telecom"],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/bhavana-athavane", handle: "bhavana-athavane" },
    { label: "GitHub", href: "https://github.com/bhavana-sa", handle: "bhavana-sa" },
    { label: "Resume", href: "/resume.pdf", handle: "Download PDF" },
  ],

  // Hero stat band
  stats: [
    { value: "4+",  label: "Shipped data & AI projects",  note: "Built end-to-end" },
    { value: "8+",  label: "Production data pipelines",   note: "Engineering & data" },
    { value: "3+",  label: "Years in production systems", note: "Experience" },
    { value: "50+", label: "Students mentored",           note: "Graduate teaching" },
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
    period: "Jan 2026 — August 2026",
    kind: "Academic",
    summary:
      "Graduate Teaching Assistant for an undergraduate business analytics course ",
    roles: [
      {
        title: "Graduate Teaching Assistant — ISDS 361B",
        period: "Jan 2026 — August 2026",
        summary:
          "Supported an undergraduate business analytics course, bridging spreadsheet-based analysis with structured SQL and data reasoning.",
        highlights: [
          "Supported an undergraduate business analytics course for more than 50 students per semester, helping students transition from spreadsheet-based analysis into SQL and more structured approaches to working with data. Led weekly labs and office hours covering Excel, Power Query, and SQL, while helping students turn open-ended business questions into clear, queryable analyses with defined success criteria. Worked closely with students through assignments and feedback to reinforce both the technical mechanics and the reasoning behind their analysis.",
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
      "Built production pipelines for AI-driven fault diagnostics.",
    roles: [
      {
        title: "Platform Engineering Co-op — AI Systems",
        period: "May 2025 — Aug 2025",
        summary:
          "Owned development and production of Vertex AI based Fault Diagnostic pipeline",
        highlights: [
          "Developed Google Cloud pipelines using Pub/Sub, Dataflow, and BigQuery to process diagnostic data, and built a Vertex AI workflow that reached 82% accuracy in identifying software fault drivers.",
          "Integrated LLM-based semantic search across JIRA, CMDB, and internal knowledge sources using a RAG architecture, helping automate manual triage and contributing to a 41% reduction in mean time to resolution.",
        ],
        stack: [
          "GCP",
          "Vertex AI",
          "Pub/Sub",
          "Dataflow",
          "BigQuery",
          "LLM",
          "RAG",
        ],
      },

      {
        title: "Database Software Engineer — Co-op",
        period: "Sep 2025 — Dec 2025",
        summary:
          "Focused on the database and backend layer of the platform, working across relational schema design, ETL consolidation, query optimization, and service integrations.",
        highlights: [
          "Designed and optimized relational systems across Oracle, MySQL, and PostgreSQL, using indexing, normalization, and query tuning to reduce average query latency by 55%.",
          "Consolidated redundant ETL jobs into a single stored-procedure pipeline and built Python-based REST integrations between backend services and OLTP databases, reducing average database round-trips per request by approximately 40%.",
        ],
        stack: [
          "PostgreSQL",
          "MySQL",
          "Oracle DB",
          "Python",
          "REST",
          "Stored Procedures",
        ],
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
      "Owned production environments for internal data and reporting systems.",
    roles: [
      {
        title: "Programmer Analyst Trainee",
        period: "Mar 2022 — Dec 2023",
        summary:
          "Worked across internal data and reporting workflows, improving how teams processed, validated, and consumed operational data.",
        highlights: [
          "Automated eight ETL workflows using Python and SQL, reducing processing time by approximately 20% while eliminating repetitive manual work for analysts.",
          "Worked across Oracle and SQL Server to validate production pipelines and built Tableau dashboards tracking revenue, operational, and compliance metrics across multiple business units.",
        ],
        stack: ["Python", "SQL", "Oracle DB", "SQL Server", "Tableau"],
      },

      {
        title: "Senior Systems Engineer",
        period: "Dec 2023 — Aug 2024",
        summary:
          "Took on broader responsibility for database performance and data quality across three production systems.",
        highlights: [
          "Led Oracle performance improvements through query analysis, index optimization, and partition pruning, increasing overall system throughput by approximately 30%.",
          "Built a Python and PL/SQL validation framework spanning Oracle and SQL Server that identified roughly 200 cross-system discrepancies each month and reduced manual reconciliation time.",
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
    title: "Financial Fraud Detection & Anomaly Analysis",
    category: "MACHINE LEARNING",
    tagline: "An ensemble approach to identifying and explaining suspicious transactions",
    problem:
      "Detect fraudulent transactions in a highly imbalanced dataset while keeping predictions interpretable enough to understand why a transaction was flagged.",
    approach:
      "Built a Python-based detection pipeline combining XGBoost, Isolation Forest, and a PyTorch autoencoder. Engineered behavioral, temporal, and geographic features, combined model outputs into a weighted risk score, and used SHAP to explain the factors influencing individual predictions. The project also includes a Flask-based interface for simulating transaction scoring.",
    outcome:
      "A complete fraud-analysis workflow covering feature engineering, supervised and unsupervised detection, ensemble scoring, and explainability across a synthetic dataset of more than 20,000 transactions.",
    engineering: [
      "Engineered behavioral, temporal, and geographic transaction features.",
      "Combined supervised and unsupervised models into a weighted ensemble.",
      "Used SHAP to interpret model predictions and identify influential features.",
      "Built a Flask interface to simulate transaction scoring.",
    ],
    stack: ["Python", "XGBoost", "Isolation Forest", "PyTorch", "SHAP", "Flask"],
    tags: ["Data & ML", "Backend"],
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
    title: "E-Commerce Web Application",
    category: "FULL-STACK",
    tagline: "A full-stack shopping experience with product browsing and cart management",
    problem:
      "Build a functional e-commerce application that covers the core flow from browsing products through managing a shopping cart.",
    approach:
      "A web-based storefront with product discovery, category navigation, cart management, and the supporting application logic required to connect the interface with persistent application state.",
    outcome:
      "A working e-commerce application that served as a hands-on exercise in full-stack application structure, frontend development, and backend integration.",
    engineering: [
      "Built product browsing and category-based navigation.",
      "Implemented shopping cart functionality and application state management.",
      "Connected the frontend to backend services for persistent application data.",
    ],
    stack: ["React", "Firebase", "Firestore"],
    tags: ["Full-Stack"],
    codeHref: "https://github.com/Bhavanasa1902/ecommerce-app",
    featured: false,
  },

  {
    id: "book-to-playlist",
    title: "Book to Playlist",
    category: "NLP / RECOMMENDATION",
    tagline: "Semantic matching between books and music",
    problem:
      "Explore whether the themes and meaning of a book can be used to discover songs with similar semantic characteristics.",
    approach:
      "Built a recommendation pipeline that represents book descriptions and song lyrics using BERT embeddings, then uses FAISS for nearest-neighbor similarity search. PCA was applied to reduce dimensionality and improve retrieval performance, with a Flask backend serving recommendations through a simple web interface.",
    outcome:
      "A working cross-domain recommendation system that retrieves songs based on the semantic themes of a selected book.",
    engineering: [
      "Generated BERT embeddings for book descriptions and song lyrics.",
      "Built a FAISS index for nearest-neighbor similarity search.",
      "Applied PCA for dimensionality reduction.",
      "Served recommendations through a Flask backend.",
    ],
    stack: ["Python", "BERT", "FAISS", "Flask", "PCA"],
    tags: ["NLP", "Recommendation Systems"],
    codeHref: "https://github.com/Bhavanasa1902/book-to-playlist",
    bottomLink: "CODE ↗",
    featured: false,
  },

  {
    id: "cryptozombies",
    title: "CryptoZombies Arena",
    category: "BLOCKCHAIN / WEB3",
    tagline: "A blockchain game built around NFTs, battles, and on-chain state",
    problem:
      "Extend a blockchain game into a more complete interactive application with gameplay, ownership, and marketplace functionality represented through smart contracts.",
    approach:
      "Worked as part of a four-person team on an Ethereum-based game that extended the CryptoZombies foundation with breeding, NFT marketplace functionality, turn-based battles, player rankings, and MetaMask integration. The application uses Solidity smart contracts with Web3.js and a browser-based JavaScript frontend, running against a local Ganache network.",
    outcome:
      "A functional Web3 game demonstrating smart-contract interaction, blockchain-backed gameplay state, NFT ownership, and wallet-based application flows.",
    engineering: [
      "Extended Solidity contracts across gameplay and marketplace functionality.",
      "Connected the browser application to Ethereum through Web3.js.",
      "Integrated MetaMask for wallet-based interaction.",
      "Built against a local Ganache development network.",
    ],
    stack: ["Solidity", "Ethereum", "Web3.js", "Truffle", "Ganache", "MetaMask"],
    tags: ["Blockchain", "Web3"],
    codeHref: "https://github.com/Bhavanasa1902/CryptoZombies-Arena",
    bottomLink: "CODE ↗",
    featured: false,
  },

  {
    id: "titanfund",
    title: "TitanFund",
    category: "BLOCKCHAIN / FULL-STACK",
    tagline: "A blockchain crowdfunding platform for student-led initiatives",
    problem:
      "Create a transparent crowdfunding workflow where campaigns, contributions, and fund withdrawals can be tracked without relying entirely on a centralized system.",
    approach:
      "Worked as part of a four-person team on an Ethereum-based crowdfunding platform for CSUF students. The application combines a Next.js frontend with Solidity smart contracts, Web3.js, MetaMask, and a local Ganache environment to support campaign creation, contributions, withdrawal requests, and contributor approvals.",
    outcome:
      "A working decentralized crowdfunding application with campaign management, contribution tracking, withdrawal workflows, and wallet-based interaction.",
    engineering: [
      "Built application flows for campaign creation and contribution tracking.",
      "Integrated the frontend with Solidity smart contracts through Web3.js.",
      "Implemented withdrawal-request and contributor-approval workflows.",
      "Integrated MetaMask for wallet-based transactions.",
    ],
    stack: ["Next.js", "Solidity", "Web3.js", "Chakra UI", "Ganache", "MetaMask"],
    tags: ["Blockchain", "Full-Stack"],
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
  { id: "expertise", label: "Skils", index: "04" },
  { id: "education", label: "Education", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;
