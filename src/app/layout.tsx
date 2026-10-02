import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/portfolio/theme-provider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://bhavana-portfolio-cyan.vercel.app";
const title = "Bhavana Sudhakar Athavane — Data Engineer";
const description =
  "Data engineer specializing in production-grade pipelines, cloud data platforms, and ML-ready infrastructure. Building the data foundations that let analytics, ML, and operations scale.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Bhavana Athavane",
  },
  description,
  keywords: [
    "Data Engineer",
    "Bhavana Athavane",
    "Bhavana Sudhakar Athavane",
    "ETL Pipelines",
    "BigQuery",
    "Vertex AI",
    "Google Cloud Platform",
    "PostgreSQL",
    "Oracle DB",
    "Data Platform Engineer",
    "ML Pipeline",
    "Backend Systems",
  ],
  authors: [{ name: "Bhavana Sudhakar Athavane" }],
  creator: "Bhavana Sudhakar Athavane",
  publisher: "Bhavana Sudhakar Athavane",
  applicationName: "Bhavana Athavane — Portfolio",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: "Bhavana Athavane — Portfolio",
    title,
    description,
    firstName: "Bhavana",
    lastName: "Athavane",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bhavana Sudhakar Athavane — Data Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    other: {
      author: "Bhavana Sudhakar Athavane",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured data — Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bhavana Sudhakar Athavane",
              url: siteUrl,
              image: `${siteUrl}/og-image.png`,
              jobTitle: "Data Engineer",
              email: "mailto:bhavanasathavane@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Fullerton",
                addressRegion: "California",
                addressCountry: "USA",
              },
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "California State University, Fullerton",
                },
                {
                  "@type": "CollegeOrUniversity",
                  name: "Jyothy Institute of Technology",
                },
              ],
              worksFor: [
                { "@type": "Organization", name: "Nokia" },
                { "@type": "Organization", name: "Cognizant" },
              ],
              knowsAbout: [
                "Data Engineering",
                "ETL Pipelines",
                "BigQuery",
                "Google Cloud Platform",
                "Vertex AI",
                "PostgreSQL",
                "Oracle Database",
                "Machine Learning Infrastructure",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${outfit.variable} ${cormorant.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
