
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Shield, Clock, Mail, Eye } from 'lucide-react';

const PoliticaPrivacidade = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Sua privacidade é importante para nós. Esta política descreve como coletamos, 
              usamos e protegemos suas informações pessoais.
            </p>
            <div className="flex items-center justify-center mt-6 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              Última atualização: Janeiro de 2025
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-12">
              {/* Seção 1 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">1</span>
                  </div>
                  Informações que Coletamos
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Coletamos informações que você nos fornece diretamente, como quando você:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Cria uma conta em nosso site</li>
                    <li>Preenche formulários de contato</li>
                    <li>Se inscreve em nossa newsletter</li>
                    <li>Utiliza nossas ferramentas de cálculo financeiro</li>
                    <li>Interage com nosso conteúdo ou serviços</li>
                  </ul>
                  <p>
                    As informações podem incluir seu nome, endereço de e-mail, informações demográficas 
                    e outras informações relevantes para pesquisas e ofertas de clientes.
                  </p>
                </div>
              </section>

              {/* Seção 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  Como Usamos suas Informações
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Utilizamos as informações coletadas para:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Fornecer e melhorar nossos serviços</li>
                    <li>Personalizar sua experiência em nosso site</li>
                    <li>Enviar informações sobre educação financeira</li>
                    <li>Responder às suas solicitações e fornecer suporte</li>
                    <li>Analisar como nosso site é usado para melhorias</li>
                    <li>Cumprir obrigações legais</li>
                  </ul>
                </div>
              </section>

              {/* Seção 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  Compartilhamento de Informações
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Não vendemos, comercializamos ou transferimos suas informações pessoais para terceiros, 
                    exceto nas seguintes situações:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Com seu consentimento explícito</li>
                    <li>Para cumprir obrigações legais</li>
                    <li>Para proteger nossos direitos e propriedade</li>
                    <li>Com provedores de serviços confiáveis que nos ajudam a operar nosso site</li>
                  </ul>
                </div>
              </section>

              {/* Seção 4 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">4</span>
                  </div>
                  Segurança dos Dados
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Implementamos medidas de segurança apropriadas para proteger suas informações pessoais contra:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Acesso não autorizado</li>
                    <li>Alteração, divulgação ou destruição</li>
                    <li>Processamento ilegal</li>
                    <li>Perda acidental</li>
                  </ul>
                  <p>
                    Utilizamos criptografia SSL para proteger informações sensíveis transmitidas online 
                    e mantemos medidas de segurança físicas, eletrônicas e gerenciais.
                  </p>
                </div>
              </section>

              {/* Seção 5 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">5</span>
                  </div>
                  Seus Direitos
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Confirmar a existência de tratamento de seus dados</li>
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
                    <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
                    <li>Revogar o consentimento</li>
                    <li>Obter informações sobre compartilhamento de dados</li>
                  </ul>
                </div>
              </section>

              {/* Seção 6 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">6</span>
                  </div>
                  Cookies e Tecnologias Similares
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Utilizamos cookies para melhorar sua experiência em nosso site. Os cookies nos ajudam a:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Lembrar suas preferências</li>
                    <li>Entender como você usa nosso site</li>
                    <li>Personalizar conteúdo e anúncios</li>
                    <li>Analisar o tráfego do site</li>
                  </ul>
                  <p>
                    Você pode controlar o uso de cookies através das configurações do seu navegador.
                  </p>
                </div>
              </section>

              {/* Seção 7 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">7</span>
                  </div>
                  Alterações nesta Política
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Podemos atualizar esta Política de Privacidade periodicamente. Quando fizermos alterações, 
                    atualizaremos a data da última modificação no topo desta página.
                  </p>
                  <p>
                    Recomendamos que você revise esta política regularmente para se manter informado sobre 
                    como protegemos suas informações.
                  </p>
                </div>
              </section>

              {/* Contato */}
              <section className="bg-green-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Mail className="w-6 h-6 text-green-600 mr-3" />
                  Entre em Contato
                </h2>
                <div className="text-gray-700 leading-relaxed">
                  <p className="mb-4">
                    Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
                    seus dados pessoais, entre em contato conosco:
                  </p>
                  <ul className="space-y-2">
                    <li><strong>E-mail:</strong> privacidade@investsavy.com</li>
                    <li><strong>Telefone:</strong> (11) 1234-5678</li>
                    <li><strong>Endereço:</strong> São Paulo, SP - Brasil</li>
                  </ul>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default PoliticaPrivacidade;
