import React from 'react';
import type { VerificationLetterData } from '../../types';

interface TemplateProps {
  data: VerificationLetterData;
  customLogoUrl: string | null;
  customWatermarkUrl: string | null;
}

// Official Document Template
export const Template6: React.FC<TemplateProps> = ({ data, customLogoUrl, customWatermarkUrl }) => {
  const { school, teacher, principal, letter } = data;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      return new Date(date.getTime() + userTimezoneOffset).toLocaleDateString('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric',
      }).replace(/\//g, '.');
    } catch { return dateString; }
  };

  const processedBody = letter.body.split('\n').map((p, i) => <p key={i} className="mb-4">{p.trim()}</p>);
  const processedSubject = letter.subject.replace(/{TEACHER_NAME}/g, teacher.name);
  const referenceNumber = `REF: ${school.id.toUpperCase()}/${new Date(letter.date).getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`;

  return (
    <div 
      className="bg-white text-black shadow-lg relative overflow-hidden"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: '11pt'
      }}
    >
      {customWatermarkUrl && (
        <img 
          src={customWatermarkUrl} 
          alt="Watermark" 
          className="absolute inset-0 w-full h-full object-contain m-auto opacity-10 pointer-events-none z-0"
        />
      )}
      <div className="absolute inset-0 border-8 border-double border-gray-400 m-2"></div>
      <div className="relative z-10 p-16">
        <header className="text-center mb-12 border-b-2 border-gray-500 pb-4">
          <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center">
              {customLogoUrl && <img src={customLogoUrl} alt={`${school.name} Logo`} className="max-w-full max-h-full object-contain" />}
          </div>
          <h1 className="font-bold text-2xl uppercase tracking-widest">{school.name}</h1>
          <p className="text-xs text-gray-600 mt-1">{school.address}</p>
        </header>

        <main>
          <div className="flex justify-between items-start mb-10 font-mono text-sm">
             <div className="text-gray-700">
                <p><strong>To:</strong> {letter.recipient}</p>
                <p><strong>From:</strong> Office of the Headteacher</p>
             </div>
             <div className="text-right text-gray-700">
                <p><strong>Date:</strong> {formatDate(letter.date)}</p>
                <p><strong>Ref:</strong> {referenceNumber}</p>
             </div>
          </div>
          
          <p className="mb-6 font-bold uppercase tracking-wider">{processedSubject}</p>

          <div className="text-base leading-relaxed text-left border-t border-b border-gray-300 py-6">
              {processedBody}
          </div>
        </main>

        <footer className="mt-16">
          <p>Regards,</p>
          <div className="h-20 my-2"></div>
          <hr className="w-1/3 border-gray-400 mb-2" />
          <p className="font-bold">{principal.name}</p>
          <p>{principal.title}, {school.name}</p>
        </footer>

         <div className="absolute bottom-12 left-16 right-16 text-center font-mono text-xs text-gray-400">
            <p>OFFICIAL CORRESPONDENCE</p>
         </div>
      </div>
    </div>
  );
};