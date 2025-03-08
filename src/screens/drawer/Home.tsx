import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import SearchHeader from '../../components/headers/SearchHeader.tsx';
import BottomBar from '../../components/BottomBar.tsx';
import NoteContext from '../../context/NoteContext.tsx';
import SelectedHeader from '../../components/headers/SelectedHeader.tsx';
import NoteShowCase from '../../components/note/NoteShowCase.tsx';
import ThemeContext from '../../context/ThemeContext.tsx';
import {Note} from '../../types.ts';
import AlertContainer from '../../components/AlertContainer.tsx';
import AccountSwitchingModal from '../../components/modals/AccountModal.tsx';

const Home = () => {
  const [toggleGrid, setToggleGrid] = useState<boolean>(true);
  const {notes} = useContext(NoteContext);
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const {theme} = useContext(ThemeContext);
  const [search, setSearch] = useState<string>('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);
  const [isAccountChangeModalOpen, setIsAccountChangeModalOpen] =
    useState<boolean>(false);

  const handleModalClose = () => {
    setIsAccountChangeModalOpen(false);
  };

  const handleLongPress = (id: string) => {
    if (selectedNotes.includes(id)) {
      setSelectedNotes(selectedNotes.filter(selectedId => selectedId !== id));
    } else {
      setSelectedNotes([...selectedNotes, id]);
    }
  };

  useEffect(() => {
    setFilteredNotes(
      notes.filter(note =>
        note.title.toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, notes]);

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {backgroundColor: theme === 'dark' ? '#333' : '#f4f4f4'},
      ]}>
      <View style={styles.container}>
        {selectedNotes.length === 0 && (
          <SearchHeader
            toggleGrid={toggleGrid}
            search={search}
            setSearch={setSearch}
            setToggleGrid={setToggleGrid}
            setIsAccountChangeModalOpen={setIsAccountChangeModalOpen}
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
            notes.length > 0 &&
              filteredNotes.length > 0 && {justifyContent: 'flex-start'},
          ]}>
          {notes.length === 0 ? (
            <AlertContainer
              iconName={'lightbulb'}
              alert={'Notes that you add appear here'}
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
                  labelName={null}
                  pNote={null}
                />
              ))}
            </View>
          )}
        </ScrollView>
        <BottomBar labelName={null} />
        <AccountSwitchingModal
          isModalOpen={isAccountChangeModalOpen}
          handleModalClose={handleModalClose}
        />
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
  notesContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
});

export default Home;
