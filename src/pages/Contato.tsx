
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Mail, MessageCircle, Send, Check } from 'lucide-react';

const Contato = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria integrado com backend/email service
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <Layout>
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Fale Comigo
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tem dúvidas, sugestões ou quer compartilhar sua experiência financeira? 
              Adoraria conversar com você!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulário */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envie sua Mensagem
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="Como posso te chamar?"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Seu E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Sua Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-none"
                    placeholder="Conte sua dúvida, sugestão ou experiência..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center disabled:bg-green-600"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Mensagem Enviada!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Informações */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Vamos Conversar?
              </h2>
              
              <div className="bg-blue-50 rounded-2xl p-8 mb-8">
                <MessageCircle className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  Tem Dúvidas ou Sugestões?
                </h3>
                <p className="text-blue-800 mb-4">
                  Adoraria saber sua opinião sobre o conteúdo, suas dúvidas financeiras 
                  ou sugestões de melhorias para o site.
                </p>
                <ul className="space-y-2 text-blue-700">
                  <li>💡 Sugestões de novos conteúdos</li>
                  <li>🧮 Ideias para novas calculadoras</li>
                  <li>❓ Dúvidas sobre finanças pessoais</li>
                  <li>📖 Sugestões de livros ou cursos</li>
                  <li>🤝 Parcerias e colaborações</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Redes Sociais
                </h3>
                <p className="text-gray-600 mb-6">
                  Siga o InvestSavy nas redes sociais para acompanhar dicas diárias 
                  e discussões sobre educação financeira.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-white rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">in</span>
                    </div>
                    <span className="text-gray-700">Em breve no LinkedIn</span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold text-sm">📱</span>
                    </div>
                    <span className="text-gray-700">Em breve no Instagram</span>
                  </div>
                  <div className="flex items-center p-3 bg-white rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold text-sm">YT</span>
                    </div>
                    <span className="text-gray-700">Em breve no YouTube</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tempo de Resposta */}
          <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ⏰ Tempo de Resposta
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Faço questão de responder pessoalmente todas as mensagens. 
              Normalmente respondo em até 24 horas nos dias úteis. 
              Sua mensagem é importante para mim!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contato;
