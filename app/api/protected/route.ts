import { auth } from '@/auth';

export async function GET(req: Request) {
  const session = await auth();

  if (!session) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({ message: 'Protected data', user: session.user }),
    { status: 200 }
  );
}
