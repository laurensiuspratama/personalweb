import * as React from "react"
import { Search, ArrowUpRight, RotateCcw, CheckCircle2 } from "lucide-react"
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
  const [selectedCategory, setSelectedCategory] = React.useState<ProjectCategory>("All")
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredProjects = React.useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory
      const q = searchQuery.trim().toLowerCase()
      const matchesQuery =
        q === "" ||
        project.title.toLowerCase().includes(q) ||
        project.summary.toLowerCase().includes(q) ||
        project.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [selectedCategory, searchQuery])

  const resetFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
  }

  return (
    <section id="work" className="py-16 sm:py-24 hairline-b">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 pb-8 hairline-b lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm">
              01 // SELECTED WORKS & CASE STUDIES
            </p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-5xl">
              Arsip Karya & Studi Kasus
            </h2>
          </div>
          <p className="max-w-md text-sm opacity-75">
            Klik pada salah satu proyek untuk membaca rincian arsitektur, solusi teknis, serta
            sorotan pengujian Quality Assurance (QA).
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div
            role="tablist"
            aria-label="Filter kategori proyek"
            className="flex flex-wrap gap-2"
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
                  className={`px-4 py-2 font-mono text-[11px] tracking-[0.16em] uppercase transition-all hairline-box focus-visible:outline focus-visible:outline-1 focus-visible:outline-warm ${
                    active
                      ? "bg-warm text-canvas font-semibold"
                      : "surface-subtle opacity-75 hover:opacity-100"
                  }`}
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
              className="w-full bg-transparent py-2 pl-10 pr-4 font-mono text-xs placeholder:opacity-45 hairline-box focus:outline-none focus:ring-1 focus:ring-warm"
            />
          </div>
        </div>

        {/* Status Counter */}
        <div className="mt-4 flex items-center justify-between font-mono text-[11px] tracking-[0.15em] uppercase opacity-60">
          <span>
            Menampilkan {filteredProjects.length} dari {PROJECTS.length} Proyek
          </span>
          {(selectedCategory !== "All" || searchQuery.trim() !== "") && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-warm underline underline-offset-4 hover:opacity-80"
            >
              <RotateCcw className="h-3 w-3" />
              Reset Filter
            </button>
          )}
        </div>

        {/* Project Grid or Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="mt-8 p-12 text-center hairline-box surface-subtle">
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-warm">
              DATA TIDAK DITEMUKAN
            </p>
            <h3 className="mt-2 font-sans text-xl font-bold">
              Tidak ada proyek yang cocok dengan pencarian &ldquo;{searchQuery}&rdquo;
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm opacity-75">
              Coba gunakan kata kunci lain (seperti React, Katalon, Maze, atau Draw.io) atau
              kembalikan filter ke semua kategori.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 bg-warm px-5 py-2.5 font-mono text-xs font-semibold tracking-[0.16em] uppercase text-canvas"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Tampilkan Semua Proyek
            </button>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1 hairline-box surface-subtle"
              >
                <div>
                  {/* Image Header */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden hairline-b">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3 bg-canvas/90 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] uppercase backdrop-blur-sm hairline-box">
                      {project.index} · {project.category}
                    </div>
                  </div>

                  {/* Card Content */}
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
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase opacity-75 hairline-box"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Footer */}
                <div className="px-6 py-4 hairline-t">
                  <button
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="flex w-full items-center justify-between font-mono text-xs font-medium tracking-[0.16em] uppercase text-warm transition-opacity group-hover:opacity-100"
                  >
                    <span>Bedah Studi Kasus & QA</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}