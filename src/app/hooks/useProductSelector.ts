'use client';

import { useState, useEffect, useCallback } from 'react';

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

interface ProductSelectorData {
  category: string;
  subcategory: string;
  sizeOrModel: string;
}

interface UseProductSelectorReturn {
  selectedCategory: string;
  selectedSubcategory: string;
  selectedSizeOrModel: string;
  categories: Category[];
  subcategories: { name: string; href: string }[];
  sizesOrModels: string[];
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubcategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSizeOrModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function useProductSelector(
  onChange: (data: ProductSelectorData) => void,
  initialData?: ProductSelectorData
): UseProductSelectorReturn {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.category || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialData?.subcategory || '');
  const [selectedSizeOrModel, setSelectedSizeOrModel] = useState<string>(initialData?.sizeOrModel || '');

  const handleCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategory(event.target.value);
    },
    []
  );

  const handleSubcategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSubcategory(event.target.value);
    },
    []
  );

  const handleSizeOrModelChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSizeOrModel(event.target.value);
      onChange({
        category: selectedCategory,
        subcategory: selectedSubcategory,
        sizeOrModel: event.target.value,
      });
    },
    [selectedCategory, selectedSubcategory, onChange]
  );

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((cat) => cat.name === selectedCategory);
      const firstSubcategory = category?.subcategories[0]?.name || '';
      if (selectedSubcategory !== firstSubcategory) {
        setSelectedSubcategory(firstSubcategory);
      }
      const newSizeOrModel =
        selectedCategory === 'Clothing'
          ? PRODUCT_SIZES[0]
          : firstSubcategory && firstSubcategory !== 'Others'
          ? PHONE_MODELS[firstSubcategory as keyof typeof PHONE_MODELS]?.[0] || ''
          : '';
      if (selectedSizeOrModel !== newSizeOrModel) {
        setSelectedSizeOrModel(newSizeOrModel);
      }
    } else {
      if (selectedSubcategory !== '') {
        setSelectedSubcategory('');
      }
      if (selectedSizeOrModel !== '') {
        setSelectedSizeOrModel('');
      }
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory === 'Phone Cases' && selectedSubcategory && selectedSubcategory !== 'Others') {
      const newModel = PHONE_MODELS[selectedSubcategory as keyof typeof PHONE_MODELS]?.[0] || '';
      if (selectedSizeOrModel !== newModel) {
        setSelectedSizeOrModel(newModel);
      }
    } else if (selectedCategory === 'Clothing') {
      if (selectedSizeOrModel !== PRODUCT_SIZES[0]) {
        setSelectedSizeOrModel(PRODUCT_SIZES[0]);
      }
    } else if (selectedSizeOrModel !== '') {
      setSelectedSizeOrModel('');
    }
  }, [selectedSubcategory, selectedCategory]);

  useEffect(() => {
    // Only call onChange when all selections are settled
    if (selectedCategory || selectedSubcategory || selectedSizeOrModel) {
      onChange({
        category: selectedCategory,
        subcategory: selectedSubcategory,
        sizeOrModel: selectedSizeOrModel,
      });
    }
  }, [selectedCategory, selectedSubcategory, selectedSizeOrModel, onChange]);

  const subcategories = selectedCategory
    ? categories.find((cat) => cat.name === selectedCategory)?.subcategories || []
    : [];

  const sizesOrModels =
    selectedCategory === 'Clothing'
      ? PRODUCT_SIZES
      : selectedCategory === 'Phone Cases' && selectedSubcategory && selectedSubcategory !== 'Others'
      ? PHONE_MODELS[selectedSubcategory as keyof typeof PHONE_MODELS] || []
      : [];

  return {
    selectedCategory,
    selectedSubcategory,
    selectedSizeOrModel,
    categories,
    subcategories,
    sizesOrModels,
    handleCategoryChange,
    handleSubcategoryChange,
    handleSizeOrModelChange,
  };
}