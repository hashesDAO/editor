import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import RainbowkitProviders from '../RainbowkitProviders';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RainbowkitProviders>
      <nav>
        <ConnectButton />
      </nav>
      <main>{children}</main>
    </RainbowkitProviders>
  );
}
