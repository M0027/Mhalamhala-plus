import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // substitui pela tela Home
    },3000);

    return () => clearTimeout(timer); // limpa o timer se desmontar
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icon.png')} // substitua com o seu ícone
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.paragraph1}>Mhalamhala Plus+</Text>
      <Text style={styles.paragraph2}>By: Mauro 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // fundo preto
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 20,
    // backgroundColor: '#fff'
  },
  paragraph1: {
    color: '#000',
    fontSize: 20,
    marginVertical: 5,
    textAlign: 'center',
  },
  paragraph2: {
    color: 'gold',
    fontSize: 20,
    marginVertical: 5,
    textAlign: 'center',
  },
});
