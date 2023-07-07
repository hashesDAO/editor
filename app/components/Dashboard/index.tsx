import { TraitType } from '@/app/util';
import { ARTISTIC, AUGMENT, GEOMETRY, PATTERNS } from '@/app/util/constants';
import ControlMenu from './ControlMenu';
import ProjectTitle from './ProjectTitle';
import TraitSet from './TraitSet';
import DashboardFooter from './DashboardFooter';
import Trait from './Trait';

const traitTypes: TraitType[] = [ARTISTIC, AUGMENT, GEOMETRY, PATTERNS];

export default function Dashboard() {
  return (
    <section className="relative h-full overflow-y-auto">
      <div className="p-4">
        <ProjectTitle />
        <p>Select element here</p>
        <ControlMenu />
        <div className="flex flex-wrap">
          {traitTypes.map((traitType) => (
            <TraitSet key={traitType} traitType={traitType}>
              <Trait name="BRUSH">
                <p>element</p>
              </Trait>
            </TraitSet>
          ))}
        </div>
      </div>
      <DashboardFooter />
    </section>
  );
}
