import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/App/HomeScreen';
import CategoriesScreen from '../screens/App/CategoriesScreen';
import ProfileScreen from '../screens/App/ProfileScreen';
import { colors } from '../constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundSecondary,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.foregroundMuted,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'home' : 'home-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Filter"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused ? 'filter' : 'filter-outline';
            return (
              <MaterialDesignIcons name={iconName} size={size} color={color} />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = focused
              ? 'account-cowboy-hat'
              : 'account-cowboy-hat-outline';
            return (
              <MaterialDesignIcons name={iconName} size={size} color={color} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
