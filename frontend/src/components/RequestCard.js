import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RequestCard = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Text style={styles.status}>{item.status}</Text>
    <View style={styles.detailRow}>
      <Text style={styles.label}>Pickup:</Text>
      <Text style={styles.value}>{item.pickup_location}</Text>
    </View>
    <View style={styles.detailRow}>
      <Text style={styles.label}>Delivery:</Text>
      <Text style={styles.value}>{item.delivery_location}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RequestCard;
