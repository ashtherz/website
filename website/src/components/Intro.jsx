import React, { useState, useEffect, useRef } from 'react';
import { FaCopy } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiPython, SiAndroid, SiCodeforces, SiGo, SiReact, SiNextdotjs,
    SiTailwindcss, SiHtml5, SiStyledcomponents, SiNodedotjs, SiExpress, SiDocker,
    SiPostgresql, SiGit, SiFigma, SiLinux, SiAmazon } from "react-icons/si";

const SITE_DATA = {
    skills: {
        languages: [
            { name: "JavaScript", level: "Advanced" },
            { name: "TypeScript", level: "Advanced" },
            { name: "Python", level: "Advanced" },
            { name: "Java", level: "Intermediate" },
            { name: "Rust", level: "Intermediate" },
            { name: "Go", level: "Intermediate" }
        ],
        frontend: [
            { name: "React", level: "Advanced" },
            { name: "Next.js", level: "Advanced" },
            { name: "TailwindCSS", level: "Advanced" },
            { name: "HTML/CSS", level: "Advanced" },
            { name: "Styled Components", level: "Intermediate" }
        ],
        backend: [
            { name: "Node.js", level: "Advanced" },
            { name: "Express.js", level: "Intermediate" },
            { name: "Docker", level: "Intermediate" },
            { name: "PostgreSQL", level: "Intermediate" }
        ],
        tools: [
            { name: "Git", level: "Advanced" },
            { name: "Figma", level: "Advanced" },
            { name: "Linux", level: "Intermediate" },
            { name: "AWS", level: "Intermediate" }
        ]
    },
    projects: [
        {
            name: "APIOverflow",
            description: "A super cool api hub library",
            tech: ["typescript", "react", "tailwind", "python", "prisma", "pytest", "mongodb", "docker"],
            github: "github.com/unsw-cse-comp99-3900/APIOverflow"
        },
        {
            name: "Nerd Station",
            description: "Award-winning study platform combining study tools with gamification elements - 3rd place at Google DSC Hackathon",
            tech: ["typescript", "figma", "tailwind"],
            github: "gdsc-hackathon-2023.web.app"
        },
        {
            name: "SPLIT",
            description: "A web application that helps users easily split bills within large groups and track expenses by scanning or manually adding bills",
            tech: ["docker", "express.js", "next.js", "react", "shadcn", "tailwind", "vercel"],
            github: "devpost.com/software/split-utm8ph"
        },
        {
            name: "BeBetter",
            description: "Social fitness app that calculates calories and exercise requirements, built during CSESoc x DevSoc Hackathon",
            tech: ["express.js", "gsap", "next.js", "react", "tailwind", "typescript"],
            github: "devpost.com/software/bebetter-vqs9fg"
        },
        {
            name: "Pi Website",
            description: "Interactive website to help memorize and recite 314 digits of pi accurately",
            tech: ["html", "css", "javascript"],
            github: "ashtherz.github.io/pi-cat/"
        }
    ],
    education: [
        {
            institution: "University of New South Wales",
            degree: "Bachelor of Computer Science",
            years: "2021-2024"
        }
    ],
    hobbies: [
        "Sleeping",
        "Coding",
        "Anime",
        "Genshin",
        "Project Sekai",
        "Being a menace to society"
    ],
    copyContacts: {
        email: "estherdjaidiguna@gmail.com",
        discord: "ashtherz",
        linkedin: "https://www.linkedin.com/in/esther-d-5629a91aa/",
        genshinUid: "822583810 (Asia)",
        projectSekaiId: "417921248480268288"
    }
};

const skillIcons = {
    JavaScript: <SiJavascript />,
    TypeScript: <SiTypescript />,
    Python: <SiPython />,
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

const Intro = () => {
    const [state, setState] = useState({
        displayedCode: '',
        colorfulComments: false,
        animationCompleted: false,
        colorMode: false,
        sections: {
            skills: { show: false, data: {} },
            projects: { show: false, data: [] },
            education: { show: false, data: [] },
            copyContacts: {show: false, data: {}},
            hobbies: { show: false, data: [] }
        },
        appliedPreStyles: {},
        lastSection: null
    });

    const codeRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (contentRef.current && state.lastSection) {
            const contentContainer = contentRef.current;
            contentContainer.scrollTo({
                top: contentContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [state.sections, state.lastSection]);
    
    const TYPING_SPEED = {
        COMMENT: 50,
        CODE: 5
    };

    const codeSnippets = [
        {
            content: `/* 
 * Hello! I am Esther :)
 * Im a 3rd year compsci student!
 * Based in Sydney and goes to UNSW :>
 * I like to sleep and code...
 * 
 * Oh... this site is kinda boring... whoops
 * Lemme try something!
 */

const theme = {
    background: '#1a1a1a',
    text: '#ffffff',
    accent: '#00ff9f'
};`,
            style: {
                backgroundColor: '#1a1a1a',
                color: '#ffffff',
                fontFamily: 'monospace',
                padding: '20px'
            }
        },
        {
            content: `/* 
 * Uh Oh that didnt do anything!
 * Hm... What if we make this look more like a proper IDE...
 * Time to add some color to our syntax!
 */

const editorTheme = {
    syntax: {
        comments: '#73e2a6',  // Light Blueish
        keywords: '#f778ba', // Neon Pink
        strings: '#e2a6e7', // Light Purple
        numbers: '#a6c9e2', // Light Blueish
        functions: '#bf94e4', // Light Purple
        variables: '#a6c9e2' // Light Blueish
    }
};`,
            style: {
                pre: {
                    padding: '1.5rem',
                    margin: '1rem',
                    backgroundColor: '#1e1e1e',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    transition: 'all 0.3s ease',
                    height: '100vh',
                    overflowY: 'auto'
                }
            },
            enableColors: true
        },
        {
            content: `/* 
 * Well thats better!
 * Wait so like you wanna know what my skills are?
 * Other than sleeping these are my technical skills!
 */

const mySkills = {
    languages: [
        { name: "JavaScript", level: "Advanced" },
        { name: "TypeScript", level: "Advanced" },
        { name: "Python", level: "Advanced" },
        { name: "Java", level: "Intermediate" },
        { name: "Rust", level: "Intermediate" },
        { name: "Go", level: "Intermediate" }
    ],
    frontend: [
        { name: "React", level: "Advanced" },
        { name: "Next.js", level: "Advanced" },
        { name: "TailwindCSS", level: "Advanced" },
        { name: "HTML/CSS", level: "Advanced" },
        { name: "Styled Components", level: "Intermediate" }
    ],
    backend: [
        { name: "Node.js", level: "Advanced" },
        { name: "Express.js", level: "Intermediate" },
        { name: "Docker", level: "Intermediate" },
        { name: "PostgreSQL", level: "Intermediate" }
    ],
    tools: [
        { name: "Git", level: "Advanced" },
        { name: "Figma", level: "Advanced" },
        { name: "Linux", level: "Intermediate" },
        { name: "AWS", level: "Intermediate" }
    ]
};`,
            style: {},
            section: 'skills'
        },
        {
            content: `/* 
 * And here are some of my super pog projects!
 */

const projects = [
    {
        name: "APIOverflow",
        description: "A super cool api hub library",
        tech: ["typescript", "react", "tailwind", "python", "prisma", "pytest", "mongodb", "docker"],
        github: "github.com/unsw-cse-comp99-3900/APIOverflow"
    },
    {
        name: "Nerd Station",
        description: "Award-winning study platform combining study tools with gamification elements - 3rd place at Google DSC Hackathon",
        tech: ["typescript", "figma", "tailwind"],
        github: "gdsc-hackathon-2023.web.app"
    },
    {
        name: "SPLIT",
        description: "A web application that helps users easily split bills within large groups and track expenses by scanning or manually adding bills",
        tech: ["docker", "express.js", "next.js", "react", "shadcn", "tailwind", "vercel"],
        github: "devpost.com/software/split-utm8ph"
    },
    {
        name: "BeBetter",
        description: "Social fitness app that calculates calories and exercise requirements, built during CSESoc x DevSoc Hackathon",
        tech: ["express.js", "gsap", "next.js", "react", "tailwind", "typescript"],
        github: "devpost.com/software/bebetter-vqs9fg"
    },
    {
        name: "Pi Website",
        description: "Interactive website to help memorize and recite 314 digits of pi accurately",
        tech: ["html", "css", "javascript"],
        github: "ashtherz.github.io/pi-cat/"
    }
];`,
            style: {},
            section: 'projects'
        },
        {
            content: `/*
 * And I also have an education
 */

const education = [
    {
        institution: "University of New South Wales",
        degree: "Bachelor of Computer Science",
        years: "2021-2024"
    }
];`,
            style: {},
            section: 'education'
        },
        {
            content: `/*
 * And here are my hobbies :)
 */

const hobbies = [
    "Sleeping",
    "Coding",
    "Anime",
    "Genshin",
    "Project Sekai",
    "Being a menace to society"
];`,
            style: {},
            section: 'hobbies'
        },
        {
            content: `/*
 * Ok ok... enough about my skills and projects...
 * If you wanna reach out... here are my copyable socials
 */

const copyContacts = {
    email: "estherdjaidiguna@gmail.com",
    discord: "ashtherz",
    linkedin: "https://www.linkedin.com/in/esther-d-5629a91aa/",
    genshinUid: "822583810 (Asia)",
    projectSekaiId: "417921248480268288"
};`,
            style: {},
            section: 'copyContacts'
        }
    ];


    const syntaxHighlight = (text) => {
        if (!text) return '';
        let highlighted = text;
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
        const parts = highlighted.split(/<span class="comment">|<\/span>/);
        
        // Define colors based on state
        const colors = state.colorMode ? {
            comments: '#73e2a6',
            keywords: '#f778ba',
            strings: '#e2a6e7',
            numbers: '#a6c9e2',
            functions: '#bf94e4',
            variables: '#a6c9e2'
        } : {
            comments: '#808080',
            keywords: '#ffffff',
            strings: '#c0c0c0',
            numbers: '#a0a0a0',
            functions: '#d0d0d0',
            variables: '#b0b0b0'
        };

        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
                parts[i] = parts[i]
                    .replace(/\b(const|let|var|function|return|import|export|from)\b(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, `<span style="color: ${colors.keywords}">$1</span>`)
                    .replace(/(['"])(.*?)\1(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, `<span style="color: ${colors.strings}">$1$2$1</span>`)
                    .replace(/\b(\d+)\b(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, `<span style="color: ${colors.numbers}">$1</span>`)
                    .replace(/(\w+)(?=\s*\()(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, `<span style="color: ${colors.functions}">$1</span>`)
                    .replace(/(\w+)(?=\s*:)(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, `<span style="color: ${colors.variables}">$1</span>`)
                    .replace(/([{}\[\]])(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, `<span style="color: ${colors.keywords}">$1</span>`);
            } else {
                parts[i] = `<span style="color: ${colors.comments}">${parts[i]}</span>`;
            }
        }
        return parts.join('');
    };

    const typeCode = async (skip = false) => {
        let currentText = '';
        for (const snippet of codeSnippets) {
            setState(prev => ({
                ...prev,
                colorfulComments: snippet.enableColors || false
            }));
        
            if (skip) {
              currentText = snippet.content;
              setState(prev => ({ ...prev, displayedCode: currentText }));
              processCodeSection(currentText, snippet);
              continue;
            }
        
            const lines = snippet.content.split('\n');
            for (const line of lines) {
              const delay = line.includes('/*') || line.includes('*')
                ? TYPING_SPEED.COMMENT
                : TYPING_SPEED.CODE;
        
              for (const char of line) {
                  await new Promise(resolve => setTimeout(resolve, delay));
                  currentText += char;
                  setState(prev => ({ ...prev, displayedCode: currentText }));
              }
              currentText += '\n';
            }
             await new Promise(resolve => setTimeout(resolve, 500))
            processCodeSection(currentText, snippet);

        }
          setState(prev => ({ ...prev, animationCompleted: true }));
    };
    const processCodeSection = (text, snippet) => {
        if (snippet.section) {
            setState(prev => ({
                ...prev,
                sections: {
                    ...prev.sections,
                    [snippet.section]: {
                        show: true,
                        data: SITE_DATA[snippet.section]
                    }
                },
                lastSection: snippet.section
            }));
        }
        // Enable colors after the second snippet
        if (snippet === codeSnippets[1]) {
            setState(prev => ({
                ...prev,
                colorMode: true
            }));
        }
    };

    const getContentSectionStyles = () => {
        if (!state.colorMode) {
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


  // Add keyframes for the fadeInUp animation
const fadeInUpKeyframes = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Add the styles to the document
useEffect(() => {
  const style = document.createElement('style');
  style.textContent = fadeInUpKeyframes;
  document.head.appendChild(style);
  return () => {
    document.head.removeChild(style);
  };
}, []);


    useEffect(() => {
        typeCode();
    }, []);

    useEffect(() => {
        if (codeRef.current) {
            requestAnimationFrame(() => {
                if (codeRef.current) {
                    codeRef.current.scrollTop = codeRef.current.scrollHeight;
                }
            });
        }
    }, [state.displayedCode]);


    return (
         <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-[#2a2b33] to-[#1a1a1a]">
            {/* Code Section */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-screen">
                <pre
                    ref={codeRef}
                    className="h-full overflow-auto font-mono text-sm md:text-base p-4 transition-all duration-500"
                    style={{
                        ...state.appliedPreStyles,
                        lineHeight: '1.6',
                        backgroundColor: '#1e1e1e',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
                        transition: 'all 0.5s ease-in-out'
                    }}
                >
                    <code
                        dangerouslySetInnerHTML={{
                            __html: syntaxHighlight(state.displayedCode)
                        }}
                    />
                </pre>
            </div>
            {/* Content Section */}
            <div 
                ref={contentRef}
                className="w-full md:w-1/2 p-4 md:p-6 overflow-y-auto h-[50vh] md:h-screen scroll-smooth"
                style={getContentSectionStyles()}
            >
                <div className="space-y-6">
           {/* Skills Section */}
           {state.sections.skills.show && (
               <div className="transform transition-all duration-500 ease-out opacity-0 translate-y-4 animate-in bg-[#282a36] rounded-lg p-4 md:p-6"
                    style={{
                        animation: 'fadeInUp 0.6s ease-out forwards',
                        animationDelay: '0.2s'
                    }}>
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f778ba]">Skills</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {Object.entries(state.sections.skills.data).map(([category, items]) => (
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
            )}
          {/* Projects Section */}
          {state.sections.projects.show && (
            <div className="transform transition-all duration-500 ease-out opacity-0 translate-y-4 animate-in bg-[#282a36] rounded-lg p-4 md:p-6" style={{
              animation: 'fadeInUp 0.6s ease-out forwards',
                animationDelay: '0.2s'
            }}>
               <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f778ba]">Projects</h2>
              <div className="space-y-4">
                {state.sections.projects.data.map((project, i) => (
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
                        View on GitHub →
                      </a>
                    </div>
                 ))}
              </div>
            </div>
          )}
          {/* Education Section */}
          {state.sections.education.show && (
                <div className="transform transition-all duration-500 ease-out opacity-0 translate-y-4 animate-in bg-[#282a36] rounded-lg p-4 md:p-6" style={{
                    animation: 'fadeInUp 0.6s ease-out forwards',
                      animationDelay: '0.2s'
                    }}>
                  <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f778ba]">Education</h2>
                  <div className="space-y-4">
                    {state.sections.education.data.map((edu, i) => (
                     <div key={i} className="bg-[#44475a] p-4 rounded-lg transform transition-all duration-300 opacity-0" style={{
                       animation: 'fadeInUp 0.5s ease-out forwards',
                            animationDelay: `${0.3 + (i * 0.1)}s`
                    }}>
                        <h3 className="font-bold text-[#e2a6e7]">{edu.institution}</h3>
                        <p className="mt-1 text-[#f8f8f2]">
                          {edu.degree}
                        </p>
                         <p className="mt-1 text-[#73e2a6]">{edu.years}</p>
                      </div>
                    ))}
                  </div>
                 </div>
          )}
                {/* Hobbies Section */}
              {state.sections.hobbies.show && (
                  <div className="transform transition-all duration-500 ease-out opacity-0 translate-y-4 animate-in bg-[#282a36] rounded-lg p-4 md:p-6" style={{
                        animation: 'fadeInUp 0.6s ease-out forwards',
                        animationDelay: '0.2s'
                    }}>
                   <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f778ba]">Hobbies</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {state.sections.hobbies.data.map((hobby, i) => (
                             <div key={i} className="bg-[#44475a] p-4 rounded-lg transform transition-all duration-300 opacity-0" style={{
                               animation: 'fadeInUp 0.5s ease-out forwards',
                                  animationDelay: `${0.3 + (i * 0.1)}s`
                               }}>
                                  <p className="mt-1 text-[#f8f8f2]">{hobby}</p>
                              </div>
                             ))}
                         </div>
                    </div>
                )}
                 {/* copyable contact Section */}
                    {state.sections.copyContacts.show && Object.keys(state.sections.copyContacts.data).length > 0 && (
                       <div className="transform transition-all duration-500 ease-out opacity-0 translate-y-4 animate-in bg-[#282a36] rounded-lg p-4 md:p-6" style={{
                         animation: 'fadeInUp 0.6s ease-out forwards',
                           animationDelay: '0.2s'
                      }}>
                    <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#f778ba]">
                        Copyable Contacts
                    </h2>
                      <div className="space-y-2">
                        {Object.entries(state.sections.copyContacts.data).map(([key, value]) => (
                          <div key={key} className="bg-[#44475a] rounded-lg p-4 flex justify-between items-center">
                                 <span className="text-[#f8f8f2]">
                                   {key === 'email' && "Email"}
                                   {key === 'discord' && "Discord"}
                                   {key === 'linkedin' && "LinkedIn"}
                                   {key === 'genshinUid' && "Genshin UID"}
                                  {key === 'projectSekaiId' && "Project Sekai ID"}
                               </span>
                                <span className="text-[#a6c9e2]">
                                     {value}
                                 </span>
                          </div>
                        ))}
                      </div>
                   </div>
                 )}
           </div>
       </div>
        {/* Skip Animation Button */}
        {!state.animationCompleted && (
           <button
               onClick={() => typeCode(true)}
              className="fixed bottom-4 right-4 bg-[#44475a] text-[#f8f8f2] py-2 px-4 rounded-lg
                        hover:bg-[#6272a4] transition-colors duration-200 z-50"
          >
              Skip Animation
          </button>
      )}
      </div>
   );
};

export default Intro;