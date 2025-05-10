// app/navigation/CustomNavTab.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Text, Platform } from 'react-native';
import { User } from '../components/Login/Users';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Define types
type TabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};

interface NavTabProps {
  user: User;
  onLogout: () => void;
}

const Tab = createBottomTabNavigator<TabParamList>();

// Custom Tab Label Component
const TabLabel = ({ label, focused }: { label: string; focused: boolean }) => (
  <Text style={{
    fontSize: 12,
    color: focused ? '#4285F4' : '#888',
    marginTop: -5,
  }}>
    {label}
  </Text>
);

export default function CustomNavTab({ user, onLogout }: NavTabProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 60,
          paddingBottom: Platform.OS === 'ios' ? 30 : 5,
          paddingTop: Platform.OS === 'ios' ? 10 : 5,
          backgroundColor: '#f8f8f8',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#4285F4',
        tabBarInactiveTintColor: '#888',
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, size }: TabBarIconProps) => (
            <Ionicons
              name="home"
              size={size}
              color={focused ? '#4285F4' : '#888'}
            />
          ),
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <TabLabel label="Home" focused={focused} />
          ),
        }}
      >
        {() => <HomeScreen user={user} onLogout={onLogout} />}
      </Tab.Screen>

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, size }: TabBarIconProps) => (
            <Ionicons
              name="cart"
              size={size}
              color={focused ? '#4285F4' : '#888'}
            />
          ),
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <TabLabel label="Cart" focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, size }: TabBarIconProps) => (
            <MaterialIcons
              name="person"
              size={size}
              color={focused ? '#4285F4' : '#888'}
            />
          ),
          tabBarLabel: ({ focused }: { focused: boolean }) => (
            <TabLabel label="Profile" focused={focused} />
          ),
        }}
      >
        {() => <ProfileScreen user={{...user, name: "ultmill99"}} onClose={() => {}} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}