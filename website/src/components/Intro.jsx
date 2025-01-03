import React, { useState, useEffect, useRef } from 'react';

const Intro = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [appliedStyles, setAppliedStyles] = useState({});
  const [showSkills, setShowSkills] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [colorfulComments, setColorfulComments] = useState(false);
  const [parsedSkills, setParsedSkills] = useState({});
  const [parsedProjects, setParsedProjects] = useState([]);
  const codeRef = useRef(null);

  const codeSnippets = [
    {
      content: 
`/* 
 * Hello! I'm Esther
 * I like to sleep and code...
 * 
 * Hmm... this site is kinda boring
 * Lets add some colors and formatting!
 */

const theme = {
    background: '#1a1a1a',
    text: '#ffffff',
    accent: '#61dafb'
};`,
      style: {
        backgroundColor: '#1a1a1a',
        color: '#fff',
        fontFamily: 'monospace',
        padding: '20px'
      }
    },
    {
      content: 
`/* 
 * That looks better! Let's make this look more like a proper IDE...
 * Time to add some color to our syntax!
 */

const editorTheme = {
    syntax: {
        comments: '#6272a4',
        keywords: '#ff79c6',
        strings: '#f1fa8c',
        numbers: '#bd93f9',
        functions: '#50fa7b',
        variables: '#8be9fd'
    }
};`,
      style: {
        pre: {
          padding: '1.5rem',
          margin: '1rem',
          backgroundColor: '#1e1e1e',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
 * Well that looks a lot more pog!
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
      showSkills: true
    },
    {
      content: 
`/* 
 * And here are some of my super pog projects!
 */

const projects = [
    {
        name: "SPLIT",
        tech: ["React", "Next.js", "TailwindCSS"],
        description: "A web application that helps users easily split bills within large groups and track expenses by scanning or manually adding bills",
        github: "github.com/esther/split"
    },
    {
        name: "Nerd Station",
        tech: ["React", "Firebase", "Node.js"],
        description: "Award-winning study platform combining study tools with gamification elements - 3rd place at Google DSC Hackathon",
        github: "github.com/esther/nerd-station"
    },
    {
        name: "BeBetter",
        tech: ["React", "Express", "PostgreSQL"],
        description: "Social fitness app that calculates calories and exercise requirements, built during CSESoc x DevSoc Hackathon",
        github: "github.com/esther/bebetter"
    },
    {
        name: "Pi Website",
        tech: ["React", "TailwindCSS"],
        description: "Interactive website to help memorize and recite 314 digits of pi accurately",
        github: "github.com/esther/pi-website"
    }
];`,
      style: {},
      showProjects: true
    }
  ];

  const syntaxHighlight = (text) => {
    if (!text) return '';

    let highlighted = text;
    
    // First handle the multiline comments to avoid nested spans
    highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>');
    
    // Then handle other syntax elements, but skip content inside comments
    const parts = highlighted.split(/<span class="comment">|<\/span>/);
    
    for (let i = 0; i < parts.length; i++) {
      // Skip odd indices which are comment contents
      if (i % 2 === 0) {
        parts[i] = parts[i]
          .replace(/\b(const|let|var|function|return|import|export|from)\b/g, '<span style="color: #ff79c6">$1</span>')
          .replace(/(['"].*?['"])/g, '<span style="color: #f1fa8c">$1</span>')
          .replace(/\b(\d+)\b/g, '<span style="color: #bd93f9">$1</span>')
          .replace(/(\w+)(?=\s*\()/g, '<span style="color: #50fa7b">$1</span>')
          .replace(/(\w+)(?=\s*:)/g, '<span style="color: #8be9fd">$1</span>')
          .replace(/([{}\[\]])/g, '<span style="color: #ff79c6">$1</span>');
      } else {
        // For comment content, wrap it in a colored span
        parts[i] = `<span style="color: #6272a4">${parts[i]}</span>`;
      }
    }
    
    return parts.join('');

    return highlighted;
  };

  const parseData = (text, type) => {
    try {
      if (!text) return type === 'skills' ? {} : [];
      
      const regex = type === 'skills' 
        ? /mySkills\s*=\s*({[\s\S]*?});/
        : /projects\s*=\s*(\[[\s\S]*?\]);/;
      
      const match = text.match(regex);
      if (!match) return type === 'skills' ? {} : [];
      
      const jsonStr = match[1].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?\s*:/g, '"$2": ');
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error(`Error parsing ${type}:`, error);
      return type === 'skills' ? {} : [];
    }
  };

  useEffect(() => {
    const typeCode = async () => {
      const currentSnippet = codeSnippets[currentStyleIndex];
      if (!currentSnippet) return;

      if (currentSnippet.enableColors) {
        setColorfulComments(true);
      }

      let currentText = '';
      const lines = currentSnippet.content.split('\n');

      for (let line of lines) {
        if (line.includes('/*') || line.includes('*')) {
          for (let char of line) {
            await new Promise(resolve => setTimeout(resolve, 50));
            currentText += char;
            setDisplayedCode(currentText);
          }
        } else {
          await new Promise(resolve => setTimeout(resolve, 40));
          currentText += line;
          setDisplayedCode(currentText);
        }
        currentText += '\n';
        setDisplayedCode(currentText);

        // Parse data as it's being typed
        if (currentSnippet.showSkills) {
          const skills = parseData(currentText, 'skills');
          if (Object.keys(skills).length > 0) {
            setParsedSkills(skills);
            setShowSkills(true);
          }
        }
        if (currentSnippet.showProjects) {
          const projects = parseData(currentText, 'projects');
          if (projects.length > 0) {
            setParsedProjects(projects);
            setShowProjects(true);
          }
        }
      }

      setAppliedStyles(prev => ({
        ...prev,
        ...currentSnippet.style
      }));

      await new Promise(resolve => setTimeout(resolve, 1500));
      if (currentStyleIndex < codeSnippets.length - 1) {
        setCurrentStyleIndex(prev => prev + 1);
      }
    };

    typeCode();
  }, [currentStyleIndex]);

  useEffect(() => {
    if (codeRef.current) {
      requestAnimationFrame(() => {
        codeRef.current.scrollTop = codeRef.current.scrollHeight;
      });
    }
  }, [displayedCode]);

  return (
    <div className="flex min-h-screen overflow-hidden bg-[#1e1e1e]" style={appliedStyles}>
      <div className="w-1/2">
        <pre
          ref={codeRef}
          className="h-full overflow-auto font-mono"
          style={{
            ...appliedStyles.pre,
            padding: '1.5rem',
            lineHeight: '1.6',
            fontSize: '14px',
          }}
        >
          <code
            className="block whitespace-pre-wrap"
            dangerouslySetInnerHTML={{
              __html: syntaxHighlight(displayedCode) + '█'
            }}
          />
        </pre>
      </div>

      <div className="w-1/2 p-6">
        <div className="space-y-6">
          {showSkills && Object.keys(parsedSkills).length > 0 && (
            <div className="animate-fade-in-up bg-[#282a36] rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-[#50fa7b]">Skills</h2>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(parsedSkills).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <h3 className="text-lg font-semibold text-[#bd93f9] capitalize">{category}</h3>
                    <div className="space-y-2">
                      {items.map((item, i) => (
                        <div
                          key={i}
                          className="bg-[#44475a] p-2 rounded-lg flex justify-between items-center animate-fade-in"
                          style={{ animationDelay: `${i * 100}ms` }}
                        >
                          <span className="text-[#f8f8f2]">{item.name}</span>
                          <span className={`text-sm ${
                            item.level === 'Advanced' ? 'text-[#50fa7b]' :
                            item.level === 'Intermediate' ? 'text-[#f1fa8c]' :
                            'text-[#ff79c6]'
                          }`}>{item.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showProjects && parsedProjects.length > 0 && (
            <div className="animate-fade-in-up bg-[#282a36] rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-[#50fa7b]">Projects</h2>
              <div className="space-y-4">
                {parsedProjects.map((project, i) => (
                  <div
                    key={i}
                    className="bg-[#44475a] p-4 rounded-lg transform hover:scale-[1.02] transition-all duration-300 animate-fade-in"
                    style={{ animationDelay: `${i * 200}ms` }}
                  >
                    <h3 className="font-bold text-[#f1fa8c]">{project.name}</h3>
                    <p className="text-sm text-[#6272a4] mt-1">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="inline-block px-2 py-1 bg-[#282a36] rounded-full text-[#8be9fd] text-xs mr-2 mb-2">
                          {tech}
                        </span>
                      ))}
                    </p>
                    <p className="mt-2 text-[#f8f8f2]">{project.description}</p>
                    <a 
                      href={`https://${project.github}`}
                      className="text-[#bd93f9] text-sm hover:underline mt-2 inline-block"
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
        </div>
      </div>
    </div>
  );
};

export default Intro;