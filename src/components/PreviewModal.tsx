import React, { useState } from 'react';
import { X, Download, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { downloadPresentation } from '../utils/presentationDownloader';

export function PreviewModal() {
  const { state, dispatch } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!state.showPreview) return null;

  const totalSlides = state.generatedSlides.length;
  const slide = state.generatedSlides[currentSlide];

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

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Escape') {
      dispatch({ type: 'SET_SHOW_PREVIEW', payload: false });
    }
  };

  const formatContent = (content: string[] | string) => {
    if (Array.isArray(content)) {
      return content.map((item, index) => (
        <div key={index} className="flex items-start space-x-3 mb-3">
          <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
          <p className="text-lg leading-relaxed text-gray-700">{item}</p>
        </div>
      ));
    } else {
      return <p className="text-lg leading-relaxed text-gray-700">{content}</p>;
    }
  };

  const getSlideBackground = (layout: string) => {
    switch (layout) {
      case 'title':
        return 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700';
      case 'conclusion':
        return 'bg-gradient-to-br from-green-600 via-teal-600 to-blue-600';
      default:
        return 'bg-white';
    }
  };

  const getTextColor = (layout: string) => {
    return layout === 'title' || layout === 'conclusion' ? 'text-white' : 'text-gray-900';
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="w-full h-full flex flex-col">
        {/* Header Controls */}
        <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch({ type: 'SET_SHOW_PREVIEW', payload: false })}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-semibold">Presentation Preview</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">
              {currentSlide + 1} of {totalSlides}
            </span>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download PPTX</span>
            </button>
          </div>
        </div>

        {/* Main Slide Area */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="relative w-full max-w-5xl">
            {/* Slide Container */}
            <div 
              className={`aspect-video rounded-lg shadow-2xl ${getSlideBackground(slide?.layout)} p-12 flex flex-col justify-center transition-all duration-300`}
              style={{ minHeight: '500px' }}
            >
              {slide && (
                <div className="h-full flex flex-col justify-center">
                  {/* Title */}
                  {slide.title && (
                    <h1 className={`text-4xl font-bold mb-8 ${getTextColor(slide.layout)} leading-tight`}>
                      {slide.title}
                    </h1>
                  )}
                  
                  {/* Content */}
                  {slide.content && (
                    <div className={`${getTextColor(slide.layout)} space-y-4`}>
                      {formatContent(slide.content)}
                    </div>
                  )}

                  {/* Images indicator */}
                  {slide.images && slide.images.length > 0 && (
                    <div className="mt-6 text-sm opacity-75">
                      <span className={slide.layout === 'title' || slide.layout === 'conclusion' ? 'text-white' : 'text-blue-600'}>
                        📷 {slide.images.length} image(s) from template
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all ${
                currentSlide === 0 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg hover:shadow-xl'
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full transition-all ${
                currentSlide === totalSlides - 1 
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-lg hover:shadow-xl'
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="bg-gray-900 p-4">
          <div className="flex items-center justify-between max-w-5xl mx-auto">
            {/* Slide Thumbnails */}
            <div className="flex items-center space-x-2 overflow-x-auto max-w-2xl">
              {state.generatedSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-16 h-10 rounded border-2 transition-all ${
                    index === currentSlide
                      ? 'border-blue-500 bg-blue-100'
                      : 'border-gray-600 bg-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <span className={`text-xs font-medium ${
                      index === currentSlide ? 'text-blue-700' : 'text-gray-300'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentSlide === 0
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="text-white text-sm font-medium px-4">
                {currentSlide + 1} / {totalSlides}
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === totalSlides - 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  currentSlide === totalSlides - 1
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="text-center mt-3">
            <p className="text-xs text-gray-400">
              Use arrow keys or spacebar to navigate • Press ESC to close
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}