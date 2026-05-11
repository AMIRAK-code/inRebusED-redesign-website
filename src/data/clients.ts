export type Industry =
  | 'automotive'
  | 'aerospace-defense'
  | 'finance'
  | 'retail-lifestyle'
  | 'industrial-services'
  | 'public-sector'

export interface Client {
  name: string
  logo: string | null
  featured: boolean
  industry: Industry
}

const clients: Client[] = [
  // ── Featured — named in case studies ─────────────────────────────────────
  { name: 'Piedmont Region', logo: "", featured: true, industry: 'public-sector' },
  { name: 'Liguria Digitale', logo: "/clients/01.png", featured: true, industry: 'public-sector' },
  { name: 'Dussmann Services', logo: null, featured: true, industry: 'industrial-services' },
  { name: 'IVECO', logo: null, featured: true, industry: 'automotive' },
  { name: 'Marelli', logo: null, featured: true, industry: 'automotive' },
  { name: 'Esselunga', logo: null, featured: true, industry: 'retail-lifestyle' },
  { name: 'Maserati', logo: '/clients/07.png', featured: true, industry: 'automotive' },
  { name: 'Leonardo Aircraft Division', logo: null, featured: true, industry: 'aerospace-defense' },
  { name: 'Gucci', logo: null, featured: true, industry: 'retail-lifestyle' },
  { name: 'Skillab', logo: null, featured: true, industry: 'public-sector' },
  { name: 'RINA', logo: null, featured: true, industry: 'industrial-services' },
  { name: 'CNH Industrial', logo: null, featured: true, industry: 'automotive' },
  { name: 'Intesa Sanpaolo', logo: null, featured: true, industry: 'finance' },

  // ── Long-standing partners ────────────────────────────────────────────────
  { name: 'Jeep', logo: null, featured: false, industry: 'automotive' },
  { name: 'Alfa Romeo', logo: "public/clients/03.png", featured: false, industry: 'automotive' },
  { name: 'Unicredit', logo: null, featured: false, industry: 'finance' },
  { name: 'Reale', logo: null, featured: false, industry: 'finance' },
  { name: 'Mopar', logo: null, featured: false, industry: 'automotive' },
  { name: 'Lancia', logo: null, featured: false, industry: 'automotive' },
  { name: 'FCA', logo: null, featured: false, industry: 'automotive' },
  { name: 'FPT', logo: null, featured: false, industry: 'automotive' },
  { name: 'Daikin', logo: null, featured: false, industry: 'industrial-services' },
  { name: 'Fiat', logo: null, featured: false, industry: 'automotive' },
  { name: 'Abarth', logo: null, featured: false, industry: 'automotive' },
  { name: 'SKF', logo: null, featured: false, industry: 'industrial-services' },
  { name: 'Finmeccanica', logo: null, featured: false, industry: 'aerospace-defense' },
  { name: 'Sky', logo: null, featured: false, industry: 'retail-lifestyle' },
]

export default clients
