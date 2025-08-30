import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function ErrorDisplay() {
  const { state, dispatch } = useApp();

  if (!state.error) return null;

  return (
    <div className="fixed top-4 right-4 max-w-md z-50">
      <div className="bg-secondary-800 border border-red-800 rounded-lg p-4 shadow-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-medium text-red-400">Error</h4>
            <p className="text-sm text-red-300 mt-1">{state.error}</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}
            className="text-red-400 hover:text-red-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}