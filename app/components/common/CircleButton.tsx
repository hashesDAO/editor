type Props = React.ComponentProps<'button'> &
  React.PropsWithChildren & {
    styles?: string;
  };

export default function CircleButton({ children, styles, ...props }: Props) {
  return (
    <button className={`rounded-full p-4 bg-baseBlack flex justify-center items-center ${styles}`} {...props}>
      {children}
    </button>
  );
}
