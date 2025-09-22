import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/App/HomeScreen';
import CategoriesScreen from '../screens/App/CategoriesScreen';
import ProfileScreen from '../screens/App/ProfileScreen';
import { colors } from '../constants/colors';
import Ionicons from '@react-native-vector-icons/ionicons';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { AppStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<AppStackParamList>();

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

const renderHomeIcon = ({ focused, color, size }: TabBarIconProps) => {
  const iconName = focused ? 'home' : 'home-outline';
  return <Ionicons name={iconName} size={size} color={color} />;
};

const renderFilterIcon = ({ focused, color, size }: TabBarIconProps) => {
  const iconName = focused ? 'filter' : 'filter-outline';
  return <MaterialDesignIcons name={iconName} size={size} color={color} />;
};

const renderProfileIcon = ({ focused, color, size }: TabBarIconProps) => {
  const iconName = focused
    ? 'account-cowboy-hat'
    : 'account-cowboy-hat-outline';
  return <MaterialDesignIcons name={iconName} size={size} color={color} />;
};

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
        options={{ tabBarIcon: renderHomeIcon }}
      />
      <Tab.Screen
        name="Filter"
        component={CategoriesScreen}
        options={{ tabBarIcon: renderFilterIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarIcon: renderProfileIcon }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
