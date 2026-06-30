import type { CaseStudy } from '../../data/case-studies'

const BASE = 'https://www.inrebus.education'
const ORG = {
  '@type': 'Organization',
  name: 'inRebus Digital Learning',
  url: BASE,
  logo: `${BASE}/logo.svg`,
  sameAs: [
    'https://www.linkedin.com/company/inrebus',
    'https://www.gruppofos.it',
  ],
} as const

export function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    ...ORG,
  }
}

export function buildLocalBusiness() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'inRebus Digital Learning',
    url: BASE,
    logo: `${BASE}/logo.svg`,
    telephone: '+39-011-0201308',
    email: 'info.educational@inrebus.it',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Corso Vinzaglio 23',
      addressLocality: 'Torino',
      postalCode: '10121',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.0703,
      longitude: 7.6722,
    },
    sameAs: [
      'https://www.linkedin.com/company/inrebus',
      'https://www.gruppofos.it',
    ],
  }
}

export function buildBreadcrumbList(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${BASE}${item.url}`,
    })),
  }
}

export function buildCreativeWork(cs: CaseStudy) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: cs.title,
    description: cs.brief,
    image: `${BASE}${cs.image}`,
    creator: ORG,
    inLanguage: 'en',
    url: `${BASE}/work/${cs.slug}`,
  }
}
