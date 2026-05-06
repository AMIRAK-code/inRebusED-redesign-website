// Process.jsx — inRebus Process / Approach Section
window.Process = function Process() {
  const steps = [
    { num: '01', title: 'Briefing', desc: 'Definition of guidelines and project scope with the client.' },
    { num: '02', title: 'Research', desc: 'Documentation analysis and deep subject-matter investigation.' },
    { num: '03', title: 'Project', desc: 'Structure design, user interface architecture and learning flows.' },
    { num: '04', title: 'Storyboard', desc: 'Content mapping, scripts and visual narrative for every module.' },
    { num: '05', title: 'Graphic Design', desc: 'Visual design validated to project and brand characteristics.' },
    { num: '06', title: 'Production', desc: 'Course development following validated graphics and storyboard.' },
    { num: '07', title: 'Testing', desc: 'Quality control, accessibility and cross-platform validation.' },
    { num: '08', title: 'Release', desc: 'Course delivery and LMS support with professional help desk.' },
  ];

  const [active, setActive] = React.useState(0);
  const s = processStyles;

  return (
    <section style={s.section}>
      <div style={s.container}>
        <div style={s.left}>
          <span style={s.overline}>inAction — Our Approach</span>
          <h2 style={s.title}>Every Phase.<br /><span style={s.accent}>Zero Shortcuts.</span></h2>
          <p style={s.desc}>We take care of every phase of product development, from training needs analysis to results evaluation.</p>
          <div style={s.quote}>
            <div style={s.quoteLine}></div>
            <div>
              <div style={s.quoteText}>"No great mind has ever existed without a touch of madness"</div>
              <div style={s.quoteAuthor}>— Seneca</div>
            </div>
          </div>
        </div>
        <div style={s.right}>
          {steps.map((step, i) => (
            <div
              key={i}
              style={{...s.step, ...(active === i ? s.stepActive : {})}}
              onMouseEnter={() => setActive(i)}
            >
              <div style={{...s.stepNum, ...(active === i ? s.stepNumActive : {})}}>{step.num}</div>
              <div style={s.stepContent}>
                <div style={{...s.stepTitle, ...(active === i ? s.stepTitleActive : {})}}>{step.title}</div>
                <div style={{...s.stepDesc, ...(active === i ? s.stepDescActive : {})}}>{step.desc}</div>
              </div>
              <div style={{...s.stepDot, ...(active === i ? s.stepDotActive : {})}}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const processStyles = {
  section: { background: '#F7F7F7', padding: '120px 48px' },
  container: { maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' },
  left: { position: 'sticky', top: '100px' },
  overline: { fontFamily: "'Lexend',sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#F58220', display: 'block', marginBottom: '16px' },
  title: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: '56px', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1.0, letterSpacing: '-0.02em', color: '#0A1628', margin: '0 0 20px' },
  accent: { color: '#F58220' },
  desc: { fontFamily: "'Lexend',sans-serif", fontSize: '15px', color: '#6B7480', lineHeight: 1.7, margin: '0 0 40px' },
  quote: { display: 'flex', gap: '16px', alignItems: 'flex-start' },
  quoteLine: { width: '3px', background: '#F58220', borderRadius: '2px', flexShrink: 0, alignSelf: 'stretch', minHeight: '48px' },
  quoteText: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', color: '#0A1628', lineHeight: 1.3, marginBottom: '6px' },
  quoteAuthor: { fontFamily: "'Lexend',sans-serif", fontSize: '12px', color: '#A8ADB5', letterSpacing: '0.04em' },
  right: { display: 'flex', flexDirection: 'column', gap: '2px' },
  step: { display: 'flex', gap: '16px', alignItems: 'center', padding: '18px 20px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s', position: 'relative' },
  stepActive: { background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' },
  stepNum: { fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', fontWeight: 500, color: '#A8ADB5', minWidth: '28px', transition: 'color 0.2s' },
  stepNumActive: { color: '#F58220' },
  stepContent: { flex: 1 },
  stepTitle: { fontFamily: "'Barlow Condensed',sans-serif", fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', color: '#6B7480', letterSpacing: '-0.01em', transition: 'color 0.2s' },
  stepTitleActive: { color: '#0A1628' },
  stepDesc: { fontFamily: "'Lexend',sans-serif", fontSize: '12px', color: 'transparent', lineHeight: 1.6, marginTop: '4px', maxHeight: 0, overflow: 'hidden', transition: 'all 0.3s' },
  stepDescActive: { color: '#6B7480', maxHeight: '60px' },
  stepDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#E5E5E5', transition: 'background 0.2s' },
  stepDotActive: { background: '#F58220' },
};
