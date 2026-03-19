"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "ecoyaan_addresses";
const SELECTED_KEY = "ecoyaan_selected_address";

const cartItems = [
  { id: 101, name: "Bamboo Toothbrush", subtitle: "Pack of 4", emoji: "🪥", price: 299, quantity: 2 },
  { id: 102, name: "Reusable Cotton Bags", subtitle: "Set of 5", emoji: "👜", price: 450, quantity: 1 },
];

export default function PaymentPage() {
  const router = useRouter();
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [method, setMethod] = useState("upi");

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 50;
  const savings = Math.round((subtotal + shipping) * 0.05);
  const total = subtotal + shipping - savings;

  useEffect(() => {
    try {
      const addresses = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const selectedId = localStorage.getItem(SELECTED_KEY);
      const sel = addresses.find(a => a.id === selectedId) || addresses[0];
      if (sel) {
        setAddress(sel);
      } else {
        const legacy = localStorage.getItem("checkoutAddress");
        if (legacy) setAddress(JSON.parse(legacy));
        else router.replace("/cart");
      }
    } catch { router.replace("/cart"); }
    setLoading(false);
  }, [router]);

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => { setPaying(false); setPaid(true); }, 2000);
  };

  const handleReset = () => {
    localStorage.removeItem("checkoutAddress");
    router.push("/cart");
  };

  if (loading) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f5f9f4",fontFamily:"'DM Sans',sans-serif",color:"#5a9e65",fontSize:"0.9rem",gap:"10px"}}>
      <span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>🌿</span> Loading your order…
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );

  if (paid) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes popIn { 0%{transform:scale(0.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
      <div style={{
        minHeight:"100vh", background:"linear-gradient(160deg,#eef6eb 0%,#f5f9f4 50%,#fdf8f0 100%)",
        display:"flex", alignItems:"center", justifyContent:"center", padding:"24px",
        fontFamily:"'DM Sans',sans-serif"
      }}>
        <div style={{
          background:"#fff", borderRadius:"28px", padding:"40px 28px",
          maxWidth:"400px", width:"100%", textAlign:"center",
          border:"1.5px solid #e2ede0", boxShadow:"0 12px 48px rgba(45,122,58,0.14)",
          animation:"fadeUp 0.5s ease"
        }}>
          <div style={{fontSize:"4rem",animation:"float 2s ease-in-out infinite",marginBottom:"16px"}}>🌱</div>
          <div style={{
            animation:"popIn 0.6s ease", marginBottom:"8px",
            fontFamily:"'DM Serif Display',serif", fontSize:"1.8rem", color:"#1a3d1f"
          }}>Order Placed!</div>
          <p style={{color:"#6b8f72",fontSize:"0.9rem",lineHeight:"1.6",marginBottom:"24px"}}>
            Thank you for shopping eco-friendly!<br />
            Your order will arrive in 3–5 days 🚚
          </p>
          <div style={{
            background:"#eef6eb",borderRadius:"16px",padding:"14px",
            marginBottom:"24px",border:"1px solid #d4e6d0"
          }}>
            <div style={{fontSize:"0.72rem",fontWeight:"700",color:"#5a9e65",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"6px"}}>Order Total</div>
            <div style={{fontSize:"1.6rem",fontWeight:"700",color:"#2d7a3a",fontFamily:"'DM Serif Display',serif"}}>₹{total}</div>
          </div>
          <button onClick={handleReset} style={{
            width:"100%", padding:"14px",
            background:"linear-gradient(135deg,#2d7a3a 0%,#3d9e4d 100%)",
            color:"#fff", border:"none", borderRadius:"14px",
            fontSize:"0.9rem", fontWeight:"700", cursor:"pointer",
            fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s"
          }}>
            🛒 Continue Shopping
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f5f9f4; }

        .pay-wrap {
          min-height: 100vh;
          background: linear-gradient(160deg, #eef6eb 0%, #f5f9f4 50%, #fdf8f0 100%);
          padding-bottom: 100px; font-family: 'DM Sans', sans-serif;
        }
        .topbar {
          background: #fff; border-bottom: 1px solid #e2ede0;
          padding: 14px 20px; display: flex; align-items: center; gap: 10px;
          position: sticky; top: 0; z-index: 40; box-shadow: 0 2px 8px rgba(45,122,58,0.06);
        }
        .topbar-logo { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #2d7a3a; }

        .steps-bar { background: #fff; padding: 14px 20px 16px; border-bottom: 1px solid #e2ede0; }
        .steps { display: flex; align-items: flex-start; max-width: 480px; margin: 0 auto; }
        .step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
        .step:not(:last-child)::after {
          content: ''; position: absolute; top: 13px;
          left: calc(50% + 13px); width: calc(100% - 26px); height: 2px; background: #d4e6d0;
        }
        .step.done:not(:last-child)::after,
        .step.active:not(:last-child)::after { background: #2d7a3a; }
        .step-circle {
          width: 26px; height: 26px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; border: 2px solid #d4e6d0;
          background: #fff; color: #9ab89a; z-index: 1; transition: all 0.3s;
        }
        .step.active .step-circle { border-color: #2d7a3a; background: #2d7a3a; color: #fff; box-shadow: 0 0 0 4px rgba(45,122,58,0.15); }
        .step.done .step-circle { border-color: #2d7a3a; background: #eef6eb; color: #2d7a3a; }
        .step-label { font-size: 10px; color: #9ab89a; margin-top: 5px; font-weight: 500; }
        .step.active .step-label { color: #2d7a3a; font-weight: 700; }
        .step.done .step-label { color: #5a9e65; }

        .content { max-width: 520px; margin: 0 auto; padding: 24px 16px; }
        .page-title { font-family: 'DM Serif Display', serif; font-size: 1.55rem; color: #1a3d1f; margin-bottom: 4px; }
        .page-sub { font-size: 0.82rem; color: #9ab89a; margin-bottom: 22px; }

        /* Section card */
        .sec-card {
          background: #fff; border-radius: 18px; border: 1.5px solid #e2ede0;
          padding: 18px; margin-bottom: 14px; box-shadow: 0 2px 12px rgba(45,122,58,0.05);
        }
        .sec-header {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid #eef6eb;
        }
        .sec-title { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #4a7a52; display: flex; align-items: center; gap: 6px; }
        .btn-change {
          font-size: 0.72rem; color: #2d7a3a; background: #eef6eb; border: none;
          border-radius: 8px; padding: 4px 10px; cursor: pointer; font-weight: 700;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .btn-change:hover { background: #d4ecd6; }

        /* Address display */
        .addr-name { font-weight: 700; color: #1a3d1f; font-size: 0.92rem; margin-bottom: 3px; }
        .addr-line { font-size: 0.8rem; color: #6b8f72; line-height: 1.55; }

        /* Cart items summary */
        .mini-item {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 0; border-bottom: 1px solid #eef6eb;
        }
        .mini-item:last-child { border-bottom: none; }
        .mini-emoji {
          width: 36px; height: 36px; background: #eef6eb; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
          flex-shrink: 0;
        }
        .mini-name { font-size: 0.82rem; font-weight: 600; color: #1a3d1f; flex: 1; }
        .mini-sub { font-size: 0.7rem; color: #9ab89a; }
        .mini-price { font-size: 0.85rem; font-weight: 700; color: #2d7a3a; }

        /* Payment methods */
        .pay-methods { display: flex; flex-direction: column; gap: 10px; }
        .pay-method {
          display: flex; align-items: center; gap: 12px; padding: 14px;
          border: 2px solid #e2ede0; border-radius: 14px; cursor: pointer;
          transition: all 0.2s; background: #fff;
        }
        .pay-method:hover { border-color: #5a9e65; }
        .pay-method.selected { border-color: #2d7a3a; background: linear-gradient(135deg, #f0faf0 0%, #fff 100%); }
        .pay-radio {
          width: 18px; height: 18px; border-radius: 50%; border: 2px solid #d4e6d0;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s;
        }
        .pay-method.selected .pay-radio { border-color: #2d7a3a; background: #2d7a3a; }
        .pay-radio-dot { width: 6px; height: 6px; border-radius: 50%; background: #fff; opacity: 0; transition: opacity 0.2s; }
        .pay-method.selected .pay-radio-dot { opacity: 1; }
        .pay-icon { font-size: 1.3rem; }
        .pay-label { font-size: 0.88rem; font-weight: 600; color: #1a3d1f; }
        .pay-sub { font-size: 0.7rem; color: #9ab89a; margin-top: 1px; }

        /* Summary */
        .sum-row {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.85rem; color: #5a7a60; padding: 6px 0;
        }
        .sum-row.total {
          font-weight: 700; font-size: 1.05rem; color: #1a3d1f;
          border-top: 2px dashed #e2ede0; margin-top: 4px; padding-top: 12px;
        }
        .sum-green { color: #2d7a3a; font-weight: 600; }

        /* Sticky */
        .sticky-bottom {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: #fff; border-top: 1px solid #e2ede0;
          padding: 12px 16px; padding-bottom: calc(12px + env(safe-area-inset-bottom));
          z-index: 50; box-shadow: 0 -4px 24px rgba(45,122,58,0.1);
        }
        .sticky-inner { max-width: 520px; margin: 0 auto; display: flex; gap: 10px; align-items: center; }
        .btn-back {
          padding: 13px 18px; background: #f5f9f4; color: #5a7a60;
          border: 1.5px solid #d4e6d0; border-radius: 14px; font-size: 0.875rem;
          font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;
          white-space: nowrap; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-back:hover { background: #eef6eb; border-color: #5a9e65; }
        .btn-pay {
          flex: 1; padding: 13px;
          background: linear-gradient(135deg, #2d7a3a 0%, #3d9e4d 100%);
          color: #fff; border: none; border-radius: 14px; font-size: 0.9rem;
          font-weight: 700; cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-pay:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(45,122,58,0.32); }
        .btn-pay:disabled { opacity: 0.75; cursor: not-allowed; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { display: inline-block; animation: spin 1s linear infinite; }
      `}</style>

      <div className="pay-wrap">
        {/* Topbar */}
        <div className="topbar">
          <span style={{fontSize:"1.1rem"}}>🌿</span>
          <span className="topbar-logo">Ecoyaan</span>
        </div>

        {/* Steps */}
        <div className="steps-bar">
          <div className="steps">
            {[["Cart",0],["Address",1],["Payment",2],["Done",3]].map(([label,i]) => (
              <div key={label} className={`step ${i < 2 ? "done" : i === 2 ? "active" : ""}`}>
                <div className="step-circle">{i < 2 ? "✓" : i + 1}</div>
                <div className="step-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="content">
          <h1 className="page-title">Confirm & Pay</h1>
          <p className="page-sub">Review your order before placing it</p>

          {/* Delivery address */}
          {address && (
            <div className="sec-card">
              <div className="sec-header">
                <div className="sec-title">📍 Delivering To</div>
                <button className="btn-change" onClick={() => router.push("/address")}>Change</button>
              </div>
              <div className="addr-name">{address.name}</div>
              <div className="addr-line">
                {address.addressLine && <>{address.addressLine}<br /></>}
                {address.city}, {address.state} — {address.pin}<br />
                📞 {address.phone}
              </div>
            </div>
          )}

          {/* Order items */}
          <div className="sec-card">
            <div className="sec-header">
              <div className="sec-title">🛒 Order Items</div>
            </div>
            {cartItems.map(item => (
              <div key={item.id} className="mini-item">
                <div className="mini-emoji">{item.emoji}</div>
                <div style={{flex:1}}>
                  <div className="mini-name">{item.name}</div>
                  <div className="mini-sub">{item.subtitle} · ×{item.quantity}</div>
                </div>
                <div className="mini-price">₹{item.price * item.quantity}</div>
              </div>
            ))}
            <div style={{marginTop:"12px",paddingTop:"12px",borderTop:"1px solid #eef6eb"}}>
              <div className="sum-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="sum-row"><span>Shipping</span><span>₹{shipping}</span></div>
              <div className="sum-row"><span>Eco Savings</span><span className="sum-green">−₹{savings}</span></div>
              <div className="sum-row total"><span>Total</span><span>₹{total}</span></div>
            </div>
          </div>

          {/* Payment method */}
          <div className="sec-card">
            <div className="sec-header" style={{marginBottom:"14px"}}>
              <div className="sec-title">💳 Payment Method</div>
            </div>
            <div className="pay-methods">
              {[
                { id:"upi", icon:"📱", label:"UPI", sub:"GPay, PhonePe, Paytm" },
                { id:"card", icon:"💳", label:"Credit / Debit Card", sub:"Visa, Mastercard, RuPay" },
                { id:"cod", icon:"💵", label:"Cash on Delivery", sub:"Pay when you receive" },
              ].map(m => (
                <div
                  key={m.id}
                  className={`pay-method ${method === m.id ? "selected" : ""}`}
                  onClick={() => setMethod(m.id)}
                >
                  <div className="pay-radio"><div className="pay-radio-dot" /></div>
                  <span className="pay-icon">{m.icon}</span>
                  <div>
                    <div className="pay-label">{m.label}</div>
                    <div className="pay-sub">{m.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky bottom */}
        <div className="sticky-bottom">
          <div className="sticky-inner">
            <button className="btn-back" onClick={() => router.push("/address")}>← Back</button>
            <button className="btn-pay" onClick={handlePay} disabled={paying}>
              {paying
                ? <><span className="spin">🌿</span> Processing…</>
                : <>🔒 Pay ₹{total}</>
              }
            </button>
          </div>
        </div>
      </div>
    </>
  );
}