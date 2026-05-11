export interface Client {
  name: string
  logo: string | null
  featured: boolean
}

const clients: Client[] = [
  // ── Featured — named in case studies ─────────────────────────────────────
  { name: 'Piedmont Region',        logo: null, featured: true },
  { name: 'Liguria Digitale',       logo: null, featured: true },
  { name: 'Dussmann Services',      logo: null, featured: true },
  { name: 'IVECO',                  logo: null, featured: true },
  { name: 'Marelli',                logo: null, featured: true },
  { name: 'Esselunga',              logo: null, featured: true },
  { name: 'Maserati',               logo: null, featured: true },
  { name: 'Leonardo Aircraft Division', logo: null, featured: true },
  { name: 'Gucci',                  logo: null, featured: true },
  { name: 'Skillab',                logo: null, featured: true },
  { name: 'RINA',                   logo: null, featured: true },
  { name: 'CNH Industrial',         logo: null, featured: true },
  { name: 'Intesa Sanpaolo',        logo: null, featured: true },

  // ── Long-standing partners — text chips until logos are mapped ────────────
  { name: 'Jeep',          logo: null, featured: false },
  { name: 'Alfa Romeo',    logo: null, featured: false },
  { name: 'Unicredit',     logo: null, featured: false },
  { name: 'Reale',         logo: null, featured: false },
  { name: 'Mopar',         logo: null, featured: false },
  { name: 'Lancia',        logo: null, featured: false },
  { name: 'FCA',           logo: null, featured: false },
  { name: 'FPT',           logo: null, featured: false },
  { name: 'Daikin',        logo: null, featured: false },
  { name: 'Fiat',          logo: null, featured: false },
  { name: 'Abarth',        logo: null, featured: false },
  { name: 'SKF',           logo: null, featured: false },
  { name: 'Finmeccanica',  logo: null, featured: false },
  { name: 'Sky',           logo: null, featured: false },
]

export default clients
