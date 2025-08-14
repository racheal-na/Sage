import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TextInput,
  Button,
  Pressable,
  ActivityIndicator,
  Switch,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Greate from "./assets/Components/Greate";
import UserInput from "./assets/Components/UserInput";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./assets/Pagges/Home";
import About from "./assets/Pagges/About";
import LaziLoad from "./assets/Pagges/LaziLoad";
import Posts from "./assets/Pagges/Posts";
import CounterApp from "./assets/Pagges/CounterApp";
const Stack= createNativeStackNavigator()
export default function App() {
  const [on, setOn] = useState(true);
  const [people,setPeople] = useState([
    {name: 'rachel',id: '1'},
    {name: 'tsiyon',id: '2'},
    {name: 'naol',id: '3'},
    {name: 'musie',id: '4'},
    {name: 'abel',id: '5'},
    {name: 'miki',id: '6'},
    {name: 'natan',id: '7'},
    {name: 'estif',id: '8'}
  ]);
  return (
    
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="About" component={About}/>
        <Stack.Screen name="LaziLoad" component={LaziLoad}/>
        <Stack.Screen name="Posts" component={Posts}/>
        <Stack.Screen name="CounterApp" component={CounterApp}/>
        
      </Stack.Navigator>
        <View style={styles.container}>
          <FlatList
            
            keyExtractor={(item)=>item.id}
             data={people}
             renderItem={({item})=>(
            
 <Text style={styles.item}>{item.name}</Text>

             )}
             />
      {/* <ScrollView>
      {people.map((item)=>(
          <View key={item.key}>
            <Text style={styles.item}>{item.name}</Text>
          </View>
        )
      )}
      </ScrollView> */}
      <ActivityIndicator/>
    </View>
    </NavigationContainer>
    
    // <SafeAreaProvider>
    //   <SafeAreaView>
    //     <View>
    //       <UserInput />

    //       <Greate name="rachel" />

    //       <View  >
    //         <Text style={{ fontSize: 30, color: "orangered" }}>
    //           My first app
    //         </Text>
    //         <Image
    //           source={{
    //             uri: "https://tse4.mm.bing.net/th/id/OIP.z97h_M1RZnF_aFJGOc8hFgAAAA?r=0&w=474&h=609&rs=1&pid=ImgDetMain&o=7&rm=3",
    //           }}
    //           style={{ width: 100, height: 100 }}
    //         />
    //         <Image
    //           source={require("./assets/eatmore.webp")}
    //           style={{ width: 100, height: 100, margin: 20 }}
    //         />

    //         <TextInput
    //           placeholder="enter name"
    //           style={{
    //             borderWidth: 1,
    //             padding: 20,
    //             borderRadius: 20,
    //             margin: 20,
    //           }}
    //         />
    //         <Button title="Click me" onPress={() => alert("clicked")} />

    //         <Pressable
    //           onPress={() => alert("clicked")}
    //           style={({ pressed }) => ({
    //             borderRadius: 15,
    //             backgroundColor: pressed ? "gray" : "blue",
    //           })}
    //         >
    //           <Text style={{ color: "white", padding: 10 }}>Clicked</Text>
    //         </Pressable>
    //         <ActivityIndicator size="large" color="orangered" />
    //         <Switch value={on} onValueChange={setOn} />
    //       </View>
    //     </View>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,


  },
  item:{
    marginTop: 20,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24
  }
})
