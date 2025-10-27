import React, { useEffect, useState } from 'react';

const DashboardHeader = () => {
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.username || 'User');
    }
  }, []);

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-2xl font-semibold text-gray-900">Hello, {userName}</h1>
      {/* <button 
        className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
        style={{ backgroundColor: '#21C1B6' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
      >
        Create New Case
      </button> */}
    </div>
  );
};

export default DashboardHeader;