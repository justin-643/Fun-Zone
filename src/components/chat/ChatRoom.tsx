import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import MessageList from './MessageList';
import { useChatStore } from '../../store/useChatStore';
import { useAuthStore } from '../../store/useAuthStore';
import { ChatRoom as ChatRoomType } from '../../types';

interface ChatRoomProps {
  room: ChatRoomType;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ room }) => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const { sendMessage } = useChatStore();
  const { user } = useAuthStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [room.messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !user) return;
    
    sendMessage(message, user.id);
    setMessage('');
  };
  
  const emojiList = ['😀', '😂', '🤣', '😍', '🥰', '😘', '🤔', '🙄', '😎', '🤩', '🤯', '👍', '👎', '🔥', '❤️', '🎮', '🏆'];
  
  const addEmoji = (emoji: string) => {
    setMessage((prev) => prev + emoji);
    setShowEmojis(false);
  };
  
  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md">
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center">
        <motion.h2
          className="text-xl font-bold text-gray-900 dark:text-white flex-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {room.name}
        </motion.h2>
        <div className="flex items-center space-x-2">
          {room.participants.slice(0, 3).map((participant) => (
            <motion.div
              key={participant.id}
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src={participant.avatar}
                alt={participant.username}
                className="h-8 w-8 rounded-full object-cover border-2 border-white dark:border-gray-800"
              />
              <span
                className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ${
                  participant.status === 'online'
                    ? 'bg-green-500'
                    : participant.status === 'away'
                    ? 'bg-yellow-500'
                    : 'bg-gray-500'
                }`}
              ></span>
            </motion.div>
          ))}
          {room.participants.length > 3 && (
            <motion.div
              className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              +{room.participants.length - 3}
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList messages={room.messages} participants={room.participants} />
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              fullWidth
            />
            
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <button
                type="button"
                onClick={() => setShowEmojis(!showEmojis)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <Smile className="h-5 w-5" />
              </button>
            </div>
            
            <AnimatePresence>
              {showEmojis && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full left-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 grid grid-cols-6 gap-1 w-64"
                >
                  {emojiList.map((emoji, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      onClick={() => addEmoji(emoji)}
                      className="flex items-center justify-center h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-xl"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <Button
            type="submit"
            variant="primary"
            icon={<Send className="h-4 w-4" />}
            disabled={!message.trim()}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};



export default ChatRoom;