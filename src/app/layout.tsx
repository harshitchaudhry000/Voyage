import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Atlas — AI-Powered Travel Copilot for Agents",
    description:
        "Atlas is an AI-powered copilot that helps travel agents automate itinerary planning, validate bookings in real time, and scale personalized travel experiences without sacrificing quality.",
    keywords: [
        "TBO Tek",
        "B2B travel agent",
        "AI travel copilot",
        "itinerary automation",
        "travel tech hackathon",
        "Atlas AI",
    ],
    icons: {
        icon: "/logo.png",
        shortcut: "/logo.png",
        apple: "/logo.png",
    },
    openGraph: {
        images: [
            {
                url: "/logo.png",
                width: 800,
                height: 800,
                alt: "Voyage Logo",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
