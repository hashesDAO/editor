import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const { title, traitIds } = body;

  if (!title || !traitIds) {
    return NextResponse.json(
      { error: 'request body must contain valid "title" and "traitIds" fields' },
      { status: 400 },
    );
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
