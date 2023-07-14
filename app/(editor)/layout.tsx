import '@rainbow-me/rainbowkit/styles.css';
import RainbowkitProviders from '../contexts/RainbowkitContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RainbowkitProviders>
      <main className="h-screen grid grid-cols-24 grid-rows-6">{children}</main>
    </RainbowkitProviders>
  );
}
