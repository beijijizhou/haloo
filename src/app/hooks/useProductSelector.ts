import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '@/app/stores/useProductStore';

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
const COLORS = ['Orange', 'Grey', 'Purple', 'Blue', 'Red', 'Black', 'White'];
const PHONE_CASE_MATERIALS = ['PVC', 'PC'];


interface UseProductSelectorReturn {
  selectedCategory: string;
  selectedSubcategory: string;
  selectedSizeOrModel: string;
  selectedColor: string;
  selectedMaterial: string;
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

export function useProductSelector(

): UseProductSelectorReturn {
  const { product, setProductSelection } = useProductStore();
  const { category, subcategory, sizeOrModel, color, material } = product;
  const [selectedCategory, setSelectedCategory] = useState<string>( category || 'Clothing');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategory || '');
  const [selectedSizeOrModel, setSelectedSizeOrModel] = useState<string>(sizeOrModel || '');
  const [selectedColor, setSelectedColor] = useState<string>( COLORS[0] || (selectedCategory === 'Phone Cases' ? '' : color) );
  const [selectedMaterial, setSelectedMaterial] = useState<string>( PHONE_CASE_MATERIALS[0] || (selectedCategory === 'Phone Cases' ? material : '') );

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
    },
    []
  );

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedColor(event.target.value);
    },
    []
  );

  const handleMaterialChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMaterial(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (selectedCategory) {
      const categoryData = categories.find((cat) => cat.name === selectedCategory);
      const firstSubcategory = categoryData?.subcategories[0]?.name || '';
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
      if (selectedCategory === 'Clothing' && !selectedColor) {
        setSelectedColor(COLORS[0]);
      } else if (selectedCategory === 'Phone Cases') {
        setSelectedColor('');
      }
      if (selectedCategory === 'Phone Cases' && firstSubcategory !== 'Others') {
        if (!selectedMaterial) {
          setSelectedMaterial(PHONE_CASE_MATERIALS[0]);
        }
      } else {
        setSelectedMaterial('');
      }
    } else {
      setSelectedSubcategory('');
      setSelectedSizeOrModel('');
      setSelectedColor('');
      setSelectedMaterial('');
    }
    setProductSelection({
      category: selectedCategory,
      subcategory: selectedSubcategory,
      sizeOrModel: selectedSizeOrModel,
      color: selectedCategory === 'Phone Cases' ? '' : selectedColor,
      material: selectedMaterial,
    });
  }, [selectedCategory, selectedSubcategory, selectedSizeOrModel, selectedColor, selectedMaterial, setProductSelection]);

  useEffect(() => {
    if (selectedCategory === 'Phone Cases' && selectedSubcategory && selectedSubcategory !== 'Others') {
      const newModel = PHONE_MODELS[selectedSubcategory as keyof typeof PHONE_MODELS]?.[0] || '';
      if (selectedSizeOrModel !== newModel) {
        setSelectedSizeOrModel(newModel);
      }
      if (!selectedMaterial) {
        setSelectedMaterial(PHONE_CASE_MATERIALS[0]);
      }
    } else if (selectedCategory === 'Clothing') {
      if (selectedSizeOrModel !== PRODUCT_SIZES[0]) {
        setSelectedSizeOrModel(PRODUCT_SIZES[0]);
      }
      setSelectedMaterial('');
    } else {
      setSelectedSizeOrModel('');
      setSelectedMaterial('');
    }
    setProductSelection({
      category: selectedCategory,
      subcategory: selectedSubcategory,
      sizeOrModel: selectedSizeOrModel,
      color: selectedCategory === 'Phone Cases' ? '' : selectedColor,
      material: selectedMaterial,
    });
  }, [selectedSubcategory, selectedCategory, selectedSizeOrModel, selectedColor, selectedMaterial, setProductSelection]);

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
    categories,
    subcategories,
    sizesOrModels,
    colors: selectedCategory === 'Clothing' ? COLORS : [], // Only show colors for Clothing
    phonecaseMaterials: PHONE_CASE_MATERIALS,
    handleCategoryChange,
    handleSubcategoryChange,
    handleSizeOrModelChange,
    handleColorChange,
    handleMaterialChange,
  };
}