# 📈 InvestSavy - Plataforma de Educação Financeira

> Uma plataforma completa para educação financeira e ferramentas de investimento, desenvolvida para ajudar brasileiros a tomar decisões financeiras mais inteligentes.

## 🎯 Sobre o Projeto

O **InvestSavy** é uma plataforma web moderna e segura dedicada à educação financeira no Brasil. Nosso objetivo é democratizar o conhecimento sobre investimentos, planejamento financeiro e gestão de patrimônio através de conteúdo educativo de qualidade e ferramentas práticas.

### ✨ Principais Funcionalidades

- 📚 **Centro de Aprendizado**: Conteúdo educativo estruturado sobre investimentos
- 📰 **Artigos Especializados**: Análises e insights do mercado financeiro
- 🗞️ **Atualidades**: Notícias e tendências do mercado em tempo real
- 🧮 **Ferramentas Financeiras**: Calculadoras e simuladores interativos
- 📱 **Interface Responsiva**: Experiência otimizada para todos os dispositivos
- 🔒 **Segurança Avançada**: Proteção contra ameaças e vulnerabilidades

## 🛠️ Ferramentas Disponíveis

### Calculadoras Financeiras
- **Juros Compostos**: Simule o crescimento dos seus investimentos
- **Parcelado vs À Vista**: Compare as melhores formas de pagamento
- **Orçamento Pessoal**: Organize suas finanças mensais
- **Simulador de Dívidas**: Estratégias para quitação de débitos
- **Meta de Investimento**: Calcule quanto investir para seus objetivos
- **Reserva de Emergência**: Determine o valor ideal para sua reserva

### Recursos Educacionais
- **Economes**: Dicas práticas de economia doméstica
- **Guias de Investimento**: Conteúdo estruturado por nível de conhecimento
- **Análises de Mercado**: Insights e tendências atualizadas

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool moderna e rápida
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Animações fluidas e interativas

### UI/UX
- **Shadcn/ui** - Componentes de interface modernos
- **Radix UI** - Primitivos acessíveis para UI
- **Lucide React** - Ícones consistentes e elegantes
- **React Hook Form** - Gerenciamento de formulários

### Roteamento e Estado
- **React Router** - Navegação SPA
- **TanStack Query** - Gerenciamento de estado servidor
- **Zustand** - Gerenciamento de estado local

### Segurança e Performance
- **Content Security Policy (CSP)** - Proteção contra XSS
- **Headers de Segurança** - Proteção contra vulnerabilidades
- **Lazy Loading** - Carregamento otimizado de componentes
- **SEO Otimizado** - Meta tags e structured data

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **bun**
- **Git**

## ⚡ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/learn-invest-savy.git
cd learn-invest-savy
```

### 2. Instale as dependências
```bash
# Com npm
npm install

# Com yarn
yarn install

# Com bun
bun install
```

### 3. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite as variáveis necessárias
# VITE_API_URL=sua_api_url
# VITE_SITE_URL=http://localhost:8080
```

### 4. Execute o projeto
```bash
# Modo desenvolvimento
npm run dev

# O projeto estará disponível em http://localhost:8080
```

## 🏗️ Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Build para produção
npm run build:dev    # Build para desenvolvimento

# Qualidade de Código
npm run lint         # Executa ESLint
npm run preview      # Preview do build de produção
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Componentes de interface (shadcn/ui)
│   ├── HeroSection.tsx # Seção principal da homepage
│   ├── Layout.tsx      # Layout base da aplicação
│   └── ...
├── pages/              # Páginas da aplicação
│   ├── Index.tsx       # Página inicial
│   ├── Aprenda.tsx     # Centro de aprendizado
│   ├── Artigos.tsx     # Lista de artigos
│   ├── Ferramentas.tsx # Ferramentas financeiras
│   └── ...
├── hooks/              # Custom hooks
│   ├── use-mobile.tsx  # Hook para detecção mobile
│   ├── use-toast.ts    # Hook para notificações
│   └── ...
├── lib/                # Utilitários e configurações
│   └── utils.ts        # Funções utilitárias
├── config/             # Configurações da aplicação
│   ├── seo.ts         # Configurações de SEO
│   ├── security.ts    # Configurações de segurança
│   └── environment.ts # Variáveis de ambiente
├── utils/              # Utilitários de segurança
│   ├── encryption.ts   # Criptografia
│   ├── firewall.ts    # Proteção de firewall
│   └── ...
└── middleware/         # Middlewares de segurança
    └── security.ts     # Middleware principal
```

## 🔒 Recursos de Segurança

O projeto implementa múltiplas camadas de segurança:

- **Content Security Policy (CSP)** - Prevenção de ataques XSS
- **Headers de Segurança** - HSTS, X-Frame-Options, etc.
- **Proteção contra CSRF** - Tokens de validação
- **Rate Limiting** - Proteção contra ataques de força bruta
- **Sanitização de Dados** - Validação e limpeza de inputs
- **Criptografia** - Proteção de dados sensíveis
- **Monitoramento** - Logs de segurança e alertas

## 📱 Responsividade

O projeto é totalmente responsivo e otimizado para:

- 📱 **Mobile** (320px+)
- 📱 **Tablet** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1440px+)

## 🎨 Design System

### Cores Principais
- **Verde Principal**: `#10B981` (Emerald-500)
- **Verde Secundário**: `#059669` (Emerald-600)
- **Cinza**: `#6B7280` (Gray-500)
- **Branco**: `#FFFFFF`

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Tamanhos**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px

## 🌐 SEO e Performance

- **Meta Tags Otimizadas** - Títulos e descrições únicos
- **Structured Data** - Schema.org para melhor indexação
- **Open Graph** - Compartilhamento otimizado em redes sociais
- **Sitemap XML** - Mapeamento completo do site
- **Lazy Loading** - Carregamento otimizado de imagens
- **Code Splitting** - Divisão inteligente do código

## 🤝 Contribuindo

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. **Push** para a branch (`git push origin feature/AmazingFeature`)
5. Abra um **Pull Request**

### Padrões de Código

- Use **TypeScript** para tipagem
- Siga as convenções do **ESLint**
- Escreva **componentes funcionais** com hooks
- Mantenha **componentes pequenos** (< 50 linhas)
- Use **Tailwind CSS** para estilização
- Implemente **testes** para novas funcionalidades

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvedor Principal**: [Seu Nome]
- **Design**: [Nome do Designer]
- **Conteúdo**: [Nome do Especialista]

## 📞 Contato

- **Website**: [https://investsavy.com.br](https://investsavy.com.br)
- **Email**: contato@investsavy.com.br
- **LinkedIn**: [InvestSavy](https://linkedin.com/company/investsavy)

## 🙏 Agradecimentos

- **Shadcn/ui** - Pelos componentes de interface
- **Radix UI** - Pelos primitivos acessíveis
- **Tailwind CSS** - Pelo framework CSS
- **Vercel** - Pela plataforma de deploy
- **Comunidade Open Source** - Por todas as bibliotecas utilizadas

---

<div align="center">
  <p>Feito com ❤️ para democratizar a educação financeira no Brasil</p>
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
</div>