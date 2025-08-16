
import AsyncStorage from '@react-native-async-storage/async-storage';
import Titulos from '../../Titulos.json';

async function CarregarHinos({ setLoading, setFilteredHinos }) {


    setLoading(true);

    try {

          const favoritosSalvos = await AsyncStorage.getItem('favoritos');
              const favoritos = favoritosSalvos ? JSON.parse(favoritosSalvos) : {};
              console.log('falha ao buscar favoritos', favoritos)
              const hinosComFavoritos = Titulos.map(hino => ({
                ...hino,
                favorito: favoritos[hino.numero] || false, // se não existir, define como false
              }));
        
        setFilteredHinos(hinosComFavoritos);

    } catch (error) {
        console.error('erro ao carregar lista de hinos:', error);
        return [];
    } finally {
        setLoading(false);
    }
}

export default CarregarHinos;
