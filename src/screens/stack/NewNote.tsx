import React, {FC, useContext, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import NoteHeader from '../../components/note/NoteHeader.tsx';
import NoteFooter from '../../components/note/NoteFooter.tsx';
import NoteBody from '../../components/note/NoteBody.tsx';
import NoteListBody from '../../components/note/NoteListBody.tsx';
import NoteDrawBody from '../../components/note/NoteDrawBody.tsx';
import {StackParamList} from '../../navigation/types.ts';
import {StackScreenProps} from '@react-navigation/stack';
import NoteContext from '../../context/NoteContext.tsx';
import NoteImageBody from '../../components/note/NoteImageBody.tsx';
import AddReminderModal from '../../components/modals/AddReminderModal.tsx';
import EditReminderModal from '../../components/modals/EditReminderModal.tsx';
import ThemeContext from '../../context/ThemeContext.tsx';

type Props = StackScreenProps<StackParamList, 'NewNote'>;

const NewNote: FC<Props> = ({route}) => {
  const {theme} = useContext(ThemeContext);
  const {handleAddNote, handleAddNoteToLabel} = useContext(NoteContext);
  const {type, labelName} = route.params;

  const [isAddReminderModalOpen, setIsAddReminderModalOpen] =
    useState<boolean>(false);

  const [isEditReminderModalOpen, setIsEditReminderModalOpen] =
    useState<boolean>(false);

  const [reminder, setReminder] = useState<string | undefined>(undefined);

  const handleModalClose = () => {
    setIsAddReminderModalOpen(false);
    setIsEditReminderModalOpen(false);
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: theme === 'dark' ? '#333' : '#f4f4f4'},
      ]}>
      <View style={styles.container}>
        <NoteHeader setIsAddReminderModalOpen={setIsAddReminderModalOpen} />
        {type !== 'draw' ? (
          <ScrollView style={styles.scrollContainer}>
            {type === 'image' ? (
              <NoteImageBody
                labelName={labelName}
                existingNote={undefined}
                addNote={note =>
                  labelName
                    ? handleAddNoteToLabel(note, labelName)
                    : handleAddNote(note)
                }
                pNote={null}
              />
            ) : type === 'note' ? (
              <NoteBody
                labelName={labelName}
                reminder={reminder}
                existingNote={undefined}
                setIsEditReminderModalOpen={setIsEditReminderModalOpen}
                addNote={note =>
                  labelName
                    ? handleAddNoteToLabel(note, labelName)
                    : handleAddNote(note)
                }
                pNote={null}
              />
            ) : (
              <NoteListBody
                labelName={labelName}
                existingNote={undefined}
                addNote={note =>
                  labelName
                    ? handleAddNoteToLabel(note, labelName)
                    : handleAddNote(note)
                }
                pNote={null}
              />
            )}
          </ScrollView>
        ) : (
          <NoteDrawBody
            labelName={labelName}
            existingNote={undefined}
            addNote={note =>
              labelName
                ? handleAddNoteToLabel(note, labelName)
                : handleAddNote(note)
            }
            pNote={null}
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

export default NewNote;
