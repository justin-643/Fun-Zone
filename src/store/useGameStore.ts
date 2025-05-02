import { create } from 'zustand';
import { Game, GameSession, User } from '../types';

interface GameState {
  games: Game[];
  activeSessions: GameSession[];
  activeSessionId: string | null;
  startGame: (gameId: string, players: User[]) => void;
  joinGame: (sessionId: string, user: User) => void;
  updateGameState: (sessionId: string, state: any) => void;
  endGame: (sessionId: string, winnerId?: string) => void;
  setActiveSession: (sessionId: string | null) => void;
}

// Mock games data
const mockGames: Game[] = [
  {
    id: 'game1',
    name: 'Tic-Tac-Toe',
    description: 'Classic game of X and O. First to get 3 in a row wins!',
    minPlayers: 2,
    maxPlayers: 2,
    thumbnailUrl: 'https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg',
  },
  {
    id: 'game2',
    name: 'Memory Match',
    description: 'Test your memory! Match pairs of cards to win.',
    minPlayers: 1,
    maxPlayers: 4,
    thumbnailUrl: 'https://images.pexels.com/photos/1111597/pexels-photo-1111597.jpeg',
  },
  {
    id: 'game3',
    name: 'Word Scramble',
    description: 'Unscramble words against the clock. Most words wins!',
    minPlayers: 1,
    maxPlayers: 6,
    thumbnailUrl: 'https://images.pexels.com/photos/8347501/pexels-photo-8347501.jpeg',
  },
];

export const useGameStore = create<GameState>((set, get) => ({
  games: mockGames,
  activeSessions: [],
  activeSessionId: null,
  
  startGame: (gameId: string, players: User[]) => {
    const { activeSessions } = get();
    const game = mockGames.find(g => g.id === gameId);
    
    if (!game) return;
    
    // Initialize the game state based on the game type
    let initialState = {};
    if (gameId === 'game1') { // Tic-Tac-Toe
      initialState = {
        board: Array(9).fill(null),
        currentPlayer: players[0].id,
        moves: 0,
      };
    } else if (gameId === 'game2') { // Memory Match
      const cardPairs = 8; // 16 cards total
      const cards = Array.from({ length: cardPairs }, (_, i) => [i, i]).flat();
      // Shuffle cards
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      
      initialState = {
        cards: cards.map((value, index) => ({ 
          id: index, 
          value, 
          flipped: false, 
          matched: false 
        })),
        currentPlayer: players[0].id,
        flippedCards: [],
        matchedPairs: 0,
        playerScores: players.reduce((acc, player) => {
          acc[player.id] = 0;
          return acc;
        }, {} as Record<string, number>),
      };
    }
    
    const newSession: GameSession = {
      id: `session_${Date.now()}`,
      gameId,
      players,
      state: initialState,
      createdAt: Date.now(),
    };
    
    set({
      activeSessions: [...activeSessions, newSession],
      activeSessionId: newSession.id,
    });
    
    return newSession.id;
  },
  
  joinGame: (sessionId: string, user: User) => {
    const { activeSessions } = get();
    
    const updatedSessions = activeSessions.map(session => {
      if (session.id === sessionId) {
        // Check if user is already in the game
        if (session.players.some(p => p.id === user.id)) {
          return session;
        }
        
        // Check if game is full
        const game = mockGames.find(g => g.id === session.gameId);
        if (game && session.players.length >= game.maxPlayers) {
          return session;
        }
        
        return {
          ...session,
          players: [...session.players, user],
        };
      }
      return session;
    });
    
    set({ activeSessions: updatedSessions });
  },
  
  updateGameState: (sessionId: string, state: any) => {
    const { activeSessions } = get();
    
    const updatedSessions = activeSessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          state,
        };
      }
      return session;
    });
    
    set({ activeSessions: updatedSessions });
  },
  
  endGame: (sessionId: string, winnerId?: string) => {
    const { activeSessions, activeSessionId } = get();
    
    const updatedSessions = activeSessions.map(session => {
      if (session.id === sessionId) {
        return {
          ...session,
          winner: winnerId,
        };
      }
      return session;
    });
    
    set({
      activeSessions: updatedSessions,
      activeSessionId: activeSessionId === sessionId ? null : activeSessionId,
    });
  },
  
  setActiveSession: (sessionId: string | null) => {
    set({ activeSessionId: sessionId });
  },
}));