import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import DownloadPdf from '../DownloadPdf/DownloadPdf';
import {
  Bot,
  Copy,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

const ChatResponsePanel = ({
  selectedMessageId,
  currentResponse,
  animatedResponseContent,
  isAnimatingResponse,
  messages,
  formatDate,
  handleCopyResponse,
  showResponseImmediately,
  markdownOutputRef,
}) => {
  // Enhanced Markdown Components
  const markdownComponents = {
    h1: ({ node, ...props }) => (
      <h1
        className="text-3xl font-bold mb-6 mt-8 text-gray-900 border-b-2 border-gray-300 pb-3 analysis-page-ai-response"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-bold mb-5 mt-7 text-gray-900 border-b border-gray-200 pb-2 analysis-page-ai-response" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-semibold mb-4 mt-6 text-gray-800 analysis-page-ai-response" {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 className="text-lg font-semibold mb-3 mt-5 text-gray-800 analysis-page-ai-response" {...props} />
    ),
    h5: ({ node, ...props }) => (
      <h5 className="text-base font-semibold mb-2 mt-4 text-gray-700 analysis-page-ai-response" {...props} />
    ),
    h6: ({ node, ...props }) => (
      <h6 className="text-sm font-semibold mb-2 mt-3 text-gray-700 analysis-page-ai-response" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="mb-4 leading-relaxed text-gray-800 text-[15px] analysis-page-ai-response" {...props} />
    ),
    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
    em: ({ node, ...props }) => <em className="italic text-gray-800" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-800" {...props} />,
    li: ({ node, ...props }) => <li className="leading-relaxed text-gray-800 analysis-page-ai-response" {...props} />,
    a: ({ node, ...props }) => (
      <a
        className="text-[#21C1B6] hover:text-[#1AA49B] underline font-medium transition-colors"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-[#21C1B6] pl-4 py-2 my-4 bg-[#E0F7F6] text-gray-700 italic rounded-r analysis-page-ai-response"
        {...props}
      />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      if (inline) {
        return (
          <code
            className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <div className="relative my-4">
          {language && (
            <div className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-t font-mono">
              {language}
            </div>
          )}
          <pre className={`bg-gray-900 text-gray-100 p-4 ${language ? 'rounded-b' : 'rounded'} overflow-x-auto`}>
            <code className="font-mono text-sm" {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    },
    pre: ({ node, ...props }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded my-4 overflow-x-auto" {...props} />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-6 rounded-lg border border-gray-300">
        <table className="min-w-full divide-y divide-gray-300" {...props} />
      </div>
    ),
    thead: ({ node, ...props }) => <thead className="bg-gray-100" {...props} />,
    th: ({ node, ...props }) => (
      <th
        className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300"
        {...props}
      />
    ),
    tbody: ({ node, ...props }) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
    tr: ({ node, ...props }) => <tr className="hover:bg-gray-50 transition-colors" {...props} />,
    td: ({ node, ...props }) => (
      <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200" {...props} />
    ),
    hr: ({ node, ...props }) => <hr className="my-6 border-t-2 border-gray-300" {...props} />,
    img: ({ node, ...props }) => <img className="max-w-full h-auto rounded-lg shadow-md my-4" alt="" {...props} />,
  };

  return (
    <div className="w-3/5 flex flex-col h-full bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        {selectedMessageId && (currentResponse || animatedResponseContent) ? (
          <div className="px-4 py-4">
            <div className="max-w-none">
              {/* Header Section */}
              <div className="mb-4 pb-3 border-b border-gray-200 bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between mb-2.5">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Bot className="h-4 w-4 mr-1.5 text-[#21C1B6]" />
                    AI Response
                  </h2>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-500">
                    <button
                      onClick={handleCopyResponse}
                      className="flex items-center px-2.5 py-1 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      title="Copy AI Response"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </button>
                    <DownloadPdf markdownOutputRef={markdownOutputRef} />
                    {messages.find((msg) => msg.id === selectedMessageId)?.timestamp && (
                      <span>{formatDate(messages.find((msg) => msg.id === selectedMessageId).timestamp)}</span>
                    )}
                    {messages.find((msg) => msg.id === selectedMessageId)?.session_id && (
                      <>
                        <span>•</span>
                        <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                          {messages.find((msg) => msg.id === selectedMessageId).session_id.split('-')[1]?.substring(0, 6) || 'N/A'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                {/* Question Display */}
                <div className="p-2.5 bg-gradient-to-r from-[#E0F7F6] to-indigo-50 rounded-lg border-l-4 border-[#21C1B6]">
                  <p className="text-xs font-medium text-[#21C1B6] mb-1 flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Question:
                  </p>
                  <p className="text-xs text-[#21C1B6] leading-relaxed">
                    {messages.find((msg) => msg.id === selectedMessageId)?.question || 'No question available'}
                  </p>
                </div>
                {/* Skip Animation Button */}
                {isAnimatingResponse && (
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={() => showResponseImmediately(currentResponse)}
                      className="text-xs text-[#21C1B6] hover:text-[#1AA49B] flex items-center space-x-1"
                    >
                      <span>Skip animation</span>
                      <ArrowRight className="h-2.5 w-2.5" />
                    </button>
                  </div>
                )}
              </div>
              {/* Response Content */}
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="prose prose-gray prose-sm max-w-none" ref={markdownOutputRef}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    components={markdownComponents}
                  >
                    {animatedResponseContent || currentResponse || ''}
                  </ReactMarkdown>
                  {/* Typing Indicator */}
                  {isAnimatingResponse && (
                    <span className="inline-flex items-center ml-1">
                      <span className="inline-block w-1.5 h-4 bg-[#21C1B6] animate-pulse"></span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-base font-medium">Select a question to view the response</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatResponsePanel;