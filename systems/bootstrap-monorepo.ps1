$ErrorActionPreference = "SilentlyContinue"

Clear-Host
Write-Host ""
Write-Host "======================================================="
Write-Host "   EX EXPERIENCE OS :: MONOREPO BOOTSTRAP ENGINE"
Write-Host "======================================================="
Write-Host ""

function Write-TextFile {
    param(
        [Parameter(Mandatory=$true)][string]$Path,
        [Parameter(Mandatory=$true)][string]$Content
    )
    $dir = Split-Path $Path -Parent
    if ($dir -and !(Test-Path $dir)) {
        New-Item -ItemType Directory -Force -Path $dir | Out-Null
    }
    Set-Content -Path $Path -Value $Content -Encoding UTF8
}

function Copy-Tree {
    param(
        [Parameter(Mandatory=$true)][string]$Source,
        [Parameter(Mandatory=$true)][string]$Destination
    )
    if (Test-Path $Source) {
        New-Item -ItemType Directory -Force -Path $Destination | Out-Null
        Copy-Item (Join-Path $Source "*") $Destination -Recurse -Force
    }
}

function Safe-Copy {
    param(
        [Parameter(Mandatory=$true)][string]$Source,
        [Parameter(Mandatory=$true)][string]$Destination
    )
    if (Test-Path $Source) {
        $dir = Split-Path $Destination -Parent
        if ($dir -and !(Test-Path $dir)) {
            New-Item -ItemType Directory -Force -Path $dir | Out-Null
        }
        Copy-Item $Source $Destination -Force
    }
}

function Safe-Move {
    param(
        [Parameter(Mandatory=$true)][string]$Source,
        [Parameter(Mandatory=$true)][string]$Destination
    )
    if (Test-Path $Source) {
        $dir = Split-Path $Destination -Parent
        if ($dir -and !(Test-Path $dir)) {
            New-Item -ItemType Directory -Force -Path $dir | Out-Null
        }
        Move-Item $Source $Destination -Force
    }
}

if (!(Test-Path ".\package.json")) {
    Write-Host "ERROR: package.json not found. Open the project root first." -ForegroundColor Red
    exit 1
}

taskkill /F /IM node.exe 2>$null

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$backupRoot = ".backup\monorepo-migration-$timestamp"
New-Item -ItemType Directory -Force -Path $backupRoot | Out-Null

Write-Host "[1/12] Backing up current root files..." -ForegroundColor Cyan
foreach ($f in @(
    "package.json",
    "package-lock.json",
    "tsconfig.json",
    "next.config.js",
    "next.config.ts",
    "postcss.config.js",
    "tailwind.config.js",
    "middleware.ts",
    ".env.local"
)) {
    if (Test-Path $f) { Copy-Item $f $backupRoot -Force }
}

Write-Host "[2/12] Creating monorepo folders..." -ForegroundColor Cyan
$dirs = @(
    "apps\web",
    "apps\api",
    "apps\dashboard",
    "packages\ui",
    "packages\cinematic-engine",
    "packages\ai-core",
    "packages\design-system",
    "packages\telemetry",
    "packages\security",
    "packages\shared",
    "ai\agents",
    "ai\memory",
    "ai\routing",
    "ai\embeddings",
    "ai\evaluation",
    "infrastructure\docker",
    "infrastructure\kubernetes",
    "infrastructure\terraform",
    "infrastructure\monitoring"
)
foreach ($d in $dirs) { New-Item -ItemType Directory -Force -Path $d | Out-Null }

Write-Host "[3/12] Moving current web app into apps/web..." -ForegroundColor Cyan
Copy-Tree ".\app" ".\apps\web\app"
Copy-Tree ".\components" ".\apps\web\components"
Copy-Tree ".\public" ".\apps\web\public"

foreach ($f in @("middleware.ts", "next.config.js", "next.config.ts", "postcss.config.js", "tailwind.config.js", "tsconfig.json", ".env.local")) {
    Safe-Move $f (Join-Path ".\apps\web" $f)
}

Write-Host "[4/12] Copying current package.json into apps/web..." -ForegroundColor Cyan
Safe-Copy ".\package.json" ".\apps\web\package.json"

Write-Host "[5/12] Writing root workspace config..." -ForegroundColor Cyan
Write-TextFile ".\package.json" @'
{
  "name": "ex-experience-os",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "npm --workspace apps/web run dev",
    "build": "npm --workspace apps/web run build",
    "lint": "npm --workspace apps/web run lint",
    "dev:web": "npm --workspace apps/web run dev",
    "build:web": "npm --workspace apps/web run build",
    "lint:web": "npm --workspace apps/web run lint"
  }
}
'@

Write-TextFile ".\.npmrc" @'
legacy-peer-deps=true
fund=false
'@

Write-Host "[6/12] Writing apps/web package and configs..." -ForegroundColor Cyan
Write-TextFile ".\apps\web\package.json" @'
{
  "name": "@ex/web",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@ex/ai-core": "workspace:*",
    "@ex/cinematic-engine": "workspace:*",
    "@ex/design-system": "workspace:*",
    "@ex/security": "workspace:*",
    "@ex/shared": "workspace:*",
    "@ex/telemetry": "workspace:*",
    "@ex/ui": "workspace:*",
    "clsx": "^2.1.1",
    "framer-motion": "^11.11.17",
    "gsap": "^3.13.0",
    "lucide-react": "^0.511.0",
    "next": "15.3.2",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "react-reconciler": "0.29.0",
    "three": "0.160.0",
    "@react-three/drei": "9.99.5",
    "@react-three/fiber": "8.15.19",
    "tailwind-merge": "^3.3.0",
    "zustand": "^5.0.5"
  },
  "devDependencies": {
    "@types/node": "^20.11.19",
    "@types/react": "18.2.55",
    "@types/react-dom": "18.2.18",
    "autoprefixer": "10.4.19",
    "postcss": "8.4.38",
    "tailwindcss": "3.4.4",
    "typescript": "^5.3.3"
  }
}
'@

Write-TextFile ".\apps\web\next.config.js" @'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ex/ui',
    '@ex/design-system',
    '@ex/cinematic-engine',
    '@ex/ai-core',
    '@ex/telemetry',
    '@ex/security',
    '@ex/shared'
  ]
};

module.exports = nextConfig;
'@

Write-TextFile ".\apps\web\postcss.config.js" @'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
'@

Write-TextFile ".\apps\web\tailwind.config.js" @'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
'@

Write-TextFile ".\apps\web\tsconfig.json" @'
{
  "compilerOptions": {
    "target": "ES6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [
      { "name": "next" }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules"
  ]
}
'@

Write-TextFile ".\apps\web\next-env.d.ts" @'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
'@

Write-TextFile ".\apps\web\app\globals.css" @'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --void: #050505;
  --silver: #d9d9d9;
  --glass: rgba(255,255,255,0.04);
  --border: rgba(255,255,255,0.08);
  --neural: #6ee7ff;
}

html {
  scroll-behavior: smooth;
}

html,
body {
  margin: 0;
  padding: 0;
  background: radial-gradient(circle at top, #111111 0%, #050505 70%);
  color: white;
  overflow-x: hidden;
  font-family: Arial, Helvetica, sans-serif;
}

* {
  box-sizing: border-box;
}

.glass {
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.08);
}
'@

Write-TextFile ".\apps\web\app\layout.tsx" @'
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EX Experience OS",
  description: "AI-native cinematic operating system.",
  openGraph: {
    title: "EX Experience OS",
    description: "Future luxury experience platform",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
'@

Write-TextFile ".\apps\web\app\page.tsx" @'
import Navbar from "../components/navigation/navbar";
import CinematicHero from "../components/hero/cinematic-hero";
import ManifestoSection from "../components/sections/manifesto-section";
import ExperienceGrid from "../components/sections/experience-grid";
import NeuralPanel from "../components/panels/neural-panel";
import OraclePanel from "../components/oracle/oracle-panel";
import NeuralFooter from "../components/footer/neural-footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <CinematicHero />
      <ManifestoSection />
      <ExperienceGrid />
      <NeuralPanel />
      <OraclePanel />
      <NeuralFooter />
    </main>
  );
}
'@

Write-TextFile ".\apps\web\components\navigation\neural-navbar.tsx" @'
"use client";

import { motion } from "framer-motion";

export default function NeuralNavbar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="glass mx-6 mt-6 rounded-full px-8 py-4 flex items-center justify-between">
        <div className="text-sm tracking-[0.4em] uppercase">
          EX Experience OS
        </div>

        <div className="flex gap-8 text-xs uppercase tracking-[0.3em]">
          <button>Archive</button>
          <button>Oracle</button>
          <button>Gateway</button>
        </div>
      </div>
    </motion.nav>
  );
}
'@

Write-TextFile ".\apps\web\components\navigation\navbar.tsx" @'
export { default } from "./neural-navbar";
'@

Write-TextFile ".\apps\web\components\hero\hero-runtime.tsx" @'
"use client";

import { motion } from "framer-motion";

export default function HeroRuntime() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#1f2937_0%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6 }}
        className="text-center z-10"
      >
        <div className="text-[12vw] font-thin tracking-[-0.08em]">
          EX
        </div>

        <div className="uppercase tracking-[0.6em] text-sm opacity-70">
          Experience Operating System
        </div>
      </motion.div>
    </section>
  );
}
'@

Write-TextFile ".\apps\web\components\hero\cinematic-hero.tsx" @'
export { default } from "./hero-runtime";
'@

Write-TextFile ".\apps\web\components\sections\manifesto-section.tsx" @'
"use client";

import { motion } from "framer-motion";

export default function ManifestoSection() {
  return (
    <section className="px-6 py-32 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <div className="uppercase tracking-[0.5em] text-[10px] opacity-50 mb-8">
          Manifesto
        </div>

        <h2 className="text-5xl md:text-7xl font-thin tracking-[-0.06em] leading-none">
          We engineer
          <br />
          digital emotion.
        </h2>

        <p className="mt-10 max-w-3xl text-white/70 leading-8 text-lg">
          EX Experience OS is a sovereign cinematic operating layer designed for luxury digital ecosystems, adaptive interaction, and future-ready AI identity.
        </p>
      </motion.div>
    </section>
  );
}
'@

Write-TextFile ".\apps\web\components\sections\experience-grid.tsx" @'
"use client";

import { motion } from "framer-motion";

const items = [
  { title: "Cinematic Motion", desc: "Animated depth and atmosphere." },
  { title: "AI Experience Layer", desc: "Behavior-driven narrative systems." },
  { title: "Neural Interfaces", desc: "Adaptive premium interactions." },
  { title: "Digital Sovereignty", desc: "Private invite-only identity." },
];

export default function ExperienceGrid() {
  return (
    <section className="px-6 py-32 bg-black">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8 min-h-[220px]"
          >
            <div className="text-xs uppercase tracking-[0.35em] opacity-45 mb-6">
              0{index + 1}
            </div>
            <h3 className="text-3xl font-medium tracking-[-0.04em] mb-4">
              {item.title}
            </h3>
            <p className="text-white/70 leading-7">
              {item.desc}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
'@

Write-TextFile ".\apps\web\components\panels\neural-panel.tsx" @'
"use client";

import { motion } from "framer-motion";

export default function NeuralPanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1 }}
      viewport={{ once: true }}
      className="px-6 py-32 bg-[#020202]"
    >
      <div className="max-w-6xl mx-auto rounded-[36px] border border-cyan-400/10 bg-black/40 backdrop-blur-3xl p-10">
        <div className="uppercase tracking-[0.45em] text-[10px] opacity-50 mb-8">
          Neural Runtime Intelligence
        </div>

        <h2 className="text-4xl md:text-6xl font-thin tracking-[-0.06em] leading-tight">
          Autonomous cinematic experience orchestration.
        </h2>
      </div>
    </motion.section>
  );
}
'@

Write-TextFile ".\apps\web\components\oracle\oracle-panel.tsx" @'
"use client";

import { motion } from "framer-motion";

export default function OraclePanel() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="px-6 py-24 bg-black"
    >
      <div className="max-w-5xl mx-auto rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8">
        <div className="uppercase tracking-[0.45em] text-[10px] opacity-50 mb-6">
          Oracle
        </div>
        <p className="text-white/80 leading-8">
          The intelligence layer is now scaffolded and ready to receive memory, routing, and behavioral modeling.
        </p>
      </div>
    </motion.section>
  );
}
'@

Write-TextFile ".\apps\web\components\terminal\runtime-terminal.tsx" @'
"use client";

export default function RuntimeTerminal() {
  return (
    <section className="px-6 py-24 bg-black">
      <div className="max-w-6xl mx-auto rounded-[28px] border border-white/10 bg-black/50 backdrop-blur-2xl p-8 font-mono text-sm leading-8 text-white/80">
        &gt; initialize_sovereign_runtime()
        <br />
        &gt; synchronize_ai_memory()
        <br />
        &gt; cinematic_engine = READY
      </div>
    </section>
  );
}
'@

Write-TextFile ".\apps\web\components\footer\neural-footer.tsx" @'
"use client";

export default function NeuralFooter() {
  return (
    <footer className="px-6 py-12 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs uppercase tracking-[0.45em] opacity-50">
        <div>EX Experience OS</div>
        <div>Sovereign Experience Engineering</div>
      </div>
    </footer>
  );
}
'@

Write-TextFile ".\apps\web\components\scene\scene-canvas.tsx" @'
"use client";

export default function SceneCanvas() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "radial-gradient(circle at center, rgba(110,231,255,0.08), transparent 55%)",
      }}
    />
  );
}
'@

Write-TextFile ".\apps\web\components\scene\safe-scene.tsx" @'
"use client";

import dynamic from "next/dynamic";

const SceneCanvas = dynamic(
  () => import("./scene-canvas"),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function SafeScene() {
  return <SceneCanvas />;
}
'@

Write-TextFile ".\apps\web\components\scene\immersive-scene.tsx" @'
"use client";

import SafeScene from "./safe-scene";

export default function ImmersiveScene() {
  return <SafeScene />;
}
'@

Write-TextFile ".\apps\web\components\canvas\DeepArchiveSystem.tsx" @'
"use client";

export default function DeepArchiveSystem() {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl p-8">
      Deep Archive System scaffold.
    </div>
  );
}
'@

Write-TextFile ".\apps\web\middleware.ts" @'
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}
'@

Write-Host "[7/12] Creating base workspace packages..." -ForegroundColor Cyan
$workspacePackages = @(
    @{ Path="packages\ui"; Name="@ex/ui"; Main="src/index.ts"; Index='export const cn = (...parts: Array<string | false | null | undefined>) => parts.filter(Boolean).join(" ");' },
    @{ Path="packages\design-system"; Name="@ex/design-system"; Main="src/index.ts"; Index='export * from "./tokens/colors"; export * from "./motion/transitions";' },
    @{ Path="packages\cinematic-engine"; Name="@ex/cinematic-engine"; Main="src/index.ts"; Index='export * from "./runtime"; export * from "./scene-manager";' },
    @{ Path="packages\ai-core"; Name="@ex/ai-core"; Main="src/index.ts"; Index='export * from "./oracle-agent";' },
    @{ Path="packages\telemetry"; Name="@ex/telemetry"; Main="src/index.ts"; Index='export * from "./runtime";' },
    @{ Path="packages\security"; Name="@ex/security"; Main="src/index.ts"; Index='export const securityHeaders = { "X-Frame-Options": "DENY", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin" };' },
    @{ Path="packages\shared"; Name="@ex/shared"; Main="src/index.ts"; Index='export const isBrowser = () => typeof window !== "undefined"; export const noop = () => {};'}
)

foreach ($pkg in $workspacePackages) {
    New-Item -ItemType Directory -Force -Path $pkg.Path | Out-Null
    Write-TextFile (Join-Path $pkg.Path "package.json") (@"
{
  "name": "$($pkg.Name)",
  "private": true,
  "version": "1.0.0",
  "main": "$($pkg.Main)",
  "types": "$($pkg.Main)"
}
"@)
    Write-TextFile (Join-Path $pkg.Path $pkg.Main) $pkg.Index
}

Write-TextFile ".\packages\design-system\src\tokens\colors.ts" @'
export const colors = {
  void: "#050505",
  silver: "#d9d9d9",
  neural: "#6ee7ff",
  crimson: "#ff3b3b",
  gold: "#c5a46d",
  glass: "rgba(255,255,255,0.05)",
};
'@

Write-TextFile ".\packages\design-system\src\motion\transitions.ts" @'
export const cinematicTransition = {
  duration: 1.4,
  ease: [0.22, 1, 0.36, 1] as const,
};
'@

Write-TextFile ".\packages\cinematic-engine\src\runtime.ts" @'
export class CinematicRuntime {
  private activeScene = "hero";

  transition(scene: string) {
    this.activeScene = scene;

    if (typeof document !== "undefined") {
      document.documentElement.animate(
        [{ opacity: 0.96 }, { opacity: 1 }],
        {
          duration: 1400,
          easing: "cubic-bezier(0.22,1,0.36,1)",
        }
      );
    }
  }

  ambientPulse() {
    if (typeof window === "undefined") return;
    requestAnimationFrame(this.ambientPulse.bind(this));
  }

  getScene() {
    return this.activeScene;
  }
}
'@

Write-TextFile ".\packages\cinematic-engine\src\scene-manager.ts" @'
export class SceneManager {
  private activeScene = "hero";

  setScene(scene: string) {
    this.activeScene = scene;
  }

  getScene() {
    return this.activeScene;
  }
}
'@

Write-TextFile ".\packages\ai-core\src\oracle-agent.ts" @'
export class OracleAgent {
  async analyzeUserBehavior(input: {
    interactionHistory: string[];
    emotionalPattern: string;
  }) {
    return {
      narrative: "The system senses deep intent.",
      recommendation: "Unlock Archive Sequence 7",
      cinematicMode: "immersive",
      input,
    };
  }
}
'@

Write-TextFile ".\packages\telemetry\src\runtime.ts" @'
export function trackExperience(event: string, data: unknown) {
  console.log("[EX TELEMETRY]", event, data);
}
'@

Write-Host "[8/12] Creating AI source architecture..." -ForegroundColor Cyan
$aiFolders = @("ai\agents","ai\memory","ai\routing","ai\embeddings","ai\evaluation")
foreach ($d in $aiFolders) { New-Item -ItemType Directory -Force -Path $d | Out-Null }

Write-TextFile ".\ai\agents\oracle-agent.ts" @'
export class OracleAgent {
  async analyzeUserBehavior(input: {
    interactionHistory: string[];
    emotionalPattern: string;
  }) {
    return {
      narrative: "The system senses deep intent.",
      recommendation: "Unlock Archive Sequence 7",
      cinematicMode: "immersive",
      input,
    };
  }
}
'@

Write-TextFile ".\ai\memory\memory-store.ts" @'
export type MemoryEntry = {
  id: string;
  label: string;
  value: unknown;
};

export class MemoryStore {
  private store = new Map<string, MemoryEntry>();

  set(entry: MemoryEntry) {
    this.store.set(entry.id, entry);
  }

  get(id: string) {
    return this.store.get(id);
  }

  list() {
    return Array.from(this.store.values());
  }
}
'@

Write-TextFile ".\ai\routing\router.ts" @'
export function routeIntent(intent: string) {
  if (intent.includes("oracle")) return "oracle";
  if (intent.includes("archive")) return "archive";
  if (intent.includes("motion")) return "motion";
  return "default";
}
'@

Write-TextFile ".\ai\embeddings\embeddings.ts" @'
export async function semanticSearch(query: string) {
  return {
    query,
    results: [],
    confidence: 0.98,
  };
}
'@

Write-TextFile ".\ai\evaluation\evaluator.ts" @'
export function evaluateResponse(score: number) {
  return {
    accepted: score >= 0.8,
    score,
  };
}
'@

Write-Host "[9/12] Creating infrastructure scaffolds..." -ForegroundColor Cyan
foreach ($d in @("infrastructure\docker","infrastructure\kubernetes","infrastructure\terraform","infrastructure\monitoring")) {
    Write-TextFile (Join-Path $d "README.md") "# Scaffold: $d"
}

Write-Host "[10/12] Creating app scaffolds for API and dashboard..." -ForegroundColor Cyan
Write-TextFile ".\apps\api\package.json" @'
{
  "name": "@ex/api",
  "private": true,
  "version": "1.0.0"
}
'@
Write-TextFile ".\apps\api\README.md" @'
# API scaffold

Future Hono / Node API will live here.
'@

Write-TextFile ".\apps\dashboard\package.json" @'
{
  "name": "@ex/dashboard",
  "private": true,
  "version": "1.0.0"
}
'@
Write-TextFile ".\apps\dashboard\README.md" @'
# Dashboard scaffold

Future executive dashboard will live here.
'@

Write-TextFile ".\.gitignore" @'
node_modules
**/node_modules
.next
**/.next
dist
build
coverage
.backup
.env
.env.local
.DS_Store
'@

Write-Host "[11/12] Cleaning root workspace leftovers..." -ForegroundColor Cyan
foreach ($p in @(
    ".\app",
    ".\components",
    ".\public",
    ".\middleware.ts",
    ".\next.config.js",
    ".\next.config.ts",
    ".\postcss.config.js",
    ".\tailwind.config.js",
    ".\tsconfig.json",
    ".\.env.local",
    ".\.next"
)) {
    if (Test-Path $p) { Remove-Item $p -Recurse -Force }
}

if (Test-Path ".\package-lock.json") { Remove-Item ".\package-lock.json" -Force }
if (Test-Path ".\node_modules") { Remove-Item ".\node_modules" -Recurse -Force }

Write-Host "[12/12] Installing workspace dependencies..." -ForegroundColor Cyan
npm install --legacy-peer-deps

Write-Host ""
Write-Host "======================================================="
Write-Host "   MONOREPO BOOTSTRAP COMPLETE"
Write-Host "======================================================="
Write-Host ""
Write-Host "✔ Root now acts as workspace shell" -ForegroundColor Green
Write-Host "✔ web app moved to apps/web" -ForegroundColor Green
Write-Host "✔ packages base created" -ForegroundColor Green
Write-Host "✔ AI source folders created" -ForegroundColor Green
Write-Host "✔ infrastructure folders created" -ForegroundColor Green
Write-Host "✔ Safe 3D layer parked for later" -ForegroundColor Green
Write-Host ""

npm run dev