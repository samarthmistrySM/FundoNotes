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
import ThemeContext from '../../context/ThemeContext.tsx';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  const {theme} = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (e) {
      if (e instanceof Error) {
        Alert.alert('Login Failed', e.message);
      } else {
        Alert.alert('Login Failed', 'An unknown error occurred');
      }
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {backgroundColor: theme === 'dark' ? '#333' : '#fff'},
      ]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/google-keep.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <Text
          style={[
            styles.titleText,
            {color: theme === 'dark' ? '#fff' : '#333'},
          ]}>
          Sign in
        </Text>
        <Text
          style={[
            styles.subtitleText,
            {color: theme === 'dark' ? '#999' : '#fff'},
          ]}>
          with your Google Keep Account
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input,{color: theme === 'dark' ? '#fff' : '#333'}]}
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
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={theme === 'dark' ? '#999' : '#999'}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity onPress={() => navigation?.navigate('Register')}>
            <Text style={styles.createAccountText}>Create account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.nextButton}>
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
    fontWeight: 400,
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
    fontWeight: 500,
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

export default Login;
