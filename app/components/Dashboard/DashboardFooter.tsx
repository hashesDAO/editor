import ConnectButton from '../ConnectButton';
import Mint from './buttons/Mint';

export default function DashboardFooter() {
  return (
    <footer
      className="fixed bg-black rounded-br-[50px] left-0 bottom-0 w-overflow-y-auto p-4 border-t border-[#272727] flex justify-end items-center px-8 p-8 w-1/2"
      style={{ boxShadow: '0px -46px 64px -12px #131313' }}
    >
      <ConnectButton />
      <Mint />
    </footer>
  );
}
