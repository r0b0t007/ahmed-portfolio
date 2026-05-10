import { motion } from 'framer-motion'
import { useFadeIn } from '../hooks/useFadeIn'

const categories = [
  {
    title: 'Agile & Scrum',
    color: 'var(--accent-primary)',
    icon: '⚡',
    skills: ['Scrum', 'Kanban', 'SAFe (Scaled Agile)', 'PI Planning', 'Backlog Refinement', 'Story Sizing', 'Velocity Tracking', 'Sprint Metrics', 'Release Planning', 'Definition of Done/Ready', 'Continuous Improvement'],
  },
  {
    title: 'Facilitation',
    color: 'var(--accent-secondary)',
    icon: '🎯',
    skills: ['Remote Team Facilitation', 'Retrospective Design', 'Conflict Resolution', 'Stakeholder Communication', 'Servant Leadership', 'Coaching & Mentoring'],
  },
  {
    title: 'Agile Tooling',
    color: 'var(--accent-pink)',
    icon: '🛠',
    skills: ['Jira', 'Confluence', 'Azure DevOps Boards', 'Miro', 'Trello', 'Asana'],
  },
  {
    title: 'Engineering Foundation',
    color: '#FB923C',
    icon: '💻',
    skills: ['Java/JEE', 'Spring', 'Node.js', 'TypeScript', 'Angular', 'REST APIs', 'SQL', 'Docker', 'Kubernetes', 'GitLab CI/CD', 'AWS'],
  },
]

const SkillCategoryCard = ({ cat }) => {
  const cardRef = useFadeIn(0.1)
  const barRef  = useFadeIn(0.1)

  return (
    <motion.div
      ref={cardRef}
      className="fade-in skill-card"
      style={{ '--cc': cat.color }}
      whileHover={{ borderColor: cat.color + '55', y: -4 }}
    >
      <div className="skill-card-head">
        <span className="cat-icon">{cat.icon}</span>
        <h3 className="cat-title" style={{ color: cat.color }}>{cat.title}</h3>
      </div>
      <div className="skill-bar" style={{ background: cat.color + '22' }}>
        <div ref={barRef} className="skill-bar-fill fade-fill" style={{ background: cat.color }} />
      </div>
      <div className="skill-tags">
        {cat.skills.map(s => (
          <motion.span
            key={s}
            className="skill-tag"
            whileHover={{ scale: 1.06, borderColor: cat.color, color: cat.color }}
          >
            {s}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const headerRef = useFadeIn()

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <div ref={headerRef} className="fade-in section-header">
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills &amp; Tools</h2>
          <p className="section-subtitle">
            A full-stack Agile toolkit — from ceremonies and frameworks to DevOps pipelines and cloud infrastructure.
          </p>
        </div>

        <div className="skills-grid">
          {categories.map(cat => <SkillCategoryCard key={cat.title} cat={cat} />)}
        </div>
      </div>

      <style>{`
        .skills-section {
          background: linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%);
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .skill-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 28px;
          transition: border-color var(--transition), transform var(--transition), background var(--transition);
        }
        .skill-card:hover { background: var(--bg-card-hover); }
        .skill-card-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .cat-icon { font-size: 1.3rem; line-height: 1; }
        .cat-title { font-size: 1rem; font-weight: 700; letter-spacing: -0.2px; }
        .skill-bar {
          height: 3px;
          border-radius: 2px;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%;
          border-radius: 2px;
          opacity: 0.8;
        }
        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .skill-tag {
          display: inline-block;
          padding: 5px 13px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          cursor: default;
          transition: border-color var(--transition), color var(--transition), background var(--transition), transform var(--transition);
        }
        .skill-tag:hover { background: rgba(255,255,255,0.07); }
        @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .skills-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  )
}

export default Skills
