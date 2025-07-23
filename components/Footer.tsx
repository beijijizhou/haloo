export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center text-sm">
        &copy; {new Date().getFullYear()} Haloo POD. All rights reserved.
        Icons by <a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noopener noreferrer" className="underline">Freepik</a> from <a href="https://www.flaticon.com" target="_blank" rel="noopener noreferrer" className="underline">www.flaticon.com</a>

      </div>
    </footer>
  );
}