

// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Search, Plus } from 'lucide-react';
// import { FileManagerContext } from '../context/FileManagerContext';
// import CreateFolderModal from '../components/FolderBrowser/CreateFolderModal';

// const DocumentUploadPage = () => {
//   const { folders, loadFoldersAndFiles, createFolder, loading, error } = useContext(FileManagerContext);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState('activity'); // 'activity' | 'name'
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadFoldersAndFiles();
//   }, [loadFoldersAndFiles]);

//   const handleCreateFolder = async (newFolderName) => {
//     await createFolder(newFolderName);
//     setIsModalOpen(false);
//   };

//   const handleProjectClick = (folderName) => navigate(`/documents/${folderName}`);

//   const sorted = [...folders].sort((a, b) => {
//     if (sortBy === 'name') return a.name.localeCompare(b.name);
//     return new Date(b.created_at) - new Date(a.created_at);
//   });

//   const filtered = sorted.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

//   return (
//     <div className="min-h-screen bg-[#FDFCFB] text-gray-800 p-8">
//       <div className="max-w-6xl mx-auto">
//         {/* Header row like your screenshot */}
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold">Projects</h1>
//           {/* <button
//             onClick={() => setIsModalOpen(true)}
//             className="bg-black text-white px-6 py-3 rounded-md flex items-center space-x-2 hover:bg-gray-800 transition-colors"
//           >
//             <Plus className="w-5 h-5" />
//             <span>New project</span>
//           </button> */}
//                     <button
//             onClick={() => setIsModalOpen(true)}
//             className="text-white font-semibold px-4 py-2 rounded-md shadow-md transition-all duration-200"
//             style={{ backgroundColor: '#21C1B6' }}
//             onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
//             onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
//           >
//             + New Folder
//           </button>
//         </div>

//         {/* Search + Sort */}
//         <div className="flex items-center mb-8 space-x-4">
//           <div className="relative flex-grow">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search projects..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-600">Sort by</span>
//             <select
//               value={sortBy}
//               onChange={(e) => setSortBy(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="activity">Activity</option>
//               <option value="name">Name</option>
//             </select>
//           </div>
//         </div>

//         {/* Grid of projects */}
//         {loading ? (
//           <div className="text-center text-gray-500">Loading projects...</div>
//         ) : error ? (
//           <div className="text-center text-red-500">Error: {error}</div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center text-gray-500">No projects found. Create a new one!</div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filtered.map((f) => (
//               <div
//                 key={f.id}
//                 className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
//                 onClick={() => handleProjectClick(f.name)}
//               >
//                 <h3 className="text-lg font-semibold mb-2">{f.name}</h3>
//                 <p className="text-sm text-gray-500">
//                   Updated {f.created_at ? new Date(f.created_at).toLocaleDateString() : '—'}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <CreateFolderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateFolder} />
//     </div>
//   );
// };

// export default DocumentUploadPage;

//--------------------above is main page code--------------------//--------------------below is updated code to integrate case creation flow--------------------/

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { FileManagerContext } from '../context/FileManagerContext';
import CreateFolderModal from '../components/FolderBrowser/CreateFolderModal';
import CaseCreationFlow from './CreateCase/CaseCreationFlow';

const DocumentUploadPage = () => {
  const { folders, loadFoldersAndFiles, createFolder, loading, error } = useContext(FileManagerContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('activity');
  const [showCaseFlow, setShowCaseFlow] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadFoldersAndFiles();
  }, [loadFoldersAndFiles]);

  const handleStartCaseFlow = () => {
    setShowCaseFlow(true);
  };

  const handleCaseFlowComplete = (data) => {
    // Store case data and show the original folder creation modal
    setCaseData(data);
    setShowCaseFlow(false);
    setIsCreatingFolder(true);
  };

  const handleCreateFolder = async (folderName) => {
    // Create folder with the collected case data
    await createFolder(folderName);
    setIsCreatingFolder(false);
    setCaseData(null);
    
    // Navigate to the created folder
    navigate(`/documents/${folderName}`);
  };

  const handleProjectClick = (folderName) => navigate(`/documents/${folderName}`);

  const sorted = [...folders].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const filtered = sorted.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // Show case creation flow as full page
  if (showCaseFlow) {
    return (
      <CaseCreationFlow
        onComplete={handleCaseFlowComplete}
        onCancel={() => setShowCaseFlow(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Projects</h1>
          <button
            onClick={handleStartCaseFlow}
            className="text-white font-semibold px-6 py-2 rounded-md shadow-md transition-all duration-200"
            style={{ backgroundColor: '#21C1B6' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
          >
            + Create New Case 
          </button>
        </div> */}
        <div className="flex justify-between items-center mb-8">
  <h1 className="text-3xl font-bold">Projects</h1>
  <button
    onClick={handleStartCaseFlow}
    className="text-white font-semibold px-6 py-2 rounded-lg border-2 border-[#1AA49B] shadow-md transition-all duration-200"
    style={{ backgroundColor: '#21C1B6' }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1AA49B')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#21C1B6')}
  >
    + Create New Case
  </button>
</div>


        {/* Search + Sort */}
        <div className="flex items-center mb-8 space-x-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#21C1B6] bg-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Sort by</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#21C1B6]"
            >
              <option value="activity">Activity</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Grid of projects */}
        {loading ? (
          <div className="text-center text-gray-500">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-red-500">Error: {error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-500">No projects found. Create a new one!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((f) => (
              <div
                key={f.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleProjectClick(f.name)}
              >
                <h3 className="text-lg font-semibold mb-2">{f.name}</h3>
                <p className="text-sm text-gray-500">
                  Updated {f.created_at ? new Date(f.created_at).toLocaleDateString() : '—'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Original folder creation modal - triggered after case flow */}
      <CreateFolderModal
        isOpen={isCreatingFolder}
        onClose={() => {
          setIsCreatingFolder(false);
          setCaseData(null);
        }}
        onCreate={handleCreateFolder}
        initialName={caseData?.caseTitle || ''}
      />
    </div>
  );
};

export default DocumentUploadPage;