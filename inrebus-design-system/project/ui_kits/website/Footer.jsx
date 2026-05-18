// Footer.jsx — inRebus Footer + Contact
window.Footer = function Footer({ onNavigate }) {
  const s = footerStyles;
  return (
    <footer style={s.footer}>
      {/* CTA Banner */}
      <div style={s.ctaBanner}>
        <div style={s.ctaOrb}></div>
        <div style={s.ctaInner}>
          <span style={s.ctaOverline}>inContact</span>
          <h2 style={s.ctaTitle}>Ready to start<br /><span style={s.ctaAccent}>your project?</span></h2>
          <p style={s.ctaDesc}>Do you want to meet us or need more information? Get in touch — we respond within 24 hours.</p>
          <div style={s.ctaRow}>
            <button style={s.ctaBtn}>Send a Brief</button>
            <a href="mailto:info.educational@inrebus.it" style={s.ctaLink}>info.educational@inrebus.it</a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div style={s.bottom}>
        <div style={s.bottomInner}>
          <div style={s.logo}>
            <span style={s.logoIn}>in</span>Rebus
            <span style={s.logoSub}> digital learning</span>
          </div>
          <div style={s.info}>
            <div style={s.infoLine}>Corso Vinzaglio 23, 10121 — Torino, Italy</div>
            <div style={s.infoLine}>Tel. +39 011 0201308</div>
          </div>
          <div style={s.links}>
            {['inSide','inPractice','inAction','inEvolution'].map(l => (
              <span key={l} style={s.footLink}>{l}</span>
            ))}
          </div>
          <div style={s.copy}>
            <div style={s.copyText}>© 2003–2026 inRebus® Technologies S.r.l.</div>
            <div style={s.copyText}>P.IVA 08678030019</div>
          </div>
        </div>
        <div style={s.legal}>
          <span style={s.legalLink}>Privacy Policy</span>
          <span style={s.legalDot}>·</span>
          <span style={s.legalLink}>Cookie Policy</span>
        </div>
      </div>
    </footer>
  );
};

const footerStyles = {
  footer: { background: '#0A1628', borderTop: '1px solid rgba(255,255,255,0.04)' },
  ctaBanner: { position: 'relative', background: '#202020', padding: '96px 48px', overflow: 'hidden' },
  ctaOrb: { position: 'absolute', right: '-100px', top: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,32,0.2) 0%, transparent 70%)', pointerEvents: 'none' },
  ctaInner: { maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 },
  ctaOverline: { fontFamily: "'Lexend',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F58220', display: 'block', marginBottom: '16px' },
  ctaTitle: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: '72px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '-0.02em', color: '#fff', margin: '0 0 20px' },
  ctaAccent: { color: '#F58220' },
  ctaDesc: { fontFamily: "'Lexend',sans-serif", fontSize: '16px', color: '#6B7480', lineHeight: 1.7, margin: '0 0 36px', maxWidth: '480px' },
  ctaRow: { display: 'flex', alignItems: 'center', gap: '24px' },
  ctaBtn: { fontFamily: "'Lexend',sans-serif", fontSize: '13px', fontWeight: 600, background: '#F58220', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '6px', cursor: 'pointer' },
  ctaLink: { fontFamily: "'Lexend',sans-serif", fontSize: '13px', color: '#6B7480', textDecoration: 'none', letterSpacing: '0.01em' },
  bottom: { padding: '48px', maxWidth: '1280px', margin: '0 auto' },
  bottomInner: { display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr', gap: '32px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px' },
  logo: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: '22px', fontWeight: 900, textTransform: 'uppercase', color: '#fff' },
  logoIn: { color: '#F58220' },
  logoSub: { fontFamily: "'Lexend',sans-serif", fontWeight: 400, fontSize: '12px', letterSpacing: '0.08em', color: '#6B7480' },
  info: {},
  infoLine: { fontFamily: "'Lexend',sans-serif", fontSize: '12px', color: '#6B7480', lineHeight: 1.8 },
  links: { display: 'flex', flexDirection: 'column', gap: '8px' },
  footLink: { fontFamily: "'Lexend',sans-serif", fontSize: '12px', color: '#6B7480', cursor: 'pointer' },
  copy: {},
  copyText: { fontFamily: "'Lexend',sans-serif", fontSize: '11px', color: '#333333', lineHeight: 1.8 },
  legal: { display: 'flex', gap: '12px', alignItems: 'center' },
  legalLink: { fontFamily: "'Lexend',sans-serif", fontSize: '11px', color: '#333333', cursor: 'pointer' },
  legalDot: { color: '#333333', fontSize: '11px' },
};
