import logoPath from "@assets/image_1751256246733.png";

export default function Header() {
  return (
    <header className="w-full bg-white py-4 px-6 flex items-center">
      <div className="flex items-center">
        <img 
          src={logoPath}
          alt="Psykhe AI Logo" 
          className="h-10 object-contain"
        />
      </div>
    </header>
  );
}
