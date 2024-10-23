/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, View} from 'react-native';
import LoginScreen from './src/screens/login/LoginScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';
import {auth} from './src/config/FirebaseConfig';
import DashboardTabNavigation from './src/navigation/DashboardStackNavigation';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUserDetails(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    // Show a loading indicator while Firebase is determining the auth state
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userDetails ? (
          // If the user is logged in, navigate to the Dashboard
          <Stack.Screen
            name="DashboardTabNavigation"
            component={DashboardTabNavigation}
          />
        ) : (
          // Otherwise, navigate to the login screens
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
