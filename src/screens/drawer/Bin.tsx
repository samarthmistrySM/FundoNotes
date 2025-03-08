import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BottomBar from '../../components/BottomBar.tsx';
import NoteContext from '../../context/NoteContext.tsx';
import SelectedHeader from '../../components/headers/SelectedHeader.tsx';
import NoteShowCase from '../../components/note/NoteShowCase.tsx';
import ScreenHeader from '../../components/headers/ScreenHeader.tsx';
import ThemeContext from '../../context/ThemeContext.tsx';
import {Note} from '../../types.ts';
import AlertContainer from '../../components/AlertContainer.tsx';

const Bin = () => {
  const [toggleGrid, setToggleGrid] = useState<boolean>(true);
  const {binNotes, handleEmptyBin} = useContext(NoteContext);
  const {theme} = useContext(ThemeContext);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(binNotes);

  const handleLongPress = (id: string) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter(selectedId => selectedId !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };

  useEffect(() => {
    setFilteredNotes(
      binNotes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, binNotes]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: theme === 'dark' ? '#333' : '#f4f4f4'},
      ]}>
      <View style={styles.container}>
        {selectedNotes.length === 0 && (
          <View style={styles.header}>
            <ScreenHeader
              title={'Bin'}
              toggleGrid={toggleGrid}
              setToggleGrid={setToggleGrid}
              search={search}
              setSearch={setSearch}
            />
            <View style={styles.section}>
              <Text
                style={[
                  styles.info,
                  {color: theme === 'dark' ? '#fff' : '#333'},
                ]}>
                Any notes in Bin will be deleted forever after 7 days.
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => handleEmptyBin()}>
                <Text style={styles.btnText}>Empty Recycle Bin</Text>
              </TouchableOpacity>
            </View>
          </View>
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
            binNotes.length > 0 && {justifyContent: 'flex-start'},
          ]}>
          {binNotes.length === 0 ? (
            <AlertContainer
              iconName={'trash'}
              alert={'No notes in Recycle Bin'}
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
              {binNotes.map((note, index) => (
                <NoteShowCase
                  key={index}
                  note={note}
                  toggleGrid={toggleGrid}
                  selectedNotes={selectedNotes}
                  handleLongPress={handleLongPress}
                  labelName={null}
                  pNote={null}
                />
              ))}
            </View>
          )}
        </ScrollView>
        <BottomBar labelName={null} />
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
  },
  header: {
    marginBottom: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  info: {
    width: '50%',
    textAlign: 'left',
    color: '#777',
    fontSize: 16,
  },
  btn: {},
  btnText: {
    color: '#007bff',
    fontWeight: 500,
    fontSize: 16,
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

export default Bin;
