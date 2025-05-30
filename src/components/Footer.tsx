
import { Button } from "@/components/ui/button";

const Footer = () => {
  const quickLinks = [
    { name: "Trilhas", href: "#trilhas" },
    { name: "Ferramentas", href: "#ferramentas" },
    { name: "Artigos", href: "#artigos" },
    { name: "Sobre", href: "#sobre" }
  ];

  const resources = [
    { name: "Central de Ajuda", href: "#ajuda" },
    { name: "Política de Privacidade", href: "#privacidade" },
    { name: "Termos de Uso", href: "#termos" },
    { name: "Contato", href: "#contato" }
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-finance-blue to-finance-green flex items-center justify-center">
                <span className="text-white font-bold text-sm">FE</span>
              </div>
              <span className="text-xl font-bold">FinanceiroEdu</span>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Transforme sua vida financeira com educação prática. 
              Trilhas interativas, ferramentas úteis e conteúdo gratuito 
              para quem quer aprender educação financeira do zero.
            </p>
            <div className="flex space-x-4">
              <Button 
                size="lg" 
                className="bg-finance-green hover:bg-finance-green-dark text-white"
              >
                Começar Agora
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a 
                    href={resource.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-2">Newsletter Semanal</h3>
            <p className="text-gray-300 mb-4">
              Receba dicas de educação financeira direto no seu email
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-finance-blue"
              />
              <Button className="bg-finance-blue hover:bg-finance-blue-dark text-white">
                Inscrever
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 FinanceiroEdu. Todos os direitos reservados.
          </div>
          <div className="text-gray-400 text-sm mt-4 md:mt-0">
            Feito com ❤️ para sua educação financeira
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
