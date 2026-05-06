import { motion } from 'framer-motion'
import { FaCalendarAlt, FaArrowRight, FaLinkedin } from 'react-icons/fa'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.25 }
  }
}

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

const floatingBadges = [
  { label: 'PSM I',        x: 0,    y: -148, color: '#2DD4BF', delay: 0 },
  { label: 'SAFe 6 SM',   x: 141,  y: -46,  color: '#818CF8', delay: 0.3 },
  { label: 'Scrum',        x: 87,   y: 120,  color: '#F472B6', delay: 0.6 },
  { label: 'SAFe Agilist', x: -87,  y: 120,  color: '#34D399', delay: 0.9 },
  { label: 'Kanban',       x: -141, y: -46,  color: '#FB923C', delay: 1.2 },
]

const Hero = () => (
  <section id="hero" className="hero">
    <div className="hero-orb orb-a" />
    <div className="hero-orb orb-b" />
    <div className="hero-orb orb-c" />
    <div className="grid-pattern" />

    <div className="container hero-container">
      {/* ── Left ── */}
      <motion.div className="hero-left" variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="eyebrow">
          <span className="eyebrow-pulse" />
          Open to new opportunities
        </motion.div>

        <motion.h1 variants={item} className="hero-name">
          Ahmed<br />
          <span className="name-gradient">Chioua</span>
        </motion.h1>

        <motion.p variants={item} className="hero-role">
          Scrum Master &amp; Agile Expert
        </motion.p>

        <motion.p variants={item} className="hero-desc">
          5+ years as Scrum Master · 9-year engineering background · telecom, automotive,
          life sciences &amp; retail. Servant leader who protects the process, removes blockers,
          and coaches teams to deliver outcomes that matter.
        </motion.p>

        <motion.div variants={item} className="hero-ctas">
          <motion.a
            href="#calendly"
            className="cta-primary"
            whileHover={{ scale: 1.04, boxShadow: '0 0 44px rgba(45,212,191,0.45)' }}
            whileTap={{ scale: 0.97 }}
          >
            <FaCalendarAlt size={14} />
            Book a Discovery Call
          </motion.a>
          <motion.a href="#experience" className="cta-ghost" whileHover={{ x: 6 }}>
            View My Work <FaArrowRight size={13} />
          </motion.a>
        </motion.div>

        <motion.div variants={item} className="hero-chips">
          {['9 Yrs in Tech', '5+ Yrs as SM', 'PSM I', 'SAFe 6 Agilist', 'SAFe 6 SM'].map((c, i) => (
            <motion.span
              key={c}
              className="chip"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.08 }}
              whileHover={{ y: -3, scale: 1.04 }}
            >
              {c}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={item} className="hero-social">
          <a
            href="https://linkedin.com/in/ahmedchioua"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaLinkedin />
            linkedin.com/in/ahmedchioua
          </a>
        </motion.div>
      </motion.div>

      {/* ── Right visual ── */}
      <motion.div
        className="hero-right"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="visual-wrap">
          {/* Rings */}
          <div className="ring r1" />
          <div className="ring r2" />
          <div className="ring r3" />

          {/* Center */}
          <div className="visual-core">
            <span>AC</span>
          </div>

          {/* Floating skill badges */}
          {floatingBadges.map(b => (
            <motion.div
              key={b.label}
              className="float-badge"
              style={{
                top: `calc(50% + ${b.y}px - 16px)`,
                left: `calc(50% + ${b.x}px - 40px)`,
                '--bc': b.color,
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: b.delay + 0.5, duration: 0.4 },
                scale:   { delay: b.delay + 0.5, duration: 0.4 },
                y: { delay: b.delay + 0.9, duration: 3.5 + b.delay * 0.4, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              <span className="fb-dot" />
              {b.label}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>

    <style>{`
      .hero {
        min-height: 100vh;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        padding: 110px 0 70px;
      }
      .hero-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(90px);
        pointer-events: none;
      }
      .orb-a {
        width: 650px; height: 650px;
        background: radial-gradient(circle, rgba(45,212,191,0.1) 0%, transparent 68%);
        top: -180px; right: -80px;
        animation: floatOrb 9s ease-in-out infinite;
      }
      .orb-b {
        width: 500px; height: 500px;
        background: radial-gradient(circle, rgba(129,140,248,0.09) 0%, transparent 68%);
        bottom: -120px; left: -60px;
        animation: floatOrb 11s ease-in-out infinite reverse;
      }
      .orb-c {
        width: 320px; height: 320px;
        background: radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 68%);
        top: 45%; left: 32%;
        animation: floatOrb 13s ease-in-out infinite;
      }
      @keyframes floatOrb {
        0%,100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-28px) scale(1.04); }
      }
      .grid-pattern {
        position: absolute; inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px);
        background-size: 52px 52px;
        pointer-events: none;
      }
      .hero-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 64px;
        align-items: center;
        position: relative;
        z-index: 1;
      }
      /* Eyebrow */
      .eyebrow {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 0.78rem;
        font-weight: 700;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--accent-primary);
        margin-bottom: 22px;
      }
      .eyebrow-pulse {
        width: 8px; height: 8px;
        background: var(--accent-primary);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--accent-primary);
        animation: pulseDot 2s ease-in-out infinite;
      }
      @keyframes pulseDot {
        0%,100% { opacity:1; transform:scale(1); }
        50% { opacity:0.55; transform:scale(0.75); }
      }
      /* Name */
      .hero-name {
        font-size: clamp(3.4rem, 7vw, 6rem);
        font-weight: 900;
        line-height: 1;
        letter-spacing: -2.5px;
        color: var(--text-primary);
        margin-bottom: 18px;
      }
      .name-gradient {
        background: linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      /* Role */
      .hero-role {
        font-size: 1.25rem;
        font-weight: 500;
        color: var(--text-secondary);
        margin-bottom: 22px;
        padding-left: 18px;
        position: relative;
      }
      .hero-role::before {
        content: '';
        position: absolute;
        left: 0; top: 15%; bottom: 15%;
        width: 3px;
        background: linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary));
        border-radius: 2px;
      }
      /* Desc */
      .hero-desc {
        font-size: 1rem;
        color: var(--text-secondary);
        line-height: 1.85;
        margin-bottom: 36px;
        max-width: 440px;
      }
      /* CTAs */
      .hero-ctas {
        display: flex;
        align-items: center;
        gap: 28px;
        margin-bottom: 40px;
        flex-wrap: wrap;
      }
      .cta-primary {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 14px 28px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 100px;
        font-size: 0.92rem;
        font-weight: 700;
        color: #050816;
        box-shadow: 0 0 28px rgba(45,212,191,0.3);
        transition: box-shadow var(--transition);
      }
      .cta-ghost {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        font-size: 0.92rem;
        font-weight: 600;
        color: var(--text-secondary);
        transition: color var(--transition), gap var(--transition);
      }
      .cta-ghost:hover { color: var(--text-primary); gap: 14px; }
      /* Chips */
      .hero-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 9px;
        margin-bottom: 32px;
      }
      .chip {
        display: inline-block;
        padding: 5px 14px;
        background: rgba(255,255,255,0.04);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 100px;
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--text-secondary);
        cursor: default;
        transition: border-color var(--transition), color var(--transition), background var(--transition);
      }
      .chip:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
        background: rgba(45,212,191,0.06);
      }
      /* Social */
      .hero-social {}
      .social-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
        color: var(--text-muted);
        transition: color var(--transition);
      }
      .social-link:hover { color: var(--accent-primary); }

      /* ── Visual ── */
      .hero-right {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .visual-wrap {
        position: relative;
        width: 360px; height: 360px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .ring {
        position: absolute;
        border-radius: 50%;
        border: 1px dashed;
      }
      .r1 { width: 300px; height: 300px; border-color: rgba(45,212,191,0.14); animation: spin 26s linear infinite; }
      .r2 { width: 220px; height: 220px; border-color: rgba(129,140,248,0.12); animation: spin 18s linear infinite reverse; }
      .r3 { width: 140px; height: 140px; border-color: rgba(244,114,182,0.1); animation: spin 12s linear infinite; }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .visual-core {
        width: 96px; height: 96px;
        background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
        box-shadow: 0 0 50px rgba(45,212,191,0.45), 0 0 100px rgba(45,212,191,0.15);
      }
      .visual-core span {
        font-size: 1.6rem;
        font-weight: 900;
        color: #050816;
        letter-spacing: -1px;
      }
      .float-badge {
        position: absolute;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 13px;
        background: rgba(7,9,28,0.9);
        border: 1px solid rgba(255,255,255,0.09);
        border-radius: 100px;
        font-size: 0.72rem;
        font-weight: 700;
        color: var(--text-secondary);
        backdrop-filter: blur(12px);
        white-space: nowrap;
        transition: border-color var(--transition);
        z-index: 3;
      }
      .float-badge:hover {
        border-color: var(--bc, var(--accent-primary));
        color: var(--text-primary);
      }
      .fb-dot {
        width: 6px; height: 6px;
        background: var(--bc, var(--accent-primary));
        border-radius: 50%;
        flex-shrink: 0;
      }

      @media (max-width: 900px) {
        .hero-container {
          grid-template-columns: 1fr;
          text-align: center;
          gap: 50px;
        }
        .hero-role { padding-left: 0; }
        .hero-role::before { display: none; }
        .hero-desc { margin: 0 auto 36px; }
        .hero-ctas, .hero-chips, .hero-social { justify-content: center; }
        .hero-right { display: none; }
      }
    `}</style>
  </section>
)

export default Hero
