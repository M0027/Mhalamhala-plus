import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import HinoDetalheScreen from './src/screens/HinoDetalheScreen';
import AdicionarHinoScreem from './src/screens/AdicionarHinoScreem';
import ConfiguracaoeSceen from './src/screens/configuracaoeSceen';
import AboutScreen from './src/screens/AboutScreen';
import ListaHinosSelecionados from './src/screens/ListaHinosSelecionados'
import WelcomeScreen from './src/screens/WelcomeScreen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';


export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  HinoDetalhe: { hino: any };  // parâmetro opcional pra passar o nome do hino
  Configuracoes: undefined;
  AdicionarHino: undefined;
  Sobre: undefined;
  ListaHinosSelecionados: undefined;



};

const titulo = "Letra"

const Stack = createNativeStackNavigator<RootStackParamList>();




export default function App() {



  useEffect(() => {
    // changeNavigationBarColor('#000000', true, true); // estiliza navbar Android
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>

        {/* {Platform.OS === 'android' && <View style={styles.statusBarFake} />}  */}
        <StatusBar style="light" translucent backgroundColor="#25D366" />


        <NavigationContainer>
          <FlashMessage position="top"/>
          <Stack.Navigator initialRouteName="Welcome" id={undefined}>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}

            />

            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            // options={{
            //   title: `${titulo}`, headerTitleStyle: {
            //     fontWeight: 'bold',
            //     color: '#fff',
            //     fontSize: 20
            //   },
            //   headerTintColor: 'rgba( 255,255,255, 0.5)',
            //   headerLargeTitle: true,
            //   headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
            //   headerTransparent: false, // Define o header como não transparente (opcional)
            //   headerStyle: {
            //     backgroundColor: 'black',
            //     // Cor de fundo do header (opcional)
            //   },

            // }}
            />
            <Stack.Screen
              name="HinoDetalhe"
              component={HinoDetalheScreen}
              options={{
                title: `${titulo}`, headerTitleStyle: {
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: 20,
                },
                headerTintColor: 'rgba( 255,255,255, 0.5)',
                headerLargeTitle: true,
                headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
                headerTransparent: false, // Define o header como não transparente (opcional)
                headerStyle: {
                  backgroundColor: 'black',
                  // Cor de fundo do header (opcional)
                },

              }}
            />
            <Stack.Screen
              name="Configuracoes"
              component={ConfiguracaoeSceen}
              options={{
                title: 'Configurações',

                headerTintColor: '#fff',
                headerLargeTitle: true,
                headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
                headerTransparent: false, // Define o header como não transparente (opcional)
                headerStyle: {
                  backgroundColor: 'black', // Cor de fundo do header (opcional)
                },

              }}
            />
            <Stack.Screen
              name="Sobre"
              component={AboutScreen}
              options={{
                title: 'Sobre o aplicativo',

                headerTintColor: '#fff',
                headerLargeTitle: true,
                headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
                headerTransparent: false, // Define o header como não transparente (opcional)
                headerStyle: {
                  backgroundColor: 'black', // Cor de fundo do header (opcional)
                },


              }}
            />

            <Stack.Screen
              name="AdicionarHino"
              component={AdicionarHinoScreem}
              options={{
                title: '+ Adicionar Hino',

                headerTintColor: '#fff',
                headerLargeTitle: true,
                headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
                headerTransparent: false, // Define o header como não transparente (opcional)
                headerStyle: {
                  backgroundColor: 'black', // Cor de fundo do header (opcional)
                },

              }}
            />
            <Stack.Screen
              name="ListaHinosSelecionados"
              component={ListaHinosSelecionados}
              options={{
                title: 'Selecionados',

                headerTintColor: '#fff',
                headerLargeTitle: true,
                headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
                headerTransparent: false, // Define o header como não transparente (opcional)
                headerStyle: {
                  backgroundColor: 'black', // Cor de fundo do header (opcional)
                },

              }}
            />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black', // fundo geral do app
  },
  statusBarFake: {
    height: 0, // geralmente a altura da status bar no Android
    backgroundColor: 'green', // cor desejada da barra
  }
});