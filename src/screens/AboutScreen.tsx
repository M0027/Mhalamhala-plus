import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Footer from '../components/Footer';
import { FontAwesome } from '@expo/vector-icons';

type SobreRouteProp = RouteProp<RootStackParamList, 'Sobre'>;

const AboutScreen = () => {


  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Mhalamhala Plus</Text>
        <Text style={styles.description}>
          Um aplicativo de letras de hinos cristãos aprimorado, o Mhalamhala Plus eleva a sua experiência musical e espiritual. Com uma interface limpa e moderna, navegar pelos seus hinos favoritos nunca foi tão fácil e intuitivo.
        </Text>
        <Text style={styles.featureTitle}>Novas Funcionalidades Poderosas:</Text>
        {/* <View style={styles.featureItem}>
          <Text style={styles.featureText}>Adicione Seus Hinos:</Text>
          <Text style={styles.featureDescription}>Expanda sua coleção! Agora você pode adicionar outros hinos que não estão inclusos, personalizando sua experiência de louvor.</Text>
        </View> */}
        <View style={styles.featureItem}>
          <Text style={styles.featureText}>Grave Seus Hinos:</Text>
          <Text style={styles.featureDescription}>Capture a essência de cada hino! A funcionalidade de gravação de áudio permite que você salve suas próprias interpretações.</Text>
        </View>
        <Text style={styles.accessibilityTitle}>Acessibilidade Aprimorada:</Text>
        <Text style={styles.accessibilityDescription}>
          Pensando em todos os usuários, o Mhalamhala Plus oferece recursos que facilitam o uso para pessoas com problemas visuais, garantindo que a beleza dos hinos seja acessível a todos.
        </Text>
        <Text style={styles.accessibilityTitle}>Nota do desenvolvedor do aplicativo:</Text>
        <Text style={styles.accessibilityDescription}>Este aplicativo foi desenvolvido apenas para fim relegioso ( louvor e Adoração a Deus), apelamos o uso com responsabilidade.</Text>
        <Text style={styles.accessibilityDescription}>Os hinos foram retirados do Mhalamhala oficial.</Text>


        <TouchableOpacity
          onPress={() => Linking.openURL('https://mauro-assis-cumbane.vercel.app')}
          style={styles.button}
        >
          {/* <FontAwesome name="chrome" size={20} color="orange" /> */}
          <Text style={styles.autor}>Sobre o autor</Text>
        </TouchableOpacity>
        <Text style={styles.footer}>Mhalamhala Plus - Louvando juntos, de forma inovadora.</Text>
      </View>
      <Footer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // color: 'rgba(255,255,255,.8)',
    color: "#25D366",
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: 'rgba(255,255,255,.8)',
    lineHeight: 24,
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    // color: 'rgba(255,255,255,.8)',
    color: "#25D366",
    marginBottom: 10,
  },
  featureItem: {
    marginBottom: 15,
  },
  featureText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,.8)',
  },
  featureDescription: {
    fontSize: 18,
    color: 'rgba(255,255,255,.8)',
    lineHeight: 22,
  },
  accessibilityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#25D366",
    // color: 'rgba(255,255,255,.8)',
    marginTop: 20,
    marginBottom: 10,
  },
  accessibilityDescription: {
    fontSize: 18,
    color: 'rgba(255,255,255,.8)',
    lineHeight: 24,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 30,
    color: "#fff"
  },
  autor: {
    color: 'skyblue',
    fontSize: 16,
    textDecorationStyle:'solid',
    textDecorationColor: 'blue',
    textDecorationLine:'underline'
  },
  footer: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 60
  },

});

export default AboutScreen;