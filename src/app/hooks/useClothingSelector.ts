'use client';

import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '@/app/stores/useProductStore';
import { Category, PRODUCT_SIZES, COLORS } from './constants';

interface ClothingSelectorReturn {
  selectedSubcategory: string;
  selectedSize: string;
  selectedColor: string;
  selectedQuantity: number;
  selectedPrice: number;
  subcategories: { name: string; href: string }[];
  sizes: string[];
  colors: string[];
  handleSubcategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSizeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleColorChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useClothingSelector(category: Category): ClothingSelectorReturn {
  const { product, setProductSelection } = useProductStore();
  const { subcategory, sizeOrModel, color, quantity, price } = product;

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategory || category.subcategories[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(sizeOrModel || PRODUCT_SIZES[0]);
  const [selectedColor, setSelectedColor] = useState<string>(color || COLORS[0]);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity || 1);
  const [selectedPrice, setSelectedPrice] = useState<number>(price || 0);

  const getPrice = useCallback((subcategory: string) => {
    return subcategory === 'Tshirts' ? 19.99 : 29.99; // Example prices
  }, []);

  const handleSubcategoryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
  }, []);

  const handleSizeChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(event.target.value);
  }, []);

  const handleColorChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColor(event.target.value);
  }, []);

  const handleQuantityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedQuantity(Math.max(1, isNaN(value) ? 1 : value));
  }, []);

  useEffect(() => {
    const newPrice = getPrice(selectedSubcategory);
    setSelectedPrice(newPrice);

    setProductSelection({
      category: category.name,
      subcategory: selectedSubcategory,
      sizeOrModel: selectedSize,
      color: selectedColor,
      material: '', // Clothing has no material
      imageUrl: product.imageUrl,
      quantity: selectedQuantity,
      price: newPrice,
    });
  }, [selectedSubcategory, selectedSize, selectedColor, selectedQuantity, product.imageUrl, setProductSelection, category.name, getPrice]);

  return {
    selectedSubcategory,
    selectedSize,
    selectedColor,
    selectedQuantity,
    selectedPrice,
    subcategories: category.subcategories,
    sizes: PRODUCT_SIZES,
    colors: COLORS,
    handleSubcategoryChange,
    handleSizeChange,
    handleColorChange,
    handleQuantityChange,
  };
}