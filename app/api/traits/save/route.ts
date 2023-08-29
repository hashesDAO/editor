import slugify from '@sindresorhus/slugify';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { USER_TRAITS_TABLE } from '@/app/util/constants';

export async function POST(req: Request) {
  const body = await req.json();

  const { title, traitIds } = body;

  if (!title || !traitIds) {
    return NextResponse.json(
      { error: 'request body must contain valid "title" and "traitIds" fields' },
      { status: 400 },
    );
  }

  const supabase = createServerComponentClient({ cookies });
  //get duplicate project title data to increment forthcoming slug if not unique
  const { data: titleData, error: titleError } = await supabase
    .from(USER_TRAITS_TABLE)
    .select('title')
    .eq('title', title);

  if (titleError) {
    return NextResponse.json({ error: `error getting title data from DB: ${titleError.message}` }, { status: 500 });
  }

  const titleSlug = slugify(title);
  const slug = titleData.length === 0 ? titleSlug : `${titleSlug}-${titleData.length + 1}`;
  const { error: postError } = await supabase.from(USER_TRAITS_TABLE).insert({
    title,
    trait_ids: traitIds,
    slug,
  });

  if (postError) {
    return NextResponse.json({ error: `error posting data to DB: ${postError.message}` }, { status: 500 });
  }

  return NextResponse.json({ slug }, { status: 201 });
}
