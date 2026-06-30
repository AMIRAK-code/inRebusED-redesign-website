// Services.jsx — inRebus Services Section
window.Services = function Services() {
  const services = [
    { tag: 'Custom', title: 'Educational Projects', desc: 'Tailor-made digital learning experiences designed around your specific needs, brand, and learner profile.' },
    { tag: 'Design', title: 'Graphic Design', desc: 'Visual identity and interface design for courses, platforms and educational materials.' },
    { tag: 'Creative', title: 'Creative Communication', desc: 'Outside-the-box approaches to knowledge transfer — we break the conventions of corporate e-learning.' },
    { tag: 'Strategy', title: 'Instructional Design', desc: 'Structuring learning objectives, assessments, and paths that deliver measurable outcomes.' },
    { tag: 'Build', title: 'Courses Development', desc: 'Full production of SCORM/xAPI-compliant courses optimized across all devices and LMS platforms.' },
    { tag: 'Tech', title: 'Web/App Programming', desc: 'Assessment apps, custom LMS, SaaS platforms and deep integrations with your existing ecosystem.' },
    { tag: 'Visual', title: 'Illustration', desc: 'Original illustration style that gives inRebus courses a recognizable, human, and engaging quality.' },
    { tag: 'Media', title: 'Smart Video', desc: 'Our proprietary SV line — interactive video that turns passive watching into active learning.' },
    { tag: 'Global', title: 'Translation & Voice', desc: 'Multilingual courses with professional voice-over in multiple European and global languages.' },
  ];

  const s = serviceStyles;

  return (
    <section style={s.section} id="services">
      <div style={s.container}>
        <div style={s.header}>
          <span style={s.overline}>inPractice — Our Services</span>
          <h2 style={s.title}>All The Necessary<br /><span style={s.titleAccent}>Skills</span></h2>
          <p style={s.desc}>We cover every phase — from training needs analysis to results evaluation — in-house, with a trusted network when needed.</p>
        </div>
        <div style={s.grid}>
          {services.map((sv, i) => (
            <ServiceCard key={i} {...sv} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

function ServiceCard({ tag, title, desc, index }) {
  const [hovered, setHovered] = React.useState(false);
  const s = serviceStyles;
  return (
    <div
      style={{...s.card, ...(hovered ? s.cardHover : {})}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.cardTag}>{tag}</div>
      <h3 style={s.cardTitle}>{title}</h3>
      <p style={s.cardDesc}>{desc}</p>
      <div style={{...s.cardArrow, ...(hovered ? s.cardArrowHover : {})}}>→</div>
    </div>
  );
}

const serviceStyles = {
  section: { background: '#0A1628', padding: '120px 48px' },
  container: { maxWidth: '1280px', margin: '0 auto' },
  header: { marginBottom: '64px', maxWidth: '560px' },
  overline: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: '#F58220',
    display: 'block', marginBottom: '16px',
  },
  title: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '64px', fontWeight: 900, textTransform: 'uppercase',
    lineHeight: 1.0, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 20px',
  },
  titleAccent: { color: '#F58220' },
  desc: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '16px', color: '#6B7480', lineHeight: 1.7, margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '12px', overflow: 'hidden',
  },
  card: {
    background: '#0A1628', padding: '32px 28px',
    cursor: 'pointer', position: 'relative',
    transition: 'background 0.25s',
  },
  cardHover: { background: '#202020' },
  cardTag: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: '#E8451A', marginBottom: '12px',
  },
  cardTitle: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '22px', fontWeight: 700, textTransform: 'uppercase',
    color: '#fff', letterSpacing: '-0.01em', margin: '0 0 10px',
  },
  cardDesc: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '13px', color: '#6B7480', lineHeight: 1.65, margin: 0,
  },
  cardArrow: {
    position: 'absolute', bottom: '28px', right: '28px',
    color: '#333333', fontSize: '18px',
    transition: 'color 0.2s, transform 0.2s',
  },
  cardArrowHover: { color: '#F58220', transform: 'translateX(4px)' },
};
