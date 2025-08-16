import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Cronometro({Ativo, Timer }) {
  const [segundos, setSegundos] = useState(Timer);
  const [ativo, setAtivo] = useState(Ativo);

  useEffect(() => {
    let intervalo = null;
    if (ativo) {
      intervalo = setInterval(() => {
        setSegundos((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [ativo]);

  const minutos = Math.floor(segundos / 60);
  const seg = segundos % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        {minutos}:{seg.toString().padStart(2, "0")}
      </Text>

      {/* <View style={styles.botoes}>
        <Button title={ativo ? "Parar" : "Iniciar"} onPress={() => setAtivo(!ativo)} />
        <Button title="Resetar" onPress={() => setSegundos(0)} />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    left: '40%',
    top: '80%',
    justifyContent: "center",
    padding: 20,
    backgroundColor: "transparent"
  },
  texto: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    color: 'tomato'
  },
  botoes: {
    flexDirection: "row",
    gap: 10
  }
});
