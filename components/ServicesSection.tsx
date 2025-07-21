// app/components/ServicesSection.tsx
import Image from 'next/image';

const services = [
  {
    icon: 'https://www.clipartmax.com/png/middle/314-3149887_t-png-icon-free-t-shirt.png', // clear line-T‑shirt
    title: 'Custom Design',
    description: 'Bring your vision to life with our expert design team.',
  },
  {
    icon: 'https://www.clipartmax.com/png/middle/314-3149887_t-png-icon-free-t-shirt.png', // clear line-T‑shirt
    title: 'High-Quality Prints',
    description: 'Crisp, vibrant prints that make a lasting impression.',
  },
  {
    icon: 'https://www.clipartmax.com/png/middle/314-3149887_t-png-icon-free-t-shirt.png', // clear line-T‑shirt
    title: 'Fast Turnaround',
    description: 'Get your prints quickly without compromising quality.',
  },
  {
    icon: 'https://www.clipartmax.com/png/middle/314-3149887_t-png-icon-free-t-shirt.png', // clear line-T‑shirt
    title: 'Eco-Friendly Options',
    description: 'Sustainable printing solutions for a greener future.',
  },
];



export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <Image
                src={service.icon}
                alt={service.title}
                width={80}
                height={80}
                className="mx-auto mb-6"
              />
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}