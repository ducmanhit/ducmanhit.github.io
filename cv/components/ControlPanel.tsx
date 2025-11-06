import React, { useRef, useState } from 'react';
import { DownloadIcon, GenerateIcon, ControlsIcon, BrandingIcon, UploadIcon, TrashIcon, TeacherIcon, CopyIcon, CheckIcon } from './icons/Icons';
import type { School, VerificationLetterData } from '../types';

interface ControlPanelProps {
  isLoading: boolean;
  onGenerate: () => void;
  onDownload: () => void;
  hasData: boolean;
  letterData: VerificationLetterData | null;
  schools: School[];
  templates: { id: string; name: string }[];
  selectedSchoolId: string;
  onSchoolChange: (id: string) => void;
  selectedTemplateId: string;
  onTemplateChange: (id: string) => void;
  onLogoUpload: (file: File) => void;
  onRemoveLogo: () => void;
  logoFileName: string | null;
  onWatermarkUpload: (file: File) => void;
  onRemoveWatermark: () => void;
  watermarkFileName: string | null;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <h2 className="flex items-center text-sm font-semibold text-gray-500 mb-4 tracking-wider uppercase">
            {icon}
            <span>{title}</span>
        </h2>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);


const FileUploader: React.FC<{
    label: string;
    fileName: string | null;
    onUpload: (file: File) => void;
    onRemove: () => void;
}> = ({ label, fileName, onUpload, onRemove }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            onUpload(file);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/svg+xml"
                className="hidden"
            />
            {!fileName ? (
                <button
                    onClick={handleUploadClick}
                    className="w-full flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 text-gray-500 font-semibold rounded-lg hover:bg-gray-100 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 text-sm"
                >
                    <UploadIcon />
                    Upload Image
                </button>
            ) : (
                <div className="flex items-center justify-between p-2 bg-gray-100 border border-gray-200 rounded-md text-sm">
                    <span className="text-gray-700 truncate">{fileName}</span>
                    <button onClick={onRemove} className="ml-2 text-red-500 hover:text-red-700">
                        <TrashIcon />
                    </button>
                </div>
            )}
        </div>
    );
};

export const ControlPanel: React.FC<ControlPanelProps> = (props) => {
    const {
        isLoading,
        onGenerate,
        onDownload,
        hasData,
        letterData,
        schools,
        templates,
        selectedSchoolId,
        onSchoolChange,
        selectedTemplateId,
        onTemplateChange,
        onLogoUpload,
        onRemoveLogo,
        logoFileName,
        onWatermarkUpload,
        onRemoveWatermark,
        watermarkFileName
    } = props;

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (letterData?.teacher.name) {
            navigator.clipboard.writeText(letterData.teacher.name);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };


    return (
        <div className="space-y-6 text-gray-800">

             <Section title="Document Settings" icon={<BrandingIcon />}>
                <div>
                    <label htmlFor="school-select" className="block text-sm font-medium text-gray-700 mb-1">
                        School
                    </label>
                    <select
                        id="school-select"
                        value={selectedSchoolId}
                        onChange={(e) => onSchoolChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                    >
                        {schools.map(school => (
                            <option key={school.id} value={school.id}>
                                {school.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="template-select" className="block text-sm font-medium text-gray-700 mb-1">
                        Template
                    </label>
                    <select
                        id="template-select"
                        value={selectedTemplateId}
                        onChange={(e) => onTemplateChange(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                    >
                        {templates.map(template => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </select>
                </div>
            </Section>

            <Section title="Custom Branding" icon={<BrandingIcon />}>
                <FileUploader
                    label="School Logo"
                    fileName={logoFileName}
                    onUpload={onLogoUpload}
                    onRemove={onRemoveLogo}
                />
                <FileUploader
                    label="Watermark / Seal"
                    fileName={watermarkFileName}
                    onUpload={onWatermarkUpload}
                    onRemove={onRemoveWatermark}
                />
            </Section>

             {letterData && (
                <Section title="Generated Details" icon={<TeacherIcon />}>
                    <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Teacher Name</label>
                        <div className="flex items-center justify-between p-2 pl-3 bg-gray-50 border border-gray-200 rounded-md text-sm">
                            <span className="text-gray-800 font-medium truncate">{letterData.teacher.name}</span>
                            <button
                                onClick={handleCopy}
                                className={`ml-2 p-1 rounded-md transition-colors duration-200 ${
                                    isCopied
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                                aria-label={isCopied ? "Copied" : "Copy name"}
                            >
                                {isCopied ? <CheckIcon /> : <CopyIcon />}
                            </button>
                        </div>
                    </div>
                </Section>
            )}

            <Section title="Controls" icon={<ControlsIcon />}>
                 <div className="grid grid-cols-1 gap-3">
                     <button
                        onClick={onGenerate}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200 text-sm shadow-sm"
                    >
                        <GenerateIcon />
                        {isLoading ? 'Generating...' : 'Generate New Letter'}
                    </button>
                    <button
                        onClick={onDownload}
                        disabled={!hasData || isLoading}
                        className="w-full flex items-center justify-center px-4 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 text-sm shadow-sm"
                    >
                        <DownloadIcon />
                        Download PDF
                    </button>
                 </div>
            </Section>
        </div>
    );
};