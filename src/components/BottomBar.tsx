import React, {FC, useContext, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../navigation/types.ts';
import {NavigationProp} from '@react-navigation/native';
import ImageModal from './modals/ImageModal.tsx';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../context/ThemeContext.tsx';

interface Props {
  labelName: string | null;
}

const BottomBar: FC<Props> = ({labelName}) => {
  const {theme} = useContext(ThemeContext);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsImageModalOpen(false);
  };
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#555' : '#fff'},
      ]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('NewNote', {type: 'note', labelName: labelName})
        }>
        <SFSymbol
          style={styles.icon}
          name={'character'}
          color={theme === 'dark' ? '#fff' : '#777'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('NewNote', {type: 'list', labelName: labelName})
        }>
        <SFSymbol
          style={styles.icon}
          name={'plus.square'}
          color={theme === 'dark' ? '#fff' : '#777'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('NewNote', {type: 'draw', labelName: labelName})
        }>
        <SFSymbol
          style={styles.icon}
          name={'paintbrush.pointed'}
          color={theme === 'dark' ? '#fff' : '#777'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsImageModalOpen(true)}>
        <SFSymbol
          style={styles.icon}
          name={'photo'}
          color={theme === 'dark' ? '#fff' : '#777'}
        />
      </TouchableOpacity>

      <View
        style={[
          styles.floatingButton,
          theme === 'dark'
            ? {backgroundColor: '#555', borderColor: '#333'}
            : {backgroundColor: '#fff', borderColor: '#f4f4f4'},
        ]}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('NewNote', {type: 'note', labelName: labelName})
          }>
          <Image
            source={require('../assets/sheets-blank-googlecolors-removebg-preview.png')}
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>
      <ImageModal
        navigation={navigation}
        isModalOpen={isImageModalOpen}
        handleModalClose={handleModalClose}
        labelName={labelName}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: 80,
    marginBottom: -35,
    paddingHorizontal: 16,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,
    marginHorizontal: 10,
  },
  floatingButton: {
    position: 'absolute',
    right: 30,
    top: -35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#f4f4f4',
    borderWidth: 5,
  },
  plusIcon: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
});

export default BottomBar;
