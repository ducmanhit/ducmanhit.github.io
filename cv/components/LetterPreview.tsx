import React from 'react';
import type { VerificationLetterData } from '../types';
import { Template1 } from './templates/Template1';
import { Template2 } from './templates/Template2';
import { Template3 } from './templates/Template3';
import { Template4 } from './templates/Template4';
import { Template5 } from './templates/Template5';
import { Template6 } from './templates/Template6';

interface LetterPreviewProps {
  data: VerificationLetterData;
  templateId: string;
  customLogoUrl: string | null;
  customWatermarkUrl: string | null;
}

export const LetterPreview: React.FC<LetterPreviewProps> = ({ data, templateId, customLogoUrl, customWatermarkUrl }) => {
    switch(templateId) {
        case 'classic':
            return <Template1 data={data} customLogoUrl={customLogoUrl} customWatermarkUrl={customWatermarkUrl} />;
        case 'modern':
            return <Template2 data={data} customLogoUrl={customLogoUrl} customWatermarkUrl={customWatermarkUrl} />;
        case 'elegant':
            return <Template3 data={data} customLogoUrl={customLogoUrl} customWatermarkUrl={customWatermarkUrl} />;
        case 'traditional':
            return <Template4 data={data} customLogoUrl={customLogoUrl} customWatermarkUrl={customWatermarkUrl} />;
        case 'creative':
            return <Template5 data={data} customLogoUrl={customLogoUrl} customWatermarkUrl={customWatermarkUrl} />;
        case 'official':
            return <Template6 data={data} customLogoUrl={customLogoUrl} customWatermarkUrl={customWatermarkUrl} />;
        default:
            return <Template1 data={data} customLogoUrl={customLogoUrl} customWatermarkUrl={customWatermarkUrl} />;
    }
};