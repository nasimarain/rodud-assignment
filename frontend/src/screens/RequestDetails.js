import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { fetchRequestDetails } from '../api/truckRequest'; // Import the API function

const RequestDetails = ({ route }) => {
  const { requestId } = route.params; // Pass the request ID from navigation
  const [requestDetails, setRequestDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetails = async () => {
    try {
      const details = await fetchRequestDetails(requestId); // Use the API function
      setRequestDetails(details);
    } catch (error) {
      Alert.alert('Error', 'Failed to load request details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Loading Request Details...</Text>
      </View>
    );
  }

  if (!requestDetails) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No details found for this request.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Request Details</Text>

      {/* Status */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{requestDetails.status}</Text>
      </View>

      {/* Pickup Location */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Pickup Location:</Text>
        <Text style={styles.value}>{requestDetails.pickup_location}</Text>
      </View>

      {/* Delivery Location */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Delivery Location:</Text>
        <Text style={styles.value}>{requestDetails.delivery_location}</Text>
      </View>

      {/* Size */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Size:</Text>
        <Text style={styles.value}>{requestDetails.size}</Text>
      </View>

      {/* Weight */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Weight:</Text>
        <Text style={styles.value}>{requestDetails.weight} kg</Text>
      </View>

      {/* Pickup Time */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Pickup Time:</Text>
        <Text style={styles.value}>
          {new Date(requestDetails.pickup_time).toLocaleString()}
        </Text>
      </View>

      {/* Delivery Time */}
      <View style={styles.detailBox}>
        <Text style={styles.label}>Delivery Time:</Text>
        <Text style={styles.value}>
          {new Date(requestDetails.delivery_time).toLocaleString()}
        </Text>
      </View>

      {/* User Details */}
      {requestDetails.user && (
        <View style={styles.detailBox}>
          <Text style={styles.label}>Requested By:</Text>
          <Text style={styles.value}>{requestDetails.user.name}</Text>
          <Text style={styles.value}>{requestDetails.user.email}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailBox: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
});

export default RequestDetails;
