export enum Screen {
  Login,
  Dashboard,
  Map,
  Family,
  QR,
  Eco,
  Darshan,
  Profile,
  SafetyAlerts,
}

export type User = {
  name: string;
  email: string;
  ecoPoints: number;
  badges: Badge[];
  avatarUrl: string;
  role: 'devotee' | 'organiser';
  phone: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
  groupName: string;
  distanceWalked: number; // in km
  password?: string;
};

export type Belonging = {
  id: number;
  name: string;
  icon: string; // Font Awesome icon class name
  status: 'Safe' | 'Lost';
};

export type FamilyMember = {
  id: number;
  name: string;
  relation: string;
  location: string;
  status: 'Safe' | 'Lost' | 'Needs Help';
  avatarUrl: string;
  belongings: Belonging[];
  top?: string;
  left?: string;
  linked: boolean;
};

export type Badge = {
  id: number;
  name: string;
  description: string;
  icon: string; // Font Awesome icon class name
  color: string;
};

export type LeaderboardEntry = {
  rank: number;
  name: string;
  points: number;
  avatarUrl: string;
};

export type Notification = {
    id: number;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
};

export type POI = {
  id: number;
  name: string;
  type: 'Temple' | 'Facility' | 'Food' | 'Help Desk';
  top: string;
  left: string;
};