import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

// Protege rutas del frontend: exige sesión y, opcionalmente, un rol.
export default function ProtectedRoute({ role, children }) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  if (cargando) return <div className="container estado">Verificando sesión…</div>;
  if (!usuario) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (role && usuario.rol !== role) {
    return (
      <div className="container estado">
        <h1>Acceso denegado</h1>
        <p>Tu cuenta no tiene permisos de administrador.</p>
        <Link className="btn" to="/">Volver a la tienda</Link>
      </div>
    );
  }
  return children;
}
