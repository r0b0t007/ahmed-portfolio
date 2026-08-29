// Calm, senior ambient backdrop — replaces the high-stim MatrixRain.
// Pure CSS (no JS loop), two soft accent glows + a faint grid. Sits behind everything.
const AmbientBackground = () => (
  <div className="ambient" aria-hidden="true">
    <div className="ambient-grid" />
    <div className="ambient-glow ambient-teal" />
    <div className="ambient-glow ambient-amber" />

    <style>{`
      .ambient {
        position: fixed;
        inset: 0;
        z-index: -1;
        overflow: hidden;
        background:
          radial-gradient(1200px 800px at 78% -10%, rgba(45,212,191,0.06), transparent 60%),
          radial-gradient(1000px 700px at 12% 110%, rgba(245,181,103,0.05), transparent 60%),
          var(--bg-primary);
        pointer-events: none;
      }
      .ambient-grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
        background-size: 56px 56px;
        mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%);
        -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, #000 40%, transparent 100%);
      }
      .ambient-glow {
        position: absolute;
        border-radius: 50%;
        filter: blur(110px);
        opacity: 0.5;
      }
      .ambient-teal {
        width: 620px; height: 620px;
        background: radial-gradient(circle, rgba(45,212,191,0.10) 0%, transparent 68%);
        top: -160px; right: -120px;
      }
      .ambient-amber {
        width: 520px; height: 520px;
        background: radial-gradient(circle, rgba(245,181,103,0.08) 0%, transparent 68%);
        bottom: -140px; left: -100px;
      }
    `}</style>
  </div>
)

export default AmbientBackground
