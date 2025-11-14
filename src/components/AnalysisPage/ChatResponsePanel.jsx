
import React, { useRef, useEffect, useState } from 'react';
import { Bot, MessageSquare, Copy, Download, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ChatResponsePanel = ({
 selectedMessageId,
 currentResponse,
 animatedResponseContent,
 messages,
 formatDate,
 isAnimatingResponse,
 showResponseImmediately,
 setSuccess,
 setError,
 stopGeneration,
 isLoading,
 isGeneratingInsights
}) => {
 const responseRef = useRef(null);
 const markdownOutputRef = useRef(null);
 const contentRef = useRef(null);
 const stickyScrollbarRef = useRef(null);
 const horizontalScrollRef = useRef(null);
 const [scrollbarWidth, setScrollbarWidth] = useState(0);

 // Auto-scroll to bottom during animation
 useEffect(() => {
 if (responseRef.current && isAnimatingResponse) {
 responseRef.current.scrollTop = responseRef.current.scrollHeight;
 }
 }, [animatedResponseContent, isAnimatingResponse]);

 // Hide horizontal scrollbar on responseRef
 useEffect(() => {
 const responseElement = responseRef.current;
 if (!responseElement) return;

 // Set inline style to hide horizontal scrollbar
 responseElement.style.scrollbarWidth = 'thin';
 
 // For webkit browsers, we'll rely on CSS but also set overflow-x to auto
 // The CSS will handle hiding the horizontal scrollbar visual
 }, []);

 // Sync sticky scrollbar with content
 useEffect(() => {
 const horizontalElement = horizontalScrollRef.current;
 const markdownElement = markdownOutputRef.current;
 const stickyScrollbar = stickyScrollbarRef.current;
 
 if (!horizontalElement || !markdownElement || !stickyScrollbar) return;

 const updateScrollbar = () => {
 // Check the markdown content width (which contains the tables)
 const scrollWidth = markdownElement.scrollWidth;
 const clientWidth = horizontalElement.clientWidth;
 
 if (scrollWidth > clientWidth) {
 setScrollbarWidth(scrollWidth);
 stickyScrollbar.scrollLeft = horizontalElement.scrollLeft;
 } else {
 setScrollbarWidth(0);
 }
 };

 // Update scrollbar on content changes with a small delay to ensure DOM is ready
 const updateScrollbarDelayed = () => {
 setTimeout(() => {
 updateScrollbar();
 }, 100);
 };

 updateScrollbarDelayed();

 // Sync scrollbar with response scroll (horizontal only)
 const handleHorizontalScroll = () => {
 if (stickyScrollbar) {
 stickyScrollbar.scrollLeft = horizontalElement.scrollLeft;
 }
 };

 // Sync response with scrollbar scroll
 const handleScrollbarScroll = () => {
 horizontalElement.scrollLeft = stickyScrollbar.scrollLeft;
 };

 horizontalElement.addEventListener('scroll', handleHorizontalScroll);
 stickyScrollbar.addEventListener('scroll', handleScrollbarScroll);

 // Use ResizeObserver to detect content size changes
 const resizeObserver = new ResizeObserver(() => {
 updateScrollbar();
 });
 resizeObserver.observe(markdownElement);
 resizeObserver.observe(horizontalElement);

 // Also update on window resize
 const handleWindowResize = () => {
 updateScrollbar();
 };
 window.addEventListener('resize', handleWindowResize);

 return () => {
 horizontalElement.removeEventListener('scroll', handleHorizontalScroll);
 stickyScrollbar.removeEventListener('scroll', handleScrollbarScroll);
 window.removeEventListener('resize', handleWindowResize);
 resizeObserver.disconnect();
 };
 }, [selectedMessageId, currentResponse, animatedResponseContent, scrollbarWidth]);

 const handleCopyResponse = async () => {
 try {
 const textToCopy = animatedResponseContent || currentResponse;
 if (textToCopy) {
 const tempDiv = document.createElement('div');
 tempDiv.innerHTML = textToCopy;
 await navigator.clipboard.writeText(tempDiv.innerText);
 setSuccess('AI response copied to clipboard!');
 } else {
 setError('No response to copy.');
 }
 } catch (err) {
 console.error('Failed to copy AI response:', err);
 setError('Failed to copy response.');
 }
 };

 const handleDownloadPdf = async () => {
 const element = markdownOutputRef.current;
 if (!element) {
 setError('No content to download as PDF.');
 return;
 }

 try {
 // Create a temporary container with fixed width for consistent rendering
 const tempContainer = document.createElement('div');
 tempContainer.style.position = 'absolute';
 tempContainer.style.left = '-9999px';
 tempContainer.style.top = '0';
 tempContainer.style.width = '800px';
 tempContainer.style.padding = '40px';
 tempContainer.style.backgroundColor = '#ffffff';
 tempContainer.style.fontFamily = 'Arial, sans-serif';
 
 // Clone the content
 const clone = element.cloneNode(true);
 tempContainer.appendChild(clone);
 document.body.appendChild(tempContainer);

 // Remove all problematic CSS that might contain oklch or other unsupported features
 const removeProblematicStyles = (element) => {
 // Get all elements including the root
 const allElements = [element, ...element.querySelectorAll('*')];
 
 allElements.forEach(el => {
 // Remove all class names to avoid Tailwind's oklch colors
 el.className = '';
 
 // Apply safe inline styles
 const tagName = el.tagName.toLowerCase();
 
 // Basic text styling
 el.style.color = '#1f2937';
 el.style.fontFamily = 'Arial, sans-serif';
 
 // Headings
 if (tagName === 'h1') {
 el.style.fontSize = '32px';
 el.style.fontWeight = 'bold';
 el.style.marginTop = '24px';
 el.style.marginBottom = '16px';
 el.style.borderBottom = '2px solid #d1d5db';
 el.style.paddingBottom = '8px';
 el.style.pageBreakAfter = 'avoid';
 el.style.pageBreakInside = 'avoid';
 } else if (tagName === 'h2') {
 el.style.fontSize = '28px';
 el.style.fontWeight = 'bold';
 el.style.marginTop = '20px';
 el.style.marginBottom = '12px';
 el.style.borderBottom = '1px solid #e5e7eb';
 el.style.paddingBottom = '6px';
 el.style.pageBreakAfter = 'avoid';
 el.style.pageBreakInside = 'avoid';
 } else if (tagName === 'h3') {
 el.style.fontSize = '24px';
 el.style.fontWeight = '600';
 el.style.marginTop = '16px';
 el.style.marginBottom = '12px';
 el.style.pageBreakAfter = 'avoid';
 el.style.pageBreakInside = 'avoid';
 } else if (tagName === 'h4') {
 el.style.fontSize = '20px';
 el.style.fontWeight = '600';
 el.style.marginTop = '14px';
 el.style.marginBottom = '10px';
 el.style.pageBreakAfter = 'avoid';
 el.style.pageBreakInside = 'avoid';
 } else if (tagName === 'h5' || tagName === 'h6') {
 el.style.fontSize = '16px';
 el.style.fontWeight = '600';
 el.style.marginTop = '12px';
 el.style.marginBottom = '8px';
 el.style.pageBreakAfter = 'avoid';
 el.style.pageBreakInside = 'avoid';
 }
 
 // Paragraphs
 if (tagName === 'p') {
 el.style.marginBottom = '12px';
 el.style.lineHeight = '1.6';
 el.style.fontSize = '15px';
 }
 
 // Lists
 if (tagName === 'ul' || tagName === 'ol') {
 el.style.marginBottom = '12px';
 el.style.paddingLeft = '24px';
 el.style.pageBreakInside = 'avoid';
 }
 
 if (tagName === 'li') {
 el.style.marginBottom = '6px';
 el.style.lineHeight = '1.6';
 }
 
 // Code blocks
 if (tagName === 'code') {
 el.style.backgroundColor = '#f3f4f6';
 el.style.color = '#dc2626';
 el.style.padding = '2px 6px';
 el.style.borderRadius = '4px';
 el.style.fontSize = '14px';
 el.style.fontFamily = 'monospace';
 }
 
 if (tagName === 'pre') {
 el.style.backgroundColor = '#1f2937';
 el.style.color = '#f9fafb';
 el.style.padding = '16px';
 el.style.borderRadius = '8px';
 el.style.marginTop = '12px';
 el.style.marginBottom = '12px';
 el.style.overflowX = 'auto';
 el.style.fontSize = '14px';
 el.style.fontFamily = 'monospace';
 el.style.pageBreakInside = 'avoid';
 }
 
 // Blockquotes
 if (tagName === 'blockquote') {
 el.style.borderLeft = '4px solid #3b82f6';
 el.style.paddingLeft = '16px';
 el.style.paddingTop = '8px';
 el.style.paddingBottom = '8px';
 el.style.marginTop = '12px';
 el.style.marginBottom = '12px';
 el.style.backgroundColor = '#eff6ff';
 el.style.fontStyle = 'italic';
 el.style.borderRadius = '0 8px 8px 0';
 el.style.pageBreakInside = 'avoid';
 }
 
 // Tables - prevent page breaks inside tables
 if (tagName === 'table') {
 el.style.width = '100%';
 el.style.borderCollapse = 'collapse';
 el.style.marginTop = '16px';
 el.style.marginBottom = '16px';
 el.style.border = '1px solid #d1d5db';
 el.style.pageBreakInside = 'avoid';
 }
 
 if (tagName === 'thead') {
 el.style.display = 'table-header-group';
 }
 
 if (tagName === 'tbody') {
 el.style.display = 'table-row-group';
 }
 
 if (tagName === 'th') {
 el.style.backgroundColor = '#f3f4f6';
 el.style.padding = '12px';
 el.style.textAlign = 'left';
 el.style.fontWeight = '600';
 el.style.fontSize = '12px';
 el.style.textTransform = 'uppercase';
 el.style.borderBottom = '1px solid #d1d5db';
 el.style.pageBreakInside = 'avoid';
 el.style.pageBreakAfter = 'avoid';
 }
 
 if (tagName === 'tr') {
 el.style.pageBreakInside = 'avoid';
 el.style.pageBreakAfter = 'auto';
 }
 
 if (tagName === 'td') {
 el.style.padding = '12px';
 el.style.borderBottom = '1px solid #e5e7eb';
 el.style.fontSize = '14px';
 el.style.pageBreakInside = 'avoid';
 }
 
 // Links
 if (tagName === 'a') {
 el.style.color = '#2563eb';
 el.style.textDecoration = 'underline';
 }
 
 // Strong and em
 if (tagName === 'strong') {
 el.style.fontWeight = 'bold';
 }
 
 if (tagName === 'em') {
 el.style.fontStyle = 'italic';
 }
 
 // HR
 if (tagName === 'hr') {
 el.style.marginTop = '20px';
 el.style.marginBottom = '20px';
 el.style.borderTop = '2px solid #d1d5db';
 }
 
 // Images
 if (tagName === 'img') {
 el.style.maxWidth = '100%';
 el.style.height = 'auto';
 el.style.borderRadius = '8px';
 el.style.marginTop = '12px';
 el.style.marginBottom = '12px';
 el.style.pageBreakInside = 'avoid';
 }
 
 // Wrapper divs for tables
 if (tagName === 'div' && el.querySelector('table')) {
 el.style.pageBreakInside = 'avoid';
 }
 });
 };

 removeProblematicStyles(tempContainer);

 // Wait a bit for styles to be applied
 await new Promise(resolve => setTimeout(resolve, 100));

 // Create PDF instance
 const pdf = new jsPDF('p', 'mm', 'a4');
 const pageWidth = 210;
 const pageHeight = 297;
 const margin = 10;
 const contentWidth = pageWidth - (2 * margin);
 
 // Get all main content blocks (paragraphs, headings, tables, etc.)
 const contentBlocks = Array.from(tempContainer.children[0].children);
 let currentY = margin;
 let isFirstPage = true;

 for (const block of contentBlocks) {
 // Capture this block as canvas
 const blockCanvas = await html2canvas(block, {
 scale: 2,
 useCORS: true,
 logging: false,
 backgroundColor: '#ffffff',
 windowWidth: 880,
 });

 const blockHeight = (blockCanvas.height * contentWidth) / blockCanvas.width;
 
 // Check if we need a new page
 if (currentY + blockHeight > pageHeight - margin) {
 // If this is a table or other block that shouldn't be split
 if (block.tagName.toLowerCase() === 'div' && block.querySelector('table')) {
 // Start table on new page
 if (!isFirstPage) {
 pdf.addPage();
 }
 currentY = margin;
 isFirstPage = false;
 } else if (currentY > margin) {
 // Add new page for regular content
 pdf.addPage();
 currentY = margin;
 isFirstPage = false;
 }
 }

 // Add the block to PDF
 const imgData = blockCanvas.toDataURL('image/jpeg', 0.95);
 const imgWidth = contentWidth;
 const imgHeight = (blockCanvas.height * imgWidth) / blockCanvas.width;
 
 pdf.addImage(imgData, 'JPEG', margin, currentY, imgWidth, imgHeight);
 currentY += imgHeight + 5; // Add small spacing between blocks
 }

 // Clean up temporary container
 document.body.removeChild(tempContainer);

 // Generate filename with timestamp
 const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
 const filename = `AI_Response_${timestamp}.pdf`;

 // Save the PDF
 pdf.save(filename);
 setSuccess('AI response downloaded as PDF!');
 } catch (err) {
 console.error('Failed to generate PDF:', err);
 setError(`Failed to download PDF: ${err.message}. Please try again.`);
 }
 };

 // Enhanced Markdown Components
 const markdownComponents = {
 h1: ({node, ...props}) => (
 <h1 className="text-3xl font-bold mb-6 mt-8 text-gray-900 border-b-2 border-gray-300 pb-3 analysis-page-ai-response" {...props} />
 ),
 h2: ({node, ...props}) => (
 <h2 className="text-2xl font-bold mb-5 mt-7 text-gray-900 border-b border-gray-200 pb-2 analysis-page-ai-response" {...props} />
 ),
 h3: ({node, ...props}) => (
 <h3 className="text-xl font-semibold mb-4 mt-6 text-gray-800 analysis-page-ai-response" {...props} />
 ),
 h4: ({node, ...props}) => (
 <h4 className="text-lg font-semibold mb-3 mt-5 text-gray-800 analysis-page-ai-response" {...props} />
 ),
 h5: ({node, ...props}) => (
 <h5 className="text-base font-semibold mb-2 mt-4 text-gray-700 analysis-page-ai-response" {...props} />
 ),
 h6: ({node, ...props}) => (
 <h6 className="text-sm font-semibold mb-2 mt-3 text-gray-700 analysis-page-ai-response" {...props} />
 ),
 p: ({node, ...props}) => (
 <p className="mb-4 leading-relaxed text-gray-800 text-[15px] analysis-page-ai-response" {...props} />
 ),
 strong: ({node, ...props}) => (
 <strong className="font-bold text-gray-900" {...props} />
 ),
 em: ({node, ...props}) => (
 <em className="italic text-gray-800" {...props} />
 ),
 ul: ({node, ...props}) => (
 <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-800" {...props} />
 ),
 ol: ({node, ...props}) => (
 <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-800" {...props} />
 ),
 li: ({node, ...props}) => (
 <li className="leading-relaxed text-gray-800 analysis-page-ai-response" {...props} />
 ),
 a: ({node, ...props}) => (
 <a
 {...props}
 className="text-blue-600 hover:text-blue-800 underline font-medium transition-colors"
 target="_blank"
 rel="noopener noreferrer"
 >
 </a>
 ),
 blockquote: ({node, ...props}) => (
 <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-50 text-gray-700 italic rounded-r analysis-page-ai-response" {...props} />
 ),
 code: ({node, inline, className, children, ...props}) => {
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
 pre: ({node, ...props}) => (
 <pre className="bg-gray-900 text-gray-100 p-4 rounded my-4 overflow-x-auto" {...props} />
 ),
 table: ({node, ...props}) => (
 <div className="my-6 rounded-lg border border-gray-300">
 <table className="min-w-full divide-y divide-gray-300" {...props} />
 </div>
 ),
 thead: ({node, ...props}) => (
 <thead className="bg-gray-100" {...props} />
 ),
 th: ({node, ...props}) => (
 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-300" {...props} />
 ),
 tbody: ({node, ...props}) => (
 <tbody className="bg-white divide-y divide-gray-200" {...props} />
 ),
 tr: ({node, ...props}) => (
 <tr className="hover:bg-gray-50 transition-colors" {...props} />
 ),
 td: ({node, ...props}) => (
 <td className="px-4 py-3 text-sm text-gray-800 border-b border-gray-200" {...props} />
 ),
 hr: ({node, ...props}) => (
 <hr className="my-6 border-t-2 border-gray-300" {...props} />
 ),
 img: ({node, ...props}) => (
 <img className="max-w-full h-auto rounded-lg shadow-md my-4" alt="" {...props} />
 ),
 };

 const isGenerating = isAnimatingResponse || isLoading || isGeneratingInsights;

 return (
<div className="w-3/5 flex flex-col h-full bg-gray-50 relative">
 <style>{`
   .response-scroll-container {
    overflow-y: auto;
    overflow-x: hidden;
     scrollbar-width: thin;
   }
  .horizontal-scroll-container {
    overflow-x: auto;
    overflow-y: visible;
  }
  .horizontal-scroll-container::-webkit-scrollbar {
    height: 0px;
   }
 `}</style>
 <div 
  className="flex-1 response-scroll-container" 
  ref={responseRef}
 >
 {selectedMessageId && (currentResponse || animatedResponseContent) ? (
 <div className="px-6 py-6" ref={contentRef}>
 <div className="max-w-none" style={{ minWidth: 'fit-content' }}>
 {/* Header Section */}
 <div className="mb-6 pb-4 border-b border-gray-200 bg-white rounded-lg p-4 shadow-sm">
 <div className="flex items-center justify-between mb-3">
 <h2 className="text-xl font-semibold text-gray-900 flex items-center">
 <Bot className="h-5 w-5 mr-2 text-blue-600" />
 AI Response
 </h2>
 <div className="flex items-center space-x-2 text-sm text-gray-500">
 <button
 onClick={handleCopyResponse}
 className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
 title="Copy AI Response"
 >
 <Copy className="h-4 w-4 mr-1" />
 Copy
 </button>
 <button
 onClick={handleDownloadPdf}
 className="flex items-center px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
 title="Download AI Response as PDF"
 >
 <Download className="h-4 w-4 mr-1" />
 PDF
 </button>
 {messages.find(msg => msg.id === selectedMessageId)?.timestamp && (
 <span>{formatDate(messages.find(msg => msg.id === selectedMessageId).timestamp)}</span>
 )}
 {messages.find(msg => msg.id === selectedMessageId)?.session_id && (
 <>
 <span>•</span>
 <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
 {messages.find(msg => msg.id === selectedMessageId).session_id.split('-')[1]?.substring(0, 6) || 'N/A'}
 </span>
 </>
 )}
 </div>
 </div>
 
 {/* Question Display */}
 <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-500">
 <p className="text-sm font-medium text-blue-900 mb-1 flex items-center">
 <MessageSquare className="h-4 w-4 mr-1" />
 Question:
 </p>
 <p className="text-sm text-blue-800 leading-relaxed">
 {messages.find(msg => msg.id === selectedMessageId)?.question || 'No question available'}
 </p>
 </div>

 {/* Skip Animation Button */}
 {isAnimatingResponse && (
 <div className="mt-3 flex justify-end">
 <button
 onClick={() => showResponseImmediately(currentResponse)}
 className="text-xs text-blue-600 hover:text-blue-800 flex items-center space-x-1 transition-colors"
 >
 <span>Skip animation</span>
 <ArrowRight className="h-3 w-3" />
 </button>
 </div>
 )}
 </div>

 {/* Response Content with Enhanced Markdown Rendering */}
<div className="bg-white rounded-lg shadow-sm p-6">
<div
 className="horizontal-scroll-container"
 ref={horizontalScrollRef}
>
<div className="prose prose-gray prose-lg max-w-none" ref={markdownOutputRef} style={{ minWidth: 'fit-content' }}>
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
 <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse"></span>
 </span>
 )}
 </div>
</div>
 </div>
 </div>
 </div>
 ) : (
 <div className="flex items-center justify-center h-full">
 <div className="text-center max-w-md px-6">
 <div className="bg-white rounded-full p-6 inline-block mb-6 shadow-lg">
 <MessageSquare className="h-16 w-16 text-blue-500" />
 </div>
 <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
 <p className="text-gray-600 text-lg leading-relaxed">
 Click on any question from the left panel to view the AI response here.
 </p>
 </div>
 </div>
 )}
 </div>
 
 {/* Sticky Horizontal Scrollbar - Outside scrollable container to stay fixed */}
 {scrollbarWidth > 0 && (
 <div 
 ref={stickyScrollbarRef}
 className="overflow-x-auto overflow-y-hidden bg-gray-100 border-t border-gray-300 z-10 flex-shrink-0"
 style={{ 
 height: '17px',
 scrollbarWidth: 'thin',
 scrollbarColor: '#9CA3AF #E5E7EB',
 WebkitOverflowScrolling: 'touch'
 }}
 >
 <div style={{ width: `${scrollbarWidth}px`, height: '1px' }}></div>
 </div>
 )}
 </div>
 );
};

export default ChatResponsePanel;