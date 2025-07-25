// app/components/ProductRangeSection.tsx
import Image from 'next/image';
import Link from 'next/link';
// const otherProducts = [
//     {
//     name: 'Tote Bags',
//     // Source: https://www.flaticon.com/free-icons/shopping-bag (search for "shopping bag" or "tote bag")
//     image: 'https://cdn-icons-png.flaticon.com/512/3301/3301039.png',
//     description: 'Eco-friendly and fashionable carry-alls.',
//     link: '/shop?category=tote-bags',
//   },
//   {
//     name: 'Metal Prints',
//     // Source: https://www.flaticon.com/free-icons/picture (search for "picture" or "frame")
//     image: 'https://cdn-icons-png.flaticon.com/512/5672/5672236.png', // Represents a picture/frame
//     description: 'Vibrant, high-definition art on metal.',
//     link: '/shop?category=metal-prints',
//   },
//   {
//     name: 'Crystal Stickers',
//     // Source: https://www.flaticon.com/free-icons/sticker (search for "sticker")
//     image: 'https://cdn-icons-png.flaticon.com/512/3275/3275543.png',
//     description: 'Sparkling decals for personalizing anything.',
//     link: '/shop?category=stickers',
//   },
//   {
//     name: 'Fridge Magnets',
//     // Source: https://www.flaticon.com/free-icons/magnet (search for "magnet")
//     image: 'https://cdn-icons-png.flaticon.com/512/2333/2333450.png',
//     description: 'Personalized magnets for your home or office.',
//     link: '/shop?category=magnets',
//   },
//   {
//     name: 'Carpets & Floor Mats',
//     // Source: https://www.flaticon.com/free-icons/carpet (search for "carpet")
//     image: 'https://cdn-icons-png.flaticon.com/512/5525/5525080.png',
//     description: 'Custom flooring solutions for unique spaces.',
//     link: '/shop?category=mats',
//   },
// ]
const productCategories = [
  {
    name: 'Cloth',
    // Source: https://www.flaticon.com/free-icons/t-shirt (search for "t-shirt")
    image: 'https://cdn-icons-png.flaticon.com/512/392/392043.png',
    description: 'Customizable apparel for every style.',
    link: '/shop?category=cloth',
  },
  {
    name: 'Phone Cases',
    // Source: https://www.flaticon.com/free-icons/phone-case (search for "phone case")
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJUAAACUCAMAAACtIJvYAAAAZlBMVEX///8AAACnp6fExMQjIyOVlZXq6uoFBQWxsbFgYGD5+fkbGxvt7e3AwMCLi4vf39/Ly8sxMTG5ubnz8/NHR0dSUlJNTU2EhIQPDw8/Pz+cnJwXFxdnZ2dXV1d+fn7Z2dlycnI4ODhtvSbLAAAEtUlEQVR4nO2ca5uyIBCGM8/mMc1O5uH//8nXGazUBWS3wt7rmufL2gp4C8OAKLPZzJSncbEz9MjdlXHqzAk42heaiB7qjvkCU+7rZkLZ3whlGK2suhhUGXvmHxVd6hOWcUzVksc3hnUWY+0xwXapmeVq8NZK1ULyhnG1wgRnOJ2+xARqoZiLenoPsUS2FWFNvQy1CaEbn0MVsRo1EUtQu/G4fdNLXfkz1bYZqGB56mZeesE9Q80v7NCfitmh45/4pXQqDRxe1bGMCuoBbKvju1PrYQ6pgMkw1AzG+gWV0fYZGjiIuGXBGTQrR3qv/Mw/qK7WstjItu87Wtn/PcqpKjhyazueyj5mcCJbHriA6ugki2ou0Cj+htl0KaVq4BbOCSdFgJ3eU6KSjyJ32VCrAfu7k1Jt4aDhJsGaLt5Ihd4oHK4ppYLarAQuQJz7b1Sm2yd1VKn4ljcMSqtQQRuLRstjf+60ChV6Wr5baq6GZCD9KFXeoXNLnLkSzKswfn+CiiXpHdNczOOLOsKnqdB6RLIUBujPUAVirILnXV+ngr4t96Kgps149eSrTb9+T9VPznf7RarNJkl/iu/w30IVpIJGmFK9oj9QCUVURPUKlcgNrkq1LSt+J1yTKjWWZshrUKmMOET1Dqow3Xvm4gCtlSow/ayfjLpWZ8vBdFI1h9H0wZZNszRSbaezmi78BqrH8s9uGUsbFVv56mwnCAITFyIkz9DaqHBqWt2rZ29JE+uiusDJ0WpcAqUJV2c0UeFC/G7c7bAY0VKWJipci5usEAWwaHhblwoejLKp58SVp3WpINNt6jehU7qCNRJNVFAx/vRf2KgCl6WJClzo7CUINKorGHY02pU1fUaN17crZze/jgMvfdp1qQIcY8ZNCJYmXMnS5dtxrff89OW4PnoQvW7TNg7i6+jsblo2FGbwF1F0UiXs3czNM9PIZseCl1Q6qfCJbSLJSqTGuWgzXWcT15TeeXteP1/QZabsWnqfvJxtdb4aVlkvvI3T/TwY5I4TLr5/p2dnoiIqoiIqoiIqoiIqoiIqoiIqoiIqoiIqoiIqoiIqoiIqoiIqoiIqoiIqoiKq/4+q609IP55YhSo9W7LPTFai2uQq+920U71NREVUI4XfaO1pkYm2hK9IBV/IKQRf0Ez1nSMOUREVUREVUYmlHrnlPVRqAbAgEIQ1RLmxVKnCyOPrsWPC7H/s5xESgKraC7KOhbF82oGOvz/rB1Ues4/+eRqqosYf12K6r0OcjSO3zxt2wjaf1zvbWCIQ29nRPK4fzUtSFsCgefGf+kZRuVAXWVk+fk7udI9/jPYSyiNVTXXCeoBJVMH/QH0SwaxvP7zj646rYjAl89z/eNzyIE+ScSKriLEce1bAWLNob8OewYCrZzP3yqGWn3vzcVtTx8/HLQfdwkmwOWQWGQ82lWRqM3mMbPT4heaoHhlvCBMj3NzDoghe8hGVSkBLZoF3KhYV8KAUrK5HSjxmAJK7GHYMx14URSZcyvLMaFkmuJ0MUnqXlhlxOQ9/xtexGrattBLyXOYLPin5kLJO0MxucX1Ke9RTyxfa+bi60vhgGe7vZZxOp6t1m4dplKqOo4TXL/4B3Y1V8+zcbyMAAAAASUVORK5CYII=',
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