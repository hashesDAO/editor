import { TraitType } from '@/app/util';
import { IoInformationCircleOutline } from 'react-icons/io5';

type Props = React.PropsWithChildren<{
  traitType: TraitType;
}>;

export default function TraitSet({ traitType, children }: Props) {
  return (
    <section className="w-1/2 mb-8">
      <p className="text-xs mb-3 opacity-40 font-medium tracking-wide">
        {traitType}
        <IoInformationCircleOutline className="text-sm inline-flex ml-2 cursor-pointer align-sub" />
      </p>
      {children}
    </section>
  );
}
