import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useLocation } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function FillInfoPlaceholder() {
  // Get sessionId from query string
  const searchParams = new URLSearchParams(window.location.search);
  const sessionId = searchParams.get("sessionId");
  const [, setLocation] = useLocation();

  const handleToResults = () => {
    if (sessionId) {
      setLocation(`/results/${sessionId}`);
    }
  };

  const handleBackToQ30 = () => {
    if (sessionId) {
      setLocation(`/test?sessionId=${sessionId}&question=29`); // 0-based index
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-20 mt-0 text-black">
          You're Almost There!<br />
          Let's Personalize Your Experience
        </h2>
        <div className="flex items-center justify-between w-full max-w-6xl mx-auto mt-0">
          <button
            onClick={handleBackToQ30}
            className="flex p-2 hover:bg-gray-100 rounded-full flex-shrink-0 w-10 h-10"
            aria-label="Back to question 30"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <img
            src="/attached_assets/fill-info-placeholder1.JPG"
            alt="Fill info placeholder"
            className="max-w-full max-h-[80vh] cursor-pointer"
            onClick={handleToResults}
          />
          <button
            onClick={handleToResults}
            className="flex p-2 hover:bg-gray-100 rounded-full flex-shrink-0 w-10 h-10"
            aria-label="See result"
          >
            <ArrowRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
} 