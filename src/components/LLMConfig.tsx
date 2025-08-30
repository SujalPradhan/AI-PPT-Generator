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
    <div className="bg-secondary-800 rounded-xl shadow-md border border-secondary-700 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="h-5 w-5 text-primary-500" />
        <h2 className="text-lg font-semibold text-white">AI Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary-100 mb-3">
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
                    ? 'border-primary-500 bg-secondary-700'
                    : 'border-secondary-600 hover:border-secondary-500 hover:bg-secondary-700'
                }`}>
                  <div className="font-medium text-white">{provider.name}</div>
                  <div className="text-sm text-primary-200">{provider.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="api-key" className="block text-sm font-medium text-primary-100 mb-2">
            API Key
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-300" />
            <input
              type="password"
              id="api-key"
              value={state.apiKey}
              onChange={(e) => dispatch({ type: 'SET_API_KEY', payload: e.target.value })}
              placeholder="Enter your API key..."
              className="w-full pl-10 pr-3 py-2 bg-secondary-700 text-white border border-secondary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
            />
          </div>
          <div className="flex items-start space-x-2 mt-2">
            <Shield className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-primary-200">
              Your API key is never stored or logged. It's only used for the current session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}