import React, { useState, useEffect } from 'react';
import {
  Code2,
  Terminal,
  ExternalLink,
  FileDown,
  Menu,
  X,
  Sun,
  Moon,
  CheckCircle2,
  Cpu,
  Brain,
  MessageSquare,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Share2,
  Award,
  ShieldCheck,
  FileText,
  BadgeCheck,
  Building,
  GraduationCap,
  Camera,
  RotateCcw,
  Upload,
  Mail,
  Copy,
  Check,
  MessageCircle,
  Send,
  Inbox,
  Building2,
  User,
  Clock,
  Trash2,
  Search
} from 'lucide-react';

interface CertificateData {
  id: string;
  eventTitle: string;
  certificateType: string;
  categoryBadge: string;
  heldDate: string;
  isoDate: string;
  organizer: string;
  collaborators: string;
  recipient: string;
  academicDetails: string;
  signatories: string[];
  citation: string;
  officialBodies: string[];
}

const CERTIFICATES: CertificateData[] = [
  {
    id: 'sih-2026',
    eventTitle: 'Smart India Hackathon (SIH) 2026 — Internal Hackathon Round',
    certificateType: 'Certificate of Participation',
    categoryBadge: 'NATIONAL LEVEL',
    heldDate: 'September 10, 2026',
    isoDate: '2026-09-10',
    organizer: 'Institute Startup Cell & MIIC-SATI in collaboration with the Department of CSE & AI',
    collaborators: 'Samrat Ashok Technological Institute (SATI), Vidisha',
    recipient: 'Kapil Dhwaj Singh Baghel',
    academicDetails: 'B.Tech CSE (Artificial Intelligence & Machine Learning)',
    signatories: [
      'Dr. Divya Rishi Sahu (Coordinator, Startup Cell & MIIC-SATI)',
      'Prof. (Dr.) Y. K. Jain (Director, SATI Vidisha)'
    ],
    citation:
      'The institute extends its sincere appreciation for your enthusiasm, dedication, and meaningful engagement throughout the event, and wishes you continued success and excellence in all your future endeavours.',
    officialBodies: [
      'Ministry of Education (Govt. of India)',
      'AICTE',
      'Ministry of Education Innovation Cell (MIC)',
      'MSME',
      'Madhya Pradesh Startup Centre',
      'Institution Innovation Council (IIC)'
    ]
  },
  {
    id: 'slab-ai-2026',
    eventTitle: 'SLAB Agentic AI Hackathon',
    certificateType: 'Certificate of Participation',
    categoryBadge: 'AGENTIC AI SPRINT',
    heldDate: 'August 22, 2026',
    isoDate: '2026-08-22',
    organizer: 'Coding Club (Learn | Build | Innovate) in partnership with WebCMD',
    collaborators: 'Samrat Ashok Technological Institute, Vidisha (Autonomous under RGPV, Bhopal)',
    recipient: 'Kapil Dhwaj Singh Baghel',
    academicDetails: 'Branch: AIML | Semester: 3rd | Year: 2nd',
    signatories: [
      'Dr. Y. K. Jain (Director, SATI Vidisha)',
      'Event Co-ordinator (Coding Club)',
      'Faculty Co-ordinator (SATI)'
    ],
    citation:
      'We proudly appreciate their enthusiastic participation, dedication, and contribution towards making the hackathon a successful and enriching experience.',
    officialBodies: [
      'Coding Club SATI',
      'WebCMD Community',
      'RGPV Bhopal'
    ]
  },
  {
    id: 'code-crack-2026',
    eventTitle: 'Code Crack 2.0 (Competitive Programming)',
    certificateType: 'Certificate of Participation',
    categoryBadge: 'COMPETITIVE CODING',
    heldDate: 'February 20, 2026',
    isoDate: '2026-02-20',
    organizer: 'NDLI Club of Samrat Ashok Technological Institute, Vidisha (M.P.)',
    collaborators: 'National Digital Library of India Project, Indian Institute of Technology (IIT) Kharagpur',
    recipient: 'Kapil Dhwaj Singh Baghel',
    academicDetails: 'B.Tech CSE (AI & ML), Samrat Ashok Technological Institute',
    signatories: [
      'Dr. Partha Pratim Das (Joint Principal Investigator, National Digital Library of India Project, IIT Kharagpur)'
    ],
    citation:
      'This is to certify that Kapil Dhwaj Singh Baghel has participated in the Code Crack 2.0 held on Feb. 20, 2026 organized by the NDLI Club of Samrat Ashok Technological Institute, Vidisha (M.P.).',
    officialBodies: [
      'Ministry of Education (Govt. of India)',
      'Indian Institute of Technology (IIT) Kharagpur',
      'NDLI Club Partner (National Digital Library of India)'
    ]
  },
  {
    id: 'debate-su-2026',
    eventTitle: 'English Debate Competition — SU 2026',
    certificateType: 'Certificate of Participation',
    categoryBadge: 'ORATORY & DEBATE',
    heldDate: 'March 24, 2026',
    isoDate: '2026-03-24',
    organizer: 'NDLI Club of Samrat Ashok Technological Institute, Vidisha (M.P.)',
    collaborators: 'National Digital Library of India Project, Indian Institute of Technology (IIT) Kharagpur',
    recipient: 'Kapil Dhwaj Singh Baghel',
    academicDetails: 'B.Tech CSE (AI & ML) - Minor Domain: Public Speaking',
    signatories: [
      'Dr. Partha Pratim Das (Joint Principal Investigator, National Digital Library of India Project, IIT Kharagpur)'
    ],
    citation:
      'This is to certify that Kapil Dhwaj Singh Baghel has participated in the English Debate Competition - SU 2026 held on March 24, 2026 organized by the NDLI Club of Samrat Ashok Technological Institute, Vidisha (M.P.).',
    officialBodies: [
      'Ministry of Education (Govt. of India)',
      'Indian Institute of Technology (IIT) Kharagpur',
      'NDLI Club Partner (National Digital Library of India)'
    ]
  }
];

interface RecruiterMessage {
  id: string;
  name: string;
  company: string;
  email: string;
  role: string;
  message: string;
  createdAt: string;
  status: 'new' | 'reviewed';
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateData | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('kaps2917official@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Fixed Profile Picture Asset
  const fixedProfileImage = '/profile.jpg';

  // Recruiter Direct Chat & Stored Database State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTab, setChatTab] = useState<'chat' | 'inbox'>('chat');
  const [messages, setMessages] = useState<RecruiterMessage[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Recruiter Intake Form State
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterCompany, setRecruiterCompany] = useState('');
  const [recruiterEmail, setRecruiterEmail] = useState('');
  const [recruiterRole, setRecruiterRole] = useState('');
  const [recruiterMessage, setRecruiterMessage] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);
  const [chatThread, setChatThread] = useState<Array<{ sender: 'recruiter' | 'kapil'; text: string; time: string }>>([]);

  // Inbox Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'reviewed'>('all');

  // Load Recruiter Messages from Database
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoadingMessages(true);
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages);
      }
    } catch (err) {
      console.error('Failed to load recruiter messages from database', err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recruiterName.trim() || !recruiterEmail.trim() || !recruiterMessage.trim()) {
      return;
    }

    setIsSending(true);
    const newMsg = {
      name: recruiterName.trim(),
      company: (recruiterCompany || 'Confidential').trim(),
      email: recruiterEmail.trim(),
      role: (recruiterRole || 'Technical Role').trim(),
      message: recruiterMessage.trim(),
    };

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      });
      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [data.message, ...prev]);
        setSentSuccess(true);
        const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setChatThread((prev) => [
          ...prev,
          { sender: 'recruiter', text: recruiterMessage.trim(), time: timeNow },
          {
            sender: 'kapil',
            text: `Thank you, ${recruiterName}! Your message regarding ${newMsg.role} at ${newMsg.company} has been saved directly into Kapil's portfolio database. Kapil will review your inquiry and reach back out to you at ${newMsg.email}.`,
            time: timeNow,
          },
        ]);
        setRecruiterMessage('');
      }
    } catch (err) {
      console.error('Failed to save recruiter message to database', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: 'new' | 'reviewed') => {
    const nextStatus = currentStatus === 'new' ? 'reviewed' : 'new';
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: nextStatus } : m))
        );
      }
    } catch (err) {
      console.error('Failed to update message status', err);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete message', err);
    }
  };

  // Dark Mode State with Local Storage Persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('portfolio-theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return true; // Default to sleek dark mode
    }
    return true;
  });

  // Synchronize dark mode class on document element and save to localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('portfolio-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('portfolio-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Interactive Personal Touch: Typing effect in the Hero section
  const [typedText, setTypedText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'AI & Machine Learning Enthusiast',
    'Full-Stack Web Developer',
    'Public Speaker & Technical Orator',
    'Algorithmic Problem Solver'
  ];

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedText.length < currentPhrase.length) {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
      }, 70);
    } else if (!isDeleting && typedText.length === currentPhrase.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1600);
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length - 1));
      }, 35);
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      timeout = setTimeout(() => {}, 200);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  // Scroll spy to highlight active nav item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'achievements', 'contact'];
      const scrollY = window.scrollY;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when certificate modal or recruiter chat modal is open
  useEffect(() => {
    if (selectedCertificate || isChatOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCertificate, isChatOpen]);

  // Filtered recruiter messages for database view
  const filteredMessages = messages.filter((msg) => {
    const matchesFilter =
      statusFilter === 'all' ||
      (statusFilter === 'new' && msg.status === 'new') ||
      (statusFilter === 'reviewed' && msg.status === 'reviewed');
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      q === '' ||
      msg.name.toLowerCase().includes(q) ||
      msg.company.toLowerCase().includes(q) ||
      msg.email.toLowerCase().includes(q) ||
      msg.role.toLowerCase().includes(q) ||
      msg.message.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  // Resume Download Handler
  const handleDownloadResume = () => {
    const resumeContent = `===================================================================
KAPIL DHWAJ SINGH BAGHEL
B.Tech CSE (Artificial Intelligence & Machine Learning)
Current Standing: 2nd Year, 3rd Semester (AIML)
Samrat Ashok Technological Institute, Vidisha (Autonomous Estd. 1960)
Affiliated to RGPV Bhopal | Approved by AICTE | NAAC & NBA Accredited
Email: kaps2917official@gmail.com
===================================================================

PROFILE SUMMARY
Enthusiastic about exploring intelligent systems, data-driven solutions,
and their real-world applications, with a particular interest in bridging
theoretical concepts with practical innovations.

DOMAINS
- Major Domain: Technical Engineering
- Minor Domain: Public Speaking (Debate, Extempore & Presentation)

TECHNICAL SKILLS
- Programming Languages: C/C++, Python (Pandas, Numpy, Matplotlib), JavaScript
- Web Development: React, Node.js, Express, Tailwind CSS
- Databases: MySQL, PostgreSQL
- Core Concepts: OOPs, Data Structures & Algorithms, RESTful APIs

SOFT SKILLS
- Public Speaking & Technical Presentation
- Critical Thinking & Analytical Reasoning
- Quick Reasoning & Spontaneous Articulation
- Communication
- Confidence

NOTABLE PROJECTS
1. RailSync AI
   Real-time railway network ETA prediction and congestion analyzer using
   machine learning regression. Evaluates track occupancy telemetry,
   historical route delays, and dynamic station dwell times.
   Stack: Python, Scikit-learn, Pandas, NumPy

2. Webcmder
   Comprehensive web platform engineered for workflow management and candidate
   assignment evaluation. Automated submission pipelines, structured mentor
   rubrics, and dynamic role-based access.
   Stack: React, Node.js, Express, Tailwind CSS

3. Full-Stack Task Management App
   High-concurrency task orchestration platform built with a normalized
   relational schema. Delivers ACID-compliant state synchronization and
   high-performance database querying.
   Stack: React, Node.js, Express, PostgreSQL

VERIFIED CERTIFICATES & COMPETITIVE ACHIEVEMENTS
1. Smart India Hackathon (SIH) 2026 - Internal Hackathon Round
   - Date: September 10, 2026
   - Organizers: Institute Startup Cell & MIIC-SATI in collaboration with
     the Department of CSE & AI, SATI Vidisha
   - Supporting Bodies: Ministry of Education, AICTE, MIC, MSME
   - Status: Successfully cleared internal hackathon evaluation round

2. SLAB Agentic AI Hackathon
   - Date: August 22, 2026
   - Organizers: Coding Club (Learn | Build | Innovate) & WebCMD
   - Candidate Record: Branch AIML, Semester 3rd, Year 2nd
   - Signatory: Dr. Y. K. Jain (Director, SATI Vidisha)

3. Code Crack 2.0 (Competitive Programming)
   - Date: February 20, 2026
   - Organizers: NDLI Club of SATI Vidisha & IIT Kharagpur (NDLI Project)
   - Signatory: Dr. Partha Pratim Das (Joint Principal Investigator, IIT KGP)

4. English Debate Competition - SU 2026
   - Date: March 24, 2026
   - Organizers: NDLI Club of SATI Vidisha & IIT Kharagpur (NDLI Project)
   - Signatory: Dr. Partha Pratim Das (Joint Principal Investigator, IIT KGP)

PROFILES
- GitHub: https://github.com
- LinkedIn: https://linkedin.com
===================================================================`;

    const blob = new Blob([resumeContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kapil_Dhwaj_Singh_Baghel_Resume.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b1326] text-slate-900 dark:text-[#dae2fd] font-sans transition-colors duration-200">
      {/* Sticky Top Navigation */}
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-[#0b1326]/90 backdrop-blur-md border-b border-slate-200 dark:border-[#1e293b] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#hero"
            className="flex items-center gap-2 group text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] dark:focus:ring-[#3b82f6] rounded px-1"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600 ring-2 ring-slate-100 dark:ring-slate-800 shadow-xs shrink-0 bg-slate-100 dark:bg-slate-800">
              <img
                src={fixedProfileImage}
                alt="Kapil Dhwaj Singh Baghel"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white group-hover:text-[#1e3a8a] dark:group-hover:text-[#90a8ff] transition-colors">
              Kapil Dhwaj Singh Baghel
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs" aria-label="Main Navigation">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'achievements', label: 'Achievements & Certificates' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1.5 rounded transition-colors ${
                  activeSection === item.id
                    ? 'bg-slate-100 dark:bg-[#171f33] text-slate-900 dark:text-white font-semibold border border-slate-300 dark:border-[#334155]'
                    : 'text-slate-600 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#131b2e]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Header Controls: Recruiter Portal, Theme Toggle & Resume CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Recruiter Chat Button */}
            <button
              type="button"
              onClick={() => {
                setIsChatOpen(true);
                setChatTab('chat');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-50 dark:bg-[#1e3a8a]/40 hover:bg-blue-100 dark:hover:bg-[#1e3a8a]/70 text-[#1e3a8a] dark:text-[#90a8ff] border border-blue-200 dark:border-[#2563eb]/40 text-xs font-mono font-medium transition-colors cursor-pointer"
              title="Direct Recruiter Chat"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Recruiter Chat</span>
            </button>

            {/* Recruiter Inbox Database Button */}
            <button
              type="button"
              onClick={() => {
                setIsChatOpen(true);
                setChatTab('inbox');
              }}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#131b2e] dark:hover:bg-[#171f33] text-slate-700 dark:text-[#dae2fd] border border-slate-300 dark:border-[#2d3a54] text-xs font-mono font-medium transition-colors cursor-pointer relative"
              title="View Stored Recruiter Inquiries Database"
            >
              <Inbox className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#90a8ff]" />
              <span>Inbox</span>
              {messages.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                  {messages.length}
                </span>
              )}
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#131b2e] dark:hover:bg-[#171f33] text-slate-700 dark:text-[#b6c4ff] border border-slate-300 dark:border-[#2d3a54] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] dark:focus:ring-[#3b82f6]"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1e3a8a] text-white hover:bg-[#2563eb] text-xs font-mono font-medium transition-all shadow-sm border border-[#3b82f6]/30 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-[#131b2e] text-slate-700 dark:text-[#b6c4ff] border border-slate-300 dark:border-[#2d3a54]"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-slate-700 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] dark:focus:ring-[#3b82f6]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            className="md:hidden bg-white dark:bg-[#0d162d] border-b border-slate-200 dark:border-[#1e293b] px-4 pt-2 pb-4 space-y-1 font-mono text-xs transition-colors duration-200"
            aria-label="Mobile Navigation"
          >
            {[
              { id: 'hero', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'achievements', label: 'Achievements & Certificates' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded ${
                  activeSection === item.id
                    ? 'bg-[#1e3a8a] text-white font-semibold'
                    : 'text-slate-600 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#131b2e]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsChatOpen(true);
                  setChatTab('chat');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-blue-50 dark:bg-[#1e3a8a]/40 text-[#1e3a8a] dark:text-[#90a8ff] text-xs font-mono font-medium border border-blue-200 dark:border-[#2563eb]/40"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct Recruiter Chat</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsChatOpen(true);
                  setChatTab('inbox');
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-slate-100 dark:bg-[#171f33] text-slate-800 dark:text-[#dae2fd] text-xs font-mono font-medium border border-slate-300 dark:border-[#334155]"
              >
                <Inbox className="w-4 h-4 text-[#1e3a8a] dark:text-[#90a8ff]" />
                <span>Recruiter Inbox Database ({messages.length})</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDownloadResume();
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded bg-[#1e3a8a] text-white text-xs font-mono"
              >
                <FileDown className="w-4 h-4" />
                Download Resume
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200 dark:border-[#1e293b] relative overflow-hidden"
          aria-labelledby="hero-heading"
        >
          {/* Subtle engineering grid backdrop */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04] dark:opacity-[0.03] bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] dark:bg-[radial-gradient(#90a8ff_1px,transparent_1px)] [background-size:20px_20px]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 lg:gap-14">
            {/* Left Content Column */}
            <div className="flex-1 max-w-2xl">
              {/* Academic Status Chip with verified semester from certificate */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-[#131b2e] border border-blue-200 dark:border-[#2d3a54] text-[#1e3a8a] dark:text-[#90a8ff] text-xs font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#1e3a8a] dark:bg-[#3b82f6] animate-pulse" aria-hidden="true" />
                  <span>B.TECH CSE (AIML) &bull; 2ND YEAR / 3RD SEMESTER</span>
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-100 dark:bg-[#171f33] border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-[#dae2fd] text-xs font-mono">
                  <BadgeCheck className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#3b82f6]" aria-hidden="true" />
                  <span>4 VERIFIED CREDENTIALS</span>
                </span>
              </div>

              {/* Candidate Name */}
              <h1
                id="hero-heading"
                className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-4"
              >
                Kapil Dhwaj Singh Baghel
              </h1>

              {/* Interactive Feature: Subtle Typing Display */}
              <div className="h-9 sm:h-11 flex items-center mb-6" aria-live="polite">
                <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#1e3a8a] dark:text-[#90a8ff] font-mono">
                  {typedText}
                </span>
                <span
                  className="inline-block w-2 sm:w-2.5 h-6 sm:h-8 bg-[#1e3a8a] dark:bg-[#3b82f6] ml-1.5 animate-pulse"
                  aria-hidden="true"
                />
              </div>

              {/* Verbatim Headline */}
              <p className="text-base sm:text-lg text-slate-700 dark:text-[#c5c5d3] leading-relaxed mb-4 max-w-xl">
                2nd-year B.Tech CSE (Artificial Intelligence &amp; Machine Learning) student at Samrat Ashok Technological Institute, Vidisha.
              </p>

              {/* Verbatim Sub-headline */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#171f33] border border-slate-300 dark:border-[#2d3a54] font-mono text-xs sm:text-sm text-[#1e3a8a] dark:text-[#b6c4ff] mb-8">
                <span>Major Domain: Technical</span>
                <span className="text-slate-400 dark:text-[#475569]">|</span>
                <span>Minor Domain: Public speaking</span>
              </div>

              {/* Quick Action Navigation Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#1e3a8a] hover:bg-[#2563eb] text-white text-sm font-semibold transition-all shadow-sm border border-[#3b82f6]/40"
                >
                  <span>View Projects</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="#achievements"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white dark:bg-[#171f33] hover:bg-slate-100 dark:hover:bg-[#222a3d] text-slate-900 dark:text-white text-sm font-medium transition-all border border-slate-300 dark:border-[#334155]"
                >
                  <Award className="w-4 h-4 text-[#1e3a8a] dark:text-[#90a8ff]" />
                  <span>Verified Certificates</span>
                </a>

                <a
                  href="#about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-white dark:bg-[#171f33] hover:bg-slate-100 dark:hover:bg-[#222a3d] text-slate-900 dark:text-white text-sm font-medium transition-all border border-slate-300 dark:border-[#334155]"
                >
                  <span>About &amp; Skills</span>
                </a>
              </div>
            </div>

            {/* Right Side: Utilizing Available Space with Prominent Profile Showcase & Dossier Card */}
            <div className="w-full lg:w-auto flex flex-col items-center lg:items-end shrink-0 pt-2 lg:pt-0">
              <div className="bg-white/90 dark:bg-[#131b2e]/90 backdrop-blur-sm border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col items-center text-center max-w-sm w-full transition-all duration-200 group">
                
                {/* Fixed Profile Picture in Circular Frame with Light Border */}
                <div className="relative mb-4">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 lg:w-52 lg:h-52 rounded-full p-1.5 sm:p-2 bg-white dark:bg-[#0b1326] border-2 sm:border-[3px] border-slate-200 dark:border-slate-600/80 shadow-2xl ring-4 ring-slate-100 dark:ring-slate-800/80 transition-all duration-300">
                    <div className="w-full h-full rounded-full overflow-hidden relative bg-slate-100 dark:bg-[#0b1326]">
                      <img
                        src={fixedProfileImage}
                        alt="Kapil Dhwaj Singh Baghel Profile"
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Identity Details */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5">
                  Kapil Dhwaj Singh Baghel
                </h3>
                <p className="text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff] mb-4 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>B.Tech CSE (AIML) &bull; SATI Vidisha</span>
                </p>

                {/* Quick Academic & Hackathon Highlights */}
                <div className="w-full space-y-2 text-left font-mono text-[11px] bg-slate-50 dark:bg-[#171f33] p-3 rounded-xl border border-slate-200 dark:border-[#2d3a54]">
                  <div className="flex items-center justify-between text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">SIH 2026:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Cleared Internal Round</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Hackathons:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd]">SLAB AI &bull; Code Crack 2.0</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Public Speaking:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd]">English Debate SU '26</span>
                  </div>
                </div>

                {/* Direct Contact Channels */}
                <div className="w-full mt-3 pt-3 border-t border-slate-200 dark:border-[#2d3a54] space-y-1.5 text-[11px] font-mono">
                  <a
                    href="mailto:kaps2917official@gmail.com"
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#171f33] dark:hover:bg-[#202b44] text-slate-800 dark:text-[#dae2fd] transition-colors group/item"
                    title="Send Email"
                  >
                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-[#94a3b8]">
                      <Mail className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#90a8ff]" />
                      <span>Email</span>
                    </span>
                    <span className="text-[10px] font-medium text-slate-700 dark:text-[#dae2fd] truncate max-w-[150px] group-hover/item:text-[#1e3a8a] dark:group-hover/item:text-[#90a8ff]">
                      kaps2917official@gmail.com
                    </span>
                  </a>

                </div>

                {/* Recruiter Direct Action Buttons */}
                <div className="w-full mt-3 pt-3 border-t border-slate-200 dark:border-[#2d3a54] space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsChatOpen(true);
                      setChatTab('chat');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#1e3a8a] hover:bg-[#2563eb] text-white text-xs font-mono font-medium transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Direct Recruiter Chat</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsChatOpen(true);
                      setChatTab('inbox');
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg bg-slate-100 dark:bg-[#171f33] hover:bg-slate-200 dark:hover:bg-[#222a3d] text-slate-800 dark:text-[#dae2fd] text-xs font-mono transition-colors border border-slate-200 dark:border-[#334155] cursor-pointer"
                  >
                    <Inbox className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#90a8ff]" />
                    <span>Recruiter Database ({messages.length})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-16 md:py-24 border-b border-slate-200 dark:border-[#1e293b]" aria-labelledby="about-heading">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#1e3a8a] dark:text-[#90a8ff] uppercase tracking-wider font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#1e3a8a] dark:bg-[#3b82f6]" aria-hidden="true" />
            <span>01 // Dossier &amp; Core Competencies</span>
          </div>
          <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            About Me
          </h2>

          {/* Verbatim Bio Box */}
          <div className="bg-white dark:bg-[#171f33] border border-slate-200 dark:border-[#2d3a54] rounded-xl p-6 sm:p-8 mb-8 shadow-sm transition-colors duration-200">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-[#1e3a8a] border border-blue-200 dark:border-[#3b82f6]/30 flex items-center justify-center text-[#1e3a8a] dark:text-[#b6c4ff] shrink-0 mt-0.5">
                <Brain className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">Engineering Philosophy</h3>
                <blockquote className="text-base sm:text-lg text-slate-800 dark:text-[#dae2fd] leading-relaxed italic">
                  &ldquo;Enthusiastic about exploring intelligent systems, data-driven solutions, and their real-world applications, with a particular interest in bridging theoretical concepts with practical innovations.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* Academic Dossier Snapshot (Validated via Certificates) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="bg-white dark:bg-[#131b2e] p-5 rounded-xl border border-slate-200 dark:border-[#2d3a54] shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-[#94a3b8] mb-2 font-mono text-xs">
                <span>INSTITUTIONAL RECORD</span>
                <Building className="w-4 h-4 text-[#1e3a8a] dark:text-[#3b82f6]" />
              </div>
              <div className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">SATI Vidisha</div>
              <div className="text-xs text-slate-600 dark:text-[#94a3b8] mt-1">Autonomous Engineering College (Estd. 1960) &bull; RGPV</div>
            </div>

            <div className="bg-white dark:bg-[#131b2e] p-5 rounded-xl border border-slate-200 dark:border-[#2d3a54] shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-[#94a3b8] mb-2 font-mono text-xs">
                <span>PROGRAM &amp; STANDING</span>
                <GraduationCap className="w-4 h-4 text-[#1e3a8a] dark:text-[#3b82f6]" />
              </div>
              <div className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">B.Tech CSE (AIML)</div>
              <div className="text-xs text-slate-600 dark:text-[#94a3b8] mt-1">2nd Year &bull; 3rd Semester &bull; Cohort 2026</div>
            </div>

            <div className="bg-white dark:bg-[#131b2e] p-5 rounded-xl border border-slate-200 dark:border-[#2d3a54] shadow-sm">
              <div className="flex items-center justify-between text-slate-500 dark:text-[#94a3b8] mb-2 font-mono text-xs">
                <span>ORATORY ACCREDITATION</span>
                <Award className="w-4 h-4 text-[#1e3a8a] dark:text-[#3b82f6]" />
              </div>
              <div className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white">NDLI &amp; IIT Kharagpur</div>
              <div className="text-xs text-slate-600 dark:text-[#94a3b8] mt-1">English Debate SU 2026 &bull; Public Speaking Minor Track</div>
            </div>
          </div>

          {/* Technical Skills & Soft Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Technical Skills Container (Clean Badges - Zero Percentage Bars) */}
            <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-colors duration-200">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-[#1e293b]">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-5 h-5 text-[#1e3a8a] dark:text-[#3b82f6]" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Technical Skills</h3>
                  </div>
                  <span className="font-mono text-xs text-[#1e3a8a] dark:text-[#90a8ff] bg-blue-50 dark:bg-[#1e3a8a]/40 border border-blue-200 dark:border-[#2563eb]/40 px-2 py-0.5 rounded font-medium">
                    Core Stack
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-[#c5c5d3] mb-5">
                  Systems programming, predictive modeling pipelines, and full-stack software architecture.
                </p>

                {/* Specified technical skills rendered as clean tags/badges */}
                <div className="flex flex-wrap gap-2.5" role="list" aria-label="Technical Skills List">
                  {[
                    'C/C++',
                    'Python (Pandas, Numpy, Matplotlib)',
                    'JavaScript',
                    'MySQL',
                    'OOPs',
                    'Node.js',
                    'Express',
                    'React',
                    'PostgreSQL',
                  ].map((skill) => (
                    <span
                      key={skill}
                      role="listitem"
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#171f33] border border-slate-300 dark:border-[#334155] text-xs font-mono font-medium text-slate-800 dark:text-white hover:border-[#1e3a8a] dark:hover:border-[#3b82f6] transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a8a] dark:bg-[#3b82f6] mr-2" aria-hidden="true" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#1e293b] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-[#94a3b8]">
                <span>EVALUATION: Clean Design &amp; Scalability</span>
                <span className="text-[#1e3a8a] dark:text-[#3b82f6] font-medium">No Bar Metrics</span>
              </div>
            </div>

            {/* Soft Skills Container (Clean Badges) */}
            <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-colors duration-200">
              <div>
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-[#1e293b]">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare className="w-5 h-5 text-[#1e3a8a] dark:text-[#3b82f6]" aria-hidden="true" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Soft Skills</h3>
                  </div>
                  <span className="font-mono text-xs text-[#1e3a8a] dark:text-[#90a8ff] bg-blue-50 dark:bg-[#1e3a8a]/40 border border-blue-200 dark:border-[#2563eb]/40 px-2 py-0.5 rounded font-medium">
                    Behavioral
                  </span>
                </div>

                <p className="text-sm text-slate-600 dark:text-[#c5c5d3] mb-5">
                  Trained through academic coursework and competitive public speaking competitions for executive articulation and technical advocacy.
                </p>

                {/* Specified soft skills rendered as clean tags/badges */}
                <div className="flex flex-wrap gap-2.5" role="list" aria-label="Soft Skills List">
                  {[
                    'Public speaking',
                    'Critical thinking',
                    'Quick reasoning',
                    'Communication',
                    'Confidence',
                  ].map((skill) => (
                    <span
                      key={skill}
                      role="listitem"
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#171f33] border border-slate-300 dark:border-[#334155] text-xs font-mono font-medium text-slate-800 dark:text-white hover:border-[#1e3a8a] dark:hover:border-[#3b82f6] transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#3b82f6] mr-1.5" aria-hidden="true" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#1e293b] flex items-center justify-between text-xs font-mono text-slate-500 dark:text-[#94a3b8]">
                <span>MINOR DOMAIN: Oratory &amp; Argumentation</span>
                <span className="text-[#1e3a8a] dark:text-[#3b82f6] font-medium">Verified Track</span>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-16 md:py-24 border-b border-slate-200 dark:border-[#1e293b]" aria-labelledby="projects-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#1e3a8a] dark:text-[#90a8ff] uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#1e3a8a] dark:bg-[#3b82f6]" aria-hidden="true" />
                <span>02 // Production Artifacts</span>
              </div>
              <h2 id="projects-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Featured Projects
              </h2>
            </div>
            <p className="font-mono text-xs text-slate-500 dark:text-[#94a3b8]">
              3 VERIFIED IMPLEMENTATIONS
            </p>
          </div>

          {/* 3 Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* PROJECT 1: RailSync AI */}
            <article className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#1e3a8a] dark:hover:border-[#3b82f6]/60 transition-all shadow-sm group">
              <div>
                {/* Image Placeholder with bg-gray-300 pattern and accessible alt */}
                <div
                  className="bg-gray-300 w-full h-48 relative overflow-hidden flex flex-col items-center justify-center p-4 border-b border-slate-200 dark:border-[#1e293b]"
                  role="img"
                  aria-label="Image placeholder showing RailSync AI real-time railway telemetry and ETA prediction dashboard blueprint"
                >
                  <div className="w-full h-full bg-slate-900 dark:bg-[#0b1326] rounded border border-slate-700 dark:border-[#334155] p-3 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono text-slate-400 ml-1">railsync :: ml-regression</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#90a8ff]">v2.4</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 py-1 text-center font-mono text-[9px]">
                      <div className="bg-slate-800 dark:bg-[#171f33] p-1 rounded">
                        <span className="text-slate-400 block">ETA P90</span>
                        <span className="text-white font-bold">&plusmn;4 min</span>
                      </div>
                      <div className="bg-slate-800 dark:bg-[#171f33] p-1 rounded">
                        <span className="text-slate-400 block">ACCURACY</span>
                        <span className="text-[#90a8ff] font-bold">94.8%</span>
                      </div>
                      <div className="bg-slate-800 dark:bg-[#171f33] p-1 rounded">
                        <span className="text-slate-400 block">TRANSIT</span>
                        <span className="text-emerald-400 font-bold">ACTIVE</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 truncate">
                      predict(corridor_dwell, occupancy_vector)
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#1e3a8a] dark:group-hover:text-[#90a8ff] transition-colors">
                      RailSync AI
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1e3a8a]/40 text-[#1e3a8a] dark:text-[#90a8ff] border border-blue-200 dark:border-[#2563eb]/30 text-[10px] font-mono font-medium">
                      ML ENGINE
                    </span>
                  </div>

                  {/* 2-3 line description */}
                  <p className="text-sm text-slate-600 dark:text-[#c5c5d3] leading-relaxed mb-4">
                    Real-time railway network ETA prediction and congestion analyzer engineered using machine learning regression. Evaluates track occupancy telemetry, historical route delays, and dynamic station dwell times to forecast arrival variance.
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2 font-mono text-[11px]">
                    {['Python', 'Scikit-learn', 'Pandas', 'NumPy'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] border border-slate-300 dark:border-[#2d3a54] text-slate-800 dark:text-[#dae2fd]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-200 dark:border-[#1e293b]/60 flex items-center gap-3 mt-2">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-[#1e3a8a] hover:bg-[#2563eb] text-white text-xs font-mono font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Live Demo</span>
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-slate-100 dark:bg-[#171f33] hover:bg-slate-200 dark:hover:bg-[#222a3d] text-slate-800 dark:text-white border border-slate-300 dark:border-[#334155] text-xs font-mono font-medium transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </article>

            {/* PROJECT 2: Webcmder */}
            <article className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#1e3a8a] dark:hover:border-[#3b82f6]/60 transition-all shadow-sm group">
              <div>
                {/* Image Placeholder with bg-gray-300 pattern and accessible alt */}
                <div
                  className="bg-gray-300 w-full h-48 relative overflow-hidden flex flex-col items-center justify-center p-4 border-b border-slate-200 dark:border-[#1e293b]"
                  role="img"
                  aria-label="Image placeholder showing Webcmder AI agent dashboard and LinkedIn Easy Apply automation runner"
                >
                  <div className="w-full h-full bg-slate-900 dark:bg-[#0b1326] rounded border border-slate-700 dark:border-[#334155] p-3 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono text-slate-400 ml-1">webcmd :: ai-agent</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">OPEN SOURCE</span>
                    </div>

                    <div className="space-y-1.5 py-1 text-left font-mono text-[9px]">
                      <div className="bg-slate-800 dark:bg-[#171f33] p-1 rounded flex items-center justify-between">
                        <span className="text-slate-400">Resume Extraction</span>
                        <span className="text-white font-bold">pypdf · AI Pipeline</span>
                      </div>
                      <div className="bg-slate-800 dark:bg-[#171f33] p-1 rounded flex items-center justify-between">
                        <span className="text-slate-400">LinkedIn Automation</span>
                        <span className="text-[#90a8ff] font-bold">Easy Apply Runner</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 truncate">
                      agent.run() &rarr; clipboard.sync() &rarr; apply()
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#1e3a8a] dark:group-hover:text-[#90a8ff] transition-colors">
                      Webcmder
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1e3a8a]/40 text-[#1e3a8a] dark:text-[#90a8ff] border border-blue-200 dark:border-[#2563eb]/30 text-[10px] font-mono font-medium">
                      OPEN SOURCE
                    </span>
                  </div>

                  {/* 2-3 line description */}
                  <p className="text-sm text-slate-600 dark:text-[#c5c5d3] leading-relaxed mb-4">
                    Open-source extension for the Webcmd browser infrastructure. Features an interactive AI agent dashboard, pypdf-based resume extraction, 1-click clipboard synchronization, and a LinkedIn Easy Apply automation runner.
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2 font-mono text-[11px]">
                    {['Python', 'pypdf', 'AI Agents', 'Browser Automation', 'LinkedIn API'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] border border-slate-300 dark:border-[#2d3a54] text-slate-800 dark:text-[#dae2fd]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-200 dark:border-[#1e293b]/60 flex items-center gap-3 mt-2">
                <a
                  href="https://github.com/KapilDhwaj/webcmd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-[#1e3a8a] hover:bg-[#2563eb] text-white text-xs font-mono font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>View Project</span>
                </a>
                <a
                  href="https://github.com/KapilDhwaj/webcmd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-slate-100 dark:bg-[#171f33] hover:bg-slate-200 dark:hover:bg-[#222a3d] text-slate-800 dark:text-white border border-slate-300 dark:border-[#334155] text-xs font-mono font-medium transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </article>

            {/* PROJECT 3: Full-Stack Task Management App */}
            <article className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl overflow-hidden flex flex-col justify-between hover:border-[#1e3a8a] dark:hover:border-[#3b82f6]/60 transition-all shadow-sm group">
              <div>
                {/* Image Placeholder with bg-gray-300 pattern and accessible alt */}
                <div
                  className="bg-gray-300 w-full h-48 relative overflow-hidden flex flex-col items-center justify-center p-4 border-b border-slate-200 dark:border-[#1e293b]"
                  role="img"
                  aria-label="Image placeholder showing Full-Stack Task Management App kanban board with ACID relational schema telemetry"
                >
                  <div className="w-full h-full bg-slate-900 dark:bg-[#0b1326] rounded border border-slate-700 dark:border-[#334155] p-3 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-mono text-slate-400 ml-1">task-kernel :: pgsql</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#90a8ff]">ACID 100%</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 py-1 text-center font-mono text-[9px]">
                      <div className="bg-slate-800 dark:bg-[#171f33] p-1 rounded border-t border-amber-400">
                        <span className="text-slate-400 block">TODO</span>
                        <span className="text-white font-bold">12</span>
                      </div>
                      <div className="bg-slate-800 dark:bg-[#171f33] p-1 rounded border-t border-blue-400">
                        <span className="text-slate-400 block">IN PROG</span>
                        <span className="text-white font-bold">8</span>
                      </div>
                      <div className="bg-slate-800 dark:bg-[#171f33] p-1 rounded border-t border-emerald-400">
                        <span className="text-slate-400 block">DONE</span>
                        <span className="text-white font-bold">34</span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 truncate">
                      BEGIN; UPDATE tasks SET lane_id=2; COMMIT;
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#1e3a8a] dark:group-hover:text-[#90a8ff] transition-colors">
                      Full-Stack Task Management App
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1e3a8a]/40 text-[#1e3a8a] dark:text-[#90a8ff] border border-blue-200 dark:border-[#2563eb]/30 text-[10px] font-mono font-medium">
                      DATABASE
                    </span>
                  </div>

                  {/* 2-3 line description */}
                  <p className="text-sm text-slate-600 dark:text-[#c5c5d3] leading-relaxed mb-4">
                    Scalable task orchestration application built with a normalized relational schema and robust RESTful API endpoints. Delivers ACID-compliant state synchronization, collaborative board updates, and high-performance database querying.
                  </p>

                  {/* Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-2 font-mono text-[11px]">
                    {['React', 'Node.js', 'Express', 'PostgreSQL'].map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] border border-slate-300 dark:border-[#2d3a54] text-slate-800 dark:text-[#dae2fd]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-200 dark:border-[#1e293b]/60 flex items-center gap-3 mt-2">
                <a
                  href="https://github.com/KapilDhwaj/task-manager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-[#1e3a8a] hover:bg-[#2563eb] text-white text-xs font-mono font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>View Project</span>
                </a>
                <a
                  href="https://github.com/KapilDhwaj/task-manager"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded bg-slate-100 dark:bg-[#171f33] hover:bg-slate-200 dark:hover:bg-[#222a3d] text-slate-800 dark:text-white border border-slate-300 dark:border-[#334155] text-xs font-mono font-medium transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>GitHub Repo</span>
                </a>
              </div>
            </article>
          </div>
        </section>

        {/* ACHIEVEMENTS & CERTIFICATES SECTION */}
        <section id="achievements" className="py-16 md:py-24 border-b border-slate-200 dark:border-[#1e293b]" aria-labelledby="achievements-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#1e3a8a] dark:text-[#90a8ff] uppercase tracking-wider font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#1e3a8a] dark:bg-[#3b82f6]" aria-hidden="true" />
                <span>03 // Competitive Record &amp; Institutional Credentials</span>
              </div>
              <h2 id="achievements-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Achievements &amp; Extracurriculars
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-[#131b2e] border border-slate-300 dark:border-[#2d3a54] text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff]">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>4 OF 4 CERTIFICATES ATTESTED</span>
            </div>
          </div>

          <p className="text-sm text-slate-600 dark:text-[#c5c5d3] mb-8 max-w-3xl">
            Verified records of institutional hackathons, autonomous agentic development, competitive programming, and national-tier debate competitions with exact certifying dates, partner bodies, and academic credentials.
          </p>

          {/* Timeline / List Layout with Full Certificate Details */}
          <div className="relative border-l-2 border-slate-300 dark:border-[#1e293b] ml-3 sm:ml-4 space-y-8 pl-6 sm:pl-8">
            {/* ITEM 1: SIH 2026 */}
            <div className="relative group">
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-[#1e3a8a] border-2 border-[#1e3a8a] dark:border-[#3b82f6] group-hover:scale-125 transition-transform"
                aria-hidden="true"
              />
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl p-5 sm:p-7 group-hover:border-[#1e3a8a] dark:group-hover:border-[#3b82f6]/50 transition-colors shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 dark:bg-[#1e3a8a] text-[#1e3a8a] dark:text-white border border-blue-200 dark:border-transparent font-mono text-xs font-semibold">
                      NATIONAL LEVEL
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] text-slate-700 dark:text-[#b6c4ff] border border-slate-200 dark:border-[#334155] font-mono text-[11px]">
                      CERTIFICATE ISSUED
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-[#94a3b8] flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#3b82f6]" />
                    September 10, 2026
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Smart India Hackathon (SIH) 2026
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-[#c5c5d3] leading-relaxed mb-4">
                  Successfully cleared the Internal Hackathon Round of Smart India Hackathon (SIH) 2026.
                </p>

                {/* Certificate Specific Data Badges */}
                <div className="bg-slate-50 dark:bg-[#171f33] rounded-lg p-3.5 border border-slate-200 dark:border-[#2d3a54] text-xs font-mono space-y-1.5 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Organizing Body:</span>
                    <span className="font-medium text-slate-800 dark:text-white text-right">
                      Institute Startup Cell &amp; MIIC-SATI in collaboration with Dept. of CSE &amp; AI
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Signatories:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd] text-right">
                      Dr. Divya Rishi Sahu (Startup Cell) &bull; Prof. (Dr.) Y. K. Jain (Director SATI)
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100/60 dark:bg-[#1e3a8a]/50 text-[#1e3a8a] dark:text-[#90a8ff]">
                      Ministry of Education
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100/60 dark:bg-[#1e3a8a]/50 text-[#1e3a8a] dark:text-[#90a8ff]">
                      AICTE
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100/60 dark:bg-[#1e3a8a]/50 text-[#1e3a8a] dark:text-[#90a8ff]">
                      MIC
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100/60 dark:bg-[#1e3a8a]/50 text-[#1e3a8a] dark:text-[#90a8ff]">
                      MSME
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Cleared Internal Round &bull; Team Presentation</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(CERTIFICATES[0])}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff] hover:underline cursor-pointer font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate Record &rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ITEM 2: SLAB Agentic AI Hackathon */}
            <div className="relative group">
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-[#1e3a8a] border-2 border-[#1e3a8a] dark:border-[#3b82f6] group-hover:scale-125 transition-transform"
                aria-hidden="true"
              />
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl p-5 sm:p-7 group-hover:border-[#1e3a8a] dark:group-hover:border-[#3b82f6]/50 transition-colors shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] text-slate-800 dark:text-[#90a8ff] border border-slate-300 dark:border-[#334155] font-mono text-xs font-semibold">
                      AGENTIC AI SPRINT
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] text-slate-700 dark:text-[#b6c4ff] border border-slate-200 dark:border-[#334155] font-mono text-[11px]">
                      CERTIFICATE ISSUED
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-[#94a3b8] flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#3b82f6]" />
                    August 22, 2026
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  SLAB Agentic AI Hackathon
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-[#c5c5d3] leading-relaxed mb-4">
                  Participated in the SLAB Agentic AI Hackathon (WebCMD &amp; Coding Club, Aug 2026).
                </p>

                {/* Certificate Specific Data Badges */}
                <div className="bg-slate-50 dark:bg-[#171f33] rounded-lg p-3.5 border border-slate-200 dark:border-[#2d3a54] text-xs font-mono space-y-1.5 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Organizing Body:</span>
                    <span className="font-medium text-slate-800 dark:text-white text-right">
                      Coding Club SATI in partnership with WebCMD
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Verified Record:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd] text-right font-medium">
                      Branch: AIML &bull; Semester: 3rd &bull; Year: 2nd
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Signatories:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd] text-right">
                      Dr. Y. K. Jain (Director), Event Co-ordinator &amp; Faculty Co-ordinator
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#3b82f6]" />
                    <span>Autonomous AI Workflows &bull; Fast-Track Prototype</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(CERTIFICATES[1])}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff] hover:underline cursor-pointer font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate Record &rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ITEM 3: Code Crack 2.0 */}
            <div className="relative group">
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-[#1e3a8a] border-2 border-[#1e3a8a] dark:border-[#3b82f6] group-hover:scale-125 transition-transform"
                aria-hidden="true"
              />
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl p-5 sm:p-7 group-hover:border-[#1e3a8a] dark:group-hover:border-[#3b82f6]/50 transition-colors shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] text-slate-800 dark:text-[#90a8ff] border border-slate-300 dark:border-[#334155] font-mono text-xs font-semibold">
                      COMPETITIVE CODING
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] text-slate-700 dark:text-[#b6c4ff] border border-slate-200 dark:border-[#334155] font-mono text-[11px]">
                      CERTIFICATE ISSUED
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-[#94a3b8] flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#3b82f6]" />
                    February 20, 2026
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  Code Crack 2.0
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-[#c5c5d3] leading-relaxed mb-4">
                  Participated in Code Crack 2.0 (NDLI Club &amp; IIT Kharagpur, Feb 2026).
                </p>

                {/* Certificate Specific Data Badges */}
                <div className="bg-slate-50 dark:bg-[#171f33] rounded-lg p-3.5 border border-slate-200 dark:border-[#2d3a54] text-xs font-mono space-y-1.5 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Organizing Body:</span>
                    <span className="font-medium text-slate-800 dark:text-white text-right">
                      NDLI Club of Samrat Ashok Technological Institute, Vidisha
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">National Collaborator:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd] text-right font-medium">
                      Indian Institute of Technology (IIT) Kharagpur &bull; Ministry of Education
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Certifying Authority:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd] text-right">
                      Dr. Partha Pratim Das (Joint Principal Investigator, NDLI Project, IIT Kharagpur)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#3b82f6]" />
                    <span>Algorithmic Optimization &bull; Time Complexity Solving</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(CERTIFICATES[2])}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff] hover:underline cursor-pointer font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate Record &rarr;</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ITEM 4: Debate & Extempore */}
            <div className="relative group">
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-[#1e3a8a] border-2 border-[#1e3a8a] dark:border-[#3b82f6] group-hover:scale-125 transition-transform"
                aria-hidden="true"
              />
              <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-xl p-5 sm:p-7 group-hover:border-[#1e3a8a] dark:group-hover:border-[#3b82f6]/50 transition-colors shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] text-slate-800 dark:text-[#90a8ff] border border-slate-300 dark:border-[#334155] font-mono text-xs font-semibold">
                      ORATORY &amp; DEBATE
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#171f33] text-slate-700 dark:text-[#b6c4ff] border border-slate-200 dark:border-[#334155] font-mono text-[11px]">
                      CERTIFICATE ISSUED
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-500 dark:text-[#94a3b8] flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#3b82f6]" />
                    March 24, 2026
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  English Debate and Extempore Competitions SU 2026
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-[#c5c5d3] leading-relaxed mb-4">
                  Participated in English Debate and Extempore Competitions SU 2026 (NDLI Club &amp; IIT Kharagpur, Mar 2026).
                </p>

                {/* Certificate Specific Data Badges */}
                <div className="bg-slate-50 dark:bg-[#171f33] rounded-lg p-3.5 border border-slate-200 dark:border-[#2d3a54] text-xs font-mono space-y-1.5 mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Organizing Body:</span>
                    <span className="font-medium text-slate-800 dark:text-white text-right">
                      NDLI Club of Samrat Ashok Technological Institute, Vidisha
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">National Collaborator:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd] text-right font-medium">
                      Indian Institute of Technology (IIT) Kharagpur &bull; Ministry of Education
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-600 dark:text-[#c5c5d3]">
                    <span className="text-slate-400 dark:text-[#94a3b8]">Certifying Authority:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd] text-right">
                      Dr. Partha Pratim Das (Joint Principal Investigator, NDLI Project, IIT Kharagpur)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff] font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#3b82f6]" />
                    <span>Public Speaking Minor &bull; Dialectic Oratory &amp; Argumentation</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(CERTIFICATES[3])}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#1e3a8a] dark:text-[#90a8ff] hover:underline cursor-pointer font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Certificate Record &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CERTIFICATE DETAILS MODAL DIALOG */}
        {selectedCertificate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#131b2e] border border-slate-300 dark:border-[#334155] rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-5 right-5 p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-[#94a3b8] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#171f33] transition-colors"
                aria-label="Close certificate dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e3a8a] dark:bg-[#3b82f6]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#1e3a8a] dark:text-[#90a8ff] font-semibold">
                  {selectedCertificate.categoryBadge} // OFFICIAL CERTIFICATE DOSSIER
                </span>
              </div>

              <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {selectedCertificate.eventTitle}
              </h3>
              <div className="font-mono text-xs text-slate-500 dark:text-[#94a3b8] mb-6">
                Credential: {selectedCertificate.certificateType} &bull; Held on {selectedCertificate.heldDate}
              </div>

              {/* Recipient Snapshot Box */}
              <div className="bg-slate-50 dark:bg-[#171f33] rounded-xl p-4 border border-slate-200 dark:border-[#2d3a54] mb-5 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 dark:text-[#94a3b8] block">Attested Recipient:</span>
                    <span className="text-slate-900 dark:text-white font-semibold text-sm">
                      {selectedCertificate.recipient}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-[#94a3b8] block">Academic Enrollment:</span>
                    <span className="text-slate-800 dark:text-[#dae2fd]">
                      {selectedCertificate.academicDetails}
                    </span>
                  </div>
                </div>
              </div>

              {/* Full Details & Citation */}
              <div className="space-y-4 text-xs font-mono text-slate-700 dark:text-[#c5c5d3]">
                <div>
                  <span className="text-slate-400 dark:text-[#94a3b8] block uppercase mb-1">Organizing Entity:</span>
                  <p className="text-slate-900 dark:text-white font-medium bg-slate-100/70 dark:bg-[#1a233a] p-2.5 rounded border border-slate-200 dark:border-[#2d3a54]">
                    {selectedCertificate.organizer}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-[#94a3b8] block uppercase mb-1">Partnering Institution:</span>
                  <p className="text-slate-900 dark:text-white font-medium bg-slate-100/70 dark:bg-[#1a233a] p-2.5 rounded border border-slate-200 dark:border-[#2d3a54]">
                    {selectedCertificate.collaborators}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-[#94a3b8] block uppercase mb-1">Official Citation:</span>
                  <blockquote className="italic p-3 rounded bg-blue-50/50 dark:bg-[#1e3a8a]/20 border-l-4 border-[#1e3a8a] dark:border-[#3b82f6] text-slate-800 dark:text-[#dae2fd]">
                    &ldquo;{selectedCertificate.citation}&rdquo;
                  </blockquote>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-[#94a3b8] block uppercase mb-1">Attesting Signatories:</span>
                  <ul className="space-y-1">
                    {selectedCertificate.signatories.map((sig, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-800 dark:text-[#dae2fd]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{sig}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-slate-400 dark:text-[#94a3b8] block uppercase mb-1.5">Collaborating Bodies &amp; Logos:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCertificate.officialBodies.map((body, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1e293b] text-slate-700 dark:text-[#90a8ff] border border-slate-300 dark:border-[#334155] text-[11px]"
                      >
                        {body}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-[#2d3a54] flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Officially Attested Record</span>
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="px-4 py-2 rounded-lg bg-[#1e3a8a] hover:bg-[#2563eb] text-white font-mono text-xs font-medium transition-colors"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RECRUITER DIRECT CHAT & DATABASE MODAL */}
        {isChatOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruiter-modal-title"
          >
            <div className="relative w-full max-w-2xl bg-white dark:bg-[#131b2e] border border-slate-300 dark:border-[#334155] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
              
              {/* Modal Header Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-[#2d3a54] bg-slate-50 dark:bg-[#0f172a] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-[#1e3a8a]/40 border border-blue-200 dark:border-[#2563eb]/30 flex items-center justify-center text-[#1e3a8a] dark:text-[#90a8ff]">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 id="recruiter-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Recruiter Communication Portal
                      </h3>
                      <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        PERSISTENT DATABASE
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#94a3b8] font-mono">
                      Direct recruiter chat &bull; Inquiries saved in persistent storage
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-[#94a3b8] dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1f293d] transition-colors cursor-pointer"
                  aria-label="Close Recruiter Portal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 dark:border-[#2d3a54] bg-slate-100/70 dark:bg-[#0b1326] px-4 pt-2">
                <button
                  type="button"
                  onClick={() => setChatTab('chat')}
                  className={`flex items-center gap-2 py-2.5 px-4 font-mono text-xs font-semibold rounded-t-lg transition-colors border-t border-x cursor-pointer ${
                    chatTab === 'chat'
                      ? 'bg-white dark:bg-[#131b2e] text-[#1e3a8a] dark:text-[#90a8ff] border-slate-200 dark:border-[#2d3a54] border-b-transparent -mb-[1px]'
                      : 'text-slate-600 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white border-transparent'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct Recruiter Chat</span>
                </button>

                <button
                  type="button"
                  onClick={() => setChatTab('inbox')}
                  className={`flex items-center gap-2 py-2.5 px-4 font-mono text-xs font-semibold rounded-t-lg transition-colors border-t border-x cursor-pointer ${
                    chatTab === 'inbox'
                      ? 'bg-white dark:bg-[#131b2e] text-[#1e3a8a] dark:text-[#90a8ff] border-slate-200 dark:border-[#2d3a54] border-b-transparent -mb-[1px]'
                      : 'text-slate-600 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white border-transparent'
                  }`}
                >
                  <Inbox className="w-3.5 h-3.5" />
                  <span>Stored Inquiries Database</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-[#1e3a8a] text-[#1e3a8a] dark:text-[#dae2fd] text-[10px] font-bold">
                    {messages.length}
                  </span>
                </button>
              </div>

              {/* Tab Body: Scrollable */}
              <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-4">
                {chatTab === 'chat' ? (
                  <div className="space-y-4">
                    {/* Candidate Badge Card */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#171f33] border border-slate-200 dark:border-[#2d3a54]">
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600 ring-2 ring-blue-100 dark:ring-blue-900/40 shrink-0">
                        <img
                          src={fixedProfileImage}
                          alt="Kapil Dhwaj Singh Baghel"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                            Kapil Dhwaj Singh Baghel
                          </h4>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title="Active Candidate" />
                        </div>
                        <p className="text-xs text-slate-600 dark:text-[#c5c5d3] truncate">
                          2nd-year B.Tech CSE (AIML) &bull; SATI Vidisha &bull; SIH '26 Qualifier
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setChatTab('inbox')}
                        className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-[#1e3a8a] dark:text-[#90a8ff] hover:underline"
                      >
                        <Inbox className="w-3 h-3" />
                        <span>View Past ({messages.length})</span>
                      </button>
                    </div>

                    {/* Chat Conversation Thread */}
                    {chatThread.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-100/80 dark:bg-[#0b1326] border border-slate-200 dark:border-[#2d3a54] space-y-3 max-h-56 overflow-y-auto">
                        <div className="text-[10px] font-mono text-center text-slate-400 dark:text-[#94a3b8] uppercase tracking-wider">
                          Active Chat Session &bull; Saved to Database
                        </div>
                        {chatThread.map((chat, idx) => (
                          <div
                            key={idx}
                            className={`flex flex-col ${
                              chat.sender === 'recruiter' ? 'items-end' : 'items-start'
                            }`}
                          >
                            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 mb-0.5">
                              <span>{chat.sender === 'recruiter' ? 'You (Recruiter)' : 'Kapil Dhwaj Singh Baghel'}</span>
                              <span>&bull;</span>
                              <span>{chat.time}</span>
                            </div>
                            <div
                              className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                                chat.sender === 'recruiter'
                                  ? 'bg-[#1e3a8a] text-white rounded-tr-none'
                                  : 'bg-white dark:bg-[#1a233a] border border-slate-200 dark:border-[#2d3a54] text-slate-800 dark:text-[#dae2fd] rounded-tl-none shadow-xs'
                              }`}
                            >
                              {chat.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {sentSuccess && (
                      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                          <span>Inquiry saved successfully to Kapil's portfolio database!</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setChatTab('inbox')}
                          className="font-bold underline ml-2 hover:text-emerald-900 dark:hover:text-emerald-200"
                        >
                          View in DB &rarr;
                        </button>
                      </div>
                    )}

                    {/* Direct Recruiter Contact Form */}
                    <form onSubmit={handleSendMessage} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-slate-700 dark:text-[#dae2fd] mb-1 font-semibold">
                            Recruiter / Contact Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={recruiterName}
                            onChange={(e) => setRecruiterName(e.target.value)}
                            placeholder="e.g. Priya Sharma"
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0b1326] border border-slate-300 dark:border-[#334155] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] dark:focus:ring-[#3b82f6]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-700 dark:text-[#dae2fd] mb-1 font-semibold">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            value={recruiterCompany}
                            onChange={(e) => setRecruiterCompany(e.target.value)}
                            placeholder="e.g. Google, NextGen AI, Startup"
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0b1326] border border-slate-300 dark:border-[#334155] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] dark:focus:ring-[#3b82f6]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-slate-700 dark:text-[#dae2fd] mb-1 font-semibold">
                            Email Address for Reply *
                          </label>
                          <input
                            type="email"
                            required
                            value={recruiterEmail}
                            onChange={(e) => setRecruiterEmail(e.target.value)}
                            placeholder="e.g. recruiter@company.com"
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0b1326] border border-slate-300 dark:border-[#334155] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] dark:focus:ring-[#3b82f6]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-700 dark:text-[#dae2fd] mb-1 font-semibold">
                            Position / Opportunity Title
                          </label>
                          <input
                            type="text"
                            value={recruiterRole}
                            onChange={(e) => setRecruiterRole(e.target.value)}
                            placeholder="e.g. AI/ML Engineering Intern"
                            className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0b1326] border border-slate-300 dark:border-[#334155] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] dark:focus:ring-[#3b82f6]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-700 dark:text-[#dae2fd] mb-1 font-semibold">
                          Message / Opportunity Details *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={recruiterMessage}
                          onChange={(e) => setRecruiterMessage(e.target.value)}
                          placeholder="Describe the opportunity, role requirements, interview timeline, or collaboration proposal..."
                          className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-[#0b1326] border border-slate-300 dark:border-[#334155] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] dark:focus:ring-[#3b82f6] resize-none"
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                        <span className="text-[11px] font-mono text-slate-500 dark:text-[#94a3b8]">
                          Saved persistently to `/data/recruiter_messages.json`
                        </span>

                        <button
                          type="submit"
                          disabled={isSending}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e3a8a] hover:bg-[#2563eb] text-white font-mono text-xs font-semibold shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                        >
                          {isSending ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Saving to Database...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>Send Inquiry &bull; Save to DB</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* INBOX DATABASE TAB */
                  <div className="space-y-4">
                    {/* Database Search & Filter Controls */}
                    <div className="space-y-3 bg-slate-50 dark:bg-[#0f172a] p-3 rounded-xl border border-slate-200 dark:border-[#2d3a54]">
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search database by recruiter name, company, role, or keyword..."
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-white dark:bg-[#0b1326] border border-slate-300 dark:border-[#334155] text-slate-900 dark:text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          {(['all', 'new', 'reviewed'] as const).map((filter) => (
                            <button
                              key={filter}
                              type="button"
                              onClick={() => setStatusFilter(filter)}
                              className={`px-2.5 py-1 rounded-md text-xs uppercase transition-colors cursor-pointer ${
                                statusFilter === filter
                                  ? 'bg-[#1e3a8a] text-white font-bold'
                                  : 'bg-white dark:bg-[#171f33] text-slate-600 dark:text-[#94a3b8] hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#334155]'
                              }`}
                            >
                              {filter} (
                              {filter === 'all'
                                ? messages.length
                                : messages.filter((m) => m.status === filter).length}
                              )
                            </button>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={fetchMessages}
                          disabled={isLoadingMessages}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white dark:bg-[#171f33] border border-slate-300 dark:border-[#334155] text-slate-700 dark:text-[#dae2fd] text-xs font-mono hover:bg-slate-100 dark:hover:bg-[#1f293d] transition-colors cursor-pointer"
                        >
                          <RotateCcw className={`w-3 h-3 ${isLoadingMessages ? 'animate-spin' : ''}`} />
                          <span>Refresh DB</span>
                        </button>
                      </div>
                    </div>

                    {/* Messages List from DB */}
                    {isLoadingMessages ? (
                      <div className="py-12 text-center font-mono text-xs text-slate-500">
                        <span className="w-5 h-5 border-2 border-[#1e3a8a] border-t-transparent rounded-full animate-spin inline-block mb-2" />
                        <div>Loading persistent recruiter records...</div>
                      </div>
                    ) : filteredMessages.length === 0 ? (
                      <div className="py-12 text-center rounded-xl bg-slate-50 dark:bg-[#0b1326] border border-dashed border-slate-300 dark:border-[#334155] p-6 font-mono text-xs text-slate-500 space-y-2">
                        <Inbox className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                        <div className="font-semibold text-slate-700 dark:text-[#dae2fd]">
                          No inquiries found matching criteria
                        </div>
                        <p className="text-[11px] max-w-sm mx-auto">
                          Recruiter messages sent through the Direct Chat tab are saved here in the database for future reference.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setChatTab('chat');
                            setSearchQuery('');
                            setStatusFilter('all');
                          }}
                          className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1e3a8a] text-white font-mono text-xs hover:bg-[#2563eb]"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Create an Inquiry</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`p-4 rounded-xl border transition-all ${
                              msg.status === 'new'
                                ? 'bg-white dark:bg-[#131b2e] border-blue-200 dark:border-[#2563eb]/40 shadow-xs'
                                : 'bg-slate-50 dark:bg-[#0e172a] border-slate-200 dark:border-[#2d3a54] opacity-90'
                            }`}
                          >
                            <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                    {msg.name}
                                  </h4>
                                  <span className="px-2 py-0.2 rounded-md bg-slate-100 dark:bg-[#1e293b] text-slate-700 dark:text-[#dae2fd] text-[10px] font-mono border border-slate-200 dark:border-[#334155]">
                                    {msg.company}
                                  </span>
                                  {msg.status === 'new' ? (
                                    <span className="px-2 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1 border border-emerald-300 dark:border-emerald-800">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      NEW
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.2 rounded-full bg-slate-200 dark:bg-[#1a233a] text-slate-600 dark:text-[#94a3b8] text-[10px] font-mono">
                                      REVIEWED
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-[#94a3b8] mt-1">
                                  <span className="text-[#1e3a8a] dark:text-[#90a8ff] font-semibold">
                                    {msg.role}
                                  </span>
                                  <span>&bull;</span>
                                  <span>{msg.email}</span>
                                  <span>&bull;</span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {new Date(msg.createdAt).toLocaleDateString([], {
                                      month: 'short',
                                      day: 'numeric',
                                      year: 'numeric',
                                    })}{' '}
                                    at{' '}
                                    {new Date(msg.createdAt).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleToggleStatus(msg.id, msg.status)}
                                  className="px-2 py-1 rounded bg-slate-100 dark:bg-[#171f33] hover:bg-slate-200 dark:hover:bg-[#202b44] text-slate-700 dark:text-[#dae2fd] text-[11px] font-mono border border-slate-200 dark:border-[#334155] cursor-pointer"
                                  title="Toggle status"
                                >
                                  {msg.status === 'new' ? 'Mark Reviewed' : 'Mark New'}
                                </button>
                                <a
                                  href={`mailto:${msg.email}?subject=Re:%20${encodeURIComponent(
                                    msg.role
                                  )}%20Inquiry%20from%20Kapil%20Dhwaj%20Singh%20Baghel`}
                                  className="p-1.5 rounded bg-blue-50 dark:bg-[#1e3a8a]/40 hover:bg-blue-100 dark:hover:bg-[#1e3a8a]/70 text-[#1e3a8a] dark:text-[#90a8ff] border border-blue-200 dark:border-[#2563eb]/40"
                                  title={`Reply to ${msg.email}`}
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  className="p-1.5 rounded bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 cursor-pointer"
                                  title="Delete message from database"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <p className="text-xs text-slate-700 dark:text-[#dae2fd] leading-relaxed bg-slate-50 dark:bg-[#0b1326] p-3 rounded-lg border border-slate-200 dark:border-[#2d3a54] font-mono whitespace-pre-wrap">
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer Bar */}
              <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-[#2d3a54] bg-slate-50 dark:bg-[#0f172a] flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-[#94a3b8] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Database: JSON file storage (`/data/recruiter_messages.json`)</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsChatOpen(false)}
                  className="px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-[#171f33] hover:bg-slate-300 dark:hover:bg-[#202b44] text-slate-800 dark:text-[#dae2fd] font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER / CONTACT SECTION */}
        <section id="contact" className="py-16 md:py-24" aria-labelledby="contact-heading">
          <div className="bg-white dark:bg-[#131b2e] border border-slate-200 dark:border-[#2d3a54] rounded-2xl p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-md relative overflow-hidden transition-colors duration-200">
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="font-mono text-xs text-slate-500 dark:text-[#94a3b8] ml-2">session :: access_dispatch.sh</span>
            </div>

            <h2 id="contact-heading" className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
              Connect &amp; Review Credentials
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#c5c5d3] max-w-xl mx-auto mb-8 leading-relaxed">
              Reach out directly via email, explore open-source code repositories, or download the comprehensive technical curriculum vitae.
            </p>

            {/* Direct Email Card with One-Click Send & Copy Functionality */}
            <div className="mb-8 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-[#171f33] border border-slate-200 dark:border-[#2d3a54] max-w-lg mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-[#1e3a8a]/40 border border-blue-200 dark:border-[#2563eb]/30 flex items-center justify-center text-[#1e3a8a] dark:text-[#90a8ff] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-[#94a3b8] uppercase tracking-wider block">Official Email</span>
                  <a
                    href="mailto:kaps2917official@gmail.com"
                    className="text-xs sm:text-sm font-mono font-medium text-slate-900 dark:text-white hover:text-[#1e3a8a] dark:hover:text-[#90a8ff] transition-colors"
                  >
                    kaps2917official@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href="mailto:kaps2917official@gmail.com"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1e3a8a] hover:bg-[#2563eb] text-white text-xs font-mono transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white dark:bg-[#131b2e] border border-slate-300 dark:border-[#334155] hover:bg-slate-100 dark:hover:bg-[#222a3d] text-slate-700 dark:text-[#dae2fd] text-xs font-mono transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Stylized Social & Channel Call-To-Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">

              {/* GitHub */}
              <a
                href="https://github.com/KapilDhwaj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1e3a8a] hover:bg-[#2563eb] text-white font-mono text-xs sm:text-sm font-semibold transition-all shadow-sm border border-[#3b82f6]/40 cursor-pointer"
              >
                <Terminal className="w-4 h-4" aria-hidden="true" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-200" aria-hidden="true" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-[#171f33] hover:bg-slate-200 dark:hover:bg-[#222a3d] text-slate-800 dark:text-white font-mono text-xs sm:text-sm font-semibold transition-all border border-slate-300 dark:border-[#334155] cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#1e3a8a] dark:text-[#90a8ff]" aria-hidden="true" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-[#94a3b8]" aria-hidden="true" />
              </a>

              {/* Download Resume */}
              <button
                type="button"
                onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-[#171f33] hover:bg-slate-200 dark:hover:bg-[#222a3d] text-slate-800 dark:text-white font-mono text-xs sm:text-sm font-semibold transition-all border border-slate-300 dark:border-[#334155] cursor-pointer"
              >
                <FileDown className="w-4 h-4 text-[#1e3a8a] dark:text-[#90a8ff]" aria-hidden="true" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-200 dark:border-[#1e293b] bg-slate-100 dark:bg-[#080e1a] py-8 text-xs font-mono text-slate-600 dark:text-[#94a3b8] transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-900 dark:text-white font-semibold">&lt;dev/&gt;</span>
            <span>Kapil Dhwaj Singh Baghel &bull; Engineering Portfolio</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="mailto:kaps2917official@gmail.com"
              className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#1e3a8a] dark:text-[#90a8ff]" />
              <span>kaps2917official@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a href="#hero" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Top &uarr;
            </a>
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Projects
            </a>
            <a href="#achievements" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Certificates
            </a>
            <a href="#contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Contact
            </a>
          </div>

          <div>&copy; {new Date().getFullYear()} All rights reserved.</div>
        </div>
      </footer>

      {/* FLOATING RECRUITER CONTACT WIDGET */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            setIsChatOpen(true);
            setChatTab('chat');
          }}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1e3a8a] hover:bg-[#2563eb] text-white shadow-xl hover:shadow-2xl border border-[#3b82f6]/40 transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
          title="Direct Recruiter Chat & Database"
          aria-label="Open Recruiter Chat"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#1e3a8a] animate-pulse" />
          </div>
          <span className="text-xs font-mono font-semibold tracking-wide hidden sm:inline">
            Recruiter Chat &amp; Database
          </span>
          {messages.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-blue-500/80 text-[10px] font-bold">
              {messages.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
