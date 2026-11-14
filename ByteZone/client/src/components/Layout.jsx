import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

function Logo() {
  return (
    <Link to="/" className="logo" aria-label="BYTEZONE, ir al inicio">
      <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
        <rect width="32" height="32" rx="7" fill="#2B50F0" />
        <path d="M9 7h8a5 5 0 0 1 3 9 5 5 0 0 1-3 9H9z" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        <path d="M9 16h10" stroke="#fff" strokeWidth="3" />
      </svg>
      <span><b>BYTE</b>ZONE</span>
    </Link>
  );
}

export default function Layout() {
  const { usuario, esAdmin, logout } = useAuth();
  const { unidades } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <header className="header">
        <div className="container header-in">
          <Logo />
          <nav className="nav" aria-label="Principal">
            <NavLink to="/" end>Inicio</NavLink>
            <NavLink to="/catalogo">Catálogo</NavLink>
            {esAdmin && <NavLink to="/admin">Panel admin</NavLink>}
          </nav>
          <div className="header-acciones">
            <Link to="/carrito" className="carrito-link" aria-label={`Carrito, ${unidades} productos`}>
              Carrito <span className="contador">{unidades}</span>
            </Link>
            {usuario ? (
              <>
                <span className="saludo">Hola, {usuario.nombre.split(' ')[0]}</span>
                <button className="btn btn-ghost btn-sm" onClick={() => { logout(); navigate('/'); }}>Cerrar sesión</button>
              </>
            ) : (
              <Link className="btn btn-sm" to="/login">Ingresar</Link>
            )}
          </div>
        </div>
      </header>

      <main><Outlet /></main>

      <footer className="footer">
        <div className="container footer-in">
          <div>
            <Logo />
            <p>Tienda virtual de computadores, portátiles, componentes y periféricos. Proyecto académico SENA · ADSO 3235904.</p>
          </div>
          <div>
            <h4>Comprar</h4>
            <Link to="/catalogo?categoria=portatiles">Portátiles</Link>
            <Link to="/catalogo?categoria=tarjetas-graficas">Tarjetas gráficas</Link>
            <Link to="/catalogo?categoria=perifericos">Periféricos</Link>
          </div>
          <div>
            <h4>Cuenta</h4>
            <Link to="/login">Ingresar</Link>
            <Link to="/carrito">Mi carrito</Link>
          </div>
        </div>
        <p className="footer-legal">© {new Date().getFullYear()} BYTEZONE · Productos y precios de demostración.</p>
      </footer>
    </>
  );
}
