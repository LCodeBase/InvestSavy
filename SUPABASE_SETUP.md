# Configuração do Supabase para InvestSavy

## 📋 Pré-requisitos

1. Conta no [Supabase](https://supabase.com)
2. Projeto criado no Supabase

## 🚀 Configuração

### 1. Criar o Banco de Dados

1. Acesse seu projeto no Supabase Dashboard
2. Vá para **SQL Editor**
3. Execute o código SQL que está no arquivo `supabase-setup.sql`

### 2. Configurar Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. No Supabase Dashboard, vá para **Settings** > **API**

3. Copie as seguintes informações para o arquivo `.env`:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
   ```

### 3. Estrutura da Tabela

A tabela `waitlist` tem a seguinte estrutura:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | BIGSERIAL | ID único (chave primária) |
| `email` | VARCHAR(255) | Email do usuário (único) |
| `subscribed_at` | TIMESTAMP | Data/hora da inscrição |
| `created_at` | TIMESTAMP | Data/hora de criação |

### 4. Funcionalidades

- ✅ **Validação de email** - Verifica se o formato está correto
- ✅ **Prevenção de duplicatas** - Não permite emails repetidos
- ✅ **Animações fluidas** - Interface responsiva e moderna
- ✅ **Feedback visual** - Mensagens de sucesso e erro
- ✅ **Loading states** - Indicadores de carregamento

### 5. Visualizar Dados

Para ver os emails cadastrados:

1. Acesse **Table Editor** no Supabase Dashboard
2. Selecione a tabela `waitlist`
3. Visualize todos os emails cadastrados

### 6. Exportar Dados

Para exportar a lista de emails:

```sql
SELECT email, subscribed_at 
FROM waitlist 
ORDER BY subscribed_at DESC;
```

## 🔒 Segurança

- **RLS habilitado**: Row Level Security ativo
- **Políticas configuradas**: Apenas inserção pública, leitura restrita
- **Validação client-side**: Verificação de formato de email
- **Rate limiting**: Recomendamos configurar limites no Supabase

## 📊 Analytics

Você pode criar queries para acompanhar o crescimento:

```sql
-- Total de inscritos
SELECT COUNT(*) as total_subscribers FROM waitlist;

-- Inscritos por dia
SELECT 
  DATE(subscribed_at) as date,
  COUNT(*) as subscribers
FROM waitlist 
GROUP BY DATE(subscribed_at)
ORDER BY date DESC;
```
