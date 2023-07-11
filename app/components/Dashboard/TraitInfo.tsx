'use client';

import { IoInformationCircleOutline } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

export default function TraitInfo({ tooltipText, id }: { tooltipText: string; id: string }) {
  return (
    <>
      <IoInformationCircleOutline
        className="text-sm inline-flex ml-2 cursor-pointer align-middle"
        data-tooltip-id={id}
        data-tooltip-content={tooltipText}
      />
      <Tooltip id={id} />
    </>
  );
}
