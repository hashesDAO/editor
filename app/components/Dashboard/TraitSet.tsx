import { TraitType } from '@/app/util';
import TraitInfo from './TraitInfo';

type Props = React.PropsWithChildren<{
  title: TraitType;
  info: string;
}>;

export default function TraitSet({ title, children, info }: Props) {
  return (
    <section className="w-1/2 mb-8">
      <p className="inline-block text-xs mb-3 opacity-40 font-medium tracking-wide">{title}</p>
      <TraitInfo tooltipText={info} id={title} />
      {children}
    </section>
  );
}
