import React, {FC, useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../navigation/types.ts';
import AuthContext from '../../context/AuthContext.tsx';
import ThemeContext from "../../context/ThemeContext.tsx";

const Register: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {register} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);

  const handleRegister = async () => {
    try {
      await register(
        password,
        confirmPassword,
        firstName,
        lastName,
        email,
        image,
      );
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Login Failed', e.message);
      } else {
        Alert.alert('Login Failed', 'An unknown error occurred');
      }
    }
  };
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
  return (
    <SafeAreaView style={[styles.container,{backgroundColor: theme === 'dark' ? '#333' : '#fff'},]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/google-keep.png')}
            style={styles.logo}
          />
        </View>

        <Text style={[styles.titleText,{color: theme === 'dark' ? '#fff' : '#333'},]}>Create your Google Keep Account</Text>

        <View style={styles.formContainer}>
          <View style={styles.nameContainer}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <TextInput
                  style={[
                    styles.input,
                    {color: theme === 'dark' ? '#fff' : '#999'},
                  ]}
                  placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
                placeholder="First name"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <TextInput
                  style={[
                    styles.input,
                    {color: theme === 'dark' ? '#fff' : '#999'},
                  ]}
                  placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
                placeholder="Last name"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
                style={[
                  styles.input,
                  {color: theme === 'dark' ? '#fff' : '#999'},
                ]}
                placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
                style={[
                  styles.input,
                  {color: theme === 'dark' ? '#fff' : '#999'},
                ]}
                placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
              placeholder="Profile Image"
              value={image}
              onChangeText={setImage}
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.passwordContainer}>
            <View style={[styles.inputContainer, styles.halfInput]}>
              <TextInput
                  style={[
                    styles.input,
                    {color: theme === 'dark' ? '#fff' : '#999'},
                  ]}
                  placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <View style={[styles.inputContainer, styles.halfInput]}>
              <TextInput
                  style={[
                    styles.input,
                    {color: theme === 'dark' ? '#fff' : '#999'},
                  ]}
                  placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
                placeholder="Confirm"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
            </View>
          </View>

          <Text style={[styles.helperText,{color: theme === 'dark' ? '#999' : '#fff'},]}>
            Use 8 or more characters with a mix of letters, numbers & symbols
          </Text>

          <View style={[styles.showPasswordContainer]}>
            <TouchableOpacity style={[styles.checkbox,{borderColor: '#dadce0'}]} />
            <Text style={[styles.showPasswordText,{color: theme === 'dark' ? '#fff' : '#333'},]}>Show password</Text>
          </View>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signInInsteadText}>Sign in instead</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleRegister}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  logo: {
    width: 50,
    height: 50,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#202124',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#5f6368',
    textAlign: 'center',
    marginBottom: 32,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#dadce0',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 4,
  },
  input: {
    fontSize: 16,
    height: 40,
    color: '#202124',
  },
  nameContainer: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginTop: 16,
  },
  helperText: {
    fontSize: 12,
    color: '#5f6368',
    marginTop: 4,
  },
  forgotText: {
    color: '#1a73e8',
    fontSize: 14,
    marginTop: 8,
  },
  createAccountText: {
    color: '#1a73e8',
    fontSize: 14,
  },
  signInInsteadText: {
    color: '#1a73e8',
    fontSize: 14,
  },
  useCurrentEmailText: {
    color: '#1a73e8',
    fontSize: 14,
    marginVertical: 16,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 24,
  },
  nextButton: {
    backgroundColor: '#1a73e8',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  showPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#5f6368',
    borderRadius: 2,
    marginRight: 10,
  },
  showPasswordText: {
    fontSize: 14,
    color: '#5f6368',
  },
});

export default Register;
