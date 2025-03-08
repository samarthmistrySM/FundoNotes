import React, {FC, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

interface Props {
  setIsAddReminderModalOpen: (value: boolean) => void;
}

const NoteHeader: FC<Props> = ({setIsAddReminderModalOpen}) => {
  const navigation = useNavigation();
  const {theme} = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <SFSymbol
          style={styles.icon}
          name="chevron.backward"
          color={theme === 'dark' ? '#fff' : '#777'}
        />
      </TouchableOpacity>
      <View style={styles.iconContainer}>
        <SFSymbol
          style={styles.icon}
          name="pin"
          color={theme === 'dark' ? '#fff' : '#777'}
        />
        <TouchableOpacity onPress={() => setIsAddReminderModalOpen(true)}>
          <SFSymbol
            style={styles.icon}
            name="bell"
            color={theme === 'dark' ? '#fff' : '#777'}
          />
        </TouchableOpacity>
        <SFSymbol
          style={styles.icon}
          name="archivebox"
          color={theme === 'dark' ? '#fff' : '#777'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 22,
    height: 22,
    objectFit: 'contain',
    tintColor: '#333',
    marginRight: 25,
  },
});

export default NoteHeader;
