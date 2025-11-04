// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import NexintelLogo from '../assets/nexintel.jpg';

// const PublicHeader = () => {
//   const handleLogin = () => {
//     // This will be handled by the PublicLayout or a global context
//     // For now, we'll just navigate
//     window.location.href = '/login'; 
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-100">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-2">
//             <Link to="/">
//               <img src={NexintelLogo} alt="Nexintel AI Logo" className="h-8 w-auto" />
//             </Link>
//           </div>
          
//           <div className="hidden md:flex items-center space-x-8 ml-auto mr-8">
//             <Link to="/" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</Link>
//             <Link to="/services" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Services</Link>
//             <Link to="/pricing" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Pricing</Link>
//             <Link to="/AboutUs" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">AboutUs</Link>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={handleLogin}
//             className="text-white text-sm font-medium px-5 py-2 rounded-md transition-all"
//             style={{ backgroundColor: '#21C1B6' }}
//             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1AA49B'}
//             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#21C1B6'}
//           >
//             Login
//           </motion.button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default PublicHeader;



import React from 'react';
import NexintelLogo from '../assets/nexintel.jpg';

const PublicHeader = () => {
  const handleNavigation = (path) => {
    // Handle navigation - in a real app, this would use your router
    console.log(`Navigating to: ${path}`);
    window.location.href = path;
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleNavigation('/')}
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-md"
            >
              <img src={NexintelLogo} alt="Nexintel AI Logo" className="h-8 w-auto" />
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 ml-auto mr-8">
            <button 
              onClick={() => handleNavigation('/')} 
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigation('/services')} 
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => handleNavigation('/pricing')} 
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => handleNavigation('/about-us')} 
              className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About Us
            </button>
          </div>

          <button
            onClick={handleLogin}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
            className="text-white text-sm font-medium px-5 py-2 rounded-md transition-all transform hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: '#21C1B6',
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PublicHeader;
