import React, {FC, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Note} from '../../types';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigation/types.ts';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  addNote: (note: Note, labelId?: string) => void;
  labelName: string | null;
  existingNote: Note | undefined;
  pNote : Note | null;
}

const NoteImageBody: FC<Props> = ({addNote, labelName, existingNote}) => {
  const [title, setTitle] = useState(existingNote ? existingNote.title : '');
  const {theme} = useContext(ThemeContext);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(
    existingNote?.type === 'image' ? existingNote.image : '',
  );
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  const takePhoto = () => {
    launchCamera(
      {mediaType: 'photo', quality: 1, includeBase64: true},
      async response => {
        if (response.didCancel) {
          console.log('User canceled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response);
          Alert.alert('Camera Error', response.errorCode);
        } else {
          const base64 = response.assets?.[0]?.base64;
          if (base64) {
            try {
              const timestamp = Date.now();
              const fileName = `photo_${timestamp}.png`;
              const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
              await RNFS.writeFile(filePath, base64, 'base64');
              console.log('Photo saved to:', filePath);
              setImage(filePath);
            } catch (error) {
              console.error('Error saving photo:', error);
            }
          } else {
            console.log('No base64 data found');
          }
        }
      },
    )
      .then(r => {
        console.log(r);
      })
      .catch(e => console.log(e));
  };

  const pickImage = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 1, includeBase64: true},
      async response => {
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorCode) {
          console.log('Image Picker Error: ', response.errorMessage);
        } else {
          const base64 = response.assets?.[0]?.base64;
          if (base64) {
            try {
              const timestamp = Date.now();
              const fileName = `image_${timestamp}.png`;
              const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
              await RNFS.writeFile(filePath, base64, 'base64');
              console.log('Image saved to:', filePath);
              setImage(filePath);
            } catch (error) {
              console.error('Error saving image:', error);
            }
          } else {
            console.log('No base64 data found');
          }
        }
      },
    );
  };

  const handleAdd = () => {
    if (title.trim() === '' && description.trim() === '' && image === '') {
      Alert.alert(
        'Empty Note',
        'Please enter a title or description to save the note.',
      );
      return;
    }

    const note: Note = {
      id: existingNote ? existingNote.id : Date.now().toString(),
      title: title,
      description: description,
      type: 'image',
      image: image,
    };
    if (labelName) {
      const labelNote: Note = {
        id: existingNote ? existingNote.id : Date.now().toString(),
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
      {image ? (
        <Image source={{uri: image}} style={styles.imagePreview} />
      ) : (
        <View>
          <TouchableOpacity
            style={[
              styles.imagePicker,
              {backgroundColor: theme === 'dark' ? '#56575c' : '#eaf2ff'},
            ]}
            onPress={takePhoto}>
            <SFSymbol style={styles.plusIcon} name={'camera'} />
            <Text style={styles.imagePickerText}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.imagePicker,
              {backgroundColor: theme === 'dark' ? '#56575c' : '#eaf2ff'},
            ]}
            onPress={pickImage}>
            <SFSymbol style={styles.plusIcon} name={'plus.app'} />
            <Text style={styles.imagePickerText}>Choose Image</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        style={styles.title}
        placeholder="Title"
        placeholderTextColor="#aaa"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.content}
        placeholder="Description"
        placeholderTextColor="#aaa"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleAdd}>
        <Text style={styles.saveButtonText}>Save Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 16,
  },
  imagePicker: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#eaf2ff',
    marginBottom: 15,
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: '#007bff',
    marginRight: 8,
    resizeMode: 'contain',
  },
  imagePickerText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    color: '#333',
  },
  content: {
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 100,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default NoteImageBody;
