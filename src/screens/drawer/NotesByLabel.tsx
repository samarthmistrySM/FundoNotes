import React, {useState, FC, useEffect, useContext} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import BottomBar from '../../components/BottomBar.tsx';
import SelectedHeader from '../../components/headers/SelectedHeader.tsx';
import ScreenHeader from '../../components/headers/ScreenHeader.tsx';
import {DrawerParamList} from '../../navigation/types.ts';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {Note} from '../../types.ts';
import NoteShowCase from '../../components/note/NoteShowCase.tsx';
import {
  collection,
  getFirestore,
  getDoc,
  doc,
} from '@react-native-firebase/firestore';
import ThemeContext from '../../context/ThemeContext.tsx';
import AlertContainer from '../../components/AlertContainer.tsx';

type Props = DrawerScreenProps<DrawerParamList, 'NotesByLabel'>;

const NotesByLabel: FC<Props> = ({route}) => {
  const [toggleGrid, setToggleGrid] = useState<boolean>(true);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const {theme} = useContext(ThemeContext);
  const {label} = route.params;
  const [labelNotes, setLabelNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(labelNotes);

  const db = getFirestore();
  const noteCollection = collection(db, 'notes');

  useEffect(() => {
    if (!label?.notes?.length) {
      return;
    }

    const fetchNotes = async () => {
      const fetchedNotes: Note[] = [];

      for (const id of label.notes) {
        const noteSnap = await getDoc(doc(noteCollection, id));
        if (noteSnap) {
          fetchedNotes.push({id: noteSnap.id, ...noteSnap.data()} as Note);
        }
      }

      setLabelNotes(fetchedNotes);
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    setFilteredNotes(
      labelNotes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, labelNotes]);

  const handleLongPress = (id: string) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter(selectedId => selectedId !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: theme === 'dark' ? '#333' : '#f4f4f4'},
      ]}>
      <View style={styles.container}>
        {selectedNotes.length === 0 && (
          <ScreenHeader
            title={label.name}
            toggleGrid={toggleGrid}
            setToggleGrid={setToggleGrid}
            search={search}
            setSearch={setSearch}
          />
        )}
        {selectedNotes.length > 0 && (
          <SelectedHeader
            selectedNotes={selectedNotes}
            setSelectedNotes={setSelectedNotes}
          />
        )}
        <ScrollView
          style={styles.body}
          contentContainerStyle={[
            styles.scrollContent,
            label.notes.length > 0 &&
              filteredNotes.length > 0 && {justifyContent: 'flex-start'},
          ]}>
          {label.notes.length === 0 ? (
            <AlertContainer
              iconName={'tag'}
              alert={'No notes with this label yet'}
            />
          ) : filteredNotes.length === 0 ? (
            <AlertContainer
              iconName={'magnifyingglass'}
              alert={'No matching notes'}
            />
          ) : (
            <View
              style={[
                styles.notesContainer,
                toggleGrid && {
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                },
              ]}>
              {filteredNotes.map((note, index) => (
                <NoteShowCase
                  key={index}
                  note={note}
                  toggleGrid={toggleGrid}
                  selectedNotes={selectedNotes}
                  handleLongPress={handleLongPress}
                  labelName={label.name}
                  pNote={null}
                />
              ))}
            </View>
          )}
        </ScrollView>
        <BottomBar labelName={label.name} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    paddingVertical: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: '#333',
    marginBottom: 20,
  },
  noteText: {
    color: '#333',
    fontSize: 20,
    textAlign: 'center',
  },
  notesContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default NotesByLabel;
