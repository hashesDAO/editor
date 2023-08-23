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

  const supabase = createServerComponentClient({ cookies });
  //get duplicate project title data to increment forthcoming slug if not unique
  const { data: titleData, error: titleError } = await supabase.from(TABLE_NAME).select('title').eq('title', title);

  if (titleError) {
    console.log(`error getting title data: ${titleError.message}`);
    return;
  }

  const titleSlug = slugify(title);
  const slug = titleData.length === 0 ? titleSlug : `${titleSlug}-${titleData.length + 1}`;
  const { error: postError } = await supabase.from(TABLE_NAME).insert({
    title,
    trait_ids: traitIds,
    slug,
  });

  if (postError) {
    console.log(`error posting data: ${postError.message}`);
    return;
  }

  return NextResponse.json({ slug });
}
