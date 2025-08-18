import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Titulos from '../../Titulos.json'
import HymnCardsFullScreen from '../components/HymnCardsFullScreen';



const ListaHinosSelecionados = ({ navigation }) => {

  // const [hinosSelecionados, setHinosSelecionados] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    buscarFavoritos()

  }, [])


  const buscarFavoritos = async () => {

    try {

      const favoritosSalvos = await AsyncStorage.getItem('favoritos');
      const favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : {};
      console.log('falha ao buscar favoritos', favoritos)
      const hinosComFavoritos = Titulos.map(hino => ({
        ...hino,
        favorito: favoritos[hino.numero] || false, // se não existir, define como false
      }));

      const apenasFavoritos = hinosComFavoritos.filter(hino => hino.favorito);

      setFavoritos(apenasFavoritos);


      // console.log('falha ao buscar favoritos', encontrarObjetosComuns(favoritos, hinosData))


    } catch (error) {
      console.error('falha ao buscar favoritos', error)

    } finally {
      setIsloading(false)
    }
  }



  const renderItem = ({ item }) => (
    <TouchableOpacity key={item} onPress={() => navigation.navigate('HinoDetalhe', { hino: item })} style={{
      padding: 15,
      margin: 5,
      backgroundColor: "#25D366",
      borderRadius: 10,
      justifyContent: 'center'
    }}>
      <Text style={{
        color: '#fff',
        fontSize: 18,
        fontWeight: 700
      }}>{item.numero + '.' + item.titulo}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>

      {
        isLoading ? <HymnCardsFullScreen loading={setIsloading} /> :
          <FlatList
            data={favoritos}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.alert}>Nenhum Hino selecionado, para selecionar volte para lista dos favoritos e clica sem soltar no hino desejado até aparecer o icone certo.</Text>}
          />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 0,
  },
  card: {
    backgroundColor: '#fff',
    padding: 0,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ordem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginRight: 10,
  },
  titulo: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  alert: {
    color: 'orange',
    fontSize: 18,
    textAlign: 'center'
  }
});

export default ListaHinosSelecionados;