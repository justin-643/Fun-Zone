import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  removeNotification: (notificationId: string) => void;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    type: 'message',
    content: 'GiggleGalaxy sent you a message',
    read: false,
    timestamp: Date.now() - 300000,
    actionPath: '/chat/room1',
  },
  {
    id: 'notif2',
    type: 'game-invite',
    content: 'FizzPopDragon invited you to play Tic-Tac-Toe',
    read: false,
    timestamp: Date.now() - 900000,
    actionPath: '/games/game1',
  },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.read).length,
  
  addNotification: (notification) => {
    const { notifications } = get();
    const newNotification: Notification = {
      id: `notif_${Date.now()}`,
      timestamp: Date.now(),
      read: false,
      ...notification,
    };
    
    set({
      notifications: [newNotification, ...notifications],
      unreadCount: get().unreadCount + 1,
    });
  },
  
  markAsRead: (notificationId: string) => {
    const { notifications } = get();
    
    const updatedNotifications = notifications.map(notification => {
      if (notification.id === notificationId && !notification.read) {
        return { ...notification, read: true };
      }
      return notification;
    });
    
    const unreadCount = updatedNotifications.filter(n => !n.read).length;
    
    set({
      notifications: updatedNotifications,
      unreadCount,
    });
  },
  
  markAllAsRead: () => {
    const { notifications } = get();
    
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true,
    }));
    
    set({
      notifications: updatedNotifications,
      unreadCount: 0,
    });
  },
  
  removeNotification: (notificationId: string) => {
    const { notifications } = get();
    
    const notificationToRemove = notifications.find(n => n.id === notificationId);
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    
    set({
      notifications: updatedNotifications,
      unreadCount: get().unreadCount - (notificationToRemove && !notificationToRemove.read ? 1 : 0),
    });
  },
}));