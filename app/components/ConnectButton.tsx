'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import Button from './Button';

const CustomButton = ({
  clickHandler,
  text,
  buttonColor,
}: {
  clickHandler: () => void;
  text: string;
  buttonColor?: string;
}) => <Button text={text} buttonColor={buttonColor || 'bg-baseBlack'} onClick={clickHandler} />;

export default function ConnectButton() {
  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => (
        <div>
          {(() => {
            if (!mounted || !account || !chain) {
              return <CustomButton clickHandler={openConnectModal} text="CONNECT WALLET" buttonColor="bg-primaryRed" />;
            }

            if (chain.unsupported) {
              return <CustomButton clickHandler={openChainModal} text="Wrong network" />;
            }

            return <CustomButton clickHandler={openAccountModal} text={`connected as ${account.displayName}`} />;
          })()}
        </div>
      )}
    </RainbowConnectButton.Custom>
  );
}
