import React, {FC, useEffect, useCallback, useContext} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {Note} from '../../types';
import {SFSymbol} from 'react-native-sfsymbols';
import notifee from '@notifee/react-native';
import dayjs from 'dayjs';
import ThemeContext from '../../context/ThemeContext.tsx';
import {StackParamList} from '../../navigation/types.ts';
import {NavigationProp, useNavigation} from '@react-navigation/native';

interface Props {
  note: Note;
  toggleGrid: boolean;
  selectedNotes: string[];
  handleLongPress: (id: string) => void;
  labelName: string | null;
  pNote : Note | null;
}

const NoteShowCase: FC<Props> = ({
  note,
  toggleGrid,
  selectedNotes,
  handleLongPress,
  labelName = null,
    pNote = null,
}) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const {theme} = useContext(ThemeContext);
  const onDisplayNotification = useCallback(async () => {
    await notifee.requestPermission();
    await notifee.displayNotification({
      title: note.title,
      body: (note.type === 'reminder' && note.title) || note.title,
      ios: {
        sound: 'default',
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
        },
      },
    });
  }, [note]);

  useEffect(() => {
    if (note.type === 'reminder' && note.reminder) {
      const now = dayjs();
      const reminderTime = dayjs(note.reminder, 'D MMM, HH:mm');
      const delay = reminderTime.diff(now);

      if (delay > 0) {
        const timer = setTimeout(() => {
          console.log('Reminder triggered:', note.reminder);
          onDisplayNotification();
        }, delay);

        return () => clearTimeout(timer);
      }
    }
  }, [note.type, onDisplayNotification]);

  if (note.type === 'label') {
    return (
      <NoteShowCase
        note={note.note}
        toggleGrid={toggleGrid}
        selectedNotes={selectedNotes}
        handleLongPress={handleLongPress}
        labelName={note.label}
        pNote={note}
      />
    );
  }

  return (
    <Pressable
      key={note.id}
      style={({pressed}) => [
        styles.noteItem,
        toggleGrid ? {width: '49%'} : {width: '100%'},
        selectedNotes.includes(note.id) && styles.selectedNote,
        {backgroundColor: theme === 'dark' ? '#555' : '#f4f4f4'},
        {
          backgroundColor: pressed
            ? theme === 'dark'
              ? '#737373'
              : '#D2E6FFFF'
            : theme === 'dark'
            ? '#555'
            : '#fff',
        },
      ]}
      onPress={
        selectedNotes.length !== 0
          ? () => handleLongPress(pNote ? pNote.id : note.id)
          : () => navigation.navigate('UpdateNote', {note, labelName, pNote})
      }
      onLongPress={() => handleLongPress(pNote ? pNote.id : note.id)}>
      <Text
        style={[styles.noteTitle, {color: theme === 'dark' ? '#fff' : '#333'}]}>
        {note.title}
      </Text>
      {note.type === 'note' && (
        <Text style={{color: theme === 'dark' ? '#fff' : '#333'}}>
          {note.description}
        </Text>
      )}
      {note.type === 'list' &&
        note.items.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <View
              style={[
                styles.checkbox,
                {borderColor: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              {item.checked && (
                <View
                  style={[
                    styles.checked,
                    {backgroundColor: theme === 'dark' ? '#fff' : '#333'},
                  ]}
                />
              )}
            </View>
            <Text style={{color: theme === 'dark' ? '#fff' : '#333'}}>
              {item.text}
            </Text>
          </View>
        ))}
      {note.type === 'draw' && (
        <Image
          source={{uri: note.image}}
          style={[styles.image, {resizeMode: 'contain'}]}
        />
      )}
      {note.type === 'image' && (
        <View>
          <Image source={{uri: note.image}} style={styles.image} />
          <Text style={{color: theme === 'dark' ? '#fff' : '#333'}}>
            {note.description}
          </Text>
        </View>
      )}
      {note.type === 'reminder' && (
        <View>
          <Text style={{color: theme === 'dark' ? '#fff' : '#333'}}>
            {note.description}
          </Text>
          <View style={styles.reminder}>
            <SFSymbol name="alarm" weight="semibold" style={styles.alarmIcon} />
            <Text style={{color: theme === 'dark' ? '#fff' : '#333'}}>
              {note.reminder}
            </Text>
          </View>
        </View>
      )}
      {labelName && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelText}>{labelName}</Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  selectedNote: {
    borderColor: '#007bff',
    borderWidth: 1,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#888',
    borderRadius: 2,
  },
  image: {
    borderRadius: 12,
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    marginVertical: 8,
  },
  reminder: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  alarmIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  labelContainer: {
    alignSelf: 'flex-start',
  },
  labelText: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    marginTop: 10,
    textAlign: 'center',
    color: '#fff',
  },
});

export default NoteShowCase;
