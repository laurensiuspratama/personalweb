import { motion } from "framer-motion"
import { ArrowDownRight, Terminal, ShieldCheck, Layers, Sliders } from "lucide-react"
import { HERO_METRICS } from "@/data/portfolio"

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden hairline-b">
      {/* Top Meta Bar */}
      <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8 sm:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 font-mono text-[11px] tracking-[0.18em] uppercase opacity-70 hairline-b">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-warm animate-pulse" />
            <span>TERSEDIA UNTUK PROYEK & KOLABORASI · 2026</span>
          </div>
          <div>EDISI 01 // FULL-STACK · UI/UX · QA ENGINEERING</div>
        </div>
      </div>

      {/* Main Editorial Title */}
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="mb-4 font-mono text-xs tracking-[0.2em] uppercase text-warm">
            PORTFOLIO RESMI & LABORATORIUM INTERAKTIF
          </p>

          <h1 className="font-sans text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-[5.5rem] lg:leading-[0.96]">
            LAURENSIUS PRATAMA
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed opacity-85 sm:text-xl">
                Merancang dan membangun produk digital di persimpangan{" "}
                <strong className="font-semibold text-warm">Full-Stack Web Development</strong>,{" "}
                <strong className="font-semibold">Riset UI/UX Terukur</strong>, dan{" "}
                <strong className="font-semibold">Software Quality Assurance</strong>. Setiap baris
                kode dan interaksi diuji secara presisi dari sketsa hingga produksi.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 bg-warm px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] uppercase text-canvas transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm"
              >
                Eksplorasi Karya
                <ArrowDownRight className="h-4 w-4" />
              </a>
              <a
                href="#lab"
                className="inline-flex items-center gap-2 px-5 py-3.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors hairline-box surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warm"
              >
                <Sliders className="h-3.5 w-3.5 text-warm" />
                Halftone Lab
              </a>
            </div>
          </div>
        </motion.div>

        {/* Role Pillars */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="p-5 hairline-box surface-subtle">
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-warm">
              <Terminal className="h-4 w-4" />
              <span>01 / Engineering</span>
            </div>
            <p className="text-sm opacity-80">
              Pengembangan frontend & full-stack berbasis React, TypeScript, Tailwind CSS, dan
              komponen modular yang bersih.
            </p>
          </div>

          <div className="p-5 hairline-box surface-subtle">
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-warm">
              <Layers className="h-4 w-4" />
              <span>02 / UI/UX & System Design</span>
            </div>
            <p className="text-sm opacity-80">
              Prototyping tervalidasi dengan Maze, metrik SUS/SEQ, serta pemodelan alur sistem
              dengan Flowchart & spesifikasi Use Case.
            </p>
          </div>

          <div className="p-5 hairline-box surface-subtle">
            <div className="mb-2 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-warm">
              <ShieldCheck className="h-4 w-4" />
              <span>03 / Quality Assurance</span>
            </div>
            <p className="text-sm opacity-80">
              Otomatisasi pengujian dengan Katalon Studio & Vitest, matriks skenario uji, serta
              pelaporan bug yang sistematis.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Swiss Grid Metrics */}
      <div className="hairline-t">
        <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
          {HERO_METRICS.map((item, idx) => (
            <div
              key={item.label}
              className={`px-5 py-6 sm:px-8 ${idx % 2 === 1 ? "hairline-l" : ""} ${
                idx >= 2 ? "hairline-t lg:border-t-0 lg:hairline-l" : ""
              }`}
            >
              <span className="block font-mono text-[10px] tracking-[0.18em] uppercase opacity-55">
                {item.label}
              </span>
              <strong className="mt-1 block font-sans text-2xl font-extrabold tracking-tight sm:text-3xl">
                {item.value}
              </strong>
              <span className="mt-1 block text-xs opacity-70">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}