
import React from 'react';
import { User, Notification } from '../types';
import Icon from './Icon';

interface HeaderProps {
  user: User;
  notifications: Notification[];
  onNotificationClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, notifications, onNotificationClick }) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
      <div>
        <h1 className="text-xl font-bold">SevaSathi</h1>
        <p className="text-sm">Welcome, {user.name.split(' ')[0]}</p>
      </div>
      <button onClick={onNotificationClick} className="relative" aria-label={`Notifications, ${unreadCount} unread`}>
        <Icon name="fa-bell" className="text-2xl" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
