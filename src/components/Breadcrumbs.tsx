import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const location = useLocation();
  
  // Gerar breadcrumbs automaticamente se não fornecidos
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathnames = location.pathname.split('/').filter(x => x);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    const routeNames: Record<string, string> = {
      'trilhas': 'Trilhas de Educação Financeira',
      'ferramentas': 'Calculadoras e Simuladores',
      'artigos': 'Artigos Financeiros',
      'sobre': 'Sobre Nós',
      'contato': 'Contato',
      'calculadora-aposentadoria': 'Calculadora de Aposentadoria',
      'calculadora-dividas': 'Calculadora de Dívidas',
      'simulador-juros-compostos': 'Simulador de Juros Compostos',
      'simulador-financiamento-imobiliario': 'Simulador de Financiamento',
      'calculadora-juros': 'Calculadora de Juros',
      'login': 'Login',
      'cadastro': 'Cadastro',
      'perfil': 'Meu Perfil',
      'ajuda': 'Ajuda',
      'privacidade': 'Política de Privacidade',
      'termos': 'Termos de Uso'
    };

    pathnames.forEach((pathname, index) => {
      const href = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      
      breadcrumbs.push({
        label: routeNames[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1),
        href: isLast ? undefined : href,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  // Não mostrar breadcrumbs na home
  if (location.pathname === '/') {
    return null;
  }

  // Gerar dados estruturados para SEO
  React.useEffect(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": item.href ? `https://www.investsavy.online${item.href}` : `https://www.investsavy.online${location.pathname}`
      }))
    };

    // Remover script anterior se existir
    const existingScript = document.querySelector('script[data-breadcrumb-schema]');
    if (existingScript) {
      existingScript.remove();
    }

    // Adicionar novo script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-breadcrumb-schema', 'true');
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-breadcrumb-schema]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [breadcrumbItems, location.pathname]);

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={`bg-gray-50 border-b border-gray-200 ${className}`}
    >
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" aria-hidden="true" />
              )}
              
              {item.href ? (
                <Link
                  to={item.href}
                  className="text-finance-blue hover:text-finance-blue-dark transition-colors duration-200 flex items-center"
                  title={`Ir para ${item.label}`}
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                  {item.label}
                </Link>
              ) : (
                <span 
                  className="text-gray-600 font-medium flex items-center"
                  aria-current="page"
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;