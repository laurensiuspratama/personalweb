import * as React from "react"
import { X, ShieldCheck, Wrench, AlertCircle, ExternalLink } from "lucide-react"
import type { ProjectItem } from "@/data/portfolio"

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  React.useEffect(() => {
    if (!project) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-canvas text-ink shadow-2xl hairline-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-canvas/95 px-6 py-4 backdrop-blur-sm hairline-b">
          <div className="font-mono text-xs tracking-[0.18em] uppercase text-warm">
            CASE STUDY #{project.index} · {project.category}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail proyek"
            className="btn-liquid-subtle h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Image Banner */}
        <div className="aspect-[16/9] w-full overflow-hidden hairline-b">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs opacity-65">
            <span>TAHUN PENGERJAAN: {project.year}</span>
            <span>HASIL UTAMA: {project.metrics}</span>
          </div>

          <h2
            id="modal-project-title"
            className="mt-2 font-sans text-2xl font-extrabold sm:text-3xl"
          >
            {project.title}
          </h2>

          <p className="mt-3 text-base leading-relaxed opacity-85">{project.summary}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="p-4 hairline-box surface-subtle">
              <div className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-warm">
                <AlertCircle className="h-4 w-4" />
                <span>Tantangan Utama</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{project.challenge}</p>
            </div>

            <div className="p-4 hairline-box surface-subtle">
              <div className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-warm">
                <Wrench className="h-4 w-4" />
                <span>Solusi Arsitektur & Desain</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{project.solution}</p>
            </div>
          </div>

          <div className="mt-4 p-4 hairline-box surface-subtle">
            <div className="flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase text-warm">
              <ShieldCheck className="h-4 w-4" />
              <span>Quality Assurance & Validasi Pengujian</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed opacity-80">{project.qaHighlight}</p>
          </div>

          {/* Tech Stack */}
          <div className="mt-6">
            <h3 className="font-mono text-xs tracking-[0.16em] uppercase opacity-60">
              Teknologi & Metodologi
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full px-3 py-1 font-mono text-xs tracking-wider uppercase hairline-box surface-subtle"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 hairline-t">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-liquid-subtle px-5 py-2.5 font-mono text-xs tracking-[0.16em] uppercase"
            >
              <span>Dokumentasi / Repository</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="btn-liquid px-6 py-2.5 font-mono text-xs tracking-[0.16em] uppercase"
            >
              Tutup Studi Kasus
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}