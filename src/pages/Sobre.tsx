import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, Users, TrendingUp, BookOpen, Calculator, Award } from "lucide-react";

const Sobre = () => {
  const problems = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      title: "Falta de Educação Financeira",
      description: "Muitas pessoas não possuem conhecimento básico sobre finanças pessoais, investimentos e planejamento financeiro."
    },
    {
      icon: <Calculator className="h-8 w-8 text-blue-600" />,
      title: "Ferramentas Complexas",
      description: "As ferramentas financeiras disponíveis são frequentemente complexas e intimidadoras para iniciantes."
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Falta de Orientação Personalizada",
      description: "Ausência de orientação adequada para diferentes perfis de investidores e objetivos financeiros."
    }
  ];

  const solutions = [
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Trilhas de Aprendizado",
      description: "Conteúdo estruturado e progressivo para diferentes níveis de conhecimento financeiro."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Ferramentas Intuitivas",
      description: "Calculadoras e simuladores simples e fáceis de usar para planejamento financeiro."
    },
    {
      icon: <Award className="h-8 w-8 text-green-600" />,
      title: "Educação Prática",
      description: "Artigos, guias e recursos práticos para aplicar conhecimentos no dia a dia."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Sobre a <span className="text-blue-600">Invest</span><span className="text-green-600">Savy</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Nossa missão é democratizar a educação financeira e tornar os investimentos acessíveis para todos os brasileiros.
            </p>
          </div>
        </div>
      </section>

      {/* Problemas que Resolvemos */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Problemas que Resolvemos</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Identificamos os principais desafios que impedem os brasileiros de alcançar a independência financeira.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {problems.map((problem, index) => (
              <div key={index} className="bg-red-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  {problem.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossas Soluções */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Nossas Soluções</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Oferecemos ferramentas e conteúdos práticos para transformar sua relação com o dinheiro.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-green-100">
                <div className="flex justify-center mb-4">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{solution.title}</h3>
                <p className="text-gray-600 leading-relaxed">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção do Fundador */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Fundador</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Conheça a pessoa por trás da InvestSavy e sua jornada para democratizar a educação financeira.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Foto do Fundador */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src="/founder.png"
                      alt="Leonardo F. Figueiredo - Fundador da InvestSavy"
                      className="w-48 h-48 rounded-full object-cover border-4 border-blue-600 shadow-lg"
                    />
                  </div>
                </div>

                {/* Informações do Fundador */}
                <div className="flex-1 text-center md:text-left">
                  <a
                    href="https://www.linkedin.com/in/leonardo-f-figueiredo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 underline decoration-black hover:text-blue-600 transition-colors cursor-pointer">
                      Leonardo F. Figueiredo
                    </h3>
                  </a>
                  <p className="text-xl text-blue-600 font-semibold mb-4">
                    Fundador & CEO da InvestSavy
                  </p>
                  <div className="text-gray-600 space-y-4">
                    <p className="text-lg leading-relaxed">
                      Sempre fui inconformado com a forma como o conhecimento financeiro é tratado no Brasil — limitado, técnico demais ou simplesmente inexistente nas escolas. A maioria aprende sobre dinheiro da pior forma: com dívidas, frustrações e promessas falsas.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Criei o InvestSavy com o propósito de mudar isso. Quero construir um espaço acessível, prático e direto ao ponto, onde qualquer pessoa possa aprender a pensar financeiramente, entender o mercado e tomar melhores decisões, sem depender de “gurus” ou de soluções mágicas.
                    </p>
                    <p className="text-lg leading-relaxed">
                      Acreditamos que educação financeira é liberdade. E liberdade não se negocia.
                    </p>
                    <p className="text-lg leading-relaxed font-semibold text-black italic">
                      Quem entende de dinheiro não se vende por migalhas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sobre;