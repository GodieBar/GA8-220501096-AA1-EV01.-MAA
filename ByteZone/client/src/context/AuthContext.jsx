import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, tokenStore } from '../api/client.js';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(Boolean(tokenStore.get()));

  const logout = useCallback(() => {
    tokenStore.clear();
    setUsuario(null);
  }, []);

  // Al abrir la página, si hay un token guardado, el backend confirma que sigue siendo válido.
  useEffect(() => {
    if (!tokenStore.get()) return;
    api.perfil()
      .then((r) => setUsuario(r.usuario))
      .catch(() => tokenStore.clear())
      .finally(() => setCargando(false));
  }, []);

  useEffect(() => {
    window.addEventListener('bytezone:sesion-expirada', logout);
    return () => window.removeEventListener('bytezone:sesion-expirada', logout);
  }, [logout]);

  async function login(email, password) {
    const r = await api.login({ email, password });
    tokenStore.set(r.token);
    setUsuario(r.usuario);
    return r.usuario;
  }

  async function registrar(nombre, email, password) {
    const r = await api.registro({ nombre, email, password });
    tokenStore.set(r.token);
    setUsuario(r.usuario);
    return r.usuario;
  }

  return (
    <AuthContext.Provider value={{ usuario, cargando, esAdmin: usuario?.rol === 'admin', login, registrar, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
