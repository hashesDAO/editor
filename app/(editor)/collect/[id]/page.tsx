import Dashboard from '@/app/components/Dashboard';
import Editor from '@/app/components/Editor';
import { HashContextProvider } from '@/app/contexts/HashContext';
import { TraitsContextProvider } from '@/app/contexts/TraitsContext';

export default function Page() {
  return (
    <HashContextProvider>
      <TraitsContextProvider>
        <section className="col-start-1 col-span-12 bg-black h-screen rounded-tr-[60px] rounded-br-[50px] z-10">
          <Dashboard />
        </section>
        <section className="col-start-12 col-span-full row-start-1 row-end-7">
          <Editor />
        </section>
      </TraitsContextProvider>
    </HashContextProvider>
  );
}
