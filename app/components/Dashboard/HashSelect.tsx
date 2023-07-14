'use client';

import { ChainNames } from '@/app/util/types';
import Select from '../common/Select';
import HashPill from './HashPill';
import Generate from './buttons/Generate';

const selectOptions = [
  {
    label: '0xhey',
    value: '0xhey',
  },
  {
    label: '0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning',
    value: '0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning',
  },
  {
    label: '0xhowdy',
    value: '0xhowdy',
  },
];

async function getWalletHashesData(walletAddress: `0x${string}`, chain: ChainNames) {
  const res = await fetch(`http://localhost:3000/api/wallet/${walletAddress}?chain=${chain}`);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function HashSelect() {
  const data = await getWalletHashesData('0x26FE79E42fBA7A8A28C21A77b745bD954b39164b', 'homestead');
  return (
    <section className="flex mb-8">
      <div className="w-full">
        <HashPill />
      </div>
      <div className="w-4/6">
        <Select options={selectOptions} />
      </div>
      <div className="w-2/6 flex flex-row items-center">
        <p className="px-4">OR</p>
        <Generate />
      </div>
    </section>
  );
}
