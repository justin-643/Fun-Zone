import { create } from 'zustand';
import { ChatRoom, Message, User } from '../types';

interface ChatState {
  rooms: ChatRoom[];
  activeRoomId: string | null;
  setActiveRoom: (roomId: string) => void;
  sendMessage: (content: string, userId: string) => void;
  addReaction: (messageId: string, emoji: string, userId: string) => void;
}

// Mock data
const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'GiggleGalaxy',
    avatar: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg',
    status: 'online',
    score: 120,
  },
  {
    id: 'user2',
    username: 'BubbleWizard',
    avatar: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    status: 'away',
    score: 85,
  },
  {
    id: 'user3',
    username: 'FizzPopDragon',
    avatar: 'https://images.pexels.com/photos/1472335/pexels-photo-1472335.jpeg',
    status: 'online',
    score: 152,
  },
];

const mockRooms: ChatRoom[] = [
  {
    id: 'room1',
    name: '🌟 General Chat',
    participants: mockUsers,
    messages: [
      {
        id: 'msg1',
        userId: 'user2',
        content: 'Hey everyone! Who wants to play a game?',
        timestamp: Date.now() - 3600000,
        reactions: [
          { emoji: '👍', count: 2, userIds: ['user1', 'user3'] },
          { emoji: '🎮', count: 1, userIds: ['user1'] },
        ],
      },
      {
        id: 'msg2',
        userId: 'user3',
        content: "I'm up for Tic-Tac-Toe! Anyone else?",
        timestamp: Date.now() - 1800000,
        reactions: [],
      },
      {
        id: 'msg3',
        userId: 'user1',
        content: "Count me in! Let's start in 5 minutes.",
        timestamp: Date.now() - 900000,
        reactions: [
          { emoji: '🎯', count: 1, userIds: ['user2'] },
        ],
      },
    ],
  },
  {
    id: 'room2',
    name: '🎮 Gaming Squad',
    participants: [mockUsers[0], mockUsers[2]],
    messages: [
      {
        id: 'msg4',
        userId: 'user1',
        content: 'I just beat the high score in Memory Match!',
        timestamp: Date.now() - 7200000,
        reactions: [
          { emoji: '🏆', count: 1, userIds: ['user3'] },
          { emoji: '🔥', count: 1, userIds: ['user3'] },
        ],
      },
      {
        id: 'msg5',
        userId: 'user3',
        content: "Wow, impressive! I'm still struggling with level 3.",
        timestamp: Date.now() - 5400000,
        reactions: [],
      },
    ],
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  rooms: mockRooms,
  activeRoomId: 'room1',
  
  setActiveRoom: (roomId: string) => {
    set({ activeRoomId: roomId });
  },
  
  sendMessage: (content: string, userId: string) => {
    const { rooms, activeRoomId } = get();
    
    if (!activeRoomId) return;
    
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      userId,
      content,
      timestamp: Date.now(),
      reactions: [],
    };
    
    const updatedRooms = rooms.map(room => {
      if (room.id === activeRoomId) {
        return {
          ...room,
          messages: [...room.messages, newMessage],
        };
      }
      return room;
    });
    
    set({ rooms: updatedRooms });
  },
  
  addReaction: (messageId: string, emoji: string, userId: string) => {
    const { rooms, activeRoomId } = get();
    
    if (!activeRoomId) return;
    
    const updatedRooms = rooms.map(room => {
      if (room.id === activeRoomId) {
        const updatedMessages = room.messages.map(message => {
          if (message.id === messageId) {
            const existingReactionIndex = message.reactions.findIndex(
              r => r.emoji === emoji
            );
            
            if (existingReactionIndex > -1) {
              const reaction = message.reactions[existingReactionIndex];
              
              // User already reacted with this emoji
              if (reaction.userIds.includes(userId)) {
                const updatedReaction = {
                  ...reaction,
                  count: reaction.count - 1,
                  userIds: reaction.userIds.filter(id => id !== userId),
                };
                
                // Remove reaction if count is 0
                const updatedReactions = updatedReaction.count > 0
                  ? [
                      ...message.reactions.slice(0, existingReactionIndex),
                      updatedReaction,
                      ...message.reactions.slice(existingReactionIndex + 1),
                    ]
                  : [
                      ...message.reactions.slice(0, existingReactionIndex),
                      ...message.reactions.slice(existingReactionIndex + 1),
                    ];
                
                return { ...message, reactions: updatedReactions };
              } else {
                // Add user to existing reaction
                const updatedReaction = {
                  ...reaction,
                  count: reaction.count + 1,
                  userIds: [...reaction.userIds, userId],
                };
                
                return {
                  ...message,
                  reactions: [
                    ...message.reactions.slice(0, existingReactionIndex),
                    updatedReaction,
                    ...message.reactions.slice(existingReactionIndex + 1),
                  ],
                };
              }
            } else {
              // Add new reaction
              return {
                ...message,
                reactions: [
                  ...message.reactions,
                  { emoji, count: 1, userIds: [userId] },
                ],
              };
            }
          }
          return message;
        });
        
        return { ...room, messages: updatedMessages };
      }
      return room;
    });
    
    set({ rooms: updatedRooms });
  },
}));