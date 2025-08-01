'use client';

import Link from 'next/link';
import CustomOrderForm from '../../../components/CustomOrderForm';
import { useProductSelector } from '../hooks/useProductSelector';
import { useCartStore } from '../stores/useCartStore';
import { useProductStore } from '../stores/useProductStore';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedSizeOrModel,
    selectedColor,
    selectedMaterial,
    selectedPrice,

  } = useProductSelector();
  const { product } = useProductStore();
  const { addProduct: addItem } = useCartStore();
  const router = useRouter();
  const isAddToCartDisabled = () => {
    // Shared attributes (required for both categories)
    const sharedValid = Boolean(
      selectedCategory &&
      selectedSubcategory &&
      product.imageUrl

    );

    if (!sharedValid) return true;

    // Category-specific attributes
    if (selectedCategory === 'Clothing') {
      return !selectedSizeOrModel || !selectedColor;
    }

    if (selectedCategory === 'Phone Cases') {
      // For "Others" subcategory, sizeOrModel and material are not required
      if (selectedSubcategory === 'Others') {
        return false;
      }
      return !selectedSizeOrModel || !selectedMaterial;
    }

    return true; // Default case (should not occur with valid categories)
  };

  const handleAddToCart = () => {
    const newProduct = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      sizeOrModel: selectedSizeOrModel,
      color: selectedCategory === 'Phone Cases' ? '' : selectedColor,
      material: selectedMaterial,
      imageUrl: product.imageUrl,
      quantity: 1,
      price: selectedPrice,
    };
    addItem(newProduct);
    router.push('/cart');
  };
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create Your Order</h1>
      <CustomOrderForm />
      <div className="mt-8">
        <div>
          <button
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled()}
            className={`w-full py-3 px-8 rounded-full text-lg font-bold transition duration-300 ${isAddToCartDisabled()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
              }`}
          >
            Add to Cart
          </button>
        </div>
        <Link href="/" className="text-sm text-gray-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div >
  );
}