import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {SFSymbol} from 'react-native-sfsymbols';
import {NavigationContainer} from '@react-navigation/native';

import NewNote from '../screens/stack/NewNote.tsx';
import UpdateNote from '../screens/stack/UpdateNote.tsx';
import Setting from '../screens/stack/Setting.tsx';
import Feedback from '../screens/stack/Feedback.tsx';
import Help from '../screens/stack/Help.tsx';

import ThemeContext from '../context/ThemeContext.tsx';
import DrawerNavigator from './DrawerNavigator';
import {StackParamList} from './types.ts';
import AuthNavigator from "./AuthStack.tsx";


const Stack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <Stack.Navigator
      initialRouteName={'Main'}
      screenOptions={{
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        headerTitleStyle: {
          fontWeight: 300,
          fontSize: 20,
          color: theme === 'dark' ? '#fff' : '#333',
          shadowOpacity: 0,
        },
        headerStyle: {
          backgroundColor: theme === 'dark' ? '#333' : '#fff',
        },
      }}>
      <Stack.Screen
        name={'Main'}
        component={DrawerNavigator}
        options={{headerShown: false, title: ''}}
      />
      <Stack.Screen
        name={'NewNote'}
        component={NewNote}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'UpdateNote'}
        component={UpdateNote}
        options={{headerShown: false}}
      />
      <Stack.Screen name={'Setting'} component={Setting} />
      <Stack.Screen
        name={'Feedback'}
        component={Feedback}
        options={{
          headerTitle: 'Send Feedback',
          headerRight: () => {
            return (
              <TouchableOpacity>
                <SFSymbol
                  style={{marginRight: 25}}
                  name={'paperplane'}
                  size={25}
                  color={'#'}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name={'Help'} component={Help} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
