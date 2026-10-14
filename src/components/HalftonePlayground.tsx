import { RotateCcw, Sparkles, MousePointerClick } from "lucide-react"

export interface PlaygroundConfig {
  wordmark: string
  dotGap: number
  radius: number
  crop: number
  grain: number
  interactive: boolean
}

interface HalftonePlaygroundProps {
  config: PlaygroundConfig
  onChange: (next: PlaygroundConfig) => void
  onReset: () => void
}

const WORD_PRESETS = ["laurensius", "pratama", "engineer", "halftone"]

export function HalftonePlayground({
  config,
  onChange,
  onReset,
}: HalftonePlaygroundProps) {
  const update = <K extends keyof PlaygroundConfig>(
    key: K,
    value: PlaygroundConfig[K]
  ) => {
    onChange({ ...config, [key]: value })
  }

  return (
    <section id="lab" className="py-16 sm:py-24 hairline-b">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 pb-8 hairline-b lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm">
              03 // INTERACTIVE HALFTONE CANVAS LAB
            </p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-5xl">
              Eksperimen Fisika Tipografi Footer
            </h2>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="btn-liquid-subtle self-start px-5 py-2.5 font-mono text-xs tracking-[0.16em] uppercase lg:self-auto"
          >
            <RotateCcw className="h-3.5 w-3.5 text-warm" />
            <span>Reset Parameter Default</span>
          </button>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-12">
          {/* Explanation Box */}
          <div className="flex flex-col justify-between p-6 hairline-box surface-subtle lg:col-span-5">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.16em] uppercase text-warm">
                <Sparkles className="h-4 w-4" />
                <span>Real-Time Props Inspector</span>
              </div>
              <h3 className="mt-3 font-sans text-xl font-bold">
                Kendalikan Footer Canvas Secara Langsung
              </h3>
              <p className="mt-2 text-sm leading-relaxed opacity-80">
                Komponen <code>HalftoneWordmarkFooter</code> di bagian paling bawah halaman ini
                dirender menggunakan matriks titik 2D Canvas. Ubah parameter di samping, lalu
                arahkan kursor atau klik pada area footer di bawah untuk merasakan gelombang
                kejut (shock ring) dan pegasnya.
              </p>
            </div>

            <div className="mt-6 space-y-2 pt-4 font-mono text-xs opacity-75 hairline-t">
              <div className="flex items-center gap-2 text-warm">
                <MousePointerClick className="h-4 w-4" />
                <span>TIPS INTERAKSI FOOTER:</span>
              </div>
              <p>1. Gerakkan pointer melintasi huruf raksasa di bagian bawah halaman.</p>
              <p>2. Klik di area titik-titik huruf untuk memicu efek gelombang kejut 900ms.</p>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="grid gap-6 p-6 hairline-box surface-subtle sm:grid-cols-2 lg:col-span-7">
            {/* Wordmark Input */}
            <div className="sm:col-span-2">
              <label
                htmlFor="hwf-wordmark-input"
                className="block font-mono text-xs tracking-[0.16em] uppercase opacity-75"
              >
                Teks Wordmark (Huruf kecil direkomendasikan)
              </label>
              <div className="mt-2.5 flex flex-wrap items-center gap-2.5">
                <input
                  id="hwf-wordmark-input"
                  type="text"
                  maxLength={16}
                  value={config.wordmark}
                  onChange={(e) => update("wordmark", e.target.value)}
                  className="flex-1 rounded-full bg-transparent px-4 py-2 font-mono text-sm hairline-box focus:outline-none focus:ring-1 focus:ring-warm"
                  placeholder="laurensius"
                />
                {WORD_PRESETS.map((word) => (
                  <button
                    key={word}
                    type="button"
                    onClick={() => update("wordmark", word)}
                    className={
                      config.wordmark === word
                        ? "btn-liquid px-4 py-2 font-mono text-xs tracking-wider uppercase"
                        : "btn-liquid-subtle px-4 py-2 font-mono text-xs tracking-wider uppercase opacity-80"
                    }
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            {/* Dot Gap Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <label htmlFor="slider-dotgap" className="uppercase opacity-75">
                  Jarak Titik (dotGap)
                </label>
                <span className="text-warm">{config.dotGap}px</span>
              </div>
              <input
                id="slider-dotgap"
                type="range"
                min={4}
                max={14}
                step={1}
                value={config.dotGap}
                onChange={(e) => update("dotGap", Number(e.target.value))}
                className="mt-2 w-full accent-[var(--app-warm)]"
              />
              <span className="mt-1 block font-mono text-[10px] opacity-55">
                4px (Sangat rapat) — 14px (Halftone kasar)
              </span>
            </div>

            {/* Pointer Radius Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <label htmlFor="slider-radius" className="uppercase opacity-75">
                  Radius Dorong (radius)
                </label>
                <span className="text-warm">{config.radius}px</span>
              </div>
              <input
                id="slider-radius"
                type="range"
                min={30}
                max={180}
                step={5}
                value={config.radius}
                onChange={(e) => update("radius", Number(e.target.value))}
                className="mt-2 w-full accent-[var(--app-warm)]"
              />
              <span className="mt-1 block font-mono text-[10px] opacity-55">
                Jangkauan tolakan pegas di sekitar kursor
              </span>
            </div>

            {/* Crop Ratio Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <label htmlFor="slider-crop" className="uppercase opacity-75">
                  Potongan Bawah (crop)
                </label>
                <span className="text-warm">{Math.round(config.crop * 100)}%</span>
              </div>
              <input
                id="slider-crop"
                type="range"
                min={0}
                max={0.5}
                step={0.05}
                value={config.crop}
                onChange={(e) => update("crop", Number(e.target.value))}
                className="mt-2 w-full accent-[var(--app-warm)]"
              />
              <span className="mt-1 block font-mono text-[10px] opacity-55">
                Persentase tinggi huruf yang terpotong tepi bawah
              </span>
            </div>

            {/* Print Grain Slider */}
            <div>
              <div className="flex justify-between font-mono text-xs">
                <label htmlFor="slider-grain" className="uppercase opacity-75">
                  Tekstur Kertas (grain)
                </label>
                <span className="text-warm">{Math.round(config.grain * 100)}%</span>
              </div>
              <input
                id="slider-grain"
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={config.grain}
                onChange={(e) => update("grain", Number(e.target.value))}
                className="mt-2 w-full accent-[var(--app-warm)]"
              />
              <span className="mt-1 block font-mono text-[10px] opacity-55">
                Intensitas efek bintik cetak di atas canvas
              </span>
            </div>

            {/* Interactive Toggle */}
            <div className="flex items-center justify-between pt-2 hairline-t sm:col-span-2">
              <div>
                <span className="block font-mono text-xs uppercase">
                  Respons Pointer & Gelombang Kejut (interactive)
                </span>
                <span className="text-xs opacity-65">
                  Matikan untuk mengunci titik-titik pada posisi statis.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={config.interactive}
                onClick={() => update("interactive", !config.interactive)}
                className={
                  config.interactive
                    ? "btn-liquid px-5 py-2 font-mono text-xs uppercase tracking-wider"
                    : "btn-liquid-subtle px-5 py-2 font-mono text-xs uppercase tracking-wider opacity-65"
                }
              >
                {config.interactive ? "AKTIF" : "STATIS"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}