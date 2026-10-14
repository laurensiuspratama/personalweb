import * as React from "react"
import HalftoneWordmarkFooter, {
  type HalftonePreset,
} from "@/components/ui/halftone-wordmark-footer"
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
      // Ignore storage write errors in restricted browsing modes
    }
  }, [preset])

  return (
    <div className="min-h-screen w-full bg-canvas text-ink">
      <Navbar preset={preset} onPresetChange={setPreset} />

      <main>
        <HeroSection />
        <WorkSection onSelectProject={setActiveProject} />
        <AboutSection />
        <HalftonePlayground
          config={playground}
          onChange={setPlayground}
          onReset={() => setPlayground(DEFAULT_PLAYGROUND)}
        />
        <ContactSection />
      </main>

      {/* Main Halftone Wordmark Footer (w-full wrapper required to prevent 0px canvas collapse) */}
      <div className="w-full">
        <HalftoneWordmarkFooter
          wordmark={playground.wordmark || "laurensius"}
          label="Laurensius Pratama"
          meta="©2026 · Yogyakarta / Indonesia · Full-Stack & QA"
          columns={FOOTER_COLUMNS}
          preset={preset}
          dotGap={playground.dotGap}
          radius={playground.radius}
          crop={playground.crop}
          grain={playground.grain}
          interactive={playground.interactive}
          backToTop={true}
          height="560px"
        />
      </div>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  )
}