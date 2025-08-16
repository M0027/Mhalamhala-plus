import { useState } from "react"
import { StyleSheet, Text, Pressable, View, FlatList } from "react-native"
import useHinos from '../hooks/useHinos';

export default function categButton({ setCategoria, setLoading }) {

    const { buscarPorCategoria, buscarFavoritos } = useHinos()
    const [selected, setSelected] = useState('Todos')
    const categorias = [
        { nome: 'Todos', id: 0 },
        { nome: 'favoritos', id: 6 },
        { nome: 'louvor', id: 1 },
        { nome: 'Adoracao', id: 2 },
        { nome: 'Arrependimeto', id: 3 },
        { nome: 'Envagelizacao', id: 4 },
        { nome: 'Consolacao', id: 5 },
        { nome: 'Esortacao', id: 7},
        { nome: 'Oração / Clamor', id: 8}
    ]

    const handlePress = async (categoria) => {

        setSelected(categoria);
        setLoading(true)

        if (categoria ==='favoritos') {

            try {
                const favoritos = await buscarFavoritos(categoria)
                if (favoritos && Array.isArray(favoritos)) {
                setCategoria(favoritos);
            } else {
                console.warn("Nenhum resultado encontrado ou formato inválido");
                setCategoria([]); // Define array vazio como fallback
            }
               console.log('favoristos:', favoritos )
                return
                
            } catch (error) {
               console.error('erro ao filtrar categorias',error) 
            }finally{
                setLoading(false)
            }
        }

        try {
            setSelected(categoria);

            // 1. Verifique o que buscarPorCategoria retorna
            console.log("Buscando por:", categoria);
            const resultados = await buscarPorCategoria(categoria);
            console.log("Resultados obtidos:", resultados);

            // 2. Verifique antes de atualizar o estado
            if (resultados && Array.isArray(resultados)) {
                setCategoria(resultados);
            } else {
                console.warn("Nenhum resultado encontrado ou formato inválido");
                setCategoria([]); // Define array vazio como fallback
            }
        } catch (error) {
            console.error("Erro ao buscar categorias:", error);
            setCategoria([]); // Fallback em caso de erro
        }finally{
            setLoading(false)
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                snapToAlignment="start" // Alinha o scroll no início do item
                snapToInterval={110} // Largura aproximada do seu botão + gap
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                keyboardShouldPersistTaps='handled'
                horizontal={true}
                data={categorias}
                keyExtractor={(item) => item.id.toString()}

                renderItem={({ item }) => (

                    <Pressable key={item.id.toString()} style={[
                        styles.button,
                        selected === item.nome && styles.selectedButton]}
                        onPress={() => setCategoria(() => handlePress(item.nome))}>

                        <Text style={styles.text}>{item.nome}</Text>
                    </Pressable>

                )
                }
                contentContainerStyle={styles.grid}
            >


            </FlatList >
        </View >
    )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginTop: 14,
        paddingStart: 10,
        paddingEnd: 10,
    },
    grid: {
        gap: 7,
        paddingHorizontal: 5
    },
    button: {
        backgroundColor: "#333",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 8,
        minWidth: 80, // Largura mínima para consistência
        alignItems: 'center'
    },
    selectedButton: {
        backgroundColor: "#179650ff",
    }
    ,
    text: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 700,

    }
})
