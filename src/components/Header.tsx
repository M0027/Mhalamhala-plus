import React, { useState } from 'react';
import { View, Text, TouchableOpacity,Dimensions, StyleSheet,TextInput } from 'react-native';
import { Ionicons} from '@expo/vector-icons'; // ícones do Expo (se estiver usando)
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

type HeaderProps = {
  onMenuPress: () => void;
  onShearchClose: () => void;
  onTextoChange: (texto: any) => void  // nova prop
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
        <Ionicons name="menu" size={28} color="rgba(255,255,255, 0.8)" />
      </TouchableOpacity>
      <Text style={styles.title}> Mhalamhala Plus+</Text> 

      <TouchableOpacity style={styles.menuButton && styles.circulo} onPress={onPesquisarClicaddo}>
        <Ionicons name="search" size={28} color="#179650ff" />
      </TouchableOpacity>
      </View>: <View style={styles.searchBar}><TextInput style={styles.searchInput}
            placeholder="Pesquisar por título ou número..."
            autoFocus
            placeholderTextColor="green"
            onChangeText={onTextoChange}/><TouchableOpacity style={styles.closeButton && styles.circulo} onPress={onPesquisarClicaddo} onPressOut={onShearchClose}>
        <Ionicons name="close" size={30} color="#E0E0E0" />
      </TouchableOpacity></View>
      }


    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    padding: 10,
    paddingBottom:-5,
    alignContent:'center',
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
    color: 'rgba(255,255,255,0.8)',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  searchBar: {
    paddingBottom: 10,
    width: width,
    gap: width * .030,
    justifyContent: 'center',
    paddingTop: 10,
    position: 'absolute',
    top: -5,
    left: 0,
    right: 0,
    height: 70,
    backgroundColor: 'black',
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
    justifyContent:'space-between',
    padding:0,
  },
  searchInput: {
    display:'flex',
    width: width *.75,
    marginTop:8,
    height: 40,
    backgroundColor: 'rgba(255,255,255, 0.2)',
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
    width: width *.15,
    height:34,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    color:'#E0E0E0'
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  circulo: {
    height:43,
    width: 43,
    borderRadius:"50%",
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent:'center',
    alignItems:'center'
  }

  
});

