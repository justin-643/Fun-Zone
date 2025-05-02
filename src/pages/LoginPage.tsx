import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Zap, MessageSquare, Users } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6 text-blue-500" />,
      title: 'Wild Chat',
      description: 'Express yourself with crazy animations and emoji reactions',
    },
    {
      icon: <Gamepad2 className="h-6 w-6 text-green-500" />,
      title: 'Fun Games',
      description: 'Challenge your colleagues to quick games during breaks',
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: 'Team Fun',
      description: 'Build team spirit with shared activities and challenges',
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: 'Instant Joy',
      description: 'Add a spark of fun to your everyday work communications',
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 0.5,
      transition: { duration: 1 },
    },
  };
  
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={backgroundVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-10 left-10 h-64 w-64 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 h-64 w-64 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/3 h-64 w-64 bg-yellow-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              className="h-16 w-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
            >
              <Gamepad2 className="h-8 w-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">CrazyChat</span>
          </h1>
          <p className="mt-3 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Where serious work meets serious fun. Connect with colleagues, play games, and enjoy a whole new level of team communication!
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 h-12 w-12 bg-white dark:bg-gray-800 rounded-lg shadow-md flex items-center justify-center">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center"
          >
            <LoginForm />
          </motion.div>
        </div>
        
        <motion.div
          className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>
            Elevate your team communications with a touch of craziness and fun. Let the games begin!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;