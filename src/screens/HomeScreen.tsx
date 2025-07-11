import { PopupDialog } from 'react-native-popup-dialog';
import React, { useRef, useState,useEffect  } from 'react';
import { View,Alert, Pressable, Animated, Text, StyleSheet, Dimensions, TouchableWithoutFeedback,TouchableOpacity, Linking, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RectButton} from 'react-native-gesture-handler';
import Header from '../components/Header';
import Footer from '../components/Footer';
import hinos from '../../Dados.json'
import { FontAwesome  } from '@expo/vector-icons'; // ícones do Expo (se estiver usando)
import Toast from 'react-native-toast-message';


const { width } = Dimensions.get('window');

export default function HomeScreen({navigation}) {

  const [filteredHinos, setFilteredHinos]=useState([]);
  

  useEffect(()=>{
    
    recarregarArrayDeHinos()
  }, [filteredHinos])
  
  
  const recarregarArrayDeHinos = async ()=>{
    try {
      
      const favoritosSalvos = await AsyncStorage.getItem('favoritos');
      const favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
      const array = [...favoritos,...hinos];
      const arraySemDuplicados = removerDuplicadosPreferindoFavorito(array);
      setFilteredHinos(arraySemDuplicados)
      // console.log([...favoritos,...hinos])
      } catch (error) {
        
      }
    }

  function removerDuplicadosPreferindoFavorito(arrayDeObjetos) {
  const objetosUnicos = [];
  const objetosVistos = new Set(); // Usaremos para rastrear objetos já processados

  for (const objeto of arrayDeObjetos) {
    // Criar uma string de identificação única para o objeto, ignorando a propriedade 'favorito'
    const identificador = JSON.stringify(
      Object.keys(objeto)
        .filter(key => key !== 'favorito')
        .sort()
        .reduce((acc, key) => ({ ...acc, [key]: objeto[key] }), {})
    );

    if (!objetosVistos.has(identificador)) {
      // Se este identificador ainda não foi visto, adicionamos o objeto aos únicos
      objetosUnicos.push(objeto);
      objetosVistos.add(identificador);
    } else {
      // Se o identificador já foi visto, precisamos verificar se o objeto atual tem 'favorito: true'
      const objetoUnicoExistente = objetosUnicos.find(
        obj =>
          JSON.stringify(
            Object.keys(obj)
              .filter(key => key !== 'favorito')
              .sort()
              .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
          ) === identificador
      );

      // Se o objeto atual tem 'favorito: true' e o objeto único existente não tem ou tem como false,
      // substituímos o objeto existente pelo atual
      if (objeto.favorito === true && (objetoUnicoExistente.favorito !== true)) {
        const index = objetosUnicos.indexOf(objetoUnicoExistente);
        objetosUnicos[index] = objeto;
      }
    }
  }

  return objetosUnicos;
}



  // estado a ser compartilhad
    const [selecionado, setSelecionado] = useState(false)
    const [digitado, Setdigitado]= useState('');



    //  funcao para salvar nos favoritos


      
  const salvarFavorito = async (hino) => {

     recarregarArrayDeHinos()
    
    try {
      const favoritosSalvos = await AsyncStorage.getItem('favoritos');
      const favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : [];
      const jaExiste = favoritos.some(f => f.id === hino.id);

      
      if (!jaExiste) {

        recarregarArrayDeHinos()

        const modificado = {...hino, favorito:true}
        favoritos.push(modificado);
        await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
        Alert.alert(`Hino : ${hino.titulo} dicionado aos favoritos!`);
        
        Toast.show({
          type: 'success',
          text1: 'Favorito salvo!',
          text2: `${hino.titulo} foi adicionado aos favoritos.`,
          position: 'bottom'
      });

      } else { 

        recarregarArrayDeHinos()
        
        const novoArrySemItem = favoritos.filter(item => item.id !== hino.id);
        await AsyncStorage.setItem('favoritos', JSON.stringify(novoArrySemItem));
       
        Alert.alert(`hino removido: ${hino.titulo} nos favoritos.`);
         Toast.show({
        type: 'info',
        text1: 'Já está nos favoritos!',
        text2: hino.titulo,
        position: 'bottom'
      });
      }

  recarregarArrayDeHinos()

    } catch (error) {
       Toast.show({
        type: 'info',
        text1: `erro au salvar o hino${ hino.titulo}!`,
        text2: hino.titulo,
        position: 'bottom'
      });
      console.log(error);
    }
  }





  //   chamar a funcao que lida com as pesquisas sempre que o texto do campo das pesquisasaa muadra
    useEffect(()=>{
      handlerSearch()
    },[digitado]);



    /////// funcao para lidar com as pesquiasa/////////


   const handlerSearch =()=>{

        const filtered = hinos.filter((hino) =>
         hino.titulo.toLowerCase().includes(digitado.toLowerCase()) || hino.numero.toString()===digitado
         || hino.categoria.toLocaleLowerCase().includes(digitado.toLocaleLowerCase())      );

       setFilteredHinos(filtered);
       
     
      
   } 


  ///// actualizar a lista sempre que o usuario faecha o campo de pesquisa.

   const onShearchClose = ()=>{
    setFilteredHinos(hinos);
   }

/////////////////////////////////  funcao para abrir e fechar o menum lateral
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-width * 0.6)).current; // menu começa fora da tela

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -width * 0.6 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (


  /// dive global
    <View style={styles.container}>
      <Header onMenuPress={toggleMenu} onTextoChange={(texto) => Setdigitado(texto)} onShearchClose={onShearchClose}  />



{/*/////////////////// BACKDROP para fechar o menu clicando fora /////////*/}


      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}

{/*///////////// Fim do BACKDROP para fechar o menu clicando fora //////////////////////// */}



{/* /////////////////////// MENU LATERAL ANIMADO /////////////////// */}
      
      <Animated.View style={[styles.menu, { left: slideAnim }]}>
   
        <Text style={styles.menuItem}  onPress={() => navigation.navigate('Home')} onPressOut={toggleMenu}>🏠 Início</Text>
        <Text style={styles.menuItem}  onPressOut={toggleMenu} onPress={() => navigation.navigate('ListaHinosSelecionados')}><FontAwesome name="heart" size={20} color="red" />  Selecionados</Text>
        <Text style={styles.menuItem}  onPressOut={toggleMenu} onPress={() => navigation.navigate('AdicionarHino')}><FontAwesome name="plus" size={20} color="#5555" />  Adicionar Hino</Text>
        <Text style={styles.menuItem}  onPressOut={toggleMenu}  onPress={() => navigation.navigate('Sobre')}>📖 Sobre</Text>
        <Text style={styles.menuItem}  onPressOut={toggleMenu} onPress={() => navigation.navigate('Configuracoes')}>⚙️ Configurações</Text>
        <TouchableOpacity
                onPress={() => Linking.openURL('https://wa.me/258833072296')}
                style={styles.menuItem}
                >
               <Text style={styles.menuItem}><FontAwesome name="whatsapp" size={20} color="#25D366" />  Reportar erro</Text>
              </TouchableOpacity>
      </Animated.View>

      {/* /////////////////////// Fim do Menu Lateral/////////////////// */}

      <FlatList 
      keyboardShouldPersistTaps='handled'
      ListEmptyComponent={<Text style={styles.notFaund}>Nenhum Hino com titulo <Text style={styles.bold}>{digitado}</Text>foi achado...</Text>}
       data={filteredHinos}
       keyExtractor={(item)=> item.id.toString()}

       renderItem={({item})=> (
    
          <Pressable key={item.id}    style={styles.button} >
            <TouchableOpacity onPress={()=> navigation.navigate('HinoDetalhe', {hino:item}) }>
                    <Text   numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{item.numero + '.' + item.titulo}</Text>
            </TouchableOpacity>        
                    <Text style={styles.text1}>{item.categoria} </Text>
           <TouchableOpacity onPress={()=> salvarFavorito(item)} >        
                   <Text > <FontAwesome style={styles.icone} name={item.favorito? "heart":"heart-o"} size={24} color={item.favorito? "red":"#3CB371"} /></Text>
           </TouchableOpacity> 
           </Pressable>

       )}
       contentContainerStyle={styles.grid}
      >
        
      
      </FlatList>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
    justifyContent:'center',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 30,
  },
  menu: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width * 0.6,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop:40,
    zIndex: 30,

    // Sombra iOS
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Sombra Android
    elevation: 8,
  },
  menuItem: {
    fontSize: 18,
    paddingVertical: 10,
    fontWeight:'bold',
    //margin:10 ,
    textShadowColor:'#333',
    color:'#555'
  },
  grid: {
    flexWrap: 'wrap',
    width:width,
    padding: 5,
    zIndex: 0,
    marginTop:50
  },
  cardWrapper: {
    width: '100%',
    margin: 0,
    padding:0,
    justifyContent:'center'
  },
  notFaund:{
    color:'#333',
    fontSize:20
  },
  bold:{
    fontWeight:700,
  },

  button: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: width*.95,
        margin: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
  favorito: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#3CB371',
        borderRadius: 10,
        padding: 10,
        width: width*.95,
        margin: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonPressed: {
        transform: [{ scaleX: 1.02 }],
        elevation: 2,
        marginTop: 20,
        backgroundColor: "#E0E0E0",
        color: '#555'
        // cor mais escura ao pressionar
    },
    text: {
        maxWidth: 270,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        fontSize: 18,
        color: '#555555'
    },
    text1: {
        fontSize: 12,
        fontWeight: '500',
        color: '#D4AF37',
        backgroundColor:'#f5f5f5',
        padding:2,
        textAlign:'center',
        borderRadius:8
    },
    textFavorito:{
         color:"#CC5500",
         fontSize: 12,
         fontWeight: '500',
    },
    tiuloFavorito:{
        color:"#fff",
         fontSize: 18,
    },
    icone: {
        position: 'absolute',
        left: 0,
        marginEnd: 0
    }




});
