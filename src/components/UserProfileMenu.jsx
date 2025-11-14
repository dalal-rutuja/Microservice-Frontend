

// import React, { useState, useEffect, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';

// const UserProfileMenu = () => {
//   const navigate = useNavigate();
//   const [userPlan, setUserPlan] = useState('Free plan');
//   const [userEmail, setUserEmail] = useState('');
//   const [userName, setUserName] = useState('');
//   const [userInitials, setUserInitials] = useState('U');
//   const [isLoading, setIsLoading] = useState(true);

//   // Helper function to safely access localStorage
//   const getFromStorage = useCallback((key) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         const item = localStorage.getItem(key);
//         return item ? JSON.parse(item) : null;
//       }
//     } catch (error) {
//       console.error(`Error reading ${key} from localStorage:`, error);
//     }
//     return null;
//   }, []);

//   // Helper function to safely set localStorage
//   const setToStorage = useCallback((key, value) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         localStorage.setItem(key, JSON.stringify(value));
//       }
//     } catch (error) {
//       console.error(`Error setting ${key} to localStorage:`, error);
//     }
//   }, []);

//   // Helper function to safely remove from localStorage
//   const removeFromStorage = useCallback((key) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         localStorage.removeItem(key);
//       }
//     } catch (error) {
//       console.error(`Error removing ${key} from localStorage:`, error);
//     }
//   }, []);

//   // Generate initials from name
//   const generateInitials = useCallback((name, email) => {
//     if (name && name.trim()) {
//       const nameParts = name.trim().split(' ').filter(Boolean);
//       if (nameParts.length >= 2) {
//         return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
//       } else if (nameParts.length === 1) {
//         return nameParts[0].charAt(0).toUpperCase();
//       }
//     }
    
//     if (email) {
//       const emailPart = email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
//       }
//       return emailPart.charAt(0).toUpperCase();
//     }
    
//     return 'U';
//   }, []);

//   // Extract display name from email
//   const getDisplayNameFromEmail = useCallback((email) => {
//     if (!email) return '';
//     const emailPart = email.split('@')[0];
//     return emailPart
//       .replace(/[._-]/g, ' ')
//       .replace(/\b\w/g, l => l.toUpperCase())
//       .trim();
//   }, []);

//   // Main function to update user info
//   const updateUserInfo = useCallback(() => {
//     setIsLoading(true);
    
//     // Your specific localStorage structure:
//     // user: {"id":12,"username":"pravin sarule","email":"admin12@gmail.com","role":"user","is_blocked":false}
//     // userInfo: {"plan":"Pro Plan v2","lastPayment":{"id":"pay_R9r6N7wBm4NlBQ",...}}
    
//     let userInfo = null;
//     let planInfo = null;

//     // Get user data from 'user' key
//     userInfo = getFromStorage('user');
//     if (userInfo) {
//       console.log('✅ Found user data in localStorage["user"]:', userInfo);
//     } else {
//       // Fallback to other possible user keys
//       const userKeys = ['userData', 'currentUser', 'authUser', 'auth', 'profile'];
//       for (const key of userKeys) {
//         const data = getFromStorage(key);
//         if (data && data.id && data.email) {
//           userInfo = data;
//           console.log(`✅ Found user data in localStorage["${key}"]`, userInfo);
//           break;
//         }
//       }
//     }

//     // Get plan data from 'userInfo' key (yes, confusing naming but that's your structure)
//     planInfo = getFromStorage('userInfo');
//     if (planInfo && planInfo.plan) {
//       console.log('✅ Found plan data in localStorage["userInfo"]:', planInfo);
//     } else {
//       // Fallback to other possible plan keys
//       const planKeys = ['plan', 'subscription', 'userPlan', 'planInfo', 'userSubscription'];
//       for (const key of planKeys) {
//         const data = getFromStorage(key);
//         if (data) {
//           if (typeof data === 'object' && data.plan) {
//             planInfo = data;
//             console.log(`✅ Found plan data in localStorage["${key}"]`, planInfo);
//             break;
//           } else if (typeof data === 'string') {
//             planInfo = { plan: data };
//             console.log(`✅ Found plan as string in localStorage["${key}"]`, data);
//             break;
//           }
//         }
//       }
//     }

//     if (userInfo) {
//       // Extract user information based on your exact structure
//       const email = userInfo.email || '';
//       const name = userInfo.username || getDisplayNameFromEmail(email);
      
//       // Determine user plan - prioritize planInfo from 'userInfo' localStorage key
//       let plan = 'Free plan';
      
//       if (planInfo && planInfo.plan) {
//         // Use the plan from 'userInfo' localStorage key
//         plan = planInfo.plan;
//         console.log('✅ Plan set from localStorage["userInfo"]:', plan);
//         console.log('📊 Plan details:', {
//           plan: planInfo.plan,
//           lastPayment: planInfo.lastPayment
//         });
//       } else if (userInfo.plan) {
//         // Plan stored directly in user object (backup)
//         plan = userInfo.plan;
//         console.log('✅ Plan set from user.plan:', plan);
//       } else if (userInfo.role) {
//         // Map role to plan as fallback
//         const planMap = {
//           'admin': 'Admin Plan',
//           'premium': 'Premium Plan', 
//           'pro': 'Pro Plan',
//           'plus': 'Plus Plan',
//           'free': 'Free Plan',
//           'user': 'Free Plan'
//         };
//         plan = planMap[userInfo.role.toLowerCase()] || 'Free Plan';
//         console.log('⚠️ Plan set from user role mapping (fallback):', plan);
//       } else {
//         console.log('❌ No plan data found, using default:', plan);
//       }

//       // Generate initials from username
//       const initials = generateInitials(name, email);

//       // Update state
//       setUserEmail(email);
//       setUserName(name || 'User');
//       setUserPlan(plan);
//       setUserInitials(initials);

//       console.log('🎉 Final user info update:', {
//         id: userInfo.id,
//         email,
//         username: userInfo.username,
//         name: name || 'User',
//         role: userInfo.role,
//         is_blocked: userInfo.is_blocked,
//         plan,
//         initials,
//         lastPayment: planInfo?.lastPayment
//       });
//     } else {
//       // No user data found - reset to defaults
//       console.log('❌ No user data found in localStorage');
//       setUserEmail('');
//       setUserName('');
//       setUserPlan('Free plan');
//       setUserInitials('U');
//     }
    
//     setIsLoading(false);
//   }, [getFromStorage, generateInitials, getDisplayNameFromEmail]);

//   // Effect to initialize and listen for changes
//   useEffect(() => {
//     // Initial load
//     updateUserInfo();

//     // Listen for storage changes (cross-tab updates)
//     const handleStorageChange = (e) => {
//       const userDataKeys = ['user', 'userInfo', 'userData', 'currentUser', 'authUser', 'auth', 'profile', 'plan', 'subscription', 'userPlan', 'planInfo'];
//       if (userDataKeys.includes(e.key)) {
//         console.log(`Storage change detected for key: ${e.key}`);
//         updateUserInfo();
//       }
//     };

//     // Listen for custom events
//     const handleCustomUpdate = () => {
//       console.log('Custom user info update event received');
//       updateUserInfo();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('userInfoUpdated', handleCustomUpdate);
//     window.addEventListener('userDataChanged', handleCustomUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('userInfoUpdated', handleCustomUpdate);
//       window.removeEventListener('userDataChanged', handleCustomUpdate);
//     };
//   }, [updateUserInfo]);

//   // Handle logout
//   const handleLogout = useCallback(() => {
//     try {
//       // Keys that might contain user/auth data based on your structure
//       const keysToRemove = [
//         'token',
//         'accessToken',
//         'refreshToken',
//         'authToken',
//         'jwt',
//         'user',
//         'userInfo',
//         'userData',
//         'currentUser',
//         'authUser',
//         'auth',
//         'profile',
//         'session',
//         'plan',
//         'subscription',
//         'userPlan',
//         'planInfo'
//       ];

//       // Remove all auth-related data
//       keysToRemove.forEach(key => {
//         removeFromStorage(key);
//       });

//       // Reset component state
//       setUserPlan('Free plan');
//       setUserEmail('');
//       setUserName('');
//       setUserInitials('U');
//       setIsLoading(false);

//       console.log('User logged out successfully - localStorage cleared');

//       // Dispatch custom event to notify other components
//       window.dispatchEvent(new CustomEvent('userLoggedOut'));

//       // Navigate to login
//       navigate('/login');
//     } catch (error) {
//       console.error('Error during logout:', error);
//       navigate('/login');
//     }
//   }, [navigate, removeFromStorage]);

//   // Show loading state briefly
//   if (isLoading) {
//     return (
//       <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="flex-shrink-0">
//             <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 animate-pulse">
//             </div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//             <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
//       {/* User Profile Section */}
//       <div className="flex items-center space-x-3 mb-4">
//         <div className="flex-shrink-0">
//           <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-500 text-white font-semibold text-sm shadow-sm">
//             {userInitials}
//           </div>
//         </div>
//         <div className="flex-1 min-w-0">
//           {userName && (
//             <div className="text-sm font-semibold text-gray-900 truncate">
//               {userName}
//             </div>
//           )}
//           {userEmail && (
//             <div className="text-sm text-gray-600 truncate">
//               {userEmail}
//             </div>
//           )}
//           <div className="flex items-center space-x-2 mt-1">
//             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//               {userPlan}
//             </span>
//             <span className="text-xs text-gray-500">Personal</span>
//           </div>
//         </div>
//         <div className="flex-shrink-0">
//           <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </div>

//       {/* Navigation Menu */}
//       <nav>
//         <ul className="space-y-1">
//           <li>
//             <button
//               onClick={() => navigate('/settings')}
//               className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Settings
//             </button>
//           </li>
//           <li>
//             <a href="#" className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center">
//                 <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
//                 </svg>
//                 Language
//               </div>
//               <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </a>
//           </li>
//           <li>
//             <button
//               onClick={() => navigate('/get-help')}
//               className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
//             >
//               <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Get help
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => {
//                 console.log('Attempting to navigate to /subscription-plans from UserProfileMenu');
//                 navigate('/subscription-plans');
//               }}
//               className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
//             >
//               Upgrade plan
//             </button>
//           </li>
//           <li>
//             <a href="#" className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center">
//                 <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                 </svg>
//                 Learn more
//               </div>
//               <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </a>
//           </li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
//             >
//               <svg className="h-4 w-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Log out
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default UserProfileMenu;


// import React, { useState, useEffect, useCallback } from 'react';

// const UserProfileMenu = ({ userData, navigate }) => {
//   const [userPlan, setUserPlan] = useState('Free plan');
//   const [userEmail, setUserEmail] = useState('');
//   const [userName, setUserName] = useState('');
//   const [userInitials, setUserInitials] = useState('U');
//   const [isLoading, setIsLoading] = useState(true);

//   // Helper function to safely access localStorage
//   const getFromStorage = useCallback((key) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         const item = localStorage.getItem(key);
//         return item ? JSON.parse(item) : null;
//       }
//     } catch (error) {
//       console.error(`Error reading ${key} from localStorage:`, error);
//     }
//     return null;
//   }, []);

//   // Helper function to safely set localStorage
//   const setToStorage = useCallback((key, value) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         localStorage.setItem(key, JSON.stringify(value));
//       }
//     } catch (error) {
//       console.error(`Error setting ${key} to localStorage:`, error);
//     }
//   }, []);

//   // Helper function to safely remove from localStorage
//   const removeFromStorage = useCallback((key) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         localStorage.removeItem(key);
//       }
//     } catch (error) {
//       console.error(`Error removing ${key} from localStorage:`, error);
//     }
//   }, []);

//   // Generate initials from name
//   const generateInitials = useCallback((name, email) => {
//     if (name && name.trim()) {
//       const nameParts = name.trim().split(' ').filter(Boolean);
//       if (nameParts.length >= 2) {
//         return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
//       } else if (nameParts.length === 1) {
//         return nameParts[0].charAt(0).toUpperCase();
//       }
//     }
//     if (email) {
//       const emailPart = email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
//       }
//       return emailPart.charAt(0).toUpperCase();
//     }
//     return 'U';
//   }, []);

//   // Extract display name from email
//   const getDisplayNameFromEmail = useCallback((email) => {
//     if (!email) return '';
//     const emailPart = email.split('@')[0];
//     return emailPart
//       .replace(/[._-]/g, ' ')
//       .replace(/\b\w/g, (l) => l.toUpperCase())
//       .trim();
//   }, []);

//   // Main function to update user info
//   const updateUserInfo = useCallback(() => {
//     setIsLoading(true);
    
//     let userInfo = null;
//     let planInfo = null;

//     userInfo = userData || getFromStorage('user');
//     if (userInfo) {
//       console.log('✅ Found user data in prop or localStorage["user"]:', userInfo);
//     } else {
//       const userKeys = ['userData', 'currentUser', 'authUser', 'auth', 'profile'];
//       for (const key of userKeys) {
//         const data = getFromStorage(key);
//         if (data && data.id && data.email) {
//           userInfo = data;
//           console.log(`✅ Found user data in localStorage["${key}"]`, userInfo);
//           break;
//         }
//       }
//     }

//     planInfo = getFromStorage('userInfo');
//     if (planInfo && planInfo.plan) {
//       console.log('✅ Found plan data in localStorage["userInfo"]:', planInfo);
//     } else {
//       const planKeys = ['plan', 'subscription', 'userPlan', 'planInfo', 'userSubscription'];
//       for (const key of planKeys) {
//         const data = getFromStorage(key);
//         if (data) {
//           if (typeof data === 'object' && data.plan) {
//             planInfo = data;
//             console.log(`✅ Found plan data in localStorage["${key}"]`, planInfo);
//             break;
//           } else if (typeof data === 'string') {
//             planInfo = { plan: data };
//             console.log(`✅ Found plan as string in localStorage["${key}"]`, data);
//             break;
//           }
//         }
//       }
//     }

//     if (userInfo) {
//       const email = userInfo.email || '';
//       const name = userInfo.username || getDisplayNameFromEmail(email);
      
//       let plan = 'Free plan';
      
//       if (planInfo && planInfo.plan) {
//         plan = planInfo.plan;
//         console.log('✅ Plan set from localStorage["userInfo"]:', plan);
//         console.log('📊 Plan details:', { plan: planInfo.plan, lastPayment: planInfo.lastPayment });
//       } else if (userInfo.plan) {
//         plan = userInfo.plan;
//         console.log('✅ Plan set from user.plan:', plan);
//       } else if (userInfo.role) {
//         const planMap = {
//           'admin': 'Admin Plan',
//           'premium': 'Premium Plan',
//           'pro': 'Pro Plan',
//           'plus': 'Plus Plan',
//           'free': 'Free Plan',
//           'user': 'Free Plan',
//         };
//         plan = planMap[userInfo.role.toLowerCase()] || 'Free Plan';
//         console.log('⚠️ Plan set from user role mapping (fallback):', plan);
//       } else {
//         console.log('❌ No plan data found, using default:', plan);
//       }

//       const initials = generateInitials(name, email);

//       setUserEmail(email);
//       setUserName(name || 'User');
//       setUserPlan(plan);
//       setUserInitials(initials);

//       console.log('🎉 Final user info update:', {
//         id: userInfo.id,
//         email,
//         username: userInfo.username,
//         name: name || 'User',
//         role: userInfo.role,
//         is_blocked: userInfo.is_blocked,
//         plan,
//         initials,
//         lastPayment: planInfo?.lastPayment,
//       });
//     } else {
//       console.log('❌ No user data found in prop or localStorage');
//       setUserEmail('');
//       setUserName('');
//       setUserPlan('Free plan');
//       setUserInitials('U');
//     }
    
//     setIsLoading(false);
//   }, [getFromStorage, generateInitials, getDisplayNameFromEmail, userData]);

//   useEffect(() => {
//     updateUserInfo();

//     const handleStorageChange = (e) => {
//       const userDataKeys = ['user', 'userInfo', 'userData', 'currentUser', 'authUser', 'auth', 'profile', 'plan', 'subscription', 'userPlan', 'planInfo'];
//       if (userDataKeys.includes(e.key)) {
//         console.log(`Storage change detected for key: ${e.key}`);
//         updateUserInfo();
//       }
//     };

//     const handleCustomUpdate = () => {
//       console.log('Custom user info update event received');
//       updateUserInfo();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('userInfoUpdated', handleCustomUpdate);
//     window.addEventListener('userDataChanged', handleCustomUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('userInfoUpdated', handleCustomUpdate);
//       window.removeEventListener('userDataChanged', handleCustomUpdate);
//     };
//   }, [updateUserInfo]);

//   const handleLogout = useCallback(() => {
//     try {
//       const keysToRemove = [
//         'token',
//         'accessToken',
//         'refreshToken',
//         'authToken',
//         'jwt',
//         'user',
//         'userInfo',
//         'userData',
//         'currentUser',
//         'authUser',
//         'auth',
//         'profile',
//         'session',
//         'plan',
//         'subscription',
//         'userPlan',
//         'planInfo',
//       ];

//       keysToRemove.forEach((key) => removeFromStorage(key));

//       setUserPlan('Free plan');
//       setUserEmail('');
//       setUserName('');
//       setUserInitials('U');
//       setIsLoading(false);

//       console.log('User logged out successfully - localStorage cleared');

//       window.dispatchEvent(new CustomEvent('userLoggedOut'));

//       navigate('/login');
//     } catch (error) {
//       console.error('Error during logout:', error);
//       navigate('/login');
//     }
//   }, [navigate, removeFromStorage]);

//   if (isLoading) {
//     return (
//       <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="flex-shrink-0">
//             <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//             <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
//       <div className="flex items-center space-x-3 mb-4">
//         <div className="flex-shrink-0">
//           <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-purple-500 text-white font-semibold text-sm shadow-sm">
//             {userInitials}
//           </div>
//         </div>
//         <div className="flex-1 min-w-0">
//           {userName && <div className="text-sm font-semibold text-gray-900 truncate">{userName}</div>}
//           {userEmail && <div className="text-sm text-gray-600 truncate">{userEmail}</div>}
//           <div className="flex items-center space-x-2 mt-1">
//             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//               {userPlan}
//             </span>
//             <span className="text-xs text-gray-500">Personal</span>
//           </div>
//         </div>
//         <div className="flex-shrink-0">
//           <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </div>

//       <nav>
//         <ul className="space-y-1">
//           <li>
//             <button onClick={() => navigate('/settings')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Settings
//             </button>
//           </li>
//           {/* <li>
//             <a href="#" className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center">
//                 <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
//                 </svg>
//                 Language
//               </div>
//               <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </a>
//           </li> */}
//           <li>
//             <button onClick={() => navigate('/get-help')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Get help
//             </button>
//           </li>
//           <li>
//             <button onClick={() => navigate('/subscription-plans')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-purple-700 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
//               Upgrade plan
//             </button>
//           </li>
//           {/* <li>
//             <a href="#" className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <div className="flex items-center">
//                 <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                 </svg>
//                 Learn more
//               </div>
//               <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
//               </svg>
//             </a>
//           </li> */}
//           <li>
//             <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Log out
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default UserProfileMenu;



// import React, { useState, useEffect, useCallback } from 'react';

// const UserProfileMenu = ({ userData, navigate }) => {
//   const [userPlan, setUserPlan] = useState('Free plan');
//   const [userEmail, setUserEmail] = useState('');
//   const [userName, setUserName] = useState('');
//   const [userInitials, setUserInitials] = useState('U');
//   const [isLoading, setIsLoading] = useState(true);

//   // Helper function to safely access localStorage
//   const getFromStorage = useCallback((key) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         const item = localStorage.getItem(key);
//         return item ? JSON.parse(item) : null;
//       }
//     } catch (error) {
//       console.error(`Error reading ${key} from localStorage:`, error);
//     }
//     return null;
//   }, []);

//   // Helper function to safely set localStorage
//   const setToStorage = useCallback((key, value) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         localStorage.setItem(key, JSON.stringify(value));
//       }
//     } catch (error) {
//       console.error(`Error setting ${key} to localStorage:`, error);
//     }
//   }, []);

//   // Helper function to safely remove from localStorage
//   const removeFromStorage = useCallback((key) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         localStorage.removeItem(key);
//       }
//     } catch (error) {
//       console.error(`Error removing ${key} from localStorage:`, error);
//     }
//   }, []);

//   // Generate initials from name
//   const generateInitials = useCallback((name, email) => {
//     if (name && name.trim()) {
//       const nameParts = name.trim().split(' ').filter(Boolean);
//       if (nameParts.length >= 2) {
//         return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
//       } else if (nameParts.length === 1) {
//         return nameParts[0].charAt(0).toUpperCase();
//       }
//     }
//     if (email) {
//       const emailPart = email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
//       }
//       return emailPart.charAt(0).toUpperCase();
//     }
//     return 'U';
//   }, []);

//   // Extract display name from email
//   const getDisplayNameFromEmail = useCallback((email) => {
//     if (!email) return '';
//     const emailPart = email.split('@')[0];
//     return emailPart
//       .replace(/[._-]/g, ' ')
//       .replace(/\b\w/g, (l) => l.toUpperCase())
//       .trim();
//   }, []);

//   // Main function to update user info
//   const updateUserInfo = useCallback(() => {
//     setIsLoading(true);
    
//     let userInfo = null;
//     let planInfo = null;

//     userInfo = userData || getFromStorage('user');
//     if (userInfo) {
//       console.log('✅ Found user data in prop or localStorage["user"]:', userInfo);
//     } else {
//       const userKeys = ['userData', 'currentUser', 'authUser', 'auth', 'profile'];
//       for (const key of userKeys) {
//         const data = getFromStorage(key);
//         if (data && data.id && data.email) {
//           userInfo = data;
//           console.log(`✅ Found user data in localStorage["${key}"]`, userInfo);
//           break;
//         }
//       }
//     }

//     planInfo = getFromStorage('userInfo');
//     if (planInfo && planInfo.plan) {
//       console.log('✅ Found plan data in localStorage["userInfo"]:', planInfo);
//     } else {
//       const planKeys = ['plan', 'subscription', 'userPlan', 'planInfo', 'userSubscription'];
//       for (const key of planKeys) {
//         const data = getFromStorage(key);
//         if (data) {
//           if (typeof data === 'object' && data.plan) {
//             planInfo = data;
//             console.log(`✅ Found plan data in localStorage["${key}"]`, planInfo);
//             break;
//           } else if (typeof data === 'string') {
//             planInfo = { plan: data };
//             console.log(`✅ Found plan as string in localStorage["${key}"]`, data);
//             break;
//           }
//         }
//       }
//     }

//     if (userInfo) {
//       const email = userInfo.email || '';
//       const name = userInfo.username || getDisplayNameFromEmail(email);
      
//       let plan = 'Free plan';
      
//       if (planInfo && planInfo.plan) {
//         plan = planInfo.plan;
//         console.log('✅ Plan set from localStorage["userInfo"]:', plan);
//         console.log('📊 Plan details:', { plan: planInfo.plan, lastPayment: planInfo.lastPayment });
//       } else if (userInfo.plan) {
//         plan = userInfo.plan;
//         console.log('✅ Plan set from user.plan:', plan);
//       } else if (userInfo.role) {
//         const planMap = {
//           'admin': 'Admin Plan',
//           'premium': 'Premium Plan',
//           'pro': 'Pro Plan',
//           'plus': 'Plus Plan',
//           'free': 'Free Plan',
//           'user': 'Free Plan',
//         };
//         plan = planMap[userInfo.role.toLowerCase()] || 'Free Plan';
//         console.log('⚠️ Plan set from user role mapping (fallback):', plan);
//       } else {
//         console.log('❌ No plan data found, using default:', plan);
//       }

//       const initials = generateInitials(name, email);

//       setUserEmail(email);
//       setUserName(name || 'User');
//       setUserPlan(plan);
//       setUserInitials(initials);

//       console.log('🎉 Final user info update:', {
//         id: userInfo.id,
//         email,
//         username: userInfo.username,
//         name: name || 'User',
//         role: userInfo.role,
//         is_blocked: userInfo.is_blocked,
//         plan,
//         initials,
//         lastPayment: planInfo?.lastPayment,
//       });
//     } else {
//       console.log('❌ No user data found in prop or localStorage');
//       setUserEmail('');
//       setUserName('');
//       setUserPlan('Free plan');
//       setUserInitials('U');
//     }
    
//     setIsLoading(false);
//   }, [getFromStorage, generateInitials, getDisplayNameFromEmail, userData]);

//   useEffect(() => {
//     updateUserInfo();

//     const handleStorageChange = (e) => {
//       const userDataKeys = ['user', 'userInfo', 'userData', 'currentUser', 'authUser', 'auth', 'profile', 'plan', 'subscription', 'userPlan', 'planInfo'];
//       if (userDataKeys.includes(e.key)) {
//         console.log(`Storage change detected for key: ${e.key}`);
//         updateUserInfo();
//       }
//     };

//     const handleCustomUpdate = () => {
//       console.log('Custom user info update event received');
//       updateUserInfo();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('userInfoUpdated', handleCustomUpdate);
//     window.addEventListener('userDataChanged', handleCustomUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('userInfoUpdated', handleCustomUpdate);
//       window.removeEventListener('userDataChanged', handleCustomUpdate);
//     };
//   }, [updateUserInfo]);

//   const handleLogout = useCallback(() => {
//     try {
//       const keysToRemove = [
//         'token',
//         'accessToken',
//         'refreshToken',
//         'authToken',
//         'jwt',
//         'user',
//         'userInfo',
//         'userData',
//         'currentUser',
//         'authUser',
//         'auth',
//         'profile',
//         'session',
//         'plan',
//         'subscription',
//         'userPlan',
//         'planInfo',
//       ];

//       keysToRemove.forEach((key) => removeFromStorage(key));

//       setUserPlan('Free plan');
//       setUserEmail('');
//       setUserName('');
//       setUserInitials('U');
//       setIsLoading(false);

//       console.log('User logged out successfully - localStorage cleared');

//       window.dispatchEvent(new CustomEvent('userLoggedOut'));

//       navigate('/login');
//     } catch (error) {
//       console.error('Error during logout:', error);
//       navigate('/login');
//     }
//   }, [navigate, removeFromStorage]);

//   if (isLoading) {
//     return (
//       <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="flex-shrink-0">
//             <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//             <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
//       <div className="flex items-center space-x-3 mb-4">
//         <div
//           className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full text-white font-semibold text-sm shadow-lg transition-colors duration-200 transform hover:-translate-y-0.5 hover:shadow-xl"
//           style={{ backgroundColor: '#21C1B6' }}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//         >
//           {userInitials}
//         </div>
//         <div className="flex-1 min-w-0">
//           {userName && <div className="text-sm font-semibold text-gray-900 truncate">{userName}</div>}
//           {userEmail && <div className="text-sm text-gray-600 truncate">{userEmail}</div>}
//           <div className="flex items-center space-x-2 mt-1">
//             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//               {userPlan}
//             </span>
//             <span className="text-xs text-gray-500">Personal</span>
//           </div>
//         </div>
//         <div className="flex-shrink-0">
//           <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </div>

//       <nav>
//         <ul className="space-y-1">
//           <li>
//             <button onClick={() => navigate('/settings')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Settings
//             </button>
//           </li>
//           <li>
//             <button onClick={() => navigate('/get-help')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Get help
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => navigate('/subscription-plans')}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//               className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               style={{ backgroundColor: '#21C1B6' }}
//             >
//               Upgrade plan
//             </button>
//           </li>
//           <li>
//             <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Log out
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default UserProfileMenu;



// import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from '../context/AuthContext'; // Import useAuth

// const UserProfileMenu = ({ userData, navigate, onLogout }) => {
//   const [userPlan, setUserPlan] = useState('Free plan');
//   const [userEmail, setUserEmail] = useState('');
//   const [userName, setUserName] = useState('');
//   const [userInitials, setUserInitials] = useState('U');
//   const [isLoading, setIsLoading] = useState(true);

//   const { logout: authLogout } = useAuth(); // Get logout from AuthContext

//   // Helper function to safely access localStorage
//   const getFromStorage = useCallback((key) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         const item = localStorage.getItem(key);
//         return item ? JSON.parse(item) : null;
//       }
//     } catch (error) {
//       console.error(`Error reading ${key} from localStorage:`, error);
//     }
//     return null;
//   }, []);

//   // Helper function to safely set localStorage
//   const setToStorage = useCallback((key, value) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         localStorage.setItem(key, JSON.stringify(value));
//       }
//     } catch (error) {
//       console.error(`Error setting ${key} to localStorage:`, error);
//     }
//   }, []);

//   // Helper function to safely remove from localStorage
//   const removeFromStorage = useCallback((key) => {
//     try {
//       if (typeof window !== 'undefined' && window.localStorage) {
//         localStorage.removeItem(key);
//       }
//     } catch (error) {
//       console.error(`Error removing ${key} from localStorage:`, error);
//     }
//   }, []);

//   // Generate initials from name
//   const generateInitials = useCallback((name, email) => {
//     if (name && name.trim()) {
//       const nameParts = name.trim().split(' ').filter(Boolean);
//       if (nameParts.length >= 2) {
//         return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
//       } else if (nameParts.length === 1) {
//         return nameParts[0].charAt(0).toUpperCase();
//       }
//     }
//     if (email) {
//       const emailPart = email.split('@')[0];
//       if (emailPart.includes('.')) {
//         const parts = emailPart.split('.');
//         return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
//       } else if (emailPart.includes('_')) {
//         const parts = emailPart.split('_');
//         return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
//       }
//       return emailPart.charAt(0).toUpperCase();
//     }
//     return 'U';
//   }, []);

//   // Extract display name from email
//   const getDisplayNameFromEmail = useCallback((email) => {
//     if (!email) return '';
//     const emailPart = email.split('@')[0];
//     return emailPart
//       .replace(/[._-]/g, ' ')
//       .replace(/\b\w/g, (l) => l.toUpperCase())
//       .trim();
//   }, []);

//   // Main function to update user info
//   const updateUserInfo = useCallback(() => {
//     setIsLoading(true);
    
//     let userInfo = null;
//     let planInfo = null;

//     userInfo = userData || getFromStorage('user');
//     if (userInfo) {
//       console.log('✅ Found user data in prop or localStorage["user"]:', userInfo);
//     } else {
//       const userKeys = ['userData', 'currentUser', 'authUser', 'auth', 'profile'];
//       for (const key of userKeys) {
//         const data = getFromStorage(key);
//         if (data && data.id && data.email) {
//           userInfo = data;
//           console.log(`✅ Found user data in localStorage["${key}"]`, userInfo);
//           break;
//         }
//       }
//     }

//     planInfo = getFromStorage('userInfo');
//     if (planInfo && planInfo.plan) {
//       console.log('✅ Found plan data in localStorage["userInfo"]:', planInfo);
//     } else {
//       const planKeys = ['plan', 'subscription', 'userPlan', 'planInfo', 'userSubscription'];
//       for (const key of planKeys) {
//         const data = getFromStorage(key);
//         if (data) {
//           if (typeof data === 'object' && data.plan) {
//             planInfo = data;
//             console.log(`✅ Found plan data in localStorage["${key}"]`, planInfo);
//             break;
//           } else if (typeof data === 'string') {
//             planInfo = { plan: data };
//             console.log(`✅ Found plan as string in localStorage["${key}"]`, data);
//             break;
//           }
//         }
//       }
//     }

//     if (userInfo) {
//       const email = userInfo.email || '';
//       const name = userInfo.displayName || userInfo.username || getDisplayNameFromEmail(email);
      
//       let plan = 'Free plan';
      
//       if (planInfo && planInfo.plan) {
//         plan = planInfo.plan;
//         console.log('✅ Plan set from localStorage["userInfo"]:', plan);
//         console.log('📊 Plan details:', { plan: planInfo.plan, lastPayment: planInfo.lastPayment });
//       } else if (userInfo.plan) {
//         plan = userInfo.plan;
//         console.log('✅ Plan set from user.plan:', plan);
//       } else if (userInfo.role) {
//         const planMap = {
//           'admin': 'Admin Plan',
//           'premium': 'Premium Plan',
//           'pro': 'Pro Plan',
//           'plus': 'Plus Plan',
//           'free': 'Free Plan',
//           'user': 'Free Plan',
//         };
//         plan = planMap[userInfo.role.toLowerCase()] || 'Free Plan';
//         console.log('⚠️ Plan set from user role mapping (fallback):', plan);
//       } else {
//         console.log('❌ No plan data found, using default:', plan);
//       }

//       const initials = generateInitials(name, email);

//       setUserEmail(email);
//       setUserName(name || 'User');
//       setUserPlan(plan);
//       setUserInitials(initials);

//       console.log('🎉 Final user info update:', {
//         id: userInfo.id,
//         email,
//         username: userInfo.username,
//         displayName: userInfo.displayName,
//         name: name || 'User',
//         role: userInfo.role,
//         is_blocked: userInfo.is_blocked,
//         plan,
//         initials,
//         lastPayment: planInfo?.lastPayment,
//       });
//     } else {
//       console.log('❌ No user data found in prop or localStorage');
//       setUserEmail('');
//       setUserName('');
//       setUserPlan('Free plan');
//       setUserInitials('U');
//     }
    
//     setIsLoading(false);
//   }, [getFromStorage, generateInitials, getDisplayNameFromEmail, userData]);

//   useEffect(() => {
//     updateUserInfo();

//     const handleStorageChange = (e) => {
//       const userDataKeys = ['user', 'userInfo', 'userData', 'currentUser', 'authUser', 'auth', 'profile', 'plan', 'subscription', 'userPlan', 'planInfo'];
//       if (userDataKeys.includes(e.key)) {
//         console.log(`Storage change detected for key: ${e.key}`);
//         updateUserInfo();
//       }
//     };

//     const handleCustomUpdate = () => {
//       console.log('Custom user info update event received');
//       updateUserInfo();
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('userInfoUpdated', handleCustomUpdate);
//     window.addEventListener('userDataChanged', handleCustomUpdate);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('userInfoUpdated', handleCustomUpdate);
//       window.removeEventListener('userDataChanged', handleCustomUpdate);
//     };
//   }, [updateUserInfo]);

//   // Updated logout handler that properly integrates with AuthContext
//   const handleLogout = useCallback(() => {
//     try {
//       console.log('UserProfileMenu: Starting logout process...');

//       // Reset local state first
//       setUserPlan('Free plan');
//       setUserEmail('');
//       setUserName('');
//       setUserInitials('U');
//       setIsLoading(false);

//       // Use the onLogout prop if provided (from Sidebar component)
//       if (onLogout) {
//         console.log('UserProfileMenu: Using onLogout prop from parent');
//         onLogout();
//         return;
//       }

//       // Fallback: Use AuthContext logout directly
//       if (authLogout) {
//         console.log('UserProfileMenu: Using AuthContext logout');
//         authLogout();
        
//         // Dispatch custom event for any other components listening
//         window.dispatchEvent(new CustomEvent('userLoggedOut'));
        
//         // Navigate to login
//         navigate('/login', { replace: true });
//       } else {
//         // Last resort: Manual cleanup and navigation
//         console.warn('UserProfileMenu: No logout function available, doing manual cleanup');
        
//         const keysToRemove = [
//           'token',
//           'accessToken',
//           'refreshToken',
//           'authToken',
//           'jwt',
//           'user',
//           'userInfo',
//           'userData',
//           'currentUser',
//           'authUser',
//           'auth',
//           'profile',
//           'session',
//           'plan',
//           'subscription',
//           'userPlan',
//           'planInfo',
//         ];

//         keysToRemove.forEach((key) => removeFromStorage(key));
        
//         window.dispatchEvent(new CustomEvent('userLoggedOut'));
//         navigate('/login', { replace: true });
//       }

//       console.log('UserProfileMenu: Logout process completed');
//     } catch (error) {
//       console.error('UserProfileMenu: Error during logout:', error);
//       // Still try to navigate to login even if there's an error
//       navigate('/login', { replace: true });
//     }
//   }, [onLogout, authLogout, navigate, removeFromStorage]);

//   if (isLoading) {
//     return (
//       <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
//         <div className="flex items-center space-x-3 mb-4">
//           <div className="flex-shrink-0">
//             <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
//             <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
//       <div className="flex items-center space-x-3 mb-4">
//         <div
//           className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full text-white font-semibold text-sm shadow-lg transition-colors duration-200 transform hover:-translate-y-0.5 hover:shadow-xl"
//           style={{ backgroundColor: '#21C1B6' }}
//           onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//           onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//         >
//           {userInitials}
//         </div>
//         <div className="flex-1 min-w-0">
//           {userName && <div className="text-sm font-semibold text-gray-900 truncate">{userName}</div>}
//           {userEmail && <div className="text-sm text-gray-600 truncate">{userEmail}</div>}
//           <div className="flex items-center space-x-2 mt-1">
//             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
//               {userPlan}
//             </span>
//             <span className="text-xs text-gray-500">Personal</span>
//           </div>
//         </div>
//         <div className="flex-shrink-0">
//           <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </div>

//       <nav>
//         <ul className="space-y-1">
//           <li>
//             <button onClick={() => navigate('/settings')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//               </svg>
//               Settings
//             </button>
//           </li>
//           <li>
//             <button onClick={() => navigate('/get-help')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//               Get help
//             </button>
//           </li>
//           <li>
//             <button
//               onClick={() => navigate('/subscription-plans')}
//               onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//               onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//               className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
//               style={{ backgroundColor: '#21C1B6' }}
//             >
//               Upgrade plan
//             </button>
//           </li>
//           <li>
//             <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
//               <svg className="h-4 w-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//               </svg>
//               Log out
//             </button>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default UserProfileMenu;



import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const UserProfileMenu = ({ userData, navigate, onLogout }) => {
  const [userPlan, setUserPlan] = useState('Free plan');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('U');
  const [isLoading, setIsLoading] = useState(true);

  const { logout: authLogout } = useAuth(); // Get logout from AuthContext

  // Fetch plan from API
  const fetchPlanFromAPI = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('⚠️ No token found, skipping plan fetch');
        return null;
      }

      console.log('🔄 Fetching plan from API...');
      const response = await fetch('https://gateway-service-110685455967.asia-south1.run.app/user-resources/plan-details', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('❌ Failed to fetch plan from API:', response.status);
        return null;
      }

      const data = await response.json();
      console.log('✅ Fetched plan data from API:', data);

      const activePlan = data.activePlan || data.userSubscription || data.subscription;
      if (activePlan && activePlan.plan_name) {
        const planName = activePlan.plan_name || activePlan.planName || activePlan.name;
        console.log('✅ Plan name from API:', planName);
        
        // Update localStorage with the fetched plan
        try {
          const existingUserInfo = localStorage.getItem('userInfo');
          const userInfoData = existingUserInfo ? JSON.parse(existingUserInfo) : {};
          userInfoData.plan = planName;
          userInfoData.lastFetched = new Date().toISOString();
          localStorage.setItem('userInfo', JSON.stringify(userInfoData));
          console.log('✅ Updated localStorage with plan from API:', planName);
        } catch (storageError) {
          console.error('⚠️ Failed to update localStorage:', storageError);
        }

        return planName;
      }

      return null;
    } catch (error) {
      console.error('❌ Error fetching plan from API:', error);
      return null;
    }
  }, []);

  // Helper function to safely access localStorage
  const getFromStorage = useCallback((key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      }
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
    }
    return null;
  }, []);

  // Helper function to safely set localStorage
  const setToStorage = useCallback((key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting ${key} to localStorage:`, error);
    }
  }, []);

  // Helper function to safely remove from localStorage
  const removeFromStorage = useCallback((key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }, []);

  // Comprehensive function to clear all user-related localStorage
  const clearAllUserData = useCallback(() => {
    try {
      console.log('Starting comprehensive localStorage cleanup...');
      
      // Get all localStorage keys first
      const allKeys = Object.keys(localStorage);
      console.log('All localStorage keys before cleanup:', allKeys);

      // Specific keys that should definitely be removed
      const specificKeysToRemove = [
        'token',
        'accessToken',
        'refreshToken',
        'authToken',
        'jwt',
        'user',
        'userInfo',
        'userData',
        'currentUser',
        'authUser',
        'auth',
        'profile',
        'session',
        'sessionId',
        'plan',
        'subscription',
        'userPlan',
        'planInfo',
        'userSubscription',
        'animatedResponseContent',
        'currentResponse',
        'documentData',
        'fileId',
        'hasResponse',
        'messages',
        'processingStatus',
        'theme', // Only remove if you want to reset theme preference
      ];

      // Remove specific keys
      specificKeysToRemove.forEach((key) => {
        if (localStorage.getItem(key)) {
          removeFromStorage(key);
          console.log(`✅ Removed ${key} from localStorage`);
        }
      });

      // Alternative approach: Remove all keys that contain user-related patterns
      const userRelatedPatterns = [
        'user',
        'auth',
        'token',
        'session',
        'profile',
        'plan',
        'subscription',
        'document',
        'file',
        'message',
        'response',
        'processing',
      ];

      allKeys.forEach((key) => {
        const keyLower = key.toLowerCase();
        const shouldRemove = userRelatedPatterns.some(pattern => 
          keyLower.includes(pattern)
        );
        
        if (shouldRemove && !specificKeysToRemove.includes(key)) {
          removeFromStorage(key);
          console.log(`🔍 Pattern-based removal: ${key}`);
        }
      });

      // Get remaining keys to verify cleanup
      const remainingKeys = Object.keys(localStorage);
      console.log('Remaining localStorage keys after cleanup:', remainingKeys);
      
      // Dispatch storage change event
      window.dispatchEvent(new StorageEvent('storage', {
        key: null,
        oldValue: null,
        newValue: null,
        url: window.location.href
      }));

      console.log('✅ Comprehensive localStorage cleanup completed');
      
    } catch (error) {
      console.error('❌ Error during comprehensive localStorage cleanup:', error);
      
      // If specific removal fails, try nuclear option
      try {
        console.log('🚨 Attempting complete localStorage clear as fallback...');
        localStorage.clear();
        console.log('✅ Complete localStorage clear successful');
      } catch (clearError) {
        console.error('❌ Even localStorage.clear() failed:', clearError);
      }
    }
  }, [removeFromStorage]);

  // Generate initials from name
  const generateInitials = useCallback((name, email) => {
    if (name && name.trim()) {
      const nameParts = name.trim().split(' ').filter(Boolean);
      if (nameParts.length >= 2) {
        return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`.toUpperCase();
      } else if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
      }
    }
    if (email) {
      const emailPart = email.split('@')[0];
      if (emailPart.includes('.')) {
        const parts = emailPart.split('.');
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      } else if (emailPart.includes('_')) {
        const parts = emailPart.split('_');
        return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
      }
      return emailPart.charAt(0).toUpperCase();
    }
    return 'U';
  }, []);

  // Extract display name from email
  const getDisplayNameFromEmail = useCallback((email) => {
    if (!email) return '';
    const emailPart = email.split('@')[0];
    return emailPart
      .replace(/[._-]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())
      .trim();
  }, []);

  // Main function to update user info
  const updateUserInfo = useCallback(async () => {
    setIsLoading(true);
    
    console.log('🔍 UserProfileMenu: Starting updateUserInfo...');
    console.log('📦 Current localStorage keys:', Object.keys(localStorage));
    console.log('📦 localStorage["userInfo"]:', localStorage.getItem('userInfo'));
    console.log('📦 localStorage["user"]:', localStorage.getItem('user'));
    
    let userInfo = null;
    let planInfo = null;

    userInfo = userData || getFromStorage('user');
    if (userInfo) {
      console.log('✅ Found user data in prop or localStorage["user"]:', userInfo);
    } else {
      const userKeys = ['userData', 'currentUser', 'authUser', 'auth', 'profile'];
      for (const key of userKeys) {
        const data = getFromStorage(key);
        if (data && data.id && data.email) {
          userInfo = data;
          console.log(`✅ Found user data in localStorage["${key}"]`, userInfo);
          break;
        }
      }
    }

    planInfo = getFromStorage('userInfo');
    console.log('🔍 Retrieved planInfo from localStorage["userInfo"]:', planInfo);
    
    if (planInfo && planInfo.plan) {
      console.log('✅ Found plan data in localStorage["userInfo"]:', planInfo);
      console.log('📊 Plan value:', planInfo.plan);
    } else {
      console.log('⚠️ No plan in localStorage["userInfo"], checking other keys...');
      const planKeys = ['plan', 'subscription', 'userPlan', 'planInfo', 'userSubscription'];
      for (const key of planKeys) {
        const data = getFromStorage(key);
        if (data) {
          if (typeof data === 'object' && data.plan) {
            planInfo = data;
            console.log(`✅ Found plan data in localStorage["${key}"]`, planInfo);
            break;
          } else if (typeof data === 'string') {
            planInfo = { plan: data };
            console.log(`✅ Found plan as string in localStorage["${key}"]`, data);
            break;
          }
        }
      }
    }

    // If no plan found in localStorage, fetch from API
    if (!planInfo || !planInfo.plan) {
      console.log('🌐 No plan in localStorage, fetching from API...');
      const apiPlan = await fetchPlanFromAPI();
      if (apiPlan) {
        planInfo = { plan: apiPlan };
        console.log('✅ Got plan from API:', apiPlan);
      }
    }

    if (userInfo) {
      const email = userInfo.email || '';
      const name = userInfo.displayName || userInfo.username || getDisplayNameFromEmail(email);
      
      let plan = 'Free plan';
      
      if (planInfo && planInfo.plan) {
        plan = planInfo.plan;
        console.log('✅ Plan set from localStorage["userInfo"]:', plan);
        console.log('📊 Plan details:', { plan: planInfo.plan, lastPayment: planInfo.lastPayment });
      } else if (userInfo.plan) {
        plan = userInfo.plan;
        console.log('✅ Plan set from user.plan:', plan);
      } else if (userInfo.role) {
        const planMap = {
          'admin': 'Admin Plan',
          'premium': 'Premium Plan',
          'pro': 'Pro Plan',
          'plus': 'Plus Plan',
          'free': 'Free Plan',
          'user': 'Free Plan',
        };
        plan = planMap[userInfo.role.toLowerCase()] || 'Free Plan';
        console.log('⚠️ Plan set from user role mapping (fallback):', plan);
      } else {
        console.log('❌ No plan data found, using default:', plan);
      }

      const initials = generateInitials(name, email);

      setUserEmail(email);
      setUserName(name || 'User');
      setUserPlan(plan);
      setUserInitials(initials);

      console.log('🎉 Final user info update:', {
        id: userInfo.id,
        email,
        username: userInfo.username,
        displayName: userInfo.displayName,
        name: name || 'User',
        role: userInfo.role,
        is_blocked: userInfo.is_blocked,
        plan,
        initials,
        lastPayment: planInfo?.lastPayment,
      });
    } else {
      console.log('❌ No user data found in prop or localStorage');
      setUserEmail('');
      setUserName('');
      setUserPlan('Free plan');
      setUserInitials('U');
    }
    
    setIsLoading(false);
  }, [getFromStorage, generateInitials, getDisplayNameFromEmail, userData, fetchPlanFromAPI]);

  useEffect(() => {
    updateUserInfo();

    const handleStorageChange = (e) => {
      const userDataKeys = ['user', 'userInfo', 'userData', 'currentUser', 'authUser', 'auth', 'profile', 'plan', 'subscription', 'userPlan', 'planInfo'];
      if (userDataKeys.includes(e.key)) {
        console.log(`Storage change detected for key: ${e.key}`);
        updateUserInfo();
      }
    };

    const handleCustomUpdate = () => {
      console.log('Custom user info update event received');
      updateUserInfo();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userInfoUpdated', handleCustomUpdate);
    window.addEventListener('userDataChanged', handleCustomUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userInfoUpdated', handleCustomUpdate);
      window.removeEventListener('userDataChanged', handleCustomUpdate);
    };
  }, [updateUserInfo]);

  // Enhanced logout handler with comprehensive localStorage clearing
  const handleLogout = useCallback(() => {
    try {
      console.log('🚀 UserProfileMenu: Starting enhanced logout process...');

      // Reset local state first
      setUserPlan('Free plan');
      setUserEmail('');
      setUserName('');
      setUserInitials('U');
      setIsLoading(false);

      // Comprehensive localStorage cleanup
      clearAllUserData();

      // Dispatch custom events for any other components listening
      window.dispatchEvent(new CustomEvent('userLoggedOut'));
      window.dispatchEvent(new CustomEvent('userDataCleared'));

      // Use the onLogout prop if provided (from Sidebar component)
      if (onLogout) {
        console.log('📤 UserProfileMenu: Using onLogout prop from parent');
        try {
          onLogout();
        } catch (onLogoutError) {
          console.error('❌ Error in onLogout prop:', onLogoutError);
        }
      }

      // Use AuthContext logout if available
      if (authLogout) {
        console.log('🔐 UserProfileMenu: Using AuthContext logout');
        try {
          authLogout();
        } catch (authLogoutError) {
          console.error('❌ Error in AuthContext logout:', authLogoutError);
        }
      }

      // Always navigate to login regardless of which logout method was used
      console.log('🔄 UserProfileMenu: Navigating to login page');
      navigate('/login', { replace: true });

      console.log('✅ UserProfileMenu: Enhanced logout process completed successfully');
    } catch (error) {
      console.error('❌ UserProfileMenu: Error during logout:', error);
      
      // Even if there's an error, try to clear localStorage and navigate
      try {
        console.log('🚨 UserProfileMenu: Attempting emergency cleanup...');
        localStorage.clear(); // Nuclear option
        console.log('✅ UserProfileMenu: Emergency localStorage clear successful');
      } catch (clearError) {
        console.error('❌ UserProfileMenu: Even emergency clear failed:', clearError);
      }
      
      // Still navigate to login
      navigate('/login', { replace: true });
    }
  }, [onLogout, authLogout, navigate, clearAllUserData]);

  if (isLoading) {
    return (
      <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-shrink-0">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-b border-gray-200 bg-white relative z-[9999]">
      <div className="flex items-center space-x-3 mb-4">
        <div
          className="flex-shrink-0 inline-flex items-center justify-center h-10 w-10 rounded-full text-white font-semibold text-sm shadow-lg transition-colors duration-200 transform hover:-translate-y-0.5 hover:shadow-xl"
          style={{ backgroundColor: '#21C1B6' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
        >
          {userInitials}
        </div>
        <div className="flex-1 min-w-0">
          {userName && <div className="text-sm font-semibold text-gray-900 truncate">{userName}</div>}
          {userEmail && <div className="text-sm text-gray-600 truncate">{userEmail}</div>}
          <div className="flex items-center space-x-2 mt-1">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {userPlan}
            </span>
            <span className="text-xs text-gray-500">Personal</span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <nav>
        <ul className="space-y-1">
          <li>
            <button onClick={() => navigate('/settings')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/get-help')} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <svg className="h-4 w-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Get help
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/subscription-plans')}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
              className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-white rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              style={{ backgroundColor: '#21C1B6' }}
            >
              Upgrade plan
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="flex items-center w-full px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors">
              <svg className="h-4 w-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Log out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default UserProfileMenu;