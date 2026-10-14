import * as React from "react"
import { Send, Copy, Check, Mail, MapPin, CheckCircle2, AlertTriangle } from "lucide-react"

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const DIRECT_EMAIL = "laurensius@pratama.dev"

export function ContactSection() {
  const [form, setForm] = React.useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle")
  const [copied, setCopied] = React.useState(false)

  const validate = (): FormErrors => {
    const next: FormErrors = {}
    if (form.name.trim().length < 2) {
      next.name = "Nama wajib diisi (minimal 2 karakter)."
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(form.email.trim())) {
      next.email = "Masukkan alamat email yang valid."
    }
    if (form.subject.trim().length < 3) {
      next.subject = "Subjek pesan wajib diisi (minimal 3 karakter)."
    }
    if (form.message.trim().length < 10) {
      next.message = "Pesan terlalu singkat (minimal 10 karakter)."
    }
    return next
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setStatus("submitting")
    window.setTimeout(() => {
      setStatus("success")
    }, 450)
  }

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DIRECT_EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const mailtoHref = React.useMemo(() => {
    const subject = encodeURIComponent(form.subject || "Kolaborasi Proyek — Laurensius Pratama")
    const body = encodeURIComponent(
      `Halo Laurensius,\n\nNama saya ${form.name} (${form.email}).\n\n${form.message}`
    )
    return `mailto:${DIRECT_EMAIL}?subject=${subject}&body=${body}`
  }, [form])

  return (
    <section id="contact" className="py-16 sm:py-24 hairline-b">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-warm">
              04 // INITIATE COLLABORATION
            </p>
            <h2 className="mt-2 font-sans text-3xl font-extrabold tracking-tight sm:text-5xl">
              Mari Diskusikan Proyek Anda.
            </h2>
            <p className="mt-4 text-sm leading-relaxed opacity-80">
              Terbuka untuk peluang kerja Full-Stack Developer, UI/UX Designer, maupun Software
              Quality Assurance Engineer. Kirimkan pesan melalui formulir tervalidasi di samping
              atau salin alamat email langsung.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between p-4 hairline-box surface-subtle">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-warm" />
                  <div>
                    <span className="block font-mono text-[10px] tracking-[0.16em] uppercase opacity-55">
                      SURAT ELEKTRONIK
                    </span>
                    <span className="font-mono text-xs">{DIRECT_EMAIL}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-[0.15em] uppercase hairline-box surface-hover"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-warm" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-3 p-4 hairline-box surface-subtle">
                <MapPin className="h-4 w-4 text-warm" />
                <div>
                  <span className="block font-mono text-[10px] tracking-[0.16em] uppercase opacity-55">
                    LOKASI & ZONA WAKTU
                  </span>
                  <span className="font-mono text-xs">
                    Depok, Sleman, DI Yogyakarta · UTC+7 (WIB)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Validated Interactive Form */}
          <div className="p-6 sm:p-8 hairline-box surface-subtle lg:col-span-7">
            {status === "success" ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-warm" />
                <p className="mt-4 font-mono text-xs tracking-[0.2em] uppercase text-warm">
                  VALIDASI FORMULIR BERHASIL
                </p>
                <h3 className="mt-2 font-sans text-2xl font-bold">
                  Terima kasih, {form.name}!
                </h3>
                <p className="mx-auto mt-2 max-w-md text-sm opacity-80">
                  Pesan Anda telah diformat dan siap dikirimkan. Klik tombol di bawah untuk
                  membuka aplikasi email Anda dengan draf yang sudah terisi otomatis, atau kirim
                  pesan baru.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 bg-warm px-6 py-3 font-mono text-xs font-semibold tracking-[0.16em] uppercase text-canvas"
                  >
                    <Mail className="h-4 w-4" />
                    Buka Aplikasi Email
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setForm({ name: "", email: "", subject: "", message: "" })
                      setErrors({})
                      setStatus("idle")
                    }}
                    className="px-5 py-3 font-mono text-xs tracking-[0.16em] uppercase hairline-box surface-hover"
                  >
                    Buat Pesan Baru
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs tracking-[0.16em] uppercase opacity-75"
                    >
                      Nama Lengkap *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value })
                        if (errors.name) setErrors({ ...errors, name: undefined })
                      }}
                      placeholder="Nama Anda"
                      aria-invalid={Boolean(errors.name)}
                      className="mt-2 w-full bg-transparent px-3.5 py-2.5 text-sm hairline-box focus:outline-none focus:ring-1 focus:ring-warm"
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-warm">
                        <AlertTriangle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs tracking-[0.16em] uppercase opacity-75"
                    >
                      Alamat Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value })
                        if (errors.email) setErrors({ ...errors, email: undefined })
                      }}
                      placeholder="nama@perusahaan.com"
                      aria-invalid={Boolean(errors.email)}
                      className="mt-2 w-full bg-transparent px-3.5 py-2.5 text-sm hairline-box focus:outline-none focus:ring-1 focus:ring-warm"
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-warm">
                        <AlertTriangle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-xs tracking-[0.16em] uppercase opacity-75"
                  >
                    Subjek Diskusi *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => {
                      setForm({ ...form, subject: e.target.value })
                      if (errors.subject) setErrors({ ...errors, subject: undefined })
                    }}
                    placeholder="Pengembangan Web / Audit UI/UX / QA Automation"
                    aria-invalid={Boolean(errors.subject)}
                    className="mt-2 w-full bg-transparent px-3.5 py-2.5 text-sm hairline-box focus:outline-none focus:ring-1 focus:ring-warm"
                  />
                  {errors.subject && (
                    <p className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-warm">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs tracking-[0.16em] uppercase opacity-75"
                  >
                    Detail Kebutuhan Proyek *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value })
                      if (errors.message) setErrors({ ...errors, message: undefined })
                    }}
                    placeholder="Ceritakan ruang lingkup proyek, jadwal, atau kebutuhan tim Anda..."
                    aria-invalid={Boolean(errors.message)}
                    className="mt-2 w-full bg-transparent px-3.5 py-2.5 text-sm hairline-box focus:outline-none focus:ring-1 focus:ring-warm"
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 font-mono text-[11px] text-warm">
                      <AlertTriangle className="h-3 w-3" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex w-full items-center justify-center gap-2 bg-warm px-6 py-3.5 font-mono text-xs font-semibold tracking-[0.18em] uppercase text-canvas transition-opacity disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {status === "submitting" ? "Memvalidasi Pesan..." : "Validasi & Siapkan Pesan"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}