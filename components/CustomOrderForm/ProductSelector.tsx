import { useProductSelector } from '@/app/hooks/useProductSelector';
import { useProductStore } from '@/app/stores/useProductStore';

export default function ProductSelector() {
  const { setProductSelection } = useProductStore();
  const {
    selectedCategory,
    selectedSubcategory,
    selectedSizeOrModel,
    selectedColor,
    selectedMaterial,
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
  } = useProductSelector(setProductSelection);

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
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
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
    </div>
  );
}