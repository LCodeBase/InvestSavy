
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SecurityProvider } from "./components/SecurityProvider";
import { navItems } from "./nav-items";

// Configuração segura do QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Configurações de segurança para queries
      retry: (failureCount, error: any) => {
        // Não tentar novamente em caso de erros de autenticação
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000, // 10 minutos (anteriormente cacheTime)
      refetchOnWindowFocus: false, // Evitar refetch automático por segurança
      refetchOnMount: true,
    },
    mutations: {
      retry: false, // Não tentar novamente mutations por segurança
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SecurityProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {navItems.map(({ to, component }) => (
              <Route key={to} path={to} element={React.createElement(component)} />
            ))}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SecurityProvider>
  </QueryClientProvider>
);

export default App;
