// app/layout.tsx
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './globals.css'; // Your global styles for Tailwind CSS
 // Import your Footer component

// You can update the metadata here for your Haloo website
export const metadata = {
  title: 'Haloo - Your Creative Printing Partner',
  description: 'Welcome to Haloo, bringing your ideas to life with high-quality printing solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col min-h-screen">
          {/* The Header will be present on every page */}
          <Header />
          
          {/* The `children` prop renders the content of the specific page (e.g., page.tsx, shop/page.tsx) */}
          <main className="flex-grow container mx-auto p-4">
            {children}
          </main>
          
          {/* The Footer will also be present on every page */}
          <Footer />
        </div>
      </body>
    </html>
  );
}