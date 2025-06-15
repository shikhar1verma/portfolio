import { revalidatePath } from 'next/cache';
export async function POST(request) {
  const body = await request.json();
  if (body.secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }
  const tag = body.tag || '/';
  await revalidatePath(tag);
  return new Response('OK');
}
