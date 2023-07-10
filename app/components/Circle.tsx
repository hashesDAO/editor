export default function Circle({ color, size }: { color: string; size: number }) {
  return <div className={`rounded-full w-${size} h-${size} bg-${color}`}></div>;
}
