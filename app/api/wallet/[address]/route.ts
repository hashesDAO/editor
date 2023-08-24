import type { ChainNames, HashType } from '@/app/util/types';
import { NextResponse } from 'next/server';
import { callReadOnlyFnFromHashesContract, getHashType, isValidAddress } from '../../../util/';

type WalletHash = {
  hash_value: string;
  type: HashType;
  token_id: number;
};

function bigNumToNumber(bn: any) {
  return parseInt(bn.toString());
}

const addressTypeErrorMessage = 'address must be a string';
const addressInvalidErrorMessage = 'valid (non-ens) wallet address must be provided';
const contractBalanceErrorMessage = 'error getting contract balance';

export async function GET(req: Request, { params }: { params: { address: string } }) {
  const url = new URL(req.url);
  const address = params.address;
  const chain = url.searchParams.get('chain') as ChainNames;

  if (typeof address !== 'string') {
    return new Response(addressTypeErrorMessage, {
      status: 400,
      statusText: addressTypeErrorMessage,
    });
  }

  if (!isValidAddress(address)) {
    return new Response(addressInvalidErrorMessage, {
      status: 400,
      statusText: addressInvalidErrorMessage,
    });
  }

  const hashesCount = await callReadOnlyFnFromHashesContract(chain, 'balanceOf', [address]);

  if (hashesCount instanceof Error) {
    return new Response(contractBalanceErrorMessage, {
      status: 500,
      statusText: hashesCount.message,
    });
  }

  if (!hashesCount) {
    return NextResponse.json({ hashes: [] });
  }

  try {
    const hashes: WalletHash[] = [];
    const parsedHashesCount = bigNumToNumber(hashesCount);
    const tokenIdPromises = Array.from(Array(parsedHashesCount), (_, i) => i).map((i) =>
      callReadOnlyFnFromHashesContract(chain, 'tokenOfOwnerByIndex', [address, i]),
    );

    const tokenIds: string[] = (await Promise.all(tokenIdPromises)).map((tokenId) => (tokenId as bigint).toString());

    const hashPromises = tokenIds.map((tokenId: string) =>
      callReadOnlyFnFromHashesContract(chain, 'getHash', [tokenId]),
    );
    const deactivatedPromises = tokenIds.map((tokenId: string) =>
      callReadOnlyFnFromHashesContract(chain, 'deactivated', [tokenId]),
    );
    const tokenDetailPromises = await Promise.all([...hashPromises, ...deactivatedPromises]);

    for (let i = 0; i < parsedHashesCount; i++) {
      const tokenId = tokenIds[i];
      const hash = tokenDetailPromises[i];
      const isDeactivated = tokenDetailPromises[i + parsedHashesCount];
      const type = getHashType(tokenId, isDeactivated as boolean);
      hashes.push({
        hash_value: hash as string,
        type,
        token_id: bigNumToNumber(tokenId),
      });
    }

    return NextResponse.json({ hashes });
  } catch (error) {
    console.error(`error getting hashes data: ${error}`);
  }
}
