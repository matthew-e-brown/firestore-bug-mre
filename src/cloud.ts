import { doc, onSnapshot, setDoc, Unsubscribe, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebase';

type StorageItem = { 'foo': number, bar: string };


/**
 * A wrapper for onSnapshot.
 * @param path The document to subscribe to.
 * @param handler The function to pass the data to once it arrives.
 * @returns An Unsubscribe function to stop listening.
 */
export function subscribe(
  path: string,
  handler: (data: StorageItem | null) => void
): Unsubscribe {

  const docRef = doc(firestore, path);

  return onSnapshot(docRef, snapshot => {
    if (snapshot.exists()) {
      const data = snapshot.data();
      handler(data as StorageItem);
    } else {
      handler(null);
    }
  });

}


/**
 * A wrapper for updateDoc. Falls back to setDoc if that document doesn't exist
 * yet.
 * @param path The document to update.
 * @param key The field on that document to update.
 * @param value The value to set that document's field to.
 */
export async function setField<K extends keyof StorageItem>(
  path: string,
  key: K,
  value: StorageItem[K]
): Promise<void> {

  const docRef = doc(firestore, path);

  // Only update the key we provide
  const data = { [key]: value };

  // If it's not found, set it with the one field
  return updateDoc(docRef, data).catch(() => setDoc(docRef, data));

}