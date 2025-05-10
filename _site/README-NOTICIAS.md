# Novo Sistema de Notícias - InvestSavy

Este documento explica o novo sistema de notícias implementado para o site InvestSavy, substituindo o sistema baseado em Jekyll por uma solução mais simples e prática.

## Visão Geral

O novo sistema de notícias utiliza arquivos JSON para armazenar o conteúdo das notícias e JavaScript para exibi-las dinamicamente, eliminando a necessidade de gerar páginas HTML estáticas para cada notícia através do Jekyll.

## Arquivos Principais

1. **`/data/noticias.json`** - Armazena todas as notícias em formato JSON
2. **`/noticias-novo.html`** - Nova página principal de notícias
3. **`/script/noticias-sistema.js`** - Script que gerencia o carregamento e exibição das notícias
4. **`/adicionar-noticia.html`** - Formulário para adicionar novas notícias facilmente

## Como Usar

### Visualizar Notícias

Acesse a página `noticias-novo.html` para ver todas as notícias disponíveis. Esta página oferece:

- Listagem de notícias com imagens e resumos
- Filtros por categoria
- Busca por palavras-chave
- Visualização completa de notícias individuais sem recarregar a página

### Adicionar Nova Notícia

1. Acesse a página `adicionar-noticia.html`
2. Preencha o formulário com os detalhes da notícia:
   - Título
   - Resumo/Chamada
   - URL da imagem (as imagens devem estar na pasta `/images/`)
   - Autor e demais informações
   - Conteúdo da notícia (usando o editor visual)
3. Clique em "Publicar Notícia"

A notícia será salva temporariamente no navegador usando localStorage e aparecerá imediatamente na página de notícias.

## Persistência de Dados

Atualmente, o sistema utiliza duas formas de armazenamento:

1. **Arquivo JSON** (`/data/noticias.json`) - Contém as notícias pré-existentes
2. **localStorage** - Armazena temporariamente novas notícias adicionadas pelo formulário

### Para Persistência Permanente

Para salvar permanentemente as novas notícias, você precisará:

1. Exportar as notícias do localStorage (há um botão para isso na interface de administração)
2. Adicionar manualmente as novas notícias ao arquivo `/data/noticias.json`

Alternativamente, você pode implementar um backend simples para salvar as notícias diretamente no servidor.

## Migração do Jekyll

As notícias existentes foram migradas do formato Jekyll para o novo formato JSON. Se você precisar migrar mais notícias:

1. Copie o conteúdo do arquivo Markdown (`.md`) da notícia
2. Use o formulário de adição de notícias para criar uma nova entrada
3. Cole o conteúdo no editor e ajuste a formatação conforme necessário

## Vantagens do Novo Sistema

- **Simplicidade**: Não é necessário conhecer Jekyll ou gerar builds estáticos
- **Praticidade**: Adicione notícias através de um formulário amigável
- **Performance**: Carregamento dinâmico de conteúdo sem recarregar a página
- **Experiência do usuário**: Interface moderna com filtros e busca

## Próximos Passos

- Implementar um backend para salvar permanentemente as notícias
- Adicionar sistema de categorias mais robusto
- Implementar upload de imagens diretamente pelo formulário
- Criar painel de administração para gerenciar todas as notícias

---

Para qualquer dúvida ou sugestão, entre em contato com a equipe de desenvolvimento.