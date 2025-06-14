
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { FileText, Clock, Mail, AlertTriangle } from 'lucide-react';

const TermosUso = () => {
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
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Termos de Uso
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ao acessar e usar o InvestSavy, você concorda com os termos e condições 
              descritos neste documento.
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
                  Aceitação dos Termos
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Ao acessar e usar o site InvestSavy ("nós", "nosso" ou "Serviço"), você concorda 
                    em ficar vinculado a estes Termos de Uso ("Termos").
                  </p>
                  <p>
                    Se você não concordar com qualquer parte destes termos, então você não pode 
                    acessar o Serviço.
                  </p>
                  <p>
                    Estes Termos se aplicam a todos os visitantes, usuários e outras pessoas que 
                    acessam ou usam o Serviço.
                  </p>
                </div>
              </section>

              {/* Seção 2 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  Descrição do Serviço
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    O InvestSavy é uma plataforma educacional que oferece:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Conteúdo educacional sobre educação financeira</li>
                    <li>Ferramentas de cálculo financeiro</li>
                    <li>Artigos e notícias relacionadas a finanças</li>
                    <li>Informações sobre investimentos e economia</li>
                  </ul>
                  <p>
                    Nosso objetivo é fornecer educação financeira acessível e de qualidade para todos.
                  </p>
                </div>
              </section>

              {/* Seção 3 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">3</span>
                  </div>
                  Uso Aceitável
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Você concorda em usar o Serviço apenas para fins legais e de acordo com estes Termos. 
                    Você concorda em não usar o Serviço:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Para qualquer propósito ilegal ou para solicitar outros a realizar atos ilegais</li>
                    <li>Para violar qualquer regulamentação, regra, lei ou ordenança local</li>
                    <li>Para infringir ou violar nossos direitos de propriedade intelectual ou os direitos de terceiros</li>
                    <li>Para assediar, abusar, insultar, prejudicar, difamar, caluniar, depreciar, intimidar ou discriminar</li>
                    <li>Para enviar informações falsas ou enganosas</li>
                    <li>Para fazer upload ou transmitir vírus ou qualquer outro tipo de código malicioso</li>
                  </ul>
                </div>
              </section>

              {/* Seção 4 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">4</span>
                  </div>
                  Contas de Usuário
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Quando você cria uma conta conosco, deve fornecer informações precisas, completas e atuais.
                  </p>
                  <p>
                    Você é responsável por manter a confidencialidade de sua conta e senha e por restringir 
                    o acesso ao seu computador e conta.
                  </p>
                  <p>
                    Você concorda em aceitar a responsabilidade por todas as atividades que ocorrem sob 
                    sua conta ou senha.
                  </p>
                </div>
              </section>

              {/* Seção 5 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">5</span>
                  </div>
                  Conteúdo e Propriedade Intelectual
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    O Serviço e seu conteúdo original, recursos e funcionalidade são e permanecerão 
                    propriedade exclusiva do InvestSavy e seus licenciadores.
                  </p>
                  <p>
                    O Serviço é protegido por direitos autorais, marcas comerciais e outras leis. 
                    Nossos nomes comerciais e marcas não podem ser usados sem nossa permissão prévia por escrito.
                  </p>
                </div>
              </section>

              {/* Seção 6 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">6</span>
                  </div>
                  Isenção de Responsabilidade
                </h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                  <div className="flex items-start">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p className="font-semibold text-gray-900">
                        IMPORTANTE: Finalidade Educacional
                      </p>
                      <p>
                        O conteúdo fornecido no InvestSavy é apenas para fins educacionais e informativos. 
                        Não constitui aconselhamento financeiro, de investimento ou legal.
                      </p>
                      <p>
                        Você deve sempre consultar um profissional qualificado antes de tomar qualquer 
                        decisão financeira ou de investimento.
                      </p>
                      <p>
                        Não nos responsabilizamos por quaisquer perdas ou danos resultantes do uso 
                        das informações fornecidas em nosso site.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Seção 7 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">7</span>
                  </div>
                  Limitação de Responsabilidade
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Em nenhum caso o InvestSavy, nem seus diretores, funcionários, parceiros, agentes, 
                    fornecedores ou afiliados serão responsáveis por quaisquer danos indiretos, incidentais, 
                    especiais, consequenciais ou punitivos.
                  </p>
                  <p>
                    Isso inclui, sem limitação, perda de lucros, dados, uso, boa vontade ou outras 
                    perdas intangíveis, resultantes do seu acesso ou uso ou incapacidade de acessar 
                    ou usar o Serviço.
                  </p>
                </div>
              </section>

              {/* Seção 8 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">8</span>
                  </div>
                  Modificações dos Termos
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Reservamos o direito, a nosso exclusivo critério, de modificar ou substituir 
                    estes Termos a qualquer momento.
                  </p>
                  <p>
                    Se uma revisão for material, tentaremos fornecer pelo menos 30 dias de aviso 
                    antes que os novos termos entrem em vigor.
                  </p>
                  <p>
                    Seu uso continuado do Serviço após tais modificações constitui aceitação dos novos Termos.
                  </p>
                </div>
              </section>

              {/* Seção 9 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">9</span>
                  </div>
                  Rescisão
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Podemos encerrar ou suspender sua conta imediatamente, sem aviso prévio ou responsabilidade, 
                    por qualquer motivo, incluindo, sem limitação, se você violar os Termos.
                  </p>
                  <p>
                    Após a rescisão, seu direito de usar o Serviço cessará imediatamente.
                  </p>
                </div>
              </section>

              {/* Seção 10 */}
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600 font-bold text-sm">10</span>
                  </div>
                  Lei Aplicável
                </h2>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>
                    Estes Termos serão interpretados e regidos de acordo com as leis do Brasil, 
                    sem levar em conta suas disposições de conflito de leis.
                  </p>
                  <p>
                    Nossa falha em fazer cumprir qualquer direito ou disposição destes Termos não 
                    será considerada uma renúncia a esses direitos.
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
                    Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco:
                  </p>
                  <ul className="space-y-2">
                    <li><strong>E-mail:</strong> legal@investsavy.com</li>
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

export default TermosUso;
