import { TraitType } from '@/app/util';
import { ARTISTIC, AUGMENT, GEOMETRY, PATTERNS } from '@/app/util/constants';
import Image from 'next/image';
import Circle from '../common/Circle';
import ControlMenu from './ControlMenu';
import DashboardFooter from './DashboardFooter';
import DragTrait from './DragTrait';
import HashSelect from './HashSelect';
import ProjectTitle from './ProjectTitle';
import Trait from './Trait';
import TraitOptions from './TraitOptions';
import TraitSet from './TraitSet';
import Share from './buttons/Share';

const traitTypes: {
  title: TraitType;
  info: string;
}[] = [
  {
    title: ARTISTIC,
    info: 'hi artistic',
  },
  {
    title: AUGMENT,
    info: 'hi augment',
  },
  {
    title: GEOMETRY,
    info: 'hi geometry',
  },
  {
    title: PATTERNS,
    info: 'hi patterns',
  },
];

export default function Dashboard() {
  return (
    <div className="relative h-[90%] overflow-y-auto mt-4 p-4">
      <ProjectTitle>
        <Share />
      </ProjectTitle>
      <HashSelect />
      <ControlMenu />
      <div className="flex flex-wrap mb-24">
        {traitTypes.map(({ title, info }) => (
          <TraitSet key={title} title={title} info={info}>
            <Trait name="BRUSH">
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
            <DragTrait name="SQUARE" />
            <Trait name="STROKE COLOR">
              <TraitOptions
                options={[
                  {
                    label: <Circle color={'primaryRed'} size={'5'} />,
                    value: 1,
                  },
                  {
                    label: <Circle color={'primaryRed'} size={'5'} />,
                    value: 2,
                  },
                  {
                    label: <Circle color={'primaryRed'} size={'5'} />,
                    value: 3,
                  },
                  {
                    label: <Circle color={'primaryRed'} size={'5'} />,
                    value: 4,
                  },
                ]}
              />
            </Trait>
            <Trait name="STROKE SIZE">
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
          </TraitSet>
        ))}
      </div>
      <DashboardFooter />
    </div>
  );
}
