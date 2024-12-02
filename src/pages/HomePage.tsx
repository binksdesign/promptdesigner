import React from 'react';
import { Camera, Layers, Palette, Box, Sparkles, Zap } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-16">
        <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass-effect">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-xs sm:text-sm text-gray-300">100% Gratuit et Sans Inscription</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
          <span className="gradient-text">Prompt Designer</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
          Transformez vos idées en prompts précis pour l'IA générative. Un outil gratuit conçu pour les créatifs.
        </p>

        <div className="flex flex-col items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div className="relative w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden glass-effect p-1">
            <img
              src="https://i.postimg.cc/1tQJSj5W/5.jpg"
              alt="Binks Design"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center px-2">
            <p className="text-xs sm:text-sm text-gray-500">
              By BINKS DESIGN
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
            <p className="text-xs sm:text-sm text-gray-500">
              Aucune limite d'utilisation
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
            <p className="text-xs sm:text-sm text-gray-500">
              Pas de compte requis
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('assistant')}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl font-medium text-base sm:text-lg inline-flex items-center gap-2 sm:gap-3 hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] relative group"
        >
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <Sparkles className="w-5 sm:w-6 h-5 sm:h-6 text-white group-hover:animate-pulse" />
          <span className="text-white relative z-10">Assistant IA</span>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-2">
        <button
          onClick={() => onNavigate('mockup')}
          className="glass-effect rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-blue-600/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-white">Mockups</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Générez des prompts pour des mockups professionnels et réalistes
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('isolated')}
          className="glass-effect rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-blue-600/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Box className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-white">Sujets Isolés</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Créez des prompts pour des objets ou sujets sur fond isolé
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('texture')}
          className="glass-effect rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-blue-600/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-white">Textures</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Générez des prompts pour des textures et motifs uniques
            </p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('generalist')}
          className="glass-effect rounded-2xl p-4 sm:p-6 hover:scale-105 transition-all duration-300 text-left group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="p-2 sm:p-3 rounded-xl bg-blue-600/10 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 sm:w-6 h-5 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-white">Généraliste</h3>
            </div>
            <p className="text-sm sm:text-base text-gray-400">
              Créez des prompts pour tout type de projet créatif
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}