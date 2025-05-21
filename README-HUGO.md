# Migração do Jekyll para o Hugo

## Alterações Realizadas

Este documento registra as alterações feitas para migrar o site InvestSavy do Jekyll para o Hugo.

### Arquivos e Diretórios Removidos

- Diretório `_layouts/` - Continha os layouts do Jekyll
- Diretório `_includes/` - Continha os componentes reutilizáveis do Jekyll
- Diretório `_posts/` - Continha os arquivos de conteúdo em formato Markdown do Jekyll
- Diretório `_site/` - Continha o site estático gerado pelo Jekyll
- Diretório `.jekyll-cache/` - Cache do Jekyll
- Arquivo `feed.xml` - Feed RSS gerado pelo Jekyll
- Arquivo `sitemap.xml` - Mapa do site gerado pelo Jekyll
- Arquivo `.github/workflows/jekyll-gh-pages.yml` - Workflow do GitHub Actions para o Jekyll

### Arquivos Modificados

- `blogs-main.html` - Removidas as tags Liquid e referências ao Jekyll
- `robots.txt` - Removidas as referências aos diretórios do Jekyll

## Próximos Passos para Migração para o Hugo

1. **Instalar o Hugo**: Siga as instruções de instalação em [gohugo.io](https://gohugo.io/installation/)

2. **Inicializar um novo site Hugo**:
   ```bash
   hugo new site . --force
   ```

3. **Escolher e instalar um tema**:
   ```bash
   git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke
   ```
   E adicionar ao arquivo `config.toml`:
   ```toml
   theme = "ananke"
   ```

4. **Migrar o conteúdo**:
   - Criar diretório `content/` para os artigos
   - Converter os arquivos HTML existentes para o formato do Hugo
   - Adaptar os templates para o sistema de temas do Hugo

5. **Configurar o Hugo**:
   - Criar arquivo `config.toml` com as configurações do site
   - Definir permalinks, taxonomias e outras configurações

6. **Testar localmente**:
   ```bash
   hugo server -D
   ```

7. **Configurar GitHub Actions para o Hugo**:
   - Criar um novo workflow para build e deploy com o Hugo

## Estrutura de Diretórios do Hugo

A estrutura básica de um site Hugo é a seguinte:

```
.
├── archetypes/
├── assets/
├── content/
├── data/
├── layouts/
├── static/
├── themes/
└── config.toml
```

### Mapeamento de Arquivos Jekyll para Hugo

| Jekyll | Hugo |
|--------|------|
| `_posts/` | `content/posts/` |
| `_layouts/` | `layouts/` |
| `_includes/` | `layouts/partials/` |
| `assets/` | `static/` |
| `_config.yml` | `config.toml` |

## Recursos Úteis

- [Documentação oficial do Hugo](https://gohugo.io/documentation/)
- [Migração do Jekyll para o Hugo](https://gohugo.io/tools/migrations/#jekyll)
- [Temas do Hugo](https://themes.gohugo.io/)
- [Sintaxe de templates do Hugo](https://gohugo.io/templates/introduction/)
- [Shortcodes do Hugo](https://gohugo.io/content-management/shortcodes/)

## Notas Adicionais

- O Hugo usa Go Templates em vez de Liquid
- O Hugo tem um sistema de taxonomias mais poderoso
- O Hugo é significativamente mais rápido que o Jekyll
- O Hugo não requer Ruby ou gems, é um único executável binário