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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    position: "absolute",
    left: '70%',
    top: '55%',
    justifyContent: "center",
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, .6)",
    borderRadius:'50%',
    elevation:8,
    borderWidth:1,
    borderColor: "#25D366",

  },
  texto: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 10,
    color: 'red'
  }
});
