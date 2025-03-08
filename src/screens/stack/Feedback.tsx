import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {SFSymbol} from 'react-native-sfsymbols';
import ThemeContext from '../../context/ThemeContext.tsx';

const Feedback = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <SafeAreaView style={[styles.safeArea,{backgroundColor: theme === 'dark' ? '#333' : '#fff'}]}>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <TouchableOpacity style={styles.emailContainer}>
            <Text style={[styles.text,{color: theme === 'dark' ? '#fff' : '#333'}]}>From:</Text>
            <Text style={[styles.text,{color: theme === 'dark' ? '#fff' : '#333'}]}>samarthmistry311@gmail.com</Text>
            <SFSymbol
              name={'chevron.down'}
              color={theme === 'dark' ? '#fff' : '#777'}
              size={15}
            />
          </TouchableOpacity>
          <Text style={[styles.info, styles.text,{color: theme === 'dark' ? '#fff' : '#333'}]}>
            Have feedback? We'd love to hear it, but please don't share
            sensitive information. Have question or legal concerns? Visit the
            Help Centre or contact Support.
          </Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={[styles.radioContainer,{backgroundColor: theme === 'dark' ? '#555' : '#f1f1f1'}]}>
            <View style={styles.leftRadioContainer}>
              <SFSymbol
                name={'checkmark.circle'}
                style={styles.icon}
                size={25}
              />
              <View>
                <Text style={[styles.title,{color: theme === 'dark' ? '#fff' : '#333'}]}>Screenshot</Text>
                <Text style={[styles.secondaryText,{color: theme === 'dark' ? '#4b7bff' : '#0037ca'}]}>Highlight or Hide Info</Text>
              </View>
            </View>
            <Image
              style={styles.image}
              source={require('../../assets/feedback.jpeg')}
            />
          </View>
          <View style={[styles.radioContainer,,{backgroundColor: theme === 'dark' ? '#555' : '#f1f1f1'}]}>
            <View style={styles.leftRadioContainer}>
              <SFSymbol
                name={'circle'}
                style={styles.icon}
                size={25}
              />
              <View>
                <Text style={[styles.title,{color: theme === 'dark' ? '#fff' : '#333'}]}>System logs</Text>
                <Text style={[styles.secondaryText,{color: theme === 'dark' ? '#4b7bff' : '#0037ca'}]}>View</Text>
              </View>
            </View>
            <Image
              style={styles.image}
              source={require('../../assets/feedback.jpeg')}
            />
          </View>
          <View style={styles.dContainer}>
            <View style={styles.radio} />
            <Text style={[styles.text,{color: theme === 'dark' ? '#fff' : '#333'}]}>
              We may email you for more information or updates
            </Text>
          </View>
          <Text style={[styles.disclaimer,{color: theme === 'dark' ? '#fff' : '#333'}]}>
            Some{' '}
            <Text style={[styles.highlight,{color: theme === 'dark' ? '#4b7bff' : '#0037ca'}]}>account and system information</Text>{' '}
            may be sent to Google. We will use it to fix problems and improve
            our services, subject to our
            <Text style={[styles.highlight,{color: theme === 'dark' ? '#4b7bff' : '#0037ca'}]}>Privacy policy</Text> and{' '}
            <Text style={[styles.highlight,{color: theme === 'dark' ? '#4b7bff' : '#0037ca'}]}>Terms of Service</Text>. Go to{' '}
            <Text style={[styles.highlight,{color: theme === 'dark' ? '#4b7bff' : '#0037ca'}]}>Legal Help</Text> to ask for content
            changes for legal reasons.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  upperContainer: {},
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 20,
  },
  info: {
    padding: 20,
  },
  lowerContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  text: {
    color: '#555',
  },
  radioContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 15,
  },
  secondaryText: {
    color: '#0037ca',
  },
  image: {
    width: 50,
    height: 50,
    objectFit: 'cover',
  },
  leftRadioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio: {
    borderColor: '#ccc',
    borderWidth: 1,
    height: 20,
    width: 20,
    marginRight: 10,
  },
  dContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  disclaimer: {
    fontSize: 12,
  },
  highlight: {
    color: '#0037ca',
    textDecorationLine: 'underline',
  },
});

export default Feedback;
