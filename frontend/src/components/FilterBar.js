import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const FilterBar = ({ options, selectedFilter, onFilterChange }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.button,
            selectedFilter === option && styles.activeButton,
          ]}
          onPress={() => onFilterChange(option)}
        >
          <Text
            style={[
              styles.text,
              selectedFilter === option && styles.activeText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#ddd',
    marginHorizontal: 4,
  },
  activeButton: {
    backgroundColor: '#007BFF',
  },
  text: {
    color: '#333',
    fontSize: 14,
  },
  activeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FilterBar;
