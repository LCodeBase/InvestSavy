import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  user_id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
  user_name: string;
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [chatStarted, setChatStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Gerar ID único para a sessão
  const generateSessionId = () => {
    return 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Iniciar chat
  const startChat = async () => {
    if (!userName.trim() || !userEmail.trim()) return;

    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setChatStarted(true);

    // Criar registro da sessão de chat
    await supabase.from('chat_sessions').insert({
      session_id: newSessionId,
      user_name: userName,
      user_email: userEmail,
      status: 'active',
      started_at: new Date().toISOString()
    });

    // Enviar notificação para admin
    await supabase.from('admin_notifications').insert({
      type: 'new_chat',
      title: 'Novo chat iniciado',
      message: `${userName} (${userEmail}) iniciou um chat`,
      session_id: newSessionId,
      created_at: new Date().toISOString()
    });
  };

  // Enviar mensagem
  const sendMessage = async () => {
    if (!newMessage.trim() || !sessionId) return;

    const message = {
      session_id: sessionId,
      user_name: userName,
      message: newMessage,
      is_admin: false,
      created_at: new Date().toISOString()
    };

    await supabase.from('chat_messages').insert(message);
    setNewMessage('');
  };

  // Buscar mensagens em tempo real
  useEffect(() => {
    if (!sessionId) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (data) setMessages(data);
    };

    fetchMessages();

    // Subscription para mensagens em tempo real
    const subscription = supabase
      .channel('chat_messages')
      .on('INSERT', {
        event: 'INSERT',
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message]);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [sessionId]);

  // Auto scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Botão flutuante do chat */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-finance-blue hover:bg-finance-blue-dark text-white shadow-lg z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Widget do chat */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-finance-blue text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat ao Vivo</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 p-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 flex flex-col">
            {!chatStarted ? (
              /* Formulário inicial */
              <div className="p-4 space-y-3">
                <p className="text-sm text-gray-600">Olá! Para iniciar o chat, preencha seus dados:</p>
                <Input
                  placeholder="Seu nome"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Input
                  placeholder="Seu email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button
                  onClick={startChat}
                  className="w-full bg-finance-green hover:bg-finance-green-dark"
                  disabled={!userName.trim() || !userEmail.trim()}
                >
                  Iniciar Chat
                </Button>
              </div>
            ) : (
              /* Chat ativo */
              <>
                {/* Mensagens */}
                <div className="flex-1 p-4 overflow-y-auto space-y-2">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.is_admin ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          msg.is_admin
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-finance-blue text-white'
                        }`}
                      >
                        {msg.is_admin && (
                          <div className="text-xs font-semibold mb-1">Suporte</div>
                        )}
                        {msg.message}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input de mensagem */}
                <div className="p-4 border-t flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;