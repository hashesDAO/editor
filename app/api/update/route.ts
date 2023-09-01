import { callReadOnlyFnFromHashesContract, getChainIdFromNetworkName } from '@/app/util';
import { messageToSign } from '@/app/util/constants';
import { NextResponse } from 'next/server';
import { Address, isAddressEqual, verifyMessage } from 'viem';

export async function POST(req: Request) {
  const body = await req.json();
  const { hash, tokenId, image, signature, address, chain } = body;

  if (!hash || !tokenId || !image || !signature || !address || !chain) {
    return NextResponse.json(
      { error: 'request body must contain the following fields: hash, tokenId, image, signature, address, chain' },
      { status: 400 },
    );
  }

  const isValidSignature = await verifyMessage({
    address,
    message: messageToSign,
    signature,
  }).catch((err) => {
    console.error(`error verifying signature: ${err}`);
    return false;
  });

  if (!isValidSignature) {
    return NextResponse.json({ error: 'invalid message signature' }, { status: 400 });
  }

  const tokenIdOwner = await callReadOnlyFnFromHashesContract(chain, 'ownerOf', [tokenId]);

  if (tokenIdOwner instanceof Error) {
    return NextResponse.json({ error: tokenIdOwner.message }, { status: 500 });
  }

  if (!isAddressEqual(tokenIdOwner as Address, address)) {
    return NextResponse.json({ error: 'address does not own token' }, { status: 400 });
  }

  const chainId = getChainIdFromNetworkName(chain);
  const res = await fetch(`http://localhost:3001/api/token/${tokenId}?chain_id=${chainId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'http://localhost:3000',
    },
    body: JSON.stringify({
      image,
      messageDetails: {
        message: messageToSign,
        signature,
        address,
      },
    }),
  });

  if (res.status !== 200) {
    return NextResponse.json({ error: 'ok error' }, { status: res.status });
  }

  return NextResponse.json({ data: 'hello' }, { status: 201 });
}
