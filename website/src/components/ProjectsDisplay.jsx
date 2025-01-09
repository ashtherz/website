import React from 'react';
const ProjectsDisplay = ({ projects, colorMode }) => {
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
           <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f778ba]">Projects</h2>
              <div className="space-y-4">
                {projects.map((project, i) => (
                    <div key={i} className="bg-[#44475a] p-4 rounded-lg transform transition-all duration-300 opacity-0" style={{
                        animation: 'fadeInUp 0.5s ease-out forwards',
                          animationDelay: `${0.3 + (i * 0.1)}s`
                    }}>
                      <h3 className="font-bold text-[#e2a6e7]">{project.name}</h3>
                      <p className="text-sm text-[#73e2a6] mt-1">
                        {project.tech.map((tech, i) => (
                          <span key={i} className="inline-block px-2 py-1 bg-[#282a36] rounded-full text-[#a6c9e2] text-xs mr-2 mb-2">
                            {tech}
                          </span>
                        ))}
                      </p>
                      <p className="mt-2 text-[#f8f8f2]">{project.description}</p>
                      <a
                        href={`https://${project.github}`}
                        className="text-[#bf94e4] text-sm hover:underline mt-2 inline-block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project →
                      </a>
                    </div>
                 ))}
              </div>
            </div>
    );
};
export default ProjectsDisplay;