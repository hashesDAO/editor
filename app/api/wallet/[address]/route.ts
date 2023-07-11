import type { NextApiRequest, NextApiResponse } from 'next';
import { getHashesContract } from '../../../util/';
import { getHashType, getHashesCount, hashType, isValidAddress } from '../../../util/validate';

type WalletHash = {
  hash_value: string;
  type: hashType;
  token_id: number;
};

type ResponseData = {
  hashes: WalletHash[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData | string>) {
  const { address, chain } = req.query;

  if (typeof address !== 'string') {
    res.status(400).send('address must be a string');
    return;
  }

  if (!isValidAddress(address)) {
    res.status(400).send('valid (non-ens) wallet address must be provided');
    return;
  }

  const hashesContract = getHashesContract((chain as string) || 'mainnet');
  const hashesCount = await getHashesCount(hashesContract, address);

  if (hashesCount instanceof Error) {
    res.status(500).send(hashesCount.message);
    return;
  }

  if (!hashesCount) {
    res.status(404).send('wallet does not have a hash token');
    return;
  }

  try {
    const hashes: WalletHash[] = [];
    const tokenIdPromises = Array.from(Array(hashesCount), (_, i) => i).map((i) =>
      hashesContract.tokenOfOwnerByIndex(address, i),
    );
    const tokenIds = await Promise.all(tokenIdPromises);
    const hashPromises = tokenIds.map((tokenId: string) => hashesContract.getHash(tokenId));
    const deactivatedPromises = tokenIds.map((tokenId: string) => hashesContract.deactivated(tokenId));
    const tokenDetailPromises = await Promise.all([...hashPromises, ...deactivatedPromises]);

    for (let i = 0; i < hashesCount; i++) {
      const tokenId = tokenIds[i];
      const hash = tokenDetailPromises[i]._hex;
      const isDeactivated = tokenDetailPromises[i]._isBigNumber;
      const type = getHashType(tokenId, isDeactivated);
      hashes.push({
        hash_value: hash,
        type,
        token_id: tokenId.toNumber(),
      });
    }

    res.status(200).json({ hashes });
  } catch (error) {
    console.error(`error getting hashes data: ${error}`);
  }
}
