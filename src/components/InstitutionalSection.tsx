
import React from 'react';
import { CheckCircle, Heart, Users } from 'lucide-react';

const InstitutionalSection = () => {
  const values = [
    {
      icon: CheckCircle,
      title: 'Simples',
      description: 'Sem economês complicado ou jargões técnicos'
    },
    {
      icon: Heart,
      title: 'Direto',
      description: 'Informação prática que você pode aplicar hoje'
    },
    {
      icon: Users,
      title: 'Acessível',
      description: 'Educação financeira para todos, independente da renda'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simples, Direto e Sem Economês
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Acreditamos que educação financeira deve ser para todos. Por isso, criamos conteúdo 
            que qualquer pessoa pode entender e aplicar na sua vida financeira.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex p-4 bg-white bg-opacity-20 rounded-full mb-4">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-blue-100">{value.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white bg-opacity-20 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
            <p className="text-lg text-blue-100">
              Democratizar a educação financeira no Brasil, oferecendo conteúdo de qualidade, 
              ferramentas práticas e uma comunidade que apoia o crescimento financeiro de todos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalSection;
