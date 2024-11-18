import { NextResponse } from 'next/server';
import { createWorkflow, deleteFlowObject, insertFlowObject, updateFlowObject } from '@/firebase/firebaseService';
import { ObjectType, WorkflowAction } from '@/components/workflow/xyflowTypes';

export async function GET<T>(req: Request): Promise<NextResponse<T>> {
  try {
    const { action, data } = await req.json();
    switch (action as WorkflowAction) {
      case 'getWorkflow': {
        const workflowId: string | undefined = await createWorkflow(data);
        return NextResponse.json({ workflowId } as T, { status: 200 });
      }
      default:
        return NextResponse.json({ error: 'Invalid action' } as T, { status: 400 });
    }
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json({ error: 'Server error' } as T, { status: 500 });
  }
}

export async function POST<T>(req: Request): Promise<NextResponse<T>> {
  try {
    const { action, data } = await req.json();

    switch (action as WorkflowAction) {
      case 'createWorkflow': {
        const workflowId: string | undefined = await createWorkflow(data);
        return NextResponse.json({ workflowId } as T, { status: 200 });
      }
      case 'insertFlowObject':
        await insertFlowObject<ObjectType>(data);
        return NextResponse.json({ message: 'object inserted successfully' } as T, { status: 200 });

      default:
        return NextResponse.json({ error: 'Invalid action' } as T, { status: 400 });
    }
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json({ error: 'Server error' } as T, { status: 500 });
  }
}

export async function PATCH<T>(req: Request): Promise<NextResponse<T>> {
  try {
    const { action, data } = await req.json();

    switch (action as WorkflowAction) {
      case 'updateFlowObject':
        await updateFlowObject<ObjectType>(data);
        return NextResponse.json({ message: 'object updated successfully' } as T, { status: 200 });

      default:
        return NextResponse.json({ error: 'Invalid action' } as T, { status: 400 });
    }
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json({ error: 'Server error' } as T, { status: 500 });
  }
}

export async function DELETE<T>(req: Request): Promise<NextResponse<T>> {
  try {
    const { action, data } = await req.json();

    switch (action as WorkflowAction) {
      case 'deleteFlowObject':
        await deleteFlowObject(data);
        return NextResponse.json({ message: 'object deleted successfully' } as T, { status: 200 });

      default:
        return NextResponse.json({ error: 'Invalid action' } as T, { status: 400 });
    }
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json({ error: 'Server error' } as T, { status: 500 });
  }
}
