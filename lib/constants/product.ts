
interface Product {
  id: string;
  name: string;
  price: string;
  images: string[];
  alt: string;
  description: string;
  longDescription: string;
  category: string;
  model: string;
}

// iPhone case products
const iphoneCaseProducts: Product[] = [
  {
    id: 'devil',
    name: 'Devil iPhone Case',
    price: '25.99',
    images: ['/images/phone case/devil.jpg'],
    alt: 'Devil-themed custom iPhone case',
    description: 'Bold and edgy Devil-themed iPhone case for a standout look.',
    longDescription:
      'Make a statement with the Devil iPhone Case, designed for those who embrace a bold and rebellious style. Crafted with durable materials to protect your iPhone, this case features a striking devil-themed design that’s perfect for standing out. Ideal for daily use or as a unique gift, it combines protection with personality.',
    category: 'phonecase',
    model: 'iphone',
  },
  {
    id: 'sky',
    name: 'Sky iPhone Case',
    price: '23.99',
    images: ['/images/phone case/sky.jpg'],
    alt: 'Sky-themed custom iPhone case',
    description: 'Serene Sky-themed iPhone case for a calming aesthetic.',
    longDescription:
      'Bring tranquility to your tech with the Sky iPhone Case. Featuring a serene sky-inspired design, this case offers both style and protection for your iPhone. Made from high-quality materials, it’s built to withstand daily wear while adding a touch of calm beauty. Perfect for dreamers and nature lovers alike.',
    category: 'phonecase',
    model: 'iphone',
  },
  {
    id: 'tiger',
    name: 'Tiger iPhone Case',
    price: '26.99',
    images: ['/images/phone case/tiger.jpg'],
    alt: 'Tiger-themed custom iPhone case',
    description: 'Fierce Tiger-themed iPhone case for a bold statement.',
    longDescription:
      'Unleash your wild side with the Tiger iPhone Case. This striking case features a fierce tiger design, combining rugged durability with eye-catching style. Crafted to protect your iPhone from drops and scratches, it’s perfect for those who want to make a bold statement while keeping their device safe.',
    category: 'phonecase',
    model: 'iphone',
  },
  {
    id: 'wtw',
    name: 'WTW iPhone Case',
    price: '24.99',
    images: ['/images/phone case/wtw.jpg'],
    alt: 'WTW-themed custom iPhone case',
    description: 'Unique WTW-themed iPhone case for a distinctive vibe.',
    longDescription:
      'Stand out with the WTW iPhone Case, featuring a unique and artistic design that’s sure to turn heads. Built with premium materials for reliable protection, this case is perfect for those who value individuality and quality. Whether for yourself or as a gift, it’s a stylish way to keep your iPhone safe.',
    category: 'phonecase',
    model: 'iphone',
  },
];

// Other products (clothing and Samsung case)
const tshirtProducts: Product[] = [
  {
    id: 'pen',
    name: 'Pen',
    price: '9.99',
    images: ['/images/display/pen.jpg'],
    alt: 'Cutie pen and strawberry',
    description:
      'Adorable pen with a playful strawberry design, perfect for daily writing.',
    longDescription:
      'Add a dash of charm to your stationery collection with this delightful pen. Designed with a whimsical strawberry accent and smooth ink flow, it makes writing more enjoyable. Ideal for students, creatives, or as a thoughtful gift, this pen combines functionality with personality, turning everyday tasks into moments of joy.',
    category: 'clothing',
    model: 'tshirt',
  },
  {
    id: 'first-day',
    name: 'First Day',
    price: '29.99',
    images: ['/images/display/first-day.jpg'],
    alt: 'Custom T-shirt for first day events',
    description:
      'Celebrate new beginnings with a stylish, custom First Day.',
    longDescription:
      'Mark memorable milestones with the First Day — crafted for moments like the first day of school, work, or a fresh start in life. Made from high-quality, breathable cotton and available in various sizes, this T-shirt offers both comfort and durability. Its minimalist yet expressive design makes it perfect for photos, gifts, or daily wear to capture those once-in-a-lifetime experiences.',
    category: 'clothing',
    model: 'tshirt',
  },
  {
    id: 'brother',
    name: 'Brother',
    price: '34.99',
    images: ['/images/display/brother.jpg'],
    alt: 'Brother-themed custom clothing',
    description:
      'A heartfelt T-shirt dedicated to the bond between brothers.',
    longDescription:
      'Express your love and appreciation with this Brother-themed T-shirt, crafted to symbolize the unique connection between siblings. Made with premium cotton and featuring a bold, modern print, it’s a great gift for birthdays, holidays, or just because. This shirt is not just apparel — it’s a reminder of loyalty, shared memories, and the lifelong bond of brotherhood.',
    category: 'clothing',
    model: 'hoodie',
  },
  {
    id: 'daughter',
    name: 'Daughter ',
    price: '19.99',
    images: ['/images/display/daughter.jpg'],
    alt: 'Personalized  for daughters',
    description:
      'Personalized  that celebrates daughters with love and elegance.',
    longDescription:
      'Start her morning with a warm reminder of your love. The Daughter  features a heartwarming design, perfect for expressing appreciation and pride. Crafted from durable ceramic and dishwasher-safe, this  is ideal for daily use at home or work. Whether for a birthday, graduation, or spontaneous gesture, it’s a thoughtful gift she’ll cherish with every sip.',
    category: 'clothing',
    model: 'sweatshirt',
  },
];

// Combine products
export const mockProducts: Product[] = [...iphoneCaseProducts, ...tshirtProducts];