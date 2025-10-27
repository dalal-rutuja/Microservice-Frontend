

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Eye, Edit2, Trash2 } from 'lucide-react';
// import documentApi from '../../services/documentApi';

// const DashboardCasesTable = () => {
//   const [cases, setCases] = useState([]);
//   const [advocateName, setAdvocateName] = useState('');
//   const [filteredCases, setFilteredCases] = useState([]);
//   const [activeTab, setActiveTab] = useState('ongoing');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const fetchCases = async () => {
//     try {
//       setLoading(true);
//       const response = await documentApi.getCases();
//       const casesData = response.cases;
//       if (Array.isArray(casesData)) {
//         setCases(casesData);
//         filterCasesByTab(casesData, activeTab);
//       } else {
//         console.error("API returned non-array data for cases:", response);
//         setCases([]);
//         setFilteredCases([]);
//       }
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterCasesByTab = (casesData, tab) => {
//     let filtered = [];
//     switch(tab) {
//       case 'ongoing':
//         // Show Active and Pending cases
//         filtered = casesData.filter(c => 
//           c.status === 'Active' || c.status === 'Pending'
//         );
//         break;
//       case 'disposed':
//         // Show Disposed, Completed, and Closed cases
//         filtered = casesData.filter(c => 
//           c.status === 'Disposed' || c.status === 'Completed' || c.status === 'Closed'
//         );
//         break;
//       default:
//         filtered = casesData;
//     }
//     setFilteredCases(filtered);
//   };

//   useEffect(() => {
//     fetchCases();
//     const storedUserName = localStorage.getItem('userName'); // Assuming 'userName' is the key
//     if (storedUserName) {
//       setAdvocateName(storedUserName);
//     }
//   }, []);

//   useEffect(() => {
//     filterCasesByTab(cases, activeTab);
//   }, [activeTab, cases]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleViewCase = (caseId) => {
//     navigate(`/cases/${caseId}`);
//   };

//   const handleUpdateStatus = async (caseId, currentStatus) => {
//     const statusOptions = ['Active', 'Pending', 'Inactive', 'Disposed'];
//     const newStatus = prompt(
//       `Current status: ${currentStatus}\n\nEnter new status:\n- Active\n- Pending\n- Inactive\n- Disposed`,
//       currentStatus
//     );
    
//     if (newStatus && newStatus !== currentStatus) {
//       if (!statusOptions.includes(newStatus)) {
//         alert('Invalid status. Please choose: Active, Pending, Inactive, or Disposed');
//         return;
//       }
      
//       try {
//         await documentApi.updateCase(caseId, { status: newStatus });
//         fetchCases();
//         alert(`Case status updated to ${newStatus}`);
//       } catch (err) {
//         console.error("Error updating case status:", err);
//         alert(`Failed to update case status: ${err.message}`);
//       }
//     }
//   };

//   const handleDeleteCase = async (caseId) => {
//     if (window.confirm(`Are you sure you want to delete this case? This action cannot be undone.`)) {
//       try {
//         await documentApi.deleteCase(caseId);
//         fetchCases();
//         alert('Case deleted successfully.');
//       } catch (err) {
//         console.error("Error deleting case:", err);
//         alert(`Failed to delete case: ${err.message}`);
//       }
//     }
//   };

//   const getOngoingCount = () => {
//     return cases.filter(c => c.status === 'Active' || c.status === 'Pending').length;
//   };

//   const getDisposedCount = () => {
//     return cases.filter(c => 
//       c.status === 'Disposed' || c.status === 'Completed' || c.status === 'Closed'
//     ).length;
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="text-gray-600">Loading cases...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//         <p className="text-red-600">Error loading cases: {error.message}</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold text-gray-900">
//           Cases {advocateName && <span className="text-gray-600 text-sm">({advocateName})</span>}
//         </h2>
//       </div>

//       <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
//         <div className="flex border-b border-gray-200">
//           <button
//             onClick={() => handleTabChange('ongoing')}
//             className={`px-6 py-3 font-medium text-sm transition-colors ${
//               activeTab === 'ongoing'
//                 ? 'text-[#21C1B6] border-b-2 border-[#21C1B6]'
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             Ongoing ({getOngoingCount()})
//           </button>
//           <button
//             onClick={() => handleTabChange('disposed')}
//             className={`px-6 py-3 font-medium text-sm transition-colors ${
//               activeTab === 'disposed'
//                 ? 'text-[#21C1B6] border-b-2 border-[#21C1B6]'
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//           >
//             Disposed ({getDisposedCount()})
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                   Case No.
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                   Court/Bench
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                   Case Type/Stage
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                   Client/Opponent
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                   Status
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredCases.length === 0 ? (
//                 <tr>
//                   <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
//                     No cases found in this category
//                   </td>
//                 </tr>
//               ) : (
//                 filteredCases.map((caseItem) => (
//                   <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                       {caseItem.case_number}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {caseItem.court_name}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                       {caseItem.case_type}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {caseItem.petitioners ? caseItem.petitioners.join(', ') : 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         caseItem.status === 'Active'
//                           ? 'bg-green-100 text-green-800'
//                           : caseItem.status === 'Pending'
//                           ? 'bg-yellow-100 text-yellow-800'
//                           : caseItem.status === 'Disposed' || caseItem.status === 'Completed'
//                           ? 'bg-blue-100 text-blue-800'
//                           : 'bg-gray-100 text-gray-800'
//                       }`}>
//                         {caseItem.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm">
//                       <div className="flex items-center gap-3">
//                         <button
//                           onClick={() => handleViewCase(caseItem.id)}
//                           className="text-indigo-600 hover:text-indigo-900 transition-colors"
//                           title="View Case"
//                         >
//                           <Eye size={18} />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteCase(caseItem.id)}
//                           className="text-red-600 hover:text-red-900 transition-colors"
//                           title="Delete Case"
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCasesTable;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import documentApi from '../../services/documentApi';
import axios from 'axios';

const DashboardCasesTable = () => {
  const [cases, setCases] = useState([]);
  const [advocateName, setAdvocateName] = useState('');
  const [filteredCases, setFilteredCases] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Lookup tables for mapping IDs to names
  const [courtsMap, setCourtsMap] = useState({});
  const [caseTypesMap, setCaseTypesMap] = useState({});
  
  const navigate = useNavigate();

  // Fetch lookup data from your PostgreSQL API
  const fetchLookupData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      // Fetch courts from your PostgreSQL endpoint
      try {
        const courtsResponse = await axios.get('http://localhost:5000/api/courts', { headers });
        const courts = Array.isArray(courtsResponse.data) ? courtsResponse.data : [];
        
        // Create a map of court ID to court name
        const courtsMapping = {};
        courts.forEach(court => {
          // PostgreSQL returns lowercase column names
          const courtId = court.id;
          const courtName = court.court_name || court.name || `Court ${courtId}`;
          if (courtId) {
            courtsMapping[courtId] = courtName;
          }
        });
        setCourtsMap(courtsMapping);
        console.log('Courts mapping created:', courtsMapping);
      } catch (err) {
        console.error('Error fetching courts:', err);
      }
      
      // Fetch case types from your PostgreSQL endpoint
      try {
        const caseTypesResponse = await axios.get('http://localhost:5000/api/case-types', { headers });
        const caseTypes = Array.isArray(caseTypesResponse.data) ? caseTypesResponse.data : [];
        
        // Create a map of case type ID to case type name
        const caseTypesMapping = {};
        caseTypes.forEach(type => {
          // PostgreSQL returns lowercase column names
          const typeId = type.id;
          const typeName = type.case_type_name || type.name || type.type_name || `Type ${typeId}`;
          if (typeId) {
            caseTypesMapping[typeId] = typeName;
          }
        });
        setCaseTypesMap(caseTypesMapping);
        console.log('Case types mapping created:', caseTypesMapping);
      } catch (err) {
        console.error('Error fetching case types:', err);
      }
      
    } catch (err) {
      console.error('Error in fetchLookupData:', err);
      // Continue even if lookup fails - we'll show IDs as fallback
    }
  };

  // Helper function to get court name from ID or object
  const getCourtDisplay = (caseItem) => {
    // PostgreSQL typically returns lowercase column names
    const courtName = caseItem.court_name || caseItem.courtname;
    const courtId = caseItem.court_id || caseItem.courtid || caseItem.court;
    
    // If we already have the court name as a string
    if (courtName && typeof courtName === 'string' && courtName !== '[object Object]') {
      return courtName;
    }
    
    // If court field contains the actual name
    if (caseItem.court && typeof caseItem.court === 'string' && isNaN(caseItem.court)) {
      return caseItem.court;
    }
    
    // Try to lookup in our courts map using the court ID
    if (courtId && courtsMap[courtId]) {
      return courtsMap[courtId];
    }
    
    // If it's a number, just show it (it's an unresolved ID)
    if (courtId) {
      return `Court ID: ${courtId}`;
    }
    
    return 'N/A';
  };

  // Helper function to get case type name from ID or object
  const getCaseTypeDisplay = (caseItem) => {
    // PostgreSQL typically returns lowercase column names
    const caseTypeName = caseItem.case_type || caseItem.casetype || caseItem.case_type_name || caseItem.casetypename;
    const caseTypeId = caseItem.case_type_id || caseItem.casetypeid || caseItem.type_id;
    
    // If we already have the case type as a string
    if (caseTypeName && typeof caseTypeName === 'string' && caseTypeName !== '[object Object]') {
      return caseTypeName;
    }
    
    // Try to lookup in our case types map using the ID
    if (caseTypeId && caseTypesMap[caseTypeId]) {
      return caseTypesMap[caseTypeId];
    }
    
    // If it's a number, just show it (it's an unresolved ID)
    if (caseTypeId) {
      return `Type ID: ${caseTypeId}`;
    }
    
    return 'N/A';
  };

  // Helper function to extract names from various data structures
  const extractName = (item) => {
    if (!item) return null;
    
    // If it's already a string, return it
    if (typeof item === 'string') return item;
    
    // If it's an object, try various name fields
    if (typeof item === 'object' && item !== null) {
      // Check common name fields (PostgreSQL returns lowercase)
      return item.name || item.petitioner_name || item.petitionername ||
             item.respondent_name || item.respondentname ||
             item.client_name || item.clientname ||
             item.opponent_name || item.opponentname || null;
    }
    
    // If it's a number (ID), return null
    if (typeof item === 'number') return null;
    
    return null;
  };

  // Helper function for client/opponent display
  const getClientOpponentDisplay = (caseItem) => {
    const petitioners = [];
    const respondents = [];
    
    // PostgreSQL returns lowercase column names
    // Try various possible field names for petitioners/clients
    const petitionerFields = [
      'petitioner_names', 'petitionernames', 
      'petitioners', 'petitioner_name', 'petitionername',
      'petitioner', 'client_name', 'clientname', 'client'
    ];
    
    for (const field of petitionerFields) {
      const value = caseItem[field];
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => {
            const name = extractName(v);
            if (name) petitioners.push(name);
          });
        } else {
          const name = extractName(value);
          if (name) petitioners.push(name);
        }
        if (petitioners.length > 0) break;
      }
    }
    
    // Try various possible field names for respondents/opponents
    const respondentFields = [
      'respondent_names', 'respondentnames',
      'respondents', 'respondent_name', 'respondentname',
      'respondent', 'opponent_name', 'opponentname', 'opponent'
    ];
    
    for (const field of respondentFields) {
      const value = caseItem[field];
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => {
            const name = extractName(v);
            if (name) respondents.push(name);
          });
        } else {
          const name = extractName(value);
          if (name) respondents.push(name);
        }
        if (respondents.length > 0) break;
      }
    }
    
    // Build display string
    let display = '';
    if (petitioners.length > 0) {
      display = petitioners.join(', ');
    }
    if (respondents.length > 0) {
      if (display) display += ' vs ';
      display += respondents.join(', ');
    }
    
    // If still empty, try case title or parties field
    if (!display) {
      const title = caseItem.case_title || caseItem.casetitle || 
                   caseItem.title || caseItem.parties;
      if (title && typeof title === 'string') {
        display = title;
      }
    }
    
    // If we have [object Object], it means we have unprocessed data
    if (!display || display === '[object Object]') {
      // Log the problematic case for debugging
      console.log('Case with party display issues:', {
        id: caseItem.id,
        case_number: caseItem.case_number,
        raw_data: caseItem
      });
      return 'Party details pending';
    }
    
    return display;
  };

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await documentApi.getCases();
      
      // Handle various response structures
      let casesData = [];
      if (response.cases && Array.isArray(response.cases)) {
        casesData = response.cases;
      } else if (response.data && Array.isArray(response.data)) {
        casesData = response.data;
      } else if (Array.isArray(response)) {
        casesData = response;
      }
      
      // Log the first case to understand the data structure
      if (casesData.length > 0) {
        console.log('Sample case from API:', casesData[0]);
        console.log('Case field names:', Object.keys(casesData[0]));
      }
      
      // Process cases to add display fields
      const processedCases = casesData.map(caseItem => ({
        ...caseItem,
        _courtDisplay: getCourtDisplay(caseItem),
        _caseTypeDisplay: getCaseTypeDisplay(caseItem),
        _partiesDisplay: getClientOpponentDisplay(caseItem)
      }));
      
      setCases(processedCases);
      filterCasesByTab(processedCases, activeTab);
    } catch (err) {
      console.error("Error fetching cases:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const filterCasesByTab = (casesData, tab) => {
    let filtered = [];
    switch(tab) {
      case 'ongoing':
        filtered = casesData.filter(c => 
          c.status === 'Active' || c.status === 'Pending' ||
          c.status === 'active' || c.status === 'pending' // PostgreSQL might return lowercase
        );
        break;
      case 'disposed':
        filtered = casesData.filter(c => 
          c.status === 'Disposed' || c.status === 'Completed' || c.status === 'Closed' ||
          c.status === 'disposed' || c.status === 'completed' || c.status === 'closed'
        );
        break;
      default:
        filtered = casesData;
    }
    setFilteredCases(filtered);
  };

  useEffect(() => {
    const initializeData = async () => {
      // First fetch lookup data, then fetch cases
      await fetchLookupData();
      await fetchCases();
    };
    
    initializeData();
    
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setAdvocateName(storedUserName);
    }
  }, []);

  useEffect(() => {
    filterCasesByTab(cases, activeTab);
  }, [activeTab, cases]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleViewCase = (caseId) => {
    navigate(`/cases/${caseId}`);
  };

  const handleDeleteCase = async (caseId) => {
    if (window.confirm(`Are you sure you want to delete this case? This action cannot be undone.`)) {
      try {
        await documentApi.deleteCase(caseId);
        await fetchCases(); // Refresh the cases list
        alert('Case deleted successfully.');
      } catch (err) {
        console.error("Error deleting case:", err);
        alert(`Failed to delete case: ${err.message}`);
      }
    }
  };

  const getOngoingCount = () => {
    return cases.filter(c => 
      c.status === 'Active' || c.status === 'Pending' ||
      c.status === 'active' || c.status === 'pending'
    ).length;
  };

  const getDisposedCount = () => {
    return cases.filter(c => 
      c.status === 'Disposed' || c.status === 'Completed' || c.status === 'Closed' ||
      c.status === 'disposed' || c.status === 'completed' || c.status === 'closed'
    ).length;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading cases...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error loading cases: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Cases {advocateName && <span className="text-gray-600 text-sm">({advocateName})</span>}
        </h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => handleTabChange('ongoing')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'ongoing'
                ? 'text-[#21C1B6] border-b-2 border-[#21C1B6]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Ongoing ({getOngoingCount()})
          </button>
          <button
            onClick={() => handleTabChange('disposed')}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              activeTab === 'disposed'
                ? 'text-[#21C1B6] border-b-2 border-[#21C1B6]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Disposed ({getDisposedCount()})
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Case No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Court/Bench
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Case Type/Stage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Client/Opponent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No cases found in this category
                  </td>
                </tr>
              ) : (
                filteredCases.map((caseItem) => (
                  <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {caseItem.case_number || caseItem.casenumber || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {caseItem._courtDisplay}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {caseItem._caseTypeDisplay}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {caseItem._partiesDisplay}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        caseItem.status === 'Active' || caseItem.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : caseItem.status === 'Pending' || caseItem.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : caseItem.status === 'Disposed' || caseItem.status === 'disposed' || 
                            caseItem.status === 'Completed' || caseItem.status === 'completed'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {caseItem.status ? 
                          caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1).toLowerCase() : 
                          'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewCase(caseItem.id)}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          title="View Case"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCase(caseItem.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete Case"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardCasesTable;