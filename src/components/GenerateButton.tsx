import React from 'react';
import { Wand2, Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { generatePresentation } from '../utils/presentationGenerator';

export function GenerateButton() {
  const { state, dispatch } = useApp();

  const canGenerate = state.inputText.trim() && state.apiKey;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    try {
      dispatch({ type: 'SET_PROCESSING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const result = await generatePresentation({
        inputText: state.inputText,
        guidance: state.guidance,
        llmProvider: state.llmProvider,
        apiKey: state.apiKey,
        templateData: state.templateData || null,
        onProgress: (step: string) => {
          dispatch({ type: 'SET_PROCESSING_STEP', payload: step });
        }
      });

      dispatch({ type: 'SET_GENERATED_SLIDES', payload: result.slides });
      dispatch({ type: 'SET_SHOW_PREVIEW', payload: true });
      
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to generate presentation'
      });
    } finally {
      dispatch({ type: 'SET_PROCESSING', payload: false });
      dispatch({ type: 'SET_PROCESSING_STEP', payload: '' });
    }
  };

  return (
    <div className="bg-secondary-800 rounded-xl shadow-md border border-secondary-700 p-6">
      <h2 className="text-lg font-semibold text-white mb-4">Generate Presentation</h2>
      
      <div className="space-y-4">
        <div className="bg-secondary-700 rounded-lg p-4">
          <h3 className="font-medium text-white mb-2">Ready to Generate?</h3>
          <div className="space-y-2 text-sm">
            <div className={`flex items-center space-x-2 ${state.inputText.trim() ? 'text-primary-300' : 'text-secondary-400'}`}>
              <div className={`w-2 h-2 rounded-full ${state.inputText.trim() ? 'bg-primary-500' : 'bg-secondary-500'}`} />
              <span>Content provided</span>
            </div>
            <div className={`flex items-center space-x-2 ${state.apiKey ? 'text-primary-300' : 'text-secondary-400'}`}>
              <div className={`w-2 h-2 rounded-full ${state.apiKey ? 'bg-primary-500' : 'bg-secondary-500'}`} />
              <span>API key configured</span>
            </div>
            <div className={`flex items-center space-x-2 ${state.templateData ? 'text-primary-300' : 'text-primary-400'}`}>
              <div className={`w-2 h-2 rounded-full ${state.templateData ? 'bg-primary-500' : 'bg-primary-600'}`} />
              <span>{state.templateData ? 'Template analyzed' : 'Default styling (no template)'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={!canGenerate || state.isProcessing}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all ${
            canGenerate && !state.isProcessing
              ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-secondary-600 text-secondary-400 cursor-not-allowed'
          }`}
        >
          {state.isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4" />
              <span>Generate Presentation</span>
            </>
          )}
        </button>

        {state.generatedSlides.length > 0 && (
          <button
            onClick={() => dispatch({ type: 'SET_SHOW_PREVIEW', payload: true })}
            className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-secondary-700 hover:bg-secondary-600 text-primary-100 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>View & Download</span>
          </button>
        )}
      </div>
    </div>
  );
}