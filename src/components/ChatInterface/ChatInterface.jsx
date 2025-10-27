



// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import apiService from "../../services/api";
// import {
//   BookOpen,
//   ChevronDown,
//   Send,
//   Loader2,
//   MessageSquare,
//   Search,
//   ChevronRight,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";
// import ChatCardList from "./ChatCardList"; // ✅ Card list

// const ChatInterface = () => {
//   const {
//     selectedFolder,
//     setChatSessions,
//     selectedChatSessionId,
//     setSelectedChatSessionId,
//     setHasAiResponse,
//   } = useContext(FileManagerContext);
//   const { setForceSidebarCollapsed } = useContext(SidebarContext);

//   const [currentChatHistory, setCurrentChatHistory] = useState([]);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [chatError, setChatError] = useState(null);

//   const [chatInput, setChatInput] = useState("");
//   const [currentResponse, setCurrentResponse] = useState("");
//   const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//   const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//   const [selectedMessageId, setSelectedMessageId] = useState(null);
//   const [hasResponse, setHasResponse] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const responseRef = useRef(null);

//   // 🔹 Fetch chat history
//   const fetchChatHistory = async (sessionId) => {
//     if (!selectedFolder) return;

//     setLoadingChat(true);
//     setChatError(null);

//     try {
//       let data = await documentApi.getFolderChats(selectedFolder);
//       const chats = Array.isArray(data.chats) ? data.chats : [];
//       setCurrentChatHistory(chats);

//       if (sessionId) {
//         setSelectedChatSessionId(sessionId);
//         const selectedChat = chats.find((c) => c.id === sessionId);
//         if (selectedChat) {
//           const responseText =
//             selectedChat.response ||
//             selectedChat.answer ||
//             selectedChat.message ||
//             "";
//           setCurrentResponse(responseText);
//           setAnimatedResponseContent(responseText);
//           setSelectedMessageId(selectedChat.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         } else if (selectedFolder === 'Test' && chats.length > 0) { // If Test folder has chats, enable input
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         }
//       } else {
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching chats:", err);
//       setChatError("Failed to fetch chat history.");
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // 🔹 Animate typing effect
//   const animateResponse = (text) => {
//     setAnimatedResponseContent("");
//     setIsAnimatingResponse(true);
//     let i = 0;
//     const interval = setInterval(() => {
//       if (i < text.length) {
//         setAnimatedResponseContent((prev) => prev + text.charAt(i));
//         i++;
//         if (responseRef.current) {
//           responseRef.current.scrollTop = responseRef.current.scrollHeight;
//         }
//       } else {
//         clearInterval(interval);
//         setIsAnimatingResponse(false);
//       }
//     }, 20);
//   };

//   // 🔹 Handle new message
//   const handleNewMessage = async () => {
//     if (!selectedFolder || !chatInput.trim()) return;

//     setLoadingChat(true);
//     setChatError(null);

//     try {
//       const response = await documentApi.queryFolderDocuments(
//         selectedFolder,
//         chatInput,
//         selectedChatSessionId
//       );

//       if (response.sessionId) {
//         setSelectedChatSessionId(response.sessionId);
//       }

//       const history = Array.isArray(response.chatHistory)
//         ? response.chatHistory
//         : [];
//       setCurrentChatHistory(history);

//       if (history.length > 0) {
//         const latestMessage = history[history.length - 1];
//         const responseText =
//           latestMessage.response ||
//           latestMessage.answer ||
//           latestMessage.message ||
//           "";
//         setCurrentResponse(responseText);
//         setSelectedMessageId(latestMessage.id);
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//         animateResponse(responseText);
//       }
//       setChatInput("");
//     } catch (err) {
//       setChatError(
//         `Failed to send message: ${err.response?.data?.details || err.message}`
//       );
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // 🔹 Handle selecting a chat from ChatCardList
//   const handleSelectChat = (chatId) => {
//     fetchChatHistory(chatId);
//   };

//   useEffect(() => {
//     setChatSessions([]);
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);

//     if (selectedFolder && selectedFolder !== 'Test') { // Only fetch history for non-Test folders here
//       fetchChatHistory();
//     }
//     // For 'Test' folder, ChatCardList will handle its own fetching
//   }, [selectedFolder]);

//   if (!selectedFolder) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//         Select a folder to start chatting.
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-full bg-white">
//       {/* Left panel */}
//       <div className="w-1/2 border-r border-gray-200 flex flex-col">
//         {/* Header */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Chats</h2>
//             <button
//               type="button"
//               onClick={() => {
//                 setCurrentChatHistory([]);
//                 setSelectedChatSessionId(null);
//                 setHasResponse(false);
//                 setHasAiResponse(false);
//                 setForceSidebarCollapsed(false);
//                 setChatInput("");
//               }}
//               className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <MessageSquare className="h-4 w-4" />
//               <span>New Chat</span>
//             </button>
//           </div>

//           {/* Search bar */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search chats..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>

//         {/* Chat list */}
//         <div className="flex-1 overflow-y-auto px-4 py-2">
//           <ChatCardList
//             folderName={selectedFolder}
//             onSelectChat={handleSelectChat}
//           />
//         </div>

//         {/* Chat input */}
//         <div className="border-t border-gray-200 p-4">
//           <div className="flex items-center space-x-3 bg-gray-50 rounded-xl border border-gray-200 px-4 py-3">
//             <input
//               type="text"
//               value={chatInput}
//               onChange={(e) => setChatInput(e.target.value)}
//               placeholder="Ask a question..."
//               className="flex-1 bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 text-sm font-medium"
//               disabled={loadingChat}
//             />
//             <button
//               type="button"
//               onClick={handleNewMessage}
//               disabled={loadingChat || !chatInput.trim()}
//               className="p-1.5 bg-black hover:bg-gray-800 disabled:bg-gray-300 text-white rounded-lg transition-colors"
//             >
//               {loadingChat ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Send className="h-4 w-4" />
//               )}
//             </button>
//           </div>
//           {chatError && (
//             <div className="mt-2 p-2 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
//               {chatError}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right panel (AI response) */}
//       <div className="w-1/2 flex flex-col">
//         <div className="flex-1 overflow-y-auto p-6" ref={responseRef}>
//           {selectedMessageId && currentResponse ? (
//             <div className="max-w-none">
//               <div className="mb-6 pb-4 border-b border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   AI Response
//                 </h2>
//               </div>
//               <div className="prose prose-gray max-w-none">
//                 <ReactMarkdown
//                   remarkPlugins={[remarkGfm]}
//                   components={{
//                     h1: (props) => (
//                       <h1
//                         className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2"
//                         {...props}
//                       />
//                     ),
//                     h2: (props) => (
//                       <h2
//                         className="text-xl font-bold mb-4 mt-6 text-black"
//                         {...props}
//                       />
//                     ),
//                     p: (props) => (
//                       <p
//                         className="mb-4 leading-relaxed text-black text-justify"
//                         {...props}
//                       />
//                     ),
//                   }}
//                 >
//                   {animatedResponseContent || currentResponse}
//                 </ReactMarkdown>
//                 {isAnimatingResponse && (
//                   <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center justify-center h-full">
//               <div className="text-center max-w-md">
//                 <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
//                 <h3 className="text-2xl font-semibold mb-4 text-gray-900">
//                   {selectedFolder === 'Test' ? 'No chat selected' : 'Select a chat'}
//                 </h3>
//                 <p className="text-gray-600 text-lg">
//                   {selectedFolder === 'Test' ? 'Select a chat from the list on the left.' : 'Click a chat from the left to view the response.'}
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatInterface;
// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//   Plus,
//   Shuffle,
//   Search,
//   BookOpen,
//   ChevronDown,
//   ChevronRight,
//   MoreVertical,
//   MessageSquare,
//   Loader2,
//   Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";

// const ChatInterface = () => {
//   const {
//     selectedFolder,
//     setChatSessions,
//     selectedChatSessionId,
//     setSelectedChatSessionId,
//     setHasAiResponse,
//   } = useContext(FileManagerContext);
//   const { setForceSidebarCollapsed } = useContext(SidebarContext);

//   const [currentChatHistory, setCurrentChatHistory] = useState([]);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [chatError, setChatError] = useState(null);

//   const [chatInput, setChatInput] = useState("");
//   const [currentResponse, setCurrentResponse] = useState("");
//   const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//   const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//   const [selectedMessageId, setSelectedMessageId] = useState(null);
//   const [hasResponse, setHasResponse] = useState(false);

//   // Secret prompt states
//   const [secrets, setSecrets] = useState([]);
//   const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
//   const [selectedSecretId, setSelectedSecretId] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState("Summary");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);

//   const responseRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // API Configuration
//   const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";

//   const getAuthToken = () => {
//     const tokenKeys = [
//       "authToken",
//       "token",
//       "accessToken",
//       "jwt",
//       "bearerToken",
//       "auth_token",
//       "access_token",
//       "api_token",
//       "userToken",
//     ];

//     for (const key of tokenKeys) {
//       const token = localStorage.getItem(key);
//       if (token) {
//         return token;
//       }
//     }
//     return null;
//   };

//   // 🔹 Fetch secrets list
//   const fetchSecrets = async () => {
//     try {
//       setIsLoadingSecrets(true);
//       setChatError(null);

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
//         method: "GET",
//         headers,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secrets: ${response.status}`);
//       }

//       const secretsData = await response.json();
//       setSecrets(secretsData || []);

//       if (secretsData && secretsData.length > 0) {
//         setActiveDropdown(secretsData[0].name);
//         setSelectedSecretId(secretsData[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching secrets:", error);
//       setChatError(`Failed to load analysis prompts: ${error.message}`);
//     } finally {
//       setIsLoadingSecrets(false);
//     }
//   };

//   // 🔹 Fetch secret value by ID
//   const fetchSecretValue = async (secretId) => {
//     try {
//       const existingSecret = secrets.find((secret) => secret.id === secretId);
//       if (existingSecret && existingSecret.value) {
//         return existingSecret.value;
//       }

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(
//         `${API_BASE_URL}/files/secrets/${secretId}`,
//         {
//           method: "GET",
//           headers,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secret value: ${response.status}`);
//       }

//       const secretData = await response.json();
//       const promptValue =
//         secretData.value || secretData.prompt || secretData.content || secretData;

//       setSecrets((prevSecrets) =>
//         prevSecrets.map((secret) =>
//           secret.id === secretId ? { ...secret, value: promptValue } : secret
//         )
//       );

//       return promptValue || "";
//     } catch (error) {
//       console.error("Error fetching secret value:", error);
//       throw new Error("Failed to retrieve analysis prompt");
//     }
//   };

//   // 🔹 Fetch chat history
//   const fetchChatHistory = async (sessionId) => {
//     if (!selectedFolder) return;

//     setLoadingChat(true);
//     setChatError(null);

//     try {
//       let data = await documentApi.getFolderChats(selectedFolder);
//       const chats = Array.isArray(data.chats) ? data.chats : [];
//       setCurrentChatHistory(chats);

//       if (sessionId) {
//         setSelectedChatSessionId(sessionId);
//         const selectedChat = chats.find((c) => c.id === sessionId);
//         if (selectedChat) {
//           const responseText =
//             selectedChat.response ||
//             selectedChat.answer ||
//             selectedChat.message ||
//             "";
//           setCurrentResponse(responseText);
//           setAnimatedResponseContent(responseText);
//           setSelectedMessageId(selectedChat.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         } else if (selectedFolder === "Test" && chats.length > 0) {
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         }
//       } else {
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching chats:", err);
//       setChatError("Failed to fetch chat history.");
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // 🔹 Animate typing effect
//   const animateResponse = (text) => {
//     setAnimatedResponseContent("");
//     setIsAnimatingResponse(true);
//     let i = 0;
//     const interval = setInterval(() => {
//       if (i < text.length) {
//         setAnimatedResponseContent((prev) => prev + text.charAt(i));
//         i++;
//         if (responseRef.current) {
//           responseRef.current.scrollTop = responseRef.current.scrollHeight;
//         }
//       } else {
//         clearInterval(interval);
//         setIsAnimatingResponse(false);
//       }
//     }, 20);
//   };

//   // 🔹 Chat with AI using secret prompt
//   const chatWithAI = async (folder, secretId, currentSessionId) => {
//     try {
//       setLoadingChat(true);
//       setChatError(null);

//       const selectedSecret = secrets.find((s) => s.id === secretId);
//       if (!selectedSecret) {
//         throw new Error("No prompt found for selected analysis type");
//       }

//       let promptValue = selectedSecret.value;
//       const promptLabel = selectedSecret.name;

//       if (!promptValue) {
//         promptValue = await fetchSecretValue(secretId);
//       }

//       if (!promptValue) {
//         throw new Error("Secret prompt value is empty.");
//       }

//       const response = await documentApi.queryFolderDocuments(
//         folder,
//         promptValue,
//         currentSessionId,
//         {
//           used_secret_prompt: true,
//           prompt_label: promptLabel,
//         }
//       );

//       if (response.sessionId) {
//         setSelectedChatSessionId(response.sessionId);
//       }

//       const history = Array.isArray(response.chatHistory)
//         ? response.chatHistory
//         : [];
//       setCurrentChatHistory(history);

//       if (history.length > 0) {
//         const latestMessage = history[history.length - 1];
//         const responseText =
//           latestMessage.response ||
//           latestMessage.answer ||
//           latestMessage.message ||
//           "";
//         setCurrentResponse(responseText);
//         setSelectedMessageId(latestMessage.id);
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//         animateResponse(responseText);
//       }

//       return response;
//     } catch (error) {
//       setChatError(`Analysis failed: ${error.message}`);
//       throw error;
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // 🔹 Handle new message (combines regular chat and secret prompt)
//   const handleNewMessage = async () => {
//     if (!selectedFolder) return;

//     if (isSecretPromptSelected) {
//       if (!selectedSecretId) {
//         setChatError("Please select an analysis type.");
//         return;
//       }
//       try {
//         await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
//         setChatInput("");
//       } catch (error) {
//         // Error already handled
//       }
//     } else {
//       if (!chatInput.trim()) return;

//       setLoadingChat(true);
//       setChatError(null);

//       try {
//         const response = await documentApi.queryFolderDocuments(
//           selectedFolder,
//           chatInput,
//           selectedChatSessionId
//         );

//         if (response.sessionId) {
//           setSelectedChatSessionId(response.sessionId);
//         }

//         const history = Array.isArray(response.chatHistory)
//           ? response.chatHistory
//           : [];
//         setCurrentChatHistory(history);

//         if (history.length > 0) {
//           const latestMessage = history[history.length - 1];
//           const responseText =
//             latestMessage.response ||
//             latestMessage.answer ||
//             latestMessage.message ||
//             "";
//           setCurrentResponse(responseText);
//           setSelectedMessageId(latestMessage.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//           animateResponse(responseText);
//         }
//         setChatInput("");
//       } catch (err) {
//         setChatError(
//           `Failed to send message: ${err.response?.data?.details || err.message}`
//         );
//       } finally {
//         setLoadingChat(false);
//       }
//     }
//   };

//   // 🔹 Handle selecting a chat
//   const handleSelectChat = (chatId) => {
//     fetchChatHistory(chatId);
//   };

//   // 🔹 Handle new chat
//   const handleNewChat = () => {
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);
//     setChatInput("");
//     setSelectedMessageId(null);
//     setCurrentResponse("");
//     setIsSecretPromptSelected(false);
//   };

//   // 🔹 Handle dropdown selection
//   const handleDropdownSelect = (secretName, secretId) => {
//     setActiveDropdown(secretName);
//     setSelectedSecretId(secretId);
//     setIsSecretPromptSelected(true);
//     setChatInput("");
//     setShowDropdown(false);
//   };

//   // 🔹 Handle custom input change
//   const handleChatInputChange = (e) => {
//     setChatInput(e.target.value);
//     setIsSecretPromptSelected(false);
//     setActiveDropdown("Custom Query");
//   };

//   // 🔹 Format relative time
//   const getRelativeTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) return `Last message ${diffInSeconds} seconds ago`;
//     if (diffInSeconds < 3600)
//       return `Last message ${Math.floor(diffInSeconds / 60)} minutes ago`;
//     if (diffInSeconds < 86400)
//       return `Last message ${Math.floor(diffInSeconds / 3600)} hours ago`;
//     return `Last message ${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   // 🔹 Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // 🔹 Load secrets on mount
//   useEffect(() => {
//     fetchSecrets();
//   }, []);

//   useEffect(() => {
//     setChatSessions([]);
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);

//     if (selectedFolder && selectedFolder !== "Test") {
//       fetchChatHistory();
//     }
//   }, [selectedFolder]);

//   if (!selectedFolder) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//         Select a folder to start chatting.
//       </div>
//     );
//   }

//   return (
//     <div className="h-full bg-[#FDFCFB] overflow-hidden">
//       <div className="mx-auto h-full flex flex-col py-6 px-4">
//         {/* Top Search/Input Card */}
//         <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex-shrink-0">
//           <input
//             type="text"
//             placeholder="How can I help you today?"
//             value={chatInput}
//             onChange={handleChatInputChange}
//             onKeyPress={(e) => e.key === "Enter" && handleNewMessage()}
//             className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent mb-4"
//             disabled={loadingChat}
//           />

//           {/* Action Buttons Row */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={handleNewChat}
//                 className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
//                 title="New Chat"
//               >
//                 <Plus className="h-5 w-5 text-gray-600" />
//               </button>
//               <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Shuffle className="h-5 w-5 text-gray-600" />
//               </button>
//               <button className="flex items-center space-x-2 px-4 py-2.5 hover:bg-gray-100 rounded-lg transition-colors">
//                 <Search className="h-4 w-4 text-gray-600" />
//                 <span className="text-sm text-gray-700">Research</span>
//               </button>

//               {/* Analysis Dropdown */}
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   disabled={isLoadingSecrets || loadingChat}
//                   className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
//                 >
//                   <BookOpen className="h-4 w-4" />
//                   <span className="text-sm font-medium">
//                     {isLoadingSecrets ? "Loading..." : activeDropdown}
//                   </span>
//                   <ChevronDown className="h-4 w-4" />
//                 </button>

//                 {showDropdown && !isLoadingSecrets && (
//                   <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
//                     {secrets.length > 0 ? (
//                       secrets.map((secret) => (
//                         <button
//                           key={secret.id}
//                           onClick={() =>
//                             handleDropdownSelect(secret.name, secret.id)
//                           }
//                           className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
//                         >
//                           {secret.name}
//                         </button>
//                       ))
//                     ) : (
//                       <div className="px-4 py-2.5 text-sm text-gray-500">
//                         No analysis prompts available
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <button className="flex items-center space-x-1 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
//                 <span>Sonnet 4.5</span>
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//               <button
//                 onClick={handleNewMessage}
//                 disabled={
//                   loadingChat ||
//                   (!chatInput.trim() && !isSecretPromptSelected)
//                 }
//                 style={{ backgroundColor: '#1AA49B' }} className="p-2.5 hover:bg-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
//               >
//                 {loadingChat ? (
//                   <Loader2 className="h-5 w-5 text-white animate-spin" />
//                 ) : (
//                   <Send className="h-5 w-5 text-white" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Chat History List */}
//         <div className="flex-1 overflow-y-auto space-y-3 pb-4">
//           {currentChatHistory.map((chat) => (
//             <div
//               key={chat.id}
//               onClick={() => handleSelectChat(chat.id)}
//               className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-5 cursor-pointer transition-all hover:shadow-md hover:border-gray-300 ${
//                 selectedMessageId === chat.id
//                   ? "ring-2 ring-blue-500 border-blue-500"
//                   : ""
//               }`}
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h3 className="text-base font-semibold text-gray-900 mb-1">
//                     {chat.question || chat.query || "Untitled"}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {getRelativeTime(chat.created_at || chat.timestamp)}
//                   </p>
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                   }}
//                   className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <MoreVertical className="h-5 w-5 text-gray-400" />
//                 </button>
//               </div>
//             </div>
//           ))}

//           {currentChatHistory.length === 0 && !loadingChat && (
//             <div className="text-center py-12">
//               <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-gray-500">
//                 No chats yet. Start a conversation!
//               </p>
//             </div>
//           )}

//           {loadingChat && currentChatHistory.length === 0 && (
//             <div className="flex justify-center py-8">
//               <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//             </div>
//           )}
//         </div>

//         {/* Error Message */}
//         {chatError && (
//           <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm flex-shrink-0">
//             {chatError}
//           </div>
//         )}
//       </div>

//       {/* Modal Response View */}
//       {selectedMessageId && currentResponse && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
//             <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 AI Response
//               </h2>
//               <button
//                 onClick={() => {
//                   setSelectedMessageId(null);
//                   setCurrentResponse("");
//                 }}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6" ref={responseRef}>
//               <div className="prose prose-gray max-w-none">
//                 <ReactMarkdown
//                   remarkPlugins={[remarkGfm]}
//                   components={{
//                     h1: (props) => (
//                       <h1
//                         className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2"
//                         {...props}
//                       />
//                     ),
//                     h2: (props) => (
//                       <h2
//                         className="text-xl font-bold mb-4 mt-6 text-black"
//                         {...props}
//                       />
//                     ),
//                     p: (props) => (
//                       <p
//                         className="mb-4 leading-relaxed text-black"
//                         {...props}
//                       />
//                     ),
//                   }}
//                 >
//                   {animatedResponseContent || currentResponse}
//                 </ReactMarkdown>
//                 {isAnimatingResponse && (
//                   <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInterface;


// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//   Plus,
//   Shuffle,
//   Search,
//   BookOpen,
//   ChevronDown,
//   MoreVertical,
//   MessageSquare,
//   Loader2,
//   Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";

// const ChatInterface = () => {
//   const {
//     selectedFolder,
//     setChatSessions,
//     selectedChatSessionId,
//     setSelectedChatSessionId,
//     setHasAiResponse,
//   } = useContext(FileManagerContext);
//   const { setForceSidebarCollapsed } = useContext(SidebarContext);

//   const [currentChatHistory, setCurrentChatHistory] = useState([]);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [chatError, setChatError] = useState(null);

//   const [chatInput, setChatInput] = useState("");
//   const [currentResponse, setCurrentResponse] = useState("");
//   const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//   const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//   const [selectedMessageId, setSelectedMessageId] = useState(null);
//   const [hasResponse, setHasResponse] = useState(false);

//   // Secret prompt states
//   const [secrets, setSecrets] = useState([]);
//   const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
//   const [selectedSecretId, setSelectedSecretId] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState("Summary");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);

//   const responseRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // API Configuration
//   const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";

//   const getAuthToken = () => {
//     const tokenKeys = [
//       "authToken",
//       "token",
//       "accessToken",
//       "jwt",
//       "bearerToken",
//       "auth_token",
//       "access_token",
//       "api_token",
//       "userToken",
//     ];

//     for (const key of tokenKeys) {
//       const token = localStorage.getItem(key);
//       if (token) {
//         return token;
//       }
//     }
//     return null;
//   };

//   // Fetch secrets list
//   const fetchSecrets = async () => {
//     try {
//       setIsLoadingSecrets(true);
//       setChatError(null);

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
//         method: "GET",
//         headers,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secrets: ${response.status}`);
//       }

//       const secretsData = await response.json();
//       setSecrets(secretsData || []);

//       if (secretsData && secretsData.length > 0) {
//         setActiveDropdown(secretsData[0].name);
//         setSelectedSecretId(secretsData[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching secrets:", error);
//       setChatError(`Failed to load analysis prompts: ${error.message}`);
//     } finally {
//       setIsLoadingSecrets(false);
//     }
//   };

//   // Fetch secret value by ID
//   const fetchSecretValue = async (secretId) => {
//     try {
//       const existingSecret = secrets.find((secret) => secret.id === secretId);
//       if (existingSecret && existingSecret.value) {
//         return existingSecret.value;
//       }

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(
//         `${API_BASE_URL}/files/secrets/${secretId}`,
//         {
//           method: "GET",
//           headers,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secret value: ${response.status}`);
//       }

//       const secretData = await response.json();
//       const promptValue =
//         secretData.value || secretData.prompt || secretData.content || secretData;

//       setSecrets((prevSecrets) =>
//         prevSecrets.map((secret) =>
//           secret.id === secretId ? { ...secret, value: promptValue } : secret
//         )
//       );

//       return promptValue || "";
//     } catch (error) {
//       console.error("Error fetching secret value:", error);
//       throw new Error("Failed to retrieve analysis prompt");
//     }
//   };

//   // Fetch chat history
//   const fetchChatHistory = async (sessionId) => {
//     if (!selectedFolder) return;

//     setLoadingChat(true);
//     setChatError(null);

//     try {
//       let data = await documentApi.getFolderChats(selectedFolder);
//       const chats = Array.isArray(data.chats) ? data.chats : [];
//       setCurrentChatHistory(chats);

//       if (sessionId) {
//         setSelectedChatSessionId(sessionId);
//         const selectedChat = chats.find((c) => c.id === sessionId);
//         if (selectedChat) {
//           const responseText =
//             selectedChat.response ||
//             selectedChat.answer ||
//             selectedChat.message ||
//             "";
//           setCurrentResponse(responseText);
//           setAnimatedResponseContent(responseText);
//           setSelectedMessageId(selectedChat.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         } else if (selectedFolder === "Test" && chats.length > 0) {
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         }
//       } else {
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching chats:", err);
//       setChatError("Failed to fetch chat history.");
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Animate typing effect
//   const animateResponse = (text) => {
//     setAnimatedResponseContent("");
//     setIsAnimatingResponse(true);
//     let i = 0;
//     const interval = setInterval(() => {
//       if (i < text.length) {
//         setAnimatedResponseContent((prev) => prev + text.charAt(i));
//         i++;
//         if (responseRef.current) {
//           responseRef.current.scrollTop = responseRef.current.scrollHeight;
//         }
//       } else {
//         clearInterval(interval);
//         setIsAnimatingResponse(false);
//       }
//     }, 20);
//   };

//   // Chat with AI using secret prompt
//   const chatWithAI = async (folder, secretId, currentSessionId) => {
//     try {
//       setLoadingChat(true);
//       setChatError(null);

//       const selectedSecret = secrets.find((s) => s.id === secretId);
//       if (!selectedSecret) {
//         throw new Error("No prompt found for selected analysis type");
//       }

//       let promptValue = selectedSecret.value;
//       const promptLabel = selectedSecret.name;

//       if (!promptValue) {
//         promptValue = await fetchSecretValue(secretId);
//       }

//       if (!promptValue) {
//         throw new Error("Secret prompt value is empty.");
//       }

//       const response = await documentApi.queryFolderDocuments(
//         folder,
//         promptValue,
//         currentSessionId,
//         {
//           used_secret_prompt: true,
//           prompt_label: promptLabel,
//         }
//       );

//       if (response.sessionId) {
//         setSelectedChatSessionId(response.sessionId);
//       }

//       const history = Array.isArray(response.chatHistory)
//         ? response.chatHistory
//         : [];
//       setCurrentChatHistory(history);

//       if (history.length > 0) {
//         const latestMessage = history[history.length - 1];
//         const responseText =
//           latestMessage.response ||
//           latestMessage.answer ||
//           latestMessage.message ||
//           "";
//         setCurrentResponse(responseText);
//         setSelectedMessageId(latestMessage.id);
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//         animateResponse(responseText);
//       }

//       return response;
//     } catch (error) {
//       setChatError(`Analysis failed: ${error.message}`);
//       throw error;
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Handle new message (combines regular chat and secret prompt)
//   const handleNewMessage = async () => {
//     if (!selectedFolder) return;

//     if (isSecretPromptSelected) {
//       if (!selectedSecretId) {
//         setChatError("Please select an analysis type.");
//         return;
//       }
//       try {
//         await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
//         setChatInput("");
//       } catch (error) {
//         // Error already handled
//       }
//     } else {
//       if (!chatInput.trim()) return;

//       setLoadingChat(true);
//       setChatError(null);

//       try {
//         const response = await documentApi.queryFolderDocuments(
//           selectedFolder,
//           chatInput,
//           selectedChatSessionId
//         );

//         if (response.sessionId) {
//           setSelectedChatSessionId(response.sessionId);
//         }

//         const history = Array.isArray(response.chatHistory)
//           ? response.chatHistory
//           : [];
//         setCurrentChatHistory(history);

//         if (history.length > 0) {
//           const latestMessage = history[history.length - 1];
//           const responseText =
//             latestMessage.response ||
//             latestMessage.answer ||
//             latestMessage.message ||
//             "";
//           setCurrentResponse(responseText);
//           setSelectedMessageId(latestMessage.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//           animateResponse(responseText);
//         }
//         setChatInput("");
//       } catch (err) {
//         setChatError(
//           `Failed to send message: ${err.response?.data?.details || err.message}`
//         );
//       } finally {
//         setLoadingChat(false);
//       }
//     }
//   };

//   // Handle selecting a chat
//   const handleSelectChat = (chat) => {
//     setSelectedMessageId(chat.id);
//     const responseText = chat.response || chat.answer || chat.message || "";
//     setCurrentResponse(responseText);
//     setAnimatedResponseContent(responseText);
//     setIsAnimatingResponse(false);
//     setHasResponse(true);
//     setHasAiResponse(true);
//     setForceSidebarCollapsed(true);
//   };

//   // Handle new chat
//   const handleNewChat = () => {
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);
//     setChatInput("");
//     setSelectedMessageId(null);
//     setCurrentResponse("");
//     setAnimatedResponseContent("");
//     setIsSecretPromptSelected(false);
//   };

//   // Handle dropdown selection
//   const handleDropdownSelect = (secretName, secretId) => {
//     setActiveDropdown(secretName);
//     setSelectedSecretId(secretId);
//     setIsSecretPromptSelected(true);
//     setChatInput("");
//     setShowDropdown(false);
//   };

//   // Handle custom input change
//   const handleChatInputChange = (e) => {
//     setChatInput(e.target.value);
//     setIsSecretPromptSelected(false);
//     setActiveDropdown("Custom Query");
//   };

//   // Format relative time
//   const getRelativeTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) return `Last message ${diffInSeconds} seconds ago`;
//     if (diffInSeconds < 3600)
//       return `Last message ${Math.floor(diffInSeconds / 60)} minutes ago`;
//     if (diffInSeconds < 86400)
//       return `Last message ${Math.floor(diffInSeconds / 3600)} hours ago`;
//     return `Last message ${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleString();
//     } catch (e) {
//       return 'Invalid date';
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Load secrets on mount
//   useEffect(() => {
//     fetchSecrets();
//   }, []);

//   useEffect(() => {
//     setChatSessions([]);
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);

//     if (selectedFolder && selectedFolder !== "Test") {
//       fetchChatHistory();
//     }
//   }, [selectedFolder]);

//   if (!selectedFolder) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//         Select a folder to start chatting.
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Left Panel - Chat History */}
//       <div className={`${hasResponse ? 'w-1/2' : 'w-full'} border-r border-gray-200 flex flex-col bg-white h-full`}>
//         {/* Header */}
//         <div className="p-4 border-b border-black border-opacity-20 flex-shrink-0">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
//             <button
//               onClick={handleNewChat}
//               className="px-3 py-1.5 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" style={{ backgroundColor: '#21C1B6' }}
//             >
//               New Chat
//             </button>
//           </div>

//           {/* Search Input */}
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search questions..."
//               className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Chat History List - Scrollable */}
//         <div className="flex-1 overflow-y-auto px-4 py-2">
//           <div className="space-y-2">
//             {currentChatHistory.map((chat) => (
//               <div
//                 key={chat.id}
//                 onClick={() => handleSelectChat(chat)}
//                 className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
//                   selectedMessageId === chat.id
//                     ? "bg-blue-50 border-blue-200 shadow-sm"
//                     : "bg-white border-gray-200 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
//                       {chat.question || chat.query || "Untitled"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {getRelativeTime(chat.created_at || chat.timestamp)}
//                     </p>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                     }}
//                     className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <MoreVertical className="h-5 w-5 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {currentChatHistory.length === 0 && !loadingChat && (
//               <div className="text-center py-12">
//                 <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                 <p className="text-gray-500">
//                   No chats yet. Start a conversation!
//                 </p>
//               </div>
//             )}

//             {loadingChat && currentChatHistory.length === 0 && (
//               <div className="flex justify-center py-8">
//                 <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Input Area - Fixed at bottom */}
//         <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
//             <input
//               type="text"
//               placeholder="How can I help you today?"
//               value={chatInput}
//               onChange={handleChatInputChange}
//               onKeyPress={(e) => e.key === "Enter" && handleNewMessage()}
//               className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent"
//               disabled={loadingChat}
//             />

//             {/* Action Buttons Row */}
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={handleNewChat}
//                   className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
//                   title="New Chat"
//                 >
//                 </button>

//                 {/* Analysis Dropdown */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     disabled={isLoadingSecrets || loadingChat}
//                     className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
//                   >
//                     <BookOpen className="h-4 w-4" />
//                     <span className="text-sm font-medium">
//                       {isLoadingSecrets ? "Loading..." : activeDropdown}
//                     </span>
//                     <ChevronDown className="h-4 w-4" />
//                   </button>

//                   {showDropdown && !isLoadingSecrets && (
//                     <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
//                       {secrets.length > 0 ? (
//                         secrets.map((secret) => (
//                           <button
//                             key={secret.id}
//                             onClick={() =>
//                               handleDropdownSelect(secret.name, secret.id)
//                             }
//                             className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
//                           >
//                             {secret.name}
//                           </button>
//                         ))
//                       ) : (
//                         <div className="px-4 py-2.5 text-sm text-gray-500">
//                           No analysis prompts available
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={handleNewMessage}
//                   disabled={
//                     loadingChat ||
//                     (!chatInput.trim() && !isSecretPromptSelected)
//                   }
//                   style={{ backgroundColor: '#1AA49B' }} className="p-2.5 hover:bg-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
//                 >
//                   {loadingChat ? (
//                     <Loader2 className="h-5 w-5 text-white animate-spin" />
//                   ) : (
//                     <Send className="h-5 w-5 text-white" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Error Message */}
//           {chatError && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
//               {chatError}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Panel - AI Response (Similar to AnalysisPage) */}
//       {hasResponse && selectedMessageId && (
//         <div className="w-1/2 flex flex-col h-full">
//           <div className="flex-1 overflow-y-auto" ref={responseRef}>
//             {currentResponse || animatedResponseContent ? (
//               <div className="px-6 py-6">
//                 <div className="max-w-none">
//                   {/* Response Header */}
//                   <div className="mb-6 pb-4 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
//                       <div className="flex items-center space-x-2 text-sm text-gray-500">
//                         {currentChatHistory.find(msg => msg.id === selectedMessageId)?.timestamp && (
//                           <span>{formatDate(currentChatHistory.find(msg => msg.id === selectedMessageId).timestamp)}</span>
//                         )}
//                       </div>
//                     </div>
//                     {/* Original Question */}
//                     <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//                       <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
//                       <p className="text-sm text-blue-800">
//                         {currentChatHistory.find(msg => msg.id === selectedMessageId)?.question || 'No question available'}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Response Content */}
//                   <div className="prose prose-gray max-w-none">
//                     <ReactMarkdown
//                       remarkPlugins={[remarkGfm]}
//                       components={{
//                         h1: (props) => (
//                           <h1
//                             className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2"
//                             {...props}
//                           />
//                         ),
//                         h2: (props) => (
//                           <h2
//                             className="text-xl font-bold mb-4 mt-6 text-black"
//                             {...props}
//                           />
//                         ),
//                         h3: (props) => (
//                           <h3
//                             className="text-lg font-bold mb-3 mt-4 text-black"
//                             {...props}
//                           />
//                         ),
//                         p: (props) => (
//                           <p
//                             className="mb-4 leading-relaxed text-black text-justify"
//                             {...props}
//                           />
//                         ),
//                         strong: (props) => (
//                           <strong className="font-bold text-black" {...props} />
//                         ),
//                         ul: (props) => (
//                           <ul className="list-disc pl-5 mb-4 text-black" {...props} />
//                         ),
//                         ol: (props) => (
//                           <ol className="list-decimal pl-5 mb-4 text-black" {...props} />
//                         ),
//                         li: (props) => (
//                           <li className="mb-2 leading-relaxed text-black" {...props} />
//                         ),
//                         blockquote: (props) => (
//                           <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props} />
//                         ),
//                         code: ({ inline, ...props }) => {
//                           const className = inline 
//                             ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-700" 
//                             : "block bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto my-4 text-red-700";
//                           return <code className={className} {...props} />;
//                         },
//                       }}
//                     >
//                       {animatedResponseContent || currentResponse}
//                     </ReactMarkdown>
//                     {isAnimatingResponse && (
//                       <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center max-w-md px-6">
//                   <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
//                   <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
//                   <p className="text-gray-600 text-lg leading-relaxed">
//                     Click on any question from the left panel to view the AI response here.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInterface;



// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//   Plus,
//   Shuffle,
//   Search,
//   BookOpen,
//   ChevronDown,
//   MoreVertical,
//   MessageSquare,
//   Loader2,
//   Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";

// import { Copy, Download } from 'lucide-react';
// import jsPDF from 'jspdf';

// import { Copy, Download } from 'lucide-react';
// import jsPDF from 'jspdf';

// import { Copy, Download } from 'lucide-react';
// import jsPDF from 'jspdf';

// import { Copy, Download } from 'lucide-react';
// import jsPDF from 'jspdf';

// import { Copy, Download } from 'lucide-react';
// import jsPDF from 'jspdf';
// import { useState } from 'react';

// import { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//   Plus,
//   Shuffle,
//   Search,
//   BookOpen,
//   ChevronDown,
//   MoreVertical,
//   MessageSquare,
//   Loader2,
//   Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";
// import { Copy, Download } from 'lucide-react';
// import jsPDF from 'jspdf';

// import { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//   Plus,
//   Shuffle,
//   Search,
//   BookOpen,
//   ChevronDown,
//   MoreVertical,
//   MessageSquare,
//   Loader2,
//   Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";
// import { Copy, Download } from 'lucide-react';
// import jsPDF from 'jspdf';

// const ChatInterface = () => {
//   const [copyMessage, setCopyMessage] = useState('');
//   const [downloadMessage, setDownloadMessage] = useState('');
//   const {
//     selectedFolder,
//     setChatSessions,
//     selectedChatSessionId,
//     setSelectedChatSessionId,
//     setHasAiResponse,
//   } = useContext(FileManagerContext);
//   const { setForceSidebarCollapsed } = useContext(SidebarContext);

//   const [currentChatHistory, setCurrentChatHistory] = useState([]);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [chatError, setChatError] = useState(null);

//   const [chatInput, setChatInput] = useState("");
//   const [currentResponse, setCurrentResponse] = useState("");
//   const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//   const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//   const [selectedMessageId, setSelectedMessageId] = useState(null);
//   const [hasResponse, setHasResponse] = useState(false);

//   // Secret prompt states
//   const [secrets, setSecrets] = useState([]);
//   const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
//   const [selectedSecretId, setSelectedSecretId] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState("Summary");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);

//   const responseRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // API Configuration
//   const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";

//   const getAuthToken = () => {
//     const tokenKeys = [
//       "authToken",
//       "token",
//       "accessToken",
//       "jwt",
//       "bearerToken",
//       "auth_token",
//       "access_token",
//       "api_token",
//       "userToken",
//     ];

//     for (const key of tokenKeys) {
//       const token = localStorage.getItem(key);
//       if (token) {
//         return token;
//       }
//     }
//     return null;
//   };

//   // Fetch secrets list
//   const fetchSecrets = async () => {
//     try {
//       setIsLoadingSecrets(true);
//       setChatError(null);

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
//         method: "GET",
//         headers,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secrets: ${response.status}`);
//       }

//       const secretsData = await response.json();
//       setSecrets(secretsData || []);

//       if (secretsData && secretsData.length > 0) {
//         setActiveDropdown(secretsData[0].name);
//         setSelectedSecretId(secretsData[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching secrets:", error);
//       setChatError(`Failed to load analysis prompts: ${error.message}`);
//     } finally {
//       setIsLoadingSecrets(false);
//     }
//   };

//   // Fetch secret value by ID
//   const fetchSecretValue = async (secretId) => {
//     try {
//       const existingSecret = secrets.find((secret) => secret.id === secretId);
//       if (existingSecret && existingSecret.value) {
//         return existingSecret.value;
//       }

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(
//         `${API_BASE_URL}/files/secrets/${secretId}`,
//         {
//           method: "GET",
//           headers,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secret value: ${response.status}`);
//       }

//       const secretData = await response.json();
//       const promptValue =
//         secretData.value || secretData.prompt || secretData.content || secretData;

//       setSecrets((prevSecrets) =>
//         prevSecrets.map((secret) =>
//           secret.id === secretId ? { ...secret, value: promptValue } : secret
//         )
//       );

//       return promptValue || "";
//     } catch (error) {
//       console.error("Error fetching secret value:", error);
//       throw new Error("Failed to retrieve analysis prompt");
//     }
//   };

//   // Fetch chat history
//   const fetchChatHistory = async (sessionId) => {
//     if (!selectedFolder) return;

//     setLoadingChat(true);
//     setChatError(null);

//     try {
//       let data = await documentApi.getFolderChats(selectedFolder);
//       const chats = Array.isArray(data.chats) ? data.chats : [];
//       setCurrentChatHistory(chats);

//       if (sessionId) {
//         setSelectedChatSessionId(sessionId);
//         const selectedChat = chats.find((c) => c.id === sessionId);
//         if (selectedChat) {
//           const responseText =
//             selectedChat.response ||
//             selectedChat.answer ||
//             selectedChat.message ||
//             "";
//           setCurrentResponse(responseText);
//           setAnimatedResponseContent(responseText);
//           setSelectedMessageId(selectedChat.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         } else if (selectedFolder === "Test" && chats.length > 0) {
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         }
//       } else {
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching chats:", err);
//       setChatError("Failed to fetch chat history.");
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Animate typing effect
//   const animateResponse = (text) => {
//     setAnimatedResponseContent("");
//     setIsAnimatingResponse(true);
//     let i = 0;
//     const interval = setInterval(() => {
//       if (i < text.length) {
//         setAnimatedResponseContent((prev) => prev + text.charAt(i));
//         i++;
//         if (responseRef.current) {
//           responseRef.current.scrollTop = responseRef.current.scrollHeight;
//         }
//       } else {
//         clearInterval(interval);
//         setIsAnimatingResponse(false);
//       }
//     }, 20);
//   };

//   // Chat with AI using secret prompt - CORRECTED
//   const chatWithAI = async (folder, secretId, currentSessionId) => {
//     try {
//       setLoadingChat(true);
//       setChatError(null);

//       const selectedSecret = secrets.find((s) => s.id === secretId);
//       if (!selectedSecret) {
//         throw new Error("No prompt found for selected analysis type");
//       }

//       let promptValue = selectedSecret.value;
//       const promptLabel = selectedSecret.name;

//       // If the secret doesn't have a value, fetch it
//       if (!promptValue) {
//         promptValue = await fetchSecretValue(secretId);
//       }

//       if (!promptValue) {
//         throw new Error("Secret prompt value is empty.");
//       }

//       // CORRECTED: Send the actual prompt value to backend with metadata
//       const response = await documentApi.queryFolderDocuments(
//         folder,
//         promptValue, // Send the actual prompt content
//         currentSessionId,
//         {
//           used_secret_prompt: true,  // Flag that this uses a secret prompt
//           prompt_label: promptLabel,  // Store the name/label of the prompt
//           secret_id: secretId         // Optional: store the secret ID reference
//         }
//       );

//       if (response.sessionId) {
//         setSelectedChatSessionId(response.sessionId);
//       }

//       const history = Array.isArray(response.chatHistory)
//         ? response.chatHistory
//         : [];
//       setCurrentChatHistory(history);

//       if (history.length > 0) {
//         const latestMessage = history[history.length - 1];
//         const responseText =
//           latestMessage.response ||
//           latestMessage.answer ||
//           latestMessage.message ||
//           "";
//         setCurrentResponse(responseText);
//         setSelectedMessageId(latestMessage.id);
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//         animateResponse(responseText);
//       }

//       return response;
//     } catch (error) {
//       setChatError(`Analysis failed: ${error.message}`);
//       throw error;
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Handle new message (combines regular chat and secret prompt)
//   const handleNewMessage = async () => {
//     if (!selectedFolder) return;

//     if (isSecretPromptSelected) {
//       // Using secret prompt
//       if (!selectedSecretId) {
//         setChatError("Please select an analysis type.");
//         return;
//       }
//       try {
//         await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
//         setChatInput("");
//         setIsSecretPromptSelected(false); // Reset after sending
//       } catch (error) {
//         // Error already handled
//       }
//     } else {
//       // Regular chat
//       if (!chatInput.trim()) return;

//       setLoadingChat(true);
//       setChatError(null);

//       try {
//         const response = await documentApi.queryFolderDocuments(
//           selectedFolder,
//           chatInput,
//           selectedChatSessionId,
//           {
//             used_secret_prompt: false // Explicitly mark as regular chat
//           }
//         );

//         if (response.sessionId) {
//           setSelectedChatSessionId(response.sessionId);
//         }

//         const history = Array.isArray(response.chatHistory)
//           ? response.chatHistory
//           : [];
//         setCurrentChatHistory(history);

//         if (history.length > 0) {
//           const latestMessage = history[history.length - 1];
//           const responseText =
//             latestMessage.response ||
//             latestMessage.answer ||
//             latestMessage.message ||
//             "";
//           setCurrentResponse(responseText);
//           setSelectedMessageId(latestMessage.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//           animateResponse(responseText);
//         }
//         setChatInput("");
//       } catch (err) {
//         setChatError(
//           `Failed to send message: ${err.response?.data?.details || err.message}`
//         );
//       } finally {
//         setLoadingChat(false);
//       }
//     }
//   };

//   // Handle selecting a chat
//   const handleSelectChat = (chat) => {
//     setSelectedMessageId(chat.id);
//     const responseText = chat.response || chat.answer || chat.message || "";
//     setCurrentResponse(responseText);
//     setAnimatedResponseContent(responseText);
//     setIsAnimatingResponse(false);
//     setHasResponse(true);
//     setHasAiResponse(true);
//     setForceSidebarCollapsed(true);
//   };

//   // Handle new chat
//   const handleNewChat = () => {
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);
//     setChatInput("");
//     setSelectedMessageId(null);
//     setCurrentResponse("");
//     setAnimatedResponseContent("");
//     setIsSecretPromptSelected(false);
//     setSelectedSecretId(null);
//     // Reset to first secret as default
//     if (secrets.length > 0) {
//       setActiveDropdown(secrets[0].name);
//       setSelectedSecretId(secrets[0].id);
//     }
//   };

//   // Handle dropdown selection
//   const handleDropdownSelect = (secretName, secretId) => {
//     setActiveDropdown(secretName);
//     setSelectedSecretId(secretId);
//     setIsSecretPromptSelected(true);
//     setChatInput(""); // Clear any custom input
//     setShowDropdown(false);
//   };

//   // Handle custom input change
//   const handleChatInputChange = (e) => {
//     setChatInput(e.target.value);
//     setIsSecretPromptSelected(false); // Switch to custom query mode
//     setActiveDropdown("Custom Query");
//   };

//   // Format relative time
//   const getRelativeTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) return `Last message ${diffInSeconds} seconds ago`;
//     if (diffInSeconds < 3600)
//       return `Last message ${Math.floor(diffInSeconds / 60)} minutes ago`;
//     if (diffInSeconds < 86400)
//       return `Last message ${Math.floor(diffInSeconds / 3600)} hours ago`;
//     return `Last message ${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleString();
//     } catch (e) {
//       return 'Invalid date';
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Load secrets on mount
//   useEffect(() => {
//     fetchSecrets();
//   }, []);

//   useEffect(() => {
//     setChatSessions([]);
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);

//     if (selectedFolder && selectedFolder !== "Test") {
//       fetchChatHistory();
//     }
//   }, [selectedFolder]);

//   if (!selectedFolder) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//         Select a folder to start chatting.
//       </div>
//     );
//   }

//   return (
//     <div className=" flex h-screen bg-white">
//       {/* Left Panel - Chat History */}
//       <div className={`${hasResponse ? 'w-[35%]' : 'w-full'} border-r border-gray-200 flex flex-col bg-white h-full`}>
//         {/* Header */}
//         <div className="p-4 border-b border-black border-opacity-20 flex-shrink-0">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
//             <button
//               onClick={handleNewChat}
//               className="px-3 py-1.5 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" style={{ backgroundColor: '#21C1B6' }}
//             >
//               New Chat
//             </button>
//           </div>

//           {/* Search Input */}
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search questions..."
//               className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Chat History List - Scrollable */}
//         <div className="flex-1 overflow-y-auto px-4 py-2">
//           <div className="space-y-2">
//             {currentChatHistory.map((chat) => (
//               <div
//                 key={chat.id}
//                 onClick={() => handleSelectChat(chat)}
//                 className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
//                   selectedMessageId === chat.id
//                     ? "bg-blue-50 border-blue-200 shadow-sm"
//                     : "bg-white border-gray-200 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
//                       {chat.question || chat.query || "Untitled"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {getRelativeTime(chat.created_at || chat.timestamp)}
//                     </p>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                     }}
//                     className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <MoreVertical className="h-5 w-5 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {currentChatHistory.length === 0 && !loadingChat && (
//               <div className="text-center py-12">
//                 <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                 <p className="text-gray-500">
//                   No chats yet. Start a conversation!
//                 </p>
//               </div>
//             )}

//             {loadingChat && currentChatHistory.length === 0 && (
//               <div className="flex justify-center py-8">
//                 <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Input Area - Fixed at bottom */}
//         <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
//             <input
//               type="text"
//               placeholder={isSecretPromptSelected ? `Analysis: ${activeDropdown}` : "How can I help you today?"}
//               value={chatInput}
//               onChange={handleChatInputChange}
//               onKeyPress={(e) => e.key === "Enter" && handleNewMessage()}
//               className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent"
//               disabled={loadingChat}
//             />

//             {/* Action Buttons Row */}
//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center space-x-2">
//                 {/* Analysis Dropdown */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     disabled={isLoadingSecrets || loadingChat}
//                     className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
//                   >
//                     <BookOpen className="h-4 w-4" />
//                     <span className="text-sm font-medium">
//                       {isLoadingSecrets ? "Loading..." : activeDropdown}
//                     </span>
//                     <ChevronDown className="h-4 w-4" />
//                   </button>

//                   {showDropdown && !isLoadingSecrets && (
//                     <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
//                       {secrets.length > 0 ? (
//                         secrets.map((secret) => (
//                           <button
//                             key={secret.id}
//                             onClick={() =>
//                               handleDropdownSelect(secret.name, secret.id)
//                             }
//                             className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
//                           >
//                             {secret.name}
//                           </button>
//                         ))
//                       ) : (
//                         <div className="px-4 py-2.5 text-sm text-gray-500">
//                           No analysis prompts available
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={handleNewMessage}
//                   disabled={
//                     loadingChat ||
//                     (!chatInput.trim() && !isSecretPromptSelected)
//                   }
//                   style={{ backgroundColor: '#1AA49B' }} className="p-2.5 hover:bg-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
//                 >
//                   {loadingChat ? (
//                     <Loader2 className="h-5 w-5 text-white animate-spin" />
//                   ) : (
//                     <Send className="h-5 w-5 text-white" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Error Message */}
//           {chatError && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
//               {chatError}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Panel - AI Response */}
//       {hasResponse && selectedMessageId && (
//         <div className="w-[65%] flex flex-col h-full">
//           <div className="flex items-center justify-between p-4">
//             <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
//             <div className="flex space-x-2">
//               <button onClick={() => {navigator.clipboard.writeText(currentResponse); alert('Copied!')}} className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md flex items-center space-x-1">
//                 <Copy className="w-4 h-4" />
//                 <span>Copy</span>
//               </button>
//               <button onClick={() => {
//                 const doc = new jsPDF('p', 'pt', 'a4');
//                 const formattedResponse = currentResponse.replace(/\|---|---:\|/g, '').replace(/\|/g, '   ');
//                 doc.text(formattedResponse, 10, 10);
//                 doc.save("response.pdf");
//                 alert('Downloaded!');
//               }} className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center space-x-1">
//               <Download className="w-4 h-4" />
//                 <span>Download</span>
//               </button>
//             </div>
//           </div>
//           <div className="flex-1 overflow-y-auto" ref={responseRef}  >
//             {currentResponse || animatedResponseContent ? (
//               <div className="px-6 py-6">
//                 <div className="max-w-none">
//                   {/* Response Header */}
//                   <div className="mb-6 pb-4 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
//                       <div className="flex items-center space-x-2 text-sm text-gray-500">
//                         {currentChatHistory.find(msg => msg.id === selectedMessageId)?.timestamp && (
//                           <span>{formatDate(currentChatHistory.find(msg => msg.id === selectedMessageId).timestamp)}</span>
//                         )}
//                       </div>
//                     </div>
//                     {/* Original Question */}
//                     <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//                       <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
//                       <p className="text-sm text-blue-800">
//                         {currentChatHistory.find(msg => msg.id === selectedMessageId)?.question || 'No question available'}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Response Content */}
//                   <div className="prose prose-gray max-w-none">
//                     <ReactMarkdown
//                       remarkPlugins={[remarkGfm]}
//                       components={{
//                         h1: (props) => (
//                           <h1
//                             className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2"
//                             {...props}
//                           />
//                         ),
//                         h2: (props) => (
//                           <h2
//                             className="text-xl font-bold mb-4 mt-6 text-black"
//                             {...props}
//                           />
//                         ),
//                         h3: (props) => (
//                           <h3
//                             className="text-lg font-bold mb-3 mt-4 text-black"
//                             {...props}
//                           />
//                         ),
//                         p: (props) => (
//                           <p
//                             className="mb-4 leading-relaxed text-black text-justify"
//                             {...props}
//                           />
//                         ),
//                         strong: (props) => (
//                           <strong className="font-bold text-black" {...props} />
//                         ),
//                         ul: (props) => (
//                           <ul className="list-disc pl-5 mb-4 text-black" {...props} />
//                         ),
//                         ol: (props) => (
//                           <ol className="list-decimal pl-5 mb-4 text-black" {...props} />
//                         ),
//                         li: (props) => (
//                           <li className="mb-2 leading-relaxed text-black" {...props} />
//                         ),
//                         blockquote: (props) => (
//                           <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props} />
//                         ),
//                         code: ({ inline, ...props }) => {
//                           const className = inline 
//                             ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-700" 
//                             : "block bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto my-4 text-red-700";
//                           return <code className={className} {...props} />;
//                         },
//                       }}
//                     >
//                       {animatedResponseContent || currentResponse}
//                     </ReactMarkdown>
//                     {isAnimatingResponse && (
//                       <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center max-w-md px-6">
//                   <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
//                   <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
//                   <p className="text-gray-600 text-lg leading-relaxed">
//                     Click on any question from the left panel to view the AI response here.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInterface;


// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//   Plus,
//   Shuffle,
//   Search,
//   BookOpen,
//   ChevronDown,
//   MoreVertical,
//   MessageSquare,
//   Loader2,
//   Send,
//   Copy,
//   Download,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";
// import jsPDF from 'jspdf';

// const ChatInterface = () => {
//   const [showCopyMessage, setShowCopyMessage] = useState(false);
//   const [showDownloadMessage, setShowDownloadMessage] = useState(false);
//   const {
//     selectedFolder,
//     setChatSessions,
//     selectedChatSessionId,
//     setSelectedChatSessionId,
//     setHasAiResponse,
//   } = useContext(FileManagerContext);
//   const { setForceSidebarCollapsed } = useContext(SidebarContext);

//   const [currentChatHistory, setCurrentChatHistory] = useState([]);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [chatError, setChatError] = useState(null);

//   const [chatInput, setChatInput] = useState("");
//   const [currentResponse, setCurrentResponse] = useState("");
//   const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//   const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//   const [selectedMessageId, setSelectedMessageId] = useState(null);
//   const [hasResponse, setHasResponse] = useState(false);

//   // Secret prompt states
//   const [secrets, setSecrets] = useState([]);
//   const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
//   const [selectedSecretId, setSelectedSecretId] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState("Summary");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);

//   const responseRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // API Configuration
//   const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";

//   const getAuthToken = () => {
//     const tokenKeys = [
//       "authToken",
//       "token",
//       "accessToken",
//       "jwt",
//       "bearerToken",
//       "auth_token",
//       "access_token",
//       "api_token",
//       "userToken",
//     ];

//     for (const key of tokenKeys) {
//       const token = localStorage.getItem(key);
//       if (token) {
//         return token;
//       }
//     }
//     return null;
//   };

//   // Fetch secrets list
//   const fetchSecrets = async () => {
//     try {
//       setIsLoadingSecrets(true);
//       setChatError(null);

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
//         method: "GET",
//         headers,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secrets: ${response.status}`);
//       }

//       const secretsData = await response.json();
//       setSecrets(secretsData || []);

//       if (secretsData && secretsData.length > 0) {
//         setActiveDropdown(secretsData[0].name);
//         setSelectedSecretId(secretsData[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching secrets:", error);
//       setChatError(`Failed to load analysis prompts: ${error.message}`);
//     } finally {
//       setIsLoadingSecrets(false);
//     }
//   };

//   // Fetch secret value by ID
//   const fetchSecretValue = async (secretId) => {
//     try {
//       const existingSecret = secrets.find((secret) => secret.id === secretId);
//       if (existingSecret && existingSecret.value) {
//         return existingSecret.value;
//       }

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(
//         `${API_BASE_URL}/files/secrets/${secretId}`,
//         {
//           method: "GET",
//           headers,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secret value: ${response.status}`);
//       }

//       const secretData = await response.json();
//       const promptValue =
//         secretData.value || secretData.prompt || secretData.content || secretData;

//       setSecrets((prevSecrets) =>
//         prevSecrets.map((secret) =>
//           secret.id === secretId ? { ...secret, value: promptValue } : secret
//         )
//       );

//       return promptValue || "";
//     } catch (error) {
//       console.error("Error fetching secret value:", error);
//       throw new Error("Failed to retrieve analysis prompt");
//     }
//   };

//   // Fetch chat history
//   const fetchChatHistory = async (sessionId) => {
//     if (!selectedFolder) return;

//     setLoadingChat(true);
//     setChatError(null);

//     try {
//       let data = await documentApi.getFolderChats(selectedFolder);
//       const chats = Array.isArray(data.chats) ? data.chats : [];
//       setCurrentChatHistory(chats);

//       if (sessionId) {
//         setSelectedChatSessionId(sessionId);
//         const selectedChat = chats.find((c) => c.id === sessionId);
//         if (selectedChat) {
//           const responseText =
//             selectedChat.response ||
//             selectedChat.answer ||
//             selectedChat.message ||
//             "";
//           setCurrentResponse(responseText);
//           setAnimatedResponseContent(responseText);
//           setSelectedMessageId(selectedChat.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         } else if (selectedFolder === "Test" && chats.length > 0) {
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         }
//       } else {
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching chats:", err);
//       setChatError("Failed to fetch chat history.");
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Animate typing effect
//   const animateResponse = (text) => {
//     setAnimatedResponseContent("");
//     setIsAnimatingResponse(true);
//     let i = 0;
//     const interval = setInterval(() => {
//       if (i < text.length) {
//         setAnimatedResponseContent((prev) => prev + text.charAt(i));
//         i++;
//         if (responseRef.current) {
//           responseRef.current.scrollTop = responseRef.current.scrollHeight;
//         }
//       } else {
//         clearInterval(interval);
//         setIsAnimatingResponse(false);
//       }
//     }, 20);
//   };

//   // Chat with AI using secret prompt
//   const chatWithAI = async (folder, secretId, currentSessionId) => {
//     try {
//       setLoadingChat(true);
//       setChatError(null);

//       const selectedSecret = secrets.find((s) => s.id === secretId);
//       if (!selectedSecret) {
//         throw new Error("No prompt found for selected analysis type");
//       }

//       let promptValue = selectedSecret.value;
//       const promptLabel = selectedSecret.name;

//       // If the secret doesn't have a value, fetch it
//       if (!promptValue) {
//         promptValue = await fetchSecretValue(secretId);
//       }

//       if (!promptValue) {
//         throw new Error("Secret prompt value is empty.");
//       }

//       // Send the actual prompt value to backend with metadata
//       const response = await documentApi.queryFolderDocuments(
//         folder,
//         promptValue,
//         currentSessionId,
//         {
//           used_secret_prompt: true,
//           prompt_label: promptLabel,
//           secret_id: secretId
//         }
//       );

//       if (response.sessionId) {
//         setSelectedChatSessionId(response.sessionId);
//       }

//       const history = Array.isArray(response.chatHistory)
//         ? response.chatHistory
//         : [];
//       setCurrentChatHistory(history);

//       if (history.length > 0) {
//         const latestMessage = history[history.length - 1];
//         const responseText =
//           latestMessage.response ||
//           latestMessage.answer ||
//           latestMessage.message ||
//           "";
//         setCurrentResponse(responseText);
//         setSelectedMessageId(latestMessage.id);
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//         animateResponse(responseText);
//       }

//       return response;
//     } catch (error) {
//       setChatError(`Analysis failed: ${error.message}`);
//       throw error;
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Handle new message (combines regular chat and secret prompt)
//   const handleNewMessage = async () => {
//     if (!selectedFolder) return;

//     if (isSecretPromptSelected) {
//       // Using secret prompt
//       if (!selectedSecretId) {
//         setChatError("Please select an analysis type.");
//         return;
//       }
//       try {
//         await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
//         setChatInput("");
//         setIsSecretPromptSelected(false);
//       } catch (error) {
//         // Error already handled
//       }
//     } else {
//       // Regular chat
//       if (!chatInput.trim()) return;

//       setLoadingChat(true);
//       setChatError(null);

//       try {
//         const response = await documentApi.queryFolderDocuments(
//           selectedFolder,
//           chatInput,
//           selectedChatSessionId,
//           {
//             used_secret_prompt: false
//           }
//         );

//         if (response.sessionId) {
//           setSelectedChatSessionId(response.sessionId);
//         }

//         const history = Array.isArray(response.chatHistory)
//           ? response.chatHistory
//           : [];
//         setCurrentChatHistory(history);

//         if (history.length > 0) {
//           const latestMessage = history[history.length - 1];
//           const responseText =
//             latestMessage.response ||
//             latestMessage.answer ||
//             latestMessage.message ||
//             "";
//           setCurrentResponse(responseText);
//           setSelectedMessageId(latestMessage.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//           animateResponse(responseText);
//         }
//         setChatInput("");
//       } catch (err) {
//         setChatError(
//           `Failed to send message: ${err.response?.data?.details || err.message}`
//         );
//       } finally {
//         setLoadingChat(false);
//       }
//     }
//   };

//   // Handle selecting a chat
//   const handleSelectChat = (chat) => {
//     setSelectedMessageId(chat.id);
//     const responseText = chat.response || chat.answer || chat.message || "";
//     setCurrentResponse(responseText);
//     setAnimatedResponseContent(responseText);
//     setIsAnimatingResponse(false);
//     setHasResponse(true);
//     setHasAiResponse(true);
//     setForceSidebarCollapsed(true);
//   };

//   // Handle new chat
//   const handleNewChat = () => {
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);
//     setChatInput("");
//     setSelectedMessageId(null);
//     setCurrentResponse("");
//     setAnimatedResponseContent("");
//     setIsSecretPromptSelected(false);
//     setSelectedSecretId(null);
//     // Reset to first secret as default
//     if (secrets.length > 0) {
//       setActiveDropdown(secrets[0].name);
//       setSelectedSecretId(secrets[0].id);
//     }
//   };

//   // Handle dropdown selection
//   const handleDropdownSelect = (secretName, secretId) => {
//     setActiveDropdown(secretName);
//     setSelectedSecretId(secretId);
//     setIsSecretPromptSelected(true);
//     setChatInput("");
//     setShowDropdown(false);
//   };

//   // Handle custom input change
//   const handleChatInputChange = (e) => {
//     setChatInput(e.target.value);
//     setIsSecretPromptSelected(false);
//     setActiveDropdown("Custom Query");
//   };

//   // Format relative time
//   const getRelativeTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) return `Last message ${diffInSeconds} seconds ago`;
//     if (diffInSeconds < 3600)
//       return `Last message ${Math.floor(diffInSeconds / 60)} minutes ago`;
//     if (diffInSeconds < 86400)
//       return `Last message ${Math.floor(diffInSeconds / 3600)} hours ago`;
//     return `Last message ${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleString();
//     } catch (e) {
//       return 'Invalid date';
//     }
//   };

//   // Copy to clipboard with feedback
//   const handleCopy = () => {
//     navigator.clipboard.writeText(currentResponse);
//     setShowCopyMessage(true);
//     setTimeout(() => setShowCopyMessage(false), 2000);
//   };

//   // Download as PDF with better formatting
//   const handleDownload = () => {
//     const doc = new jsPDF('p', 'pt', 'a4');
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();
//     const margin = 40;
//     const maxWidth = pageWidth - 2 * margin;
//     let yPosition = margin;

//     // Helper function to add new page if needed
//     const checkPageBreak = (requiredSpace) => {
//       if (yPosition + requiredSpace > pageHeight - margin) {
//         doc.addPage();
//         yPosition = margin;
//         return true;
//       }
//       return false;
//     };

//     // Parse markdown and format for PDF
//     const lines = currentResponse.split('\n');
//     let inTable = false;
//     let tableData = [];
    
//     lines.forEach((line, index) => {
//       // Handle headers
//       if (line.startsWith('# ')) {
//         checkPageBreak(30);
//         doc.setFontSize(18);
//         doc.setFont(undefined, 'bold');
//         const text = line.replace('# ', '');
//         doc.text(text, margin, yPosition);
//         yPosition += 25;
//       } else if (line.startsWith('## ')) {
//         checkPageBreak(25);
//         doc.setFontSize(14);
//         doc.setFont(undefined, 'bold');
//         const text = line.replace('## ', '');
//         doc.text(text, margin, yPosition);
//         yPosition += 20;
//       } else if (line.startsWith('### ')) {
//         checkPageBreak(20);
//         doc.setFontSize(12);
//         doc.setFont(undefined, 'bold');
//         const text = line.replace('### ', '');
//         doc.text(text, margin, yPosition);
//         yPosition += 18;
//       }
//       // Handle tables
//       else if (line.includes('|')) {
//         if (!inTable) {
//           inTable = true;
//           tableData = [];
//         }
        
//         // Skip separator lines
//         if (!line.match(/^\|[\s-:|]+\|$/)) {
//           const cells = line.split('|').filter(cell => cell.trim()).map(cell => cell.trim());
//           tableData.push(cells);
//         }
        
//         // Check if next line is not a table (end of table)
//         if (index === lines.length - 1 || !lines[index + 1].includes('|')) {
//           inTable = false;
          
//           if (tableData.length > 0) {
//             checkPageBreak(tableData.length * 20 + 30);
            
//             // Calculate column widths
//             const numCols = tableData[0].length;
//             const colWidth = maxWidth / numCols;
            
//             // Draw table
//             doc.setFontSize(10);
//             tableData.forEach((row, rowIndex) => {
//               const isHeader = rowIndex === 0;
              
//               if (isHeader) {
//                 doc.setFont(undefined, 'bold');
//                 doc.setFillColor(240, 240, 240);
//               } else {
//                 doc.setFont(undefined, 'normal');
//               }
              
//               row.forEach((cell, colIndex) => {
//                 const x = margin + colIndex * colWidth;
//                 const y = yPosition;
                
//                 // Draw cell border
//                 doc.rect(x, y, colWidth, 20);
                
//                 // Fill header
//                 if (isHeader) {
//                   doc.rect(x, y, colWidth, 20, 'F');
//                 }
                
//                 // Draw text
//                 const cellText = doc.splitTextToSize(cell, colWidth - 10);
//                 doc.text(cellText, x + 5, y + 14);
//               });
              
//               yPosition += 20;
              
//               if (checkPageBreak(20)) {
//                 // Continue table on new page
//               }
//             });
            
//             yPosition += 10;
//             tableData = [];
//           }
//         }
//       }
//       // Handle bullet points
//       else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
//         checkPageBreak(15);
//         doc.setFontSize(10);
//         doc.setFont(undefined, 'normal');
//         const text = line.replace(/^[\s-*]+/, '');
//         const wrappedText = doc.splitTextToSize('• ' + text, maxWidth - 20);
//         doc.text(wrappedText, margin + 10, yPosition);
//         yPosition += wrappedText.length * 12 + 5;
//       }
//       // Handle numbered lists
//       else if (line.match(/^\d+\.\s/)) {
//         checkPageBreak(15);
//         doc.setFontSize(10);
//         doc.setFont(undefined, 'normal');
//         const wrappedText = doc.splitTextToSize(line, maxWidth - 20);
//         doc.text(wrappedText, margin + 10, yPosition);
//         yPosition += wrappedText.length * 12 + 5;
//       }
//       // Handle bold text and regular paragraphs
//       else if (line.trim()) {
//         checkPageBreak(15);
//         doc.setFontSize(10);
//         doc.setFont(undefined, 'normal');
        
//         // Remove markdown formatting
//         let cleanText = line.replace(/\*\*(.*?)\*\*/g, '$1');
//         cleanText = cleanText.replace(/\*(.*?)\*/g, '$1');
//         cleanText = cleanText.replace(/`(.*?)`/g, '$1');
        
//         const wrappedText = doc.splitTextToSize(cleanText, maxWidth);
//         doc.text(wrappedText, margin, yPosition);
//         yPosition += wrappedText.length * 12 + 8;
//       }
//       // Empty line
//       else {
//         yPosition += 8;
//       }
//     });

//     doc.save('ai-response.pdf');
//     setShowDownloadMessage(true);
//     setTimeout(() => setShowDownloadMessage(false), 2000);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Load secrets on mount
//   useEffect(() => {
//     fetchSecrets();
//   }, []);

//   useEffect(() => {
//     setChatSessions([]);
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);

//     if (selectedFolder && selectedFolder !== "Test") {
//       fetchChatHistory();
//     }
//   }, [selectedFolder]);

//   if (!selectedFolder) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//         Select a folder to start chatting.
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Left Panel - Chat History */}
//       <div className={`${hasResponse ? 'w-[35%]' : 'w-full'} border-r border-gray-200 flex flex-col bg-white h-full`}>
//         {/* Header */}
//         <div className="p-4 border-b border-black border-opacity-20 flex-shrink-0">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
//             <button
//               onClick={handleNewChat}
//               className="px-3 py-1.5 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" style={{ backgroundColor: '#21C1B6' }}
//             >
//               New Chat
//             </button>
//           </div>

//           {/* Search Input */}
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search questions..."
//               className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Chat History List - Scrollable */}
//         <div className="flex-1 overflow-y-auto px-4 py-2">
//           <div className="space-y-2">
//             {currentChatHistory.map((chat) => (
//               <div
//                 key={chat.id}
//                 onClick={() => handleSelectChat(chat)}
//                 className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
//                   selectedMessageId === chat.id
//                     ? "bg-blue-50 border-blue-200 shadow-sm"
//                     : "bg-white border-gray-200 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
//                       {chat.question || chat.query || "Untitled"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {getRelativeTime(chat.created_at || chat.timestamp)}
//                     </p>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                     }}
//                     className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <MoreVertical className="h-5 w-5 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {currentChatHistory.length === 0 && !loadingChat && (
//               <div className="text-center py-12">
//                 <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                 <p className="text-gray-500">
//                   No chats yet. Start a conversation!
//                 </p>
//               </div>
//             )}

//             {loadingChat && currentChatHistory.length === 0 && (
//               <div className="flex justify-center py-8">
//                 <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Input Area - Fixed at bottom */}
//         <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
//             <input
//               type="text"
//               placeholder={isSecretPromptSelected ? `Analysis: ${activeDropdown}` : "How can I help you today?"}
//               value={chatInput}
//               onChange={handleChatInputChange}
//               onKeyPress={(e) => e.key === "Enter" && handleNewMessage()}
//               className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent"
//               disabled={loadingChat}
//             />

//             {/* Action Buttons Row */}
//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center space-x-2">
//                 {/* Analysis Dropdown */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     disabled={isLoadingSecrets || loadingChat}
//                     className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
//                   >
//                     <BookOpen className="h-4 w-4" />
//                     <span className="text-sm font-medium">
//                       {isLoadingSecrets ? "Loading..." : activeDropdown}
//                     </span>
//                     <ChevronDown className="h-4 w-4" />
//                   </button>

//                   {showDropdown && !isLoadingSecrets && (
//                     <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
//                       {secrets.length > 0 ? (
//                         secrets.map((secret) => (
//                           <button
//                             key={secret.id}
//                             onClick={() =>
//                               handleDropdownSelect(secret.name, secret.id)
//                             }
//                             className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
//                           >
//                             {secret.name}
//                           </button>
//                         ))
//                       ) : (
//                         <div className="px-4 py-2.5 text-sm text-gray-500">
//                           No analysis prompts available
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={handleNewMessage}
//                   disabled={
//                     loadingChat ||
//                     (!chatInput.trim() && !isSecretPromptSelected)
//                   }
//                   style={{ backgroundColor: '#1AA49B' }} className="p-2.5 hover:bg-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
//                 >
//                   {loadingChat ? (
//                     <Loader2 className="h-5 w-5 text-white animate-spin" />
//                   ) : (
//                     <Send className="h-5 w-5 text-white" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Error Message */}
//           {chatError && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
//               {chatError}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Panel - AI Response */}
//       {hasResponse && selectedMessageId && (
//         <div className="w-[65%] flex flex-col h-full">
//           {/* Header with Actions */}
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
//             <div className="flex items-center space-x-2">
//               {/* Copy Button */}
//               <div className="relative">
//                 <button 
//                   onClick={handleCopy}
//                   className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md flex items-center space-x-2 transition-colors"
//                 >
//                   <Copy className="w-4 h-4" />
//                   <span className="text-sm font-medium">Copy</span>
//                 </button>
//                 {showCopyMessage && (
//                   <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-lg whitespace-nowrap z-10">
//                     Copied!
//                   </div>
//                 )}
//               </div>
              
//               {/* Download Button */}
//               <div className="relative">
//                 <button 
//                   onClick={handleDownload}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center space-x-2 transition-colors"
//                 >
//                   <Download className="w-4 h-4" />
//                   <span className="text-sm font-medium">Download</span>
//                 </button>
//                 {showDownloadMessage && (
//                   <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-1.5 rounded-md text-sm font-medium shadow-lg whitespace-nowrap z-10">
//                     Downloaded!
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Response Content */}
//           <div className="flex-1 overflow-y-auto" ref={responseRef}>
//             {currentResponse || animatedResponseContent ? (
//               <div className="px-6 py-6">
//                 <div className="max-w-none">
//                   {/* Response Header */}
//                   <div className="mb-6 pb-4 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2 text-sm text-gray-500">
//                         {currentChatHistory.find(msg => msg.id === selectedMessageId)?.timestamp && (
//                           <span>{formatDate(currentChatHistory.find(msg => msg.id === selectedMessageId).timestamp)}</span>
//                         )}
//                       </div>
//                     </div>
//                     {/* Original Question */}
//                     <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//                       <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
//                       <p className="text-sm text-blue-800">
//                         {currentChatHistory.find(msg => msg.id === selectedMessageId)?.question || 'No question available'}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Response Content */}
//                   <div className="prose prose-gray max-w-none">
//                     <ReactMarkdown
//                       remarkPlugins={[remarkGfm]}
//                       components={{
//                         h1: (props) => (
//                           <h1
//                             className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2"
//                             {...props}
//                           />
//                         ),
//                         h2: (props) => (
//                           <h2
//                             className="text-xl font-bold mb-4 mt-6 text-black"
//                             {...props}
//                           />
//                         ),
//                         h3: (props) => (
//                           <h3
//                             className="text-lg font-bold mb-3 mt-4 text-black"
//                             {...props}
//                           />
//                         ),
//                         p: (props) => (
//                           <p
//                             className="mb-4 leading-relaxed text-black text-justify"
//                             {...props}
//                           />
//                         ),
//                         strong: (props) => (
//                           <strong className="font-bold text-black" {...props} />
//                         ),
//                         ul: (props) => (
//                           <ul className="list-disc pl-5 mb-4 text-black" {...props} />
//                         ),
//                         ol: (props) => (
//                           <ol className="list-decimal pl-5 mb-4 text-black" {...props} />
//                         ),
//                         li: (props) => (
//                           <li className="mb-2 leading-relaxed text-black" {...props} />
//                         ),
//                         blockquote: (props) => (
//                           <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props} />
//                         ),
//                         code: ({ inline, ...props }) => {
//                           const className = inline 
//                             ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-700" 
//                             : "block bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto my-4 text-red-700";
//                           return <code className={className} {...props} />;
//                         },
//                         table: (props) => (
//                           <div className="overflow-x-auto my-4">
//                             <table className="min-w-full border-collapse border border-gray-300" {...props} />
//                           </div>
//                         ),
//                         thead: (props) => (
//                           <thead className="bg-gray-100" {...props} />
//                         ),
//                         tbody: (props) => (
//                           <tbody {...props} />
//                         ),
//                         tr: (props) => (
//                           <tr className="border-b border-gray-300" {...props} />
//                         ),
//                         th: (props) => (
//                           <th className="border border-gray-300 px-4 py-2 text-left font-bold text-black" {...props} />
//                         ),
//                         td: (props) => (
//                           <td className="border border-gray-300 px-4 py-2 text-black" {...props} />
//                         ),
//                       }}
//                     >
//                       {animatedResponseContent || currentResponse}
//                     </ReactMarkdown>
//                     {isAnimatingResponse && (
//                       <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center max-w-md px-6">
//                   <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
//                   <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
//                   <p className="text-gray-600 text-lg leading-relaxed">
//                     Click on any question from the left panel to view the AI response here.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInterface;






// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//   Plus,
//   Shuffle,
//   Search,
//   BookOpen,
//   ChevronDown,
//   MoreVertical,
//   MessageSquare,
//   Loader2,
//   Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";

// const ChatInterface = () => {
//   const {
//     selectedFolder,
//     setChatSessions,
//     selectedChatSessionId,
//     setSelectedChatSessionId,
//     setHasAiResponse,
//   } = useContext(FileManagerContext);
//   const { setForceSidebarCollapsed } = useContext(SidebarContext);

//   const [currentChatHistory, setCurrentChatHistory] = useState([]);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [chatError, setChatError] = useState(null);

//   const [chatInput, setChatInput] = useState("");
//   const [currentResponse, setCurrentResponse] = useState("");
//   const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//   const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//   const [selectedMessageId, setSelectedMessageId] = useState(null);
//   const [hasResponse, setHasResponse] = useState(false);

//   // Secret prompt states
//   const [secrets, setSecrets] = useState([]);
//   const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
//   const [selectedSecretId, setSelectedSecretId] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState("Summary");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);

//   const responseRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // API Configuration
//   const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";

//   const getAuthToken = () => {
//     const tokenKeys = [
//       "authToken",
//       "token",
//       "accessToken",
//       "jwt",
//       "bearerToken",
//       "auth_token",
//       "access_token",
//       "api_token",
//       "userToken",
//     ];

//     for (const key of tokenKeys) {
//       const token = localStorage.getItem(key);
//       if (token) {
//         return token;
//       }
//     }
//     return null;
//   };

//   // Fetch secrets list
//   const fetchSecrets = async () => {
//     try {
//       setIsLoadingSecrets(true);
//       setChatError(null);

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
//         method: "GET",
//         headers,
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secrets: ${response.status}`);
//       }

//       const secretsData = await response.json();
//       setSecrets(secretsData || []);

//       if (secretsData && secretsData.length > 0) {
//         setActiveDropdown(secretsData[0].name);
//         setSelectedSecretId(secretsData[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching secrets:", error);
//       setChatError(`Failed to load analysis prompts: ${error.message}`);
//     } finally {
//       setIsLoadingSecrets(false);
//     }
//   };

//   // Fetch secret value by ID
//   const fetchSecretValue = async (secretId) => {
//     try {
//       const existingSecret = secrets.find((secret) => secret.id === secretId);
//       if (existingSecret && existingSecret.value) {
//         return existingSecret.value;
//       }

//       const token = getAuthToken();
//       const headers = {
//         "Content-Type": "application/json",
//       };

//       if (token) {
//         headers["Authorization"] = `Bearer ${token}`;
//       }

//       const response = await fetch(
//         `${API_BASE_URL}/files/secrets/${secretId}`,
//         {
//           method: "GET",
//           headers,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch secret value: ${response.status}`);
//       }

//       const secretData = await response.json();
//       const promptValue =
//         secretData.value || secretData.prompt || secretData.content || secretData;

//       setSecrets((prevSecrets) =>
//         prevSecrets.map((secret) =>
//           secret.id === secretId ? { ...secret, value: promptValue } : secret
//         )
//       );

//       return promptValue || "";
//     } catch (error) {
//       console.error("Error fetching secret value:", error);
//       throw new Error("Failed to retrieve analysis prompt");
//     }
//   };

//   // Fetch chat history
//   const fetchChatHistory = async (sessionId) => {
//     if (!selectedFolder) return;

//     setLoadingChat(true);
//     setChatError(null);

//     try {
//       let data = await documentApi.getFolderChats(selectedFolder);
//       const chats = Array.isArray(data.chats) ? data.chats : [];
//       setCurrentChatHistory(chats);

//       if (sessionId) {
//         setSelectedChatSessionId(sessionId);
//         const selectedChat = chats.find((c) => c.id === sessionId);
//         if (selectedChat) {
//           const responseText =
//             selectedChat.response ||
//             selectedChat.answer ||
//             selectedChat.message ||
//             "";
//           setCurrentResponse(responseText);
//           setAnimatedResponseContent(responseText);
//           setSelectedMessageId(selectedChat.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         } else if (selectedFolder === "Test" && chats.length > 0) {
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         }
//       } else {
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       }
//     } catch (err) {
//       console.error("❌ Error fetching chats:", err);
//       setChatError("Failed to fetch chat history.");
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Animate typing effect
//   const animateResponse = (text) => {
//     setAnimatedResponseContent("");
//     setIsAnimatingResponse(true);
//     let i = 0;
//     const interval = setInterval(() => {
//       if (i < text.length) {
//         setAnimatedResponseContent((prev) => prev + text.charAt(i));
//         i++;
//         if (responseRef.current) {
//           responseRef.current.scrollTop = responseRef.current.scrollHeight;
//         }
//       } else {
//         clearInterval(interval);
//         setIsAnimatingResponse(false);
//       }
//     }, 20);
//   };

//   // Chat with AI using secret prompt - CORRECTED
//   const chatWithAI = async (folder, secretId, currentSessionId) => {
//     try {
//       setLoadingChat(true);
//       setChatError(null);

//       const selectedSecret = secrets.find((s) => s.id === secretId);
//       if (!selectedSecret) {
//         throw new Error("No prompt found for selected analysis type");
//       }

//       let promptValue = selectedSecret.value;
//       const promptLabel = selectedSecret.name;

//       // If the secret doesn't have a value, fetch it
//       if (!promptValue) {
//         promptValue = await fetchSecretValue(secretId);
//       }

//       if (!promptValue) {
//         throw new Error("Secret prompt value is empty.");
//       }

//       // CORRECTED: Send the actual prompt value to backend with metadata
//       const response = await documentApi.queryFolderDocuments(
//         folder,
//         promptValue, // Send the actual prompt content
//         currentSessionId,
//         {
//           used_secret_prompt: true,  // Flag that this uses a secret prompt
//           prompt_label: promptLabel,  // Store the name/label of the prompt
//           secret_id: secretId         // Optional: store the secret ID reference
//         }
//       );

//       if (response.sessionId) {
//         setSelectedChatSessionId(response.sessionId);
//       }

//       const history = Array.isArray(response.chatHistory)
//         ? response.chatHistory
//         : [];
//       setCurrentChatHistory(history);

//       if (history.length > 0) {
//         const latestMessage = history[history.length - 1];
//         const responseText =
//           latestMessage.response ||
//           latestMessage.answer ||
//           latestMessage.message ||
//           "";
//         setCurrentResponse(responseText);
//         setSelectedMessageId(latestMessage.id);
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//         animateResponse(responseText);
//       }

//       return response;
//     } catch (error) {
//       setChatError(`Analysis failed: ${error.message}`);
//       throw error;
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Handle new message (combines regular chat and secret prompt)
//   const handleNewMessage = async () => {
//     if (!selectedFolder) return;

//     if (isSecretPromptSelected) {
//       // Using secret prompt
//       if (!selectedSecretId) {
//         setChatError("Please select an analysis type.");
//         return;
//       }
//       try {
//         await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
//         setChatInput("");
//         setIsSecretPromptSelected(false); // Reset after sending
//       } catch (error) {
//         // Error already handled
//       }
//     } else {
//       // Regular chat
//       if (!chatInput.trim()) return;

//       setLoadingChat(true);
//       setChatError(null);

//       try {
//         const response = await documentApi.queryFolderDocuments(
//           selectedFolder,
//           chatInput,
//           selectedChatSessionId,
//           {
//             used_secret_prompt: false // Explicitly mark as regular chat
//           }
//         );

//         if (response.sessionId) {
//           setSelectedChatSessionId(response.sessionId);
//         }

//         const history = Array.isArray(response.chatHistory)
//           ? response.chatHistory
//           : [];
//         setCurrentChatHistory(history);

//         if (history.length > 0) {
//           const latestMessage = history[history.length - 1];
//           const responseText =
//             latestMessage.response ||
//             latestMessage.answer ||
//             latestMessage.message ||
//             "";
//           setCurrentResponse(responseText);
//           setSelectedMessageId(latestMessage.id);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//           animateResponse(responseText);
//         }
//         setChatInput("");
//       } catch (err) {
//         setChatError(
//           `Failed to send message: ${err.response?.data?.details || err.message}`
//         );
//       } finally {
//         setLoadingChat(false);
//       }
//     }
//   };

//   // Handle selecting a chat
//   const handleSelectChat = (chat) => {
//     setSelectedMessageId(chat.id);
//     const responseText = chat.response || chat.answer || chat.message || "";
//     setCurrentResponse(responseText);
//     setAnimatedResponseContent(responseText);
//     setIsAnimatingResponse(false);
//     setHasResponse(true);
//     setHasAiResponse(true);
//     setForceSidebarCollapsed(true);
//   };

//   // Handle new chat
//   const handleNewChat = () => {
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);
//     setChatInput("");
//     setSelectedMessageId(null);
//     setCurrentResponse("");
//     setAnimatedResponseContent("");
//     setIsSecretPromptSelected(false);
//     setSelectedSecretId(null);
//     // Reset to first secret as default
//     if (secrets.length > 0) {
//       setActiveDropdown(secrets[0].name);
//       setSelectedSecretId(secrets[0].id);
//     }
//   };

//   // Handle dropdown selection
//   const handleDropdownSelect = (secretName, secretId) => {
//     setActiveDropdown(secretName);
//     setSelectedSecretId(secretId);
//     setIsSecretPromptSelected(true);
//     setChatInput(""); // Clear any custom input
//     setShowDropdown(false);
//   };

//   // Handle custom input change
//   const handleChatInputChange = (e) => {
//     setChatInput(e.target.value);
//     setIsSecretPromptSelected(false); // Switch to custom query mode
//     setActiveDropdown("Custom Query");
//   };

//   // Format relative time
//   const getRelativeTime = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInSeconds = Math.floor((now - date) / 1000);

//     if (diffInSeconds < 60) return `Last message ${diffInSeconds} seconds ago`;
//     if (diffInSeconds < 3600)
//       return `Last message ${Math.floor(diffInSeconds / 60)} minutes ago`;
//     if (diffInSeconds < 86400)
//       return `Last message ${Math.floor(diffInSeconds / 3600)} hours ago`;
//     return `Last message ${Math.floor(diffInSeconds / 86400)} days ago`;
//   };

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleString();
//     } catch (e) {
//       return 'Invalid date';
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Load secrets on mount
//   useEffect(() => {
//     fetchSecrets();
//   }, []);

//   useEffect(() => {
//     setChatSessions([]);
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);

//     if (selectedFolder && selectedFolder !== "Test") {
//       fetchChatHistory();
//     }
//   }, [selectedFolder]);

//   if (!selectedFolder) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//         Select a folder to start chatting.
//       </div>
//     );
//   }
//   const containerStyle = {
//     marginLeft: '0px',
//     marginRight: '0px',
//   };
//   const aiResponseStyle = {
//     fontFamily: '"Crimson Text", Georgia, "Times New Roman", serif',
//     fontSize: '20px'
//   };

//   return (
//     <div className="flex h-screen bg-white" style={containerStyle}>
//       {/* Left Panel - Chat History */}
//       <div className={`${hasResponse ? 'w-[40%]' : 'w-full'} border-r border-gray-200 flex flex-col bg-white h-full`}>
//         {/* Header */}
//         <div className="p-4 border-b border-black border-opacity-20 flex-shrink-0">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
//             <button
//               onClick={handleNewChat}
//               className="px-3 py-1.5 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors" style={{ backgroundColor: '#21C1B6' }}
//             >
//               New Chat
//             </button>
//           </div>

//           {/* Search Input */}
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search questions..."
//               className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//             />
//           </div>
//         </div>

//         {/* Chat History List - Scrollable */}
//         <div className="flex-1 overflow-y-auto px-4 py-2">
//           <div className="space-y-2">
//             {currentChatHistory.map((chat) => (
//               <div
//                 key={chat.id}
//                 onClick={() => handleSelectChat(chat)}
//                 className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
//                   selectedMessageId === chat.id
//                     ? "bg-blue-50 border-blue-200 shadow-sm"
//                     : "bg-white border-gray-200 hover:bg-gray-50"
//                 }`}
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
//                       {chat.question || chat.query || "Untitled"}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {getRelativeTime(chat.created_at || chat.timestamp)}
//                     </p>
//                   </div>
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                     }}
//                     className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                   >
//                     <MoreVertical className="h-5 w-5 text-gray-400" />
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {currentChatHistory.length === 0 && !loadingChat && (
//               <div className="text-center py-12">
//                 <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//                 <p className="text-gray-500">
//                   No chats yet. Start a conversation!
//                 </p>
//               </div>
//             )}

//             {loadingChat && currentChatHistory.length === 0 && (
//               <div className="flex justify-center py-8">
//                 <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Input Area - Fixed at bottom */}
//         <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
//             <input
//               type="text"
//               placeholder={isSecretPromptSelected ? `Analysis: ${activeDropdown}` : "How can I help you today?"}
//               value={chatInput}
//               onChange={handleChatInputChange}
//               onKeyPress={(e) => e.key === "Enter" && handleNewMessage()}
//               className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent"
//               disabled={loadingChat}
//             />

//             {/* Action Buttons Row */}
//             <div className="flex items-center justify-between mt-2">
//               <div className="flex items-center space-x-2">
//                 {/* Analysis Dropdown */}
//                 <div className="relative" ref={dropdownRef}>
//                   <button
//                     onClick={() => setShowDropdown(!showDropdown)}
//                     disabled={isLoadingSecrets || loadingChat}
//                     className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
//                   >
//                     <BookOpen className="h-4 w-4" />
//                     <span className="text-sm font-medium">
//                       {isLoadingSecrets ? "Loading..." : activeDropdown}
//                     </span>
//                     <ChevronDown className="h-4 w-4" />
//                   </button>

//                   {showDropdown && !isLoadingSecrets && (
//                     <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
//                       {secrets.length > 0 ? (
//                         secrets.map((secret) => (
//                           <button
//                             key={secret.id}
//                             onClick={() =>
//                               handleDropdownSelect(secret.name, secret.id)
//                             }
//                             className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
//                           >
//                             {secret.name}
//                           </button>
//                         ))
//                       ) : (
//                         <div className="px-4 py-2.5 text-sm text-gray-500">
//                           No analysis prompts available
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={handleNewMessage}
//                   disabled={
//                     loadingChat ||
//                     (!chatInput.trim() && !isSecretPromptSelected)
//                   }
//                   style={{ backgroundColor: '#1AA49B' }} className="p-2.5 hover:bg-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
//                 >
//                   {loadingChat ? (
//                     <Loader2 className="h-5 w-5 text-white animate-spin" />
//                   ) : (
//                     <Send className="h-5 w-5 text-white" />
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Error Message */}
//           {chatError && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
//               {chatError}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Right Panel - AI Response */}
//       {hasResponse && selectedMessageId && (
//         <div className="w-[60%] flex flex-col h-full">
//           <div className="flex-1 overflow-y-auto" ref={responseRef}>
//             {currentResponse || animatedResponseContent ? (
//               <div className="px-2 py-2" style={aiResponseStyle}>
//                 <div className="max-w-none">
//                   {/* Response Header */}
//                   <div className="mb-6 pb-4 border-b border-gray-200">
//                     <div className="flex items-center justify-between">
//                       <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
//                       <div className="flex items-center space-x-2 text-sm text-gray-500">
//                         {currentChatHistory.find(msg => msg.id === selectedMessageId)?.timestamp && (
//                           <span>{formatDate(currentChatHistory.find(msg => msg.id === selectedMessageId).timestamp)}</span>
//                         )}
//                       </div>
//                     </div>
//                     {/* Original Question */}
//                     <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//                       <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
//                       <p className="text-sm text-blue-800">
//                         {currentChatHistory.find(msg => msg.id === selectedMessageId)?.question || 'No question available'}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Response Content */}
//                   <div className="prose prose-gray max-w-none">
//                     <ReactMarkdown
//                       remarkPlugins={[remarkGfm]}
//                       components={{
//                         h1: (props) => (
//                           <h1
//                             className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2"
//                             {...props}
//                           />
//                         ),
//                         h2: (props) => (
//                           <h2
//                             className="text-xl font-bold mb-4 mt-6 text-black"
//                             {...props}
//                           />
//                         ),
//                         h3: (props) => (
//                           <h3
//                             className="text-lg font-bold mb-3 mt-4 text-black"
//                             {...props}
//                           />
//                         ),
//                         p: (props) => (
//                           <p
//                             className="mb-4 leading-relaxed text-black text-justify"
//                             {...props}
//                           />
//                         ),
//                         strong: (props) => (
//                           <strong className="font-bold text-black" {...props} />
//                         ),
//                         ul: (props) => (
//                           <ul className="list-disc pl-5 mb-4 text-black" {...props} />
//                         ),
//                         ol: (props) => (
//                           <ol className="list-decimal pl-5 mb-4 text-black" {...props} />
//                         ),
//                         li: (props) => (
//                           <li className="mb-2 leading-relaxed text-black" {...props} />
//                         ),
//                         blockquote: (props) => (
//                           <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props} />
//                         ),
//                         code: ({ inline, ...props }) => {
//                           const className = inline 
//                             ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-700" 
//                             : "block bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto my-4 text-red-700";
//                           return <code className={className} {...props} />;
//                         },
//                       }}
//                     >
//                       {animatedResponseContent || currentResponse}
//                     </ReactMarkdown>
//                     {isAnimatingResponse && (
//                       <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center max-w-md px-6">
//                   <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
//                   <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
//                   <p className="text-gray-600 text-lg leading-relaxed">
//                     Click on any question from the left panel to view the AI response here.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatInterface;







// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//  Plus,
//  Shuffle,
//  Search,
//  BookOpen,
//  ChevronDown,
//  MoreVertical,
//  MessageSquare,
//  Loader2,
//  Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";

// const ChatInterface = () => {
//  const {
//  selectedFolder,
//  setChatSessions,
//  selectedChatSessionId,
//  setSelectedChatSessionId,
//  setHasAiResponse,
//  } = useContext(FileManagerContext);
//  const { setForceSidebarCollapsed } = useContext(SidebarContext);

//  const [currentChatHistory, setCurrentChatHistory] = useState([]);
//  const [loadingChat, setLoadingChat] = useState(false);
//  const [chatError, setChatError] = useState(null);

//  const [chatInput, setChatInput] = useState("");
//  const [currentResponse, setCurrentResponse] = useState("");
//  const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//  const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//  const [selectedMessageId, setSelectedMessageId] = useState(null);
//  const [hasResponse, setHasResponse] = useState(false);

//  // Secret prompt states
//  const [secrets, setSecrets] = useState([]);
//  const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
//  const [selectedSecretId, setSelectedSecretId] = useState(null);
//  const [selectedLlmName, setSelectedLlmName] = useState(null); // Declare selectedLlmName state
//  const [activeDropdown, setActiveDropdown] = useState("Summary");
//  const [showDropdown, setShowDropdown] = useState(false);
//  const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);

//  const responseRef = useRef(null);
//  const dropdownRef = useRef(null);

//  // API Configuration
//  const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";

//  const getAuthToken = () => {
//  const tokenKeys = [
//  "authToken",
//  "token",
//  "accessToken",
//  "jwt",
//  "bearerToken",
//  "auth_token",
//  "access_token",
//  "api_token",
//  "userToken",
//  ];

//  for (const key of tokenKeys) {
//  const token = localStorage.getItem(key);
//  if (token) {
//  return token;
//  }
//  }
//  return null;
//  };

//  // Fetch secrets list
//  const fetchSecrets = async () => {
//  try {
//  setIsLoadingSecrets(true);
//  setChatError(null);

//  const token = getAuthToken();
//  const headers = {
//  "Content-Type": "application/json",
//  };

//  if (token) {
//  headers["Authorization"] = `Bearer ${token}`;
//  }

//  const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
//  method: "GET",
//  headers,
//  });

//  if (!response.ok) {
//  throw new Error(`Failed to fetch secrets: ${response.status}`);
//  }

//  const secretsData = await response.json();
//  setSecrets(secretsData || []);

//  if (secretsData && secretsData.length > 0) {
//  setActiveDropdown(secretsData[0].name);
//  setSelectedSecretId(secretsData[0].id);
//  setSelectedLlmName(secretsData[0].llm_name); // Ensure LLM name is set
//  setIsSecretPromptSelected(true); // Set to true when a default secret is selected
//  } else {
//  setActiveDropdown('Custom Query'); // Default to Custom Query if no secrets
//  setSelectedSecretId(null);
//  setSelectedLlmName(null);
//  setIsSecretPromptSelected(false);
//  }
//  } catch (error) {
//  console.error("Error fetching secrets:", error);
//  setChatError(`Failed to load analysis prompts: ${error.message}`);
//  } finally {
//  setIsLoadingSecrets(false);
//  }
//  };

//  // Fetch secret value by ID
//  const fetchSecretValue = async (secretId) => {
//  try {
//  const existingSecret = secrets.find((secret) => secret.id === secretId);
//  if (existingSecret && existingSecret.value) {
//  return existingSecret.value;
//  }

//  const token = getAuthToken();
//  const headers = {
//  "Content-Type": "application/json",
//  };

//  if (token) {
//  headers["Authorization"] = `Bearer ${token}`;
//  }

//  const response = await fetch(
//  `${API_BASE_URL}/files/secrets/${secretId}`,
//  {
//  method: "GET",
//  headers,
//  }
//  );

//  if (!response.ok) {
//  throw new Error(`Failed to fetch secret value: ${response.status}`);
//  }

//  const secretData = await response.json();
//  const promptValue =
//  secretData.value || secretData.prompt || secretData.content || secretData;

//  setSecrets((prevSecrets) =>
//  prevSecrets.map((secret) =>
//  secret.id === secretId ? { ...secret, value: promptValue } : secret
//  )
//  );

//  return promptValue || "";
//  } catch (error) {
//  console.error("Error fetching secret value:", error);
//  throw new Error("Failed to retrieve analysis prompt");
//  }
//  };

//  // Fetch chat history
//  const fetchChatHistory = async (sessionId) => {
//  if (!selectedFolder) return;

//  setLoadingChat(true);
//  setChatError(null);

//  try {
//  let data = await documentApi.getFolderChats(selectedFolder);
//  const chats = Array.isArray(data.chats) ? data.chats : [];
//  setCurrentChatHistory(chats);

//  if (sessionId) {
//  setSelectedChatSessionId(sessionId);
//  const selectedChat = chats.find((c) => c.id === sessionId);
//  if (selectedChat) {
//  const responseText =
//  selectedChat.response ||
//  selectedChat.answer ||
//  selectedChat.message ||
//  "";
//  setCurrentResponse(responseText);
//  setAnimatedResponseContent(responseText);
//  setSelectedMessageId(selectedChat.id);
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  } else if (selectedFolder === "Test" && chats.length > 0) {
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  }
//  } else {
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  }
//  } catch (err) {
//  console.error("❌ Error fetching chats:", err);
//  setChatError("Failed to fetch chat history.");
//  } finally {
//  setLoadingChat(false);
//  }
//  };

//  // Animate typing effect
//  const animateResponse = (text) => {
//  setAnimatedResponseContent("");
//  setIsAnimatingResponse(true);
//  let i = 0;
//  const interval = setInterval(() => {
//  if (i < text.length) {
//  setAnimatedResponseContent((prev) => prev + text.charAt(i));
//  i++;
//  if (responseRef.current) {
//  responseRef.current.scrollTop = responseRef.current.scrollHeight;
//  }
//  } else {
//  clearInterval(interval);
//  setIsAnimatingResponse(false);
//  }
//  }, 20);
//  };

//  // Chat with AI using secret prompt - CORRECTED
//  const chatWithAI = async (folder, secretId, currentSessionId) => {
//  try {
//  setLoadingChat(true);
//  setChatError(null);

//  const selectedSecret = secrets.find((s) => s.id === secretId);
//  if (!selectedSecret) {
//  throw new Error("No prompt found for selected analysis type");
//  }

//  let promptValue = selectedSecret.value;
//  const promptLabel = selectedSecret.name;

//  // If the secret doesn't have a value, fetch it
//  if (!promptValue) {
//  promptValue = await fetchSecretValue(secretId);
//  }

//  if (!promptValue) {
//  throw new Error("Secret prompt value is empty.");
//  }

//  // CORRECTED: Send the actual prompt value to backend with metadata
//  const response = await documentApi.queryFolderDocuments(
//  folder,
//  promptValue, // Send the actual prompt content
//  currentSessionId,
//  {
//  used_secret_prompt: true, // Flag that this uses a secret prompt
//  prompt_label: promptLabel, // Store the name/label of the prompt
//  secret_id: secretId // Optional: store the secret ID reference
//  }
//  );

//  if (response.sessionId) {
//  setSelectedChatSessionId(response.sessionId);
//  }

//  const history = Array.isArray(response.chatHistory)
//  ? response.chatHistory
//  : [];
//  setCurrentChatHistory(history);

//  if (history.length > 0) {
//  const latestMessage = history[history.length - 1];
//  const responseText =
//  latestMessage.response ||
//  latestMessage.answer ||
//  latestMessage.message ||
//  "";
//  setCurrentResponse(responseText);
//  setSelectedMessageId(latestMessage.id);
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  animateResponse(responseText);
//  }

//  return response;
//  } catch (error) {
//  setChatError(`Analysis failed: ${error.message}`);
//  throw error;
//  } finally {
//  setLoadingChat(false);
//  }
//  };

//  // Handle new message (combines regular chat and secret prompt)
//  const handleNewMessage = async () => {
//  if (!selectedFolder) return;

//  if (isSecretPromptSelected) {
//  // Using secret prompt
//  if (!selectedSecretId) {
//  setChatError("Please select an analysis type.");
//  return;
//  }
//  try {
//  await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
//  setChatInput("");
//  setIsSecretPromptSelected(false); // Reset after sending
//  } catch (error) {
//  // Error already handled
//  }
//  } else {
//  // Regular chat
//  if (!chatInput.trim()) return;

//  setLoadingChat(true);
//  setChatError(null);

//  try {
//  const response = await documentApi.queryFolderDocuments(
//  selectedFolder,
//  chatInput,
//  selectedChatSessionId,
//  {
//  used_secret_prompt: false // Explicitly mark as regular chat
//  }
//  );

//  if (response.sessionId) {
//  setSelectedChatSessionId(response.sessionId);
//  }

//  const history = Array.isArray(response.chatHistory)
//  ? response.chatHistory
//  : [];
//  setCurrentChatHistory(history);

//  if (history.length > 0) {
//  const latestMessage = history[history.length - 1];
//  const responseText =
//  latestMessage.response ||
//  latestMessage.answer ||
//  latestMessage.message ||
//  "";
//  setCurrentResponse(responseText);
//  setSelectedMessageId(latestMessage.id);
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  animateResponse(responseText);
//  }
//  setChatInput("");
//  } catch (err) {
//  setChatError(
//  `Failed to send message: ${err.response?.data?.details || err.message}`
//  );
//  } finally {
//  setLoadingChat(false);
//  }
//  }
//  };

//  // Handle selecting a chat
//  const handleSelectChat = (chat) => {
//  setSelectedMessageId(chat.id);
//  const responseText = chat.response || chat.answer || chat.message || "";
//  setCurrentResponse(responseText);
//  setAnimatedResponseContent(responseText);
//  setIsAnimatingResponse(false);
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  };

//  // Handle new chat
//  const handleNewChat = () => {
//  setCurrentChatHistory([]);
//  setSelectedChatSessionId(null);
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  setChatInput("");
//  setSelectedMessageId(null);
//  setCurrentResponse("");
//  setAnimatedResponseContent("");
//  setIsSecretPromptSelected(false);
//  setSelectedSecretId(null);
//  setSelectedLlmName(null); // Reset LLM name
//  // Reset to first secret as default or 'Custom Query'
//  if (secrets.length > 0) {
//  setActiveDropdown(secrets[0].name);
//  setSelectedSecretId(secrets[0].id);
//  setSelectedLlmName(secrets[0].llm_name); // Ensure LLM name is set
//  setIsSecretPromptSelected(true); // Set to true when resetting to default secret
//  } else {
//  setActiveDropdown('Custom Query'); // If no secrets, explicitly set to Custom Query
//  setIsSecretPromptSelected(false);
//  }
//  };

//  // Handle dropdown selection
//  const handleDropdownSelect = (secretName, secretId) => {
//  setActiveDropdown(secretName);
//  setSelectedSecretId(secretId);
//  setIsSecretPromptSelected(true);
//  setChatInput(""); // Clear any custom input
//  setShowDropdown(false);
//  };

//  // Handle custom input change
//  const handleChatInputChange = (e) => {
//  setChatInput(e.target.value);
//  // If a secret prompt is currently selected, typing should be considered additional input for that prompt.
//  // Only switch to "Custom Query" if no secret prompt is selected AND the dropdown is not already "Custom Query".
//  if (!isSecretPromptSelected && activeDropdown !== 'Custom Query') {
//  setActiveDropdown('Custom Query');
//  setSelectedSecretId(null);
//  setSelectedLlmName(null); // Reset LLM name when switching to custom query
//  }
//  };

//  // Format relative time
//  const getRelativeTime = (dateString) => {
//  const date = new Date(dateString);
//  const now = new Date();
//  const diffInSeconds = Math.floor((now - date) / 1000);

//  if (diffInSeconds < 60) return `Last message ${diffInSeconds} seconds ago`;
//  if (diffInSeconds < 3600)
//  return `Last message ${Math.floor(diffInSeconds / 60)} minutes ago`;
//  if (diffInSeconds < 86400)
//  return `Last message ${Math.floor(diffInSeconds / 3600)} hours ago`;
//  return `Last message ${Math.floor(diffInSeconds / 86400)} days ago`;
//  };

//  const formatDate = (dateString) => {
//  try {
//  return new Date(dateString).toLocaleString();
//  } catch (e) {
//  return 'Invalid date';
//  }
//  };

//  // Close dropdown when clicking outside
//  useEffect(() => {
//  const handleClickOutside = (event) => {
//  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//  setShowDropdown(false);
//  }
//  };

//  document.addEventListener("mousedown", handleClickOutside);
//  return () => {
//  document.removeEventListener("mousedown", handleClickOutside);
//  };
//  }, []);

//  // Load secrets on mount
//  useEffect(() => {
//  fetchSecrets();
//  }, []);

//  useEffect(() => {
//  setChatSessions([]);
//  setCurrentChatHistory([]);
//  setSelectedChatSessionId(null);
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);

//  if (selectedFolder && selectedFolder !== "Test") {
//  fetchChatHistory();
//  }
//  }, [selectedFolder]);

//  if (!selectedFolder) {
//  return (
//  <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//  Select a folder to start chatting.
//  </div>
//  );
//  }

//  return (
//  <div className="flex h-screen bg-white">
//  {/* Left Panel - Chat History */}
//  <div className={`${hasResponse ? 'w-1/2' : 'w-full'} border-r border-gray-200 flex flex-col bg-white h-full`}>
//  {/* Header */}
//  <div className="p-4 border-b border-black border-opacity-20 flex-shrink-0">
//  <div className="flex items-center justify-between mb-4">
//  <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
//  <button
//  onClick={handleNewChat}
//  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
//  >
//  New Chat
//  </button>
//  </div>

//  {/* Search Input */}
//  <div className="relative mb-4">
//  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//  <input
//  type="text"
//  placeholder="Search questions..."
//  className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//  />
//  </div>
//  </div>

//  {/* Chat History List - Scrollable */}
//  <div className="flex-1 overflow-y-auto px-4 py-2">
//  <div className="space-y-2">
//  {currentChatHistory.map((chat) => (
//  <div
//  key={chat.id}
//  onClick={() => handleSelectChat(chat)}
//  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
//  selectedMessageId === chat.id
//  ? "bg-blue-50 border-blue-200 shadow-sm"
//  : "bg-white border-gray-200 hover:bg-gray-50"
//  }`}
//  >
//  <div className="flex items-start justify-between">
//  <div className="flex-1 min-w-0">
//  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
//  {chat.question || chat.query || "Untitled"}
//  </p>
//  <p className="text-xs text-gray-500">
//  {getRelativeTime(chat.created_at || chat.timestamp)}
//  </p>
//  </div>
//  <button
//  onClick={(e) => {
//  e.stopPropagation();
//  }}
//  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//  >
//  <MoreVertical className="h-5 w-5 text-gray-400" />
//  </button>
//  </div>
//  </div>
//  ))}

//  {currentChatHistory.length === 0 && !loadingChat && (
//  <div className="text-center py-12">
//  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//  <p className="text-gray-500">
//  No chats yet. Start a conversation!
//  </p>
//  </div>
//  )}

//  {loadingChat && currentChatHistory.length === 0 && (
//  <div className="flex justify-center py-8">
//  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//  </div>
//  )}
//  </div>
//  </div>

//  {/* Input Area - Fixed at bottom */}
//  <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
//  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
//  <input
//  type="text"
//  placeholder={isSecretPromptSelected ? `Analysis: ${activeDropdown}` : "How can I help you today?"}
//  value={chatInput}
//  onChange={handleChatInputChange}
//  onKeyPress={(e) => e.key === "Enter" && handleNewMessage()}
//  className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent"
//  disabled={loadingChat}
//  />

//  {/* Action Buttons Row */}
//  <div className="flex items-center justify-between mt-2">
//  <div className="flex items-center space-x-2">
//  {/* Analysis Dropdown */}
//  <div className="relative" ref={dropdownRef}>
//  <button
//  onClick={() => setShowDropdown(!showDropdown)}
//  disabled={isLoadingSecrets || loadingChat}
//  className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
//  >
//  <BookOpen className="h-4 w-4" />
//  <span className="text-sm font-medium">
//  {isLoadingSecrets ? "Loading..." : activeDropdown}
//  </span>
//  <ChevronDown className="h-4 w-4" />
//  </button>

//  {showDropdown && !isLoadingSecrets && (
//  <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
//  {secrets.length > 0 ? (
//  secrets.map((secret) => (
//  <button
//  key={secret.id}
//  onClick={() =>
//  handleDropdownSelect(secret.name, secret.id)
//  }
//  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
//  >
//  {secret.name}
//  </button>
//  ))
//  ) : (
//  <div className="px-4 py-2.5 text-sm text-gray-500">
//  No analysis prompts available
//  </div>
//  )}
//  </div>
//  )}
//  </div>
//  </div>

//  <div className="flex items-center space-x-2">
//  <button
//  onClick={handleNewMessage}
//  disabled={
//  loadingChat ||
//  (!chatInput.trim() && !isSecretPromptSelected)
//  }
//  className="p-2.5 bg-orange-300 hover:bg-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
//  >
//  {loadingChat ? (
//  <Loader2 className="h-5 w-5 text-white animate-spin" />
//  ) : (
//  <Send className="h-5 w-5 text-white" />
//  )}
//  </button>
//  </div>
//  </div>
//  </div>

//  {/* Error Message */}
//  {chatError && (
//  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
//  {chatError}
//  </div>
//  )}
//  </div>
//  </div>

//  {/* Right Panel - AI Response */}
//  {hasResponse && selectedMessageId && (
//  <div className="w-1/2 flex flex-col h-full">
//  <div className="flex-1 overflow-y-auto" ref={responseRef}>
//  {currentResponse || animatedResponseContent ? (
//  <div className="px-6 py-6">
//  <div className="max-w-none">
//  {/* Response Header */}
//  <div className="mb-6 pb-4 border-b border-gray-200">
//  <div className="flex items-center justify-between">
//  <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
//  <div className="flex items-center space-x-2 text-sm text-gray-500">
//  {currentChatHistory.find(msg => msg.id === selectedMessageId)?.timestamp && (
//  <span>{formatDate(currentChatHistory.find(msg => msg.id === selectedMessageId).timestamp)}</span>
//  )}
//  </div>
//  </div>
//  {/* Original Question */}
//  <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//  <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
//  <p className="text-sm text-blue-800">
//  {currentChatHistory.find(msg => msg.id === selectedMessageId)?.question || 'No question available'}
//  </p>
//  </div>
//  </div>

//  {/* Response Content */}
//  <div className="prose prose-gray max-w-none">
//  <ReactMarkdown
//  remarkPlugins={[remarkGfm]}
//  components={{
//  h1: (props) => (
//  <h1
//  className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2"
//  {...props}
//  />
//  ),
//  h2: (props) => (
//  <h2
//  className="text-xl font-bold mb-4 mt-6 text-black"
//  {...props}
//  />
//  ),
//  h3: (props) => (
//  <h3
//  className="text-lg font-bold mb-3 mt-4 text-black"
//  {...props}
//  />
//  ),
//  p: (props) => (
//  <p
//  className="mb-4 leading-relaxed text-black text-justify"
//  {...props}
//  />
//  ),
//  strong: (props) => (
//  <strong className="font-bold text-black" {...props} />
//  ),
//  ul: (props) => (
//  <ul className="list-disc pl-5 mb-4 text-black" {...props} />
//  ),
//  ol: (props) => (
//  <ol className="list-decimal pl-5 mb-4 text-black" {...props} />
//  ),
//  li: (props) => (
//  <li className="mb-2 leading-relaxed text-black" {...props} />
//  ),
//  blockquote: (props) => (
//  <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props} />
//  ),
//  code: ({ inline, ...props }) => {
//  const className = inline 
//  ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-700" 
//  : "block bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto my-4 text-red-700";
//  return <code className={className} {...props} />;
//  },
//  }}
//  >
//  {animatedResponseContent || currentResponse}
//  </ReactMarkdown>
//  {isAnimatingResponse && (
//  <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>
//  )}
//  </div>
//  </div>
//  </div>
//  ) : (
//  <div className="flex items-center justify-center h-full">
//  <div className="text-center max-w-md px-6">
//  <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
//  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
//  <p className="text-gray-600 text-lg leading-relaxed">
//  Click on any question from the left panel to view the AI response here.
//  </p>
//  </div>
//  </div>
//  )}
//  </div>
//  </div>
//  )}
//  </div>
//  );
// };

// export default ChatInterface;




// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//  Plus,
//  Search,
//  BookOpen,
//  ChevronDown,
//  MoreVertical,
//  MessageSquare,
//  Loader2,
//  Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";

// const ChatInterface = () => {
//  const {
//  selectedFolder,
//  setChatSessions,
//  selectedChatSessionId,
//  setSelectedChatSessionId,
//  setHasAiResponse,
//  } = useContext(FileManagerContext);
//  const { setForceSidebarCollapsed } = useContext(SidebarContext);

//  const [currentChatHistory, setCurrentChatHistory] = useState([]);
//  const [loadingChat, setLoadingChat] = useState(false);
//  const [chatError, setChatError] = useState(null);
//  const [chatInput, setChatInput] = useState("");
//  const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//  const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//  const [selectedMessageId, setSelectedMessageId] = useState(null);
//  const [hasResponse, setHasResponse] = useState(false);

//  // Secret prompt states
//  const [secrets, setSecrets] = useState([]);
//  const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
//  const [selectedSecretId, setSelectedSecretId] = useState(null);
//  const [selectedLlmName, setSelectedLlmName] = useState(null);
//  const [activeDropdown, setActiveDropdown] = useState("Summary");
//  const [showDropdown, setShowDropdown] = useState(false);
//  const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);

//  const responseRef = useRef(null);
//  const dropdownRef = useRef(null);
//  const animationIntervalRef = useRef(null);

//  // API Configuration
//  const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";

//  const getAuthToken = () => {
//  const tokenKeys = [
//  "authToken",
//  "token",
//  "accessToken",
//  "jwt",
//  "bearerToken",
//  "auth_token",
//  "access_token",
//  "api_token",
//  "userToken",
//  ];
//  for (const key of tokenKeys) {
//  const token = localStorage.getItem(key);
//  if (token) return token;
//  }
//  return null;
//  };

//  // Fetch secrets list
//  const fetchSecrets = async () => {
//  try {
//  setIsLoadingSecrets(true);
//  setChatError(null);
//  const token = getAuthToken();
//  const headers = { "Content-Type": "application/json" };
//  if (token) headers["Authorization"] = `Bearer ${token}`;

//  const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
//  method: "GET",
//  headers,
//  });

//  if (!response.ok) throw new Error(`Failed to fetch secrets: ${response.status}`);
//  const secretsData = await response.json();
//  setSecrets(secretsData || []);

//  if (secretsData?.length > 0) {
//  setActiveDropdown(secretsData[0].name);
//  setSelectedSecretId(secretsData[0].id);
//  setSelectedLlmName(secretsData[0].llm_name);
//  setIsSecretPromptSelected(true);
//  } else {
//  setActiveDropdown("Custom Query");
//  setSelectedSecretId(null);
//  setSelectedLlmName(null);
//  setIsSecretPromptSelected(false);
//  }
//  } catch (error) {
//  console.error("Error fetching secrets:", error);
//  setChatError(`Failed to load analysis prompts: ${error.message}`);
//  } finally {
//  setIsLoadingSecrets(false);
//  }
//  };

//  // Fetch secret value by ID
//  const fetchSecretValue = async (secretId) => {
//  try {
//  const existingSecret = secrets.find((secret) => secret.id === secretId);
//  if (existingSecret?.value) return existingSecret.value;

//  const token = getAuthToken();
//  const headers = { "Content-Type": "application/json" };
//  if (token) headers["Authorization"] = `Bearer ${token}`;

//  const response = await fetch(`${API_BASE_URL}/files/secrets/${secretId}`, {
//  method: "GET",
//  headers,
//  });

//  if (!response.ok) throw new Error(`Failed to fetch secret value: ${response.status}`);
//  const secretData = await response.json();
//  const promptValue = secretData.value || secretData.prompt || secretData.content || secretData;

//  setSecrets((prevSecrets) =>
//  prevSecrets.map((secret) =>
//  secret.id === secretId ? { ...secret, value: promptValue } : secret
//  )
//  );
//  return promptValue || "";
//  } catch (error) {
//  console.error("Error fetching secret value:", error);
//  throw new Error("Failed to retrieve analysis prompt");
//  }
//  };

//  // Fetch chat history
//  const fetchChatHistory = async (sessionId) => {
//  if (!selectedFolder) return;

//  setLoadingChat(true);
//  setChatError(null);
//  try {
//  const data = await documentApi.getFolderChats(selectedFolder);
//  const chats = Array.isArray(data.chats) ? data.chats : [];
//  setCurrentChatHistory(chats);

//  if (sessionId) {
//  setSelectedChatSessionId(sessionId);
//  const selectedChat = chats.find((c) => c.id === sessionId);
//  if (selectedChat) {
//  const responseText = selectedChat.response || selectedChat.answer || selectedChat.message || "";
//  setSelectedMessageId(selectedChat.id);
//  setAnimatedResponseContent(responseText);
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  }
//  } else {
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  }
//  } catch (err) {
//  console.error("Error fetching chats:", err);
//  setChatError("Failed to fetch chat history.");
//  } finally {
//  setLoadingChat(false);
//  }
//  };

//  // Animate typing effect
//  const animateResponse = (text) => {
//  // Clear any existing animation
//  if (animationIntervalRef.current) {
//  clearInterval(animationIntervalRef.current);
//  animationIntervalRef.current = null;
//  }

//  setAnimatedResponseContent("");
//  setIsAnimatingResponse(true);
 
//  let i = 0;
//  animationIntervalRef.current = setInterval(() => {
//  if (i < text.length) {
//  setAnimatedResponseContent((prev) => prev + text.charAt(i));
//  i++;
//  if (responseRef.current) {
//  responseRef.current.scrollTop = responseRef.current.scrollHeight;
//  }
//  } else {
//  clearInterval(animationIntervalRef.current);
//  animationIntervalRef.current = null;
//  setIsAnimatingResponse(false);
//  }
//  }, 15); // Faster animation for better UX
//  };

//  // Cleanup animation on unmount
//  useEffect(() => {
//  return () => {
//  if (animationIntervalRef.current) {
//  clearInterval(animationIntervalRef.current);
//  }
//  };
//  }, []);

//  // Chat with AI using secret prompt
//  const chatWithAI = async (folder, secretId, currentSessionId) => {
//  try {
//  setLoadingChat(true);
//  setChatError(null);
 
//  // Don't reset the panel if we're continuing a session
//  const isContinuingSession = !!currentSessionId && currentChatHistory.length > 0;
 
//  if (!isContinuingSession) {
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  }

//  const selectedSecret = secrets.find((s) => s.id === secretId);
//  if (!selectedSecret) throw new Error("No prompt found for selected analysis type");

//  let promptValue = selectedSecret.value;
//  const promptLabel = selectedSecret.name;

//  if (!promptValue) promptValue = await fetchSecretValue(secretId);
//  if (!promptValue) throw new Error("Secret prompt value is empty.");

//  console.log("🔄 Sending request with session:", currentSessionId);

//  const response = await documentApi.queryFolderDocuments(folder, promptValue, currentSessionId, {
//  used_secret_prompt: true,
//  prompt_label: promptLabel,
//  secret_id: secretId,
//  });

//  console.log("🔍 Full API Response:", response);

//  // Handle session ID from various possible locations
//  const sessionId = response.sessionId || response.session_id || response.id;
//  console.log("🆔 Session ID - Current:", currentSessionId, "New:", sessionId);
 
//  if (sessionId) {
//  setSelectedChatSessionId(sessionId);
//  }

//  // Try multiple possible response structures
//  let history = [];
//  let responseText = "";
//  let messageId = null;

//  // Case 1: Response has chatHistory array
//  if (Array.isArray(response.chatHistory) && response.chatHistory.length > 0) {
//  history = response.chatHistory;
//  const latestMessage = history[history.length - 1];
//  responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
//  messageId = latestMessage.id;
//  }
//  // Case 2: Response has chat_history array
//  else if (Array.isArray(response.chat_history) && response.chat_history.length > 0) {
//  history = response.chat_history;
//  const latestMessage = history[history.length - 1];
//  responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
//  messageId = latestMessage.id;
//  }
//  // Case 3: Response has messages array
//  else if (Array.isArray(response.messages) && response.messages.length > 0) {
//  history = response.messages;
//  const latestMessage = history[history.length - 1];
//  responseText = latestMessage.response || latestMessage.answer || latestMessage.message || latestMessage.content || "";
//  messageId = latestMessage.id;
//  }
//  // Case 4: Direct response object
//  else if (response.response || response.answer || response.message || response.content) {
//  responseText = response.response || response.answer || response.message || response.content;
//  messageId = response.id || Date.now().toString();
//  // Merge with existing history if continuing session
//  const newMessage = {
//  id: messageId,
//  question: promptLabel, // Use promptLabel instead of promptValue
//  response: responseText,
//  timestamp: new Date().toISOString(),
//  created_at: new Date().toISOString(),
//  isSecretPrompt: true, // Flag to indicate secret prompt
//  };
//  history = isContinuingSession ? [...currentChatHistory, newMessage] : [newMessage];
//  }

//  console.log("📝 Extracted Response Text:", responseText);
//  console.log("📚 Chat History Length:", history.length);

//  setCurrentChatHistory(history);

//  if (responseText && responseText.trim()) {
//  setSelectedMessageId(messageId);
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  animateResponse(responseText);
//  } else {
//  console.error("❌ No response text found in:", response);
//  setChatError("Received empty response from server. Check console for details.");
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  }

//  return response;
//  } catch (error) {
//  console.error("Chat error:", error);
//  setChatError(`Analysis failed: ${error.message}`);
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  throw error;
//  } finally {
//  setLoadingChat(false);
//  }
//  };

//  // Handle new message
//  const handleNewMessage = async () => {
//  if (!selectedFolder) return;

//  if (isSecretPromptSelected) {
//  if (!selectedSecretId) {
//  setChatError("Please select an analysis type.");
//  return;
//  }
//  await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
//  setChatInput("");
//  setIsSecretPromptSelected(false);
//  } else {
//  if (!chatInput.trim()) return;

//  const questionText = chatInput.trim();
//  setLoadingChat(true);
//  setChatError(null);
 
//  // Don't reset the panel if we're continuing a session
//  const isContinuingSession = !!selectedChatSessionId && currentChatHistory.length > 0;
 
//  if (!isContinuingSession) {
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  }

//  try {
//  console.log("🔄 Sending message with session:", selectedChatSessionId);

//  const response = await documentApi.queryFolderDocuments(
//  selectedFolder,
//  questionText,
//  selectedChatSessionId,
//  { used_secret_prompt: false }
//  );

//  console.log("🔍 Full API Response:", response);

//  // Handle session ID from various possible locations
//  const sessionId = response.sessionId || response.session_id || response.id;
//  console.log("🆔 Session ID - Current:", selectedChatSessionId, "New:", sessionId);
 
//  if (sessionId) {
//  setSelectedChatSessionId(sessionId);
//  }

//  // Try multiple possible response structures
//  let history = [];
//  let responseText = "";
//  let messageId = null;

//  // Case 1: Response has chatHistory array
//  if (Array.isArray(response.chatHistory) && response.chatHistory.length > 0) {
//  history = response.chatHistory;
//  const latestMessage = history[history.length - 1];
//  responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
//  messageId = latestMessage.id;
//  }
//  // Case 2: Response has chat_history array
//  else if (Array.isArray(response.chat_history) && response.chat_history.length > 0) {
//  history = response.chat_history;
//  const latestMessage = history[history.length - 1];
//  responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
//  messageId = latestMessage.id;
//  }
//  // Case 3: Response has messages array
//  else if (Array.isArray(response.messages) && response.messages.length > 0) {
//  history = response.messages;
//  const latestMessage = history[history.length - 1];
//  responseText = latestMessage.response || latestMessage.answer || latestMessage.message || latestMessage.content || "";
//  messageId = latestMessage.id;
//  }
//  // Case 4: Direct response object
//  else if (response.response || response.answer || response.message || response.content) {
//  responseText = response.response || response.answer || response.message || response.content;
//  messageId = response.id || Date.now().toString();
//  // Merge with existing history if continuing session
//  const newMessage = {
//  id: messageId,
//  question: questionText,
//  response: responseText,
//  timestamp: new Date().toISOString(),
//  created_at: new Date().toISOString(),
//  isSecretPrompt: false, // Flag for custom query
//  };
//  history = isContinuingSession ? [...currentChatHistory, newMessage] : [newMessage];
//  }

//  console.log("📝 Extracted Response Text:", responseText);
//  console.log("📚 Chat History Length:", history.length);

//  setCurrentChatHistory(history);

//  if (responseText && responseText.trim()) {
//  setSelectedMessageId(messageId);
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  animateResponse(responseText);
//  } else {
//  console.error("❌ No response text found in:", response);
//  setChatError("Received empty response from server. Check console for details.");
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  }
//  setChatInput("");
//  } catch (err) {
//  console.error("Error sending message:", err);
//  setChatError(`Failed to send message: ${err.response?.data?.details || err.message}`);
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  } finally {
//  setLoadingChat(false);
//  }
//  }
//  };

//  // Handle selecting a chat
//  const handleSelectChat = (chat) => {
//  // Clear any ongoing animation
//  if (animationIntervalRef.current) {
//  clearInterval(animationIntervalRef.current);
//  animationIntervalRef.current = null;
//  }

//  setSelectedMessageId(chat.id);
//  const responseText = chat.response || chat.answer || chat.message || "";
//  setAnimatedResponseContent(responseText);
//  setIsAnimatingResponse(false);
//  setHasResponse(true);
//  setHasAiResponse(true);
//  setForceSidebarCollapsed(true);
//  };

//  // Handle new chat
//  const handleNewChat = () => {
//  // Clear any ongoing animation
//  if (animationIntervalRef.current) {
//  clearInterval(animationIntervalRef.current);
//  animationIntervalRef.current = null;
//  }

//  setCurrentChatHistory([]);
//  setSelectedChatSessionId(null);
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  setChatInput("");
//  setSelectedMessageId(null);
//  setAnimatedResponseContent("");
//  setIsAnimatingResponse(false);
//  setIsSecretPromptSelected(false);
//  setSelectedSecretId(null);
//  setSelectedLlmName(null);

//  if (secrets.length > 0) {
//  setActiveDropdown(secrets[0].name);
//  setSelectedSecretId(secrets[0].id);
//  setSelectedLlmName(secrets[0].llm_name);
//  setIsSecretPromptSelected(true);
//  } else {
//  setActiveDropdown("Custom Query");
//  setIsSecretPromptSelected(false);
//  }
//  };

//  // Handle dropdown selection
//  const handleDropdownSelect = (secretName, secretId, llmName) => {
//  setActiveDropdown(secretName);
//  setSelectedSecretId(secretId);
//  setSelectedLlmName(llmName);
//  setIsSecretPromptSelected(true);
//  setChatInput("");
//  setShowDropdown(false);
//  };

//  // Handle custom input change
//  const handleChatInputChange = (e) => {
//  setChatInput(e.target.value);
//  if (e.target.value && isSecretPromptSelected) {
//  setIsSecretPromptSelected(false);
//  setActiveDropdown("Custom Query");
//  setSelectedSecretId(null);
//  setSelectedLlmName(null);
//  }
//  };

//  // Format relative time
//  const getRelativeTime = (dateString) => {
//  try {
//  const date = new Date(dateString);
//  const now = new Date();
//  const diffInSeconds = Math.floor((now - date) / 1000);
//  if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
//  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
//  return `${Math.floor(diffInSeconds / 86400)}d ago`;
//  } catch {
//  return "Unknown time";
//  }
//  };

//  // Format date for display
//  const formatDate = (dateString) => {
//  try {
//  return new Date(dateString).toLocaleString();
//  } catch {
//  return "Invalid date";
//  }
//  };

//  // Close dropdown when clicking outside
//  useEffect(() => {
//  const handleClickOutside = (event) => {
//  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//  setShowDropdown(false);
//  }
//  };
//  document.addEventListener("mousedown", handleClickOutside);
//  return () => document.removeEventListener("mousedown", handleClickOutside);
//  }, []);

//  // Load secrets on mount
//  useEffect(() => {
//  fetchSecrets();
//  }, []);

//  // Reset state when folder changes
//  useEffect(() => {
//  // Clear animation
//  if (animationIntervalRef.current) {
//  clearInterval(animationIntervalRef.current);
//  animationIntervalRef.current = null;
//  }

//  setChatSessions([]);
//  setCurrentChatHistory([]);
//  setSelectedChatSessionId(null);
//  setHasResponse(false);
//  setHasAiResponse(false);
//  setForceSidebarCollapsed(false);
//  setAnimatedResponseContent("");
//  setSelectedMessageId(null);
//  setIsAnimatingResponse(false);

//  if (selectedFolder && selectedFolder !== "Test") {
//  fetchChatHistory();
//  }
//  }, [selectedFolder]);

//  if (!selectedFolder) {
//  return (
//  <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//  Select a folder to start chatting.
//  </div>
//  );
//  }

//  return (
//  <div className="flex h-screen bg-white">
//  {/* Left Panel - Chat History */}
//  <div className={`${hasResponse ? "w-[40%]" : "w-full"} border-r border-gray-200 flex flex-col bg-white h-full transition-all duration-300 overflow-hidden`}>
//  {/* Header */}
//  <div className="p-4 border-b border-black border-opacity-20 flex-shrink-0">
//  <div className="flex items-center justify-between mb-4">
//  <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
//  <button
//  onClick={handleNewChat}
//  className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
//  >
//  New Chat
//  </button>
//  </div>
//  <div className="relative mb-4">
//  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//  <input
//  type="text"
//  placeholder="Search questions..."
//  className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//  />
//  </div>
//  </div>

//  {/* Chat History List */}
//  <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-custom">
//  {loadingChat && currentChatHistory.length === 0 ? (
//  <div className="flex justify-center py-8">
//  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//  </div>
//  ) : currentChatHistory.length === 0 ? (
//  <div className="text-center py-12">
//  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//  <p className="text-gray-500">No chats yet. Start a conversation!</p>
//  </div>
//  ) : (
//  <div className="space-y-2">
//  {currentChatHistory.map((chat) => (
//  <div
//  key={chat.id}
//  onClick={() => handleSelectChat(chat)}
//  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
//  selectedMessageId === chat.id
//  ? "bg-blue-50 border-blue-200 shadow-sm"
//  : "bg-white border-gray-200 hover:bg-gray-50"
//  }`}
//  >
//  <div className="flex items-start justify-between">
//  <div className="flex-1 min-w-0">
//  <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
//  {chat.question || chat.query || "Untitled"}
//  </p>
//  <p className="text-xs text-gray-500">{getRelativeTime(chat.created_at || chat.timestamp)}</p>
//  </div>
//  <button
//  onClick={(e) => e.stopPropagation()}
//  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//  >
//  <MoreVertical className="h-5 w-5 text-gray-400" />
//  </button>
//  </div>
//  </div>
//  ))}
//  </div>
//  )}
//  </div>

//  {/* Input Area */}
//  <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
//  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3">
//  <input
//  type="text"
//  placeholder={isSecretPromptSelected ? `Analysis: ${activeDropdown}` : "How can I help you today?"}
//  value={chatInput}
//  onChange={handleChatInputChange}
//  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleNewMessage()}
//  className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent"
//  disabled={loadingChat}
//  />
//  <div className="flex items-center justify-between mt-2">
//  <div className="relative" ref={dropdownRef}>
//  <button
//  onClick={() => setShowDropdown(!showDropdown)}
//  disabled={isLoadingSecrets || loadingChat}
//  className="flex items-center space-x-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50"
//  >
//  <BookOpen className="h-4 w-4" />
//  <span className="text-sm font-medium">{isLoadingSecrets ? "Loading..." : activeDropdown}</span>
//  <ChevronDown className="h-4 w-4" />
//  </button>
//  {showDropdown && !isLoadingSecrets && (
//  <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto scrollbar-custom">
//  {secrets.length > 0 ? (
//  secrets.map((secret) => (
//  <button
//  key={secret.id}
//  onClick={() => handleDropdownSelect(secret.name, secret.id, secret.llm_name)}
//  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
//  >
//  {secret.name}
//  </button>
//  ))
//  ) : (
//  <div className="px-4 py-2.5 text-sm text-gray-500">No analysis prompts available</div>
//  )}
//  </div>
//  )}
//  </div>
//  <button
//  onClick={handleNewMessage}
//  disabled={loadingChat || (!chatInput.trim() && !isSecretPromptSelected)}
//  className="p-2.5 bg-orange-300 hover:bg-orange-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
//  >
//  {loadingChat ? (
//  <Loader2 className="h-5 w-5 text-white animate-spin" />
//  ) : (
//  <Send className="h-5 w-5 text-white" />
//  )}
//  </button>
//  </div>
//  </div>
//  {chatError && (
//  <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
//  {chatError}
//  </div>
//  )}
//  </div>
//  </div>

//  {/* Right Panel - AI Response */}
//  {hasResponse && (
//  <div className="w-[60%] flex flex-col h-full overflow-hidden">
//  <div className="flex-1 overflow-y-auto scrollbar-custom" ref={responseRef}>
//  {loadingChat && !animatedResponseContent ? (
//  <div className="flex items-center justify-center h-full">
//  <div className="text-center">
//  <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-blue-600" />
//  <p className="text-gray-600">Generating response...</p>
//  </div>
//  </div>
//  ) : selectedMessageId && animatedResponseContent ? (
//  <div className="px-6 py-6">
//  <div className="mb-6 pb-4 border-b border-gray-200">
//  <div className="flex items-center justify-between">
//  <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
//  <div className="text-sm text-gray-500">
//  {currentChatHistory.find((msg) => msg.id === selectedMessageId)?.timestamp && (
//  <span>{formatDate(currentChatHistory.find((msg) => msg.id === selectedMessageId).timestamp)}</span>
//  )}
//  </div>
//  </div>
//  <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
//  <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
//  <p className="text-sm text-blue-800">
//  {currentChatHistory.find((msg) => msg.id === selectedMessageId)?.question || "No question available"}
//  </p>
//  </div>
//  </div>
//  <div className="prose prose-gray max-w-none">
//  <ReactMarkdown
//  remarkPlugins={[remarkGfm]}
//  components={{
//  h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2" {...props} />,
//  h2: ({ ...props }) => <h2 className="text-xl font-bold mb-4 mt-6 text-black" {...props} />,
//  h3: ({ ...props }) => <h3 className="text-lg font-bold mb-3 mt-4 text-black" {...props} />,
//  p: ({ ...props }) => <p className="mb-4 leading-relaxed text-black text-justify" {...props} />,
//  strong: ({ ...props }) => <strong className="font-bold text-black" {...props} />,
//  ul: ({ ...props }) => <ul className="list-disc pl-5 mb-4 text-black" {...props} />,
//  ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-4 text-black" {...props} />,
//  li: ({ ...props }) => <li className="mb-2 leading-relaxed text-black" {...props} />,
//  blockquote: ({ ...props }) => (
//  <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props} />
//  ),
//  code: ({ inline, ...props }) => (
//  <code
//  className={inline ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-700" : "block bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto my-4 text-red-700"}
//  {...props}
//  />
//  ),
//  table: ({ ...props }) => (
//  <div className="overflow-x-auto my-4">
//  <table className="min-w-full divide-y divide-gray-300 border border-gray-300" {...props} />
//  </div>
//  ),
//  thead: ({ ...props }) => <thead className="bg-gray-50" {...props} />,
//  th: ({ ...props }) => <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b border-gray-300" {...props} />,
//  td: ({ ...props }) => <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200" {...props} />,
//  }}
//  >
//  {animatedResponseContent}
//  </ReactMarkdown>
//  {isAnimatingResponse && <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>}
//  </div>
//  </div>
//  ) : (
//  <div className="flex items-center justify-center h-full">
//  <div className="text-center max-w-md px-6">
//  <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
//  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
//  <p className="text-gray-600 text-lg leading-relaxed">
//  Click on any question from the left panel to view the AI response here.
//  </p>
//  </div>
//  </div>
//  )}
//  </div>
//  </div>
//  )}
//  <style jsx>{`
//  .scrollbar-custom::-webkit-scrollbar {
//  width: 8px;
//  }
//  .scrollbar-custom::-webkit-scrollbar-track {
//  background: #f1f1f1;
//  border-radius: 4px;
//  }
//  .scrollbar-custom::-webkit-scrollbar-thumb {
//  background: #a0aec0;
//  border-radius: 4px;
//  }
//  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
//  background: #718096;
//  }
//  `}</style>
//  </div>
//  );
// };

// export default ChatInterface;


// import React, { useState, useEffect, useContext, useRef } from "react";
// import { FileManagerContext } from "../../context/FileManagerContext";
// import documentApi from "../../services/documentApi";
// import {
//   Plus,
//   Search,
//   BookOpen,
//   ChevronDown,
//   MoreVertical,
//   MessageSquare,
//   Loader2,
//   Send,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import { SidebarContext } from "../../context/SidebarContext";

// const ChatInterface = () => {
//   const {
//     selectedFolder,
//     setChatSessions,
//     selectedChatSessionId,
//     setSelectedChatSessionId,
//     setHasAiResponse,
//   } = useContext(FileManagerContext);
//   const { setForceSidebarCollapsed } = useContext(SidebarContext);
//   const [currentChatHistory, setCurrentChatHistory] = useState([]);
//   const [loadingChat, setLoadingChat] = useState(false);
//   const [chatError, setChatError] = useState(null);
//   const [chatInput, setChatInput] = useState("");
//   const [animatedResponseContent, setAnimatedResponseContent] = useState("");
//   const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
//   const [selectedMessageId, setSelectedMessageId] = useState(null);
//   const [hasResponse, setHasResponse] = useState(false);
//   // Secret prompt states
//   const [secrets, setSecrets] = useState([]);
//   const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
//   const [selectedSecretId, setSelectedSecretId] = useState(null);
//   const [selectedLlmName, setSelectedLlmName] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState("Summary");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);
//   const responseRef = useRef(null);
//   const dropdownRef = useRef(null);
//   const animationIntervalRef = useRef(null);

//   // API Configuration
//   const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";
//   const getAuthToken = () => {
//     const tokenKeys = [
//       "authToken",
//       "token",
//       "accessToken",
//       "jwt",
//       "bearerToken",
//       "auth_token",
//       "access_token",
//       "api_token",
//       "userToken",
//     ];
//     for (const key of tokenKeys) {
//       const token = localStorage.getItem(key);
//       if (token) return token;
//     }
//     return null;
//   };

//   // Fetch secrets list
//   const fetchSecrets = async () => {
//     try {
//       setIsLoadingSecrets(true);
//       setChatError(null);
//       const token = getAuthToken();
//       const headers = { "Content-Type": "application/json" };
//       if (token) headers["Authorization"] = `Bearer ${token}`;
//       const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
//         method: "GET",
//         headers,
//       });
//       if (!response.ok) throw new Error(`Failed to fetch secrets: ${response.status}`);
//       const secretsData = await response.json();
//       setSecrets(secretsData || []);
//       if (secretsData?.length > 0) {
//         setActiveDropdown(secretsData[0].name);
//         setSelectedSecretId(secretsData[0].id);
//         setSelectedLlmName(secretsData[0].llm_name);
//         setIsSecretPromptSelected(true);
//       } else {
//         setActiveDropdown("Custom Query");
//         setSelectedSecretId(null);
//         setSelectedLlmName(null);
//         setIsSecretPromptSelected(false);
//       }
//     } catch (error) {
//       console.error("Error fetching secrets:", error);
//       setChatError(`Failed to load analysis prompts: ${error.message}`);
//     } finally {
//       setIsLoadingSecrets(false);
//     }
//   };

//   // Fetch secret value by ID
//   const fetchSecretValue = async (secretId) => {
//     try {
//       const existingSecret = secrets.find((secret) => secret.id === secretId);
//       if (existingSecret?.value) return existingSecret.value;
//       const token = getAuthToken();
//       const headers = { "Content-Type": "application/json" };
//       if (token) headers["Authorization"] = `Bearer ${token}`;
//       const response = await fetch(`${API_BASE_URL}/files/secrets/${secretId}`, {
//         method: "GET",
//         headers,
//       });
//       if (!response.ok) throw new Error(`Failed to fetch secret value: ${response.status}`);
//       const secretData = await response.json();
//       const promptValue = secretData.value || secretData.prompt || secretData.content || secretData;
//       setSecrets((prevSecrets) =>
//         prevSecrets.map((secret) =>
//           secret.id === secretId ? { ...secret, value: promptValue } : secret
//         )
//       );
//       return promptValue || "";
//     } catch (error) {
//       console.error("Error fetching secret value:", error);
//       throw new Error("Failed to retrieve analysis prompt");
//     }
//   };

//   // Fetch chat history
//   const fetchChatHistory = async (sessionId) => {
//     if (!selectedFolder) return;
//     setLoadingChat(true);
//     setChatError(null);
//     try {
//       const data = await documentApi.getFolderChats(selectedFolder);
//       const chats = Array.isArray(data.chats) ? data.chats : [];
//       setCurrentChatHistory(chats);
//       if (sessionId) {
//         setSelectedChatSessionId(sessionId);
//         const selectedChat = chats.find((c) => c.id === sessionId);
//         if (selectedChat) {
//           const responseText = selectedChat.response || selectedChat.answer || selectedChat.message || "";
//           setSelectedMessageId(selectedChat.id);
//           setAnimatedResponseContent(responseText);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//         }
//       } else {
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       }
//     } catch (err) {
//       console.error("Error fetching chats:", err);
//       setChatError("Failed to fetch chat history.");
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Animate typing effect
//   const animateResponse = (text) => {
//     if (animationIntervalRef.current) {
//       clearInterval(animationIntervalRef.current);
//       animationIntervalRef.current = null;
//     }
//     setAnimatedResponseContent("");
//     setIsAnimatingResponse(true);
//     let i = 0;
//     animationIntervalRef.current = setInterval(() => {
//       if (i < text.length) {
//         setAnimatedResponseContent((prev) => prev + text.charAt(i));
//         i++;
//         if (responseRef.current) {
//           responseRef.current.scrollTop = responseRef.current.scrollHeight;
//         }
//       } else {
//         clearInterval(animationIntervalRef.current);
//         animationIntervalRef.current = null;
//         setIsAnimatingResponse(false);
//       }
//     }, 15);
//   };

//   // Cleanup animation on unmount
//   useEffect(() => {
//     return () => {
//       if (animationIntervalRef.current) {
//         clearInterval(animationIntervalRef.current);
//       }
//     };
//   }, []);

//   // Chat with AI using secret prompt
//   const chatWithAI = async (folder, secretId, currentSessionId) => {
//     try {
//       setLoadingChat(true);
//       setChatError(null);
//       const isContinuingSession = !!currentSessionId && currentChatHistory.length > 0;
//       if (!isContinuingSession) {
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//       }
//       const selectedSecret = secrets.find((s) => s.id === secretId);
//       if (!selectedSecret) throw new Error("No prompt found for selected analysis type");
//       let promptValue = selectedSecret.value;
//       const promptLabel = selectedSecret.name;
//       if (!promptValue) promptValue = await fetchSecretValue(secretId);
//       if (!promptValue) throw new Error("Secret prompt value is empty.");
//       console.log("🔄 Sending request with session:", currentSessionId);
//       const response = await documentApi.queryFolderDocuments(folder, promptValue, currentSessionId, {
//         used_secret_prompt: true,
//         prompt_label: promptLabel,
//         secret_id: secretId,
//       });
//       console.log("🔍 Full API Response:", response);
//       const sessionId = response.sessionId || response.session_id || response.id;
//       console.log("🆔 Session ID - Current:", currentSessionId, "New:", sessionId);
//       if (sessionId) {
//         setSelectedChatSessionId(sessionId);
//       }
//       let history = [];
//       let responseText = "";
//       let messageId = null;
//       if (Array.isArray(response.chatHistory) && response.chatHistory.length > 0) {
//         history = response.chatHistory;
//         const latestMessage = history[history.length - 1];
//         responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
//         messageId = latestMessage.id;
//       } else if (Array.isArray(response.chat_history) && response.chat_history.length > 0) {
//         history = response.chat_history;
//         const latestMessage = history[history.length - 1];
//         responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
//         messageId = latestMessage.id;
//       } else if (Array.isArray(response.messages) && response.messages.length > 0) {
//         history = response.messages;
//         const latestMessage = history[history.length - 1];
//         responseText = latestMessage.response || latestMessage.answer || latestMessage.message || latestMessage.content || "";
//         messageId = latestMessage.id;
//       } else if (response.response || response.answer || response.message || response.content) {
//         responseText = response.response || response.answer || response.message || response.content;
//         messageId = response.id || Date.now().toString();
//         const newMessage = {
//           id: messageId,
//           question: promptLabel,
//           response: responseText,
//           timestamp: new Date().toISOString(),
//           created_at: new Date().toISOString(),
//           isSecretPrompt: true,
//         };
//         history = isContinuingSession ? [...currentChatHistory, newMessage] : [newMessage];
//       }
//       console.log("📝 Extracted Response Text:", responseText);
//       console.log("📚 Chat History Length:", history.length);
//       setCurrentChatHistory(history);
//       if (responseText && responseText.trim()) {
//         setSelectedMessageId(messageId);
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//         animateResponse(responseText);
//       } else {
//         console.error("❌ No response text found in:", response);
//         setChatError("Received empty response from server. Check console for details.");
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       }
//       return response;
//     } catch (error) {
//       console.error("Chat error:", error);
//       setChatError(`Analysis failed: ${error.message}`);
//       setHasResponse(false);
//       setHasAiResponse(false);
//       setForceSidebarCollapsed(false);
//       throw error;
//     } finally {
//       setLoadingChat(false);
//     }
//   };

//   // Handle new message
//   const handleNewMessage = async () => {
//     if (!selectedFolder) return;
//     if (isSecretPromptSelected) {
//       if (!selectedSecretId) {
//         setChatError("Please select an analysis type.");
//         return;
//       }
//       await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
//       setChatInput("");
//       setIsSecretPromptSelected(false);
//     } else {
//       if (!chatInput.trim()) return;
//       const questionText = chatInput.trim();
//       setLoadingChat(true);
//       setChatError(null);
//       const isContinuingSession = !!selectedChatSessionId && currentChatHistory.length > 0;
//       if (!isContinuingSession) {
//         setHasResponse(true);
//         setHasAiResponse(true);
//         setForceSidebarCollapsed(true);
//       }
//       try {
//         console.log("🔄 Sending message with session:", selectedChatSessionId);
//         const response = await documentApi.queryFolderDocuments(
//           selectedFolder,
//           questionText,
//           selectedChatSessionId,
//           { used_secret_prompt: false }
//         );
//         console.log("🔍 Full API Response:", response);
//         const sessionId = response.sessionId || response.session_id || response.id;
//         console.log("🆔 Session ID - Current:", selectedChatSessionId, "New:", sessionId);
//         if (sessionId) {
//           setSelectedChatSessionId(sessionId);
//         }
//         let history = [];
//         let responseText = "";
//         let messageId = null;
//         if (Array.isArray(response.chatHistory) && response.chatHistory.length > 0) {
//           history = response.chatHistory;
//           const latestMessage = history[history.length - 1];
//           responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
//           messageId = latestMessage.id;
//         } else if (Array.isArray(response.chat_history) && response.chat_history.length > 0) {
//           history = response.chat_history;
//           const latestMessage = history[history.length - 1];
//           responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
//           messageId = latestMessage.id;
//         } else if (Array.isArray(response.messages) && response.messages.length > 0) {
//           history = response.messages;
//           const latestMessage = history[history.length - 1];
//           responseText = latestMessage.response || latestMessage.answer || latestMessage.message || latestMessage.content || "";
//           messageId = latestMessage.id;
//         } else if (response.response || response.answer || response.message || response.content) {
//           responseText = response.response || response.answer || response.message || response.content;
//           messageId = response.id || Date.now().toString();
//           const newMessage = {
//             id: messageId,
//             question: questionText,
//             response: responseText,
//             timestamp: new Date().toISOString(),
//             created_at: new Date().toISOString(),
//             isSecretPrompt: false,
//           };
//           history = isContinuingSession ? [...currentChatHistory, newMessage] : [newMessage];
//         }
//         console.log("📝 Extracted Response Text:", responseText);
//         console.log("📚 Chat History Length:", history.length);
//         setCurrentChatHistory(history);
//         if (responseText && responseText.trim()) {
//           setSelectedMessageId(messageId);
//           setHasResponse(true);
//           setHasAiResponse(true);
//           setForceSidebarCollapsed(true);
//           animateResponse(responseText);
//         } else {
//           console.error("❌ No response text found in:", response);
//           setChatError("Received empty response from server. Check console for details.");
//           setHasResponse(false);
//           setHasAiResponse(false);
//           setForceSidebarCollapsed(false);
//         }
//         setChatInput("");
//       } catch (err) {
//         console.error("Error sending message:", err);
//         setChatError(`Failed to send message: ${err.response?.data?.details || err.message}`);
//         setHasResponse(false);
//         setHasAiResponse(false);
//         setForceSidebarCollapsed(false);
//       } finally {
//         setLoadingChat(false);
//       }
//     }
//   };

//   // Handle selecting a chat
//   const handleSelectChat = (chat) => {
//     if (animationIntervalRef.current) {
//       clearInterval(animationIntervalRef.current);
//       animationIntervalRef.current = null;
//     }
//     setSelectedMessageId(chat.id);
//     const responseText = chat.response || chat.answer || chat.message || "";
//     setAnimatedResponseContent(responseText);
//     setIsAnimatingResponse(false);
//     setHasResponse(true);
//     setHasAiResponse(true);
//     setForceSidebarCollapsed(true);
//   };

//   // Handle new chat
//   const handleNewChat = () => {
//     if (animationIntervalRef.current) {
//       clearInterval(animationIntervalRef.current);
//       animationIntervalRef.current = null;
//     }
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);
//     setChatInput("");
//     setSelectedMessageId(null);
//     setAnimatedResponseContent("");
//     setIsAnimatingResponse(false);
//     setIsSecretPromptSelected(false);
//     setSelectedSecretId(null);
//     setSelectedLlmName(null);
//     if (secrets.length > 0) {
//       setActiveDropdown(secrets[0].name);
//       setSelectedSecretId(secrets[0].id);
//       setSelectedLlmName(secrets[0].llm_name);
//       setIsSecretPromptSelected(true);
//     } else {
//       setActiveDropdown("Custom Query");
//       setIsSecretPromptSelected(false);
//     }
//   };

//   // Handle dropdown selection
//   const handleDropdownSelect = (secretName, secretId, llmName) => {
//     setActiveDropdown(secretName);
//     setSelectedSecretId(secretId);
//     setSelectedLlmName(llmName);
//     setIsSecretPromptSelected(true);
//     setChatInput("");
//     setShowDropdown(false);
//   };

//   // Handle custom input change
//   const handleChatInputChange = (e) => {
//     setChatInput(e.target.value);
//     if (e.target.value && isSecretPromptSelected) {
//       setIsSecretPromptSelected(false);
//       setActiveDropdown("Custom Query");
//       setSelectedSecretId(null);
//       setSelectedLlmName(null);
//     }
//   };

//   // Format relative time
//   const getRelativeTime = (dateString) => {
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffInSeconds = Math.floor((now - date) / 1000);
//       if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
//       if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
//       if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
//       return `${Math.floor(diffInSeconds / 86400)}d ago`;
//     } catch {
//       return "Unknown time";
//     }
//   };

//   // Format date for display
//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleString();
//     } catch {
//       return "Invalid date";
//     }
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Load secrets on mount
//   useEffect(() => {
//     fetchSecrets();
//   }, []);

//   // Reset state when folder changes
//   useEffect(() => {
//     if (animationIntervalRef.current) {
//       clearInterval(animationIntervalRef.current);
//       animationIntervalRef.current = null;
//     }
//     setChatSessions([]);
//     setCurrentChatHistory([]);
//     setSelectedChatSessionId(null);
//     setHasResponse(false);
//     setHasAiResponse(false);
//     setForceSidebarCollapsed(false);
//     setAnimatedResponseContent("");
//     setSelectedMessageId(null);
//     setIsAnimatingResponse(false);
//     if (selectedFolder && selectedFolder !== "Test") {
//       fetchChatHistory();
//     }
//   }, [selectedFolder]);

//   if (!selectedFolder) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
//         Select a folder to start chatting.
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen bg-white">
//       {/* Left Panel - Chat History */}
//       <div className={`${hasResponse ? "w-[40%]" : "w-full"} border-r border-gray-200 flex flex-col bg-white h-full transition-all duration-300 overflow-hidden`}>
//         {/* Header */}
//         <div className="p-4 border-b border-black border-opacity-20 flex-shrink-0">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
//             <button
//               onClick={handleNewChat}
//               className="px-3 py-1.5 text-sm font-medium text-white bg-[#21C1B6] hover:bg-[#1AA49B] rounded-md transition-colors"
//             >
//               New Chat
//             </button>
//           </div>
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search questions..."
//               className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#21C1B6] border-[#21C1B6]"
//             />
//           </div>
//         </div>
//         {/* Chat History List */}
//         <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-custom">
//           {loadingChat && currentChatHistory.length === 0 ? (
//             <div className="flex justify-center py-8">
//               <Loader2 className="h-8 w-8 animate-spin text-[#21C1B6]" />
//             </div>
//           ) : currentChatHistory.length === 0 ? (
//             <div className="text-center py-12">
//               <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//               <p className="text-gray-500">No chats yet. Start a conversation!</p>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {currentChatHistory.map((chat) => (
//                 <div
//                   key={chat.id}
//                   onClick={() => handleSelectChat(chat)}
//                   className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
//                     selectedMessageId === chat.id
//                       ? "bg-blue-50 border-blue-200 shadow-sm"
//                       : "bg-white border-gray-200 hover:bg-gray-50"
//                   }`}
//                 >
//                   <div className="flex items-start justify-between">
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
//                         {chat.question || chat.query || "Untitled"}
//                       </p>
//                       <p className="text-xs text-gray-500">{getRelativeTime(chat.created_at || chat.timestamp)}</p>
//                     </div>
//                     <button
//                       onClick={(e) => e.stopPropagation()}
//                       className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
//                     >
//                       <MoreVertical className="h-5 w-5 text-gray-400" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {/* Input Area */}
//         <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
//           <div className="bg-white rounded-xl shadow-sm border border-[#21C1B6] p-3">
//             <input
//               type="text"
//               placeholder={isSecretPromptSelected ? `Analysis: ${activeDropdown}` : "How can I help you today?"}
//               value={chatInput}
//               onChange={handleChatInputChange}
//               onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleNewMessage()}
//               className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent focus:ring-2 focus:ring-[#21C1B6] border-[#21C1B6]"
//               disabled={loadingChat}
//             />
//             <div className="flex items-center justify-between mt-2">
//               <div className="relative" ref={dropdownRef}>
//                 <button
//                   onClick={() => setShowDropdown(!showDropdown)}
//                   disabled={isLoadingSecrets || loadingChat}
//                   className="flex items-center space-x-2 px-4 py-2.5 bg-[#21C1B6] text-white rounded-lg hover:bg-[#1AA49B] transition-colors disabled:opacity-50"
//                 >
//                   <BookOpen className="h-4 w-4" />
//                   <span className="text-sm font-medium">{isLoadingSecrets ? "Loading..." : activeDropdown}</span>
//                   <ChevronDown className="h-4 w-4" />
//                 </button>
//                 {showDropdown && !isLoadingSecrets && (
//                   <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto scrollbar-custom">
//                     {secrets.length > 0 ? (
//                       secrets.map((secret) => (
//                         <button
//                           key={secret.id}
//                           onClick={() => handleDropdownSelect(secret.name, secret.id, secret.llm_name)}
//                           className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
//                         >
//                           {secret.name}
//                         </button>
//                       ))
//                     ) : (
//                       <div className="px-4 py-2.5 text-sm text-gray-500">No analysis prompts available</div>
//                     )}
//                   </div>
//                 )}
//               </div>
//               <button
//                 onClick={handleNewMessage}
//                 disabled={loadingChat || (!chatInput.trim() && !isSecretPromptSelected)}
//                 className="p-2.5 bg-[#21C1B6] hover:bg-[#1AA49B] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
//               >
//                 {loadingChat ? (
//                   <Loader2 className="h-5 w-5 text-white animate-spin" />
//                 ) : (
//                   <Send className="h-5 w-5 text-white" />
//                 )}
//               </button>
//             </div>
//           </div>
//           {chatError && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
//               {chatError}
//             </div>
//           )}
//         </div>
//       </div>
//       {/* Right Panel - AI Response */}
//       {hasResponse && (
//         <div className="w-[60%] flex flex-col h-full overflow-hidden">
//           <div className="flex-1 overflow-y-auto scrollbar-custom" ref={responseRef}>
//             {loadingChat && !animatedResponseContent ? (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center">
//                   <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-[#21C1B6]" />
//                   <p className="text-gray-600">Generating response...</p>
//                 </div>
//               </div>
//             ) : selectedMessageId && animatedResponseContent ? (
//               <div className="px-6 py-6">
//                 <div className="mb-6 pb-4 border-b border-gray-200">
//                   <div className="flex items-center justify-between">
//                     <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
//                     <div className="text-sm text-gray-500">
//                       {currentChatHistory.find((msg) => msg.id === selectedMessageId)?.timestamp && (
//                         <span>{formatDate(currentChatHistory.find((msg) => msg.id === selectedMessageId).timestamp)}</span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-[#21C1B6]">
//                     <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
//                     <p className="text-sm text-blue-800">
//                       {currentChatHistory.find((msg) => msg.id === selectedMessageId)?.question || "No question available"}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="prose prose-gray max-w-none">
//                   <ReactMarkdown
//                     remarkPlugins={[remarkGfm]}
//                     components={{
//                       h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2" {...props} />,
//                       h2: ({ ...props }) => <h2 className="text-xl font-bold mb-4 mt-6 text-black" {...props} />,
//                       h3: ({ ...props }) => <h3 className="text-lg font-bold mb-3 mt-4 text-black" {...props} />,
//                       p: ({ ...props }) => <p className="mb-4 leading-relaxed text-black text-justify" {...props} />,
//                       strong: ({ ...props }) => <strong className="font-bold text-black" {...props} />,
//                       ul: ({ ...props }) => <ul className="list-disc pl-5 mb-4 text-black" {...props} />,
//                       ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-4 text-black" {...props} />,
//                       li: ({ ...props }) => <li className="mb-2 leading-relaxed text-black" {...props} />,
//                       blockquote: ({ ...props }) => (
//                         <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props} />
//                       ),
//                       code: ({ inline, ...props }) => (
//                         <code
//                           className={inline ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-700" : "block bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto my-4 text-red-700"}
//                           {...props}
//                         />
//                       ),
//                       table: ({ ...props }) => (
//                         <div className="overflow-x-auto my-4">
//                           <table className="min-w-full divide-y divide-gray-300 border border-gray-300" {...props} />
//                         </div>
//                       ),
//                       thead: ({ ...props }) => <thead className="bg-gray-50" {...props} />,
//                       th: ({ ...props }) => <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b border-gray-300" {...props} />,
//                       td: ({ ...props }) => <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200" {...props} />,
//                     }}
//                   >
//                     {animatedResponseContent}
//                   </ReactMarkdown>
//                   {isAnimatingResponse && <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>}
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center justify-center h-full">
//                 <div className="text-center max-w-md px-6">
//                   <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
//                   <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
//                   <p className="text-gray-600 text-lg leading-relaxed">
//                     Click on any question from the left panel to view the AI response here.
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       <style jsx>{`
//         .scrollbar-custom::-webkit-scrollbar {
//           width: 8px;
//         }
//         .scrollbar-custom::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 4px;
//         }
//         .scrollbar-custom::-webkit-scrollbar-thumb {
//           background: #a0aec0;
//           border-radius: 4px;
//         }
//         .scrollbar-custom::-webkit-scrollbar-thumb:hover {
//           background: #718096;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatInterface;



import React, { useState, useEffect, useContext, useRef } from "react";
import { FileManagerContext } from "../../context/FileManagerContext";
import documentApi from "../../services/documentApi";
import {
  Plus,
  Search,
  BookOpen,
  ChevronDown,
  MoreVertical,
  MessageSquare,
  Loader2,
  Send,
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
  const [animatedResponseContent, setAnimatedResponseContent] = useState("");
  const [isAnimatingResponse, setIsAnimatingResponse] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);
  const [secrets, setSecrets] = useState([]);
  const [isLoadingSecrets, setIsLoadingSecrets] = useState(false);
  const [selectedSecretId, setSelectedSecretId] = useState(null);
  const [selectedLlmName, setSelectedLlmName] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState("Summary");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSecretPromptSelected, setIsSecretPromptSelected] = useState(false);
  const responseRef = useRef(null);
  const dropdownRef = useRef(null);
  const animationFrameRef = useRef(null);

  // API Configuration
  const API_BASE_URL = "https://gateway-service-110685455967.asia-south1.run.app";
  const getAuthToken = () => {
    const tokenKeys = [
      "authToken",
      "token",
      "accessToken",
      "jwt",
      "bearerToken",
      "auth_token",
      "access_token",
      "api_token",
      "userToken",
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
      const response = await fetch(`${API_BASE_URL}/files/secrets?fetch=true`, {
        method: "GET",
        headers,
      });
      if (!response.ok) throw new Error(`Failed to fetch secrets: ${response.status}`);
      const secretsData = await response.json();
      setSecrets(secretsData || []);
      if (secretsData?.length > 0) {
        setActiveDropdown(secretsData[0].name);
        setSelectedSecretId(secretsData[0].id);
        setSelectedLlmName(secretsData[0].llm_name);
        setIsSecretPromptSelected(true);
      } else {
        setActiveDropdown("Custom Query");
        setSelectedSecretId(null);
        setSelectedLlmName(null);
        setIsSecretPromptSelected(false);
      }
    } catch (error) {
      console.error("Error fetching secrets:", error);
      setChatError(`Failed to load analysis prompts: ${error.message}`);
    } finally {
      setIsLoadingSecrets(false);
    }
  };

  // Fetch secret value by ID
  const fetchSecretValue = async (secretId) => {
    try {
      const existingSecret = secrets.find((secret) => secret.id === secretId);
      if (existingSecret?.value) return existingSecret.value;
      const token = getAuthToken();
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;
      const response = await fetch(`${API_BASE_URL}/files/secrets/${secretId}`, {
        method: "GET",
        headers,
      });
      if (!response.ok) throw new Error(`Failed to fetch secret value: ${response.status}`);
      const secretData = await response.json();
      const promptValue = secretData.value || secretData.prompt || secretData.content || secretData;
      setSecrets((prevSecrets) =>
        prevSecrets.map((secret) =>
          secret.id === secretId ? { ...secret, value: promptValue } : secret
        )
      );
      return promptValue || "";
    } catch (error) {
      console.error("Error fetching secret value:", error);
      throw new Error("Failed to retrieve analysis prompt");
    }
  };

  // Fetch chat history
  const fetchChatHistory = async (sessionId) => {
    if (!selectedFolder) return;
    setLoadingChat(true);
    setChatError(null);
    try {
      const data = await documentApi.getFolderChats(selectedFolder);
      const chats = Array.isArray(data.chats) ? data.chats : [];
      setCurrentChatHistory(chats);
      if (sessionId) {
        setSelectedChatSessionId(sessionId);
        const selectedChat = chats.find((c) => c.id === sessionId);
        if (selectedChat) {
          const responseText = selectedChat.response || selectedChat.answer || selectedChat.message || "";
          setSelectedMessageId(selectedChat.id);
          setAnimatedResponseContent(responseText);
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
      console.error("Error fetching chats:", err);
      setChatError("Failed to fetch chat history.");
    } finally {
      setLoadingChat(false);
    }
  };

  // Animate typing effect
  const animateResponse = (text) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setAnimatedResponseContent("");
    setIsAnimatingResponse(true);
    let i = 0;
    const charsPerFrame = 3; // Render 3 characters per frame to reduce state updates
    const animate = () => {
      if (i < text.length) {
        const nextChunk = text.slice(i, i + charsPerFrame);
        setAnimatedResponseContent((prev) => prev + nextChunk);
        i += charsPerFrame;
        if (responseRef.current) {
          responseRef.current.scrollTop = responseRef.current.scrollHeight;
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimatingResponse(false);
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Chat with AI using secret prompt
  const chatWithAI = async (folder, secretId, currentSessionId) => {
    try {
      setLoadingChat(true);
      setChatError(null);
      const isContinuingSession = !!currentSessionId && currentChatHistory.length > 0;
      if (!isContinuingSession) {
        setHasResponse(true);
        setHasAiResponse(true);
        setForceSidebarCollapsed(true);
      }
      const selectedSecret = secrets.find((s) => s.id === secretId);
      if (!selectedSecret) throw new Error("No prompt found for selected analysis type");
      let promptValue = selectedSecret.value;
      const promptLabel = selectedSecret.name;
      if (!promptValue) promptValue = await fetchSecretValue(secretId);
      if (!promptValue) throw new Error("Secret prompt value is empty.");
      console.log("🔄 Sending request with session:", currentSessionId);
      const response = await documentApi.queryFolderDocuments(folder, promptValue, currentSessionId, {
        used_secret_prompt: true,
        prompt_label: promptLabel,
        secret_id: secretId,
      });
      console.log("🔍 Full API Response:", response);
      const sessionId = response.sessionId || response.session_id || response.id;
      console.log("🆔 Session ID - Current:", currentSessionId, "New:", sessionId);
      if (sessionId) {
        setSelectedChatSessionId(sessionId);
      }
      let history = [];
      let responseText = "";
      let messageId = null;
      if (Array.isArray(response.chatHistory) && response.chatHistory.length > 0) {
        history = response.chatHistory;
        const latestMessage = history[history.length - 1];
        responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
        messageId = latestMessage.id;
      } else if (Array.isArray(response.chat_history) && response.chat_history.length > 0) {
        history = response.chat_history;
        const latestMessage = history[history.length - 1];
        responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
        messageId = latestMessage.id;
      } else if (Array.isArray(response.messages) && response.messages.length > 0) {
        history = response.messages;
        const latestMessage = history[history.length - 1];
        responseText = latestMessage.response || latestMessage.answer || latestMessage.message || latestMessage.content || "";
        messageId = latestMessage.id;
      } else if (response.response || response.answer || response.message || response.content) {
        responseText = response.response || response.answer || response.message || response.content;
        messageId = response.id || Date.now().toString();
        const newMessage = {
          id: messageId,
          question: promptLabel,
          response: responseText,
          timestamp: new Date().toISOString(),
          created_at: new Date().toISOString(),
          isSecretPrompt: true,
        };
        history = isContinuingSession ? [...currentChatHistory, newMessage] : [newMessage];
      }
      console.log("📝 Extracted Response Text:", responseText);
      console.log("📚 Chat History Length:", history.length);
      setCurrentChatHistory(history);
      if (responseText && responseText.trim()) {
        setSelectedMessageId(messageId);
        setHasResponse(true);
        setHasAiResponse(true);
        setForceSidebarCollapsed(true);
        animateResponse(responseText);
      } else {
        console.error("❌ No response text found in:", response);
        setChatError("Received empty response from server. Check console for details.");
        setHasResponse(false);
        setHasAiResponse(false);
        setForceSidebarCollapsed(false);
      }
      return response;
    } catch (error) {
      console.error("Chat error:", error);
      setChatError(`Analysis failed: ${error.message}`);
      setHasResponse(false);
      setHasAiResponse(false);
      setForceSidebarCollapsed(false);
      throw error;
    } finally {
      setLoadingChat(false);
    }
  };

  // Handle new message
  const handleNewMessage = async () => {
    if (!selectedFolder) return;
    if (isSecretPromptSelected) {
      if (!selectedSecretId) {
        setChatError("Please select an analysis type.");
        return;
      }
      await chatWithAI(selectedFolder, selectedSecretId, selectedChatSessionId);
      setChatInput("");
      setIsSecretPromptSelected(false);
    } else {
      if (!chatInput.trim()) return;
      const questionText = chatInput.trim();
      setLoadingChat(true);
      setChatError(null);
      const isContinuingSession = !!selectedChatSessionId && currentChatHistory.length > 0;
      if (!isContinuingSession) {
        setHasResponse(true);
        setHasAiResponse(true);
        setForceSidebarCollapsed(true);
      }
      try {
        console.log("🔄 Sending message with session:", selectedChatSessionId);
        const response = await documentApi.queryFolderDocuments(
          selectedFolder,
          questionText,
          selectedChatSessionId,
          { used_secret_prompt: false }
        );
        console.log("🔍 Full API Response:", response);
        const sessionId = response.sessionId || response.session_id || response.id;
        console.log("🆔 Session ID - Current:", selectedChatSessionId, "New:", sessionId);
        if (sessionId) {
          setSelectedChatSessionId(sessionId);
        }
        let history = [];
        let responseText = "";
        let messageId = null;
        if (Array.isArray(response.chatHistory) && response.chatHistory.length > 0) {
          history = response.chatHistory;
          const latestMessage = history[history.length - 1];
          responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
          messageId = latestMessage.id;
        } else if (Array.isArray(response.chat_history) && response.chat_history.length > 0) {
          history = response.chat_history;
          const latestMessage = history[history.length - 1];
          responseText = latestMessage.response || latestMessage.answer || latestMessage.message || "";
          messageId = latestMessage.id;
        } else if (Array.isArray(response.messages) && response.messages.length > 0) {
          history = response.messages;
          const latestMessage = history[history.length - 1];
          responseText = latestMessage.response || latestMessage.answer || latestMessage.message || latestMessage.content || "";
          messageId = latestMessage.id;
        } else if (response.response || response.answer || response.message || response.content) {
          responseText = response.response || response.answer || response.message || response.content;
          messageId = response.id || Date.now().toString();
          const newMessage = {
            id: messageId,
            question: questionText,
            response: responseText,
            timestamp: new Date().toISOString(),
            created_at: new Date().toISOString(),
            isSecretPrompt: false,
          };
          history = isContinuingSession ? [...currentChatHistory, newMessage] : [newMessage];
        }
        console.log("📝 Extracted Response Text:", responseText);
        console.log("📚 Chat History Length:", history.length);
        setCurrentChatHistory(history);
        if (responseText && responseText.trim()) {
          setSelectedMessageId(messageId);
          setHasResponse(true);
          setHasAiResponse(true);
          setForceSidebarCollapsed(true);
          animateResponse(responseText);
        } else {
          console.error("❌ No response text found in:", response);
          setChatError("Received empty response from server. Check console for details.");
          setHasResponse(false);
          setHasAiResponse(false);
          setForceSidebarCollapsed(false);
        }
        setChatInput("");
      } catch (err) {
        console.error("Error sending message:", err);
        setChatError(`Failed to send message: ${err.response?.data?.details || err.message}`);
        setHasResponse(false);
        setHasAiResponse(false);
        setForceSidebarCollapsed(false);
      } finally {
        setLoadingChat(false);
      }
    }
  };

  // Handle selecting a chat
  const handleSelectChat = (chat) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setSelectedMessageId(chat.id);
    const responseText = chat.response || chat.answer || chat.message || "";
    setAnimatedResponseContent(responseText);
    setIsAnimatingResponse(false);
    setHasResponse(true);
    setHasAiResponse(true);
    setForceSidebarCollapsed(true);
  };

  // Handle new chat
  const handleNewChat = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setCurrentChatHistory([]);
    setSelectedChatSessionId(null);
    setHasResponse(false);
    setHasAiResponse(false);
    setForceSidebarCollapsed(false);
    setChatInput("");
    setSelectedMessageId(null);
    setAnimatedResponseContent("");
    setIsAnimatingResponse(false);
    setIsSecretPromptSelected(false);
    setSelectedSecretId(null);
    setSelectedLlmName(null);
    if (secrets.length > 0) {
      setActiveDropdown(secrets[0].name);
      setSelectedSecretId(secrets[0].id);
      setSelectedLlmName(secrets[0].llm_name);
      setIsSecretPromptSelected(true);
    } else {
      setActiveDropdown("Custom Query");
      setIsSecretPromptSelected(false);
    }
  };

  // Handle dropdown selection
  const handleDropdownSelect = (secretName, secretId, llmName) => {
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
    if (e.target.value && isSecretPromptSelected) {
      setIsSecretPromptSelected(false);
      setActiveDropdown("Custom Query");
      setSelectedSecretId(null);
      setSelectedLlmName(null);
    }
  };

  // Format relative time
  const getRelativeTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);
      if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch {
      return "Unknown time";
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return "Invalid date";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load secrets on mount
  useEffect(() => {
    fetchSecrets();
  }, []);

  // Reset state when folder changes
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    setChatSessions([]);
    setCurrentChatHistory([]);
    setSelectedChatSessionId(null);
    setHasResponse(false);
    setHasAiResponse(false);
    setForceSidebarCollapsed(false);
    setAnimatedResponseContent("");
    setSelectedMessageId(null);
    setIsAnimatingResponse(false);
    if (selectedFolder && selectedFolder !== "Test") {
      fetchChatHistory();
    }
  }, [selectedFolder]);

  if (!selectedFolder) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400 text-lg bg-[#FDFCFB]">
        Select a folder to start chatting.
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Left Panel - Chat History */}
      <div className={`${hasResponse ? "w-[40%]" : "w-full"} border-r border-gray-200 flex flex-col bg-white h-full transition-all duration-300 overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b border-black border-opacity-20 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
            <button
              onClick={handleNewChat}
              className="px-3 py-1.5 text-sm font-medium text-white bg-[#21C1B6] hover:bg-[#1AA49B] rounded-md transition-colors"
            >
              New Chat
            </button>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#21C1B6] border-[#21C1B6]"
            />
          </div>
        </div>
        {/* Chat History List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-custom">
          {loadingChat && currentChatHistory.length === 0 ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-[#21C1B6]" />
            </div>
          ) : currentChatHistory.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No chats yet. Start a conversation!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentChatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedMessageId === chat.id
                      ? "bg-blue-50 border-blue-200 shadow-sm"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {chat.question || chat.query || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500">{getRelativeTime(chat.created_at || chat.timestamp)}</p>
                    </div>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreVertical className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Input Area */}
        <div className="border-t border-gray-200 p-2 bg-white flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm border border-[#21C1B6] p-3">
            <input
              type="text"
              placeholder={isSecretPromptSelected ? `Analysis: ${activeDropdown}` : "How can I help you today?"}
              value={chatInput}
              onChange={handleChatInputChange}
              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleNewMessage()}
              className="w-full text-base text-gray-700 placeholder-gray-400 outline-none bg-transparent focus:ring-2 focus:ring-[#21C1B6] border-[#21C1B6]"
              disabled={loadingChat}
            />
            <div className="flex items-center justify-between mt-2">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  disabled={isLoadingSecrets || loadingChat}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-[#21C1B6] text-white rounded-lg hover:bg-[#1AA49B] transition-colors disabled:opacity-50"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm font-medium">{isLoadingSecrets ? "Loading..." : activeDropdown}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showDropdown && !isLoadingSecrets && (
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto scrollbar-custom">
                    {secrets.length > 0 ? (
                      secrets.map((secret) => (
                        <button
                          key={secret.id}
                          onClick={() => handleDropdownSelect(secret.name, secret.id, secret.llm_name)}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
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
              <button
                onClick={handleNewMessage}
                disabled={loadingChat || (!chatInput.trim() && !isSecretPromptSelected)}
                className="p-2.5 bg-[#21C1B6] hover:bg-[#1AA49B] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                {loadingChat ? (
                  <Loader2 className="h-5 w-5 text-white animate-spin" />
                ) : (
                  <Send className="h-5 w-5 text-white" />
                )}
              </button>
            </div>
          </div>
          {chatError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
              {chatError}
            </div>
          )}
        </div>
      </div>
      {/* Right Panel - AI Response */}
      {hasResponse && (
        <div className="w-[60%] flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-y-auto scrollbar-custom" ref={responseRef}>
            {loadingChat && !animatedResponseContent ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-[#21C1B6]" />
                  <p className="text-gray-600">Generating response...</p>
                </div>
              </div>
            ) : selectedMessageId && animatedResponseContent ? (
              <div className="px-6 py-6">
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">AI Response</h2>
                    <div className="text-sm text-gray-500">
                      {currentChatHistory.find((msg) => msg.id === selectedMessageId)?.timestamp && (
                        <span>{formatDate(currentChatHistory.find((msg) => msg.id === selectedMessageId).timestamp)}</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-[#21C1B6]">
                    <p className="text-sm font-medium text-blue-900 mb-1">Question:</p>
                    <p className="text-sm text-blue-800">
                      {currentChatHistory.find((msg) => msg.id === selectedMessageId)?.question || "No question available"}
                    </p>
                  </div>
                </div>
                <div className="prose prose-gray max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ ...props }) => <h1 className="text-2xl font-bold mb-6 mt-8 text-black border-b-2 border-gray-300 pb-2" {...props} />,
                      h2: ({ ...props }) => <h2 className="text-xl font-bold mb-4 mt-6 text-black" {...props} />,
                      h3: ({ ...props }) => <h3 className="text-lg font-bold mb-3 mt-4 text-black" {...props} />,
                      p: ({ ...props }) => <p className="mb-4 leading-relaxed text-black text-justify" {...props} />,
                      strong: ({ ...props }) => <strong className="font-bold text-black" {...props} />,
                      ul: ({ ...props }) => <ul className="list-disc pl-5 mb-4 text-black" {...props} />,
                      ol: ({ ...props }) => <ol className="list-decimal pl-5 mb-4 text-black" {...props} />,
                      li: ({ ...props }) => <li className="mb-2 leading-relaxed text-black" {...props} />,
                      blockquote: ({ ...props }) => (
                        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-4" {...props} />
                      ),
                      code: ({ inline, ...props }) => (
                        <code
                          className={inline ? "bg-gray-100 px-1 py-0.5 rounded text-sm font-mono text-red-700" : "block bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto my-4 text-red-700"}
                          {...props}
                        />
                      ),
                      table: ({ ...props }) => (
                        <div className="overflow-x-auto my-4">
                          <table className="min-w-full divide-y divide-gray-300 border border-gray-300" {...props} />
                        </div>
                      ),
                      thead: ({ ...props }) => <thead className="bg-gray-50" {...props} />,
                      th: ({ ...props }) => <th className="px-4 py-2 text-left text-sm font-semibold text-gray-900 border-b border-gray-300" {...props} />,
                      td: ({ ...props }) => <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200" {...props} />,
                    }}
                  >
                    {animatedResponseContent}
                  </ReactMarkdown>
                  {isAnimatingResponse && <span className="inline-block w-2 h-5 bg-gray-400 animate-pulse ml-1"></span>}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md px-6">
                  <MessageSquare className="h-16 w-16 mx-auto mb-6 text-gray-300" />
                  <h3 className="text-2xl font-semibold mb-4 text-gray-900">Select a Question</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Click on any question from the left panel to view the AI response here.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 8px;
        }
        .scrollbar-custom::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #a0aec0;
          border-radius: 4px;
        }
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;