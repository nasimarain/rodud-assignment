import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { register } from '../api/auth';
import CustomButton from '../components/CustomButton';
import TextInputField from '../components/TextInputField';
import registerStyles from '../styles/RegisterStyles';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirmation.trim()) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    if (password !== passwordConfirmation) {
      Alert.alert('Validation Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await register({ name, email, password, password_confirmation: passwordConfirmation });
      Alert.alert('Success', response.message || 'Registration successful!');
      navigation.navigate('Login');
    } catch (error) {
      const errorMessage =
        error.response?.data?.errors
          ? Object.values(error.response.data.errors).flat().join('\n')
          : 'Something went wrong. Please try again.';
      Alert.alert('Registration Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={registerStyles.container}>
      <Text style={registerStyles.title}>Register</Text>
      <TextInputField placeholder="Name" value={name} onChangeText={setName} />
      <TextInputField placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInputField placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInputField
        placeholder="Confirm Password"
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        secureTextEntry
      />
      <CustomButton
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={loading}
      />
      <CustomButton
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
        style={registerStyles.backButton}
      />
    </View>
  );
};

export default Register;
