type Props = React.ComponentProps<'button'> & {
  text: string;
  buttonColor?: string;
};

export default function Button({ text, buttonColor, ...props }: Props) {
  return (
    <button
      className={`text-xs rounded-full tracking-wide py-4 px-6 flex justify-center items-center disabled:cursor-not-allowed ${
        buttonColor || 'baseBlack'
      }`}
      {...props}
    >
      {text}
    </button>
  );
}
