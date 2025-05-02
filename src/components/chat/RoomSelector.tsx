import React from 'react';
import { motion } from 'framer-motion';
import { ChatRoom } from '../../types';

interface RoomSelectorProps {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  onSelectRoom: (roomId: string) => void;
}

const RoomSelector: React.FC<RoomSelectorProps> = ({
  rooms,
  activeRoomId,
  onSelectRoom,
}) => {
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
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Chat Rooms
      </h3>
      
      {rooms.map((room) => {
        const isActive = room.id === activeRoomId;
        const latestMessage = room.messages[room.messages.length - 1];
        
        return (
          <motion.button
            key={room.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectRoom(room.id)}
            className={`
              w-full px-4 py-3 rounded-lg transition-all duration-200
              ${
                isActive
                  ? 'bg-purple-100 border-purple-300 dark:bg-purple-900 dark:border-purple-700'
                  : 'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
              }
              border shadow-sm text-left flex items-center space-x-3
            `}
          >
            <div className="relative">
              <div className="flex -space-x-2">
                {room.participants.slice(0, 3).map((participant) => (
                  <img
                    key={participant.id}
                    src={participant.avatar}
                    alt={participant.username}
                    className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800 object-cover"
                  />
                ))}
              </div>
              
              {room.participants.filter(p => p.status === 'online').length > 0 && (
                <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className={`text-sm font-medium truncate ${isActive ? 'text-purple-800 dark:text-purple-200' : 'text-gray-900 dark:text-white'}`}>
                  {room.name}
                </h4>
                
                {latestMessage && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(latestMessage.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>
              
              {latestMessage && (
                <p className={`text-xs truncate mt-1 ${isActive ? 'text-purple-600 dark:text-purple-300' : 'text-gray-500 dark:text-gray-400'}`}>
                  {latestMessage.content}
                </p>
              )}
            </div>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default RoomSelector;