import { createClient } from '@supabase/supabase-js'

// Configurações do Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Debug das configurações
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key existe:', !!supabaseAnonKey)

// Verificar se as credenciais estão configuradas
const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

export const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null

// Função para cadastrar email na lista de espera
export const subscribeToWaitlist = async (email: string) => {
  console.log('🔍 Tentando cadastrar email:', email)
  console.log('📡 Supabase configurado:', isSupabaseConfigured)
  
  try {
    if (!supabase || !isSupabaseConfigured) {
      console.log('❌ Supabase não configurado. Email seria salvo:', email)
      await new Promise(resolve => setTimeout(resolve, 1000))
      return { data: { email }, error: null }
    }

    console.log('📤 Enviando para Supabase...')
    
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
        }
      ])
      .select()

    console.log('📥 Resposta do Supabase:', { data, error })

    if (error) {
      console.error('❌ Erro do Supabase:', error)
      throw error
    }

    console.log('✅ Email cadastrado com sucesso:', data)
    return { data, error: null }
  } catch (error) {
    console.error('💥 Erro ao cadastrar email:', error)
    return { data: null, error }
  }
}
