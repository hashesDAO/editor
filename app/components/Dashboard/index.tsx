import { TraitType } from '@/app/util';
import { ARTISTIC, AUGMENT, GEOMETRY, PATTERNS } from '@/app/util/constants';
import ControlMenu from './ControlMenu';
import DashboardFooter from './DashboardFooter';
import HashSelect from './HashSelect';
import ProjectTitle from './ProjectTitle';
import Share from './buttons/Share';
import Trait from './Trait';
import TraitSet from './TraitSet';
import Toggle from './Toggle';
import TraitOptions from './TraitOptions';

const traitTypes: TraitType[] = [ARTISTIC, AUGMENT, GEOMETRY, PATTERNS];

export default function Dashboard() {
  return (
    <section className="relative h-full overflow-y-auto">
      <div className="p-4">
        <ProjectTitle>
          <Share />
        </ProjectTitle>
        <HashSelect />
        <Toggle />
        <ControlMenu />
        <div className="flex flex-wrap mb-24">
          {traitTypes.map((traitType) => (
            <TraitSet key={traitType} traitType={traitType}>
              <Trait name="BRUSH">
                <TraitOptions
                  options={[
                    {
                      label: 1,
                      value: 1,
                    },
                    {
                      label: 2,
                      value: 2,
                    },
                    {
                      label: 3,
                      value: 3,
                    },
                    {
                      label: 4,
                      value: 4,
                    },
                  ]}
                />
              </Trait>
              <Trait name="COLOR FILL">
                <p>element</p>
              </Trait>
              <Trait name="STROKE COLOR">
                <p>element</p>
              </Trait>
              <Trait name="STROKE SIZE">
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
