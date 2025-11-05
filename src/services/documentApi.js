

// import axios from 'axios';

// const API_BASE_URL = 'https://gateway-service-dot-nexintel-ai-product.el.r.appspot.com/docs';

// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const documentApi = {
//   // Create a new folder
//   createFolder: async (folderName, parentPath = '') => {
//     const response = await axios.post(
//       `${API_BASE_URL}/create-folder`,
//       { folderName, parentPath },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all folders & files
//   getFoldersAndFiles: async () => {
//     const response = await axios.get(`${API_BASE_URL}/folders`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Upload multiple documents
//   uploadDocuments: async (folderName, files) => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/${encodeURIComponent(folderName)}/upload`,
//         formData,
//         {
//           headers: {
//             ...getAuthHeader(),
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       return { success: true, documents: response.data.documents || [] };
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         return { success: false, message: error.response.data.message || 'Token exhausted.' };
//       }
//       return { success: false, message: error.message || 'An unexpected error occurred during upload.' };
//     }
//   },

//   // Get folder summary
//   getFolderSummary: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/summary`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get file processing status
//   getFileProcessingStatus: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get folder processing status
//   getFolderProcessingStatus: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/status`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get document content
//   getDocumentContent: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Query folder documents
//   queryFolderDocuments: async (folderName, question, sessionId = null) => {
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }
    
//     const payload = { question };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Query documents from test_case folder
//   queryTestDocuments: async (question, sessionId = null) => {
//     const payload = { question };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/files/test_case/chat`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Query folder documents with a secret prompt
//   queryFolderDocumentsWithSecret: async (folderName, promptValue, promptLabel, sessionId = null) => {
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }

//     const payload = { 
//       question: promptValue, 
//       promptLabel 
//     };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all chat sessions for a folder
//   getFolderChatSessions: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/sessions`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get a specific chat session
//   getFolderChatSessionById: async (folderName, sessionId) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Continue chat in a session
//   continueFolderChat: async (folderName, sessionId, question) => {
//     const response = await axios.post(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/sessions/${sessionId}/continue`,
//       { question },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a chat session
//   deleteFolderChatSession: async (folderName, sessionId) => {
//     const response = await axios.delete(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all secrets
//   getSecrets: async () => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets?fetch=true`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific secret by ID
//   getSecretById: async (secretId) => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets/${secretId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get all chats for a specific folder
//   getFolderChats: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/chats`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all cases
//   getCases: async () => {
//     const response = await axios.get(`${API_BASE_URL}/cases`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific case by ID
//   getCaseById: async (caseId) => {
//     const response = await axios.get(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Update a case
//   updateCase: async (caseId, caseData) => {
//     const response = await axios.put(
//       `${API_BASE_URL}/cases/${caseId}`,
//       caseData,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a case
//   deleteCase: async (caseId) => {
//     const response = await axios.delete(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },
// };

// export default documentApi;



// import axios from 'axios';

// const API_BASE_URL = 'https://gateway-service-dot-nexintel-ai-product.el.r.appspot.com/docs';

// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const documentApi = {
//   // Create a new folder
//   createFolder: async (folderName, parentPath = '') => {
//     const response = await axios.post(
//       `${API_BASE_URL}/create-folder`,
//       { folderName, parentPath },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all folders & files
//   getFoldersAndFiles: async () => {
//     const response = await axios.get(`${API_BASE_URL}/folders`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Upload multiple documents
//   uploadDocuments: async (folderName, files) => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/${encodeURIComponent(folderName)}/upload`,
//         formData,
//         {
//           headers: {
//             ...getAuthHeader(),
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       return { success: true, documents: response.data.documents || [] };
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         return { success: false, message: error.response.data.message || 'Token exhausted.' };
//       }
//       return { success: false, message: error.message || 'An unexpected error occurred during upload.' };
//     }
//   },

//   // Get folder summary
//   getFolderSummary: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/summary`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get file processing status
//   getFileProcessingStatus: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get folder processing status
//   getFolderProcessingStatus: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/status`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get document content
//   getDocumentContent: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Query folder documents
//   queryFolderDocuments: async (folderName, question, sessionId = null) => {
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }
    
//     const payload = { question };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Query documents from test_case folder
//   queryTestDocuments: async (question, sessionId = null) => {
//     const payload = { question };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/files/test_case/chat`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Query folder documents with a secret prompt
//   queryFolderDocumentsWithSecret: async (folderName, promptValue, promptLabel, sessionId = null) => {
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }

//     const payload = { 
//       question: promptValue, 
//       promptLabel 
//     };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all chat sessions for a folder
//   getFolderChatSessions: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/sessions`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get a specific chat session
//   getFolderChatSessionById: async (folderName, sessionId) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Continue chat in a session
//   continueFolderChat: async (folderName, sessionId, question) => {
//     const response = await axios.post(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/sessions/${sessionId}/continue`,
//       { question },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a chat session
//   deleteFolderChatSession: async (folderName, sessionId) => {
//     const response = await axios.delete(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all secrets
//   getSecrets: async () => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets?fetch=true`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific secret by ID
//   getSecretById: async (secretId) => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets/${secretId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get all chats for a specific folder
//   getFolderChats: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${encodeURIComponent(folderName)}/chats`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all cases with populated data
//   getCases: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/cases?populate=true`, {
//         headers: getAuthHeader(),
//       });
//       return response.data;
//     } catch (error) {
//       // If populate param is not supported, try without it
//       if (error.response && error.response.status === 400) {
//         const response = await axios.get(`${API_BASE_URL}/cases`, {
//           headers: getAuthHeader(),
//         });
//         return response.data;
//       }
//       throw error;
//     }
//   },

//   // Get a specific case by ID with populated data
//   getCaseById: async (caseId) => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/cases/${caseId}?populate=true`, {
//         headers: getAuthHeader(),
//       });
//       return response.data;
//     } catch (error) {
//       // If populate param is not supported, try without it
//       if (error.response && error.response.status === 400) {
//         const response = await axios.get(`${API_BASE_URL}/cases/${caseId}`, {
//           headers: getAuthHeader(),
//         });
//         return response.data;
//       }
//       throw error;
//     }
//   },

//   // Update a case
//   updateCase: async (caseId, caseData) => {
//     const response = await axios.put(
//       `${API_BASE_URL}/cases/${caseId}`,
//       caseData,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a case
//   deleteCase: async (caseId) => {
//     const response = await axios.delete(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get all courts (helper function to map court IDs to names)
//   getCourts: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/courts`, {
//         headers: getAuthHeader(),
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching courts:', error);
//       return { courts: [] };
//     }
//   },

//   // Get all case types (helper function to map case type IDs to names)
//   getCaseTypes: async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/case-types`, {
//         headers: getAuthHeader(),
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching case types:', error);
//       return { caseTypes: [] };
//     }
//   },
// };

// export default documentApi;



// import axios from 'axios';

// const API_BASE_URL = 'https://gateway-service-dot-nexintel-ai-product.el.r.appspot.com/docs';

// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const documentApi = {
//   // Create a new folder
//   createFolder: async (folderName, parentPath = '') => {
//     const response = await axios.post(
//       `${API_BASE_URL}/create-folder`,
//       { folderName, parentPath },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all folders & files
//   getFoldersAndFiles: async () => {
//     const response = await axios.get(`${API_BASE_URL}/folders`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get documents in a specific folder
//   getDocumentsInFolder: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/files`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Upload multiple documents
//   uploadDocuments: async (folderName, files) => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/${folderName}/upload`,
//         formData,
//         {
//           headers: {
//             ...getAuthHeader(),
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       return { success: true, documents: response.data.documents || [] };
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         return { success: false, message: error.response.data.message || 'Token exhausted.' };
//       }
//       return { success: false, message: error.message || 'An unexpected error occurred during upload.' };
//     }
//   },

//   // Get folder summary
//   getFolderSummary: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/summary`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get file processing status
//   getFileProcessingStatus: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get folder processing status
//   getFolderProcessingStatus: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/status`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get document content
//   getDocumentContent: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Query folder documents
//   queryFolderDocuments: async (folderName, question, sessionId = null) => {
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }
    
//     const payload = { question };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Query documents from test_case folder
//   queryTestDocuments: async (question, sessionId = null) => {
//     const payload = { question };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/files/test_case/chat`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Query folder documents with a secret prompt
//   queryFolderDocumentsWithSecret: async (folderName, promptValue, promptLabel, sessionId = null) => {
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }

//     const payload = { 
//       question: promptValue, 
//       promptLabel 
//     };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all chat sessions for a folder
//   getFolderChatSessions: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/sessions`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get a specific chat session
//   getFolderChatSessionById: async (folderName, sessionId) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Continue chat in a session
//   continueFolderChat: async (folderName, sessionId, question) => {
//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}/continue`,
//       { question },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a chat session
//   deleteFolderChatSession: async (folderName, sessionId) => {
//     const response = await axios.delete(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all secrets
//   getSecrets: async () => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets?fetch=true`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific secret by ID
//   getSecretById: async (secretId) => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets/${secretId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get all chats for a specific folder
//   getFolderChats: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/chats`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all cases
//   getCases: async () => {
//     const response = await axios.get(`${API_BASE_URL}/cases`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific case by ID
//   getCaseById: async (caseId) => {
//     const response = await axios.get(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Update a case
//   updateCase: async (caseId, caseData) => {
//     const response = await axios.put(
//       `${API_BASE_URL}/cases/${caseId}`,
//       caseData,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a case
//   deleteCase: async (caseId) => {
//     const response = await axios.delete(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },
// };

// export default documentApi;







// import axios from 'axios';

// const API_BASE_URL = 'https://gateway-service-dot-nexintel-ai-product.el.r.appspot.com/docs';

// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const documentApi = {
//   // Create a new folder
//   createFolder: async (folderName, parentPath = '') => {
//     const response = await axios.post(
//       `${API_BASE_URL}/create-folder`,
//       { folderName, parentPath },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all folders & files
//   getFoldersAndFiles: async () => {
//     const response = await axios.get(`${API_BASE_URL}/folders`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get documents in a specific folder
//   getDocumentsInFolder: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/files`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Upload multiple documents
//   uploadDocuments: async (folderName, files) => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/${folderName}/upload`,
//         formData,
//         {
//           headers: {
//             ...getAuthHeader(),
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       return { success: true, documents: response.data.documents || [] };
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         return { success: false, message: error.response.data.message || 'Token exhausted.' };
//       }
//       return { success: false, message: error.message || 'An unexpected error occurred during upload.' };
//     }
//   },

//   // Get folder summary
//   getFolderSummary: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/summary`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get file processing status
//   getFileProcessingStatus: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get folder processing status
//   getFolderProcessingStatus: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/status`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get document content
//   getDocumentContent: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // ✅ FIXED: Query folder documents - Now supports both custom queries and secret prompts
//   queryFolderDocuments: async (folderName, question, sessionId = null, options = {}) => {
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }
    
//     // Build payload
//     const payload = {
//       question: question || '', // Empty string for secret prompts
//       session_id: sessionId,
//       ...options // This includes: secret_id, llm_name, prompt_label, additional_input, etc.
//     };

//     console.log('[documentApi] Sending request:', {
//       folderName,
//       payload,
//       isSecretPrompt: !!options.secret_id
//     });

//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
    
//     return response.data;
//   },

//   // Query documents from test_case folder
//   queryTestDocuments: async (question, sessionId = null) => {
//     const payload = { question };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/files/test_case/chat`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // ✅ DEPRECATED: Use queryFolderDocuments with options instead
//   // Keeping for backward compatibility but should be removed
//   queryFolderDocumentsWithSecret: async (folderName, promptValue, promptLabel, sessionId = null) => {
//     console.warn('[documentApi] queryFolderDocumentsWithSecret is deprecated. Use queryFolderDocuments with options instead.');
    
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }

//     const payload = { 
//       question: promptValue, 
//       prompt_label: promptLabel,
//       session_id: sessionId
//     };

//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all chat sessions for a folder
//   getFolderChatSessions: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/sessions`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get a specific chat session
//   getFolderChatSessionById: async (folderName, sessionId) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Continue chat in a session
//   continueFolderChat: async (folderName, sessionId, question) => {
//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}/continue`,
//       { question },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a chat session
//   deleteFolderChatSession: async (folderName, sessionId) => {
//     const response = await axios.delete(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all secrets
//   getSecrets: async () => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets?fetch=true`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific secret by ID
//   getSecretById: async (secretId) => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets/${secretId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get all chats for a specific folder
//   getFolderChats: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/chats`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all cases
//   getCases: async () => {
//     const response = await axios.get(`${API_BASE_URL}/cases`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific case by ID
//   getCaseById: async (caseId) => {
//     const response = await axios.get(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Update a case
//   updateCase: async (caseId, caseData) => {
//     const response = await axios.put(
//       `${API_BASE_URL}/cases/${caseId}`,
//       caseData,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a case
//   deleteCase: async (caseId) => {
//     const response = await axios.delete(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },
// };

// export default documentApi;



// import axios from 'axios';

// const API_BASE_URL = 'https://gateway-service-dot-nexintel-ai-product.el.r.appspot.com/docs';

// const getAuthHeader = () => {
//   const token = localStorage.getItem('token');
//   return token ? { Authorization: `Bearer ${token}` } : {};
// };

// const documentApi = {
//   // Create a new folder
//   createFolder: async (folderName, parentPath = '') => {
//     const response = await axios.post(
//       `${API_BASE_URL}/create-folder`,
//       { folderName, parentPath },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all folders & files
//   getFoldersAndFiles: async () => {
//     const response = await axios.get(`${API_BASE_URL}/folders`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get documents in a specific folder
//   getDocumentsInFolder: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/files`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Upload multiple documents
//   uploadDocuments: async (folderName, files) => {
//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/${folderName}/upload`,
//         formData,
//         {
//           headers: {
//             ...getAuthHeader(),
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       return { success: true, documents: response.data.documents || [] };
//     } catch (error) {
//       if (error.response && error.response.status === 403) {
//         return { success: false, message: error.response.data.message || 'Token exhausted.' };
//       }
//       return { success: false, message: error.message || 'An unexpected error occurred during upload.' };
//     }
//   },

//   // Get folder summary
//   getFolderSummary: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/summary`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get file processing status
//   getFileProcessingStatus: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get folder processing status
//   getFolderProcessingStatus: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/status`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get document content
//   getDocumentContent: async (fileId) => {
//     const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Query folder documents
//   queryFolderDocuments: async (folderName, question, sessionId = null, options = {}) => {
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }
    
//     const payload = {
//       question: question || '',
//       session_id: sessionId,
//       ...options
//     };

//     console.log('[documentApi] Sending request:', {
//       folderName,
//       payload,
//       isSecretPrompt: !!options.secret_id
//     });

//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
    
//     return response.data;
//   },

//   // Query documents from test_case folder
//   queryTestDocuments: async (question, sessionId = null) => {
//     const payload = { question };
//     if (sessionId) {
//       payload.sessionId = sessionId;
//     }

//     const response = await axios.post(
//       `${API_BASE_URL}/files/test_case/chat`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // DEPRECATED: Use queryFolderDocuments with options instead
//   queryFolderDocumentsWithSecret: async (folderName, promptValue, promptLabel, sessionId = null) => {
//     console.warn('[documentApi] queryFolderDocumentsWithSecret is deprecated. Use queryFolderDocuments with options instead.');
    
//     if (!folderName) {
//       throw new Error('Folder name is required to query documents');
//     }

//     const payload = { 
//       question: promptValue, 
//       prompt_label: promptLabel,
//       session_id: sessionId
//     };

//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/query`,
//       payload,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all chat sessions for a folder
//   getFolderChatSessions: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/sessions`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // ✅ FIXED: Get a specific chat session with proper filtering
//   getFolderChatSessionById: async (folderName, sessionId) => {
//     console.log(`[documentApi] Fetching session ${sessionId} for folder ${folderName}`);
    
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
    
//     // Ensure we filter messages to only this session
//     if (response.data && response.data.messages) {
//       response.data.messages = response.data.messages.filter(msg => 
//         msg.session_id === sessionId || msg.sessionId === sessionId
//       );
//     }
    
//     if (response.data && response.data.chatHistory) {
//       response.data.chatHistory = response.data.chatHistory.filter(msg => 
//         msg.session_id === sessionId || msg.sessionId === sessionId
//       );
//     }
    
//     console.log(`[documentApi] Filtered session data:`, response.data);
//     return response.data;
//   },

//   // ✅ NEW: Get specific chat history by file and session
//   getChatHistoryByFileAndSession: async (fileId, sessionId) => {
//     console.log(`[documentApi] Fetching chat history for file ${fileId}, session ${sessionId}`);
    
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/files/${fileId}/sessions/${sessionId}`,
//         { headers: getAuthHeader() }
//       );
      
//       // Filter messages to ensure only this session's messages
//       let messages = [];
//       if (response.data.messages && Array.isArray(response.data.messages)) {
//         messages = response.data.messages.filter(msg => 
//           msg.session_id === sessionId || msg.sessionId === sessionId
//         );
//       } else if (response.data.chatHistory && Array.isArray(response.data.chatHistory)) {
//         messages = response.data.chatHistory.filter(msg => 
//           msg.session_id === sessionId || msg.sessionId === sessionId
//         );
//       }
      
//       console.log(`[documentApi] Filtered messages for session ${sessionId}:`, messages);
      
//       return {
//         ...response.data,
//         messages,
//         chatHistory: messages
//       };
//     } catch (error) {
//       console.error(`[documentApi] Error fetching session ${sessionId}:`, error);
//       throw error;
//     }
//   },

//   // Continue chat in a session
//   continueFolderChat: async (folderName, sessionId, question) => {
//     const response = await axios.post(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}/continue`,
//       { question },
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a chat session
//   deleteFolderChatSession: async (folderName, sessionId) => {
//     const response = await axios.delete(
//       `${API_BASE_URL}/${folderName}/sessions/${sessionId}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all secrets
//   getSecrets: async () => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets?fetch=true`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific secret by ID
//   getSecretById: async (secretId) => {
//     const response = await axios.get(`${API_BASE_URL}/files/secrets/${secretId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get all chats for a specific folder
//   getFolderChats: async (folderName) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/${folderName}/chats`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // ✅ FIXED: Get chat history with proper session filtering
//   getChatHistory: async (fileId) => {
//     console.log(`[documentApi] Fetching all chat history for file: ${fileId}`);
    
//     const response = await axios.get(
//       `${API_BASE_URL}/files/chat-history/${fileId}`,
//       { headers: getAuthHeader() }
//     );
    
//     return response.data;
//   },

//   // ✅ NEW: Fetch chat sessions with better structure
//   fetchChatSessions: async (page = 1, limit = 20) => {
//     const response = await axios.get(
//       `${API_BASE_URL}/chat-sessions?page=${page}&limit=${limit}`,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Get all cases
//   getCases: async () => {
//     const response = await axios.get(`${API_BASE_URL}/cases`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Get a specific case by ID
//   getCaseById: async (caseId) => {
//     const response = await axios.get(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },

//   // Update a case
//   updateCase: async (caseId, caseData) => {
//     const response = await axios.put(
//       `${API_BASE_URL}/cases/${caseId}`,
//       caseData,
//       { headers: getAuthHeader() }
//     );
//     return response.data;
//   },

//   // Delete a case
//   deleteCase: async (caseId) => {
//     const response = await axios.delete(`${API_BASE_URL}/cases/${caseId}`, {
//       headers: getAuthHeader(),
//     });
//     return response.data;
//   },
// };

// export default documentApi;




import axios from 'axios';

const API_BASE_URL = 'https://gateway-service-dot-nexintel-ai-product.el.r.appspot.com/docs';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const documentApi = {
  // Create a new folder
  createFolder: async (folderName, parentPath = '') => {
    const response = await axios.post(
      `${API_BASE_URL}/create-folder`,
      { folderName, parentPath },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get all folders & files
  getFoldersAndFiles: async () => {
    const response = await axios.get(`${API_BASE_URL}/folders`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get documents in a specific folder
  getDocumentsInFolder: async (folderName) => {
    const response = await axios.get(
      `${API_BASE_URL}/${folderName}/files`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Upload multiple documents
  uploadDocuments: async (folderName, files) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    try {
      const response = await axios.post(
        `${API_BASE_URL}/${folderName}/upload`,
        formData,
        {
          headers: {
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return { success: true, documents: response.data.documents || [] };
    } catch (error) {
      if (error.response && error.response.status === 403) {
        return {
          success: false,
          message: error.response.data.message || 'Token exhausted.',
        };
      }
      return {
        success: false,
        message: error.message || 'An unexpected error occurred during upload.',
      };
    }
  },

  // Get folder summary
  getFolderSummary: async (folderName) => {
    const response = await axios.get(
      `${API_BASE_URL}/${folderName}/summary`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get file processing status
  getFileProcessingStatus: async (fileId) => {
    const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get folder processing status
  getFolderProcessingStatus: async (folderName) => {
    const response = await axios.get(
      `${API_BASE_URL}/${folderName}/status`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get document content
  getDocumentContent: async (fileId) => {
    const response = await axios.get(`${API_BASE_URL}/status/${fileId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // ✅ FIXED: Query folder documents - Now supports both custom queries and secret prompts
  queryFolderDocuments: async (folderName, question, sessionId = null, options = {}) => {
    if (!folderName) {
      throw new Error('Folder name is required to query documents');
    }
    // Build payload
    const payload = {
      question: question || '', // Empty string for secret prompts
      session_id: sessionId,
      ...options // This includes: secret_id, llm_name, prompt_label, additional_input, etc.
    };
    console.log('[documentApi] Sending request:', { folderName, payload, isSecretPrompt: !!options.secret_id });
    const response = await axios.post(
      `${API_BASE_URL}/${folderName}/query`,
      payload,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Query documents from test_case folder
  queryTestDocuments: async (question, sessionId = null) => {
    const payload = { question };
    if (sessionId) {
      payload.sessionId = sessionId;
    }
    const response = await axios.post(
      `${API_BASE_URL}/files/test_case/chat`,
      payload,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // ✅ DEPRECATED: Use queryFolderDocuments with options instead
  // Keeping for backward compatibility but should be removed
  queryFolderDocumentsWithSecret: async (folderName, promptValue, promptLabel, sessionId = null) => {
    console.warn('[documentApi] queryFolderDocumentsWithSecret is deprecated. Use queryFolderDocuments with options instead.');
    if (!folderName) {
      throw new Error('Folder name is required to query documents');
    }
    const payload = {
      question: promptValue,
      prompt_label: promptLabel,
      session_id: sessionId
    };
    const response = await axios.post(
      `${API_BASE_URL}/${folderName}/query`,
      payload,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get all chat sessions for a folder
  getFolderChatSessions: async (folderName) => {
    const response = await axios.get(
      `${API_BASE_URL}/${folderName}/sessions`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get a specific chat session
  getFolderChatSessionById: async (folderName, sessionId) => {
    const response = await axios.get(
      `${API_BASE_URL}/${folderName}/sessions/${sessionId}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Continue chat in a session
  continueFolderChat: async (folderName, sessionId, question) => {
    const response = await axios.post(
      `${API_BASE_URL}/${folderName}/sessions/${sessionId}/continue`,
      { question },
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Delete a chat session
  deleteFolderChatSession: async (folderName, sessionId) => {
    const response = await axios.delete(
      `${API_BASE_URL}/${folderName}/sessions/${sessionId}`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get all secrets
  getSecrets: async () => {
    const response = await axios.get(`${API_BASE_URL}/files/secrets?fetch=true`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get a specific secret by ID
  getSecretById: async (secretId) => {
    const response = await axios.get(`${API_BASE_URL}/files/secrets/${secretId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get all chats for a specific folder
  getFolderChats: async (folderName) => {
    const response = await axios.get(
      `${API_BASE_URL}/${folderName}/chats`,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Get all cases
  getCases: async () => {
    const response = await axios.get(`${API_BASE_URL}/cases`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Get a specific case by ID
  getCaseById: async (caseId) => {
    const response = await axios.get(`${API_BASE_URL}/cases/${caseId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Update a case
  updateCase: async (caseId, caseData) => {
    const response = await axios.put(
      `${API_BASE_URL}/cases/${caseId}`,
      caseData,
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  // Delete a case
  deleteCase: async (caseId) => {
    const response = await axios.delete(`${API_BASE_URL}/cases/${caseId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },

  // Delete a file by ID
  deleteFile: async (fileId) => {
    const response = await axios.delete(`${API_BASE_URL}/${fileId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  },
  
};

export default documentApi;