"use client";

import { useEffect, useRef, useState, type JSX } from "react";

/* ═══════════════════════════════════════════════════
   Journey Background — 4 Sequential Scroll Scenes

   Scene 1 (0–25%):   Man silhouette at pyramids, drifting clouds
   Scene 2 (25–50%):  Plane RIGHT→LEFT along runway + buildings
   Scene 3 (50–75%):  Ship docks at harbour (dock SVG)
   Scene 4 (75–100%): Family enters hotel
   ═══════════════════════════════════════════════════ */

const C = {
    sky1: "#f5efe6", sky2: "#ece4d8", ground: "#dbbea5", sand: "#c49a7a",
    dark: "#3d2317", mid: "#5c3a26", brown: "#7a5035", light: "#9e7256",
    pale: "#c49a7a", cream: "#ecdbc9", water: "#87a5b4", waterDark: "#6b8a9a",
};

/* ── SCENE 1: Pyramids + Traveller Silhouette ── */
function Scene1({ progress, cloudTime }: { progress: number; cloudTime: number }): JSX.Element {
    const opacity = progress < 0 ? 0 : progress > 1 ? Math.max(0, 1 - (progress - 1) * 4) : 1;
    // cloudTime provides perpetual drift independent of scroll
    const cloudBase = cloudTime * 30;

    return (
        <g opacity={opacity}>
            <defs>
                <linearGradient id="sky1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.sky1} /><stop offset="100%" stopColor={C.sky2} />
                </linearGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#sky1)" />
            {/* Sun */}
            <circle cx={960} cy={380} r={100} fill={C.sand} opacity={0.3} />
            <circle cx={960} cy={380} r={70} fill={C.pale} opacity={0.25} />
            {/* Desert floor */}
            <rect x={0} y={780} width={1920} height={300} fill={C.ground} />
            <ellipse cx={960} cy={780} rx={1100} ry={40} fill={C.sand} opacity={0.3} />
            {/* Pyramids — lowered so clouds are clearly visible above */}
            <polygon points="800,780 1000,520 1200,780" fill={C.brown} opacity={0.5} />
            <polygon points="1050,780 1200,580 1350,780" fill={C.light} opacity={0.4} />
            <polygon points="550,780 650,620 750,780" fill={C.brown} opacity={0.35} />
            <line x1={1000} y1={520} x2={1100} y2={780} stroke={C.mid} strokeWidth={1} opacity={0.15} />
            {/* Clouds drifting */}
            {[0, 1, 2, 3, 4].map((i) => {
                const bx = [-100, 300, 700, 1100, 1500][i];
                const y = [120, 180, 90, 200, 140][i];
                const s = [1.2, 0.9, 1.4, 0.8, 1.1][i];
                const x = ((bx + cloudBase + i * 80) % 2200) - 200;
                return (
                    <g key={i} transform={`translate(${x},${y}) scale(${s})`} opacity={0.2}>
                        <ellipse cx={0} cy={0} rx={60} ry={18} fill={C.pale} />
                        <ellipse cx={-25} cy={-6} rx={35} ry={16} fill={C.pale} />
                        <ellipse cx={22} cy={-8} rx={40} ry={17} fill={C.pale} />
                    </g>
                );
            })}
            {/* Dunes */}
            <ellipse cx={200} cy={820} rx={180} ry={15} fill={C.sand} opacity={0.25} />
            <ellipse cx={1400} cy={830} rx={200} ry={12} fill={C.sand} opacity={0.22} />
            {/* Man silhouette */}
            <g transform="translate(300, 680)">
                <ellipse cx={10} cy={100} rx={25} ry={5} fill={C.dark} opacity={0.15} />
                <circle cx={0} cy={0} r={12} fill={C.dark} />
                <path d="M0,12 L0,55" stroke={C.dark} strokeWidth={10} strokeLinecap="round" />
                <path d="M0,55 L-12,98" stroke={C.dark} strokeWidth={8} strokeLinecap="round" />
                <path d="M0,55 L12,98" stroke={C.dark} strokeWidth={8} strokeLinecap="round" />
                <path d="M0,22 L-22,40" stroke={C.dark} strokeWidth={6} strokeLinecap="round" />
                <path d="M0,22 L20,15" stroke={C.dark} strokeWidth={6} strokeLinecap="round" />
                <path d="M20,15 L22,5" stroke={C.dark} strokeWidth={5} strokeLinecap="round" />
                <ellipse cx={-6} cy={30} rx={8} ry={14} fill={C.mid} opacity={0.6} />
            </g>
            {/* Cactus */}
            <g transform="translate(200, 780)" opacity={0.3}>
                <line x1={0} y1={0} x2={0} y2={-30} stroke={C.brown} strokeWidth={3} />
                <line x1={0} y1={-15} x2={-10} y2={-22} stroke={C.brown} strokeWidth={3} strokeLinecap="round" />
                <line x1={0} y1={-10} x2={8} y2={-18} stroke={C.brown} strokeWidth={3} strokeLinecap="round" />
            </g>
        </g>
    );
}

/* ── SCENE 2: Plane RIGHT→LEFT on runway + buildings ── */
function Scene2({ progress }: { progress: number }): JSX.Element {
    const opacity = progress < 0 ? 0 : progress > 1 ? Math.max(0, 1 - (progress - 1) * 4) : Math.min(1, progress * 4);
    // Plane moves from right (2200) to left (-640), SVG naturally faces left
    const planeX = 2200 - progress * 2840;
    const planeY = 260 - Math.sin(progress * Math.PI) * 100;
    // 1/3 of viewport = 640 at 1920
    const planeW = 640;
    const planeH = 640;
    // Building size
    const bldgW = 120;
    const bldgH = 120;

    return (
        <g opacity={opacity}>
            <defs>
                <linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.sky1} /><stop offset="100%" stopColor={C.sky2} />
                </linearGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#sky2)" />
            {/* Ground */}
            <rect x={0} y={700} width={1920} height={380} fill={C.ground} />
            {/* Runway */}
            <rect x={0} y={720} width={1920} height={40} fill={C.light} opacity={0.4} />
            {/* Runway center dashes */}
            {Array.from({ length: 20 }, (_, i) => (
                <rect key={i} x={50 + i * 96} y={737} width={50} height={6} rx={3} fill={C.cream} opacity={0.5} />
            ))}
            {/* Clouds */}
            {[0, 1, 2].map(i => (
                <g key={i} transform={`translate(${[400, 900, 1400][i]},${[150, 200, 120][i]})`} opacity={0.18}>
                    <ellipse cx={0} cy={0} rx={55} ry={16} fill={C.pale} />
                    <ellipse cx={-20} cy={-5} rx={30} ry={14} fill={C.pale} />
                    <ellipse cx={20} cy={-7} rx={35} ry={15} fill={C.pale} />
                </g>
            ))}
            {/* Buildings (user SVG) — placed behind runway */}
            {[80, 250, 460, 700, 950, 1150, 1350, 1550, 1720].map((bx, i) => {
                const scale = [1.0, 1.3, 0.9, 1.5, 1.1, 1.4, 0.8, 1.2, 1.0][i];
                const h = bldgH * scale;
                const w = bldgW * scale;
                return (
                    <image
                        key={i}
                        href="/building.svg"
                        x={bx}
                        y={700 - h}
                        width={w}
                        height={h}
                        opacity={0.3}
                    />
                );
            })}
            {/* Control tower */}
            <g transform="translate(1800, 580)" opacity={0.3}>
                <rect x={-8} y={0} width={16} height={120} fill={C.dark} />
                <rect x={-25} y={-10} width={50} height={15} rx={3} fill={C.dark} />
                <line x1={0} y1={-10} x2={0} y2={-30} stroke={C.dark} strokeWidth={2} />
            </g>
            {/* THE PLANE (user SVG) — R→L, natural orientation (nose faces left) */}
            <image
                href="/plane.svg"
                x={planeX}
                y={planeY}
                width={planeW}
                height={planeH}
            />
            {/* Birds */}
            {[0, 1, 2].map(i => (
                <g key={i} transform={`translate(${[600, 1100, 1500][i]},${[500, 450, 550][i]})`} opacity={0.15}>
                    <path d="M-6,0 Q-3,-4 0,0 Q3,-4 6,0" stroke={C.dark} strokeWidth={1.5} fill="none" />
                </g>
            ))}
        </g>
    );
}

/* ── SCENE 3: Ship sailing LEFT→RIGHT ── */
function Scene3({ progress }: { progress: number }): JSX.Element {
    const opacity = progress < 0 ? 0 : progress > 1 ? Math.max(0, 1 - (progress - 1) * 4) : Math.min(1, progress * 4);
    // Ship moves from left (-640) to right (1920)
    const shipX = -640 + progress * 2560;
    const bobY = Math.sin(progress * Math.PI * 4) * 4;
    const shipW = 640; // 1/3 viewport
    const shipH = 640;

    return (
        <g opacity={opacity}>
            <defs>
                <linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.sky1} /><stop offset="100%" stopColor={C.sky2} />
                </linearGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#sky3)" />
            {/* Water */}
            <rect x={0} y={560} width={1920} height={520} fill={C.water} opacity={0.25} />
            {/* Water waves */}
            {[0, 1, 2, 3, 4, 5].map(i => (
                <path key={i}
                    d={`M${i * 320 - 50},${600 + i * 18} Q${i * 320 + 80},${590 + i * 18} ${i * 320 + 160},${600 + i * 18} T${i * 320 + 320},${600 + i * 18}`}
                    stroke={C.waterDark} strokeWidth={1.5} fill="none" opacity={0.15}
                />
            ))}
            {/* Clouds */}
            {[0, 1, 2].map(i => (
                <g key={i} transform={`translate(${[300, 800, 1300][i]},${[100, 160, 80][i]})`} opacity={0.18}>
                    <ellipse cx={0} cy={0} rx={50} ry={15} fill={C.pale} />
                    <ellipse cx={-20} cy={-5} rx={28} ry={13} fill={C.pale} />
                    <ellipse cx={18} cy={-6} rx={32} ry={14} fill={C.pale} />
                </g>
            ))}
            {/* THE SHIP (user SVG) — L→R */}
            <image
                href="/ship.svg"
                x={shipX}
                y={420 + bobY}
                width={shipW}
                height={shipH}
                opacity={0.7}
            />
            {/* Seagulls */}
            {[0, 1, 2, 3].map(i => (
                <g key={i} transform={`translate(${[400, 700, 1000, 1300][i]},${[350, 300, 380, 320][i]})`} opacity={0.15}>
                    <path d="M-8,0 Q-4,-5 0,0 Q4,-5 8,0" stroke={C.dark} strokeWidth={1.5} fill="none" />
                </g>
            ))}
        </g>
    );
}

/* ── SCENE 4: Family Entering Hotel ── */
function Scene4({ progress }: { progress: number }): JSX.Element {
    const opacity = progress < 0 ? 0 : Math.min(1, progress * 4);
    const familyX = 1200 - progress * 400;

    return (
        <g opacity={opacity}>
            <defs>
                <linearGradient id="sky4" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.sky1} /><stop offset="100%" stopColor={C.sky2} />
                </linearGradient>
            </defs>
            <rect width="1920" height="1080" fill="url(#sky4)" />
            <rect x={0} y={680} width={1920} height={400} fill={C.ground} />
            <rect x={0} y={680} width={1920} height={10} fill={C.sand} opacity={0.3} />
            {/* Clouds */}
            {[0, 1].map(i => (
                <g key={i} transform={`translate(${[500, 1200][i]},${[100, 140][i]})`} opacity={0.16}>
                    <ellipse cx={0} cy={0} rx={50} ry={14} fill={C.pale} />
                    <ellipse cx={-20} cy={-5} rx={28} ry={12} fill={C.pale} />
                    <ellipse cx={20} cy={-6} rx={32} ry={13} fill={C.pale} />
                </g>
            ))}
            {/* Hotel */}
            <g transform="translate(300, 230)" opacity={0.55}>
                <rect x={0} y={0} width={300} height={450} rx={4} fill={C.dark} />
                <rect x={-10} y={-8} width={320} height={12} rx={3} fill={C.mid} />
                {[0, 1, 2, 3, 4].map(col => [0, 1, 2, 3, 4, 5].map(row => (
                    <rect key={`${col}-${row}`} x={25 + col * 55} y={25 + row * 65} width={30} height={40} rx={2} fill={C.cream} opacity={0.35} />
                )))}
                <rect x={100} y={370} width={100} height={80} rx={3} fill={C.mid} />
                <rect x={115} y={380} width={70} height={70} rx={2} fill={C.cream} opacity={0.35} />
                <path d="M100,370 Q150,340 200,370" stroke={C.cream} strokeWidth={4} fill="none" opacity={0.3} />
                <rect x={70} y={355} width={160} height={8} rx={2} fill={C.brown} />
                <rect x={90} y={360} width={8} height={90} fill={C.mid} opacity={0.7} />
                <rect x={202} y={360} width={8} height={90} fill={C.mid} opacity={0.7} />
                <rect x={-80} y={100} width={80} height={350} rx={3} fill={C.mid} opacity={0.7} />
                <rect x={300} y={150} width={80} height={300} rx={3} fill={C.mid} opacity={0.6} />
            </g>
            {/* Trees */}
            {[150, 680, 720].map((tx, ti) => (
                <g key={ti} transform={`translate(${tx},680)`} opacity={0.35}>
                    <circle cx={0} cy={-40} r={25} fill="#6b8f5e" />
                    <circle cx={-12} cy={-30} r={18} fill="#7a9b66" />
                    <circle cx={12} cy={-30} r={18} fill="#7a9b66" />
                    <rect x={-4} y={-18} width={8} height={22} fill={C.brown} rx={2} />
                </g>
            ))}
            {/* Family silhouettes */}
            <g transform={`translate(${familyX}, 540)`}>
                <ellipse cx={0} cy={140} rx={15} ry={4} fill={C.dark} opacity={0.1} />
                <ellipse cx={50} cy={140} rx={15} ry={4} fill={C.dark} opacity={0.1} />
                {/* Father */}
                <g>
                    <circle cx={0} cy={0} r={10} fill={C.dark} />
                    <path d="M0,10 L0,65" stroke={C.dark} strokeWidth={9} strokeLinecap="round" />
                    <path d="M0,65 L-10,135" stroke={C.dark} strokeWidth={7} strokeLinecap="round" />
                    <path d="M0,65 L10,135" stroke={C.dark} strokeWidth={7} strokeLinecap="round" />
                    <path d="M0,20 L-18,48" stroke={C.dark} strokeWidth={5} strokeLinecap="round" />
                    <path d="M0,20 L20,50" stroke={C.dark} strokeWidth={5} strokeLinecap="round" />
                </g>
                {/* Suitcase */}
                <g transform="translate(28, 95)">
                    <rect x={0} y={0} width={18} height={30} rx={3} fill={C.mid} />
                    <rect x={4} y={-5} width={10} height={6} rx={2} fill={C.dark} />
                    <circle cx={4} cy={32} r={3} fill={C.dark} />
                    <circle cx={14} cy={32} r={3} fill={C.dark} />
                </g>
                {/* Mother */}
                <g transform="translate(50, 8)">
                    <circle cx={0} cy={0} r={9} fill={C.dark} />
                    <path d="M0,9 L0,55" stroke={C.dark} strokeWidth={8} strokeLinecap="round" />
                    <path d="M-5,45 L-14,125 L14,125 L5,45 Z" fill={C.dark} />
                    <path d="M0,18 L-16,42" stroke={C.dark} strokeWidth={5} strokeLinecap="round" />
                    <path d="M0,18 L16,40" stroke={C.dark} strokeWidth={5} strokeLinecap="round" />
                </g>
                {/* Child 1 */}
                <g transform="translate(90, 45)">
                    <circle cx={0} cy={0} r={7} fill={C.dark} />
                    <path d="M0,7 L0,42" stroke={C.dark} strokeWidth={6} strokeLinecap="round" />
                    <path d="M0,42 L-7,88" stroke={C.dark} strokeWidth={5} strokeLinecap="round" />
                    <path d="M0,42 L7,88" stroke={C.dark} strokeWidth={5} strokeLinecap="round" />
                    <path d="M0,14 L-12,30" stroke={C.dark} strokeWidth={4} strokeLinecap="round" />
                    <path d="M0,14 L12,30" stroke={C.dark} strokeWidth={4} strokeLinecap="round" />
                </g>
                {/* Child 2 */}
                <g transform="translate(-40, 55)">
                    <circle cx={0} cy={0} r={6} fill={C.dark} />
                    <path d="M0,6 L0,35" stroke={C.dark} strokeWidth={5} strokeLinecap="round" />
                    <path d="M0,35 L-6,78" stroke={C.dark} strokeWidth={4} strokeLinecap="round" />
                    <path d="M0,35 L6,78" stroke={C.dark} strokeWidth={4} strokeLinecap="round" />
                    <path d="M0,12 L-10,26" stroke={C.dark} strokeWidth={3.5} strokeLinecap="round" />
                    <path d="M0,12 L10,26" stroke={C.dark} strokeWidth={3.5} strokeLinecap="round" />
                </g>
            </g>
        </g>
    );
}

/* ═══════════════════════════════
   MAIN — maps scroll to 4 scenes
   ═══════════════════════════════ */
export default function JourneyBackground(): JSX.Element {
    const [scrollPct, setScrollPct] = useState(0);
    const [cloudTime, setCloudTime] = useState(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPct(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Perpetual cloud animation — runs continuously
    useEffect(() => {
        let start: number | null = null;
        const tick = (ts: number) => {
            if (start === null) start = ts;
            setCloudTime((ts - start) / 1000); // seconds elapsed
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    return (
        <div className="svg-journey-bg" aria-hidden="true">
            <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice"
                width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                <Scene1 progress={scrollPct * 4} cloudTime={cloudTime} />
                <Scene2 progress={(scrollPct - 0.25) * 4} />
                <Scene3 progress={(scrollPct - 0.5) * 4} />
                <Scene4 progress={(scrollPct - 0.75) * 4} />
            </svg>
        </div>
    );
}
