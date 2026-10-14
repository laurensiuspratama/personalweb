import * as React from "react"
import { Sparkles, Layers } from "lucide-react"
import HalftoneWordmarkFooter, {
  type HalftonePreset,
} from "@/components/ui/halftone-wordmark-footer"
import MotionFooter from "@/components/ui/motion-footer"
import VioletSwirlShader from "@/components/ui/violet-swirl-shader"
import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { WorkSection } from "@/components/WorkSection"
import { ProjectModal } from "@/components/ProjectModal"
import { AboutSection } from "@/components/AboutSection"
import {
  HalftonePlayground,
  type PlaygroundConfig,
} from "@/components/HalftonePlayground"
import { ContactSection } from "@/components/ContactSection"
import {
  FOOTER_COLUMNS,
  THEME_PALETTES,
  type ProjectItem,
} from "@/data/portfolio"

const STORAGE_THEME_KEY = "laurensius-theme-preset"

const DEFAULT_PLAYGROUND: PlaygroundConfig = {
  wordmark: "laurensius",
  dotGap: 6,
  radius: 80,
  crop: 0.2,
  grain: 0.5,
  interactive: true,
}

export default function App() {
  const [preset, setPreset] = React.useState<HalftonePreset>(() => {
    if (typeof window === "undefined") return "night"
    const saved = window.localStorage.getItem(STORAGE_THEME_KEY) as HalftonePreset | null
    return saved && saved in THEME_PALETTES ? saved : "night"
  })

  const [shaderEnabled, setShaderEnabled] = React.useState(true)
  const [footerStyle, setFooterStyle] = React.useState<"motion" | "halftone">("motion")
  const [activeProject, setActiveProject] = React.useState<ProjectItem | null>(null)
  const [playground, setPlayground] = React.useState<PlaygroundConfig>(DEFAULT_PLAYGROUND)

  React.useEffect(() => {
    const palette = THEME_PALETTES[preset] || THEME_PALETTES.night
    const root = document.documentElement
    root.style.setProperty("--app-bg", palette.background)
    root.style.setProperty("--app-ink", palette.ink)
    root.style.setProperty("--app-warm", palette.warm)
    try {
      window.localStorage.setItem(STORAGE_THEME_KEY, preset)
    } catch {
      // Ignore storage write errors
    }
  }, [preset])

  const footerPalette = shaderEnabled
    ? { background: "#090412", ink: "#f3e8ff", warm: "#d946ef" }
    : undefined

  return (
    <div
      className={`relative min-h-screen w-full text-ink transition-colors duration-500 ${
        shaderEnabled ? "bg-transparent" : "bg-canvas"
      }`}
    >
      {/* Background WebGL Violet Swirl Shader */}
      {shaderEnabled && <VioletSwirlShader speed={0.65} intensity={1.05} />}

      <Navbar preset={preset} onPresetChange={setPreset} />

      <main className="relative z-10">
        <HeroSection />
        <WorkSection onSelectProject={setActiveProject} />
        <AboutSection />
        <HalftonePlayground
          config={playground}
          onChange={(next) => {
            setPlayground(next)
            setFooterStyle("halftone")
          }}
          onReset={() => {
            setPlayground(DEFAULT_PLAYGROUND)
            setFooterStyle("motion")
          }}
        />
        <ContactSection />
      </main>

      {/* Footer Mode Switcher Bar + Main Footer */}
      <div className="relative z-10 w-full">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-8 hairline-t surface-subtle">
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-75">
            FOOTER ENGINE: {footerStyle === "motion" ? "MOTION FOOTER (@JAHED)" : "HALFTONE CANVAS"}
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setFooterStyle("motion")}
              className={
                footerStyle === "motion"
                  ? "btn-liquid px-4 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase"
                  : "btn-liquid-subtle px-4 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase opacity-75"
              }
            >
              <Layers className="h-3 w-3" />
              <span>Motion Footer</span>
            </button>
            <button
              type="button"
              onClick={() => setFooterStyle("halftone")}
              className={
                footerStyle === "halftone"
                  ? "btn-liquid px-4 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase"
                  : "btn-liquid-subtle px-4 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase opacity-75"
              }
            >
              <span>Halftone Dots</span>
            </button>
          </div>
        </div>

        {footerStyle === "motion" ? (
          <MotionFooter
            brandName="Laurensius Pratama"
            wordmark={(playground.wordmark || "LAURENSIUS").toUpperCase()}
            email="laurensdap@gmail.com"
            columns={FOOTER_COLUMNS}
          />
        ) : (
          <HalftoneWordmarkFooter
            wordmark={playground.wordmark || "laurensius"}
            label="Laurensius Pratama"
            meta="©2026 · Yogyakarta / Indonesia · Full-Stack & QA"
            columns={FOOTER_COLUMNS}
            preset={preset}
            palette={footerPalette}
            dotGap={playground.dotGap}
            radius={playground.radius}
            crop={playground.crop}
            grain={playground.grain}
            interactive={playground.interactive}
            backToTop={true}
            height="560px"
          />
        )}
      </div>

      {/* Tombol Mengambang Liquid Metal untuk Mengatur Violet Swirl Shader */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setShaderEnabled((prev) => !prev)}
          aria-pressed={shaderEnabled}
          className={
            shaderEnabled
              ? "btn-liquid px-4 py-2 font-mono text-[10px] tracking-[0.16em] uppercase shadow-xl"
              : "btn-liquid-subtle px-4 py-2 font-mono text-[10px] tracking-[0.16em] uppercase"
          }
        >
          <Sparkles className="h-3.5 w-3.5 text-purple-300" />
          <span>{shaderEnabled ? "Violet Shader: ON" : "Violet Shader: OFF"}</span>
        </button>
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  )
}