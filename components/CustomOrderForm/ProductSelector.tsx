'use client';

import { useProductSelector } from '@/app/hooks/useProductSelector';
import { useProductStore } from '@/app/stores/useProductStore';
import { useCartStore } from '@/app/stores/useCartStore';
import { useRouter } from 'next/navigation';

export default function ProductSelector() {
  const {
    selectedCategory,
    selectedSubcategory,
    selectedSizeOrModel,
    selectedColor,
    selectedMaterial,
    selectedPrice,
    categories,
    subcategories,
    sizesOrModels,
    colors,
    phonecaseMaterials,
    handleCategoryChange,
    handleSubcategoryChange,
    handleSizeOrModelChange,
    handleColorChange,
    handleMaterialChange,
    
  } = useProductSelector();
  const { product } = useProductStore();
  const { addItem } = useCartStore();
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
    <div className="space-y-4">
      <div>
        <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-1">
          Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          aria-label="Select product category"
        >
          {categories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="subcategory" className="block text-lg font-medium text-gray-700 mb-1">
          Item:
        </label>
        <select
          id="subcategory"
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          disabled={!selectedCategory}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
          aria-label="Select product item"
        >
          <option value="">Select Item</option>
          {subcategories.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sizeOrModel" className="block text-lg font-medium text-gray-700 mb-1">
          {selectedCategory === 'Clothing' ? 'Size' : 'Model'}:
        </label>
        <select
          id="sizeOrModel"
          value={selectedSizeOrModel}
          onChange={handleSizeOrModelChange}
          disabled={!selectedCategory || (selectedCategory === 'Phone Cases' && selectedSubcategory === 'Others')}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
          aria-label={selectedCategory === 'Clothing' ? 'Select size' : 'Select phone model'}
        >
          <option value="">Select {selectedCategory === 'Clothing' ? 'Size' : 'Model'}</option>
          {sizesOrModels.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory === 'Clothing' && (
        <div>
          <label htmlFor="color" className="block text-lg font-medium text-gray-700 mb-1">
            Color:
          </label>
          <select
            id="color"
            value={selectedColor}
            onChange={handleColorChange}
            disabled={!selectedCategory}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="Select color"
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedCategory === 'Phone Cases' && (
        <div>
          <label htmlFor="material" className="block text-lg font-medium text-gray-700 mb-1">
            Material:
          </label>
          <select
            id="material"
            value={selectedMaterial}
            onChange={handleMaterialChange}
            disabled={selectedSubcategory === 'Others'}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
            aria-label="Select phone case material"
          >
            <option value="">Select Material</option>
            {phonecaseMaterials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>
        </div>
      )}


      <div>
        <p className="text-lg font-medium text-gray-700">
          Price: ${selectedPrice.toFixed(2)}
        </p>
      </div>

      <div>
        <button
          onClick={handleAddToCart}
          disabled={isAddToCartDisabled()}
          className={`w-full py-3 px-8 rounded-full text-lg font-bold transition duration-300 ${
            isAddToCartDisabled()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}