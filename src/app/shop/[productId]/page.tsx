// app/shop/[productId]/page.tsx
// NO 'use client' HERE - This is a Server Component
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient'; // Import your new Client Component
import { mockProducts } from '../../../../lib/constants';

// This function tells Next.js which static paths to generate at build time
export async function generateStaticParams() {
  // Use mockProducts from constants or define it here if you didn't move it
  return mockProducts.map((product) => ({
    productId: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  const product = mockProducts.find(p => p.id === productId);
  // console.log('Product ID:', productId);
  // console.log('Product Data:', product);
  if (!product) {
    notFound();
  }

  // Pass the fetched product data to the Client Component
  return <ProductDetailClient product={product} />;
}