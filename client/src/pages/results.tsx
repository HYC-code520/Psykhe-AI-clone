import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { Download, Share2, RefreshCw } from "lucide-react";

export default function Results() {
  const [, setLocation] = useLocation();

  // Placeholder handlers
  const handleDownload = () => {
    alert("Download functionality coming soon!");
  };
  const handleShare = () => {
    alert("Share functionality coming soon!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      {/* Floating icon buttons on the right */}
      <div className="fixed top-1/3 right-6 z-50 flex flex-col gap-4 items-center">
        <button
          onClick={handleDownload}
          title="Download result"
          className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-110 transition-all"
        >
          <Download className="w-6 h-6" />
        </button>
        <button
          onClick={handleShare}
          title="Share with your friend"
          className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-110 transition-all"
        >
          <Share2 className="w-6 h-6" />
        </button>
        <button
          onClick={() => setLocation("/")}
          title="Take the test again"
          className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-green-300 text-white hover:scale-110 transition-all"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <img 
          src="/attached_assets/placeholder1.JPG"
          alt="Test Result Placeholder 1"
          className="max-w-full h-auto rounded mb-8"
        />

        <img 
          src="/attached_assets/placeholder3.JPG"
          alt="Test Result Placeholder 3"
          className="max-w-full h-auto rounded mb-12"
        />

        {/* Gradient Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl justify-center items-center mt-8 mb-4">
          <button
            onClick={handleDownload}
            className="flex-1 text-lg font-bold py-5 rounded-2xl shadow-lg transition-all bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105"
          >
            Download result
          </button>
          <button
            onClick={handleShare}
            className="flex-1 text-lg font-bold py-5 rounded-2xl shadow-lg transition-all bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:scale-105"
          >
            Share with your friend
          </button>
          <button
            onClick={() => setLocation("/")}
            className="flex-1 text-lg font-bold py-5 rounded-2xl shadow-lg transition-all bg-gradient-to-r from-blue-500 to-green-300 text-white hover:scale-105"
          >
            Take the test again
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
