import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FileText className="h-8 w-8 text-blue-600" />
              <Sparkles className="h-4 w-4 text-purple-500 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PresentationAI</h1>
              <p className="text-sm text-gray-600">Transform text into beautiful presentations</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">
              Powered by AI • Secure • Fast
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}