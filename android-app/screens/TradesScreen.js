import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import api from '../services/api';

const TradesScreen = () => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchTrades();
    const interval = setInterval(fetchTrades, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchTrades = async () => {
    try {
      const response = await api.get('/trading/positions');
      setTrades(response.data.positions || []);
    } catch (error) {
      console.error('Error fetching trades:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchTrades();
  };

  const TradeItem = ({ item }) => (
    <View style={styles.tradeCard}>
      <View style={styles.tradeHeader}>
        <View>
          <Text style={styles.tradeSymbol}>{item.symbol}</Text>
          <Text style={styles.tradeTime}>{item.open_price}</Text>
        </View>
        <View
          style={[
            styles.tradeProfitBadge,
            item.profit >= 0
              ? styles.tradeProfitBadgeGreen
              : styles.tradeProfitBadgeRed,
          ]}
        >
          <Text style={styles.tradeProfitText}>${item.profit?.toFixed(2)}</Text>
        </View>
      </View>
      <View style={styles.tradeDetails}>
        <View style={styles.tradeDetail}>
          <Text style={styles.tradeDetailLabel}>Type</Text>
          <Text style={styles.tradeDetailValue}>{item.type}</Text>
        </View>
        <View style={styles.tradeDetail}>
          <Text style={styles.tradeDetailLabel}>Volume</Text>
          <Text style={styles.tradeDetailValue}>{item.volume}</Text>
        </View>
        <View style={styles.tradeDetail}>
          <Text style={styles.tradeDetailLabel}>Status</Text>
          <Text style={styles.tradeDetailValue}>🟢 Open</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Open Trades</Text>
      </View>
      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {trades && trades.length > 0 ? (
          <FlatList
            data={trades}
            keyExtractor={(item) => item.ticket?.toString()}
            renderItem={({ item }) => <TradeItem item={item} />}
            scrollEnabled={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="trending-up" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No open trades</Text>
            <Text style={styles.emptyStateSubtext}>
              Your active trades will appear here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
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
  content: {
    flex: 1,
    padding: 15,
  },
  tradeCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
  },
  tradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tradeSymbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  tradeTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  tradeProfitBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  tradeProfitBadgeGreen: {
    backgroundColor: '#E8F5E9',
  },
  tradeProfitBadgeRed: {
    backgroundColor: '#FFEBEE',
  },
  tradeProfitText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  tradeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  tradeDetail: {
    flex: 1,
  },
  tradeDetailLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 3,
  },
  tradeDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
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

export default TradesScreen;