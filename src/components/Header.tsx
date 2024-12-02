import React, { useState } from 'react';
import { Book, Plus, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  onShowKeywords: () => void;
}

export function Header({ currentPage, setCurrentPage, onShowKeywords }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'generalist', label: 'Généraliste' },
    { id: 'mockup', label: 'Mockup' },
    { id: 'isolated', label: 'Sujet isolé' },
    { id: 'texture', label: 'Texture' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999]">
      <div className="mx-auto px-2 sm:px-4">
        <div className="bg-[#0A0A0B]/80 backdrop-blur-xl border-[#1A1A1C] border rounded-full my-2 sm:my-4 px-2 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo - Hidden on mobile */}
          <button
            onClick={() => handleNavigation('home')}
            className="hidden md:flex items-center gap-2 px-2 py-1 rounded-full hover:bg-[#1A1A1C]/50 transition-colors"
          >
            <div className="text-blue-400 logo-glow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-medium">Prompt Designer</span>
          </button>

          {/* Mobile Title */}
          <button
            onClick={() => handleNavigation('home')}
            className="md:hidden flex-1 text-center hover:opacity-80 transition-opacity"
          >
            <span className="text-sm text-white font-medium">Prompt Designer</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 px-2 py-1 bg-[#1A1A1C]/50 rounded-full">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-white bg-[#1A1A1C]/80 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-blue-500/50 before:to-blue-600/50 before:opacity-100 before:transition-opacity before:duration-300 glow-blue-sm relative'
                    : 'text-gray-400 hover:text-gray-200 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-gradient-to-r before:from-blue-500/20 before:to-blue-600/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 relative'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}

            {/* IA Button */}
            <button
              onClick={() => handleNavigation('assistant')}
              className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 relative overflow-hidden group bg-gradient-to-r from-blue-600/20 to-blue-700/20 hover:from-blue-600/30 hover:to-blue-700/30 ${
                currentPage === 'assistant' ? 'glow-blue animate-pulse' : 'hover:glow-blue-sm'
              }`}
            >
              <span className="relative z-10 flex items-center gap-1 text-white">
                <Sparkles className={`w-4 h-4 ${currentPage === 'assistant' ? 'animate-pulse text-blue-200' : 'text-blue-400'}`} />
                <span className={currentPage === 'assistant' ? 'text-blue-200' : 'text-blue-400'}>IA</span>
              </span>
              <span className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 transition-opacity duration-300 ${
                currentPage === 'assistant' ? 'opacity-20' : 'group-hover:opacity-10'
              }`}></span>
            </button>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <button
              onClick={onShowKeywords}
              className="relative p-2 rounded-full transition-all duration-300 group"
              aria-label="Show keywords"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <Book className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-200 transition-colors duration-300" />
            </button>
            <a
              href="https://discord.gg/QDg9wxEVvH"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2 rounded-full transition-all duration-300 group"
              aria-label="Join Discord"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-200 transition-colors duration-300"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="m433.43 93.222c-32.633-14.973-67.627-26.005-104.216-32.324-.666-.122-1.332.183-1.675.792-4.501 8.005-9.486 18.447-12.977 26.655-39.353-5.892-78.505-5.892-117.051 0-3.492-8.39-8.658-18.65-13.179-26.655-.343-.589-1.009-.894-1.675-.792-36.568 6.298-71.562 17.33-104.216 32.324-.283.122-.525.325-.686.589-66.376 99.165-84.56 195.893-75.64 291.421.04.467.303.914.666 1.199 43.793 32.161 86.215 51.685 127.848 64.627.666.203 1.372-.04 1.796-.589 9.848-13.449 18.627-27.63 26.154-42.543.444-.873.02-1.91-.888-2.255-13.925-5.282-27.184-11.723-39.939-19.036-1.009-.589-1.09-2.032-.161-2.723 2.684-2.011 5.369-4.104 7.932-6.217.464-.386 1.11-.467 1.655-.224 83.792 38.257 174.507 38.257 257.31 0 .545-.264 1.191-.182 1.675.203 2.564 2.113 5.248 4.226 7.952 6.237.928.691.867 2.134-.141 2.723-12.755 7.456-26.014 13.754-39.959 19.016-.908.345-1.312 1.402-.867 2.275 7.689 14.892 16.468 29.073 26.134 42.523.404.569 1.13.813 1.796.609 41.835-12.941 84.257-32.466 128.05-64.627.384-.284.626-.711.666-1.178 10.676-110.441-17.881-206.376-75.7-291.421-.14-.284-.382-.487-.664-.609zm-262.336 233.843c-25.227 0-46.014-23.16-46.014-51.604 0-28.443 20.383-51.604 46.014-51.604 25.831 0 46.417 23.364 46.013 51.604 0 28.444-20.384 51.604-46.013 51.604zm170.127 0c-25.226 0-46.013-23.16-46.013-51.604 0-28.443 20.383-51.604 46.013-51.604 25.832 0 46.417 23.364 46.014 51.604 0 28.444-20.181 51.604-46.014 51.604z" />
              </svg>
            </a>
            <a
              href="https://graphistedubinks.gumroad.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2 rounded-full transition-all duration-300 group"
              aria-label="More resources"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-200 transition-colors duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[9998] md:hidden">
          <div className="h-full flex flex-col items-center justify-center space-y-4 px-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`w-full px-6 py-3 rounded-xl text-base transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-white bg-blue-600/20 glow-blue'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigation('assistant')}
              className={`w-full px-6 py-3 rounded-xl text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                currentPage === 'assistant'
                  ? 'text-white bg-blue-600/20 glow-blue'
                  : 'text-blue-400 hover:text-blue-300'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              Assistant IA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}