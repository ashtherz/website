import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

const CopyableContacts = ({ contacts, colorMode }) => {
    const [copiedStates, setCopiedStates] = useState({});
  
        const handleCopy = async (key, value) => {
          try {
            await navigator.clipboard.writeText(value);
            setCopiedStates({ ...copiedStates, [key]: true });
            
            // Reset the copied state after 2 seconds
            setTimeout(() => {
              setCopiedStates(prev => ({ ...prev, [key]: false }));
            }, 2000);
          } catch (err) {
            console.error('Failed to copy text: ', err);
          }
        };
    
      const getLabel = (key) => {
            const labels = {
              email: "Email",
              discord: "Discord",
              linkedin: "LinkedIn",
              genshinUid: "Genshin UID",
              projectSekaiId: "Project Sekai ID"
            };
            return labels[key] || key;
      };

    const getContentSectionStyles = () => {
        if (!colorMode) {
            return {
                "--skill-bg": "#333333",
                "--text-primary": "#ffffff",
                "--text-secondary": "#c0c0c0",
                "--card-bg": "#444444",
                "--accent": "#808080",
                transition: "all 0.5s ease-in-out"
            };
        }
        return {
            "--skill-bg": "#282a36",
            "--text-primary": "#f778ba",
            "--text-secondary": "#bf94e4",
            "--card-bg": "#44475a",
            "--accent": "#73e2a6",
            transition: "all 0.5s ease-in-out"
        };
    };

      return (
           <div className="transform transition-all duration-500 ease-out opacity-0 translate-y-4 animate-in bg-[#282a36] rounded-lg p-4 md:p-6" 
                  style={{
                      animation: 'fadeInUp 0.6s ease-out forwards',
                         animationDelay: '0.2s',
                         ...getContentSectionStyles()
                    }}>
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f778ba]">
                 Contacts
              </h2>
               <div className="space-y-2">
                    {Object.entries(contacts).map(([key, value]) => (
                          <div key={key} 
                               className="bg-[#44475a] rounded-lg p-4 flex items-center justify-between group hover:bg-[#4a4d5e] transition-colors duration-200">
                            <span className="text-[#f8f8f2]">{getLabel(key)}</span>
                              <div className="flex items-center gap-3">
                                  <span className="text-[#a6c9e2]">{value}</span>
                                  <button
                                    onClick={() => handleCopy(key, value)}
                                    className="text-[#73e2a6] hover:text-[#8ee8bb] transition-colors duration-200 p-1 rounded-md hover:bg-[#353846]"
                                    title="Copy to clipboard"
                                  >
                                    {copiedStates[key] ? (
                                      <div className="flex items-center gap-1">
                                        <Check size={16} />
                                        <span className="text-xs">Copied!</span>
                                      </div>
                                    ) : (
                                      <Copy size={16} />
                                    )}
                                  </button>
                              </div>
                          </div>
                    ))}
              </div>
         </div>
      );
};

export default CopyableContacts;