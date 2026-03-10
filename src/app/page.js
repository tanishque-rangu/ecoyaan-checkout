import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
       <h1 className="text-green-600 text-4xl font-bold mb-6">
  Welcome to Ecoyaan Checkout
</h1>
        <Link href="/cart">
          <button className="bg-green-600 text-white px-8 py-4 text-xl rounded">
            Go to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}