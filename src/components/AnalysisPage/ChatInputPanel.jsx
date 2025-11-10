import React, { useRef } from 'react';
import {
  Send,
  Loader2,
  ChevronDown,
  Paperclip,
  BookOpen,
  Bot,
  X,
  FileCheck,
} from 'lucide-react';

const ChatInputPanel = ({
  // Main state
  showSplitView,
  documentData,
  processingStatus,
  progressPercentage,
  showMainProgressBar,
  currentProgressBarPercentage,
  currentProgressBarText,
  getStageColor,
  
  // Chat input state
  chatInput,
  setChatInput,
  handleChatInputChange,
  handleSend,
  getInputPlaceholder,
  
  // Loading states
  isLoading,
  isGeneratingInsights,
  isUploading,
  
  // Dropdown state
  showDropdown,
  setShowDropdown,
  activeDropdown,
  isLoadingSecrets,
  secrets,
  handleDropdownSelect,
  isSecretPromptSelected,
  setIsSecretPromptSelected,
  setActiveDropdown,
  setSelectedSecretId,
  
  // File upload
  handleFileUpload,
  fileId,
  
  // Utility functions
  formatFileSize,
  formatDate,
  getStatusDisplayText,
}) => {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  if (showSplitView) {
    return null; // Don't render when in split view
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="text-center max-w-2xl px-6 mb-12">
        <h3 className="text-3xl font-bold mb-4 text-gray-900">Welcome to Smart Legal Insights</h3>
        <p className="text-gray-600 text-xl leading-relaxed">
          Upload a legal document or ask a question to begin your AI-powered analysis.
        </p>
      </div>
      
      <div className="w-full max-w-4xl px-6">
        {showMainProgressBar && (
          <div className="mt-3 text-center">
            <div className="inline-flex items-center px-3 py-1.5 bg-[#E0F7F6] text-[#21C1B6] rounded-full text-sm">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              {currentProgressBarText}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2 relative overflow-hidden">
              <div
                className={`h-2 rounded-full transition-all duration-300 relative overflow-hidden bg-gradient-to-r ${getStageColor(
                  currentProgressBarPercentage
                )}`}
                style={{ width: `${currentProgressBarPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
              </div>
            </div>
          </div>
        )}
        
        {documentData && !showSplitView && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-3">
              <FileCheck className="h-5 w-5 text-green-600" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{documentData.originalName}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(documentData.size)} • {formatDate(documentData.uploadedAt)}
                </p>
              </div>
              {processingStatus && (
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    processingStatus.status === 'processed'
                      ? 'bg-green-100 text-green-800'
                      : processingStatus.status === 'processing' || processingStatus.status === 'batch_processing'
                      ? 'bg-[#E0F7F6] text-[#21C1B6]'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {getStatusDisplayText(processingStatus.status, progressPercentage)}
                </div>
              )}
            </div>
          </div>
        )}
        
        <form onSubmit={handleSend} className="mx-auto mt-4">
          <div className="flex items-center space-x-3 bg-gray-50 rounded-xl px-5 py-6 focus-within:border-[#21C1B6] focus-within:bg-white focus-within:shadow-sm analysis-input-container">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              title="Upload Document"
            >
              {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Paperclip className="h-5 w-5" />}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.tiff"
              onChange={handleFileUpload}
              disabled={isUploading}
              multiple
            />
            <div className="relative flex-shrink-0" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                disabled={isLoading || isGeneratingInsights || isLoadingSecrets}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BookOpen className="h-4 w-4" />
                <span>{isLoadingSecrets ? 'Loading...' : activeDropdown}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {showDropdown && !isLoadingSecrets && (
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                  {secrets.length > 0 ? (
                    secrets.map((secret) => (
                      <button
                        key={secret.id}
                        type="button"
                        onClick={() => handleDropdownSelect(secret.name, secret.id, secret.llm_name)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {secret.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2.5 text-sm text-gray-500">No analysis prompts available</div>
                  )}
                </div>
              )}
            </div>
            <input
              type="text"
              value={chatInput}
              onChange={handleChatInputChange}
              placeholder={getInputPlaceholder()}
              className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-[15px] font-medium py-2 min-w-0 analysis-page-user-input"
              disabled={
                isLoading ||
                isGeneratingInsights ||
                !fileId ||
                (processingStatus?.status !== 'processed' &&
                  processingStatus?.status !== null &&
                  progressPercentage < 100)
              }
            />
            <button
              type="submit"
              disabled={
                isLoading ||
                isGeneratingInsights ||
                (!chatInput.trim() && !isSecretPromptSelected) ||
                !fileId ||
                (processingStatus && processingStatus.status !== 'processed' && progressPercentage < 100)
              }
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
              className="p-2 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white rounded-lg transition-colors flex-shrink-0"
              title="Send Message"
            >
              {isLoading || isGeneratingInsights ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </div>
          {isSecretPromptSelected && (
            <div className="mt-3 p-2 bg-[#E0F7F6] border border-[#21C1B6] rounded-lg">
              <div className="flex items-center space-x-2 text-sm text-[#21C1B6]">
                <Bot className="h-4 w-4" />
                <span>
                  Using analysis prompt: <strong>{activeDropdown}</strong>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setIsSecretPromptSelected(false);
                    setActiveDropdown('Custom Query');
                    setSelectedSecretId(null);
                  }}
                  className="ml-auto text-[#21C1B6] hover:text-[#1AA49B]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatInputPanel;