import React, {FC, useContext} from 'react';
import {View, Modal, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {StackParamList} from '../../navigation/types.ts';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  navigation: NavigationProp<StackParamList>;
  isModalOpen: boolean;
  handleModalClose: () => void;
  labelName: string | null;
}

const ImageModal: FC<Props> = ({
  navigation,
  isModalOpen,
  handleModalClose,
  labelName,
}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <Modal
      visible={isModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleModalClose}>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={handleModalClose}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: theme === 'dark' ? '#333' : '#f4f4f4'},
          ]}
          onStartShouldSetResponder={() => true}>
          <TouchableOpacity style={styles.button}>
            <SFSymbol
              name={'camera'}
              style={styles.icon}
              color={theme === 'dark' ? '#fff' : '#777'}
            />
            <Text
              style={[
                styles.text,
                {color: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              Take Photo
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('NewNote', {
                type: 'image',
                labelName: labelName,
              });
              handleModalClose();
            }}>
            <SFSymbol
              name={'photo'}
              style={styles.icon}
              color={theme === 'dark' ? '#fff' : '#777'}
            />
            <Text
              style={[
                styles.text,
                {color: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              Choose image
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000080',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
    marginHorizontal: 10,
    tintColor: '#333',
  },
  text: {
    color: '#333',
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default ImageModal;
