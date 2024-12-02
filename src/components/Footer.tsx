import React from 'react';
import { Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 pb-8">
      <div className="flex justify-center items-center gap-4">
        <a
          href="https://www.instagram.com/graphiste.binks/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full glass-button hover:glow-blue-sm transition-all duration-200 group"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5 text-gray-400 group-hover:text-gray-200" />
        </a>
        <a
          href="https://www.threads.net/@graphiste.binks"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full glass-button hover:glow-blue-sm transition-all duration-200 group"
          aria-label="Threads"
        >
          <svg 
            className="w-5 h-5 text-gray-400 group-hover:text-gray-200"
            viewBox="0 0 512 512" 
            fill="currentColor"
          >
            <path d="m259.965 512h-.147c-76.391-.518-135.117-25.703-174.575-74.879-35.125-43.755-53.232-104.638-53.84-180.936v-.37c.609-76.316 18.715-137.182 53.84-180.936 39.439-49.176 98.184-74.363 174.556-74.879h.295c58.56.387 107.551 15.451 145.626 44.732 35.789 27.529 60.977 66.766 74.879 116.642l-43.514 12.133c-23.545-84.467-83.138-127.65-177.138-128.332-62.064.442-108.99 19.95-139.505 57.971-28.58 35.605-43.349 87.03-43.884 152.836.553 65.825 15.322 117.25 43.884 152.837 30.516 38.019 77.441 57.526 139.505 57.969 55.941-.405 92.967-13.44 123.76-43.606 35.143-34.426 34.498-76.649 23.25-102.333-6.619-15.139-18.643-27.75-34.85-37.302-4.073 28.802-13.239 52.181-27.399 69.791-18.882 23.508-45.653 36.361-79.544 38.185-25.648 1.382-50.355-4.682-69.531-17.092-22.68-14.677-35.955-37.136-37.375-63.244-1.383-25.389 8.685-48.733 28.34-65.734 18.789-16.244 45.211-25.776 76.427-27.528 23.011-1.291 44.528-.276 64.424 3.042-2.637-15.839-7.983-28.395-15.949-37.467-10.953-12.483-27.898-18.862-50.337-19.01h-.627c-18.014 0-42.482 4.941-58.081 28.137l-37.485-25.205c20.872-31.032 54.781-48.106 95.548-48.106h.922c68.167.424 108.751 42.113 112.789 114.926 2.321.979 4.591 1.991 6.84 3.043 31.807 14.954 55.057 37.597 67.263 65.476 17.001 38.867 18.568 102.205-33.041 152.725-39.422 38.609-87.289 56.034-155.197 56.496h-.147l.018.019zm21.389-249.418c-5.163 0-10.4.147-15.748.461-39.181 2.213-63.594 20.154-62.211 45.709 1.457 26.773 30.995 39.218 59.372 37.689 26.127-1.403 60.129-11.562 65.825-79.158-14.42-3.078-30.275-4.701-47.239-4.701z" />
          </svg>
        </a>
        <a
          href="https://x.com/graphiste_binks"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full glass-button hover:glow-blue-sm transition-all duration-200 group"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5 text-gray-400 group-hover:text-gray-200" />
        </a>
      </div>
    </footer>
  );
}