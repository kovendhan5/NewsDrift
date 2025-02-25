import { NextResponse } from 'next/server';
import { getSession } from '@auth0/nextjs-auth0';
import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { cacheData, getCachedData } from '@/lib/redis';

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cacheKey = `user:${session.user.sub}`;
    const cachedUser = await getCachedData(cacheKey);
    if (cachedUser) {
      return NextResponse.json(cachedUser);
    }

    await connectDB();
    const user = await User.findOne({ auth0Id: session.user.sub });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Cache user data for 5 minutes
    await cacheData(cacheKey, user, 300);
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('User fetch error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectDB();

    const user = await User.findOneAndUpdate(
      { auth0Id: session.user.sub },
      { $set: data },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update cache
    const cacheKey = `user:${session.user.sub}`;
    await cacheData(cacheKey, user, 300);

    return NextResponse.json(user);
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}