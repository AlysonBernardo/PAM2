import fetchCharacters from "@/services/api";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View, FlatList, StyleSheet, Button, TouchableOpacity, ImageBackground } from "react-native";
import { Personagem } from "@/interfaces/Personagem";

export default function Home() {
    const router = useRouter();
    const [personagens, setPersonagens] = useState<Personagem[]>([]);
    const [carregar, setCarregar] = useState(true);

    useEffect(() => {
        async function carregarPersonagens() {
            const dados = await fetchCharacters();
            setPersonagens(dados.characters);
        } carregarPersonagens();
    }, []);

   return(
        <View style={style.container}>
            <Text>Página de detalhes</Text>
            <FlatList 
            data={personagens}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <View style={style.card}>
                    <TouchableOpacity onPress={() => {router.push('/')}}>
                    <ImageBackground source={{uri: item.images[0]}} style={style.image}/>
                    <Text style={style.name}>{item.name}</Text>
                    </TouchableOpacity>
                </View>                
                )}
            />
        </View>
   )
}

 const style = StyleSheet.create({
    container:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#FFF",
    padding: 15
    },
    card:{
        padding: 10,
        marginVertical: 8,
        borderRadius: 10,
        alignItems: "center"
    },
    image:{
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 5
    },
    name:{
        fontSize: 18,
        fontWeight: "bold"
    }
 });

// export function CharacterAtrributes(){
//   const router = useRouter();
//
//    return (
//        <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
//            <Text>Página Home</Text>
//            <Button title="See the attributes from "
//            onPress={() => router.push('/details')}/>
//        </View>
//    )
// }
