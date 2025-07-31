// app/components/ProductRangeSection.tsx
import Image from 'next/image';
import Link from 'next/link';
const productCategories = [
  {
    name: 'Clothing',
    // Source: https://www.flaticon.com/free-icons/t-shirt (search for "t-shirt")
    image: 'https://cdn-icons-png.flaticon.com/512/392/392043.png',
    description: 'Customizable apparel for every style.',
    link: '/shop?category=clothing',
  },
  {
    name: 'Phone Cases',
    // Source: https://www.flaticon.com/free-icons/phone-case (search for "phone case")
    image: 'https://cdn-icons-png.flaticon.com/128/7683/7683447.png',
    description: 'Durable and stylish protection for your device.',
    link: '/shop?category=phonecase',
  },

  // Add more products here...
];

export default function ProductRangeSection() {
  return (
    <section className="py-16 bg-white w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">
          Explore Our Product Range
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Start with our custom apparel and phone cases, with more materials for printing coming soon!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {productCategories.map((product, index) => (
            <Link
              key={index}
              href={product.link}
              className="group block bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-2"
            >
              <div className="relative w-full h-48 mb-4 flex items-center justify-center overflow-hidden rounded-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-orange-600">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}