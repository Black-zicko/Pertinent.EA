import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="trending-up" size={80} color="#2196F3" />
      <Text style={styles.title}>Pertinent.EA</Text>
      <Text style={styles.subtitle}>Universal Trading Bot</Text>
      <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  loader: {
    marginTop: 30,
  },
});

export default SplashScreen;