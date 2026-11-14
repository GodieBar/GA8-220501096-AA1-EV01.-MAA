// Comunicación con el backend. Adjunta el JWT automáticamente en "Authorization: Bearer <token>".
const BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';
const TOKEN_KEY = 'bytezone_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (t) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY)
};

export class ApiError extends Error {
  constructor(message, status, detalles) {
    super(message);
    this.status = status;
    this.detalles = detalles;
  }
}

export async function request(path, { method = 'GET', body, auth = true } = {}) {
  const token = auth ? tokenStore.get() : null;
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(BASE + path, { method, headers, body: body !== undefined ? JSON.stringify(body) : undefined });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Verifica que el backend esté encendido en http://127.0.0.1:3000', 0);
  }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && token) window.dispatchEvent(new Event('bytezone:sesion-expirada'));
    throw new ApiError(data?.error || `Error ${res.status}`, res.status, data?.detalles);
  }
  return data;
}

const query = (obj = {}) => {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => { if (v !== '' && v !== undefined && v !== null) p.set(k, v); });
  const s = p.toString();
  return s ? `?${s}` : '';
};

export const api = {
  login: (datos) => request('/api/auth/login', { method: 'POST', body: datos, auth: false }),
  registro: (datos) => request('/api/auth/register', { method: 'POST', body: datos, auth: false }),
  perfil: () => request('/api/auth/perfil'),
  categorias: () => request('/api/categorias', { auth: false }),
  marcas: () => request('/api/marcas', { auth: false }),
  productos: (filtros) => request(`/api/productos${query(filtros)}`, { auth: false }),
  producto: (id) => request(`/api/productos/${id}`, { auth: false }),
  crearProducto: (datos) => request('/api/productos', { method: 'POST', body: datos }),
  actualizarProducto: (id, datos) => request(`/api/productos/${id}`, { method: 'PUT', body: datos }),
  eliminarProducto: (id) => request(`/api/productos/${id}`, { method: 'DELETE' }),
  inventario: () => request('/api/inventario'),
  fichas: () => request('/api/fichas')
};
