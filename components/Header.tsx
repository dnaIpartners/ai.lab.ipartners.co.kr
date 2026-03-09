import React from 'react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'about') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-[90] px-6 md:px-12 py-8 mix-blend-difference pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto">
        <div 
          className="cursor-pointer group flex items-center"
          onClick={() => onNavigate('home')}
        >
          <div className="font-archivo text-2xl md:text-3xl font-black tracking-tighter text-white group-hover:text-[#0033FF] transition-colors duration-300 flex items-center">
            IP<span className="inline-block" style={{ transform: 'rotate(180deg)' }}>V</span>RTNERS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
