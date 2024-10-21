import { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
import Ipcim from './Ipcim';

export default function App() {

  const[adatok,setAdatok] = useState([])

  const letoltes = async() => {
    const x = await fetch(Ipcim.Ipcim + "film")
    const y = await x.json()
    setAdatok(y)
    //alert(JSON.stringify(y))
  }

  useEffect(() =>{
    letoltes()
  },[])

  const szavazas = async(id) =>{
    //alert(id)
    var bemenet = {
      "bevitel1":id
    }
    const x = await fetch(Ipcim.Ipcim + "szavazatFelvitel",
    {
      method: "POST",
      body: JSON.stringify(bemenet),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    }
    )
    const y = await x.text()
    alert(y)
  }

  return (
    <View style={styles.container}>
      <Text>Marvel filmek</Text>
      <FlatList
        data={adatok}
        renderItem={({item}) =>
        <View>  
          <Text style={{fontSize:24,color:"RGB(165, 42, 42)",marginBottom:20}}>{item.cim}</Text>
          <Image source={{uri: Ipcim.Ipcim + item.kep}} style={{width:350, height:350}}/>
          <TouchableOpacity style={{backgroundColor:"blue",marginBottom:30}} onPress={() => szavazas(item.id)}>
            <Text style={{color:"white",fontSize:24}}>Erre szavazok</Text>
          </TouchableOpacity>
        </View>
        }
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop:50
  },
});
