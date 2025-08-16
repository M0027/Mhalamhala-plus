// import { PopupDialog } from 'react-native-popup-dialog';
import React, { useRef, useState, useEffect } from 'react';
import { View, SafeAreaView, Pressable, Animated, Text, StyleSheet, Dimensions, Linking, TouchableWithoutFeedback, TouchableOpacity, FlatList, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Titulos from '../../Titulos.json';
import HymnCardsFullScreen from '../components/HymnCardsFullScreen';
import { FontAwesome } from '@expo/vector-icons'; // ícones do Expo (se estiver usando)/ Para FontAwesome 5
import { showMessage } from 'react-native-flash-message';
import Espacador from '../components/espacador';
const { width} = Dimensions.get('window');
import CarregarHinos from '../utils/CarregarHinos';
import useHinos from '../hooks/useHinos';
import CategButton from '../components/categButton'




export default function HomeScreen({ navigation }) {

  const { buscarPorNumero, buscarPorTitulo } = useHinos();
  const [filteredHinos, setFilteredHinos] = useState([]);
  const [categoria, setCategoria] = useState('Todas');
  const [digitado, Setdigitado] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const slideAnim = useRef(new Animated.Value(-width * 0.6)).current; // menu começa fora da tela




  //  SALVAR FAVORITOS
  const toggleFaviritos = async (id) => {

    setLoading(true)

    try {
      const favoritosSalvos = await AsyncStorage.getItem('favoritos');
      const favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : {};
      const novosFavoritos = { ...favoritos, [id]: !favoritos[id] }


      await AsyncStorage.setItem('favoritos', JSON.stringify(novosFavoritos))

      setFilteredHinos(Titulos.map(hino => ({
        ...hino, favorito: novosFavoritos[hino.numero] || false
      })))

    } catch (error) {
      showMessage({
        message: 'Erro!',
        description: `${Titulos[id].titulo} nao salvo.`,
        type: 'warning', // ou 'danger', 'info'
        icon: 'auto', // Ícone automático
        duration: 2000
      });
      console.log(error);
    } finally {
      setLoading(false)

      showMessage({
        message: 'Sucesso!',
        description: `Feito '${Titulos[id].titulo}' .`,
        type: 'success', // ou 'danger', 'info'
        icon: 'auto', // Ícone automático
        duration: 2000
      });
    }
  }



  // FUNCAO PARA PESQUISAR
  const handlerSearch = () => {

    if (digitado === '') { setFilteredHinos(() => [Titulos]) }

    try {

      // Verifica se o valor é um número (incluindo números negativos e decimais)
      if (/^-?\d*\.?\d+$/.test(digitado)) {
         if (+digitado > 200) {
          setFilteredHinos([])
          return
         }
        setFilteredHinos(() => [buscarPorNumero(digitado)])
      } else {
        setFilteredHinos(() => buscarPorTitulo(digitado))
      }



    } catch (error) {
      console.error('erro ao buscar:', error)
    }finally{
      setLoading(false)
    }
  }


  const onShearchClose = () => {
    setFilteredHinos(Titulos);
    CarregarHinos({ setLoading, setFilteredHinos })
  }


  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -width * 0.6 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };


  useEffect(() => {

    function Principal() { 
      CarregarHinos({ setLoading, setFilteredHinos });

    }

    Principal()

  }, [])

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      
      handlerSearch()
    },300);

  }, [digitado])

  return (

    <SafeAreaView style={styles.container}>
      <Header onMenuPress={toggleMenu} onTextoChange={(texto) => Setdigitado(texto)} onShearchClose={onShearchClose} />

      <CategButton setLoading={setLoading} setCategoria={setFilteredHinos} />

      {/*/////////////////// BACKDROP para fechar o menu clicando fora /////////*/}


      {menuVisible && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
      )}

      {/*///////////// Fim do BACKDROP para fechar o menu clicando fora //////////////////////// */}



      {/* /////////////////////// MENU LATERAL ANIMADO /////////////////// */}

      <Animated.View style={[styles.menu, { left: slideAnim }]}>

        <Text style={styles.menuItem} onPress={() => navigation.navigate('Home')} onPressOut={toggleMenu}>🏠 Início</Text>
        <Text style={styles.menuItem} onPressOut={toggleMenu} onPress={() => navigation.navigate('ListaHinosSelecionados')}><FontAwesome name="heart" size={20} color="green" />  Selecionados</Text>
        {/* <Text style={styles.menuItem} onPressOut={toggleMenu} onPress={() => navigation.navigate('AdicionarHino')}><FontAwesome name="plus" size={20} color="#5555" />  Adicionar Hino</Text> */}
        <Text style={styles.menuItem} onPressOut={toggleMenu} onPress={() => navigation.navigate('Sobre')}>📖 Sobre</Text>
        {/* <Text style={styles.menuItem} onPressOut={toggleMenu} onPress={() => navigation.navigate('Configuracoes')}>⚙️ Configurações</Text> */}
        <TouchableOpacity
          onPress={() => Linking.openURL('https://wa.me/258833072296')}
          style={styles.menuItem}
        >
          <Text style={styles.menuItem}><FontAwesome name="whatsapp" size={20} color="#25D366" />  Reportar erro</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* /////////////////////// Fim do Menu Lateral/////////////////// */}


      {
        loading ? <HymnCardsFullScreen loading={loading} /> :



          <FlatList
            keyboardShouldPersistTaps='handled'
            ListEmptyComponent={<Text style={styles.notFaund}>Nenhum Hino com titulo <Text style={styles.bold}>{digitado}</Text>foi achado...</Text>}
            data={filteredHinos}
            keyExtractor={(item) => item.numero}

            renderItem={({ item }) => (

              <Pressable key={item.numero} style={styles.button}>
                <TouchableOpacity style={{ width: '70%' }} onPress={() => navigation.navigate('HinoDetalhe', { hino: item })}>
                  <Text numberOfLines={1} ellipsizeMode='tail' style={styles.text}>{item.numero + '.' + item.titulo}</Text>
                </TouchableOpacity>
                <Text style={styles.text1}>{item.categoria} </Text>
                {/* <TouchableOpacity onPress={isplaying? ()=> pause :()=> playSound(item.numero)} style={{width: '10%'}} > 
              <Text>{!acharAudio(item.numero) ? null : <FontAwesome name={isplaying? 'pause':'play'} size={20} color={isplaying? 'red':"white"} />}</Text>
            </TouchableOpacity> */}
                <TouchableOpacity style={{ width: '10%' }} onPress={() => toggleFaviritos(item.numero)} >
                  <FontAwesome style={styles.icone} name={item.favorito ? "heart" : "heart-o"} size={24} color={item.favorito ? "#3CB371" : "#3CB371"} />
                </TouchableOpacity>
              </Pressable>

            )}
            contentContainerStyle={styles.grid}
          >


          </FlatList>
      }

      <Espacador />

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
    position: 'relative',
    justifyContent: 'center',
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
    paddingTop: 40,
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
    fontWeight: 'bold',
    //margin:10 ,
    textShadowColor: '#333',
    color: '#555'
  },
  btnToggleCateg: {
    backgroundColor: '#179650ff',
    color: "#fff",
    padding: 5,
    alignItems: 'center',
    marginTop: 10
  },

  grid: {
    // flexWrap: 'wrap',
    width: width,
    // maxHeight: height * 70 ,
    padding: 5,
    zIndex: 0,
    marginTop: 50,
    paddingBottom: 150
  },
  cardWrapper: {
    boxSizing: 'border-box',
    width: '100%',
    margin: 0,
    padding: 0,
    justifyContent: 'center',

  },
  notFaund: {
    color: '#333',
    fontSize: 20
  },
  bold: {
    fontWeight: 700,
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    boxSizing: 'border-box',
    // borderBottomWidth:2,
    // borderBottomColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    margin: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // borderBottomColor: '#ccc',
  },


  // titulo: {
  //   width: width * .61,
  // },

  // play: {
  //   width: width * .13,
  //   backgroundColor:"fff"
  // },

  // heart: {
  //   width: width * .13
  // },

  // categoria: {
  //   width: width * .13
  // },


  favorito: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ' #179650ff',
    borderRadius: 10,
    padding: 10,
    width: width * .95,
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
    maxWidth: 240,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    textAlign: 'left',
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)'
  },
  text1: {
    fontSize: 12,
    fontWeight: '500',
    color: '#D4AF37',
    padding: 2,
    textAlign: 'center',
    borderRadius: 8,
    width: '18%'
  },
  textFavorito: {
    color: "#CC5500",
    fontSize: 12,
    fontWeight: '500',
  },
  tiuloFavorito: {
    color: "#fff",
    fontSize: 18,
  },
  icone: {
    position: 'absolute',
    left: 0,
    marginEnd: 0
  }



});
