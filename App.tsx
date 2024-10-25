/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActivityIndicator, Text, View, StyleSheet} from 'react-native';
import LoginScreen from './src/screens/login/LoginScreen';
import SignUpScreen from './src/screens/login/SignUpScreen';
import {auth} from './src/config/FirebaseConfig';
import DashboardTabNavigation from './src/navigation/DashboardStackNavigation';
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const [isInternetAvailable, setIsInternetAvailable] = useState(true);

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
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetAvailable(state?.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

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
    <Provider store={store}>
      <SafeAreaView style={{flex: 1}}>
        {!isInternetAvailable && (
          <View style={styles.notificationBanner}>
            <Text style={styles.bannerText}>No Internet Connection</Text>
          </View>
        )}
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {userDetails ? (
              <Stack.Screen
                name="DashboardTabNavigation"
                component={DashboardTabNavigation}
              />
            ) : (
              <>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

export default App;

// Styles for the notification banner
const styles = StyleSheet.create({
  notificationBanner: {
    backgroundColor: '#ff3b30', // Red color for alert
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1, // Ensure it appears on top of other components
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
