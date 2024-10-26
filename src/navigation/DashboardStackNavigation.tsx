/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HomeIcon as HomeIconOutline,
  BookmarkIcon as BookmarkIconOutline,
  UserIcon as UserIconOutline,
  GlobeAsiaAustraliaIcon as GlobeAsiaAustraliaIconOutline,
} from 'react-native-heroicons/outline';
import {
  HomeIcon,
  BookmarkIcon,
  UserIcon,
  GlobeAsiaAustraliaIcon,
} from 'react-native-heroicons/solid';
import BookmarkScreen from '../screens/bookmark/BookmarkScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
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
      solidIcon: GlobeAsiaAustraliaIcon,
      outlineIcon: GlobeAsiaAustraliaIconOutline,
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
      activeIndicatorStyle={{backgroundColor: '#0B86E7'}}
      barStyle={{
        backgroundColor: 'white',
        alignContent: 'center',
      }}
      initialRouteName="HomeScreen">
      {tabs.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            title: tab.label,
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
        }}
      />
    </Stack.Navigator>
  );
}
