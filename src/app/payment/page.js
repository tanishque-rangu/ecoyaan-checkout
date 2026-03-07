"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [address, setAddress] = useState(null);
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true); // New: track if still loading

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem("checkoutAddress");
    console.log("Loaded from localStorage:", saved); // Debug: check console

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAddress(parsed);
      } catch (e) {
        console.error("Invalid address data:", e);
      }
    } else {
      console.log("No address found - redirecting to cart");
      router.replace("/cart"); // Use replace to avoid back-button issues
    }

    setLoading(false); // Done loading
  }, [router]);

  const total = 299 * 2 + 450 + 50; // Hard-coded from mock data

  const handlePay = () => {
    setPaid(true);
    // Optional: Clear storage after success
    // localStorage.removeItem("checkoutAddress");
  };

  if (loading) {
    return <div className="max-w-lg mx-auto p-6 text-center">Loading your order details...</div>;
  }

  if (paid) {
    return (
      <div className="max-w-lg mx-auto p-6 text-center">
        <div className="bg-green-100 p-10 rounded-xl">
          <h1 className="text-4xl font-bold text-green-700 mb-4">
            Order Successful! 🌱
          </h1>
          <p className="text-xl mb-6">Thank you for shopping eco-friendly!</p>
          <button
            onClick={() => {
              localStorage.removeItem("checkoutAddress"); // Clean up
              router.push("/cart");
            }}
            className="bg-green-600 text-white px-8 py-4 rounded text-lg"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  if (!address) {
    return <div className="max-w-lg mx-auto p-6 text-center">No address found. Redirecting...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Confirm & Pay</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="text-4xl font-bold mb-6 text-slate-950">
        <div>
          <h2 className="text-xl font-bold mb-4">Shipping To:</h2>
          <div className="bg-white p-6 rounded border">
            <p className="font-bold">{address.name}</p>
            <p>{address.email}</p>
            <p>{address.phone}</p>
            <p>
              {address.city}, {address.state} - {address.pin}
            </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Order Total: ₹{total}</h2>
          <button
            onClick={handlePay}
            className="w-full bg-green-600 text-white py-6 rounded text-xl font-bold hover:bg-green-700"
          >
            Pay Securely ₹{total}
          </button>
        </div>
      </div>
    </div>
  );
}