import type { FooterColumn, HalftonePalette, HalftonePreset } from "@/components/ui/halftone-wordmark-footer"

export type ProjectCategory = "All" | "Full-Stack Web" | "UI/UX & Prototyping" | "QA & Automation"

export interface ProjectItem {
  id: string
  index: string
  title: string
  category: Exclude<ProjectCategory, "All">
  year: string
  summary: string
  challenge: string
  solution: string
  qaHighlight: string
  image: string
  tags: string[]
  metrics: string
  liveUrl: string
  repoUrl: string
}

export interface SkillGroup {
  id: string
  label: string
  description: string
  skills: { name: string; role: string; level: string }[]
}

export const THEME_PALETTES: Record<HalftonePreset, HalftonePalette & { name: string; description: string }> = {
  night: {
    name: "Night Press",
    description: "Obsidian & Warm Newsprint",
    background: "#0c0c0b",
    ink: "#e9e4da",
    warm: "#e9762b",
  },
  paper: {
    name: "Editorial Paper",
    description: "Newsprint Cream & Vermilion",
    background: "#efebe3",
    ink: "#17150f",
    warm: "#c2361c",
  },
  ember: {
    name: "Dark Ember",
    description: "Deep Umber & Solar Orange",
    background: "#160a06",
    ink: "#f2c48c",
    warm: "#ff5a1f",
  },
  cobalt: {
    name: "Blueprint Cobalt",
    description: "Architectural Blue & Signal Gold",
    background: "#0d1b4d",
    ink: "#dfe7ff",
    warm: "#ffcd3c",
  },
}

export const HERO_METRICS = [
  { label: "FOKUS DISIPLIN", value: "3 Bidang", detail: "Full-Stack, UI/UX, QA Automation" },
  { label: "CAKUPAN PENGUJIAN", value: "98.4%", detail: "End-to-End & Unit Test Reliability" },
  { label: "SKOR USABILITY", value: "88 / 100", detail: "Rata-rata System Usability Scale (SUS)" },
  { label: "BASIS OPERASIONAL", value: "Yogyakarta", detail: "Tersedia untuk Kolaborasi Remote & On-site" },
]

export const PROJECTS: ProjectItem[] = [
  {
    id: "mywallet-fintech-ux",
    index: "01",
    title: "MyWallet Mobile Prototype & Mixed-Method Usability Lab",
    category: "UI/UX & Prototyping",
    year: "2026",
    summary:
      "Perancangan antarmuka dompet digital intuitif dari sketsa low-fidelity hingga high-fidelity yang divalidasi dengan metrik kuantitatif dan kualitatif.",
    challenge:
      "Pengguna baru sering mengalami kebingungan saat melakukan transfer antar-bank dan pelacakan pengeluaran bulanan akibat hierarki informasi yang terlalu padat.",
    solution:
      "Merancang arsitektur informasi baru berbasis alur tugas (task-based flow), lalu mengujinya secara terukur menggunakan Maze untuk metrik kuantitatif dan kuesioner terstruktur untuk evaluasi subjektif.",
    qaHighlight:
      "Pengujian melibatkan evaluasi Mission Success Rate (MSR), Single Ease Question (SEQ), dan System Usability Scale (SUS) hingga mencapai tingkat keberhasilan tugas di atas 94%.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["Figma", "Maze Testing", "SUS & SEQ Metrics", "Wireframing", "Design System"],
    metrics: "94% Mission Success Rate",
    liveUrl: "#work",
    repoUrl: "https://github.com/laurensiuspratama",
  },
  {
    id: "ecommerce-qa-suite",
    index: "02",
    title: "E-Commerce End-to-End Test Automation & Defect Matrix",
    category: "QA & Automation",
    year: "2026",
    summary:
      "Suite pengujian otomatis komprehensif untuk modul autentikasi, keranjang belanja, checkout, dan manajemen profil pengguna aplikasi web.",
    challenge:
      "Regresi bug sering muncul pada perhitungan diskon keranjang belanja dan validasi form profil ketika ada pembaruan fitur di sisi frontend.",
    solution:
      "Membangun arsitektur pengujian terstruktur di Katalon Studio dengan pemisahan Test Cases, Test Suites, dan Object Repository, dilengkapi laporan bug sistematis.",
    qaHighlight:
      "Mendeteksi dan mendokumentasikan 24+ temuan kritis & minor pada alur registrasi, keranjang belanja, dan checkout sebelum rilis produksi.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Katalon Studio", "Test Automation", "Bug Reporting", "Regression Testing", "Web QA"],
    metrics: "42 Automated Test Scenarios",
    liveUrl: "#work",
    repoUrl: "https://github.com/laurensiuspratama",
  },
  {
    id: "halftone-editorial-system",
    index: "03",
    title: "Halftone Editorial Design System & Interactive Web",
    category: "Full-Stack Web",
    year: "2026",
    summary:
      "Sistem desain web interaktif berbasis React, TypeScript, dan HTML5 2D Canvas dengan simulasi fisika pegas real-time pada tipografi cetak.",
    challenge:
      "Menghadirkan animasi ribuan partikel tipografi secara interaktif di browser tanpa mengorbankan performa frame rate maupun aksesibilitas layar pembaca.",
    solution:
      "Mengimplementasikan struktur data Float32Array pada 2D Canvas, kalkulasi cakupan area sel 3x3, serta penghentian otomatis render loop saat elemen di luar viewport.",
    qaHighlight:
      "Dilengkapi unit testing Vitest untuk fungsi matematis murni serta dukungan penuh terhadap preferensi prefers-reduced-motion.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    tags: ["React 18", "TypeScript", "HTML5 Canvas", "Tailwind CSS", "shadcn/ui"],
    metrics: "60 FPS Spring Physics",
    liveUrl: "#lab",
    repoUrl: "https://github.com/laurensiuspratama",
  },
  {
    id: "atm-core-workflow-architecture",
    index: "04",
    title: "Core Banking ATM Transaction Flowchart & Specification Engine",
    category: "QA & Automation",
    year: "2026",
    summary:
      "Pemodelan arsitektur alur transaksi perbankan (Tarik Tunai & Transfer Antar-Rekening) menggunakan spesifikasi Use Case, diagram alir presisi, dan matriks skenario uji.",
    challenge:
      "Menjamin seluruh cabang logika alternatif (saldo tidak cukup, PIN salah 3 kali, batas nominal harian) terdokumentasi tanpa celah ambiguitas bagi tim engineering.",
    solution:
      "Menyusun struktur diagram berbasis kode XML Draw.io yang terstandarisasi, memisahkan alur normal dan alur eksepsi, serta memetakannya langsung ke tabel Test Scenario.",
    qaHighlight:
      "100% cakupan jalur eksepsi (negative test cases) untuk validasi autentikasi kartu, otorisasi nominal, dan pencetakan resi transaksi.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    tags: ["System Architecture", "Draw.io XML", "Use Case Spec", "Test Matrix", "Flowchart"],
    metrics: "100% Branch Coverage",
    liveUrl: "#work",
    repoUrl: "https://github.com/laurensiuspratama",
  },
  {
    id: "retail-pos-desktop-suite",
    index: "05",
    title: "Modular Point-of-Sale & Merchant Inventory Interface",
    category: "Full-Stack Web",
    year: "2025",
    summary:
      "Aplikasi manajemen inventaris dan transaksi penjual yang dirancang dari kerangka wireframe sketsa pensil menuju implementasi GUI modular.",
    challenge:
      "Menyederhanakan navigasi multi-jendela antara dashboard penjual, katalog produk, dan laporan transaksi harian agar bebas dari error state.",
    solution:
      "Menerapkan arsitektur berorientasi objek yang bersih pada setiap komponen layar serta melakukan refactoring manajemen state antar-menu.",
    qaHighlight:
      "Eliminasi runtime TypeError pada inisialisasi modul penjual dan validasi input stok barang secara ketat.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "GUI Architecture", "State Management", "Low-Fi Wireframe", "Debugging"],
    metrics: "Zero Unhandled Exceptions",
    liveUrl: "#work",
    repoUrl: "https://github.com/laurensiuspratama",
  },
  {
    id: "academic-schedule-planner",
    index: "06",
    title: "Smart Academic Timetable & Conflict Detection Dashboard",
    category: "UI/UX & Prototyping",
    year: "2026",
    summary:
      "Antarmuka web responsif untuk mengonversi dokumen jadwal perkuliahan menjadi kalender visual interaktif dengan deteksi bentrok waktu otomatis.",
    challenge:
      "Data jadwal perkuliahan mentah sulit dipindai secara cepat di layar mobile dan rawan menyebabkan kesalahan pemilihan kelas paralel.",
    solution:
      "Membangun tata letak Swiss Grid responsif dengan filter hari, kode ruangan, dan indikator visual instan untuk mata kuliah prioritas.",
    qaHighlight:
      "Dioptimalkan untuk layar desktop hingga mobile 360px dengan navigasi keyboard penuh dan kontras tipografi tingkat AAA.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Responsive Grid", "Accessibility"],
    metrics: "Sub-100ms Filter Response",
    liveUrl: "#work",
    repoUrl: "https://github.com/laurensiuspratama",
  },
]

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discovery, Flow & Wireframing",
    description:
      "Memetakan kebutuhan pengguna melalui Use Case Specification, Flowchart terstruktur, dan sketsa wireframe low-fidelity sebelum menyentuh baris kode.",
  },
  {
    step: "02",
    title: "UI/UX & Usability Validation",
    description:
      "Merancang sistem desain konsisten dan menguji prototipe menggunakan metrik terukur seperti Mission Success Rate (MSR), SUS, dan SEQ.",
  },
  {
    step: "03",
    title: "Clean Full-Stack Engineering",
    description:
      "Mengembangkan aplikasi dengan React, TypeScript, Tailwind CSS, dan arsitektur komponen shadcn/ui yang modular, cepat, dan mudah dipelihara.",
  },
  {
    step: "04",
    title: "QA Automation & Zero-Regression",
    description:
      "Menjalankan pengujian unit (Vitest) serta skenario otomatis end-to-end (Katalon Studio) untuk memastikan seluruh fitur berjalan stabil sebelum rilis ke Vercel.",
  },
]

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "engineering",
    label: "Frontend & Full-Stack",
    description: "Teknologi utama untuk membangun aplikasi web interaktif, cepat, dan type-safe.",
    skills: [
      { name: "React 18 & Vite", role: "Component Architecture & Fast Bundling", level: "Advanced" },
      { name: "TypeScript / JavaScript", role: "Strict Type-Safety & Logic", level: "Advanced" },
      { name: "Tailwind CSS & shadcn/ui", role: "Design System & Accessible Primitives", level: "Advanced" },
      { name: "HTML5 2D Canvas & Motion", role: "Interactive Physics & Micro-Interactions", level: "Proficient" },
      { name: "Python & Modular GUI", role: "Application Logic & Scripting", level: "Proficient" },
      { name: "Git, GitHub & Vercel", role: "Version Control & CI/CD Deployment", level: "Advanced" },
    ],
  },
  {
    id: "qa",
    label: "Quality Assurance & Testing",
    description: "Metodologi pengujian perangkat lunak untuk menjamin kualitas produksi tanpa bug tersembunyi.",
    skills: [
      { name: "Katalon Studio", role: "Automated Web Test Suites & Object Spy", level: "Advanced" },
      { name: "Test Scenario & Case Matrix", role: "Positive & Negative Path Coverage", level: "Advanced" },
      { name: "Defect Tracking & Bug Analysis", role: "Root-Cause Documentation & Verification", level: "Advanced" },
      { name: "Vitest / Unit Testing", role: "Pure Function & Logic Verification", level: "Proficient" },
      { name: "Cross-Browser & Responsive QA", role: "Desktop, Tablet & Mobile Layout Audit", level: "Advanced" },
      { name: "Accessibility (A11y) Audit", role: "Keyboard Nav, Contrast & Reduced Motion", level: "Proficient" },
    ],
  },
  {
    id: "uiux",
    label: "UI/UX & System Modeling",
    description: "Perancangan antarmuka berbasis riset pengguna dan pemodelan alur sistem yang presisi.",
    skills: [
      { name: "Figma & Interactive Prototyping", role: "Low-Fi Sketch to High-Fi Design", level: "Advanced" },
      { name: "Maze Usability Testing", role: "Task-Based Quantitative Evaluation", level: "Advanced" },
      { name: "SUS & SEQ Evaluation", role: "Psychometric & Ease-of-Use Analysis", level: "Advanced" },
      { name: "Draw.io XML & Flowcharting", role: "Use Case & System Workflow Modeling", level: "Advanced" },
      { name: "Swiss Editorial Typography", role: "Visual Hierarchy & Grid Systems", level: "Proficient" },
      { name: "Information Architecture", role: "User Journey & Wireframe Structuring", level: "Advanced" },
    ],
  },
]

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Navigation",
    links: [
      { label: "Selected Work", href: "#work" },
      { label: "About & Process", href: "#about" },
      { label: "Halftone Lab", href: "#lab" },
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
