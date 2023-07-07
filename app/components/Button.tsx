type Props = React.ComponentProps<'button'> & {
  text: string;
};

export default function Button({ text, ...props }: Props) {
  return (
    <button
      className={`rounded-full tracking-wide py-4 px-6 bg-primaryRed flex justify-center items-center`}
      {...props}
    >
      {text}
    </button>
  );
}
