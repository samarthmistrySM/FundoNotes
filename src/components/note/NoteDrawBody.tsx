import React, {FC, useRef, useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SketchCanvas} from '@sourcetoad/react-native-sketch-canvas';
import RNFS from 'react-native-fs';
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

const NoteDrawBody: FC<Props> = ({addNote, labelName, existingNote}) => {
  const {theme} = useContext(ThemeContext);
  const canvasRef = useRef<SketchCanvas>(null);
  const [title, setTitle] = useState(existingNote ? existingNote.title : '');
  const [pathData, setPathData] = useState<any[]>(
    existingNote?.type === 'draw' ? existingNote.path : [],
  );
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  useEffect(() => {
    if (canvasRef.current && pathData.length > 0) {
      pathData.forEach(stroke => {
        canvasRef.current?.addPath(stroke);
      });
    }
  }, [pathData]);

  const handleStrokeEnd = (path: any) => {
    setPathData(prevPaths => [...prevPaths, path]);
  };

  const handleAdd = async (): Promise<void> => {
    if (!canvasRef.current) {
      return;
    }

    try {
      const base64: string = await new Promise((resolve, reject) => {
        canvasRef.current?.getBase64(
          'png',
          false,
          false,
          false,
          false,
          (err?: any, result?: string) => {
            if (err) {
              reject(err);
            } else if (result) {
              resolve(result);
            } else {
              reject(new Error('No result received'));
            }
          },
        );
      });

      const timestamp = Date.now();
      const fileName = `draw_${timestamp}.png`;
      const filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.writeFile(filePath, base64, 'base64');
      console.log('Image saved to:', filePath);

      const note: Note = {
        id: existingNote ? existingNote.id : timestamp.toString(),
        title: title,
        image: filePath,
        path: pathData,
        type: 'draw',
      };
      if (labelName) {
        const labelNote: Note = {
          id: existingNote ? existingNote.id : timestamp.toString(),
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
    } catch (error) {
      console.error('Error saving the image:', error);
    }
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
      <SketchCanvas
        ref={canvasRef}
        style={styles.canvas}
        strokeColor={'#757575'}
        strokeWidth={3}
        onStrokeEnd={handleStrokeEnd}
      />
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={(): void => {
            canvasRef.current?.clear();
            setPathData([]);
          }}
          style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAdd} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 'bold',
    marginTop: 10,
  },
  canvas: {
    width: '100%',
    flex: 1,
    borderColor: '#007bff',
    borderWidth: 0.5,
    borderRadius: 12,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 10,
  },
  saveButton: {
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

export default NoteDrawBody;
