import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../ui/Button';
import { User } from '../../types';

interface Card {
  id: number;
  value: number;
  flipped: boolean;
  matched: boolean;
}

interface MemoryMatchProps {
  players: User[];
  currentPlayerId: string;
  onMove: (cardId: number) => void;
  onGameEnd: (winnerId?: string) => void;
  cards: Card[];
  flippedCards: number[];
  matchedPairs: number;
  playerScores: Record<string, number>;
}

const MemoryMatch: React.FC<MemoryMatchProps> = ({
  players,
  currentPlayerId,
  onMove,
  onGameEnd,
  cards,
  flippedCards,
  matchedPairs,
  playerScores,
}) => {
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    // Check if game is over
    if (matchedPairs === 8) {
      // Find player with highest score
      const highestScore = Math.max(...Object.values(playerScores));
      const winnerId = Object.entries(playerScores).find(
        ([_, score]) => score === highestScore
      )?.[0];
      
      setGameOver(true);
      onGameEnd(winnerId);
    }
  }, [matchedPairs, playerScores, onGameEnd]);
  
  const handleCardClick = (cardId: number) => {
    if (gameOver) return;
    
    const card = cards.find(c => c.id === cardId);
    if (!card || card.flipped || card.matched || flippedCards.length >= 2) return;
    
    onMove(cardId);
  };
  
  // Card icons (emojis representing the card values)
  const cardIcons = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍑', '🥝'];
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex flex-wrap justify-center gap-4">
        {players.map((player) => (
          <motion.div
            key={player.id}
            className={`
              flex items-center space-x-2 p-2 rounded-lg
              ${player.id === currentPlayerId ? 'bg-purple-100 dark:bg-purple-900' : ''}
              ${gameOver && playerScores[player.id] === Math.max(...Object.values(playerScores)) ? 'bg-green-100 dark:bg-green-900' : ''}
            `}
            animate={{
              scale: player.id === currentPlayerId && !gameOver ? [1, 1.05, 1] : 1,
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <img
              src={player.avatar}
              alt={player.username}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {player.username}
              </p>
              <p className="text-xs font-bold text-purple-600 dark:text-purple-400">
                Score: {playerScores[player.id] || 0}
              </p>
              {player.id === currentPlayerId && !gameOver && (
                <p className="text-xs text-green-600 dark:text-green-400">
                  Your turn
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      {gameOver && (
        <motion.div
          className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {players.find(p => playerScores[p.id] === Math.max(...Object.values(playerScores)))?.username} wins!
          </p>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={() => window.location.reload()}
            className="mt-2"
          >
            Play Again
          </Button>
        </motion.div>
      )}
      
      <motion.div
        className="grid grid-cols-4 gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="relative h-20 w-20 cursor-pointer"
            onClick={() => handleCardClick(card.id)}
            whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : {}}
            whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
          >
            <AnimatePresence>
              {(card.flipped || card.matched) ? (
                <motion.div
                  className={`
                    absolute inset-0 flex items-center justify-center
                    text-3xl rounded-lg
                    ${card.matched ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'}
                  `}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {cardIcons[card.value]}
                </motion.div>
              ) : (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-purple-500 text-white text-xl font-bold rounded-lg shadow-md"
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  ?
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Pairs found: {matchedPairs} / 8
      </div>
    </div>
  );
};

export default MemoryMatch;