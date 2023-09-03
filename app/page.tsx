import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 flex-col w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Homepage coming soon. 🤫
        </p>
        <p className="my-4">
          In the meantime, check out our new v1{' '}
          <Link href="/collect/new" className="underline">
            Hash NFT editor.
          </Link>
          {''} 🎨🦾
        </p>
        <p className="mx-4 text-green-500 text-xs">Note: V1 is still in beta. Please use at your own risk!</p>
      </div>
    </main>
  );
}
