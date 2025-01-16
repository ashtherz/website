import React, { useState, useEffect, useRef } from 'react';
import IntroCode from '../components/IntroCode';
import SkillsDisplay from '../components/SkillsDisplay';
import ProjectsDisplay from '../components/ProjectsDisplay';
import EducationDisplay from '../components/EducationDisplay';
import HobbiesDisplay from '../components/HobbiesDisplay';
import CopyableContacts from '../components/CopyableContacts';
import Sparkles from '../components/Sparkles';
import LoadingScreen from '../components/LoadingScreen';
import duckImage from '../images/duck.gif';

const SITE_DATA = {
    skills: {
        languages: [
            { name: "JavaScript", level: "Advanced" },
            { name: "Python", level: "Advanced" },
            { name: "C/C++", level: "Advanced" },
            { name: "Java", level: "Intermediate" },
            { name: "Rust", level: "Intermediate" },
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
            description: "A super cool API hub library",
            tech: ["typescript", "react", "tailwind", "python", "prisma", "pytest", "mongodb", "docker"],
            github: "github.com/unsw-cse-comp99-3900/APIOverflow",
            images: [
                "/images/apioverflow/img1.png",
                "/images/apioverflow/img2.png",
                "/images/apioverflow/img3.png",
                "/images/apioverflow/img4.png",
                "/images/apioverflow/img5.png"
            ]
        },
        {
            name: "Nerd Station",
            description: "Award-winning study platform combining study tools with gamification elements - 3rd place at Google DSC Hackathon",
            tech: ["typescript", "figma", "tailwind"],
            github: "gdsc-hackathon-2023.web.app",
            images: [
                "/images/nerd-station/img1.png",
                "/images/nerd-station/img2.png",
                "/images/nerd-station/img3.png"
            ]
        },
        {
            name: "SPLIT",
            description: "A web application that helps users easily split bills within large groups and track expenses by scanning or manually adding bills",
            tech: ["docker", "express.js", "next.js", "react", "shadcn", "tailwind", "vercel"],
            github: "devpost.com/software/split-utm8ph",
            images: [
                "/images/split/img1.png",
                "/images/split/img2.png",
                "/images/split/img3.png",
                "/images/split/img4.png",
                "/images/split/img5.png"
            ]
        },
        {
            name: "BeBetter",
            description: "Social fitness app that calculates calories and exercise requirements, built during CSESoc x DevSoc Hackathon",
            tech: ["express.js", "gsap", "next.js", "react", "tailwind", "typescript"],
            github: "devpost.com/software/bebetter-vqs9fg",
            images: [
                "/images/bebetter/img1.png",
                "/images/bebetter/img2.png",
                "/images/bebetter/img3.png",
                "/images/bebetter/img4.png"
            ]
        },
        {
            name: "Pi Website",
            description: "Interactive website to help memorize and recite 314 digits of pi accurately",
            tech: ["html", "css", "javascript"],
            github: "ashtherz.github.io/pi-cat/",
            images: ["/images/pi/img1.png"]
        },
        {
            name: "Society Marketing Bot",
            description: "A Discord bot that streamlines society marketing requests and approvals through an interactive form system.",
            tech: ["discord.py", "python"],
            github: "github.com/ashtherz/cpmsoc-bot",
            images: ["/images/cpm-bot/img1.png", "/images/cpm-bot/img2.png"]
        }
    ],    
    education: [
        {
            institution: "University of New South Wales",
            degree: "Bachelor of Computer Science",
            years: "2022-2024"
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

const Home = () => {
   const [state, setState] = useState({
        animationCompleted: false,
        colorMode: false,
        isLoading: true,
        sections: {
            skills: { show: false, data: {} },
            projects: { show: false, data: [] },
            education: { show: false, data: [] },
            copyContacts: { show: false, data: {} },
            hobbies: { show: false, data: [] }
        },
        lastSection: null
    });

    const contentRef = useRef(null);
    const introRef = useRef(null);


    useEffect(() => {
          // Simulate loading time (you can adjust this)
          const loadingTimer = setTimeout(() => {
              setState(prev => ({ ...prev, isLoading: false }));
         }, 2000); // Show loading screen for 2 seconds

        if (contentRef.current && state.lastSection) {
            const contentContainer = contentRef.current;
            contentContainer.scrollTo({
                top: contentContainer.scrollHeight,
                behavior: 'smooth'
            });
        }

          return () => clearTimeout(loadingTimer);
    }, [state.sections, state.lastSection]);


   const handleAnimationComplete = () => {
        setState(prev => ({ ...prev, animationCompleted: true }));
   };

    const handleSectionUpdate = (section) => {
        setState(prev => ({
            ...prev,
            sections: {
                ...prev.sections,
                [section]: {
                    show: true,
                    data: SITE_DATA[section]
                }
            },
            lastSection: section,
            colorMode: section === 'skills' ? true : prev.colorMode
        }));
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

    const handleSkipAnimation = () => {
        if (introRef.current) {
            introRef.current.typeCode(true);
            setState(prev => ({ ...prev, animationCompleted: true }));
        }
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

    if (state.isLoading) {
        return <LoadingScreen duckImage={duckImage} />;
    }

   return (
       <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-[#2a2b33] to-[#1a1a1a] relative">
           {/* Code Section */}
           <IntroCode
               onAnimationComplete={handleAnimationComplete}
                onSectionUpdate={handleSectionUpdate}
                ref={introRef}
           />
            {/* Content Section */}
            <div
                ref={contentRef}
                className="w-full md:w-1/2 p-4 md:p-6 overflow-y-auto h-[50vh] md:h-screen scroll-smooth"
                style={getContentSectionStyles()}
            >
                <div className="space-y-6">
                    {/* Skills Section */}
                    {state.sections.skills.show && (
                        <SkillsDisplay skills={state.sections.skills.data} colorMode={state.colorMode} />
                    )}
                    {/* Projects Section */}
                    {state.sections.projects.show && (
                        <ProjectsDisplay projects={state.sections.projects.data} colorMode={state.colorMode} />
                    )}
                    {/* Education Section */}
                    {state.sections.education.show && (
                        <EducationDisplay education={state.sections.education.data} colorMode={state.colorMode} />
                    )}
                    {/* Hobbies Section */}
                    {state.sections.hobbies.show && (
                        <HobbiesDisplay hobbies={state.sections.hobbies.data} colorMode={state.colorMode} />
                    )}
                    {/* copyable contact Section */}
                    {state.sections.copyContacts.show && Object.keys(state.sections.copyContacts.data).length > 0 && (
                        <CopyableContacts contacts={state.sections.copyContacts.data} colorMode={state.colorMode} />
                    )}
                </div>
           </div>
             {/* Add Sparkles when animation completes */}
             {state.animationCompleted && <Sparkles />}

         {/* Duck GIF */}
           {/* {state.animationCompleted && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
                  <img
                       src={duckImage}
                       alt="Duck"
                       className="w-16 md:w-20"
                   />
               </div>
           )} */}
           {/* Skip Animation Button */}
            {!state.animationCompleted && (
                <button
                     onClick={handleSkipAnimation}
                    className="fixed bottom-4 right-4 bg-[#44475a] text-[#f8f8f2] py-2 px-4 rounded-lg
                         hover:bg-[#6272a4] transition-colors duration-200 z-50"
                >
                    Skip Animation
               </button>
            )}
        </div>
    );
};

export default Home;