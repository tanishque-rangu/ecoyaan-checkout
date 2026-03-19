"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "ecoyaan_addresses";
const SELECTED_KEY = "ecoyaan_selected_address";

const emptyForm = {
  name: "", email: "", phone: "",
  addressLine: "", pin: "", city: "", state: "",
};

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Delhi","Jammu & Kashmir",
  "Ladakh","Lakshadweep","Puducherry",
];

export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const sel = localStorage.getItem(SELECTED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setAddresses(parsed);
        if (!parsed.length) setShowForm(true);
      } else {
        setShowForm(true);
      }
      if (sel) setSelectedId(sel);
    } catch { setShowForm(true); }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    if (selectedId) localStorage.setItem(SELECTED_KEY, selectedId);
  }, [selectedId]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone)) e.phone = "10-digit phone required";
    if (!form.addressLine.trim()) e.addressLine = "Address is required";
    if (!form.pin.trim() || !/^\d{6}$/.test(form.pin)) e.pin = "6-digit PIN required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSave = () => {
    if (!validate()) return;
    if (editingId) {
      setAddresses(prev => prev.map(a => a.id === editingId ? { ...form, id: editingId } : a));
      setSelectedId(editingId);
      showToast("✓ Address updated");
    } else {
      const id = Date.now().toString();
      setAddresses(prev => [...prev, { ...form, id }]);
      setSelectedId(id);
      showToast("✓ Address saved");
    }
    setForm(emptyForm); setEditingId(null); setShowForm(false); setErrors({});
  };

  const handleEdit = (addr) => {
    setForm(addr); setEditingId(addr.id); setShowForm(true); setErrors({});
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  const handleDelete = (id) => {
    const updated = addresses.filter(a => a.id !== id);
    setAddresses(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    if (selectedId === id) {
      const next = updated[0]?.id || null;
      setSelectedId(next);
      if (next) localStorage.setItem(SELECTED_KEY, next);
    }
    if (!updated.length) setShowForm(true);
    showToast("Address removed");
  };

  const handleCancel = () => {
    setForm(emptyForm); setEditingId(null); setErrors({});
    if (addresses.length) setShowForm(false);
  };

  const handleNext = () => {
    if (!selectedId) { showToast("⚠ Please select a delivery address"); return; }
    const sel = addresses.find(a => a.id === selectedId);
    if (sel) localStorage.setItem("checkoutAddress", JSON.stringify(sel));
    router.push("/payment");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f5f9f4; }

        .addr-wrap {
          min-height: 100vh;
          background: linear-gradient(160deg, #eef6eb 0%, #f5f9f4 50%, #fdf8f0 100%);
          padding-bottom: 100px;
          font-family: 'DM Sans', sans-serif;
        }

        /* Topbar */
        .topbar {
          background: #fff; border-bottom: 1px solid #e2ede0;
          padding: 14px 20px; display: flex; align-items: center; gap: 10px;
          position: sticky; top: 0; z-index: 40;
          box-shadow: 0 2px 8px rgba(45,122,58,0.06);
        }
        .topbar-logo { font-family: 'DM Serif Display', serif; font-size: 1.4rem; color: #2d7a3a; }

        /* Steps */
        .steps-bar { background: #fff; padding: 14px 20px 16px; border-bottom: 1px solid #e2ede0; }
        .steps { display: flex; align-items: flex-start; max-width: 480px; margin: 0 auto; }
        .step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; }
        .step:not(:last-child)::after {
          content: ''; position: absolute; top: 13px;
          left: calc(50% + 13px); width: calc(100% - 26px);
          height: 2px; background: #d4e6d0; transition: background 0.3s;
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

        /* Content */
        .content { max-width: 520px; margin: 0 auto; padding: 24px 16px; }
        .page-title { font-family: 'DM Serif Display', serif; font-size: 1.55rem; color: #1a3d1f; margin-bottom: 4px; }
        .page-sub { font-size: 0.82rem; color: #9ab89a; margin-bottom: 22px; }

        /* Address cards */
        .addr-card {
          background: #fff; border: 2px solid #e2ede0; border-radius: 18px;
          padding: 16px; margin-bottom: 12px; cursor: pointer; transition: all 0.2s; position: relative;
        }
        .addr-card:hover { border-color: #5a9e65; box-shadow: 0 4px 20px rgba(45,122,58,0.1); }
        .addr-card.selected {
          border-color: #2d7a3a;
          background: linear-gradient(135deg, #f0faf0 0%, #fff 100%);
          box-shadow: 0 4px 20px rgba(45,122,58,0.14);
        }
        .card-top { display: flex; gap: 12px; align-items: flex-start; }
        .radio {
          width: 20px; height: 20px; border-radius: 50%; border: 2px solid #d4e6d0;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px; transition: all 0.2s;
        }
        .addr-card.selected .radio { border-color: #2d7a3a; background: #2d7a3a; }
        .radio-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; opacity: 0; transition: opacity 0.2s; }
        .addr-card.selected .radio-dot { opacity: 1; }
        .card-body { flex: 1; }
        .card-header { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
        .card-name { font-weight: 700; font-size: 0.92rem; color: #1a3d1f; }
        .sel-badge {
          display: inline-flex; align-items: center; gap: 3px;
          background: #eef6eb; color: #2d7a3a; font-size: 0.65rem;
          font-weight: 700; padding: 2px 8px; border-radius: 50px;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .card-detail { font-size: 0.78rem; color: #6b8f72; line-height: 1.55; }
        .card-actions {
          display: flex; gap: 8px; margin-top: 10px;
          padding-top: 10px; border-top: 1px solid #eef6eb;
        }
        .btn-edit {
          font-size: 0.73rem; color: #2d7a3a; background: #eef6eb;
          border: none; border-radius: 8px; padding: 5px 12px;
          cursor: pointer; font-weight: 700; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-edit:hover { background: #d4ecd6; }
        .btn-del {
          font-size: 0.73rem; color: #e05252; background: #fdf0f0;
          border: none; border-radius: 8px; padding: 5px 12px;
          cursor: pointer; font-weight: 700; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-del:hover { background: #fad9d9; }

        /* Add button */
        .btn-add {
          width: 100%; padding: 14px; border: 2px dashed #a8d0ac;
          border-radius: 16px; background: transparent; color: #2d7a3a;
          font-size: 0.875rem; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: all 0.2s; margin-top: 4px; font-family: 'DM Sans', sans-serif;
        }
        .btn-add:hover { background: #eef6eb; border-color: #2d7a3a; }

        /* Form */
        .form-card {
          background: #fff; border-radius: 20px; padding: 20px;
          border: 1.5px solid #e2ede0;
          box-shadow: 0 4px 24px rgba(45,122,58,0.08); margin-bottom: 12px;
        }
        .form-heading {
          font-size: 0.92rem; font-weight: 700; color: #1a3d1f;
          margin-bottom: 18px; display: flex; align-items: center; gap: 8px;
          padding-bottom: 12px; border-bottom: 1px solid #eef6eb;
        }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .f-full { grid-column: span 2; }
        .f-group { display: flex; flex-direction: column; }
        .f-label {
          font-size: 0.7rem; font-weight: 700; color: #4a7a52;
          text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 5px;
        }
        .f-input {
          width: 100%; padding: 11px 14px; border-radius: 10px;
          border: 1.5px solid #d4e6d0; font-size: 0.875rem; outline: none;
          transition: all 0.2s; background: #fff; font-family: 'DM Sans', sans-serif; color: #1a3d1f;
        }
        .f-input:focus { border-color: #2d7a3a; box-shadow: 0 0 0 3px rgba(45,122,58,0.12); }
        .f-input.err { border-color: #e05252; box-shadow: 0 0 0 3px rgba(224,82,82,0.1); }
        .f-err { font-size: 0.68rem; color: #e05252; font-weight: 600; margin-top: 3px; }
        .form-btns { display: flex; gap: 10px; margin-top: 18px; }
        .btn-save {
          flex: 1; padding: 12px;
          background: linear-gradient(135deg, #2d7a3a 0%, #3d9e4d 100%);
          color: #fff; border: none; border-radius: 12px; font-size: 0.875rem;
          font-weight: 700; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-save:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(45,122,58,0.28); }
        .btn-cancel {
          padding: 12px 18px; background: #f5f9f4; color: #5a7a60;
          border: 1.5px solid #d4e6d0; border-radius: 12px; font-size: 0.875rem;
          font-weight: 600; cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-cancel:hover { background: #e8f4e8; }

        /* Toast */
        .toast {
          position: fixed; top: 76px; left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: #2d7a3a; color: #fff; padding: 9px 20px;
          border-radius: 50px; font-size: 0.8rem; font-weight: 600;
          opacity: 0; transition: all 0.3s; pointer-events: none;
          z-index: 100; white-space: nowrap; box-shadow: 0 4px 20px rgba(45,122,58,0.3);
        }
        .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }

        /* Sticky bottom */
        .sticky-bottom {
          position: fixed; bottom: 0; left: 0; right: 0;
          background: #fff; border-top: 1px solid #e2ede0;
          padding: 12px 16px;
          padding-bottom: calc(12px + env(safe-area-inset-bottom));
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
        .btn-next {
          flex: 1; padding: 13px;
          background: linear-gradient(135deg, #2d7a3a 0%, #3d9e4d 100%);
          color: #fff; border: none; border-radius: 14px; font-size: 0.9rem;
          font-weight: 700; cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
        }
        .btn-next:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(45,122,58,0.32); }
        .btn-next:active { transform: translateY(0); }

        @media (max-width: 400px) {
          .form-grid { grid-template-columns: 1fr; }
          .f-full { grid-column: span 1; }
        }
      `}</style>

      <div className="addr-wrap">
        {/* Toast */}
        <div className={`toast ${toast ? "show" : ""}`}>{toast}</div>

        {/* Topbar */}
        <div className="topbar">
          <span style={{fontSize:"1.1rem"}}>🌿</span>
          <span className="topbar-logo">Ecoyaan</span>
        </div>

        {/* Steps */}
        <div className="steps-bar">
          <div className="steps">
            {[["Cart",0],["Address",1],["Payment",2],["Done",3]].map(([label, i]) => (
              <div key={label} className={`step ${i < 1 ? "done" : i === 1 ? "active" : ""}`}>
                <div className="step-circle">{i < 1 ? "✓" : i + 1}</div>
                <div className="step-label">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="content">
          <h1 className="page-title">Delivery Address</h1>
          <p className="page-sub">Where should we send your eco-friendly order?</p>

          {/* Saved addresses */}
          {addresses.map(addr => (
            <div
              key={addr.id}
              className={`addr-card ${selectedId === addr.id ? "selected" : ""}`}
              onClick={() => setSelectedId(addr.id)}
            >
              <div className="card-top">
                <div className="radio"><div className="radio-dot" /></div>
                <div className="card-body">
                  <div className="card-header">
                    <span className="card-name">{addr.name}</span>
                    {selectedId === addr.id && <span className="sel-badge">✓ Delivering here</span>}
                  </div>
                  <div className="card-detail">
                    {addr.addressLine}<br />
                    {addr.city}, {addr.state} — {addr.pin}<br />
                    📞 {addr.phone} · ✉️ {addr.email}
                  </div>
                </div>
              </div>
              <div className="card-actions" onClick={e => e.stopPropagation()}>
                <button className="btn-edit" onClick={() => handleEdit(addr)}>✏️ Edit</button>
                <button className="btn-del" onClick={() => handleDelete(addr.id)}>🗑 Remove</button>
              </div>
            </div>
          ))}

          {/* Add address button */}
          {!showForm && (
            <button className="btn-add" onClick={() => { setShowForm(true); setForm(emptyForm); setEditingId(null); }}>
              + Add New Address
            </button>
          )}

          {/* Address form */}
          {showForm && (
            <div className="form-card">
              <div className="form-heading">
                🏠 {editingId ? "Edit Address" : "Add New Address"}
              </div>
              <div className="form-grid">
                <div className="f-group f-full">
                  <label className="f-label">Full Name *</label>
                  <input name="name" value={form.name} onChange={handleChange}
                    className={`f-input ${errors.name ? "err" : ""}`} placeholder="Rahul Sharma" />
                  {errors.name && <span className="f-err">{errors.name}</span>}
                </div>

                <div className="f-group">
                  <label className="f-label">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange}
                    className={`f-input ${errors.email ? "err" : ""}`} placeholder="rahul@email.com" />
                  {errors.email && <span className="f-err">{errors.email}</span>}
                </div>

                <div className="f-group">
                  <label className="f-label">Phone *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                    className={`f-input ${errors.phone ? "err" : ""}`} placeholder="10-digit number" maxLength={10} />
                  {errors.phone && <span className="f-err">{errors.phone}</span>}
                </div>

                <div className="f-group f-full">
                  <label className="f-label">Address *</label>
                  <input name="addressLine" value={form.addressLine} onChange={handleChange}
                    className={`f-input ${errors.addressLine ? "err" : ""}`} placeholder="Flat no, Street, Area" />
                  {errors.addressLine && <span className="f-err">{errors.addressLine}</span>}
                </div>

                <div className="f-group">
                  <label className="f-label">PIN Code *</label>
                  <input name="pin" value={form.pin} onChange={handleChange}
                    className={`f-input ${errors.pin ? "err" : ""}`} placeholder="6-digit PIN" maxLength={6} />
                  {errors.pin && <span className="f-err">{errors.pin}</span>}
                </div>

                <div className="f-group">
                  <label className="f-label">City *</label>
                  <input name="city" value={form.city} onChange={handleChange}
                    className={`f-input ${errors.city ? "err" : ""}`} placeholder="Mumbai" />
                  {errors.city && <span className="f-err">{errors.city}</span>}
                </div>

                <div className="f-group f-full">
                  <label className="f-label">State *</label>
                  <select name="state" value={form.state} onChange={handleChange}
                    className={`f-input ${errors.state ? "err" : ""}`}>
                    <option value="">Select state</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <span className="f-err">{errors.state}</span>}
                </div>
              </div>

              <div className="form-btns">
                {addresses.length > 0 && (
                  <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                )}
                <button className="btn-save" onClick={handleSave}>
                  {editingId ? "Update Address" : "Save Address"} →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Sticky bottom */}
        <div className="sticky-bottom">
          <div className="sticky-inner">
            <button className="btn-back" onClick={() => router.push("/cart")}>← Back</button>
            <button className="btn-next" onClick={handleNext}>
              Next Step · Payment →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}