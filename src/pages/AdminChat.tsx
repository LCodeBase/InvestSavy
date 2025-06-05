import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminChat = () => {
  const [activeSessions, setActiveSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Buscar sessões ativas
  useEffect((): (() => void) => {
    const fetchActiveSessions = async () => {
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('status', 'active')
        .order('started_at', { ascending: false });

      setActiveSessions(data || []);
    };

    fetchActiveSessions();

    // Subscription para novas sessões
    const subscription = supabase
      .channel('chat_sessions')
      .on('postgres_changes', {
        event: 'INSERT',
        table: 'chat_sessions'
      }, () => {
        fetchActiveSessions();
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);

  // Buscar notificações
  useEffect(() => {
    const fetchNotifications = async () => {
      const { data } = await supabase
        .from('admin_notifications')
        .select('*')
        .eq('read', false)
        .order('created_at', { ascending: false });

      setNotifications(data || []);
    };

    fetchNotifications();
  }, []);

  // Enviar mensagem como admin
  const sendAdminMessage = async () => {
    if (!newMessage.trim() || !selectedSession) return;

    await supabase.from('chat_messages').insert({
      session_id: selectedSession.session_id,
      user_name: 'Suporte',
      message: newMessage,
      is_admin: true,
      created_at: new Date().toISOString()
    });

    setNewMessage('');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Painel de Chat Admin</h1>

      {/* Notificações */}
      {notifications.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notificações ({notifications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {notifications.map((notif) => (
              <div key={notif.id} className="p-2 bg-blue-50 rounded mb-2">
                <strong>{notif.title}</strong>
                <p className="text-sm">{notif.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Lista de sessões ativas */}
        <Card>
          <CardHeader>
            <CardTitle>Chats Ativos ({activeSessions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className={`p-3 border rounded cursor-pointer mb-2 ${selectedSession?.id === session.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                  }`}
                onClick={() => setSelectedSession(session)}
              >
                <div className="font-semibold">{session.user_name}</div>
                <div className="text-sm text-gray-600">{session.user_email}</div>
                <div className="text-xs text-gray-500">
                  {new Date(session.started_at).toLocaleString()}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat selecionado */}
        <div className="md:col-span-2">
          {selectedSession ? (
            <Card className="h-96">
              <CardHeader>
                <CardTitle>Chat com {selectedSession.user_name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                {/* Mensagens */}
                <div className="flex-1 overflow-y-auto mb-4">
                  {/* Implementar lista de mensagens aqui */}
                </div>

                {/* Input para resposta */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua resposta..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendAdminMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendAdminMessage}>Enviar</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <p className="text-gray-500">Selecione um chat para começar a responder</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminChat;