import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Twitter, Instagram, Facebook,
  CheckCircle2, AlertCircle
} from "lucide-react";
import emailjs from '@emailjs/browser';
import { Alert, AlertDescription } from "@/components/ui/alert";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor, informe seu email");
      return;
    }

    const userName = email.split('@')[0];

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (formRef.current) {
        const formData = new FormData(formRef.current);

        const createHiddenInput = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          return input;
        };

        if (!formData.has('to_email')) {
          formRef.current.appendChild(createHiddenInput('to_email', email));
        }

        if (!formData.has('to_name')) {
          formRef.current.appendChild(createHiddenInput('to_name', userName));
        }

        if (!formData.has('from_name')) {
          formRef.current.appendChild(createHiddenInput('from_name', 'InvestSavy'));
        }

        if (!formData.has('subject')) {
          formRef.current.appendChild(createHiddenInput('subject', 'Confirmação de Inscrição na Newsletter'));
        }

        if (!formData.has('message')) {
          formRef.current.appendChild(createHiddenInput(
            'message',
            `Olá ${userName}, obrigado por se inscrever!`
          ));
        }
      }

      const result = await emailjs.sendForm(
        'service_uurbxyi',
        'template_e7gq7d8',
        formRef.current!,
        { publicKey: 'X5oQZHr3Cd7oC7SNZ' }
      );

      if (result.text === "OK") {
        setSuccess(true);
        setEmail("");
      } else {
        throw new Error("Falha ao enviar email");
      }
    } catch (err) {
      console.error('EmailJS error:', err);
      setError(err instanceof Error ? err.message : "Erro ao enviar email");
    } finally {
      setLoading(false);

      // Remove os campos ocultos temporários
      if (formRef.current) {
        const hiddenInputs = formRef.current.querySelectorAll('input[type="hidden"]');
        hiddenInputs.forEach(input => {
          if ((input as HTMLInputElement).name !== 'user_email') {
            input.remove();
          }
        });
      }
    }
  };

  const quickLinks = [
    { name: "Trilhas", href: "#trilhas" },
    { name: "Ferramentas", href: "#ferramentas" },
    { name: "Artigos", href: "#artigos" },
    { name: "Sobre", href: "#sobre" }
  ];

  const resources = [
    { name: "Central de Ajuda", href: "/ajuda" },
    { name: "Política de Privacidade", href: "/privacidade" },
    { name: "Termos de Uso", href: "/termos" },
    { name: "Contato", href: "/contato" }
  ];

  const socialLinks = [
    { name: "Twitter", href: "https://twitter.com/investsavy", icon: <Twitter className="h-5 w-5 mr-2" /> },
    { name: "Instagram", href: "https://instagram.com/investsavy", icon: <Instagram className="h-5 w-5 mr-2" /> },
    { name: "Facebook", href: "https://facebook.com/investsavy", icon: <Facebook className="h-5 w-5 mr-2" /> },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
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
                  <a href={resource.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-2">Newsletter Semanal</h3>
              <p className="text-gray-300 mb-4">
                Receba dicas de educação financeira direto no seu email
              </p>

              {success && (
                <Alert className="mb-4 bg-green-800/20 border border-green-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-400 ml-2">
                    Inscrição realizada com sucesso!
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="mb-4 bg-red-800/20 border border-red-600">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-400 ml-2">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <form ref={formRef} onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  name="user_email"
                  placeholder="Seu melhor email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-finance-blue"
                />
                <Button
                  type="submit"
                  className="bg-finance-blue hover:bg-finance-blue-dark text-white"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">Enviando...</span>
                  ) : (
                    <span className="flex items-center">Inscrever</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2025 InvestSavy. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
