
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  User, 
  Upload, 
  Bell, 
  Settings, 
  Shield,
  MessageSquare,
  TrendingUp 
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: Home, label: 'Feed', adminOnly: false },
    { to: '/profile', icon: User, label: 'Profile', adminOnly: false },
    { to: '/upload-request', icon: Upload, label: 'Upload Content', adminOnly: false },
    { to: '/notifications', icon: Bell, label: 'Notifications', adminOnly: false },
    { to: '/admin', icon: Shield, label: 'Admin Dashboard', adminOnly: true },
    { to: '/comments', icon: MessageSquare, label: 'Comments', adminOnly: false },
    { to: '/trending', icon: TrendingUp, label: 'Trending', adminOnly: false },
    { to: '/settings', icon: Settings, label: 'Settings', adminOnly: false },
  ];

  const isAdmin = localStorage.getItem('userRole') === 'admin';

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          if (item.adminOnly && !isAdmin) return null;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
