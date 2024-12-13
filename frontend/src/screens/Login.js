import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login } from '../api/auth';
import CustomButton from '../components/CustomButton';
import TextInputField from '../components/TextInputField';
import loginStyles from '../styles/LoginStyles';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation Error', 'Email and Password are required');
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      const { token, user } = response.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      Alert.alert('Success', `Welcome, ${user.name}!`);
      navigation.replace('Dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.';
      
      // Handle validation errors if any
      if (error.response?.data?.errors) {
        const validationErrors = error.response.data.errors;
        let validationMessage = '';
        // Iterate over each error and append the message
        Object.keys(validationErrors).forEach(field => {
          validationMessage += `${field}: ${validationErrors[field].join(', ')}\n`;
        });
          Alert.alert('Validation Errors', validationMessage);
      } else {
          Alert.alert('Error', errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>Login</Text>
      <TextInputField
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInputField
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <CustomButton
        title={loading ? 'Logging in...' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      <CustomButton
        title="Register"
        onPress={() => navigation.navigate('Register')}
        style={loginStyles.registerButton}
      />
    </View>
  );
};

export default Login;
