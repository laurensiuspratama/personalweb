import * as React from "react"
import { Menu, X, Sparkles, Palette } from "lucide-react"
import type { HalftonePreset } from "@/components/ui/halftone-wordmark-footer"
import { THEME_PALETTES } from "@/data/portfolio"

interface NavbarProps {
  preset: HalftonePreset
  onPresetChange: (preset: HalftonePreset) => void
}

const NAV_ITEMS = [
  { label: "Work", href: "#work", index: "01" },
  { label: "About & QA", href: "#about", index: "02" },
  { label: "Halftone Lab", href: "#lab", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
]

export function Navbar({ preset, onPresetChange }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const presets: HalftonePreset[] = ["night", "paper", "ember", "cobalt"]

  return (
    <header className="sticky top-0 z-40 w-full bg-canvas/85 backdrop-blur-md hairline-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Brand Identity */}
        <a
          href="#hero"
          className="group flex items-center gap-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-warm"
        >
          <span className="flex h-2.5 w-2.5 rounded-full bg-warm transition-transform duration-300 group-hover:scale-125" />
          <div className="font-mono text-xs tracking-[0.2em] uppercase">
            <span className="font-semibold">Laurensius Pratama</span>
            <span className="hidden opacity-50 xl:inline"> · ENG / UIX / QA</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group font-mono text-[11px] tracking-[0.18em] uppercase opacity-75 transition-opacity hover:opacity-100"
            >
              <span className="mr-1.5 text-warm opacity-70">{item.index}.</span>
              <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-current">
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Theme Preset Switcher (Liquid Glass Pills) */}
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Theme color presets"
            className="flex items-center gap-1.5 rounded-full p-1 hairline-box surface-subtle"
          >
            <Palette className="ml-2 mr-1 hidden h-3.5 w-3.5 opacity-60 sm:inline" aria-hidden="true" />
            {presets.map((p) => {
              const active = preset === p
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPresetChange(p)}
                  title={`Tema ${THEME_PALETTES[p].name}`}
                  aria-pressed={active}
                  className={
                    active
                      ? "btn-liquid px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                      : "rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase opacity-65 transition-opacity hover:opacity-100"
                  }
                >
                  {p}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="btn-liquid-subtle h-9 w-9 p-0 md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="px-5 py-5 hairline-t surface-subtle md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-2 font-mono text-xs tracking-[0.18em] uppercase"
                >
                  <span>{item.label}</span>
                  <span className="text-warm">{item.index} →</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between pt-4 font-mono text-[11px] opacity-60 hairline-t">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-warm" />
              Preset Aktif: {THEME_PALETTES[preset].name}
            </span>
            <span>Yogyakarta, ID</span>
          </div>
        </nav>
      )}
    </header>
  )
}