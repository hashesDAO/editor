import { ParsedTrait } from '@/app/util/types';
import Trait from './Trait';
import TraitSet from './TraitSet';

export default function TraitList({ traits }: { traits: ParsedTrait[] }) {
  return (
    <section className="w-1/2">
      {traits.map(({ description, type, traits }) => (
        <TraitSet key={type} title={type.toUpperCase()} info={description}>
          <ul>
            {traits.map(({ id, name, content }) => (
              <li key={id} className="flex justify-between">
                <Trait name={name} value={{ id, content }} />
              </li>
            ))}
          </ul>
        </TraitSet>
      ))}
    </section>
  );
}
