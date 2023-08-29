import { messageToSign } from '@/app/util/constants';
import { NextResponse } from 'next/server';
import { verifyMessage } from 'viem';

export async function POST(req: Request) {
  const body = await req.json();

  const { hash, image, signature, address } = body;

  if (!hash || !image || !signature || !address) {
    return NextResponse.json(
      { error: 'request body must contain the following fields: hash, image, signature, address' },
      { status: 400 },
    );
  }

  const isValidSignature = await verifyMessage({
    address,
    message: messageToSign,
    signature,
  });

  if (!isValidSignature) {
    return NextResponse.json({ error: 'invalid message signature' }, { status: 400 });
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
