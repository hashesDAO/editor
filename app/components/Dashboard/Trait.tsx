type Props = React.PropsWithChildren<{
  name: string;
}>;
export default function Trait({ name, children }: Props) {
  return (
    <div className="flex justify-between items-center px-5 py-4 bg-traitGray mb-3 rounded-[70px]">
      <p className="text-xs font-medium tracking-wide">{name}</p>
      {children}
    </div>
  );
}
