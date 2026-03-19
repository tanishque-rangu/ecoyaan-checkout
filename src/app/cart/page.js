"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const cartItems = [
  {
    id: 101,
    name: "Bamboo Toothbrush",
    subtitle: "Pack of 4 · BPA-Free",
    price: 299,
    quantity: 2,
    emoji: "🪥",
    tag: "Best Seller",
  },
  {
    id: 102,
    name: "Reusable Cotton Bags",
    subtitle: "Produce Bags · Set of 5",
    price: 450,
    quantity: 1,
    emoji: "👜",
    tag: "Eco Pick",
  },
];

export default function CartPage() {
  const router = useRouter();
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 50;
  const total = subtotal + shipping;
  const savings = Math.round(total * 0.05);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f5f9f4; }

        .cart-wrap {
          min-height: 100vh;
          background: linear-gradient(160deg, #eef6eb 0%, #f5f9f4 50%, #fdf8f0 100%);
          padding-bottom: 100px;
          font-family: 'DM Sans', sans-serif;
        }

        /* Topbar */
        .topbar {
          background: #fff;
          border-bottom: 1px solid #e2ede0;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 2px 8px rgba(45,122,58,0.06);
        }
        .topbar-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          color: #2d7a3a;
          letter-spacing: -0.5px;
        }
        .topbar-right {
          margin-left: auto;
          font-size: 0.72rem;
          color: #9ab89a;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        /* Steps */
        .steps-bar {
          background: #fff;
          padding: 14px 20px 16px;
          border-bottom: 1px solid #e2ede0;
        }
        .steps {
          display: flex;
          align-items: flex-start;
          max-width: 480px;
          margin: 0 auto;
        }
        .step {
          display: flex; flex-direction: column; align-items: center;
          flex: 1; position: relative;
        }
        .step:not(:last-child)::after {
          content: '';
          position: absolute; top: 13px;
          left: calc(50% + 13px);
          width: calc(100% - 26px);
          height: 2px; background: #d4e6d0;
        }
        .step.active:not(:last-child)::after { background: #2d7a3a; }
        .step-circle {
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700;
          border: 2px solid #d4e6d0; background: #fff;
          color: #9ab89a; z-index: 1; transition: all 0.3s;
        }
        .step.active .step-circle {
          border-color: #2d7a3a; background: #2d7a3a; color: #fff;
          box-shadow: 0 0 0 4px rgba(45,122,58,0.15);
        }
        .step-label { font-size: 10px; color: #9ab89a; margin-top: 5px; font-weight: 500; }
        .step.active .step-label { color: #2d7a3a; font-weight: 700; }

        /* Content */
        .content {
          max-width: 520px;
          margin: 0 auto;
          padding: 24px 16px;
        }
        .page-title {
          font-family: 'DM Serif Display', serif;
          font-size: 1.55rem;
          color: #1a3d1f;
          margin-bottom: 4px;
        }
        .page-sub {
          font-size: 0.82rem;
          color: #9ab89a;
          margin-bottom: 22px;
        }

        /* Cart items */
        .cart-item {
          background: #fff;
          border-radius: 18px;
          border: 1.5px solid #e2ede0;
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          gap: 14px;
          align-items: center;
          transition: all 0.2s;
        }
        .cart-item:hover {
          box-shadow: 0 4px 20px rgba(45,122,58,0.1);
          border-color: #a8d0ac;
        }
        .item-emoji {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #eef6eb 0%, #f5f9f4 100%);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
          flex-shrink: 0;
          border: 1px solid #d4e6d0;
        }
        .item-info { flex: 1; min-width: 0; }
        .item-tag {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          background: #eef6eb;
          color: #2d7a3a;
          padding: 2px 8px;
          border-radius: 50px;
          margin-bottom: 4px;
          border: 1px solid #d4e6d0;
        }
        .item-name {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1a3d1f;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item-sub {
          font-size: 0.72rem;
          color: #9ab89a;
          margin-top: 2px;
        }
        .item-right {
          text-align: right;
          flex-shrink: 0;
        }
        .item-total {
          font-size: 0.98rem;
          font-weight: 700;
          color: #1a3d1f;
        }
        .item-unit {
          font-size: 0.72rem;
          color: #9ab89a;
          margin-top: 2px;
        }
        .item-qty {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #eef6eb;
          border-radius: 50px;
          padding: 3px 10px;
          margin-top: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2d7a3a;
          border: 1px solid #d4e6d0;
        }

        /* Summary */
        .summary-card {
          background: #fff;
          border-radius: 20px;
          border: 1.5px solid #e2ede0;
          padding: 20px;
          margin-top: 8px;
          box-shadow: 0 4px 20px rgba(45,122,58,0.06);
        }
        .summary-title {
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #9ab89a;
          margin-bottom: 14px;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.88rem;
          color: #5a7a60;
          margin-bottom: 10px;
        }
        .summary-row.total {
          font-weight: 700;
          font-size: 1.05rem;
          color: #1a3d1f;
          padding-top: 12px;
          margin-top: 4px;
          border-top: 2px dashed #e2ede0;
          margin-bottom: 0;
        }
        .summary-row .green { color: #2d7a3a; font-weight: 600; }
        .savings-note {
          background: #eef6eb;
          border: 1px solid #d4e6d0;
          border-radius: 10px;
          padding: 10px 14px;
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: #2d7a3a;
          font-weight: 600;
        }

        /* Sticky bottom */
        .sticky-bottom {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          background: #fff;
          border-top: 1px solid #e2ede0;
          padding: 12px 16px;
          padding-bottom: calc(12px + env(safe-area-inset-bottom));
          z-index: 50;
          box-shadow: 0 -4px 24px rgba(45,122,58,0.1);
        }
        .sticky-inner {
          max-width: 520px;
          margin: 0 auto;
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .btn-back {
          padding: 13px 18px;
          background: #f5f9f4;
          color: #5a7a60;
          border: 1.5px solid #d4e6d0;
          border-radius: 14px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: flex; align-items: center; gap: 6px;
          white-space: nowrap;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
        }
        .btn-back:hover { background: #eef6eb; border-color: #5a9e65; }
        .btn-next {
          flex: 1;
          padding: 13px;
          background: linear-gradient(135deg, #2d7a3a 0%, #3d9e4d 100%);
          color: #fff;
          border: none;
          border-radius: 14px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
        }
        .btn-next:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(45,122,58,0.32);
        }
      `}</style>

      <div className="cart-wrap">
        {/* Topbar */}
        <div className="topbar">
          <span style={{fontSize:'1.2rem'}}>🌿</span>
          <span className="topbar-logo">Ecoyaan</span>
          <span className="topbar-right">{cartItems.length} items</span>
        </div>

        {/* Steps */}
        <div className="steps-bar">
          <div className="steps">
            {["Cart","Address","Payment","Done"].map((label, i) => (
              <div key={label} className={`step ${i === 0 ? "active" : ""}`}>
                <div className="step-circle">{i + 1}</div>
                <div className="step-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="content">
          <h1 className="page-title">Your Cart</h1>
          <p className="page-sub">{cartItems.length} eco-friendly items ready to ship</p>

          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-emoji">{item.emoji}</div>
              <div className="item-info">
                <div className="item-tag">{item.tag}</div>
                <div className="item-name">{item.name}</div>
                <div className="item-sub">{item.subtitle}</div>
                <div className="item-qty">× {item.quantity}</div>
              </div>
              <div className="item-right">
                <div className="item-total">₹{item.price * item.quantity}</div>
                <div className="item-unit">₹{item.price} each</div>
              </div>
            </div>
          ))}

          <div className="summary-card">
            <div className="summary-title">Order Summary</div>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="summary-row">
              <span>Eco Discount</span>
              <span className="green">−₹{savings}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total - savings}</span>
            </div>
            <div className="savings-note">
              🌱 You're saving ₹{savings} for choosing eco-friendly!
            </div>
          </div>
        </div>

        {/* Sticky bottom */}
        <div className="sticky-bottom">
          <div className="sticky-inner">
            <a href="/" className="btn-back">← Shop</a>
            <Link href="/address" className="btn-next">
              Checkout · ₹{total - savings} →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}