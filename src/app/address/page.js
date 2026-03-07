"use client"; // this makes it a client page (needed for useState)

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddressPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    pin: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // very basic check (not perfect, but beginner level)
    if (!form.name || !form.email || !form.phone || form.phone.length !== 10) {
      alert("Please fill all fields correctly. Phone must be 10 digits.");
      return;
    }

    // save to localStorage
    localStorage.setItem("checkoutAddress", JSON.stringify(form));

    router.push("/payment");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Shipping Address</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Phone (10 digits)</label>
          <input
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">PIN Code</label>
          <input
            name="pin"
            value={form.pin}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">State</label>
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-4 rounded text-lg"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
}