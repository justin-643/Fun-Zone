import React from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Gamepad2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Notification } from '../../types';
import { useNotificationStore } from '../../store/useNotificationStore';

interface NotificationListProps {
  notifications: Notification[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => {
  const { markAsRead, removeNotification } = useNotificationStore();
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };
  
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'game-invite':
        return <Gamepad2 className="h-5 w-5 text-green-500" />;
      case 'friend-request':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 dark:text-gray-400">
        No notifications yet.
      </div>
    );
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {notifications.map((notification) => (
        <motion.div
          key={notification.id}
          variants={itemVariants}
          className={`
            relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border
            ${notification.read ? 'border-gray-200 dark:border-gray-700' : 'border-purple-300 dark:border-purple-700'}
          `}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {getNotificationIcon(notification.type)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <div>
                  <p className={`text-sm ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'font-medium text-gray-900 dark:text-white'}`}>
                    {notification.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatTime(notification.timestamp)}
                  </p>
                </div>
                
                <div className="flex">
                  {!notification.read && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => markAsRead(notification.id)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1"
                    >
                      <Check className="h-4 w-4" />
                    </motion.button>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeNotification(notification.id)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 p-1"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              {notification.actionPath && (
                <Link
                  to={notification.actionPath}
                  className="inline-block mt-2 text-xs font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                  onClick={() => markAsRead(notification.id)}
                >
                  View Details →
                </Link>
              )}
            </div>
          </div>
          
          {!notification.read && (
            <div className="absolute top-4 left-0 w-1 h-10 bg-purple-500 rounded-r-full"></div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default NotificationList;