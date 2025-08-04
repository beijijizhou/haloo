'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '@/app/stores/useCartStore';
import StaticProductPreview from '../../../components/StaticProductPreview';

export default function Cart() {
  const { products, setQuantity, removeProduct, clearCart } = useCartStore();
  const isCartEmpty = products.length === 0;

  // Calculate total price
  const totalPrice = products.reduce(
    (sum, item) => sum + item.product.price * item.product.quantity,
    0
  );

  const handleClearCart = () => {
    clearCart();
  };

  const handleQuantityChange = (id: string, value: string) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity)) {
      setQuantity(id, quantity);
    }
  };

  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Your Shopping Cart
        </h2>
        {isCartEmpty ? (
          <div className="max-w-2xl mx-auto">
            <p className="text-xl text-gray-600 mb-8">
              Your cart is empty. Start creating your custom product!
            </p>
            <Link
              href="/create"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
            >
              Create a Product
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {products.map((item) => (
                <div key={item.id} className="bg-gray-50 p-6 rounded-lg shadow-md">
                  <div className="relative w-full mb-4 flex items-center justify-center overflow-hidden rounded-md">
                    {item.product.image?.url && <StaticProductPreview product={item.product} />}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                    {item.product.category} - {item.product.subcategory}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Size/Model: {item.product.sizeOrModel || 'N/A'}
                  </p>
                  {item.product.color && (
                    <p className="text-gray-600 text-sm mb-2">
                      Color: {item.product.color}
                    </p>
                  )}
                  {item.product.material && (
                    <p className="text-gray-600 text-sm mb-2">
                      Material: {item.product.material}
                    </p>
                  )}
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <button
                      onClick={() => setQuantity(item.id, item.product.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
                      aria-label={`Decrease quantity for ${item.product.subcategory}`}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.product.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      min="1"
                      className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-gray-800"
                      aria-label={`Set quantity for ${item.product.subcategory}`}
                    />
                    <button
                      onClick={() => setQuantity(item.id, item.product.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded"
                      aria-label={`Increase quantity for ${item.product.subcategory}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeProduct(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded mt-2"
                    aria-label={`Remove ${item.product.subcategory} from cart`}
                  >
                    <Image
                      src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                      alt="Delete"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </button>
                  <p className="text-gray-800 font-bold text-lg mt-2">
                    Subtotal: ${(item.product.price * item.product.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-2xl font-bold text-gray-800">
                Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                href="/checkout"
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={handleClearCart}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full text-md transition duration-300"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}