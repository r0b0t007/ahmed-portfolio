import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, subject, message } = formData

    const mailtoLink = `mailto:ahmedchioua@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`

    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-line"></div>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new opportunities, Agile transformations, or just connecting with fellow professionals.
            </p>

            <div className="info-item">
              <div className="icon-box">
                <FaPhone />
              </div>
              <div>
                <h4>Phone</h4>
                <p>(+212) 626-410-690</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">
                <FaEnvelope />
              </div>
              <div>
                <h4>Email</h4>
                <p>ahmedchioua@outlook.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">
                <FaLinkedin />
              </div>
              <div>
                <h4>LinkedIn</h4>
                <a href="https://linkedin.com/in/ahmedchioua" target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/ahmedchioua
                </a>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </motion.form>
        </div>
      </div>

      <style>{`
        .contact-section {
          background: var(--bg-secondary);
        }

        .contact-content {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 50px;
        }

        .contact-info h3 {
          font-size: 2rem;
          margin-bottom: 20px;
        }

        .contact-info p {
          color: var(--text-secondary);
          margin-bottom: 40px;
        }

        .info-item {
          display: flex;
          align-items: center;
          margin-bottom: 30px;
        }

        .icon-box {
          width: 50px;
          height: 50px;
          background: rgba(45, 212, 191, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-primary);
          font-size: 1.2rem;
          margin-right: 20px;
        }

        .info-item h4 {
          font-size: 1.1rem;
          margin-bottom: 5px;
        }

        .info-item p, .info-item a {
          color: var(--text-secondary);
          margin: 0;
        }

        .info-item a:hover {
          color: var(--accent-primary);
        }

        .contact-form {
          background: var(--bg-card);
          padding: 40px;
          border-radius: 15px;
          border: 1px solid #222;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group input, .form-group textarea {
          width: 100%;
          padding: 15px;
          background: var(--bg-primary);
          border: 1px solid #333;
          border-radius: 8px;
          color: var(--text-primary);
          font-family: var(--font-main);
          transition: border-color 0.3s ease;
        }

        .form-group input:focus, .form-group textarea:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact
