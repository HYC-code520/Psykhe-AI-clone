import { Instagram, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="gradient-footer text-white py-12 px-6 mt-auto min-h-[200px]">
      <div className="max-w-6xl mx-auto h-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center h-full">
          {/* Left side - Brand and Navigation */}
          <div className="flex flex-col items-start space-y-6">
            <div className="text-lg font-semibold tracking-wide">PSYKHE AI</div>
            <nav className="flex flex-col space-y-3 text-sm">
              <a href="#" className="hover:text-gray-200 transition-colors duration-200">About</a>
              <a href="#" className="hover:text-gray-200 transition-colors duration-200">Big 5 Personality Test</a>
              <a href="#" className="hover:text-gray-200 transition-colors duration-200">Terms</a>
              <a href="#" className="hover:text-gray-200 transition-colors duration-200">Data & Privacy Policy</a>
              <a href="#" className="hover:text-gray-200 transition-colors duration-200">Glossary</a>
              <a href="#" className="hover:text-gray-200 transition-colors duration-200">Contact</a>
            </nav>
          </div>

          {/* Right side - Social and Back to Top */}
          <div className="flex flex-col items-end space-y-6 mt-8 md:mt-0">
            <a 
              href="#" 
              className="inline-block p-3 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
            >
              <Instagram className="w-6 h-6" />
            </a>
            
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm hover:text-gray-200 transition-colors duration-200"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
