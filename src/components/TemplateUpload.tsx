import React, { useCallback } from 'react';
import { Upload, FileType, CheckCircle, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { parseTemplate } from '../utils/templateParser';

export function TemplateUpload() {
  const { state, dispatch } = useApp();

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.name.match(/\.(pptx|potx)$/i)) {
      dispatch({ type: 'SET_ERROR', payload: 'Please upload a valid PowerPoint file (.pptx or .potx)' });
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      dispatch({ type: 'SET_ERROR', payload: 'File size must be less than 50MB' });
      return;
    }

    dispatch({ type: 'SET_TEMPLATE_FILE', payload: file });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const templateData = await parseTemplate(file);
      dispatch({ type: 'SET_TEMPLATE_DATA', payload: templateData });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to parse template file. Please ensure it\'s a valid PowerPoint file.' });
      dispatch({ type: 'SET_TEMPLATE_FILE', payload: null });
    }
  }, [dispatch]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <FileType className="h-5 w-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">PowerPoint Template (Optional)</h2>
      </div>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          state.templateFile
            ? 'border-green-300 bg-green-50'
            : 'border-gray-300 hover:border-gray-400 bg-gray-50'
        }`}
      >
        {state.templateFile ? (
          <div className="space-y-3">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto" />
            <div>
              <p className="font-medium text-gray-900">{state.templateFile.name}</p>
              <p className="text-sm text-gray-600">
                {(state.templateFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            {state.templateData && (
              <div className="bg-white rounded-lg p-3 border border-green-200">
                <p className="text-sm text-green-700">
                  ✓ Template analyzed: {state.templateData.slideCount} slides, 
                  {state.templateData.imageCount} images found
                </p>
              </div>
            )}
            <button
              onClick={() => {
                dispatch({ type: 'SET_TEMPLATE_FILE', payload: null });
                dispatch({ type: 'SET_TEMPLATE_DATA', payload: null });
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Choose different file
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload className="h-12 w-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-900">Upload PowerPoint Template (Optional)</p>
              <p className="text-gray-600">Upload to match your brand style, or skip for default formatting</p>
            </div>
            <input
              type="file"
              accept=".pptx,.potx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
              id="template-upload"
            />
            <label
              htmlFor="template-upload"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer mr-4"
            >
              Choose File
            </label>
            <button
              onClick={() => {
                dispatch({ type: 'SET_TEMPLATE_FILE', payload: null });
                dispatch({ type: 'SET_TEMPLATE_DATA', payload: null });
              }}
              className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Skip Template
            </button>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>.pptx</span>
              <span>•</span>
              <span>.potx</span>
              <span>•</span>
              <span>Max 50MB</span>
            </div>
          </div>
        )}
      </div>

      {state.templateData && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Template Analysis Complete</p>
              <p>Your presentation style will be automatically applied to generated slides, including colors, fonts, and layout patterns.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}