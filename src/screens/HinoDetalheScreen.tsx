import React ,{useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Share, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Audio} from 'expo-av';




type AudioItem = {
  id: string;
  path: string;
  name: string;
  timestamp: number;
};

export default function HinoDetalheScreen( {route}) {
  // const route = useRoute<HinoDetalheRouteProp>(); 
  const { hino} = route.params;


  const [recording, SetRecording] = useState(null);
  const [playing,setPlaying]= useState(false)
  const [message, SetMessage] = useState("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [som, setSom] = useState<string | null>(null);
   const [audios, setAudios] = useState<AudioItem[]>([])

  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const url = "compartilhado do Mhalamala Plus+: http://www.mhalamhalaplus.com";

  // Carregar áudios salvos ao iniciar
  useEffect(() => {
    loadAudios();
  }, []);

  const loadAudios = async () => {
    try {
      const savedAudios = await AsyncStorage.getItem('audioRecords');
      if (savedAudios) setAudios(JSON.parse(savedAudios));
    } catch (error) {
      console.error('Erro ao carregar áudios:', error);
    }
  }

  
  
  
  ///////////////// lógica pra gravar áudio/////////

   async function startRecording() {
     try {

      if (permissionResponse.status !== 'granted') {
        console.log('Pedindo permicao');

        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS:true,
        playsInSilentModeIOS: true,
      });

      SetMessage('iniciando gravacao...');

      const {recording} = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

      SetRecording(recording);
      SetMessage('gravando...');
      
     } catch (error) {
       console.error('Erro ao iniciar a gravacao', error);
     }
   }
   

   //////// logica para parar a gravacao

   async function pararGravacao() {

    console.log('parando a gravacao');

    SetRecording(undefined);
    await recording.stopAndUnloadAsync();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    console.log('gravacao parada e armazenada em ', uri);
    SetMessage('Guardado');
    setSom(uri);

    
    
   }


   // console.log('Gravando áudio...');
  

  
    // lógica pra ouvir áudio
async function ouvirAudio() {
  setPlaying(true);
    
  if (!som) {
    console.warn('Nenhum som disponível para ouvir.');
    return;
  }


  console.log('carregando audio');
  const {sound} = await Audio.Sound.createAsync({uri:som});
   setSound(sound);

   console.log('ouvindo...');

// verificar o estado do audio, se pausou se finalizou;

sound.setOnPlaybackStatusUpdate((status) => {
  if (status.isLoaded && status.didJustFinish) {
    console.log('Áudio terminou de tocar.');
    // Atualiza o estado
    setPlaying(false)
  }

});


   await sound.playAsync();


    
}

async function pararAudio() {
  setPlaying(false)
  if (sound) {
    try {
      await sound.stopAsync() ; // ou pauseAsync() se quiser pausar em vez de parar
      console.log('áudio parado');
    } catch (error) {
      console.error('Erro ao parar o áudio:', error);
    }
  }
}


useEffect(()=>{
  return sound ? ()=>{
    sound.unloadAsync()
  }: undefined;
},[sound])


 

  const handlePartilhar = async () => {

    try {
      
      const result = await Share.share({message: `${hino.titulo +"    " + hino.letra.map(i=> i.verso)},${url}`, url: `${url}`, title: 'Compartilhar via...'});
      if (result.action === Share.sharedAction) {
        console.log("Compartilhado com sucesso!");
        
      } else if(result.action === Share.dismissedAction) {
        console.log("Compartilhamento Canselado");
      }
    } catch (error) {
      console.log('erro ao compatilhar:', error.message);
    }


    // lógica pra compartilhar
   // console.log('Partilhando áudio...');
  };

  return (
    <View style={styles.container}>
      {/* Header com botão de menu */}

      {/* Conteúdo */}
      <ScrollView style={styles.content}>
            <Text style={styles.titulo}>{hino.numero}.  {hino.titulo}</Text>
            <Text style={styles.metaDados}>{hino.categoria} {"\n"} By: {hino.autor}  {"\n"} {hino.ref}</Text> 

            {
              hino.letra.map((verso, index) => (
                <View key={index} style ={verso.refrao ? styles.refraoConteinar : styles. versoConteiner}>
                   <Text key={index} style ={verso.refrao ? styles.refraoText : styles. versoText}  >

                   {verso.verso}
                   </Text>
                </View>

              ))
            }
      </ScrollView>

      {/* Footer com botões */}
      <View style={styles.footer}>

        {!som? <TouchableOpacity onPress={recording? pararGravacao : startRecording} style={styles.btn}>
          {recording? <Ionicons name="stop" size={24} color="red" />:<Ionicons name="mic" size={24} color="#FF0000" />}
          <Text style={styles.btnText}>{recording? 'Gravando...':'Gravar'}</Text>
        </TouchableOpacity> :""}

       {som? <TouchableOpacity onPress={!playing? ouvirAudio:pararAudio} style={styles.btn}>
          {!playing? <Ionicons name="play" size={24} color="#10B981" />: <Ionicons name="pause" size={24} color="red" />}
          <Text style={styles.btnText}>{!playing? 'Ouvir':'Pausar..'}</Text>
        </TouchableOpacity>:''

       }
          
        
        <TouchableOpacity onPress={handlePartilhar} style={styles.btn}>
          <Ionicons name="share-social" size={24} color="#10B981" />
          <Text style={styles.btnText}>Partilhar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff'},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0057D9',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },

  content: {
    flex: 1,
    padding: 20,
  },
  titulo:{
    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    marginBottom:10,
    color:'#333'
  },

  refraoConteinar:{
   backgroundColor: 'transparent',
   marginTop: 20,
   marginBottom: 20,
   justifyContent:'center',
  display:'flex',
  },
  versoConteiner:{
    backgroundColor: '#fff',
    marginTop: 20,
   marginBottom: 20,
  },
  versoText: {
    fontSize: 22,
    fontWeight:'400',
    color: '#333',
    lineHeight: 26,
    letterSpacing:.5,
    textAlign:'center',
    marginBottom:10
    
  },
  refraoText:{
    fontWeight:'bold',
    color: '#3CB371',
    fontSize:24,
    letterSpacing:1,
    textAlign:'center',
    lineHeight: 26,
  },
  metaDados:{
    fontSize:16,
    fontWeight:300,
    textAlign:'center',
    marginBottom: 10,
    color:'#333',
  
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: '#fff',
    elevation:8
  },
  btn: {
    alignItems: 'center',
  },
  btnText: {
    color: '#333',
    fontSize: 12,
    marginTop: 4,
  },
});
