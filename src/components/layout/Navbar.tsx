import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Bell, MessageSquare, Gamepad2, LogOut, User2, Youtube } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { path: '/chat', label: 'Chat', icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/games', label: 'Games', icon: <Gamepad2 className="h-5 w-5" /> },
    { path: '/notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User2 className="h-5 w-5" /> },
    { path: '/Youtube', label: 'Youtube', icon: <Youtube className="h-5 w-5" /> },
 
  ];
  
  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md dark:shadow-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <motion.div
                className="h-10 w-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Gamepad2 className="h-6 w-6 text-white" />
              </motion.div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">CrazyChat</span>
            </Link>
          </div>
          
          {user && (
            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActivePath(link.path)
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  
                  {link.path === '/notifications' && unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {unreadCount}
                    </motion.div>
                  )}
                </Link>
              ))}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                icon={<LogOut className="h-4 w-4" />}
              >
                Logout
              </Button>
            </div>
          )}
          
          {user && (
            <div className="flex md:hidden items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative block px-3 py-2 rounded-md text-base font-medium ${
                    isActivePath(link.path)
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  
                  {link.path === '/notifications' && unreadCount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </div>
                  )}
                </Link>
              ))}
              
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <div className="flex items-center space-x-2">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;