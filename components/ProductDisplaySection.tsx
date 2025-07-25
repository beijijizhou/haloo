// app/components/ProductDisplaySection.tsx
'use client'; // This component needs client-side interactivity

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react'; // Import useCallback and useRef

export const tshirtDisplay = [
  {
    name: 'Pen',
    image: '/images/display/pen.jpg',
    alt: 'Cutie pen and strawberry',
  },
  {
    name: 'First Day Tee',
    image: '/images/display/first-day.jpg',
    alt: 'Custom T-shirt for first day events',
  },
  {
    name: 'Brother',
    image: '/images/display/brother.jpg',
    alt: 'Brother-themed custom clothing',
  },
  {
    name: 'Daughter Mug',
    image: '/images/display/daughter.jpg',
    alt: 'Personalized mug for daughters',
  },
  {
    name: 'Different',
    image: '/images/display/different.jpg',
    alt: 'How to be different custom apparel',
  },
  {
    name: 'Dark Blue Moutan',
    image: '/images/flower/dark-blue-moutan.png',
    alt: 'Dark blue moutan-themed custom apparel',
  },
  {
    name: 'Light Blue Moutan',
    image: '/images/flower/light-blue-moutan.png',
    alt: 'Light blue moutan-themed custom apparel',
  },
  {
    name: 'Lotus',
    image: '/images/flower/lotus.png',
    alt: 'Lotus-themed custom apparel',
  },
  {
    name: 'Red Moutan',
    image: '/images/flower/red-moutan.png',
    alt: 'Red moutan-themed custom apparel',
  },
  {
    name: 'Wall Iris',
    image: '/images/flower/wall-iris.png',
    alt: 'Wall iris-themed custom apparel',
  },
];
// For a smooth loop, we'll add duplicates of the first few slides at the end.
// This allows the animation to play out before resetting the index.
const NUM_DUPLICATES = 1; // Number of slides to duplicate for smooth looping
const extendedProductExamples = [
    ...tshirtDisplay,
    ...tshirtDisplay.slice(0, NUM_DUPLICATES),
];

export default function ProductDisplaySection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true); // State to control transition
    const intervalRef = useRef<NodeJS.Timeout | null>(null); // Ref to store interval ID

    // Function to start the auto-slide timer
    const startAutoSlide = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1); // Just increment, handle loop logic in useEffect
        }, 3000); // Change slide every 3 seconds
    }, []);

    // Effect for automatic slide rotation and loop handling
    useEffect(() => {
        startAutoSlide(); // Start auto-slide when component mounts

        // Cleanup interval on component unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [startAutoSlide]); // Dependency on startAutoSlide to re-run if it changes (though it's memoized)

    // Effect to handle the smooth loop back to the beginning
    useEffect(() => {
        if (currentIndex === tshirtDisplay.length) {
            // If we've reached the duplicated first slide, smoothly transition there,
            // then immediately jump back to the actual first slide without transition.
            const timeout = setTimeout(() => {
                setIsTransitioning(false); // Disable transition
                setCurrentIndex(0); // Jump back to the start
            }, 700); // Match the CSS transition duration

            return () => clearTimeout(timeout);
        } else if (currentIndex === 0 && !isTransitioning) {
            // If we just jumped back to 0, re-enable transition after a very short delay
            // to ensure subsequent slides animate correctly.
            const timeout = setTimeout(() => {
                setIsTransitioning(true);
            }, 50); // Small delay to re-enable transition
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, isTransitioning]);

    // Handler for navigation dots click
    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        startAutoSlide(); // Reset timer on manual click
    };

    // Calculate the translateX value to slide the images
    const translateXValue = -currentIndex * 100;

    return (
        <section className="py-16 bg-gray-50 w-full">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl font-bold mb-12 text-gray-800">
                    Showcasing Our Products
                </h2>
                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Take a look at some examples of the high-quality, custom products we have printed for our customers.
                </p>

                {/* Carousel Container */}
                <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg shadow-xl">
                    {/* Inner container for sliding images */}
                    <div
                        className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
                        style={{ transform: `translateX(${translateXValue}%)` }}
                        // Optional: Add a listener for when the transition ends, if more complex logic is needed
                        // onTransitionEnd={() => { if (currentIndex === productExamples.length) { setIsTransitioning(false); setCurrentIndex(0); } }}
                    >
                        {extendedProductExamples.map((product, index) => ( // Use extended list
                            // Each slide item takes full width and prevents shrinking
                            <div key={index} className="w-full flex-shrink-0 relative h-[500px] bg-white">
                                <Image
                                    src={product.image}
                                    alt={product.alt}
                                    // width={400}
                                    // height={400}
                                    layout="fill"
                                    objectFit="contain"
                                />
                                {/* Overlay for text readability */}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                                    <h3 className="text-2xl font-semibold mb-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-base">
                                        {product.alt}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
                        {tshirtDisplay.map((_, index) => ( // Dots still map to original productExamples
                            <button
                                key={index}
                                onClick={() => handleDotClick(index)} // Use new handler
                                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                                    (currentIndex % tshirtDisplay.length) === index ? 'bg-orange-500 w-6' : 'bg-gray-300'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
