import React, {FC, useContext} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  isModalOpen: boolean;
  handleModalClose: () => void;
}

const MoreOptionModal: FC<Props> = ({isModalOpen, handleModalClose}) => {
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
              name={'trash'}
              style={styles.icon}
              color={theme === 'dark' ? '#fff' : '#777'}
            />
            <Text
              style={[
                styles.text,
                {color: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <SFSymbol
              name={'square.on.square'}
              style={styles.icon}
              color={theme === 'dark' ? '#fff' : '#777'}
            />
            <Text
              style={[
                styles.text,
                {color: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              Make a copy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <SFSymbol
              name={'square.and.arrow.up'}
              style={styles.icon}
              color={theme === 'dark' ? '#fff' : '#777'}
            />
            <Text
              style={[
                styles.text,
                {color: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <SFSymbol
              name={'square.and.arrow.down'}
              style={styles.icon}
              color={theme === 'dark' ? '#fff' : '#777'}
            />
            <Text
              style={[
                styles.text,
                {color: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              Collaborators
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <SFSymbol
              name={'envelope.front'}
              style={styles.icon}
              color={theme === 'dark' ? '#fff' : '#777'}
            />
            <Text
              style={[
                styles.text,
                {color: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              Labels
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <SFSymbol
              name={'exclamationmark.bubble'}
              style={styles.icon}
              color={theme === 'dark' ? '#fff' : '#777'}
            />
            <Text
              style={[
                styles.text,
                {color: theme === 'dark' ? '#fff' : '#333'},
              ]}>
              Send app feedback
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
    tintColor: '#8a8a8a',
  },
  text: {
    color: '#8a8a8a',
    marginHorizontal: 10,
    fontSize: 16,
  },
});

export default MoreOptionModal;
