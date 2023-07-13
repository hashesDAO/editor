import { ChainNames } from '@/app/util/types';
import { getHashesContract, callReadOnlyFnFromHashesContract } from '../../../util/';
import { getHashType, hashType, isValidAddress } from '../../../util/validate';
import { NextResponse } from 'next/server';

// type WalletHash = {
//   hash_value: string;
//   type: hashType;
//   token_id: number;
// };

// type ResponseData = {
//   hashes: WalletHash[];
// };

const addressTypeErrorMessage = 'address must be a string';
const addressInvalidErrorMessage = 'valid (non-ens) wallet address must be provided';
const contractBalanceErrorMessage = 'error getting contract balance';
const walletHasNoHashErrorMessage = 'wallet does not have a hash token';

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

  // const hashesContract = getHashesContract((chain as string) || 'mainnet');
  const hashesCount = await callReadOnlyFnFromHashesContract(chain, 'balanceOf', [address]);
  console.log('z4zz hashesCount', hashesCount);

  if (hashesCount instanceof Error) {
    return new Response(contractBalanceErrorMessage, {
      status: 500,
      statusText: hashesCount.message,
    });
  }

  if (!hashesCount) {
    return new Response(walletHasNoHashErrorMessage, {
      status: 404, //should this be 404?
      statusText: walletHasNoHashErrorMessage,
    });
  }

  return NextResponse.json({
    hashes: [],
  });

  // try {
  //   const hashes: WalletHash[] = [];
  //   const tokenIdPromises = Array.from(Array(hashesCount), (_, i) => i).map((i) =>
  //     hashesContract.tokenOfOwnerByIndex(address, i),
  //   );
  //   const tokenIds = await Promise.all(tokenIdPromises);
  //   const hashPromises = tokenIds.map((tokenId: string) => hashesContract.getHash(tokenId));
  //   const deactivatedPromises = tokenIds.map((tokenId: string) => hashesContract.deactivated(tokenId));
  //   const tokenDetailPromises = await Promise.all([...hashPromises, ...deactivatedPromises]);

  //   for (let i = 0; i < hashesCount; i++) {
  //     const tokenId = tokenIds[i];
  //     const hash = tokenDetailPromises[i]._hex;
  //     const isDeactivated = tokenDetailPromises[i]._isBigNumber;
  //     const type = getHashType(tokenId, isDeactivated);
  //     hashes.push({
  //       hash_value: hash,
  //       type,
  //       token_id: tokenId.toNumber(),
  //     });
  //   }

  //   res.status(200).json({ hashes });
  // } catch (error) {
  //   console.error(`error getting hashes data: ${error}`);
  // }
}
