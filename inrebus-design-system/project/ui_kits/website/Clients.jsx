// Clients.jsx — inRebus Clients + Quote Section
window.Clients = function Clients() {
  const clients = ['Jeep','Alfa Romeo','Unicredit','Maserati','Reale','Mopar','Intesa Sanpaolo','Iveco','Lancia','CNHi','Esselunga','FCA','FTP','Magneti','Daikin','Fiat','Abarth','SKP','Finmeccanica','Sky'];
  const s = clientStyles;

  return (
    <section style={s.section}>
      <div style={s.container}>
        <div style={s.header}>
          <span style={s.overline}>inEvolution — Our Clients</span>
          <h2 style={s.title}>Trusted by Industry<br /><span style={s.accent}>Leaders</span></h2>
          <p style={s.desc}>Each client is a world with its own geography, population and culture. Each encounter enriches us and inspires us towards always more creative and effective solutions.</p>
        </div>

        {/* Quote banner */}
        <div style={s.quoteBanner}>
          <div style={s.quoteInner}>
            <div style={s.quoteIcon}>"</div>
            <div style={s.quoteText}>Online learning is not the next big thing,<br />it is the <span style={s.quoteAccent}>now big thing</span></div>
            <div style={s.quoteAttr}>— Donna J. Abernathy</div>
          </div>
        </div>

        {/* Clients grid */}
        <div style={s.grid}>
          {clients.map((c, i) => (
            <div key={i} style={s.clientChip}>{c}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

const clientStyles = {
  section: { background: '#0A1628', padding: '120px 48px' },
  container: { maxWidth: '1280px', margin: '0 auto' },
  header: { marginBottom: '64px', maxWidth: '600px' },
  overline: { fontFamily: "'Lexend',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F58220', display: 'block', marginBottom: '16px' },
  title: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: '56px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 20px' },
  accent: { color: '#F58220' },
  desc: { fontFamily: "'Lexend',sans-serif", fontSize: '15px', color: '#6B7480', lineHeight: 1.7, margin: 0 },
  quoteBanner: { background: '#202020', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '48px', marginBottom: '48px', position: 'relative', overflow: 'hidden' },
  quoteInner: { position: 'relative', zIndex: 1 },
  quoteIcon: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: '120px', fontWeight: 900, color: '#F58220', lineHeight: 0.7, marginBottom: '16px', opacity: 0.3 },
  quoteText: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: '40px', fontWeight: 700, textTransform: 'uppercase', color: '#fff', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px' },
  quoteAccent: { color: '#F58220' },
  quoteAttr: { fontFamily: "'Lexend',sans-serif", fontSize: '13px', color: '#6B7480', letterSpacing: '0.04em' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  clientChip: {
    fontFamily: "'Lexend',sans-serif",
    fontSize: '12px', fontWeight: 600,
    color: '#A8ADB5',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '8px 16px', borderRadius: '999px',
    letterSpacing: '0.02em',
    transition: 'all 0.2s', cursor: 'default',
  },
};
