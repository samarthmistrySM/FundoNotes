import React, {FC, useContext, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../navigation/types.ts';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;

interface Props {
  title: string;
  toggleGrid: boolean;
  setToggleGrid: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
}

const ScreenHeader: FC<Props> = ({title, toggleGrid, setToggleGrid, search, setSearch}) => {
  const {theme} = useContext(ThemeContext);
  const [toggleSearch, setToggleSearch] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <SFSymbol
              style={styles.icon}
              name={'line.3.horizontal'}
              color={theme === 'dark' ? '#fff' : '#777'}
          />
        </TouchableOpacity>
        <Text style={[styles.title,{color:theme === 'dark' ? '#fff' : '#777'}]}>{title}</Text>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setToggleSearch(!toggleSearch)}>
            <SFSymbol
                name={'magnifyingglass'}
                color={theme === 'dark' ? '#fff' : '#777'}
                style={styles.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setToggleGrid(!toggleGrid)}>
            <SFSymbol
                name={toggleGrid ? 'rectangle.grid.1x2' : 'square.grid.2x2'}
                color={theme === 'dark' ? '#fff' : '#777'}
                style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {toggleSearch && <TextInput
          style={styles.input}
          placeholder={'Search...'}
          value={search}
          onChangeText={setSearch}
      />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 10,
    marginVertical: 7,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    objectFit: 'contain',
    tintColor: '#333',
    marginLeft:10,
  },
  input:{
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding:15,
    borderRadius:7,
  },
  title: {
    fontSize: 20,
    color: '#333',
  },
});

export default ScreenHeader;
