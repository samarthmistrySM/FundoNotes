import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {SFSymbol} from 'react-native-sfsymbols';
import NoteContext from '../context/NoteContext';
import ThemeContext from '../context/ThemeContext';
import getThemeStyle from '../styles/ThemeStyle.ts';

const CustomDrawer = (props: any) => {
  const {state, navigation, descriptors} = props;
  const {labels} = useContext(NoteContext);
  const {theme} = useContext(ThemeContext);

  const themeStyles = getThemeStyle(theme);

  return (
    <View style={[themeStyles.safeArea, {flex: 1}]}>
      <DrawerContentScrollView {...props}>
        <View style={styles.headerContainer}>
          <Text style={[styles.logoText, themeStyles.headingText]}>
            <Text style={{color: '#4285F4'}}>G</Text>
            <Text style={{color: '#EA4335'}}>o</Text>
            <Text style={{color: '#FBBC05'}}>o</Text>
            <Text style={{color: '#34A853'}}>g</Text>
            <Text style={{color: '#4285F4'}}>l</Text>
            <Text style={{color: '#EA4335'}}>e</Text>
            <Text> keep</Text>
          </Text>
        </View>
        <View style={styles.menuContainer}>
          {state.routes.map((route: any, index: number) => {
            const {drawerLabel} = descriptors[route.key].options;
            const label =
              typeof drawerLabel === 'string' ? drawerLabel : route.name;
            const isFocused = state.index === index;

            let icon: string;
            if (route.name === 'Home') {
              icon = 'lightbulb';
            } else if (route.name === 'Reminders') {
              icon = 'bell';
            } else if (route.name === 'CreateLabel') {
              icon = 'plus';
            } else if (route.name === 'Archive') {
              icon = 'archivebox';
            } else if (route.name === 'Bin') {
              icon = 'trash';
            }

            return (
              <View key={route.key}>
                {index !== state.routes.length - 1 && (
                  <DrawerItem
                    onPress={() => navigation.navigate(route.name)}
                    style={[
                      styles.drawerItem,
                      isFocused && styles.activeDrawerItem,
                    ]}
                    icon={({size}) => (
                      <SFSymbol
                        style={{
                          width: size - 5,
                          height: size - 5,
                          marginRight: 10,
                        }}
                        name={icon}
                        color={
                          isFocused
                            ? '#ffffff'
                            : theme === 'dark'
                            ? '#ddd'
                            : '#666'
                        }
                      />
                    )}
                    label={() => (
                      <View style={styles.labelContainer}>
                        <Text
                          style={
                            isFocused
                              ? styles.activeText
                              : [styles.inactiveText, themeStyles.bodyText]
                          }>
                          {label}
                        </Text>
                      </View>
                    )}
                  />
                )}
                {index === 1 && labels.length > 0 && (
                  <View>
                    <View style={styles.dividerContainer}>
                      <View style={styles.sectionDivider} />
                    </View>
                    <Text style={[styles.labelHeader, theme === 'dark' ? {color: '#fff'} : {color: '#000'}]}>Labels</Text>
                    <View style={styles.itemsContainer}>
                      {labels.map(lbl => {
                        const isLabelFocused =
                          state.routes[state.index].name === 'NotesByLabel' &&
                          state.routes[state.index].params?.label?.name ===
                            lbl.name;

                        return (
                          <TouchableOpacity
                            key={lbl.name}
                            style={[
                              styles.item,
                              isLabelFocused && styles.activeDrawerItem,
                            ]}
                            onPress={() =>
                              navigation.navigate('NotesByLabel', {label: lbl})
                            }>
                            <SFSymbol
                              style={styles.icon}
                              name="tag"
                              color={
                                isLabelFocused
                                  ? '#ffffff'
                                  : theme === 'dark'
                                  ? '#ddd'
                                  : '#666'
                              }
                            />
                            <View style={styles.labelContainer}>
                              <Text
                                style={
                                  isLabelFocused
                                    ? styles.activeText
                                    : [
                                        styles.inactiveText,
                                        themeStyles.bodyText,
                                      ]
                                }>
                                {lbl.name}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                )}
                {[labels.length === 0 && 1, 2, 4].includes(index) && (
                  <View style={styles.dividerContainer}>
                    <View style={styles.sectionDivider} />
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <View style={styles.itemsContainer}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Setting')}>
            <SFSymbol
              name="gear"
              style={styles.icon}
              color={theme === 'dark' ? '#ddd' : '#666'}
            />
            <Text style={[styles.bottomText, themeStyles.bodyText]}>
              Settings
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Feedback')}>
            <SFSymbol
              name="exclamationmark.bubble"
              style={styles.icon}
              color={theme === 'dark' ? '#ddd' : '#666'}
            />
            <Text style={[styles.bottomText, themeStyles.bodyText]}>
              Send app feedback
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('Help')}>
            <SFSymbol
              name="questionmark.circle"
              style={styles.icon}
              color={theme === 'dark' ? '#ddd' : '#666'}
            />
            <Text style={[styles.bottomText, themeStyles.bodyText]}>Help</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  logoText: {
    fontSize: 26,
    resizeMode: 'contain',
    color: '#777',
    fontWeight: 500,
  },
  menuContainer: {
    paddingVertical: 10,
  },
  drawerItem: {
    borderRadius: 50,
    marginHorizontal: 10,
  },
  activeDrawerItem: {
    backgroundColor: 'rgba(0,122,255,0.78)',
  },
  activeText: {
    fontSize: 16,
    color: '#fff',
  },
  inactiveText: {
    fontSize: 16,
    color: '#333',
  },
  labelContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dividerContainer: {
    marginLeft: 60,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  labelHeader: {
    paddingHorizontal: 15,
    fontSize: 16,
    marginVertical: 5,
  },
  itemsContainer: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 20,
  },
  bottomText: {
    fontSize: 16,
    color: '#333',
  },
});
