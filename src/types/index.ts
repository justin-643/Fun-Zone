export interface User {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  score: number;
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: number;
  reactions: Reaction[];
}

export interface Reaction {
  emoji: string;
  count: number;
  userIds: string[];
}

export interface ChatRoom {
  id: string;
  name: string;
  messages: Message[];
  participants: User[];
}

export interface Game {
  id: string;
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers: number;
  thumbnailUrl: string;
}

export interface GameSession {
  id: string;
  gameId: string;
  players: User[];
  state: any;
  winner?: string;
  createdAt: number;
}

export interface Notification {
  id: string;
  type: 'message' | 'game-invite' | 'friend-request';
  content: string;
  read: boolean;
  timestamp: number;
  actionPath?: string;
}