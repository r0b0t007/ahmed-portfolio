import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-content">
                    <h3>Ahmed Chioua</h3>
                    <p>Scrum Master & Agile Enthusiast</p>
                    <div className="social-links">
                        <a href="https://linkedin.com/in/ahmedchioua" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                        <a href="mailto:ahmedchioua@outlook.com">
                            <FaEnvelope />
                        </a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Ahmed Chioua. All rights reserved.</p>
                </div>
            </div>

            <style>{`
        .footer {
          background: var(--bg-secondary);
          padding: 50px 0 20px;
          margin-top: 50px;
          border-top: 1px solid #222;
        }

        .footer-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .footer-content h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .footer-content p {
          color: var(--text-secondary);
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 30px;
        }

        .social-links a {
          font-size: 1.5rem;
          color: var(--text-primary);
          transition: color 0.3s ease;
        }

        .social-links a:hover {
          color: var(--accent-primary);
        }

        .footer-bottom {
          border-top: 1px solid #222;
          width: 100%;
          padding-top: 20px;
        }

        .footer-bottom p {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
      `}</style>
        </footer>
    )
}

export default Footer
