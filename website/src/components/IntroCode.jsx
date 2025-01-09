import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Copy } from 'lucide-react';

const TYPING_SPEED = {
    COMMENT: 50,
    CODE: 5
};

const IntroCode = forwardRef(({ onAnimationComplete, onSectionUpdate }, ref) => {
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

    // Expose the typeCode method to parent
    useImperativeHandle(ref, () => ({
        typeCode: (skip) => typeCode(skip)
    }));


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
 * Hm... maybe we should add some colors yeah! like an IDE
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
 * I did plenty of group projects together!
 * Some are silly personal sites like these hehe
 * And here they are!
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
 * UH oh this is kinda goofy...
 * But Im currently doing a compsci degree so uh... 
 * YEAHHH EDUCATIONNNN
 */

const education = [
    {
        institution: "University of New South Wales",
        degree: "Bachelor of Computer Science",
        years: "2022-2025"
    }
];`,
             style: {},
            section: 'education'
        },
        {
            content: `/*
 * Here are also some of my basic npc activities
 * Or what other people might call hobbies
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
 * If you wanna reach out... here are my socials! 
 * And thanks for watching this animation to the end if you did hehe
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

        if (skip) {
            // If skipping, immediately process all snippets
             for (const snippet of codeSnippets) {
                currentText += snippet.content + '\n';
                if (snippet.enableColors) {
                    setState(prev => ({
                        ...prev,
                        colorMode: true,
                        colorfulComments: true
                    }));
                }
                processCodeSection(currentText, snippet);
            }
            setState(prev => ({
                ...prev,
                displayedCode: currentText,
                animationCompleted: true
            }));
             onAnimationComplete();
            return;
        }

        // Normal typing animation logic
         for (const snippet of codeSnippets) {
             setState(prev => ({
                ...prev,
                 colorfulComments: snippet.enableColors || false
             }));

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
             await new Promise(resolve => setTimeout(resolve, 500));
            processCodeSection(currentText, snippet);
        }
        setState(prev => ({ ...prev, animationCompleted: true }));
        onAnimationComplete();

    };
     const processCodeSection = (text, snippet) => {
         if (snippet.section) {
            onSectionUpdate(snippet.section);
        }
        if (snippet === codeSnippets[1]) {
            setState(prev => ({
                ...prev,
                 colorMode: true
            }));
         }
    };


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
    );
});

export default IntroCode;