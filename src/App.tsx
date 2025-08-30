import React, { useState } from 'react';
import { Header } from './components/Header';
import { TextInput } from './components/TextInput';
import { TemplateUpload } from './components/TemplateUpload';
import { LLMConfig } from './components/LLMConfig';
import { GenerateButton } from './components/GenerateButton';
import { PreviewModal } from './components/PreviewModal';
import { ProcessingStatus } from './components/ProcessingStatus';
import { ErrorDisplay } from './components/ErrorDisplay';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              <TextInput />
              <LLMConfig />
            </div>

            {/* Right Column - Template & Actions */}
            <div className="space-y-6">
              <TemplateUpload />
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Template is Optional</p>
                    <p>Upload a PowerPoint template to match your brand style, or generate with clean default formatting.</p>
                  </div>
                </div>
              </div>
              <GenerateButton />
            </div>
          </div>

          <ProcessingStatus />
          <ErrorDisplay />
          <PreviewModal />
        </main>

        <footer className="bg-white border-t border-gray-200 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>Transform your text into professional presentations with AI-powered intelligence</p>
            <p className="text-sm mt-2">API keys are never stored or logged for your security</p>
          </div>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;