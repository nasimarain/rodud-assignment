import React, { useState } from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/TextInputField';
import CustomDatePicker from '../components/CustomDatePicker';
import truckRequestStyles from '../styles/TruckRequestStyles';
import { createTruckRequest } from '../api/truckRequest';

const TruckRequest = ({ navigation }) => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [pickupTime, setPickupTime] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleSubmitRequest = async () => {
    if (!pickupLocation || !deliveryLocation || !size || !weight) {
      Alert.alert('Validation Error', 'Please fill in all fields.');
      return;
    }

    const requestBody = {
      pickup_location: pickupLocation,
      delivery_location: deliveryLocation,
      size: size.toLowerCase(),
      weight: parseInt(weight, 10),
      pickup_time: pickupTime.toISOString(),
      delivery_time: deliveryTime.toISOString(),
    };

    setLoading(true);
    try {
      const response = await createTruckRequest(requestBody);
      Alert.alert('Success', 'Truck request submitted successfully!');
      navigation.navigate('Dashboard');
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
    <ScrollView contentContainerStyle={truckRequestStyles.container}>
      <Text style={truckRequestStyles.title}>Request a Truck</Text>
      <View style={truckRequestStyles.form}>
        <CustomTextInput
          label="Pickup Location"
          placeholder="Enter pickup location"
          value={pickupLocation}
          onChangeText={setPickupLocation}
        />
        <CustomTextInput
          label="Delivery Location"
          placeholder="Enter delivery location"
          value={deliveryLocation}
          onChangeText={setDeliveryLocation}
        />
        <CustomTextInput
          label="Size"
          placeholder="Enter size (Small, Medium, Large)"
          value={size}
          onChangeText={setSize}
        />
        <CustomTextInput
          label="Weight"
          placeholder="Enter weight (e.g., 800)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
        />
        <CustomDatePicker
          label="Pickup Time"
          date={pickupTime}
          onDateChange={setPickupTime}
        />
        <CustomDatePicker
          label="Delivery Time"
          date={deliveryTime}
          onDateChange={setDeliveryTime}
        />
        <CustomButton
          title={loading ? 'Submitting...' : 'Submit Request'}
          onPress={handleSubmitRequest}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
};

export default TruckRequest;
