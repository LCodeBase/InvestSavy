import { useState, useEffect } from 'react'
import { supabase } from '../config/security'
import { validatePassword, sanitizeInput } from '../config/security'

interface AuthState {
  user: any | null
  loading: boolean
  error: string | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Verificar sessão atual
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error) throw error
        setState((prev) => ({
          ...prev,
          user: session?.user ?? null,
          loading: false,
        }))
      } catch (error: any) {
        setState((prev) => ({ ...prev, error: error.message, loading: false }))
      }
    }

    checkSession()

    // Escutar mudanças na autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({ ...prev, user: session?.user ?? null }))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      // Sanitizar inputs
      const sanitizedEmail = sanitizeInput(email)
      const sanitizedPassword = sanitizeInput(password)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: sanitizedPassword,
      })

      if (error) throw error
      setState((prev) => ({ ...prev, user: data.user, loading: false }))
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message, loading: false }))
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      // Validar força da senha
      if (!validatePassword(password)) {
        throw new Error(
          'A senha não atende aos requisitos mínimos de segurança'
        )
      }

      // Sanitizar inputs
      const sanitizedEmail = sanitizeInput(email)
      const sanitizedPassword = sanitizeInput(password)

      const { data, error } = await supabase.auth.signUp({
        email: sanitizedEmail,
        password: sanitizedPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
      setState((prev) => ({ ...prev, user: data.user, loading: false }))
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message, loading: false }))
    }
  }

  const signOut = async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }))
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setState((prev) => ({ ...prev, user: null, loading: false }))
    } catch (error: any) {
      setState((prev) => ({ ...prev, error: error.message, loading: false }))
    }
  }

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signUp,
    signOut,
  }
}
