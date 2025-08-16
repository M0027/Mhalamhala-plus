// src/hooks/useHinos.js
import { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import hinosData from '../../Titulos.json';

export default function useHinos() {
  const [hinos, setHinos] = useState([]);

  // Índices de busca
  const indices = useMemo(() => {
    const porNumero = {};
    const porCategoria = {};
    const porTitulo = [];

    hinosData.forEach(hino => {
      // Índice por número
      porNumero[hino.numero] = hino;

      // Índice por categoria
      if (!porCategoria[hino.categoria]) porCategoria[hino.categoria] = [];
      porCategoria[hino.categoria].push(hino);

      // Índice por título (minúsculo para busca case-insensitive)
      porTitulo.push({ tituloLower: hino.titulo.toLowerCase(), data: hino });
    });

    return { porNumero, porCategoria, porTitulo };
  }, []);

  useEffect(() => {
    setHinos(hinosData); // Carrega apenas uma vez
  }, []);

  // Funções de busca
  const buscarPorNumero = (numero) => indices.porNumero[numero] || null;

  const buscarPorCategoria = async (categoria) => {

    try {
      if (categoria === "Todos") {

        const favoritosSalvos = await AsyncStorage.getItem('favoritos');
        const favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : {};
        console.log('falha ao buscar favoritos', favoritos)
        const hinosComFavoritos = hinosData.map(hino => ({
          ...hino,
          favorito: favoritos[hino.numero] || false, // se não existir, define como false
        }));

        return hinosComFavoritos; // retorna todos os hinos

      }
    } catch(erro) {
      console.error('erro:', erro)
    }

    return indices.porCategoria[categoria] || [];
  }


  const buscarPorTitulo = (texto) => {
    const termo = texto.toLowerCase();
    return indices.porTitulo
      .filter(item => item.tituloLower.includes(termo))
      .map(item => item.data);
  };

  const buscarFavoritos = async (texto) => {

    try {

      const favoritosSalvos = await AsyncStorage.getItem('favoritos');
      const favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : {};
      console.log('falha ao buscar favoritos', favoritos)
      const hinosComFavoritos = hinosData.map(hino => ({
        ...hino,
        favorito: favoritos[hino.numero] || false, // se não existir, define como false
      }));

      const apenasFavoritos = hinosComFavoritos.filter(hino => hino.favorito);

      return apenasFavoritos;


      // console.log('falha ao buscar favoritos', encontrarObjetosComuns(favoritos, hinosData))


    } catch (error) {
      console.error('falha ao buscar favoritos'.error)

    }
  }

  return {
    hinos,
    buscarPorNumero,
    buscarPorCategoria,
    buscarPorTitulo,
    buscarFavoritos
  };
}
