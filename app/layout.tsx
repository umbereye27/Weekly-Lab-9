import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';

export const metadata: Metadata = {
  title: 'Role-Based Auth App',
  description: 'A secure role-based authentication system with NextAuth.js and Supabase',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: 'Inter, sans-serif' }}>
        <Providers>
          <Navbar />
          <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}