type Props = React.ComponentProps<'button'> & React.PropsWithChildren;

export default function CircleButton({ children, ...props }: Props) {
  return (
    <button className={`rounded-full p-5 bg-baseBlack flex justify-center items-center`} {...props}>
      {children}
    </button>
  );
}
