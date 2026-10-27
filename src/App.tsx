/**
 * Luxury Pakistani Wedding Invitation
 * Mussadiq Hussain & D/o Saleem Satti
 * Hosted by Mr. & Mrs. Sadaqat Hussain in Islamabad
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Share2,
  Calendar,
  MapPin,
  Phone,
  MessageCircle,
  Check,
  Copy,
  Heart,
  Sparkles,
  ChevronDown,
  Download,
  Code2,
  Clock,
  Send,
  X
} from 'lucide-react';
import { weddingAudio } from './utils/audio';
import { WEDDING_EVENTS, createGoogleCalendarUrl, downloadIcsFile, WeddingEventInfo } from './utils/calendar';
import { STANDALONE_HTML } from './data/standaloneFiles';

interface GuestWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  timestamp: string;
}

const INITIAL_WISHES: GuestWish[] = [
  {
    id: '1',
    name: 'Chaudhry & Family',
    relation: 'Family Friend',
    message: 'May Allah SWT bless this union with boundless love, peace, and prosperity. Looking forward to celebrating with Sadaqat Hussain Sahib and family!',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    name: 'Tariq Mehmood',
    relation: 'Islamabad',
    message: 'Heartiest congratulations to Mussadiq and his bride. Baraka Allahu Lakuma wa Baraka Alaikuma wa Jama’a Bainakuma Fee Khair.',
    timestamp: 'Yesterday'
  },
  {
    id: '3',
    name: 'Malik Haroon Satti',
    relation: 'Relative',
    message: 'MashAllah, warm congratulations to both families. May the celebrations at White Pearl Marquee bring lasting bliss!',
    timestamp: '2 days ago'
  }
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [petals, setPetals] = useState<Array<{ id: number; left: number; duration: number; delay: number; endX: number }>>([]);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Interactive RSVP submission
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    guestsCount: '2',
    attendingMehndi: true,
    attendingBarat: true,
    attendingWalima: true,
    note: ''
  });

  // Wishes state
  const [wishes, setWishes] = useState<GuestWish[]>(INITIAL_WISHES);
  const [wishForm, setWishForm] = useState({ name: '', relation: '', message: '' });
  const [wishSubmitted, setWishSubmitted] = useState(false);

  // Active Code Modal Tab
  const [codeTab, setCodeTab] = useState<'html' | 'css' | 'js'>('html');
  const [copiedCode, setCopiedCode] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const programmeRef = useRef<HTMLDivElement>(null);

  // Trigger countdown timer to Mehndi: 20 Nov 2026, 20:00 PKT
  useEffect(() => {
    const targetDate = new Date('2026-11-20T20:00:00+05:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle Mouse Parallax on Desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setParallax({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Open the card doors with royal chimes & celebratory golden petals
  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    weddingAudio.playUnsealSound();

    // Trigger golden rose petal rain
    const newPetals = Array.from({ length: 28 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 95,
      duration: 5 + Math.random() * 5,
      delay: Math.random() * 2,
      endX: (Math.random() - 0.5) * 200
    }));
    setPetals(newPetals);

    // Clear petals after animation
    setTimeout(() => {
      setPetals([]);
    }, 12000);
  };

  // Replay opening
  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
    setTimeout(() => {
      handleOpen();
    }, 600);
  };

  // Toggle ambient raag audio
  const handleToggleAudio = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    weddingAudio.toggleAmbience(!nextState);
  };

  // Share link copy
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Copy address
  const handleCopyAddress = () => {
    navigator.clipboard.writeText('White Pearl Marquee, Company Road Banigala, Islamabad');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  // Submit RSVP
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) return;
    setRsvpSubmitted(true);
    if (rsvpForm.note.trim()) {
      setWishes(prev => [
        {
          id: Date.now().toString(),
          name: rsvpForm.name,
          relation: 'Attending Guest',
          message: rsvpForm.note,
          timestamp: 'Just now'
        },
        ...prev
      ]);
    }
  };

  // Submit Blessing Wish
  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) return;
    setWishes(prev => [
      {
        id: Date.now().toString(),
        name: wishForm.name,
        relation: wishForm.relation.trim() || 'Well-Wisher',
        message: wishForm.message,
        timestamp: 'Just now'
      },
      ...prev
    ]);
    setWishForm({ name: '', relation: '', message: '' });
    setWishSubmitted(true);
    setTimeout(() => setWishSubmitted(false), 4000);
  };

  // Copy code from standalone modal
  const handleCopyStandaloneCode = () => {
    navigator.clipboard.writeText(STANDALONE_HTML);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Download standalone HTML package
  const handleDownloadStandaloneHtml = () => {
    const blob = new Blob([STANDALONE_HTML], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const scrollToProgramme = () => {
    programmeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFF9EF] text-[#29251F] selection:bg-[#C9A66B]/30 relative font-heading">
      {/* Floating Petals Layer */}
      {petals.map(petal => (
        <div
          key={petal.id}
          className="petal-particle flex items-center justify-center"
          style={{
            left: `${petal.left}vw`,
            animationDuration: `${petal.duration}s`,
            animationDelay: `${petal.delay}s`,
            // @ts-expect-error custom css variable
            '--end-x': `${petal.endX}px`
          }}
        >
          <svg className="w-5 h-5 text-[#E9CFC8] fill-current opacity-85 rotate-45 drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M12 2C9 6 3 9 3 14a9 9 0 0 0 18 0c0-5-6-8-9-12z" />
          </svg>
        </div>
      ))}

      {/* Floating Action Dock */}
      <aside className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#FFF9EF]/95 backdrop-blur-md border border-[#C9A66B] rounded-full text-[#164C3B] font-ui text-xs uppercase tracking-wider shadow-md hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]"
          title={isMuted ? 'Turn Celebration Music On' : 'Mute Music'}
          aria-label={isMuted ? 'Turn Celebration Music On' : 'Mute Music'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#C9A66B] animate-pulse" />}
          <span className="hidden sm:inline">{isMuted ? 'Ambience' : 'Playing'}</span>
        </button>

        <button
          onClick={handleReplay}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#FFF9EF]/95 backdrop-blur-md border border-[#C9A66B] rounded-full text-[#164C3B] font-ui text-xs uppercase tracking-wider shadow-md hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]"
          title="Replay Invitation Unsealing"
          aria-label="Replay invitation opening"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Replay</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#FFF9EF]/95 backdrop-blur-md border border-[#C9A66B] rounded-full text-[#164C3B] font-ui text-xs uppercase tracking-wider shadow-md hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]"
          title="Share Invitation Link"
          aria-label="Share invitation link"
        >
          {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
        </button>

        <button
          onClick={() => setShowCodeModal(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#164C3B] border border-[#C9A66B] rounded-full text-[#FFF9EF] font-ui text-xs uppercase tracking-wider shadow-md hover:bg-[#0E352A] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A66B]"
          title="View & Export Standalone HTML/CSS for Netlify"
          aria-label="Export Netlify bundle"
        >
          <Code2 className="w-4 h-4 text-[#C9A66B]" />
          <span className="hidden md:inline">Netlify Bundle</span>
        </button>
      </aside>

      {/* ========================================================
          HERO STAGE: 3D DOOR-FOLD OPENING CARD
          ======================================================== */}
      <header
        ref={heroRef}
        className="min-h-screen relative flex flex-col items-center justify-center px-4 py-16 overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#FFFDF8_0%,#FFF9EF_70%,#F5ECDD_100%)]"
      >
        {/* Parallax Botanical Ambient Graphics */}
        <div
          className="ambient-flora flora-left pointer-events-none transition-transform duration-300 ease-out hidden lg:block"
          style={{ transform: `translate(${parallax.x}px, ${parallax.y}px) rotate(-10deg)` }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 300" className="w-64 h-96 opacity-40">
            <path d="M20,280 C60,200 30,120 110,60 C130,45 150,70 125,95 C95,125 140,165 95,220 C80,240 50,270 20,280 Z" fill="#A8B5A0" />
            <path d="M125,95 C145,80 180,90 170,115 C155,145 120,135 125,95 Z" fill="#E9CFC8" />
            <path d="M100,160 C125,145 150,170 135,190 C110,210 90,185 100,160 Z" fill="#E9CFC8" />
          </svg>
        </div>

        <div
          className="ambient-flora flora-right pointer-events-none transition-transform duration-300 ease-out hidden lg:block"
          style={{ transform: `translate(${-parallax.x}px, ${-parallax.y}px) scaleX(-1) rotate(-10deg)` }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 200 300" className="w-64 h-96 opacity-40">
            <path d="M180,280 C140,200 170,120 90,60 C70,45 50,70 75,95 C105,125 60,165 105,220 C120,240 150,270 180,280 Z" fill="#A8B5A0" />
            <path d="M75,95 C55,80 20,90 30,115 C45,145 80,135 75,95 Z" fill="#E9CFC8" />
            <path d="M100,160 C75,145 50,170 65,190 C90,210 110,185 100,160 Z" fill="#E9CFC8" />
          </svg>
        </div>

        {/* 3D Gatefold Card Container */}
        <div className="invitation-3d-wrapper">
          <div className={`invitation-envelope ${isOpen ? 'is-open' : ''}`} id="invitationEnvelope">
            
            {/* INNER REVEALED CARD */}
            <div className="card-interior relative w-full min-h-[640px] bg-[#FFFCF7] rounded-xl p-4 md:p-6 flex flex-col justify-center items-center">
              <div className="interior-border-outer w-full h-full p-2 border border-[#C9A66B]/40 rounded-lg">
                <div className="interior-border-inner relative w-full h-full p-6 sm:p-10 border-[1.5px] border-[#C9A66B] rounded-md text-center flex flex-col items-center justify-center">

                  {/* Corner Filigrees */}
                  <div className="corner-filigree top-left absolute top-2 left-2 w-9 h-9 pointer-events-none" aria-hidden="true">
                    <svg viewBox="0 0 60 60"><path d="M5,5 L5,40 C5,20 20,5 40,5 L5,5 Z M12,12 L12,28 C15,18 18,15 28,12 L12,12 Z" fill="#C9A66B"/></svg>
                  </div>
                  <div className="corner-filigree top-right absolute top-2 right-2 w-9 h-9 pointer-events-none" aria-hidden="true">
                    <svg viewBox="0 0 60 60"><path d="M55,5 L55,40 C55,20 40,5 20,5 L55,5 Z M48,12 L48,28 C45,18 42,15 32,12 L48,12 Z" fill="#C9A66B"/></svg>
                  </div>
                  <div className="corner-filigree bottom-left absolute bottom-2 left-2 w-9 h-9 pointer-events-none" aria-hidden="true">
                    <svg viewBox="0 0 60 60"><path d="M5,55 L5,20 C5,40 20,55 40,55 L5,55 Z M12,48 L12,32 C15,42 18,45 28,48 L12,48 Z" fill="#C9A66B"/></svg>
                  </div>
                  <div className="corner-filigree bottom-right absolute bottom-2 right-2 w-9 h-9 pointer-events-none" aria-hidden="true">
                    <svg viewBox="0 0 60 60"><path d="M55,55 L55,20 C55,40 40,55 20,55 L55,55 Z M48,48 L48,32 C45,42 42,45 32,48 L48,48 Z" fill="#C9A66B"/></svg>
                  </div>

                  {/* Header: Royal Arch Crest & Bismillah */}
                  <div className={`interior-header mb-4 ${isOpen ? 'animate-fade-in-down' : ''}`}>
                    <div className="w-28 mx-auto mb-1" aria-hidden="true">
                      <svg viewBox="0 0 140 40" className="w-full h-8">
                        <path d="M10,35 Q70,-10 130,35" fill="none" stroke="#C9A66B" strokeWidth="1.5" />
                        <path d="M25,35 Q70,0 115,35" fill="none" stroke="#A98548" strokeWidth="0.8" />
                        <circle cx="70" cy="12" r="3.5" fill="#C9A66B" />
                        <circle cx="58" cy="15" r="2" fill="#A98548" />
                        <circle cx="82" cy="15" r="2" fill="#A98548" />
                      </svg>
                    </div>
                    <p className="font-arabic text-2xl md:text-3xl text-[#A98548] tracking-wide" dir="rtl">
                      بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
                    </p>
                    <p className="font-ui text-[11px] tracking-[0.2em] uppercase text-[#A8B5A0] mt-1 font-medium">
                      In the name of Allah, the Most Gracious, the Most Merciful
                    </p>
                  </div>

                  {/* Hosts & Formal Invitation Request */}
                  <div className={`interior-hosts max-w-xl mb-4 ${isOpen ? 'animate-fade-in-up' : ''}`}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#164C3B] tracking-wider uppercase">
                      Mr. &amp; Mrs. Sadaqat Hussain
                    </h2>
                    <div className="gold-divider-gem flex items-center justify-center gap-3 my-2 max-w-[200px] mx-auto" aria-hidden="true">
                      <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent"></span>
                      <span className="text-[#C9A66B] text-xs">♦</span>
                      <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent"></span>
                    </div>
                    <p className="text-sm sm:text-base md:text-lg italic text-[#5E584F] leading-relaxed">
                      Request the pleasure of your company at the wedding ceremony of their beloved Son
                    </p>
                  </div>

                  {/* Couple Spotlight */}
                  <div className={`couple-spotlight my-3 ${isOpen ? 'animate-scale-fade-in' : ''}`}>
                    <h1 className="font-script text-4xl sm:text-6xl md:text-7xl font-normal text-[#164C3B] leading-none drop-shadow-sm">
                      Mussadiq Hussain
                    </h1>
                    
                    <div className="inline-flex items-center justify-center px-5 py-0.5 my-2.5 border border-[#C9A66B] rounded-full bg-[#FFF9EF]/90">
                      <span className="font-heading text-base sm:text-lg italic text-[#A98548] tracking-wider">
                        with
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#164C3B] tracking-wide">
                      D/o Saleem Satti
                    </h2>
                  </div>

                  {/* Footnote: Venue & Date */}
                  <div className={`interior-footer-note border-t border-[#C9A66B]/30 pt-3 mt-2 w-full max-w-md ${isOpen ? 'animate-fade-in-up' : ''}`}>
                    <p className="font-ui text-xs sm:text-sm tracking-[0.2em] uppercase text-[#A98548] font-semibold">
                      White Pearl Marquee • Islamabad
                    </p>
                    <p className="font-heading text-sm sm:text-base text-[#5E584F] italic mt-0.5">
                      20 – 22 November 2026
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* LEFT HINGED GATEFOLD DOOR */}
            <div
              id="doorLeft"
              onClick={handleOpen}
              className="card-door door-left cursor-pointer group"
              title="Click to open invitation"
            >
              <div className="door-inner-pattern w-full h-full p-4 flex flex-col">
                <div className="door-gold-frame w-full h-full border border-[#C9A66B]/50 relative flex flex-col justify-between items-center p-6 sm:p-8">
                  {/* Botanical Accent SVG */}
                  <div className="door-flora-art w-16 h-28 opacity-60" aria-hidden="true">
                    <svg viewBox="0 0 100 180" className="w-full h-full">
                      <path d="M10,170 C40,110 20,60 85,15 C60,40 50,75 55,100" fill="none" stroke="#C9A66B" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="85" cy="15" r="4" fill="#E9CFC8" />
                      <circle cx="65" cy="45" r="3" fill="#C9A66B" />
                      <circle cx="45" cy="85" r="3.5" fill="#E9CFC8" />
                      <path d="M25,120 Q55,115 50,140" fill="none" stroke="#A8B5A0" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Monogram Split Circle Left ("M") */}
                  <div className="door-seal-half seal-left absolute top-1/2 -translate-y-1/2 -right-[1px] w-14 h-24 flex items-center justify-end z-10">
                    <div className="w-14 h-14 border-2 border-[#C9A66B] rounded-full bg-[#0E352A] flex items-center justify-center shadow-inner">
                      <span className="font-heading text-2xl font-bold text-[#C9A66B]">M</span>
                    </div>
                  </div>

                  <div className="door-text-block text-center z-10">
                    <span className="block font-heading text-sm sm:text-base italic tracking-widest text-[#E3CA98]">
                      Together With
                    </span>
                    <span className="block font-ui text-[11px] tracking-[0.25em] uppercase text-[#FFF9EF] mt-1 font-medium">
                      Our Families
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT HINGED GATEFOLD DOOR */}
            <div
              id="doorRight"
              onClick={handleOpen}
              className="card-door door-right cursor-pointer group"
              title="Click to open invitation"
            >
              <div className="door-inner-pattern w-full h-full p-4 flex flex-col">
                <div className="door-gold-frame w-full h-full border border-[#C9A66B]/50 relative flex flex-col justify-between items-center p-6 sm:p-8">
                  {/* Botanical Accent SVG Flipped */}
                  <div className="door-flora-art flip-h w-16 h-28 opacity-60 scale-x-[-1]" aria-hidden="true">
                    <svg viewBox="0 0 100 180" className="w-full h-full">
                      <path d="M10,170 C40,110 20,60 85,15 C60,40 50,75 55,100" fill="none" stroke="#C9A66B" strokeWidth="1.2" strokeLinecap="round" />
                      <circle cx="85" cy="15" r="4" fill="#E9CFC8" />
                      <circle cx="65" cy="45" r="3" fill="#C9A66B" />
                      <circle cx="45" cy="85" r="3.5" fill="#E9CFC8" />
                      <path d="M25,120 Q55,115 50,140" fill="none" stroke="#A8B5A0" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Monogram Split Circle Right ("S") */}
                  <div className="door-seal-half seal-right absolute top-1/2 -translate-y-1/2 -left-[1px] w-14 h-24 flex items-center justify-start z-10">
                    <div className="w-14 h-14 border-2 border-[#C9A66B] rounded-full bg-[#0E352A] flex items-center justify-center shadow-inner">
                      <span className="font-heading text-2xl font-bold text-[#C9A66B]">S</span>
                    </div>
                  </div>

                  <div className="door-text-block text-center z-10">
                    <span className="block font-heading text-sm sm:text-base italic tracking-widest text-[#E3CA98]">
                      Royal Union
                    </span>
                    <span className="block font-ui text-[11px] tracking-[0.25em] uppercase text-[#FFF9EF] mt-1 font-medium">
                      Invitation
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* INTERACTIVE WAX SEAL UNSEAL BUTTON */}
            <div className="card-lock-trigger absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500">
              <button
                id="openDoorBtn"
                onClick={handleOpen}
                className="group focus:outline-none focus-visible:ring-4 focus-visible:ring-[#C9A66B]/50 rounded-full"
                aria-label="Open the wedding invitation card"
              >
                <span className="flex flex-col items-center gap-2 px-6 py-4 bg-[#0E352A]/95 border-2 border-[#C9A66B] rounded-full shadow-2xl group-hover:scale-105 group-hover:bg-[#164C3B] group-hover:border-[#E3CA98] transition-all duration-300">
                  <svg className="w-11 h-11 filter drop-shadow-md" viewBox="0 0 48 48" aria-hidden="true">
                    <circle cx="24" cy="24" r="21" fill="none" stroke="#C9A66B" strokeWidth="1.5" strokeDasharray="3 2" />
                    <circle cx="24" cy="24" r="18" fill="#164C3B" stroke="#C9A66B" strokeWidth="1.5" />
                    <path d="M16,24 L24,16 L32,24 L24,32 Z" fill="#C9A66B" opacity="0.9" />
                    <circle cx="24" cy="24" r="3" fill="#FFF9EF" />
                  </svg>
                  <span className="font-ui text-xs tracking-[0.22em] font-semibold text-[#E3CA98] uppercase">
                    OPEN THE INVITATION
                  </span>
                  <span className="font-heading text-sm italic text-[#E9CFC8] tracking-wider">
                    Click to unseal
                  </span>
                </span>
              </button>
            </div>

          </div>
        </div>

        {/* Scroll Cue (Becomes active once open) */}
        <div
          onClick={scrollToProgramme}
          className={`cursor-pointer mt-8 flex flex-col items-center gap-1.5 transition-all duration-700 ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          <span className="font-ui text-xs tracking-[0.2em] uppercase text-[#A98548] font-medium">
            Explore Programme &amp; Venue
          </span>
          <ChevronDown className="w-5 h-5 text-[#C9A66B] animate-bounce" />
        </div>
      </header>

      {/* ========================================================
          COUNTDOWN TIMER STRIP
          ======================================================== */}
      <section className="bg-[#164C3B] text-[#FFF9EF] py-8 border-y border-[#C9A66B]/40">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="font-ui text-xs tracking-[0.25em] uppercase text-[#E3CA98] font-semibold mb-2">
            Countdown to Celebrations · Islamabad
          </p>
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto mt-4">
            <div className="bg-[#0E352A]/80 border border-[#C9A66B]/40 rounded-lg p-3 sm:p-4 shadow-inner">
              <span className="block font-heading text-2xl sm:text-4xl font-bold text-[#E3CA98] tabular-nums">
                {timeLeft.days}
              </span>
              <span className="font-ui text-[10px] sm:text-xs uppercase tracking-wider text-[#A8B5A0]">Days</span>
            </div>
            <div className="bg-[#0E352A]/80 border border-[#C9A66B]/40 rounded-lg p-3 sm:p-4 shadow-inner">
              <span className="block font-heading text-2xl sm:text-4xl font-bold text-[#E3CA98] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="font-ui text-[10px] sm:text-xs uppercase tracking-wider text-[#A8B5A0]">Hours</span>
            </div>
            <div className="bg-[#0E352A]/80 border border-[#C9A66B]/40 rounded-lg p-3 sm:p-4 shadow-inner">
              <span className="block font-heading text-2xl sm:text-4xl font-bold text-[#E3CA98] tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="font-ui text-[10px] sm:text-xs uppercase tracking-wider text-[#A8B5A0]">Mins</span>
            </div>
            <div className="bg-[#0E352A]/80 border border-[#C9A66B]/40 rounded-lg p-3 sm:p-4 shadow-inner">
              <span className="block font-heading text-2xl sm:text-4xl font-bold text-[#E3CA98] tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="font-ui text-[10px] sm:text-xs uppercase tracking-wider text-[#A8B5A0]">Secs</span>
            </div>
          </div>
          <p className="font-heading italic text-sm text-[#E9CFC8] mt-3">
            Inshallah starting Friday, 20 November 2026 with Rasm Hina
          </p>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: WEDDING PROGRAMME
          ======================================================== */}
      <main>
        <section ref={programmeRef} className="py-20 md:py-28 px-4 bg-[#FFF9EF]" id="programme">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="font-ui text-xs font-semibold tracking-[0.25em] uppercase text-[#A98548] block mb-2">
                Auspicious Celebrations
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#164C3B] tracking-wide">
                Wedding Programme
              </h2>
              <div className="gold-divider-gem flex items-center justify-center gap-3 my-3 max-w-[240px] mx-auto" aria-hidden="true">
                <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent"></span>
                <span className="text-[#C9A66B] text-sm">❦</span>
                <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent"></span>
              </div>
              <p className="text-base sm:text-lg italic text-[#5E584F] max-w-xl mx-auto">
                We cordially invite you to share our heartfelt moments and blessings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              
              {/* Event 1: Mehndi */}
              <article className="bg-[#FFFCF7] border border-[#C9A66B]/40 rounded-lg p-2.5 shadow-sm hover:shadow-xl hover:border-[#C9A66B] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                <div className="border border-[#C9A66B]/25 rounded-md p-6 sm:p-8 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-6 mx-auto mb-3" aria-hidden="true">
                      <svg viewBox="0 0 80 30" className="w-full h-full">
                        <path d="M10,25 C30,5 50,5 70,25" fill="none" stroke="#C9A66B" strokeWidth="1.2" />
                        <circle cx="40" cy="12" r="3" fill="#164C3B" />
                      </svg>
                    </div>
                    <span className="font-ui text-xs font-semibold tracking-widest uppercase text-[#A8B5A0] block mb-2">
                      Pre-Wedding Festivity
                    </span>
                    <h3 className="text-3xl font-semibold text-[#164C3B] mb-1">Mehndi</h3>
                    <p className="text-lg italic text-[#A98548] mb-5">Friday, 20 November 2026</p>
                    
                    <div className="w-10 h-[1px] bg-[#C9A66B] mx-auto mb-6 opacity-60"></div>

                    <div className="space-y-3 mb-6">
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold text-[#29251F]">Rasm Hina</span>
                        <span className="font-ui text-xs font-medium tracking-wider text-[#164C3B]">8:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-ui text-[11px] uppercase tracking-wider text-[#A8B5A0] mb-5">
                      Pakistan Standard Time (PKT)
                    </p>
                    {/* Add to Calendar Action */}
                    <div className="flex flex-col sm:flex-row gap-2 justify-center pt-3 border-t border-[#C9A66B]/20">
                      <a
                        href={createGoogleCalendarUrl(WEDDING_EVENTS[0])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FFF9EF] border border-[#C9A66B] rounded-full text-xs font-ui font-medium text-[#164C3B] hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Google Cal</span>
                      </a>
                      <button
                        onClick={() => downloadIcsFile(WEDDING_EVENTS[0])}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FFF9EF] border border-[#C9A66B] rounded-full text-xs font-ui font-medium text-[#164C3B] hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>iCal / Apple</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Event 2: Barat (Featured Centerpiece) */}
              <article className="bg-[#FFFDF9] border-2 border-[#C9A66B] rounded-lg p-2.5 shadow-xl relative hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                <div className="border border-[#C9A66B]/60 rounded-md p-6 sm:p-8 text-center flex-1 flex flex-col justify-between bg-gradient-to-b from-white/60 to-transparent">
                  <div>
                    <div className="w-12 h-6 mx-auto mb-3" aria-hidden="true">
                      <svg viewBox="0 0 80 30" className="w-full h-full">
                        <path d="M10,25 C30,5 50,5 70,25" fill="none" stroke="#C9A66B" strokeWidth="1.2" />
                        <circle cx="40" cy="12" r="3.5" fill="#C9A66B" />
                      </svg>
                    </div>
                    <span className="font-ui text-xs font-bold tracking-widest uppercase text-[#A98548] block mb-2">
                      The Main Ceremony
                    </span>
                    <h3 className="text-3xl font-semibold text-[#164C3B] mb-1">Barat</h3>
                    <p className="text-lg italic text-[#A98548] mb-5">Saturday, 21 November 2026</p>
                    
                    <div className="w-10 h-[1px] bg-[#C9A66B] mx-auto mb-6 opacity-80"></div>

                    <div className="space-y-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold text-[#29251F]">Sehra Bandi</span>
                        <span className="font-ui text-xs font-medium tracking-wider text-[#164C3B]">5:00 PM</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold text-[#29251F]">Departure of Barat</span>
                        <span className="font-ui text-xs font-medium tracking-wider text-[#164C3B]">7:00 PM</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-ui text-[11px] uppercase tracking-wider text-[#A8B5A0] mb-5">
                      Pakistan Standard Time (PKT)
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center pt-3 border-t border-[#C9A66B]/30">
                      <a
                        href={createGoogleCalendarUrl(WEDDING_EVENTS[1])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#164C3B] border border-[#C9A66B] rounded-full text-xs font-ui font-medium text-[#FFF9EF] hover:bg-[#0E352A] transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#E3CA98]" />
                        <span>Google Cal</span>
                      </a>
                      <button
                        onClick={() => downloadIcsFile(WEDDING_EVENTS[1])}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FFF9EF] border border-[#C9A66B] rounded-full text-xs font-ui font-medium text-[#164C3B] hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>iCal / Apple</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>

              {/* Event 3: Walima */}
              <article className="bg-[#FFFCF7] border border-[#C9A66B]/40 rounded-lg p-2.5 shadow-sm hover:shadow-xl hover:border-[#C9A66B] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
                <div className="border border-[#C9A66B]/25 rounded-md p-6 sm:p-8 text-center flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-6 mx-auto mb-3" aria-hidden="true">
                      <svg viewBox="0 0 80 30" className="w-full h-full">
                        <path d="M10,25 C30,5 50,5 70,25" fill="none" stroke="#C9A66B" strokeWidth="1.2" />
                        <circle cx="40" cy="12" r="3" fill="#164C3B" />
                      </svg>
                    </div>
                    <span className="font-ui text-xs font-semibold tracking-widest uppercase text-[#A8B5A0] block mb-2">
                      The Reception
                    </span>
                    <h3 className="text-3xl font-semibold text-[#164C3B] mb-1">Walima</h3>
                    <p className="text-lg italic text-[#A98548] mb-5">Sunday, 22 November 2026</p>
                    
                    <div className="w-10 h-[1px] bg-[#C9A66B] mx-auto mb-6 opacity-60"></div>

                    <div className="space-y-3 mb-6">
                      <div className="flex flex-col">
                        <span className="text-xl font-semibold text-[#29251F]">Dinner</span>
                        <span className="font-ui text-xs font-medium tracking-wider text-[#164C3B]">8:00 PM – 9:30 PM</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-ui text-[11px] uppercase tracking-wider text-[#A8B5A0] mb-5">
                      Pakistan Standard Time (PKT)
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center pt-3 border-t border-[#C9A66B]/20">
                      <a
                        href={createGoogleCalendarUrl(WEDDING_EVENTS[2])}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FFF9EF] border border-[#C9A66B] rounded-full text-xs font-ui font-medium text-[#164C3B] hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Google Cal</span>
                      </a>
                      <button
                        onClick={() => downloadIcsFile(WEDDING_EVENTS[2])}
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#FFF9EF] border border-[#C9A66B] rounded-full text-xs font-ui font-medium text-[#164C3B] hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>iCal / Apple</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>

            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 3: VENUE HIGHLIGHT (ROYAL EMERALD)
            ======================================================== */}
        <section className="py-24 px-4 bg-[radial-gradient(circle_at_center,#164C3B_0%,#0E352A_100%)] text-[#FFF9EF] relative overflow-hidden" id="venue">
          <div className="max-w-4xl mx-auto flex justify-center relative z-10">
            <div className="w-full border-[1.5px] border-[#C9A66B] rounded-2xl p-8 sm:p-14 text-center bg-[#0E352A]/60 backdrop-blur-md shadow-2xl">
              
              {/* Architectural Pavilion Icon */}
              <div className="w-20 h-20 mx-auto mb-6" aria-hidden="true">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50,12 L85,38 L85,42 L15,42 L15,38 Z" fill="none" stroke="#C9A66B" strokeWidth="1.8" />
                  <path d="M22,42 L22,82 M36,42 L36,82 M50,42 L50,82 M64,42 L64,82 M78,42 L78,82" stroke="#C9A66B" strokeWidth="1.4" />
                  <path d="M10,82 L90,82 L95,88 L5,88 Z" fill="#C9A66B" />
                  <circle cx="50" cy="28" r="4.5" fill="#FFF9EF" />
                  <path d="M50,8 L50,14" stroke="#C9A66B" strokeWidth="2" />
                </svg>
              </div>

              <span className="font-ui text-xs tracking-[0.25em] uppercase text-[#E3CA98] font-semibold block mb-2">
                The Destination
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold tracking-wide text-[#FFF9EF] mb-2">
                White Pearl Marquee
              </h2>

              <div className="gold-divider-gem flex items-center justify-center gap-3 my-3 max-w-[200px] mx-auto" aria-hidden="true">
                <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#E3CA98] to-transparent"></span>
                <span className="text-[#E3CA98] text-sm">✦</span>
                <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#E3CA98] to-transparent"></span>
              </div>

              <address className="not-italic text-lg sm:text-2xl text-[#E3CA98] font-heading tracking-wider mb-4">
                Company Road Banigala Islamabad
              </address>

              <p className="max-w-lg mx-auto text-base italic text-[#E9CFC8] leading-relaxed mb-8">
                Join us in the scenic serenity of Banigala for an unforgettable celebration under the chandeliers.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=White+Pearl+Marquee+Company+Road+Banigala+Islamabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-[1.5px] border-[#C9A66B] rounded-full bg-transparent text-[#FFF9EF] font-ui text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#C9A66B] hover:text-[#0E352A] transition-all duration-300 shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  <span>VIEW VENUE ON GOOGLE MAPS</span>
                </a>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#C9A66B]/50 rounded-full bg-[#0E352A] text-[#E3CA98] font-ui text-xs font-medium tracking-wider uppercase hover:border-[#C9A66B] transition-all"
                >
                  {copiedAddress ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            SECTION 4: RSVP SECTION & INTERACTIVE GUEST CONFIRMATION
            ======================================================== */}
        <section className="py-20 md:py-28 px-4 bg-[#FFF9EF]" id="rsvp">
          <div className="max-w-5xl mx-auto">
            
            <div className="relative bg-[#FFFCF7] border border-[#C9A66B]/40 rounded-xl p-8 sm:p-14 shadow-sm">
              {/* Corner Accents */}
              <span className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#C9A66B] pointer-events-none"></span>
              <span className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#C9A66B] pointer-events-none"></span>
              <span className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#C9A66B] pointer-events-none"></span>
              <span className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#C9A66B] pointer-events-none"></span>

              <div className="text-center mb-12">
                <span className="font-ui text-xs font-semibold tracking-[0.25em] uppercase text-[#A98548] block mb-2">
                  Kind Compliments
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#164C3B] tracking-wide">
                  R.S.V.P
                </h2>
                <div className="gold-divider-gem flex items-center justify-center gap-3 my-3 max-w-[200px] mx-auto" aria-hidden="true">
                  <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent"></span>
                  <span className="text-[#C9A66B] text-xs">♦</span>
                  <span className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent"></span>
                </div>
                <p className="text-base sm:text-lg italic text-[#5E584F] max-w-lg mx-auto">
                  Please contact our family coordinators for inquiries, seating, and arrangements
                </p>
              </div>

              {/* 3 Family Contact Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                
                {/* Contact 1: Muqaddas Hussain */}
                <div className="text-center p-6 rounded-lg bg-[#FFF9EF] border border-dashed border-[#C9A66B]/50 flex flex-col items-center hover:border-solid hover:border-[#C9A66B] transition-all">
                  <div className="w-12 h-12 border border-[#C9A66B] rounded-full flex items-center justify-center mb-3.5 bg-[#FFFCF7]">
                    <span className="font-heading text-xl font-bold text-[#164C3B]">M</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#164C3B] mb-2">Muqaddas Hussain</h3>
                  <div className="flex flex-col gap-2 mt-1">
                    <a
                      href="tel:03081513315"
                      className="inline-flex items-center gap-2 font-ui text-xs font-medium text-[#A98548] px-3.5 py-1.5 rounded-full bg-[#C9A66B]/10 hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-all"
                      aria-label="Call Muqaddas Hussain at 0308-1513315"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>0308-1513315</span>
                    </a>
                    <a
                      href="https://wa.me/923081513315?text=Assalam-o-Alaikum%2C%20RSVP%20regarding%20Mussadiq%20Hussain%27s%20Wedding%20Celebration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 font-ui text-[11px] text-[#164C3B] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Message</span>
                    </a>
                  </div>
                </div>

                {/* Contact 2: Sharafat Hussain */}
                <div className="text-center p-6 rounded-lg bg-[#FFF9EF] border border-dashed border-[#C9A66B]/50 flex flex-col items-center hover:border-solid hover:border-[#C9A66B] transition-all">
                  <div className="w-12 h-12 border border-[#C9A66B] rounded-full flex items-center justify-center mb-3.5 bg-[#FFFCF7]">
                    <span className="font-heading text-xl font-bold text-[#164C3B]">S</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#164C3B] mb-2">Sharafat Hussain</h3>
                  <div className="flex flex-col gap-2 mt-1">
                    <a
                      href="tel:03445310410"
                      className="inline-flex items-center gap-2 font-ui text-xs font-medium text-[#A98548] px-3.5 py-1.5 rounded-full bg-[#C9A66B]/10 hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-all"
                      aria-label="Call Sharafat Hussain at 0344-5310410"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>0344-5310410</span>
                    </a>
                    <a
                      href="https://wa.me/923445310410?text=Assalam-o-Alaikum%2C%20RSVP%20regarding%20Mussadiq%20Hussain%27s%20Wedding%20Celebration"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 font-ui text-[11px] text-[#164C3B] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Message</span>
                    </a>
                  </div>
                </div>

                {/* Contact 3: Khadam Hussain */}
                <div className="text-center p-6 rounded-lg bg-[#FFF9EF] border border-dashed border-[#C9A66B]/50 flex flex-col items-center hover:border-solid hover:border-[#C9A66B] transition-all">
                  <div className="w-12 h-12 border border-[#C9A66B] rounded-full flex items-center justify-center mb-3.5 bg-[#FFFCF7]">
                    <span className="font-heading text-xl font-bold text-[#164C3B]">K</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#164C3B] mb-2">Khadam Hussain</h3>
                  <p className="text-base italic text-[#A8B5A0] mt-1">With Family</p>
                  <p className="font-ui text-[11px] text-[#5E584F] mt-2">Family Host &amp; Elder</p>
                </div>

              </div>

              {/* Online Quick RSVP Confirmation Box */}
              <div className="border-t border-[#C9A66B]/30 pt-8 max-w-xl mx-auto">
                <h4 className="text-center font-heading text-2xl font-semibold text-[#164C3B] mb-2">
                  Confirm Your Attendance Online
                </h4>
                <p className="text-center text-sm italic text-[#5E584F] mb-6">
                  Let the hosts know your party size and attending functions
                </p>

                {rsvpSubmitted ? (
                  <div className="bg-[#164C3B]/10 border border-[#C9A66B] rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-[#164C3B] text-[#FFF9EF] rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-6 h-6 text-[#E3CA98]" />
                    </div>
                    <h5 className="font-heading text-xl font-semibold text-[#164C3B]">Thank You, {rsvpForm.name}!</h5>
                    <p className="text-sm italic text-[#5E584F] mt-1">
                      Your RSVP for {rsvpForm.guestsCount} guests has been recorded. Mr. &amp; Mrs. Sadaqat Hussain look forward to welcoming you!
                    </p>
                    <button
                      onClick={() => setRsvpSubmitted(false)}
                      className="mt-4 font-ui text-xs underline text-[#A98548] hover:text-[#164C3B]"
                    >
                      Update response
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <div>
                      <label className="block font-ui text-xs uppercase tracking-wider text-[#5E584F] mb-1">
                        Your Full Name / Family Name
                      </label>
                      <input
                        type="text"
                        required
                        value={rsvpForm.name}
                        onChange={e => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                        placeholder="e.g. Mr. & Mrs. Tariq Abbasi"
                        className="w-full px-4 py-2.5 rounded-lg border border-[#C9A66B]/50 bg-white text-sm focus:outline-none focus:border-[#164C3B]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-ui text-xs uppercase tracking-wider text-[#5E584F] mb-1">
                          Number of Guests
                        </label>
                        <select
                          value={rsvpForm.guestsCount}
                          onChange={e => setRsvpForm({ ...rsvpForm, guestsCount: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-[#C9A66B]/50 bg-white text-sm focus:outline-none focus:border-[#164C3B]"
                        >
                          <option value="1">1 Guest</option>
                          <option value="2">2 Guests (Couple)</option>
                          <option value="3">3 Guests</option>
                          <option value="4">4 Guests</option>
                          <option value="5+">5+ Guests (With Family)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-ui text-xs uppercase tracking-wider text-[#5E584F] mb-1">
                          Events Attending
                        </label>
                        <div className="flex items-center gap-3 pt-2 text-xs font-ui">
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={rsvpForm.attendingMehndi}
                              onChange={e => setRsvpForm({ ...rsvpForm, attendingMehndi: e.target.checked })}
                              className="accent-[#164C3B]"
                            />
                            <span>Mehndi</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={rsvpForm.attendingBarat}
                              onChange={e => setRsvpForm({ ...rsvpForm, attendingBarat: e.target.checked })}
                              className="accent-[#164C3B]"
                            />
                            <span>Barat</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={rsvpForm.attendingWalima}
                              onChange={e => setRsvpForm({ ...rsvpForm, attendingWalima: e.target.checked })}
                              className="accent-[#164C3B]"
                            />
                            <span>Walima</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-ui text-xs uppercase tracking-wider text-[#5E584F] mb-1">
                        Dua / Message for the Couple (Optional)
                      </label>
                      <input
                        type="text"
                        value={rsvpForm.note}
                        onChange={e => setRsvpForm({ ...rsvpForm, note: e.target.value })}
                        placeholder="Send warm blessings to Mussadiq & his bride..."
                        className="w-full px-4 py-2.5 rounded-lg border border-[#C9A66B]/50 bg-white text-sm focus:outline-none focus:border-[#164C3B]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#164C3B] hover:bg-[#0E352A] text-[#FFF9EF] font-ui text-xs font-semibold uppercase tracking-widest rounded-lg border border-[#C9A66B] transition-colors shadow-md"
                    >
                      Confirm Attendance
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================
            SECTION 5: FAMILY GREETING & ISLAMIC DUAS
            ======================================================== */}
        <section className="py-20 md:py-28 px-4 bg-gradient-to-b from-[#FFF9EF] to-[#F7EFE1] text-center" id="familyGreeting">
          <div className="max-w-3xl mx-auto">
            
            <div className="w-24 h-10 mx-auto mb-4" aria-hidden="true">
              <svg viewBox="0 0 120 50" className="w-full h-full">
                <path d="M10,25 C40,5 80,5 110,25 C80,45 40,45 10,25 Z" fill="none" stroke="#C9A66B" strokeWidth="1.2" />
                <circle cx="60" cy="25" r="4" fill="#C9A66B" />
                <circle cx="45" cy="25" r="2.5" fill="#E9CFC8" />
                <circle cx="75" cy="25" r="2.5" fill="#E9CFC8" />
              </svg>
            </div>

            <span className="font-ui text-xs tracking-[0.25em] uppercase text-[#A98548] block mb-1">
              Warmest Regards
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#164C3B] mb-6">
              Looking Forward
            </h2>

            <div className="bg-[#FFFCF7] border border-[#C9A66B]/50 rounded-lg p-8 sm:p-10 shadow-sm mb-8">
              <p className="text-lg italic text-[#5E584F] mb-3">
                With prayers and warm anticipation of your presence:
              </p>
              <p className="text-2xl sm:text-3xl font-semibold text-[#164C3B]">
                Mr. &amp; Mrs.<br />
                <span className="text-3xl sm:text-4xl text-[#A98548] uppercase tracking-wide">
                  Sadaqat Hussain
                </span>
              </p>
            </div>

            <div className="pt-6 border-t border-[#C9A66B]/30 max-w-2xl mx-auto mb-14">
              <p className="font-arabic text-2xl sm:text-3xl text-[#164C3B] tracking-wide mb-3" dir="rtl">
                بَارَكَ اللَّهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
              </p>
              <p className="text-base sm:text-lg italic text-[#5E584F] max-w-lg mx-auto">
                “May Allah bless you, shower His blessings upon you, and unite you both in goodness.”
              </p>
            </div>

            {/* Guest Wishes & Prayers Wall */}
            <div className="border border-[#C9A66B]/40 rounded-xl p-6 sm:p-8 bg-[#FFFCF7] text-left">
              <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[#C9A66B]/20">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#C9A66B] fill-current" />
                  <h3 className="font-heading text-2xl font-semibold text-[#164C3B]">
                    Blessings &amp; Well-Wishes
                  </h3>
                </div>
                <span className="font-ui text-xs text-[#A8B5A0] tracking-wider uppercase">
                  {wishes.length} Prayers Shared
                </span>
              </div>

              {/* Add Wish Form */}
              <form onSubmit={handleWishSubmit} className="mb-8 p-4 bg-[#FFF9EF] rounded-lg border border-[#C9A66B]/30">
                <p className="font-heading text-base italic text-[#5E584F] mb-3">
                  Leave a heartfelt prayer or congratulatory note for the newlyweds:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    required
                    value={wishForm.name}
                    onChange={e => setWishForm({ ...wishForm, name: e.target.value })}
                    placeholder="Your Name"
                    className="px-3.5 py-2 text-xs rounded border border-[#C9A66B]/40 bg-white focus:outline-none focus:border-[#164C3B]"
                  />
                  <input
                    type="text"
                    value={wishForm.relation}
                    onChange={e => setWishForm({ ...wishForm, relation: e.target.value })}
                    placeholder="Relation / City (e.g. Islamabad, Cousin)"
                    className="px-3.5 py-2 text-xs rounded border border-[#C9A66B]/40 bg-white focus:outline-none focus:border-[#164C3B]"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={wishForm.message}
                    onChange={e => setWishForm({ ...wishForm, message: e.target.value })}
                    placeholder="Write your prayers and blessing..."
                    className="flex-1 px-3.5 py-2 text-xs rounded border border-[#C9A66B]/40 bg-white focus:outline-none focus:border-[#164C3B]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#164C3B] hover:bg-[#0E352A] text-[#FFF9EF] rounded text-xs font-ui uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>
                {wishSubmitted && (
                  <p className="font-ui text-xs text-emerald-700 mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Your warm blessing has been added to the guestbook!</span>
                  </p>
                )}
              </form>

              {/* Wishes List */}
              <div className="space-y-4">
                {wishes.map(wish => (
                  <div key={wish.id} className="p-4 rounded-lg bg-white border border-[#C9A66B]/20 shadow-xs">
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-heading font-semibold text-lg text-[#164C3B]">{wish.name}</span>
                        <span className="font-ui text-[11px] text-[#A8B5A0] uppercase tracking-wider">
                          · {wish.relation}
                        </span>
                      </div>
                      <span className="font-ui text-[10px] text-[#A8B5A0]">{wish.timestamp}</span>
                    </div>
                    <p className="text-sm italic text-[#5E584F] leading-relaxed">
                      “{wish.message}”
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* ========================================================
          FOOTER
          ======================================================== */}
      <footer className="py-8 bg-[#0E352A] text-[#FFF9EF] text-center border-t border-[#C9A66B]">
        <div className="max-w-4xl mx-auto px-4">
          <p className="font-heading text-lg tracking-wider text-[#E3CA98]">
            Mussadiq Hussain &amp; D/o Saleem Satti
          </p>
          <p className="font-ui text-xs tracking-[0.2em] uppercase text-[#A8B5A0] mt-1.5">
            White Pearl Marquee, Islamabad • November 2026
          </p>
          <p className="font-ui text-[10px] text-[#A8B5A0]/60 mt-3">
            Hosted with love &amp; prayers by Mr. &amp; Mrs. Sadaqat Hussain
          </p>
        </div>
      </footer>

      {/* ========================================================
          STANDALONE CODE MODAL (NETLIFY EXPORT VIEWER)
          ======================================================== */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FFFCF7] border border-[#C9A66B] rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-scale-fade-in">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#164C3B] text-[#FFF9EF] flex items-center justify-between border-b border-[#C9A66B]">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-[#C9A66B]" />
                <div>
                  <h3 className="font-heading text-xl font-semibold">Standalone Netlify Package</h3>
                  <p className="font-ui text-[10px] text-[#E3CA98] uppercase tracking-wider">
                    Zero-Build · Pure HTML/CSS/JS Ready for Deployment
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="p-1 hover:bg-[#0E352A] rounded text-[#FFF9EF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Actions */}
            <div className="px-6 py-3 bg-[#FFF9EF] border-b border-[#C9A66B]/30 flex flex-wrap items-center justify-between gap-3">
              <span className="font-ui text-xs text-[#5E584F]">
                Contains embedded vector SVG artwork, 3D physics, and all wedding event details.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyStandaloneCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF9EF] border border-[#C9A66B] rounded-md font-ui text-xs font-medium text-[#164C3B] hover:bg-[#164C3B] hover:text-[#FFF9EF] transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy HTML'}</span>
                </button>
                <button
                  onClick={handleDownloadStandaloneHtml}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#164C3B] text-[#FFF9EF] border border-[#C9A66B] rounded-md font-ui text-xs font-medium hover:bg-[#0E352A] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#E3CA98]" />
                  <span>Download index.html</span>
                </button>
              </div>
            </div>

            {/* Code Preview */}
            <div className="p-4 overflow-y-auto flex-1 font-mono text-xs bg-[#1E1E1E] text-[#D4D4D4] leading-relaxed">
              <pre className="whitespace-pre-wrap">{STANDALONE_HTML}</pre>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-[#FFF9EF] border-t border-[#C9A66B]/30 flex justify-end">
              <button
                onClick={() => setShowCodeModal(false)}
                className="px-4 py-1.5 bg-[#164C3B] text-[#FFF9EF] rounded text-xs font-ui font-medium uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
