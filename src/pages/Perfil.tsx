import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Bell,
  Edit,
  Camera,
  Lock,
  MapPin,
  Phone,
  Briefcase,
  BookOpen,
  Award,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  fullName: string;
  bio: string;
  phone: string;
  location: string;
  occupation: string;
}

interface UserStats {
  completedTrails: number;
  articlesRead: number;
  activeDays: number;
}

const Perfil = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // Estados para dados do usuário
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Estados para estatísticas do usuário
  const [userStats, setUserStats] = useState<UserStats>({
    completedTrails: 0,
    articlesRead: 0,
    activeDays: 0
  });

  // Estados para notificações
  const [notifyTrails, setNotifyTrails] = useState(true);
  const [notifyNewsletter, setNotifyNewsletter] = useState(true);
  const [notifyUpdates, setNotifyUpdates] = useState(false);

  // Data de criação da conta formatada
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleDateString('pt-BR') : "--/--/----";

  // Buscar perfil do usuário
  const fetchUserProfile = useCallback(async () => {
    try {
      setLoading(true);

      if (!user?.id) return;

      // Buscar dados do perfil
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        // Ignorar erro de registro não encontrado (PGRST116)
        if (error.code !== 'PGRST116') {
          throw error;
        }
        // Se o perfil não existir, criar um perfil vazio
        await supabase.from('profiles').insert({
          user_id: user.id,
          created_at: new Date().toISOString(),
        });
        return;
      }

      if (data) {
        setFullName(data.full_name || "");
        setBio(data.bio || "");
        setPhone(data.phone || "");
        setLocation(data.location || "");
        setOccupation(data.occupation || "");
        setNotifyTrails(data.notify_trails !== false);
        setNotifyNewsletter(data.notify_newsletter !== false);
        setNotifyUpdates(data.notify_updates === true);

        // Buscar avatar
        if (data.avatar_url) {
          const { data: avatarData } = await supabase.storage
            .from('avatars')
            .getPublicUrl(data.avatar_url);

          if (avatarData?.publicUrl) {
            setAvatarUrl(avatarData.publicUrl);
          }
        }

        // Buscar estatísticas do usuário
        await fetchUserStats();
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar seu perfil.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  // Buscar estatísticas do usuário
  const fetchUserStats = async () => {
    try {
      if (!user?.id) return;

      // Buscar trilhas completadas
      const { data: trailsData, error: trailsError } = await supabase
        .from('user_trails')
        .select('*')
        .eq('user_id', user.id)
        .eq('completed', true);

      // Buscar artigos lidos
      const { data: articlesData, error: articlesError } = await supabase
        .from('user_articles')
        .select('*')
        .eq('user_id', user.id);

      // Buscar dias ativos (logins únicos por dia)
      const { data: loginData, error: loginError } = await supabase
        .from('user_activity')
        .select('date')
        .eq('user_id', user.id);

      // Se as tabelas não existirem, não mostrar erro, apenas usar valores padrão
      const completedTrails = trailsError ? 0 : (trailsData?.length || 0);
      const articlesRead = articlesError ? 0 : (articlesData?.length || 0);
      const activeDays = loginError ? 0 : (loginData?.length || 0);

      setUserStats({
        completedTrails,
        articlesRead,
        activeDays
      });

    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      // Não mostrar toast de erro para não confundir o usuário
    }
  };

  // Registrar atividade do usuário (login do dia)
  const registerUserActivity = async () => {
    try {
      if (!user?.id) return;

      const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

      // Verificar se já existe registro para hoje
      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .eq('date', today)
        .single();

      // Se não existir, criar novo registro
      if (error && error.code === 'PGRST116') {
        await supabase.from('user_activity').insert({
          user_id: user.id,
          date: today
        });
      }
    } catch (error) {
      console.error('Erro ao registrar atividade:', error);
    }
  };

  // Carregar dados do usuário
  useEffect(() => {
    if (user) {
      setUsername(user.email?.split('@')[0] || "Usuário");
      fetchUserProfile();
      registerUserActivity(); // Registrar login do dia
    }
  }, [user, fetchUserProfile]);

  // Atualizar perfil
  const updateProfile = async (formData: ProfileData) => {
    try {
      setLoading(true);

      if (!user?.id) return;

      const updates = {
        user_id: user.id,
        full_name: formData.fullName,
        bio: formData.bio,
        phone: formData.phone,
        location: formData.location,
        occupation: formData.occupation,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates, { onConflict: 'user_id' });

      if (error) throw error;

      // Atualizar estados locais
      setFullName(formData.fullName);
      setBio(formData.bio);
      setPhone(formData.phone);
      setLocation(formData.location);
      setOccupation(formData.occupation);

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });

    } catch (error: unknown) {
      console.error('Erro ao atualizar perfil:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar seu perfil.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Atualizar notificações
  const updateNotifications = async () => {
    try {
      setLoading(true);

      if (!user?.id) return;

      const updates = {
        user_id: user.id,
        notify_trails: notifyTrails,
        notify_newsletter: notifyNewsletter,
        notify_updates: notifyUpdates,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates, { onConflict: 'user_id' });

      if (error) throw error;

      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências de notificação foram atualizadas.",
      });

    } catch (error) {
      console.error('Erro ao atualizar notificações:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar suas preferências.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Upload de avatar
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Você precisa selecionar uma imagem para upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}-${Math.random().toString().substring(2, 8)}.${fileExt}`;

      // Verificar tamanho do arquivo (limite de 2MB)
      if (file.size > 2 * 1024 * 1024) {
        throw new Error('A imagem deve ter no máximo 2MB.');
      }

      // Upload do arquivo
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) throw uploadError;

      // Atualizar perfil com URL do avatar
      const { data: avatarData } = await supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      if (avatarData?.publicUrl) {
        setAvatarUrl(avatarData.publicUrl);

        // Atualizar perfil
        const { error: updateError } = await supabase
          .from('profiles')
          .upsert({
            user_id: user?.id,
            avatar_url: filePath,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'user_id' });

        if (updateError) throw updateError;

        toast({
          title: "Foto atualizada",
          description: "Sua foto de perfil foi atualizada com sucesso.",
        });
      }
    } catch (error: unknown) {
      console.error('Erro ao fazer upload:', error);
      toast({
        title: "Erro no upload",
        description: error instanceof Error ? error.message : "Não foi possível fazer o upload da imagem.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  // Alterar senha
  const handleChangePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      });

    } catch (error: unknown) {
      console.error('Erro ao alterar senha:', error);
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Não foi possível alterar sua senha.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 pb-16 bg-gradient-to-br from-finance-blue/5 via-white to-finance-green/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Meu Perfil
            </h1>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Sidebar com informações do usuário */}
              <div className="md:col-span-1">
                <Card className="shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col items-center">
                      <div className="relative mb-4">
                        <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                          {avatarUrl ? (
                            <AvatarImage src={avatarUrl} alt={username} />
                          ) : (
                            <AvatarFallback className="bg-finance-blue/10 text-finance-blue text-2xl">
                              {username.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <label
                          htmlFor="avatar-upload"
                          className="absolute bottom-0 right-0 p-1 bg-finance-blue text-white rounded-full cursor-pointer hover:bg-finance-blue-dark transition-colors"
                        >
                          <Camera className="h-4 w-4" />
                          <span className="sr-only">Upload de foto</span>
                        </label>
                        <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={uploadAvatar}
                          disabled={uploading}
                        />
                      </div>
                      <CardTitle className="text-xl text-center">{fullName || username}</CardTitle>
                      <CardDescription className="text-center">{user?.email}</CardDescription>
                      {occupation && (
                        <div className="mt-2 text-sm text-center text-gray-600">
                          <Briefcase className="h-3 w-3 inline mr-1" />
                          {occupation}
                        </div>
                      )}
                      {location && (
                        <div className="mt-1 text-sm text-center text-gray-600">
                          <MapPin className="h-3 w-3 inline mr-1" />
                          {location}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-finance-blue" />
                        <span>Email verificado</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-finance-blue" />
                        <span>Membro desde {createdAt}</span>
                      </div>
                      {bio && (
                        <div className="pt-3 border-t">
                          <p className="text-sm text-gray-700">{bio}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/minhas-trilhas" className="w-full">
                      <Button className="w-full bg-finance-blue hover:bg-finance-blue-dark text-white">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Minhas Trilhas
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>

                <Card className="mt-6 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Estatísticas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Award className="h-5 w-5 mr-2 text-finance-green" />
                          <span className="text-sm">Trilhas concluídas</span>
                        </div>
                        <span className="font-semibold">{userStats.completedTrails}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <BookOpen className="h-5 w-5 mr-2 text-finance-blue" />
                          <span className="text-sm">Artigos lidos</span>
                        </div>
                        <span className="font-semibold">{userStats.articlesRead}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Calendar className="h-5 w-5 mr-2 text-finance-green" />
                          <span className="text-sm">Dias ativos</span>
                        </div>
                        <span className="font-semibold">{userStats.activeDays}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Conteúdo principal */}
              <div className="md:col-span-2">
                <Card className="mb-6 shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="h-5 w-5 mr-2 text-finance-blue" />
                        <CardTitle>Informações Pessoais</CardTitle>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Edit className="h-4 w-4" />
                            Editar
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Informações Pessoais</DialogTitle>
                            <DialogDescription>
                              Atualize suas informações pessoais aqui. Clique em salvar quando terminar.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="name" className="text-right">
                                Nome Completo
                              </Label>
                              <Input
                                id="name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="occupation" className="text-right">
                                Profissão
                              </Label>
                              <Input
                                id="occupation"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                className="col-span-3"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="location" className="text-right">
                                Localização
                              </Label>
                              <Input
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="col-span-3"
                                placeholder="Cidade, Estado"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="phone" className="text-right">
                                Telefone
                              </Label>
                              <Input
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="col-span-3"
                                placeholder="(00) 00000-0000"
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="bio" className="text-right">
                                Biografia
                              </Label>
                              <Textarea
                                id="bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                className="col-span-3"
                                placeholder="Conte um pouco sobre você..."
                                rows={3}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              type="submit"
                              onClick={() => updateProfile({ fullName, bio, phone, location, occupation })}
                              disabled={loading}
                            >
                              {loading ? 'Salvando...' : 'Salvar alterações'}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <CardDescription>Gerencie suas informações pessoais</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                          <div className="mt-1 p-2 border rounded-md bg-gray-50">{fullName || 'Não informado'}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Email</label>
                          <div className="mt-1 p-2 border rounded-md bg-gray-50">{user?.email}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Telefone</label>
                          <div className="mt-1 p-2 border rounded-md bg-gray-50">{phone || 'Não informado'}</div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700">Localização</label>
                          <div className="mt-1 p-2 border rounded-md bg-gray-50">{location || 'Não informado'}</div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Biografia</label>
                        <div className="mt-1 p-2 border rounded-md bg-gray-50 min-h-[60px]">{bio || 'Não informado'}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6 shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-finance-blue" />
                        <CardTitle>Segurança</CardTitle>
                      </div>
                    </div>
                    <CardDescription>Gerencie sua senha e segurança da conta</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Senha</h4>
                          <p className="text-sm text-gray-500">Altere sua senha regularmente para maior segurança</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Lock className="h-4 w-4 mr-2" />
                              Alterar Senha
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Alterar Senha</DialogTitle>
                              <DialogDescription>
                                Crie uma nova senha forte para sua conta.
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.currentTarget);
                              const currentPassword = formData.get('currentPassword') as string;
                              const newPassword = formData.get('newPassword') as string;
                              const confirmPassword = formData.get('confirmPassword') as string;

                              if (newPassword !== confirmPassword) {
                                toast({
                                  title: "Erro",
                                  description: "As senhas não coincidem.",
                                  variant: "destructive"
                                });
                                return;
                              }

                              handleChangePassword(currentPassword, newPassword);
                            }}>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="currentPassword" className="text-right">
                                    Senha Atual
                                  </Label>
                                  <Input
                                    id="currentPassword"
                                    name="currentPassword"
                                    type="password"
                                    className="col-span-3"
                                    required
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="newPassword" className="text-right">
                                    Nova Senha
                                  </Label>
                                  <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    className="col-span-3"
                                    required
                                    minLength={6}
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="confirmPassword" className="text-right">
                                    Confirmar Senha
                                  </Label>
                                  <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    className="col-span-3"
                                    required
                                    minLength={6}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit" disabled={loading}>
                                  {loading ? 'Alterando...' : 'Alterar Senha'}
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Verificação em duas etapas</h4>
                            <p className="text-sm text-gray-500">Adicione uma camada extra de segurança à sua conta</p>
                          </div>
                          <Button variant="outline" disabled>
                            Em breve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-2 text-finance-blue" />
                        <CardTitle>Notificações</CardTitle>
                      </div>
                    </div>
                    <CardDescription>Gerencie suas preferências de notificação</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atualizações de Trilhas</p>
                          <p className="text-sm text-gray-500">Receba notificações sobre novas trilhas e conteúdos</p>
                        </div>
                        <Switch
                          checked={notifyTrails}
                          onCheckedChange={(checked) => {
                            setNotifyTrails(checked);
                            setTimeout(() => updateNotifications(), 300);
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Newsletter</p>
                          <p className="text-sm text-gray-500">Receba nossa newsletter semanal</p>
                        </div>
                        <Switch
                          checked={notifyNewsletter}
                          onCheckedChange={(checked) => {
                            setNotifyNewsletter(checked);
                            setTimeout(() => updateNotifications(), 300);
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Atualizações da Plataforma</p>
                          <p className="text-sm text-gray-500">Receba notificações sobre novidades e melhorias</p>
                        </div>
                        <Switch
                          checked={notifyUpdates}
                          onCheckedChange={(checked) => {
                            setNotifyUpdates(checked);
                            setTimeout(() => updateNotifications(), 300);
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Perfil;