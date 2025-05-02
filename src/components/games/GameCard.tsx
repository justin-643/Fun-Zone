import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy } from 'lucide-react';
import Button from '../ui/Button';
import { Game } from '../../types';

interface GameCardProps {
  game: Game;
  onPlay: (gameId: string) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={game.thumbnailUrl}
          alt={game.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <h3 className="text-white text-xl font-bold p-4">{game.name}</h3>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{game.description}</p>
        
        <div className="mt-auto space-y-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <Users className="h-4 w-4 mr-1" />
            <span>{game.minPlayers === game.maxPlayers ? `${game.minPlayers} players` : `${game.minPlayers}-${game.maxPlayers} players`}</span>
          </div>
          
          <Button
            variant="primary"
            fullWidth
            onClick={() => onPlay(game.id)}
            icon={<Trophy className="h-4 w-4" />}
          >
            Play Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;