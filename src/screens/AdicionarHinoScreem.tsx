import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AdicionarHinoScreen = () => {
  const [titulo, setTitulo] = useState('');
  const [letra, setLetra] = useState('');
  const [categoria, setCategoria] = useState('Louvor');
  const [autor, setAutor] = useState('');
  const [coro, setCoro] = useState('');
  const [numero , setNumero] = useState('');
  const [hinos, setHinos] = useState([]);

  // Buscar hinos no local storage
  useEffect(() => {
    buscarHinoNoLocalStorage();
  }, []);

    const buscarHinoNoLocalStorage = async () => {
      try {
        const hinoJson = await AsyncStorage.getItem('favoritos');
        const listaDeHinos = hinoJson ? JSON.parse(hinoJson) : [];
        setHinos(listaDeHinos);
      } catch (error) {
        console.error('Erro ao buscar favoritos', error);
      }
    }

  const salvarHinoNoLocalStorage = async () => {
    try {
      const novoHino = {
        id: Date.now(), // Usando timestamp como ID único
        numero,
        titulo,
        categoria,
        autor,
        letra: [{
          verso: letra, refrao: false},{verso: coro || null , refrao:true // Se não tiver coro, salva como null
        }],
      
      };
      
      const novaLista = [...hinos, novoHino];
      await AsyncStorage.setItem('favoritos', JSON.stringify(novaLista));
      return true;
    } catch (error) {
      console.error('Erro ao salvar no localStorage', error);
      return false;
    }
  };

  const adicionarHino = () => {
    if (!titulo || !letra || !numero) {
      Alert.alert('Atenção', 'Preencha pelo menos o título , o número e a letra!');
      return;
    }

    Alert.alert(
      'Confirmar Adição',
      'Tem certeza que deseja adicionar este hino?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Adicionar',
          onPress: async () => {
            const salvou = await salvarHinoNoLocalStorage();
            if (salvou) {
              setTitulo('');
              setLetra('');
              setAutor('');
              setCoro('');
              setNumero('');
              buscarHinoNoLocalStorage();
              Alert.alert('Sucesso', 'Hino adicionado com sucesso!');
            } else {
              Alert.alert('Erro', 'Não foi possível salvar o hino');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloTela}>Adicionar Novo Hino</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do Hino*"
        value={titulo}
        onChangeText={setTitulo}
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Categoria:</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Louvor/Adoração/Outros"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>
        <View>
          <Text style={styles.label}>Número:</Text>
          <TextInput   
            style={styles.input}
            placeholder="use esse formato ex: 001."
            value={numero}
            onChangeText={setNumero}
            keyboardType='numeric'
            keyboardAppearance='light'
              
          />
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Autor (opcional)"
        value={autor}
        onChangeText={setAutor}
      />

      <TextInput
        style={[styles.input, styles.letraInput]}
        placeholder="Coro (opcional)."
        value={coro}
        onChangeText={setCoro}
        multiline
      />

      <TextInput
        style={[styles.input, styles.letraInput]}
        placeholder="Letra do Hino*"
        value={letra}
        onChangeText={setLetra}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarHino}>
        <Text style={styles.textoBotao}>Adicionar Hino</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    marginBottom:0
  },
  tituloTela: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    color:'#fff',
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: 'black',
  },
  letraInput: {
    minHeight: 150,
    textAlignVertical: 'top',
    color:'#fff'
  },
  pickerContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    marginLeft: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  botaoAdicionar: {
    backgroundColor: '#2e8b57',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom:50
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AdicionarHinoScreen;