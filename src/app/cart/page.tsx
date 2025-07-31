'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useProductStore } from '@/app/stores/useProductStore';
import { useOrderStore } from '@/app/stores/useOrderStore';

export default function Cart() {
    const { product } = useProductStore();
    const { imageUrl, quantity } = useOrderStore();
    const finalPrice = 10;
    const isCartEmpty = !product.category || !imageUrl;

    const handleClearCart = () => {

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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                            <div className="relative w-full h-48 mb-4 flex items-center justify-center overflow-hidden rounded-md">
                                <Image
                                    src={imageUrl}
                                    alt={`${product.category} - ${product.subcategory}`}
                                    width={150}
                                    height={150}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-semibold mb-2 text-gray-800">
                                {product.category} - {product.subcategory}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                                Size/Model: {product.sizeOrModel}
                            </p>
                            {product.color && (
                                <p className="text-gray-600 text-sm mb-2">
                                    Color: {product.color}
                                </p>
                            )}
                            <p className="text-gray-600 text-sm mb-2">
                                Material: {product.material}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                                Quantity: {quantity}
                            </p>
                            <p className="text-gray-800 font-bold text-lg">
                                Total: ${(finalPrice / 100).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-4">
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