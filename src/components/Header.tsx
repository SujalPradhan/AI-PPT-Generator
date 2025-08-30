import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-secondary-900 shadow-md border-b border-secondary-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <FileText className="h-8 w-8 text-primary-500" />
              <Sparkles className="h-4 w-4 text-primary-300 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PresentationAI</h1>
              <p className="text-sm text-primary-100">Transform text into beautiful presentations</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-primary-200">
              Powered by AI • Secure • Fast
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}