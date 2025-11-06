import React, { useState, useRef, useCallback, useEffect } from 'react';
import { generateLetterData } from './services/geminiService';
import type { VerificationLetterData } from './types';
import { LetterPreview } from './components/LetterPreview';
import { ControlPanel } from './components/ControlPanel';
import { CheckCircleIcon } from './components/icons/Icons';
import { schools, templates } from './data/schools';

declare const html2canvas: any;

declare global {
  interface Window {
    jspdf: any;
  }
}

const App: React.FC = () => {
  const [letterData, setLetterData] = useState<VerificationLetterData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>(schools[0].id);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(templates[0].id);
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [customWatermarkUrl, setCustomWatermarkUrl] = useState<string | null>(null);
  const [watermarkFileName, setWatermarkFileName] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLetterData(null);
    try {
      const selectedSchool = schools.find(s => s.id === selectedSchoolId);
      if (!selectedSchool) {
        throw new Error("Selected school not found.");
      }
      const data = await generateLetterData(selectedSchool);
      setLetterData(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedSchoolId]);

  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  const handleLogoUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setCustomLogoUrl(e.target.result as string);
                setLogoFileName(file.name);
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select a valid image file.");
    }
  };

  const handleRemoveLogo = () => {
    setCustomLogoUrl(null);
    setLogoFileName(null);
  };

  const handleWatermarkUpload = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setCustomWatermarkUrl(e.target.result as string);
                setWatermarkFileName(file.name);
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please select a valid image file.");
    }
  };

  const handleRemoveWatermark = () => {
    setCustomWatermarkUrl(null);
    setWatermarkFileName(null);
  };


  const handleDownloadPdf = useCallback(async () => {
    if (!previewRef.current || !previewRef.current.firstChild) return;

    if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
        console.error("PDF generation libraries not loaded.");
        alert("Could not download PDF. Required libraries are missing. Please check your internet connection and try again.");
        return;
    }

    const canvas = await html2canvas(previewRef.current.firstChild as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
    });
    const imgData = canvas.toDataURL('image/jpeg', 0.9); 
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`teacher-verification-${letterData?.teacher.name.replace(/\s/g, '_') || 'document'}.pdf`);
  }, [letterData]);

  return (
    <div className="min-h-screen bg-gray-200 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center">
            <CheckCircleIcon />
            <h1 className="text-xl font-semibold text-gray-800 ml-2">Teacher Verification Letter</h1>
        </div>
      </header>
      
      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-[450px] xl:w-[500px] bg-white lg:h-screen lg:overflow-y-auto p-4 sm:p-6 border-r border-gray-200">
          <ControlPanel
            isLoading={isLoading}
            onGenerate={handleGenerate}
            onDownload={handleDownloadPdf}
            hasData={!!letterData}
            letterData={letterData}
            schools={schools}
            templates={templates}
            selectedSchoolId={selectedSchoolId}
            onSchoolChange={setSelectedSchoolId}
            selectedTemplateId={selectedTemplateId}
            onTemplateChange={setSelectedTemplateId}
            onLogoUpload={handleLogoUpload}
            onRemoveLogo={handleRemoveLogo}
            logoFileName={logoFileName}
            onWatermarkUpload={handleWatermarkUpload}
            onRemoveWatermark={handleRemoveWatermark}
            watermarkFileName={watermarkFileName}
          />
        </aside>
        
        <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
            {isLoading && (
              <div className="flex flex-col items-center text-gray-600">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                 <p className="mt-4 text-lg">Generating with Gemini...</p>
                 <p className="text-sm">Please wait a moment.</p>
              </div>
            )}

            {error && <div className="text-red-600 bg-red-100 p-4 rounded-md border border-red-300">{error}</div>}

            {!isLoading && !error && !letterData && (
                <div className="text-center text-gray-500">
                    <h2 className="text-2xl font-semibold">No Letter to Display</h2>
                    <p className="mt-2">Please click "New Data" in the control panel to generate a new verification letter.</p>
                </div>
            )}
            
            {letterData && (
               <div ref={previewRef}>
                 <LetterPreview 
                    data={letterData} 
                    templateId={selectedTemplateId} 
                    customLogoUrl={customLogoUrl} 
                    customWatermarkUrl={customWatermarkUrl}
                 />
               </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default App;