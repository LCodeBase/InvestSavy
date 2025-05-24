/**
 * Supabase Client - InvestSavy
 * Este arquivo contém a configuração e funções para interagir com o Supabase
 */

// Configuração do Supabase
let SUPABASE_URL = '';
let SUPABASE_KEY = '';

// Inicialização do cliente Supabase
let supabase = null;

// Carrega as configurações do Supabase do arquivo JSON
async function loadSupabaseConfig() {
  try {
    const response = await fetch('/config/supabase-config.json');
    const config = await response.json();
    SUPABASE_URL = config.supabaseUrl;
    SUPABASE_KEY = config.supabaseKey;
    return true;
  } catch (error) {
    console.error('Erro ao carregar configuração do Supabase:', error);
    return false;
  }
}

// Função para inicializar o cliente Supabase
async function initSupabase() {
  if (!supabase) {
    try {
      // Carrega a configuração do Supabase
      await loadSupabaseConfig();

      // Verifica se as credenciais foram carregadas
      if (!SUPABASE_URL || !SUPABASE_KEY) {
        throw new Error('Credenciais do Supabase não encontradas');
      }

      // Carrega a biblioteca Supabase de CDN se não estiver disponível
      if (!window.supabase) {
        await loadSupabaseScript();
      }

      // Cria o cliente Supabase
      supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
      console.log('Supabase inicializado com sucesso');
      return true;
    } catch (error) {
      console.error('Erro ao inicializar Supabase:', error);
      return false;
    }
  }
  return true;
}

// Função para carregar o script do Supabase
function loadSupabaseScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Função para buscar todas as notícias
async function fetchNoticias() {
  if (!await initSupabase()) return [];

  try {
    const { data, error } = await supabase
      .from('noticias')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }
}

// Função para buscar notícias por categoria
async function fetchNoticiasByCategoria(categoria) {
  if (!await initSupabase()) return [];

  try {
    const { data, error } = await supabase
      .from('noticias')
      .select('*')
      .eq('categoria', categoria)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error(`Erro ao buscar notícias da categoria ${categoria}:`, error);
    return [];
  }
}

// Função para buscar uma notícia específica por ID
async function fetchNoticiaById(id) {
  if (!await initSupabase()) return null;

  try {
    const { data, error } = await supabase
      .from('noticias')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Erro ao buscar notícia com ID ${id}:`, error);
    return null;
  }
}

// Função para incrementar visualizações de uma notícia
async function incrementarVisualizacoes(id) {
  if (!await initSupabase()) return false;

  try {
    // Primeiro, obtemos o número atual de visualizações
    const { data: noticia, error: fetchError } = await supabase
      .from('noticias')
      .select('views')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Incrementamos as visualizações
    const novasViews = (noticia.views || 0) + 1;

    // Atualizamos o registro
    const { error: updateError } = await supabase
      .from('noticias')
      .update({ views: novasViews })
      .eq('id', id);

    if (updateError) throw updateError;
    return true;
  } catch (error) {
    console.error(`Erro ao incrementar visualizações da notícia ${id}:`, error);
    return false;
  }
}

// Função para buscar as notícias mais lidas
async function fetchNoticiasMaisLidas(limit = 5) {
  if (!await initSupabase()) return [];

  try {
    const { data, error } = await supabase
      .from('noticias')
      .select('*')
      .order('views', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar notícias mais lidas:', error);
    return [];
  }
}

// Função para inscrever no newsletter
async function inscreverNewsletter(email) {
  if (!await initSupabase()) return false;

  try {
    // Verificar se o email já existe
    const { data: existingEmails, error: checkError } = await supabase
      .from('newsletter')
      .select('email')
      .eq('email', email);

    if (checkError) throw checkError;

    // Se o email já existe, retornamos falso
    if (existingEmails && existingEmails.length > 0) {
      return { success: false, message: 'Este email já está inscrito.' };
    }

    // Inserir novo email
    const { error: insertError } = await supabase
      .from('newsletter')
      .insert([{ email, data_inscricao: new Date() }]);

    if (insertError) throw insertError;
    return { success: true, message: 'Inscrição realizada com sucesso!' };
  } catch (error) {
    console.error('Erro ao inscrever no newsletter:', error);
    return { success: false, message: 'Erro ao processar inscrição. Tente novamente.' };
  }
}

// Exportar funções para uso em outros arquivos
window.supabaseClient = {
  initSupabase,
  fetchNoticias,
  fetchNoticiasByCategoria,
  fetchNoticiaById,
  incrementarVisualizacoes,
  fetchNoticiasMaisLidas,
  inscreverNewsletter
};