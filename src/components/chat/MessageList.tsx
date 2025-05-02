import React from 'react';
import { motion } from 'framer-motion';
import { User, Message } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useChatStore } from '../../store/useChatStore';

interface MessageListProps {
  messages: Message[];
  participants: User[];
}

const MessageList: React.FC<MessageListProps> = ({ messages, participants }) => {
  const { user } = useAuthStore();
  const { addReaction } = useChatStore();
  
  const getUserById = (userId: string): User | undefined => {
    return participants.find((participant) => participant.id === userId);
  };
  
  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
  
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!user) return;
    addReaction(messageId, emoji, user.id);
  };
  
  const commonEmojis = ['👍', '❤️', '😂', '🔥', '👏', '🎮'];
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {messages.map((message) => {
        const sender = getUserById(message.userId);
        const isCurrentUser = message.userId === user?.id;
        
        return (
          <motion.div
            key={message.id}
            variants={messageVariants}
            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-xs sm:max-w-md ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
              {!isCurrentUser && sender && (
                <img
                  src={sender.avatar}
                  alt={sender.username}
                  className="h-8 w-8 rounded-full mr-2 flex-shrink-0 object-cover"
                />
              )}
              
              <div className={`space-y-1 ${isCurrentUser ? 'mr-2' : 'ml-0'}`}>
                <div
                  className={`rounded-lg px-4 py-2 shadow-sm ${
                    isCurrentUser
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  {!isCurrentUser && sender && (
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      {sender.username}
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  <div className={`text-xs mt-1 ${isCurrentUser ? 'text-purple-200' : 'text-gray-500'}`}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
                
                {message.reactions.length > 0 && (
                  <div className={`flex gap-1 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    {message.reactions.map((reaction, index) => (
                      <motion.button
                        key={`${reaction.emoji}-${index}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddReaction(message.id, reaction.emoji)}
                        className={`
                          inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs
                          ${
                            user && reaction.userIds.includes(user.id)
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                          }
                        `}
                      >
                        <span>{reaction.emoji}</span>
                        <span>{reaction.count}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
                
                <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} gap-1 mt-1`}>
                  {commonEmojis.map((emoji) => (
                    <motion.button
                      key={emoji}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleAddReaction(message.id, emoji)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 text-xs"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              {isCurrentUser && user && (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="h-8 w-8 rounded-full ml-2 flex-shrink-0 object-cover"
                />
              )}
            </div>
          </motion.div>
        );
      })}
      
      {messages.length === 0 && (
        <div className="flex justify-center items-center h-32 text-gray-500 dark:text-gray-400">
          No messages yet. Start the conversation!
        </div>
      )}
    </motion.div>
  );
};

export default MessageList;