import React, {FC, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthContext from './AuthContext';

interface Props {
  children: React.ReactNode;
}

const AuthState: FC<Props> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        fetchUserData(user.uid);
      } else {
        setIsLoggedIn(false);
        setLoggedUser(null);
      }
    });
    return () => unsubscribe();
  }, [isLoggedIn]);

  const fetchUserData = async (uid: string) => {
    try {
      const userDoc = await firestore().collection('users').doc(uid).get();
      if (userDoc.exists) {
        setLoggedUser(userDoc.data());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const register = async (
    password: string,
    confirmPassword: string,
    firstName: string,
    lastName:string,
    email:string,
    image:string,
  ) : Promise<void> => {
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;
      await firestore().collection('users').doc(user.uid).set({
        firstName,
        lastName,
        email,
        image,
        uid: user.uid,
      });
      setLoggedUser({firstName, lastName, email, image, uid: user.uid});
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  const login = async (email:string,password:string) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      fetchUserData(userCredential.user.uid);
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      setIsLoggedIn(false);
      setLoggedUser(null);
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loggedUser,
        login,
        register,
        handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
