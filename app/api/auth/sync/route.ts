import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/user';
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { sub: auth0Id, email, name } = session.user;
    
    const user = await User.findOneAndUpdate(
      { auth0Id },
      { 
        auth0Id,
        email,
        name,
        $setOnInsert: {
          preferences: {
            categories: [],
            subscriptions: [],
            darkMode: false,
            carbonGoal: 0,
          }
        }
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(user);
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}