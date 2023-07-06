import Dashboard from '@/app/components/Dashboard';
import Editor from '@/app/components/Editor';

export default function Page() {
  return (
    <div className="columns-2">
      <div className="w-full">
        <Dashboard />
      </div>
      <div className="w-full">
        <Editor />
      </div>
    </div>
  );
}
