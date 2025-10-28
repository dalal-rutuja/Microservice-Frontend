

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit2, Trash2 } from 'lucide-react';
import documentApi from '../../services/documentApi';

const DashboardCasesTable = () => {
  const [cases, setCases] = useState([]);
  const [advocateName, setAdvocateName] = useState('');
  const [filteredCases, setFilteredCases] = useState([]);
  const [activeTab, setActiveTab] = useState('ongoing');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  // Helper function to get court display name
  const getCourtDisplay = (caseItem) => {
    // Check if court_name exists and is a string
    if (caseItem.court_name && typeof caseItem.court_name === 'string') {
      return caseItem.court_name;
    }
    
    // Fallback to court_level if available
    if (caseItem.court_level && typeof caseItem.court_level === 'string') {
      return caseItem.court_level;
    }
    
    return 'N/A';
  };

  // Helper function to get case type display
  const getCaseTypeDisplay = (caseItem) => {
    // Check if case_type exists and is a string
    if (caseItem.case_type && typeof caseItem.case_type === 'string') {
      return caseItem.case_type;
    }
    
    // Fallback to sub_type if case_type is just an ID
    if (caseItem.sub_type && typeof caseItem.sub_type === 'string') {
      return caseItem.sub_type;
    }
    
    // If case_type is a number (ID), show it as Type ID
    if (caseItem.case_type && typeof caseItem.case_type === 'number') {
      return `Type ID: ${caseItem.case_type}`;
    }
    
    return 'N/A';
  };

  // Helper function to extract party names
  const getPartiesDisplay = (caseItem) => {
    let display = '';
    
    // Get petitioners
    if (caseItem.petitioners && Array.isArray(caseItem.petitioners)) {
      const petitionerNames = caseItem.petitioners
        .map(p => p.fullName || p.name)
        .filter(Boolean)
        .join(', ');
      
      if (petitionerNames) {
        display = petitionerNames;
      }
    }
    
    // Get respondents
    if (caseItem.respondents && Array.isArray(caseItem.respondents)) {
      const respondentNames = caseItem.respondents
        .map(r => r.fullName || r.name)
        .filter(Boolean)
        .join(', ');
      
      if (respondentNames) {
        if (display) display += ' vs ';
        display += respondentNames;
      }
    }
    
    // Fallback to case_title if no parties found
    if (!display && caseItem.case_title) {
      display = caseItem.case_title;
    }
    
    return display || 'N/A';
  };

  const fetchCases = async () => {
    try {
      setLoading(true);
      setError(null);
      
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
      
      console.log('Fetched cases:', casesData);
      
      // Process cases to add display fields
      const processedCases = casesData.map(caseItem => ({
        ...caseItem,
        _courtDisplay: getCourtDisplay(caseItem),
        _caseTypeDisplay: getCaseTypeDisplay(caseItem),
        _partiesDisplay: getPartiesDisplay(caseItem)
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
    const disposedStatuses = ['Disposed', 'Completed', 'Closed', 'disposed', 'completed', 'closed'];
    
    switch(tab) {
      case 'ongoing':
        // Show all cases that are NOT disposed
        filtered = casesData.filter(c => 
          !disposedStatuses.includes(c.status)
        );
        break;
      case 'disposed':
        filtered = casesData.filter(c => 
          disposedStatuses.includes(c.status)
        );
        break;
      default:
        filtered = casesData;
    }
    
    console.log(`Filtered ${tab} cases:`, filtered);
    setFilteredCases(filtered);
  };

  useEffect(() => {
    fetchCases();
    
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
    if (window.confirm('Are you sure you want to delete this case? This action cannot be undone.')) {
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
    const disposedStatuses = ['Disposed', 'Completed', 'Closed', 'disposed', 'completed', 'closed'];
    return cases.filter(c => !disposedStatuses.includes(c.status)).length;
  };

  const getDisposedCount = () => {
    const disposedStatuses = ['Disposed', 'Completed', 'Closed', 'disposed', 'completed', 'closed'];
    return cases.filter(c => disposedStatuses.includes(c.status)).length;
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
        <button 
          onClick={fetchCases}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
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
                  Case Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Parties
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
                      {caseItem.case_number || 'N/A'}
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
                        ['Disposed', 'disposed', 'Completed', 'completed', 'Closed', 'closed'].includes(caseItem.status)
                          ? 'bg-blue-100 text-blue-800'
                          : ['Pending', 'pending', 'Awaiting', 'awaiting'].includes(caseItem.status)
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {caseItem.status || 'Unknown'}
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