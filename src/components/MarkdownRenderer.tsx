import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold mb-4 mt-6 text-white gradient-text">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold mb-3 mt-5 text-white">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold mb-2 mt-4 text-white">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-4 text-gray-300 leading-relaxed">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-300">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-300">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="mb-1 text-gray-300">
            {children}
          </li>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-blue-400">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-blue-300">
            {children}
          </em>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-blue-500 pl-4 my-4 text-gray-400 italic">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <code className="bg-[#1A1A1C]/50 px-2 py-1 rounded text-blue-300 font-mono text-sm">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-[#1A1A1C]/50 p-4 rounded-lg my-4 overflow-x-auto">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}