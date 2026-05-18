// Nav.jsx — inRebus Digital Learning Navigation
window.Nav = function Nav({ currentSection, onNavigate }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'hero',     label: 'inVideo' },
    { id: 'about',    label: 'inSide' },
    { id: 'services', label: 'inPractice' },
    { id: 'process',  label: 'inAction' },
    { id: 'clients',  label: 'inEvolution' },
  ];

  const s = navStyles;

  return (
    <nav style={{...s.nav, ...(scrolled ? s.navScrolled : {})}}>
      <div style={s.logo}>
        <span style={s.logoIn}>in</span>Rebus
        <span style={s.logoSub}> digital learning</span>
      </div>
      <div style={s.links}>
        {links.map(l => (
          <button key={l.id} style={{...s.link, ...(currentSection===l.id ? s.linkActive : {})}}
            onClick={() => onNavigate(l.id)}>
            <span style={l.id === currentSection ? s.linkInActive : s.linkIn}>
              {l.label.startsWith('in') ? 'in' : ''}
            </span>
            {l.label.startsWith('in') ? l.label.slice(2) : l.label}
          </button>
        ))}
      </div>
      <div style={s.actions}>
        <button style={s.btnLang}>EN</button>
        <button style={s.btnCta} onClick={() => onNavigate('contact')}>Contact Us</button>
      </div>
    </nav>
  );
};

const navStyles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 48px', height: '68px',
    background: 'rgba(10,22,40,0)',
    backdropFilter: 'blur(0px)',
    borderBottom: '1px solid rgba(255,255,255,0)',
    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
  },
  navScrolled: {
    background: 'rgba(10,22,40,0.92)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  logo: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontSize: '24px', fontWeight: 900, textTransform: 'uppercase',
    letterSpacing: '-0.01em', color: '#fff', cursor: 'default',
  },
  logoIn: { color: '#F58220' },
  logoSub: { fontFamily: "'Lexend', sans-serif", fontWeight: 400, fontSize: '13px', letterSpacing: '0.08em', color: '#6B7480', marginLeft: '4px' },
  links: { display: 'flex', alignItems: 'center', gap: '2px' },
  link: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '13px', fontWeight: 500, color: '#6B7480',
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '6px 12px', borderRadius: '5px',
    transition: 'color 0.2s',
  },
  linkActive: { color: '#fff', fontWeight: 600 },
  linkIn: { color: '#F58220', fontWeight: 700 },
  linkInActive: { color: '#FFA04D', fontWeight: 700 },
  actions: { display: 'flex', alignItems: 'center', gap: '8px' },
  btnLang: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '11px', fontWeight: 600,
    background: 'transparent', border: '1.5px solid rgba(255,255,255,0.14)',
    color: '#A8ADB5', padding: '6px 14px', borderRadius: '5px', cursor: 'pointer',
  },
  btnCta: {
    fontFamily: "'Lexend', sans-serif",
    fontSize: '12px', fontWeight: 600,
    background: '#F58220', border: 'none', color: '#fff',
    padding: '8px 20px', borderRadius: '6px', cursor: 'pointer',
    transition: 'background 0.2s, transform 0.15s',
  },
};
