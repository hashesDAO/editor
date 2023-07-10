import { TraitType } from '@/app/util';
import { ARTISTIC, AUGMENT, GEOMETRY, PATTERNS } from '@/app/util/constants';
import Image from 'next/image';
import Circle from '../Circle';
import ControlMenu from './ControlMenu';
import DashboardFooter from './DashboardFooter';
import HashSelect from './HashSelect';
import ProjectTitle from './ProjectTitle';
import Toggle from './Toggle';
import Trait from './Trait';
import TraitOptions from './TraitOptions';
import TraitSet from './TraitSet';
import Share from './buttons/Share';

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
                <TraitOptions />
              </Trait>
              <Trait name="STROKE COLOR">
                <TraitOptions
                  options={[
                    {
                      label: <Image src="/brushes/one.svg" alt="brush one" width={20} height={20} />,
                      value: 1,
                    },
                    {
                      label: <Image src="/brushes/two.svg" alt="brush two" width={20} height={20} />,
                      value: 2,
                    },
                    {
                      label: <Image src="/brushes/three.svg" alt="brush three" width={20} height={20} />,
                      value: 3,
                    },
                    {
                      label: <Image src="/brushes/four.svg" alt="brush four" width={20} height={20} />,
                      value: 4,
                    },
                  ]}
                />
              </Trait>
              <Trait name="STROKE SIZE">
                <TraitOptions
                  options={[
                    {
                      label: <Circle color={'primaryRed'} size={5} />,
                      value: 1,
                    },
                    {
                      label: <Circle color={'primaryRed'} size={5} />,
                      value: 2,
                    },
                    {
                      label: <Circle color={'primaryRed'} size={5} />,
                      value: 3,
                    },
                    {
                      label: <Circle color={'primaryRed'} size={5} />,
                      value: 4,
                    },
                  ]}
                />
              </Trait>
            </TraitSet>
          ))}
        </div>
      </div>
      <DashboardFooter />
    </section>
  );
}
