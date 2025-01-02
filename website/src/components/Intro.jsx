import React, { useState, useEffect, useRef } from 'react';

const Intro = () => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [appliedStyles, setAppliedStyles] = useState({});
  const [showSkills, setShowSkills] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const codeRef = useRef(null);

  const codeSnippets = [
    {
      comment: `/* 
 * Hello! I'm Esther
 * A passionate developer crafting interactive web experiences.
 * 
 * Let me show you what I can do...
 * First, let's set up our development environment!
 */`,
      style: {
        body: {
          backgroundColor: '#1a1a1a',
          color: '#fff',
          fontFamily: 'monospace',
          padding: '20px',
          transition: 'all 0.5s ease',
        },
      },
    },
    {
      comment: `/* That's better! Now let's create a proper workspace.
 * Every good developer needs proper syntax highlighting...
 */`,
      style: {
        pre: {
          padding: '1.5rem',
          margin: '1rem',
          backgroundColor: '#2a2a2a',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
        },
      },
    },
    {
      comment: `/* Much better! Let me load my skills... */`,
      style: {},
      showSkills: true,
    },
    {
      comment: `/* And here are some of my projects! */`,
      style: {},
      showProjects: true,
    },
  ];

  useEffect(() => {
    const typeWriter = async () => {
      const currentSnippet = codeSnippets[currentStyleIndex];
      if (!currentSnippet) return;

      // Typing effect for comments
      for (let i = 0; i <= currentSnippet.comment.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 30));
        setDisplayedCode((prev) => currentSnippet.comment.slice(0, i));
      }

      // Apply styles and show content (Skills or Projects)
      setAppliedStyles((prev) => ({
        ...prev,
        ...currentSnippet.style,
      }));

      if (currentSnippet.showSkills) setTimeout(() => setShowSkills(true), 500);
      if (currentSnippet.showProjects) setTimeout(() => setShowProjects(true), 500);

      // Delay before moving to the next snippet
      if (currentStyleIndex < codeSnippets.length - 1) {
        setTimeout(() => setCurrentStyleIndex((prev) => prev + 1), 800);
      }
    };

    typeWriter();
  }, [currentStyleIndex]);

  // Auto-scroll for the code preview
  useEffect(() => {
    if (codeRef.current) {
      codeRef.current.scrollTop = codeRef.current.scrollHeight;
    }
  }, [displayedCode]);

  const syntaxHighlight = (text) => {
    if (!text) return '';
    return text
      .replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #6272a4;">$1</span>') // Comments
      .replace(/\b(const|let|var|function|return|if|else|class|import|from|export)\b/g, '<span style="color: #ff79c6;">$1</span>') // Keywords
      .replace(/(['"].*?['"])/g, '<span style="color: #f1fa8c;">$1</span>'); // Strings
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Left Side: Portfolio Content */}
      <div className="w-1/2 p-6">
        {showSkills && (
          <div className="skills-section mb-8 bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <ul className="grid grid-cols-2 gap-4">
              <li className="bg-gray-700 p-2 rounded-md">JavaScript</li>
              <li className="bg-gray-700 p-2 rounded-md">React</li>
              <li className="bg-gray-700 p-2 rounded-md">TailwindCSS</li>
              <li className="bg-gray-700 p-2 rounded-md">Node.js</li>
            </ul>
          </div>
        )}

        {showProjects && (
          <div className="projects-section bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold">Interactive Portfolio</h3>
                <p className="text-sm text-gray-400">Tech: React, TailwindCSS, Framer Motion</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-bold">E-Commerce Platform</h3>
                <p className="text-sm text-gray-400">Tech: Next.js, Stripe, PostgreSQL</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Side: IDE Code Preview */}
      <div className="w-1/2 bg-gray-800">
        <pre
          ref={codeRef}
          className="h-full p-6 overflow-auto text-sm font-mono"
          style={{ ...appliedStyles.pre }}
          dangerouslySetInnerHTML={{ __html: syntaxHighlight(displayedCode) }}
        ></pre>
      </div>
    </div>
  );
};

export default Intro;
