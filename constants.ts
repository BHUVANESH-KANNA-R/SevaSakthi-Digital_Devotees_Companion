import { User, FamilyMember, Badge, LeaderboardEntry, Notification, POI } from './types';

export const MOCK_USER_TEMPLATE: User = {
  name: 'Rohan Sharma',
  email: 'rohan.sharma@example.com',
  ecoPoints: 1250,
  avatarUrl: 'https://picsum.photos/seed/user1/200/200',
  role: 'devotee',
  phone: '+91 98765 43210',
  emergencyContact: {
    name: 'Amit Sharma',
    phone: '+91 98765 12345'
  },
  groupName: 'Sharma Family Group',
  distanceWalked: 15.3,
  badges: [
    { id: 1, name: 'Eco-Starter', description: 'Used a reusable water bottle.', icon: 'fa-leaf', color: 'text-green-500' },
    { id: 2, name: 'Waste Warrior', description: 'Disposed of waste correctly 5 times.', icon: 'fa-recycle', color: 'text-blue-500' },
    { id: 3, name: 'Green Pilgrim', description: 'Walked 10km instead of using transport.', icon: 'fa-person-walking', color: 'text-yellow-500' },
  ]
};

export const MOCK_FAMILY: FamilyMember[] = [];

export const MOCK_BADGES: Badge[] = [
    ...MOCK_USER_TEMPLATE.badges,
    { id: 4, name: 'Community Helper', description: 'Volunteered for 1 hour.', icon: 'fa-hands-helping', color: 'text-purple-500' },
    { id: 5, name: 'Cleanliness Champion', description: 'Participated in a clean-up drive.', icon: 'fa-broom', color: 'text-teal-500' },
];

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Anjali Verma', points: 2500, avatarUrl: 'https://picsum.photos/seed/leader1/200/200' },
  { rank: 2, name: 'Vikram Singh', points: 2100, avatarUrl: 'https://picsum.photos/seed/leader2/200/200' },
  { rank: 3, name: 'Rohan Sharma', points: 1250, avatarUrl: MOCK_USER_TEMPLATE.avatarUrl },
  { rank: 4, name: 'Meera Patel', points: 980, avatarUrl: 'https://picsum.photos/seed/leader3/200/200' },
  { rank: 5, name: 'Sanjay Kumar', points: 750, avatarUrl: 'https://picsum.photos/seed/leader4/200/200' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, title: 'Safety Alert', message: 'High crowd density reported near Triveni Sangam. Please proceed with caution.', timestamp: '5m ago', read: false},
    { id: 4, title: 'Item Lost', message: 'Priya Sharma\'s Phone has been marked as lost. Last seen near Sector 5 Market.', timestamp: '15m ago', read: false},
    { id: 2, title: 'New Badge Unlocked!', message: 'You earned the "Eco-Starter" badge. Keep up the great work!', timestamp: '1h ago', read: true},
    { id: 3, title: 'Family Update', message: 'Priya Sharma has marked herself as "Needs Help". Check her location now.', timestamp: '2h ago', read: false},
];

export const MAP_POIS: POI[] = [
    { id: 1, name: 'Mahakaleshwar Temple', type: 'Temple', top: '55%', left: '48%' },
    { id: 2, name: 'Ram Ghat', type: 'Temple', top: '75%', left: '65%' },
    { id: 3, name: 'Medical Camp (Near Temple)', type: 'Help Desk', top: '40%', left: '30%' },
    { id: 4, name: 'Prasad Counter', type: 'Food', top: '60%', left: '55%' },
    { id: 5, name: 'Public Toilets', type: 'Facility', top: '80%', left: '35%' },
];