'use client';

import { useState, useEffect } from 'react';

interface Category {
  name: string;
  subcategories: { name: string; href: string }[];
}

const categories: Category[] = [
  {
    name: 'Clothing',
    subcategories: [
      { name: 'Tshirts', href: '/shop?category=clothing&model=Tshirts' },
      { name: 'Hoodies', href: '/shop?category=clothing&model=Hoodies' },
      { name: 'Sweatshirt', href: '/shop?category=clothing&model=sweatshirt' },
    ],
  },
  {
    name: 'Phone Cases',
    subcategories: [
      { name: 'Apple', href: '/shop?category=phonecase&model=iphone' },
      { name: 'Samsung', href: '/shop?category=phonecase&model=samsung' },
      { name: 'Others', href: '/shop?category=phonecase&model=others' },
    ],
  },
];

const PRODUCT_SIZES = ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL', '4XL'];

const PHONE_MODELS = {
  Apple: ['iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 15 Pro'],
  Samsung: ['Galaxy S21', 'Galaxy S22', 'Galaxy S23', 'Galaxy Z Fold'],
};

interface ProductSelectorProps {
  onChange: (data: { category: string; subcategory: string; sizeOrModel: string }) => void;
  initialData?: { category: string; subcategory: string; sizeOrModel: string };
}

export default function ProductSelector({ onChange, initialData }: ProductSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.category || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialData?.subcategory || '');
  const [selectedSizeOrModel, setSelectedSizeOrModel] = useState<string>(initialData?.sizeOrModel || '');

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((cat) => cat.name === selectedCategory);
      const firstSubcategory = category?.subcategories[0]?.name || '';
      setSelectedSubcategory(firstSubcategory);
      setSelectedSizeOrModel(
        selectedCategory === 'Clothing' ? PRODUCT_SIZES[0] : firstSubcategory && firstSubcategory !== 'Others' ? PHONE_MODELS[firstSubcategory as keyof typeof PHONE_MODELS]?.[0] || '' : ''
      );
    } else {
      setSelectedSubcategory('');
      setSelectedSizeOrModel('');
    }
    onChange({ category: selectedCategory, subcategory: selectedSubcategory, sizeOrModel: selectedSizeOrModel });
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === 'Phone Cases' && selectedSubcategory && selectedSubcategory !== 'Others') {
      setSelectedSizeOrModel(PHONE_MODELS[selectedSubcategory as keyof typeof PHONE_MODELS]?.[0] || '');
    } else if (selectedCategory === 'Clothing') {
      setSelectedSizeOrModel(PRODUCT_SIZES[0]);
    } else {
      setSelectedSizeOrModel('');
    }
    onChange({ category: selectedCategory, subcategory: selectedSubcategory, sizeOrModel: selectedSizeOrModel });
  }, [selectedSubcategory]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubcategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
    onChange({ category: selectedCategory, subcategory: event.target.value, sizeOrModel: selectedSizeOrModel });
  };

  const handleSizeOrModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSizeOrModel(event.target.value);
    onChange({ category: selectedCategory, subcategory: selectedSubcategory, sizeOrModel: event.target.value });
  };

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
          {selectedCategory &&
            categories
              .find((cat) => cat.name === selectedCategory)
              ?.subcategories.map((item) => (
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
          {selectedCategory === 'Clothing' &&
            PRODUCT_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          {selectedCategory === 'Phone Cases' && selectedSubcategory && selectedSubcategory !== 'Others' &&
            PHONE_MODELS[selectedSubcategory as keyof typeof PHONE_MODELS].map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}