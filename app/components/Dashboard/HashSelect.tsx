'use client';

import useHashesData from '@/app/hooks/useHashesData';
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

export default function HashSelect() {
  const data = useHashesData();
  console.log('outside zzz ', data);
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
