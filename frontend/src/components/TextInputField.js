import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const TextInputField = ({
  value,
  placeholder,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
}) => (
  <TextInput
    style={styles.input}
    value={value}
    placeholder={placeholder}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
  />
);

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
  },
});

export default TextInputField;
