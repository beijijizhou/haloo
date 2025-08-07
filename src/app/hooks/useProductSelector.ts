import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '@/app/stores/useProductStore';
import {
  categories,
  Category,
  COLORS,
  PRODUCT_SIZES,
  PrintPosition,
} from '../lib/constants/category';
import { ImageState, Product, Image } from '../types';

interface UseProductSelectorReturn {
  selections: Omit<Product, 'id' | 'quantity'>;
  categories: Category[];
  subcategories: { name: string; href: string }[];
  sizes: string[];
  colors: string[];
  imageStates: ImageState[];
  printPositions: PrintPosition[];
  handleChange: <K extends keyof Omit<Product, 'id' | 'quantity'>>(field: K, value: Omit<Product, 'id' | 'quantity'>[K]) => void;
}

export function useProductSelector(): UseProductSelectorReturn {
  const { product, setProductSelection } = useProductStore();
  const { category, subcategory, size, color,  price, image } = product;

  const [selections, setSelections] = useState<Omit<Product, 'id' | 'quantity'>>({
    category: category || 'Clothing',
    subcategory: subcategory || '',
    size: size || '',
    color: color || '',
    image: {
      url: image?.url || null,
      processedUrl: image?.processedUrl || null,
      highQualityProcessedUrl: image?.highQualityProcessedUrl || null,
      imageState: image?.imageState || ImageState.Original,
      printPosition: image?.printPosition || PrintPosition.Front,
    },
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
  const handleChange = useCallback(
    <K extends keyof Omit<Product, 'id' | 'quantity'>>(
      field: K,
      value: Omit<Product, 'id' | 'quantity'>[K],
    ) => {
      setSelections((prev) => {
        if (field === 'image') {
          return { ...prev, image: value as Image };
        }
        return { ...prev, [field]: value };
      });
    },
    [],
  );

  // useEffect for resetting dependent fields and syncing with store
  useEffect(() => {
    const { category, subcategory, size, color, image, price } = selections;

    // Calculate new dependent values
    const newSubcategory = subcategory || getDefaultSubcategory(category);
    const newSize = size || getDefaultSize(category);
    const newColor = color || COLORS[0];
    const newImage = {
      url: image.url,
      processedUrl: image.processedUrl,
      highQualityProcessedUrl: image.highQualityProcessedUrl,
      imageState: image.imageState || ImageState.Original,
      printPosition: image.printPosition || PrintPosition.Front,
    };
    const newPrice = getPrice(category, newSubcategory);

    // Update selections if any dependent field has changed
    if (
      subcategory !== newSubcategory ||
      size !== newSize ||
      color !== newColor ||
      image.imageState !== newImage.imageState ||
      image.printPosition !== newImage.printPosition ||
      price !== newPrice
    ) {
      setSelections({
        category,
        subcategory: newSubcategory,
        size: newSize,
        color: newColor,
        image: newImage,
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
      image: newImage,
      quantity: 1,
      price: newPrice,
    });
  }, [selections, setProductSelection, getPrice, getDefaultSubcategory, getDefaultSize, product.id]);

  const subcategories = categories.find((cat) => cat.name === selections.category)?.subcategories || [];

  return {
    selections,
    categories,
    subcategories,
    sizes: PRODUCT_SIZES,
    colors: COLORS,
    imageStates: [ImageState.Original, ImageState.Processed],
    printPositions: Object.values(PrintPosition),
    handleChange,
  };
}