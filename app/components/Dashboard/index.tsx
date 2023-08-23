import { Suspense } from 'react';
import ControlMenu from './ControlMenu';
import DashboardFooter from './DashboardFooter';
import HashSelectSection from './HashSelect/HashSelectSection';
import ProjectTitle from './ProjectTitle';
import Traits from './Traits';

export default function Dashboard() {
  return (
    <div className="relative h-[90%] overflow-y-auto mt-4 p-4">
      <ProjectTitle />
      <HashSelectSection />
      <ControlMenu />
      <div className="flex flex-wrap mb-24">
        <Suspense fallback={<p>Loading Traits...</p>}>
          <Traits />
        </Suspense>
      </div>
      <DashboardFooter />
    </div>
  );
}
