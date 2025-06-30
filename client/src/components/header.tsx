import logoPath from "@assets/image_1751253530638.png";

export default function Header() {
  return (
    <header className="w-full bg-white py-4 px-6 flex items-center">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 relative">
          <img 
            src={logoPath}
            alt="Psykhe AI Logo" 
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
        <h1 className="text-xl font-semibold text-black tracking-wide">PSYKHE AI</h1>
      </div>
    </header>
  );
}
