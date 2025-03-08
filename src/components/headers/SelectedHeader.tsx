import React, {FC, useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import NoteContext from '../../context/NoteContext.tsx';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  setSelectedNotes: (notes: any) => void;
  selectedNotes: string[];
}

const NoteHeader: FC<Props> = ({setSelectedNotes, selectedNotes}) => {
  const {theme} = useContext(ThemeContext);
  const {handleDeleteNotes, handleArchiveNotes} = useContext(NoteContext);

  const handleDelete = () => {
    handleDeleteNotes(selectedNotes);
    setSelectedNotes([]);
  };

  const handleArchive = () => {
    handleArchiveNotes(selectedNotes);
    setSelectedNotes([]);
  };

  const handleCancel = () => {
    setSelectedNotes([]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleCancel()}>
        <SFSymbol
          style={styles.icon}
          name={'chevron.backward'}
          color={theme === 'dark' ? '#fff' : '#777'}
        />
      </TouchableOpacity>
      <Text style={styles.selectCount}>{selectedNotes.length}</Text>
      <View style={styles.iconContainer}>
        <SFSymbol
          style={styles.icon}
          name={'bell'}
          color={theme === 'dark' ? '#fff' : '#777'}
        />
        <TouchableOpacity onPress={handleArchive}>
          <SFSymbol
            style={styles.icon}
            name={'archivebox'}
            color={theme === 'dark' ? '#2ff300' : '#267114'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <SFSymbol
            style={[styles.icon]}
            name={'trash'}
            color={'#ff0000'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 7,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    tintColor: '#333',
    marginRight: 25,
  },
  selectCount: {
    fontSize: 20,
    color: '#007bff',
  },
});

export default NoteHeader;
