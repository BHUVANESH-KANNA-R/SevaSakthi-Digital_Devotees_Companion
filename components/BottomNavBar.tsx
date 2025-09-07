
import React from 'react';
import { Screen } from '../types';
import Icon from './Icon';

interface BottomNavBarProps {
  activeScreen: Screen;
  navigate: (screen: Screen) => void;
}

const NavItem: React.FC<{ icon: string; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => {
  const activeClass = isActive ? 'text-orange-500' : 'text-gray-500';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${activeClass} hover:text-orange-600`}>
      <Icon name={icon} className="text-2xl mb-1" />
      <span className="text-xs">{label}</span>
    </button>
  );
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen, navigate }) => {
  const navItems = [
    { screen: Screen.Dashboard, icon: 'fa-home', label: 'Home' },
    { screen: Screen.Map, icon: 'fa-map-location-dot', label: 'Map' },
    { screen: Screen.Family, icon: 'fa-users', label: 'Family' },
    { screen: Screen.Profile, icon: 'fa-user', label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] flex justify-around p-2 max-w-md mx-auto border-t border-gray-200">
      {navItems.map(item => (
        <NavItem
          key={item.screen}
          icon={item.icon}
          label={item.label}
          isActive={activeScreen === item.screen}
          onClick={() => navigate(item.screen)}
        />
      ))}
    </nav>
  );
};

export default BottomNavBar;