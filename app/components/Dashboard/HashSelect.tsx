'use client';

import useHashesData from '@/app/hooks/useHashesData';
import type { HashesData } from '../../util/types';
import Select from '../common/Select';
import HashPill from './HashPill';
import Generate from './buttons/Generate';

function createHashSelectOptions(data: HashesData[]) {
  return data.map(({ hash_value }) => ({
    label: hash_value,
    value: hash_value,
  }));
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <section className="flex mb-8">{children}</section>;
}

export default function HashSelect() {
  const { hashData, isError, isLoading } = useHashesData();
  const { hashes } = hashData || {};

  if (isError) {
    return (
      <Wrapper>
        <p className="w-full py-4 px-5">failed to load</p>
      </Wrapper>
    );
  }

  if (isLoading) {
    return (
      <Wrapper>
        <p className="w-full py-4 px-5">loading...</p>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {hashes ? (
        <>
          <div className="w-4/6">
            <Select options={createHashSelectOptions(hashes)} />
          </div>
          <div className="w-2/6 flex flex-row items-center">
            <p className="px-4">OR</p>
            <Generate />
          </div>
        </>
      ) : (
        <div className="w-full">
          <HashPill />
        </div>
      )}
    </Wrapper>
  );
}
