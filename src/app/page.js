import Link from "next/link";

export default function Home() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .home-wrap {
          min-height: 100vh;
          background: linear-gradient(160deg, #eef6eb 0%, #f5f9f4 40%, #fdf8f0 100%);
          display: flex;
          flex-direction: column;
          font-family: 'DM Sans', sans-serif;
        }

        /* Nav */
        .home-nav {
          padding: 18px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e2ede0;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .home-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.6rem;
          color: #2d7a3a;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .home-nav-links {
          display: flex;
          gap: 24px;
          list-style: none;
        }
        .home-nav-links a {
          font-size: 0.82rem;
          color: #5a9e65;
          text-decoration: none;
          font-weight: 600;
          letter-spacing: 0.3px;
          transition: color 0.2s;
        }
        .home-nav-links a:hover { color: #2d7a3a; }

        /* Hero */
        .home-hero {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 24px 80px;
          text-align: center;
        }
        .hero-inner {
          max-width: 560px;
        }
        .hero-leaf-row {
          display: flex;
          justify-content: center;
          gap: 6px;
          margin-bottom: 20px;
          font-size: 1.3rem;
          animation: floatLeaves 3s ease-in-out infinite;
        }
        @keyframes floatLeaves {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .hero-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #5a9e65;
          background: #eef6eb;
          display: inline-block;
          padding: 5px 14px;
          border-radius: 50px;
          margin-bottom: 18px;
          border: 1px solid #d4e6d0;
        }
        .hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 6vw, 3.2rem);
          color: #1a3d1f;
          line-height: 1.15;
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }
        .hero-title em {
          font-style: italic;
          color: #2d7a3a;
        }
        .hero-desc {
          font-size: 0.95rem;
          color: #6b8f72;
          line-height: 1.7;
          margin-bottom: 36px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta-wrap {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .hero-btn-primary {
          padding: 15px 32px;
          background: linear-gradient(135deg, #2d7a3a 0%, #3d9e4d 100%);
          color: #fff;
          border: none;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          box-shadow: 0 6px 24px rgba(45,122,58,0.28);
          letter-spacing: 0.2px;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(45,122,58,0.36);
        }
        .hero-btn-secondary {
          padding: 15px 28px;
          background: rgba(255,255,255,0.9);
          color: #2d7a3a;
          border: 1.5px solid #a8d0ac;
          border-radius: 50px;
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .hero-btn-secondary:hover { background: #eef6eb; border-color: #2d7a3a; }

        /* Features row */
        .home-features {
          padding: 0 24px 60px;
        }
        .features-inner {
          max-width: 560px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .feature-chip {
          background: rgba(255,255,255,0.85);
          border: 1px solid #e2ede0;
          border-radius: 16px;
          padding: 16px 12px;
          text-align: center;
          transition: all 0.2s;
        }
        .feature-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(45,122,58,0.1);
          border-color: #a8d0ac;
        }
        .feature-icon { font-size: 1.6rem; margin-bottom: 6px; }
        .feature-text {
          font-size: 0.72rem;
          font-weight: 600;
          color: #4a7a52;
          line-height: 1.4;
          letter-spacing: 0.2px;
        }

        /* Footer note */
        .home-footer {
          text-align: center;
          padding: 20px;
          font-size: 0.75rem;
          color: #9ab89a;
          border-top: 1px solid #e2ede0;
          background: rgba(255,255,255,0.5);
        }

        @media (max-width: 420px) {
          .home-nav-links { display: none; }
          .features-inner { grid-template-columns: repeat(3, 1fr); gap: 8px; }
          .feature-chip { padding: 12px 8px; }
          .feature-icon { font-size: 1.3rem; }
          .feature-text { font-size: 0.65rem; }
        }
      `}</style>

      <div className="home-wrap">
        <nav className="home-nav">
          <div className="home-logo">🌿 Ecoyaan</div>
          <ul className="home-nav-links">
            <li><a href="#">Shop</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </nav>

        <section className="home-hero">
          <div className="hero-inner">
            <div className="hero-leaf-row">🌿 🍃 🌱</div>
            <div className="hero-eyebrow">Eco-Friendly Checkout</div>
            <h1 className="hero-title">
              Shop with purpose,<br /><em>live sustainably</em>
            </h1>
            <p className="hero-desc">
              Every purchase you make helps reduce plastic waste and supports a greener planet. Your eco journey starts here.
            </p>
            <div className="hero-cta-wrap">
              <Link href="/cart">
                <span className="hero-btn-primary">
                  🛒 View My Cart
                </span>
              </Link>
              <a href="#" className="hero-btn-secondary">
                Learn More →
              </a>
            </div>
          </div>
        </section>

        <section className="home-features">
          <div className="features-inner">
            <div className="feature-chip">
              <div className="feature-icon">♻️</div>
              <div className="feature-text">Plastic-Free Products</div>
            </div>
            <div className="feature-chip">
              <div className="feature-icon">🌱</div>
              <div className="feature-text">100% Organic</div>
            </div>
            <div className="feature-chip">
              <div className="feature-icon">🚚</div>
              <div className="feature-text">Carbon-Neutral Delivery</div>
            </div>
          </div>
        </section>

        <footer className="home-footer">
          © 2024 Ecoyaan · Making sustainability accessible for every Indian home 🇮🇳
        </footer>
      </div>
    </>
  );
}