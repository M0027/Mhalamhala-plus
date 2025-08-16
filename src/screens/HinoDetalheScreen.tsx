import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, Dimensions, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import Hinos from '../../Dados.json';
import Cronometro from '../components/Cronometro'




type AudioItem = {
  id: string;
  path: string;
  name: string;
  timestamp: number;
};

interface Gravacao {
  id: string;
  url: string;
}

const { width } = Dimensions.get('window');

export default function HinoDetalheScreen({ route }) {
  // const route = useRoute<HinoDetalheRouteProp>(); 

  const { hino } = route.params;
  const [gravacoes, setGravacoes] = useState<Gravacao[]>([]);
  const [recording, SetRecording] = useState(null);
  const [isplaying, setPlaying] = useState(false)
  const [message, SetMessage] = useState("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [som, setSom] = useState<string | null>(null);
  const [audios, setAudios] = useState<AudioItem[]>([])
  const [Activo, SetActivo] = useState(false);
  const [time, SetTime] = useState(0);

  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const url = "compartilhado do Mhalamala Plus+: http://www.mhalamhalaplus.com";

  // Carregar áudios salvos ao iniciar
  useEffect(() => {
    getGravacoes();
  }, []);

  const getGravacoes = async () => {
    try {
      const storedGravacoes = await AsyncStorage.getItem('gravacoes');
      const audiosArnazenados = JSON.parse(storedGravacoes)
      console.log('audios buscados:', audiosArnazenados)
      const gravacaoExistente = audiosArnazenados.find(item => item.id === hino.numero);

      setSom(gravacaoExistente ? gravacaoExistente.url : '');

      //return gravacoes;
      setGravacoes(audiosArnazenados)
    } catch (error) {
      console.error('Erro ao buscar gravações:', error);
      // setGravacoes([])
    }
  }




  ///////////////// lógica pra gravar áudio/////////

  async function startRecording() {
    try {

      SetActivo(true);

      if (permissionResponse.status !== 'granted') {
        console.log('Pedindo permicao');

        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      SetMessage('iniciando gravacao...');

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

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

    SetActivo(false);

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recording.getURI();
    const id = hino.numero;
    console.log('Mhalamhala:', id)
    const fileName = `gravacao_${id}.m4a`;
    const newPath = `${FileSystem.documentDirectory}${fileName}`;

    // Move o áudio do cache para o filesystem permanente
    await FileSystem.moveAsync({
      from: uri,
      to: newPath,
    });


    // Recupera lista atual de gravações
    const existingData = await AsyncStorage.getItem('gravacoes');
    const gravacoes = existingData ? JSON.parse(existingData) : [];
    // Adiciona nova gravação
    gravacoes.push({
      id,
      url: newPath,
    });


    // Salva de volta no AsyncStorage
    await AsyncStorage.setItem('gravacoes', JSON.stringify(gravacoes));
    ////

    setGravacoes(gravacoes);
    console.log('gravacoes actualizadoa')

    console.log('Todas as gravacoes', gravacoes)

    console.log('gravacao parada e armazenada em ', gravacoes);
    SetMessage('Guardado');
    setSom(newPath);



  }

  const playSound = async (numero) => {

    const storedGravacoes = await AsyncStorage.getItem('gravacoes');
    const audiosArnazenados = JSON.parse(storedGravacoes);
    const somAchado = audiosArnazenados.find(item => item.id === numero);

    console.log('Som pra tocar:', somAchado);

    if (!somAchado) {
      console.warn('Nenhum som disponível para ouvir.');
      return;
    }

    try {

      SetActivo(true);
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        { uri: somAchado.url }
      );

      setSound(playbackObject); // opcional: guardar pra depois
      setPlaying(true);

      // usar direto o objeto retornado
      playbackObject.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          console.log('Áudio terminou de tocar.');
          setPlaying(false);
        }
      });

      await playbackObject.playAsync();
      console.log('Tocando áudio...');
    } catch (error) {
      console.error('Erro ao tocar o som:', error);
    }
  };



  const pause = async () => {
    if (sound) {
      console.log('som aqui: FFFFFFFFFFFFFFF', sound)
      await sound.pauseAsync();
      setPlaying(false);
    }
  };



  // console.log('Gravando áudio...');

  useEffect(() => {
    return sound ? () => {
      sound.unloadAsync()
    } : undefined;
  }, [sound])

  const HandlerDeletar = async () => {

    if (isplaying) {
      return
    }

    try {
      // 1. Buscar gravações existentes
      const storedGravacoes = await AsyncStorage.getItem('gravacoes');
      const audiosArmazenados = storedGravacoes ? JSON.parse(storedGravacoes) : [];

      // 2. Encontrar o índice do áudio a ser removido
      const index = audiosArmazenados.findIndex(item => item.id === hino.numero);

      if (index === -1) {
        console.log('Áudio não encontrado');
        return;
      }

      // 3. Criar nova array sem o áudio
      const novasGravacoes = [
        ...audiosArmazenados.slice(0, index),
        ...audiosArmazenados.slice(index + 1)
      ];

      // 4. Atualizar AsyncStorage
      await AsyncStorage.setItem('gravacoes', JSON.stringify(novasGravacoes));

      // 5. Atualizar state (se estiver usando)
      setGravacoes(novasGravacoes); // Opcional - caso use useState

      console.log('Áudio deletado com sucesso!');

      getGravacoes()

      // setPlaying(false )

      // 6. Parar reprodução se estiver tocando (opcional)
      // if (som && som.isPlaying) {
      //   await som.stopAsync();
      // }
    } catch (error) {
      console.error('Erro ao deletar áudio:', error);
    }
  };


  const Hino = () => {

    const dados = Hinos.find(item => item.numero == hino.numero) || null;

    console.log("aqui ????????????????????", dados);
    return dados;
  }



  const handlePartilhar = async () => {

    try {

      const result = await Share.share({ message: `${hino.titulo + "    " + Hino()[0].letra.map(i => i.verso)},${url}`, url: `${url}`, title: 'Compartilhar via...' });
      if (result.action === Share.sharedAction) {
        console.log("Compartilhado com sucesso!");

      } else if (result.action === Share.dismissedAction) {
        console.log("Compartilhamento Canselado");
      }
    } catch (error) {
      console.log('erro ao compatilhar:', error.message);
    }


    // lógica pra compartilhar
    // console.log('Partilhando áudio...');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header com botão de menu */}

      {/* Conteúdo */}
      <ScrollView style={styles.content}>
        <Text style={styles.titulo}>{hino.numero}.  {hino.titulo}. {hino.favorito}</Text>
        <Text style={styles.metaDados}> <Text style={{color:"gold"}}>{hino.categoria}</Text> {"\n"} By: {hino.autor}  {"\n"} {hino.ref}</Text>

        {
          Hino().letra.map((verso, index) => (
            <View key={index} style={verso.refrao ? styles.refraoConteinar : styles.versoConteiner}>
              <Text key={index} style={verso.refrao ? styles.refraoText : styles.versoText}  >

                {verso.verso}
              </Text>
            </View>

          ))
        }
      </ScrollView>

      {/* Footer com botões */}
      <View style={styles.footer}>

        {!som ? <TouchableOpacity onPress={recording ? pararGravacao : startRecording} style={styles.btn}>
          {recording ? <Ionicons name="stop" size={24} color="#940303ff" /> : <Ionicons name="mic" size={24} color="#940303ff" />}
          <Text style={styles.btnText}>{recording ? 'Gravando...' : 'Gravar'}</Text>
        </TouchableOpacity> : ""}

        {/* onPress={!isplaying ? ouvirAudio : pararAudio}  */}


        {som ? <TouchableOpacity onPress={isplaying ? () => pause() : () => playSound(hino.numero)} style={styles.btn}>
          {!isplaying ? <Ionicons name="play" size={24} color="#04855aff" /> : <Ionicons name="pause" size={24} color="red" />}
          <Text style={styles.btnText}>{!isplaying ? 'Ouvir' : 'Pausar..'}</Text>
        </TouchableOpacity> : ''

        }

        {som && !isplaying ?
          <TouchableOpacity onPress={HandlerDeletar} style={styles.btn}>
            <Ionicons name="trash" size={24} color="tomato" />
            <Text style={styles.btnText}>Deletar</Text>
          </TouchableOpacity> : ''
        }

        <TouchableOpacity onPress={handlePartilhar} style={styles.btn}>
          <Ionicons name="share-social" size={24} color="#04855aff" />
          <Text style={styles.btnText}>Partilhar</Text>
        </TouchableOpacity>
      </View>
      {
        (isplaying || recording) ? <Cronometro Ativo={true} Timer={time} /> : ""
      }


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },

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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'rgba(255,255,255,0.5)'
  },

  refraoConteinar: {
    backgroundColor: 'transparent',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'center',
    display: 'flex',
  },
  versoConteiner: {
    backgroundColor: 'transparent',
    marginTop: 20,
    marginBottom: 20,
  },
  versoText: {
    fontSize: 22,
    fontWeight: '400',
    color: 'rgba(255,255,255, 0.6)',
    lineHeight: 26,
    letterSpacing: .5,
    textAlign: 'center',
    marginBottom: 10

  },
  refraoText: {
    fontWeight: 'bold',
    color: '#026830ff',
    fontSize: 24,
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: 26,
  },
  metaDados: {
    fontSize: 16,
    fontWeight: 300,
    textAlign: 'center',
    marginBottom: 10,
    color: '#555',

  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    backgroundColor: 'black',
    elevation: 8
  },
  btn: {
    alignItems: 'center',
    height: 50,
    width: width * .25,
    padding: 1,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
  },
  btnText: {
    color: '#555',
    fontSize: 12,
    marginTop: 4,
  },
});
