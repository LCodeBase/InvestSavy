import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Privacidade = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Política de Privacidade
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Última atualização: 31 de Maio de 2025
              </p>
            </div>

            <Card className="max-w-4xl mx-auto shadow-lg">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p>
                    A InvestSavy está comprometida em proteger sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nossa plataforma.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">1. Informações que Coletamos</h2>

                  <h3 className="text-xl font-semibold mt-6 mb-3">1.1. Informações fornecidas por você</h3>
                  <p>
                    Coletamos informações que você nos fornece diretamente, como:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Informações de registro (nome, e-mail, senha)</li>
                    <li>Informações de perfil (foto, dados demográficos, interesses)</li>
                    <li>Conteúdo gerado pelo usuário (comentários, avaliações)</li>
                    <li>Informações de pagamento (quando aplicável)</li>
                    <li>Comunicações com nossa equipe de suporte</li>
                  </ul>

                  <h3 className="text-xl font-semibold mt-6 mb-3">1.2. Informações coletadas automaticamente</h3>
                  <p>
                    Quando você utiliza nossa plataforma, coletamos automaticamente certas informações, incluindo:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Dados de uso (páginas visitadas, tempo gasto, cliques)</li>
                    <li>Informações do dispositivo (tipo, sistema operacional, navegador)</li>
                    <li>Endereço IP e localização aproximada</li>
                    <li>Cookies e tecnologias similares</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">2. Uso de Cookies</h2>
                  <p>
                    Utilizamos cookies e tecnologias similares para melhorar sua experiência em nossa plataforma. Os cookies são pequenos arquivos de texto armazenados em seu dispositivo que nos ajudam a:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Manter você conectado durante sua visita</li>
                    <li>Lembrar suas preferências e configurações</li>
                    <li>Entender como você utiliza nossa plataforma</li>
                    <li>Personalizar conteúdos e recomendações</li>
                    <li>Melhorar o desempenho e segurança do site</li>
                  </ul>
                  <p className="mt-4">
                    <strong>Nota sobre cookies no Brasil:</strong> De acordo com a legislação brasileira atual, especificamente a Lei Geral de Proteção de Dados (LGPD), não é obrigatório solicitar consentimento explícito para cookies essenciais ao funcionamento do site. No entanto, mantemos esta política de privacidade atualizada para informar sobre todos os tipos de cookies utilizados. Você pode configurar seu navegador para recusar cookies, mas isso pode afetar algumas funcionalidades da plataforma.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">3. Como Usamos Suas Informações</h2>
                  <p>
                    Utilizamos suas informações para os seguintes propósitos:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornecer, manter e melhorar nossa plataforma</li>
                    <li>Processar transações e gerenciar sua conta</li>
                    <li>Personalizar sua experiência e recomendações</li>
                    <li>Comunicar-nos com você sobre atualizações, promoções e novos recursos</li>
                    <li>Responder a suas solicitações e fornecer suporte</li>
                    <li>Analisar tendências de uso e melhorar nossos serviços</li>
                    <li>Detectar, prevenir e resolver problemas técnicos e de segurança</li>
                    <li>Cumprir obrigações legais</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">4. Compartilhamento de Informações</h2>
                  <p>
                    Podemos compartilhar suas informações nas seguintes circunstâncias:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Prestadores de serviços:</strong> Compartilhamos informações com empresas que nos auxiliam na operação da plataforma (processamento de pagamentos, análise de dados, hospedagem, suporte ao cliente).</li>
                    <li><strong>Parceiros de negócios:</strong> Podemos compartilhar informações com parceiros confiáveis para oferecer produtos ou serviços complementares.</li>
                    <li><strong>Conformidade legal:</strong> Podemos divulgar informações quando exigido por lei ou para proteger direitos, propriedade ou segurança.</li>
                    <li><strong>Transações corporativas:</strong> Em caso de fusão, aquisição ou venda de ativos, suas informações podem ser transferidas como parte da transação.</li>
                  </ul>
                  <p className="mt-4">
                    Não vendemos suas informações pessoais a terceiros para fins de marketing.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">5. Segurança das Informações</h2>
                  <p>
                    Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum sistema é completamente seguro, e não podemos garantir a segurança absoluta de suas informações.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">6. Seus Direitos e Escolhas</h2>
                  <p>
                    De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Acessar e receber uma cópia de suas informações pessoais</li>
                    <li>Corrigir informações imprecisas ou incompletas</li>
                    <li>Solicitar a exclusão de suas informações (com algumas exceções legais)</li>
                    <li>Restringir ou opor-se ao processamento de suas informações</li>
                    <li>Solicitar a portabilidade de seus dados</li>
                    <li>Retirar seu consentimento a qualquer momento</li>
                  </ul>
                  <p className="mt-4">
                    Para exercer esses direitos, entre em contato conosco através dos canais indicados no final desta política.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">7. Retenção de Dados</h2>
                  <p>
                    Mantemos suas informações pelo tempo necessário para cumprir os propósitos descritos nesta política, a menos que um período de retenção mais longo seja exigido ou permitido por lei.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">8. Transferências Internacionais</h2>
                  <p>
                    Suas informações podem ser transferidas e processadas em servidores localizados fora do Brasil. Garantimos que qualquer transferência internacional de dados seja realizada em conformidade com as leis de proteção de dados aplicáveis.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">9. Alterações nesta Política</h2>
                  <p>
                    Podemos atualizar esta Política de Privacidade periodicamente. A versão mais recente estará sempre disponível em nossa plataforma, com a data da última atualização. Recomendamos que você revise esta política regularmente.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">10. Contato</h2>
                  <p>
                    Se você tiver dúvidas, preocupações ou solicitações relacionadas a esta Política de Privacidade ou ao processamento de suas informações, entre em contato com nosso Encarregado de Proteção de Dados:
                  </p>
                  <p className="mt-4">
                    <strong>Email:</strong> <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsdCvKDKwNQLBVgzVScVncCVsbwXQWdHkzQhScZFrKvRBMlSfGccwLKbpJBMxXmwPLGDWFjb">contato@investsavy.online</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacidade;