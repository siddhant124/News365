/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BookmarkScreen from './src/screens/BookmarkScreen';
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

const Tab = createMaterialBottomTabNavigator();

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

function App(): React.JSX.Element {
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
    <NavigationContainer>
      <Tab.Navigator
        activeColor="#000"
        inactiveColor="#000"
        activeIndicatorStyle={{backgroundColor: '#000'}}
        barStyle={{backgroundColor: 'white'}}
        initialRouteName="HomeScreen">
        {tabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarLabel: tab.label,
              tabBarIcon: ({focused}) =>
                getTabBarIcon(focused, tab.solidIcon, tab.outlineIcon),
            }}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
