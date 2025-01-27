import { ClerkProvider } from '@clerk/nextjs';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

import { cn } from '@/lib/utils';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body
                    className={cn(
                        'min-h-screen bg-background font-sans antialiased',
                        fontSans.variable
                    )}
                >
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
