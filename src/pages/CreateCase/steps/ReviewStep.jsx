import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  FolderOpen,
  Upload,
  Calendar,
  Sparkles,
} from "lucide-react";

const ReviewStep = ({ caseData }) => {
  const navigate = useNavigate();
  const caseNumber = `CRL/${Math.floor(Math.random() * 1000)}/2025`;

  const handleGoToCaseDetails = () => {
    navigate("/case-details"); // Navigate to Case Details Page
  };

  return (
    <div className="p-6">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-[#9CDFE1] rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Message */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Case Created Successfully!
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Your case has been created and saved to your dashboard.{" "}
          <strong>{caseNumber}</strong>
        </p>
        <p className="text-sm text-gray-600">
          You're all set to start managing your case with NexIntel AI.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
          <FolderOpen className="w-5 h-5 mr-2 text-[#9CDFE1]" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Case Summary
            </h3>
            <p className="text-xs text-gray-500">
              Key details for your newly created case
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Case Title</p>
              <p className="text-sm font-medium text-gray-900">
                {caseData.caseTitle || "Rajesh Kumar Singh vs State"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Court</p>
              <p className="text-sm font-medium text-gray-900">
                {caseData.courtName ||
                  caseData.courtLevel ||
                  "Delhi High Court"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <p className="text-sm font-medium text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {caseData.currentStatus || "Active"}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Case Number</p>
              <p className="text-sm font-medium text-gray-900">{caseNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Filing Date</p>
              <p className="text-sm font-medium text-gray-900">
                {caseData.filingDate
                  ? new Date(caseData.filingDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "15-Jan-2025"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Case Type</p>
              <p className="text-sm font-medium text-gray-900">
                {caseData.caseType || caseData.category || "Criminal"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={handleGoToCaseDetails}
          className="flex-1 px-4 py-3 bg-[#9CDFE1] text-white rounded-md hover:bg-[#87D8DB] transition-colors flex items-center justify-center text-sm font-medium"
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          Go to Case Details
        </button>
        <button className="flex-1 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center text-sm font-medium">
          <span className="mr-2 text-lg">+</span> Create Another Case
        </button>
      </div>

      {/* Next Steps Section */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-center text-base font-semibold text-gray-900 mb-2">
          What’s Next?
        </h4>
        <p className="text-center text-sm text-gray-600 mb-6">
          Start managing your case efficiently with our AI-powered tools.
        </p>

        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: Upload, label: "Upload Documents" },
            { icon: Calendar, label: "Schedule Events" },
            { icon: Sparkles, label: "AI Analysis" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="text-center">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon className="w-6 h-6 text-[#9CDFE1]" />
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;

