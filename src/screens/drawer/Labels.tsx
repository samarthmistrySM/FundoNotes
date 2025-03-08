import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {SFSymbol} from 'react-native-sfsymbols';
import NoteContext from '../../context/NoteContext.tsx';
import {Label} from '../../types.ts';
import ThemeContext from '../../context/ThemeContext.tsx';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {DrawerParamList} from '../../navigation/types.ts';

const Labels = () => {
  const {labels, handleAddLabels} = useContext(NoteContext);
  const [newLabel, setNewLabel] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  const addLabel = () => {
    if (newLabel.trim()) {
      handleAddLabels(newLabel);
      setNewLabel('');
      setIsEditing(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#333' : '#F8F9FA'},
      ]}>
      <TouchableOpacity
        style={styles.createLabelButton}
        onPress={() => setIsEditing(true)}>
        <SFSymbol style={styles.icon} name={'plus.app'} color={'#fff'} />
        <Text style={styles.createLabelText}>Create new label</Text>
      </TouchableOpacity>

      {isEditing && (
        <View
          style={[
            styles.inputContainer,
            {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
          ]}>
          <TouchableOpacity>
            <SFSymbol style={styles.icon} name={'trash'} color={'#DC3545'} />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, {color: theme === 'dark' ? '#fff' : '#333'}]}
            placeholder="Enter label name"
            value={newLabel}
            onChangeText={setNewLabel}
            placeholderTextColor={'gray'}
          />
          <TouchableOpacity onPress={addLabel}>
            <SFSymbol
              style={styles.icon}
              name={'checkmark.square.fill'}
              color={'#28A745'}
            />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView>
        {labels.map((item: Label) => (
          <View
            key={item.id}
            style={[
              styles.labelContainer,
              {backgroundColor: theme === 'dark' ? '#555' : '#fff'},
            ]}>
            <TouchableOpacity
              style={styles.info}
              onPress={() =>
                navigation.navigate('NotesByLabel', {label: item})
              }>
              <SFSymbol style={styles.icon} name={'tag'} color={'#007BFF'} />
              <Text
                style={[
                  styles.labelText,
                  {color: theme === 'dark' ? '#fff' : '#333'},
                ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <SFSymbol style={styles.icon} name={'trash'} color={'#FFA500'} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  createLabelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  createLabelText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
    color: 'black',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  labelText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: 'black',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
  },
});

export default Labels;
