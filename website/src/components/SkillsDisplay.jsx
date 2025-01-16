import React from 'react';
import { SiJavascript, SiTypescript, SiPython, SiAndroid, SiCodeforces, SiGo, SiReact, SiNextdotjs,
    SiTailwindcss, SiHtml5, SiStyledcomponents, SiNodedotjs, SiExpress, SiDocker,
    SiPostgresql, SiGit, SiFigma, SiLinux, SiAmazon, SiCplusplus } from "react-icons/si";
const skillIcons = {
    JavaScript: <SiJavascript />,
    TypeScript: <SiTypescript />,
    Python: <SiPython />,
     "C/C++": <SiCplusplus />,
    Java: <SiAndroid />,
    Rust: <SiCodeforces />,
    Go: <SiGo />,
    React: <SiReact />,
    "Next.js": <SiNextdotjs />,
    TailwindCSS: <SiTailwindcss />,
    "HTML/CSS": <SiHtml5 />,
    "Styled Components": <SiStyledcomponents />,
    "Node.js": <SiNodedotjs />,
    "Express.js": <SiExpress />,
    Docker: <SiDocker />,
    PostgreSQL: <SiPostgresql />,
    Git: <SiGit />,
    Figma: <SiFigma />,
    Linux: <SiLinux />,
    AWS: <SiAmazon />
};

const SkillsDisplay = ({ skills, colorMode }) => {
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
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f778ba]">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="space-y-3">
                      <h3 className="text-lg font-semibold text-[#bf94e4] capitalize">{category}</h3>
                      <div className="space-y-2">
                          {items.map((item, i) => (
                          <div
                              key={i}
                              className="bg-[#44475a] p-3 rounded-lg flex items-center justify-between opacity-0"
                              style={{
                                  animation: 'fadeInUp 0.5s ease-out forwards',
                                  animationDelay: `${0.3 + (i * 0.1)}s`
                              }}
                              >
                                  <div className="flex items-center space-x-3">
                                      <span className="text-[#a6c9e2] text-xl">{skillIcons[item.name]}</span>
                                      <span className="text-[#f8f8f2]">{item.name}</span>
                                  </div>
                                  <span className={`text-sm px-2 py-1 rounded ${
                                    item.level === 'Advanced' ? 'bg-[#73e2a6] text-[#282a36]' :
                                    item.level === 'Intermediate' ? 'bg-[#e2a6e7] text-[#282a36]' :
                                        'bg-[#f778ba] text-[#282a36]'
                                  }`}>
                                      {item.level}
                                  </span>
                          </div>
                      ))}
                    </div>
                 </div>
                  ))}
              </div>
        </div>
    );
};

export default SkillsDisplay;