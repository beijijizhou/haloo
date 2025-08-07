import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '@/app/stores/useProductStore';
import { categories, Category, COLORS, PRODUCT_SIZES, } from '../lib/constants/category';

interface ProductSelections {
  category: string;
  subcategory: string;
  size: string;
  color: string;
  price: number;
}

interface UseProductSelectorReturn {
  selections: ProductSelections;
  categories: Category[];
  subcategories: { name: string; href: string }[];
  sizes: string[];
  colors: string[];
  handleChange: <K extends keyof ProductSelections>(field: K, value: ProductSelections[K]) => void;
}

export function useProductSelector(): UseProductSelectorReturn {
  const { product,  setProductSelection } = useProductStore();
  const { category, subcategory, size, color, price } = product;

  const [selections, setSelections] = useState<ProductSelections>({
    category: category || 'Clothing',
    subcategory: subcategory || '',
    size: size || '',
    color: color || '',
    price: price || 0,
  });

  // Helper function to calculate price
  const getPrice = useCallback((category: string, subcategory: string) => {
    if (category === 'Clothing') {
      return subcategory === 'Tshirts' ? 19.99 : 29.99;
    }
    return 0;
  }, []);

  // Helper function to get default subcategory
  const getDefaultSubcategory = useCallback((category: string) => {
    const categoryData = categories.find((cat) => cat.name === category);
    return categoryData?.subcategories[0]?.name || '';
  }, []);

  // Helper function to get default size
  const getDefaultSize = useCallback((category: string) => {
    if (category === 'Clothing') {
      return PRODUCT_SIZES[0] || '';
    }
    return '';
  }, []);

  // Consolidated change handler
  const handleChange = useCallback(<K extends keyof ProductSelections>(field: K, value: ProductSelections[K]) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
  }, []);

  // useEffect for resetting dependent fields and syncing with store
  useEffect(() => {
    const { category, subcategory, size, color, price } = selections;

    // Calculate new dependent values
    const newSubcategory = subcategory || getDefaultSubcategory(category);
    const newSize = size || getDefaultSize(category);
    const newColor = color || COLORS[0];
    const newPrice = getPrice(category, newSubcategory);

    // Update selections if any dependent field has changed
    if (
      subcategory !== newSubcategory ||
      size !== newSize ||
      color !== newColor ||
      price !== newPrice
    ) {
      setSelections({
        category,
        subcategory: newSubcategory,
        size: newSize,
        color: newColor,
        price: newPrice,
      });
    }

    // Sync with useProductStore
    setProductSelection({
      id: product.id,
      category,
      subcategory: newSubcategory,
      size: newSize,
      color: newColor,
      image: product.image,
      quantity: 1,
      price: newPrice,
    });
  }, [selections, setProductSelection, getPrice, getDefaultSubcategory, getDefaultSize, product.id, product.image]);

  const subcategories = categories.find((cat) => cat.name === selections.category)?.subcategories || [];

  return {
    selections,
    categories,
    subcategories,
    sizes: PRODUCT_SIZES,
    colors: COLORS,
    handleChange,
  };
}