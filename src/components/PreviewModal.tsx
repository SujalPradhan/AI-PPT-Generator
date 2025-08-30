import React from 'react';
import { X, Download, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadPresentation } from '../utils/presentationDownloader';

export function PreviewModal() {
  const { state, dispatch } = useApp();

  if (!state.showPreview) return null;

  const handleDownload = async () => {
    try {
      await downloadPresentation(state.generatedSlides, state.templateData);
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: 'Failed to download presentation. Please try again.'
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Presentation Preview</h2>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_SHOW_PREVIEW', payload: false })}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid gap-4">
            {state.generatedSlides.map((slide, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Slide {index + 1}</h3>
                  <span className="text-sm text-gray-500">{slide.layout || 'Content'}</span>
                </div>
                
                <div className="space-y-2">
                  {slide.title && (
                    <h4 className="text-lg font-semibold text-gray-800">{slide.title}</h4>
                  )}
                  
                  {slide.content && (
                    <div className="text-gray-700">
                      {Array.isArray(slide.content) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {slide.content.map((item: string, i: number) => (
                            <li key={i} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm">{slide.content}</p>
                      )}
                    </div>
                  )}

                  {slide.images && slide.images.length > 0 && (
                    <div className="text-xs text-blue-600">
                      Images: {slide.images.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {state.generatedSlides.length} slides generated
            </div>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download PPTX</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}