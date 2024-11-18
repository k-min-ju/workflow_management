import { addDoc, collection, deleteDoc, doc, DocumentReference, updateDoc } from '@firebase/firestore';
import db from '@/firebase/config';
import { FIREBASE_COLLECTION } from '@/configs/constants';
import {
  CreateWorkflowData,
  DeleteFlowObjectData,
  InsertFlowObjectData,
  ObjectType,
  UpdateFlowObjectData
} from '@/components/workflow/xyflowTypes';

export const createWorkflow = async (data: CreateWorkflowData): Promise<string | undefined> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, FIREBASE_COLLECTION.WORK_FLOW), {
      title: data.workflowTitle,
      userId: data.email,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return docRef.id;
  } catch (e) {
    console.error('Error create workflow: ', e);
  }
};

export const insertFlowObject = async <D extends ObjectType>({
  workflowId,
  objectType,
  objectData
}: InsertFlowObjectData<D>): Promise<void> => {
  try {
    await addDoc(collection(db, FIREBASE_COLLECTION.WORK_FLOW, workflowId, objectType), objectData);
  } catch (e) {
    console.error(`Error insert workflow object: `, e);
    throw e;
  }
};

export const updateFlowObject = async <D extends ObjectType>({
  workflowId,
  objectType,
  objectData
}: UpdateFlowObjectData<D>): Promise<void> => {
  try {
    const nodeDocRef = doc(db, FIREBASE_COLLECTION.WORK_FLOW, workflowId, objectType, objectData.id!);
    await updateDoc(nodeDocRef, objectData);
  } catch (e) {
    console.error('Error update node: ', e);
    throw e;
  }
};

export const deleteFlowObject = async ({ workflowId, nodeId, edgeId }: DeleteFlowObjectData): Promise<void> => {
  try {
    if (nodeId) {
      const nodeDocRef: DocumentReference = doc(
        db,
        FIREBASE_COLLECTION.WORK_FLOW,
        workflowId,
        FIREBASE_COLLECTION.NODE,
        nodeId
      );
      await deleteDoc(nodeDocRef);
    }

    if (edgeId && edgeId?.length > 0) {
      for (const edge of edgeId) {
        const edgeDocRef: DocumentReference = doc(
          db,
          FIREBASE_COLLECTION.WORK_FLOW,
          workflowId,
          FIREBASE_COLLECTION.EDGE,
          edge
        );
        await deleteDoc(edgeDocRef);
      }
    }
  } catch (e) {
    console.error('Error delete node: ', e);
    throw e;
  }
};
