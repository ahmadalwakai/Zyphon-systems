import { NextRequest, NextResponse } from 'next/server';
import { getInquiries, updateInquiryStatus } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    if (!await verifyAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const inquiries = await getInquiries();

    return NextResponse.json({
      success: true,
      data: inquiries,
    });
  } catch (error) {
    console.error('Get inquiries error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    if (!await verifyAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'ID and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['new', 'reviewed', 'responded'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const inquiry = await updateInquiryStatus(id, status);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error('Update inquiry error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}
