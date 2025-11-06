import React from 'react';
import type { VerificationLetterData } from '../../types';

interface TemplateProps {
  data: VerificationLetterData;
  customLogoUrl: string | null;
  customWatermarkUrl: string | null;
}

// Elegant Minimalist Template
export const Template3: React.FC<TemplateProps> = ({ data, customLogoUrl, customWatermarkUrl }) => {
  const { school, teacher, principal, letter } = data;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      });
    } catch { return dateString; }
  };

  const processedBody = letter.body.split('\n').map((p, i) => <p key={i} className="mb-5">{p.trim()}</p>);
  const processedSubject = letter.subject.replace('Subject: ', '');

  return (
    <div 
      className="bg-white text-gray-700 p-16 font-sans shadow-lg border border-gray-300 relative overflow-hidden"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        fontFamily: "'Helvetica Neue', Arial, sans-serif", 
        fontSize: '11pt',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {customWatermarkUrl && (
        <img 
          src={customWatermarkUrl} 
          alt="Watermark" 
          className="absolute inset-0 w-full h-full object-contain m-auto opacity-10 pointer-events-none z-0"
        />
      )}
      <div className="relative z-10 flex flex-col flex-grow">
        <header className="flex justify-between items-center pb-8">
          <div className="w-20 h-20 flex items-center justify-center">
              {customLogoUrl && <img src={customLogoUrl} alt={`${school.name} Logo`} className="max-w-full max-h-full object-contain" />}
          </div>
          <div className="text-right">
              <h1 className="font-semibold text-2xl text-gray-800 tracking-wider">{school.name}</h1>
          </div>
        </header>

        <main className="flex-grow mt-10">
          <p className="text-sm text-gray-500 mb-8">{formatDate(letter.date)}</p>
          
          <h2 className="text-lg font-bold text-gray-900 mb-4">{processedSubject}</h2>
          <hr className="w-1/4 border-gray-200 mb-8" />
          
          <p className="mb-6">{letter.recipient},</p>
          
          <div className="text-base leading-relaxed text-left">
              {processedBody}
          </div>
        </main>

        <footer className="mt-16 text-sm">
          <p className="text-gray-600">Sincerely,</p>
          <div className="h-16 my-3"></div>
          <p className="font-semibold text-gray-800">{principal.name}</p>
          <p className="text-gray-600">{principal.title}</p>

          <div className="mt-12 pt-6 border-t border-gray-200 text-xs text-gray-400 text-center">
              <p>{school.address} | {school.phone} | {school.adminEmail}</p>
          </div>
        </footer>
      </div>
    </div>
  );
};