import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Droplets, ArrowLeftRight, FileText, Radio, PawPrint, Users, LogOut } from 'lucide-react';

const menuItems = [
  { path: '/painel', label: 'Painel', Icon: BarChart3 },
  { path: '/pocos', label: 'Pocos', Icon: Droplets },
  { path: '/dutos', label: 'Dutos', Icon: ArrowLeftRight },
  { path: '/conformidade', label: 'Conformidade', Icon: FileText },
  { path: '/telemetria', label: 'Telemetria', Icon: Radio },
  { path: '/fauna', label: 'Fauna', Icon: PawPrint },
  { path: '/usuarios', label: 'Usuarios', Icon: Users },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();

  return (
    <div className="wrapper" data-testid="app-layout">
      <aside className="main-sidebar" data-testid="main-sidebar">
        <div className="sidebar-header">
          <div className="logo-area">
            <span className="oil-drop" data-testid="petronac-logo">&#9679;</span>
            <span className="company-name">PetroNac</span>
          </div>
          <div className="system-name">SIGEP v2.4.1</div>
        </div>
        <div className="sidebar-user">
          <span className="user-name" data-testid="sidebar-user-name">{user?.nome || 'Usuario'}</span>
          <span className="user-role">{user?.cargo || user?.role || ''}</span>
        </div>
        <nav className="sidebar-nav" data-testid="sidebar-nav">
          {menuItems.map(({ path, label, Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              data-testid={`nav-${path.slice(1)}`}
            >
              <Icon size={16} className="nav-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn" data-testid="logout-button">
            <LogOut size={14} /> Sair
          </button>
        </div>
      </aside>
      <div className="content-wrapper" data-testid="content-wrapper">
        {children}
      </div>
    </div>
  );
}
