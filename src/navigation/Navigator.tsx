import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import AuthNavigator from './AuthStack.tsx';
import AuthContext from '../context/AuthContext.tsx';
import StackNavigator from './StackNavigator.tsx';

const Navigator = () => {
  const {isLoggedIn} = useContext(AuthContext);
  return (
    <NavigationContainer>
      {isLoggedIn ? <StackNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
