-- SQL para criar a tabela de waitlist no Supabase
-- Execute este código no SQL Editor do seu projeto Supabase

CREATE TABLE IF NOT EXISTS waitlist (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índice para melhor performance na busca por email
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Criar índice para ordenação por data
CREATE INDEX IF NOT EXISTS idx_waitlist_subscribed_at ON waitlist(subscribed_at);

-- Habilitar RLS (Row Level Security) para segurança
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de novos emails (qualquer pessoa pode se inscrever)
CREATE POLICY "Anyone can subscribe to waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Política para permitir que apenas administradores vejam os emails
-- (você pode ajustar esta política conforme suas necessidades)
CREATE POLICY "Only authenticated users can view waitlist" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- Comentários para documentação
COMMENT ON TABLE waitlist IS 'Tabela para armazenar emails da lista de espera do InvestSavy';
COMMENT ON COLUMN waitlist.email IS 'Email do usuário interessado';
COMMENT ON COLUMN waitlist.subscribed_at IS 'Data e hora da inscrição';
COMMENT ON COLUMN waitlist.created_at IS 'Data e hora de criação do registro';
