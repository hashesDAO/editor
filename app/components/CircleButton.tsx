type Props = React.ComponentProps<'button'> &
  React.PropsWithChildren & {
    padding?: number;
  };

export default function CircleButton({ padding, children, ...props }: Props) {
  return (
    <button className={`rounded-full p-5 bg-baseBlack flex justify-center items-center`} {...props}>
      {children}
    </button>
  );
}
