import React, {FC, useContext} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  checked: boolean;
  onToggle: () => void;
}

const ListItem: FC<Props> = ({
  onChangeText,
  value,
  placeholder,
  checked,
  onToggle,
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        {checked && <View style={styles.checked} />}
      </TouchableOpacity>
      <TextInput
        style={[styles.input, {color: theme === 'dark' ? '#fff' : '#333'}]}
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
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
  input: {
    flex: 1,
    fontSize: 15,
    color: '#000',
    paddingTop: 0,
    textAlignVertical: 'top',
  },
});

export default ListItem;
