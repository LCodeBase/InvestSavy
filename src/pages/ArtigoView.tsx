import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, User, Calendar, Tag, ArrowLeft } from "lucide-react";

// Interface para os artigos
interface Artigo {
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  content?: string; // Conteúdo completo do artigo
}

const ArtigoView = () => {
  const { id } = useParams<{ id: string }>();
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando busca de dados do artigo
    // Em um ambiente real, você buscaria esses dados de uma API ou banco de dados
    const artigos = [
      {
        id: "0",
        title: "O Roubo que Ninguém Liga: O Escândalo Bilionário do INSS",
        description: "Neste artigo, você entende como esse golpe foi possível, quem são os envolvidos, quais os impactos para o país e por que a sociedade precisa acordar agora.",
        image: "https://www.jornalopcao.com.br/assets/2024/07/PREVIDENCIA_INSS-1536x768-1.jpg",
        category: "economia",
        author: "Leonardo Figueiredo",
        date: "02 de Junho, 2025",
        readTime: "10 min de leitura",
        featured: true,
        content: `
          <div class="article-content">
            <p class="text-lg mb-4">
              Nos últimos meses, o Brasil se deparou com mais um escândalo de corrupção — desta vez, dentro de um dos órgãos mais importantes da estrutura social brasileira: o <strong>INSS</strong> (Instituto Nacional do Seguro Social). Investigações apontam que <strong>mais de R$ 1 bilhão</strong> foram desviados por meio de <em>benefícios irregulares</em>, <em>fraudes sistemáticas</em> e <em>envolvimento de servidores públicos e quadrilhas especializadas</em>.
            </p>

            <p class="text-lg mb-6">
              O mais preocupante? A maioria da população <strong>não está prestando atenção</strong>. Em meio ao barulho político e polêmicas do dia a dia, o rombo bilionário na Previdência — que afeta diretamente trabalhadores, aposentados e pensionistas — passa quase despercebido.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. O que é o INSS e sua importância</h2>
            <p class="mb-4">O INSS é responsável por pagar aposentadorias, pensões, auxílios-doença e outros benefícios. Movimenta centenas de bilhões de reais ao ano e sustenta a base previdenciária do país. Com déficits constantes, cada desvio representa menos recursos para quem mais precisa.</p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. O escândalo: como começou e o que foi descoberto</h2>
            <p class="mb-2">A Polícia Federal descobriu fraudes envolvendo:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Documentos falsos para liberar benefícios</li>
              <li class="mb-1">Pagamentos a pessoas falecidas</li>
              <li class="mb-1">Corrupção interna de servidores</li>
              <li class="mb-1">Advogados especializados em burlar o sistema</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Os números do escândalo</h2>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1"><strong>R$ 1,1 bilhão</strong> desviados identificados</li>
              <li class="mb-1"><strong>95 mil</strong> benefícios fraudulentos</li>
              <li class="mb-1"><strong>700</strong> servidores envolvidos</li>
              <li class="mb-1"><strong>Centenas</strong> de prisões e investigações em andamento</li>
            </ul>

            <div class="my-8 text-center">
              <img src="https://thenews.waffle.com.br/_next/image?url=https%3A%2F%2Fwaffle-prod.s3.amazonaws.com%2Fapp%2Fuploads%2F2025%2F04%2F25111702%2Fimage-338.png&w=3840&q=75" alt="Gráfico de Fraudes INSS" class="max-w-full mx-auto rounded" style="max-width: 500px;">
              <p class="text-sm text-gray-500 mt-2">Gráfico ilustrativo: escândalo envolve fraudes bilionárias.</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Impactos diretos e indiretos</h2>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Prejuízo direto à Previdência Social</li>
              <li class="mb-1">Filas de espera para quem precisa de verdade</li>
              <li class="mb-1">Desconfiança da população com o sistema público</li>
              <li class="mb-1">Perda de credibilidade institucional</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Por que a população não está reagindo?</h2>
            <p class="mb-2">O silêncio social pode ser explicado por:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Fadiga de escândalos</li>
              <li class="mb-1">Mídia focada em temas mais "palatáveis"</li>
              <li class="mb-1">Complexidade do tema da Previdência</li>
              <li class="mb-1">Ideia de que "isso não me afeta"</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. O que precisa mudar</h2>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Auditorias permanentes e públicas</li>
              <li class="mb-1">Sistemas modernos com validação digital</li>
              <li class="mb-1">Punições severas e transparentes</li>
              <li class="mb-1">Educação da população sobre seus direitos</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Conclusão</h2>
            <blockquote class="italic border-l-4 border-gray-300 pl-4 py-2 my-6 text-gray-600">
              O escândalo do INSS é um roubo bilionário institucionalizado. Ignorá-lo é permitir que a Previdência continue sendo saqueada. Se esse tipo de crime não nos choca mais, o que ainda seria capaz de parar o Brasil?
            </blockquote>

            <hr class="my-10 border-t border-gray-200">
          </div>
        `
      },
      // ... existing code ...
      {
        id: "1",
        title: "Investimentos em Renda Fixa: Guia para Iniciantes",
        description: "Descubra como começar a investir em renda fixa, entenda os diferentes tipos de investimentos disponíveis e aprenda estratégias para maximizar seus rendimentos com segurança.",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        category: "investimentos",
        author: "Leonardo Figueiredo",
        date: "15 de Junho, 2025",
        readTime: "8 min de leitura",
        featured: true,
        content: `
    <div class="article-content">
      <p class="text-lg mb-4">
        Em um cenário econômico de juros elevados, com a taxa Selic em <strong>12,00% ao ano</strong> (projeção para 2025), os investimentos em renda fixa voltaram a ganhar destaque no mercado financeiro brasileiro. Para quem está começando a jornada de investimentos, a renda fixa oferece uma combinação atraente de <em>segurança</em>, <em>previsibilidade</em> e <em>rentabilidade</em> que pode ser o ponto de partida ideal para construir um patrimônio sólido.
      </p>

      <p class="text-lg mb-6">
        Neste guia completo, vamos desmistificar o universo da renda fixa e mostrar como você pode começar a investir mesmo com pouco dinheiro, entendendo os diferentes tipos de investimentos disponíveis e as estratégias para maximizar seus rendimentos.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. O que é Renda Fixa?</h2>
      <p class="mb-4">A renda fixa é uma classe de investimentos na qual as regras de remuneração são especificadas previamente. Isso significa que, ao investir, você já sabe antecipadamente quais serão os lucros a receber no futuro, ou ao menos qual indicador financeiro será utilizado para definir a rentabilidade.</p>
      <p class="mb-4">Quando você investe em renda fixa, está essencialmente emprestando seu dinheiro para o emissor do título (governo, banco ou empresa), que se compromete a devolver o valor aplicado acrescido de juros após um período determinado.</p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Principais Tipos de Investimentos em Renda Fixa</h2>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-3"><strong>Tesouro Direto:</strong> Títulos emitidos pelo governo federal, considerados os mais seguros do mercado. Incluem o Tesouro Selic (ideal para reserva de emergência), Tesouro IPCA+ (proteção contra inflação) e Tesouro Prefixado.</li>
        <li class="mb-3"><strong>CDBs (Certificados de Depósito Bancário):</strong> Emitidos por bancos, funcionam como empréstimos que você faz à instituição financeira. Contam com a proteção do FGC (Fundo Garantidor de Créditos) até R$ 250 mil por CPF e instituição.</li>
        <li class="mb-3"><strong>LCI e LCA (Letras de Crédito Imobiliário e do Agronegócio):</strong> Títulos emitidos por bancos para financiar os setores imobiliário e agrícola, respectivamente. São isentos de Imposto de Renda para pessoas físicas e também contam com a proteção do FGC.</li>
        <li class="mb-3"><strong>Debêntures:</strong> Títulos de dívida emitidos por empresas para captar recursos. Oferecem rentabilidade maior, mas também maior risco.</li>
        <li class="mb-3"><strong>CRIs e CRAs (Certificados de Recebíveis Imobiliários e do Agronegócio):</strong> Títulos lastreados em recebíveis dos setores imobiliário e agrícola. Também são isentos de IR para pessoas físicas.</li>
      </ul>

      <div class="my-8 text-center">
        <img src="https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Gráfico de Investimentos" class="max-w-full mx-auto rounded" style="max-width: 500px;">
        <p class="text-sm text-gray-500 mt-2">Diversificação é essencial para uma carteira de investimentos equilibrada.</p>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Entendendo os Tipos de Rentabilidade</h2>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-3"><strong>Prefixada:</strong> A taxa de juros é definida no momento da aplicação. Você sabe exatamente quanto vai receber no vencimento.</li>
        <li class="mb-3"><strong>Pós-fixada:</strong> A rentabilidade está atrelada a um indexador, como a Selic (CDI) ou a inflação (IPCA). O rendimento final dependerá da variação desse indexador durante o período do investimento.</li>
        <li class="mb-3"><strong>Híbrida:</strong> Combina características dos dois tipos anteriores, como IPCA + taxa prefixada.</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Por Onde Começar?</h2>
      <p class="mb-4">Para quem está iniciando no mundo dos investimentos em renda fixa, uma estratégia recomendada é:</p>
      <ol class="list-decimal pl-8 mb-6">
        <li class="mb-2"><strong>Monte sua reserva de emergência:</strong> Comece investindo em títulos de alta liquidez e baixo risco, como o Tesouro Selic. O ideal é acumular entre 3 a 6 meses de suas despesas mensais.</li>
        <li class="mb-2"><strong>Diversifique gradualmente:</strong> Após constituir sua reserva, comece a diversificar com CDBs, LCIs e LCAs para aumentar a rentabilidade.</li>
        <li class="mb-2"><strong>Proteja-se da inflação:</strong> Inclua títulos indexados à inflação, como o Tesouro IPCA+, para preservar o poder de compra do seu dinheiro no longo prazo.</li>
        <li class="mb-2"><strong>Avance para títulos corporativos:</strong> Com mais experiência, considere debêntures, CRIs e CRAs para melhorar o rendimento da sua carteira.</li>
      </ol>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Dicas Importantes para Investidores Iniciantes</h2>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2"><strong>Compare as taxas:</strong> Verifique a rentabilidade líquida (descontando impostos e taxas) antes de investir.</li>
        <li class="mb-2"><strong>Atenção ao prazo:</strong> Investimentos com prazos mais longos geralmente oferecem rentabilidades maiores, mas exigem que você fique mais tempo sem acesso ao dinheiro.</li>
        <li class="mb-2"><strong>Liquidez x Rentabilidade:</strong> Investimentos mais líquidos (que permitem resgate a qualquer momento) costumam render menos que os de prazo fixo.</li>
        <li class="mb-2"><strong>Diversifique emissores:</strong> Não concentre todos os seus investimentos em um único banco ou empresa.</li>
        <li class="mb-2"><strong>Fique atento à tributação:</strong> O Imposto de Renda sobre investimentos em renda fixa varia de 22,5% a 15%, dependendo do prazo (quanto maior o prazo, menor a alíquota).</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Erros Comuns a Evitar</h2>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2">Deixar dinheiro parado na poupança quando existem alternativas mais rentáveis e igualmente seguras.</li>
        <li class="mb-2">Resgatar investimentos antes do prazo ideal, perdendo rentabilidade.</li>
        <li class="mb-2">Não considerar a inflação ao avaliar a rentabilidade real dos investimentos.</li>
        <li class="mb-2">Concentrar todos os recursos em um único tipo de investimento.</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Conclusão</h2>
      <blockquote class="italic border-l-4 border-gray-300 pl-4 py-2 my-6 text-gray-600">
        Investir em renda fixa é um excelente ponto de partida para quem deseja começar a construir um patrimônio com segurança. Em 2025, com a taxa Selic projetada em 12,00% ao ano e a inflação em 4,10%, os investimentos em renda fixa oferecem oportunidades interessantes de rentabilidade real positiva. O segredo está em começar com pequenos valores, diversificar gradualmente e manter a disciplina ao longo do tempo.
      </blockquote>

      <hr class="my-10 border-t border-gray-200">
    </div>
  `
      },
      {
        id: "2",
        title: "Entendendo a Taxa Selic e seu Impacto nos Investimentos",
        description: "Descubra o que é a taxa Selic, como ela é definida, por que é considerada a taxa básica de juros da economia brasileira e como suas variações afetam seus investimentos e decisões financeiras.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "economia",
        author: "Leonardo Figueiredo",
        date: "18 de Junho, 2025",
        readTime: "9 min de leitura",
        featured: true,
        content: `
          <div class="article-content">
            <p class="text-lg mb-4">
              A taxa Selic é provavelmente o termo econômico mais mencionado quando se fala sobre investimentos no Brasil. Atualmente em <strong>11,25% ao ano</strong> (junho de 2025), ela influencia desde o rendimento da sua aplicação financeira até o valor das parcelas do seu financiamento imobiliário. Mas afinal, o que é exatamente a taxa Selic e por que ela é tão importante para suas decisões financeiras?
            </p>

            <p class="text-lg mb-6">
              Neste artigo, vamos desvendar os mistérios da taxa básica de juros brasileira, explicando como ela funciona, como é definida e, principalmente, qual o seu impacto direto nos seus investimentos e no seu bolso.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. O que é a Taxa Selic?</h2>
            <p class="mb-4">A Selic (Sistema Especial de Liquidação e Custódia) é a taxa básica de juros da economia brasileira. O nome vem do sistema eletrônico que registra todas as operações com títulos públicos federais no Brasil.</p>
            <p class="mb-4">Existem dois conceitos importantes:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Selic Meta:</strong> É a taxa de juros estabelecida pelo Copom (Comitê de Política Monetária) a cada 45 dias. Esta é a taxa que geralmente aparece nos noticiários.</li>
              <li class="mb-2"><strong>Selic Efetiva (ou Over):</strong> É a taxa média das operações diárias com títulos públicos no mercado interbancário, que tende a se aproximar da meta estabelecida.</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Como a Taxa Selic é Definida?</h2>
            <p class="mb-4">A definição da taxa Selic é responsabilidade do Copom, que se reúne a cada 45 dias para avaliar a conjuntura econômica e decidir se mantém, aumenta ou reduz a taxa. Esta decisão leva em consideração diversos fatores:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Inflação atual e projetada:</strong> O principal objetivo é manter a inflação dentro da meta estabelecida pelo Conselho Monetário Nacional.</li>
              <li class="mb-2"><strong>Atividade econômica:</strong> Crescimento do PIB, taxa de desemprego e nível de utilização da capacidade produtiva.</li>
              <li class="mb-2"><strong>Cenário internacional:</strong> Taxas de juros em outros países, fluxo de capitais e preços de commodities.</li>
              <li class="mb-2"><strong>Situação fiscal do país:</strong> Nível de endividamento público e equilíbrio das contas governamentais.</li>
            </ul>

            <div class="my-8 text-center">
              <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Banco Central do Brasil" class="max-w-full mx-auto rounded" style="max-width: 500px;">
              <p class="text-sm text-gray-500 mt-2">O Banco Central utiliza a taxa Selic como principal instrumento de política monetária.</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. A Relação entre Selic e Inflação</h2>
            <p class="mb-4">A taxa Selic é o principal instrumento de controle da inflação no Brasil. O mecanismo funciona assim:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Selic alta:</strong> Encarece o crédito, desestimula o consumo e os investimentos produtivos, reduzindo a pressão sobre os preços.</li>
              <li class="mb-2"><strong>Selic baixa:</strong> Barateia o crédito, estimula o consumo e os investimentos, podendo aumentar a pressão inflacionária se a economia já estiver aquecida.</li>
            </ul>
            <p class="mb-4">Em 2025, com a inflação projetada em 4,10% e a Selic em 11,25%, temos um juro real (descontada a inflação) de aproximadamente 7,15%, um dos mais altos do mundo.</p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Como a Selic Afeta seus Investimentos</h2>
            <p class="mb-4">A taxa Selic influencia praticamente todos os investimentos disponíveis no mercado:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3"><strong>Renda Fixa:</strong>
                <ul class="list-circle pl-6 mt-1">
                  <li><strong>Tesouro Selic:</strong> Acompanha diretamente a taxa Selic, sendo um dos investimentos mais seguros em períodos de alta de juros.</li>
                  <li><strong>CDBs, LCIs e LCAs:</strong> Geralmente oferecem um percentual do CDI, que por sua vez segue de perto a Selic.</li>
                  <li><strong>Tesouro Prefixado:</strong> Quando a Selic sobe, o preço desses títulos cai no mercado secundário, e vice-versa.</li>
                  <li><strong>Tesouro IPCA+:</strong> Sofre influência tanto da Selic quanto das expectativas de inflação.</li>
                </ul>
              </li>
              <li class="mb-3"><strong>Renda Variável:</strong>
                <ul class="list-circle pl-6 mt-1">
                  <li><strong>Ações:</strong> Tendem a se desvalorizar em períodos de alta da Selic, pois os investimentos em renda fixa se tornam mais atrativos e o custo de capital das empresas aumenta.</li>
                  <li><strong>Fundos Imobiliários:</strong> Também costumam se desvalorizar quando a Selic sobe, pois são comparados com a rentabilidade da renda fixa.</li>
                </ul>
              </li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Impacto da Selic na Economia Real</h2>
            <p class="mb-4">A taxa Selic não afeta apenas os investimentos, mas também diversos aspectos da economia real:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Crédito:</strong> Juros de empréstimos, financiamentos e cartões de crédito tendem a subir quando a Selic aumenta.</li>
              <li class="mb-2"><strong>Consumo:</strong> Com crédito mais caro, o consumo tende a diminuir, especialmente de bens duráveis.</li>
              <li class="mb-2"><strong>Emprego:</strong> A redução do consumo e dos investimentos pode levar a um aumento do desemprego.</li>
              <li class="mb-2"><strong>Câmbio:</strong> Juros mais altos tendem a atrair capital estrangeiro, fortalecendo o real frente a outras moedas.</li>
              <li class="mb-2"><strong>Dívida pública:</strong> O governo paga mais para se financiar quando a Selic está alta, aumentando o custo da dívida pública.</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Estratégias de Investimento para Diferentes Cenários da Selic</h2>
            <p class="mb-4">Dependendo do movimento da taxa Selic, diferentes estratégias de investimento podem ser mais adequadas:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3"><strong>Selic em alta ou estável em patamar alto (cenário atual):</strong>
                <ul class="list-circle pl-6 mt-1">
                  <li>Priorize investimentos pós-fixados (Tesouro Selic, CDBs atrelados ao CDI)</li>
                  <li>Considere títulos prefixados apenas para prazos mais longos</li>
                  <li>Seja seletivo com investimentos em renda variável</li>
                </ul>
              </li>
              <li class="mb-3"><strong>Selic em queda:</strong>
                <ul class="list-circle pl-6 mt-1">
                  <li>Aproveite para adquirir títulos prefixados, que tendem a se valorizar</li>
                  <li>Aumente gradualmente a exposição à renda variável</li>
                  <li>Considere alongar o prazo dos investimentos para garantir taxas mais atrativas</li>
                </ul>
              </li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Conclusão</h2>
            <blockquote class="italic border-l-4 border-gray-300 pl-4 py-2 my-6 text-gray-600">
              A taxa Selic é muito mais que um simples número divulgado periodicamente pelo Banco Central. Ela é o termômetro da economia brasileira e um fator determinante para suas decisões financeiras. Em 2025, com a Selic em 11,25% e projeções de manutenção em patamares elevados, entender como ela funciona e seus impactos torna-se ainda mais importante para proteger seu patrimônio e aproveitar as oportunidades que diferentes cenários econômicos oferecem.
            </blockquote>

            <hr class="my-10 border-t border-gray-200">
          </div>
        `
      },
      {
        id: "3",
        title: "Porque o Brasil não prospera?",
        description: "Uma análise profunda sobre os fatores estruturais que impedem o desenvolvimento econômico e social do Brasil, desde a desigualdade histórica até os problemas institucionais que travam nosso potencial.",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "economia",
        author: "Leonardo Figueiredo",
        date: "20 de Junho, 2025",
        readTime: "12 min de leitura",
        featured: true,
        content: `
          <div class="article-content">
            <p class="text-lg mb-4">
              O Brasil é frequentemente descrito como o "país do futuro" — um futuro que, paradoxalmente, nunca parece chegar. Apesar de possuir uma das maiores economias do mundo, abundância de recursos naturais, uma população jovem e diversificada, e não enfrentar conflitos armados ou desastres naturais devastadores, o país continua preso em um ciclo de <strong>desenvolvimento interrompido</strong>, <strong>desigualdade persistente</strong> e <strong>instabilidade econômica</strong>.
            </p>

            <p class="text-lg mb-6">
              Por que, afinal, o Brasil não consegue transformar seu imenso potencial em prosperidade real e sustentável para sua população? Neste artigo, analisamos os fatores estruturais que impedem o país de avançar e as possíveis soluções para esse impasse histórico.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. A Desigualdade como Barreira Fundamental</h2>
            <p class="mb-4">A desigualdade no Brasil não é apenas um problema social, mas um obstáculo econômico de primeira ordem. Com um dos maiores índices de Gini do mundo (0,543 segundo dados recentes do IBGE), o país mantém uma estrutura social profundamente desequilibrada:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2">Os 10% mais ricos concentram cerca de 43% da renda nacional</li>
              <li class="mb-2">A desigualdade racial persiste, com a população negra tendo renda pelo menos 15% menor que a população branca desde a década de 1980</li>
              <li class="mb-2">A mobilidade social é extremamente limitada, com as circunstâncias de nascimento determinando em grande parte as oportunidades futuras</li>
            </ul>
            <p class="mb-4">Esta desigualdade extrema não é apenas moralmente problemática, mas economicamente ineficiente. Ela reduz o mercado consumidor interno, desperdiça talentos potenciais e cria instabilidade social que afasta investimentos de longo prazo.</p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. O Legado Histórico e suas Consequências</h2>
            <p class="mb-4">As raízes da desigualdade brasileira remontam ao período colonial, com três fatores principais:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Colonização exploratória:</strong> Diferente de países como EUA e Canadá, o Brasil foi colonizado primariamente para extração de recursos, não para construção de uma nova sociedade.</li>
              <li class="mb-2"><strong>Escravidão prolongada:</strong> O Brasil foi o último país ocidental a abolir a escravidão (1888), sem qualquer política de reparação ou integração para os ex-escravizados.</li>
              <li class="mb-2"><strong>Concentração fundiária:</strong> O modelo de latifúndios estabelecido desde as capitanias hereditárias permanece praticamente inalterado, com 1% dos proprietários rurais controlando 45% das terras agricultáveis.</li>
            </ul>

            <div class="my-8 text-center">
              <img src="https://images.unsplash.com/photo-1518985360832-49b6aef0b954?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Contraste social no Brasil" class="max-w-full mx-auto rounded" style="max-width: 500px;">
              <p class="text-sm text-gray-500 mt-2">O contraste entre riqueza e pobreza é uma constante na paisagem urbana brasileira.</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Educação: O Gargalo do Desenvolvimento</h2>
            <p class="mb-4">Apesar dos avanços na universalização do acesso à educação básica, o Brasil ainda enfrenta sérios problemas qualitativos:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2">Nas avaliações do PISA (Programa Internacional de Avaliação de Estudantes), o Brasil consistentemente figura entre os piores colocados</li>
              <li class="mb-2">Apenas 50% dos jovens concluem o ensino médio na idade adequada</li>
              <li class="mb-2">A educação pública, que atende a maioria da população, recebe investimentos insuficientes e mal geridos</li>
              <li class="mb-2">A desigualdade educacional reproduz e amplifica as desigualdades sociais existentes</li>
            </ul>
            <p class="mb-4">Em uma economia global cada vez mais baseada no conhecimento, a deficiência educacional brasileira representa um obstáculo crítico para o desenvolvimento de setores de alta tecnologia e valor agregado.</p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. O Ambiente Institucional e seus Problemas</h2>
            <p class="mb-4">O Brasil sofre com um ambiente institucional que desestimula a produtividade e a inovação:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Burocracia excessiva:</strong> Abrir uma empresa no Brasil leva em média 80 dias, contra 1,5 dia na Nova Zelândia</li>
              <li class="mb-2"><strong>Sistema tributário complexo e regressivo:</strong> Empresas brasileiras gastam cerca de 1.500 horas por ano apenas para cumprir obrigações tributárias</li>
              <li class="mb-2"><strong>Insegurança jurídica:</strong> Mudanças frequentes nas regras e interpretações legais dificultam o planejamento de longo prazo</li>
              <li class="mb-2"><strong>Corrupção sistêmica:</strong> Além do custo direto, a corrupção distorce incentivos econômicos e mina a confiança nas instituições</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. A Armadilha da Baixa Produtividade</h2>
            <p class="mb-4">A produtividade do trabalhador brasileiro estagnou nas últimas décadas, enquanto países como China e Coreia do Sul avançaram rapidamente. Isso se deve a múltiplos fatores:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Infraestrutura deficiente:</strong> Estradas precárias, portos congestionados e energia cara aumentam o "Custo Brasil"</li>
              <li class="mb-2"><strong>Baixo investimento em P&D:</strong> O Brasil investe apenas 1,2% do PIB em pesquisa e desenvolvimento, contra 2,8% nos EUA e 4,8% na Coreia do Sul</li>
              <li class="mb-2"><strong>Protecionismo excessivo:</strong> A economia fechada reduz a competição e a necessidade de inovação</li>
              <li class="mb-2"><strong>Informalidade:</strong> Cerca de 40% da força de trabalho está na informalidade, com acesso limitado a crédito, tecnologia e capacitação</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. A Instabilidade Macroeconômica Crônica</h2>
            <p class="mb-4">O Brasil tem dificuldade em manter estabilidade macroeconômica por períodos prolongados:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Ciclos de boom and bust:</strong> Períodos de crescimento acelerado seguidos por crises profundas</li>
              <li class="mb-2"><strong>Vulnerabilidade externa:</strong> Dependência excessiva de commodities e capital estrangeiro</li>
              <li class="mb-2"><strong>Desequilíbrio fiscal crônico:</strong> Gastos públicos crescentes sem contrapartida em produtividade</li>
              <li class="mb-2"><strong>Juros estruturalmente altos:</strong> A taxa Selic historicamente elevada encarece o investimento produtivo</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Caminhos para a Prosperidade: O que Precisa Mudar?</h2>
            <p class="mb-4">Para superar esses obstáculos históricos e estruturais, o Brasil precisaria de um conjunto coordenado de reformas e políticas:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Reforma educacional profunda:</strong> Foco na qualidade, valorização dos professores e modernização curricular</li>
              <li class="mb-2"><strong>Simplificação tributária:</strong> Um sistema mais simples, transparente e progressivo</li>
              <li class="mb-2"><strong>Investimento em infraestrutura:</strong> Redução do Custo Brasil e aumento da competitividade</li>
              <li class="mb-2"><strong>Políticas de redução da desigualdade:</strong> Combinando transferência de renda com expansão de oportunidades</li>
              <li class="mb-2"><strong>Abertura econômica gradual:</strong> Exposição à competição internacional com políticas de adaptação</li>
              <li class="mb-2"><strong>Fortalecimento institucional:</strong> Combate à corrupção e aumento da segurança jurídica</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">8. Conclusão</h2>
            <blockquote class="italic border-l-4 border-gray-300 pl-4 py-2 my-6 text-gray-600">
              O Brasil não prospera não por falta de recursos naturais, talentos individuais ou oportunidades de mercado, mas por falhas estruturais que impedem a transformação desse potencial em desenvolvimento real. A boa notícia é que esses obstáculos, embora profundamente enraizados, não são imutáveis. Com reformas consistentes, visão de longo prazo e um compromisso genuíno com a redução das desigualdades, o país do futuro pode finalmente se tornar o país do presente.
            </blockquote>

            <hr class="my-10 border-t border-gray-200">
          </div>
        `
      },
      {
        id: "4",
        title: "Como Organizar as Finanças em Casal",
        description: "Dicas práticas para casais organizarem as finanças juntos e evitarem conflitos.",
        image: "/placeholder.svg",
        category: "planejamento",
        author: "Roberto e Camila",
        date: "18 de Março, 2023",
        readTime: "6 min de leitura",
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre finanças em casal...</p>`
      },
      {
        id: "5",
        title: "Educação Financeira para Crianças",
        description: "Como ensinar conceitos financeiros para crianças de diferentes idades.",
        image: "/placeholder.svg",
        category: "iniciantes",
        author: "Fernanda Lima",
        date: "10 de Março, 2023",
        readTime: "5 min de leitura",
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre educação financeira para crianças...</p>`
      },
      {
        id: "6",
        title: "Entendendo a Taxa Selic e seu Impacto nos Investimentos",
        description: "Como as mudanças na taxa básica de juros afetam seus investimentos.",
        image: "/placeholder.svg",
        category: "economia",
        author: "Ricardo Souza",
        date: "1 de Março, 2023",
        readTime: "7 min de leitura",
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre taxa Selic...</p>`
      },

      {
        id: "7",
        title: "Como Organizar as Finanças em Casal",
        description: "Dicas práticas para casais organizarem as finanças juntos e evitarem conflitos.",
        image: "/placeholder.svg",
        category: "planejamento",
        author: "Roberto e Camila",
        date: "18 de Março, 2023",
        readTime: "6 min de leitura",
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre finanças em casal...</p>`
      },
      {
        id: "8",
        title: "Educação Financeira para Crianças",
        description: "Como ensinar conceitos financeiros para crianças de diferentes idades.",
        image: "/placeholder.svg",
        category: "iniciantes",
        author: "Fernanda Lima",
        date: "10 de Março, 2023",
        readTime: "5 min de leitura",
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre educação financeira para crianças...</p>`
      },
      {
        id: "9",
        title: "Entendendo a Taxa Selic e seu Impacto nos Investimentos",
        description: "Como as mudanças na taxa básica de juros afetam seus investimentos.",
        image: "/placeholder.svg",
        category: "economia",
        author: "Ricardo Souza",
        date: "1 de Março, 2023",
        readTime: "7 min de leitura",
        featured: false,
        content: `<p>Conteúdo completo do artigo sobre taxa Selic...</p>`
      }
    ];

    const artigoEncontrado = artigos.find(a => a.id === id);

    if (artigoEncontrado) {
      setArtigo(artigoEncontrado);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center h-64">
              <p className="text-lg">Carregando artigo...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!artigo) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Artigo não encontrado</h1>
              <p className="text-lg text-gray-600 mb-8">O artigo que você está procurando não existe ou foi removido.</p>
              <Link to="/artigos">
                <Button className="bg-finance-blue hover:bg-finance-blue-dark text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voltar para Artigos
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "iniciantes": return "Para Iniciantes";
      case "investimentos": return "Investimentos";
      case "economia": return "Economia";
      case "planejamento": return "Planejamento";
      default: return category;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <article className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="mb-8">
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <Link to="/" className="text-sm text-gray-500 hover:text-finance-blue">
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <Link to="/artigos" className="text-sm text-gray-500 hover:text-finance-blue">
                        Artigos
                      </Link>
                    </div>
                  </li>
                  <li aria-current="page">
                    <div className="flex items-center">
                      <span className="mx-2 text-gray-400">/</span>
                      <span className="text-sm text-gray-700 truncate max-w-[200px]">{artigo.title}</span>
                    </div>
                  </li>
                </ol>
              </nav>
            </div>

            {/* Cabeçalho do artigo */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-finance-blue/10 text-finance-blue px-3 py-1 rounded-full text-sm font-medium">
                  {getCategoryName(artigo.category)}
                </span>
                {artigo.featured && (
                  <span className="bg-finance-green/10 text-finance-green px-3 py-1 rounded-full text-sm font-medium">
                    Destaque
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {artigo.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{artigo.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{artigo.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{artigo.readTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tag className="h-4 w-4" />
                  <span>{getCategoryName(artigo.category)}</span>
                </div>
              </div>

              {/* Imagem principal */}
              <div className="relative h-64 md:h-96 bg-gray-200 rounded-xl overflow-hidden mb-8">
                <img
                  src={artigo.image}
                  alt={artigo.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Conteúdo do artigo */}
              <div
                className="prose prose-lg max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: artigo.content || '' }}
              />

              {/* Compartilhar e voltar */}
              <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap justify-between items-center gap-4">
                <Link to="/artigos">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Voltar para Artigos
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Compartilhar:</span>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-twitter" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default ArtigoView;