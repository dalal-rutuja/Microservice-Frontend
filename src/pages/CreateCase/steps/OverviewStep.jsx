// import React from 'react';
// import { Scale, CheckCircle } from 'lucide-react';

// const OverviewStep = ({ caseData, setCaseData }) => {
//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-start mb-6">
//         <Scale className="w-6 h-6 mr-3 text-gray-700 mt-1" />
//         <div>
//           <h3 className="text-xl font-semibold text-gray-900">Create New Case</h3>
//           <p className="text-sm text-gray-600 mt-1">Let's start with the basic details for your case.</p>
//         </div>
//       </div>

//       {/* Form Fields */}
//       <div className="space-y-6">
//         {/* Case Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Case Title / Name<span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             placeholder="Enter case title or name"
//             value={caseData.caseTitle}
//             onChange={(e) => setCaseData({ ...caseData, caseTitle: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
//           />
//         </div>

//         {/* Case Type and Sub-Type */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Case Type<span className="text-red-500">*</span>
//             </label>
//             <select
//               value={caseData.caseType}
//               onChange={(e) => setCaseData({ ...caseData, caseType: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm text-gray-500"
//             >
//               <option value="">Select case type...</option>
//               <option value="Civil">Civil</option>
//               <option value="Criminal">Criminal</option>
//               <option value="Commercial">Commercial</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Type</label>
//             <select
//               value={caseData.subType}
//               onChange={(e) => setCaseData({ ...caseData, subType: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm text-gray-500"
//               disabled={!caseData.caseType}
//             >
//               <option value="">Select sub-type...</option>
//               <option value="Property Dispute">Property Dispute</option>
//               <option value="Contract Breach">Contract Breach</option>
//               <option value="Fraud">Fraud</option>
//               <option value="Theft">Theft</option>
//             </select>
//             {!caseData.caseType && (
//               <p className="text-xs text-gray-500 mt-1">Available after selecting case type</p>
//             )}
//           </div>
//         </div>

//         {/* Case Number and Court Name */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Case Number</label>
//             <input
//               type="text"
//               placeholder="Enter case number (if available)"
//               value={caseData.caseNumber}
//               onChange={(e) => setCaseData({ ...caseData, caseNumber: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
//             />
//             <p className="text-xs text-gray-500 mt-1">Optional for new filings</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Court Name<span className="text-red-500">*</span>
//             </label>
//             <select
//               value={caseData.courtName}
//               onChange={(e) => setCaseData({ ...caseData, courtName: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm text-gray-500"
//             >
//               <option value="">Select court...</option>
//               <option value="Delhi High Court">Delhi High Court</option>
//               <option value="Supreme Court">Supreme Court</option>
//               <option value="District Court">District Court</option>
//               <option value="Mumbai High Court">Mumbai High Court</option>
//               <option value="Kolkata High Court">Kolkata High Court</option>
//             </select>
//           </div>
//         </div>

//         {/* Filing Date */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Filing Date</label>
//           <input
//             type="date"
//             value={caseData.filingDate}
//             onChange={(e) => setCaseData({ ...caseData, filingDate: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
//           />
//         </div>

//         {/* Auto-saved indicator */}
//         <div className="flex items-center text-sm text-green-600 mt-4">
//           <CheckCircle className="w-4 h-4 mr-1" />
//           <span>Auto-saved</span>
//         </div>
//       </div>

//       {/* Footer note */}
//       <div className="mt-6 pt-4 border-t border-gray-200">
//         <p className="text-sm text-gray-500">All fields marked with * are required</p>
//       </div>
//     </div>
//   );
// };

// export default OverviewStep;


import React from 'react';
import { Scale, CheckCircle } from 'lucide-react';

const OverviewStep = ({ caseData, setCaseData }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-start mb-6">
        <Scale className="w-6 h-6 mr-3 text-gray-700 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Create New Case</h3>
          <p className="text-sm text-gray-600 mt-1">Let's start with the basic details for your case.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Case Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Case Title / Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter case title or name"
            value={caseData.caseTitle}
            onChange={(e) => setCaseData({ ...caseData, caseTitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
          />
        </div>

        {/* Case Type and Sub-Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Case Type<span className="text-red-500">*</span>
            </label>
            <select
              value={caseData.caseType}
              onChange={(e) => setCaseData({ ...caseData, caseType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
            >
              <option value="">Select case type...</option>
              <option value="Civil">Civil</option>
              <option value="Criminal">Criminal</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sub-Type</label>
            <select
              value={caseData.subType}
              onChange={(e) => setCaseData({ ...caseData, subType: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none disabled:bg-gray-100 disabled:text-gray-400"
              disabled={!caseData.caseType}
            >
              <option value="">Select sub-type...</option>
              <option value="Property Dispute">Property Dispute</option>
              <option value="Contract Breach">Contract Breach</option>
              <option value="Fraud">Fraud</option>
              <option value="Theft">Theft</option>
            </select>
            {!caseData.caseType && (
              <p className="text-xs text-gray-500 mt-1">Available after selecting case type</p>
            )}
          </div>
        </div>

        {/* Case Number and Court Name */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Case Number</label>
            <input
              type="text"
              placeholder="Enter case number (if available)"
              value={caseData.caseNumber}
              onChange={(e) => setCaseData({ ...caseData, caseNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">Optional for new filings</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Court Name<span className="text-red-500">*</span>
            </label>
            <select
              value={caseData.courtName}
              onChange={(e) => setCaseData({ ...caseData, courtName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
            >
              <option value="">Select court...</option>
              <option value="Delhi High Court">Delhi High Court</option>
              <option value="Supreme Court">Supreme Court</option>
              <option value="District Court">District Court</option>
              <option value="Mumbai High Court">Mumbai High Court</option>
              <option value="Kolkata High Court">Kolkata High Court</option>
            </select>
          </div>
        </div>

        {/* Filing Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filing Date</label>
          <input
            type="date"
            value={caseData.filingDate}
            onChange={(e) => setCaseData({ ...caseData, filingDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
          />
        </div>


      </div>

      {/* Footer note */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">All fields marked with * are required</p>
      </div>
    </div>
  );
};

export default OverviewStep;
