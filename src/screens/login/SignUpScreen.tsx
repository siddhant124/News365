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
import {createUserWithEmailAndPassword} from 'firebase/auth';

export default function SignUpScreen({navigation}: {navigation: any}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleNewUserSignUp = () => {
    console.log('first', userEmail, userPassword, userName);
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(() => {
        navigation.navigate('DashboardTabNavigation');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.warn('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.warn('That email address is invalid!');
        }
        console.warn('error', error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLongLeftIcon
            color={'#000'}
            style={{
              padding: 16,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create New Account</Text>

        {/* User Full Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Full Name</Text>
          <TextInput
            inputMode="text"
            style={styles.input}
            placeholder="Enter Full Name"
            onChangeText={event => {
              setUserName(event);
            }}
          />
        </View>

        {/* User Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="Enter Email"
            onChangeText={event => {
              setUserEmail(event);
            }}
          />
        </View>

        {/* User Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Enter Password"
            onChangeText={event => {
              setUserPassword(event);
            }}
          />
        </View>
      </ScrollView>
      <View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 24,
        }}>
        {/* Create Account Button */}
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.buttonStyle, {backgroundColor: Colors.PRIMARY}]}
          onPress={() => {
            handleNewUserSignUp();
          }}>
          <Text style={styles.buttonTextStyle}>Create Account</Text>
        </TouchableOpacity>

        {/* Go to Login screen */}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          style={[styles.buttonStyle, styles.signInButton]}>
          <Text style={[styles.buttonTextStyle, styles.signInText]}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 30,
    backgroundColor: Colors.WHITE,
    height: '100%',
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
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: '25%',
  },
  buttonTextStyle: {
    color: Colors.WHITE,
    fontSize: 17,
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