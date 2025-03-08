import React, {FC, useContext, useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../../navigation/types.ts';
import AddReminderModal from '../../components/modals/AddReminderModal.tsx';
import EditReminderModal from '../../components/modals/EditReminderModal.tsx';
import NoteHeader from '../../components/note/NoteHeader.tsx';
import NoteFooter from '../../components/note/NoteFooter.tsx';
import {Note} from '../../types.ts';
import NoteImageBody from '../../components/note/NoteImageBody.tsx';
import NoteBody from '../../components/note/NoteBody.tsx';
import NoteListBody from '../../components/note/NoteListBody.tsx';
import NoteDrawBody from '../../components/note/NoteDrawBody.tsx';
import NoteContext from '../../context/NoteContext.tsx';

type Props = StackScreenProps<StackParamList, 'UpdateNote'>;
const UpdateNote: FC<Props> = ({route}) => {
  const [isAddReminderModalOpen, setIsAddReminderModalOpen] =
    useState<boolean>(false);
  const [isEditReminderModalOpen, setIsEditReminderModalOpen] =
    useState<boolean>(false);

  const {handleUpdateNote} = useContext(NoteContext);

  const {note, labelName, pNote} = route.params;
  const [reminder, setReminder] = useState<string | undefined>(undefined);

  const handleModalClose = () => {
    setIsAddReminderModalOpen(false);
    setIsEditReminderModalOpen(false);
  };
  const updateNote = (updatedNote: Note) => {
    handleUpdateNote(updatedNote);
  };

  useEffect(() => {
    if (note.type === 'reminder') {
      setReminder(note.reminder);
    }
  }, [note.type]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <NoteHeader setIsAddReminderModalOpen={setIsAddReminderModalOpen} />
        {note.type !== 'draw' ? (
          <ScrollView style={styles.scrollContainer}>
            {note.type === 'image' ? (
              <NoteImageBody
                labelName={labelName}
                existingNote={note}
                addNote={updateNote}
                pNote={pNote}
              />
            ) : note.type === 'note' ? (
              <NoteBody
                labelName={labelName}
                reminder={reminder}
                existingNote={note}
                setIsEditReminderModalOpen={setIsEditReminderModalOpen}
                addNote={updateNote}
                pNote={pNote}
              />
            ) : (
              <NoteListBody
                labelName={labelName}
                existingNote={note}
                addNote={updateNote}
                pNote={pNote}
              />
            )}
          </ScrollView>
        ) : (
          <NoteDrawBody
            labelName={labelName}
            existingNote={note}
            addNote={updateNote}
            pNote={pNote}
          />
        )}
        <NoteFooter labelName={labelName} />
        <AddReminderModal
          isModalOpen={isAddReminderModalOpen}
          handleModalClose={handleModalClose}
          setReminder={setReminder}
          setIsEditReminderModalOpen={setIsEditReminderModalOpen}
        />
        <EditReminderModal
          isModalOpen={isEditReminderModalOpen}
          handleModalClose={handleModalClose}
          reminder={reminder}
          setReminder={setReminder}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flex: 1,
  },
});

export default UpdateNote;
