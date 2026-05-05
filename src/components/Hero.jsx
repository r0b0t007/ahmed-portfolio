import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Hello, I'm
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Ahmed Chioua
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Scrum Master & Agile Expert
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            Driving Agile success and empowering teams to deliver high-impact results.
          </motion.p>

          <motion.div
            className="hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <a href="#experience" className="btn btn-primary">View Experience</a>
            <a href="#contact" className="btn btn-outline">Contact Me</a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="circle-decoration"></div>
        </motion.div>
      </div>

      <style>{`
        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          background: radial-gradient(circle at 70% 20%, rgba(45, 212, 191, 0.05) 0%, transparent 50%),
                      radial-gradient(circle at 20% 80%, rgba(129, 140, 248, 0.05) 0%, transparent 50%);
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hero-content {
          max-width: 600px;
        }

        .greeting {
          font-size: 1.2rem;
          color: var(--accent-primary);
          font-weight: 600;
          display: block;
          margin-bottom: 10px;
        }

        .hero h1 {
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 15px;
          background: linear-gradient(to right, #fff, #ccc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero h2 {
          font-size: 2rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          font-weight: 400;
        }

        .hero p {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 30px;
          max-width: 500px;
        }

        .hero-btns {
          display: flex;
          gap: 20px;
        }

        .hero-visual {
          position: relative;
        }

        .circle-decoration {
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary));
          opacity: 0.1;
          filter: blur(60px);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }

        @media (max-width: 768px) {
          .hero {
            height: auto;
            padding: 120px 0 80px;
          }
          
          .hero-container {
            flex-direction: column;
            text-align: center;
          }
          
          .hero-content {
            margin-bottom: 50px;
          }
          
          .hero h1 {
            font-size: 3rem;
          }
          
          .hero-btns {
            justify-content: center;
          }
          
          .circle-decoration {
            width: 300px;
            height: 300px;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
