// import React from 'react';
// import { Calendar, Lightbulb, FileEdit } from 'lucide-react';

// const DashboardInsights = ({ insights }) => {
//   return (
//     <div className="mb-8">
//       <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h2>
//       <div className="grid grid-cols-3 gap-6">
//         {insights.map((insight, index) => (
//           <div 
//             key={index}
//             className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-start gap-3 mb-4">
//               <div 
//                 className="p-2 rounded-lg text-white"
//                 style={{ backgroundColor: insight.color }}
//               >
//                 {insight.icon}
//               </div>
//               <h3 className="font-semibold text-gray-900 flex-1">{insight.title}</h3>
//             </div>
//             <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
//             <button 
//               className="text-sm font-medium flex items-center gap-1 transition-colors"
//               style={{ color: '#21C1B6' }}
//               onMouseEnter={(e) => (e.currentTarget.style.color = '#1AA49B')}
//               onMouseLeave={(e) => (e.currentTarget.style.color = '#21C1B6')}
//             >
//               {insight.action} →
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardInsights;



import React from 'react';

const DashboardInsights = ({ insights }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights & Recommendations</h2>
      <div className="grid grid-cols-3 gap-6">
        {insights.map((insight, index) => (
          <div 
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-4">
              <div 
                className="p-2 rounded-lg text-white"
                style={{ backgroundColor: insight.color }}
              >
                {insight.icon}
              </div>
              <h3 className="font-semibold text-gray-900 flex-1">{insight.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{insight.description}</p>
            <button 
              className="text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer"
              style={{ color: '#21C1B6' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1AA49B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#21C1B6')}
              onClick={insight.onClick} // Add onClick handler
            >
              {insight.action} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardInsights;