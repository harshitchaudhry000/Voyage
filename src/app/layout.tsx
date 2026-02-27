import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Voyage — AI-Powered Travel Copilot for Agents",
    description:
        "Voyage is an AI-powered copilot designed to help travel agents manage complex itinerary planning, automate workflows, and deliver personalized travel experiences at scale.",
    keywords: [
        "travel agent",
        "AI copilot",
        "itinerary planning",
        "travel automation",
        "travel tech",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
