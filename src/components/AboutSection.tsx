import * as React from "react"
import { WORKFLOW_STEPS, SKILL_GROUPS, type SkillGroup } from "@/data/portfolio"

export function AboutSection() {
  const [activeSkillTab, setActiveSkillTab] = React.useState(SKILL_GROUPS[0].id)
  const currentGroup =
    SKILL_GROUPS.find((g: SkillGroup) => g.id === activeSkillTab) || SKILL_GROUPS[0]

  return (
    <section id="about" className="py-16 sm:py-24 hairline-b">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Bio & Philosophy */}
        <div className="grid gap-10 pb-16 hairline-b lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm">
              02 // ABOUT & ENGINEERING METHODOLOGY
            </p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-5xl">
              Presisi Desain, Ketangguhan Kode.
            </h2>
          </div>

          <div className="space-y-4 text-base leading-relaxed opacity-85 lg:col-span-7">
            <p>
              Saya <strong>Laurensius Pratama</strong>, seorang pengembang perangkat lunak yang
              memandang pembuatan website bukan sekadar menyusun tampilan visual, melainkan
              merancang sistem yang utuh—mulai dari pemodelan alur kerja, riset keterpakaian
              (usability), penulisan kode terstruktur, hingga pengujian kualitas terotomatisasi.
            </p>
            <p>
              Dengan pengalaman dalam memadukan <strong>React & TypeScript</strong> untuk pengembangan
              antarmuka modern, evaluasi prototipe melalui <strong>Maze (SUS & SEQ)</strong>, serta
              pengujian regresi menggunakan <strong>Katalon Studio & Vitest</strong>, saya memastikan
              setiap fitur memiliki fungsi yang jelas dan bebas dari bug tersembunyi.
            </p>
          </div>
        </div>

        {/* 4-Step Engineering Process */}
        <div className="py-16 hairline-b">
          <div className="mb-8 flex items-center justify-between">
            <h3 className="font-mono text-xs tracking-[0.2em] uppercase opacity-70">
              ALUR KERJA REKAYASA PERANGKAT LUNAK (SDLC)
            </h3>
            <span className="font-mono text-xs text-warm">STEP 01 — 04</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WORKFLOW_STEPS.map((item) => (
              <div key={item.step} className="flex flex-col justify-between p-6 hairline-box surface-subtle">
                <div>
                  <span className="font-mono text-xs font-semibold tracking-[0.2em] text-warm">
                    PHASE // {item.step}
                  </span>
                  <h4 className="mt-3 font-sans text-lg font-bold">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed opacity-75">{item.description}</p>
                </div>
                <div className="mt-6 pt-3 font-mono text-[10px] tracking-[0.18em] uppercase opacity-45 hairline-t">
                  VERIFIED WORKFLOW
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Skills Matrix with Liquid Glass Tabs */}
        <div className="pt-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm">
                KOMPETENSI TEKNIS & TOOLS
              </p>
              <h3 className="mt-2 font-sans text-2xl font-extrabold sm:text-3xl">
                Matriks Kapabilitas Teknis
              </h3>
            </div>

            <div role="tablist" aria-label="Kategori keahlian" className="flex flex-wrap gap-2.5">
              {SKILL_GROUPS.map((group: SkillGroup) => {
                const isSelected = group.id === activeSkillTab
                return (
                  <button
                    key={group.id}
                    role="tab"
                    type="button"
                    aria-selected={isSelected}
                    onClick={() => setActiveSkillTab(group.id)}
                    className={
                      isSelected
                        ? "btn-liquid px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase"
                        : "btn-liquid-subtle px-5 py-2.5 font-mono text-xs tracking-[0.15em] uppercase opacity-80"
                    }
                  >
                    {group.label}
                  </button>
                )
              })}
            </div>
          </div>

          <p className="mt-4 text-sm opacity-75">{currentGroup.description}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {currentGroup.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col justify-between p-5 hairline-box surface-subtle"
              >
                <div className="flex items-start justify-between gap-2">
                  <strong className="font-sans text-base font-bold">{skill.name}</strong>
                  <span className="rounded-full px-2.5 py-0.5 font-mono text-[10px] tracking-wider uppercase text-warm hairline-box">
                    {skill.level}
                  </span>
                </div>
                <span className="mt-2 text-xs opacity-70">{skill.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}