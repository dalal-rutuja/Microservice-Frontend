import React from "react";
import {
  FileText,
  Calendar,
  Users,
  FileCheck,
  Lightbulb,
  Paperclip,
  CheckCircle,
} from "lucide-react";

const CaseDetailsPage = () => {
  const caseInfo = {
    caseNo: "CRL.A 1234/2025",
    caseType: "Criminal",
    filingDate: "2025-01-15",
    courtBranch: "Delhi High Court",
  };

  const parties = {
    petitioner: "Rajesh Kumar Singh",
    respondent: "State of Delhi & Ors.",
    advocate: "Adv. Priya Sharma",
  };

  const timeline = {
    filingDate: "2025-01-15",
    firstHearing: "2025-02-10",
    newHearing: "2025-03-15",
  };

  const documents = [
    { type: "Petitions", count: 1 },
    { type: "Orders", count: 2 },
    { type: "Annexures", count: 8 },
    { type: "Evidence Files", count: 3 },
  ];

  const keyPoints = {
    respondent:
      "Challenge to detention order under preventive detention laws. Relief sought includes quashing of detention order and immediate release of petitioner.",
  };

  const uploadedDocs = [
    { name: "Petition.pdf", date: "2025-10-01", status: "Processed" },
    { name: "Annexure_A.docx", date: "2025-10-01", status: "Processed" },
    { name: "Evidence_01.jpg", date: "2025-10-01", status: "OCR Done" },
    { name: "CourtOrder_Sept.pdf", date: "2025-10-01", status: "Processed" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-semibold text-gray-900 text-center mb-1">
          Customize Your Legal Workspace
        </h1>
        <p className="text-center text-gray-500 mb-10">
          Tell us a bit about your work so we can personalize your experience.
        </p>

        <div className="grid grid-cols-3 gap-8">
          {/* LEFT SIDE */}
          <div className="col-span-2 space-y-6">
            {/* Case Info */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center text-gray-900 font-semibold">
                  <FileText className="w-5 h-5 mr-2 text-[#21C1B6]" />
                  Case Information
                </h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  90% Confidence
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={caseInfo.caseNo}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />
                <input
                  type="text"
                  value={caseInfo.caseType}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />
                <input
                  type="date"
                  value={caseInfo.filingDate}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />
                <input
                  type="text"
                  value={caseInfo.courtBranch}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />
              </div>
            </div>

            {/* Parties */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center text-gray-900 font-semibold">
                  <Users className="w-5 h-5 mr-2 text-[#21C1B6]" />
                  Parties Involved
                </h2>
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  78% Confidence
                </span>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  value={parties.petitioner}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />
                <input
                  type="text"
                  value={parties.respondent}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />
                <input
                  type="text"
                  value={parties.advocate}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm w-full"
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center text-gray-900 font-semibold">
                  <Calendar className="w-5 h-5 mr-2 text-[#21C1B6]" />
                  Timeline
                </h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  92% Confidence
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="date"
                  value={timeline.filingDate}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="date"
                  value={timeline.firstHearing}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm"
                />
                <input
                  type="date"
                  value={timeline.newHearing}
                  readOnly
                  className="border rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>

            {/* Documents Identified */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center text-gray-900 font-semibold">
                  <FileCheck className="w-5 h-5 mr-2 text-[#21C1B6]" />
                  Documents Identified
                </h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  88% Confidence
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {documents.map((doc) => (
                  <div key={doc.type} className="flex justify-between">
                    <span>{doc.type}</span>
                    <span className="font-medium">{doc.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Legal Points */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="flex items-center text-gray-900 font-semibold">
                  <Lightbulb className="w-5 h-5 mr-2 text-[#21C1B6]" />
                  Key Legal Points
                </h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  85% Confidence
                </span>
              </div>
              <textarea
                value={keyPoints.respondent}
                readOnly
                rows="3"
                className="border rounded-md px-3 py-2 text-sm w-full resize-none"
              />
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="flex items-center text-gray-900 font-semibold mb-4">
                <Paperclip className="w-5 h-5 mr-2 text-[#21C1B6]" />
                Uploaded Documents
              </h2>
              <ul className="space-y-3">
                {uploadedDocs.map((doc) => (
                  <li
                    key={doc.name}
                    className="flex items-center justify-between border rounded-md px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.date}</p>
                    </div>
                    <span className="text-xs text-gray-600">{doc.status}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end mt-8 space-x-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            Add Missing Data
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
            Edit Case Info
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseDetailsPage;
