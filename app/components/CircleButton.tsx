type Props = React.ComponentProps<'button'> &
  React.PropsWithChildren & {
    size?: number;
  };

export default function CircleButton({ size = 10, children, ...props }: Props) {
  return (
    <button className={`rounded-full w-${size} h-${size} bg-baseBlack flex justify-center items-center`} {...props}>
      {children}
    </button>
  );
}
