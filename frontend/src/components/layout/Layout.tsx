import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from './Sidebar';
import { Menu, X, ChefHat, LogOut } from 'lucide-react';

export const Layout: React.FC = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-600 rounded-full animate-spin"></div>
          <ChefHat size={28} className="absolute text-emerald-600 animate-bounce" />
        </div>
        <p className="text-sm font-semibold text-slate-500 animate-pulse">
          Loading NutriChef AI...
        </p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/inventory')) return 'Fridge Inventory';
    if (path.includes('/recipe-generator')) return 'Recipe Discovery';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen sticky top-0 shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Slider */}
      <div className={`
        fixed inset-y-0 left-0 w-64 z-50 transform lg:hidden transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar Header */}
        <header className="h-16 bg-white border-b border-slate-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors duration-300">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Log out button */}
            <button
              onClick={logout}
              className="p-2.5 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-slate-100 transition-colors"
              title="Log Out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
