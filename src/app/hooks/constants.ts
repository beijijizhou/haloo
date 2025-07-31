export interface Category {
  name: string;
  subcategories: { name: string; href: string }[];
}

export const categories: Category[] = [
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

export const PRODUCT_SIZES = ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL', '4XL'];
export const PHONE_MODELS = {
  Apple: ['iPhone 13', 'iPhone 14', 'iPhone 15', 'iPhone 15 Pro'],
  Samsung: ['Galaxy S21', 'Galaxy S22', 'Galaxy S23', 'Galaxy Z Fold'],
};
export const COLORS = ['Black', 'White','Orange', 'Grey', 'Purple', 'Blue', 'Red', ];
export const PHONE_CASE_MATERIALS = ['PVC', 'PC'];