import '@rainbow-me/rainbowkit/styles.css';
import RainbowkitProviders from '../RainbowkitProviders';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RainbowkitProviders>
      <nav className="flex items-center justify-between py-4 px-4 mb-4 border-b-2 border-white">
        <Link href={'/'}>Home</Link>
        <ConnectButton />
      </nav>
      <main>{children}</main>
    </RainbowkitProviders>
  );
}
