import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="gradient-footer text-white py-8 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          <div className="text-sm font-medium">PSYKHE AI</div>
          <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">About</a>
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">Big 5 Personality Test</a>
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">Terms</a>
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">Data & Privacy Policy</a>
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">Glossary</a>
            <a href="#" className="hover:text-gray-200 transition-colors duration-200">Contact</a>
          </nav>
        </div>

        <div className="mt-4 md:mt-0">
          <a 
            href="#" 
            className="inline-block p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}
