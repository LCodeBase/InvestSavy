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
      {
        id: "1",
        title: "Investimentos em Renda Fixa: Guia para Iniciantes",
        description: "Descubra como começar a investir em renda fixa, entenda os diferentes tipos de investimentos disponíveis e aprenda estratégias para maximizar seus rendimentos com segurança.",
        image: "https://pefmbddiag.blob.core.windows.net/cdn-blog-pi/output/img/materia/Melhores%20investimentos%20renda%20fixa.jpg",
        category: "investimentos",
        author: "Leonardo Figueiredo",
        date: "31 de Maio, 2025",
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
        image: "https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "economia",
        author: "Leonardo Figueiredo",
        date: "3 de Junho, 2025",
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
        title: "Por que o Brasil não prospera? O país do futuro que está preso no passado.",
        description: "Uma análise direta e sem ideologias sobre os entraves históricos, institucionais e culturais que limitam o desenvolvimento sustentável do Brasil.",
        image: "https://i.pinimg.com/736x/1c/67/ba/1c67ba2ebe1eaeb185b3f11a8fccbd5a.jpg",
        category: "economia",
        author: "Leonardo Figueiredo",
        date: "4 de Junho, 2025",
        readTime: "12 min de leitura",
        featured: true,
        content: `
    <div class="article-content">
      <p class="text-lg mb-4">
        O Brasil tem todos os ingredientes para ser uma potência global: vastos recursos naturais, população numerosa e criativa, ausência de grandes catástrofes naturais e posição geográfica estratégica. No entanto, seguimos tropeçando no próprio potencial. Por quê?
      </p>

      <p class="text-lg mb-6">
        Este artigo busca uma resposta sincera — longe de discursos ideológicos ou polarizações baratas. O que realmente impede o Brasil de prosperar? Vamos aos fatos.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Um Estado pesado, ineficiente e inchado</h2>
      <p class="mb-4">
        A máquina pública brasileira é custosa, lenta e complexa. Gasta-se mais do que se arrecada com qualidade, e a ineficiência se perpetua por falta de cobrança real por desempenho. Isso vale tanto para a burocracia federal quanto para estados e municípios.
      </p>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2">O funcionalismo consome mais de R$ 1 trilhão por ano — muitas vezes sem contrapartida de produtividade</li>
        <li class="mb-2">A máquina arrecada mal e distribui pior — concentrando gastos onde há menos impacto social e econômico</li>
        <li class="mb-2">Reformas estruturais, como a administrativa e tributária, são empurradas por décadas por medo de desagradar corporações</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Uma sociedade que se acostumou com o improviso</h2>
      <p class="mb-4">
        O Brasil é, culturalmente, um país de soluções paliativas. O "jeitinho brasileiro", embora criativo, virou sinônimo de tolerância ao erro, à informalidade e à ineficiência. Isso mina o planejamento, desvaloriza a meritocracia e impede políticas de longo prazo.
      </p>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2">Empresas vivem "apagando incêndios" em vez de inovar</li>
        <li class="mb-2">Gestores públicos e privados evitam assumir responsabilidades para não serem punidos pelo risco</li>
        <li class="mb-2">A cultura do curto prazo se sobrepõe à visão estratégica — inclusive no sistema político</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Um sistema educacional que não forma, apenas certifica</h2>
      <p class="mb-4">
        A educação brasileira está longe de preparar jovens para o mundo real. Falta base, falta lógica, falta incentivo à excelência. O ensino médio é fraco, e a universidade pública virou palco ideológico ou burocrático, muitas vezes distante das demandas da sociedade e do mercado.
      </p>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2">O Brasil está entre os últimos colocados do PISA há anos — e ninguém é responsabilizado</li>
        <li class="mb-2">Professores são mal formados e mal pagos, e o ensino é engessado e ultrapassado</li>
        <li class="mb-2">Milhões saem da escola sem saber interpretar um texto ou fazer uma conta básica</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Uma economia sufocada por regras, impostos e incertezas</h2>
      <p class="mb-4">
        O ambiente de negócios no Brasil é hostil. Não por falta de leis, mas por excesso. Abrir, operar e fechar uma empresa é uma odisseia burocrática. Investidores desistem porque a imprevisibilidade é a única certeza.
      </p>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2">O sistema tributário é um dos mais complexos e regressivos do mundo</li>
        <li class="mb-2">A Justiça é lenta, cara e imprevisível</li>
        <li class="mb-2">Há excesso de regulamentações que desincentivam o pequeno empreendedor e desestimulam inovação</li>
      </ul>

      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Um modelo político que prioriza interesses próprios</h2>
      <p class="mb-4">
        O sistema político brasileiro gira em torno da reeleição e de alianças fisiológicas, não da entrega de resultados à população. A consequência é um Congresso refém de interesses setoriais, com reformas travadas por décadas.
      </p>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2">Políticos pensam no próximo mandato, não na próxima geração</li>
        <li class="mb-2">As coalizões são baseadas em troca de favores, não em propostas</li>
        <li class="mb-2">A impunidade política gera desilusão e descrença na democracia</li>
      </ul>



      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Caminhos reais para a mudança</h2>
      <p class="mb-4">
        O Brasil não precisa de milagres. Precisa de responsabilidade, coragem e foco em resultados. As soluções são conhecidas, mas exigem sacrifícios e enfrentamento de interesses poderosos.
      </p>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2"><strong>Educação básica de qualidade</strong>: foco em alfabetização, matemática e pensamento crítico desde cedo</li>
        <li class="mb-2"><strong>Reforma do Estado</strong>: menos cargos, mais meritocracia e eficiência no serviço público</li>
        <li class="mb-2"><strong>Simplificação radical de impostos</strong>: previsibilidade, neutralidade e incentivo ao crescimento</li>
        <li class="mb-2"><strong>Segurança jurídica</strong>: contratos respeitados e regras estáveis</li>
        <li class="mb-2"><strong>Ambiente pró-empreendedor</strong>: menos burocracia, mais liberdade para inovar</li>
      </ul>

        <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. A insegurança virou parte da nossa rotina — e isso é insano</h2>
      <p class="mb-4">
        Em muitos países, é comum ver pessoas andando com celulares, relógios caros ou notebooks nas praças e metrôs. No Brasil, isso é praticamente um convite ao assalto — ou pior, à morte. E o mais grave: nos acostumamos com isso.
      </p>
      <ul class="list-disc pl-8 mb-6">
        <li class="mb-2">Evitamos usar celular na rua para não chamar atenção de criminosos</li>
        <li class="mb-2">Desviamos itinerários, escondemos objetos e adotamos comportamentos paranoicos como se isso fosse “normal”</li>
        <li class="mb-2">Pais ensinam filhos a “não vacilar” ao invés de confiar na proteção do Estado</li>
      </ul>
      <p class="mb-4">
        A consequência é grave: o medo molda nossas escolhas, limita a mobilidade urbana, afeta a qualidade de vida e impõe um custo psicológico invisível. Quem é pobre sofre ainda mais, pois mora nas regiões mais perigosas e depende do transporte público, onde a vulnerabilidade é total.
      </p>
      <p class="mb-4">
        A ausência de segurança pública eficaz também sabota a economia: desestimula o turismo, encarece o seguro de empresas, aumenta custos logísticos e afasta investidores.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 mt-6 mb-2">Precisamos tratar o crime como o que ele é: inaceitável</h3>
      <p class="mb-6">
        O combate à criminalidade deve ser técnico, firme e contínuo — com inteligência, policiamento de verdade, punição rápida e reabilitação onde for possível. Mas precisa começar por uma decisão moral coletiva: viver com medo <strong>não pode ser normal</strong>. E não importa quem está no poder — se não enfrenta isso com seriedade, está falhando com o povo.
      </p>

      <!-- Conclusão -->
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Conclusão</h2>
      <blockquote class="italic border-l-4 border-gray-300 pl-4 py-2 my-6 text-gray-600">
        O Brasil não precisa escolher entre esquerda ou direita. Precisa escolher entre o certo e o errado. E o certo, neste caso, é adotar políticas sérias, baseadas em evidências, com foco no que funciona. É hora de parar de discutir narrativas e começar a entregar resultados.
      </blockquote>

      <hr class="my-10 border-t border-gray-200">
    </div>
    </div>
  `
      },
      {
        id: "4",
        title: "A Regra 50/30/20: O Método Simples para Organizar suas Finanças",
        description: "Descubra como a regra 50/30/20 pode transformar sua vida financeira, dividindo seu orçamento em necessidades, desejos e objetivos financeiros de forma simples e eficaz.",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        category: "planejamento",
        author: "Leonardo Figueiredo",
        date: "2 de Junho, 2025",
        readTime: "8 min de leitura",
        featured: true,
        content: `
          <div class="article-content">
            <p class="text-lg mb-4">
              Em um mundo onde as despesas parecem se multiplicar e a gestão financeira se torna cada vez mais complexa, encontrar um método simples e eficaz para organizar o orçamento é como descobrir um mapa do tesouro. A <strong>Regra 50/30/20</strong> surge como uma bússola financeira que tem ajudado milhões de pessoas a equilibrar suas finanças sem complicações excessivas ou planilhas intermináveis.
            </p>

            <p class="text-lg mb-6">
              Criada pela senadora americana e especialista em direito de falências <em>Elizabeth Warren</em> junto com sua filha Amelia Warren Tyagi no livro "All Your Worth: The Ultimate Lifetime Money Plan", esta regra propõe uma divisão simples e intuitiva da sua renda líquida em apenas três categorias. Vamos descobrir como implementá-la e por que ela pode ser a chave para transformar sua relação com o dinheiro.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. O que é a Regra 50/30/20?</h2>
            <p class="mb-4">A Regra 50/30/20 é um método de orçamento que divide sua renda líquida mensal (o dinheiro que sobra após os impostos) em três categorias principais:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>50% para necessidades:</strong> Despesas essenciais que você não pode evitar</li>
              <li class="mb-2"><strong>30% para desejos:</strong> Gastos não essenciais que melhoram sua qualidade de vida</li>
              <li class="mb-2"><strong>20% para objetivos financeiros:</strong> Poupança, investimentos e pagamento de dívidas</li>
            </ul>

            <div class="my-8 text-center">
              <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80" alt="Ilustração da Regra 50/30/20" class="max-w-full mx-auto rounded" style="max-width: 500px;">
              <p class="text-sm text-gray-500 mt-2">A regra 50/30/20 simplifica o planejamento financeiro dividindo sua renda em três categorias principais.</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Entendendo as Três Categorias</h2>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">50% - Necessidades</h3>
            <p class="mb-4">As necessidades são gastos essenciais para sua sobrevivência e funcionamento básico na sociedade. Incluem:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Aluguel ou financiamento imobiliário</li>
              <li class="mb-1">Contas de serviços básicos (água, luz, gás)</li>
              <li class="mb-1">Alimentação básica</li>
              <li class="mb-1">Transporte para o trabalho</li>
              <li class="mb-1">Plano de saúde</li>
              <li class="mb-1">Medicamentos essenciais</li>
              <li class="mb-1">Educação básica dos filhos</li>
              <li class="mb-1">Parcelas mínimas de dívidas</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">30% - Desejos</h3>
            <p class="mb-4">Os desejos são gastos que melhoram sua qualidade de vida, mas que você poderia viver sem eles se necessário:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Assinaturas de streaming</li>
              <li class="mb-1">Jantares em restaurantes</li>
              <li class="mb-1">Viagens e turismo</li>
              <li class="mb-1">Compras de roupas além do básico</li>
              <li class="mb-1">Atividades de lazer</li>
              <li class="mb-1">Upgrades tecnológicos</li>
              <li class="mb-1">Presentes</li>
              <li class="mb-1">Hobbies e atividades recreativas</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">20% - Objetivos Financeiros</h3>
            <p class="mb-4">Esta categoria é dedicada à construção do seu futuro financeiro:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Reserva de emergência (ideal: 6 a 12 meses de despesas)</li>
              <li class="mb-1">Investimentos para aposentadoria</li>
              <li class="mb-1">Pagamento acelerado de dívidas (além do mínimo)</li>
              <li class="mb-1">Poupança para objetivos específicos (casa própria, educação)</li>
              <li class="mb-1">Investimentos diversos</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Como Implementar a Regra 50/30/20</h2>
            <ol class="list-decimal pl-8 mb-6">
              <li class="mb-3">
                <strong>Calcule sua renda líquida mensal:</strong>
                <p class="mt-1">Some todos os seus rendimentos após impostos e deduções obrigatórias. Este é o valor que você efetivamente tem disponível para gastar.</p>
              </li>
              <li class="mb-3">
                <strong>Calcule os valores para cada categoria:</strong>
                <p class="mt-1">Multiplique sua renda líquida por 0,5 (50%), 0,3 (30%) e 0,2 (20%) para determinar quanto deve destinar a cada categoria.</p>
                <p class="mt-1">Por exemplo, com uma renda líquida de R$ 5.000:</p>
                <ul class="list-disc pl-8 mt-2">
                  <li>Necessidades: R$ 5.000 × 0,5 = R$ 2.500</li>
                  <li>Desejos: R$ 5.000 × 0,3 = R$ 1.500</li>
                  <li>Objetivos financeiros: R$ 5.000 × 0,2 = R$ 1.000</li>
                </ul>
              </li>
              <li class="mb-3">
                <strong>Categorize seus gastos atuais:</strong>
                <p class="mt-1">Analise seus extratos bancários e faturas de cartão de crédito dos últimos três meses. Classifique cada despesa em uma das três categorias.</p>
              </li>
              <li class="mb-3">
                <strong>Ajuste seu orçamento:</strong>
                <p class="mt-1">Compare seus gastos atuais com os valores ideais calculados. Identifique áreas onde você está gastando mais do que o recomendado e faça ajustes.</p>
              </li>
              <li class="mb-3">
                <strong>Monitore e adapte:</strong>
                <p class="mt-1">Acompanhe seus gastos mensalmente e faça ajustes conforme necessário. A regra é flexível e deve se adaptar às mudanças em sua vida.</p>
              </li>
            </ol>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Por Que Você Deveria Usar a Regra 50/30/20</h2>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3">
                <strong>Simplicidade:</strong>
                <p class="mt-1">Diferente de métodos que exigem o controle de dezenas de categorias, a regra 50/30/20 é fácil de entender e implementar, ideal para quem está começando a organizar as finanças.</p>
              </li>
              <li class="mb-3">
                <strong>Flexibilidade:</strong>
                <p class="mt-1">A regra se adapta a diferentes níveis de renda e fases da vida, permitindo ajustes conforme suas circunstâncias mudam.</p>
              </li>
              <li class="mb-3">
                <strong>Equilíbrio:</strong>
                <p class="mt-1">Promove um equilíbrio saudável entre viver o presente (desejos) e construir o futuro (objetivos financeiros), sem sacrificar suas necessidades básicas.</p>
              </li>
              <li class="mb-3">
                <strong>Conscientização:</strong>
                <p class="mt-1">Ajuda a criar consciência sobre seus hábitos de consumo e a diferenciar o que é essencial do que é supérfluo.</p>
              </li>
              <li class="mb-3">
                <strong>Redução do estresse financeiro:</strong>
                <p class="mt-1">Ao garantir que 20% da sua renda seja destinada a objetivos financeiros, você constrói segurança e reduz a ansiedade relacionada ao dinheiro.</p>
              </li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Adaptando a Regra à Realidade Brasileira</h2>
            <p class="mb-4">A regra 50/30/20 foi criada nos Estados Unidos, onde a realidade econômica é diferente da brasileira. Algumas adaptações podem ser necessárias:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Ajuste nas proporções:</strong> Em cidades brasileiras com alto custo de vida, pode ser necessário destinar mais de 50% para necessidades inicialmente.</li>
              <li class="mb-2"><strong>Priorize a quitação de dívidas caras:</strong> Com juros elevados no Brasil, pode fazer sentido destinar mais dos 20% para quitar dívidas de alto custo, como cartão de crédito e cheque especial.</li>
              <li class="mb-2"><strong>Considere a inflação:</strong> Em períodos de inflação alta, os investimentos precisam ser mais estratégicos para preservar o poder de compra.</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Desafios Comuns e Como Superá-los</h2>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3">
                <strong>"Minhas necessidades ultrapassam 50% da minha renda"</strong>
                <p class="mt-1">Solução: Revise o que realmente é necessidade. Busque reduzir custos fixos (mudança para um imóvel mais barato, renegociação de contratos) ou aumente sua renda.</p>
              </li>
              <li class="mb-3">
                <strong>"Não consigo economizar 20%"</strong>
                <p class="mt-1">Solução: Comece com um percentual menor, como 5% ou 10%, e aumente gradualmente. O importante é criar o hábito.</p>
              </li>
              <li class="mb-3">
                <strong>"Tenho muitas dívidas, como aplicar a regra?"</strong>
                <p class="mt-1">Solução: Inclua o pagamento mínimo das dívidas nos 50% (necessidades) e use parte ou todo o percentual dos 20% para acelerar a quitação das dívidas mais caras.</p>
              </li>
              <li class="mb-3">
                <strong>"Minha renda é variável, como planejar?"</strong>
                <p class="mt-1">Solução: Trabalhe com a média dos últimos 6-12 meses ou com o valor mínimo que você costuma receber, destinando rendas extras principalmente para objetivos financeiros.</p>
              </li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Conclusão</h2>
            <blockquote class="italic border-l-4 border-gray-300 pl-4 py-2 my-6 text-gray-600">
              A regra 50/30/20 não é uma fórmula mágica, mas um ponto de partida sólido para quem deseja organizar suas finanças sem complicações. Sua beleza está na simplicidade e na flexibilidade, permitindo adaptações conforme sua realidade e objetivos. Ao implementá-la, você estará dando um passo importante rumo à saúde financeira, equilibrando necessidades presentes e metas futuras de forma consciente e sustentável.
            </blockquote>

            <p class="mb-4">Lembre-se: o objetivo não é seguir a regra com rigidez matemática, mas usá-la como um guia para criar hábitos financeiros saudáveis. Com o tempo, você encontrará o equilíbrio que funciona melhor para sua realidade, construindo uma relação mais positiva e consciente com seu dinheiro.</p>

            <hr class="my-10 border-t border-gray-200">
          </div>
        `
      },

      {
        id: "5",
        title: "Como Começar sua Carreira na Área Financeira",
        description: "Um guia completo para quem deseja ingressar no mercado financeiro, com dicas sobre formação, certificações, habilidades necessárias e as profissões mais promissoras do setor.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        category: "carreira",
        author: "Leonardo Figueiredo",
        date: "1 de Junho, 2025",
        readTime: "10 min de leitura",
        featured: false,
        content: `
          <div class="article-content">
            <p class="text-lg mb-4">
              O mercado financeiro brasileiro está em constante evolução e oferece um cenário repleto de oportunidades para profissionais qualificados. Com <strong>salários competitivos</strong>, <strong>possibilidades de crescimento</strong> e um <strong>ambiente dinâmico</strong>, a área financeira atrai cada vez mais talentos que buscam construir uma carreira sólida e promissora.
            </p>

            <p class="text-lg mb-6">
              Se você está considerando ingressar nesse universo, este guia completo vai ajudá-lo a entender os caminhos possíveis, as qualificações necessárias e as estratégias para se destacar em um dos setores mais competitivos e recompensadores do mercado de trabalho.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Entendendo o Mercado Financeiro</h2>
            <p class="mb-4">O mercado financeiro é vasto e oferece diversas possibilidades de atuação. Antes de iniciar sua jornada, é importante compreender os principais segmentos:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Bancos comerciais e digitais:</strong> Instituições que oferecem serviços bancários tradicionais como contas, empréstimos e financiamentos.</li>
              <li class="mb-2"><strong>Corretoras e distribuidoras:</strong> Empresas que intermediam operações de compra e venda de ativos financeiros.</li>
              <li class="mb-2"><strong>Gestoras de recursos:</strong> Organizações que administram o dinheiro de terceiros, alocando em diferentes investimentos.</li>
              <li class="mb-2"><strong>Consultorias financeiras:</strong> Empresas que prestam assessoria em finanças pessoais, corporativas ou investimentos.</li>
              <li class="mb-2"><strong>Fintechs:</strong> Startups que utilizam tecnologia para inovar em serviços financeiros.</li>
              <li class="mb-2"><strong>Departamentos financeiros corporativos:</strong> Áreas responsáveis pela gestão financeira dentro de empresas de diversos setores.</li>
            </ul>

            <div class="my-8 text-center">
              <img src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Profissionais do mercado financeiro" class="max-w-full mx-auto rounded" style="max-width: 500px;">
              <p class="text-sm text-gray-500 mt-2">O mercado financeiro oferece diversas possibilidades de carreira para profissionais qualificados.</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Formação Acadêmica</h2>
            <p class="mb-4">Embora o mercado financeiro não exija oficialmente uma graduação específica, ter formação superior em áreas relacionadas pode abrir portas e acelerar seu crescimento profissional:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Administração:</strong> Oferece uma visão ampla de gestão, incluindo finanças corporativas.</li>
              <li class="mb-2"><strong>Ciências Econômicas:</strong> Proporciona entendimento profundo sobre macroeconomia e mercados.</li>
              <li class="mb-2"><strong>Ciências Contábeis:</strong> Fundamental para quem deseja trabalhar com análise financeira e contabilidade.</li>
              <li class="mb-2"><strong>Engenharia:</strong> Valorizada pelo raciocínio analítico e quantitativo, especialmente em áreas como trading e análise de risco.</li>
              <li class="mb-2"><strong>Estatística:</strong> Excelente para carreiras que envolvem análise de dados e modelagem financeira.</li>
              <li class="mb-2"><strong>Matemática:</strong> Proporciona base sólida para trabalhar com modelos quantitativos e precificação de ativos.</li>
              <li class="mb-2"><strong>Tecnologia da Informação:</strong> Cada vez mais relevante com a digitalização do setor financeiro.</li>
            </ul>

            <p class="mb-4">Além da graduação, considere cursos de especialização, MBA ou mestrado em áreas específicas como Finanças Corporativas, Mercado de Capitais ou Gestão de Investimentos para se destacar ainda mais.</p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Certificações Essenciais</h2>
            <p class="mb-4">No mercado financeiro brasileiro, as certificações são muitas vezes requisitos obrigatórios para determinadas funções. Elas atestam seu conhecimento técnico e são regulamentadas por órgãos como a Anbima (Associação Brasileira das Entidades dos Mercados Financeiro e de Capitais) e a CVM (Comissão de Valores Mobiliários).</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Certificações Iniciais:</h3>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>CPA-10 (Certificação Profissional Anbima Série 10):</strong> Certificação básica que habilita o profissional a trabalhar com produtos de investimento em agências bancárias.</li>
              <li class="mb-2"><strong>CPA-20 (Certificação Profissional Anbima Série 20):</strong> Permite atender clientes de alta renda em plataformas de atendimento específicas.</li>
              <li class="mb-2"><strong>CEA (Certificação de Especialista em Investimentos Anbima):</strong> Habilita o profissional a atuar como especialista em investimentos.</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Certificações Avançadas:</h3>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>CGA (Certificação de Gestores Anbima):</strong> Necessária para atuar como gestor de recursos de terceiros.</li>
              <li class="mb-2"><strong>CFP (Certified Financial Planner):</strong> Reconhecida internacionalmente, certifica planejadores financeiros.</li>
              <li class="mb-2"><strong>CFA (Chartered Financial Analyst):</strong> Uma das certificações mais prestigiadas globalmente, dividida em três níveis.</li>
              <li class="mb-2"><strong>FRM (Financial Risk Manager):</strong> Focada em gestão de riscos financeiros.</li>
            </ul>

            <p class="mb-4">A estratégia recomendada é começar pelas certificações mais básicas (como CPA-10 e CPA-20) e avançar gradualmente conforme sua carreira se desenvolve e você define sua área de especialização.</p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Habilidades Técnicas e Comportamentais</h2>
            <p class="mb-4">Além da formação acadêmica e certificações, o mercado financeiro valoriza um conjunto específico de habilidades:</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Habilidades Técnicas (Hard Skills):</h3>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Excel avançado:</strong> Domínio de fórmulas complexas, tabelas dinâmicas e macros.</li>
              <li class="mb-2"><strong>Análise de dados:</strong> Capacidade de interpretar grandes volumes de informações financeiras.</li>
              <li class="mb-2"><strong>Matemática financeira:</strong> Compreensão de conceitos como juros compostos, VPL, TIR e fluxo de caixa.</li>
              <li class="mb-2"><strong>Conhecimento de mercado:</strong> Entendimento sobre produtos financeiros, economia e cenários macroeconômicos.</li>
              <li class="mb-2"><strong>Programação:</strong> Linguagens como Python, R ou SQL são cada vez mais valorizadas, especialmente em áreas quantitativas.</li>
              <li class="mb-2"><strong>Inglês fluente:</strong> Essencial para acompanhar publicações internacionais e interagir com clientes e parceiros globais.</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Habilidades Comportamentais (Soft Skills):</h3>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Comunicação:</strong> Capacidade de explicar conceitos complexos de forma clara e objetiva.</li>
              <li class="mb-2"><strong>Ética e integridade:</strong> Fundamentais em um setor que lida com recursos de terceiros.</li>
              <li class="mb-2"><strong>Resiliência:</strong> Habilidade para lidar com pressão e prazos apertados.</li>
              <li class="mb-2"><strong>Pensamento analítico:</strong> Capacidade de analisar problemas complexos e tomar decisões baseadas em dados.</li>
              <li class="mb-2"><strong>Networking:</strong> Construção e manutenção de uma rede de contatos profissionais.</li>
              <li class="mb-2"><strong>Aprendizado contínuo:</strong> Disposição para se manter atualizado em um mercado em constante evolução.</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Profissões em Alta no Mercado Financeiro</h2>
            <p class="mb-4">O setor financeiro oferece diversas carreiras promissoras. Conheça algumas das mais requisitadas atualmente:</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">1. Analista Financeiro</h3>
            <p class="mb-4">Responsável pela interpretação e análise de dados financeiros para auxiliar na tomada de decisões. Pode atuar em áreas como:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Análise de investimentos</li>
              <li class="mb-1">Planejamento financeiro</li>
              <li class="mb-1">Avaliação de riscos</li>
              <li class="mb-1">Elaboração de relatórios e projeções</li>
            </ul>
            <p class="mb-4"><strong>Como começar:</strong> Busque especialização na área, aprimore habilidades analíticas e considere certificações como CFA ou CFP.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">2. Consultor/Assessor de Investimentos</h3>
            <p class="mb-4">Orienta clientes sobre estratégias de investimento adequadas ao seu perfil e objetivos financeiros. Suas responsabilidades incluem:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Análise do perfil do investidor</li>
              <li class="mb-1">Recomendação de produtos financeiros</li>
              <li class="mb-1">Acompanhamento de carteiras</li>
              <li class="mb-1">Relacionamento com clientes</li>
            </ul>
            <p class="mb-4"><strong>Como começar:</strong> Obtenha certificações como CPA-20 ou CEA, desenvolva conhecimentos técnicos em investimentos e habilidades de comunicação e relacionamento.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">3. Gestor de Fundos</h3>
            <p class="mb-4">Administra recursos de terceiros alocados em fundos de investimento, tomando decisões sobre:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Estratégias de alocação de ativos</li>
              <li class="mb-1">Análise de oportunidades de mercado</li>
              <li class="mb-1">Gestão de riscos</li>
              <li class="mb-1">Monitoramento de desempenho</li>
            </ul>
            <p class="mb-4"><strong>Como começar:</strong> Adquira experiência prática no setor, obtenha a certificação CGA e desenvolva forte capacidade analítica e conhecimento de mercado.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">4. Analista de Crédito</h3>
            <p class="mb-4">Avalia riscos e toma decisões relacionadas à concessão de crédito para pessoas físicas ou jurídicas:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Análise de documentação financeira</li>
              <li class="mb-1">Avaliação de capacidade de pagamento</li>
              <li class="mb-1">Estabelecimento de limites de crédito</li>
              <li class="mb-1">Monitoramento de carteiras de crédito</li>
            </ul>
            <p class="mb-4"><strong>Como começar:</strong> Desenvolva conhecimentos em finanças e contabilidade, construa um portfólio com exemplos de análises e aprimore habilidades de comunicação.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">5. Especialista em Finanças Corporativas</h3>
            <p class="mb-4">Trabalha com o planejamento financeiro de longo prazo de empresas, envolvendo:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Elaboração de orçamentos e projeções</li>
              <li class="mb-1">Análise de investimentos corporativos</li>
              <li class="mb-1">Gestão de capital de giro</li>
              <li class="mb-1">Relacionamento com investidores</li>
            </ul>
            <p class="mb-4"><strong>Como começar:</strong> Busque estágios em departamentos financeiros, familiarize-se com ferramentas de modelagem financeira e sistemas de gestão.</p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Estratégias para Ingressar no Mercado</h2>
            <p class="mb-4">Iniciar uma carreira no mercado financeiro pode ser desafiador devido à alta competitividade. Aqui estão algumas estratégias eficazes:</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Estágios e Programas de Trainee</h3>
            <p class="mb-4">Grandes instituições financeiras oferecem programas estruturados que são excelentes portas de entrada. Eles proporcionam:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Visão ampla dos diferentes departamentos</li>
              <li class="mb-1">Mentoria de profissionais experientes</li>
              <li class="mb-1">Treinamentos específicos</li>
              <li class="mb-1">Networking interno</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Bancos como Porta de Entrada</h3>
            <p class="mb-4">Iniciar a carreira em bancos comerciais pode ser uma estratégia eficaz, pois oferecem:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Exposição a diversos produtos e serviços financeiros</li>
              <li class="mb-1">Treinamentos estruturados</li>
              <li class="mb-1">Possibilidades de mobilidade interna</li>
              <li class="mb-1">Rede de contatos abrangente</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Networking Estratégico</h3>
            <p class="mb-4">Construir uma rede de contatos é fundamental no mercado financeiro:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Participe de eventos e congressos do setor</li>
              <li class="mb-1">Conecte-se com profissionais no LinkedIn</li>
              <li class="mb-1">Engaje-se em grupos e associações profissionais</li>
              <li class="mb-1">Busque mentores experientes na área</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Educação Contínua</h3>
            <p class="mb-4">Mantenha-se atualizado e em constante aprendizado:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Acompanhe publicações especializadas e relatórios de mercado</li>
              <li class="mb-1">Participe de cursos e webinars</li>
              <li class="mb-1">Obtenha certificações relevantes para sua área de interesse</li>
              <li class="mb-1">Considere uma pós-graduação ou MBA em Finanças</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Conclusão</h2>
            <blockquote class="italic border-l-4 border-gray-300 pl-4 py-2 my-6 text-gray-600">
              Iniciar uma carreira no mercado financeiro exige preparação, dedicação e uma estratégia bem definida. Embora o caminho possa ser desafiador, os benefícios são significativos: remuneração atrativa, possibilidades de crescimento e um ambiente dinâmico que estimula o desenvolvimento contínuo. O segredo está em combinar uma sólida formação acadêmica com certificações reconhecidas pelo mercado, desenvolver habilidades técnicas e comportamentais valorizadas pelo setor, e construir uma rede de relacionamentos estratégicos.
            </blockquote>

            <p class="mb-4">Lembre-se que cada trajetória profissional é única. Identifique a área do mercado financeiro que mais se alinha com seus interesses e habilidades, e direcione seus esforços para se especializar nela. Com persistência, aprendizado contínuo e uma abordagem estratégica, você estará bem posicionado para construir uma carreira de sucesso neste setor tão promissor.</p>

            <hr class="my-10 border-t border-gray-200">
          </div>
        `
      },

      {
        id: "6",
        title: "Como Criar um Orçamento Pessoal: O Primeiro Passo para sua Liberdade Financeira",
        description: "Aprenda a elaborar um orçamento pessoal eficiente, acompanhar seus gastos e criar hábitos financeiros saudáveis que transformarão sua relação com o dinheiro e abrirão caminho para a realização de seus objetivos.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80",
        category: "iniciantes",
        author: "Leonardo Figueiredo",
        date: "2 de Junho, 2025",
        readTime: "9 min de leitura",
        featured: true,
        content: `
          <div class="article-content">
            <p class="text-lg mb-4">
              Você já se perguntou para onde vai seu dinheiro todo mês? Ou já chegou ao final do mês sem entender como o salário acabou tão rápido? Se a resposta for sim, você não está sozinho. Segundo pesquisas recentes, mais de 60% dos brasileiros enfrentam dificuldades para controlar suas finanças pessoais, e muitos vivem no limite do orçamento ou endividados.
            </p>

            <p class="text-lg mb-6">
              A boa notícia é que existe uma ferramenta simples e poderosa que pode transformar completamente sua relação com o dinheiro: o <strong>orçamento pessoal</strong>. Mais que uma simples planilha de gastos, um orçamento bem estruturado é o mapa que guiará sua jornada rumo à liberdade financeira e à realização de seus sonhos.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Por que Criar um Orçamento Pessoal?</h2>
            <p class="mb-4">Antes de mergulharmos nos detalhes práticos, é importante entender os benefícios de ter um orçamento:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Consciência financeira:</strong> Você passa a conhecer exatamente para onde vai seu dinheiro.</li>
              <li class="mb-2"><strong>Controle de gastos:</strong> Identifica despesas desnecessárias e áreas onde pode economizar.</li>
              <li class="mb-2"><strong>Eliminação de dívidas:</strong> Cria um plano estruturado para quitar pendências financeiras.</li>
              <li class="mb-2"><strong>Planejamento para o futuro:</strong> Permite direcionar recursos para objetivos de curto, médio e longo prazo.</li>
              <li class="mb-2"><strong>Redução do estresse:</strong> Diminui a ansiedade relacionada a questões financeiras.</li>
              <li class="mb-2"><strong>Construção de patrimônio:</strong> Abre caminho para investimentos e crescimento financeiro.</li>
            </ul>

            <div class="my-8 text-center">
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Pessoa organizando finanças" class="max-w-full mx-auto rounded" style="max-width: 500px;">
              <p class="text-sm text-gray-500 mt-2">Um orçamento bem estruturado é a base para uma vida financeira equilibrada e próspera.</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Os Pilares de um Orçamento Eficiente</h2>
            <p class="mb-4">Um orçamento pessoal eficaz se baseia em quatro pilares fundamentais:</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Reconhecer</h3>
            <p class="mb-4">O primeiro passo é reconhecer sua situação financeira atual com honestidade e clareza. Isso inclui:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Identificar todas as fontes de renda</li>
              <li class="mb-1">Listar todas as despesas fixas e variáveis</li>
              <li class="mb-1">Mapear dívidas existentes</li>
              <li class="mb-1">Avaliar seus hábitos de consumo</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Registrar</h3>
            <p class="mb-4">O segundo pilar consiste em registrar sistematicamente todas as movimentações financeiras:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Anotar cada gasto, por menor que seja</li>
              <li class="mb-1">Categorizar as despesas (alimentação, moradia, transporte, etc.)</li>
              <li class="mb-1">Documentar receitas e datas de recebimento</li>
              <li class="mb-1">Manter registros organizados e acessíveis</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Revisar</h3>
            <p class="mb-4">O terceiro pilar envolve a análise regular dos registros financeiros:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Comparar gastos planejados vs. realizados</li>
              <li class="mb-1">Identificar padrões de consumo</li>
              <li class="mb-1">Detectar áreas problemáticas</li>
              <li class="mb-1">Avaliar o progresso em direção aos objetivos</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Realizar</h3>
            <p class="mb-4">O quarto pilar consiste em tomar ações concretas com base nas análises:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Ajustar o orçamento conforme necessário</li>
              <li class="mb-1">Implementar estratégias de economia</li>
              <li class="mb-1">Renegociar dívidas ou despesas fixas</li>
              <li class="mb-1">Direcionar recursos para prioridades</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Passo a Passo para Criar seu Orçamento</h2>
            <p class="mb-4">Agora que entendemos os fundamentos, vamos ao processo prático de criação do seu orçamento pessoal:</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Passo 1: Escolha sua Ferramenta</h3>
            <p class="mb-4">Existem diversas opções para registrar e acompanhar seu orçamento:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Planilhas:</strong> Excel ou Google Sheets oferecem flexibilidade e personalização.</li>
              <li class="mb-2"><strong>Aplicativos:</strong> Opções como Mobills, Organizze ou Guiabolso facilitam o registro e categorização automática.</li>
              <li class="mb-2"><strong>Caderno físico:</strong> Para quem prefere o método tradicional de anotações manuais.</li>
              <li class="mb-2"><strong>Modelos prontos:</strong> Disponíveis gratuitamente em sites como Microsoft Office, Google Planilhas ou portais financeiros.</li>
            </ul>
            <p class="mb-4">Escolha a ferramenta que melhor se adapta ao seu estilo e rotina. O importante é que seja prática e que você consiga manter a consistência no uso.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Passo 2: Liste Todas as Suas Fontes de Renda</h3>
            <p class="mb-4">Registre todos os valores que entram no seu orçamento mensalmente:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Salário líquido (após impostos e deduções)</li>
              <li class="mb-1">Rendimentos de investimentos</li>
              <li class="mb-1">Trabalhos freelance ou extras</li>
              <li class="mb-1">Pensões ou benefícios</li>
              <li class="mb-1">Outras fontes de renda</li>
            </ul>
            <p class="mb-4">Some todos esses valores para obter sua renda total mensal. Se você tem rendimentos variáveis, trabalhe com a média dos últimos três meses ou com o valor mínimo que costuma receber.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Passo 3: Identifique e Categorize suas Despesas</h3>
            <p class="mb-4">Faça um levantamento detalhado de todos os seus gastos, dividindo-os em categorias:</p>

            <p class="mb-2"><strong>Despesas Fixas:</strong></p>
            <ul class="list-disc pl-8 mb-4">
              <li class="mb-1">Moradia (aluguel, financiamento, condomínio)</li>
              <li class="mb-1">Contas básicas (água, luz, gás, internet)</li>
              <li class="mb-1">Transporte (combustível, transporte público, prestações de veículo)</li>
              <li class="mb-1">Educação (mensalidades escolares)</li>
              <li class="mb-1">Saúde (plano de saúde, medicamentos de uso contínuo)</li>
              <li class="mb-1">Seguros (vida, residencial, veículo)</li>
              <li class="mb-1">Assinaturas e mensalidades (streaming, academia, etc.)</li>
            </ul>

            <p class="mb-2"><strong>Despesas Variáveis:</strong></p>
            <ul class="list-disc pl-8 mb-4">
              <li class="mb-1">Alimentação (supermercado, restaurantes, delivery)</li>
              <li class="mb-1">Lazer e entretenimento</li>
              <li class="mb-1">Vestuário</li>
              <li class="mb-1">Cuidados pessoais</li>
              <li class="mb-1">Presentes</li>
              <li class="mb-1">Manutenção da casa ou veículo</li>
              <li class="mb-1">Gastos sazonais (impostos anuais, material escolar, etc.)</li>
            </ul>

            <p class="mb-2"><strong>Dívidas:</strong></p>
            <ul class="list-disc pl-8 mb-4">
              <li class="mb-1">Cartão de crédito</li>
              <li class="mb-1">Empréstimos pessoais</li>
              <li class="mb-1">Financiamentos</li>
              <li class="mb-1">Cheque especial</li>
            </ul>

            <p class="mb-2"><strong>Investimentos e Poupança:</strong></p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Reserva de emergência</li>
              <li class="mb-1">Aposentadoria</li>
              <li class="mb-1">Objetivos específicos (viagem, casa própria, etc.)</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Passo 4: Compare Receitas e Despesas</h3>
            <p class="mb-4">Subtraia o total de despesas da sua renda total. O resultado mostrará sua situação financeira atual:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Resultado positivo:</strong> Você tem um superávit que pode ser direcionado para investimentos ou objetivos específicos.</li>
              <li class="mb-2"><strong>Resultado zero:</strong> Você está no limite do orçamento, sem margem para imprevistos.</li>
              <li class="mb-2"><strong>Resultado negativo:</strong> Você está gastando mais do que ganha, acumulando dívidas.</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Passo 5: Estabeleça Metas Financeiras</h3>
            <p class="mb-4">Com base na sua situação atual, defina objetivos claros e realistas:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Curto prazo (até 1 ano):</strong> Quitar dívidas de cartão, criar reserva de emergência, fazer uma viagem.</li>
              <li class="mb-2"><strong>Médio prazo (1-5 anos):</strong> Comprar um carro, fazer uma pós-graduação, trocar de apartamento.</li>
              <li class="mb-2"><strong>Longo prazo (mais de 5 anos):</strong> Comprar uma casa, garantir a educação dos filhos, preparar a aposentadoria.</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Passo 6: Ajuste seu Orçamento</h3>
            <p class="mb-4">Com base na análise e nas metas estabelecidas, faça os ajustes necessários:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Se estiver no negativo:</strong> Identifique despesas que podem ser reduzidas ou eliminadas.</li>
              <li class="mb-2"><strong>Se estiver no zero:</strong> Busque formas de reduzir gastos para criar uma margem de segurança.</li>
              <li class="mb-2"><strong>Se estiver no positivo:</strong> Defina como alocar o excedente entre objetivos de curto, médio e longo prazo.</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Passo 7: Implemente e Monitore</h3>
            <p class="mb-4">Coloque seu orçamento em prática e estabeleça uma rotina de acompanhamento:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Diariamente:</strong> Registre todos os gastos assim que ocorrerem.</li>
              <li class="mb-2"><strong>Semanalmente:</strong> Verifique se está dentro do planejado para cada categoria.</li>
              <li class="mb-2"><strong>Mensalmente:</strong> Analise o orçamento completo, compare com o planejado e faça ajustes.</li>
              <li class="mb-2"><strong>Trimestralmente:</strong> Revise suas metas e avalie seu progresso.</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Dicas para Manter seu Orçamento Funcionando</h2>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3">
                <strong>Seja realista:</strong>
                <p class="mt-1">Um orçamento muito restritivo tende a ser abandonado. Inclua uma categoria para pequenos prazeres e gastos discricionários.</p>
              </li>
              <li class="mb-3">
                <strong>Use a regra 50/30/20:</strong>
                <p class="mt-1">Uma diretriz simples: destine 50% da renda para necessidades básicas, 30% para desejos e 20% para poupança e investimentos.</p>
              </li>
              <li class="mb-3">
                <strong>Automatize o que puder:</strong>
                <p class="mt-1">Configure transferências automáticas para sua conta de investimentos logo após receber seu salário.</p>
              </li>
              <li class="mb-3">
                <strong>Use o método dos envelopes:</strong>
                <p class="mt-1">Separe fisicamente (ou virtualmente) o dinheiro para cada categoria de gasto, evitando usar recursos de uma categoria em outra.</p>
              </li>
              <li class="mb-3">
                <strong>Preveja gastos sazonais:</strong>
                <p class="mt-1">Reserve mensalmente uma fração para despesas que ocorrem anualmente, como IPTU, IPVA, material escolar, etc.</p>
              </li>
              <li class="mb-3">
                <strong>Envolva a família:</strong>
                <p class="mt-1">Se você divide despesas com cônjuge ou familiares, inclua-os no processo para garantir o comprometimento de todos.</p>
              </li>
              <li class="mb-3">
                <strong>Celebre as conquistas:</strong>
                <p class="mt-1">Reconheça e comemore quando atingir marcos importantes, como quitar uma dívida ou completar sua reserva de emergência.</p>
              </li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Ferramentas Gratuitas para Controle Financeiro</h2>
            <p class="mb-4">Existem diversas opções gratuitas que podem facilitar a criação e manutenção do seu orçamento:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Google Sheets:</strong> Oferece modelos prontos de orçamento e a vantagem de acesso em qualquer dispositivo.</li>
              <li class="mb-2"><strong>Microsoft Excel:</strong> Disponibiliza diversos templates de orçamento pessoal para download.</li>
              <li class="mb-2"><strong>Mobills:</strong> Aplicativo brasileiro com versão gratuita que permite controle de gastos e categorização.</li>
              <li class="mb-2"><strong>Organizze:</strong> Plataforma nacional com interface intuitiva e recursos de planejamento financeiro.</li>
              <li class="mb-2"><strong>Guiabolso:</strong> Conecta-se às suas contas bancárias para categorização automática de gastos.</li>
              <li class="mb-2"><strong>Planilhas da B3:</strong> A Bolsa de Valores brasileira disponibiliza modelos gratuitos para controle financeiro.</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Superando Desafios Comuns</h2>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3">
                <strong>"Não tenho tempo para registrar tudo"</strong>
                <p class="mt-1">Solução: Use aplicativos que automatizam parte do processo ou dedique apenas 5 minutos diários para registros rápidos.</p>
              </li>
              <li class="mb-3">
                <strong>"Sempre aparecem gastos imprevistos"</strong>
                <p class="mt-1">Solução: Crie uma categoria específica para imprevistos, destinando cerca de 5-10% da sua renda para ela.</p>
              </li>
              <li class="mb-3">
                <strong>"Não consigo controlar minhas despesas"</strong>
                <p class="mt-1">Solução: Use a regra 50/30/20 para direcionar seu dinheiro, ou crie uma categoria específica para essas despesas.</p>
              </li>
              <li class="mb-3">
                <strong>"Meu parceiro(a) não colabora com o orçamento"</strong>
                <p class="mt-1">Solução: Estabeleça uma conversa franca sobre finanças e crie um sistema que funcione para ambos, com responsabilidades claras.</p>
              </li>
              <li class="mb-3">
                <strong>"Tenho renda variável, como fazer um orçamento?"</strong>
                <p class="mt-1">Solução: Trabalhe com a média dos últimos seis meses ou com o valor mínimo que costuma receber, criando um "colchão" para os meses de menor renda.</p>
              </li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Conclusão: O Caminho para a Liberdade Financeira</h2>
            <p class="mb-4">Criar e manter um orçamento pessoal não é apenas uma questão de controlar gastos – é o primeiro e mais importante passo para conquistar sua liberdade financeira. Com um orçamento bem estruturado, você:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2">Assume o controle do seu dinheiro, em vez de ser controlado por ele</li>
              <li class="mb-2">Cria uma base sólida para realizar seus sonhos e objetivos</li>
              <li class="mb-2">Reduz o estresse e a ansiedade relacionados às finanças</li>
              <li class="mb-2">Desenvolve hábitos financeiros saudáveis que durarão toda a vida</li>
            </ul>
            <p class="mb-4">Lembre-se: o orçamento perfeito é aquele que funciona para você. Não existe uma fórmula única que atenda a todas as pessoas. Experimente diferentes abordagens, adapte as sugestões à sua realidade e, principalmente, tenha paciência e persistência.</p>
            <p class="mb-4">O caminho para a liberdade financeira é uma maratona, não uma corrida de 100 metros. Cada pequeno passo na direção certa – começando pelo seu orçamento pessoal – o aproxima de uma vida com mais tranquilidade, escolhas e realizações.</p>
            <strong><p class="mb-4">Comece hoje mesmo. Seu futuro você irá se agradecer no futuro...</p></strong>

          </div>
        `
      },
      {
        id: "7",
        title: "Tesouro Direto vs. CDB: Qual é o Melhor para Você?",
        description: "Uma análise completa comparando Tesouro Direto e CDBs: entenda as diferenças, vantagens, tributação e descubra qual opção se alinha melhor com seus objetivos financeiros.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80",
        category: "investimentos",
        author: "Leonardo Figueiredo",
        date: "5 de Julho, 2025",
        readTime: "10 min de leitura",
        featured: false,
        content: `
          <div class="article-content">
            <p class="text-lg mb-4">
              Quando se trata de investimentos de renda fixa no Brasil, o Tesouro Direto e os Certificados de Depósito Bancário (CDBs) frequentemente aparecem como as primeiras recomendações para quem está começando. Com a <strong>taxa Selic a 10,50% ao ano</strong> (julho de 2025) e um cenário econômico de juros elevados, ambas as opções oferecem rentabilidade atrativa com baixo risco.
            </p>

            <p class="text-lg mb-6">
              Mas afinal, qual deles é a melhor escolha para o seu dinheiro? A resposta, como você verá neste artigo, não é tão simples quanto parece. Cada opção tem suas particularidades, vantagens e desvantagens que precisam ser consideradas de acordo com seus objetivos financeiros, horizonte de investimento e perfil de risco.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">1. Entendendo o Básico: O que são Tesouro Direto e CDBs?</h2>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Tesouro Direto</h3>
            <p class="mb-4">O Tesouro Direto é um programa do governo federal que permite a pessoas físicas comprarem títulos públicos diretamente pela internet. Quando você investe no Tesouro Direto, está essencialmente emprestando dinheiro para o governo brasileiro, que se compromete a devolvê-lo com juros após um período determinado.</p>
            <p class="mb-4">Os principais tipos de títulos disponíveis são:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>Tesouro Selic (LFT):</strong> Rendimento atrelado à taxa Selic, ideal para reserva de emergência e objetivos de curto prazo.</li>
              <li class="mb-2"><strong>Tesouro IPCA+ (NTN-B):</strong> Rendimento composto por uma taxa prefixada mais a variação do IPCA, oferecendo proteção contra a inflação.</li>
              <li class="mb-2"><strong>Tesouro Prefixado (LTN e NTN-F):</strong> Taxa de juros definida no momento da compra, permitindo saber exatamente quanto receberá no vencimento.</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">CDBs (Certificados de Depósito Bancário)</h3>
            <p class="mb-4">Os CDBs são títulos de renda fixa emitidos por bancos. Ao investir em um CDB, você está emprestando dinheiro para a instituição financeira, que utilizará esses recursos para financiar suas operações e pagará juros pelo empréstimo.</p>
            <p class="mb-4">Os CDBs podem ter diferentes características:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2"><strong>CDB pós-fixado:</strong> Rendimento atrelado a um indexador, geralmente o CDI (que segue de perto a taxa Selic).</li>
              <li class="mb-2"><strong>CDB prefixado:</strong> Taxa de juros definida no momento da aplicação.</li>
              <li class="mb-2"><strong>CDB híbrido:</strong> Combinação de indexador (como IPCA) mais uma taxa prefixada.</li>
            </ul>

            <div class="my-8 text-center">
              <img src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Comparação entre investimentos" class="max-w-full mx-auto rounded" style="max-width: 500px;">
              <p class="text-sm text-gray-500 mt-2">A escolha entre Tesouro Direto e CDB depende de diversos fatores, incluindo seus objetivos financeiros e perfil de risco.</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">2. Comparativo: Tesouro Direto vs. CDB</h2>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Segurança</h3>
            <p class="mb-4"><strong>Tesouro Direto:</strong> É considerado o investimento mais seguro do mercado brasileiro, pois é garantido pelo Tesouro Nacional (governo federal). O risco teórico seria um calote do governo, cenário extremamente improvável.</p>
            <p class="mb-4"><strong>CDB:</strong> Possui boa segurança, contando com a proteção do Fundo Garantidor de Créditos (FGC) para valores até R$ 250.000 por CPF e por instituição financeira. O risco está associado à solidez do banco emissor.</p>
            <p class="mb-4"><strong>Veredito:</strong> Em termos de segurança, o Tesouro Direto leva uma ligeira vantagem, especialmente para valores acima do limite do FGC.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Rentabilidade</h3>
            <p class="mb-4"><strong>Tesouro Direto:</strong> O Tesouro Selic costuma render aproximadamente 100% da taxa Selic. Em julho de 2025, com a Selic a 10,50%, isso significa um rendimento bruto anual próximo a esse percentual.</p>
            <p class="mb-4"><strong>CDB:</strong> A rentabilidade varia conforme o banco emissor e o prazo. Bancos menores ou digitais frequentemente oferecem CDBs com rentabilidade superior a 100% do CDI (que acompanha de perto a Selic). É possível encontrar opções que pagam entre 105% e 120% do CDI.</p>
            <p class="mb-4"><strong>Veredito:</strong> Em termos de rentabilidade bruta, os CDBs geralmente oferecem melhores taxas, especialmente aqueles emitidos por bancos médios e pequenos que precisam captar recursos.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Liquidez</h3>
            <p class="mb-4"><strong>Tesouro Direto:</strong> Todos os títulos podem ser vendidos antes do vencimento em dias úteis, com liquidação em D+1 (um dia útil). No entanto, se vendidos antes do vencimento, estão sujeitos ao preço de mercado, que pode resultar em rentabilidade diferente da contratada.</p>
            <p class="mb-4"><strong>CDB:</strong> A liquidez varia conforme o título. Existem CDBs com liquidez diária (resgate a qualquer momento) e outros com carência ou data específica para resgate. CDBs com liquidez diária geralmente oferecem rentabilidade menor.</p>
            <p class="mb-4"><strong>Veredito:</strong> Ambos podem oferecer boa liquidez, mas o Tesouro Direto tende a ser mais padronizado nesse aspecto, enquanto os CDBs variam muito conforme o emissor e as condições específicas do título.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Tributação</h3>
            <p class="mb-4">Tanto o Tesouro Direto quanto os CDBs estão sujeitos à mesma tabela regressiva de Imposto de Renda:</p>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-1">Até 180 dias: 22,5%</li>
              <li class="mb-1">De 181 a 360 dias: 20%</li>
              <li class="mb-1">De 361 a 720 dias: 17,5%</li>
              <li class="mb-1">Acima de 720 dias: 15%</li>
            </ul>
            <p class="mb-4"><strong>Tesouro Direto:</strong> Além do IR, há cobrança de taxa de custódia da B3 de 0,20% ao ano sobre o valor dos títulos (limitada a R$ 10.000 por conta).</p>
            <p class="mb-4"><strong>CDB:</strong> Não há taxa de custódia, apenas o Imposto de Renda.</p>
            <p class="mb-4"><strong>Veredito:</strong> Os CDBs levam vantagem por não terem a taxa de custódia, o que pode fazer diferença no rendimento líquido, especialmente em investimentos de longo prazo.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Valor Mínimo para Investimento</h3>
            <p class="mb-4"><strong>Tesouro Direto:</strong> A partir de aproximadamente R$ 30 (varia conforme o preço unitário do título).</p>
            <p class="mb-4"><strong>CDB:</strong> Varia conforme a instituição, mas é possível encontrar opções a partir de R$ 100 ou até menos em alguns bancos digitais.</p>
            <p class="mb-4"><strong>Veredito:</strong> Ambos são acessíveis para pequenos investidores, com o Tesouro Direto oferecendo entrada ligeiramente mais baixa.</p>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">3. Cenários: Quando Escolher Cada Opção</h2>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Quando o Tesouro Direto é Mais Vantajoso</h3>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3">
                <strong>Para investimentos acima do limite do FGC:</strong>
                <p class="mt-1">Se você pretende investir mais de R$ 250.000, o Tesouro Direto oferece segurança para todo o montante, enquanto no CDB você precisaria diversificar entre diferentes instituições para manter a proteção do FGC.</p>
              </li>
              <li class="mb-3">
                <strong>Para proteção contra inflação de longo prazo:</strong>
                <p class="mt-1">O Tesouro IPCA+ é uma excelente opção para proteger o poder de compra do seu dinheiro no longo prazo, sendo ideal para objetivos como aposentadoria.</p>
              </li>
              <li class="mb-3">
                <strong>Para quem busca previsibilidade total:</strong>
                <p class="mt-1">Com o Tesouro Prefixado, você sabe exatamente quanto receberá no vencimento, o que facilita o planejamento financeiro para objetivos específicos.</p>
              </li>
              <li class="mb-3">
                <strong>Para investidores mais conservadores:</strong>
                <p class="mt-1">Quem prioriza segurança acima de tudo encontrará no Tesouro Direto a opção mais adequada ao seu perfil.</p>
              </li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Quando o CDB é Mais Vantajoso</h3>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3">
                <strong>Para maximizar rentabilidade:</strong>
                <p class="mt-1">CDBs de bancos médios e pequenos geralmente oferecem taxas mais atrativas (110% a 120% do CDI) comparadas ao Tesouro Selic (aproximadamente 100% da Selic).</p>
              </li>
              <li class="mb-3">
                <strong>Para evitar taxas adicionais:</strong>
                <p class="mt-1">A ausência da taxa de custódia torna os CDBs mais eficientes em termos de custo, especialmente para investimentos de longo prazo.</p>
              </li>
              <li class="mb-3">
                <strong>Para quem busca liquidez diária sem volatilidade:</strong>
                <p class="mt-1">CDBs com liquidez diária não sofrem oscilações de preço como os títulos do Tesouro quando resgatados antes do vencimento.</p>
              </li>
              <li class="mb-3">
                <strong>Para diversificação dentro da renda fixa:</strong>
                <p class="mt-1">Incluir CDBs na carteira permite diversificar entre diferentes emissores e condições, complementando investimentos no Tesouro.</p>
              </li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">4. Estratégias Combinadas: O Melhor dos Dois Mundos</h2>
            <p class="mb-4">Em vez de escolher apenas uma opção, muitos investidores optam por combinar Tesouro Direto e CDBs em suas carteiras. Algumas estratégias eficientes incluem:</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Estratégia de Reserva de Emergência</h3>
            <p class="mb-4">Utilize o Tesouro Selic e CDBs com liquidez diária para sua reserva de emergência, que deve cobrir de 3 a 6 meses de despesas. Essa combinação oferece segurança, liquidez e rentabilidade razoável.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Estratégia de Escada de Vencimentos</h3>
            <p class="mb-4">Distribua seus investimentos em títulos com diferentes prazos de vencimento (3 meses, 6 meses, 1 ano, etc.), alternando entre Tesouro e CDBs conforme as melhores condições disponíveis para cada prazo.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Estratégia de Proteção Inflacionária</h3>
            <p class="mb-4">Combine Tesouro IPCA+ para objetivos de longo prazo com CDBs atrelados ao CDI para necessidades de médio prazo, garantindo tanto proteção contra a inflação quanto aproveitamento de ciclos de alta de juros.</p>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Estratégia de Diversificação de Risco</h3>
            <p class="mb-4">Mantenha a base da sua carteira em Tesouro Direto e complemente com CDBs de diferentes instituições, respeitando o limite do FGC por instituição, para melhorar a rentabilidade média sem comprometer significativamente a segurança.</p>

            <div class="my-8 text-center">
              <img src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80" alt="Planejamento financeiro" class="max-w-full mx-auto rounded" style="max-width: 500px;">
              <p class="text-sm text-gray-500 mt-2">Uma estratégia combinada pode oferecer o equilíbrio ideal entre segurança, rentabilidade e liquidez para seus objetivos financeiros.</p>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">5. Dicas Práticas para Investir</h2>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Para Investir no Tesouro Direto</h3>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2">Abra uma conta em uma corretora de valores ou banco que ofereça acesso ao Tesouro Direto.</li>
              <li class="mb-2">Compare as taxas de administração cobradas pelas diferentes instituições (muitas oferecem taxa zero).</li>
              <li class="mb-2">Faça seu cadastro no site do Tesouro Direto (www.tesourodireto.com.br) para acompanhar seus investimentos.</li>
              <li class="mb-2">Antes de investir, verifique os preços e taxas dos títulos disponíveis, que variam diariamente.</li>
              <li class="mb-2">Considere o prazo do seu objetivo ao escolher o título mais adequado.</li>
            </ul>

            <h3 class="text-xl font-semibold text-gray-800 mt-6 mb-3">Para Investir em CDBs</h3>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-2">Pesquise as ofertas disponíveis em diferentes instituições financeiras, comparando rentabilidade, prazo e liquidez.</li>
              <li class="mb-2">Verifique a solidez do banco emissor consultando seu rating de crédito.</li>
              <li class="mb-2">Leia atentamente as condições do CDB, especialmente quanto à liquidez e possibilidade de resgate antecipado.</li>
              <li class="mb-2">Diversifique entre diferentes emissores para maximizar a proteção do FGC.</li>
              <li class="mb-2">Considere o prazo de vencimento em relação à tabela regressiva de IR para otimizar a tributação.</li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">6. Erros Comuns a Evitar</h2>
            <ul class="list-disc pl-8 mb-6">
              <li class="mb-3">
                <strong>Focar apenas na rentabilidade:</strong>
                <p class="mt-1">Não considere apenas a taxa oferecida; avalie também segurança, liquidez e adequação ao seu objetivo.</p>
              </li>
              <li class="mb-3">
                <strong>Ignorar o efeito da tributação:</strong>
                <p class="mt-1">Lembre-se que a rentabilidade anunciada é sempre bruta; calcule o rendimento líquido após impostos e taxas para comparações justas.</p>
              </li>
              <li class="mb-3">
                <strong>Não diversificar entre emissores:</strong>
                <p class="mt-1">Concentrar grandes valores em CDBs de uma única instituição pode deixar parte do investimento sem a proteção do FGC.</p>
              </li>
              <li class="mb-3">
                <strong>Vender títulos do Tesouro em momentos inadequados:</strong>
                <p class="mt-1">Resgatar títulos prefixados ou IPCA+ antes do vencimento pode resultar em rentabilidade abaixo da esperada devido às oscilações de mercado.</p>
              </li>
              <li class="mb-3">
                <strong>Não alinhar os investimentos aos objetivos:</strong>
                <p class="mt-1">Escolher títulos com prazos incompatíveis com seus objetivos financeiros pode comprometer seus planos ou resultar em perdas de rentabilidade.</p>
              </li>
            </ul>

            <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">7. Conclusão: A Escolha Certa para Você</h2>
            <p class="mb-4">A decisão entre Tesouro Direto e CDB não precisa ser exclusiva. Na verdade, a estratégia mais eficiente para a maioria dos investidores é utilizar ambos de forma complementar, aproveitando as vantagens de cada um conforme seus objetivos específicos.</p>

            <p class="mb-4">Para investidores iniciantes, uma abordagem sensata seria:</p>
            <ol class="list-decimal pl-8 mb-6">
              <li class="mb-2">Começar com o Tesouro Selic para sua reserva de emergência, garantindo segurança e liquidez.</li>
              <li class="mb-2">À medida que sua carteira cresce, adicionar CDBs de bancos sólidos com rentabilidade atrativa para melhorar o rendimento médio.</li>
              <li class="mb-2">Para objetivos de longo prazo, considerar o Tesouro IPCA+ para proteção contra a inflação.</li>
              <li class="mb-2">Diversificar entre diferentes emissores de CDBs, respeitando o limite do FGC por instituição.</li>
            </ol>

            <blockquote class="italic border-l-4 border-gray-300 pl-4 py-2 my-6 text-gray-600">
              Lembre-se: o melhor investimento não é necessariamente o que oferece a maior rentabilidade, mas aquele que melhor se alinha aos seus objetivos, horizonte de tempo e tolerância ao risco. Tanto o Tesouro Direto quanto os CDBs são excelentes opções de renda fixa que, quando utilizados estrategicamente, podem formar a base sólida da sua jornada de investimentos.
            </blockquote>

            <hr class="my-10 border-t border-gray-200">
          </div>
        `
      },
      {
        id: "8",
        title: "Startups do Vale do Silício Intensificam a Cultura do Esforço Extremo",
        description: "Empresas emergentes de tecnologia estão adotando jornadas de trabalho extenuantes, desafiando os limites do equilíbrio entre vida profissional e pessoal.",
        image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        category: "startups",
        author: "Leonardo Figueiredo",
        date: "4 de Junho, 2025",
        publishedAt: new Date("2025-06-04").getTime(),
        readTime: "15 min de leitura",
        featured: true,
        content: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px;">
    No competitivo cenário do <strong style="color: #2563eb; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">Vale do Silício</strong>, startups estão elevando a cultura do <em style="font-weight: 600;">"esforço extremo"</em> a patamares inéditos. Empresas como a <strong style="color: #2563eb;">Arrowster</strong>, especializada em <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 500;">inteligência artificial</span> para auxiliar estudantes em programas de intercâmbio, estão buscando profissionais dispostos a trabalhar <strong style="color: #2563eb; text-decoration: underline;">sete dias por semana</strong>. O CEO <strong>Kenneth Chong</strong> compara a dedicação exigida à de <em style="font-weight: 600;">atletas de alto rendimento</em>, enfatizando que essa rotina intensa não é para todos.
  </p>

  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px;">
    A <strong style="color: #2563eb;">Arrowster</strong> não está sozinha nessa abordagem. A <strong style="color: #2563eb;">Corgi</strong>, apoiada pela <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Y Combinator</span>, também adota uma <em style="font-weight: 600;">semana de trabalho sem folgas</em>, destacando em suas vagas a necessidade de ultrapassar limites para alcançar resultados. Outras startups, como a <strong style="color: #2563eb;">Latchbio</strong> e a <strong style="color: #2563eb;">Autotab</strong>, optam por jornadas de <strong>seis dias</strong>, oferecendo incentivos como <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 500;">bônus de moradia</span> para atrair talentos comprometidos.
  </p>

  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px;">
    A <strong style="color: #2563eb;">Decagon</strong>, desenvolvedora de <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 500;">agentes de IA</span> para atendimento ao cliente, implementou uma cultura onde até <strong style="color: #2563eb;">um terço dos funcionários trabalha aos domingos</strong>, buscando <em style="font-weight: 600;">colaboração presencial</em> sem as distrações típicas dos dias úteis. Essa prática surgiu de forma orgânica, com os fundadores frequentando o escritório aos domingos e sendo seguidos por outros membros da equipe.
  </p>

  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px;">
    A pressão para <em style="font-weight: 600;">inovar rapidamente</em> em um mercado dominado por gigantes como <strong style="color: #2563eb; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">OpenAI</strong> e <strong style="color: #2563eb; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">Anthropic</strong> leva essas startups a adotarem <em style="font-weight: 600;">jornadas extenuantes</em> como diferencial competitivo. <strong>Daksh Gupta</strong>, cofundador da <strong style="color: #2563eb;">Greptile</strong>, viralizou ao afirmar que sua empresa exige pelo menos <strong style="color: #2563eb;">seis dias de trabalho por semana</strong>, sem oferecer <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 500;">equilíbrio entre vida pessoal e profissional</span>. Apesar das críticas, a abordagem atraiu tanto ameaças quanto currículos interessados.
  </p>

  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px;">
    Internacionalmente, <em style="font-weight: 600;">culturas de trabalho intensas</em> não são novidade. Na <strong>China</strong>, o modelo <strong style="color: #2563eb; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">"996"</strong> (trabalhar das 9h às 21h, seis dias por semana) é comum em empresas como <strong style="color: #2563eb;">Alibaba</strong> e <strong style="color: #2563eb;">ByteDance</strong>. Na <strong>Coreia do Sul</strong>, empresas como a <strong style="color: #2563eb;">Samsung</strong> exigem que gerentes trabalhem <strong style="color: #2563eb;">seis dias por semana</strong>. Na <strong>Grécia</strong>, uma lei recente instituiu a <em style="font-weight: 600;">semana de seis dias</em> para certos setores, com acréscimo de <strong>40% para horas extras</strong>.
  </p>

  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px;">
    No <strong>Brasil</strong>, embora a tendência predominante seja a busca por <em style="font-weight: 600;">jornadas reduzidas</em>, como a <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 500;">semana de quatro dias</span> adotada por algumas startups, há exceções. A <strong style="color: #2563eb;">Onfly</strong>, startup de <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 500;">viagens corporativas</span> com sede em <strong>Belo Horizonte</strong>, enfrentou desafios durante a <em style="font-weight: 600;">pandemia</em>, mas manteve operações graças à <em style="font-weight: 600;">dedicação intensa</em> de sua equipe. A empresa expandiu suas operações e foi reconhecida como uma das <strong>melhores para se trabalhar no Brasil</strong>.
  </p>

  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px;">
    Especialistas alertam para os <strong>riscos associados a jornadas excessivas</strong>, incluindo <em style="font-weight: 600;">burnout</em> e <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 500;">problemas legais</span> relacionados à legislação trabalhista. <strong>Catherine Fisk</strong>, professora de direito da <strong style="color: #2563eb; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">Universidade da Califórnia em Berkeley</strong>, destaca que, nos <strong>EUA</strong>, não há limite federal para dias ou horas trabalhadas, mas os estados possuem <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 500;">regulamentações específicas</span>. No entanto, a <em style="font-weight: 600;">qualidade do trabalho</em> pode ser comprometida quando a quantidade de horas supera a <strong>capacidade humana de desempenho sustentável</strong>.
  </p>

  <div style="background: #f8fafc; border: 1px solid #2563eb; border-radius: 8px; padding: 20px; margin: 25px 0;">
    <p style="margin: 0; text-align: justify; font-size: 16px; font-weight: 500; color: #475569;">
      A <strong>ironia</strong> reside no fato de que muitas dessas startups estão desenvolvendo <span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 600;">tecnologias de IA</span> com o objetivo de <em style="font-weight: 600;">aumentar a produtividade</em> e <em style="font-weight: 600;">reduzir a carga de trabalho humana</em>. <strong>Jamie Dimon</strong>, CEO do <strong style="color: #2563eb;">JPMorgan</strong>, previu que, graças à tecnologia, as futuras gerações trabalharão apenas <strong style="color: #2563eb;">três dias e meio por semana</strong>. No entanto, para alcançar esse futuro, as startups de hoje estão exigindo <strong>mais de seus colaboradores do que nunca</strong>.
    </p>
  </div>
</div>`
      },
      {
        id: "9",
        title: "Bitcoin para Iniciantes: Um Guia Completo da Primeira Criptomoeda do Mundo",
        description: "O Bitcoin é uma moeda digital descentralizada que permite transações diretas entre pessoas, sem a necessidade de intermediários como bancos ou governos. Criado em 2008 por uma entidade sob o pseudônimo de Satoshi Nakamoto, o Bitcoin surgiu como uma alternativa ao sistema financeiro tradicional, especialmente após a crise econômica global daquele ano.",
        image: "https://images.unsplash.com/photo-1623227413711-25ee4388dae3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        category: "cripto",
        author: "Leonardo Figueiredo",
        date: "4 de Junho, 2025",
        publishedAt: new Date("2025-06-04").getTime(),
        readTime: "10 min de leitura",
        featured: true,
        content: `<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.7; color: #333; max-width: 800px; margin: 0 auto; padding: 30px; background: #fff;">

  <h1 style="color: #2563eb; font-size: 28px; font-weight: 700; margin-bottom: 30px; text-align: left; border-bottom: 3px solid #2563eb; padding-bottom: 15px;">O que é o Bitcoin?</h1>

  <p style="margin-bottom: 25px; text-align: justify; font-size: 16px; line-height: 1.8;">
    O <strong style="color: #2563eb;">Bitcoin (BTC)</strong> é a primeira criptomoeda amplamente adotada no mundo. Ele possibilita transações ponto a ponto seguras e ininterruptas na internet. Ao contrário de serviços como Venmo e PayPal, que dependem do sistema financeiro tradicional, o Bitcoin é <strong style="color: #2563eb;">descentralizado</strong>: duas pessoas, em qualquer lugar do mundo, podem negociar Bitcoin entre si, sem o envolvimento de bancos, governos ou qualquer outra instituição.
  </p>

  <hr style="border: none; height: 1px; background: #e5e7eb; margin: 35px 0;">

  <h2 style="color: #2563eb; font-size: 22px; font-weight: 600; margin: 30px 0 20px 0;">Como Funciona o Bitcoin?</h2>

  <p style="margin-bottom: 25px; text-align: justify; font-size: 16px; line-height: 1.8;">
    O funcionamento do Bitcoin baseia-se em uma tecnologia chamada <strong style="color: #2563eb;">blockchain</strong>, que é um livro-razão digital público e descentralizado. Cada transação é registrada em blocos de dados, que são adicionados em sequência, formando uma cadeia (daí o nome "blockchain"). Essa estrutura garante a <strong style="color: #2563eb;">transparência e a segurança</strong> das transações, pois cada bloco é criptografado e ligado ao anterior, tornando praticamente impossível a alteração de informações passadas.
  </p>

  <hr style="border: none; height: 1px; background: #e5e7eb; margin: 35px 0;">

  <h2 style="color: #2563eb; font-size: 22px; font-weight: 600; margin: 30px 0 20px 0;">Como Obter e Armazenar Bitcoins?</h2>

  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px; line-height: 1.8;">
    Para adquirir Bitcoins, é necessário utilizar uma <strong style="color: #2563eb;">exchange (corretora de criptomoedas)</strong> confiável, como Coinbase, Binance ou Mercado Bitcoin. Após a compra, os Bitcoins podem ser armazenados em carteiras digitais, que podem ser:
  </p>

  <div style="margin: 25px 0; padding: 20px; background: #f8fafc; border-radius: 8px; border-left: 4px solid #2563eb;">
    <h3 style="color: #2563eb; font-size: 18px; font-weight: 600; margin: 0 0 15px 0;">Tipos de Carteiras:</h3>

    <div style="margin-bottom: 15px;">
      <h4 style="color: #2563eb; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Hot Wallets (Carteiras Quentes)</h4>
      <p style="margin: 0; font-size: 15px; line-height: 1.6;">Conectadas à internet, são práticas para transações diárias, mas mais vulneráveis a ataques cibernéticos.</p>
    </div>

    <div>
      <h4 style="color: #2563eb; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">Cold Wallets (Carteiras Frias)</h4>
      <p style="margin: 0; font-size: 15px; line-height: 1.6;">Desconectadas da internet, como carteiras de hardware ou papel, oferecem maior segurança para armazenar grandes quantias por longos períodos.</p>
    </div>
  </div>

  <hr style="border: none; height: 1px; background: #e5e7eb; margin: 35px 0;">

  <h2 style="color: #2563eb; font-size: 22px; font-weight: 600; margin: 30px 0 20px 0;">Por que o Bitcoin é Importante?</h2>

  <p style="margin-bottom: 20px; text-align: justify; font-size: 16px; line-height: 1.8;">
    O Bitcoin representa uma inovação no sistema financeiro por permitir:
  </p>

  <div style="margin: 25px 0;">
    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
      <div style="width: 8px; height: 8px; background: #2563eb; border-radius: 50%; margin: 8px 15px 0 0; flex-shrink: 0;"></div>
      <div>
        <strong style="color: #2563eb; font-size: 16px;">Descentralização:</strong>
        <span style="font-size: 16px; margin-left: 8px;">Elimina a necessidade de intermediários, dando mais autonomia aos usuários.</span>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
      <div style="width: 8px; height: 8px; background: #2563eb; border-radius: 50%; margin: 8px 15px 0 0; flex-shrink: 0;"></div>
      <div>
        <strong style="color: #2563eb; font-size: 16px;">Transparência:</strong>
        <span style="font-size: 16px; margin-left: 8px;">Todas as transações são públicas e registradas na blockchain.</span>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
      <div style="width: 8px; height: 8px; background: #2563eb; border-radius: 50%; margin: 8px 15px 0 0; flex-shrink: 0;"></div>
      <div>
        <strong style="color: #2563eb; font-size: 16px;">Segurança:</strong>
        <span style="font-size: 16px; margin-left: 8px;">A criptografia avançada protege contra fraudes e ataques.</span>
      </div>
    </div>

    <div style="display: flex; align-items: flex-start;">
      <div style="width: 8px; height: 8px; background: #2563eb; border-radius: 50%; margin: 8px 15px 0 0; flex-shrink: 0;"></div>
      <div>
        <strong style="color: #2563eb; font-size: 16px;">Acessibilidade:</strong>
        <span style="font-size: 16px; margin-left: 8px;">Qualquer pessoa com acesso à internet pode participar da rede Bitcoin.</span>
      </div>
    </div>
  </div>

  <hr style="border: none; height: 1px; background: #e5e7eb; margin: 35px 0;">

  <h2 style="color: #2563eb; font-size: 22px; font-weight: 600; margin: 30px 0 20px 0;">Considerações Finais</h2>

  <div style="background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 25px; margin: 25px 0;">
    <p style="margin: 0; text-align: justify; font-size: 16px; line-height: 1.8; color: #374151;">
      O <strong style="color: #2563eb;">Bitcoin</strong> é uma tecnologia revolucionária que desafia os modelos financeiros tradicionais. Para iniciantes, é essencial estudar e compreender seus fundamentos antes de investir. Comece com <strong style="color: #2563eb;">pequenas quantias</strong>, utilize plataformas confiáveis e mantenha-se informado sobre as <strong style="color: #2563eb;">tendências do mercado</strong>.
    </p>
  </div>

</div>`
      },
      {
        id: "10",
        title: "Validação de Ideias de Negócio: Como Testar Antes de Investir",
        description: "Aprenda técnicas práticas para validar sua ideia de negócio antes de investir tempo e dinheiro, evitando erros comuns de empreendedores iniciantes.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        category: "empreendedorismo",
        author: "Leonardo Figueiredo",
        date: "2 de Junho, 2025",
        publishedAt: new Date("2025-06-02").getTime(),
        readTime: "11 min de leitura",
        featured: false,
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