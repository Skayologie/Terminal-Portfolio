import React, { useState, useEffect, useRef } from 'react';

const TerminalPortfolio = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Portfolio data
  const portfolioData = {
    about: {
      name: "Jawad Boulmal",
      title: "Web/Mobile Developer",
      description: "Hi, I'm Jawad Boulmal, a skilled web developer proficient in HTML, CSS, JavaScript, PHP, MySQL, jQuery, Bootstrap, and Laravel.\n I specialize in creating interactive and user-friendly websites. \n Let's work together to bring your digital ideas to life!",
      location: "Morocco , Casablanca",
      email: "jawadboulmal@gmail.com",
      phone: "+212 632773027"
    },
    skills: [
      "JavaScript/TypeScript", "React", "Node.js", "Python","Php","Laravel","Flutter",
      "AI/ML", "Docker", "AWS", "MongoDB", "PostgreSQL",
      "Git", "Linux", "API Development"
    ],
    projects: [
      {
        name: "Code Space — Developer Community Platform",
        description: "Code Space is a community platform for developers to share knowledge, discuss programming topics, and collaborate on projects in a user-friendly environment.",
        tech: ["React", "Node.js", "Socket.io", "OpenAI API"],
        status: "Completed"
      },
      {
        name: "Qarib App",
        description: "Qarib is a Flutter app that connects users with local service providers for easy booking and real-time order tracking." ,
        tech: ["React", "Express", "MongoDB", "Stripe"],
        status: "In Progress"
      },
      {
        name: "Eventbrite-Inspired Event Management & Ticketing Platform",
        description: "An event management platform that enables users to create, discover, and manage events easily, with built-in ticket booking and promotion features.",
        tech: ["Python", "Flask", "Chart.js", "Weather API"],
        status: "Completed"
      }
    ],
    experience: [
      {
        company: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        period: "2022 - Present",
        description: "Led development of enterprise applications using modern web technologies"
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        period: "2020 - 2022",
        description: "Built scalable web applications and APIs for growing startup"
      }
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        school: "University of Nairobi",
        year: "2020",
        gpa: "3.8/4.0"
      }
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer",
      "MongoDB Certified Developer"
    ]
  };

  const commands = {
    help: () => `Available commands:
┌───────────────────────────────────────────────────────────────┐
│ help           - Show this help message                       │
│ about          - Learn about me                               │
│ skills         - View my technical skills                     │
│ projects       - See my projects                              │
│ experience     - View my work experience                      │
│ education      - See my educational background                │
│ certifications - View my certifications                       │
│ contact        - Get my contact information                   │
│ clear          - Clear the terminal                           │
│ sudo           - Try it and see what happens ;)               │
└───────────────────────────────────────────────────────────────┘`,

    about: () => `${portfolioData.about.name} - ${portfolioData.about.title}
════════════════════════════════════════════════════════════════

${portfolioData.about.description}

📍 Location: ${portfolioData.about.location}
📧 Email: ${portfolioData.about.email}
📱 Phone: ${portfolioData.about.phone}`,

    skills: () => `Technical Skills:
════════════════════════════════════════════════════════════════

${portfolioData.skills.map((skill, index) => `▸ ${skill}`).join('\n')}`,

    projects: () => `Projects:
════════════════════════════════════════════════════════════════

${portfolioData.projects.map((project, index) => `
📁 ${project.name} [${project.status}]
   ${project.description}
   Tech: ${project.tech.join(', ')}
`).join('\n')}`,

    experience: () => `Work Experience:
════════════════════════════════════════════════════════════════

${portfolioData.experience.map((exp, index) => `
🏢 ${exp.company}
   ${exp.position} | ${exp.period}
   ${exp.description}
`).join('\n')}`,

    education: () => `Education:
════════════════════════════════════════════════════════════════

${portfolioData.education.map((edu, index) => `
🎓 ${edu.degree}
   ${edu.school} | ${edu.year}
   GPA: ${edu.gpa}
`).join('\n')}`,

    certifications: () => `Certifications:
════════════════════════════════════════════════════════════════

${portfolioData.certifications.map((cert, index) => `🏆 ${cert}`).join('\n')}`,

    contact: () => `Contact Information:
════════════════════════════════════════════════════════════════

📧 Email: ${portfolioData.about.email}
📱 Phone    : ${portfolioData.about.phone}
🌐 LinkedIn: linkedin.com/in/jawad-boulmal
💼 GitHub: github.com/skayologie
📍 Location: ${portfolioData.about.location}`,

    clear: () => 'CLEAR',

    sudo: () => `[sudo] password for JawadBoulmal: 
Access denied. Nice try! 😄
This is a portfolio, not a real terminal.`,

    whoami: () => portfolioData.about.name,

    date: () => new Date().toString(),

    pwd: () => '/home/gatere/portfolio',

    ls: () => `about.txt  skills.txt  projects.txt  experience.txt  education.txt  contact.txt`,
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd]();
      if (result === 'CLEAR') {
        setHistory([]);
        return;
      }
      return result;
    } else if (trimmedCmd === '') {
      return '';
    } else {
      return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const output = executeCommand(input);
    const newEntry = {
      command: input,
      output: output,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newEntry]);
    setCommandHistory(prev => [...prev, input]);
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = {
      command: 'welcome',
      output: commands.about(),
      timestamp: new Date().toLocaleTimeString()
    };
    setHistory([welcomeMessage]);
  }, []);

  return (
      <div className="min-h-screen bg-black text-green-400 font-mono text-sm">
        {/* Header */}
        <div className="bg-gray-900 fixed w-full  px-4 py-2 border-b border-green-400">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-green-400 font-bold">{portfolioData.about.name}</h1>
              <p className="text-green-300 text-xs">{portfolioData.about.title}</p>
            </div>
            <div className="flex space-x-4 text-xs">
              <span>help</span>
              <span>about</span>
              <span>projects</span>
              <span>skills</span>
              <span>experience</span>
              <span>contact</span>
              <span>education</span>
              <span>certifications</span>
              <span>leadership</span>
              <span>sudo</span>
              <span>clear</span>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div
            ref={terminalRef}
            className="p-4 py-5 h-screen overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
        >
          {/* Command History */}
          {history.map((entry, index) => (
              <div key={index} className="mb-4">
                {entry.command !== 'welcome' && (
                    <div className="flex items-center">
                      <span className="text-green-300">JawadBoulmal@portfolio:~$</span>
                      <span className="ml-2 text-white">{entry.command}</span>
                    </div>
                )}
                <div className="mt-1 whitespace-pre-wrap text-green-400">
                  {entry.output}
                </div>
              </div>
          ))}

          {/* Current Input */}
          <div className="flex items-center   mb-5">
            <span className="text-green-300">JawadBoulmal@portfolio:~$</span>
            <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }}
                className="ml-2 bg-transparent border-none outline-none text-white flex-1 font-mono"
                placeholder="Type 'help' for available commands..."
                spellCheck="false"
                autoComplete="off"
            />
            <span className="animate-pulse">▊</span>
          </div>
        </div>

        {/* Footer */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 px-4 py-1 border-t border-green-400">
          <div className="flex justify-between items-center text-xs">
            <span>[Interactive 3D Card]</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
        </div>
      </div>
  );
};

export default TerminalPortfolio;