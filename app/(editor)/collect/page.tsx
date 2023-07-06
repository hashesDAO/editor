import Dashboard from '@/app/components/Dashboard';
import Editor from '@/app/components/Editor';

export default function Page() {
  return (
    <div className="h-screen grid grid-cols-24 grid-rows-6">
      <div className="z-10 col-start-1 col-span-12 bg-indigo-500 h-screen rounded-tr-[60px] rounded-br-[50px]">
        <Dashboard />
      </div>
      <div className="bg-blue-500 col-start-12 col-span-full row-start-1 row-end-7">
        <Editor />
      </div>
    </div>
  );
}
