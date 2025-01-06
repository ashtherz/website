import React, { useState, useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { FaCopy } from 'react-icons/fa'; // Import the copy icon

const Intro = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [appliedPreStyles, setAppliedPreStyles] = useState({});
  const [showSkills, setShowSkills] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [colorfulComments, setColorfulComments] = useState(false);
  const [parsedSkills, setParsedSkills] = useState({});
  const [parsedProjects, setParsedProjects] = useState([]);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const codeRef = useRef(null);
    const contentRef = useRef(null);
  const [skippingAnimation, setSkippingAnimation] = useState(false);
  const [parsedContacts, setParsedContacts] = useState({});
    const [showContacts, setShowContacts] = useState(false);
     const [parsedEducation, setParsedEducation] = useState([]);
      const [showEducation, setShowEducation] = useState(false);
    const [parsedCopyContacts, setParsedCopyContacts] = useState({}); // New state for copyable contacts
    const [showCopyContacts, setShowCopyContacts] = useState(false) // New state for copyable contacts
     const [showHobbies, setShowHobbies] = useState(false);
    const [parsedHobbies, setParsedHobbies] = useState([]);
      const [firstScroll, setFirstScroll] = useState(true);
    const [lastSection, setLastSection] = useState(null);
      const [skillsText, setSkillsText] = useState('');


  const codeSnippets = [
    {
      content:
        `/* 
 * Hello! I am Esther :)
 * Im a 3rd year compsci student!
 * Based in Sydney and goes to UNSW :>
 * I like to sleep and code...
 * 
 * Oh... this site is kinda boring... whoops
 * Lets add colors frfr
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
      content:
        `/* 
 * That looks better! Lets make this look more like a proper IDE...
 * Time to add layouting!
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
      content:
        `/* 
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
        { name: "Rust", level: "Intermediate" }
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
      showSkills: true
    },
    {
      content:
        `/* 
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
      showProjects: true
    },
     {
      content:
 `/*
   * This is kinda goofy but...
   * I'm currently doing a degree in compsci...
   * Yes!! im educted ishh
   */

const education = [
    {
      institution: "University of New South Wales",
      degree: "Bachelor of Computer Science",
      years: "2022-2025",
    },
  ];`,
      style: {},
       showEducation: true,
    },
    {
        content:
`/*
 * And are some of my basic normal npc hobbies
 * ... dont judge me!!
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
        showHobbies: true
    },
    // Move contacts to the end
    {
        content:
            `/*
     * CONGRATS! you made it to the end
     * Ok ok... enough about my skills and projects...
     * If you wanna reach out... here are my socials (please dont spam me)
     */
    contacts = {
        email: "estherdjaidiguna@gmail.com",
        discord: "ashtherz",
    };`,
        style: {},
        showCopyContacts: true
    }
];
    const syntaxHighlight = (text) => {
        if (!text) return '';
        let highlighted = text;
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
        const parts = highlighted.split(/<span class="comment">|<\/span>/);
        for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
                parts[i] = parts[i]
                    .replace(/\b(const|let|var|function|return|import|export|from)\b(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, '<span style="color: #f778ba">$1</span>')  // Neon Pink
                    .replace(/(['"])(.*?)\1(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, '<span style="color: #e2a6e7">$1$2$1</span>')  // Light Purple
                    .replace(/\b(\d+)\b(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, '<span style="color: #a6c9e2">$1</span>')    // Light Blueish
                    .replace(/(\w+)(?=\s*\()(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, '<span style="color: #bf94e4">$1</span>') // Light Purple
                   .replace(/(\w+)(?=\s*:)(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, '<span style="color: #a6c9e2">$1</span>') // Light Blueish
                    .replace(/([{}\[\]])(?!(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*\1)/g, '<span style="color: #f778ba">$1</span>'); // Neon Pink
            } else {
                parts[i] = `<span style="color: #73e2a6">${parts[i]}</span>`; // Light Blueish
            }
        }
        return parts.join('');
    };

  const parseData = (text, type) => {
    try {
        if (!text) return type === 'skills' ? {} : type === 'contacts' ? {} : type === 'education' ? [] : type === 'copyContacts' ? {} : type === 'hobbies' ? [] : [];
        const regex = type === 'skills'
            ? /mySkills\s*=\s*({[\s\S]*?});/
            : type === 'projects'
                ? /projects\s*=\s*(\[[\s\S]*?\]);/
                : type === 'contacts'
                ? /contacts\s*=\s*({[\s\S]*?});/
              :  type === 'education'
                ? /education\s*=\s*(\[[\s\S]*?\]);/
              : type === 'copyContacts'
                ? /copyContacts\s*=\s*({[\s\S]*?});/
              : /hobbies\s*=\s*(\[[\s\S]*?\]);/
        const match = text.match(regex);
          if (!match) return type === 'skills' ? {} : type === 'contacts' ? {} : type === 'education' ? [] : type === 'copyContacts' ? {} : type === 'hobbies' ? [] : [];

        const jsonStr = match[1].replace(/,\s*([\]}])/g, '$1').replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2": ');
         return JSON.parse(jsonStr);
    } catch (error) {
       console.error(`Error parsing ${type}:`, error);
          return type === 'skills' ? {} : type === 'projects' ? [] : type === 'education' ? [] : type === 'copyContacts' ? {} : type === 'hobbies' ? [] : {};
    }
};

    const typeCode = async (skip = false) => {
        let currentText = '';

        for (let i = 0; i < codeSnippets.length; i++) {
            const snippet = codeSnippets[i];
            if (snippet.content.trim().startsWith('/*')) {
                currentText = '';
                setDisplayedCode('');
            }
            if (snippet.enableColors) {
                setColorfulComments(true);
            } else {
                setColorfulComments(false)
            }
             const lines = snippet.content.split('\n');
            for (let line of lines) {
                if (line.includes('/*') || line.includes('*')) {
                     if (skip) {
                         currentText += line;
                     } else {
                        for (let char of line) {
                             await new Promise(resolve => setTimeout(resolve, 50));
                             currentText += char;
                             setDisplayedCode(currentText);
                        }
                    }
                } else {
                      if (skip) {
                         currentText += line;
                    } else {
                         await new Promise(resolve => setTimeout(resolve, 40));
                        currentText += line;
                        setDisplayedCode(currentText);
                     }
                }
                  currentText += '\n';
                   setDisplayedCode(currentText);

                 if (snippet.showSkills) {
                    const skills = parseData(currentText, 'skills');
                    if (Object.keys(skills).length > 0) {
                        setParsedSkills(skills);
                         setShowSkills(true);
                           setLastSection('skills')
                     }
                }
                 if (snippet.showProjects) {
                    const projects = parseData(currentText, 'projects');
                    if (projects.length > 0) {
                       setParsedProjects(projects);
                        setShowProjects(true);
                         setLastSection('projects');
                    }
                }
                   if (snippet.showEducation) {
                     const education = parseData(currentText, 'education');
                      if (education.length > 0) {
                        setParsedEducation(education);
                         setShowEducation(true);
                         setLastSection('education');
                     }
                   }
                    if (snippet.showCopyContacts) {
                         const copyContacts = parseData(currentText, 'copyContacts');
                       if (Object.keys(copyContacts).length > 0) {
                           setParsedCopyContacts(copyContacts);
                             setShowCopyContacts(true);
                               setLastSection('copyContacts');
                         }
                    }
                   if (snippet.showHobbies) {
                       const hobbies = parseData(currentText, 'hobbies');
                         if(hobbies.length > 0){
                             setParsedHobbies(hobbies);
                             setShowHobbies(true);
                             setLastSection('hobbies');
                        }
                   }
            }
            if (i === 1 && snippet.style.pre) {
                setAppliedPreStyles(snippet.style.pre);
            }
        }
        setAnimationCompleted(true);
    };
   useEffect(() => {
        if (!skippingAnimation) {
            typeCode();
        }
    }, [skippingAnimation]);

     useEffect(() => {
        if (showSkills || showProjects ||  showEducation || showCopyContacts || showHobbies) {
             gsap.fromTo(
                 '.animate-fade-in-up',
                 { opacity: 0, y: 20 },
                 { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
             );
         }
    }, [showSkills, showProjects,  showEducation, showCopyContacts, showHobbies]);


    useEffect(() => {
      if (codeRef.current) {
         requestAnimationFrame(() => {
           codeRef.current.scrollTop = codeRef.current.scrollHeight;
         });
      }
    }, [displayedCode, codeRef.current]);
      useEffect(() => {
        if (contentRef.current && lastSection) {
            const element = contentRef.current.querySelector(`.animate-fade-in-up:last-child`);
             if(element){
                contentRef.current.scrollTo({
                    top: element.offsetTop - contentRef.current.offsetTop,
                    behavior: 'smooth',
                });
            }
         }
      }, [showSkills, showProjects,  showEducation, showCopyContacts, showHobbies, lastSection]);

    const handleSkipAnimation = () => {
        if (!animationCompleted) {
            setSkippingAnimation(true);
            typeCode(true);
        }
    };
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => {
            // set copy to true for 1 sec to update copy icon
            console.log('copied')
        })
        .catch(err => {
            console.error('Failed to copy text: ', err)
        })
    }

    return (
      <div className="flex min-h-screen bg-[#1e1e1e] relative bg-gradient-to-r from-[#2a2b33] to-[#1a1a1a] transition-all duration-500">
        <div className="w-1/2">
          <pre
            ref={codeRef}
            className="h-full overflow-auto font-mono  transition-all duration-500 hover:shadow-xl"
            style={{
              ...appliedPreStyles,
              lineHeight: '1.6',
              fontSize: '14px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
            }}
          >
            <code
              className="block whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: syntaxHighlight(displayedCode),
              }}
            />
          </pre>
        </div>
       <div className="w-1/2 p-6" ref={contentRef} style={{ overflowY: 'auto', height: '100vh'}}>
          <div className="space-y-6">
              {showSkills && Object.keys(parsedSkills).length > 0 && (
               <div className="animate-fade-in-up bg-[#282a36] rounded-lg p-6  transition-all duration-300">
                   <h2 className="text-2xl font-bold mb-4 text-[#f778ba]">Skills</h2>
                {/* Neon Pink */}
                   <div className="grid grid-cols-2 gap-6">
                      {Object.entries(parsedSkills).map(([category, items]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="text-lg font-semibold text-[#bf94e4] capitalize">
                         {category}
                      </h3>
                       <div className="space-y-2">
                        {items.map((item, i) => (
                           <div
                             key={i}
                             className="bg-[#44475a] p-2 rounded-lg flex justify-between items-center animate-fade-in  transition-all duration-300"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <span className="text-[#f8f8f2]">{item.name}</span>
                                 <span
                                  className={`text-sm ${
                                    item.level === 'Advanced'
                                        ? 'text-[#a6c9e2]'
                                        : // Light Blueish
                                    item.level === 'Intermediate'
                                    ? 'text-[#e2a6e7]'
                                      : // Light Purple
                                        'text-[#f778ba]' // Neon Pink
                                  }`}
                                 >
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
             {showProjects && parsedProjects.length > 0 && (
                    <div className="animate-fade-in-up bg-[#282a36] rounded-lg p-6 transition-all duration-300">
                            <h2 className="text-2xl font-bold mb-4 text-[#f778ba]">Projects</h2> {/* Neon Pink */}
                         <div className="space-y-4">
                                {parsedProjects.map((project, i) => (
                                  <div
                                     key={i}
                                       className="bg-[#44475a] p-4 rounded-lg transform transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${i * 200}ms` }}
                                >
                                 <h3 className="font-bold text-[#e2a6e7]">{project.name}</h3> {/* Light Purple */}
                                   <p className="text-sm text-[#73e2a6] mt-1"> {/* Light Blueish */}
                                            {project.tech.map((tech, i) => (
                                           <span key={i} className="inline-block px-2 py-1 bg-[#282a36] rounded-full text-[#a6c9e2] text-xs mr-2 mb-2"> {/* Light Blueish */}
                                            {tech}
                                        </span>
                                   ))}
                                </p>
                                <p className="mt-2 text-[#f8f8f2]">{project.description}</p>
                               <a
                                 href={`https://${project.github}`}
                                    className="text-[#bf94e4] text-sm hover:underline mt-2 inline-block" // Light Purple
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
                   {showEducation && parsedEducation.length > 0 && (
                <div className="animate-fade-in-up bg-[#282a36] rounded-lg p-6 transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-4 text-[#f778ba]">
                    Education
                  </h2>
                  {/* Neon Pink */}
                  <div className="space-y-4">
                    {parsedEducation.map((edu, i) => (
                      <div
                        key={i}
                        className="bg-[#44475a] p-4 rounded-lg transform transition-all duration-300 animate-fade-in"
                         style={{ animationDelay: `${i * 200}ms` }}
                      >
                        <h3 className="font-bold text-[#e2a6e7]">{edu.institution}</h3>
                        {/* Light Purple */}
                        <p className="mt-1 text-[#f8f8f2]">
                          {edu.degree}
                        </p>
                        <p className="mt-1 text-[#73e2a6]">{edu.years}</p>
                        {/* Light Blueish */}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {showHobbies && parsedHobbies.length > 0 && (
                  <div className="animate-fade-in-up bg-[#282a36] rounded-lg p-6  transition-all duration-300">
                    <h2 className="text-2xl font-bold mb-4 text-[#f778ba]">
                      Hobbies
                    </h2>
                    {/* Neon Pink */}
                      <div className="grid grid-cols-2 gap-4">
                          {parsedHobbies.map((hobby, i) => (
                              <div key={i} className="bg-[#44475a] p-4 rounded-lg transform  transition-all duration-300 animate-fade-in"
                                   style={{ animationDelay: `${200}ms` }}
                               >
                              <p className="mt-1 text-[#f8f8f2]">{hobby}</p>
                          </div>
                           ))}
                        </div>
                  </div>
                )}
              {showCopyContacts && Object.keys(parsedCopyContacts).length > 0 && (
                  <div className="animate-fade-in-up bg-[#282a36] rounded-lg p-6  transition-all duration-300">
                      <h2 className="text-2xl font-bold mb-4 text-[#f778ba]">
                          Copyable Contacts
                      </h2>
                      {/* Neon Pink */}
                        <div className="space-y-2">
                          {Object.entries(parsedCopyContacts).map(([key, value]) => (
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
          {!animationCompleted && (
            <button
                onClick={handleSkipAnimation}
                className="absolute bottom-4 right-4 bg-[#44475a] text-[#f8f8f2] py-2 px-4 rounded hover:bg-[#6272a4] transition-colors duration-200"
            >
                I'm boring and wanna skip animation
            </button>
        )}
      </div>
    );
};

export default Intro;