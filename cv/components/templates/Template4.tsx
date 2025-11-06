import React from 'react';
import type { VerificationLetterData } from '../../types';

interface TemplateProps {
  data: VerificationLetterData;
  customLogoUrl: string | null;
  customWatermarkUrl: string | null;
}

// Traditional Crest Template
export const Template4: React.FC<TemplateProps> = ({ data, customLogoUrl, customWatermarkUrl }) => {
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
      className="bg-white text-black p-16 font-serif shadow-lg border border-gray-300 relative overflow-hidden"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        fontFamily: "Georgia, 'Times New Roman', Times, serif", 
        fontSize: '12pt' 
      }}
    >
      {customWatermarkUrl && (
        <img 
          src={customWatermarkUrl} 
          alt="Watermark" 
          className="absolute inset-0 w-full h-full object-contain m-auto opacity-10 pointer-events-none z-0"
        />
      )}
      <div className="relative z-10">
        <header className="text-center mb-16">
          <div className="w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              {customLogoUrl && <img src={customLogoUrl} alt={`${school.name} Logo`} className="max-w-full max-h-full object-contain" />}
          </div>
          <h1 className="font-bold text-3xl tracking-wider">{school.name}</h1>
          <p className="text-sm text-gray-600 mt-2">{school.address}</p>
          <hr className="w-1/2 mx-auto mt-6 border-gray-300" />
        </header>

        <main>
          <p className="text-right mb-10">{formatDate(letter.date)}</p>
          
          <p className="mb-6">{letter.recipient},</p>
          
          <p className="mb-6 font-bold underline">{processedSubject}</p>

          <div className="text-base leading-relaxed text-left text-justify">
              {processedBody}
          </div>
        </main>

        <footer className="mt-20">
          <p>Sincerely,</p>
          <div className="h-20 my-2"></div>
          <p className="font-bold">{principal.name}</p>
          <p>{principal.title}</p>
        </footer>
      </div>
    </div>
  );
};