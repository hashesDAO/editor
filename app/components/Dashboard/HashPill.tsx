import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
  value: string;
  onClick?: () => void;
};

export default function HashPill({ children, value, onClick }: Props) {
  return (
    <div
      className="py-4 px-5 flex items-center justify-between bg-traitGray rounded-full w-full cursor-pointer"
      onClick={onClick}
    >
      <p className={'w-4/6 truncate'}>{value}</p>
      {children}
    </div>
  );
}
