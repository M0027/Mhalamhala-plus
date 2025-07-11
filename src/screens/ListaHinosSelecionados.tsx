import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text,FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
  


const ListaHinosSelecionados = ({navigation}) => {

  // const [hinosSelecionados, setHinosSelecionados] = useState([]);
  const [favoritos, setFavoritos]=useState([]);

   useEffect(()=>{
     recuperahinos()

   },[])


  const recuperahinos = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('favoritos');
      const arrayRecuperado = jsonValue != null ? JSON.parse(jsonValue) : [];
      setFavoritos(arrayRecuperado);

    } catch (e) {
      console.error('Erro ao recuperar o array:', e);
      return [];
    }

  };


    const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=> navigation.navigate('HinoDetalhe', {hino:item})} style={{
      padding: 20,
      margin: 5,
      backgroundColor: '#3CB371',
      borderRadius: 10,
    }}>
      <Text style={{
        color:'#fff'
      }}>{item.numero+'.'+item.titulo}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.alert}>Nenhum Hino selecionado, para selecionar volte para lista dos favoritos e clica sem soltar no hino desejado até aparecer o icone certo.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
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
  alert:{
    color:'orange',
    fontSize:18,
    textAlign:'center'
  }
});

export default ListaHinosSelecionados;