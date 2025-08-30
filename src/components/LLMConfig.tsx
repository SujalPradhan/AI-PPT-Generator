import React from 'react';
import { Brain, Key, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function LLMConfig() {
  const { state, dispatch } = useApp();

  const providers = [
    { id: 'openai', name: 'OpenAI GPT', description: 'GPT-3.5/4 for reliable text processing' },
    { id: 'anthropic', name: 'Anthropic Claude', description: 'Claude for nuanced content analysis' },
    { id: 'gemini', name: 'Google Gemini', description: 'Gemini for fast processing' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">AI Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Choose LLM Provider
          </label>
          <div className="grid gap-3">
            {providers.map((provider) => (
              <label key={provider.id} className="relative">
                <input
                  type="radio"
                  name="llm-provider"
                  value={provider.id}
                  checked={state.llmProvider === provider.id}
                  onChange={(e) => dispatch({ 
                    type: 'SET_LLM_PROVIDER', 
                    payload: e.target.value as 'openai' | 'anthropic' | 'gemini'
                  })}
                  className="sr-only"
                />
                <div className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  state.llmProvider === provider.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}>
                  <div className="font-medium text-gray-900">{provider.name}</div>
                  <div className="text-sm text-gray-600">{provider.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-2">
            API Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="password"
              id="api-key"
              value={state.apiKey}
              onChange={(e) => dispatch({ type: 'SET_API_KEY', payload: e.target.value })}
              placeholder="Enter your API key..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex items-start space-x-2 mt-2">
            <Shield className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Your API key is never stored or logged. It's only used for the current session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}