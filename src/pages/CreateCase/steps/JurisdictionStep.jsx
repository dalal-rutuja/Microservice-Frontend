// import React, { useState } from 'react';
// import { Building2, CheckCircle, X } from 'lucide-react';

// const JurisdictionStep = ({ caseData, setCaseData }) => {
//   const [judges, setJudges] = useState(caseData.judges || []);

//   const addJudge = (judgeName) => {
//     if (judgeName && !judges.includes(judgeName)) {
//       const newJudges = [...judges, judgeName];
//       setJudges(newJudges);
//       setCaseData({ ...caseData, judges: newJudges });
//     }
//   };

//   const removeJudge = (judgeToRemove) => {
//     const newJudges = judges.filter(judge => judge !== judgeToRemove);
//     setJudges(newJudges);
//     setCaseData({ ...caseData, judges: newJudges });
//   };

//   const handleJudgeSelect = (e) => {
//     const selectedJudge = e.target.value;
//     if (selectedJudge) {
//       addJudge(selectedJudge);
//       e.target.value = ''; // Reset select
//     }
//   };

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-start mb-6">
//         <Building2 className="w-6 h-6 mr-3 text-gray-700 mt-1" />
//         <div>
//           <h3 className="text-xl font-semibold text-gray-900">Court & Jurisdiction Details</h3>
//           <p className="text-sm text-gray-600 mt-1">Tell us where this case will be heard.</p>
//         </div>
//       </div>

//       {/* Form Fields */}
//       <div className="space-y-6">
//         {/* Court Level and Bench/Division */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Court Level <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={caseData.courtLevel}
//               onChange={(e) => setCaseData({ ...caseData, courtLevel: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
//             >
//               <option value="">Select court level</option>
//               <option value="High Court">High Court</option>
//               <option value="Supreme Court">Supreme Court</option>
//               <option value="District Court">District Court</option>
//               <option value="Magistrate Court">Magistrate Court</option>
//             </select>
//             <p className="text-xs text-gray-500 mt-1">Auto-filled based on case type</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Bench / Division <span className="text-red-500">*</span>
//             </label>
//             <select
//               value={caseData.benchDivision}
//               onChange={(e) => setCaseData({ ...caseData, benchDivision: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm text-gray-500"
//             >
//               <option value="">Select bench or division...</option>
//               <option value="Civil Division">Civil Division</option>
//               <option value="Criminal Division">Criminal Division</option>
//               <option value="Constitutional Bench">Constitutional Bench</option>
//               <option value="Single Bench">Single Bench</option>
//               <option value="Division Bench">Division Bench</option>
//             </select>
//           </div>
//         </div>

//         {/* Jurisdiction and State */}
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Jurisdiction</label>
//             <input
//               type="text"
//               value={caseData.jurisdiction}
//               onChange={(e) => setCaseData({ ...caseData, jurisdiction: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm bg-gray-50"
//               placeholder="Delhi"
//             />
//             <p className="text-xs text-gray-500 mt-1">Auto-filled based on selected court</p>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//             <input
//               type="text"
//               value={caseData.state}
//               onChange={(e) => setCaseData({ ...caseData, state: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm bg-gray-50"
//               placeholder="Delhi"
//             />
//             <p className="text-xs text-gray-500 mt-1">Auto-filled</p>
//           </div>
//         </div>

//         {/* Judge(s) Name */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Judge(s) Name</label>
//           <select
//             onChange={handleJudgeSelect}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm text-gray-500"
//           >
//             <option value="">Select presiding judge(s)...</option>
//             <option value="Justice Rajesh Kumar">Justice Rajesh Kumar</option>
//             <option value="Justice Priya Sharma">Justice Priya Sharma</option>
//             <option value="Justice Amit Verma">Justice Amit Verma</option>
//             <option value="Justice Sanjay Mehta">Justice Sanjay Mehta</option>
//             <option value="Justice Kavita Singh">Justice Kavita Singh</option>
//           </select>
          
//           {/* Selected Judges Tags */}
//           {judges.length > 0 && (
//             <div className="flex flex-wrap gap-2 mt-3">
//               {judges.map((judge, index) => (
//                 <span
//                   key={index}
//                   className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
//                 >
//                   {judge}
//                   <button
//                     onClick={() => removeJudge(judge)}
//                     className="ml-2 text-gray-500 hover:text-gray-700"
//                   >
//                     <X className="w-3 h-3" />
//                   </button>
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Court Room No. */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             Court Room No. (Optional)
//           </label>
//           <input
//             type="text"
//             placeholder="Enter court room number"
//             value={caseData.courtRoom}
//             onChange={(e) => setCaseData({ ...caseData, courtRoom: e.target.value })}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-gray-400 focus:border-gray-400 text-sm"
//           />
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

// export default JurisdictionStep;



import React, { useState } from 'react';
import { Building2, CheckCircle, X } from 'lucide-react';

const JurisdictionStep = ({ caseData, setCaseData }) => {
  const [judges, setJudges] = useState(caseData.judges || []);

  const addJudge = (judgeName) => {
    if (judgeName && !judges.includes(judgeName)) {
      const newJudges = [...judges, judgeName];
      setJudges(newJudges);
      setCaseData({ ...caseData, judges: newJudges });
    }
  };

  const removeJudge = (judgeToRemove) => {
    const newJudges = judges.filter((judge) => judge !== judgeToRemove);
    setJudges(newJudges);
    setCaseData({ ...caseData, judges: newJudges });
  };

  const handleJudgeSelect = (e) => {
    const selectedJudge = e.target.value;
    if (selectedJudge) {
      addJudge(selectedJudge);
      e.target.value = ''; // Reset select
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-start mb-6">
        <Building2 className="w-6 h-6 mr-3 text-gray-700 mt-1" />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Court & Jurisdiction Details
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Tell us where this case will be heard.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Court Level and Bench/Division */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Court Level <span className="text-red-500">*</span>
            </label>
            <select
              value={caseData.courtLevel}
              onChange={(e) =>
                setCaseData({ ...caseData, courtLevel: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
            >
              <option value="">Select court level</option>
              <option value="High Court">High Court</option>
              <option value="Supreme Court">Supreme Court</option>
              <option value="District Court">District Court</option>
              <option value="Magistrate Court">Magistrate Court</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Auto-filled based on case type
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bench / Division <span className="text-red-500">*</span>
            </label>
            <select
              value={caseData.benchDivision}
              onChange={(e) =>
                setCaseData({ ...caseData, benchDivision: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
            >
              <option value="">Select bench or division...</option>
              <option value="Civil Division">Civil Division</option>
              <option value="Criminal Division">Criminal Division</option>
              <option value="Constitutional Bench">
                Constitutional Bench
              </option>
              <option value="Single Bench">Single Bench</option>
              <option value="Division Bench">Division Bench</option>
            </select>
          </div>
        </div>

        {/* Jurisdiction and State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jurisdiction
            </label>
            <input
              type="text"
              value={caseData.jurisdiction}
              onChange={(e) =>
                setCaseData({ ...caseData, jurisdiction: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] bg-gray-100 outline-none"
              placeholder="Delhi"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-filled based on selected court
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State
            </label>
            <input
              type="text"
              value={caseData.state}
              onChange={(e) =>
                setCaseData({ ...caseData, state: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] bg-gray-100 outline-none"
              placeholder="Delhi"
              disabled
            />
            <p className="text-xs text-gray-500 mt-1">Auto-filled</p>
          </div>
        </div>

        {/* Judge(s) Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Judge(s) Name
          </label>
          <select
            onChange={handleJudgeSelect}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
          >
            <option value="">Select presiding judge(s)...</option>
            <option value="Justice Rajesh Kumar">Justice Rajesh Kumar</option>
            <option value="Justice Priya Sharma">Justice Priya Sharma</option>
            <option value="Justice Amit Verma">Justice Amit Verma</option>
            <option value="Justice Sanjay Mehta">Justice Sanjay Mehta</option>
            <option value="Justice Kavita Singh">Justice Kavita Singh</option>
          </select>

          {/* Selected Judges Tags */}
          {judges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {judges.map((judge, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {judge}
                  <button
                    onClick={() => removeJudge(judge)}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Court Room No. */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Court Room No. (Optional)
          </label>
          <input
            type="text"
            placeholder="Enter court room number"
            value={caseData.courtRoom}
            onChange={(e) =>
              setCaseData({ ...caseData, courtRoom: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-[#9CDFE1] focus:border-[#9CDFE1] outline-none"
          />
        </div>

        {/* Auto-saved indicator */}
        {/* <div className="flex items-center text-sm text-green-600 mt-4">
          <CheckCircle className="w-4 h-4 mr-1" />
          <span>Auto-saved</span>
        </div> */}
      </div>
    </div>
  );
};

export default JurisdictionStep;
