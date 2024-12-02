import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Plus } from 'lucide-react';

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  description: string;
}

export function Select({ label, options, value, onChange, description }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [customValue, setCustomValue] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(search.toLowerCase())
  );

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customValue.trim()) {
      onChange(customValue.trim());
      setCustomValue('');
      setIsOpen(false);
      setSearch('');
    }
  };

  const modal = isOpen && createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)} 
      />
      <div className="fixed inset-0 z-[10000] overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            ref={modalRef}
            className="w-full max-w-md transform glass-effect rounded-2xl modal-glow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-medium text-white gradient-text">{label}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-200 hover-glow-blue transition-colors p-2 rounded-full"
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Custom keyword input */}
              <form onSubmit={handleCustomSubmit} className="mb-3">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={customValue}
                    onChange={(e) => setCustomValue(e.target.value)}
                    placeholder="Ajouter un mot-clé personnalisé..."
                    className="w-full px-3 py-2 pr-12 text-xs sm:text-sm bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl text-white placeholder-gray-400 focus:outline-none input-glow"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-gray-200 rounded-lg transition-colors hover-glow-blue"
                    disabled={!customValue.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Search input */}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl text-white placeholder-gray-400 focus:outline-none input-glow mb-3"
              />

              {/* Options list */}
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {filteredOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm rounded-lg transition-all duration-200 hover-glow-blue ${
                      option === value 
                        ? 'bg-blue-600/20 text-blue-400' 
                        : 'hover:bg-[#1A1A1C]/50 text-gray-300'
                    } ${option.startsWith('no ') ? 'text-red-400 font-medium' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );

  return (
    <div className="relative">
      <label className="block text-xs sm:text-sm font-medium text-white mb-1 gradient-text">
        {label}
      </label>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-2 sm:px-3 py-1.5 bg-[#1A1A1C]/50 border border-white/[0.05] rounded-xl text-xs sm:text-sm text-white focus:outline-none select-glow transition-all duration-200 flex items-center justify-between hover-glow-blue"
      >
        <span className="truncate mr-2">{value}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {!isOpen && (
        <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity absolute left-0 right-0 -bottom-6">
          <p className="text-xs text-gray-300 glass-effect px-2 py-1 rounded-md">
            {description}
          </p>
        </div>
      )}

      {modal}
    </div>
  );
}