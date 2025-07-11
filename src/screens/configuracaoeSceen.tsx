import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Appearance } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import Footer from '../components/Footer';

const Configuracoes = () => {
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const appVersion = '1.0.0'; // Substitua pela versão real do seu app
  const appName = 'Mhalamhala Plus+'; // Substitua pelo nome real do seu app
  const autor = 'Mauro De Assis';
  const ano = 2025;

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const isDarkMode = theme === 'dark';
  const backgroundColor = isDarkMode ? 'black' : 'white';
  const textColor = isDarkMode ? 'white' : 'black';

  const handleThemeToggle = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* <Text style={[styles.title, { color: textColor }]}>Configurações</Text> */}

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Tema</Text>
        <TouchableOpacity style={styles.themeButton} onPress={handleThemeToggle}>
          <Text style={[styles.themeButtonText, { color: textColor }]}>
            Mudar para {isDarkMode ? 'Claro' : 'Escuro'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Informações do App</Text>
        <Text style={[styles.infoText, { color: textColor }]}>Nome: {appName}</Text>
        <Text style={[styles.infoText, { color: textColor }]}>Versão: {appVersion} - {ano}</Text>
        <Text style={[styles.infoText, { color: textColor }]}>Desenvolvido por: {autor}</Text>
      </View>
       <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    marginLeft:20
  },
  section: {
    marginBottom: 20,
    padding:20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  themeButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  themeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Configuracoes;