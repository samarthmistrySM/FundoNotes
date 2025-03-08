import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
  ScrollView,
} from 'react-native';
import ThemeContext from '../../context/ThemeContext.tsx';
import getThemeStyle from '../../styles/ThemeStyle.ts';

const Setting = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const themeStyle = getThemeStyle(theme);
  return (
    <SafeAreaView style={[styles.safeArea, themeStyle.safeArea]}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={[styles.title, themeStyle.title]}>Appearance</Text>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Dark Mode
              </Text>
              <Switch
                trackColor={{false: '#f1f1f1', true: '#81b0ff'}}
                thumbColor={'#fff'}
                ios_backgroundColor={theme === 'light' ? '#f1f1f1' : '#555'}
                onValueChange={toggleTheme}
                value={theme === 'dark'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.title, themeStyle.title]}>
              Display options
            </Text>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Add new items to the bottom
              </Text>
              <Switch
                trackColor={{false: '#f1f1f1', true: '#81b0ff'}}
                thumbColor={ '#fff'}
                ios_backgroundColor={theme === 'light' ? '#f1f1f1' : '#555'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Move ticked items to the bottom
              </Text>
              <Switch
                trackColor={{false: '#f1f1f1', true: '#81b0ff'}}
                thumbColor={'#fff'}
                ios_backgroundColor={theme === 'light' ? '#f1f1f1' : '#555'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Display rich like previews
              </Text>
              <Switch
                trackColor={{false: '#f1f1f1', true: '#81b0ff'}}
                thumbColor={'#fff'}
                ios_backgroundColor={theme === 'light' ? '#f1f1f1' : '#555'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.title, themeStyle.title]}>
              Reminder settings
            </Text>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Morning
              </Text>
              <Text style={[styles.bodyText, themeStyle.bodyText]}>
                08:00
              </Text>
            </View>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Afternoon
              </Text>
              <Text style={[styles.bodyText, themeStyle.bodyText]}>
                13:00
              </Text>
            </View>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Evening
              </Text>
              <Text style={[styles.bodyText, themeStyle.bodyText]}>
                18:00
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.title, themeStyle.title]}>Sharing</Text>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Enable sharing
              </Text>
              <Switch
                trackColor={{false: '#f1f1f1', true: '#81b0ff'}}
                thumbColor={'#fff'}
                ios_backgroundColor={theme === 'light' ? '#f1f1f1' : '#555'}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.title, themeStyle.title]}>Google</Text>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Google app settings
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={[styles.title, themeStyle.title]}>About</Text>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Application version
              </Text>
              <Text style={[styles.bodyText, themeStyle.bodyText]}>
                1.00.00
              </Text>
            </View>
            <View style={styles.innerContainer}>
              <Text style={[styles.headingText, themeStyle.headingText]}>
                Licences
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 20,
  },
  headingText: {
    fontSize: 18,
    fontWeight: '300',
  },
  bodyText: {
    fontSize: 17,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
});

export default Setting;
