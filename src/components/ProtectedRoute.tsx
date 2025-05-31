import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Mostrar um indicador de carregamento enquanto verifica a autenticação
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  // Redirecionar para a página de login se o usuário não estiver autenticado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Renderizar o conteúdo protegido se o usuário estiver autenticado
  return <>{children}</>;
};

export default ProtectedRoute;