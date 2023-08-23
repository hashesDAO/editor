import { USER_TRAITS_TABLE_NAME } from '@/app/util/constants';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { pathname } = new URL(request.url);
  const slug = pathname.split('/').pop();
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from(USER_TRAITS_TABLE_NAME).select('*').eq('slug', slug).single();

  if (error) {
    return NextResponse.json({ error: `error getting project data from DB: ${error.message}` }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 200 });
}
