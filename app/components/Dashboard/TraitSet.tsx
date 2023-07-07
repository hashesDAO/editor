import { TraitType } from '@/app/util';

type Props = React.PropsWithChildren<{
  traitType: TraitType;
}>;

export default function TraitSet({ traitType, children }: Props) {
  return (
    <section className="w-1/2 mb-8">
      <p className="text-xs opacity-40 font-bold">{traitType}</p>
      {children}
    </section>
  );
}
