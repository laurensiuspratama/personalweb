import * as React from "react"
import {
  Search,
  ArrowUpRight,
  RotateCcw,
  CheckCircle2,
  FolderOpen,
  LayoutGrid,
  Sparkles,
} from "lucide-react"
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder-cards"
import { PROJECTS, type ProjectCategory, type ProjectItem } from "@/data/portfolio"

interface WorkSectionProps {
  onSelectProject: (project: ProjectItem) => void
}

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Full-Stack Web",
  "UI/UX & Prototyping",
  "QA & Automation",
]

export function WorkSection({ onSelectProject }: WorkSectionProps) {
  const [viewMode, setViewMode] = React.useState<"folders" | "grid">("folders")
  const [selectedCategory, setSelectedCategory] = React.useState<ProjectCategory>("All")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [folderWidth, setFolderWidth] = React.useState<number>(340)
  const [activeNotice, setActiveNotice] = React.useState<string>(
    "Hover folder untuk memiringkan kaca · Klik folder untuk membuka berkas · Klik lembaran berkas untuk membaca Studi Kasus & QA"
  )

  React.useEffect(() => {
    const updateWidth = () => {
      const vw = window.innerWidth
      setFolderWidth(vw < 400 ? Math.max(280, vw - 48) : 340)
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  const findAndOpenProject = (projectId: string, fallbackCategory?: Exclude<ProjectCategory, "All">) => {
    const found =
      PROJECTS.find((p) => p.id === projectId) ||
      (fallbackCategory ? PROJECTS.find((p) => p.category === fallbackCategory) : PROJECTS[0])
    if (found) {
      onSelectProject(found)
    }
  }

  const filteredProjects = React.useMemo(() => {
    return PROJECTS.filter((project: ProjectItem) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory
      const q = searchQuery.trim().toLowerCase()
      const matchesQuery =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.tags.some((t: string) => t.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [selectedCategory, searchQuery])

  const resetFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
  }

  const extraFullStackSamples: FolderFile[] = [
    {
      name: "Vite + TS Config",
      meta: "JSON · 4 KB",
    },
    {
      name: "Shader Canvas v2",
      meta: "TSX · 60 FPS",
      art: "verdant",
    },
    {
      name: "Vercel Edge Build",
      meta: "Ready · 340ms",
      art: "aurora",
    },
  ]

  return (
    <section id="work" className="py-16 sm:py-24 hairline-b">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header + Liquid Glass View Switcher */}
        <div className="flex flex-col justify-between gap-6 pb-8 hairline-b lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm">
              01 // EKSPLORASI KARYA & ARSIP STUDI KASUS
            </p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-5xl">
              Eksplorasi Karya Interaktif
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode("folders")}
              aria-pressed={viewMode === "folders"}
              className={
                viewMode === "folders"
                  ? "btn-liquid px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase"
                  : "btn-liquid-subtle px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase opacity-80"
              }
            >
              <FolderOpen className="h-3.5 w-3.5" />
              <span>Glass Folders (3D)</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              aria-pressed={viewMode === "grid"}
              className={
                viewMode === "grid"
                  ? "btn-liquid px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase"
                  : "btn-liquid-subtle px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase opacity-80"
              }
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Katalog Grid ({PROJECTS.length})</span>
            </button>
          </div>
        </div>

        {/* MODE 1: GLASS FOLDER CARDS DESK */}
        {viewMode === "folders" ? (
          <div className="relative mt-8 flex w-full flex-col items-center justify-center overflow-hidden px-4 py-16 sm:px-8 sm:py-20 hairline-box surface-subtle">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage: "radial-gradient(currentColor 1.1px, transparent 1.4px)",
                backgroundSize: "22px 22px",
              }}
            />

            <div className="relative z-10 mb-10 inline-flex items-center gap-2 rounded-full bg-canvas/85 px-5 py-2 text-center font-mono text-[11px] tracking-[0.14em] uppercase backdrop-blur-sm hairline-box">
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-warm" />
              <span>{activeNotice}</span>
            </div>

            <div className="relative z-10 grid max-w-[1180px] grid-cols-1 items-end justify-items-center gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
              {/* FOLDER 1 */}
              <div className="flex flex-col items-center">
                <GlassFolder
                  label="Full-Stack Web"
                  art="aurora"
                  seed={3}
                  width={folderWidth}
                  appearDelay={0}
                  files={[
                    {
                      name: "Halftone Editorial",
                      meta: "React · 60 FPS",
                      art: "ember",
                    },
                    {
                      name: "Retail POS Suite",
                      meta: "Python · GUI",
                      image:
                        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      name: "Architecture.pdf",
                      meta: "TSX · shadcn/ui",
                    },
                  ]}
                  onAdd={(currentFiles) => {
                    const pick =
                      extraFullStackSamples[currentFiles.length % extraFullStackSamples.length]
                    setActiveNotice(
                      `Berkas "${pick.name}" berhasil ditambahkan ke folder Full-Stack Web!`
                    )
                    return pick
                  }}
                  onFileSelect={(file, index) => {
                    setActiveNotice(`Membuka studi kasus: ${file.name}`)
                    if (index % 2 === 1) {
                      findAndOpenProject("retail-pos-desktop-suite", "Full-Stack Web")
                    } else {
                      findAndOpenProject("halftone-editorial-system", "Full-Stack Web")
                    }
                  }}
                />
                <span className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase opacity-65">
                  01 · Klik folder untuk buka · Klik + tambah berkas
                </span>
              </div>

              {/* FOLDER 2 */}
              <div className="flex flex-col items-center">
                <GlassFolder
                  label="UI/UX & Research"
                  art="none"
                  action="more"
                  labelPlacement="top-left"
                  width={folderWidth}
                  appearDelay={140}
                  files={[
                    {
                      name: "MyWallet FinTech",
                      meta: "94% MSR · Maze",
                      image:
                        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      name: "SUS & SEQ Report",
                      meta: "Skor 88/100",
                    },
                    {
                      name: "Academic Planner",
                      meta: "Swiss Grid UI",
                      art: "dusk",
                    },
                    {
                      name: "Wireframes.fig",
                      meta: "Low-Fi to Hi-Fi",
                    },
                  ]}
                  menu={[
                    {
                      label: "Buka Studi Kasus MyWallet",
                      onSelect: () => findAndOpenProject("mywallet-fintech-ux", "UI/UX & Prototyping"),
                    },
                    {
                      label: "Buka Academic Planner",
                      onSelect: () =>
                        findAndOpenProject("academic-schedule-planner", "UI/UX & Prototyping"),
                    },
                    {
                      label: "Filter Kategori UI/UX di Grid",
                      onSelect: () => {
                        setSelectedCategory("UI/UX & Prototyping")
                        setViewMode("grid")
                      },
                    },
                  ]}
                  onFileSelect={(_, index) => {
                    if (index >= 2) {
                      findAndOpenProject("academic-schedule-planner", "UI/UX & Prototyping")
                    } else {
                      findAndOpenProject("mywallet-fintech-ux", "UI/UX & Prototyping")
                    }
                  }}
                />
                <span className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase opacity-65">
                  02 · Klik berkas untuk detail · Menu ··· aktif
                </span>
              </div>

              {/* FOLDER 3 */}
              <div className="flex flex-col items-center md:col-span-2 xl:col-span-1">
                <GlassFolder
                  label="QA & Automation"
                  meta="42 Test Suites"
                  tone="dark"
                  art="ember"
                  seed={11}
                  action="none"
                  labelPlacement="top-right"
                  width={folderWidth}
                  appearDelay={280}
                  files={[
                    {
                      name: "E-Commerce QA",
                      meta: "Katalon Studio",
                      image:
                        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
                    },
                    {
                      name: "Bug Matrix Report",
                      meta: "24+ Defects Logged",
                    },
                    {
                      name: "ATM Core Flowchart",
                      meta: "Draw.io XML · 100%",
                      art: "verdant",
                    },
                  ]}
                  onFileSelect={(_, index) => {
                    if (index === 2) {
                      findAndOpenProject("atm-core-workflow-architecture", "QA & Automation")
                    } else {
                      findAndOpenProject("ecommerce-qa-suite", "QA & Automation")
                    }
                  }}
                />
                <span className="mt-4 font-mono text-[10px] tracking-[0.18em] uppercase opacity-65">
                  03 · Smoked Glass · Klik berkas untuk laporan QA
                </span>
              </div>
            </div>

            {/* Quick Project Liquid Glass Pills */}
            <div className="relative z-10 mt-14 w-full max-w-4xl pt-6 hairline-t">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase opacity-65">
                  AKSES CEPAT STUDI KASUS LENGKAP:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {PROJECTS.map((project: ProjectItem) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="btn-liquid-subtle px-4 py-1.5 font-mono text-[10px] tracking-[0.14em] uppercase"
                    >
                      <span className="text-warm">{project.index}.</span>
                      <span>
                        {project.title.split(" ")[0]} {project.title.split(" ")[1]}
                      </span>
                      <ArrowUpRight className="h-3 w-3 text-warm" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* MODE 2: FULL CATALOG GRID */
          <div>
            <div className="mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div
                role="tablist"
                aria-label="Filter kategori proyek"
                className="flex flex-wrap gap-2.5"
              >
                {CATEGORIES.map((category) => {
                  const active = selectedCategory === category
                  return (
                    <button
                      key={category}
                      role="tab"
                      type="button"
                      aria-selected={active}
                      onClick={() => setSelectedCategory(category)}
                      className={
                        active
                          ? "btn-liquid px-5 py-2 font-mono text-[11px] tracking-[0.16em] uppercase"
                          : "btn-liquid-subtle px-5 py-2 font-mono text-[11px] tracking-[0.16em] uppercase opacity-80"
                      }
                    >
                      {category}
                    </button>
                  )
                })}
              </div>

              <div className="relative w-full lg:w-72">
                <Search
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari proyek atau teknologi..."
                  aria-label="Cari proyek atau teknologi"
                  className="w-full rounded-full bg-transparent py-2 pl-10 pr-4 font-mono text-xs placeholder:opacity-45 hairline-box focus:outline-none focus:ring-1 focus:ring-warm"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between font-mono text-[11px] tracking-[0.15em] uppercase opacity-60">
              <span>
                Menampilkan {filteredProjects.length} dari {PROJECTS.length} Proyek
              </span>
              {(selectedCategory !== "All" || searchQuery.trim() !== "") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-liquid-subtle px-3.5 py-1 font-mono text-[10px] tracking-[0.14em] uppercase"
                >
                  <RotateCcw className="h-3 w-3 text-warm" />
                  <span>Reset Filter</span>
                </button>
              )}
            </div>

            {filteredProjects.length === 0 ? (
              <div className="mt-8 p-12 text-center hairline-box surface-subtle">
                <p className="font-mono text-xs tracking-[0.18em] uppercase text-warm">
                  DATA TIDAK DITEMUKAN
                </p>
                <h3 className="mt-2 font-sans text-xl font-bold">
                  Tidak ada proyek yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;
                </h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="btn-liquid mt-6 px-6 py-2.5 font-mono text-xs tracking-[0.16em] uppercase"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Tampilkan Semua Proyek</span>
                </button>
              </div>
            ) : (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project: ProjectItem) => (
                  <article
                    key={project.id}
                    className="group flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hairline-box surface-subtle"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden hairline-b">
                        <img
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute left-3 top-3 rounded-full bg-canvas/90 px-3 py-1 font-mono text-[10px] tracking-[0.16em] uppercase backdrop-blur-sm hairline-box">
                          {project.index} · {project.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between font-mono text-[11px] opacity-60">
                          <span>TAHUN {project.year}</span>
                          <span className="flex items-center gap-1 text-warm">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            {project.metrics}
                          </span>
                        </div>

                        <h3 className="mt-3 font-sans text-xl font-bold leading-snug">
                          {project.title}
                        </h3>

                        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed opacity-80">
                          {project.summary}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.tags.map((tag: string) => (
                            <span
                              key={tag}
                              className="rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase opacity-75 hairline-box"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 hairline-t">
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="btn-liquid w-full py-2.5 font-mono text-xs tracking-[0.15em] uppercase"
                      >
                        <span>Bedah Studi Kasus & QA</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}