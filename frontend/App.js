import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import Ipcim from './Ipcim';

export default function App() {
  const [adatok, setAdatok] = useState([]);

  const letoltes = async () => {
    try {
      const response = await fetch(Ipcim.Ipcim + "film");
      if (!response.ok) {
        throw new Error('Hiba a filmek letöltésekor: ' + response.status);
      }
      const data = await response.json();
      setAdatok(data);
    } catch (error) {
      Alert.alert("Hiba", error.message);
    }
  };

  useEffect(() => {
    letoltes();
  }, []);

  const szavazas = async (id) => {
    const bemenet = { "bevitel1": id };
    try {
      const response = await fetch(Ipcim.Ipcim + "szavazatFelvitel", {
        method: "POST",
        body: JSON.stringify(bemenet),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      });

      if (!response.ok) {
        throw new Error('Hiba a szavazat felvitelénél: ' + response.status);
      }
      const message = await response.text();
      Alert.alert("Siker", message);
    } catch (error) {
      Alert.alert("Hiba", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Marvel filmek</Text>
      <FlatList
        data={adatok}
        renderItem={({ item }) =>
          <View>
            <Text style={{ fontSize: 24, color: "RGB(165, 42, 42)", marginBottom: 20 }}>{item.cim}</Text>
            <Image source={{ uri: Ipcim.Ipcim + item.kep }} style={{ width: 350, height: 350 }} />
            <TouchableOpacity style={{ backgroundColor: "blue", marginBottom: 30 }} onPress={() => szavazas(item.id)}>
              <Text style={{ color: "white", fontSize: 24 }}>Erre szavazok</Text>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
});
