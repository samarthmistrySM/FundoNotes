import React, {useState, FC, useContext} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import ListItem from './ListItem.tsx';
import {Note} from '../../types.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigation/types.ts';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  addNote: (note: Note, labelId?: string) => void;
  labelName: string | null;
  existingNote: Note | undefined;
  pNote : Note | null;
}

interface ListItemType {
  id: number;
  text: string;
  checked: boolean;
}

const NoteBody: FC<Props> = ({addNote, labelName, existingNote}) => {
  const {theme} = useContext(ThemeContext);
  const [title, setTitle] = useState(existingNote ? existingNote.title : '');
  const [listItems, setListItems] = useState<ListItemType[]>(
    existingNote?.type === 'list'
      ? existingNote.items
      : [{id: 1, text: '', checked: false}],
  );
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const addListItem = () => {
    setListItems([...listItems, {id: Date.now(), text: '', checked: false}]);
  };

  const updateListItem = (id: number, newText: string) => {
    setListItems(
      listItems.map(item => (item.id === id ? {...item, text: newText} : item)),
    );
  };

  const toggleChecked = (id: number) => {
    setListItems(
      listItems.map(item =>
        item.id === id ? {...item, checked: !item.checked} : item,
      ),
    );
  };

  const handleAdd = () => {
    const note: Note = {
      id: existingNote ? existingNote.id : Date.now().toString(),
      title: title.trim(),
      type: 'list',
      items: listItems.map(({id, text, checked}) => ({id, text, checked})),
    };

    if (labelName) {
      const labelNote: Note = {
        id: existingNote ? existingNote.id : Date.now().toString(),
        type: 'label',
        title: title.trim(),
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
      {listItems.map(item => (
        <ListItem
          key={item.id}
          value={item.text}
          placeholder="Enter text"
          onChangeText={(text: string): void => updateListItem(item.id, text)}
          checked={item.checked}
          onToggle={() => toggleChecked(item.id)}
        />
      ))}
      <TouchableOpacity onPress={addListItem} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ List item</Text>
      </TouchableOpacity>
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
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#888',
    fontSize: 15,
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
