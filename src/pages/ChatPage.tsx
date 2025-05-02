import React from 'react';
import { motion } from 'framer-motion';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import RoomSelector from '../components/chat/RoomSelector';
import ChatRoomComponent from '../components/chat/ChatRoom';

const ChatPage: React.FC = () => {
  const { rooms, activeRoomId, setActiveRoom } = useChatStore();
  const { user } = useAuthStore();
  
  const activeRoom = rooms.find((room) => room.id === activeRoomId);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  
  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Please log in to access the chat.</p>
      </div>
    );
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="h-[calc(100vh-64px)] p-4 flex flex-col"
    >
      <div className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Chat with Colleagues
      </div>
      
      <div className="flex-1 flex gap-4 overflow-hidden">
        <div className="w-full sm:w-64 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm overflow-y-auto">
          <RoomSelector
            rooms={rooms}
            activeRoomId={activeRoomId}
            onSelectRoom={setActiveRoom}
          />
        </div>
        
        <div className="hidden sm:block flex-1 overflow-hidden">
          {activeRoom ? (
            <ChatRoomComponent room={activeRoom} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Select a chat room to start messaging.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPage;