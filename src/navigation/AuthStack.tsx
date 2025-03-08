import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/auth/Login.tsx';
import Register from '../screens/auth/Register.tsx';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Login'} component={Login} />
      <Stack.Screen name={'Register'} component={Register} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
