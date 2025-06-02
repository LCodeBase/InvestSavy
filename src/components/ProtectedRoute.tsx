import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirecionar para a página de login se não estiver autenticado
      router.push('/login');
    }
  }, [user, loading, router]);

  // Mostrar loading enquanto verifica autenticação
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Se não estiver autenticado, não renderiza nada
  if (!user) {
    return null;
  }

  // Se estiver autenticado, renderiza o conteúdo protegido
  return <>{children}</>;
}