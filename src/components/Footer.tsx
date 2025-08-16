import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Linking } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons'; // ícones do Expo (se estiver usando)

export default function Footer() {
  return (
    <View style={styles.footer}>
        <View style={styles.redes}>

      <TouchableOpacity
        onPress={() => Linking.openURL('https://wa.me/258833072296')}
        style={styles.button}
        >
        <FontAwesome name="whatsapp" size={20} color="#25D366" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Linking.openURL('https://mauro-assis-cumbane.vercel.app')}
        style={styles.button}
        >
        <FontAwesome name="chrome" size={20} color="orange" />
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => Linking.openURL('https://wa.me/258833072296')}
        style={styles.button}
        >
        <FontAwesome name="twitter" size={20} color="#DA1F2" />
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => Linking.openURL('https://facebook.com/')}
        style={styles.button}
        >
            <FontAwesome name="facebook" size={20} color="#1877F2" />
      </TouchableOpacity>
          </View>
      <Text style={styles.text}> © 2025. bay <Text style={styles.nome}>Mauro De Assis </Text> </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    paddingVertical: 0,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding:0,
    maxHeight:60
    
  },
  redes:{
    flexDirection:'row',
    justifyContent:'center'
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  text: {
    textAlign:'center',
    color:'#ccc'
  },
  nome:{
    color:'#1877F2'
  }
});
