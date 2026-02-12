import React, { useState } from 'react';
import { Layout, Calendar, ShoppingCart, Package, DollarSign, LogOut, Menu, X } from 'lucide-react';
import CalendarModule from './calendar/Calendar';
import POSModule from './pos/POS';
import InventoryModule from './inventory/Inventory';
import FinanceModule from './finance/Finance';
import { logoutUser } from '../services/authService';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'calendar', label: 'Agenda', icon: <Calendar size={20} /> },
    { id: 'pos', label: 'Venta Kiosco', icon: <ShoppingCart size={20} /> },
    { id: 'inventory', label: 'Inventario', icon: <Package size={20} /> },
    { id: 'finance', label: 'Finanzas', icon: <DollarSign size={20} /> },
  ];

  return (
    <div className="dashboard-wrapper">
      {/* Botón Móvil */}
      <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar Navegación */}
      <nav className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <h2>AERO JUMP</h2>
        </div>
        <ul className="nav-links">
          {menuItems.map((item) => (
            <li 
              key={item.id} 
              className={activeTab === item.id ? 'active' : ''}
              onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }}
            >
              {item.icon} <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <button className="logout-btn" onClick={logoutUser}>
          <LogOut size={20} /> <span>Cerrar Sesión</span>
        </button>
      </nav>

      {/* Contenedor de Módulos */}
      <main className="content-area">
        {activeTab === 'calendar' && <CalendarModule />}
        {activeTab === 'pos' && <POSModule />}
        {activeTab === 'inventory' && <InventoryModule />}
        {activeTab === 'finance' && <FinanceModule />}
      </main>
    </div>
  );
};

export default Dashboard;
