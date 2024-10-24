/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeIcon as HomeIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  GlobeAltIcon as GlobeAltIconOutline,
  UserIcon as UserIconOutline,
} from 'react-native-heroicons/outline';
import {
  HomeIcon,
  BookmarkIcon,
  GlobeAltIcon,
  UserIcon,
} from 'react-native-heroicons/solid';
import BookmarkScreen from '../screens/BookmarkScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {BackHandler} from 'react-native';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator(); // Stack Navigator to wrap the Tab Navigator

// Utility function to get the appropriate icon (solid/outline) based on focus
const getTabBarIcon = (
  focused: boolean,
  SolidIcon: React.ComponentType<any>,
  OutlineIcon: React.ComponentType<any>,
) => {
  const IconComponent = focused ? SolidIcon : OutlineIcon;
  const color = focused ? '#FFF' : '#000';
  return <IconComponent color={color} size={24} />;
};

function DashboardTabs() {
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

  const tabs = [
    {
      name: 'HomeScreen',
      component: HomeScreen,
      label: 'Home',
      solidIcon: HomeIcon,
      outlineIcon: HomeIconOutline,
    },
    {
      name: 'DiscoverScreen',
      component: DiscoverScreen,
      label: 'Discover',
      solidIcon: GlobeAltIcon,
      outlineIcon: GlobeAltIconOutline,
    },
    {
      name: 'BookmarkScreen',
      component: BookmarkScreen,
      label: 'Bookmark',
      solidIcon: BookmarkIcon,
      outlineIcon: BookmarkIconOutline,
    },
    {
      name: 'ProfileScreen',
      component: ProfileScreen,
      label: 'Profile',
      solidIcon: UserIcon,
      outlineIcon: UserIconOutline,
    },
  ];

  return (
    <Tab.Navigator
      activeColor="#000"
      inactiveColor="#000"
      labeled={false}
      activeIndicatorStyle={{backgroundColor: '#0B86E7'}}
      barStyle={{
        backgroundColor: 'white',
        alignContent: 'center',
        height: 60,
        paddingBottom: 5,
      }}
      initialRouteName="HomeScreen">
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: ({focused}) =>
              getTabBarIcon(focused, tab.solidIcon, tab.outlineIcon),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default function DashboardTabNavigation() {
  return (
    <Stack.Navigator>
      {/* The Tab Navigator with the multiple tabs */}
      <Stack.Screen
        name="DashboardTabs"
        component={DashboardTabs}
        options={{headerShown: false}} // Hide the header for the tab navigator
      />

      {/* The shared screen that any tab can access */}
      <Stack.Screen
        name="NewsDetailsScreen"
        component={NewsDetailsScreen}
        options={{
          headerShown: false,
          statusBarColor: 'rgba(0,0,0,0)', // Ensures no background color
          statusBarStyle: 'dark',
        }}
      />
    </Stack.Navigator>
  );
}
