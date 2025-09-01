import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { db, auth } from '../config/firebase.config';

export const FirebaseTest = () => {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    try {
      // Test if Firebase app is initialized
      if (db && auth) {
        setStatus('✅ Firebase configuration loaded successfully!');
        console.log('Firebase app initialized:', db.app.name);
        console.log('Auth instance created:', !!auth);
      } else {
        setStatus('❌ Firebase configuration failed to load');
      }
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
      console.error('Firebase configuration error:', error);
    }
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>{status}</Text>
    </View>
  );
};
