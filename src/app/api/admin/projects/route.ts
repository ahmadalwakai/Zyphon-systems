import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/db';
import { verifyAdminSession } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    if (!await verifyAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const projects = await getProjects(false);

    return NextResponse.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!await verifyAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, type, description, outcome, isVisible, displayOrder } = body;

    if (!title || !type || !description) {
      return NextResponse.json(
        { success: false, error: 'Title, type, and description are required' },
        { status: 400 }
      );
    }

    const project = await createProject({
      title: title.trim().slice(0, 255),
      type: type.trim().slice(0, 100),
      description: description.trim(),
      outcome: outcome?.trim(),
      isVisible: isVisible ?? true,
      displayOrder: displayOrder ?? 0,
    });

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!await verifyAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (data.title) updateData.title = data.title.trim().slice(0, 255);
    if (data.type) updateData.type = data.type.trim().slice(0, 100);
    if (data.description) updateData.description = data.description.trim();
    if (data.outcome !== undefined) updateData.outcome = data.outcome?.trim();
    if (data.isVisible !== undefined) updateData.isVisible = data.isVisible;
    if (data.displayOrder !== undefined) updateData.displayOrder = data.displayOrder;

    const project = await updateProject(id, updateData);

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!await verifyAdminSession(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Project ID is required' },
        { status: 400 }
      );
    }

    await deleteProject(parseInt(id, 10));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}
