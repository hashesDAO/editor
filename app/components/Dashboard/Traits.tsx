import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Traits() {
  const supabase = createServerComponentClient({ cookies });
  const { data: countries } = await supabase.from('countries').select();

  return (
    <>
      <h1>Traits</h1>
      <ul className="my-auto">
        {countries?.map((country) => (
          <li key={country.id}>{country.name}</li>
        ))}
      </ul>
    </>
  );
}
