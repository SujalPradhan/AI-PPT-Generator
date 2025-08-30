import React from 'react';
import { FileText, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function TextInput() {
  const { state, dispatch } = useApp();

  return (
    <div className="bg-secondary-800 rounded-xl shadow-md border border-secondary-700 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileText className="h-5 w-5 text-primary-500" />
        <h2 className="text-lg font-semibold text-white">Input Content</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="input-text" className="block text-sm font-medium text-primary-100 mb-2">
            Your Text or Markdown
          </label>
          <textarea
            id="input-text"
            value={state.inputText}
            onChange={(e) => dispatch({ type: 'SET_INPUT_TEXT', payload: e.target.value })}
            placeholder="Paste your text, markdown, or prose here. The AI will intelligently break it down into slides..."
            className="w-full h-64 px-3 py-2 bg-secondary-700 text-white border border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-colors"
          />
          <p className="text-sm text-primary-200 mt-2">
            Supports plain text, markdown, and structured content
          </p>
        </div>

        <div>
          <label htmlFor="guidance" className="block text-sm font-medium text-primary-100 mb-2">
            Presentation Guidance (Optional)
          </label>
          <input
            type="text"
            id="guidance"
            value={state.guidance}
            onChange={(e) => dispatch({ type: 'SET_GUIDANCE', payload: e.target.value })}
            placeholder="e.g., 'turn into an investor pitch deck' or 'make it technical and detailed'"
            className="w-full px-3 py-2 bg-secondary-700 text-white border border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
          <div className="flex items-start space-x-2 mt-2">
            <Info className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-primary-200">
              Provide context about the tone, structure, or intended use case to help the AI organize your content appropriately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}