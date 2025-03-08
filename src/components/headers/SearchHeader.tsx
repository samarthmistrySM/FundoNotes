import React, {FC, useContext} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import {DrawerParamList} from '../../navigation/types.ts';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';
import AuthContext from '../../context/AuthContext.tsx';

type NavigationProp = DrawerNavigationProp<DrawerParamList>;
interface Props {
  toggleGrid: boolean;
  setToggleGrid: (value: boolean) => void;
  search: string;
  setSearch: (value: string) => void;
  setIsAccountChangeModalOpen: (open: boolean) => void;
}

const SearchHeader: FC<Props> = ({
  toggleGrid,
  setToggleGrid,
  search,
  setSearch,
  setIsAccountChangeModalOpen,
}) => {
  const {loggedUser} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp>();
  const handleToggleGrid = () => {
    setToggleGrid(!toggleGrid);
  };
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#555' : '#fff'},
      ]}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <SFSymbol
          style={styles.icon}
          name="line.3.horizontal"
          color={theme === 'dark' ? '#fff' : '#777'}
          size={25}
        />
      </TouchableOpacity>

      <TextInput
        placeholder="Search your notes"
        placeholderTextColor={theme === 'dark' ? '#999' : '#333'}
        style={[styles.searchInput,{color: theme === 'dark' ? '#fff' : '#333'}]}
        onChangeText={setSearch}
        value={search}
      />

      <View style={styles.headerRight}>
        <TouchableOpacity onPress={handleToggleGrid}>
          <SFSymbol
            style={styles.icon}
            name={toggleGrid ? 'square.grid.2x2' : 'rectangle.grid.1x2'}
            color={theme === 'dark' ? '#fff' : '#777'}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsAccountChangeModalOpen(true)}>
          <Image
            source={{
              uri: loggedUser?.image,
            }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 5,
  },
  icon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginLeft: 15,
  },
});

export default SearchHeader;
