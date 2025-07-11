import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import { Ionicons,FontAwesome5 } from '@expo/vector-icons'; // ícones do Expo (se estiver usando)
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type HeaderProps = {
  onMenuPress: () => void;
  onShearchClose: () => void;
  onTextoChange: (texto: string) => void  // nova prop
}

export default function Header({ onMenuPress, onTextoChange, onShearchClose}: HeaderProps) {
  const [pesquisaclicada, SetPesquisaclicada] = useState(false)

  const onPesquisarClicaddo = ()=>{

    if (pesquisaclicada === false) {
      
      SetPesquisaclicada(true);
      return
    }
    SetPesquisaclicada(false);
  }


  
  return (
    <View style={styles.header}>


      { !pesquisaclicada?
       <View style={styles.pesquisaFechada}>

        <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
        <Ionicons name="menu" size={28} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}> Mhalamhala Plus+</Text> 

      <TouchableOpacity style={styles.menuButton} onPress={onPesquisarClicaddo}>
        <Ionicons name="search" size={28} color="#3CB371" />
      </TouchableOpacity>
      </View>: <View style={styles.searchBar}><TextInput style={styles.searchInput}
            placeholder="Pesquisar por título ou número..."
            autoFocus
            placeholderTextColor="green"
            onChangeText={onTextoChange}/><TouchableOpacity style={styles.closeButton} onPress={onPesquisarClicaddo} onPressOut={onShearchClose}>
        <Ionicons name="close" size={30} color="#E0E0E0" />
      </TouchableOpacity></View>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom:15,
    alignContent:'center',
    top: 30,
    zIndex:22,
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: 10,
  },
  title: {
    color: '#333333',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: -5,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 20,
    marginBottom:10
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  pesquisaFechada:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  pesquisaAberta:{
    flexDirection:'row',
    width:100,
    justifyContent:'space-between',
    padding:0,
  },
  searchInput: {
    flex: 1,
    display:'flex',
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color:'#10B981',
    alignItems:'center',
    paddingLeft: 20,
  },
  closeButton: {
    marginLeft: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    color:'#E0E0E0'
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

