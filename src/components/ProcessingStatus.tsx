import React from 'react';
import { Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ProcessingStatus() {
  const { state } = useApp();

  if (!state.isProcessing) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Generating Your Presentation
          </h3>
          <p className="text-gray-600 mb-4">
            {state.processingStep || 'Processing your content...'}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}