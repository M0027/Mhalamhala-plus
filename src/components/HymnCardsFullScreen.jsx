import React from 'react';
import { SafeAreaView, View, FlatList, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

const SAMPLE_CARDS = Array.from({ length: 20 }).map((_, i) => ({ id: String(i + 1), title: `Hino ${i + 1}` }));

export default function HymnCardsFullScreen({ loading}) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Lista de "cards" simulados */}
      <FlatList
        data={SAMPLE_CARDS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card} accessible accessibilityRole="button">
            <View style={styles.cardNumberContainer}>
              {/* <Text style={styles.cardNumber}>{item.id}</Text> */}
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}></Text>
              <Text style={styles.cardCateg}></Text>
              <Text style={styles.cardFavorite}></Text>
              {/* <Text style={styles.cardSubtitle}></Text> */}
            </View>
          </View>
        )}
      />

      {/* Spinner centralizado sobre o conteúdo */}
      {loading && (
        <View style={styles.spinnerOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color="#00C853" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // fundo preto
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
    // garante que os cards ocupem o espaço e possam rolar
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)', // cinza muito claro
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    // sombra leve (iOS/Android)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  cardNumberContainer: {
    width: 30,
    height: 30,
    borderRadius: '40%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    gap: 7
  },
  cardTitle: {
    fontSize: 16,
    width: width * .50,
    marginBottom: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  cardCateg: {
    fontSize: 16,
    width: width * .10,
    marginBottom: 0,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  cardFavorite: {
    fontSize: 16,
    marginBottom: 0,
    width: width * .070,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  spinnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
