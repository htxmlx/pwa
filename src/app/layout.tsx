import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://ducanh-next-pwa.vercel.app"),
    alternates: {
        canonical: "./",
    },
    referrer: "no-referrer",
    title: {
        default: "next-pwa",
        template: "%s - next-pwa",
    },
    description: "Make performant web apps with Next.js & PWA.",
    applicationName: "next-pwa",
    manifest: "/manifest.webmanifest",
    authors: [{ name: "DuCanhGH", url: "https://github.com/DuCanhGH/" }],
    keywords:
        "react, pwa, service-worker, progressive-web-app, nextjs, next.js, workbox",
    openGraph: {
        type: "website",
        title: {
            default: "next-pwa",
            template: "%s - next-pwa",
        },
        description: "Make performant web apps with Next.js & PWA.",
    },
    twitter: {
        card: "summary_large_image",
        title: {
            default: "next-pwa",
            template: "%s - next-pwa",
        },
        description: "Make performant web apps with Next.js & PWA.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
