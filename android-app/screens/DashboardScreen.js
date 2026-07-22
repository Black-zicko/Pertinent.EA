import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LineChart } from 'react-native-chart-kit';
import api from '../services/api';

const DashboardScreen = () => {
  const [balance, setBalance] = useState(0);
  const [profit, setProfit] = useState(0);
  const [openTrades, setOpenTrades] = useState(0);
  const [autoTrading, setAutoTrading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const balanceResponse = await api.get('/broker/balance');
      const accountResponse = await api.get('/broker/account-info');
      const positionsResponse = await api.get('/trading/positions');

      setBalance(balanceResponse.data.balance || 0);
      setProfit(accountResponse.data.equity - accountResponse.data.balance || 0);
      setOpenTrades(positionsResponse.data.positions?.length || 0);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
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
        <Text style={styles.headerTitle}>Trading Dashboard</Text>
      </View>

      {/* Auto-Trading Toggle */}
      <View style={styles.autoTradingCard}>
        <View style={styles.autoTradingContent}>
          <MaterialIcons name="robot" size={32} color="#4CAF50" />
          <View style={styles.autoTradingText}>
            <Text style={styles.autoTradingTitle}>Auto Trading</Text>
            <Text style={styles.autoTradingStatus}>
              {autoTrading ? '🟢 Active' : '🔴 Inactive'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.toggleButton, autoTrading && styles.toggleButtonActive]}
          onPress={() => setAutoTrading(!autoTrading)}
        >
          <Text style={styles.toggleText}>{autoTrading ? 'ON' : 'OFF'}</Text>
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, styles.balanceCard]}>
          <MaterialIcons name="account-balance-wallet" size={32} color="white" />
          <Text style={styles.statLabel}>Balance</Text>
          <Text style={styles.statValue}>${balance.toFixed(2)}</Text>
        </View>

        {/* Profit Card */}
        <View
          style={[
            styles.statCard,
            profit >= 0 ? styles.profitCard : styles.lossCard,
          ]}
        >
          <MaterialIcons name="trending-up" size={32} color="white" />
          <Text style={styles.statLabel}>Profit</Text>
          <Text style={styles.statValue}>${profit.toFixed(2)}</Text>
        </View>

        {/* Open Trades Card */}
        <View style={[styles.statCard, styles.tradesCard]}>
          <MaterialIcons name="swap-calls" size={32} color="white" />
          <Text style={styles.statLabel}>Open Trades</Text>
          <Text style={styles.statValue}>{openTrades}</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.actionsContainer}>
        <Text style={styles.actionsTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="add" size={24} color="#2196F3" />
            <Text style={styles.actionButtonText}>New Trade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MaterialIcons name="close" size={24} color="#F44336" />
            <Text style={styles.actionButtonText}>Close All</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activityContainer}>
        <Text style={styles.activityTitle}>Recent Trades</Text>
        <View style={styles.emptyState}>
          <MaterialIcons name="trending-up" size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>No trades yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Enable auto-trading to start trading
          </Text>
        </View>
      </View>
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
  autoTradingCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  autoTradingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  autoTradingText: {
    marginLeft: 15,
  },
  autoTradingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  autoTradingStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  toggleButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F44336',
  },
  toggleButtonActive: {
    backgroundColor: '#4CAF50',
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  balanceCard: {
    backgroundColor: '#2196F3',
  },
  profitCard: {
    backgroundColor: '#4CAF50',
  },
  lossCard: {
    backgroundColor: '#F44336',
  },
  tradesCard: {
    backgroundColor: '#FF9800',
  },
  statLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 8,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  actionsContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  actionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  actionButtonText: {
    marginTop: 8,
    color: '#333',
    fontWeight: '600',
    fontSize: 12,
  },
  activityContainer: {
    marginHorizontal: 15,
    marginBottom: 20,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyState: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 10,
  },
  emptyStateSubtext: {
    fontSize: 12,
    color: '#bbb',
    marginTop: 5,
  },
});

export default DashboardScreen;