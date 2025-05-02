import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User } from '../../types';
import Button from '../ui/Button';

interface TicTacToeProps {
  players: User[];
  currentPlayerId: string;
  onMove: (index: number) => void;
  onGameEnd: (winnerId?: string) => void;
  board: (string | null)[];
}

const TicTacToe: React.FC<TicTacToeProps> = ({
  players,
  currentPlayerId,
  onMove,
  onGameEnd,
  board,
}) => {
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);
  
  const symbols = {
    [players[0].id]: 'X',
    [players[1].id]: 'O',
  };
  
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  useEffect(() => {
    checkGameStatus();
  }, [board]);
  
  const checkGameStatus = () => {
    // Check for winner
    for (const combination of winCombinations) {
      const [a, b, c] = combination;
      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        const winnerId = Object.entries(symbols).find(
          ([id, symbol]) => symbol === board[a]
        )?.[0];
        
        if (winnerId) {
          setWinner(winnerId);
          onGameEnd(winnerId);
          return;
        }
      }
    }
    
    // Check for draw
    if (board.every((cell) => cell !== null)) {
      setIsDraw(true);
      onGameEnd();
      return;
    }
  };
  
  const handleCellClick = (index: number) => {
    if (board[index] !== null || winner || isDraw) return;
    onMove(index);
  };
  
  const renderCell = (index: number) => {
    const value = board[index];
    
    return (
      <motion.button
        className={`
          h-20 w-20 flex items-center justify-center
          border-2 border-gray-300 dark:border-gray-600
          text-3xl font-bold
          ${value === 'X' ? 'text-blue-500' : value === 'O' ? 'text-red-500' : ''}
          ${!value && !winner && !isDraw ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
        `}
        onClick={() => handleCellClick(index)}
        whileHover={{ scale: value ? 1 : 1.05 }}
        whileTap={{ scale: value ? 1 : 0.95 }}
        animate={{ 
          backgroundColor: value ? '#f3f4f61a' : 'transparent',
          scale: [1, value ? 1.2 : 1, 1],
          transition: { duration: 0.3 }
        }}
        disabled={!!value || !!winner || isDraw}
      >
        {value}
      </motion.button>
    );
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex items-center space-x-4">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`
              flex items-center space-x-2 p-2 rounded-lg
              ${player.id === currentPlayerId ? 'bg-purple-100 dark:bg-purple-900' : ''}
            `}
          >
            <img
              src={player.avatar}
              alt={player.username}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                {player.username} 
                <span className={`ml-2 font-bold ${index === 0 ? 'text-blue-500' : 'text-red-500'}`}>
                  ({symbols[player.id]})
                </span>
              </p>
              {player.id === currentPlayerId && !winner && !isDraw && (
                <p className="text-xs text-purple-600 dark:text-purple-400">
                  Your turn
                </p>
              )}
              {winner === player.id && (
                <p className="text-xs text-green-600 dark:text-green-400">
                  Winner!
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {(winner || isDraw) && (
        <motion.div
          className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {winner ? (
            <p className="text-lg font-bold text-green-600 dark:text-green-400">
              {players.find(p => p.id === winner)?.username} wins!
            </p>
          ) : (
            <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
              It's a draw!
            </p>
          )}
          
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
      
      <div className="grid grid-cols-3 gap-1 bg-gray-300 dark:bg-gray-600 p-1 rounded-lg shadow-lg">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => renderCell(index))}
      </div>
    </div>
  );
};

export default TicTacToe;