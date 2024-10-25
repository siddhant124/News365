/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../constants/Colors';
import {ArrowLongLeftIcon} from 'react-native-heroicons/solid';
import {auth} from '../../config/FirebaseConfig';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

export default function SignUpScreen({navigation}: {navigation: any}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isUserCreating, setIsUserCreating] = useState(false);

  const handleNewUserSignUp = () => {
    console.log('first', userEmail, userPassword, userName);
    setIsUserCreating(true);
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(userCredential => {
        const user = userCredential.user;
        // Set the display name (username) for the user
        return updateProfile(user, {
          displayName: userName,
        });
      })
      .then(() => {
        console.log('User registered with username:', userName);
        navigation.navigate('DashboardTabNavigation');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.warn('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          console.warn('That email address is invalid!');
        } else {
          console.warn('error', error);
        }
      })
      .finally(() => setIsUserCreating(false));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
        style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLongLeftIcon color={'#000'} style={{padding: 16}} />
          </TouchableOpacity>

          <Text style={styles.headerText}>Create New Account</Text>

          {/* User Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Full Name</Text>
            <TextInput
              inputMode="text"
              style={styles.input}
              placeholder="Enter Full Name"
              onChangeText={event => setUserName(event)}
            />
          </View>

          {/* User Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              keyboardType="email-address"
              style={styles.input}
              placeholder="Enter Email"
              onChangeText={event => setUserEmail(event)}
            />
          </View>

          {/* User Password */}
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Enter Password"
              onChangeText={event => setUserPassword(event)}
            />
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={{paddingBottom: '5%'}}>
          {/* Padding for spacing at bottom */}
          {/* Create Account Button */}
          <TouchableOpacity
            activeOpacity={isUserCreating ? 1 : 0.6}
            style={[
              styles.buttonStyle,
              {backgroundColor: isUserCreating ? 'grey' : Colors.PRIMARY},
            ]}
            onPress={() => !isUserCreating && handleNewUserSignUp()}>
            <Text style={styles.buttonTextStyle}>
              {isUserCreating ? 'CREATING...' : 'CREATE ACCOUNT'}
            </Text>
          </TouchableOpacity>
          {/* Go to Login screen */}
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('LoginScreen')}
            style={[styles.buttonStyle, styles.signInButton]}>
            <Text style={[styles.buttonTextStyle, styles.signInText]}>
              {'Already have account?\nLOGIN'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 30,
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  headerText: {
    fontSize: 30,
    paddingTop: 30,
    color: '#000000',
  },
  inputContainer: {
    marginTop: 30,
    gap: 10,
  },
  labelText: {
    marginLeft: 5,
    color: '#000',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.Gray,
    color: Colors.PRIMARY,
  },
  buttonStyle: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: '25%',
  },
  buttonTextStyle: {
    color: Colors.WHITE,
    fontSize: 17,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    marginTop: 20,
  },
  signInText: {
    color: Colors.PRIMARY,
  },
});
