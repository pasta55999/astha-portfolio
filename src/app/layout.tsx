import type { Metadata, Viewport } from "next";
import { Inter, Sora, Caveat, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const caveat = Caveat({ variable: "--font-caveat", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const title = `${profile.name} — ${profile.role}`;
const description =
  "Generative AI Engineer in Dubai building intelligent products: bilingual voice tutors, agentic systems, climate-risk intelligence, browser assistants and evaluation loops.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: title, template: `%s — ${profile.name}` },
  description,
  openGraph: { title, description, type: "website", siteName: profile.name, locale: "en_AE" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#05010f", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${caveat.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full bg-background text-foreground antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-3 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Nav />
            <main id="main" className="relative flex flex-1 flex-col">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
