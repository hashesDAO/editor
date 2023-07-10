import Select from '../Select';
import Generate from './buttons/Generate';
import HashPill from './HashPill';

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
  return (
    <div className="flex mb-8">
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
    </div>
  );
}
