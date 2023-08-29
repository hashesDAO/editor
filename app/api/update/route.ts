import { callReadOnlyFnFromHashesContract } from '@/app/util';
import { messageToSign } from '@/app/util/constants';
import { NextResponse } from 'next/server';
import { Address, isAddressEqual, verifyMessage } from 'viem';

export async function POST(req: Request) {
  const body = await req.json();
  const { hash, tokenId, image, signature, address } = body;

  if (!hash || !tokenId || !image || !signature || !address) {
    return NextResponse.json(
      { error: 'request body must contain the following fields: hash, tokenId, image, signature, address' },
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

  const tokenIdOwner = await callReadOnlyFnFromHashesContract('homestead', 'ownerOf', [tokenId]);

  if (tokenIdOwner instanceof Error) {
    return NextResponse.json({ error: tokenIdOwner.message }, { status: 500 });
  }

  if (!isAddressEqual(tokenIdOwner as Address, address)) {
    return NextResponse.json({ error: 'address does not own token' }, { status: 400 });
  }

  // const res = await fetch('https://data.mongodb-api.com/...', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'API-Key': process.env.DATA_API_KEY,
  //   },
  //   body: JSON.stringify({ time: new Date().toISOString() }),
  // });

  // const data = await res.json();

  // if (postError) {
  //   return NextResponse.json({ error: `error posting data to DB: ${postError.message}` }, { status: 500 });
  // }

  return NextResponse.json({ data: 'hello' }, { status: 201 });
}
