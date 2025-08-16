import React from 'react';
import { View, StyleSheet} from 'react-native';

export default function Espacador() {
  return (
    <View style={styles.footer}>
       
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 150
  }
});
