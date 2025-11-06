import React from 'react';
import type { VerificationLetterData } from '../../types';

interface TemplateProps {
  data: VerificationLetterData;
  customLogoUrl: string | null;
  customWatermarkUrl: string | null;
}

// Creative & Colorful Template
export const Template5: React.FC<TemplateProps> = ({ data, customLogoUrl, customWatermarkUrl }) => {
  const { school, teacher, principal, letter } = data;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
    } catch { return dateString; }
  };

  const processedBody = letter.body.split('\n').map((p, i) => <p key={i} className="mb-4">{p.trim()}</p>);
  const processedSubject = letter.subject.replace(/{TEACHER_NAME}/g, teacher.name);

  return (
    <div 
      className="bg-white text-gray-800 shadow-lg border border-gray-300 relative overflow-hidden flex"
      style={{ width: '210mm', minHeight: '297mm', fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif" }}
    >
      {customWatermarkUrl && (
        <img 
          src={customWatermarkUrl} 
          alt="Watermark" 
          className="absolute inset-0 w-full h-full object-contain m-auto opacity-10 pointer-events-none z-0"
        />
      )}
      <div className="w-16 bg-cyan-500"></div>
      <div className="flex-1 p-16 relative z-10 flex flex-col">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="font-bold text-3xl text-cyan-700">{school.name}</h1>
            <p className="text-sm text-gray-500">{school.address}</p>
          </div>
           <div className="w-24 h-24 flex items-center justify-center flex-shrink-0 ml-8">
              {customLogoUrl && <img src={customLogoUrl} alt={`${school.name} Logo`} className="max-w-full max-h-full object-contain" />}
          </div>
        </header>

        <main className="flex-grow">
          <p className="text-right mb-10 text-gray-600">{formatDate(letter.date)}</p>
          
          <p className="mb-4">{letter.recipient},</p>
          
          <h2 className="text-lg font-bold text-cyan-800 pb-2 mb-6">{processedSubject}</h2>

          <div className="text-base leading-relaxed text-left text-gray-700">
              {processedBody}
          </div>
        </main>

        <footer className="mt-16 pt-6 border-t-2 border-cyan-100">
          <div className="flex justify-between items-end">
              <div>
                  <p className="text-gray-600">Warmly,</p>
                  <div className="h-16 my-2"></div>
                  <p className="font-bold text-lg">{principal.name}</p>
                  <p className="text-gray-600">{principal.title}</p>
              </div>
              <div className="text-right text-xs text-cyan-700">
                   <p><span className="font-semibold">E:</span> {school.adminEmail}</p>
                   <p><span className="font-semibold">P:</span> {school.phone}</p>
                   <p><span className="font-semibold">W:</span> {school.website}</p>
              </div>
          </div>
        </footer>
      </div>
    </div>
  );
};