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
}

const caseStudies: CaseStudy[] = [
  // ── Digital Academy ───────────────────────────────────────────────────────
  {
    slug: 'supply-chain-academy',
    title: 'Supply Chain Academy',
    client: 'Piedmont Region',
    audience: 'Workers in the Piedmont Region',
    brief:
      "To design and develop an online platform capable of providing training and services to all employed and unemployed workers in the Piedmont Region.",
    description:
      "11 regional supply chain academies tasked with ensuring: Territorial Coordination (identifying training needs and the supply chain's objectives in terms of skills and human capital development), In-Service Training for employees of companies within the supply chain, and Training for the Unemployed aimed at employment, delivered under the responsibility of Training Agencies, either by the Agencies themselves or directly by the Academy's Partner Companies. A platform that enables and ensures the management of the Academy, the dissemination of training programmes and the ability to keep all stakeholders in contact. An essential set of tools for information, communication, management and activity monitoring.",
    category: 'digital-academy',
    image: '/case-studies/supply-chain-academy.jpg',
  },
  {
    slug: 'digital-liguria',
    title: 'Digital Liguria',
    client: 'Liguria Digitale',
    audience: 'Residents of the Liguria Region',
    brief:
      "To make knowledge available free of charge online, enabling proper access to modern information and communication technologies, with the aim of offering citizens significant support towards digital literacy.",
    description:
      "The future is built one day at a time, and one of the best ways to build it is to start with solid foundations. This is the goal set by the Digital Academy of Liguria Digitale for its training programme: an efficient e-learning platform offering professional development, reskilling and training courses to shape the professionals of the future, particularly in the high-tech sector and across a range of digital skills.",
    category: 'digital-academy',
    image: '/case-studies/digital-liguria.jpg',
  },
  {
    slug: 'dussmann-academy',
    title: 'Dussmann Academy',
    client: 'Dussmann Services',
    audience: 'Group employees',
    brief: "To design and develop a corporate academy capable of training all employees within the group.",
    description:
      "An innovative, practical and flexible tool designed to reach all 17,000 Italian employees of Dussmann Services in a timely and comprehensive manner, offering training courses tailored specifically to every role within the company. The e-learning platform has been progressively expanded to include webinars and technical and managerial training courses, and has become an essential tool for supporting and complementing face-to-face training.",
    category: 'digital-academy',
    image: '/case-studies/dussmann-academy.jpg',
  },
  {
    slug: 'technology-and-digital-academy',
    title: 'Technology and Digital Academy',
    client: 'IVECO',
    audience: 'In-house company employees',
    brief: "Develop multiple training modules to form the new internal Academy for Iveco.",
    description:
      "The project involves the development of various e-learning modules, many of which have different levels (basic, intermediate, advanced), with the aim of training the company's employees on the most important and sensitive topics. The modules present the content using simple yet effective graphics, with exercises and quizzes to stimulate user engagement and learning, and make extensive use of AI solutions.",
    category: 'digital-academy',
    image: '/case-studies/technology-and-digital-academy.jpg',
  },
  {
    slug: 'marelli-campus',
    title: 'Marelli Campus',
    client: 'Marelli',
    audience: 'Marelli authorised service network',
    brief:
      "To create an online academy by digitising the technical and management courses currently delivered in person to the network of Magneti Marelli authorised workshops.",
    description:
      "Magneti Marelli After Sales has a long-standing tradition of providing classroom-based training for its authorised service network. The project was launched in 2014 with the aim of complementing this activity with an online academy designed to support and expand on the classroom-based training, and it is still ongoing. To date, around ninety online modules have been developed, based on classroom materials optimised for online use: to reinforce the concept of a series, each course features graphics and a navigation interface common to its respective subject area, whilst the text content is accompanied by videos, 2D and 3D animations, and additional downloadable resources. Upon completion of the course, an official Magneti Marelli certificate of attendance is issued. A video trailer, linked to each module and freely downloadable from the Magneti Marelli Campus platform, provides a quick preview of the course objectives and content.",
    category: 'digital-academy',
    image: '/case-studies/marelli-campus.jpg',
  },

  // ── Onboarding ────────────────────────────────────────────────────────────
  {
    slug: 'esselunga-onboarding',
    title: 'Esselunga Onboarding',
    client: 'Esselunga',
    audience: 'Esselunga employees and new recruits',
    brief: "Introduce new recruits to Esselunga's values and world.",
    description:
      "Onboarding courses are designed to provide new recruits with the basic skills needed for a successful integration into the company, laying the foundations for a long-lasting, empathetic bond between the company and the employee. We have chosen to tell Esselunga's story through a journey: the user guides Esselunga's iconic van through a sequence of scenes composed of images relating to the historical and cultural context of various eras. During the journey, the van stops at significant dates, where users can explore content relating to the company's history, advertising campaigns and product innovations introduced by Esselunga.",
    category: 'onboarding',
    image: '/case-studies/esselunga-onboarding.jpg',
  },
  {
    slug: 'onboarding-dussmann',
    title: 'Onboarding – Dussmann',
    client: 'Dussmann Services',
    audience: 'Internal company staff',
    brief:
      "To introduce the company to new employees. To provide an overview of the company by combining the narrative of its history and identity with an explanation of its structural and organisational characteristics. To provide new recruits with information on the employee tools made available by the company.",
    description:
      "The course provides a comprehensive overview of the company, from its history and values to a detailed look at its constituent companies and the services it offers. The course adopts a photographic style, making use of the historical material provided to enable the user to feel part of the new working environment right from the start. The course is divided into chapters, and the content narrative makes use of interactivity with the aim of engaging the user throughout the course.",
    category: 'onboarding',
    image: '/case-studies/onboarding-dussmann.jpg',
  },
  {
    slug: 'maserati-history',
    title: 'Maserati History',
    client: 'Maserati',
    audience: 'Sales staff at Maserati dealerships',
    brief: "To present the Maserati brand through its more than 100 years of history.",
    description:
      "Officine Alfieri Maserati was founded on 1 December 1914 in Bologna, Italy. Since then, Maserati has played a pivotal role in the history of sports car culture and their development. Over a century of activity has brought with it astonishing achievements, both on the road and on the track, as well as periods of great challenges, which have enabled the company to forge its own character and personality. This course, organised by decade, takes the brand's sales staff on a journey through a history spanning more than a century, immersing them in the world of one of the most famous brands in the history of the global automotive industry: an Italian story, a global icon.",
    category: 'onboarding',
    image: '/case-studies/maserati-history.jpg',
  },

  // ── Product Training ──────────────────────────────────────────────────────
  {
    slug: 'm-346-c-27j-familiarisation',
    title: 'M-346 / C-27J Familiarisation',
    client: 'Leonardo Aircraft Division',
    audience: 'Group Employees and Customers',
    brief: "To introduce a new approach to the design and delivery of aviation training content via e-learning.",
    description:
      "Instructional design and development of multimedia content for familiarisation courses on the M-346 and C-27J Spartan Next Generation aircraft, aimed at training Leonardo's internal staff and international clients. The classroom-based courses have been optimised and converted into online modules in English, comprising video lessons, operational tutorials and 360° videos filmed both on board and outside the aircraft. The translation of the material ensures effective dissemination in the international markets where the aircraft are sold. The learning objects cover all ATA chapters and are available on the Leonardo Velivoli LMS platform.",
    category: 'product-training',
    image: '/case-studies/m-346-c-27j-familiarisation.jpg',
  },
  {
    slug: 'clienteling-training',
    title: 'Clienteling Training',
    client: 'Gucci',
    audience: 'Internal group employees',
    brief: "To provide innovative training that is fully accessible via smartphone and in keeping with the Gucci style.",
    description:
      "A digital learning programme developed for smartphones and computers, designed for all markets and countries where the Gucci brand is currently available, and aimed at all members of the Gucci store and e-commerce teams. The content of the nine modules (Foundation and Advanced) has been developed in line with the Gucci brand's communication guidelines and is characterised by a high degree of interactivity, ease of use and the intercultural language that defines the brand.",
    category: 'product-training',
    image: '/case-studies/clienteling-training.jpg',
  },
  {
    slug: 'gran-turismo',
    title: 'Gran Turismo',
    client: 'Maserati',
    audience: 'Sales staff',
    brief: "Present the new Maserati GranTurismo to sales staff, highlighting its key features in a precise and concise manner.",
    description:
      "The training programme, divided into three modules, concisely presents the key features of the new Maserati GranTurismo. Aimed at sales staff, the course highlights the vehicle's fundamental characteristics to support effective client presentations. The modules were developed using extensive original Maserati photo, audio and video material or bespoke content, presenting the material in a sleek, elegant and engaging way.",
    category: 'product-training',
    image: '/case-studies/gran-turismo.jpg',
  },
  {
    slug: 'iveco-edaily',
    title: 'IVECO eDaily',
    client: 'IVECO',
    audience: 'IVECO sales network',
    brief: "Develop a gamified module to present the main features of the new electric Daily.",
    description:
      "The training programme takes Paul through a variety of scenarios, with the aim of helping users discover the key features of the new electric IVECO Daily. Various 'mission companions' assist the protagonist along the way, setting him challenges and quizzes to test his understanding. The course alternates between theoretical sections and highly interactive activities, with a light-hearted style inspired by animated films, creating an informal and playful atmosphere.",
    category: 'product-training',
    image: '/case-studies/iveco-edaily.jpg',
  },

  // ── Vertical Training ─────────────────────────────────────────────────────
  {
    slug: 'corporate-brand-identity',
    title: 'Corporate & Brand Identity',
    client: "Skillab – Human Resources Development Centre – Turin Industrialists' Union",
    audience: 'SME Managers',
    brief:
      "Produce short training videos to support SME managers in enhancing corporate identity, brand identity and employee engagement.",
    description:
      "These short training videos aim to raise awareness among SME managers of the importance of a company's intangible assets, with a focus on corporate identity, brand identity and employee engagement. The video content, designed and produced to meet the client's specific needs, offers a practical guide, providing tools and strategies to strengthen corporate identity and positioning.",
    category: 'vertical-training',
    image: '/case-studies/corporate-brand-identity.jpg',
  },
  {
    slug: 'zero-tolerance',
    title: 'Zero Tolerance',
    client: 'RINA',
    audience: 'Internal staff',
    brief:
      "Use a photographic approach with high-impact, evocative material, combined with illustrations and meaningful textual keywords to support and complement the course content.",
    description:
      "This e-learning module aims to raise awareness among RINA staff regarding the issue of violence and harassment in the workplace and, at the same time, to outline RINA's policy and the initiatives put in place to reaffirm the company's zero-tolerance approach in this area, with the aim of creating a respectful and non-intimidating working environment where differences in age, race, nationality, religion, gender and sexual orientation are proactively promoted. The inclusion of several real-life cases, presented in vector graphics, which are non-stereotypical and true to life, illustrates and reinforces the concepts covered in the course and allows the user to test the knowledge acquired during the session.",
    category: 'vertical-training',
    image: '/case-studies/zero-tolerance.jpg',
  },
  {
    slug: 'genuine-parts-training',
    title: 'Genuine Parts Training',
    client: 'CNH Industrial',
    audience: 'Sales staff worldwide',
    brief: "Support spare parts sales staff to help them promote Genuine Spare Parts, thereby creating added value for customers.",
    description:
      "A new innovative platform has made it possible to create realistic sales scenarios using customised 3D avatars equipped with advanced emotional feedback (empathy, interpersonal skills, expertise, etc.). The project consists of two episodes, each with different learning objectives, which are achieved by immersing the student in a fun, branching environment where they are constantly challenged to interact in order to earn points and receive a reward at the end of the learning journey. An original way to acquire product knowledge and sales techniques whilst having fun.",
    category: 'vertical-training',
    image: '/case-studies/genuine-parts-training.jpg',
  },
  {
    slug: 'anti-money-laundering',
    title: 'Anti-Money Laundering Web Series',
    client: 'Intesa Sanpaolo',
    audience: 'Employees of the Intesa Sanpaolo Group',
    brief: "To present complex money laundering case studies in an engaging and compelling manner.",
    description:
      "Using the style of a crime comic, each case is presented as a detective story: a central character who appears in all the stories, the lawyer Massimo Della Penna, recounts the events, his deductions and the pattern of the criminal activity under scrutiny. As the story unfolds, suspicious behaviour and incidents are highlighted – those to which the user must pay attention in their day-to-day work. The course series is structured and delivered as a mini-series and is divided graphically into new and recurring money laundering cases, with regular releases and a preview of the next case at the end of each episode.",
    category: 'vertical-training',
    image: '/case-studies/anti-money-laundering.jpg',
  },
  {
    slug: 'hygiene-and-nutrition',
    title: 'Hygiene and Nutrition',
    client: 'Esselunga',
    audience: 'Esselunga employees',
    brief:
      "To create an effective and engaging course, taking into account the wide range of educational backgrounds among Esselunga Group employees.",
    description:
      "The course explains the correct practices and procedures for ensuring proper hygiene in the food industry, using the simple and engaging style of comic-style storytelling and narrated voice-overs. This approach effectively reaches learners of all literacy levels. The engagement created by the characters Marta and Gianni, alongside whom participants explore different settings, makes it easier and more immediate to grasp the concepts.",
    category: 'vertical-training',
    image: '/case-studies/hygiene-and-nutrition.jpg',
  },
  {
    slug: 'corporate-liability-231',
    title: 'Corporate Liability – Legislative Decree 231/01',
    client: 'IVECO',
    audience: 'In-house employees',
    brief: "To design and develop a training programme that, through game-based learning, explains Legislative Decree 231 to employees.",
    description:
      "The course combines theoretical content with interactive activities designed to stimulate reflection and learning, enabling participants to fully grasp the issues relating to Legislative Decree 231 and apply them individually or in a group setting whenever appropriate. The content is structured and presented in the form of self-contained 'modules', with a focus on multimedia and interactive micro-learning elements.",
    category: 'vertical-training',
    image: '/case-studies/corporate-liability-231.jpg',
  },
  {
    slug: 'crm-dealers',
    title: 'CRM Dealers',
    client: 'IVECO',
    audience: 'Iveco dealerships',
    brief:
      "Explain what a CRM is and how IVECO CRM can help salespeople improve their sales performance and customer management.",
    description:
      "The course is divided into two main sections: the first part covers the introduction to and configuration of the CRM, whilst the second describes its features. Both sections are accompanied by dozens of video tutorials organised by professional role, so as to focus and optimise users' learning experience.",
    category: 'vertical-training',
    image: '/case-studies/crm-dealers.jpg',
  },
]

export const CATEGORY_LABEL: Record<Category, string> = {
  'digital-academy':   'Digital Academy',
  'onboarding':        'Onboarding',
  'product-training':  'Product Training',
  'vertical-training': 'Vertical Training',
}

export default caseStudies
