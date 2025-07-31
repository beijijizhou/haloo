// app/components/AboutUsSection.tsx
import Image from 'next/image';
export default function AboutUsSection() {
    return (
        <section className="py-16 w-full">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <Image
                        src="/images/logo.jpg"
                        alt="T-shirt"
                        width={600}
                        height={400}
                        className="rounded-lg shadow-xl"
                    />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        About <span className="text-orange-500">Haloo</span> Printing
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-4">
                        At Haloo, we believe in the power of print to transform ideas into tangible, impactful realities. With years of experience and a passion for perfection, we offer a wide range of printing services tailored to meet your unique needs.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        From business cards to large format banners, our commitment to quality and customer satisfaction is at the heart of everything we do. Let us help you make a statement with your next print project.
                    </p>
                </div>
            </div>
        </section>
    );
}