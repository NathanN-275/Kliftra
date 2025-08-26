import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LoginScreen';
import ForgotRequestScreen from './ForgotRequestScreen';
import ForgotVerifyScreen from './ForgotVerifyScreen';
import ForgotResetScreen from './ForgotResetScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  ForgotRequest: undefined;
  ForgotVerify: { requestId: string; destination: string };
  ForgotReset: { requestId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgotRequest" component={ForgotRequestScreen} />
        <Stack.Screen name="ForgotVerify" component={ForgotVerifyScreen} />
        <Stack.Screen name="ForgotReset" component={ForgotResetScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
