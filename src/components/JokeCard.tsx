import React from 'react';
import { Quote } from 'lucide-react';

interface JokeCardProps {
  content: string;
  isUserSubmitted?: boolean;
}

export function JokeCard({ content, isUserSubmitted }: JokeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <Quote className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
        <div>
          <p className="text-gray-800 text-lg leading-relaxed">{content}</p>
          {isUserSubmitted && (
            <span className="inline-block mt-2 text-sm text-indigo-600 font-medium">
              User Submitted
            </span>
          )}
        </div>
      </div>
    </div>
  );
}