
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Users } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Trilhas", href: "#trilhas" },
    { name: "Ferramentas", href: "#ferramentas" },
    { name: "Artigos", href: "#artigos" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-finance-blue to-finance-green flex items-center justify-center">
              <span className="text-white font-bold text-sm">FE</span>
            </div>
            <span className="text-xl font-bold text-finance-blue">FinanceiroEdu</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-finance-blue transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-finance-blue hover:bg-finance-blue/10">
              Entrar
            </Button>
            <Button className="bg-finance-green hover:bg-finance-green-dark text-white">
              Começar Agora
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 animate-fade-in">
            <nav className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 hover:text-finance-blue transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                <Button variant="ghost" className="text-finance-blue hover:bg-finance-blue/10 justify-start">
                  Entrar
                </Button>
                <Button className="bg-finance-green hover:bg-finance-green-dark text-white justify-start">
                  Começar Agora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
