'use client';

import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '@/app/stores/useProductStore';
import { Category, PHONE_MODELS, PHONE_CASE_MATERIALS } from './constants';

interface PhoneCaseSelectorReturn {
  selectedSubcategory: string;
  selectedModel: string;
  selectedMaterial: string;
  selectedQuantity: number;
  selectedPrice: number;
  subcategories: { name: string; href: string }[];
  models: string[];
  phonecaseMaterials: string[];
  handleSubcategoryChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleModelChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMaterialChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleQuantityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function usePhoneCaseSelector(category: Category): PhoneCaseSelectorReturn {
  const { product, setProductSelection } = useProductStore();
  const { subcategory, sizeOrModel, material, quantity, price } = product;

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategory || category.subcategories[0]?.name || '');
  const [selectedModel, setSelectedModel] = useState<string>(
    sizeOrModel || (selectedSubcategory && selectedSubcategory !== 'Others' ? PHONE_MODELS[selectedSubcategory as keyof typeof PHONE_MODELS]?.[0] || '' : '')
  );
  const [selectedMaterial, setSelectedMaterial] = useState<string>(
    material || (selectedSubcategory && selectedSubcategory !== 'Others' ? PHONE_CASE_MATERIALS[0] : '')
  );
  const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity || 1);
  const [selectedPrice, setSelectedPrice] = useState<number>(price || 24.99); // Default Phone Case price

  const getPrice = useCallback(() => 24.99, []); // Example price for Phone Cases

  const handleSubcategoryChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(event.target.value);
  }, []);

  const handleModelChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  }, []);

  const handleMaterialChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaterial(event.target.value);
  }, []);

  const handleQuantityChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setSelectedQuantity(Math.max(1, isNaN(value) ? 1 : value));
  }, []);

  useEffect(() => {
    const newPrice = getPrice();
    setSelectedPrice(newPrice);

    if (selectedSubcategory === 'Others') {
      setSelectedModel('');
      setSelectedMaterial('');
    } else if (selectedSubcategory) {
      const newModel = PHONE_MODELS[selectedSubcategory as keyof typeof PHONE_MODELS]?.[0] || '';
      if (selectedModel !== newModel) {
        setSelectedModel(newModel);
      }
      if (!selectedMaterial) {
        setSelectedMaterial(PHONE_CASE_MATERIALS[0]);
      }
    }

    setProductSelection({
      category: category.name,
      subcategory: selectedSubcategory,
      sizeOrModel: selectedModel,
      color: '', // No color for Phone Cases
      material: selectedMaterial,
      imageUrl: product.imageUrl,
      quantity: selectedQuantity,
      price: newPrice,
    });
  }, [selectedSubcategory, selectedModel, selectedMaterial, selectedQuantity, product.imageUrl, setProductSelection, category.name, getPrice]);

  const models =
    selectedSubcategory && selectedSubcategory !== 'Others'
      ? PHONE_MODELS[selectedSubcategory as keyof typeof PHONE_MODELS] || []
      : [];

  return {
    selectedSubcategory,
    selectedModel,
    selectedMaterial,
    selectedQuantity,
    selectedPrice,
    subcategories: category.subcategories,
    models,
    phonecaseMaterials: PHONE_CASE_MATERIALS,
    handleSubcategoryChange,
    handleModelChange,
    handleMaterialChange,
    handleQuantityChange,
  };
}