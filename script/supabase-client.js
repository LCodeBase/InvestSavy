/**
 * Supabase Client - InvestSavy
 * Este arquivo contém a configuração e funções para interagir com o Supabase
 */

// Configurações do Supabase
const SUPABASE_CONFIG = {
  url: 'https://iwoiqjypwszshhkxtjkj.supabase.co',
  anonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3b2lxanlwd3N6c2hoa3h0amtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxMjQ0NTUsImV4cCI6MjA2MzcwMDQ1NX0.R3yBEWGaqtLC8V7Jw7zABZ5Bs1I41mkBxX_RHwuFWew',
}

// Cliente Supabase
const supabase = {
  // Configuração do cliente
  client: null,

  // Inicializar cliente
  init: () => {
    if (typeof window.supabase === 'undefined') {
      console.error(
        'Supabase não está disponível. Verifique se o script foi carregado.'
      )
      return
    }

    supabase.client = window.supabase.createClient(
      SUPABASE_CONFIG.url,
      SUPABASE_CONFIG.anonKey
    )
  },

  // Funções de autenticação
  auth: {
    // Login com email/senha
    signIn: async (email, password) => {
      try {
        const { data, error } = await supabase.client.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro no login:', error)
        throw error
      }
    },

    // Cadastro com email/senha
    signUp: async (email, password) => {
      try {
        const { data, error } = await supabase.client.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro no cadastro:', error)
        throw error
      }
    },

    // Logout
    signOut: async () => {
      try {
        const { error } = await supabase.client.auth.signOut()
        if (error) throw error
      } catch (error) {
        console.error('Erro no logout:', error)
        throw error
      }
    },

    // Recuperar sessão atual
    getSession: async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.client.auth.getSession()
        if (error) throw error
        return session
      } catch (error) {
        console.error('Erro ao obter sessão:', error)
        throw error
      }
    },

    // Recuperar usuário atual
    getUser: async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.client.auth.getUser()
        if (error) throw error
        return user
      } catch (error) {
        console.error('Erro ao obter usuário:', error)
        throw error
      }
    },
  },

  // Funções de banco de dados
  db: {
    // Buscar notícias
    getNews: async (params = {}) => {
      try {
        let query = supabase.client.from('noticias').select('*')

        // Aplicar filtros
        if (params.categoria) {
          query = query.eq('categoria', params.categoria)
        }

        if (params.limit) {
          query = query.limit(params.limit)
        }

        if (params.offset) {
          query = query.range(params.offset, params.offset + params.limit - 1)
        }

        // Ordenar por data
        query = query.order('data', { ascending: false })

        const { data, error } = await query
        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro ao buscar notícias:', error)
        throw error
      }
    },

    // Buscar notícia por ID
    getNewsById: async (id) => {
      try {
        const { data, error } = await supabase.client
          .from('noticias')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro ao buscar notícia:', error)
        throw error
      }
    },

    // Buscar notícias em destaque
    getFeaturedNews: async (limit = 1) => {
      try {
        const { data, error } = await supabase.client
          .from('noticias')
          .select('*')
          .eq('destaque', true)
          .order('data', { ascending: false })
          .limit(limit)

        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro ao buscar notícias em destaque:', error)
        throw error
      }
    },

    // Buscar notícias mais lidas
    getMostReadNews: async (limit = 5) => {
      try {
        const { data, error } = await supabase.client
          .from('noticias')
          .select('*')
          .order('visualizacoes', { ascending: false })
          .limit(limit)

        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro ao buscar notícias mais lidas:', error)
        throw error
      }
    },

    // Buscar notícias por categoria
    getNewsByCategory: async (category, limit = 10) => {
      try {
        const { data, error } = await supabase.client
          .from('noticias')
          .select('*')
          .eq('categoria', category)
          .order('data', { ascending: false })
          .limit(limit)

        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro ao buscar notícias por categoria:', error)
        throw error
      }
    },

    // Buscar notícias por termo de busca
    searchNews: async (term, limit = 10) => {
      try {
        const { data, error } = await supabase.client
          .from('noticias')
          .select('*')
          .or(`titulo.ilike.%${term}%,resumo.ilike.%${term}%`)
          .order('data', { ascending: false })
          .limit(limit)

        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro ao buscar notícias:', error)
        throw error
      }
    },

    // Incrementar visualizações
    incrementViews: async (id) => {
      try {
        const { data, error } = await supabase.client
          .from('noticias')
          .update({ visualizacoes: supabase.client.raw('visualizacoes + 1') })
          .eq('id', id)
          .select()
          .single()

        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro ao incrementar visualizações:', error)
        throw error
      }
    },
  },

  // Funções de armazenamento
  storage: {
    // Upload de imagem
    uploadImage: async (file, path) => {
      try {
        const { data, error } = await supabase.client.storage
          .from('images')
          .upload(path, file)

        if (error) throw error
        return data
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error)
        throw error
      }
    },

    // Obter URL pública da imagem
    getPublicUrl: (path) => {
      try {
        const { data } = supabase.client.storage
          .from('images')
          .getPublicUrl(path)

        return data.publicUrl
      } catch (error) {
        console.error('Erro ao obter URL pública:', error)
        throw error
      }
    },

    // Remover imagem
    removeImage: async (path) => {
      try {
        const { error } = await supabase.client.storage
          .from('images')
          .remove([path])

        if (error) throw error
      } catch (error) {
        console.error('Erro ao remover imagem:', error)
        throw error
      }
    },
  },
}

// Inicializar cliente
document.addEventListener('DOMContentLoaded', () => {
  supabase.init()
})

// Exportar cliente
window.supabaseClient = supabase
