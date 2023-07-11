'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import Button from './common/Button';

export default function ConnectButton() {
  return (
    <RainbowConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => (
        <div>
          {(() => {
            if (!mounted || !account || !chain) {
              return <Button text={'CONNECT WALLET'} buttonColor={'bg-primaryRed'} onClick={openConnectModal} />;
            }

            if (chain.unsupported) {
              return <Button text={'WRONG NETWORK'} buttonColor={'bg-baseBlack'} onClick={openChainModal} />;
            }

            return (
              <Button
                text={`CONNECTED AS ${account.displayName}`}
                buttonColor={'bg-baseBlack'}
                onClick={openAccountModal}
              />
            );
          })()}
        </div>
      )}
    </RainbowConnectButton.Custom>
  );
}
