'use client';

import { useProductSelector } from '@/app/hooks/useProductSelector';
import {  PrintPosition } from '@/app/lib/constants/category';

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
  ariaLabel: string;
}

function Dropdown({ id, label, value, options, onChange, disabled, ariaLabel }: DropdownProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-1">
        {label}:
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed"
        aria-label={ariaLabel}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function ProductSelector() {
  const {
    selections: { category, subcategory, size, color, image, price },
    categories,
    subcategories,
    sizes,
    colors,
    printPositions,
    handleChange,
  } = useProductSelector();

  return (
    <div className="space-y-4">
      <Dropdown
        id="category"
        label="Category"
        value={category}
        options={categories.map((cat) => ({ value: cat.name, label: cat.name }))}
        onChange={(value) => handleChange('category', value)}
        ariaLabel="Select product category"
      />
      <Dropdown
        id="subcategory"
        label="Item"
        value={subcategory}
        options={subcategories.map((sub) => ({ value: sub.name, label: sub.name }))}
        onChange={(value) => handleChange('subcategory', value)}
        disabled={!category}
        ariaLabel="Select product item"
      />
      <Dropdown
        id="size"
        label="Size"
        value={size}
        options={sizes.map((size) => ({ value: size, label: size }))}
        onChange={(value) => handleChange('size', value)}
        disabled={!category}
        ariaLabel="Select size"
      />
      <Dropdown
        id="color"
        label="Color"
        value={color}
        options={colors.map((color) => ({ value: color, label: color }))}
        onChange={(value) => handleChange('color', value)}
        disabled={!category}
        ariaLabel="Select color"
      />
      <Dropdown
        id="printPosition"
        label="Print Position"
        value={image.printPosition}
        options={printPositions.map((position) => ({ value: position, label: position }))}
        onChange={(value) => handleChange('image', { ...image, printPosition: value as PrintPosition })}
        disabled={!category}
        ariaLabel="Select print position"
      />
      <div>
        <p className="text-lg font-medium text-gray-700">Price: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
}