export type Category =
  | 'digital-academy'
  | 'onboarding'
  | 'product-training'
  | 'vertical-training'

export interface CaseStudy {
  slug: string
  title: string
  client: string
  audience: string
  brief: string
  description: string
  category: Category
  image: string
  tags?: string[]
  challenge?: string
}

const caseStudies: CaseStudy[] = [
  // ── Digital Academy ───────────────────────────────────────────────────────
  {
    slug: 'accademie-filiera-piemonte',
    title: 'Supply Chain Academies',
    client: 'Piedmont Region',
    audience: 'Training agencies, companies and citizens of Piedmont',
    brief:
      'Eleven platforms for the Piedmont Supply Chain Academies, coordinating the full lifecycle of courses — from input by training agencies through the regional funding process to the public catalogue for citizens and businesses.',
    description:
      'Eleven platforms for the Piedmont Supply Chain Academies manage the full lifecycle of training courses: course entry by training agencies, the regional funding workflow, and publication of the public catalogue for citizens and businesses. A single digital ecosystem coordinating 11 academies across the territory.',
    category: 'digital-academy',
    image: '/case-studies/accademie-filiera-piemonte.jpg',
    tags: ['Management platform', 'Multi-entity', 'Public Administration'],
    challenge: 'Coordinate 11 academies in a single digital ecosystem.',
  },
  {
    slug: 'liguria-digitale',
    title: 'Liguria Digitale',
    client: 'Liguria Region',
    audience: 'Citizens of the Liguria Region',
    brief:
      'E-learning platform for upskilling, reskilling and digital literacy programmes for the citizens of the Liguria Region.',
    description:
      'An e-learning platform offering upskilling, reskilling and digital literacy programmes designed to make digital training accessible at regional scale to the citizens of Liguria.',
    category: 'digital-academy',
    image: '/case-studies/liguria-digitale.jpg',
    tags: ['Public Academy', 'Upskilling & reskilling', 'Public Administration'],
    challenge: 'Make digital training accessible at regional scale.',
  },
  {
    slug: 'dussmann-academy',
    title: 'Corporate Academy Dussmann',
    client: 'Dussmann Services',
    audience: 'Group employees',
    brief:
      'E-learning platform supporting the training of group employees, integrated with technical and managerial courses and multimedia content.',
    description:
      'A corporate academy designed to train a distributed and sizeable workforce in a capillary way: an e-learning platform integrated with technical and managerial courses and rich multimedia content, progressively expanded with webinars and blended-learning tracks.',
    category: 'digital-academy',
    image: '/case-studies/dussmann-academy.jpg',
    tags: ['Corporate Academy', 'Blended learning', 'Facility Services'],
    challenge: 'Train a large, distributed workforce in a capillary way.',
  },
  {
    slug: 'horizon-europe-immersive',
    title: 'Immersive Upskilling for Industrial Processes',
    client: 'Horizon Europe Project',
    audience: 'Stakeholders and operators of energy-intensive industries',
    brief:
      'Capacity-building system for a European Horizon project: a centralised, scalable LMS gathering resources and learning paths for stakeholders, enriched with immersive virtual-reality experiences recreating realistic industrial scenarios in a safe, repeatable environment.',
    description:
      'A capacity-building system for a Horizon Europe project: a centralised, scalable LMS that collects resources and training paths for all stakeholders, enriched with immersive VR experiences that recreate realistic industrial scenarios in a safe and repeatable environment.',
    category: 'digital-academy',
    image: '/case-studies/horizon-europe-immersive.jpg',
    tags: ['Capacity building', 'LMS & virtual reality', 'Energy'],
    challenge: 'Centralise the training and upskilling of stakeholders in a single ecosystem.',
  },

  // ── Onboarding ────────────────────────────────────────────────────────────
  {
    slug: 'esselunga-welcome',
    title: 'Welcome to Esselunga',
    client: 'Esselunga',
    audience: 'New hires',
    brief:
      'Onboarding journey based on immersive storytelling that introduces new hires to the company history and values.',
    description:
      'An onboarding journey built on immersive storytelling: new hires discover Esselunga\'s history and values by guiding the iconic van through eras and milestones, exploring archive material and key product innovations along the way.',
    category: 'onboarding',
    image: '/case-studies/esselunga-welcome.jpg',
    tags: ['History & values', 'Storytelling', 'Retail'],
    challenge: 'Create an onboarding experience that is engaging and identity-driven.',
  },
  {
    slug: 'dussmann-discover-company',
    title: 'Discovering the Company',
    client: 'Dussmann Services',
    audience: 'New hires',
    brief:
      'Interactive e-learning journey that introduces new hires to the company\'s history, values, organisation and services, with a magazine-style layout and archive photographic content.',
    description:
      'An interactive e-learning journey told in a magazine-style layout with archive photography. New hires explore the company\'s history, values, organisational structure, services and employee tools — the narrative weaves identity, organisation and day-to-day operations into one experience.',
    category: 'onboarding',
    image: '/case-studies/dussmann-discover-company.jpg',
    tags: ['Identity & organisation', 'Photographic storytelling', 'Facility Services'],
    challenge: 'Present the company by combining identity, organisation and working tools.',
  },
  {
    slug: 'maserati-heritage',
    title: 'One Hundred Years of Heritage',
    client: 'Maserati',
    audience: 'International sales network',
    brief:
      'Over one hundred years of Maserati heritage turned into an immersive journey through the decades, to learn how to convey the brand\'s identity, values and emotion.',
    description:
      'A century of Maserati heritage turned into an immersive journey through the decades. Organised by era, the course immerses the sales network in the world of one of the most iconic global automotive brands — an Italian story, a global icon — and teaches them to transmit its identity, values and emotional charge.',
    category: 'onboarding',
    image: '/case-studies/maserati-heritage.jpg',
    tags: ['Brand heritage', 'Immersive storytelling', 'Luxury Automotive'],
    challenge: 'Transfer the identity of a global icon to the sales network.',
  },
  {
    slug: 'iveco-induction-journey',
    title: 'A Journey Inside the Company',
    client: 'Iveco',
    audience: 'New hires',
    brief:
      'Onboarding journey that, through structural gamification mechanics, guides new hires through brand, products, processes and corporate culture in an immersive experience.',
    description:
      'An onboarding journey built on structural gamification. New hires explore the brand, products, processes and corporate culture through immersive interactions — turning the traditional induction path into an engaging, identity-driven experience.',
    category: 'onboarding',
    image: '/case-studies/iveco-induction-journey.jpg',
    tags: ['Brand & culture', 'Gamification', 'Automotive'],
    challenge: 'Turn the induction path into an engaging, identity-driven experience.',
  },

  // ── Product Training ──────────────────────────────────────────────────────
  {
    slug: 'leonardo-aircraft-familiarisation',
    title: 'From Classroom to Aircraft, Digitally',
    client: 'Leonardo',
    audience: 'Employees and international clients',
    brief:
      'Familiarisation courses for the M-346 and C-27J Spartan aircraft, converted from classroom to multilingual online modules: video lessons, operational tutorials and 360° footage shot on board and outside the aircraft, for Leonardo staff and international clients.',
    description:
      'Classroom familiarisation courses for the M-346 and C-27J Spartan aircraft converted into multilingual online modules: video lessons, operational tutorials and 360° footage filmed both on board and outside the aircraft. The translated material ensures effective distribution across the international markets where the aircraft are sold; learning objects cover all ATA chapters and are available on the Leonardo Velivoli LMS.',
    category: 'product-training',
    image: '/case-studies/leonardo-aircraft-familiarisation.jpg',
    tags: ['Aircraft familiarisation', '360° video', 'Aerospace'],
    challenge: 'Digitalise technical aviation training at global scale.',
  },
  {
    slug: 'gucci-clienteling',
    title: 'Clienteling Training',
    client: 'Gucci',
    audience: 'Retail and e-commerce teams across all markets',
    brief:
      'Nine mobile-first modules for store and e-commerce teams across all markets: short, interactive content focused on client relationship and consultative selling.',
    description:
      'Nine mobile-first modules — Foundation and Advanced — for store and e-commerce teams in every market where Gucci is present. Short, interactive content focused on client relationship and consultative selling, developed in line with Gucci\'s brand communication guidelines, with high interactivity and the intercultural language that defines the brand.',
    category: 'product-training',
    image: '/case-studies/gucci-clienteling.jpg',
    tags: ['Client relationship', 'Mobile-first', 'Luxury'],
    challenge: 'Make training continuous and mobile-friendly for a global population.',
  },
  {
    slug: 'maserati-granturismo',
    title: 'GranTurismo',
    client: 'Maserati',
    audience: 'Sales network',
    brief:
      'Multimedia training module presenting the features of the new GranTurismo to the sales network.',
    description:
      'A three-module training programme that concisely presents the key features of the new Maserati GranTurismo. Built with extensive original Maserati photo, audio and video material and bespoke content, the modules support effective client presentations in a sleek, elegant and engaging style consistent with the brand.',
    category: 'product-training',
    image: '/case-studies/maserati-granturismo.jpg',
    tags: ['Product launch', 'Multimedia', 'Luxury Automotive'],
    challenge: 'Present the product effectively and consistently with the brand.',
  },
  {
    slug: 'cnh-ai-avatar-roleplay',
    title: 'A Role Play with AI Avatars',
    client: 'CNH',
    audience: 'Dealership dealers',
    brief:
      'Course with branded AI avatars that guide dealers through multiple simulated sales scenarios: from technical knowledge of original filters to negotiation techniques, in an interactive role-play where every choice changes the outcome.',
    description:
      'Branded AI avatars guide dealers through multiple simulated sales scenarios — from technical knowledge of original filters to negotiation techniques. An interactive, branching role-play where every choice changes the outcome, designed to train dealers to sell genuine spare parts by demonstrating their superiority over the aftermarket.',
    category: 'product-training',
    image: '/case-studies/cnh-ai-avatar-roleplay.jpg',
    tags: ['Sales training', 'AI avatars & role play', 'Automotive'],
    challenge: 'Train dealers to sell genuine spare parts by valuing their superiority over the aftermarket.',
  },
  {
    slug: 'coty-tigota-beauty-brands',
    title: 'A Journey Through Beauty Brands',
    client: 'Coty / Gottardo (Tigotà)',
    audience: 'Sales force',
    brief:
      'Interactive e-learning with non-linear navigation for the sales force, combining expert video pills, historical timelines of brands such as Max Factor and Rimmel, product cards with commercial claims and evocative imagery — to master the make-up offering and bring it to life for the customer.',
    description:
      'A non-linear interactive e-learning that combines expert video pills, historical brand timelines (Max Factor, Rimmel and more), product cards with commercial claims and evocative imagery. Designed for the sales force to turn brand knowledge into storytelling and selling at the till.',
    category: 'product-training',
    image: '/case-studies/coty-tigota-beauty-brands.jpg',
    tags: ['Product knowledge', 'Interactive navigation', 'Beauty & Retail'],
    challenge: 'Turn brand knowledge into storytelling and selling at the till.',
  },
  {
    slug: 'allianz-product-operations',
    title: 'Know the Product, Use It in the System',
    client: 'Allianz',
    audience: 'Agents and agency collaborators',
    brief:
      'E-learning courses for the Allianz agency network on Mid Corporate and Motor portfolio products, articulated in three areas — product knowledge, system operations and practical application — with a dialogic narrative between characters that accompanies agents and collaborators unit by unit.',
    description:
      'E-learning courses for the Allianz agency network covering the Mid Corporate and Motor portfolios. Each unit is articulated in three areas — product knowledge, system operations and practical application — with a dialogic narrative between characters that guides agents and collaborators from theory to daily system use.',
    category: 'product-training',
    image: '/case-studies/allianz-product-operations.jpg',
    tags: ['Product & operations', 'Dialogic narrative', 'Insurance'],
    challenge: 'Train the network on complex products, from theory to daily system use.',
  },

  // ── Vertical Training ─────────────────────────────────────────────────────
  {
    slug: 'skillab-brand-identity',
    title: 'Skillab',
    client: 'Skillab – Unione Industriali Torino',
    audience: 'SME managers',
    brief:
      'Training video pills to support SME managers in understanding brand identity, corporate identity and engagement.',
    description:
      'Short training video pills designed for SME managers to make brand identity, corporate identity and employee engagement accessible. Practical, focused content that provides tools and strategies to strengthen corporate positioning.',
    category: 'vertical-training',
    image: '/case-studies/skillab-brand-identity.jpg',
    tags: ['Brand & corporate identity', 'Microlearning', 'SMEs'],
    challenge: 'Make identity and branding topics accessible to SMEs.',
  },
  {
    slug: 'rina-zero-tolerance',
    title: 'Zero Tolerance',
    client: 'RINA',
    audience: 'Internal staff',
    brief:
      'E-learning module raising awareness among RINA staff on harassment and violence in the workplace, through a high-impact photographic approach and real cases illustrated in vector graphics.',
    description:
      'An e-learning module that raises awareness on harassment and violence in the workplace and outlines RINA\'s zero-tolerance policy. A high-impact photographic style is combined with real-life cases illustrated in vector graphics — non-stereotypical, true to life — to promote an inclusive, respectful corporate culture.',
    category: 'vertical-training',
    image: '/case-studies/rina-zero-tolerance.jpg',
    tags: ['Culture of respect', 'Illustrated storytelling', 'Engineering'],
    challenge: 'Promote an inclusive and respectful corporate culture.',
  },
  {
    slug: 'rina-integrity-culture',
    title: 'A Culture of Integrity, Digitally',
    client: 'RINA',
    audience: 'Group employees, collaborators and stakeholders, internationally',
    brief:
      'E-learning courses for the mandatory training of RINA Group employees, collaborators and stakeholders worldwide on values, principles of conduct and regulatory obligations, in a mixed-media animation style that combines photography, illustration and editorial graphics.',
    description:
      'Mandatory training e-learning for RINA Group employees, collaborators and stakeholders worldwide. Covers values, principles of conduct and regulatory obligations in a mixed-media animation style that blends photography, illustration and editorial graphics to spread a shared culture of integrity at global scale.',
    category: 'vertical-training',
    image: '/case-studies/rina-integrity-culture.jpg',
    tags: ['Compliance & governance', 'Mixed-media animation', 'Engineering'],
    challenge: 'Spread a shared culture of integrity at global scale.',
  },
  {
    slug: 'intesa-aml-investigation',
    title: 'An Investigation in Episodes',
    client: 'Intesa Sanpaolo',
    audience: 'Group employees',
    brief:
      'Episodic training series turning complex anti-money-laundering cases into engaging investigative storytelling.',
    description:
      'An episodic training series styled as a crime mini-series. A recurring character, lawyer Massimo Della Penna, recounts each case, his deductions and the pattern of criminal activity. Suspicious behaviours and incidents are highlighted to sharpen day-to-day vigilance — released as a mini-series with a preview of the next case at the end of every episode.',
    category: 'vertical-training',
    image: '/case-studies/intesa-aml-investigation.jpg',
    tags: ['AML', 'Learning series', 'Banking'],
    challenge: 'Make compliance training engaging.',
  },
  {
    slug: 'esselunga-food-safety',
    title: 'Food Safety in Comics',
    client: 'Esselunga',
    audience: 'Store and food-supply-chain staff',
    brief:
      'E-learning course on correct food hygiene practices, with comic-style storytelling and acted voice-over to support comprehension and retention.',
    description:
      'An e-learning course on proper food-industry hygiene practices delivered through comic-style storytelling and narrated voice-overs. The approach reaches learners of all literacy levels; characters Marta and Gianni guide participants through different settings, making the concepts immediate and easy to absorb.',
    category: 'vertical-training',
    image: '/case-studies/esselunga-food-safety.jpg',
    tags: ['Food hygiene', 'Comic storytelling', 'Retail'],
    challenge: 'Make regulatory content engaging for a heterogeneous workforce.',
  },
  {
    slug: 'iveco-gpdp',
    title: 'Global Product Development Process',
    client: 'Iveco',
    audience: 'Employees involved in product-development processes',
    brief:
      'Interactive e-learning course dedicated to the Global Product Development Process: exercises and quizzes to become familiar with phases, objectives and terminology of the process.',
    description:
      'An interactive e-learning course dedicated to the Global Product Development Process. Exercises and quizzes help employees become familiar with phases, objectives and terminology — building a shared understanding of the process across functions.',
    category: 'vertical-training',
    image: '/case-studies/iveco-gpdp.jpg',
    tags: ['Product development', 'Exercises & quizzes', 'Automotive'],
    challenge: 'Spread a shared understanding of the process across functions.',
  },
  {
    slug: 'marelli-campus',
    title: 'Marelli Campus',
    client: 'Marelli',
    audience: 'Authorised service network',
    brief:
      'Digitalisation of technical courses for the workshop network with multimedia modules, video and interactive content.',
    description:
      'Digitalisation of the technical courses delivered to Marelli\'s authorised workshop network. Around ninety online modules — built from classroom materials optimised for online use — combine series-consistent graphics with videos, 2D and 3D animations and downloadable resources. An official Marelli certificate is issued on completion; a free trailer previews each course on the Marelli Campus platform.',
    category: 'vertical-training',
    image: '/case-studies/marelli-campus.jpg',
    tags: ['After sales', 'Multimedia', 'Automotive'],
    challenge: 'Turn technical training into a continuous digital experience.',
  },
  {
    slug: 'stellantis-sales-video',
    title: 'Video Training for Sales',
    client: 'Stellantis',
    audience: 'Salespeople and dealership staff',
    brief:
      'Video tutorials shot at the dealership, on the road and on the track to support salespeople in the test drive and handover, with technical and commercial arguments.',
    description:
      'Video tutorials shot at the dealership, on the road and on the track. The series supports salespeople through the test drive and handover, delivering technical and commercial arguments that strengthen the customer relationship and accelerate the sale.',
    category: 'vertical-training',
    image: '/case-studies/stellantis-sales-video.jpg',
    tags: ['Test drive & handover', 'Video learning', 'Automotive'],
    challenge: 'Transfer commercial, technical and relational skills to support the sale.',
  },
  {
    slug: 'bnl-aml-comics',
    title: 'Anti-Money Laundering in Comics',
    client: 'BNL',
    audience: 'Bank staff',
    brief:
      'A series of webinars on money-laundering prevention, built around narrative cases illustrated in comic style to recognise suspicious behaviours and situations.',
    description:
      'A webinar series on money-laundering prevention. Each webinar revolves around a narrative case illustrated in comic style, training bank staff to spot suspicious behaviours and situations — complex content delivered through practical, story-driven examples.',
    category: 'vertical-training',
    image: '/case-studies/bnl-aml-comics.jpg',
    tags: ['Anti-money laundering', 'Narrative webinars', 'Banking'],
    challenge: 'Make complex content accessible through case-based narratives.',
  },
  {
    slug: 'reale-mutua-reinsurance',
    title: 'Knowledge at a Click',
    client: 'Reale Mutua',
    audience: 'Internal staff',
    brief:
      'E-learning course structured as a consultable guide, leading the user through the world of reinsurance with a visual, intuitive path.',
    description:
      'An e-learning course structured as a consultable guide. A visual, intuitive path leads internal staff through the world of reinsurance — designed both as a training journey and as a fast-reference tool for daily work.',
    category: 'vertical-training',
    image: '/case-studies/reale-mutua-reinsurance.jpg',
    tags: ['Reinsurance', 'Interactive guide', 'Insurance'],
    challenge: 'Create a course that is both a training path and a fast-reference tool.',
  },
  {
    slug: 'deutsche-bank-branch-security',
    title: 'Branch Security, First-Hand',
    client: 'Deutsche Bank',
    audience: 'Branch staff',
    brief:
      'E-learning course on branch security for all counter staff, navigated by an animated character with animations synchronised to the narrating voice, to turn every employee from a passive subject into an active part of the security system.',
    description:
      'An e-learning course on branch security for all counter staff. An animated character guides the navigation, with animations synchronised to the narrating voice — turning every employee from a passive subject into an active part of the security system.',
    category: 'vertical-training',
    image: '/case-studies/deutsche-bank-branch-security.jpg',
    tags: ['Branch security', 'Animation & voice-over', 'Banking'],
    challenge: 'Make every employee an active part of branch security.',
  },
  {
    slug: 'sky-people-management',
    title: 'The Art of People Management, in 10 Modules',
    client: 'Sky',
    audience: 'People Managers',
    brief:
      'Training journey for Sky People Managers on the art of managing people, articulated in 10 anytime-anywhere learning blocks to optimise the time-to-learning ratio and strengthen corporate know-how.',
    description:
      'A training journey for Sky People Managers articulated in 10 microlearning blocks consumable anytime, anywhere. A modular path that optimises the time-to-learning ratio and strengthens corporate know-how without taking time away from the job.',
    category: 'vertical-training',
    image: '/case-studies/sky-people-management.jpg',
    tags: ['People management', 'Modular microlearning', 'Media & Entertainment'],
    challenge: 'Offer flexible training that fits any moment of the working day.',
  },
  {
    slug: 'neos-lithium-battery-ai',
    title: 'When Training Becomes a Choice',
    client: 'Neos',
    audience: 'Ground operators',
    brief:
      'Assessment delivered as an interactive video entirely generated with AI from real client imagery: ground operators face the risks of lithium batteries in flight, choosing how to act, with the scene evolving based on each decision.',
    description:
      'An assessment delivered as an interactive video, generated entirely with generative AI from real Neos imagery. Ground operators face the risks of lithium batteries in flight by choosing how to act — and the scene evolves with every decision, turning a mandatory test into an experience built on choices.',
    category: 'vertical-training',
    image: '/case-studies/neos-lithium-battery-ai.jpg',
    tags: ['Regulatory assessment', 'Interactive AI video', 'Aviation'],
    challenge: 'Turn a mandatory test into an interactive, decision-based experience.',
  },
]

export const CATEGORY_LABEL: Record<Category, string> = {
  'digital-academy':   'Digital Academy',
  'onboarding':        'Onboarding',
  'product-training':  'Product Training',
  'vertical-training': 'Vertical Training',
}

export default caseStudies
