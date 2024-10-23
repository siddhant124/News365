/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {Colors} from '../constants/Colors';
import {signOut} from 'firebase/auth';
import {auth} from '../config/FirebaseConfig';

export default function ProfileScreen({navigation}: {navigation: any}) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.warn('Logged out successfully');
        navigation.navigate('LoginScreen');
      })
      .catch(error => console.error('error while logging out', error));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}>
      <Text>ProfileScreen</Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          handleSignOut();
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 15,
          margin: 24,
          alignItems: 'center',
          borderRadius: 15,
          backgroundColor: Colors.WHITE,
          borderWidth: 1,
        }}>
        <Text
          style={{
            fontSize: 17,
            color: Colors.PRIMARY,
          }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
