import { NavLink, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="container admin">
      <aside className="admin-nav" aria-label="Administración">
        <h2>Administración</h2>
        <NavLink to="/admin" end>Dashboard</NavLink>
        <NavLink to="/admin/productos">Productos</NavLink>
        <NavLink to="/admin/inventario">Inventario</NavLink>
      </aside>
      <section className="admin-main"><Outlet /></section>
    </div>
  );
}
