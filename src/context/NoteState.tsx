import React, {FC, useEffect, useState} from 'react';
import NoteContext from './NoteContext';
import {Label, Note, Reminder} from '../types.ts';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
  updateDoc,
  doc,
  where,
  query,
  arrayUnion,
  arrayRemove,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import CollectionReference = FirebaseFirestoreTypes.CollectionReference;

interface Props {
  children: React.ReactNode;
}

const NoteState: FC<Props> = ({children}) => {
  const db = getFirestore();

  const noteCollection = collection(db, 'notes');
  const binCollection = collection(db, 'bin');
  const archiveCollection = collection(db, 'archive');
  const labelCollection = collection(db, 'labels');

  const [notes, setNotes] = useState<Note[]>([]);
  const [binNotes, setBinNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [reminderNotes, setReminderNotes] = useState<Reminder[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotes = async (): Promise<void> => {
      try {
        const notesResponse = await getDocs(noteCollection);
        const fetchedNotes = notesResponse.docs.map((note: any) => note.data());

        const binResponse = await getDocs(binCollection);
        const fetchedBinNotes = binResponse.docs.map((binNote: any) =>
          binNote.data(),
        );

        const archivedResponse = await getDocs(archiveCollection);
        const fetchedArchivedNotes = archivedResponse.docs.map(
          (archivedNote: any) => archivedNote.data(),
        );
        const labelsResponse = await getDocs(labelCollection);
        const fetchedLabels = labelsResponse.docs.map((label: any) =>
          label.data(),
        );

        setNotes(fetchedNotes as Note[]);
        setBinNotes(fetchedBinNotes as Note[]);
        setArchivedNotes(fetchedArchivedNotes as Note[]);
        setReminderNotes(
          fetchedNotes.filter(note => note.reminder) as Reminder[],
        );
        setLabels(fetchedLabels as Label[]);
      } catch (e) {
        console.log('Error getting documents: ', e);
      }
    };
    fetchNotes();
  }, [reload]);

  const handleAddNote = async (note: Note): Promise<void> => {
    try {
      await addDoc(noteCollection, note);
      setReload(!reload);
    } catch (e) {
      console.log('Error adding document: ', e);
    }
  };

  const handleUpdateNote = async (note: Note) => {
    try {
      const q = query(noteCollection, where('id', '==', note.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await setDoc(docRef, note);
        console.log('note updated: ');
        setReload(!reload);
      }
    } catch (e) {
      console.log('Error updating document: ', e);
    }
  };

  const handleEmptyBin = async () => {
    try {
      const binResponse = await getDocs(binCollection);
      for (const docu of binResponse.docs) {
        await deleteDoc(docu.ref);
      }
      setReload(!reload);
    } catch (e) {
      console.log('Error deleting documents: ', e);
    }
  };

  const handleAddNoteToLabel = async (note: Note, labelName: string) => {
    try {
      const q = query(labelCollection, where('name', '==', labelName));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('Label not found, cannot add note.');
        return;
      }

      const labelDoc = querySnapshot.docs[0];
      const labelRef = labelDoc.ref;

      const noteRef = await addDoc(noteCollection, note);

      await updateDoc(labelRef, {
        notes: arrayUnion(noteRef.id),
      });

      setReload(!reload);
    } catch (e) {
      console.log('Error adding document: ', e);
    }
  };

  const moveNotes = async (
    ids: string[],
    targetCollection: CollectionReference,
  ) => {
    try {
      for (const id of ids) {
        console.log(id)
        const q = query(noteCollection, where('id', '==', id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data() as Note;
          const docId = querySnapshot.docs[0].id;

          if (docData.type === 'label' && docData.label) {
            const findLabelQuery = query(
              labelCollection,
              where('name', '==', docData.label),
            );
            const labelQuerySnap = await getDocs(findLabelQuery);

            if (!labelQuerySnap.empty) {
              const labelDoc = labelQuerySnap.docs[0];
              const labelRef = labelDoc.ref;
              await updateDoc(labelRef, {
                notes: arrayRemove(docId),
              });
            }
          }
          await addDoc(targetCollection, docData);
          await deleteDoc(doc(noteCollection, docId));
        }
      }
      setReload(!reload);
    } catch (e) {
      console.log('Error moving notes: ', e);
    }
  };

  const handleDeleteNotes = (ids: string[]) => moveNotes(ids, binCollection);
  const handleArchiveNotes = (ids: string[]) =>
    moveNotes(ids, archiveCollection);

  const handleAddLabels = async (name: string) => {
    try {
      await addDoc(labelCollection, {
        id: Date.now().toString(),
        name: name,
        notes: [],
      });
      setReload(!reload);
    } catch (e) {
      console.log('Error adding documents: ', e);
    }
  };

  const handleDeleteLabels = async (labelId: string) => {
    const q = query(labelCollection, where('id', '==', labelId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('Label not found, cannot add note.');
      return;
    }

    const labelDoc = querySnapshot.docs[0];
    console.log(labelDoc.data().notes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        binNotes,
        archivedNotes,
        reminderNotes,
        labels,
        handleAddNote,
        handleEmptyBin,
        handleDeleteNotes,
        handleArchiveNotes,
        handleAddLabels,
        handleAddNoteToLabel,
        handleDeleteLabels,
        handleUpdateNote,
      }}>
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
