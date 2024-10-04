import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import RQProvider from "@/components/react-query-provider";
import { Toaster } from "sonner";

import "./globals.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { siteConfig } from "@/config/site";

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
    applicationName: siteConfig.name,
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    manifest: "/manifest.json",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: siteConfig.name,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: siteConfig.name,
        title: {
            default: siteConfig.name,
            template: "",
        },
        description: siteConfig.description,
    },
    twitter: {
        card: "summary",
        title: {
            default: siteConfig.name,
            template: "",
        },
        description: siteConfig.description,
    },
};

export const viewport: Viewport = {
    themeColor: "#FFFFFF",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider
            appearance={{
                variables: {
                    colorPrimary: "hsl(263.4, 70%, 50.4%)",
                },
                elements: {
                    navbarMobileMenuRow: {
                        background: "transparent",
                    },
                },
            }}
        >
            <html lang="en">
                <meta
                    name="google-site-verification"
                    content="_-DsPVM1mKXI1ed-cTqkSHsCYYUB6PbqhC140RyX1kg"
                />
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <RQProvider>
                            {children}
                            <Toaster />
                        </RQProvider>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
