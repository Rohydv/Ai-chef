import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  ChefHat, 
  Refrigerator, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Dashboard', to: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Fridge Inventory', to: '/inventory', icon: <Refrigerator size={20} /> },
    { name: 'Recipe Generator', to: '/recipe-generator', icon: <ChefHat size={20} /> },
  ];

  const handleLinkClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-full">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-50 flex items-center gap-3">
        <div className="bg-emerald-500/10 text-emerald-600 p-2.5 rounded-xl">
          <ChefHat size={26} className="animate-pulse" />
        </div>
        <div>
          <span className="font-extrabold text-xl bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
            NutriChef AI
          </span>
          <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
            Nutrition Assistant
          </p>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            onClick={handleLinkClick}
            className={({ isActive }) => `
              flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 group
              ${isActive 
                ? 'bg-emerald-50/80 text-emerald-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }
            `}
          >
            {({ isActive }) => (
              <>
                <span className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User profile footer */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/50">
        <div className="flex items-center justify-between gap-2 px-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-full bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0 uppercase">
              {user?.username?.substring(0, 2) || 'NC'}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate leading-none mb-1">
                {user?.username}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
};
