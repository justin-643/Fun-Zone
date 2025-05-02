import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, MessageSquare,  Award } from 'lucide-react';
import { User } from '../../types';

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
    >
      <div className="relative h-32 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <motion.div
            className="h-24 w-24 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden"
            animate={{ 
              boxShadow: ['0px 0px 0px rgba(124, 58, 237, 0)', '0px 0px 20px rgba(124, 58, 237, 0.7)', '0px 0px 0px rgba(124, 58, 237, 0)'] 
            }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <img
              src={user.avatar}
              alt={user.username}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      <div className="pt-16 pb-6 px-6 text-center">
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          {user.username}
        </motion.h2>
        
        <motion.div
          variants={itemVariants}
          className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        >
          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          <span className="text-xs font-medium">Online</span>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="mt-6 flex justify-center gap-4"
        >
          <div className="text-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 mx-auto">
              <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{user.score}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 mx-auto">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">25</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Messages</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 mx-auto">
              <Award className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">4</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Wins</p>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-6"
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Achievements</h3>
          <div className="flex justify-center space-x-2">
            {[
              '🏆', '🎮', '🌟', '🚀', '🔥'
            ].map((emoji, index) => (
              <motion.div
                key={index}
                className="h-8 w-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-lg"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;