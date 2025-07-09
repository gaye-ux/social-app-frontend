import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, Bell, MessageCircle, LogOut, User, Menu, X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import Sidebar from './Sidebar'; // for mobile drawer

const TopNavbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'User';
  const isMobile = useIsMobile();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between h-full px-4 sm:px-6">
          {/* Left: Logo or Menu */}
          <div className="flex items-center space-x-2">
            {isMobile ? (
              <button onClick={() => setDrawerOpen(true)} className="text-gray-700">
                <Menu className="w-6 h-6" />
              </button>
            ) : (
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 social-gradient rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="font-bold text-xl text-gray-900 hidden sm:inline">SocialApp</span>
              </Link>
            )}
          </div>

          {/* Middle: Search (desktop only) */}
          <Link to="/profile" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:opacity-90" title="Profile">
            <User className="w-4 h-4 text-white" />
          </Link>

          {!isMobile && (
            <>
              <span className="font-medium text-gray-900 truncate max-w-[100px]">{userName}</span>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Right: Icons */}
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            </button>

            {!isMobile && (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-medium text-gray-900 truncate max-w-[100px]">{userName}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 🟦 Mobile Drawer Sidebar */}
      {isMobile && drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <div className="relative w-64 bg-white h-full shadow-lg">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setDrawerOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <Sidebar />
          </div>

          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setDrawerOpen(false)} />
        </div>
      )}
    </>
  );
};

export default TopNavbar;
