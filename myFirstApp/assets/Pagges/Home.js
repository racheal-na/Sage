import { Button, Text, View,ActivityIndicator } from "react-native";
import { ScrollView } from "react-native";

export default function Home({navigation}){

    return(
        <ScrollView>

        <View>
          
            <Text>Home Page</Text>
            <Button title="LaziLoad" onPress={()=>navigation.navigate("LaziLoad")}>About</Button>
         <ActivityIndicator/>
         <Text>Home Page</Text>
            <Button title="Posts" onPress={()=>navigation.navigate("Posts")}>About</Button>
         <ActivityIndicator/>
         <Text>Home Page</Text>
            <Button title="CounterApp" onPress={()=>navigation.navigate("CounterApp")}>About</Button>
         <ActivityIndicator/>
         <Text>Home Page</Text>
            <Button title="About" onPress={()=>navigation.navigate("About")}>About</Button>
         <ActivityIndicator/>
         <Text>Home Page</Text>
            <Button title="About" onPress={()=>navigation.navigate("About")}>About</Button>
         <ActivityIndicator/>
         <Text>Home Page</Text>
            <Button title="About" onPress={()=>navigation.navigate("About")}>About</Button>
         <ActivityIndicator/>
         <ScrollView/>
        </View>
        </ScrollView>
    );
}