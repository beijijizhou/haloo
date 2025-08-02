interface Category {
    name: string;
    items: { name: string; href: string }[];
}

export const categories: Category[] = [
    {
        name: 'Clothing',
        items: [
            { name: 'Tshirts', href: '/shop?category=clothing&model=Tshirts' },
            { name: 'Hoodies', href: '/shop?category=clothing&model=Hoodies' },
            { name: 'Sweatshirt', href: '/shop?category=clothing&model=sweatshirt' },
        ],
    },
    {
        name: 'Phone Cases',
        items: [
            { name: 'Apple', href: '/shop?category=phonecase&model=iphone' },
            { name: 'Samsung', href: '/shop?category=phonecase&model=samsung' },
            { name: 'Others', href: '/shop?category=phonecase&model=others' },
        ],
    },
];