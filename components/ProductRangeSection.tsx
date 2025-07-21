// app/components/ProductRangeSection.tsx
import Image from 'next/image';
import Link from 'next/link';

const productCategories = [
  {
    name: 'T-Shirts',
    // Source: https://www.flaticon.com/free-icons/t-shirt (search for "t-shirt")
    image: 'https://cdn-icons-png.flaticon.com/512/3676/3676057.png',
    description: 'Customizable apparel for every style.',
    link: '/shop?category=t-shirts',
  },
  {
    name: 'Phone Cases',
    // Source: https://www.flaticon.com/free-icons/phone-case (search for "phone case")
    image: 'https://cdn-icons-png.flaticon.com/512/625/625345.png',
    description: 'Durable and stylish protection for your device.',
    link: '/shop?category=phone-cases',
  },
  {
    name: 'Tote Bags',
    // Source: https://www.flaticon.com/free-icons/shopping-bag (search for "shopping bag" or "tote bag")
    image: 'https://cdn-icons-png.flaticon.com/512/3050/3050307.png',
    description: 'Eco-friendly and fashionable carry-alls.',
    link: '/shop?category=tote-bags',
  },
  {
    name: 'Metal Prints',
    // Source: https://www.flaticon.com/free-icons/picture (search for "picture" or "frame")
    image: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png', // Represents a picture/frame
    description: 'Vibrant, high-definition art on metal.',
    link: '/shop?category=metal-prints',
  },
  {
    name: 'Crystal Stickers',
    // Source: https://www.flaticon.com/free-icons/sticker (search for "sticker")
    image: 'https://cdn-icons-png.flaticon.com/512/2838/2838186.png',
    description: 'Sparkling decals for personalizing anything.',
    link: '/shop?category=stickers',
  },
  {
    name: 'Fridge Magnets',
    // Source: https://www.flaticon.com/free-icons/magnet (search for "magnet")
    image: 'https://cdn-icons-png.flaticon.com/512/3040/3040332.png',
    description: 'Personalized magnets for your home or office.',
    link: '/shop?category=magnets',
  },
  {
    name: 'Carpets & Floor Mats',
    // Source: https://www.flaticon.com/free-icons/carpet (search for "carpet")
    image: 'https://cdn-icons-png.flaticon.com/512/4609/4609202.png',
    description: 'Custom flooring solutions for unique spaces.',
    link: '/shop?category=mats',
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
          From custom apparel to unique home decor, Haloo offers a diverse selection of products to bring your ideas to life.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                  width={150} // Adjust width/height for icons to be smaller
                  height={150}
                  className="object-contain transition-transform duration-300 group-hover:scale-110" // Use object-contain for icons
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