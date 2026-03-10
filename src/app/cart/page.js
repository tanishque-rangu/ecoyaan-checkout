import Link from "next/link";

const cartItems = [
  {
    id: 101,
    name: "Bamboo Toothbrush (Pack of 4)",
    price: 299,
    quantity: 2,
    image: "https://via.placeholder.com/150?text=Toothbrush",
  },
  {
    id: 102,
    name: "Reusable Cotton Produce Bags",
    price: 450,
    quantity: 1,
    image: "https://via.placeholder.com/150?text=Bags",
  },
];

export default function CartPage() {
  let subtotal = 0;
  cartItems.forEach((item) => {
    subtotal += item.price * item.quantity;
  });
  const shipping = 50;
  const total = subtotal + shipping;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center border-b py-4">
          <img src={item.image} alt={item.name} className="w-24 h-24 mr-4" />
          <div className="flex-1">
            <h3 className="font-bold">{item.name}</h3>
            <p>₹{item.price} × {item.quantity}</p>
            <p className="font-bold">₹{item.price * item.quantity}</p>
          </div>
        </div>
      ))}
 <div className="text-green-600 text-4xl font-bold mb-6">
      <div className="mt-8 bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping:</span>
          <span>₹{shipping}</span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t pt-4">
          <span>Total:</span>
          <span>₹{total}</span>
        </div></div>

        <Link href="/address">
          <button className="w-full mt-6 bg-green-600 text-white py-4 rounded text-lg">
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}