"use client";

import { useState, useEffect, useRef } from "react";
import JourneyBackground from "@/components/JourneyBackground";

/* ────────── stat counter hook ────────── */
function useCountUp(end: number, duration: number = 2000): {
    count: number;
    ref: React.RefObject<HTMLDivElement | null>;
} {
    const [count, setCount] = useState<number>(0);
    const ref = useRef<HTMLDivElement>(null);
    const started = useRef<boolean>(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const startTime = performance.now();
                    const animate = (now: number): void => {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.floor(eased * end));
                        if (progress < 1) requestAnimationFrame(animate);
                    };
                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [end, duration]);

    return { count, ref };
}

/* ────────── scroll reveal hook ────────── */
function useScrollReveal(): void {
    useEffect(() => {
        const els = document.querySelectorAll(".animate-in");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        (e.target as HTMLElement).classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
}

/* ═══════════════════════════════════════════
   Types
   ═══════════════════════════════════════════ */
interface Feature {
    icon: string;
    title: string;
    desc: string;
}

interface Step {
    num: string;
    title: string;
    desc: string;
}

interface Testimonial {
    stars: number;
    text: string;
    name: string;
    role: string;
    initials: string;
}

type AuthTab = "signin" | "signup";

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */
const FEATURES: Feature[] = [
    {
        icon: "📤",
        title: "Multi-Modal Data Intake",
        desc: "Upload customer info in any format — images, videos, call recordings, emails, chat logs, and documents. AI extracts and structures everything automatically.",
    },
    {
        icon: "🔍",
        title: "Smart Template Matching",
        desc: "Voyage checks pre-built itineraries, historical templates, partner packages, and destination rules to find the perfect starting point for every trip.",
    },
    {
        icon: "✨",
        title: "Triple Itinerary Generation",
        desc: "Get three options per request: original, premium (+20% budget), and a personalized itinerary based on returning customer behavior and past trips.",
    },
    {
        icon: "🔄",
        title: "Collaboration Loop",
        desc: "Continuous feedback cycle between agent, customer, and AI. Review, share, iterate, and approve until the plan is perfect — all in one seamless flow.",
    },
    {
        icon: "📡",
        title: "Booking & Real-Time Monitoring",
        desc: "Manage bookings through TBO APIs, track payments, and receive live alerts for schedule changes, cancellations, or disruptions with instant alternatives.",
    },
    {
        icon: "👤",
        title: "Persistent Customer Profiles",
        desc: "Every interaction builds a smarter profile — travel history, preferences, budget patterns, and behavioral insights power increasingly personalized recommendations.",
    },
];

const STEPS: Step[] = [
    {
        num: "1",
        title: "Upload & Extract",
        desc: "Upload customer data in any format. AI extracts requirements, summarizes needs, and highlights missing info.",
    },
    {
        num: "2",
        title: "Match & Validate",
        desc: "Voyage searches templates and partner packages. A validation agent checks feasibility and compliance before proceeding.",
    },
    {
        num: "3",
        title: "Generate & Iterate",
        desc: "Receive up to three itinerary options. Share with the customer, collect feedback, and refine until approved.",
    },
    {
        num: "4",
        title: "Book & Monitor",
        desc: "Finalize bookings through API integrations. Voyage monitors trips in real-time and alerts you to any changes.",
    },
];

const TESTIMONIALS: Testimonial[] = [
    {
        stars: 5,
        text: "Voyage cut our itinerary planning time by 70%. We now handle triple the clients with the same team. The AI suggestions are incredibly accurate.",
        name: "Priya Sharma",
        role: "Operations Lead, TravelMax India",
        initials: "PS",
    },
    {
        stars: 5,
        text: "The multi-modal intake is a game-changer. Our customers send voice notes, screenshots, PDFs — Voyage handles everything and we never miss a detail.",
        name: "David Chen",
        role: "Senior Agent, Pacific Travels",
        initials: "DC",
    },
    {
        stars: 5,
        text: "The premium itinerary upsell option alone increased our revenue by 35%. Customers love the upgrade suggestions and it's completely effortless for us.",
        name: "Sarah Al-Rashid",
        role: "Founder, Luxe Journeys",
        initials: "SA",
    },
];

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function Home(): JSX.Element {
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const [authOpen, setAuthOpen] = useState<boolean>(false);
    const [authTab, setAuthTab] = useState<AuthTab>("signin");

    useScrollReveal();

    useEffect(() => {
        const onScroll = (): void => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* stat counters */
    const stat1 = useCountUp(10000);
    const stat2 = useCountUp(500);
    const stat3 = useCountUp(50);
    const stat4 = useCountUp(99);

    const openAuth = (tab: AuthTab): void => {
        setAuthTab(tab);
        setAuthOpen(true);
        setMobileMenuOpen(false);
    };

    return (
        <>
            {/* ─── SVG JOURNEY BACKGROUND ─── */}
            <JourneyBackground />

            {/* ─── NAVBAR ─── */}
            <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
                <div className="container">
                    <a href="#" className="nav-logo">
                        <span className="nav-logo-icon">✈</span>
                        Voyage
                    </a>

                    <div className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#stats">Stats</a>
                        <a href="#testimonials">Testimonials</a>
                    </div>

                    <div className="nav-auth">
                        <button className="btn btn-ghost" onClick={() => openAuth("signin")}>
                            Sign In
                        </button>
                        <button className="btn btn-primary" onClick={() => openAuth("signup")}>
                            Get Started
                        </button>
                    </div>

                    <button
                        className="nav-mobile-toggle"
                        onClick={() => setMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
                <button
                    className="mobile-menu-close"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                >
                    ✕
                </button>
                <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
                <a href="#stats" onClick={() => setMobileMenuOpen(false)}>Stats</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
                <button className="btn btn-ghost" onClick={() => openAuth("signin")}>Sign In</button>
                <button className="btn btn-primary" onClick={() => openAuth("signup")}>Get Started</button>
            </div>

            {/* ─── HERO ─── */}
            <section className="hero">
                <div className="container">
                    <div className="hero-badge">
                        <span className="hero-badge-dot" />
                        AI-Powered Travel Planning
                    </div>

                    <h1 className="hero-title">
                        Scale Your Agency With{" "}
                        <span className="gradient-text">Intelligent Automation</span>
                    </h1>

                    <p className="hero-description">
                        Voyage transforms travel agents into AI-augmented advisors. Automate
                        itinerary generation, streamline bookings, and deliver hyper-personalized
                        travel experiences — all while keeping you in full control.
                    </p>

                    <div className="hero-cta">
                        <button className="btn btn-primary" onClick={() => openAuth("signup")}>
                            Start Free Trial
                            <span>→</span>
                        </button>
                        <button className="btn btn-secondary">
                            <span>▶</span>
                            Watch Demo
                        </button>
                    </div>

                    <div className="hero-visual">
                        <div className="hero-visual-window">
                            <div className="hero-visual-topbar">
                                <span className="hero-visual-dot" />
                                <span className="hero-visual-dot" />
                                <span className="hero-visual-dot" />
                            </div>
                            <div className="hero-visual-content">
                                <div className="hero-preview-card">
                                    <h4>📋 Customer Requirements</h4>
                                    <div className="hero-preview-line accent" />
                                    <div className="hero-preview-line medium" />
                                    <div className="hero-preview-line short" />
                                    <div className="hero-preview-line" />
                                    <div className="hero-preview-line medium" />
                                </div>
                                <div className="hero-preview-card">
                                    <h4>📊 Itinerary Analytics</h4>
                                    <div className="hero-preview-bar">
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                    <div style={{ marginTop: 16 }}>
                                        <div className="hero-preview-line short accent" />
                                        <div className="hero-preview-line medium" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATS ─── */}
            <section className="stats" id="stats">
                <div className="container">
                    <div className="stat-item" ref={stat1.ref}>
                        <div className="stat-value">{stat1.count.toLocaleString()}+</div>
                        <div className="stat-label">Itineraries Generated</div>
                    </div>
                    <div className="stat-item" ref={stat2.ref}>
                        <div className="stat-value">{stat2.count}+</div>
                        <div className="stat-label">Travel Agents</div>
                    </div>
                    <div className="stat-item" ref={stat3.ref}>
                        <div className="stat-value">{stat3.count}+</div>
                        <div className="stat-label">Countries Covered</div>
                    </div>
                    <div className="stat-item" ref={stat4.ref}>
                        <div className="stat-value">{stat4.count}%</div>
                        <div className="stat-label">Uptime Reliability</div>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section className="features" id="features">
                <div className="container">
                    <div className="features-header">
                        <span className="section-label">Features</span>
                        <h2 className="section-title">
                            Everything You Need to{" "}
                            <span className="gradient-text">Plan Smarter</span>
                        </h2>
                        <p className="section-subtitle">
                            Voyage handles the heavy lifting so you can focus on what matters
                            — delivering unforgettable travel experiences.
                        </p>
                    </div>

                    <div className="features-grid">
                        {FEATURES.map((feature: Feature, i: number) => (
                            <div key={i} className="feature-card animate-in">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section className="how-it-works" id="how-it-works">
                <div className="container">
                    <div className="how-it-works-header">
                        <span className="section-label">How It Works</span>
                        <h2 className="section-title">
                            From <span className="gradient-text">Upload to Booking</span> in
                            Minutes
                        </h2>
                        <p className="section-subtitle">
                            A streamlined four-step workflow that turns raw customer data into
                            confirmed bookings.
                        </p>
                    </div>

                    <div className="steps-grid">
                        {STEPS.map((step: Step, i: number) => (
                            <div key={i} className="step-card animate-in">
                                <div className="step-number">{step.num}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                                {i < 3 && <div className="step-connector" />}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── TESTIMONIALS ─── */}
            <section className="testimonials" id="testimonials">
                <div className="container">
                    <div className="testimonials-header">
                        <span className="section-label">Testimonials</span>
                        <h2 className="section-title">
                            Trusted by <span className="gradient-text">Leading Agents</span>
                        </h2>
                        <p className="section-subtitle">
                            Hear from travel professionals who are already scaling their
                            operations with Voyage.
                        </p>
                    </div>

                    <div className="testimonials-grid">
                        {TESTIMONIALS.map((t: Testimonial, i: number) => (
                            <div key={i} className="testimonial-card animate-in">
                                <div className="testimonial-stars">
                                    {Array.from({ length: t.stars }, (_, j: number) => (
                                        <span key={j}>★</span>
                                    ))}
                                </div>
                                <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
                                <div className="testimonial-author">
                                    <div className="testimonial-avatar">{t.initials}</div>
                                    <div className="testimonial-author-info">
                                        <h4>{t.name}</h4>
                                        <span>{t.role}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="cta">
                <div className="container">
                    <div className="cta-card animate-in">
                        <span className="section-label">Get Started</span>
                        <h2 className="section-title">
                            Ready to <span className="gradient-text">Transform</span> Your
                            Agency?
                        </h2>
                        <p className="section-subtitle">
                            Join hundreds of travel agents already using Voyage to deliver
                            exceptional experiences at scale. Start your free 14-day trial today.
                        </p>
                        <div className="cta-buttons">
                            <button className="btn btn-primary" onClick={() => openAuth("signup")}>
                                Start Free Trial
                                <span>→</span>
                            </button>
                            <button className="btn btn-secondary">Contact Sales</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FOOTER ─── */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-brand">
                            <a href="#" className="nav-logo">
                                <span className="nav-logo-icon">✈</span>
                                Voyage
                            </a>
                            <p>
                                AI-powered travel copilot helping agents scale operations,
                                automate planning, and deliver personalized experiences.
                            </p>
                        </div>

                        <div className="footer-column">
                            <h4>Product</h4>
                            <ul>
                                <li><a href="#features">Features</a></li>
                                <li><a href="#how-it-works">How It Works</a></li>
                                <li><a href="#">Pricing</a></li>
                                <li><a href="#">API Docs</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Careers</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms of Service</a></li>
                                <li><a href="#">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <p>© 2026 Voyage. All rights reserved.</p>
                        <div className="footer-socials">
                            <a href="#" className="footer-social-link" aria-label="Twitter">𝕏</a>
                            <a href="#" className="footer-social-link" aria-label="LinkedIn">in</a>
                            <a href="#" className="footer-social-link" aria-label="GitHub">⌥</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ─── AUTH MODAL ─── */}
            <div
                className={`modal-overlay ${authOpen ? "active" : ""}`}
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    if (e.target === e.currentTarget) setAuthOpen(false);
                }}
            >
                <div className="auth-modal">
                    <button
                        className="auth-modal-close"
                        onClick={() => setAuthOpen(false)}
                        aria-label="Close"
                    >
                        ✕
                    </button>

                    <div className="auth-tabs">
                        <button
                            className={`auth-tab ${authTab === "signin" ? "active" : ""}`}
                            onClick={() => setAuthTab("signin")}
                        >
                            Sign In
                        </button>
                        <button
                            className={`auth-tab ${authTab === "signup" ? "active" : ""}`}
                            onClick={() => setAuthTab("signup")}
                        >
                            Sign Up
                        </button>
                    </div>

                    {authTab === "signin" ? (
                        <>
                            <h2>Welcome Back</h2>
                            <p className="auth-subtitle">
                                Sign in to access your Voyage dashboard.
                            </p>
                            <form className="auth-form" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="signin-email">Email</label>
                                    <input
                                        id="signin-email"
                                        type="email"
                                        placeholder="agent@agency.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signin-password">Password</label>
                                    <input
                                        id="signin-password"
                                        type="password"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Sign In
                                </button>
                            </form>
                            <div className="auth-divider">
                                <span>or continue with</span>
                            </div>
                            <div className="auth-social-buttons">
                                <button className="auth-social-btn">G&ensp;Google</button>
                                <button className="auth-social-btn">🔗&ensp;Microsoft</button>
                            </div>
                            <p className="auth-footer">
                                Don&apos;t have an account?{" "}
                                <a
                                    href="#"
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        setAuthTab("signup");
                                    }}
                                >
                                    Sign Up
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h2>Create Your Account</h2>
                            <p className="auth-subtitle">
                                Start your free 14-day trial. No credit card required.
                            </p>
                            <form className="auth-form" onSubmit={(e: React.FormEvent) => e.preventDefault()}>
                                <div className="form-group">
                                    <label htmlFor="signup-name">Full Name</label>
                                    <input
                                        id="signup-name"
                                        type="text"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-email">Work Email</label>
                                    <input
                                        id="signup-email"
                                        type="email"
                                        placeholder="agent@agency.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="signup-password">Password</label>
                                    <input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Min 8 characters"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Create Account
                                </button>
                            </form>
                            <div className="auth-divider">
                                <span>or sign up with</span>
                            </div>
                            <div className="auth-social-buttons">
                                <button className="auth-social-btn">G&ensp;Google</button>
                                <button className="auth-social-btn">🔗&ensp;Microsoft</button>
                            </div>
                            <p className="auth-footer">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    onClick={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        setAuthTab("signin");
                                    }}
                                >
                                    Sign In
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
