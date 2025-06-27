import React from 'react';
import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { Calculator, DollarSign, PiggyBank, CheckCircle, Lightbulb, Heart, ArrowRight, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const OrcamentoPessoal = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Orçamento Pessoal: Comece com o que você tem',
    description: '4 passos reais para montar seu orçamento pessoal do jeito mais simples possível. Sem planilha difícil, sem frescura. Só com o que você tem hoje.',
    author: {
      '@type': 'Organization',
      name: 'InvestSavy'
    },
    publisher: {
      '@type': 'Organization',
      name: 'InvestSavy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.investsavy.online/logo.png'
      }
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://www.investsavy.online/aprenda/orcamento-pessoal'
    }
  };

  const passos = [
    {
      numero: '1',
      titulo: 'Anote tudo o que você ganha',
      descricao: 'Pode ser salário, bico, mesada, pensão, trocado do freela, vale-refeição… qualquer valor que entra. Escreve tudo. Mesmo que pareça pouco. Se você não sabe exatamente quanto ganha no mês, vai viver sempre no escuro.',
      dica: '📌 Dica: Pode anotar no papel, no bloco de notas do celular, ou usar um app simples. O importante é ter tudo no mesmo lugar.',
      icon: DollarSign,
      cor: 'bg-green-50 border-green-200 text-green-600'
    },
    {
      numero: '2',
      titulo: 'Anote tudo o que você gasta',
      descricao: 'Aqui é sem dó. Do pão na padaria até a conta de luz. Passagem, PIX pros outros, delivery, crédito no celular, parcelinha da Shopee… tudo entra.',
      extra: 'Você vai se assustar. E é aí que começa a virada.',
      icon: Calculator,
      cor: 'bg-blue-50 border-blue-200 text-blue-600'
    },
    {
      numero: '3',
      titulo: 'Encare o que dá pra cortar (mesmo que doa)',
      descricao: 'Depois que você olhar onde seu dinheiro tá indo, vai ver coisa que nem lembrava. É nessa hora que você pergunta: "Disso aqui, o que dá pra diminuir ou cortar?"',
      extra: 'Talvez seja o lanche fora de casa todo dia. Talvez aquele streaming que ninguém usa. Talvez comprar menos "só porque tava barato". Você não precisa virar um monge, mas precisa escolher melhor.',
      icon: Target,
      cor: 'bg-orange-50 border-orange-200 text-orange-600'
    },
    {
      numero: '4',
      titulo: 'Separe um valor por mês (qualquer valor mesmo)',
      descricao: 'Não importa se são R$5, R$10, R$20. O importante é criar o hábito. Guardar dinheiro não é sobre quanto você tem, mas sobre começar agora. Com o tempo, o valor aumenta. Mas o mais difícil é dar o primeiro passo.',
      extra: 'Se você guardar R$10 por mês, em um ano já são R$120. Parece pouco? Pode ser. Mas é mais do que zero. E isso muda o jogo.',
      icon: PiggyBank,
      cor: 'bg-purple-50 border-purple-200 text-purple-600'
    }
  ];

  const dicas = [
    'Use papel e caneta se não tem celular ou computador',
    'Coloque um lembrete no celular para anotar os gastos',
    'Guarde os comprovantes e notas fiscais numa caixinha',
    'Peça ajuda para alguém da família se tiver dificuldade para escrever',
    'Comece devagar, não precisa ser perfeito no primeiro mês'
  ];

  return (
    <Layout>
      <SEOHead
        title="Orçamento Pessoal: Comece com o que você tem | InvestSavy"
        description="4 passos reais para montar seu orçamento pessoal do jeito mais simples possível. Sem planilha difícil, sem frescura. Só com o que você tem hoje."
        keywords="orçamento pessoal, controle financeiro, organizar dinheiro, baixa renda, educação financeira, finanças pessoais"
        url="https://www.investsavy.online/aprenda/orcamento-pessoal"
        type="article"
        canonical="https://www.investsavy.online/aprenda/orcamento-pessoal"
        jsonLd={jsonLd}
      />
      
      <div className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
              <Calculator className="w-4 h-4 mr-2" />
              Orçamento Pessoal
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Orçamento Pessoal: Comece com o que você tem
            </h1>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Se você está aqui, provavelmente sente que o dinheiro mal entra e já vai embora. E eu entendo isso. 
              Porque eu também já passei (e ainda passo) por esse aperto. A verdade é que ninguém ensinou pra gente 
              como cuidar bem do dinheiro. Mas a boa notícia é que dá pra começar — mesmo com pouco.
            </p>
          </motion.div>

          {/* O que é orçamento */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-green-50 rounded-2xl p-8 border border-green-200">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-green-100 rounded-xl mr-4">
                  <Lightbulb className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  O que é orçamento pessoal?
                </h2>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                <strong>Orçamento</strong> é uma palavra bonita para dizer: "anotar o dinheiro que entra e o dinheiro que sai".
              </p>
              
              <p className="text-gray-700 text-lg leading-relaxed">
                É como fazer uma lista do que você ganha (seu salário, bicos, vendas) e do que você gasta 
                (aluguel, comida, transporte). Assim você consegue ver se está gastando mais do que ganha.
              </p>
            </div>
          </motion.section>

          {/* Por que é importante */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Por que isso é importante pra você?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <CheckCircle className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Evitar dívidas
                </h3>
                <p className="text-gray-700">
                  Quando você sabe quanto ganha e quanto gasta, fica mais fácil não gastar mais do que tem.
                </p>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <CheckCircle className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Ter dinheiro no final do mês
                </h3>
                <p className="text-gray-700">
                  Mesmo ganhando pouco, dá para guardar um pouquinho todo mês se você se organizar.
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <CheckCircle className="w-8 h-8 text-purple-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Dormir tranquilo
                </h3>
                <p className="text-gray-700">
                  Sem preocupação com conta atrasada ou sem saber se vai ter dinheiro para o mês que vem.
                </p>
              </div>
              
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <CheckCircle className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Realizar sonhos
                </h3>
                <p className="text-gray-700">
                  Guardando um pouquinho todo mês, você consegue comprar algo que quer ou se preparar para emergências.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Passo a passo */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Aqui vão 4 passos reais pra montar seu orçamento pessoal
            </h2>
            
            <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              Do jeito mais simples possível, sem planilha difícil, sem frescura. Só com o que você tem hoje.
            </p>
            
            <div className="space-y-6">
              {passos.map((passo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`${passo.cor.split(' ')[0]} ${passo.cor.split(' ')[1]} rounded-xl p-6 border`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`w-12 h-12 ${passo.cor.split(' ')[0]} border-2 ${passo.cor.split(' ')[1]} rounded-full flex items-center justify-center`}>
                        <span className={`text-lg font-bold ${passo.cor.split(' ')[2]}`}>
                          {passo.numero}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <passo.icon className={`w-6 h-6 ${passo.cor.split(' ')[2]} mr-3`} />
                        <h3 className="text-xl font-bold text-gray-900">
                          {passo.titulo}
                        </h3>
                      </div>
                      
                      <p className="text-gray-700 text-lg mb-3">
                        {passo.descricao}
                      </p>
                      
                      {passo.dica && (
                        <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3">
                          <p className="text-gray-600 text-sm font-medium">
                            {passo.dica}
                          </p>
                        </div>
                      )}
                      
                      {passo.extra && (
                        <p className="text-gray-600 text-base italic">
                          {passo.extra}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Realidade brasileira */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Vamos falar a real sobre o Brasil de hoje
            </h2>
            
            <div className="bg-orange-50 rounded-2xl p-8 border border-orange-200 mb-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-orange-100 rounded-full mr-4">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  A situação está difícil mesmo
                </h3>
              </div>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Não vamos mentir: está tudo muito caro no Brasil. Aluguel, comida, transporte, luz. 
                  Muita gente está passando aperto mesmo.
                </p>
                
                <p>
                  Se você ganha R$ 1.400 em São Paulo e mora sozinho, só o aluguel numa periferia 
                  já come R$ 800-900 do seu salário. Sobra pouco para o resto.
                </p>
                
                <p className="font-semibold text-orange-700">
                  E sabe qual é a real? Se você ganha muito pouco, muito pouco mesmo, 
                  o primeiro passo não é investir. É achar uma forma de ganhar mais.
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200 mb-8">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full mr-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  O mais importante: não ficar no vermelho
                </h3>
              </div>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  Esqueça por um momento essa história de guardar dinheiro e investir. 
                  O mais importante é você não gastar mais do que ganha.
                </p>
                
                <p>
                  Ficar no negativo é pior que não guardar nada. Porque aí você paga juros, 
                  fica com o nome sujo, e a situação só piora.
                </p>
                
                <p className="font-semibold text-blue-700">
                  Então o primeiro objetivo é: fechar o mês no zero. 
                  Nem que seja no zero, mas não no negativo.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 border">
              <div className="flex items-center mb-6">
                <div className="p-3 bg-pink-100 rounded-full mr-4">
                  <Heart className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Exemplo real: João, entregador de app
                </h3>
              </div>
              
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  <strong>João</strong> trabalha como entregador de app em São Paulo e tira uns R$ 1.800 por mês 
                  quando consegue trabalhar bastante. Mas tem mês que é menos.
                </p>
                
                <p>
                  Ele anotou os gastos e viu a realidade:
                </p>
                
                <div className="bg-white rounded-xl p-6 border-l-4 border-green-500">
                  <p className="font-semibold text-green-700 mb-2">O que João ganha (mês bom):</p>
                  <ul className="space-y-1">
                    <li>• Entrega de app: R$ 1.800</li>
                    <li>• Total: R$ 1.800</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 border-l-4 border-red-500">
                  <p className="font-semibold text-red-700 mb-2">O que João gasta:</p>
                  <ul className="space-y-1">
                    <li>• Aluguel (quarto): R$ 650</li>
                    <li>• Luz e água: R$ 80</li>
                    <li>• Comida: R$ 400</li>
                    <li>• Gasolina da moto: R$ 300</li>
                    <li>• Celular: R$ 60</li>
                    <li>• Manutenção da moto: R$ 150</li>
                    <li>• Outros gastos: R$ 200</li>
                    <li>• Total: R$ 1.840</li>
                  </ul>
                </div>
                
                <p>
                  João viu que mesmo nos meses bons ficava apertado. 
                  E nos meses ruins (R$ 1.400-1.500) ficava no vermelho.
                </p>
                
                <p>
                  Ele não conseguiu guardar dinheiro ainda, mas conseguiu uma coisa importante: 
                  parou de ficar devendo. Cortou alguns gastos e agora fecha no zero.
                </p>
                
                <div className="bg-blue-100 rounded-xl p-4 border border-blue-200">
                  <p className="font-semibold text-blue-800">
                    Resultado: João não está guardando dinheiro ainda, mas também não está se endividando. 
                    Já é um grande passo!
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Dicas extras */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Dicas extras para facilitar sua vida
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dicas.map((dica, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 flex items-start"
                >
                  <Lightbulb className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{dica}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Mensagem final */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 md:p-12 text-center border border-green-200">
              <div className="p-4 bg-green-100 rounded-full w-fit mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Lembrete final:
              </h2>
              
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                <strong>Você não precisa ser rico pra cuidar do seu dinheiro.</strong>
              </p>
              
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                Mas se você aprender a cuidar do pouco, vai estar muito mais preparado quando vier o muito.
              </p>
              
              <div className="bg-green-100 rounded-xl p-6 border border-green-300">
                <p className="text-lg text-green-800 text-center font-medium">
                  Esse site aqui é pra isso: te ajudar a construir uma base financeira, 
                  mesmo que ninguém tenha te ensinado isso antes.
                </p>
              </div>
            </div>
          </motion.section>

          {/* CTA para continuar aprendendo */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-2xl p-8 border-2 border-green-200 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Continue aprendendo no InvestSavy
              </h3>
              
              <p className="text-gray-600 mb-6">
                Agora que você já sabe fazer um orçamento, que tal aprender sobre reserva de emergência 
                e como começar a investir seu dinheiro?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/aprenda" 
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
                >
                  Ver mais conteúdos
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
                
                <a 
                  href="/ferramentas" 
                  className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-xl font-medium hover:bg-green-50 transition-colors"
                >
                  Usar calculadoras
                  <Calculator className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
};

OrcamentoPessoal.displayName = 'OrcamentoPessoal';

export default OrcamentoPessoal;