import { FlatList, Text } from "react-native";
import { View } from "react-native";

export default function LaziLoad(){
    const data= Array.from({length: 100},
          (_,i) => ({id: i.toString(), name: `Item ${i + 1}`}));
        console.log(data)

        return(
            <View style={{flex: 1}}>
            
                <FlatList
                            horizontal={false}
                            keyExtractor={(item)=>item.id}
                             data={data}
                             renderItem={({item})=>(
                            
                 <Text style={{margin: 20,backgroundColor: 'orange'}}>{item.name}</Text>
                
                             )}
                             />
            </View>

        );
};