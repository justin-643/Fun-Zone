import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, User, EyeIcon } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useAuthStore, getCrazySuggestions } from '../../store/useAuthStore';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuthStore();

  const suggestions = getCrazySuggestions();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    try {
      await login(username, password);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const generateRandomName = () => {
    const randomIdx = Math.floor(Math.random() * suggestions.length);
    setUsername(suggestions[randomIdx]);
  };

  const containerVariants = {
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
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-800"
    >
      <motion.div variants={itemVariants} className="text-center">
        <motion.div
          className="mx-auto h-20 w-20 bg-purple-600 rounded-full flex items-center justify-center"
          animate={{
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1],
            borderRadius: ["50%", "40%", "50%"]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="h-10 w-10 text-white" />
        </motion.div>

        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
          Join the Craziness!
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Pick a wild username and dive in!
        </p>
      </motion.div>

      <motion.form variants={itemVariants} onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            required
            label="Your Crazy Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={error}
            fullWidth
            icon={<User className="h-5 w-5 text-gray-400" />}
            placeholder="Das, Bobby, Viv etc."
          />
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            label="Your Crazy Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            icon={<EyeIcon className="h-5 w-5 text-gray-400" />}
            placeholder="password..!"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex items-center space-x-4">
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={generateRandomName}
            icon={<Zap className="h-4 w-4" />}
          >
            Random Name
          </Button>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Jumping in...' : 'Enter the Madness'}
          </Button>
        </div>
      </motion.form>

      <motion.div variants={itemVariants} className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              Suggested crazy names
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {suggestions.slice(0, 6).map((suggestion, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={() => setUsername(suggestion)}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {suggestion}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
