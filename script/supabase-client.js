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

// Dados mock para teste
const MOCK_DATA = {
  noticias: [
    {
      id: 1,
      titulo: 'Mercado de ações atinge nova máxima histórica',
      resumo:
        'O Ibovespa registrou alta expressiva impulsionado por resultados positivos das empresas.',
      imagem:
        'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categoria: 'Mercados',
      data: new Date().toISOString(),
      visualizacoes: 1234,
      autor: 'Equipe InvestSavy',
      destaque: true,
      link: '#',
    },
    {
      id: 2,
      titulo: 'Taxa Selic: BC mantém juros em 13,75%',
      resumo:
        'Comitê de Política Monetária mantém taxa básica de juros inalterada.',
      imagem:
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categoria: 'Economia',
      data: new Date().toISOString(),
      visualizacoes: 987,
      autor: 'Equipe InvestSavy',
      destaque: false,
      link: '#',
    },
    {
      id: 3,
      titulo: 'Nova tecnologia revoluciona mercado financeiro',
      resumo:
        'Startup brasileira lança plataforma que promete transformar investimentos.',
      imagem:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categoria: 'Tecnologia',
      data: new Date().toISOString(),
      visualizacoes: 856,
      autor: 'Equipe InvestSavy',
      destaque: false,
      link: '#',
    },
    {
      id: 4,
      titulo: 'Como economizar em tempos de crise',
      resumo:
        'Especialistas dão dicas valiosas para manter as finanças em dia.',
      imagem:
        'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categoria: 'Finanças Pessoais',
      data: new Date().toISOString(),
      visualizacoes: 2345,
      autor: 'Equipe InvestSavy',
      destaque: false,
      link: '#',
    },
    {
      id: 5,
      titulo: 'Mercado internacional em alta',
      resumo: 'Principais índices globais registram ganhos expressivos.',
      imagem:
        'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categoria: 'Internacional',
      data: new Date().toISOString(),
      visualizacoes: 765,
      autor: 'Equipe InvestSavy',
      destaque: false,
      link: '#',
    },
    {
      id: 6,
      titulo: 'Empresas brasileiras expandem operações',
      resumo: 'Grandes corporações anunciam novos investimentos no país.',
      imagem:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categoria: 'Empresas',
      data: new Date().toISOString(),
      visualizacoes: 543,
      autor: 'Equipe InvestSavy',
      destaque: false,
      link: '#',
    },
    {
      id: 7,
      titulo: 'Reforma tributária avança no Congresso',
      resumo: 'Proposta de simplificação do sistema tributário ganha força.',
      imagem:
        'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      categoria: 'Política',
      data: new Date().toISOString(),
      visualizacoes: 678,
      autor: 'Equipe InvestSavy',
      destaque: false,
      link: '#',
    },
  ],
}

// Cliente Supabase
const supabase = {
  // Configuração do cliente
  client: null,

  // Inicializar cliente
  init: () => {
    // Usar dados mock para desenvolvimento
    console.log('Usando dados mock para desenvolvimento')
    return true
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
        // Simular delay de rede
        await new Promise((resolve) => setTimeout(resolve, 500))

        let noticias = [...MOCK_DATA.noticias]

        // Aplicar filtros
        if (params.categoria && params.categoria !== 'all') {
          noticias = noticias.filter((n) => n.categoria === params.categoria)
        }

        if (params.limit) {
          noticias = noticias.slice(0, params.limit)
        }

        if (params.offset) {
          noticias = noticias.slice(params.offset, params.offset + params.limit)
        }

        return noticias
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
        await new Promise((resolve) => setTimeout(resolve, 500))
        return MOCK_DATA.noticias.filter((n) => n.destaque).slice(0, limit)
      } catch (error) {
        console.error('Erro ao buscar notícias em destaque:', error)
        throw error
      }
    },

    // Buscar notícias mais lidas
    getMostReadNews: async (limit = 5) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return [...MOCK_DATA.noticias]
          .sort((a, b) => b.visualizacoes - a.visualizacoes)
          .slice(0, limit)
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
