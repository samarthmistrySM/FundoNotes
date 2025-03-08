import React, {useContext} from 'react';
import ThemeContext from '../context/ThemeContext.tsx';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer.tsx';
import Home from '../screens/drawer/Home.tsx'
import Reminders from '../screens/drawer/Reminders.tsx';
import Archive from '../screens/drawer/Archive.tsx';
import Bin from '../screens/drawer/Bin.tsx';
import NotesByLabel from '../screens/drawer/NotesByLabel.tsx';
import {DrawerParamList} from './types.ts';
import Labels from '../screens/drawer/Labels.tsx';

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <Drawer.Navigator
      //eslint-disable-next-line react/no-unstable-nested-components
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawer {...props} />
      )}
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontWeight: 300,
          fontSize: 20,
          color: theme === 'dark' ? '#fff' : '#333',
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
        },
      }}>
      <Drawer.Screen name={'Home'} component={Home} />
      <Drawer.Screen name={'Reminders'} component={Reminders} />
      <Drawer.Screen
        name={'CreateLabel'}
        component={Labels}
        options={{
          drawerLabel: 'Create New Label',
          headerShown: true,
          title: 'Edit Label',
        }}
      />
      <Drawer.Screen name={'Archive'} component={Archive} />
      <Drawer.Screen name={'Bin'} component={Bin} />
      <Drawer.Screen
        name="NotesByLabel"
        component={NotesByLabel}
        options={{headerShown: false, drawerItemStyle: {display: 'none'}}}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
