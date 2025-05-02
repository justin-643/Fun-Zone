import React from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle } from 'lucide-react';
import { useNotificationStore } from '../store/useNotificationStore';
import { useAuthStore } from '../store/useAuthStore';
import NotificationList from '../components/notifications/NotificationList';
import Button from '../components/ui/Button';

const NotificationsPage: React.FC = () => {
  const { notifications, markAllAsRead, unreadCount } = useNotificationStore();
  const { user } = useAuthStore();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  
  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Please log in to view notifications.</p>
      </div>
    );
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 max-w-4xl mx-auto"
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center">
          <div className="mr-3 h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
            <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {unreadCount > 0
                ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`
                : "You're all caught up!"}
            </p>
          </div>
        </div>
        
        {unreadCount > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={markAllAsRead}
            icon={<CheckCircle className="h-4 w-4" />}
          >
            Mark all as read
          </Button>
        )}
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <NotificationList notifications={notifications} />
      </div>
    </motion.div>
  );
};

export default NotificationsPage;