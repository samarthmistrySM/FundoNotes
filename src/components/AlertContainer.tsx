import React, {FC, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../context/ThemeContext.tsx';

interface Props {
  iconName: string;
  alert: string;
}

const AlertContainer: FC<Props> = ({iconName, alert}) => {
  const {theme} = useContext(ThemeContext);
  return (
    <View style={styles.alertContainer}>
      <SFSymbol
        size={100}
        style={styles.icon}
        name={iconName}
        color={theme === 'dark' ? '#999' : '#777'}
      />
      <Text
        style={[styles.noteText, {color: theme === 'dark' ? '#fff' : '#333'}]}>
        {alert}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alertContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    tintColor: '#333',
    marginBottom: 20,
  },
  noteText: {
    color: '#333',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default AlertContainer;
