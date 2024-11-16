import { NextResponse } from 'next/server';
import { doc, DocumentReference, DocumentSnapshot, getDoc, setDoc } from '@firebase/firestore';
import db from '@/firebase/config';

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, name, googleId } = await req.json();

    if (!email || !name || !googleId) {
      return NextResponse.json({ message: 'Missing required user data' }, { status: 400 });
    }

    const userRef: DocumentReference = doc(db, 'googleUsers', email);
    const docSnapshot: DocumentSnapshot = await getDoc(userRef);

    if (!docSnapshot.exists()) {
      await setDoc(userRef, {
        name,
        email,
        googleId
      });
    }

    return NextResponse.json({ message: 'User data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error saving user data:', error);
    return NextResponse.json({ message: 'Failed to save user data', error }, { status: 500 });
  }
}
