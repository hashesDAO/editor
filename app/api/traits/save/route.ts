import slugify from '@sindresorhus/slugify';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const TABLE_NAME = 'user-traits';

export async function POST(req: Request) {
  const body = await req.json();

  if (!body) {
    //TODO: Fix this
    // return NextResponse.error(new Error('No body provided'));
  }

  const { title, traitIds } = body;

  if (!title || !traitIds) {
    // return NextResponse.error(new Error('Missing required fields'));
  }

  const slug = slugify(title);

  const supabase = createServerComponentClient({ cookies });
  const { data: slugData, error: slugError } = await supabase.from(TABLE_NAME).select('*').eq('slug', slug);

  if (slugError) {
    console.log(`error getting slug data: ${slugError.message}`);
    return;
  }

  console.log('zzz body', body);
  console.log('zzz slugData', slugData.length);

  const { data: postData, error: postError } = await supabase.from(TABLE_NAME).insert({
    title,
    trait_ids: traitIds,
    slug: slugData.length === 0 ? slug : `${slug}-${slugData.length}`,
  });

  if (postError) {
    console.log(`error posting data: ${postError.message}`);
    return;
  }

  console.log('zzz postData', postData);

  // const data = await res.json();

  return NextResponse.json({
    data: 'data',
  });
}
