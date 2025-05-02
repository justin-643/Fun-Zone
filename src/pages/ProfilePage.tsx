import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import ProfileCard from '../components/profile/ProfileCard';

const ProfilePage: React.FC = () => {
  const { user } = useAuthStore();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  
  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Please log in to view your profile.</p>
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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Your Profile
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ProfileCard user={user} />
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stats & Achievements</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Games</h3>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">12</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Win Rate</h3>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">33%</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Achievements</h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">5</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Active Streak</h3>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">3 days</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            
            <div className="space-y-4">
              {[
                { action: 'Won a game of Memory Match', time: '2 hours ago' },
                { action: 'Sent a message in Gaming Squad', time: '4 hours ago' },
                { action: 'Started a new game', time: 'Yesterday' },
                { action: 'Earned the "Fast Typer" badge', time: '2 days ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <p className="text-gray-800 dark:text-gray-200">{activity.action}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Your Badges</h2>
            
            <div className="flex flex-wrap gap-4">
              {[
                { emoji: '🏆', name: 'Champion', desc: 'Won 3 games in a row' },
                { emoji: '🚀', name: 'Fast Responder', desc: 'Reply in under 5 seconds' },
                { emoji: '🔥', name: 'On Fire', desc: 'Active for 3 days straight' },
                { emoji: '🎮', name: 'Game Master', desc: 'Played all available games' },
                { emoji: '🌟', name: 'Rising Star', desc: 'Earned 100 points' },
              ].map((badge, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="h-10 w-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-xl shadow-sm">
                    {badge.emoji}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{badge.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{badge.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;