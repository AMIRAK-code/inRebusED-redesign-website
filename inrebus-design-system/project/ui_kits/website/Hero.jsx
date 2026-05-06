// Hero.jsx — inRebus Educational Hero Section
window.Hero = function Hero({ onNavigate }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const s = heroStyles;

  return (
    <section style={s.section}>
      {/* Decorative background orbs */}
      <div style={s.orbViolet}></div>
      <div style={s.orbSpicy}></div>
      <div style={s.grid}></div>

      <div style={s.inner}>
        {/* Overline */}
        <div style={{...s.overline, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'all 0.6s 0.1s cubic-bezier(0.16,1,0.3,1)'}}>
          <span style={s.spicyDot}>●</span> E-learning outside the box
        </div>

        {/* Headline */}
        <h1 style={{...s.headline, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(32px)', transition: 'all 0.8s 0.25s cubic-bezier(0.16,1,0.3,1)'}}>
          <span style={s.headlineAccent}>Digital</span><br />
          Learning<br />
          <span style={s.headlineOutline}>Re-imagined</span>
        </h1>

        {/* Sub */}
        <p style={{...s.sub, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'all 0.7s 0.45s cubic-bezier(0.16,1,0.3,1)'}}>
          We are project managers, instructional designers, illustrators,<br />
          video makers and developers. Based in Turin since 2003.
        </p>

        {/* CTAs */}
        <div style={{...s.ctas, opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: 'all 0.6s 0.6s cubic-bezier(0.16,1,0.3,1)'}}>
          <button style={s.btnPrimary} onClick={() => onNavigate('services')}>Explore Services</button>
          <button style={s.btnSecondary} onClick={() => onNavigate('contact')}>Download Brochure</button>
        </div>

        {/* Stats row */}
        <div style={{...s.stats, opacity: visible ? 1 : 0, transition: 'opacity 0.8s 0.9s'}}>
          {[['2003', 'Founded in Turin'], ['20+', 'Major clients'], ['3', 'Language pairs'], ['100%', 'Custom solutions']].map(([n, l]) => (
            <div key={n} style={s.stat}>
              <div style={s.statNum}>{n}</div>
              <div style={s.statLabel}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={s.scrollHint}>
        <div style={s.scrollLine}></div>
        <span style={s.scrollText}>scroll</span>
      </div>
    </section>
  );
};

const heroStyles = {
  section: {
    position: 'relative', minHeight: '100vh',
    background: '#0A1628',
    display: 'flex', alignItems: 'center',
    overflow: 'hidden', padding: '120px 48px 80px',
  },
  orbViolet: {
    position: 'absolute', top: '-10%', right: '-5%',
    width: '600px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(245,130,32,0.18) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  orbSpicy: {
    position: 'absolute', bottom: '5%', left: '30%',
    width: '400px', height: '400px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(232,69,26,0.08) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
    backgroundSize: '80px 80px',
    pointerEvents: 'none',
  },
  inner: { position: 'relative', zIndex: 2, maxWidth: '860px' },
  overline: {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    fontFamily: "'Lexend', sans-serif",
    fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: '#F58220',
    marginBottom: '24px',
  },
  spicyDot: { color: '#E8451A', fontSize: '8px' },
  headline: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: 'clamp(72px, 10vw, 120px)',
    fontWeight: 900, lineHeight: 1.0,
    letterSpacing: '-0.03em', textTransform: 'uppercase',
    color: '#fff', margin: '0 0 32px',
  },
  headlineAccent: { color: '#F58220' },
  headlineOutline: {
    WebkitTextStroke: '2px rgba(255,255,255,0.3)',
    color: 'transparent',
  },
  sub: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '17px', fontWeight: 400,
    lineHeight: 1.7, color: '#6B7480',
    margin: '0 0 40px',
  },
  ctas: { display: 'flex', gap: '12px', marginBottom: '64px' },
  btnPrimary: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '14px', fontWeight: 600,
    background: '#F58220', color: '#fff',
    border: 'none', padding: '14px 32px',
    borderRadius: '6px', cursor: 'pointer',
  },
  btnSecondary: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '14px', fontWeight: 600,
    background: 'transparent', color: '#A8ADB5',
    border: '1.5px solid rgba(255,255,255,0.14)',
    padding: '14px 32px', borderRadius: '6px', cursor: 'pointer',
  },
  stats: {
    display: 'flex', gap: '48px',
    borderTop: '1px solid rgba(255,255,255,0.06)',
    paddingTop: '32px',
  },
  stat: {},
  statNum: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '32px', fontWeight: 900,
    color: '#fff', letterSpacing: '-0.02em',
  },
  statLabel: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '11px', color: '#6B7480',
    fontWeight: 500, marginTop: '2px',
  },
  scrollHint: {
    position: 'absolute', bottom: '32px', left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
  },
  scrollLine: {
    width: '1px', height: '40px',
    background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
  },
  scrollText: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '9px', letterSpacing: '0.16em',
    textTransform: 'uppercase', color: '#333333',
  },
};
