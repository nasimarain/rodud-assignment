import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilterBar from '../components/FilterBar';
import SearchBar from '../components/SearchBar';
import RequestCard from '../components/RequestCard';
import { fetchShippingRequests, performLogout } from '../api/dashboard';
import styles from '../styles/DashboardStyles';

const Dashboard = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchRequests = async (pageNumber = 1) => {
    if (loading || !hasNextPage) return;

    setLoading(true);
    try {
      const data = await fetchShippingRequests(pageNumber);
      setRequests((prevRequests) => (pageNumber === 1 ? data.data : [...prevRequests, ...data.data]));
      setPage(data.current_page);
      setHasNextPage(data.current_page < data.last_page);
    } catch (error) {
      Alert.alert('Error', 'Failed to load requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter handler
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Logout handler
  const handleLogout = async () => {
  
    try {
      await performLogout(); 
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      navigation.replace('Login');
    } catch (error) {
      console.error('Logout Error:', error.response?.data || error.message);
      console.error('Logout Failed: An unexpected error occurred.');
    }
  };

  // Load more requests for pagination
  const loadMoreRequests = () => {
    if (hasNextPage && !loading) {
      fetchRequests(page + 1);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter((req) =>
    filter === 'All' ? true : req.status === filter.toLowerCase()
  );

  const searchedRequests = filteredRequests.filter(
    (req) =>
      req.pickup_location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.delivery_location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Requests</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('TruckRequest')}>
        <Text style={styles.addButtonText}>+ Add Truck Request</Text>
      </TouchableOpacity>

      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FilterBar
        options={['All', 'pending', 'in_progress', 'delivered']}
        selectedFilter={filter}
        onFilterChange={setFilter}
      />

      {requests.length > 0 ? (
        <FlatList
          data={searchedRequests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RequestCard
              item={item}
              onPress={() => navigation.navigate('RequestDetails', { requestId: item.id })}
            />
          )}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMoreRequests}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#007BFF" />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No shipping requests found.</Text>
        </View>
      )}
    </View>
  );
};

export default Dashboard;
