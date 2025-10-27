// import React, { useState } from 'react';
// import { BookOpen, ChevronDown } from 'lucide-react';

// const ChatInput = ({
//   onSendMessage,
//   disabled,
//   activeDropdown,
//   setActiveDropdown,
//   showDropdown,
//   setShowDropdown,
//   secrets,
//   isLoadingSecrets,
//   selectedSecretId,
//   handleDropdownSelect,
//   isSecretPromptSelected,
//   setIsSecretPromptSelected,
//   handleChatInputChange,
//   dropdownRef,
// }) => {
//   const [message, setMessage] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (isSecretPromptSelected && selectedSecretId) {
//       onSendMessage('', true); // Send empty message, signal it's a secret prompt
//     } else if (message.trim() && !disabled) {
//       onSendMessage(message, false);
//       setMessage('');
//     }
//   };

//   const onMessageChange = (e) => {
//     setMessage(e.target.value);
//     handleChatInputChange(); // Notify parent about chat input change
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex items-center space-x-3 bg-white rounded-xl border border-gray-200 px-4 py-3 focus-within:border-blue-300 focus-within:shadow-sm">
//       {/* Analysis Dropdown */}
//       <div className="relative flex-shrink-0" ref={dropdownRef}>
//         <button
//           type="button"
//           onClick={() => setShowDropdown(!showDropdown)}
//           disabled={disabled || isLoadingSecrets}
//           className="flex items-center space-x-2 px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <BookOpen className="h-3.5 w-3.5" />
//           <span>{isLoadingSecrets ? 'Loading...' : activeDropdown}</span>
//           <ChevronDown className="h-3.5 w-3.5" />
//         </button>

//         {showDropdown && !isLoadingSecrets && (
//           <div className="absolute bottom-full left-0 mb-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
//             {secrets.length > 0 ? (
//               secrets.map((secret) => (
//                 <button
//                   key={secret.id}
//                   type="button"
//                   onClick={() => handleDropdownSelect(secret.name, secret.id)}
//                   className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
//                 >
//                   {secret.name}
//                 </button>
//               ))
//             ) : (
//               <div className="px-4 py-2.5 text-sm text-gray-500">
//                 No analysis prompts available
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <input
//         type="text"
//         className="flex-grow bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-sm font-medium py-1 min-w-0"
//         value={message}
//         onChange={onMessageChange}
//         placeholder={disabled ? "Select a folder to chat" : "Ask a question about the documents..."}
//         disabled={disabled || isSecretPromptSelected}
//       />
//       <button
//         type="submit"
//         className="p-1.5 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white rounded-lg transition-colors flex-shrink-0"
//         disabled={disabled || (!message.trim() && !isSecretPromptSelected)}
//       >
//         Send
//       </button>
//     </form>
//   );
// };

// export default ChatInput;





import React, { useState, useEffect, useContext, useRef } from "react";
import { FileManagerContext } from "../../context/FileManagerContext";
import documentApi from "../../services/documentApi";
import {
 Search,
 BookOpen,
 ChevronDown,
 MoreVertical,
 MessageSquare,
 Loader2,
 Send,
 Bot,
 X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SidebarContext } from "../../context/SidebarContext";

const ChatInterface = () => {
 const {
 selectedFolder,
 setChatSessions,
 selectedChatSessionId,
 setSelectedChatSessionId,
 setHasAiResponse,
 } = useContext(FileManagerContext);
 const { setForceSidebarCollapsed } = useContext(SidebarContext);

 const [currentChatHistory, setCurrentChatHistory] = useState([]);
 const [loadingChat, setLoadingChat] = useState(false);
 const [chatError, setChatError] = useState(null);

 const [chatInput, setChatInput] = useState("");
 const [currentResponse, setCurrentResponse] = useState("");
 const [animatedResponseContent, setAnimatedResponseContent] = useState("");
 const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
 const [selectedMessageId, setSelectedMessageId] = useState(null);
 const [hasResponse, setHasResponse] = useState(false);

 // Secret prompt states
 const [secrets, setSecrets] = useState([]);
 const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
 const [selectedSecretId, setSelectedSecretId] = useState(null);
 const [selectedLlmName, setSelectedLlmName] = useState(null);
 const [activeDropdown, setActiveDropdown] = useState("Custom Query");
 const [showDropdown, setShowDropdown] = useState(false);
 const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);

 const responseRef = useRef(null);
 const dropdownRef = useRef(null);

 const API_BASE_URL = "http://localhost:5000";

 const getAuthToken = () => {
 const tokenKeys = [
 "authToken", "token", "accessToken", "jwt", "bearerToken",
 "auth_token", "access_token", "api_token", "userToken",
 ];
 for (const key of tokenKeys) {
 const token = localStorage.getItem(key);
 if (token) return token;
 }
 return null;
 };

 // Fetch secrets list
 const fetchSecrets = async () => {
 try {
 setIsLoadingSecrets(true);
 setChatError(null);

 const token = getAuthToken();
 const headers = { "Content-Type": "application/json" };
 if (token) headers["Authorization"] = `Bearer ${token}`;

 const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=false`, {
 method: "GET",
 headers,
 });

 if (!response.ok) {
 throw new Error(`Failed to fetch secrets: ${response.status}`);
 }

 const secretsData = await response.json();
 console.log('[ChatInterface] Fetched secrets:', secretsData);
 setSecrets(secretsData || []);

 if (secretsData && secretsData.length > 0) {
 setActiveDropdown(secretsData[0].name);
 setSelectedSecretId(secretsData[0].id);
 setSelectedLlmName(secretsData[0].llm_name);
 setIsSecretPromptSelected(true);
 }
 } catch (error) {
 console.error("Error fetching secrets:", error);
 setChatError(`Failed to load analysis prompts: ${error.message}`);
 } finally {
 setIsLoadingSecrets(false);
 }
 };

 // Fetch chat history
 const fetchChatHistory = async (sessionId) => {
 if (!selectedFolder) return;

 setLoadingChat(true);
 setChatError(null);

 try {
 let data = await documentApi.getFolderChats(selectedFolder);
 const chats = Array.isArray(data.chats) ? data.chats : [];
 setCurrentChatHistory(chats);

 if (sessionId) {
 setSelectedChatSessionId(sessionId);
 const selectedChat = chats.find((c) => c.id === sessionId);
 if (selectedChat) {
 const responseText =
 selectedChat.response ||
 selectedChat.answer ||
 selectedChat.message ||
 "";
 setCurrentResponse(responseText);
 setAnimatedResponseContent(responseText);
 setSelectedMessageId(selectedChat.id);
 setHasResponse(true);
 setHasAiResponse(true);
 setForceSidebarCollapsed(true);
 }
 } else {
 setHasResponse(false);
 setHasAiResponse(false);
 setForceSidebarCollapsed(false);
 }
 } catch (err) {
 console.error("❌ Error fetching chats:", err);
 setChatError("Failed to fetch chat history.");
 } finally {
 setLoadingChat(false);
 }
 };

 // Animate typing effect
 const animateResponse = (text) => {
 setAnimatedResponseContent("");
 setIsAnimatingResponse(true);
 let i = 0;
 const interval = setInterval(() => {
 if (i < text.length) {
 setAnimatedResponseContent((prev) => prev + text.charAt(i));
 i++;
 if (responseRef.current) {
 responseRef.current.scrollTop = responseRef.current.scrollHeight;
 }
 } else {
 clearInterval(interval);
 setIsAnimatingResponse(false);
 }
 }, 20);
 };

 // ✅ FIXED: Handle new message - Send ONLY secret_id for secret prompts
 const handleNewMessage = async () => {
 if (!selectedFolder) return;

 setLoadingChat(true);
 setChatError(null);

 try {
 let response;

 // CASE 1: Secret Prompt - Send ONLY the secret_id
 if (isSecretPromptSelected && selectedSecretId) {
 console.log('[ChatInterface] Sending SECRET PROMPT:', {
 secretId: selectedSecretId,
 llmName: selectedLlmName,
 promptLabel: activeDropdown,
 additionalInput: chatInput.trim()
 });

 // ✅ CRITICAL FIX: Don't send the actual prompt content!
 // Backend will fetch it from Secret Manager using the secret_id
 response = await documentApi.queryFolderDocuments(
 selectedFolder,
 '', // ✅ Empty string for secret prompts
 selectedChatSessionId,
 {
 secret_id: selectedSecretId, // ✅ Send only the ID
 llm_name: selectedLlmName, // ✅ Optional LLM override
 prompt_label: activeDropdown, // ✅ For display purposes
 additional_input: chatInput.trim() || '' // ✅ Optional user details
 }
 );

 setChatInput('');
 setIsSecretPromptSelected(false);
 setActiveDropdown('Custom Query');
 }
 // CASE 2: Custom Query - Send the actual question
 else {
 if (!chatInput.trim()) {
 setChatError('Please enter a question.');
 setLoadingChat(false);
 return;
 }

 console.log('[ChatInterface] Sending CUSTOM QUERY:', {
 question: chatInput.trim(),
 llmName: selectedLlmName
 });

 response = await documentApi.queryFolderDocuments(
 selectedFolder,
 chatInput.trim(), // ✅ Send the actual question
 selectedChatSessionId,
 {
 llm_name: selectedLlmName || undefined // ✅ Optional LLM
 }
 );

 setChatInput('');
 }

 // Handle response
 if (response.session_id || response.sessionId) {
 setSelectedChatSessionId(response.session_id || response.sessionId);
 }

 // Update chat history
 const history = Array.isArray(response.chatHistory)
 ? response.chatHistory
 : [];
 
 if (history.length > 0) {
 setCurrentChatHistory(history);
 const latestMessage = history[history.length - 1];
 const responseText =
 latestMessage.response ||
 latestMessage.answer ||
 latestMessage.message ||
 response.answer ||
 response.response ||
 "";
 
 setCurrentResponse(responseText);
 setSelectedMessageId(latestMessage.id);
 setHasResponse(true);
 setHasAiResponse(true);
 setForceSidebarCollapsed(true);
 animateResponse(responseText);
 } else if (response.answer || response.response) {
 // If no history returned, use direct response
 const responseText = response.answer || response.response;
 setCurrentResponse(responseText);
 setHasResponse(true);
 setHasAiResponse(true);
 setForceSidebarCollapsed(true);
 animateResponse(responseText);
 
 // Refresh chat history
 await fetchChatHistory(response.session_id || response.sessionId);
 }

 } catch (err) {
 console.error('[ChatInterface] Error:', err);
 setChatError(
 `Failed to send message: ${err.response?.data?.details || err.message}`
 );
 } finally {
 setLoadingChat(false);
 }
 };

 // Handle selecting a chat
 const handleSelectChat = (chat) => {
 setSelectedMessageId(chat.id);
 const responseText = chat.response || chat.answer || chat.message || "";
 setCurrentResponse(responseText);
 setAnimatedResponseContent(responseText);
 setIsAnimatingResponse(false);
 setHasResponse(true);
 setHasAiResponse(true);
 setForceSidebarCollapsed(true);
 };

 // Handle new chat
 const handleNewChat = () => {
 setCurrentChatHistory([]);
 setSelectedChatSessionId(null);
 setHasResponse(false);
 setHasAiResponse(false);
 setForceSidebarCollapsed(false);
 setChatInput("");
 setSelectedMessageId(null);
 setCurrentResponse("");
 setAnimatedResponseContent("");
 setIsSecretPromptSelected(false);
 setSelectedSecretId(null);
 setSelectedLlmName(null);
 
 // Reset to first secret as default
 if (secrets.length > 0) {
 setActiveDropdown(secrets[0].name);
 setSelectedSecretId(secrets[0].id);
 setSelectedLlmName(secrets[0].llm_name);
 setIsSecretPromptSelected(true);
 }
 };

 // Handle dropdown selection
 const handleDropdownSelect = (secretName, secretId, llmName) => {
 console.log('[ChatInterface] Selected secret:', secretName, secretId, 'LLM:', llmName);
 setActiveDropdown(secretName);
 setSelectedSecretId(secretId);
 setSelectedLlmName(llmName);
 setIsSecretPromptSelected(true);
 setChatInput("");
 setShowDropdown(false);
 };

 // Handle custom input change
 const handleChatInputChange = (e) => {
 setChatInput(e.target.value);
 };

 // Format time
 const getRelativeTime = (dateString) => {
 const date = new Date(dateString);
 const now = new Date();
 const diffInSeconds = Math.floor((now - date) / 1000);

 if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
 if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
 if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
 return `${Math.floor(diffInSeconds / 86400)}d ago`;
 };

 const formatDate = (dateString) => {
 try {
 return new Date(dateString).toLocaleString();
 } catch (e) {
 return 'Invalid date';
 }
 };

 useEffect(() => {
 const handleClickOutside = (event) => {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
 setShowDropdown(false);
 }
 };
 document.addEventListener("mousedown", handleClickOutside);
 return () => document.removeEventListener("mousedown", handleClickOutside);
 }, []);

 useEffect(() => {
 fetchSecrets();
 }, []);

 useEffect(() => {
 setChatSessions([]);
 setCurrentChatHistory([]);
 setSelectedChatSessionId(null);
 setHasResponse(false);
 setHasAiResponse(false);
 setForceSidebarCollapsed(false);

 if (selectedFolder && selectedFolder !== "Test") {
 fetchChatHistory();
 }
 }, [selectedFolder]);

 if (!selectedFolder) {
 return (
 <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-white">
 Select a folder to start chatting.
 </div>
 );
 }

 return (
 <div className="flex h-screen bg-white">
 {/* Left Panel */}
 <div className={`${hasResponse ? 'w-1/2' : 'w-full'} border-r border-gray-200 flex flex-col bg-white h-full`}>
 <div className="p-4 border-b border-gray-200 flex-shrink-0">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
 <button
 onClick={handleNewChat}
 className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
 >
 New Chat
 </button>
 </div>
 <div className="relative mb-4">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
 <input
 type="text"
 placeholder="Search questions..."
 className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
 />
 </div>
 </div>

 <div className="flex-1 overflow-y-auto px-4 py-2">
 <div className="space-y-2">
 {currentChatHistory.map((chat) => (
 <div
 key={chat.id}
 onClick={() => handleSelectChat(chat)}
 className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
 selectedMessageId === chat.id
 ? "bg-blue-50 border-blue-200"
 : "bg-white border-gray-200 hover:bg-gray-50"
 }`}
 >
 <div className="flex items-start justify-between">
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
 {chat.question || chat.query || "Untitled"}
 </p>
 <p className="text-xs text-gray-500">
 {getRelativeTime(chat.created_at || chat.timestamp)}
 </p>
 </div>
 <MoreVertical className="h-5 w-5 text-gray-400" />
 </div>
 </div>
 ))}

 {currentChatHistory.length === 0 && !loadingChat && (
 <div className="text-center py-12">
 <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
 <p className="text-gray-500">No chats yet. Start a conversation!</p>
 </div>
 )}

 {loadingChat && currentChatHistory.length === 0 && (
 <div className="flex justify-center py-8">
 <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
 </div>
 )}
 </div>
 </div>

 {/* Input Area */}
 <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
 <div className="bg-gray-50 rounded-xl border border-gray-200 p-3">
 <input
 type="text"
 placeholder={
 isSecretPromptSelected 
 ? `Add optional details for ${activeDropdown}...`
 : "Ask a question..."
 }
 value={chatInput}
 onChange={handleChatInputChange}
 onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleNewMessage()}
 className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent mb-2"
 disabled={loadingChat}
 />

 <div className="flex items-center justify-between">
 <div className="relative" ref={dropdownRef}>
 <button
 onClick={() => setShowDropdown(!showDropdown)}
 disabled={isLoadingSecrets || loadingChat}
 className="flex items-center space-x-2 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
 >
 <BookOpen className="h-3.5 w-3.5" />
 <span>{isLoadingSecrets ? 'Loading...' : activeDropdown}</span>
 <ChevronDown className="h-3.5 w-3.5" />
 </button>

 {showDropdown && !isLoadingSecrets && (
 <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-60 overflow-y-auto">
 {secrets.map((secret) => (
 <button
 key={secret.id}
 onClick={() => handleDropdownSelect(secret.name, secret.id, secret.llm_name)}
 className="w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 first:rounded-t-lg last:rounded-b-lg"
 >
 <div className="font-medium">{secret.name}</div>
 {secret.llm_name && (
 <div className="text-xs text-gray-500">Model: {secret.llm_name}</div>
 )}
 </button>
 ))}
 </div>
 )}
 </div>

 <button
 onClick={handleNewMessage}
 disabled={loadingChat || (!chatInput.trim() && !isSecretPromptSelected)}
 className="p-2 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-300 text-white rounded-lg transition-colors"
 >
 {loadingChat ? (
 <Loader2 className="h-4 w-4 animate-spin" />
 ) : (
 <Send className="h-4 w-4" />
 )}
 </button>
 </div>
 </div>

 {isSecretPromptSelected && (
 <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
 <div className="flex items-center space-x-2 text-xs text-blue-800">
 <Bot className="h-3.5 w-3.5" />
 <span>Using: <strong>{activeDropdown}</strong></span>
 {selectedLlmName && <span>• {selectedLlmName}</span>}
 <button
 onClick={() => {
 setIsSecretPromptSelected(false);
 setActiveDropdown('Custom Query');
 }}
 className="ml-auto text-blue-600 hover:text-blue-800"
 >
 <X className="h-3.5 w-3.5" />
 </button>
 </div>
 </div>
 )}

 {chatError && (
 <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs">
 {chatError}
 </div>
 )}
 </div>
 </div>

 {/* Right Panel */}
 {hasResponse && selectedMessageId && (
 <div className="w-1/2 flex flex-col h-full">
 <div className="flex-1 overflow-y-auto p-6" ref={responseRef}>
 {currentResponse || animatedResponseContent ? (
 <div>
 <div className="mb-6 pb-4 border-b border-gray-200">
 <h2 className="text-xl font-semibold text-gray-900 mb-3">AI Response</h2>
 <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
 <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
 <p className="text-sm text-blue-800">
 {currentChatHistory.find(m => m.id === selectedMessageId)?.question || 'N/A'}
 </p>
 </div>
 </div>
 <div className="prose prose-gray max-w-none">
 <ReactMarkdown remarkPlugins={[remarkGfm]}>
 {animatedResponseContent || currentResponse}
 </ReactMarkdown>
 {isAnimatingResponse && (
 <span className="inline-block w-2 h-5 bg-blue-600 animate-pulse ml-1"></span>
 )}
 </div>
 </div>
 ) : (
 <div className="flex items-center justify-center h-full">
 <div className="text-center">
 <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
 <h3 className="text-xl font-semibold mb-2 text-gray-900">Select a Question</h3>
 <p className="text-gray-600">Click a question to view the response</p>
 </div>
 </div>
 )}
 </div>
 </div>
 )}
 </div>
 );
};

export default ChatInterface;