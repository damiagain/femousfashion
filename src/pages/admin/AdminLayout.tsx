import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  MessageSquare,
  LogOut,
  Settings as SettingsIcon,
  Globe } from
'lucide-react';
export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('admin_auth');
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [navigate]);
  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };
  const navItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: LayoutDashboard
  },
  {
    name: 'Products',
    path: '/admin/products',
    icon: Package
  },
  {
    name: 'Categories',
    path: '/admin/categories',
    icon: Tags
  },
  {
    name: 'Reviews',
    path: '/admin/reviews',
    icon: MessageSquare
  },
  {
    name: 'Settings',
    path: '/admin/settings',
    icon: SettingsIcon
  }];

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true;
    if (path !== '/admin' && location.pathname.startsWith(path)) return true;
    return false;
  };
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 flex-col bg-[#2B3A55] text-white md:flex">
        <div className="flex h-20 items-center justify-between px-6 border-b border-white/10">
          <Link
            to="/"
            className="font-fraunces text-xl font-medium tracking-wide">
            FEMOUS ADMIN
          </Link>
          <Link
            to="/"
            title="View Main Site"
            className="flex items-center justify-center rounded-lg bg-white/10 p-2 text-gray-300 hover:bg-white/20 hover:text-white transition-colors">
            <Globe className="h-5 w-5" />
          </Link>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 font-inter text-sm font-medium transition-colors ${isActive(item.path) ? 'bg-[#D4A373] text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}>
                
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>);

          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-inter text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white">
            
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pb-20 md:pb-0">
        <div className="h-16 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 border-b border-gray-200 md:hidden">
          <span className="font-fraunces text-lg text-[#2B3A55]">
            Femous Admin
          </span>
          <Link
            to="/"
            className="flex items-center gap-2 rounded-lg bg-[#D4A373] px-3 py-1.5 text-xs font-semibold text-white">
            <Globe className="h-4 w-4" />
            View Site
          </Link>
        </div>
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-gray-200 bg-white md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full ${active ? 'text-[#D4A373]' : 'text-gray-500'}`}>
              
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-inter font-medium">
                {item.name}
              </span>
            </Link>);

        })}
      </nav>
    </div>);

}