import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import TruckRequest from '../screens/TruckRequest';
import Dashboard from '../screens/Dashboard';
import RequestDetails from '../screens/RequestDetails';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007BFF', // Consistent header background color
          },
          headerTintColor: '#fff', // White text for header
          headerTitleStyle: {
            fontWeight: 'bold', // Bold header title
          },
        }}
      >
        {/* Login Screen */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false, // Hide the header for Login screen
          }}
        />

        {/* Register Screen */}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'Create Account', // Custom title for the Register screen
          }}
        />

        {/* Dashboard Screen */}
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Dashboard', // Title for the Dashboard
            headerLeft: null, // Prevent going back to the Login screen
            gestureEnabled: false, // Disable swipe-back gesture
          }}
        />

        {/* Truck Request Screen */}
        <Stack.Screen
          name="TruckRequest"
          component={TruckRequest}
          options={{
            title: 'New Truck Request',
          }}
        />

        {/* Request Details Screen */}
        <Stack.Screen
          name="RequestDetails"
          component={RequestDetails}
          options={{
            title: 'Request Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
