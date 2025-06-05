
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Trilhas", href: "/trilhas" },
    { name: "Ferramentas", href: "/ferramentas" },
    { name: "Artigos", href: "/artigos" },
    { name: "Contato", href: "/contato" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  // Função para garantir scroll ao topo ao clicar em links
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg to-finance-green flex items-center justify-center">
            </div>
            <span className="text-xl sm:text-2xl font-bold" style={{ color: '#1e40af' }}>
              Invest<span style={{ color: '#10b981' }}>Savy</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-finance-blue transition-colors duration-200 font-medium"
                onClick={handleLinkClick}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-finance-blue hover:bg-finance-blue/10 flex items-center gap-2 text-sm lg:text-base">
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/perfil" className="flex w-full" onClick={handleLinkClick}>Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/minhas-trilhas" className="flex w-full" onClick={handleLinkClick}>Minhas Trilhas</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-finance-blue hover:bg-finance-blue/10 text-sm lg:text-base px-2 lg:px-4"
                  onClick={() => {
                    navigate("/login");
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  Entrar
                </Button>
                <Button
                  className="bg-finance-green hover:bg-finance-green-dark text-white text-sm lg:text-base px-2 lg:px-4"
                  onClick={() => {
                    navigate("/cadastro");
                    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  Começar Agora
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-gray-100 animate-fade-in max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col space-y-3 mt-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-gray-600 hover:text-finance-blue transition-colors duration-200 font-medium py-2"
                  onClick={handleLinkClick}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-100">
                {user ? (
                  <>
                    <Link
                      to="/perfil"
                      className="text-gray-600 hover:text-finance-blue transition-colors duration-200 font-medium py-2"
                      onClick={handleLinkClick}
                    >
                      Perfil
                    </Link>
                    <Link
                      to="/minhas-trilhas"
                      className="text-gray-600 hover:text-finance-blue transition-colors duration-200 font-medium py-2"
                      onClick={handleLinkClick}
                    >
                      Minhas Trilhas
                    </Link>
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:bg-red-50 justify-start"
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      className="text-finance-blue hover:bg-finance-blue/10 justify-start"
                      onClick={() => {
                        navigate("/login");
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                        setIsMenuOpen(false);
                      }}
                    >
                      Entrar
                    </Button>
                    <Button
                      className="bg-finance-green hover:bg-finance-green-dark text-white justify-start"
                      onClick={() => {
                        navigate("/cadastro");
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                        setIsMenuOpen(false);
                      }}
                    >
                      Começar Agora
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
