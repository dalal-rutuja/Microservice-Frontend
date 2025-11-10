import React, { useRef } from 'react';
import {
  Search,
  Send,
  FileText,
  Loader2,
  Upload,
  CheckCircle,
  X,
  ChevronRight,
  ChevronDown,
  Paperclip,
  BookOpen,
  FileCheck,
  Bot,
} from 'lucide-react';

const ChatSidebar = ({
  // Search and display state
  searchQuery,
  setSearchQuery,
  messages,
  selectedMessageId,
  displayLimit,
  showAllChats,
  setShowAllChats,
  
  // Message handling
  handleMessageClick,
  highlightText,
  formatDate,
  
  // Document state
  documentData,
  uploadedDocuments,
  fileId,
  setFileId,
  setDocumentData,
  setProcessingStatus,
  setProgressPercentage,
  
  // Processing state
  processingStatus,
  progressPercentage,
  isLoading,
  isGeneratingInsights,
  isUploading,
  
  // Chat input
  chatInput,
  setChatInput,
  handleChatInputChange,
  handleSend,
  getInputPlaceholder,
  
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
  
  // Utility functions
  formatFileSize,
  getStatusDisplayText,
  getStageColor,
  startProcessingStatusPolling,
  
  // New chat
  startNewChat,
}) => {
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  return (
    <div className="w-2/5 border-r border-gray-200 flex flex-col bg-white h-full">
      <div className="p-3 border-b border-black border-opacity-20">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Questions</h2>
          <button
            onClick={startNewChat}
            className="px-3 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            New Chat
          </button>
        </div>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-gray-100 rounded-lg text-xs text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#21C1B6] focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Uploaded Documents Section */}
      {uploadedDocuments.length > 0 && (
        <div className="px-3 py-2 border-b border-gray-200 bg-[#E0F7F6]">
          <h3 className="text-xs font-semibold text-gray-700 mb-1.5 flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            Uploaded Documents ({uploadedDocuments.length})
          </h3>
          <div className="space-y-1.5 max-h-24 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
            {uploadedDocuments.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  setFileId(doc.id);
                  setDocumentData({
                    id: doc.id,
                    title: doc.fileName,
                    originalName: doc.fileName,
                    size: doc.fileSize,
                    type: 'unknown',
                    uploadedAt: doc.uploadedAt,
                    status: doc.status,
                    processingProgress: doc.processingProgress,
                    currentOperation: doc.currentOperation,
                  });
                  setProcessingStatus({
                    status: doc.status,
                    processing_progress: doc.processingProgress,
                    current_operation: doc.currentOperation,
                    chunk_count: doc.chunkCount,
                  });
                  setProgressPercentage(doc.processingProgress || 0);
                  if (doc.status !== 'processed') {
                    startProcessingStatusPolling(doc.id);
                  }
                }}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${
                  fileId === doc.id ? 'bg-[#E0F7F6] border border-[#21C1B6]' : 'bg-white border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{doc.fileName}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(doc.fileSize)}</p>
                    {(doc.status === 'processing' || doc.status === 'batch_processing') && (
                      <>
                        <p className="text-xs text-[#21C1B6] mt-1 truncate font-medium">
                          {doc.currentOperation} ({Math.round(doc.processingProgress || 0)}%)
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-1 mt-1 relative overflow-hidden">
                          <div
                            className={`h-1 rounded-full transition-all duration-300 bg-gradient-to-r ${getStageColor(
                              doc.processingProgress || 0
                            )}`}
                            style={{ width: `${doc.processingProgress || 0}%` }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className={`ml-1.5 px-1 py-0.5 rounded text-xs font-medium ${
                      doc.status === 'processed' && (doc.processingProgress || 0) >= 100
                        ? 'bg-green-100 text-green-800'
                        : doc.status === 'processing' || doc.status === 'batch_processing'
                        ? 'bg-[#E0F7F6] text-[#21C1B6]'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {getStatusDisplayText(doc.status, doc.processingProgress || 0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto px-3 py-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <div className="space-y-1.5">
          {messages
            .filter(
              (msg) =>
                (msg.display_text_left_panel || msg.question || '').toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, showAllChats ? messages.length : displayLimit)
            .map((msg, i) => (
              <div
                key={msg.id || i}
                onClick={() => handleMessageClick(msg)}
                className={`p-2 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedMessageId === msg.id ? 'bg-[#E0F7F6] border-[#21C1B6] shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 mb-0.5 line-clamp-2">
                      {highlightText(msg.display_text_left_panel || msg.question, searchQuery)}
                    </p>
                    <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                      <span>{formatDate(msg.timestamp || msg.created_at)}</span>
                      {msg.session_id && (
                        <>
                          <span>•</span>
                          <span className="font-mono text-xs bg-gray-100 px-1 py-0.5 rounded">
                            {msg.session_id.split('-')[1]?.substring(0, 8) || 'N/A'}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  {selectedMessageId === msg.id && <ChevronRight className="h-3 w-3 text-[#21C1B6] flex-shrink-0 ml-1.5" />}
                </div>
              </div>
            ))}
          {messages.length > displayLimit && !showAllChats && (
            <div className="text-center py-3">
              <button
                onClick={() => setShowAllChats(true)}
                className="px-3 py-1.5 text-xs font-medium text-[#21C1B6] bg-[#E0F7F6] rounded-lg hover:bg-[#D0EBEA] transition-colors"
              >
                See All ({messages.length - displayLimit} more)
              </button>
            </div>
          )}
          {isLoading && (
            <div className="p-2 rounded-lg border bg-[#E0F7F6] border-[#21C1B6]">
              <div className="flex items-center space-x-1.5">
                <Loader2 className="h-3 w-3 animate-spin text-[#21C1B6]" />
                <span className="text-xs text-[#21C1B6]">Processing...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom Input Section */}
      <div className="border-t border-gray-200 p-3 bg-white flex-shrink-0">
        {documentData && (
          <div className="mb-2 p-1.5 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-1.5">
              <FileCheck className="h-3 w-3 text-green-600" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{documentData.originalName}</p>
                <p className="text-xs text-gray-500">{formatFileSize(documentData.size)}</p>
              </div>
              {processingStatus && (
                <div
                  className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                    processingStatus.status === 'processed' && progressPercentage >= 100
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
        
        <form onSubmit={handleSend}>
          <div className="flex items-center space-x-1.5 bg-gray-50 rounded-xl px-2.5 py-2 focus-within:border-[#21C1B6] focus-within:bg-white focus-within:shadow-sm analysis-input-container">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              title="Upload Document"
            >
              {isUploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Paperclip className="h-3 w-3" />}
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
                className="flex items-center space-x-1 px-2 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BookOpen className="h-3 w-3" />
                <span>{isLoadingSecrets ? 'Loading...' : activeDropdown}</span>
                <ChevronDown className="h-3 w-3" />
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
              className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-xs font-medium py-1 min-w-0 analysis-page-user-input"
              disabled={
                isLoading ||
                isGeneratingInsights ||
                !fileId ||
                (processingStatus && processingStatus.status !== 'processed' && progressPercentage < 100)
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
              className="p-1.5 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white rounded-lg transition-colors flex-shrink-0"
              title="Send Message"
            >
              {isLoading || isGeneratingInsights ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Send className="h-3 w-3" />
              )}
            </button>
          </div>
          {isSecretPromptSelected && (
            <div className="mt-1.5 p-1.5 bg-[#E0F7F6] border border-[#21C1B6] rounded-lg">
              <div className="flex items-center space-x-1.5 text-xs text-[#21C1B6]">
                <Bot className="h-3 w-3" />
                <span>
                  Using: <strong>{activeDropdown}</strong>
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
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatSidebar;