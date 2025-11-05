

// // import React, { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import apiService from "../services/api";

// // const ChatHistoryPage = () => {
// //   const [chats, setChats] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [loadingMore, setLoadingMore] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [hasMore, setHasMore] = useState(true);

// //   const navigate = useNavigate();

// //   const fetchChats = async (pageNumber = 1) => {
// //     try {
// //       if (pageNumber === 1) setLoading(true);
// //       else setLoadingMore(true);

// //       const data = await apiService.fetchChatSessions(pageNumber, 20);

// //       if (data.length < 20) setHasMore(false); // No more results

// //       if (pageNumber === 1) {
// //         setChats(data);
// //       } else {
// //         setChats((prev) => [...prev, ...data]);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching chats:", err);
// //       setError(err.message || "Error fetching chats");
// //     } finally {
// //       setLoading(false);
// //       setLoadingMore(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChats(1); // Initial fetch
// //   }, []);

// //   const handleLoadMore = () => {
// //     const nextPage = page + 1;
// //     setPage(nextPage);
// //     fetchChats(nextPage);
// //   };

// //   const generateTopicTitle = (chat) => {
// //     if (chat.isSecret) return chat.secretName || chat.promptName || "Secret Prompt";
// //     if (!chat.question) return "Untitled Chat";

// //     const words = chat.question.trim().split(" ");
// //     return words.length <= 8 ? chat.question : words.slice(0, 8).join(" ") + "...";
// //   };

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toLocaleDateString("en-US", {
// //       month: "short",
// //       day: "numeric",
// //       year: new Date().getFullYear() !== date.getFullYear() ? "numeric" : undefined,
// //     });
// //   };

// //   const handleChatClick = (chat) => {
// //     if (chat.file_id && chat.session_id) {
// //       navigate(`/analysis/${chat.file_id}/${chat.session_id}`, { state: { chat } });
// //     } else if (chat.session_id) {
// //       // If file_id is missing, navigate using only session_id, assuming the AnalysisPage can handle it.
// //       // This might require adjustments in AnalysisPage to fetch data based on session_id alone.
// //       navigate(`/analysis/session/${chat.session_id}`, { state: { chat } });
// //     } else {
// //       console.error("Cannot navigate to chat: Missing file_id and session_id", chat);
// //       // Optionally, show a user-friendly error message
// //       alert("Cannot open this chat. Information is incomplete.");
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-white flex items-center justify-center">
// //         <div className="text-slate-500 text-sm">Loading conversations...</div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-white flex items-center justify-center">
// //         <div className="text-slate-600 text-sm bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
// //           {error}
// //         </div>
// //       </div>
// //     );
// //   }

// //   const filteredChats = chats.filter(
// //     (chat) =>
// //       chat.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       chat.answer?.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   return (
// //     <div className="min-h-screen bg-white">
// //       <div className="max-w-3xl mx-auto px-6 py-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-2xl font-medium text-slate-900 mb-2">Conversations</h1>
// //           <p className="text-slate-600 text-sm mb-6">Your recent chat history</p>

// //           {/* Search Input */}
// //           <div className="relative">
// //             <input
// //               type="text"
// //               placeholder="Search conversations..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               className="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-slate-300"
// //             />
// //             <div className="absolute inset-y-0 right-0 flex items-center pr-3">
// //               <svg
// //                 className="w-4 h-4 text-slate-400"
// //                 fill="none"
// //                 stroke="currentColor"
// //                 viewBox="0 0 24 24"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //                 />
// //               </svg>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Chat List */}
// //         <div className="space-y-3">
// //           {[...filteredChats]
// //             .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // ✅ latest first
// //             .map((chat) => (
// //               <div
// //                 key={chat.id}
// //                 onClick={() => handleChatClick(chat)}
// //                 className="cursor-pointer block p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all"
// //               >
// //                 <div className="flex items-start justify-between gap-4">
// //                   <div className="flex-1 min-w-0">
// //                     <h3 className="font-medium text-slate-900 mb-2 line-clamp-1">
// //                       {generateTopicTitle(chat)}
// //                     </h3>
// //                     <p className="text-sm text-slate-600 line-clamp-2 mb-3">
// //                       {chat.isSecret ? "Secret prompt used." : chat.question}
// //                     </p>
// //                     <p className="text-sm text-slate-500 line-clamp-2">{chat.answer}</p>
// //                   </div>
// //                   <div className="flex-shrink-0 text-right">
// //                     <span className="text-xs text-slate-400">
// //                       {formatDate(chat.created_at)}
// //                     </span>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //         </div>

// //         {/* Load More Button */}
// //         {hasMore && (
// //           <div className="mt-8 text-center">
// //             <button
// //               onClick={handleLoadMore}
// //               disabled={loadingMore}
// //               className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-lg border border-slate-200"
// //             >
// //               {loadingMore ? "Loading..." : "Load older conversations"}
// //             </button>
// //           </div>
// //         )}

// //         {/* No Results */}
// //         {searchQuery && filteredChats.length === 0 && (
// //           <div className="text-center py-12 text-slate-500 text-sm">
// //             No conversations match your search
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatHistoryPage;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import apiService from "../services/api";

// const ChatHistoryPage = () => {
//   const [chats, setChats] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const navigate = useNavigate();

//   const fetchChats = async (pageNumber = 1) => {
//     try {
//       if (pageNumber === 1) setLoading(true);
//       else setLoadingMore(true);
//       const data = await apiService.fetchChatSessions(pageNumber, 20);
//       console.log('[ChatHistoryPage] Fetched chats:', data);
//       if (data.length < 20) setHasMore(false);
//       if (pageNumber === 1) {
//         setChats(data);
//       } else {
//         setChats((prev) => [...prev, ...data]);
//       }
//     } catch (err) {
//       console.error("Error fetching chats:", err);
//       setError(err.message || "Error fetching chats");
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   useEffect(() => {
//     fetchChats(1);
//   }, []);

//   const handleLoadMore = () => {
//     const nextPage = page + 1;
//     setPage(nextPage);
//     fetchChats(nextPage);
//   };

//   const generateTopicTitle = (chat) => {
//     if (chat.used_secret_prompt || chat.prompt_label) {
//       return chat.prompt_label || "Secret Prompt Analysis";
//     }
//     if (!chat.question) return "Untitled Chat";
//     const words = chat.question.trim().split(" ");
//     return words.length <= 8 ? chat.question : words.slice(0, 8).join(" ") + "...";
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffMinutes = Math.floor(diffTime / (1000 * 60));
//     const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//     if (diffMinutes < 60) {
//       return `Last message ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
//     } else if (diffHours < 24) {
//       return `Last message ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
//     } else if (diffDays === 1) {
//       return "Last message 1 day ago";
//     } else if (diffDays < 7) {
//       return `Last message ${diffDays} days ago`;
//     } else {
//       return `Last message ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
//     }
//   };

//   const handleChatClick = (chat) => {
//     console.log('[ChatHistoryPage] Chat clicked:', chat);

//     if (chat.file_id && chat.session_id) {
//       navigate(`/analysis/${chat.file_id}/${chat.session_id}`, {
//         state: {
//           chat: {
//             ...chat,
//             id: chat.id,
//             file_id: chat.file_id,
//             session_id: chat.session_id,
//             question: chat.question,
//             answer: chat.answer,
//             used_secret_prompt: chat.used_secret_prompt,
//             prompt_label: chat.prompt_label
//           }
//         }
//       });
//     } else if (chat.session_id) {
//       console.warn('[ChatHistoryPage] Missing file_id, navigating with session_id only');
//       navigate(`/analysis/session/${chat.session_id}`, {
//         state: {
//           chat: {
//             ...chat,
//             id: chat.id,
//             session_id: chat.session_id
//           }
//         }
//       });
//     } else {
//       console.error("Cannot navigate to chat: Missing required IDs", chat);
//       alert("Cannot open this chat. Information is incomplete.");
//     }
//   };

//   // UPDATED: New chat button now goes to /analysis
//   const handleNewChat = () => {
//     navigate('/analysis');
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1AA49B]"></div>
//           <div className="text-gray-500 text-sm">Loading conversations...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600 text-sm bg-red-50 px-4 py-3 rounded-lg border border-red-200">
//           <p className="font-medium text-red-800 mb-1">Error loading conversations</p>
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   const filteredChats = chats.filter(
//     (chat) =>
//       chat.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       chat.answer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       chat.prompt_label?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="max-w-3xl mx-auto px-4 py-6">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-xl font-medium text-gray-900">Your chat history</h1>
//           <button
//             onClick={handleNewChat}
//             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//             className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
//             style={{ backgroundColor: '#21C1B6' }}
//           >
//             <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//             </svg>
//             New chat
//           </button>
//         </div>

//         {/* Search Bar - Black Text */}
//         <div className="relative mb-4">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <input
//             type="text"
//             placeholder="Search your chats..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="block w-full pl-10 pr-3 py-3 border-2 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1AA49B] focus:border-[#1AA49B] bg-white"
//             style={{ 
//               color: 'black', 
//               borderColor: '#21C1B6' 
//             }}
//             onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1AA49B')}
//             onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#21C1B6')}
//           />
//         </div>

//         {/* Chat Count + Select */}
//         <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
//           <span>{filteredChats.length} chats with JuriNexAi</span>
//           <button className="text-[#21C1B6] hover:text-[#1AA49B] font-medium">Select</button>
//         </div>

//         {/* Chat List - Light Border */}
//         <div className="space-y-4">
//           {[...filteredChats]
//             .sort((a, b) => new Date(b.created_at || b.timestamp) - new Date(a.created_at || a.timestamp))
//             .map((chat, index) => (
//               <div
//                 key={chat.id || index}
//                 onClick={() => handleChatClick(chat)}
//                 className="group cursor-pointer block px-6 py-5 bg-white rounded-2xl transition-all"
//                 style={{ 
//                   border: '2px solid #A3E4DB',
//                   backgroundColor: 'white'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.borderColor = '#1AA49B';
//                   e.currentTarget.style.backgroundColor = '#F5FFFE';
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.borderColor = '#A3E4DB';
//                   e.currentTarget.style.backgroundColor = 'white';
//                 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-center gap-2 mb-1">
//                       <h3 className="text-base font-medium text-gray-900 truncate">
//                         {generateTopicTitle(chat)}
//                       </h3>
//                       {chat.used_secret_prompt && (
//                         <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e6f7f5] text-[#1AA49B]">
//                           Secret
//                         </span>
//                       )}
//                     </div>
//                     <p className="text-sm text-gray-500">
//                       {formatDate(chat.created_at || chat.timestamp)}
//                     </p>
//                   </div>

//                   <div className="opacity-0 group-hover:opacity-100 transition-opacity">
//                     <button
//                       className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                       }}
//                     >
//                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
//                         <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>

//         {/* Load More Button */}
//         {hasMore && (
//           <div className="mt-8 text-center">
//             <button
//               onClick={handleLoadMore}
//               disabled={loadingMore}
//               className="px-6 py-2.5 text-sm font-medium text-white rounded-xl transition-colors"
//               style={{ backgroundColor: '#21C1B6' }}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//             >
//               {loadingMore ? (
//                 <span className="flex items-center gap-2">
//                   <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                   Loading...
//                 </span>
//               ) : (
//                 "Load older conversations"
//               )}
//             </button>
//           </div>
//         )}

//         {/* No Search Results */}
//         {searchQuery && filteredChats.length === 0 && (
//           <div className="text-center py-16">
//             <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <p className="text-gray-500 text-sm">No conversations match your search</p>
//           </div>
//         )}

//         {/* Empty State */}
//         {!loading && chats.length === 0 && !searchQuery && (
//           <div className="text-center py-16">
//             <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//             <p className="text-gray-600 text-lg font-medium mb-2">No conversations yet</p>
//             <p className="text-gray-500 text-sm">
//               Start a conversation by uploading a document and asking questions
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatHistoryPage;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";

const ChatHistoryPage = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchChats = async (pageNumber = 1) => {
    try {
      if (pageNumber === 1) setLoading(true);
      else setLoadingMore(true);
      const data = await apiService.fetchChatSessions(pageNumber, 20);
      console.log('[ChatHistoryPage] Fetched chats:', data);
      if (data.length < 20) setHasMore(false);
      if (pageNumber === 1) {
        setChats(data);
      } else {
        setChats((prev) => [...prev, ...data]);
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError(err.message || "Error fetching chats");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchChats(1);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchChats(nextPage);
  };

  const generateTopicTitle = (chat) => {
    if (chat.used_secret_prompt || chat.prompt_label) {
      return chat.prompt_label || "Secret Prompt Analysis";
    }
    if (!chat.question) return "Untitled Chat";
    const words = chat.question.trim().split(" ");
    return words.length <= 8 ? chat.question : words.slice(0, 8).join(" ") + "...";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffMinutes < 60) {
      return `Last message ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `Last message ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays === 1) {
      return "Last message 1 day ago";
    } else if (diffDays < 7) {
      return `Last message ${diffDays} days ago`;
    } else {
      return `Last message ${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
    }
  };

  const handleChatClick = (chat) => {
    console.log('[ChatHistoryPage] Chat clicked:', chat);

    if (chat.file_id && chat.session_id) {
      navigate(`/analysis/${chat.file_id}/${chat.session_id}`, {
        state: {
          chat: {
            ...chat,
            id: chat.id,
            file_id: chat.file_id,
            session_id: chat.session_id,
            question: chat.question,
            answer: chat.answer,
            used_secret_prompt: chat.used_secret_prompt,
            prompt_label: chat.prompt_label
          }
        }
      });
    } else if (chat.session_id) {
      console.warn('[ChatHistoryPage] Missing file_id, navigating with session_id only');
      navigate(`/analysis/session/${chat.session_id}`, {
        state: {
          chat: {
            ...chat,
            id: chat.id,
            session_id: chat.session_id
          }
        }
      });
    } else {
      console.error("Cannot navigate to chat: Missing required IDs", chat);
      alert("Cannot open this chat. Information is incomplete.");
    }
  };

  // UPDATED: New chat button now goes to /analysis
  const handleNewChat = () => {
    navigate('/analysis');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1AA49B]"></div>
          <div className="text-gray-500 text-sm">Loading conversations...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-sm bg-red-50 px-4 py-3 rounded-lg border border-red-200">
          <p className="font-medium text-red-800 mb-1">Error loading conversations</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  const filteredChats = chats.filter(
    (chat) =>
      chat.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.answer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.prompt_label?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-medium text-gray-900">Your chat history</h1>
          <button
            onClick={handleNewChat}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style={{ backgroundColor: '#21C1B6' }}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New chat
          </button>
        </div>

        {/* Search Bar - Black Text */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search your chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border-2 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1AA49B] focus:border-[#1AA49B] bg-white"
            style={{ 
              color: 'black', 
              borderColor: '#21C1B6' 
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#1AA49B')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#21C1B6')}
          />
        </div>

        {/* Chat Count + Select */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span>{filteredChats.length} chats with JuriNex</span>
          <button className="text-[#21C1B6] hover:text-[#1AA49B] font-medium">Select</button>
        </div>

        {/* Chat List - Light Border */}
        <div className="space-y-4">
          {[...filteredChats]
            .sort((a, b) => new Date(b.created_at || b.timestamp) - new Date(a.created_at || a.timestamp))
            .map((chat, index) => (
              <div
                key={chat.id || index}
                onClick={() => handleChatClick(chat)}
                className="group cursor-pointer block px-6 py-5 bg-white rounded-2xl transition-all"
                style={{ 
                  border: '2px solid #A3E4DB',
                  backgroundColor: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1AA49B';
                  e.currentTarget.style.backgroundColor = '#F5FFFE';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#A3E4DB';
                  e.currentTarget.style.backgroundColor = 'white';
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-medium text-gray-900 truncate">
                        {generateTopicTitle(chat)}
                      </h3>
                      {chat.used_secret_prompt && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#e6f7f5] text-[#1AA49B]">
                          Secret
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {formatDate(chat.created_at || chat.timestamp)}
                    </p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-6 py-2.5 text-sm font-medium text-white rounded-xl transition-colors"
              style={{ backgroundColor: '#21C1B6' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Loading...
                </span>
              ) : (
                "Load older conversations"
              )}
            </button>
          </div>
        )}

        {/* No Search Results */}
        {searchQuery && filteredChats.length === 0 && (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 text-sm">No conversations match your search</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && chats.length === 0 && !searchQuery && (
          <div className="text-center py-16">
            <svg className="mx-auto h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-600 text-lg font-medium mb-2">No conversations yet</p>
            <p className="text-gray-500 text-sm">
              Start a conversation by uploading a document and asking questions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistoryPage;