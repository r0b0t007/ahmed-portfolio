import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'

const infoItems = [
  {
    icon: <FaPhone />,
    label: 'Phone',
    value: '(+212) 626-410-690',
    href: 'tel:+212626410690',
    color: 'var(--accent-primary)',
  },
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'ahmedchioua@gmail.com',
    href: 'mailto:ahmedchioua@gmail.com',
    color: 'var(--accent-secondary)',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/ahmedchioua',
    href: 'https://linkedin.com/in/ahmedchioua',
    color: 'var(--accent-pink)',
  },
  {
    icon: <FaMapMarkerAlt />,
    label: 'Location',
    value: 'Tetouan, Morocco · Remote',
    href: null,
    color: 'var(--accent-green)',
  },
]

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ 'form-name': 'contact', ...formData }).toString(),
      })
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="section-label">Contact</p>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Prefer email? Drop me a message and I'll reply within 24 hours.
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Info column */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="info-intro">
              Always open to discussing Agile transformations, new opportunities,
              or just connecting with fellow professionals.
            </p>

            <div className="info-list">
              {infoItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="info-card"
                  style={{ '--ic': item.color }}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="info-icon">{item.icon}</div>
                  <div>
                    <p className="info-label">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="info-value link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="info-value">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            className="contact-form"
            name="contact"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={handleSubmit}
          >
            {/* Netlify required fields */}
            <input type="hidden" name="form-name" value="contact" />
            <div style={{display:'none'}}>
              <label>Do not fill: <input name="bot-field" /></label>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                placeholder="Tell me more..."
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <motion.button
              type="submit"
              className={`submit-btn ${status}`}
              disabled={status === 'sending'}
              whileHover={{ scale: status === 'idle' ? 1.03 : 1 }}
              whileTap={{ scale: 0.97 }}
            >
              {status === 'sending' && 'Sending…'}
              {status === 'success' && '✓ Message sent!'}
              {status === 'error'   && '✗ Failed — please retry'}
              {status === 'idle'    && <><FaPaperPlane size={13} /> Send Message</>}
            </motion.button>
          </motion.form>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--bg-secondary);
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 60px;
          align-items: start;
        }
        .info-intro {
          font-size: 0.97rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 32px;
        }
        .info-list { display: flex; flex-direction: column; gap: 14px; }
        .info-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-md);
          transition: border-color var(--transition), background var(--transition), transform var(--transition);
          cursor: default;
        }
        .info-card:hover {
          border-color: var(--ic, var(--accent-primary));
          background: var(--bg-card-hover);
        }
        .info-icon {
          width: 42px; height: 42px;
          background: color-mix(in srgb, var(--ic) 12%, transparent);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ic, var(--accent-primary));
          font-size: 1rem;
          flex-shrink: 0;
        }
        .info-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 3px;
        }
        .info-value {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .info-value.link { transition: color var(--transition); }
        .info-value.link:hover { color: var(--ic, var(--accent-primary)); }
        /* Form */
        .contact-form {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-xl);
          padding: 36px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-bottom: 16px;
        }
        .form-group:last-of-type { margin-bottom: 24px; }
        .form-group label {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 13px 16px;
          background: rgba(5,8,22,0.8);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: var(--font-main);
          font-size: 0.92rem;
          transition: border-color var(--transition), box-shadow var(--transition);
          resize: none;
        }
        .form-group input::placeholder,
        .form-group textarea::placeholder { color: var(--text-muted); }
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
          box-shadow: 0 0 0 3px rgba(45,212,191,0.1);
        }
        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
          border: none;
          border-radius: var(--radius-md);
          color: #050816;
          font-size: 0.95rem;
          font-weight: 700;
          box-shadow: 0 0 24px rgba(45,212,191,0.25);
          transition: box-shadow var(--transition);
        }
        .submit-btn:hover { box-shadow: 0 0 36px rgba(45,212,191,0.38); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .submit-btn.success { background: linear-gradient(135deg, #34D399, #059669); box-shadow: 0 0 24px rgba(52,211,153,0.3); }
        .submit-btn.error   { background: linear-gradient(135deg, #F87171, #DC2626); box-shadow: 0 0 24px rgba(248,113,113,0.3); }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; gap: 40px; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}

export default Contact
