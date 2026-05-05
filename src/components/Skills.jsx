import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'Agile Methodologies',
    skills: ['Scrum', 'SAFe', 'Kanban', 'Scaled Agile', 'Servant Leadership', 'Continuous Improvement']
  },
  {
    title: 'Tools & Management',
    skills: ['Jira', 'Confluence', 'Azure DevOps', 'Miro', 'Trello', 'Asana', 'GitLab', 'Project Management']
  },
  {
    title: 'Programming & Web',
    skills: ['Java (SE, EE)', 'Spring Framework', 'Node.js', 'TypeScript', 'Swift', 'Angular', 'REST APIs']
  },
  {
    title: 'DevOps & Cloud',
    skills: ['Docker', 'Kubernetes', 'AWS (SQS, RDS)', 'CI/CD', 'Prometheus', 'Grafana', 'Kibana']
  },
  {
    title: 'Databases',
    skills: ['Oracle', 'SQL', 'PL/SQL', 'CouchDB', 'Amazon RDS']
  }
]

const Skills = () => {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{category.title}</h3>
              <div className="skill-tags">
                {category.skills.map((skill, i) => (
                  <span key={i} className="skill-tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          background: var(--bg-secondary);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .skill-card {
          background: var(--bg-card);
          padding: 30px;
          border-radius: 15px;
          border: 1px solid #222;
          transition: all 0.3s ease;
        }

        .skill-card:hover {
          border-color: var(--accent-secondary);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .skill-card h3 {
          font-size: 1.3rem;
          margin-bottom: 20px;
          color: var(--accent-secondary);
          border-bottom: 1px solid #333;
          padding-bottom: 10px;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-tag {
          background: rgba(129, 140, 248, 0.1);
          color: var(--text-primary);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.9rem;
          transition: background 0.3s ease;
        }

        .skill-card:hover .skill-tag {
          background: rgba(129, 140, 248, 0.2);
        }
      `}</style>
    </section>
  )
}

export default Skills
