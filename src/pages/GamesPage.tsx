import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { useAuthStore } from '../store/useAuthStore';
import GameCard from '../components/games/GameCard';
import TicTacToe from '../components/games/TicTacToe';
import MemoryMatch from '../components/games/MemoryMatch';

const GamesPage: React.FC = () => {
  const { games, activeSessions, activeSessionId, startGame, updateGameState } = useGameStore();
  const { user } = useAuthStore();
  const [showGames, setShowGames] = useState(!activeSessionId);
  
  const activeSession = activeSessions.find(session => session.id === activeSessionId);
  const activeGame = activeSession ? games.find(game => game.id === activeSession.gameId) : null;
  
  const handlePlayGame = (gameId: string) => {
    if (!user) return;
    
    // For now, we'll start a single-player game
    const sessionId = startGame(gameId, [user]);
    setShowGames(false);
  };
  
  const handleTicTacToeMove = (index: number) => {
    if (!activeSession || !user) return;
    
    const board = [...activeSession.state.board];
    const currentPlayer = activeSession.state.currentPlayer;
    const moves = activeSession.state.moves;
    
    if (board[index] || currentPlayer !== user.id) return;
    
    // Update the board
    board[index] = currentPlayer === activeSession.players[0].id ? 'X' : 'O';
    
    // Switch players (in a real multiplayer game)
    const nextPlayer = currentPlayer === activeSession.players[0].id
      ? activeSession.players[1]?.id || activeSession.players[0].id
      : activeSession.players[0].id;
    
    updateGameState(activeSession.id, {
      board,
      currentPlayer: nextPlayer,
      moves: moves + 1,
    });
  };
  
  const handleMemoryMatchMove = (cardId: number) => {
    if (!activeSession || !user) return;
    
    const cards = [...activeSession.state.cards];
    const currentPlayer = activeSession.state.currentPlayer;
    let flippedCards = [...activeSession.state.flippedCards];
    let matchedPairs = activeSession.state.matchedPairs;
    const playerScores = { ...activeSession.state.playerScores };
    
    if (currentPlayer !== user.id) return;
    
    // Find the card that was clicked
    const cardIndex = cards.findIndex(c => c.id === cardId);
    if (cardIndex === -1) return;
    
    const card = cards[cardIndex];
    
    // If the card is already flipped or matched, do nothing
    if (card.flipped || card.matched) return;
    
    // Flip the card
    cards[cardIndex] = { ...card, flipped: true };
    flippedCards.push(cardId);
    
    // If we've flipped 2 cards, check for a match
    if (flippedCards.length === 2) {
      const card1 = cards.find(c => c.id === flippedCards[0]);
      const card2 = cards.find(c => c.id === flippedCards[1]);
      
      if (card1 && card2 && card1.value === card2.value) {
        // It's a match!
        cards.forEach((c, i) => {
          if (flippedCards.includes(c.id)) {
            cards[i] = { ...c, matched: true };
          }
        });
        
        matchedPairs += 1;
        playerScores[currentPlayer] = (playerScores[currentPlayer] || 0) + 1;
        
        // Reset flipped cards
        flippedCards = [];
      } else {
        // Not a match, flip the cards back after a delay
        setTimeout(() => {
          if (!activeSession) return;
          
          const updatedCards = [...activeSession.state.cards];
          updatedCards.forEach((c, i) => {
            if (flippedCards.includes(c.id)) {
              updatedCards[i] = { ...c, flipped: false };
            }
          });
          
          // Switch players (in a real multiplayer game)
          const nextPlayer = currentPlayer === activeSession.players[0].id
            ? activeSession.players[1]?.id || activeSession.players[0].id
            : activeSession.players[0].id;
          
          updateGameState(activeSession.id, {
            cards: updatedCards,
            flippedCards: [],
            currentPlayer: nextPlayer,
            matchedPairs,
            playerScores,
          });
        }, 1000);
      }
    }
    
    updateGameState(activeSession.id, {
      cards,
      flippedCards,
      currentPlayer,
      matchedPairs,
      playerScores,
    });
  };
  
  const handleGameEnd = (winnerId?: string) => {
    // In a real app, we would update the user's stats and maybe show a celebration
    console.log('Game ended. Winner:', winnerId);
  };
  
  const renderActiveGame = () => {
    if (!activeSession || !activeGame) return null;
    
    switch (activeGame.id) {
      case 'game1': // Tic-Tac-Toe
        return (
          <TicTacToe
            players={activeSession.players}
            currentPlayerId={activeSession.state.currentPlayer}
            onMove={handleTicTacToeMove}
            onGameEnd={handleGameEnd}
            board={activeSession.state.board}
          />
        );
      case 'game2': // Memory Match
        return (
          <MemoryMatch
            players={activeSession.players}
            currentPlayerId={activeSession.state.currentPlayer}
            onMove={handleMemoryMatchMove}
            onGameEnd={handleGameEnd}
            cards={activeSession.state.cards}
            flippedCards={activeSession.state.flippedCards}
            matchedPairs={activeSession.state.matchedPairs}
            playerScores={activeSession.state.playerScores}
          />
        );
      default:
        return (
          <div className="text-center text-gray-500 dark:text-gray-400">
            Game not implemented yet
          </div>
        );
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  
  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Please log in to access games.</p>
      </div>
    );
  }
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 max-w-7xl mx-auto"
    >
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Fun & Games
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Take a break and play some games with your colleagues!
          </p>
        </div>
        
        {activeSessionId && (
          <button
            onClick={() => setShowGames(!showGames)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none"
          >
            {showGames ? 'Back to Game' : 'Browse Games'}
          </button>
        )}
      </div>
      
      {activeSessionId && activeGame && !showGames ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {activeGame.name}
              </h2>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Users className="h-4 w-4 mr-1" />
              <span>{activeSession.players.length} player{activeSession.players.length !== 1 && 's'}</span>
            </div>
          </div>
          
          <div className="flex justify-center py-4">
            {renderActiveGame()}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onPlay={handlePlayGame} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default GamesPage;