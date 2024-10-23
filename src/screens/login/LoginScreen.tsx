/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  BackHandler,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../constants/Colors';
import {auth} from '../../config/FirebaseConfig';
import {signInWithEmailAndPassword} from 'firebase/auth';

export default function LoginScreen({navigation}: {navigation: any}) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      if (backPressedOnce) {
        // Exit the app if back is pressed again within 2 seconds
        BackHandler.exitApp();
        return true;
      } else {
        // Show toast and set backPressedOnce to true
        console.warn('Press again to exit');
        setBackPressedOnce(true);

        // Reset backPressedOnce after 2 seconds
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true; // Prevent the default back button behavior
      }
    };

    // Adding the back press event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup: Remove the event listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [backPressedOnce]);

  const handleUserLogin = () => {
    console.log('first', userEmail, userPassword);
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(() => {
        navigation.navigate('DashboardTabNavigation');
        console.warn('user LoggedIn successfully');
      })
      .catch(error => {
        let errorMessage = '';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'The email address is badly formatted.';
            break;
          case 'auth/invalid-credential':
            errorMessage = 'Invalid credential';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This user account has been disabled.';
            break;
          case 'auth/user-not-found':
            errorMessage =
              'No user found with this email. Please check or sign up.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/too-many-requests':
            errorMessage =
              'Too many unsuccessful login attempts. Please try again later.';
            break;
          default:
            errorMessage =
              'An unknown error occurred. Please try again.' + error.code;
            break;
        }
        console.warn('Login failed:', errorMessage);
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
        <Text style={styles.headerText}>Let's Sign you in</Text>

        <Text style={styles.subHeaderText}>Welcome back</Text>

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
        {/* Sign In Button */}
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.buttonStyle,
            {
              backgroundColor: Colors.PRIMARY,
            },
          ]}
          onPress={() => handleUserLogin()}>
          <Text style={styles.buttonTextStyle}>Sign In</Text>
        </TouchableOpacity>

        {/* Go to Sign Up screen */}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.navigate('SignUpScreen');
          }}
          style={[styles.buttonStyle, styles.signUpButton]}>
          <Text style={[styles.buttonTextStyle, styles.signUpText]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  headerText: {
    fontSize: 30,
    paddingTop: 30,
    color: '#000000',
  },
  subHeaderText: {
    fontSize: 30,
    color: Colors.Gray,
    marginTop: 10,
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
  },
  signUpButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    marginTop: 20,
  },
  signUpText: {
    color: Colors.PRIMARY,
  },
});
