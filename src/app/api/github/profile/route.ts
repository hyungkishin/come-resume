import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    id: 'u1',
    username: 'hyungki',
    name: '신형기',
    avatarUrl: 'https://github.com/hyungkishin.png',
    bio: 'Frontend Developer',
    publicRepos: 42,
    followers: 128,
    following: 56,
  });
}
