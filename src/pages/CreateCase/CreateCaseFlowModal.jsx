import React, { useState } from 'react';
import { X, Scale, Building2, Users, Tag, FolderPlus, Upload, CheckCircle } from 'lucide-react';
import OverviewStep from './steps/OverviewStep';
import JurisdictionStep from './steps/JurisdictionStep';
import PartiesStep from './steps/PartiesStep';
import CategoryStep from './steps/CategoryStep';
import DatesStep from './steps/DatesStep';
// import DocumentsStep from './steps/DocumentsStep';
import ReviewStep from './steps/ReviewStep';

const CreateCaseFlowModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [caseData, setCaseData] = useState({
    // Overview step
    caseTitle: '',
    caseType: '',
    subType: '',
    caseNumber: '',
    courtName: '',
    filingDate: '',
    
    // Category step
    category: '',
    primaryCategory: '',
    subCategory: '',
    complexity: '',
    monetaryValue: '',
    priorityLevel: 'Medium',
    
    // Jurisdiction step
    courtLevel: 'High Court',
    benchDivision: '',
    jurisdiction: 'Delhi',
    state: 'Delhi',
    judges: [],
    courtRoom: '',
    
    // Parties step
    petitioners: [{ fullName: '', role: '', advocateName: '', barRegistration: '', contact: '' }],
    respondents: [{ fullName: '', role: '', advocateName: '', barRegistration: '', contact: '' }],
    
    // Documents
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
      // Complete the flow
      onComplete(caseData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header with Progress */}
        <div className="border-b bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Create New Case</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.number 
                      ? 'bg-[#21C1B6] text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-xs mt-1 ${
                    currentStep >= step.number ? 'text-gray-700 font-medium' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-[#21C1B6]' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <OverviewStep caseData={caseData} setCaseData={setCaseData} />
          )}
          {currentStep === 2 && (
            <JurisdictionStep caseData={caseData} setCaseData={setCaseData} />
          )}
          {currentStep === 3 && (
            <PartiesStep caseData={caseData} setCaseData={setCaseData} />
          )}
          {currentStep === 4 && (
            <CategoryStep caseData={caseData} setCaseData={setCaseData} />
          )}
          {currentStep === 5 && (
            <DatesStep caseData={caseData} setCaseData={setCaseData} />
          )}
          {/* {currentStep === 6 && (
            <DocumentsStep caseData={caseData} setCaseData={setCaseData} />
          )} */}
          {currentStep === 7 && (
            <ReviewStep caseData={caseData} />
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span className="inline-flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Auto-saved
            </span>
          </div>
          <div className="flex space-x-3">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            {currentStep < 7 && (
              <button
                onClick={handleSkip}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Skip
              </button>
            )}
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-[#EF4444] text-white rounded-md hover:bg-[#DC2626] flex items-center"
            >
              {currentStep === 7 ? 'Create Case' : 'Continue'}
              <span className="ml-2">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCaseFlowModal;