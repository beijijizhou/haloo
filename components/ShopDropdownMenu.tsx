'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { categories } from '../src/app/lib/constants/category';

interface DropdownMenuProps {
  isOpen: boolean;
}

export default function ShopDropdownMenu({ isOpen }: DropdownMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10, transition: { delay: 0.2 } }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50"
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative group"
              onMouseEnter={() => setActiveCategory(category.name)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="px-4 py-2 text-gray-800 hover:bg-orange-100 hover:text-orange-500 transition-colors duration-200 font-h5">
                {category.name}
              </div>
              <AnimatePresence>
                {activeCategory === category.name && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-0 ml-2 w-48 bg-white shadow-lg rounded-lg"
                  >
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-800 hover:bg-orange-100 hover:text-orange-500 transition-colors duration-200 font-h5"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}