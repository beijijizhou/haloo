'use client';

import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '@/app/stores/useProductStore';
import { categories, Category, PRODUCT_SIZES, PHONE_MODELS, COLORS, PHONE_CASE_MATERIALS } from './constants';

interface UseProductSelectorReturn {
  selectedCategory: string;
  selectedSubcategory: string;
  selectedSizeOrModel: string;
  selectedColor: string;
  selectedMaterial: string;
  selectedPrice: number;
  categories: Category[];
  subcategories: { name: string; href: string }[];
  sizesOrModels: string[];
  colors: string[];
  phonecaseMaterials: string[];
  handleCategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubcategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSizeOrModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMaterialChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function useProductSelector(): UseProductSelectorReturn {
  const { product, setProductSelection } = useProductStore();
  const { category, subcategory, sizeOrModel, color, material,  price } = product;

  const [selectedCategory, setSelectedCategory] = useState<string>(category || 'Clothing');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategory || '');
  const [selectedSizeOrModel, setSelectedSizeOrModel] = useState<string>(sizeOrModel || '');
  const [selectedColor, setSelectedColor] = useState<string>(color || '');
  const [selectedMaterial, setSelectedMaterial] = useState<string>(material || '');

  const [selectedPrice, setSelectedPrice] = useState<number>(price || 0);

  // Helper function to calculate price
  const getPrice = useCallback((category: string, subcategory: string) => {
    if (category === 'Clothing') {
      return subcategory === 'Tshirts' ? 19.99 : 29.99;
    }
    if (category === 'Phone Cases') {
      return 24.99;
    }
    return 0;
  }, []);

  // Helper function to get default subcategory
  const getDefaultSubcategory = useCallback((category: string) => {
    const categoryData = categories.find((cat) => cat.name === category);
    return categoryData?.subcategories[0]?.name || '';
  }, []);

  // Helper function to get default size or model
  const getDefaultSizeOrModel = useCallback((category: string, subcategory: string) => {
    if (category === 'Clothing') {
      return PRODUCT_SIZES[0];
    }
    if (category === 'Phone Cases' && subcategory && subcategory !== 'Others') {
      return PHONE_MODELS[subcategory as keyof typeof PHONE_MODELS]?.[0] || '';
    }
    return '';
  }, []);

  // Consolidated useEffect for state updates
  useEffect(() => {
    // Reset dependent fields when category changes
    const newSubcategory = selectedSubcategory || getDefaultSubcategory(selectedCategory);
    const newSizeOrModel = selectedSizeOrModel || getDefaultSizeOrModel(selectedCategory, newSubcategory);
    const newColor = selectedCategory === 'Phone Cases' ? '' : selectedColor || COLORS[0];
    const newMaterial =
      selectedCategory === 'Phone Cases' && newSubcategory !== 'Others'
        ? selectedMaterial || PHONE_CASE_MATERIALS[0]
        : '';
    const newPrice = getPrice(selectedCategory, newSubcategory);

    // Update state only if changes are needed
    if (
      selectedSubcategory !== newSubcategory ||
      selectedSizeOrModel !== newSizeOrModel ||
      selectedColor !== newColor ||
      selectedMaterial !== newMaterial ||
      selectedPrice !== newPrice
    ) {
      setSelectedSubcategory(newSubcategory);
      setSelectedSizeOrModel(newSizeOrModel);
      setSelectedColor(newColor);
      setSelectedMaterial(newMaterial);
      setSelectedPrice(newPrice);
    }

    // Sync with useProductStore
    setProductSelection({
      category: selectedCategory,
      subcategory: newSubcategory,
      sizeOrModel: newSizeOrModel,
      color: newColor,
      material: newMaterial,
      image: {
        url: product.image.url,
        processedUrl: product.image.processedUrl,
        useProcessedUrl: product.image.useProcessedUrl,
      },
      id: product.id, // Ensure product has an ID
      quantity: 1,
      price: newPrice,
    });
  }, [selectedCategory, selectedSubcategory, selectedSizeOrModel, selectedColor, selectedMaterial, setProductSelection, getPrice, getDefaultSubcategory, getDefaultSizeOrModel, selectedPrice, product.image.url, product.image.processedUrl, product.image.useProcessedUrl, product.id]);

  const handleCategoryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  }, []);

  const handleSubcategoryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
  }, []);

  const handleSizeOrModelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSizeOrModel(event.target.value);
  }, []);

  const handleColorChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  }, []);

  const handleMaterialChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaterial(event.target.value);
  }, []);



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
    selectedColor,
    selectedMaterial,
    selectedPrice,
    categories,
    subcategories,
    sizesOrModels,
    colors: selectedCategory === 'Clothing' ? COLORS : [],
    phonecaseMaterials: selectedCategory === 'Phone Cases' ? PHONE_CASE_MATERIALS : [],
    handleCategoryChange,
    handleSubcategoryChange,
    handleSizeOrModelChange,
    handleColorChange,
    handleMaterialChange,
   
  };
}