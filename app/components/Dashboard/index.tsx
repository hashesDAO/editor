import { TraitType } from '@/app/util';
import { ARTISTIC, AUGMENT, GEOMETRY, PATTERNS } from '@/app/util/constants';
import Select from '../Select';
import ControlMenu from './ControlMenu';
import DashboardFooter from './DashboardFooter';
import GenerateButton from './GenerateButton';
import ProjectTitle from './ProjectTitle';
import Trait from './Trait';
import TraitSet from './TraitSet';

const traitTypes: TraitType[] = [ARTISTIC, AUGMENT, GEOMETRY, PATTERNS];

const selectOptions = [
  {
    label: '0xhey',
    value: '0xhey',
  },
  {
    label: '0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning',
    value: '0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning0xgoodmorning',
  },
  {
    label: '0xhowdy',
    value: '0xhowdy',
  },
];

export default function Dashboard() {
  return (
    <section className="relative h-full overflow-y-auto">
      <div className="p-4">
        <ProjectTitle />
        <div className="flex flex-row items-center mb-8">
          <Select options={selectOptions} />
          <p className="px-4">OR</p>
          <GenerateButton />
        </div>
        <ControlMenu />
        <div className="flex flex-wrap mb-24">
          {traitTypes.map((traitType) => (
            <TraitSet key={traitType} traitType={traitType}>
              <Trait name="BRUSH">
                <p>element</p>
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
