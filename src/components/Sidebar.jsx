// import React, { useState, useEffect, useRef } from 'react';
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   PlusIcon,
//   ChartBarIcon,
//   DocumentTextIcon,
//   MagnifyingGlassCircleIcon,
//   PencilSquareIcon,
//   ScaleIcon,
//   BookOpenIcon,
//   ClockIcon,
//   UserGroupIcon,
//   Cog6ToothIcon,
//   Bars3Icon,
//   XMarkIcon,
//   CreditCardIcon, // New import for Billing and Usage
// } from '@heroicons/react/24/outline';
// import {
//   FolderPlus,
//   FileUp,
//   Home,
//   Folder,
//   Upload,
//   ChevronDown,
//   ChevronRight,
//   MessageSquare
// } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UserProfileMenu from './UserProfileMenu';
// import NexintelLogo from '../assets/nexintel.jpg'; // Import the new logo
// // import RoleSelection from './RoleSelection';
// // import LegalIntelligence from './LegalIntelligence';
// import QuickTools from './QuickTools';
// import { useFileManager } from '../context/FileManagerContext';
// import { useAuth } from '../context/AuthContext'; // Import AuthContext

// import { useSidebar } from '../context/SidebarContext'; // Import useSidebar

// const Sidebar = () => {
//   const { isSidebarHidden, setIsSidebarHidden, isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar(); // Use context state
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false); // New state for profile menu
//   const [currentFileId, setCurrentFileId] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
//   const [userData, setUserData] = useState(null); // State to store user data from localStorage
//   const location = useLocation();
//   const navigate = useNavigate();

//   const {
//     createFolder, // Keep createFolder as it's from the context
//   } = useFileManager();

//   // Local states for file/folder management within Sidebar, if needed
//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [creatingFolder, setCreatingFolder] = useState(false); // Assuming local state for this

//   const handleFileChange = (e) => {
//     // Implement local file change logic or pass up via context if needed
//     console.log("File(s) selected:", e.target.files);
//   };

//   const handleFolderChange = (e) => {
//     // Implement local folder change logic or pass up via context if needed
//     console.log("Folder(s) selected:", e.target.files);
//   };

//   const { user } = useAuth(); // Get user from AuthContext

//   // Load user data from localStorage
//   useEffect(() => {
//     const loadUserData = () => {
//       try {
//         const storedUserData = localStorage.getItem('user');
//         if (storedUserData) {
//           const parsedUserData = JSON.parse(storedUserData);
//           setUserData(parsedUserData);
//         }
//       } catch (error) {
//         console.error('Error parsing user data from localStorage:', error);
//       }
//     };

//     loadUserData();

//     // Listen for localStorage changes
//     const handleStorageChange = (e) => {
//       if (e.key === 'user') {
//         loadUserData();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   // Helper function to derive display name
//   const getDisplayName = (userInfo) => {
//     // First try to get from localStorage userData
//     if (userData?.username) {
//       return userData.username;
//     }
    
//     // Fallback to AuthContext user
//     if (userInfo?.username) {
//       return userInfo.username;
//     }
    
//     // If no username, try email
//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//     }
    
//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//     }
    
//     return 'User';
//   };

//   // Helper function to derive initials
//   const getInitials = (userInfo) => {
//     // First try to get from localStorage userData
//     if (userData?.username) {
//       const username = userData.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter(part => part.length > 0);
//         if (parts.length >= 2) {
//           return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//         }
//         return username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }
    
//     // Fallback to AuthContext user
//     if (userInfo?.username) {
//       const username = userInfo.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter(part => part.length > 0);
//         if (parts.length >= 2) {
//           return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//         }
//         return username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }
    
//     // If no username, try email
//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else {
//         return emailPart.charAt(0).toUpperCase();
//       }
//     }
    
//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else {
//         return emailPart.charAt(0).toUpperCase();
//       }
//     }
    
//     return 'U';
//   };

//   const displayName = getDisplayName(user);
//   const userInitials = getInitials(user);

//   // Check if device is mobile/tablet
//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth < 1024);
//       if (window.innerWidth < 1024) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     checkDevice();
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   // Close mobile menu when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);
 
//   // Load currentFileId from localStorage on mount and listen for changes
//   useEffect(() => {
//     const loadCurrentFileId = () => {
//       const fileId = localStorage.getItem('currentFileId');
//       setCurrentFileId(fileId);
//     };

//     loadCurrentFileId();

//     // Listen for localStorage changes
//     const handleStorageChange = (e) => {
//       if (e.key === 'currentFileId') {
//         setCurrentFileId(e.newValue);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     // Also listen for custom events in case localStorage is updated in the same tab
//     const handleCurrentFileChange = (e) => {
//       setCurrentFileId(e.detail.fileId);
//     };

//     window.addEventListener('currentFileIdChanged', handleCurrentFileChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('currentFileIdChanged', handleCurrentFileChange);
//     };
//   }, []);

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setIsMobileMenuOpen(!isMobileMenuOpen);
//     } else {
//       setIsSidebarCollapsed(prev => !prev); // Toggle context state
//     }
//   };

//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen(prev => !prev);
//   };

//   const isActive = (path) => {
//     return location.pathname === path || location.pathname.startsWith(path + '/');
//   };

//   // Handle navigation to chats
//   const handleChatNavigation = () => {
//     if (currentFileId) {
//       navigate(`/chats/${currentFileId}`);
//     } else {
//       // Navigate to base chats route - your chat component should handle the empty state
//       navigate('/chats');
//     }
//   };

//   const navigationItems = [
//     { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
//     {
//       name: 'Projects', // Changed name to Projects
//       path: '/documents', // Changed path to /documents
//       icon: DocumentTextIcon,
//     },
//     { name: 'ICOM', path: '/analysis', icon: MagnifyingGlassCircleIcon },
//     { name: 'Chats', path: '/chats', icon: MessageSquare, isSpecial: true }, // Mark as special for custom handling
//     { name: 'Document Drafting', path: '/drafting', icon: PencilSquareIcon },
//     { name: 'Billing & Usage', path: '/billing-usage', icon: CreditCardIcon }, // New navigation item
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'active': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'completed': return 'bg-blue-100 text-blue-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   // Mobile Header Component
//   const MobileHeader = () => (
//     <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
//       <div className="flex items-center space-x-3">
//         <img src={NexintelLogo} alt="Nexintel AI Logo" className="h-8 w-auto" />
//         <div>
//           <div className="text-lg font-bold text-gray-900"></div>
//           <div className="text-xs text-gray-500 font-medium"></div>
//         </div>
//       </div>
//       <button
//         onClick={() => setIsMobileMenuOpen(true)}
//         className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//       >
//         <Bars3Icon className="h-6 w-6 text-gray-500" />
//       </button>
//     </div>
//   );

//   // Sidebar Content Component
//   const SidebarContent = ({ isMobileView = false, toggleProfileMenu, isProfileMenuOpen }) => (
//     <div className="flex flex-col h-full">
//       {/* Header for Desktop or Mobile Drawer Header */}
//       <div className={`px-4 py-3 border-b border-gray-200 relative bg-white ${isMobileView ? '' : 'hidden lg:block'}`}>
//         {!isMobileView && (
//           <button
//             onClick={toggleSidebar}
//             className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200 z-10"
//           >
//             {isSidebarCollapsed ? (
//               <ChevronRightIcon className="h-4 w-4 text-gray-500" />
//             ) : (
//               <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
//             )}
//           </button>
//         )}

//         {isMobileView && (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <img src={NexintelLogo} alt="Nexintel AI Logo" className="h-8 w-auto" />
//               <div>
//                 <div className="text-lg font-bold text-gray-900"></div>
//                 <div className="text-xs text-gray-500 font-medium"></div>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
//             >
//               <XMarkIcon className="h-6 w-6 text-gray-500" />
//             </button>
//           </div>
//         )}
        
//         <div className={`transition-all duration-300 ${isSidebarCollapsed && !isMobileView ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
//           {(!isSidebarCollapsed || isMobileView) && !isMobileView && (
//             <div className="flex items-center space-x-3">
//               <img src={NexintelLogo} alt="Nexintel AI Logo" className="h-8 w-auto" />
//               <div>
//                 <div className="text-lg font-bold text-gray-900"></div>
//                 <div className="text-xs text-gray-500 font-medium"></div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {isSidebarCollapsed && !isMobileView && (
//           <div className="flex justify-center">
//             <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
//               <ScaleIcon className="h-5 w-5 text-white" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* New Case Button */}
//       <div className="p-4">
//         <button
//           onClick={() => navigate('/analysis', { state: { newChat: true } })}
//           className="w-full bg-gray-700 text-white rounded-lg py-2.5 text-sm font-semibold flex items-center justify-center hover:bg-gray-800 transition-all duration-200 shadow-sm hover:shadow-md"
//         >
//           <PlusIcon className="h-5 w-5" />
//           <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline ml-2'}`}>
//             New Case Analysis
//           </span>
//         </button>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 overflow-y-auto px-2 pb-4">
//         <div className="mb-6">
//           {(!isSidebarCollapsed || isMobileView) && (
//             <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 mb-3">
//               Navigation
//             </div>
//           )}
//           <nav className="space-y-1">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const active = isActive(item.path);
//               const isDocumentUpload = item.name === 'Document Upload';
//               const isChats = item.name === 'Chats';

//               return (
//                 <div key={item.name}>
//                   {isChats ? (
//                     <Link
//                       to={currentFileId ? `/chats/${currentFileId}` : '/chats'}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-2' : 'px-3'} py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
//                         active
//                           ? 'bg-gray-100 text-gray-900 border border-gray-200'
//                           : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active
//                             ? 'text-gray-900'
//                             : 'text-gray-500 group-hover:text-gray-900'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>
//                         {item.name}
//                       </span>
//                       {active && (!isSidebarCollapsed || isMobileView) && (
//                         <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"></div>
//                       )}
//                       {!currentFileId && (!isSidebarCollapsed || isMobileView) && (
//                         <div className="ml-auto">
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-100 text-indigo-600">
//                             No file
//                           </span>
//                         </div>
//                       )}
//                     </Link>
//                   ) : (
//                     <Link
//                       to={item.path}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-2' : 'px-3'} py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
//                         active
//                           ? 'bg-gray-100 text-gray-900 border border-gray-200'
//                           : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active
//                             ? 'text-gray-900'
//                             : 'text-gray-500 group-hover:text-gray-900'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>
//                         {item.name}
//                       </span>
//                       {active && (!isSidebarCollapsed || isMobileView) && (
//                         <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"></div>
//                       )}
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Role Selection */}
//         {/* <RoleSelection isCollapsed={isSidebarCollapsed && !isMobileView} /> */}
        
//         {/* Legal Intelligence */}
//         {/* <LegalIntelligence isCollapsed={isSidebarCollapsed && !isMobileView} /> */}

//         {/* Quick Tools */}
//         <QuickTools isCollapsed={isSidebarCollapsed && !isMobileView} />
//       </div>

//       {/* Footer */}
//       <div className="p-4 border-t border-gray-200 bg-white">
//         {(!isSidebarCollapsed || isMobileView) && (
//           <div className="space-y-3">
//             {/* Removed Language and Settings buttons as per user request */}
//           </div>
//         )}
        
//         {isSidebarCollapsed && !isMobileView && (
//           <div className="flex flex-col space-y-2">
//             {/* Removed Language and Settings buttons as per user request */}
//           </div>
//         )}
//       </div>

//       {/* User Profile Menu Trigger at the bottom */}
//       <div className="p-4 border-t border-gray-200 bg-white relative">
//         <button
//           onClick={toggleProfileMenu}
//           className={`w-full flex items-center space-x-3 text-gray-700 hover:bg-gray-100 rounded-lg py-2.5 px-3 text-sm font-medium transition-all duration-200 ${
//             isSidebarCollapsed && !isMobileView ? 'justify-center px-2' : 'justify-between'
//           }`}
//         >
//           <div className="flex items-center space-x-3 min-w-0 flex-1">
//             <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
//               {userInitials}
//             </div>
//             {(!isSidebarCollapsed || isMobileView) && (
//               <div className="text-left min-w-0 flex-1">
//                 <div className="text-sm font-medium text-gray-900 truncate">{displayName}</div>
//                 {userData?.email && (
//                   <div className="text-xs text-gray-500 truncate">{userData.email}</div>
//                 )}
//               </div>
//             )}
//           </div>
//           {(!isSidebarCollapsed || isMobileView) && (
//             <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
//           )}
//         </button>
//         {isProfileMenuOpen && (
//           <div className={`absolute bottom-full ${isSidebarCollapsed && !isMobileView ? 'left-1/2 transform -translate-x-1/2 w-64' : 'left-0 w-full'} mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50`}>
//             <UserProfileMenu userData={userData} />
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Header */}
//       <MobileHeader />

//       {/* Desktop Sidebar */}
//       <div
//         className={`hidden lg:flex bg-white border-r border-gray-200 flex-col transition-all duration-300 ease-in-out shadow-sm ${
//           isSidebarCollapsed ? 'w-20' : 'w-80'
//         } relative h-screen`}
//       >
//         <SidebarContent toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//       </div>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 flex">
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
          
//           {/* Sidebar Drawer */}
//           <div className="relative flex flex-col w-80 max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
//             <SidebarContent isMobileView={true} toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//           </div>
//         </div>
//       )}

//       {/* Hidden file inputs */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
//       />
//       <input
//         ref={folderInputRef}
//         type="file"
//         multiple
//         onChange={handleFolderChange}
//         className="hidden"
//         webkitdirectory=""
//         directory=""
//       />
//     </>
//   );
// };

// // Helper component for rendering folder tree
// const FolderTreeComponent = ({ items, level = 0, parentPath = '', expandedFolders, toggleFolder, selectFolder, selectedFolder, searchQuery = '' }) => {
//   return items
//     .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     .map((item, index) => {
//       const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//       const isExpanded = expandedFolders.has(itemPath);
//       const hasChildren = item.children && item.children.length > 0;
//       const isSelected = selectedFolder?.id === item.id;
      
//       return (
//         <div key={`${itemPath}-${index}`} className="select-none">
//           <button
//             onClick={() => selectFolder(item)}
//             className={`group flex items-center w-full py-1.5 px-3 mx-1 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${
//               isSelected ? 'bg-indigo-600 text-white' : 'text-gray-700'
//             }`}
//             style={{ paddingLeft: `${(level * 16) + 12}px` }}
//           >
//             {hasChildren && (
//               <span
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFolder(itemPath);
//                 }}
//                 className="mr-2 p-0.5 rounded hover:bg-gray-100 transition-colors"
//               >
//                 {isExpanded ? (
//                   <ChevronDown className="w-4 h-4 text-gray-500" />
//                 ) : (
//                   <ChevronRight className="w-4 h-4 text-gray-500" />
//                 )}
//               </span>
//             )}
//             {!hasChildren && <span className="w-4 h-4 mr-2" />}
//             <Folder className={`h-4 w-4 mr-2 flex-shrink-0 ${
//               isSelected ? 'text-white' : 'text-gray-500'
//             }`} />
//             <span className="text-sm truncate">{item.name}</span>
//           </button>
          
//           {hasChildren && isExpanded && (
//             <div className="mt-0.5">
//               <FolderTreeComponent
//                 items={item.children}
//                 level={level + 1}
//                 parentPath={itemPath}
//                 expandedFolders={expandedFolders}
//                 toggleFolder={toggleFolder}
//                 selectFolder={selectFolder}
//                 selectedFolder={selectedFolder}
//                 searchQuery={searchQuery}
//               />
//             </div>
//           )}
//         </div>
//       );
//     });
// };

// export default Sidebar;


// import React, { useState, useEffect, useRef } from 'react';
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   PlusIcon,
//   ChartBarIcon,
//   DocumentTextIcon,
//   MagnifyingGlassCircleIcon,
//   PencilSquareIcon,
//   ScaleIcon,
//   BookOpenIcon,
//   ClockIcon,
//   UserGroupIcon,
//   Cog6ToothIcon,
//   Bars3Icon,
//   XMarkIcon,
//   CreditCardIcon,
//   BellIcon,
//   QuestionMarkCircleIcon,
// } from '@heroicons/react/24/outline';
// import {
//   FolderPlus,
//   FileUp,
//   Home,
//   Folder,
//   Upload,
//   ChevronDown,
//   ChevronRight,
//   MessageSquare,
//   LogOut,
//   User,
//   Settings
// } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UserProfileMenu from './UserProfileMenu';
// import NexintelLogo from '../assets/nexintel.jpg';
// import QuickTools from './QuickTools';
// import { useFileManager } from '../context/FileManagerContext';
// import { useAuth } from '../context/AuthContext';
// import { useSidebar } from '../context/SidebarContext';

// const Sidebar = () => {
//   const { isSidebarHidden, setIsSidebarHidden, isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [currentFileId, setCurrentFileId] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { createFolder } = useFileManager();

//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [creatingFolder, setCreatingFolder] = useState(false);

//   const handleFileChange = (e) => {
//     console.log("File(s) selected:", e.target.files);
//   };

//   const handleFolderChange = (e) => {
//     console.log("Folder(s) selected:", e.target.files);
//   };

//   const { user } = useAuth();

//   useEffect(() => {
//     const loadUserData = () => {
//       try {
//         const storedUserData = localStorage.getItem('user');
//         if (storedUserData) {
//           const parsedUserData = JSON.parse(storedUserData);
//           setUserData(parsedUserData);
//         }
//       } catch (error) {
//         console.error('Error parsing user data from localStorage:', error);
//       }
//     };

//     loadUserData();

//     const handleStorageChange = (e) => {
//       if (e.key === 'user') {
//         loadUserData();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const getDisplayName = (userInfo) => {
//     if (userData?.username) {
//       return userData.username;
//     }
    
//     if (userInfo?.username) {
//       return userInfo.username;
//     }
    
//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//     }
    
//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//     }
    
//     return 'User';
//   };

//   const getInitials = (userInfo) => {
//     if (userData?.username) {
//       const username = userData.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter(part => part.length > 0);
//         if (parts.length >= 2) {
//           return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//         }
//         return username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }
    
//     if (userInfo?.username) {
//       const username = userInfo.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter(part => part.length > 0);
//         if (parts.length >= 2) {
//           return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//         }
//         return username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }
    
//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else {
//         return emailPart.charAt(0).toUpperCase();
//       }
//     }
    
//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else {
//         return emailPart.charAt(0).toUpperCase();
//       }
//     }
    
//     return 'U';
//   };

//   const displayName = getDisplayName(user);
//   const userInitials = getInitials(user);

//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth < 1024);
//       if (window.innerWidth < 1024) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     checkDevice();
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);
 
//   useEffect(() => {
//     const loadCurrentFileId = () => {
//       const fileId = localStorage.getItem('currentFileId');
//       setCurrentFileId(fileId);
//     };

//     loadCurrentFileId();

//     const handleStorageChange = (e) => {
//       if (e.key === 'currentFileId') {
//         setCurrentFileId(e.newValue);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     const handleCurrentFileChange = (e) => {
//       setCurrentFileId(e.detail.fileId);
//     };

//     window.addEventListener('currentFileIdChanged', handleCurrentFileChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('currentFileIdChanged', handleCurrentFileChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setIsMobileMenuOpen(!isMobileMenuOpen);
//     } else {
//       setIsSidebarCollapsed(prev => !prev);
//     }
//   };

//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen(prev => !prev);
//   };

//   const isActive = (path) => {
//     return location.pathname === path || location.pathname.startsWith(path + '/');
//   };

//   const handleChatNavigation = () => {
//     if (currentFileId) {
//       navigate(`/chats/${currentFileId}`);
//     } else {
//       navigate('/chats');
//     }
//   };

//   const navigationItems = [
//     { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
//     {
//       name: 'Projects',
//       path: '/documents',
//       icon: DocumentTextIcon,
//     },
//     { name: 'ICOM', path: '/analysis', icon: MagnifyingGlassCircleIcon },
//     { name: 'Chats', path: '/chats', icon: MessageSquare, isSpecial: true },
//     { name: 'Document Drafting', path: '/drafting', icon: PencilSquareIcon },
//     { name: 'Billing & Usage', path: '/billing-usage', icon: CreditCardIcon },
//   ];

//   const MobileHeader = () => (
//     <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0d1117] border-b border-gray-900 px-4 py-3 flex items-center justify-between">
//       <div className="flex items-center space-x-3">
//         <img src={NexintelLogo} alt="Nexintel AI Logo" className="h-8 w-auto rounded-lg" />
//         <div>
//           <div className="text-lg font-bold text-[#9CDFE1]">Nexintel</div>
//         </div>
//       </div>
//       <button
//         onClick={() => setIsMobileMenuOpen(true)}
//         className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
//       >
//         <Bars3Icon className="h-6 w-6 text-gray-400" />
//       </button>
//     </div>
//   );

//   const SidebarContent = ({ isMobileView = false, toggleProfileMenu, isProfileMenuOpen }) => (
//     <div className="flex flex-col h-full bg-[#0d1117]">
//       {/* Header */}
//       <div className={`px-6 py-5 border-b border-gray-900 relative ${isMobileView ? '' : 'hidden lg:block'}`}>
//         {!isMobileView && (
//           <button
//             onClick={toggleSidebar}
//             className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#0d1117] border border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-900 transition-all duration-200 z-10"
//           >
//             {isSidebarCollapsed ? (
//               <ChevronRightIcon className="h-4 w-4 text-gray-500" />
//             ) : (
//               <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
//             )}
//           </button>
//         )}

//         {isMobileView && (
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-3">
//               <img src={NexintelLogo} alt="Nexintel AI Logo" className="h-10 w-auto rounded-lg" />
//               <div>
//                 <div className="text-xl font-bold text-[#9CDFE1]">Nexintel</div>
//               </div>
//             </div>
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
//             >
//               <XMarkIcon className="h-6 w-6 text-gray-400" />
//             </button>
//           </div>
//         )}
        
//         <div className={`transition-all duration-300 ${isSidebarCollapsed && !isMobileView ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
//           {(!isSidebarCollapsed || isMobileView) && !isMobileView && (
//             <div className="flex items-center space-x-3">
//               <div className="bg-[#9CDFE1] p-2 rounded-xl shadow-lg">
//                 <ScaleIcon className="h-6 w-6 text-[#0d1117]" />
//               </div>
//               <div>
//                 <div className="text-xl font-bold text-[#9CDFE1]">Nexintel</div>
//                 <div className="text-xs text-gray-500 font-medium">Legal Intelligence</div>
//               </div>
//             </div>
//           )}
//         </div>
        
//         {isSidebarCollapsed && !isMobileView && (
//           <div className="flex justify-center">
//             <div className="bg-[#9CDFE1] p-2 rounded-xl shadow-lg">
//               <ScaleIcon className="h-6 w-6 text-[#0d1117]" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* New Case Button */}
//       <div className="px-4 pt-6 pb-4">
//         <button
//           onClick={() => navigate('/analysis', { state: { newChat: true } })}
//           className="w-full bg-[#9CDFE1] text-[#0d1117] rounded-xl py-3 text-sm font-bold flex items-center justify-center hover:bg-[#89cfd1] transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//         >
//           <PlusIcon className="h-5 w-5" />
//           <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline ml-2'}`}>
//             Create New Case
//           </span>
//         </button>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 overflow-y-auto px-3 pb-4">
//         <div className="mb-6">
//           <nav className="space-y-1">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const active = isActive(item.path);
//               const isChats = item.name === 'Chats';

//               return (
//                 <div key={item.name}>
//                   {isChats ? (
//                     <Link
//                       to={currentFileId ? `/chats/${currentFileId}` : '/chats'}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
//                         active
//                           ? 'bg-[#1c2128] text-white font-bold'
//                           : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>
//                         {item.name}
//                       </span>
//                       {!currentFileId && (!isSidebarCollapsed || isMobileView) && (
//                         <div className="ml-auto">
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-900 text-gray-500">
//                             No file
//                           </span>
//                         </div>
//                       )}
//                     </Link>
//                   ) : (
//                     <Link
//                       to={item.path}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
//                         active
//                           ? 'bg-[#1c2128] text-white font-bold'
//                           : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>
//                         {item.name}
//                       </span>
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Quick Tools */}
//         <QuickTools isCollapsed={isSidebarCollapsed && !isMobileView} />
//       </div>

//       {/* Bottom Section - Notifications, Help, Settings */}
//       <div className="px-3 pb-4 border-t border-gray-900 pt-4">
//         {(!isSidebarCollapsed || isMobileView) && (
//           <div className="space-y-1">
//             <button className="w-full flex items-center px-4 py-2.5 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <BellIcon className="h-5 w-5 mr-3 text-gray-500" />
//               <span className="text-sm font-medium">Notifications</span>
//               <span className="ml-auto bg-[#9CDFE1] text-[#0d1117] text-xs font-bold px-2 py-0.5 rounded-full">3</span>
//             </button>
//             <button className="w-full flex items-center px-4 py-2.5 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <QuestionMarkCircleIcon className="h-5 w-5 mr-3 text-gray-500" />
//               <span className="text-sm font-medium">Help</span>
//             </button>
//             <button className="w-full flex items-center px-4 py-2.5 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <Cog6ToothIcon className="h-5 w-5 mr-3 text-gray-500" />
//               <span className="text-sm font-medium">Settings</span>
//             </button>
//           </div>
//         )}
        
//         {isSidebarCollapsed && !isMobileView && (
//           <div className="flex flex-col space-y-1">
//             <button className="w-full flex justify-center p-3 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <BellIcon className="h-5 w-5 text-gray-500" />
//             </button>
//             <button className="w-full flex justify-center p-3 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />
//             </button>
//             <button className="w-full flex justify-center p-3 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>
//         )}
//       </div>

//       {/* User Profile Menu Trigger at the bottom */}
//       <div className="px-3 pb-4 border-t border-gray-900 pt-4 bg-[#0d1117] relative">
//         <button
//           onClick={toggleProfileMenu}
//           className={`w-full flex items-center space-x-3 text-gray-400 hover:bg-[#1c2128]/60 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 ${
//             isSidebarCollapsed && !isMobileView ? 'justify-center px-2' : 'justify-between'
//           }`}
//         >
//           <div className="flex items-center space-x-3 min-w-0 flex-1">
//             <div className="w-10 h-10 bg-[#9CDFE1] rounded-full flex items-center justify-center text-[#0d1117] font-bold text-sm flex-shrink-0 shadow-lg">
//               {userInitials}
//             </div>
//             {(!isSidebarCollapsed || isMobileView) && (
//               <div className="text-left min-w-0 flex-1">
//                 <div className="text-sm font-semibold text-gray-200 truncate">{displayName}</div>
//                 {userData?.email && (
//                   <div className="text-xs text-gray-500 truncate">{userData.email}</div>
//                 )}
//               </div>
//             )}
//           </div>
//           {(!isSidebarCollapsed || isMobileView) && (
//             <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
//           )}
//         </button>
//         {isProfileMenuOpen && (
//           <div className={`absolute bottom-full ${isSidebarCollapsed && !isMobileView ? 'left-1/2 transform -translate-x-1/2 w-64' : 'left-0 w-full'} mb-2 bg-[#161b22] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden`}>
//             <UserProfileMenu userData={userData} />
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Header */}
//       <MobileHeader />

//       {/* Desktop Sidebar */}
//       <div
//         className={`hidden lg:flex bg-[#0d1117] border-r border-gray-900 flex-col transition-all duration-300 ease-in-out shadow-2xl ${
//           isSidebarCollapsed ? 'w-20' : 'w-72'
//         } relative h-screen`}
//       >
//         <SidebarContent toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//       </div>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 flex">
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 backdrop-blur-sm"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
          
//           {/* Sidebar Drawer */}
//           <div className="relative flex flex-col w-80 max-w-xs bg-[#0d1117] shadow-2xl transform transition-transform duration-300 ease-in-out">
//             <SidebarContent isMobileView={true} toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//           </div>
//         </div>
//       )}

//       {/* Hidden file inputs */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
//       />
//       <input
//         ref={folderInputRef}
//         type="file"
//         multiple
//         onChange={handleFolderChange}
//         className="hidden"
//         webkitdirectory=""
//         directory=""
//       />
//     </>
//   );
// };

// const FolderTreeComponent = ({ items, level = 0, parentPath = '', expandedFolders, toggleFolder, selectFolder, selectedFolder, searchQuery = '' }) => {
//   return items
//     .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     .map((item, index) => {
//       const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//       const isExpanded = expandedFolders.has(itemPath);
//       const hasChildren = item.children && item.children.length > 0;
//       const isSelected = selectedFolder?.id === item.id;
      
//       return (
//         <div key={`${itemPath}-${index}`} className="select-none">
//           <button
//             onClick={() => selectFolder(item)}
//             className={`group flex items-center w-full py-2 px-3 mx-1 rounded-lg cursor-pointer hover:bg-[#1c2128]/60 transition-colors ${
//               isSelected ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 font-medium'
//             }`}
//             style={{ paddingLeft: `${(level * 16) + 12}px` }}
//           >
//             {hasChildren && (
//               <span
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFolder(itemPath);
//                 }}
//                 className="mr-2 p-0.5 rounded hover:bg-gray-800 transition-colors"
//               >
//                 {isExpanded ? (
//                   <ChevronDown className="w-4 h-4 text-gray-500" />
//                 ) : (
//                   <ChevronRight className="w-4 h-4 text-gray-500" />
//                 )}
//               </span>
//             )}
//             {!hasChildren && <span className="w-4 h-4 mr-2" />}
//             <Folder className={`h-4 w-4 mr-2 flex-shrink-0 ${
//               isSelected ? 'text-white' : 'text-gray-500'
//             }`} />
//             <span className="text-sm truncate">{item.name}</span>
//           </button>
          
//           {hasChildren && isExpanded && (
//             <div className="mt-0.5">
//               <FolderTreeComponent
//                 items={item.children}
//                 level={level + 1}
//                 parentPath={itemPath}
//                 expandedFolders={expandedFolders}
//                 toggleFolder={toggleFolder}
//                 selectFolder={selectFolder}
//                 selectedFolder={selectedFolder}
//                 searchQuery={searchQuery}
//               />
//             </div>
//           )}
//         </div>
//       );
//     });
// };

// export default Sidebar;



// import React, { useState, useEffect, useRef } from 'react';
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   PlusIcon,
//   ChartBarIcon,
//   DocumentTextIcon,
//   MagnifyingGlassCircleIcon,
//   PencilSquareIcon,
//   ScaleIcon,
//   BookOpenIcon,
//   ClockIcon,
//   UserGroupIcon,
//   Cog6ToothIcon,
//   Bars3Icon,
//   XMarkIcon,
//   CreditCardIcon,
//   BellIcon,
//   QuestionMarkCircleIcon,
// } from '@heroicons/react/24/outline';
// import {
//   FolderPlus,
//   FileUp,
//   Home,
//   Folder,
//   Upload,
//   ChevronDown,
//   ChevronRight,
//   MessageSquare,
//   LogOut,
//   User,
//   Settings
// } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UserProfileMenu from './UserProfileMenu';
// import QuickTools from './QuickTools';
// import { useFileManager } from '../context/FileManagerContext';
// import { useAuth } from '../context/AuthContext';
// import { useSidebar } from '../context/SidebarContext';

// const Sidebar = () => {
//   const { isSidebarHidden, setIsSidebarHidden, isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [currentFileId, setCurrentFileId] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { createFolder } = useFileManager();

//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [creatingFolder, setCreatingFolder] = useState(false);

//   const handleFileChange = (e) => {
//     console.log("File(s) selected:", e.target.files);
//   };

//   const handleFolderChange = (e) => {
//     console.log("Folder(s) selected:", e.target.files);
//   };

//   const { user } = useAuth();

//   useEffect(() => {
//     const loadUserData = () => {
//       try {
//         const storedUserData = localStorage.getItem('user');
//         if (storedUserData) {
//           const parsedUserData = JSON.parse(storedUserData);
//           setUserData(parsedUserData);
//         }
//       } catch (error) {
//         console.error('Error parsing user data from localStorage:', error);
//       }
//     };

//     loadUserData();

//     const handleStorageChange = (e) => {
//       if (e.key === 'user') {
//         loadUserData();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const getDisplayName = (userInfo) => {
//     if (userData?.username) {
//       return userData.username;
//     }
    
//     if (userInfo?.username) {
//       return userInfo.username;
//     }
    
//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//     }
    
//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//     }
    
//     return 'User';
//   };

//   const getInitials = (userInfo) => {
//     if (userData?.username) {
//       const username = userData.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter(part => part.length > 0);
//         if (parts.length >= 2) {
//           return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//         }
//         return username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }
    
//     if (userInfo?.username) {
//       const username = userInfo.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter(part => part.length > 0);
//         if (parts.length >= 2) {
//           return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//         }
//         return username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }
    
//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else {
//         return emailPart.charAt(0).toUpperCase();
//       }
//     }
    
//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else {
//         return emailPart.charAt(0).toUpperCase();
//       }
//     }
    
//     return 'U';
//   };

//   const displayName = getDisplayName(user);
//   const userInitials = getInitials(user);

//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth < 1024);
//       if (window.innerWidth < 1024) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     checkDevice();
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);
 
//   useEffect(() => {
//     const loadCurrentFileId = () => {
//       const fileId = localStorage.getItem('currentFileId');
//       setCurrentFileId(fileId);
//     };

//     loadCurrentFileId();

//     const handleStorageChange = (e) => {
//       if (e.key === 'currentFileId') {
//         setCurrentFileId(e.newValue);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
    
//     const handleCurrentFileChange = (e) => {
//       setCurrentFileId(e.detail.fileId);
//     };

//     window.addEventListener('currentFileIdChanged', handleCurrentFileChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('currentFileIdChanged', handleCurrentFileChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setIsMobileMenuOpen(!isMobileMenuOpen);
//     } else {
//       setIsSidebarCollapsed(prev => !prev);
//     }
//   };

//   const toggleProfileMenu = () => {
//     setIsProfileMenuOpen(prev => !prev);
//   };

//   const isActive = (path) => {
//     return location.pathname === path || location.pathname.startsWith(path + '/');
//   };

//   const handleChatNavigation = () => {
//     if (currentFileId) {
//       navigate(`/chats/${currentFileId}`);
//     } else {
//       navigate('/chats');
//     }
//   };

//   const navigationItems = [
//     { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
//     {
//       name: 'Projects',
//       path: '/documents',
//       icon: DocumentTextIcon,
//     },
//     { name: 'ICOM', path: '/analysis', icon: MagnifyingGlassCircleIcon },
//     { name: 'Chats', path: '/chats', icon: MessageSquare, isSpecial: true },
//     // { name: 'Document Drafting', path: '/drafting', icon: PencilSquareIcon },
//      { name: 'Document Drafting', icon: PencilSquareIcon },
//     { name: 'Billing & Usage', path: '/billing-usage', icon: CreditCardIcon },
//   ];

//   // JuriNex Logo Component
//   const JuriNexLogo = ({ collapsed = false }) => (
//     <div className="flex items-center space-x-2">
//       <div className="bg-[#21C1B6] p-2 rounded-lg shadow-lg">
//         <ScaleIcon className="h-6 w-6 text-white" />
//       </div>
//       {!collapsed && (
//         <div className="flex items-baseline">
//           <span className="text-xl font-bold text-[#21C1B6]">Juri</span>
//           <span className="text-xl font-bold text-white">Nex</span>
//         </div>
//       )}
//     </div>
//   );

//   const MobileHeader = () => (
//     <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0d1117] border-b border-gray-900 px-4 py-3 flex items-center justify-between">
//       <JuriNexLogo />
//       <button
//         onClick={() => setIsMobileMenuOpen(true)}
//         className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
//       >
//         <Bars3Icon className="h-6 w-6 text-gray-400" />
//       </button>
//     </div>
//   );

//   const SidebarContent = ({ isMobileView = false, toggleProfileMenu, isProfileMenuOpen }) => (
//     <div className="flex flex-col h-full bg-[#0d1117]">
//       {/* Header */}
//       <div className={`px-6 py-5 border-b border-gray-900 relative ${isMobileView ? '' : 'hidden lg:block'}`}>
//         {!isMobileView && (
//           <button
//             onClick={toggleSidebar}
//             className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#0d1117] border border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-900 transition-all duration-200 z-10"
//           >
//             {isSidebarCollapsed ? (
//               <ChevronRightIcon className="h-4 w-4 text-gray-500" />
//             ) : (
//               <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
//             )}
//           </button>
//         )}

//         {isMobileView && (
//           <div className="flex items-center justify-between">
//             <JuriNexLogo />
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
//             >
//               <XMarkIcon className="h-6 w-6 text-gray-400" />
//             </button>
//           </div>
//         )}
        
//         <div className={`transition-all duration-300 ${isSidebarCollapsed && !isMobileView ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
//           {(!isSidebarCollapsed || isMobileView) && !isMobileView && (
//             <JuriNexLogo />
//           )}
//         </div>
        
//         {isSidebarCollapsed && !isMobileView && (
//           <div className="flex justify-center">
//             <div className="bg-[#21C1B6] p-2 rounded-lg shadow-lg">
//               <ScaleIcon className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* New Case Button */}
//       <div className="px-4 pt-6 pb-4">
//         <button
//           onClick={() => navigate('/analysis', { state: { newChat: true } })}
//           className="w-full text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//           style={{ backgroundColor: '#21C1B6' }}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//         >
//           <PlusIcon className="h-5 w-5" />
//           <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline ml-2'}`}>
//             New Case Analysis
//           </span>
//         </button>
//       </div>

//       {/* Navigation */}
//       <div className="flex-1 overflow-y-auto px-3 pb-4">
//         <div className="mb-6">
//           <nav className="space-y-1">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const active = isActive(item.path);
//               const isChats = item.name === 'Chats';

//               return (
//                 <div key={item.name}>
//                   {isChats ? (
//                     <Link
//                       to={currentFileId ? `/chats/${currentFileId}` : '/chats'}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
//                         active
//                           ? 'bg-[#1c2128] text-white font-bold'
//                           : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>
//                         {item.name}
//                       </span>
//                       {!currentFileId && (!isSidebarCollapsed || isMobileView) && (
//                         <div className="ml-auto">
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-900 text-gray-500">
//                             No file
//                           </span>
//                         </div>
//                       )}
//                     </Link>
//                   ) : (
//                     <Link
//                       to={item.path}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
//                         active
//                           ? 'bg-[#1c2128] text-white font-bold'
//                           : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>
//                         {item.name}
//                       </span>
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>
//         </div>

//         {/* Quick Tools */}
//         {/* <QuickTools isCollapsed={isSidebarCollapsed && !isMobileView} /> */}
//       </div>

//       {/* Bottom Section - Notifications, Help, Settings */}
//       {/* <div className="px-3 pb-4 border-t border-gray-900 pt-4">
//         {(!isSidebarCollapsed || isMobileView) && (
//           <div className="space-y-1">
//             <button className="w-full flex items-center px-4 py-2.5 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <BellIcon className="h-5 w-5 mr-3 text-gray-500" />
//               <span className="text-sm font-medium">Notifications</span>
//               <span className="ml-auto text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: '#21C1B6' }}>3</span>
//             </button>
//             <button className="w-full flex items-center px-4 py-2.5 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <QuestionMarkCircleIcon className="h-5 w-5 mr-3 text-gray-500" />
//               <span className="text-sm font-medium">Help</span>
//             </button>
//             <button className="w-full flex items-center px-4 py-2.5 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <Cog6ToothIcon className="h-5 w-5 mr-3 text-gray-500" />
//               <span className="text-sm font-medium">Settings</span>
//             </button>
//           </div>
//         )}
        
//         {isSidebarCollapsed && !isMobileView && (
//           <div className="flex flex-col space-y-1">
//             <button className="w-full flex justify-center p-3 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <BellIcon className="h-5 w-5 text-gray-500" />
//             </button>
//             <button className="w-full flex justify-center p-3 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <QuestionMarkCircleIcon className="h-5 w-5 text-gray-500" />
//             </button>
//             <button className="w-full flex justify-center p-3 text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 rounded-xl transition-all duration-200">
//               <Cog6ToothIcon className="h-5 w-5 text-gray-500" />
//             </button>
//           </div>
//         )}
//       </div> */}

//       {/* User Profile Menu Trigger at the bottom */}
//       <div className="px-3 pb-4 border-t border-gray-900 pt-4 bg-[#0d1117] relative">
//         <button
//           onClick={toggleProfileMenu}
//           className={`w-full flex items-center space-x-3 text-gray-400 hover:bg-[#1c2128]/60 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 ${
//             isSidebarCollapsed && !isMobileView ? 'justify-center px-2' : 'justify-between'
//           }`}
//         >
//           <div className="flex items-center space-x-3 min-w-0 flex-1">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg" style={{ backgroundColor: '#21C1B6' }}>
//               {userInitials}
//             </div>
//             {(!isSidebarCollapsed || isMobileView) && (
//               <div className="text-left min-w-0 flex-1">
//                 <div className="text-sm font-semibold text-gray-200 truncate">{displayName}</div>
//                 {userData?.email && (
//                   <div className="text-xs text-gray-500 truncate">{userData.email}</div>
//                 )}
//               </div>
//             )}
//           </div>
//           {(!isSidebarCollapsed || isMobileView) && (
//             <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
//           )}
//         </button>
//         {isProfileMenuOpen && (
//           <div className={`absolute bottom-full ${isSidebarCollapsed && !isMobileView ? 'left-1/2 transform -translate-x-1/2 w-64' : 'left-0 w-full'} mb-2 bg-[#161b22] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden`}>
//             <UserProfileMenu userData={userData} />
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {/* Mobile Header */}
//       <MobileHeader />

//       {/* Desktop Sidebar */}
//       <div
//         className={`hidden lg:flex bg-[#0d1117] border-r border-gray-900 flex-col transition-all duration-300 ease-in-out shadow-2xl ${
//           isSidebarCollapsed ? 'w-20' : 'w-72'
//         } relative h-screen`}
//       >
//         <SidebarContent toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//       </div>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 flex">
//           {/* Backdrop */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 backdrop-blur-sm"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
          
//           {/* Sidebar Drawer */}
//           <div className="relative flex flex-col w-80 max-w-xs bg-[#0d1117] shadow-2xl transform transition-transform duration-300 ease-in-out">
//             <SidebarContent isMobileView={true} toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//           </div>
//         </div>
//       )}

//       {/* Hidden file inputs */}
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
//       />
//       <input
//         ref={folderInputRef}
//         type="file"
//         multiple
//         onChange={handleFolderChange}
//         className="hidden"
//         webkitdirectory=""
//         directory=""
//       />
//     </>
//   );
// };

// const FolderTreeComponent = ({ items, level = 0, parentPath = '', expandedFolders, toggleFolder, selectFolder, selectedFolder, searchQuery = '' }) => {
//   return items
//     .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     .map((item, index) => {
//       const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//       const isExpanded = expandedFolders.has(itemPath);
//       const hasChildren = item.children && item.children.length > 0;
//       const isSelected = selectedFolder?.id === item.id;
      
//       return (
//         <div key={`${itemPath}-${index}`} className="select-none">
//           <button
//             onClick={() => selectFolder(item)}
//             className={`group flex items-center w-full py-2 px-3 mx-1 rounded-lg cursor-pointer hover:bg-[#1c2128]/60 transition-colors ${
//               isSelected ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 font-medium'
//             }`}
//             style={{ paddingLeft: `${(level * 16) + 12}px` }}
//           >
//             {hasChildren && (
//               <span
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFolder(itemPath);
//                 }}
//                 className="mr-2 p-0.5 rounded hover:bg-gray-800 transition-colors"
//               >
//                 {isExpanded ? (
//                   <ChevronDown className="w-4 h-4 text-gray-500" />
//                 ) : (
//                   <ChevronRight className="w-4 h-4 text-gray-500" />
//                 )}
//               </span>
//             )}
//             {!hasChildren && <span className="w-4 h-4 mr-2" />}
//             <Folder className={`h-4 w-4 mr-2 flex-shrink-0 ${
//               isSelected ? 'text-white' : 'text-gray-500'
//             }`} />
//             <span className="text-sm truncate">{item.name}</span>
//           </button>
          
//           {hasChildren && isExpanded && (
//             <div className="mt-0.5">
//               <FolderTreeComponent
//                 items={item.children}
//                 level={level + 1}
//                 parentPath={itemPath}
//                 expandedFolders={expandedFolders}
//                 toggleFolder={toggleFolder}
//                 selectFolder={selectFolder}
//                 selectedFolder={selectedFolder}
//                 searchQuery={searchQuery}
//               />
//             </div>
//           )}
//         </div>
//       );
//     });
// };

// export default Sidebar;

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   PlusIcon,
//   ChartBarIcon,
//   DocumentTextIcon,
//   MagnifyingGlassCircleIcon,
//   PencilSquareIcon,
//   ScaleIcon,
//   BookOpenIcon,
//   ClockIcon,
//   UserGroupIcon,
//   Cog6ToothIcon,
//   Bars3Icon,
//   XMarkIcon,
//   CreditCardIcon,
//   BellIcon,
//   QuestionMarkCircleIcon,
// } from '@heroicons/react/24/outline';
// import {
//   FolderPlus,
//   FileUp,
//   Home,
//   Folder,
//   Upload,
//   ChevronDown,
//   ChevronRight,
//   MessageSquare,
//   LogOut,
//   User,
//   Settings,
// } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UserProfileMenu from './UserProfileMenu';
// import QuickTools from './QuickTools';
// import { useFileManager } from '../context/FileManagerContext';
// import { useAuth } from '../context/AuthContext';
// import { useSidebar } from '../context/SidebarContext';
// import { createPortal } from 'react-dom';

// const Sidebar = () => {
//   const { isSidebarHidden, setIsSidebarHidden, isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [currentFileId, setCurrentFileId] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [profileMenuPosition, setProfileMenuPosition] = useState({ top: 0, left: 0 });

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { createFolder } = useFileManager();

//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const profileButtonRef = useRef(null);

//   const handleFileChange = (e) => {
//     console.log('File(s) selected:', e.target.files);
//   };

//   const handleFolderChange = (e) => {
//     console.log('Folder(s) selected:', e.target.files);
//   };

//   const { user } = useAuth();

//   useEffect(() => {
//     const loadUserData = () => {
//       try {
//         const storedUserData = localStorage.getItem('user');
//         if (storedUserData) {
//           const parsedUserData = JSON.parse(storedUserData);
//           setUserData(parsedUserData);
//         }
//       } catch (error) {
//         console.error('Error parsing user data from localStorage:', error);
//       }
//     };

//     loadUserData();

//     const handleStorageChange = (e) => {
//       if (e.key === 'user') {
//         loadUserData();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const getDisplayName = (userInfo) => {
//     if (userData?.username) {
//       return userData.username;
//     }

//     if (userInfo?.username) {
//       return userInfo.username;
//     }

//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
//     }

//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
//     }

//     return 'User';
//   };

//   const getInitials = (userInfo) => {
//     if (userData?.username) {
//       const username = userData.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter((part) => part.length > 0);
//         if (parts.length >= 2) {
//           return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//         }
//         return username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }

//     if (userInfo?.username) {
//       const username = userInfo.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter((part) => part.length > 0);
//         if (parts.length >= 2) {
//           return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//         }
//         return username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }

//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else {
//         return emailPart.charAt(0).toUpperCase();
//       }
//     }

//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase();
//       } else {
//         return emailPart.charAt(0).toUpperCase();
//       }
//     }

//     return 'U';
//   };

//   const displayName = getDisplayName(user);
//   const userInitials = getInitials(user);

//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth < 1024);
//       if (window.innerWidth < 1024) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     checkDevice();
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const loadCurrentFileId = () => {
//       const fileId = localStorage.getItem('currentFileId');
//       setCurrentFileId(fileId);
//     };

//     loadCurrentFileId();

//     const handleStorageChange = (e) => {
//       if (e.key === 'currentFileId') {
//         setCurrentFileId(e.newValue);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     const handleCurrentFileChange = (e) => {
//       setCurrentFileId(e.detail.fileId);
//     };

//     window.addEventListener('currentFileIdChanged', handleCurrentFileChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('currentFileIdChanged', handleCurrentFileChange);
//     };
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileButtonRef.current && !profileButtonRef.current.contains(event.target) && isProfileMenuOpen) {
//         setIsProfileMenuOpen(false);
//       }
//     };
//     if (isProfileMenuOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [isProfileMenuOpen]);

//   const toggleSidebar = () => {
//     if (isMobile) {
//       setIsMobileMenuOpen(!isMobileMenuOpen);
//     } else {
//       setIsSidebarCollapsed((prev) => !prev);
//     }
//   };

//   const toggleProfileMenu = () => {
//     if (!isProfileMenuOpen && isSidebarCollapsed && !isMobile) {
//       calculatePopupPosition();
//     }
//     setIsProfileMenuOpen(!isProfileMenuOpen);
//   };

//   const isActive = (path) => {
//     return location.pathname === path || location.pathname.startsWith(path + '/');
//   };

//   const handleChatNavigation = () => {
//     if (currentFileId) {
//       navigate(`/chats/${currentFileId}`);
//     } else {
//       navigate('/chats');
//     }
//   };

//   const navigationItems = [
//     { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
//     { name: 'Projects', path: '/documents', icon: DocumentTextIcon },
//     { name: 'ICOM', path: '/analysis', icon: MagnifyingGlassCircleIcon },
//     { name: 'Chats', path: '/chats', icon: MessageSquare, isSpecial: true },
//     { name: 'Document Drafting', icon: PencilSquareIcon },
//     { name: 'Billing & Usage', path: '/billing-usage', icon: CreditCardIcon },
//   ];

//   const JuriNexLogo = ({ collapsed = false }) => (
//     <div className="flex items-center space-x-2">
//       <div className="bg-[#21C1B6] p-2 rounded-lg shadow-lg">
//         <ScaleIcon className="h-6 w-6 text-white" />
//       </div>
//       {!collapsed && (
//         <div className="flex items-baseline">
//           <span className="text-xl font-bold text-[#21C1B6]">Juri</span>
//           <span className="text-xl font-bold text-white">Nex</span>
//         </div>
//       )}
//     </div>
//   );

//   const MobileHeader = () => (
//     <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0d1117] border-b border-gray-900 px-4 py-3 flex items-center justify-between">
//       <JuriNexLogo />
//       <button
//         onClick={() => setIsMobileMenuOpen(true)}
//         className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
//       >
//         <Bars3Icon className="h-6 w-6 text-gray-400" />
//       </button>
//     </div>
//   );

//   const SidebarContent = ({ isMobileView = false, toggleProfileMenu, isProfileMenuOpen }) => (
//     <div className="flex flex-col h-full bg-[#0d1117]">
//       <div className={`px-6 py-5 border-b border-gray-900 relative ${isMobileView ? '' : 'hidden lg:block'}`}>
//         {!isMobileView && (
//           <button
//             onClick={toggleSidebar}
//             className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#0d1117] border border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-900 transition-all duration-200 z-10"
//           >
//             {isSidebarCollapsed ? (
//               <ChevronRightIcon className="h-4 w-4 text-gray-500" />
//             ) : (
//               <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
//             )}
//           </button>
//         )}

//         {isMobileView && (
//           <div className="flex items-center justify-between">
//             <JuriNexLogo />
//             <button
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200"
//             >
//               <XMarkIcon className="h-6 w-6 text-gray-400" />
//             </button>
//           </div>
//         )}

//         <div className={`transition-all duration-300 ${isSidebarCollapsed && !isMobileView ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
//           {(!isSidebarCollapsed || isMobileView) && !isMobileView && <JuriNexLogo />}
//         </div>

//         {isSidebarCollapsed && !isMobileView && (
//           <div className="flex justify-center">
//             <div className="bg-[#21C1B6] p-2 rounded-lg shadow-lg">
//               <ScaleIcon className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="px-4 pt-6 pb-4">
//         <button
//           onClick={() => navigate('/analysis', { state: { newChat: true } })}
//           className="w-full text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//           style={{ backgroundColor: '#21C1B6' }}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//         >
//           <PlusIcon className="h-5 w-5" />
//           <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline ml-2'}`}>New Case Analysis</span>
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto px-3 pb-4">
//         <div className="mb-6">
//           <nav className="space-y-1">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const active = isActive(item.path);
//               const isChats = item.name === 'Chats';

//               return (
//                 <div key={item.name}>
//                   {isChats ? (
//                     <Link
//                       to={currentFileId ? `/chats/${currentFileId}` : '/chats'}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
//                         active ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>{item.name}</span>
//                       {!currentFileId && (!isSidebarCollapsed || isMobileView) && (
//                         <div className="ml-auto">
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-900 text-gray-500">No file</span>
//                         </div>
//                       )}
//                     </Link>
//                   ) : (
//                     <Link
//                       to={item.path}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
//                         active ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>{item.name}</span>
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       <div className="px-3 pb-4 border-t border-gray-900 pt-4 bg-[#0d1117] relative">
//         <button
//           ref={profileButtonRef}
//           onClick={toggleProfileMenu}
//           className={`w-full flex items-center space-x-3 text-gray-400 hover:bg-[#1c2128]/60 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 ${
//             isSidebarCollapsed && !isMobileView ? 'justify-center px-2' : 'justify-between'
//           }`}
//         >
//           <div className="flex items-center space-x-3 min-w-0 flex-1">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg" style={{ backgroundColor: '#21C1B6' }}>
//               {userInitials}
//             </div>
//             {(!isSidebarCollapsed || isMobileView) && (
//               <div className="text-left min-w-0 flex-1">
//                 <div className="text-sm font-semibold text-gray-200 truncate">{displayName}</div>
//                 {userData?.email && <div className="text-xs text-gray-500 truncate">{userData.email}</div>}
//               </div>
//             )}
//           </div>
//           {(!isSidebarCollapsed || isMobileView) && <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />}
//         </button>
//         {isProfileMenuOpen && !isSidebarCollapsed && (
//           <div className={`absolute bottom-full ${isSidebarCollapsed && !isMobileView ? 'left-0 w-64 ml-[-50%]' : 'left-0 w-full'} mb-2 bg-[#161b22] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden max-w-xs`}
//             style={{ transform: isSidebarCollapsed && !isMobileView ? 'translateX(-50%)' : 'none' }}>
//             <UserProfileMenu userData={userData} />
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const calculatePopupPosition = () => {
//     if (profileButtonRef.current) {
//       const rect = profileButtonRef.current.getBoundingClientRect();
//       const isCollapsed = isSidebarCollapsed && !isMobile;

//       if (isCollapsed) {
//         setProfileMenuPosition({
//           top: Math.max(10, window.innerHeight - 350),
//           left: rect.right + 8,
//         });
//       }
//     }
//   };

//   const ProfileMenuPopup = () => {
//     if (!isProfileMenuOpen || !isSidebarCollapsed || isMobile) return null;

//     return createPortal(
//       <div
//         className="bg-[#161b22] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden max-w-xs"
//         style={{
//           position: 'fixed',
//           top: `${profileMenuPosition.top}px`,
//           left: `${profileMenuPosition.left}px`,
//           width: '256px',
//         }}
//         onClick={(e) => e.stopPropagation()} // Prevent click from closing the menu
//       >
//         <UserProfileMenu userData={userData} />
//       </div>,
//       document.body
//     );
//   };

//   useEffect(() => {
//     if (isProfileMenuOpen && isSidebarCollapsed && !isMobile) {
//       calculatePopupPosition();
//     }
//   }, [isSidebarCollapsed, isProfileMenuOpen, isMobile]);

//   return (
//     <>
//       <MobileHeader />

//       <div
//         className={`hidden lg:flex bg-[#0d1117] border-r border-gray-900 flex-col transition-all duration-300 ease-in-out shadow-2xl ${
//           isSidebarCollapsed ? 'w-20' : 'w-72'
//         } relative h-screen`}
//       >
//         <SidebarContent toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//       </div>

//       {isMobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 flex">
//           <div
//             className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 backdrop-blur-sm"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//           <div className="relative flex flex-col w-80 max-w-xs bg-[#0d1117] shadow-2xl transform transition-transform duration-300 ease-in-out">
//             <SidebarContent isMobileView={true} toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//           </div>
//         </div>
//       )}

//       <ProfileMenuPopup />
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
//       />
//       <input
//         ref={folderInputRef}
//         type="file"
//         multiple
//         onChange={handleFolderChange}
//         className="hidden"
//         webkitdirectory=""
//         directory=""
//       />
//     </>
//   );
// };

// const FolderTreeComponent = ({ items, level = 0, parentPath = '', expandedFolders, toggleFolder, selectFolder, selectedFolder, searchQuery = '' }) => {
//   return items
//     .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     .map((item, index) => {
//       const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//       const isExpanded = expandedFolders.has(itemPath);
//       const hasChildren = item.children && item.children.length > 0;
//       const isSelected = selectedFolder?.id === item.id;

//       return (
//         <div key={`${itemPath}-${index}`} className="select-none">
//           <button
//             onClick={() => selectFolder(item)}
//             className={`group flex items-center w-full py-2 px-3 mx-1 rounded-lg cursor-pointer hover:bg-[#1c2128]/60 transition-colors ${
//               isSelected ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 font-medium'
//             }`}
//             style={{ paddingLeft: `${(level * 16) + 12}px` }}
//           >
//             {hasChildren && (
//               <span
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFolder(itemPath);
//                 }}
//                 className="mr-2 p-0.5 rounded hover:bg-gray-800 transition-colors"
//               >
//                 {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
//               </span>
//             )}
//             {!hasChildren && <span className="w-4 h-4 mr-2" />}
//             <Folder
//               className={`h-4 w-4 mr-2 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-500'}`}
//             />
//             <span className="text-sm truncate">{item.name}</span>
//           </button>

//           {hasChildren && isExpanded && (
//             <div className="mt-0.5">
//               <FolderTreeComponent
//                 items={item.children}
//                 level={level + 1}
//                 parentPath={itemPath}
//                 expandedFolders={expandedFolders}
//                 toggleFolder={toggleFolder}
//                 selectFolder={selectFolder}
//                 selectedFolder={selectedFolder}
//                 searchQuery={searchQuery}
//               />
//             </div>
//           )}
//         </div>
//       );
//     });
// };

// export default Sidebar;



// import React, { useState, useEffect, useRef } from 'react';
// import {
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   PlusIcon,
//   ChartBarIcon,
//   DocumentTextIcon,
//   MagnifyingGlassCircleIcon,
//   PencilSquareIcon,
//   ScaleIcon,
//   BookOpenIcon,
//   ClockIcon,
//   UserGroupIcon,
//   Cog6ToothIcon,
//   Bars3Icon,
//   XMarkIcon,
//   CreditCardIcon,
//   BellIcon,
//   QuestionMarkCircleIcon,
// } from '@heroicons/react/24/outline';
// import {
//   FolderPlus,
//   FileUp,
//   Home,
//   Folder,
//   Upload,
//   ChevronDown,
//   ChevronRight,
//   MessageSquare,
//   LogOut,
//   User,
//   Settings,
// } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import UserProfileMenu from './UserProfileMenu';
// import QuickTools from './QuickTools';
// import { useFileManager } from '../context/FileManagerContext';
// import { useAuth } from '../context/AuthContext';
// import { useSidebar } from '../context/SidebarContext';
// import { createPortal } from 'react-dom';

// const Sidebar = () => {
//   const { isSidebarHidden, setIsSidebarHidden, isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
//   const [currentFileId, setCurrentFileId] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
//   const [userData, setUserData] = useState(null);
//   const [profileMenuPosition, setProfileMenuPosition] = useState({ top: 0, left: 0 });

//   const location = useLocation();
//   const navigate = useNavigate();

//   const { createFolder } = useFileManager();

//   const fileInputRef = useRef(null);
//   const folderInputRef = useRef(null);
//   const [showNewFolderInput, setShowNewFolderInput] = useState(false);
//   const [newFolderName, setNewFolderName] = useState('');
//   const [creatingFolder, setCreatingFolder] = useState(false);
//   const profileButtonRef = useRef(null);
//   const profileMenuRef = useRef(null); // New ref for the menu itself

//   const handleFileChange = (e) => {
//     console.log('File(s) selected:', e.target.files);
//   };

//   const handleFolderChange = (e) => {
//     console.log('Folder(s) selected:', e.target.files);
//   };

//   const { user } = useAuth();

//   useEffect(() => {
//     const loadUserData = () => {
//       try {
//         const storedUserData = localStorage.getItem('user');
//         if (storedUserData) {
//           const parsedUserData = JSON.parse(storedUserData);
//           setUserData(parsedUserData);
//         }
//       } catch (error) {
//         console.error('Error parsing user data from localStorage:', error);
//       }
//     };

//     loadUserData();

//     const handleStorageChange = (e) => {
//       if (e.key === 'user') {
//         loadUserData();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//     };
//   }, []);

//   const getDisplayName = (userInfo) => {
//     if (userData?.username) return userData.username;
//     if (userInfo?.username) return userInfo.username;
//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
//     }
//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
//     }
//     return 'User';
//   };

//   const getInitials = (userInfo) => {
//     if (userData?.username) {
//       const username = userData.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter((part) => part.length > 0);
//         return parts.length >= 2 ? parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase() : username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }
//     if (userInfo?.username) {
//       const username = userInfo.username.trim();
//       if (username.includes(' ')) {
//         const parts = username.split(' ').filter((part) => part.length > 0);
//         return parts.length >= 2 ? parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase() : username.charAt(0).toUpperCase();
//       }
//       return username.charAt(0).toUpperCase();
//     }
//     if (userData?.email) {
//       const emailPart = userData.email.split('@')[0];
//       if (emailPart.includes('.')) return emailPart.split('.')[0].charAt(0).toUpperCase() + emailPart.split('.')[emailPart.split('.').length - 1].charAt(0).toUpperCase();
//       if (emailPart.includes('_')) return emailPart.split('_')[0].charAt(0).toUpperCase() + emailPart.split('_')[emailPart.split('_').length - 1].charAt(0).toUpperCase();
//       return emailPart.charAt(0).toUpperCase();
//     }
//     if (userInfo?.email) {
//       const emailPart = userInfo.email.split('@')[0];
//       if (emailPart.includes('.')) return emailPart.split('.')[0].charAt(0).toUpperCase() + emailPart.split('.')[emailPart.split('.').length - 1].charAt(0).toUpperCase();
//       if (emailPart.includes('_')) return emailPart.split('_')[0].charAt(0).toUpperCase() + emailPart.split('_')[emailPart.split('_').length - 1].charAt(0).toUpperCase();
//       return emailPart.charAt(0).toUpperCase();
//     }
//     return 'U';
//   };

//   const displayName = getDisplayName(user);
//   const userInitials = getInitials(user);

//   useEffect(() => {
//     const checkDevice = () => {
//       setIsMobile(window.innerWidth < 1024);
//       if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
//     };
//     checkDevice();
//     window.addEventListener('resize', checkDevice);
//     return () => window.removeEventListener('resize', checkDevice);
//   }, []);

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     const loadCurrentFileId = () => {
//       const fileId = localStorage.getItem('currentFileId');
//       setCurrentFileId(fileId);
//     };
//     loadCurrentFileId();
//     window.addEventListener('storage', (e) => e.key === 'currentFileId' && setCurrentFileId(e.newValue));
//     window.addEventListener('currentFileIdChanged', (e) => setCurrentFileId(e.detail.fileId));
//     return () => {
//       window.removeEventListener('storage', () => {});
//       window.removeEventListener('currentFileIdChanged', () => {});
//     };
//   }, []);

//   useEffect(() => {
//     if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
//     else document.body.style.overflow = 'unset';
//     return () => (document.body.style.overflow = 'unset');
//   }, [isMobileMenuOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileButtonRef.current && !profileButtonRef.current.contains(event.target) && profileMenuRef.current && !profileMenuRef.current.contains(event.target) && isProfileMenuOpen) {
//         setIsProfileMenuOpen(false);
//       }
//     };
//     if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isProfileMenuOpen]);

//   const toggleSidebar = () => {
//     if (isMobile) setIsMobileMenuOpen(!isMobileMenuOpen);
//     else setIsSidebarCollapsed((prev) => !prev);
//   };

//   const toggleProfileMenu = () => {
//     if (!isProfileMenuOpen && isSidebarCollapsed && !isMobile) calculatePopupPosition();
//     setIsProfileMenuOpen(!isProfileMenuOpen);
//   };

//   const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

//   const handleChatNavigation = () => {
//     if (currentFileId) navigate(`/chats/${currentFileId}`);
//     else navigate('/chats');
//   };

//   const navigationItems = [
//     { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
//     { name: 'Projects', path: '/documents', icon: DocumentTextIcon },
//     { name: 'ICOM', path: '/analysis', icon: MagnifyingGlassCircleIcon },
//     { name: 'Chats', path: '/chats', icon: MessageSquare, isSpecial: true },
//     { name: 'Document Drafting', icon: PencilSquareIcon },
//     { name: 'Billing & Usage', path: '/billing-usage', icon: CreditCardIcon },
//   ];

//   const JuriNexLogo = ({ collapsed = false }) => (
//     <div className="flex items-center space-x-2">
//       <div className="bg-[#21C1B6] p-2 rounded-lg shadow-lg">
//         <ScaleIcon className="h-6 w-6 text-white" />
//       </div>
//       {!collapsed && (
//         <div className="flex items-baseline">
//           <span className="text-xl font-bold text-[#21C1B6]">Juri</span>
//           <span className="text-xl font-bold text-white">Nex</span>
//         </div>
//       )}
//     </div>
//   );

//   const MobileHeader = () => (
//     <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0d1117] border-b border-gray-900 px-4 py-3 flex items-center justify-between">
//       <JuriNexLogo />
//       <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200">
//         <Bars3Icon className="h-6 w-6 text-gray-400" />
//       </button>
//     </div>
//   );

//   const SidebarContent = ({ isMobileView = false, toggleProfileMenu, isProfileMenuOpen }) => (
//     <div className="flex flex-col h-full bg-[#0d1117]">
//       <div className={`px-6 py-5 border-b border-gray-900 relative ${isMobileView ? '' : 'hidden lg:block'}`}>
//         {!isMobileView && (
//           <button
//             onClick={toggleSidebar}
//             className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#0d1117] border border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-900 transition-all duration-200 z-10"
//           >
//             {isSidebarCollapsed ? <ChevronRightIcon className="h-4 w-4 text-gray-500" /> : <ChevronLeftIcon className="h-4 w-4 text-gray-500" />}
//           </button>
//         )}
//         {isMobileView && (
//           <div className="flex items-center justify-between">
//             <JuriNexLogo />
//             <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200">
//               <XMarkIcon className="h-6 w-6 text-gray-400" />
//             </button>
//           </div>
//         )}
//         <div className={`transition-all duration-300 ${isSidebarCollapsed && !isMobileView ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
//           {(!isSidebarCollapsed || isMobileView) && !isMobileView && <JuriNexLogo />}
//         </div>
//         {isSidebarCollapsed && !isMobileView && (
//           <div className="flex justify-center">
//             <div className="bg-[#21C1B6] p-2 rounded-lg shadow-lg">
//               <ScaleIcon className="h-6 w-6 text-white" />
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="px-4 pt-6 pb-4">
//         <button
//           onClick={() => navigate('/analysis', { state: { newChat: true } })}
//           className="w-full text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//           style={{ backgroundColor: '#21C1B6' }}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//         >
//           <PlusIcon className="h-5 w-5" />
//           <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline ml-2'}`}>New Case Analysis</span>
//         </button>
//       </div>

//       <div className="flex-1 overflow-y-auto px-3 pb-4">
//         <div className="mb-6">
//           <nav className="space-y-1">
//             {navigationItems.map((item) => {
//               const Icon = item.icon;
//               const active = isActive(item.path);
//               const isChats = item.name === 'Chats';
//               return (
//                 <div key={item.name}>
//                   {isChats ? (
//                     <Link
//                       to={currentFileId ? `/chats/${currentFileId}` : '/chats'}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
//                         active ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>{item.name}</span>
//                       {!currentFileId && (!isSidebarCollapsed || isMobileView) && (
//                         <div className="ml-auto">
//                           <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-gray-900 text-gray-500">No file</span>
//                         </div>
//                       )}
//                     </Link>
//                   ) : (
//                     <Link
//                       to={item.path}
//                       className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
//                         active ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
//                       }`}
//                       title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
//                     >
//                       <Icon
//                         className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
//                           active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
//                         }`}
//                       />
//                       <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>{item.name}</span>
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>
//         </div>
//       </div>

//       <div className="px-3 pb-4 border-t border-gray-900 pt-4 bg-[#0d1117] relative">
//         <button
//           ref={profileButtonRef}
//           onClick={toggleProfileMenu}
//           className={`w-full flex items-center space-x-3 text-gray-400 hover:bg-[#1c2128]/60 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 ${
//             isSidebarCollapsed && !isMobileView ? 'justify-center px-2' : 'justify-between'
//           }`}
//         >
//           <div className="flex items-center space-x-3 min-w-0 flex-1">
//             <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg" style={{ backgroundColor: '#21C1B6' }}>
//               {userInitials}
//             </div>
//             {(!isSidebarCollapsed || isMobileView) && (
//               <div className="text-left min-w-0 flex-1">
//                 <div className="text-sm font-semibold text-gray-200 truncate">{displayName}</div>
//                 {userData?.email && <div className="text-xs text-gray-500 truncate">{userData.email}</div>}
//               </div>
//             )}
//           </div>
//           {(!isSidebarCollapsed || isMobileView) && <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />}
//         </button>
//         {isProfileMenuOpen && !isSidebarCollapsed && (
//           <div
//             ref={profileMenuRef}
//             className={`absolute bottom-full ${isSidebarCollapsed && !isMobileView ? 'left-0 w-64 ml-[-50%]' : 'left-0 w-full'} mb-2 bg-[#161b22] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden max-w-xs`}
//             style={{ transform: isSidebarCollapsed && !isMobileView ? 'translateX(-50%)' : 'none' }}
//           >
//             <UserProfileMenu userData={userData} navigate={navigate} />
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const calculatePopupPosition = () => {
//     if (profileButtonRef.current) {
//       const rect = profileButtonRef.current.getBoundingClientRect();
//       const isCollapsed = isSidebarCollapsed && !isMobile;
//       if (isCollapsed) {
//         setProfileMenuPosition({
//           top: Math.max(10, window.innerHeight - 350),
//           left: rect.right + 8,
//         });
//       }
//     }
//   };

//   const ProfileMenuPopup = () => {
//     if (!isProfileMenuOpen || !isSidebarCollapsed || isMobile) return null;
//     return createPortal(
//       <div
//         ref={profileMenuRef}
//         className="bg-[#161b22] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden max-w-xs"
//         style={{
//           position: 'fixed',
//           top: `${profileMenuPosition.top}px`,
//           left: `${profileMenuPosition.left}px`,
//           width: '256px',
//         }}
//       >
//         <UserProfileMenu userData={userData} navigate={navigate} />
//       </div>,
//       document.body
//     );
//   };

//   useEffect(() => {
//     if (isProfileMenuOpen && isSidebarCollapsed && !isMobile) calculatePopupPosition();
//   }, [isSidebarCollapsed, isProfileMenuOpen, isMobile]);

//   return (
//     <>
//       <MobileHeader />
//       <div
//         className={`hidden lg:flex bg-[#0d1117] border-r border-gray-900 flex-col transition-all duration-300 ease-in-out shadow-2xl ${
//           isSidebarCollapsed ? 'w-20' : 'w-72'
//         } relative h-screen`}
//       >
//         <SidebarContent toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//       </div>
//       {isMobileMenuOpen && (
//         <div className="lg:hidden fixed inset-0 z-50 flex">
//           <div
//             className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 backdrop-blur-sm"
//             onClick={() => setIsMobileMenuOpen(false)}
//           />
//           <div className="relative flex flex-col w-80 max-w-xs bg-[#0d1117] shadow-2xl transform transition-transform duration-300 ease-in-out">
//             <SidebarContent isMobileView={true} toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
//           </div>
//         </div>
//       )}
//       <ProfileMenuPopup />
//       <input
//         ref={fileInputRef}
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="hidden"
//         accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
//       />
//       <input
//         ref={folderInputRef}
//         type="file"
//         multiple
//         onChange={handleFolderChange}
//         className="hidden"
//         webkitdirectory=""
//         directory=""
//       />
//     </>
//   );
// };

// const FolderTreeComponent = ({ items, level = 0, parentPath = '', expandedFolders, toggleFolder, selectFolder, selectedFolder, searchQuery = '' }) => {
//   return items
//     .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     .map((item, index) => {
//       const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
//       const isExpanded = expandedFolders.has(itemPath);
//       const hasChildren = item.children && item.children.length > 0;
//       const isSelected = selectedFolder?.id === item.id;
//       return (
//         <div key={`${itemPath}-${index}`} className="select-none">
//           <button
//             onClick={() => selectFolder(item)}
//             className={`group flex items-center w-full py-2 px-3 mx-1 rounded-lg cursor-pointer hover:bg-[#1c2128]/60 transition-colors ${
//               isSelected ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 font-medium'
//             }`}
//             style={{ paddingLeft: `${(level * 16) + 12}px` }}
//           >
//             {hasChildren && (
//               <span
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleFolder(itemPath);
//                 }}
//                 className="mr-2 p-0.5 rounded hover:bg-gray-800 transition-colors"
//               >
//                 {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
//               </span>
//             )}
//             {!hasChildren && <span className="w-4 h-4 mr-2" />}
//             <Folder className={`h-4 w-4 mr-2 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
//             <span className="text-sm truncate">{item.name}</span>
//           </button>
//           {hasChildren && isExpanded && (
//             <div className="mt-0.5">
//               <FolderTreeComponent
//                 items={item.children}
//                 level={level + 1}
//                 parentPath={itemPath}
//                 expandedFolders={expandedFolders}
//                 toggleFolder={toggleFolder}
//                 selectFolder={selectFolder}
//                 selectedFolder={selectedFolder}
//                 searchQuery={searchQuery}
//               />
//             </div>
//           )}
//         </div>
//       );
//     });
// };

// export default Sidebar;



import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  ChartBarIcon,
  DocumentTextIcon,
  MagnifyingGlassCircleIcon,
  PencilSquareIcon,
  ScaleIcon,
  BookOpenIcon,
  ClockIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  CreditCardIcon,
  BellIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import {
  FolderPlus,
  FileUp,
  Home,
  Folder,
  Upload,
  ChevronDown,
  ChevronRight,
  MessageSquare,
  LogOut,
  User,
  Settings,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import UserProfileMenu from './UserProfileMenu';
import QuickTools from './QuickTools';
import { useFileManager } from '../context/FileManagerContext';
import { useAuth } from '../context/AuthContext';
import { useSidebar } from '../context/SidebarContext';
import { createPortal } from 'react-dom';
import JuriNexLogoImg from '/src/assets/JuriNex_gavel_logo.png';

const Sidebar = () => {
  const { isSidebarHidden, setIsSidebarHidden, isSidebarCollapsed, setIsSidebarCollapsed } = useSidebar();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [profileMenuPosition, setProfileMenuPosition] = useState({ top: 0, left: 0 });

  const location = useLocation();
  const navigate = useNavigate();

  const { createFolder } = useFileManager();

  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const [showNewFolderInput, setShowNewFolderInput] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);
  const profileButtonRef = useRef(null);
  const profileMenuRef = useRef(null);

  const handleFileChange = (e) => {
    console.log('File(s) selected:', e.target.files);
  };

  const handleFolderChange = (e) => {
    console.log('Folder(s) selected:', e.target.files);
  };

  const { user } = useAuth();

  useEffect(() => {
    const loadUserData = () => {
      try {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const parsedUserData = JSON.parse(storedUserData);
          setUserData(parsedUserData);
        }
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    };

    loadUserData();

    const handleStorageChange = (e) => {
      if (e.key === 'user') {
        loadUserData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getDisplayName = (userInfo) => {
    if (userData?.username) return userData.username;
    if (userInfo?.username) return userInfo.username;
    if (userData?.email) {
      const emailPart = userData.email.split('@')[0];
      return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }
    if (userInfo?.email) {
      const emailPart = userInfo.email.split('@')[0];
      return emailPart.replace(/[._-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    }
    return 'User';
  };

  const getInitials = (userInfo) => {
    if (userData?.username) {
      const username = userData.username.trim();
      if (username.includes(' ')) {
        const parts = username.split(' ').filter((part) => part.length > 0);
        return parts.length >= 2 ? parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase() : username.charAt(0).toUpperCase();
      }
      return username.charAt(0).toUpperCase();
    }
    if (userInfo?.username) {
      const username = userInfo.username.trim();
      if (username.includes(' ')) {
        const parts = username.split(' ').filter((part) => part.length > 0);
        return parts.length >= 2 ? parts[0].charAt(0).toUpperCase() + parts[parts.length - 1].charAt(0).toUpperCase() : username.charAt(0).toUpperCase();
      }
      return username.charAt(0).toUpperCase();
    }
    if (userData?.email) {
      const emailPart = userData.email.split('@')[0];
      if (emailPart.includes('.')) return emailPart.split('.')[0].charAt(0).toUpperCase() + emailPart.split('.')[emailPart.split('.').length - 1].charAt(0).toUpperCase();
      if (emailPart.includes('_')) return emailPart.split('_')[0].charAt(0).toUpperCase() + emailPart.split('_')[emailPart.split('_').length - 1].charAt(0).toUpperCase();
      return emailPart.charAt(0).toUpperCase();
    }
    if (userInfo?.email) {
      const emailPart = userInfo.email.split('@')[0];
      if (emailPart.includes('.')) return emailPart.split('.')[0].charAt(0).toUpperCase() + emailPart.split('.')[emailPart.split('.').length - 1].charAt(0).toUpperCase();
      if (emailPart.includes('_')) return emailPart.split('_')[0].charAt(0).toUpperCase() + emailPart.split('_')[emailPart.split('_').length - 1].charAt(0).toUpperCase();
      return emailPart.charAt(0).toUpperCase();
    }
    return 'U';
  };

  const displayName = getDisplayName(user);
  const userInitials = getInitials(user);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) setIsMobileMenuOpen(false);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const loadCurrentFileId = () => {
      const fileId = localStorage.getItem('currentFileId');
      setCurrentFileId(fileId);
    };
    loadCurrentFileId();
    window.addEventListener('storage', (e) => e.key === 'currentFileId' && setCurrentFileId(e.newValue));
    window.addEventListener('currentFileIdChanged', (e) => setCurrentFileId(e.detail.fileId));
    return () => {
      window.removeEventListener('storage', () => {});
      window.removeEventListener('currentFileIdChanged', () => {});
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => (document.body.style.overflow = 'unset');
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileButtonRef.current && !profileButtonRef.current.contains(event.target) && profileMenuRef.current && !profileMenuRef.current.contains(event.target) && isProfileMenuOpen) {
        setIsProfileMenuOpen(false);
      }
    };
    if (isProfileMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileMenuOpen]);

  const toggleSidebar = () => {
    if (isMobile) setIsMobileMenuOpen(!isMobileMenuOpen);
    else setIsSidebarCollapsed((prev) => !prev);
  };

  const toggleProfileMenu = () => {
    if (!isProfileMenuOpen && isSidebarCollapsed && !isMobile) calculatePopupPosition();
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const handleChatNavigation = () => {
    if (currentFileId) navigate(`/chats/${currentFileId}`);
    else navigate('/chats');
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: ChartBarIcon },
    { name: 'Projects', path: '/documents', icon: DocumentTextIcon },
    { name: 'ICOM', path: '/analysis', icon: MagnifyingGlassCircleIcon },
    { name: 'Chats', path: '/chats', icon: MessageSquare, isSpecial: true },
    { name: 'Document Drafting', icon: PencilSquareIcon },
    { name: 'Billing & Usage', path: '/billing-usage', icon: CreditCardIcon },
  ];

  const JuriNexLogo = ({ collapsed = false }) => (
    <div className="flex items-center space-x-3">
      <img 
        src={JuriNexLogoImg} 
        alt="JuriNex Logo" 
        className="h-12 w-12 object-contain flex-shrink-0"
      />
      {!collapsed && (
        <div className="flex items-baseline">
          <span className="text-xl font-bold text-[#21C1B6]">Juri</span>
          <span className="text-xl font-bold text-white">Nex</span>
        </div>
      )}
    </div>
  );

  const MobileHeader = () => (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0d1117] border-b border-gray-900 px-4 py-3 flex items-center justify-between">
      <JuriNexLogo />
      <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200">
        <Bars3Icon className="h-6 w-6 text-gray-400" />
      </button>
    </div>
  );

  const SidebarContent = ({ isMobileView = false, toggleProfileMenu, isProfileMenuOpen }) => (
    <div className="flex flex-col h-full bg-[#0d1117]">
      <div className={`px-6 py-5 border-b border-gray-900 relative ${isMobileView ? '' : 'hidden lg:block'}`}>
        {!isMobileView && (
          <button
            onClick={toggleSidebar}
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 bg-[#0d1117] border border-gray-800 rounded-full p-1.5 shadow-lg hover:bg-gray-900 transition-all duration-200 z-10"
          >
            {isSidebarCollapsed ? <ChevronRightIcon className="h-4 w-4 text-gray-500" /> : <ChevronLeftIcon className="h-4 w-4 text-gray-500" />}
          </button>
        )}
        {isMobileView && (
          <div className="flex items-center justify-between">
            <JuriNexLogo />
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-gray-900 transition-colors duration-200">
              <XMarkIcon className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        )}
        {!isMobileView && (
          <div className={`flex ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <JuriNexLogo collapsed={isSidebarCollapsed} />
          </div>
        )}
      </div>

      <div className="px-4 pt-6 pb-4">
        <button
          onClick={() => navigate('/analysis', { state: { newChat: true } })}
          className="w-full text-white rounded-xl py-3 text-sm font-bold flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          style={{ backgroundColor: '#21C1B6' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
        >
          <PlusIcon className="h-5 w-5" />
          <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline ml-2'}`}>New Case Analysis</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <div className="mb-6">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              const isChats = item.name === 'Chats';
              return (
                <div key={item.name}>
                  {isChats ? (
                    <Link
                      to={currentFileId ? `/chats/${currentFileId}` : '/chats'}
                      className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
                        active ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
                      }`}
                      title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
                    >
                      <Icon
                        className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
                          active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                        }`}
                      />
                      <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>{item.name}</span>
                    </Link>
                  ) : (
                    <Link
                      to={item.path}
                      className={`group flex items-center w-full ${isSidebarCollapsed && !isMobileView ? 'justify-center px-3' : 'px-4'} py-3 text-sm rounded-xl transition-all duration-200 ${
                        active ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 hover:bg-[#1c2128]/60 hover:text-gray-200 font-medium'
                      }`}
                      title={isSidebarCollapsed && !isMobileView ? item.name : undefined}
                    >
                      <Icon
                        className={`h-5 w-5 ${isSidebarCollapsed && !isMobileView ? '' : 'mr-3'} transition-colors duration-200 ${
                          active ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'
                        }`}
                      />
                      <span className={`${isSidebarCollapsed && !isMobileView ? 'hidden' : 'inline'} transition-all duration-200`}>{item.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="px-3 pb-4 border-t border-gray-900 pt-4 bg-[#0d1117] relative">
        <button
          ref={profileButtonRef}
          onClick={toggleProfileMenu}
          className={`w-full flex items-center space-x-3 text-gray-400 hover:bg-[#1c2128]/60 rounded-xl py-3 px-4 text-sm font-medium transition-all duration-200 ${
            isSidebarCollapsed && !isMobileView ? 'justify-center px-2' : 'justify-between'
          }`}
        >
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-lg" style={{ backgroundColor: '#21C1B6' }}>
              {userInitials}
            </div>
            {(!isSidebarCollapsed || isMobileView) && (
              <div className="text-left min-w-0 flex-1">
                <div className="text-sm font-semibold text-gray-200 truncate">{displayName}</div>
                {userData?.email && <div className="text-xs text-gray-500 truncate">{userData.email}</div>}
              </div>
            )}
          </div>
          {(!isSidebarCollapsed || isMobileView) && <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />}
        </button>
        {isProfileMenuOpen && !isSidebarCollapsed && (
          <div
            ref={profileMenuRef}
            className={`absolute bottom-full ${isSidebarCollapsed && !isMobileView ? 'left-0 w-64 ml-[-50%]' : 'left-0 w-full'} mb-2 bg-[#161b22] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden max-w-xs`}
            style={{ transform: isSidebarCollapsed && !isMobileView ? 'translateX(-50%)' : 'none' }}
          >
            <UserProfileMenu userData={userData} navigate={navigate} />
          </div>
        )}
      </div>
    </div>
  );

  const calculatePopupPosition = () => {
    if (profileButtonRef.current) {
      const rect = profileButtonRef.current.getBoundingClientRect();
      const isCollapsed = isSidebarCollapsed && !isMobile;
      if (isCollapsed) {
        setProfileMenuPosition({
          top: Math.max(10, window.innerHeight - 350),
          left: rect.right + 8,
        });
      }
    }
  };

  const ProfileMenuPopup = () => {
    if (!isProfileMenuOpen || !isSidebarCollapsed || isMobile) return null;
    return createPortal(
      <div
        ref={profileMenuRef}
        className="bg-[#161b22] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden max-w-xs"
        style={{
          position: 'fixed',
          top: `${profileMenuPosition.top}px`,
          left: `${profileMenuPosition.left}px`,
          width: '256px',
        }}
      >
        <UserProfileMenu userData={userData} navigate={navigate} />
      </div>,
      document.body
    );
  };

  useEffect(() => {
    if (isProfileMenuOpen && isSidebarCollapsed && !isMobile) calculatePopupPosition();
  }, [isSidebarCollapsed, isProfileMenuOpen, isMobile]);

  return (
    <>
      <MobileHeader />
      <div
        className={`hidden lg:flex bg-[#0d1117] border-r border-gray-900 flex-col transition-all duration-300 ease-in-out shadow-2xl ${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        } relative h-screen`}
        data-sidebar-root
      >
        <SidebarContent toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-300 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col w-80 max-w-xs bg-[#0d1117] shadow-2xl transform transition-transform duration-300 ease-in-out">
            <SidebarContent isMobileView={true} toggleProfileMenu={toggleProfileMenu} isProfileMenuOpen={isProfileMenuOpen} />
          </div>
        </div>
      )}
      <ProfileMenuPopup />
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileChange}
        className="hidden"
        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
      />
      <input
        ref={folderInputRef}
        type="file"
        multiple
        onChange={handleFolderChange}
        className="hidden"
        webkitdirectory=""
        directory=""
      />
    </>
  );
};

const FolderTreeComponent = ({ items, level = 0, parentPath = '', expandedFolders, toggleFolder, selectFolder, selectedFolder, searchQuery = '' }) => {
  return items
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .map((item, index) => {
      const itemPath = parentPath ? `${parentPath}/${item.name}` : item.name;
      const isExpanded = expandedFolders.has(itemPath);
      const hasChildren = item.children && item.children.length > 0;
      const isSelected = selectedFolder?.id === item.id;
      return (
        <div key={`${itemPath}-${index}`} className="select-none">
          <button
            onClick={() => selectFolder(item)}
            className={`group flex items-center w-full py-2 px-3 mx-1 rounded-lg cursor-pointer hover:bg-[#1c2128]/60 transition-colors ${
              isSelected ? 'bg-[#1c2128] text-white font-bold' : 'text-gray-400 font-medium'
            }`}
            style={{ paddingLeft: `${(level * 16) + 12}px` }}
          >
            {hasChildren && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolder(itemPath);
                }}
                className="mr-2 p-0.5 rounded hover:bg-gray-800 transition-colors"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
              </span>
            )}
            {!hasChildren && <span className="w-4 h-4 mr-2" />}
            <Folder className={`h-4 w-4 mr-2 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
            <span className="text-sm truncate">{item.name}</span>
          </button>
          {hasChildren && isExpanded && (
            <div className="mt-0.5">
              <FolderTreeComponent
                items={item.children}
                level={level + 1}
                parentPath={itemPath}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                selectFolder={selectFolder}
                selectedFolder={selectedFolder}
                searchQuery={searchQuery}
              />
            </div>
          )}
        </div>
      );
    });
};

export default Sidebar;