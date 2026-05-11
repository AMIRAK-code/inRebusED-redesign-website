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

  // ── Case-study clients (featured) ─────────────────────────────────────────
  { name: 'Piedmont Region',            logo: '/clients/32.png', featured: true, industry: 'public-sector'       },
  { name: 'Liguria Digitale',           logo: '/clients/01.png', featured: true, industry: 'public-sector'       },
  { name: 'Dussmann Services',          logo: '/clients/14.png', featured: true, industry: 'industrial-services' },
  { name: 'IVECO',                      logo: '/clients/12.png', featured: true, industry: 'automotive'          },
  { name: 'Marelli',                    logo: '/clients/13.png', featured: true, industry: 'automotive'          },
  { name: 'Esselunga',                  logo: '/clients/39.png', featured: true, industry: 'retail-lifestyle'    },
  { name: 'Maserati',                   logo: '/clients/25.png', featured: true, industry: 'automotive'          },
  { name: 'Leonardo Aircraft Division', logo: '/clients/41.png', featured: true, industry: 'aerospace-defense'   },
  { name: 'Gucci',                      logo: '/clients/20.png', featured: true, industry: 'retail-lifestyle'    },
  { name: 'Skillab',                    logo: '/clients/40.png', featured: true, industry: 'public-sector'       },
  { name: 'RINA',                       logo: '/clients/21.png', featured: true, industry: 'industrial-services' },
  { name: 'CNH Industrial',             logo: '/clients/43.png', featured: true, industry: 'automotive'          },
  { name: 'Intesa Sanpaolo',            logo: '/clients/42.png', featured: true, industry: 'finance'             },

  // ── Automotive ────────────────────────────────────────────────────────────
  { name: 'Stellantis',                 logo: '/clients/29.png', featured: false, industry: 'automotive' },
  { name: 'Fiat',                       logo: '/clients/15.png', featured: false, industry: 'automotive' },
  { name: 'Alfa Romeo',                 logo: '/clients/03.png', featured: false, industry: 'automotive' },
  { name: 'Lancia',                     logo: '/clients/18.png', featured: false, industry: 'automotive' },
  { name: 'Abarth',                     logo: '/clients/22.png', featured: false, industry: 'automotive' },
  { name: 'FPT Powertrain Technologies',logo: '/clients/28.png', featured: false, industry: 'automotive' },
  { name: 'Bitron',                     logo: '/clients/16.png', featured: false, industry: 'automotive' },

  // ── Aerospace & Defence ───────────────────────────────────────────────────
  { name: 'Avio Aero',                  logo: '/clients/04.png', featured: false, industry: 'aerospace-defense' },

  // ── Finance ───────────────────────────────────────────────────────────────
  { name: 'UniCredit',                  logo: '/clients/27.png', featured: false, industry: 'finance' },
  { name: 'Allianz',                    logo: '/clients/23.png', featured: false, industry: 'finance' },
  { name: 'Reale Mutua',                logo: '/clients/34.png', featured: false, industry: 'finance' },
  { name: 'Sella',                      logo: '/clients/26.png', featured: false, industry: 'finance' },
  { name: 'ARVAL BNP Paribas',          logo: '/clients/08.png', featured: false, industry: 'finance' },

  // ── Retail & Lifestyle ────────────────────────────────────────────────────
  { name: 'Prada',                      logo: '/clients/19.png', featured: false, industry: 'retail-lifestyle' },
  { name: 'Sky',                        logo: '/clients/24.png', featured: false, industry: 'retail-lifestyle' },
  { name: 'Tigotà',                     logo: '/clients/11.png', featured: false, industry: 'retail-lifestyle' },
  { name: 'Iperal',                     logo: '/clients/38.png', featured: false, industry: 'retail-lifestyle' },
  { name: 'Tecnomat',                   logo: '/clients/37.png', featured: false, industry: 'retail-lifestyle' },
  { name: 'Pearson',                    logo: '/clients/35.png', featured: false, industry: 'retail-lifestyle' },
  { name: 'Sanoma',                     logo: '/clients/36.png', featured: false, industry: 'retail-lifestyle' },

  // ── Industrial & Services ─────────────────────────────────────────────────
  { name: 'Daikin',                     logo: '/clients/30.png', featured: false, industry: 'industrial-services' },
  { name: 'SGS',                        logo: '/clients/33.png', featured: false, industry: 'industrial-services' },
  { name: 'SMAT Gruppo',                logo: '/clients/06.png', featured: false, industry: 'industrial-services' },
  { name: 'CASE Agriculture',           logo: '/clients/07.png', featured: false, industry: 'industrial-services' },
  { name: 'Tinexta',                    logo: '/clients/09.png', featured: false, industry: 'industrial-services' },
  { name: 'Intellera',                  logo: '/clients/10.png', featured: false, industry: 'industrial-services' },

  // ── Public Sector ─────────────────────────────────────────────────────────
  { name: 'Accademia Piemonte',         logo: '/clients/31.png', featured: false, industry: 'public-sector' },
  { name: 'Invitalia',                  logo: '/clients/05.png', featured: false, industry: 'public-sector' },
  { name: 'CIM4.0',                     logo: '/clients/02.png', featured: false, industry: 'public-sector' },
  { name: 'START 4.0',                  logo: '/clients/17.png', featured: false, industry: 'public-sector' },

]

export default clients
