'use client';
import { useRef, useState } from 'react';
import { useCartStore } from '@/app/stores/useCartStore';
import StaticProductPreview from './StaticProductPreview';

export default function ProductReview() {
  const { products } = useCartStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalQuantity = products.reduce((sum, { product }) => sum + product.quantity, 0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust as needed
      const newScrollPosition =
        direction === 'left'
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
      updateScrollButtons();
    }
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800">Order Summary</h2>
      <p className="text-sm text-gray-600 mb-4">Total Quantity: {totalQuantity}</p>
      {products.length === 0 ? (
        <p className="text-gray-600 text-center">No products in your order.</p>
      ) : (
        <div className="relative">
          {products.length > 1 && (
            <>
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                ←
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="absolute right-[-2.5rem] top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white rounded-full p-2 disabled:opacity-50 disabled:cursor-not-allowed z-10"
              >
                →
              </button>
            </>
          )}
          <div
            className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide"
            ref={scrollContainerRef}
            onScroll={updateScrollButtons}
          >
            {products.map(({ id, product }) => (
              <div
                key={id}
                className="flex-shrink-0 w-64 bg-white border rounded-lg p-4 shadow-sm"
              >

                <StaticProductPreview product={product} />

                <h3 className="text-lg font-medium text-gray-800">
                  {product.category} {product.subcategory}
                </h3>
                <p className="text-sm text-gray-600">Size/Model: {product.sizeOrModel}</p>
                <p className="text-sm text-gray-600">Color: {product.color}</p>
                <p className="text-sm text-gray-600">Material: {product.material}</p>
                <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                <p className="text-sm font-semibold text-gray-800">
                  Price: ${(product.price * product.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}