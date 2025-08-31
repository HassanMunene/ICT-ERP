import React from 'react';

interface MinimalLayoutProps {
  children: React.ReactNode;
}

export function MinimalLayout({ children }: MinimalLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}