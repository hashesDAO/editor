import TraitInfo from './TraitInfo';

type Props = React.PropsWithChildren<{
  title: string;
  info: string;
}>;

export default function TraitSet({ title, children, info }: Props) {
  return (
    <section className="mb-8">
      <p className="inline-block text-xs mb-3 opacity-40 font-medium tracking-wide">{title}</p>
      <TraitInfo tooltipText={info} id={title} />
      {children}
    </section>
  );
}
