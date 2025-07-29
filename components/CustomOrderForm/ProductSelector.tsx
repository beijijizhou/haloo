'use client';

import { useProductSelector } from '@/app/hooks/useProductSelector';
import { useOrderStore } from '@/app/stores/useOrderStore';

export default function ProductSelector() {
    const { setProductSelection } = useOrderStore();
    const {
        selectedCategory,
        selectedSubcategory,
        selectedSizeOrModel,
        categories,
        subcategories,
        sizesOrModels,
        handleCategoryChange,
        handleSubcategoryChange,
        handleSizeOrModelChange,
    } = useProductSelector(setProductSelection);

    return (
        <div className="space-y-4">
            <div>
                <label
                    htmlFor="category"
                    className="block text-lg font-medium text-gray-700 mb-1"
                >
                    Category:
                </label>
                <select
                    id="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                    aria-label="Select product category"
                >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                        <option key={category.name} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label
                    htmlFor="subcategory"
                    className="block text-lg font-medium text-gray-700 mb-1"
                >
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
                <label
                    htmlFor="sizeOrModel"
                    className="block text-lg font-medium text-gray-700 mb-1"
                >
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
        </div>
    );
}