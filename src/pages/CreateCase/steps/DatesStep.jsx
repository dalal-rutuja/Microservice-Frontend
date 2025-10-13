// import React, { useState } from 'react';
// import { FolderPlus, CheckCircle, Sparkles } from 'lucide-react';

// const DatesStep = ({ caseData, setCaseData }) => {
//   const [autoRemind, setAutoRemind] = useState(false);

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-start mb-6">
//         <FolderPlus className="w-6 h-6 mr-3 text-gray-700 mt-1" />
//         <div>
//           <h3 className="text-xl font-semibold text-gray-900">Important Dates & Status</h3>
//           <p className="text-sm text-gray-600 mt-1">Track case milestones and deadlines.</p>
//         </div>
//       </div>

//       {/* Form Fields */}
//       <div className="space-y-6">
//         {/* Registration Date and First Hearing Date */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Registration Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               value={caseData.registrationDate || ''}
//               onChange={(e) => setCaseData({ ...caseData, registrationDate: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               First Hearing Date <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="date"
//               value={caseData.firstHearingDate || ''}
//               onChange={(e) => setCaseData({ ...caseData, firstHearingDate: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
//             />
//           </div>
//         </div>

//         {/* Expected Disposal Date and Current Case Status */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Expected Disposal Date
//             </label>
//             <input
//               type="date"
//               value={caseData.expectedDisposalDate || ''}
//               onChange={(e) => setCaseData({ ...caseData, expectedDisposalDate: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
//             />
//             <p className="text-xs text-gray-500 mt-1">Optional - Estimated timeline</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Current Case Status <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={caseData.currentStatus || ''}
//               onChange={(e) => setCaseData({ ...caseData, currentStatus: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm text-gray-500"
//             >
//               <option value="">Select current status...</option>
//               <option value="Filed">Filed</option>
//               <option value="Pending">Pending</option>
//               <option value="Under Hearing">Under Hearing</option>
//               <option value="Awaiting Judgment">Awaiting Judgment</option>
//               <option value="Disposed">Disposed</option>
//               <option value="Closed">Closed</option>
//             </select>
//           </div>
//         </div>

//         {/* Auto-remind Checkbox */}
//         <div className="flex items-start">
//           <input
//             type="checkbox"
//             id="autoRemind"
//             checked={autoRemind}
//             onChange={(e) => setAutoRemind(e.target.checked)}
//             className="mt-1 w-4 h-4 text-gray-600 border-gray-300 rounded focus:ring-gray-400"
//           />
//           <label htmlFor="autoRemind" className="ml-3">
//             <div className="text-sm font-medium text-gray-700">Auto-remind me about hearings</div>
//             <p className="text-xs text-gray-500">Get notifications 24 hours before scheduled hearings</p>
//           </label>
//         </div>

//         {/* Mini Timeline Preview */}
//         <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
//           <div className="flex items-center mb-3">
//             <Sparkles className="w-4 h-4 mr-2 text-gray-600" />
//             <h4 className="text-sm font-semibold text-gray-700">Mini Timeline Preview</h4>
//           </div>
          
//           <div className="space-y-3">
//             {/* Case Registration */}
//             <div className="flex items-start">
//               <div className="flex flex-col items-center mr-3 mt-1">
//                 <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
//                 {caseData.firstHearingDate && <div className="w-0.5 h-8 bg-gray-300"></div>}
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-900">Case Registration</p>
//                 <p className="text-xs text-gray-500">
//                   {caseData.registrationDate 
//                     ? new Date(caseData.registrationDate).toLocaleDateString('en-IN', {
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric'
//                       }) + ' - Date will appear after selection'
//                     : 'Date will appear after selection'}
//                 </p>
//               </div>
//             </div>

//             {/* First Hearing */}
//             <div className="flex items-start">
//               <div className="flex flex-col items-center mr-3 mt-1">
//                 <div className={`w-2 h-2 rounded-full ${caseData.firstHearingDate ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
//                 {caseData.expectedDisposalDate && <div className="w-0.5 h-8 bg-gray-300"></div>}
//               </div>
//               <div className="flex-1">
//                 <p className={`text-sm font-medium ${caseData.firstHearingDate ? 'text-gray-900' : 'text-gray-400'}`}>
//                   First Hearing
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {caseData.firstHearingDate 
//                     ? new Date(caseData.firstHearingDate).toLocaleDateString('en-IN', {
//                         day: 'numeric',
//                         month: 'short',
//                         year: 'numeric'
//                       }) + ' - Date will appear after selection'
//                     : 'Date will appear after selection'}
//                 </p>
//               </div>
//             </div>

//             {/* Expected Disposal */}
//             <div className="flex items-start">
//               <div className="flex flex-col items-center mr-3 mt-1">
//                 <div className={`w-2 h-2 rounded-full ${caseData.expectedDisposalDate ? 'bg-gray-800' : 'bg-gray-300'}`}></div>
//               </div>
//               <div className="flex-1">
//                 <p className={`text-sm font-medium ${caseData.expectedDisposalDate ? 'text-gray-900' : 'text-gray-400'}`}>
//                   Expected Disposal
//                 </p>
//                 <p className="text-xs text-gray-500">Optional milestone</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Auto-saved indicator */}
//         <div className="flex items-center text-sm text-green-600 mt-4">
//           <CheckCircle className="w-4 h-4 mr-1" />
//           <span>Auto-saved</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DatesStep;


import React, { useState } from 'react';
import { FolderPlus, CheckCircle, Sparkles } from 'lucide-react';

const DatesStep = ({ caseData, setCaseData }) => {
  const [autoRemind, setAutoRemind] = useState(false);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start mb-6">
        <FolderPlus className="w-6 h-6 mr-3 text-gray-700 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Important Dates & Status</h3>
          <p className="text-sm text-gray-600 mt-1">Track case milestones and deadlines.</p>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-6">
        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Registration Date', key: 'registrationDate', required: true },
            { label: 'First Hearing Date', key: 'firstHearingDate', required: true },
          ].map(({ label, key, required }) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                type="date"
                value={caseData[key] || ''}
                onChange={(e) => setCaseData({ ...caseData, [key]: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
              />
            </div>
          ))}
        </div>

        {/* Expected Disposal + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expected Disposal Date</label>
            <input
              type="date"
              value={caseData.expectedDisposalDate || ''}
              onChange={(e) => setCaseData({ ...caseData, expectedDisposalDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Optional - Estimated timeline</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Case Status <span className="text-red-500">*</span>
            </label>
            <select
              value={caseData.currentStatus || ''}
              onChange={(e) => setCaseData({ ...caseData, currentStatus: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
            >
              <option value="">Select current status...</option>
              <option value="Filed">Filed</option>
              <option value="Pending">Pending</option>
              <option value="Under Hearing">Under Hearing</option>
              <option value="Awaiting Judgment">Awaiting Judgment</option>
              <option value="Disposed">Disposed</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Auto Remind */}
        <div className="flex items-start">
          <input
            type="checkbox"
            id="autoRemind"
            checked={autoRemind}
            onChange={(e) => setAutoRemind(e.target.checked)}
            className="mt-1 w-4 h-4 text-[#9CDFE1] border-gray-300 rounded focus:ring-[#9CDFE1]"
          />
          <label htmlFor="autoRemind" className="ml-3">
            <div className="text-sm font-medium text-gray-700">Auto-remind me about hearings</div>
            <p className="text-xs text-gray-500">
              Get notifications 24 hours before scheduled hearings
            </p>
          </label>
        </div>

        {/* Auto-saved */}
        {/* <div className="flex items-center text-sm text-green-600 mt-4">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span>Auto-saved</span>
        </div> */}
      </div>
    </div>
  );
};

export default DatesStep;
