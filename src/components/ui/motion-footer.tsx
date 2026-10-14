"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowUpRight,
  ArrowUp,
  Mail,
  Sparkles,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react"
import type { FooterColumn } from "@/components/ui/halftone-wordmark-footer"

export interface MotionFooterProps {
  brandName?: string
  wordmark?: string
  tagline?: string
  email?: string
  location?: string
  columns?: FooterColumn[]
  className?: string
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Navigation",
    links: [
      { label: "Selected Work", href: "#work" },
      { label: "About & Process", href: "#about" },
      { label: "Interactive Lab", href: "#lab" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Disciplines",
    links: [
      { label: "Full-Stack Web", href: "#work" },
      { label: "UI/UX & Usability", href: "#work" },
      { label: "QA Automation", href: "#work" },
      { label: "System Modeling", href: "#about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "laurensdap@gmail.com", href: "mailto:laurensdap@gmail.com" },
      { label: "GitHub Profile", href: "https://github.com/laurensiuspratama" },
      { label: "LinkedIn Network", href: "https://linkedin.com" },
      { label: "Yogyakarta, ID", href: "#contact" },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 18,
    },
  },
}

export default function MotionFooter({
  brandName = "Laurensius Pratama",
  wordmark = "LAURENSIUS",
  tagline = "Full-Stack Developer, UI/UX Designer & Software QA Engineer — membangun produk digital dengan presisi desain dan pengujian menyeluruh.",
  email = "laurensdap@gmail.com",
  location = "Depok, Sleman, Yogyakarta",
  columns = DEFAULT_COLUMNS,
  className = "",
}: MotionFooterProps) {
  const footerRef = React.useRef<HTMLElement | null>(null)
  const [timeString, setTimeString] = React.useState<string>("")

  // Live clock untuk zona waktu Yogyakarta (WIB / Asia/Jakarta)
  React.useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date()
        const formatted = new Intl.DateTimeFormat("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now)
        setTimeString(`${formatted} WIB (UTC+7)`)
      } catch {
        setTimeString("UTC+7 · WIB")
      }
    }
    updateClock()
    const timer = window.setInterval(updateClock, 1000)
    return () => window.clearInterval(timer)
  }, [])

  // Parallax halus saat pengguna men-scroll mendekati footer
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  })

  const yParallax = useTransform(scrollYProgress, [0, 1], [-40, 0])
  const opacityParallax = useTransform(scrollYProgress, [0, 0.4, 1], [0.35, 0.85, 1])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const letters = React.useMemo(() => wordmark.split(""), [wordmark])

  return (
    <footer
      ref={footerRef}
      className={`relative w-full overflow-hidden bg-black/55 backdrop-blur-2xl hairline-t ${className}`}
    >
      {/* Ambient Radial Glow di Latar Footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.22, 0.36, 0.22],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 0.95, 1.1],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-warm/25 blur-[130px]"
        />
      </div>

      <motion.div
        style={{ y: yParallax, opacity: opacityParallax }}
        className="relative z-10 mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8 sm:pt-24"
      >
        {/* Top Interactive CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative overflow-hidden rounded-3xl p-8 sm:p-12 hairline-box surface-subtle"
        >
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-[10px] tracking-[0.18em] uppercase text-warm hairline-box surface-subtle">
                <Sparkles className="h-3.5 w-3.5" />
                <span>READY FOR NEXT-GEN PROJECTS</span>
              </div>
              <h2 className="mt-4 font-sans text-3xl font-extrabold tracking-tight sm:text-5xl">
                Punya Ide Produk Digital? Mari Wujudkan Bersama.
              </h2>
              <p className="mt-3 text-sm leading-relaxed opacity-80 sm:text-base">
                Hubungi langsung melalui email atau jadwalkan diskusi untuk pengembangan aplikasi
                Full-Stack, perancangan UI/UX, maupun pengujian kualitas perangkat lunak (QA).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${email}?subject=Kolaborasi%20Proyek%20%E2%80%94%20Laurensius%20Pratama`}
                className="btn-liquid px-7 py-4 font-mono text-xs tracking-[0.16em] uppercase"
              >
                <Mail className="h-4 w-4" />
                <span>{email}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="btn-liquid-subtle px-6 py-4 font-mono text-xs tracking-[0.16em] uppercase"
              >
                <span>Form Kontak</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Middle Grid: Brand Info + Staggered Link Columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid gap-12 pb-14 hairline-b lg:grid-cols-12"
        >
          {/* Brand & Live Status */}
          <motion.div variants={itemVariants} className="space-y-5 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-warm shadow-[0_0_12px_var(--app-warm)]" />
              <span className="font-mono text-sm font-bold tracking-[0.2em] uppercase">
                {brandName}
              </span>
            </div>

            <p className="max-w-sm text-sm leading-relaxed opacity-75">{tagline}</p>

            {/* Live Telemetry Badges */}
            <div className="flex flex-wrap gap-2.5 pt-2 font-mono text-[11px]">
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 hairline-box surface-subtle">
                <Clock className="h-3.5 w-3.5 text-warm" />
                <span>{timeString || "WIB (UTC+7)"}</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 hairline-box surface-subtle">
                <MapPin className="h-3.5 w-3.5 text-warm" />
                <span>{location}</span>
              </div>
            </div>
          </motion.div>

          {/* Animated Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col: FooterColumn) => (
              <motion.nav
                key={col.title}
                variants={itemVariants}
                aria-label={col.title}
                className="space-y-4"
              >
                <h3 className="font-mono text-xs font-semibold tracking-[0.2em] uppercase text-warm">
                  {col.title}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => {
                    const isExternal = link.href?.startsWith("http")
                    return (
                      <li key={link.label}>
                        <motion.a
                          href={link.href || "#"}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          whileHover={{ x: 6 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="group inline-flex items-center gap-1.5 font-mono text-xs tracking-wider opacity-75 transition-opacity hover:opacity-100"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-warm opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                        </motion.a>
                      </li>
                    )
                  })}
                </ul>
              </motion.nav>
            ))}
          </div>
        </motion.div>

        {/* Giant Kinetic Wordmark (@jahed Motion Typography) */}
        <div className="relative my-8 select-none overflow-hidden py-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.045 },
              },
            }}
            className="flex items-center justify-between"
            aria-label={brandName}
          >
            {letters.map((char: string, idx: number) => (
              <motion.span
                key={`${char}-${idx}`}
                variants={{
                  hidden: { y: "110%", opacity: 0, rotateX: -45 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    rotateX: 0,
                    transition: {
                      type: "spring",
                      stiffness: 130,
                      damping: 16,
                    },
                  },
                }}
                whileHover={{
                  y: -14,
                  scale: 1.06,
                  color: "var(--app-warm)",
                  transition: { type: "spring", stiffness: 350, damping: 14 },
                }}
                className="cursor-default font-sans text-[13.5vw] font-extrabold leading-none tracking-tighter sm:text-[11.5vw]"
                style={{
                  textShadow: "0 14px 35px rgba(0, 0, 0, 0.5)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar: Copyright, QA Badge & Liquid Metal Back to Top */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 font-mono text-xs opacity-75 hairline-t sm:flex-row">
          <div className="flex flex-wrap items-center gap-3 text-center sm:text-left">
            <span>© {new Date().getFullYear()} {brandName}. All rights reserved.</span>
            <span className="hidden opacity-40 sm:inline">·</span>
            <span className="inline-flex items-center gap-1 text-warm">
              <ShieldCheck className="h-3.5 w-3.5" />
              Verified Production Build
            </span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="btn-liquid-subtle px-5 py-2.5 font-mono text-[11px] tracking-[0.18em] uppercase"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5 text-warm" />
          </button>
        </div>
      </motion.div>
    </footer>
  )
}