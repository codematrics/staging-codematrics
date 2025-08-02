import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  _id?: ObjectId;
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  timestamp: string;
  status?: 'new' | 'read' | 'replied';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new inquiry
    const newInquiry: Omit<ContactFormData, '_id'> = {
      name,
      email,
      company: body.company || '',
      subject,
      message,
      timestamp: new Date().toISOString(),
      status: 'new',
    };

    // Save to MongoDB
    const db = await getDatabase();
    const result = await db.collection('inquiries').insertOne(newInquiry);

    return NextResponse.json(
      { message: 'Inquiry submitted successfully', id: result.insertedId },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple authentication check (you can enhance this)
    const authHeader = request.headers.get('authorization');
    const isAdmin = authHeader === 'Bearer admin-token-123'; // Change this to a secure token

    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get inquiries from MongoDB
    const db = await getDatabase();
    const inquiries = await db
      .collection('inquiries')
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    return NextResponse.json(inquiries);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
