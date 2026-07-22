import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

const AccountScreen = () => {
  const [accountInfo, setAccountInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      const response = await api.get('/broker/account-info');
      setAccountInfo(response.data);
    } catch (error) {
      console.error('Error fetching account info:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchAccountInfo();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Account Information</Text>
      </View>

      {accountInfo && (
        <>
          {/* Account Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <MaterialIcons name="account-balance-wallet" size={32} color="#2196F3" />
              <Text style={styles.statBoxLabel}>Balance</Text>
              <Text style={styles.statBoxValue}>${accountInfo.balance?.toFixed(2)}</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialIcons name="trending-up" size={32} color="#4CAF50" />
              <Text style={styles.statBoxLabel}>Equity</Text>
              <Text style={styles.statBoxValue}>${accountInfo.equity?.toFixed(2)}</Text>
            </View>
            <View style={styles.statBox}>
              <MaterialIcons name="show-chart" size={32} color="#FF9800" />
              <Text style={styles.statBoxLabel}>Free Margin</Text>
              <Text style={styles.statBoxValue}>${accountInfo.free_margin?.toFixed(2)}</Text>
            </View>
          </View>

          {/* Account Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Account Details</Text>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Login</Text>
              <Text style={styles.detailValue}>{accountInfo.login}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Server</Text>
              <Text style={styles.detailValue}>{accountInfo.server}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Currency</Text>
              <Text style={styles.detailValue}>{accountInfo.currency}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Margin Used</Text>
              <Text style={styles.detailValue}>${accountInfo.margin?.toFixed(2)}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Margin Level</Text>
              <Text style={styles.detailValue}>{accountInfo.margin_level?.toFixed(2)}%</Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    elevation: 2,
  },
  statBoxLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  statBoxValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  detailsContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default AccountScreen;