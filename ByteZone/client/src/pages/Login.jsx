import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { usuario, login, registrar } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [modo, setModo] = useState('login');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [enviando, setEnviando] = useState(false);

  if (usuario) return <Navigate to={location.state?.from || (usuario.rol === 'admin' ? '/admin' : '/')} replace />;

  async function enviar(e) {
    e.preventDefault();
    setError(''); setDetalles([]); setEnviando(true);
    try {
      const u = modo === 'login' ? await login(email, password) : await registrar(nombre, email, password);
      navigate(location.state?.from || (u.rol === 'admin' ? '/admin' : '/'), { replace: true });
    } catch (err) {
      setError(err.message);
      setDetalles(err.detalles || []);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="container auth">
      <form className="card auth-form" onSubmit={enviar} noValidate>
        <h1>{modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h1>

        {modo === 'registro' && (
          <label className="campo">Nombre completo
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" required />
          </label>
        )}
        <label className="campo">Correo electrónico
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
        </label>
        <label className="campo">Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={modo === 'login' ? 'current-password' : 'new-password'} required />
        </label>

        {error && (
          <div className="alerta alerta-error" role="alert">
            {error}
            {detalles.length > 0 && <ul>{detalles.map((d) => <li key={d}>{d}</li>)}</ul>}
          </div>
        )}

        <button className="btn btn-lg btn-block" disabled={enviando}>{enviando ? 'Enviando…' : modo === 'login' ? 'Ingresar' : 'Registrarme'}</button>

        <p className="auth-cambio">
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button type="button" className="link" onClick={() => { setModo(modo === 'login' ? 'registro' : 'login'); setError(''); setDetalles([]); }}>
            {modo === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </form>

      <aside className="card auth-demo">
        <h2>Cuentas de demostración</h2>
        <p><b>Administrador</b><br />admin@bytezone.com<br />Admin123*</p>
        <p><b>Cliente</b><br />cliente@bytezone.com<br />Cliente123*</p>
        <p className="muted">Estas cuentas existen solo en la base de datos local de desarrollo.</p>
      </aside>
    </div>
  );
}
