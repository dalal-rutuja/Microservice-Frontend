

import React, { useState } from 'react';
import { Scale, Building2, Users, Tag, FolderPlus, Upload, CheckCircle } from 'lucide-react';
import OverviewStep from './steps/OverviewStep';
import JurisdictionStep from './steps/JurisdictionStep';
import PartiesStep from './steps/PartiesStep';
import CategoryStep from './steps/CategoryStep';
import DatesStep from './steps/DatesStep';
// import DocumentsStep from './steps/DocumentsStep';
import ReviewStep from './steps/ReviewStep';

const CaseCreationFlow = ({ onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [caseData, setCaseData] = useState({
    caseTitle: '',
    caseType: '',
    subType: '',
    caseNumber: '',
    courtName: '',
    filingDate: '',
    category: '',
    primaryCategory: '',
    subCategory: '',
    complexity: '',
    monetaryValue: '',
    priorityLevel: 'Medium',
    courtLevel: 'High Court',
    benchDivision: '',
    jurisdiction: 'Delhi',
    state: 'Delhi',
    judges: [],
    courtRoom: '',
    petitioners: [{ fullName: '', role: '', advocateName: '', barRegistration: '', contact: '' }],
    respondents: [{ fullName: '', role: '', advocateName: '', barRegistration: '', contact: '' }],
    nextHearingDate: '',
    deadlineDate: '',
    servedDate: '',
    lastUpdated: '',
    uploadedFiles: []
  });

  const steps = [
    { number: 1, name: 'Overview', icon: Scale },
    { number: 2, name: 'Jurisdiction', icon: Building2 },
    { number: 3, name: 'Parties', icon: Users },
    { number: 4, name: 'Category', icon: Tag },
    { number: 5, name: 'Dates', icon: FolderPlus },
    // { number: 6, name: 'Documents', icon: Upload },
    { number: 7, name: 'Review', icon: CheckCircle }
  ];

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(caseData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      {/* Header Section */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Create New Case</h1>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Step Bar (kept as-is) */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep >= step.number
                        ? 'bg-[#21C1B6] text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-xs mt-2 ${
                      currentStep >= step.number
                        ? 'text-gray-700 font-medium'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all ${
                      currentStep > step.number ? 'bg-[#21C1B6]' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8 min-h-[500px]">
          {currentStep === 1 && <OverviewStep caseData={caseData} setCaseData={setCaseData} />}
          {currentStep === 2 && <JurisdictionStep caseData={caseData} setCaseData={setCaseData} />}
          {currentStep === 3 && <PartiesStep caseData={caseData} setCaseData={setCaseData} />}
          {currentStep === 4 && <CategoryStep caseData={caseData} setCaseData={setCaseData} />}
          {currentStep === 5 && <DatesStep caseData={caseData} setCaseData={setCaseData} />}
          {/* {currentStep === 6 && <DocumentsStep caseData={caseData} setCaseData={setCaseData} />} */}
          {currentStep === 7 && <ReviewStep caseData={caseData} />}
        </div>

        {/* Bottom Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="inline-flex items-center text-[#21C1B6]">
              <CheckCircle className="w-4 h-4 mr-1" />
              Auto-saved
            </span>
          </div>
          <div className="flex space-x-2">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-4 py-1.5 border border-[#21C1B6] text-[#21C1B6] rounded-sm text-sm hover:bg-[#E6F8F7] transition-colors"
              >
                Back
              </button>
            )}
            {currentStep < 7 && (
              <button
                onClick={handleNext}
                className="px-4 py-1.5 border border-[#21C1B6] text-[#21C1B6] rounded-sm text-sm hover:bg-[#E6F8F7] transition-colors"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-4 py-1.5 bg-[#21C1B6] text-white rounded-sm text-sm font-medium hover:bg-[#1AA89E] transition-colors flex items-center"
            >
              {currentStep === 7 ? 'Create Case' : 'Continue'}
              <span className="ml-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseCreationFlow;
