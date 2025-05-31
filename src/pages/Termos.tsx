import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Termos = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Termos de Uso
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Última atualização: 31 de Maio de 2025
              </p>
            </div>

            <Card className="max-w-4xl mx-auto shadow-lg">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p>
                    Bem-vindo à InvestSavy! Estes Termos de Uso ("Termos") regem seu acesso e uso da plataforma InvestSavy, incluindo nosso site, aplicativos, conteúdos e serviços (coletivamente, a "Plataforma"). Ao acessar ou utilizar nossa Plataforma, você concorda com estes Termos. Se você não concordar com estes Termos, por favor, não utilize nossa Plataforma.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceitação dos Termos</h2>
                  <p>
                    Ao acessar ou utilizar nossa Plataforma, você declara que tem pelo menos 18 anos de idade ou a maioridade legal em sua jurisdição, e que tem capacidade legal para aceitar estes Termos. Se você estiver acessando ou utilizando nossa Plataforma em nome de uma empresa ou outra entidade legal, você declara que tem autoridade para vincular essa entidade a estes Termos.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">2. Contas de Usuário</h2>
                  <p>
                    Para acessar determinados recursos da Plataforma, você precisará criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de conta e por todas as atividades que ocorrerem sob sua conta. Você concorda em:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornecer informações precisas, atualizadas e completas durante o processo de registro</li>
                    <li>Manter e atualizar prontamente suas informações de conta</li>
                    <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta ou qualquer outra violação de segurança</li>
                    <li>Ser o único responsável por todas as atividades realizadas em sua conta</li>
                  </ul>
                  <p className="mt-4">
                    Reservamo-nos o direito de desativar sua conta a qualquer momento, a nosso critério, por qualquer ou nenhum motivo, incluindo, mas não se limitando a, violação destes Termos.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">3. Conteúdo e Licenças</h2>

                  <h3 className="text-xl font-semibold mt-6 mb-3">3.1. Conteúdo da Plataforma</h3>
                  <p>
                    Todo o conteúdo disponibilizado através de nossa Plataforma, incluindo, mas não se limitando a, textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é de propriedade da InvestSavy ou de nossos licenciadores e está protegido por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
                  </p>
                  <p className="mt-4">
                    Concedemos a você uma licença limitada, não exclusiva, não transferível e revogável para acessar e utilizar o conteúdo da Plataforma apenas para fins pessoais e não comerciais, sujeito a estes Termos.
                  </p>

                  <h3 className="text-xl font-semibold mt-6 mb-3">3.2. Conteúdo do Usuário</h3>
                  <p>
                    Você pode ter a oportunidade de publicar, enviar ou compartilhar conteúdo na Plataforma, como comentários, avaliações ou materiais educacionais ("Conteúdo do Usuário"). Você mantém todos os direitos de propriedade sobre seu Conteúdo do Usuário, mas concede à InvestSavy uma licença mundial, não exclusiva, isenta de royalties, sublicenciável e transferível para usar, reproduzir, modificar, adaptar, publicar, traduzir, distribuir e exibir tal Conteúdo do Usuário em conexão com a operação e promoção de nossa Plataforma.
                  </p>
                  <p className="mt-4">
                    Você declara e garante que:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Você possui ou tem as licenças, direitos, consentimentos e permissões necessários para publicar o Conteúdo do Usuário</li>
                    <li>O Conteúdo do Usuário não viola os direitos de terceiros, incluindo direitos de propriedade intelectual e privacidade</li>
                    <li>O Conteúdo do Usuário não é difamatório, obsceno, ofensivo, fraudulento ou de outra forma ilegal ou prejudicial</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">4. Conduta do Usuário</h2>
                  <p>
                    Ao utilizar nossa Plataforma, você concorda em não:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violar quaisquer leis, regulamentos ou direitos de terceiros</li>
                    <li>Usar a Plataforma para qualquer finalidade ilegal ou não autorizada</li>
                    <li>Transmitir vírus, malware ou outros códigos maliciosos</li>
                    <li>Interferir ou interromper a integridade ou o desempenho da Plataforma</li>
                    <li>Coletar ou armazenar informações pessoais de outros usuários sem autorização</li>
                    <li>Personificar qualquer pessoa ou entidade, ou falsamente declarar sua afiliação</li>
                    <li>Enviar spam, correntes ou outros conteúdos não solicitados</li>
                    <li>Tentar acessar áreas restritas da Plataforma sem autorização</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">5. Pagamentos e Assinaturas</h2>
                  <p>
                    Alguns recursos da Plataforma podem exigir pagamento ou assinatura. Ao adquirir um plano pago, você concorda em:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornecer informações de pagamento precisas e completas</li>
                    <li>Autorizar-nos a cobrar o método de pagamento fornecido</li>
                    <li>Manter suas informações de pagamento atualizadas</li>
                  </ul>
                  <p className="mt-4">
                    As assinaturas são renovadas automaticamente, a menos que você cancele antes do próximo ciclo de faturamento. Você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta. Os reembolsos são processados de acordo com nossa política de reembolso, disponível em nossa Central de Ajuda.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">6. Isenção de Responsabilidade</h2>
                  <p>
                    O conteúdo educacional fornecido em nossa Plataforma é apenas para fins informativos e educacionais. Não constitui aconselhamento financeiro, jurídico ou fiscal. Você deve consultar profissionais qualificados antes de tomar decisões financeiras ou de investimento.
                  </p>
                  <p className="mt-4">
                    A PLATAFORMA É FORNECIDA "COMO ESTÁ" E "CONFORME DISPONÍVEL", SEM GARANTIAS DE QUALQUER TIPO, EXPRESSAS OU IMPLÍCITAS. NÃO GARANTIMOS QUE A PLATAFORMA SERÁ ININTERRUPTA, SEGURA OU LIVRE DE ERROS.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">7. Limitação de Responsabilidade</h2>
                  <p>
                    EM NENHUMA CIRCUNSTÂNCIA A INVESTSAVY, SEUS DIRETORES, FUNCIONÁRIOS, PARCEIROS OU AGENTES SERÃO RESPONSÁVEIS POR QUAISQUER DANOS INDIRETOS, INCIDENTAIS, ESPECIAIS, CONSEQUENCIAIS OU PUNITIVOS, INCLUINDO, SEM LIMITAÇÃO, PERDA DE LUCROS, DADOS, USO, BOA VONTADE OU OUTRAS PERDAS INTANGÍVEIS, RESULTANTES DE:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Seu acesso ou uso ou incapacidade de acessar ou usar a Plataforma</li>
                    <li>Qualquer conduta ou conteúdo de terceiros na Plataforma</li>
                    <li>Conteúdo obtido da Plataforma</li>
                    <li>Acesso não autorizado, uso ou alteração de suas transmissões ou conteúdo</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">8. Indenização</h2>
                  <p>
                    Você concorda em defender, indenizar e isentar a InvestSavy, seus diretores, funcionários, parceiros e agentes de e contra quaisquer reclamações, responsabilidades, danos, perdas e despesas, incluindo, sem limitação, honorários advocatícios razoáveis, decorrentes de ou de qualquer forma relacionados com:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Seu acesso ou uso da Plataforma</li>
                    <li>Seu Conteúdo do Usuário</li>
                    <li>Sua violação destes Termos</li>
                    <li>Sua violação de quaisquer direitos de terceiros</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">9. Modificações dos Termos</h2>
                  <p>
                    Reservamo-nos o direito de modificar estes Termos a qualquer momento. Se fizermos alterações materiais, notificaremos você por meio de um aviso em nossa Plataforma ou por outros meios. Seu uso continuado da Plataforma após tais modificações constitui sua aceitação dos Termos revisados.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">10. Lei Aplicável e Resolução de Disputas</h2>
                  <p>
                    Estes Termos são regidos pelas leis do Brasil. Qualquer disputa decorrente ou relacionada a estes Termos será submetida à jurisdição exclusiva dos tribunais da cidade de São Paulo, SP.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">11. Disposições Gerais</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Acordo Integral:</strong> Estes Termos constituem o acordo integral entre você e a InvestSavy em relação ao uso da Plataforma.</li>
                    <li><strong>Renúncia e Separabilidade:</strong> A falha da InvestSavy em exercer qualquer direito não constituirá renúncia. Se qualquer disposição destes Termos for considerada inválida ou inexequível, as demais disposições permanecerão em pleno vigor e efeito.</li>
                    <li><strong>Cessão:</strong> Você não pode ceder estes Termos sem o consentimento prévio por escrito da InvestSavy. A InvestSavy pode ceder estes Termos sem restrições.</li>
                    <li><strong>Força Maior:</strong> A InvestSavy não será responsável por qualquer falha ou atraso no cumprimento de suas obrigações devido a causas além de seu controle razoável.</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">12. Contato</h2>
                  <p>
                    Se você tiver dúvidas sobre estes Termos, entre em contato conosco:
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

export default Termos;