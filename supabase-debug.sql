-- SQL atualizado para resolver problemas de RLS no Supabase

-- 1. Primeiro, vamos desabilitar RLS temporariamente para testar
ALTER TABLE waitlist DISABLE ROW LEVEL SECURITY;

-- 2. Ou se preferir manter RLS, use estas políticas mais simples:
-- Remover políticas existentes
DROP POLICY IF EXISTS "Anyone can subscribe to waitlist" ON waitlist;
DROP POLICY IF EXISTS "Only authenticated users can view waitlist" ON waitlist;

-- 3. Habilitar RLS novamente
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- 4. Criar política mais permissiva para inserção
CREATE POLICY "Enable insert for anonymous users" ON waitlist
  FOR INSERT WITH CHECK (true);

-- 5. Política para visualização (opcional, só para admins)
CREATE POLICY "Enable read for authenticated users" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- 6. Verificar se a tabela existe e tem a estrutura correta
SELECT * FROM waitlist LIMIT 1;

-- 7. Testar inserção manual
INSERT INTO waitlist (email) VALUES ('teste@exemplo.com');

-- 8. Verificar se o registro foi inserido
SELECT * FROM waitlist WHERE email = 'teste@exemplo.com';
