import { motion } from 'framer-motion'

const experiences = [
    {
        id: 1,
        role: 'Scrum Master',
        company: 'Bell.ca Morocco',
        period: 'Jun. 2024 – Present',
        project: 'Service Assurance',
        description: [
            'Facilitated sprint reviews, planning sessions, and daily stand-ups to foster team engagement.',
            'Applied Scrum methodology to optimize cycle times and meet target objectives.',
            'Coached teams in Agile practices, delivering training to cultivate a positive Scrum mindset.',
            'Collaborated with product owners and cross-functional teams to drive project progress.',
        ],
        tools: ['Scaled Agile', 'Scrum', 'Jira', 'Confluence', 'Miro']
    },
    {
        id: 2,
        role: 'Scrum Master',
        company: 'NTT DATA Tetouan',
        period: 'Oct. 2023 – Jun. 2024',
        project: 'Bayer CS Regulatory',
        description: [
            'Facilitated sprint reviews and planning meetings to promote full team engagement.',
            'Applied Scrum methodology to shorten cycle time and achieve delivery goals.',
            'Removed impediments and cleared dependencies to ensure smooth workflow.',
            'Monitored and tracked project progress to support timely completion.',
        ],
        tools: ['Scrum', 'Azure DevOps', 'OneNote']
    },
    {
        id: 3,
        role: 'Scrum Master',
        company: 'NTT DATA Morocco',
        period: 'Jan. 2023 – Dec. 2023',
        project: 'BMW Tele-Services',
        description: [
            'Facilitated sprint reviews, planning, and daily meetings.',
            'Applied Scrum methodology to shorten cycle time and achieve target margins.',
            'Worked across teams outside of engineering to find solutions to issues.',
            'Communicated project updates to stakeholders at all levels.',
        ],
        tools: ['Scrum', 'Jira', 'Confluence', 'Miro']
    },
    {
        id: 4,
        role: 'Scrum Master',
        company: 'NTT DATA Tetouan',
        period: 'Jun. 2021 – Jun. 2023',
        project: 'On-Demand Mobility (BMW)',
        description: [
            'Facilitated sprint reviews, planning, and daily meetings.',
            'Coached teams in Agile practices and provided training.',
            'Collaborated with product owners and technologists to define solutions.',
        ],
        tools: ['Scrum', 'Jira', 'Confluence', 'Miro']
    },
    {
        id: 5,
        role: 'DevOps Engineer',
        company: 'NTT DATA Tetouan',
        period: 'Jan. 2021 – Jun. 2021',
        project: 'On-Demand Mobility Carsharing Platform',
        description: [
            'Development and maintenance of ODM Carsharing platform.',
            'Implemented CI/CD pipelines and monitored system performance.',
        ],
        tools: ['Java', 'Docker', 'Kubernetes', 'Kibana', 'GitLab CI/CD', 'AWS']
    },
    {
        id: 6,
        role: 'Software Engineer',
        company: 'Harman Connected Services',
        period: 'Jun. 2019 – Jan. 2021',
        project: 'Health Management Apps',
        description: [
            'Developed new modules for Ideo Mobility Factory.',
            'Performed unit and integration testing and wrote documentation.',
            'Participated in Scrum workshops and maintained features.',
        ],
        tools: ['Spring Boot', 'Swift 5', 'iOS', 'Angular', 'Jenkins']
    },
    {
        id: 7,
        role: 'Software Engineer',
        company: 'Harman Connected Services',
        period: 'Sep. 2017 – Jun. 2019',
        project: 'ERP G.O.L.D V5/V6',
        description: [
            'Member of Scrum team for development, testing, and validation.',
            'Ensured code quality via unit tests and integration tests.',
            'Fixed bugs and anomalies in the product.',
        ],
        tools: ['Java/JEE', 'Oracle 11g', 'JavaScript', 'REST', 'Jira']
    }
]

const Experience = () => {
    return (
        <section id="experience" className="section experience-section">
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title">Experience</h2>
                    <div className="section-line"></div>
                </motion.div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="timeline-content">
                                <div className="date">{exp.period}</div>
                                <h3>{exp.role}</h3>
                                <h4>{exp.company}</h4>
                                <p className="project-name">Project: {exp.project}</p>
                                <ul className="description-list">
                                    {exp.description.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                                <div className="tags">
                                    {exp.tools.slice(0, 4).map((tool, i) => (
                                        <span key={i} className="tag">{tool}</span>
                                    ))}
                                    {exp.tools.length > 4 && <span className="tag">+{exp.tools.length - 4}</span>}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        .experience-section {
          background: var(--bg-primary);
        }

        .timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .timeline::after {
          content: '';
          position: absolute;
          width: 2px;
          background: #333;
          top: 0;
          bottom: 0;
          left: 50%;
          margin-left: -1px;
        }

        .timeline-item {
          padding: 10px 40px;
          position: relative;
          width: 50%;
          box-sizing: border-box;
        }

        .timeline-item.left {
          left: 0;
        }

        .timeline-item.right {
          left: 50%;
        }

        .timeline-item::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          right: -8px;
          background: var(--bg-primary);
          border: 2px solid var(--accent-primary);
          top: 20px;
          border-radius: 50%;
          z-index: 1;
        }

        .timeline-item.right::after {
          left: -8px;
        }

        .timeline-content {
          padding: 25px;
          background: var(--bg-card);
          border-radius: 8px;
          border: 1px solid #222;
          transition: transform 0.3s ease;
        }

        .timeline-content:hover {
          transform: translateY(-5px);
          border-color: var(--accent-secondary);
        }

        .date {
          color: var(--accent-primary);
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .timeline-content h3 {
          font-size: 1.3rem;
          margin-bottom: 5px;
        }

        .timeline-content h4 {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 10px;
        }

        .project-name {
          font-style: italic;
          color: var(--text-secondary);
          margin-bottom: 15px;
          font-size: 0.95rem;
        }

        .description-list {
          list-style-type: disc;
          padding-left: 20px;
          margin-bottom: 15px;
        }

        .description-list li {
          font-size: 0.95rem;
          color: #ccc;
          margin-bottom: 5px;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .tag {
          background: rgba(255, 255, 255, 0.05);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .timeline::after {
            left: 31px;
          }
          
          .timeline-item {
            width: 100%;
            padding-left: 70px;
            padding-right: 25px;
          }
          
          .timeline-item.left, .timeline-item.right {
            left: 0;
          }
          
          .timeline-item::after {
            left: 23px;
          }

          .timeline-item.right::after {
            left: 23px;
          }
        }
      `}</style>
        </section>
    )
}

export default Experience
