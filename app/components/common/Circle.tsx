export default function Circle({ color }: { color: string }) {
  return <div className={`rounded-full w-5 h-5 bg-${color}`}></div>;
}
