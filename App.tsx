import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import HomeScreen from './src/screens/HomeScreen';
import HinoDetalheScreen from './src/screens/HinoDetalheScreen';
import AdicionarHinoScreem from './src/screens/AdicionarHinoScreem';
import ConfiguracaoeSceen from './src/screens/configuracaoeSceen';
import AboutScreen from './src/screens/AboutScreen';
import ListaHinosSelecionados from './src/screens/ListaHinosSelecionados'


export type RootStackParamList = {
  Home: { titulo: string, numero:string};
  HinoDetalhe: { hino: any};  // parâmetro opcional pra passar o nome do hino
  Configuracoes:undefined;
  AdicionarHino:undefined;
  Sobre:undefined;
  ListaHinosSelecionados:undefined;

  
  
};

const titulo = "Letra"

const Stack = createNativeStackNavigator<RootStackParamList>();




export default function App() {
  return (
    <NavigationContainer>
      <Toast />
      <Stack.Navigator initialRouteName="Home" id={undefined}>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
          
        />

        <Stack.Screen 
          name="HinoDetalhe" 
          component={HinoDetalheScreen}
          options={{ title: `${titulo}`, headerTitleStyle:{
            fontWeight:'bold',
            color:'#fff',
            fontSize:20
          },
          headerTintColor:'#fff',
          headerLargeTitle:true,
          headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
          headerTransparent: false, // Define o header como não transparente (opcional)
          headerStyle: {
            backgroundColor: '#3CB371',
             // Cor de fundo do header (opcional)
          },
          
         }}
        />
        <Stack.Screen 
          name="Configuracoes" 
          component={ConfiguracaoeSceen}
          options={{ title:'Configurações',
            
            headerTintColor:'#fff',
            headerLargeTitle:true,
            headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
            headerTransparent: false, // Define o header como não transparente (opcional)
            headerStyle: {
              backgroundColor: '#3CB371', // Cor de fundo do header (opcional)
            },

           }}
        />
        <Stack.Screen 
          name="Sobre" 
          component={AboutScreen}
          options={{ title: 'Sobre o aplicativo',

            headerTintColor:'#fff',
            headerLargeTitle:true,
            headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
            headerTransparent: false, // Define o header como não transparente (opcional)
            headerStyle: {
              backgroundColor: '#3CB371', // Cor de fundo do header (opcional)
            },


           }}
        />

        <Stack.Screen 
          name="AdicionarHino" 
          component={AdicionarHinoScreem}
          options={{ title: '+ Adicionar Hino',

            headerTintColor:'#fff',
            headerLargeTitle:true,
            headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
            headerTransparent: false, // Define o header como não transparente (opcional)
            headerStyle: {
              backgroundColor: '#3CB371', // Cor de fundo do header (opcional)
            },

           }}
        />
        <Stack.Screen 
          name="ListaHinosSelecionados" 
          component={ListaHinosSelecionados}
          options={{ title: 'Selecionados',
           
            headerTintColor:'green',
            headerLargeTitle:true,
            headerShadowVisible: false, // Remove a sombra abaixo do header (iOS e Android)
            headerTransparent: false, // Define o header como não transparente (opcional)
            headerStyle: {
              backgroundColor: '#F5F5F5', // Cor de fundo do header (opcional)
            },

           }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
