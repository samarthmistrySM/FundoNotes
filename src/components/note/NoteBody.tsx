import React, {FC, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Note} from '../../types.ts';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigation/types.ts';
import {NavigationProp} from '@react-navigation/native';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  addNote: (note: Note, labelId?: string) => void;
  reminder: string | undefined;
  setIsEditReminderModalOpen: (value: boolean) => void;
  labelName: string | null;
  existingNote: Note | undefined;
  pNote : Note | null;
}

const NoteBody: FC<Props> = ({
  addNote,
  reminder,
  setIsEditReminderModalOpen,
  labelName,
  existingNote,
    pNote,
}) => {
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const [title, setTitle] = useState(existingNote ? existingNote.title : '');
  const [description, setDescription] = useState(existingNote?.type === 'note' ? existingNote.description : '');

  const handleAdd = () => {
    if (title.trim() === '' && description.trim() === '') {
      Alert.alert(
        'Empty Note',
        'Please enter a title or description to save the note.',
      );
      return;
    }

    // @ts-ignore
    const note: Note = {
      id: existingNote ? existingNote.id : Date.now().toString(),
      title: title,
      description: description,
      type: reminder ? 'reminder' : 'note',
      ...(reminder && {reminder: reminder}),
    };

    if (labelName) {
      const labelNote: Note = {
        id: pNote ? pNote.id : Date.now().toString(),
        type: 'label',
        title: title,
        note: note,
        label: labelName,
      };
      addNote(labelNote, labelName);
    } else {
      addNote(note);
    }
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.title, {color: theme === 'dark' ? '#fff' : '#333'}]}
        placeholder="Title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.content, {color: theme === 'dark' ? '#fff' : '#333'}]}
        placeholder="Description"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      {reminder && (
        <TouchableOpacity
          style={styles.reminderBtn}
          onPress={() => setIsEditReminderModalOpen(true)}>
          <SFSymbol name="alarm" weight="semibold" style={styles.alarmIcon} />
          <Text style={styles.reminderText}>{reminder}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleAdd} style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 15,
    borderRadius: 8,
    color: '#000',
    flex: 1,
    textAlignVertical: 'top',
  },
  reminderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
  },
  alarmIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  reminderText: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NoteBody;
