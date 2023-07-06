export default function CircleButton({
  content,
  size = 10,
  ...props
}: {
  content: JSX.Element | number;
  size?: number;
  props?: any;
}) {
  return (
    <button className={`rounded-full w-${size} h-${size} bg-baseBlack flex justify-center items-center`} {...props}>
      {content}
    </button>
  );
}
