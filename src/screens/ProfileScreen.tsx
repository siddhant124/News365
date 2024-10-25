/* eslint-disable react-native/no-inline-styles */
import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {Colors} from '../constants/Colors';
import {signOut} from 'firebase/auth';
import {auth} from '../config/FirebaseConfig';
import {View} from 'react-native';

export default function ProfileScreen({navigation}: {navigation: any}) {
  const [username, setusername] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.warn('Logged out successfully');
        navigation.navigate('LoginScreen');
      })
      .catch(error => console.error('error while logging out', error));
  };

  const fetchUsername = () => {
    const user = auth.currentUser;
    if (user) {
      console.log('Username:', user.displayName);
      setusername(user.displayName ?? '');
      setUserEmail(user?.email ?? '');
    } else {
      console.log('No user is signed in.');
      return null;
    }
  };

  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <View style={{flex: 1, paddingHorizontal: 24, paddingTop: 40}}>
        {/* Name Initials */}
        <View
          style={{
            backgroundColor: '#EAEAEA',
            height: 130,
            width: 130,
            marginBottom: 15,
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 65,
            justifyContent: 'center',
            shadowColor: '#0B86E7',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
          }}>
          <Text style={{fontSize: 60, fontWeight: 'bold', color: '#333'}}>
            {username
              .split(' ')
              .map(part => part[0])
              .join('')
              .toUpperCase()}
          </Text>
        </View>

        {/* Username Display */}
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 16, color: '#999'}}>Username</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: '#333',
              marginTop: 5,
            }}>
            {username}
          </Text>
        </View>

        {/* Email Display */}
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text style={{fontSize: 16, color: '#999'}}>Email</Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '600',
              color: '#333',
              marginTop: 5,
            }}>
            {userEmail}
          </Text>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSignOut}
          style={{
            marginTop: 'auto',
            marginBottom: 24,
            alignSelf: 'center',
            width: '90%',
            padding: 15,
            borderRadius: 12,
            backgroundColor: Colors.PRIMARY,
            shadowColor: '#000',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '500',
              color: '#FFF',
              textAlign: 'center',
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
